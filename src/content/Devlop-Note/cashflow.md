---
title: "POS機金流處理"
date: "2025-06-22"
category: "software"
subCategory: "開發筆記"
tags: ["金流", "backend", "payment"]
slug: "cashflow"
---
###### POS機金流商串接流程

---

[相關程式碼](https://github.com/cao0085/code-pattern/tree/main/cashflow)

### 實踐重點

- **交易一致性**：更新多張表時務必使用 Transaction。  
- **完整留痕**：Request/Response 原文（或至少摘要＋關鍵欄位）存檔，方便日後對帳與疑難排解。  
- **Idempotency**：以自家訂單編號（orderId）做遞送重試時的唯一索引，避免重複請款/退款。  
- **錯誤碼映射表**：將 PP 的 ReturnCode 對應到自家錯誤碼與訊息，集中管理。  
- **人工介入流程**：人工處理的狀況，要有後台工具或警示流程。  
- **查詢補償機制**：定時 Job/手動工具執行 Query，同步漏單、退款差額。

### 主要流程

`Request => Pre-commit / record original state => Response Logging => State Machine => Commit`

`*** pp = Payment Provider`

### 發送交易 / 退款

### HTTP Request Skeleton

- 依 PP 文件將必要 Header（例如 ChannelId / Secret…）與 Body JSON 組起來。  
- 這層邏輯最好抽成共用：`GenerateProviderRequest(method, url, envConfig)`。  
- 若有簽章/加密，放在這層集中處理（本案沒有，就預留 Hook）。

```csharp
var req = new HttpRequestMessage(HttpMethod.Post, fullUrl);
> req.Headers.TryAddWithoutValidation("X-Provider-Id", env.ChannelId);
> req.Headers.TryAddWithoutValidation("X-Provider-Secret", env.Secret);
> req.Content = new StringContent(bodyJson, Encoding.UTF8, "application/json");
```

### Pre-commit

先在自家 DB 建立一筆「金流交易主檔（含交易序號、金額、初始狀態等），`Commit()` 後再呼叫 PP，若網路或對方故障，你仍有一筆記錄可查，方便後續查詢/補單/人工處理。

```csharp
db.SaveChanges(payInfo)
```

### SendRequest

`SendRequestAsync(req)` 後，先檢查是否為預期內的回應(成功/失敗...)，記錄 Log（含狀態碼與錯誤訊息）

```csharp
using var client = new HttpClient();
using var res = await client.SendAsync(req,HttpCompletionOption.ResponseHeadersRead,ct);
```

### State Machine

邏輯判斷回傳資訊，與 DB 互動（更新狀態、寫入明細）包在 Transaction 中，確保一致性。

```csharp
switch (res.data.ReturnCode)
{
    case "0000": // 成功處理 =>
    case "1165": // 失敗處理 =>
    case "xxxx": // 例外處理 ...
    //...
}
await db.SaveChangesAsync();
await transaction.CommitAsync();
return Response;
```

<br>

### 查詢交易狀態

若在發送請求時遇到網路異常、非預期回應，通常會用查詢確認金流商最新狀態，把金流商回應的狀態和自家資料庫比對/修改。

這邊可以根據自己的需求定義成純查詢/查詢必定同步更新等等。

<br>

### Finite State Machine

金流處理也適合導入有限狀態機的概念，因為資料變更會是有條件的例如

- 付款待確認
    -可變成: 付款成功、付款失敗、付款取消
    -不可變成: 退款、退款失敗

- 付款成功
    -可變成: 退款、退款失敗
    -不可變成: 付款待確認、付款失敗、付款取消

...
