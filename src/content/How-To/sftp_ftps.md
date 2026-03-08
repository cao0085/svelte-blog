---
title: "測試 SFTP / FTPS"
date: "2025-10-01"
category: "software"
subCategory: "How-To"
tags: ["sftp", "ftps", "docker", "csharp"]
slug: "sftp-ftps-local-test"
---
###### 公司測試區進出驗證資料沒有很方便，用 Docker 在本地起 SFTP / FTPS Server 比較好開發。
---

### SFTP

SSH 加密通道傳輸，Port 22，較普遍

**docker-compose.yml**
```yml
services:
  sftp:
    image: atmoz/sftp
    container_name: sftp-server
    ports:
      - "7070:22"
    volumes:
      - ./sftp-data:/home/user01/upload
    command: user01:password01:1001   # 用戶名:密碼:UID
    restart: unless-stopped
```

**C#（SSH.NET）**
```csharp
using Renci.SshNet;

using var client = new SftpClient("localhost", 7070, "user01", "password01");
await EnsureSftpConnectedAsync(client);

private async Task EnsureSftpConnectedAsync(SftpClient client)
{
    const int maxRetries = 3;
    for (int attempt = 1; attempt <= maxRetries; attempt++)
    {
        try
        {
            await Task.Run(() => client.Connect());
            if (client.IsConnected) return;
        }
        catch (Exception ex)
        {
            if (attempt == maxRetries)
                throw new Exception($"SFTP 連線失敗，已重試 {maxRetries} 次: {ex.Message}");
            await Task.Delay(1000);
        }
    }
}
```

---

### FTPS

FTP + TLS/SSL，Port 21，部分舊系統採用，需注意 Passive Mode Port 範圍

**docker-compose.yml**
```yml
services:
  ftps:
    image: fauria/vsftpd
    container_name: ftps-server
    ports:
      - "9090:21"
      - "21100-21110:21100-21110"   # Passive Mode Port 範圍
    volumes:
      - ./ftps-data:/home/vsftpd/user01
    environment:
      - FTP_USER=user01
      - FTP_PASS=password01
      - PASV_MIN_PORT=21100
      - PASV_MAX_PORT=21110
      - SSL_ENABLE=NO
      - PASV_ENABLE=YES
      - PORT_ENABLE=YES
      - WRITE_ENABLE=YES
      - CHROOT_LOCAL_USER=YES
      - REVERSE_LOOKUP_ENABLE=NO
    restart: unless-stopped
```

**C#（FluentFTP）**
```csharp
var client = new FtpClient
{
    Host = "127.0.0.1",
    Port = 9090,
    Credentials = new NetworkCredential("user01", "password01")
};
client.Config.EncryptionMode = FtpEncryptionMode.None;
client.Config.DataConnectionType = FtpDataConnectionType.PASV;
client.Config.ConnectTimeout = 30000;
client.Connect();
```

---

### 多個 Server

需要同時模擬多個金流商連線時，可在同一個 compose 檔定義多個 service：

```yml
services:
  cashflow-sftp:
    image: atmoz/sftp
    container_name: cashflow-sftp-server
    ports:
      - "6060:22"
    volumes:
      - ./CashServer_Sftp:/home/cashflow
    command: cashflow:password01:1001

  cashvendor-sftp:
    image: atmoz/sftp
    container_name: cashvendor-sftp-server
    ports:
      - "7070:22"
    volumes:
      - ./CashVendor_Sftp:/home/user01
    command: user01:password01:1002

  cashvendor-ftps:
    image: fauria/vsftpd
    container_name: cashvendor-ftps-server
    ports:
      - "9090:21"
      - "21100-21110:21100-21110"
    volumes:
      - ./CashVendor_Ftps:/home/vsftpd/user01
    environment:
      - FTP_USER=user01
      - FTP_PASS=password01
      - PASV_MIN_PORT=21100
      - PASV_MAX_PORT=21110
      - SSL_ENABLE=NO
      - PASV_ENABLE=YES
      - WRITE_ENABLE=YES
      - CHROOT_LOCAL_USER=YES
      - REVERSE_LOOKUP_ENABLE=NO
    restart: unless-stopped
```
