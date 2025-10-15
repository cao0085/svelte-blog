---
title: "會計對帳檔案處理"
date: "2025-09-30"
category: "software"
subCategory: "開發筆記"
tags: ["金流", "reconcile", "payment"]
slug: "reconcile"
---
###### 金流商通常會在N工作日後，提供一份撥款檔案視為實際銀行帳務核實依據

---

通常為每日定時執行的自動化流程,但實務上常面臨以下異常狀況:
- 系統異常(網路中斷、伺服器故障)
- 金流商未按時提供檔案
- 資料格式錯誤或不完整

若每次異常都從頭重跑整個流程,會造成大量的資源浪費。因此需要設計重試節點(Checkpoint),讓人工介入後可以從中斷點繼續執行,而非全部重來。

<br>

### 1. 取得金流商靜態檔案

發生異常的話表示沒有寫入本地端，重試點就從 ERROR LOG 去找該參數直接重試可以了。
```csharp
/// <summary>
/// 取得遠端檔案
/// </summary>
public async Task<List<string>> DownloadRemoteFileAsync(string connectionJsonStr, string storagePath, string filePrefix, DateTime? startDate = null, DateTime? endDate = null)
{
    var yesterday = DateTime.Today.AddDays(-1);
    var fromDate = startDate ?? yesterday;
    var toDate = endDate ?? yesterday;
    if (fromDate > toDate)
        throw new ArgumentException("起訖日期參數設定異常");

    var connectionConfig = JsonSerializer.Deserialize<JsonElement>(connectionJsonStr);
    var config = new SftpConfig
    {
        SftpIP = connectionConfig.GetProperty("SftpIP").GetString() ?? throw new ArgumentException("ip is required"),
        SftpPort = int.TryParse(connectionConfig.GetProperty("SftpPort").GetString(), out var port)? port : 22,
        SftpAccount = connectionConfig.GetProperty("SftpAccount").GetString() ?? throw new ArgumentException("Account is required"),
        SftpPassword = connectionConfig.GetProperty("SftpPassword").GetString() ?? throw new ArgumentException("Password is required"),
    };

    try
    {
        #region 處理遠端連線和指定檔案
        using var sftpClient = new SftpClient(config.SftpIP, config.SftpPort, config.SftpAccount, config.SftpPassword);
        EnsureStftConnected(sftpClient);

        var sftpFiles = await Task.Run(() => sftpClient.ListDirectory("."));
        var csvFiles = sftpFiles.Where(file => file.IsRegularFile && file.Name.EndsWith(".csv", StringComparison.OrdinalIgnoreCase));
        var targetFiles = csvFiles
            .Where(file =>
            {
                for (var date = fromDate; date <= toDate.Date; date = date.AddDays(1)) // 取得指定日期範圍資料(檔名)
                {
                    if (file.Name.Contains(date.ToString("yyyyMMdd")))
                    {
                        return true;
                    }
                }
                return false;
            })
            .ToList();
        #endregion

        #region 下載至本地端
        Directory.CreateDirectory(storagePath);
        var filesPath = new List<string>();
        foreach (var file in targetFiles)
        {
            var path = Path.Combine(storagePath, $"{filePrefix}_{file.Name}");
            using var fileStream = File.Create(path);
            await Task.Run(() => sftpClient.DownloadFile(file.FullName, fileStream));

            filesPath.Add(path);
        }
        #endregion

        return filesPath;
    }
    catch (Exception ex)
    {
        throw new Exception($"LinePay SFTP 下載失敗: {ex.Message}", ex);
    }
}
```

### 2. 寫入資料到記憶體暫存

很單純直接檢查該路徑檔案存在與否+重試
```csharp
public async Task<List<string>> ReadFileAndGetValidLines(string path)
{
    string[] fileLines = await File.ReadAllLinesAsync(path, Encoding.UTF8);
    excludedLine = fileLines.Length > 0 ? fileLines[0] : string.Empty;

    return fileLines.Skip(1).ToList(); // 根據金流商提供的規則
}
```

### 3. 解析檔案 & 儲存

主要是解析、分類檔案，其中出現異常就Catch住保留原始資料，等待人工檢閱
重試的斷點就是把這批資料回丟這個 function 去處理

```csharp
public async Task<ReconciliationResult> ProcessReconciliation(CFContext db, string storeId, List<string> data)
{
    int successCount = 0;
    List<string> unmatchedRows = [];
    List<string> failedRows = [];

    for (int i = 0; i < data.Count; i++)
    {
        try
        {
            var row = data[i].Split(',').Select(x => x.Replace("\"", "")).ToArray();

            #region 解析字串欄位
            string trx_seq = row[0]; // Linepay 定義的交易號碼
            string pay_status = row[16];
            string orderNo = row[20];
            DateTime scheduled_ymd = DateTime.TryParseExact(row[6], "yyyyMMdd", null, DateTimeStyles.None, out DateTime ymd) ? ymd : throw new Exception(); // 撥款日
            decimal pay_amount = decimal.TryParse(row[10], out decimal dmTemp) ? dmTemp : throw new Exception();
            decimal fee_amount = decimal.TryParse(row[11], out dmTemp)? dmTemp : throw new Exception();
            decimal tax_amount = decimal.TryParse(row[12], out dmTemp)? dmTemp : throw new Exception();
            decimal total_fee_amount = decimal.TryParse(row[13], out dmTemp)? dmTemp : throw new Exception();
            decimal scheduled_amount = decimal.TryParse(row[14], out dmTemp)? dmTemp : throw new Exception();
            #endregion


            #region 查詢現有對應資料
            // ... 其餘業務邏輯
            // 比對內部資料，異常就看怎麼處理
            #endregion
        }
        catch (Exception)
        {   
            // 系統(...DB)異常就先記錄起來
            failedRows.Add(data[i]);
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

```csharp
public async Task SaveRawDataToFile(string savedPath, string fileName, string [] data)
{
    // 寫入的資料(含標題)
    var linesToWrite = new List<string>();

    if (!string.IsNullOrEmpty(excludedLine))
        linesToWrite.Add(excludedLine);
    linesToWrite.AddRange(data);

    // 檔案名稱 && 檔案路徑
    Directory.CreateDirectory(savedPath);
    var filePath = Path.Combine(savedPath, $"{fileName}.csv");

    await File.WriteAllLinesAsync(filePath, linesToWrite, Encoding.UTF8);
}
```

### 4. 若還須提供靜態檔案給外部

在記錄對帳的表單欄位添加以下屬性，把資料庫當作SSOT
並且把 產出檔案 => 資料更新 包在同一個 Transaction
確認檔案產出再 Update 資料庫

```csharp
CreateDate = DateTime.Now,
Exported = false
FileName = null
```

```csharp
/// <summary>
/// 產檔處理
/// </summary>
public async Task GenerateStaticFile(string storeID)
{
    List<CfReconciliation> result = await _db.CfReconciliation
        .Where(x => x.StoreID == storeID)
        .Where(x => x.exported == false)
        .ToListAsync();

    try
    {
        // 1. 先準備 CSV 內容
        var linesToWrite = new List<string>();

        // 加入標頭（依你的需求調整）
        linesToWrite.Add("Column1,Column2,Column3");

        // 加入資料列
        foreach (var data in result)
        {
            linesToWrite.Add($"{data.StoreID},{data.SeqNo},......");
        }

        // 2. 確保目錄存在並寫入檔案
        var savedPath = "TEMP_PATH";
        var fileName = $"TEST_{DateTime.Now:MMddHHmmss}";
        Directory.CreateDirectory(savedPath);
        var filePath = Path.Combine(savedPath, $"{fileName}.csv");

        await File.WriteAllLinesAsync(filePath, linesToWrite, Encoding.UTF8);

        // 3. 檔案寫入成功後，才更新資料庫
        foreach (var data in result)
        {
            data.exported = true;
            data.exportedTime = DateTime.Now;
            data.exportedFileName = fileName;
        }

        await _db.SaveChangesAsync();

        _logger.LogInformation($"產檔成功: {filePath}");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"產檔失敗: StoreID=test");
        throw;
    }
}
```