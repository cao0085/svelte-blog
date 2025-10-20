---
title: "Http 加密"
date: "2025-09-23"
category: "software"
subCategory: "Internet"
tags: ["Http", "tcp", "backend"]
slug: "http_secretKey"
---

---

### SHA256 - 雙方同步加密

雙方約定使用同一組字串、演算法生成【HASH】當作簽名，一樣就當作比對成功

實作:

1. 雙方私下約定一組 KEY 都用 HMAC-SHA256 加密
2. 發送方在 Header 加入生成的【簽名】、【時間戳】，可以把【時間戳】當成是方便使用和驗證的變數
3. 接收方先拿明文的【時間戳】檢查是否在有效期間，接者用 KEY+TIME 生成簽名
4. 若產出值一樣就代表成功

```js
const secretKey = function HMAC-SHA256(TimeStemp + Key) // 產生密鑰
header : secretKey
header : TimeStemp
// https request -> Service Server
```

```csharp
// Service Server

private bool ValidateSignature(string timestamp, string receivedSignature)
{
    var secretKey = _configuration["ApiSecurity:SecretKey"]; // 發給對方的KEY
    if (string.IsNullOrEmpty(secretKey))
    {
        _logger.LogError("未設定 SecretKey");
        return false;
    }

    var dataToSign = timestamp + secretKey;
    var expectedSignature = ComputeHmacSha256(dataToSign, secretKey); // 用同一個加密演算法生成簽名

    // 比對有無一樣、不做解密
    return expectedSignature.Equals(receivedSignature, StringComparison.OrdinalIgnoreCase); 
}

/// <summary>
/// 計算 HMAC-SHA256 簽名
/// </summary>
private string ComputeHmacSha256(string data, string key)
{
    using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key));
    var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
    return Convert.ToHexString(hashBytes).ToLower();
}

```

### RSA - 約定加密

金鑰值是由RSA演算法生成一對【Private / Public】Key，雙方用KEY加解密和辨識。

實作:

1. 接收方私下提供一組 PublicKey 給發送方，自己維護一組 PrivateKey
2. 發送方用 PublicKey + RSA 去加密字串如 "ServerName|TimeStamp" 後把值放到 Header
3. 接收方拿到 Header 值後使用 PrivateKey + RSA 去解密取得 "ServerName|TimeStamp"
4. 接收方可以自己去驗證 ServerName 是否在名單 & TimeStamp 等邏輯

```csharp
public override void OnActionExecuting(ActionExecutingContext context)
{
    try
    {
        // 取得 Header 中的加密數據
        // 測試網址 https://www.devglan.com/online-tools/rsa-encryption-decryption
        if (!context.HttpContext.Request.Headers.TryGetValue("X-Encrypted-Data", out var encryptedHeader))
        {
            _logger.LogWarning("缺少必要的 Header: X-Encrypted-Data");
            context.Result = new UnauthorizedObjectResult(new { message = "缺少必要的驗證 Header" });
            return;
        }

        var encryptedData = encryptedHeader.ToString();

        // 解密並驗證
        if (!DecryptAndValidate(encryptedData))
        {
            _logger.LogWarning("解密驗證失敗");
            context.Result = new UnauthorizedObjectResult(new { message = "解密驗證失敗" });
            return;
        }
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "RSA 簽名驗證過程發生錯誤");
        context.Result = new StatusCodeResult(500);
    }

    base.OnActionExecuting(context);
}

/// <summary>
/// 驗證時間戳是否在有效範圍內 (3分鐘)
/// </summary>
private bool ValidateTimestamp(string timestamp)
{
    if (!long.TryParse(timestamp, out var requestTime))
        return false;

    var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    var timeoutMinutes = 3; // 固定3分鐘
    var maxDifference = timeoutMinutes * 60; // 轉換為秒

    return Math.Abs(currentTime - requestTime) <= maxDifference;
}

/// <summary>
/// 解密並驗證數據
/// </summary>
private bool DecryptAndValidate(string encryptedData)
{
    var privateKeyPath = _configuration["ApiSecurity:RSAPrivateKeyPath"];
    var privateKeyPem = File.ReadAllText(privateKeyPath!);
    var validServer = _configuration.GetSection("ApiSecurity:RSAValidServer").Get<string[]>();

    if (string.IsNullOrEmpty(privateKeyPem) || validServer == null || validServer.Length == 0)
    {
        _logger.LogError("未設定 RSA 私鑰、有效的公鑰列表");
        return false;
    }

    try
    {
        // 解密數據
        var decryptedText = DecryptRSA(encryptedData, privateKeyPem);
        if (string.IsNullOrEmpty(decryptedText))
        {
            _logger.LogWarning("RSA 解密失敗");
            return false;
        }

        // 解析解密後的數據 (格式: ServerStr|timestamp)
        if (!ParseDecryptedData(decryptedText, out string publicKey, out string timestamp))
        {
            _logger.LogWarning("解密數據格式錯誤");
            return false;
        }

        // 驗證時間戳
        if (!ValidateTimestamp(timestamp))
        {
            _logger.LogWarning($"時間戳驗證失敗: {timestamp}");
            return false;
        }

        // 驗證公鑰是否為我方發行
        if (!ValidatePublicKey(publicKey, validServer))
        {
            _logger.LogWarning("公鑰驗證失敗，非我方發行");
            return false;
        }

        return true;
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "RSA 解密驗證過程發生錯誤");
        return false;
    }
}

/// <summary>
/// RSA 解密
/// </summary>
private string DecryptRSA(string encryptedData, string privateKeyPem)
{
    try
    {
        var encryptedBytes = Convert.FromBase64String(encryptedData);

        using var rsa = RSA.Create();
        rsa.ImportFromPem(privateKeyPem);

        var decryptedBytes = rsa.Decrypt(encryptedBytes, RSAEncryptionPadding.Pkcs1);
        return Encoding.UTF8.GetString(decryptedBytes);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "RSA 解密失敗");
        return string.Empty;
    }
}

/// <summary>
/// 解析解密後的數據
/// </summary>
private bool ParseDecryptedData(string decryptedText, out string publicKey, out string timestamp)
{
    publicKey = string.Empty;
    timestamp = string.Empty;
    try
    {
        // 格式為: ServerStr|timestamp
        var parts = decryptedText.Split('|');
        if (parts.Length != 2)
        {
            return false;
        }

        publicKey = parts[0];
        timestamp = parts[1];
        return true;
    }
    catch
    {
        return false;
    }
}

/// <summary>
/// 驗證公鑰是否為我方發行
/// </summary>
private bool ValidatePublicKey(string publicKey, string[] validPublicKeys)
{
    return validPublicKeys.Contains(publicKey);
}
```
