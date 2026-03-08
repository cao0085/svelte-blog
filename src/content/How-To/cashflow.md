---
title: "金流串接"
date: "2025-06-22"
category: "software"
subCategory: "How-To"
tags: ["payment", "backend", "csharp"]
slug: "payment-integration"
---
###### [程式碼](https://github.com/cao0085/code-pattern/tree/main/cashflow)

---

在串接金流商（Payment Provider，以下簡稱 PP）時，有幾個核心原則：

- **Transaction 一致性**：更新多張 Table 時務必包在 Transaction 中
- **完整 Logging**：初期 Request / Response 都紀錄詳細一點，上線穩定後再移除
- **ReturnCode Mapping**：將各家 PP 的錯誤碼集中管理，統一轉換為系統內部狀態
- **人工介入流程**：定義錯誤時的人工處理情境，搭配後台工具或警示通知
- **Query 補償機制**：定時 Job 或手動工具執行查詢，同步漏單、補齊退款差額

主要流程：
```
Request → Pre-commit → Send → Response Logging → State Machine → Commit
```

---

### HTTP Request

依照 PP 文件組出必要的 Header（例如 `ChannelId`、`Secret`）與 Body JSON。簽章或加密邏輯也在這層集中處理，並抽成共用方法 `GenerateProviderRequest(method, url, envConfig)`。

```csharp
var req = new HttpRequestMessage(HttpMethod.Post, fullUrl);
req.Headers.TryAddWithoutValidation("X-Provider-Id", env.ChannelId);
req.Headers.TryAddWithoutValidation("X-Provider-Secret", env.Secret);
req.Content = new StringContent(bodyJson, Encoding.UTF8, "application/json");
```

---

### Pre-commit

在呼叫 PP 之前，先在自家 DB 建立一筆交易主檔（包含交易序號、金額、初始狀態）。`SaveChanges()` 後才送出請求，即使後續網路異常或 PP 無回應，也有記錄可查，方便補單或人工處理。

```csharp
db.SaveChanges(payInfo);
```

---

### Send Request

送出請求後，先確認是否為預期內的回應（成功 / 失敗 / 逾時），並記錄 Status Code 與錯誤訊息。

```csharp
using var client = new HttpClient();
using var res = await client.SendAsync(req, HttpCompletionOption.ResponseHeadersRead, ct);
```

---

### State Machine

根據 PP 回傳的 `ReturnCode` 判斷交易結果，更新 DB 狀態與寫入明細，整段邏輯包在 Transaction 中確保一致性。

```csharp
switch (res.data.ReturnCode)
{
    case "0000": // 付款成功
    case "1165": // 付款失敗
    case "xxxx": // 例外狀況
}
await db.SaveChangesAsync();
await transaction.CommitAsync();
```

---

### 補查詢機制

若請求過程中發生網路異常或收到非預期回應，可主動向 PP 查詢最新交易狀態，與自家 DB 比對後進行同步更新。可根據需求設計為純查詢或查詢後強制同步兩種模式。

---

### Finite State Machine

金流交易的狀態變更是有條件的，導入 FSM 可以明確定義每個 State 允許的 Transition 也比較好維護。

**State 定義：**

| State | 說明 |
|-------|------|
| `Pending` | 交易建立，等待 PP 回應 |
| `Success` | 付款成功 |
| `Failed` | 付款失敗 |
| `Cancelled` | 取消交易 |
| `Refunding` | 退款處理中 |
| `Refunded` | 退款完成 |

**合法 Transition：**

| 當前 State | 可轉移至 |
|------------|---------|
| `Pending` | `Success`、`Failed`、`Cancelled` |
| `Success` | `Refunding` |
| `Refunding` | `Refunded`、`Failed` |
| `Failed` / `Cancelled` / `Refunded` | — （終態，不可再變更） |

實作上可在更新狀態前加一層驗證，拒絕非法 Transition：

```csharp
if (!_allowedTransitions[current].Contains(next))
    throw new InvalidOperationException($"Invalid transition: {current} → {next}");
```
