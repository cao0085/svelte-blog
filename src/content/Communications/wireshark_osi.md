---
title: "拆解 OSI 七層"
date: "2026-07-28"
category: "software"
subCategory: "Communications"
tags: ["osi", "wireshark", "tshark", "tcp", "network"]
slug: "tshark_osi"
---
###### 在 Docker container 裡用 tshark 抓一個真實封包，把 OSI 七層攤開

---

### 抓一次真實的 HTTP 交易

用 HTTP 而非 HTTPS，這樣應用層才會是明文。一邊背景側錄 `eth0`，一邊送出請求：

```bash
# 只抓 DNS(53) 與 HTTP(80)，最多側錄 10 秒
tshark -i eth0 -a duration:10 -w /tmp/osi.pcap -f "udp port 53 or tcp port 80" &
sleep 2
curl -H "Connection: close" http://example.com -o /dev/null
```

先看協定階層統計，分層的縮影一目了然：

```bash
tshark -r /tmp/osi.pcap -q -z io,phs
```

```text
eth                    frames:14
  ip                   frames:14
    udp                frames:4
      dns              frames:4      ← L7 名稱解析
    tcp                frames:10
      http             frames:2      ← L7 應用資料
```

---

### 封裝

看任一個 HTTP 封包最關鍵的一行：

```bash
tshark -r /tmp/osi.pcap -V -Y "http.request"
```

```text
[Protocols in frame: eth : ip : tcp : http]
```

由外到內層層包起來，這就是 encapsulation。對應到 OSI：

```text
┌─ L7 應用層  HTTP  ─────────────────────────────────┐
│  GET / HTTP/1.1   Host: example.com                │  你真正想做的事
│  ┌─ L4 傳輸層  TCP ──────────────────────────────┐ │
│  │  Src Port 53470 → Dst Port 80   Seq/Ack/Flags │ │  哪個程式對哪個服務
│  │  ┌─ L3 網路層  IPv4 ───────────────────────┐  │ │
│  │  │  172.17.0.2 → 104.20.23.154            │  │ │  跨網路找到主機
│  │  │  ┌─ L2 資料連結層  Ethernet ─────────┐  │  │ │
│  │  │  │  MAC fa:9c:3d.. → 1a:06:68..      │  │  │ │  同網段硬體定址
│  │  │  │  ┌─ L1 實體層 ─────────────────┐  │  │  │ │
│  │  │  │  │ 159 bytes (1272 bits) on wire│  │  │  │ │  位元 / 訊號
│  │  │  │  └──────────────────────────────┘  │  │  │ │
└──┴──┴──┴─────────────────────────────────────┴──┴──┴─┘
```

| OSI 層 | 封包裡實際看到的欄位 | 職責 |
|--------|--------------------|------|
| L7 應用層 | `GET / HTTP/1.1`、`Host:` | 應用協定（HTTP/DNS/FTP） |
| L6 表現層 | *(純 HTTP 無，見 TLS)* | 加密、編碼、壓縮 |
| L5 會談層 | *(HTTP 合併於上層)* | 建立/管理會談 |
| L4 傳輸層 | `TCP Port 53470 → 80`、Seq/Ack | 埠號、可靠傳輸、切段 |
| L3 網路層 | `IPv4 172.17.0.2 → 104.20.23.154` | 邏輯位址與繞送 |
| L2 資料連結層 | `Ethernet MAC …f7:22 → …f6:24` | 同網段硬體定址 |
| L1 實體層 | `159 bytes on wire (1272 bits)` | 位元、訊號、纜線 |

> 實務抓包看到的其實是 **TCP/IP 四層模型**，OSI 的 L5/L6/L7 通常合併成「應用層」。想看到獨立的 L6（加密/表現層），就抓 HTTPS，會多出一層 `TLS`。

---

### 範例

把上面那個 `GET /` 封包用 `tshark -V` 完整攤開，由外到內一層一層看。可以把整趟傳輸想像成寄一封掛號信：

#### Frame — 信封上的郵戳（元資料，不屬於任何一層）

```text
Frame 8: 159 bytes on wire (1272 bits), 159 bytes captured on interface eth0
    Arrival Time: Jul 28, 2026 06:41:22.669676868 UTC
    [Time delta from previous captured frame: 0.000150860 seconds]
    [Protocols in frame: eth:ethertype:ip:tcp:http]
```

這一段是 Wireshark 自己貼上去的標籤，不是網路上真的傳的資料。

- **`159 bytes on wire (1272 bits)`**：這封包在網路線上實際佔了 159 byte（× 8 = 1272 個 bit）。這個「bit 數」對應的就是 **L1 實體層**——最後一切都化為電/光訊號的 0 與 1。
- **`Arrival Time` / `Time delta`**：抵達時間、距上一個封包多久。分析延遲、卡頓時最先看這裡。
- **`Protocols in frame: eth:ethertype:ip:tcp:http`**：整顆洋蔥由外到內包了哪幾層——**這一行是全篇的地圖**。

#### L2 資料連結層 — 這一段路的郵差（MAC）

```text
Ethernet II, Src: fa:9c:3d:fa:f7:22, Dst: 1a:06:68:58:f6:24
    Type: IPv4 (0x0800)
```

負責把封包在**同一段實體網路內**，從一張網卡送到「下一跳」的網卡，靠的是 MAC 位址。

- **`Src` / `Dst` MAC**：來源與目的的硬體位址（48 bit，出廠燒在網卡上）。注意 Dst 不是 example.com 的伺服器，而是你 container 的閘道 —— 就像社區郵差只負責把信送到轉運站，不是直接送到外縣市。**每經過一個路由器，這對 MAC 就會被換掉一次。**
- **`Type: IPv4 (0x0800)`**：告訴收件端「拆開我之後，裡面裝的是 IPv4」，下一層才知道要用 IP 規則來解。

#### L3 網路層 — 信封上的地址（IP）

```text
Internet Protocol Version 4, Src: 172.17.0.2, Dst: 172.66.147.243
    Total Length: 145
    Flags: 0x2, Don't fragment
    Time to Live: 64
    Protocol: TCP (6)
```

負責讓封包能**跨越好幾個網段**，一路繞送到目的主機，靠的是 IP 位址。

- **`Src` / `Dst` Address**：`172.17.0.2`（你的 container）→ `172.66.147.243`（example.com）。
- **`Time to Live: 64`**：TTL。每經過一個路由器就減 1，歸零就丟棄。這是防止封包在網路裡**迷路繞圈**的保險絲。
- **`Flags: Don't fragment`**：這封信不准中途被拆成好幾片再重組。
- **`Protocol: TCP (6)`**：表示裡面裝的是 TCP，下一層用 TCP 解。

#### L4 傳輸層 — 掛號 + 收件人分機號碼（TCP）

```text
Transmission Control Protocol, Src Port: 52292, Dst Port: 80, Seq: 1, Ack: 1, Len: 93
    Flags: 0x018 (PSH, ACK)
    Window: 63  [Calculated window size: 64512]
    [iRTT: 0.064108805 seconds]
    TCP payload (93 bytes)
```

負責兩件事：**送到對的程式**（靠 Port），以及**保證可靠**（不丟、不亂序）。

- **`Src Port: 52292` → `Dst Port: 80`**：同一台主機上跑很多程式，Port 就像**公司總機後面的分機號碼**。`80` 是 HTTP 服務的分機；`52292` 是你這端 curl 臨時分到的分機。
- **`Seq` / `Ack`（序號 / 確認號）**：TCP 給每個 byte 編號，收到就回報「我收到第幾號了」。這就是**掛號信要簽收**的機制——沒簽收就重寄。
- **`Flags: PSH, ACK`**：`ACK`=同時在簽收對方的資料；`PSH`=「別在郵局囤著了，立刻把信交到收件人手上」（HTTP 請求要馬上送出）。沒有 `SYN`/`FIN`，代表這是連線**建立完成後、傳資料**的階段。
- **`Window: 64512`**：流量控制——「我現在還收得下 64512 byte，別一次灌爆我」。
- **`iRTT: 0.064 s`**：Wireshark 幫你算出的來回延遲，約 64 毫秒。
- **`TCP payload (93 bytes)`**：這段 TCP 載了 93 byte 資料——**就是下面那封 HTTP 信的全文**。

#### L7 應用層 — 信的內容（HTTP）

```text
Hypertext Transfer Protocol
    GET / HTTP/1.1\r\n
        Request Method: GET
        Request URI: /
        Request Version: HTTP/1.1
    Host: example.com\r\n
    User-Agent: curl/8.5.0\r\n
    Accept: */*\r\n
    Connection: close\r\n
    \r\n
```

這才是你**真正想做的事**。前面所有層都只是為了把這幾行字，安全準時地送到對方手上。HTTP 本質就是一段格式化的純文字：

| 內容 | 意義 |
|------|------|
| `GET / HTTP/1.1` | 請求行：方法 `GET`、路徑 `/`、版本 1.1 |
| `Host: example.com` | 要哪個網站（一個 IP 可掛多站，靠這行區分） |
| `User-Agent: curl/8.5.0` | 我是誰（客戶端軟體） |
| `Accept: */*` | 我能接受任何格式的回應 |
| `Connection: close` | 回應完就關連線 |
| `\r\n`（空行） | 標頭結束的標記，之後才是 body（GET 無 body，到此結束） |

#### 由上而下，一次讀懂

> curl 想送 `GET /`（**L7**）→ 交給 TCP 貼上「分機 80、掛號、序號」（**L4**）→ 交給 IP 寫上「寄到 172.66.147.243、TTL 64」（**L3**）→ 交給 Ethernet 填上「下一跳郵差的 MAC」（**L2**）→ 化成 1272 個 bit 送上線（**L1**）。對方收到後，反過來一層一層拆開，最後讀到那封信。

---

### 封包的三個主階段

看封包清單：

```bash
tshark -r /tmp/osi.pcap
```

**1. TCP 三向交握（連線建立）** — 封包 5、6、7：

| # | 方向 | 旗標 | 意義 |
|---|------|------|------|
| 5 | 53470 → 80 | `SYN` | 我想連線 |
| 6 | 80 → 53470 | `SYN, ACK` | 好，我也準備好 |
| 7 | 53470 → 80 | `ACK` | 確認，開始 |

**2. DNS 名稱解析（L7）** — 封包 1~4：先問 `example.com 的 IP`，拿到 `104.20.23.154`，才有後面的連線。這解釋了「網址」怎麼變成 L3 的 IP。

**3. 四向揮手（連線關閉）** — 封包 12、13、14 的 `FIN, ACK`。

---

### DNS 與 CDN：網址怎麼變成 IP

L3 靠 IP 找主機，但你只記得住 `example.com`。**把網域名稱翻成 IP 的查號服務，就是 DNS。** 回頭看最早抓的 `/tmp/osi.pcap`，封包 1~4 就是完整過程：

```text
封包 1  你 → DNS伺服器   「example.com 的 A 紀錄（IPv4）是多少？」   ← 查詢
封包 3  DNS伺服器 → 你   「A: 104.20.23.154, 172.66.147.243」        ← 回答
```

- **先 DNS、後連線**：一定是先查到 IP，才有後面那條 TCP 連線——這就是為什麼抓包裡 DNS（1~4）永遠排在 HTTP 連線（5 起）前面。
- **答案有保存期限（DNS TTL）**：每筆回應附一個存活秒數，這段時間內直接用快取、不重查。

**一個網域可以綁多個 IP**（DNS 裡放多筆 A 紀錄），這就帶出 CDN：

> **CDN（內容傳遞網路）** 把同樣的內容複製到全球數百個節點，DNS 查詢時**看你從哪來，回你最近的節點 IP**。所以同一個 `example.com`，兩次抓包會拿到不同 IP（`104.20.23.154` / `172.66.147.243`）——它們是同一個網站的不同「分店」，都是 Cloudflare 這家 CDN 的位址。這也是為什麼「連同一個網站、走的路徑卻可能不同」。

---

### HTTPS：中間多出來的 L6（TLS）

前面的 HTTP 看得到明文，是因為沒有加密層。把同樣的請求改抓 HTTPS，協定階層就會多一層 `tls`：

```bash
tshark -i eth0 -a duration:10 -w /tmp/tls.pcap -f "tcp port 443" &
sleep 2
curl -H "Connection: close" https://example.com -o /dev/null
tshark -r /tmp/tls.pcap -q -z io,phs
```

```text
HTTP:   eth : ip : tcp : http           ← 應用資料明文可讀
HTTPS:  eth : ip : tcp : tls : (http)    ← TCP 與 HTTP 之間插入 TLS，http 被藏進加密裡
```

這層 `tls` 就是 OSI **第 6 層表現層（Presentation）** 的實作——負責加密、解密與編碼。信封（IP）、掛號分機（TCP）都沒變，只是**把信的內容裝進了保險箱**。

#### 逐欄解讀：Client Hello（開箱前的暗號交換）

TLS 連線的頭幾個訊息是**明文**的——因為金鑰還沒協商出來，只能先亮出底牌。這也是抓 HTTPS 時唯一看得到明碼的地方：

```text
Transmission Control Protocol, Src Port: 38896, Dst Port: 443, Seq: 1, Ack: 1, Len: 517
Transport Layer Security
    TLSv1 Record Layer: Handshake Protocol: Client Hello
        Content Type: Handshake (22)
        Version: TLS 1.0 (0x0301)
        Handshake Protocol: Client Hello
            Version: TLS 1.2 (0x0303)
            Random: 51ce9d2eadd662e2...1a400810
            Cipher Suites (31 suites)
            Extension: server_name (len=16) name=example.com
            Extension: supported_versions  TLS 1.3, TLS 1.2
```

- **`Dst Port: 443`**：對照 HTTP 的 80，HTTPS 走 443——分機號碼換了，但它仍然只是 L4 的欄位，TLS 是疊在 TCP 上面的。
- **`Content Type: Handshake (22)`**：這是「握手」訊息，還沒進入加密。
- **`Handshake Protocol: Client Hello`**：客戶端開場白——「我想跟你建立加密連線」。
- **`Random`**：32 byte 亂數，是稍後**衍生對稱金鑰**的材料之一（雙方各出一份，湊起來算金鑰）。
- **`Cipher Suites (31 suites)`**：我會的加密演算法清單，攤開讓伺服器挑一個雙方都會的——像**先對暗號**，確認彼此講同一種密語。
- **`supported_versions: TLS 1.3, TLS 1.2`**：我支援的 TLS 版本，讓對方選最高的（這裡會協商到 1.3）。
- **`server_name: example.com`（SNI）**：告訴伺服器我要連哪個網站（一個 IP 掛多站時靠這個區分）。**注意這欄仍是明文**——所以旁觀者**知道你連了哪個域名，但看不到你在上面做什麼**。

#### 從明文切換到加密的那一刻

看同一條連線裡 `Content Type` 的變化，就是「保險箱上鎖」的完整過程：

| 封包 | Content Type | 訊息 | 狀態 |
|------|-------------|------|------|
| 72 | `22` Handshake | Client Hello（對暗號、換金鑰材料） | 🔓 明文 |
| 74 | `22, 20` | Server Hello + **Change Cipher Spec** | 🔑 切換點 |
| 80 起 | `23` Application Data | 你的 `GET /`、伺服器的 HTML | 🔒 全加密 |

`Change Cipher Spec (20)` 就是那句「**從下一個封包開始，全部上鎖**」。之後所有 `Application Data (23)` 抓包只看得到密文長度，看不到內容。

> **最直接的證據**：對整個 HTTPS 抓包下 `-Y "http"` 過濾，符合的封包數是 **0**。HTTP 明明發生了，卻被 L6 完全藏起來——這就是表現層存在的意義。

#### 由上而下，一次讀懂（HTTPS 版）

> curl 想送 `GET /`（**L7**）→ 交給 **TLS 加密成密文（L6）** → 交給 TCP 貼上分機 443、掛號（**L4**）→ IP 繞送（**L3**）→ Ethernet 送到下一跳（**L2**）→ 位元上線（**L1**）。跟 HTTP 相比**唯一的差別就是多插了 L6**，其餘完全一樣——這正好印證分層精神：**TCP 根本不在乎上面裝的是明文還是密文，照送不誤。**