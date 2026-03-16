---
title: "Message Queue 01 - Publishing"
date: "2026-03-11"
category: "software"
subCategory: "Backend"
tags: ["Queue", "Message", "RabbitMQ", "AMQP"]
slug: "message-queue-01"
---
###### 透過 RabbitMQ 學習 Message Queue

---

### 基本流程

通常套件會提供常見的參數轉成 AMQP 通訊協議格式

```go

// 1. 建立 Exchange
ch.ExchangeDeclare(
    "logs",    // name: Exchange 名稱
    "direct",  // type: 路由類型（direct/fanout/topic/headers）
    true,      // durable: 持久化，Server 重啟後還在
    false,     // autoDelete: 沒有 Queue 綁定時是否自動刪除
    false,     // internal: 是否為內部 Exchange（只能被其他 Exchange 路由）
    false,     // noWait: 是否等待 Server 確認
    nil,       // arguments: 額外參數
)

// 2. 建立 Queue
ch.QueueDeclare(
    "error-queue",  // name: Queue 名稱
    true,           // durable: 持久化
    false,          // autoDelete: 自動刪除
    false,          // exclusive: 專屬 Queue
    false,          // noWait: 不等待確認
    nil,            // arguments: 額外參數
)

// 3. 綁定
ch.QueueBind(
    "error-queue",  // queue: 要綁定的 Queue 名稱
    "error",        // binding key: 綁定的路由鍵
    "logs",         // exchange: 綁定到哪個 Exchange
    false,          // noWait: 不等待確認
    nil,            // arguments: 額外參數
)

// 4. 現在才能正常發送
ch.Publish(
    "logs",    // exchange: 發送到哪個 Exchange
    "error",   // routing key: 路由鍵，決定送到哪些 Queue
    false,     // mandatory: 找不到 Queue 時是否回傳錯誤
    false,     // immediate: 已棄用，保持 false
    amqp.Publishing{
        Body: []byte("這是錯誤訊息"),
    },
)
```

也就是說只要有連線 MQ Server 的主機，都可以宣告 Exchange / Queue，而當 Producer 和 Consumer 在不同伺服器上的時候。通常預設先啟動 Consumer 並宣告 Exchange 與 Queue 的關係，再由 Producer 去發佈事件。

### Publishing

Publishing 發送是單向且預設不等回應：

```md
Client → [Method + Header + Body] → RabbitMQ
                                      │
                                      └─ 沒有回應（預設）
```

RabbitMQ 收到後：解析 exchange name + routing key → 查找匹配的 queues → 訊息入列（FIFO）。如果 exchange 不存在，訊息靜默丟棄。

#### Direct Exchange

```go
ch.ExchangeDeclare(
    "logs",    // name: Exchange 名稱
    "direct",  // type: 路由類型（direct/fanout/topic/headers）
    true,      // durable: 持久化，Server 重啟後還在
    false,     // autoDelete: 沒有 Queue 綁定時是否自動刪除
    false,     // internal: 是否為內部 Exchange（只能被其他 Exchange 路由）
    false,     // noWait: 是否等待 Server 確認
    nil,       // arguments: 額外參數
)

// ... Consumer 綁定

ch.Publish("logs", "info", false, false, amqp.Publishing{
    Body: []byte("這是一般訊息"),
})
ch.Publish("logs", "warning", false, false, amqp.Publishing{
    Body: []byte("這是警告訊息"),
})

// === Consumer ===
// 只收 error
ch.QueueDeclare("error-queue", true, false, false, false, nil)
ch.QueueBind("error-queue", "error", "logs", false, nil)

// 收 error + warning
ch.QueueDeclare("alert-queue", true, false, false, false, nil)
ch.QueueBind("alert-queue", "error", "logs", false, nil)
ch.QueueBind("alert-queue", "warning", "logs", false, nil)
```

#### Fanout Exchange

```go
ch.ExchangeDeclare("notifications", "fanout", true, false, false, false, nil)

ch.Publish("notifications", "", false, false, amqp.Publishing{
    Body: []byte("新訂單 #12345"),
})

// === Consumer ===
ch.QueueDeclare("email-queue", true, false, false, false, nil)
ch.QueueBind("email-queue", "", "notifications", false, nil)

ch.QueueDeclare("sms-queue", true, false, false, false, nil)
ch.QueueBind("sms-queue", "", "notifications", false, nil)

ch.QueueDeclare("push-queue", true, false, false, false, nil)
ch.QueueBind("push-queue", "", "notifications", false, nil)
```

#### Topic Exchange

```golang
ch.ExchangeDeclare("events", "topic", true, false, false, false, nil)

ch.Publish("events", "order.created", false, false, amqp.Publishing{
    Body: []byte("訂單建立"),
})
ch.Publish("events", "order.paid", false, false, amqp.Publishing{
    Body: []byte("訂單付款"),
})
ch.Publish("events", "order.shipped", false, false, amqp.Publishing{
    Body: []byte("訂單出貨"),
})
ch.Publish("events", "user.registered", false, false, amqp.Publishing{
    Body: []byte("用戶註冊"),
})

// === Consumer ===
// 訂單服務：收所有 order.* 事件
ch.QueueDeclare("order-service", true, false, false, false, nil)
ch.QueueBind("order-service", "order.*", "events", false, nil)

// 通知服務：只收建立和註冊
ch.QueueDeclare("notification-service", true, false, false, false, nil)
ch.QueueBind("notification-service", "order.created", "events", false, nil)
ch.QueueBind("notification-service", "user.registered", "events", false, nil)

// Log 服務：收全部
ch.QueueDeclare("log-service", true, false, false, false, nil)
ch.QueueBind("log-service", "#", "events", false, nil)
```

#### Headers Exchange

```golang
ch.ExchangeDeclare("tasks", "headers", true, false, false, false, nil)

// 發送帶 header 的訊息
ch.Publish("tasks", "", false, false, amqp.Publishing{
    Headers: amqp.Table{
        "format": "pdf",
        "type":   "report",
    },
    Body: []byte("產生 PDF 報表"),
})

ch.Publish("tasks", "", false, false, amqp.Publishing{
    Headers: amqp.Table{
        "format": "excel",
        "type":   "report",
    },
    Body: []byte("產生 Excel 報表"),
})

// === Consumer ===
// PDF 處理器：只收 format=pdf
ch.QueueDeclare("pdf-processor", true, false, false, false, nil)
ch.QueueBind("pdf-processor", "", "tasks", false, amqp.Table{
    "x-match": "any",      // any = 任一符合, all = 全部符合
    "format":  "pdf",
})

// 報表處理器：收所有 type=report
ch.QueueDeclare("report-processor", true, false, false, false, nil)
ch.QueueBind("report-processor", "", "tasks", false, amqp.Table{
    "x-match": "all",
    "type":    "report",
})
```

### 保證層級

和資料庫交易隔離一樣，不同場景需要不同的**保證層級**來平衡效能：

#### 1. 無保證 - Fire-and-forget

發完就走不管成功與否，適合監控數據、日誌收集等非關鍵任務

#### 2. 強制路由 - Mandatory Flag

設定 `mandatory=true` 後，如果訊息無法路由到任何 queue，RabbitMQ 會回傳 `Basic.Return`，只能檢測「路由失敗」 不保證訊息已寫入 queue 或持久化。

```md
Publisher ──▶ Exchange ──✗──▶ (無匹配 queue)
                    │
                    └── Basic.Return ──▶ Publisher
```

#### 3. 發布者確認 - Publisher Confirms

這是 RabbitMQ 擴充，不是標準 AMQP，但會是多數場景的選擇:

- Ack 時機: 訊息被所有匹配的 queue 接收、已持久化、或已被 consumer 消費
- 非同步回傳，不保證何時收到
- 與 Transaction 互斥（不能同時用）
- 比 Transaction 快很多（Transaction 會讓吞吐量下降 250 倍）

#### 4. 交易 - Transactions

需要批次 all-or-nothing 的情況:

- 只有當所有訊息都送到「同一個 queue」時才是原子的
- 效能很差，每則訊息都要等 commit
- 與 `delivery-mode=2` 一起用更慢（要等磁碟 I/O）

*優先使用 Publisher Confirms，Transaction 只在特殊需求時使用*

### 錯誤處理

#### 備用交換機 - Alternate Exchange

用來處理無法路由的訊息，設定主要 exchange 的 `alternate-exchange` 參數，無法路由的訊息會轉發到備用 exchange。備用 exchange 通常設為 `fanout` 類型，綁定一個專門收集無法路由訊息的 queue。

```md
Publisher ──▶ Exchange ──✗──▶ (不匹配)
                    │
                    └──▶ Alternate Exchange ──▶ unroutable-messages queue
```

#### 高可用佇列 - HA Queues

讓 queue 資料複製到多個節點，防止單點故障。

```
訊息寫入 → 同步到所有節點
節點掛掉 → 副本自動升級為主節點
```

**設定方式**：
- `x-ha-policy: all`（複製到所有節點）
- `x-ha-policy: nodes` + `x-ha-nodes: [...]`（指定節點）

**注意**：HA Queue 保證的是「儲存層」可用性，不保證 publisher 發送成功（還是要用 confirms）。

#### 持久化 - Persistence

`delivery-mode=2` 讓訊息寫入磁碟，RabbitMQ 重啟後訊息還在，但非常消耗效能，完整持久化需要兩個條件:

  1. `delivery-mode = 2`（訊息持久化）
  2. Queue 宣告為 `durable = true`（Queue 持久化）

#### 背壓機制 - TCP Backpressure

當 Publisher 發太快，RabbitMQ 處理不過來時發生，RabbitMQ 使用 **Credit 機制** 類似連線池概念，如果經常觸發代表系統需要擴容。：
  
  1. 連線建立時分配 credits，每個請求消耗一個處理完歸還
  2. Credit 用完就停止讀取，Publisher 的 `send()` 會卡住。

### 最高可靠性組合

```md
Publisher Confirms + delivery-mode=2 + HA Queue + Durable Queue
        │                  │              │            │
        │                  │              │            └── Queue 重啟後還在
        │                  │              └── 節點故障不丟訊息
        │                  └── 訊息寫入磁碟
        └── 確認 RabbitMQ 收到

四者結合 = 最高可靠性（但效能最低）
```

### 比對其他 MQ 框架

| 概念 | RabbitMQ | Kafka | Redis Streams |
|-----|----------|-------|---------------|
| 發送確認 | Publisher Confirms | acks=all | XADD 回傳 ID |
| 持久化 | delivery-mode=2 | replication + flush | AOF/RDB |
| 消費確認 | Basic.Ack | commit offset | XACK |
| 交易 | TX (慢) | Transactions | MULTI/EXEC |
