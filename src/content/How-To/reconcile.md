---
title: "處理對帳檔案"
date: "2025-09-30"
category: "software"
subCategory: "How-To"
tags: ["payment", "reconcile", "csharp"]
slug: "payment-reconciliation"
---
###### 金流商通常在 N 個工作日後，提供一份撥款檔案作為實際金流的核實依據
---

這個流程通常是每日定時自動執行，但實務上會遇到：網路中斷、金流商未按時提供、資料格式錯誤等異常，因此流程中需要設計 **Checkpoint**（重試斷點），讓人工介入後能從中斷點繼續節省資源。常見流程：

```
1. 取得遠端檔案 → 2. 讀入記憶體 → 3. 解析 & 儲存 → 4. 產出靜態檔案備份
```

---

### 1. 取得遠端檔案

透過 SFTP 下載指定日期範圍的 CSV 檔案，寫入本地路徑後回傳檔案清單。若發生異常，可從 Error Log 取得原始參數直接重試此步驟。

```csharp
public async Task<List<string>> DownloadRemoteFileAsync(
    string connectionJsonStr, string storagePath, string filePrefix,
    DateTime? startDate = null, DateTime? endDate = null)
{
    var fromDate = startDate ?? DateTime.Today.AddDays(-1);
    var toDate = endDate ?? DateTime.Today.AddDays(-1);

    var config = JsonSerializer.Deserialize<SftpConfig>(connectionJsonStr);

    using var sftpClient = new SftpClient(config.SftpIP, config.SftpPort, config.SftpAccount, config.SftpPassword);
    EnsureSftpConnected(sftpClient);

    var files = await Task.Run(() => sftpClient.ListDirectory("."));
    var targetFiles = files
        .Where(f => f.IsRegularFile && f.Name.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
        .Where(f => Enumerable.Range(0, (toDate - fromDate).Days + 1)
            .Any(d => f.Name.Contains(fromDate.AddDays(d).ToString("yyyyMMdd"))))
        .ToList();

    Directory.CreateDirectory(storagePath);
    var result = new List<string>();
    foreach (var file in targetFiles)
    {
        var path = Path.Combine(storagePath, $"{filePrefix}_{file.Name}");
        using var fs = File.Create(path);
        await Task.Run(() => sftpClient.DownloadFile(file.FullName, fs));
        result.Add(path);
    }
    return result;
}
```

---

### 2. 讀入記憶體

確認檔案存在後讀取，跳過第 N 行（通常是金流商的標頭說明）。重試斷點：確認本地檔案路徑存在即可重試。

```csharp
public async Task<List<string>> ReadFileAndGetValidLines(string path)
{
    string[] lines = await File.ReadAllLinesAsync(path, Encoding.UTF8);
    return lines.Skip(1).ToList();
}
```

---

### 3. 解析 & 儲存

解析每一列資料、與內部 DB 比對，包在 try/catch 中。解析失敗的原始資料保留至 `failedRows`，等待人工檢閱。重試斷點：將 failedRows 回丟此方法重新處理。

```csharp
public async Task<ReconciliationResult> ProcessReconciliation(
    CFContext db, string storeId, List<string> data)
{
    int successCount = 0;
    var unmatchedRows = new List<string>();
    var failedRows = new List<string>();

    foreach (var line in data)
    {
        try
        {
            var row = line.Split(',').Select(x => x.Trim('"')).ToArray();

            string trxSeq    = row[0];
            string payStatus = row[16];
            string orderNo   = row[20];
            DateTime scheduledDate = DateTime.ParseExact(row[6], "yyyyMMdd", null);
            decimal payAmount = decimal.Parse(row[10]);
            // ... 其餘欄位解析

            // 查詢內部資料，比對後更新
            successCount++;
        }
        catch
        {
            failedRows.Add(line);
        }
    }

    return new ReconciliationResult
    {
        SuccessCount = successCount,
        ProcessFailedData = failedRows.ToArray(),
        SeqNoUnmatchData = unmatchedRows.ToArray()
    };
}
```

---

### 4. 產出靜態檔案

若需要將對帳結果輸出為 CSV 給外部使用，以 DB 為 SSOT，在 Table 欄位記錄匯出狀態：

```csharp
// 欄位設計
CreateDate = DateTime.Now,
Exported = false,
FileName = null
```

產檔時**先寫檔、再更新 DB**，確保兩者一致：

```csharp
public async Task GenerateStaticFile(string storeId)
{
    var records = await _db.CfReconciliation
        .Where(x => x.StoreID == storeId && x.Exported == false)
        .ToListAsync();

    var lines = new List<string> { "Column1,Column2,Column3" };
    lines.AddRange(records.Select(r => $"{r.StoreID},{r.SeqNo},..."));

    var fileName = $"RECONCILE_{DateTime.Now:MMddHHmmss}";
    var filePath = Path.Combine("OUTPUT_PATH", $"{fileName}.csv");
    Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

    await File.WriteAllLinesAsync(filePath, lines, Encoding.UTF8);

    // 檔案確認寫入後，才更新 DB
    foreach (var r in records)
    {
        r.Exported = true;
        r.ExportedTime = DateTime.Now;
        r.ExportedFileName = fileName;
    }
    await _db.SaveChangesAsync();
}
```
