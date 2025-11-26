---
title: "HTTP & FileStream"
date: "2025-10-27"
category:
subCategory:
tags: ["http", "filestream"]
slug: "filestream"
---
實作串流相關 API

---

### FileStream 特性

- 指針機制：串流有一個內部指針，讀取時會向前移動，讀完後就到了末尾
- 記憶體效率：串流設計用來處理大文件，不會把整個文件載入記憶體
- 即時處理：數據是可以邊讀邊處理的，適合有獨立資料結構導向的檔案類型

**適合的類型** : `.txt`, `.csv`,`.jsonl`,`.mp3`, `.mp4`

**不適合的類型** : `.json`, `.zip`, `.rar`

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

這邊可邊接收邊處理，是因為 **HTTP 不同 Request 參數類型，會有不同的執行時機**，例如:

- String / Object：Body 完整接收後才執行，資料立即可用（適合小型資料、JSON）

- IFormFile：Headers 接收後就執行，檔案資訊立即可用但內容需等待串流（適合大型檔案）
