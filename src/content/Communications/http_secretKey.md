---
title: "Http 加密與簽名驗證"
date: "2025-09-23"
category: "software"
subCategory: "Communications"
tags: ["Http", "tcp", "backend"]
slug: "http_secretKey"
---
###### 紀錄一些加密的選擇
---

HTTPS 能保護傳輸過程不被竊聽或竄改，但無法確認「請求來自誰」。簽名驗證的目的是讓接收方能確認：

1. **來源身份**：請求確實來自授權的發送方
2. **內容完整**：請求內容沒有被竄改
3. **防止重放**：加入時間戳，避免攻擊者截取請求後重複發送

### HMAC-SHA256 簽名驗證

雙方約定使用同一組 Key 和演算法產生簽名，接收方重新計算後比對是否一致，注意這是雜湊（Hash）比對，不是加密解密。

#### 流程

1. 雙方私下約定一組 Secret Key
2. 發送方用 `HMAC-SHA256(timestamp + secretKey)` 產生簽名
3. 發送方在 Header 帶上簽名和時間戳
4. 接收方用相同方式產生簽名，比對是否一致
5. 檢查時間戳是否在有效範圍內（防止重放攻擊）

#### 發送方

```js
const timestamp = Math.floor(Date.now() / 1000).toString()
const signature = HMAC_SHA256(timestamp + secretKey)

// Headers
// X-Signature: signature
// X-Timestamp: timestamp
```

#### 接收方

```csharp
private bool ValidateSignature(string timestamp, string receivedSignature)
{
    var secretKey = _configuration["ApiSecurity:SecretKey"];
    if (string.IsNullOrEmpty(secretKey))
    {
        _logger.LogError("未設定 SecretKey");
        return false;
    }

    // 先驗證時間戳
    if (!ValidateTimestamp(timestamp))
    {
        _logger.LogWarning("時間戳已過期");
        return false;
    }

    // 用相同方式產生簽名
    var dataToSign = timestamp + secretKey;
    var expectedSignature = ComputeHmacSha256(dataToSign, secretKey);

    // 比對簽名是否一致（不是解密）
    return expectedSignature.Equals(receivedSignature, StringComparison.OrdinalIgnoreCase);
}

private string ComputeHmacSha256(string data, string key)
{
    using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key));
    var hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
    return Convert.ToHexString(hashBytes).ToLower();
}

private bool ValidateTimestamp(string timestamp)
{
    if (!long.TryParse(timestamp, out var requestTime))
        return false;

    var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
    var maxDifference = 3 * 60; // 3 分鐘

    return Math.Abs(currentTime - requestTime) <= maxDifference;
}
```

---

### RSA 非對稱加密

接收方產生一對公私鑰，將公鑰交給發送方。金鑰值是由 RSA 演算法生成一對【Private / Public】Key，接收方用私鑰解密和辨識。

實作:

1. 接收方產生 RSA 金鑰對，將 Public Key 提供給發送方
2. 發送方用 Public Key 加密 `ServerName|Timestamp` 後放到 Header
3. 接收方用 Private Key 解密，取得內容
4. 驗證 ServerName 是否在允許清單、Timestamp 是否有效

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

---

### 選擇

- 內部服務互相呼叫 → HMAC-SHA256，簡單快速
- 對外開放 API、多個第三方接入 → RSA，每個第三方可以有自己的識別，不用共享同一把 Key
- 更嚴謹的場景 → 可以考慮 JWT 或 OAuth 2.0，有更完整的標準規範
