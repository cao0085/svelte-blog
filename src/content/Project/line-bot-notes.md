---
title: "LINE Bot 架構筆記"
date: "2026-07-23"
category: "software"
subCategory: "Side Project"
tags: ["line-bot", "webhook", "serverless"]
slug: "line-bot-notes"
---

###### 第一次做 Line Bot 紀錄一下實作。

---

這次 Data 和 Endpoint 都跑在 Cloudflare 上。

### Webhook

Bot 對 LINE 平台來說**只有一個 URL**。

```markdown
POST https://your-domain/callback
```

不管使用者傳什麼字，LINE 全部 POST 到這**同一個** `/callback`。所以「關鍵字」不是 endpoint、也不會改變 URL——它只是 request body 裡的一個欄位值：

```json
{
  "events": [{
    "type": "message",
    "replyToken": "abcd1234...",
    "source": { "userId": "U..." },
    "message": { "type": "text", "text": "使用者輸入的字" }
  }]
}
```

就是把分流（routing）變成在程式內部實作，讀 `events[].message.text` 用 if/else/switch 來處理不同 case。

### 反向的 API

webhook 跟一般 API 用的東西完全一樣（HTTP、JSON、POST），差別只在誰是發起者：

| | 一般 API | Webhook |
|---|---|---|
| 誰發起 | 你的程式打別人 | 別人（LINE）打你的程式 |
| 你的角色 | client | server |
| 說法 | 我去 call API | 我提供 endpoint 等被 call |

所以 webhook 常被講成 "reverse API" 或 "don't call us, we'll call you"。使用者跟 LINE 之間的長連線、收訊息、判斷該通知哪個帳號，這些「監聽」由 LINE 處理，開發者只要準備好一個 endpoint。這也是為什麼 webhook 特別適合 serverless 架構。

### Reply & Push

Bot 回訊息有兩種主要方式：

| 方式 | 觸發條件 | 計費 |
|---|---|---|
| **Reply** | 使用者剛傳訊息（帶 `replyToken`） | **免費** |
| **Push** | 你主動推給使用者 | 計費（按則） |

查詢型 Bot（使用者問一句、你答一句）幾乎都能靠 reply 完成，可以完全落在免費方案裡。只有「非同步通知」（例如事件發生後主動告知）才非用 push 不可，而 push 是按人頭按則計費，量大時要想辦法合併（例如每日彙整成一則）來壓成本。

### 實作注意

**1. `replyToken` 是一次性且有時效**

每則使用者訊息給你的 `replyToken` 只能用一次、且要在短時間內（約 1 分鐘）用掉。過期或重複使用就會失敗，所以要回應的訊息要在這一輪內組好送出。

**2. webhook 要「快速回 200」**

收到 POST 後要盡快回 `200 OK` 給 LINE，代表「我收到了」。實際要回覆內容是另一件事 —— 拿 `replyToken` 去打 LINE 的 reply API 送出。這兩件事是分開的：HTTP response 只是簽收，訊息是回打。如果在 handler 裡做太久才回 200，LINE 會判定逾時甚至重送。

**3. 一定要驗簽章**

因為 endpoint 是公開的，任何人都能對你的 `/callback` 亂打。LINE 每個請求都帶一個 `x-line-signature` header，要用 channel secret 做 HMAC 驗證，確認這個請求真的來自 LINE 才處理。

**4. 官方帳號的「自動回應」會造成雙重回覆**

LINE Official Account Manager 後台預設開著「自動回應訊息／歡迎訊息」，如果沒關掉，使用者傳一句話會同時收到 LINE 後台的罐頭回覆 + 你程式的回覆。

**5. 不是所有事件都是文字**

同一個 `/callback` 還會收到 `follow`（加好友）、`unfollow`（封鎖）、`postback`（按鈕）、`join`/`leave`（被拉進/踢出群組）、貼圖、圖片、位置……。用 `event.type` 先分類，別預設每個 event 都有 `message.text`。

### 小結

LINE Bot 了解文件後串接到 callback 後就滿好處理了，就是寫純粹的商業邏輯。
