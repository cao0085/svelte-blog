---
title: "處理大型檔案上傳"
date: "2025-10-27"
category: "software"
subCategory: "How-To"
tags: ["http", "filestream"]
slug: "filestream"
---
###### 利用串流處理檔案暫存的問題
---

用一般的方式處理檔案上傳，會將整個檔案載入記憶體後再處理。遇到檔案較大或同時有多個請求時，記憶體容易爆掉。

```csharp
// 傳統方式：一次載入整個檔案
public async Task UploadFile(IFormFile file)
{
    // 整個檔案載入記憶體，100MB 檔案就佔 100MB 記憶體
    var bytes = await file.ReadAllBytesAsync();
    await System.IO.File.WriteAllBytesAsync("output.dat", bytes);
}
```

串流的設計就是為了解決這個問題：**分批讀取、邊讀邊處理、用完即釋放**。

---

### FileStream

- **指針機制**：串流有一個內部指針，讀取時會向前移動，讀完後就到了末尾
- **記憶體效率**：不會把整個檔案載入記憶體，而是分批讀取
- **即時處理**：資料可以邊讀邊處理，適合有獨立資料結構的檔案類型

**適合串流處理的類型**：`.txt`, `.csv`, `.jsonl`, `.mp3`, `.mp4`
這些格式的資料是逐行或逐段獨立的，可以讀一段處理一段。

**不適合串流處理的類型**：`.json`, `.zip`, `.rar`
這些格式需要完整讀取才能解析結構（JSON 要完整才能 parse，壓縮檔要完整才能解壓）。

```csharp
// 串流處理：記憶體效率高
public async Task<ActionResult> UploadFile(IFormFile file)
{
    using var reader = new StreamReader(file.OpenReadStream());
    string line;
    
    // 可邊接收邊處理，不佔用大量記憶體
    while ((line = await reader.ReadLineAsync()) != null)
    {
        ProcessLine(line); // 處理完就釋放記憶體
    }
    // while 結束 = 檔案完全接收完畢
}
```

---

### 為什麼 IFormFile 可以邊接收邊處理？

這跟 HTTP 不同參數類型的執行時機有關：

| 參數類型 | 執行時機 | 資料狀態 | 適用場景 |
|---------|---------|---------|---------|
| `string` / `object` | Body 完整接收後 | 立即可用 | 小型資料、JSON |
| `IFormFile` | Headers 接收後 | 檔案資訊可用，內容需串流讀取 | 大型檔案 |

當使用 `IFormFile` 時，Controller Action 在收到 Headers 後就會開始執行。此時檔案的 metadata（檔名、大小、類型）已經可用，但檔案內容還在傳輸中。呼叫 `OpenReadStream()` 時，就是在讀取這個「還在進來」的資料流。

---

### 二進位串流處理

對於非文字檔（如圖片、影片），使用 byte buffer 分批處理：

```csharp
public async Task UploadBinaryFile(IFormFile file)
{
    using var inputStream = file.OpenReadStream();
    using var outputStream = new FileStream("output.dat", FileMode.Create);
    
    var buffer = new byte[8192]; // 8KB buffer
    int bytesRead;
    
    while ((bytesRead = await inputStream.ReadAsync(buffer, 0, buffer.Length)) > 0)
    {
        await outputStream.WriteAsync(buffer, 0, bytesRead);
        // 每次只處理 8KB，記憶體用量固定
    }
}
```

---

### 串流處理的注意事項

- **指針只能前進**：讀過的資料不會保留，重讀就要重新開啟串流或先存起來。

- **錯誤處理**：串流過程中可能因網路問題中斷，需要妥善處理例外。

- **Dispose 很重要**：用 `using` 確保串流正確關閉，避免資源洩漏。
