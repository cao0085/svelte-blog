---
title: "Canceling Http Requests"
date: "2026-02-06"
category: "software"
subCategory: "Backend"
tags: ["Backgroud", "backend", "Cancel"]
slug: "cancelrequest"
---
###### 主動去中斷 HTTP 請求

---

### Http Request

前端 POST → Preflight (OPTIONS) → 實際 POST → 等待回應 → 收到回應

```md
前端                          後端
 │                              │
 │── TCP 連線建立（三次握手）──→ │
 │── 送出 HTTP Request ───────→ │
 │                              │  處理中...
 │        （TCP 連線開著）        │  處理中...
 │                              │  處理中...
 │←── 回傳 HTTP Response ────── │
 │── TCP 連線關閉 ──────────────→│

```

也就是在還沒有拿到 Response 前都會保持 TCP 通信，想要中斷取消該請求的方法

- 關閉瀏覽器/分頁

- JavaScript 呼叫 AbortController.abort()

- 網路斷線

那當 TCP 連線中斷後，會希望後端終止該流程避免資源消耗，就可以使用 Cancel Token。

### Canceling

概念滿單純的，就是從 `CancellationTokenSource` 創建一顆 token，當作參數傳入 `func(token)`。當 TCP 連線中斷後，Runtime 會自動將 token 狀態設為已取消，每個 func 內部就去檢查該 token 狀態來決定是否繼續執行。

每個語言處理 token 的方式不一樣：

- **C#**：使用獨立的 `CancellationToken`，需手動呼叫 `ThrowIfCancellationRequested()` 拋出 `OperationCanceledException`，或檢查 `IsCancellationRequested` 屬性，另外很多套件和常用方法都接受 token 傳入
- **Go**：包在 `context.Context` 裡面，透過 `ctx.Done()` channel 或 `ctx.Err()` 檢查是否取消

```csharp
// ASP.NET Core - Controller 自動注入 CancellationToken
[HttpGet]
public async Task<IActionResult> GetData(CancellationToken cancellationToken)
{
    // 方法一：手動檢查
    if (cancellationToken.IsCancellationRequested)
    {
        return StatusCode(499, "Client Closed Request");
    }

    // 方法二：拋出例外（會回傳 400 Bad Request）
    cancellationToken.ThrowIfCancellationRequested();

    // 傳遞給其他 async 方法
    var result = await _dbContext.Users
        .ToListAsync(cancellationToken);

    return Ok(result);
}

// HttpClient - 支援 CancellationToken
var response = await _httpClient.GetAsync("https://api.example.com/data", cancellationToken);
var content = await response.Content.ReadAsStringAsync(cancellationToken);

// System.IO - 檔案操作支援 CancellationToken
var text = await File.ReadAllTextAsync("path/to/file.txt", cancellationToken);
await File.WriteAllTextAsync("path/to/output.txt", content, cancellationToken);
```

```go
// Go - 使用 context.Context
func GetData(ctx context.Context) ([]User, error) {
    // 方法一：檢查 channel
    select {
    case <-ctx.Done():
        return nil, ctx.Err() // context.Canceled 或 context.DeadlineExceeded
    default:
        // 繼續執行
    }

    // 方法二：傳遞給其他函數
    rows, err := db.QueryContext(ctx, "SELECT * FROM users")
    if err != nil {
        return nil, err
    }
    // ...
}

// Gin 框架範例
func Handler(c *gin.Context) {
    ctx := c.Request.Context() // 從 request 取得 context
    result, err := GetData(ctx)
    // ...
}
```
