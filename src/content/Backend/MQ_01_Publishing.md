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

### Publishing

Publishing 發送是單向且預設不等回應：

```md
Client → [Method + Header + Body] → RabbitMQ
                                      │
                                      └─ 沒有回應（預設）
```

RabbitMQ 收到後：解析 exchange name + routing key → 查找匹配的 queues → 訊息入列（FIFO）。如果 exchange 不存在，訊息靜默丟棄。

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
