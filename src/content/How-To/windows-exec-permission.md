---
title: "Windows 執行權限與安全攔阻"
date: "2026-07-22"
category: "software"
subCategory: "How-To"
tags: ["windows", "smartscreen", "motw", "wdac", "signtool", "powershell"]
slug: "windows-exec-permission"
---

###### 了解一下 exe 執行權限

---

Windows 阻擋 exe 有三套獨立機制(2026)：

| 機制 | 判斷依據 | 典型畫面 |
|---|---|---|
| SmartScreen | 微軟雲端信譽 + 檔案的網路來源標記（MOTW）| 藍色全螢幕「Windows 已保護您的電腦」 |
| UAC | 有沒有數位簽章、發行者是否已知 | 黃色/藍色「使用者帳戶控制」，發行者「不明」 |
| WDAC / App Control | 系統管理員定義的白名單政策 | 直接無法執行、被政策封鎖 |

先看畫面對到哪一層，再往下找對應解法。

---

### 簡易判斷是哪層在擋

- 藍色滿版、標題「Windows 已保護您的電腦」、只有「不要執行 / 仍要執行」——SmartScreen，走下面的 MOTW 解法
- 跳出 UAC 提權視窗、發行者顯示「不明的發行者」——簽章問題，走 signtool
- 程式直接被擋、事件記錄出現 CodeIntegrity——WDAC 政策，一般公司環境用不到

最容易誤判的是把 SmartScreen 當成「憑證不被信任」。SmartScreen 看的是雲端信譽與檔案來源，跟你有沒有簽章、憑證受不受本機信任完全無關。自製憑證、幫每台裝憑證、WDAC 政策，對那面藍色警告一律無效。

---

### SmartScreen：清掉 Mark-of-the-Web

SmartScreen 藍屏的原因是檔案身上帶了「網路來源標記」（Mark-of-the-Web, MOTW）。這個標記在檔案「抵達」電腦當下被貼上，跟怎麼傳過來的有關：

| 傳輸方式 | 會不會被貼標記 |
|---|---|
| USB 隨身碟 / 本機複製 | 通常不會 → 不跳 |
| 內網檔案伺服器 `\\伺服器\分享` | 看區域設定：當內部網路不貼、當網際網路會貼 |
| 網頁 / email / 通訊軟體下載 | 一定貼 → 跳 |

這個最好處理，以系統管理員開 PowerShell 清掉標記：

```powershell
# 單一檔案
Unblock-File -Path "C:\你放程式的資料夾\MyApp.exe"

# 整個資料夾一次清
Get-ChildItem "C:\你放程式的資料夾" -Recurse | Unblock-File
```

滑鼠版：對 exe 按右鍵 → 內容 → 一般頁籤最下面勾「解除封鎖」→ 確定。

檢查某顆檔到底有沒有標記：

```powershell
Get-Content "路徑\檔名.exe" -Stream Zone.Identifier -ErrorAction SilentlyContinue
# 有內容 = 有標記會跳；沒輸出 = 乾淨不跳
```

---

### UAC：幫 exe 簽章

UAC 就是程式要提權時跳出來問「要不要允許」的視窗，它會顯示程式的發行者：沒簽章時是黃底「不明的發行者」，看起來像病毒；簽了章就變成藍底 + 你憑證上的名字。所以幫 exe 簽章的目的不是取得執行權限，而是讓 UAC 顯示你的名字，而不是「不明」。

一張程式碼簽章憑證其實是一對鑰匙加一個身分名稱：

| 東西 | 角色 | 保管 |
|---|---|---|
| 私鑰（在 `.pfx` 裡）| 拿來「蓋章」，簽 exe 用 | 機密，只有你能有 |
| 公鑰 + 名稱 | 別人拿來「驗章」，確認是你簽的、檔案沒被改過 | 跟著簽章附在 exe 裡 |

簽章的動作實際做兩件事：先算出 exe 的雜湊（指紋），用私鑰加密塞進檔案；Windows 執行時再用公鑰解開、比對現在的檔案指紋。對得上就同時證明了「是這張憑證簽的」和「檔案一個 byte 都沒被動過」。

先產一張自簽的程式碼簽章憑證：

```powershell
$cert = New-SelfSignedCertificate `
  -Type CodeSigningCert `
  -Subject "CN=MyCompany Code Signing" `
  -KeyAlgorithm RSA -KeyLength 4096 -HashAlgorithm SHA256 `
  -CertStoreLocation "Cert:\CurrentUser\My" `
  -NotAfter (Get-Date).AddYears(10)

$pwd = ConvertTo-SecureString -String "換成你的強密碼" -Force -AsPlainText
Export-PfxCertificate -Cert $cert -FilePath "C:\certs\CompanyCodeSign.pfx" -Password $pwd
```

用 `signtool`（隨 Windows SDK 附帶）簽章並加時間戳記，時間戳記讓憑證過期後舊簽章仍有效：

```powershell
signtool sign `
  /fd SHA256 `
  /f "C:\certs\CompanyCodeSign.pfx" `
  /p "換成你的強密碼" `
  /tr http://timestamp.digicert.com /td SHA256 `
  "C:\deploy\MyApp.exe"

signtool verify /pa /v "C:\deploy\MyApp.exe"
```

`.pfx` 含私鑰，等於公司萬能簽章鑰匙，上鎖保管、限最少人接觸。

簽完之後這張憑證帶來三個功能：

- 身分證明：UAC 視窗、以及檔案內容 → 數位簽章頁籤，都會顯示是你發行的，不再是「不明的發行者」
- 防竄改：只要有人改過這支 exe 一個 byte，指紋對不上，簽章立刻失效顯示「已損毀」，等於幫檔案封了封條
- 時間戳記：`/tr` 蓋的簽署時間公證，讓憑證日後過期，舊 exe 的簽章仍然有效，不用回頭重簽

但要注意它不能做什麼，這正是最容易誤會的地方：

- 對 SmartScreen 藍屏無效：SmartScreen 看的是微軟雲端信譽（要商業憑證加累積下載量才會被信任），自製憑證累積不了信譽
- 因為是自簽（self-signed），別台電腦的「受信任的根憑證授權」清單裡沒有你，UAC 上名字旁仍可能帶警示，除非另外把公開憑證 `.cer` 推到每台機器的信任清單

一句話：簽章是給 exe 一張可驗證、防竄改的身分證，主要治的是 UAC 的「不明發行者」，不是藍色的 SmartScreen。

---

### WDAC

WDAC（新稱 App Control for Business）是系統管理員的程式白名單政策。它能建立「信任這張憑證」的規則，但這是整台設備的執行控管，有內建一些預設值，單一 exe 不好處理。例如:

- 轉強制模式會把 Chrome、LINE、甚至 Windows 系統程式一起封鎖
- Audit 模式雖然只記錄不封鎖，但開機需逐一評估所有程式會明顯拖慢開機

若真的套過政策要還原，用系統管理員 PowerShell 移除，重開機即復原：

```powershell
citool --list-policies                          # 查目前套用的政策與 ID
citool --remove-policy "{政策的-GUID}"          # 移除自訂政策
```
