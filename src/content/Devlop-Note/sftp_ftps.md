---
title: "SFTP、FTPS C# 連線測試"
date: "2025-10-01"
category: "software"
subCategory: "開發筆記"
tags: ["tcp", "ip", "container"]
slug: "sftp_ftps"
---
###### 紀錄本地端測試方法

---

### SFTP

docker-compose.yml

```yml
services:
  sftp:
    image: atmoz/sftp
    container_name: sftp-server
    ports:
      - "7070:22"
    volumes:
      - ./sftp-data:/home/user01/upload  # 本地資料夾同步掛載
      - ./sftp-config:/etc/sftp.d
    command: user01:password01:1001  # 用戶名:密碼:UID
    restart: unless-stopped
    environment:
      - SFTP_USERS=user01:password01:1001  # 設置 SFTP 用戶
```

```csharp
using Renci.SshNet;

/// _sftpIP = localhost
/// _sftpPort = 7070
/// _sftpAccount = user01
/// _sftpPassword = password01
using var sftpClient = new SftpClient(_sftpIP, _sftpPort, _sftpAccount, _sftpPassword); // 套件
await EnsureStftConnectedAsync(sftpClient); // Retries

private async Task EnsureStftConnectedAsync(SftpClient client)
{
    const int maxRetries = 3;

    for (int attempt = 1; attempt <= maxRetries; attempt++)
    {
        try
        {
            await Task.Run(() => client.Connect());

            if (client.IsConnected)
                return;
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

### FTPS

```Csharp
var ftpsClient = new FtpClient();
ftpsClient.Host = "127.0.0.1";
ftpsClient.Port = 9090;
ftpsClient.Credentials = new NetworkCredential("user01", "password01");
ftpsClient.Config.EncryptionMode = FtpEncryptionMode.None;
ftpsClient.Config.DataConnectionType = FtpDataConnectionType.PASV;
ftpsClient.Config.ConnectTimeout = 30000;
ftpsClient.Config.ReadTimeout = 30000;
ftpsClient.Config.LogToConsole = true;
ftpsClient.Connect();
```

docker-compose.yml

```yml
version: '3.8'

services:
  ftps:
    image: fauria/vsftpd
    container_name: ftps-server
    ports:
      - "9090:21"
      - "21100-21110:21100-21110"
    volumes:
      - ./ftps-data:/home/vsftpd/user01
    environment:
      - FTP_USER=user01
      - FTP_PASS=password01
      - PASV_MIN_PORT=21100
      - PASV_MAX_PORT=21110
      - SSL_ENABLE=NO
      - LOG_STDOUT=YES
      - WRITE_ENABLE=YES
      - CHROOT_LOCAL_USER=YES
      - REVERSE_LOOKUP_ENABLE=NO
      - PASV_ENABLE=YES           # 明確啟用 PASV
      - PORT_ENABLE=YES           # 也啟用 PORT 模式
    restart: unless-stopped
```

### 2SFTP+FTPS

```yml
version: '3.8'

services:
  # CashFlow SFTP Server (Port 6060)
  cashflow-sftp:
    image: atmoz/sftp
    container_name: cashflow-sftp-server
    ports:
      - "6060:22"
    volumes:
      - ./CashServer_Sftp:/home/cashflow  # 本地資料夾同步掛載
    command: cashflow:password01:1001  # 用戶名:密碼:UID
    restart: unless-stopped
    environment:
      - SFTP_USERS=cashflow:password01:1001

  # CashVendor SFTP Server (Port 7070)
  cashvendor-sftp:
    image: atmoz/sftp
    container_name: cashvendor-sftp-server
    ports:
      - "7070:22"
    volumes:
      - ./CashVendor_Sftp:/home/user01  # 本地資料夾同步掛載
    command: user01:password01:1002  # 用戶名:密碼:UID
    restart: unless-stopped
    environment:
      - SFTP_USERS=user01:password01:1002

  # CashVendor FTPS Server (Port 9090)
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
      - LOG_STDOUT=YES
      - WRITE_ENABLE=YES
      - CHROOT_LOCAL_USER=YES
      - REVERSE_LOOKUP_ENABLE=NO
      - PASV_ENABLE=YES
      - PORT_ENABLE=YES
    restart: unless-stopped

```
