---
title: "Message Queue 02 - Consuming"
date: "2026-03-12"
category: "software"
subCategory: "Backend"
tags: ["Queue", "Message", "RabbitMQ", "AMQP"]
slug: "message-queue-02"
---
###### 透過 RabbitMQ 學習 Message Queue

---

RabbitMQ 提供兩種取得已處理消息的方法

#### Basic.Get

持續型服務 **不考慮** 使用,適用場景限:

- 一次性腳本: 跑完就結束，不需要持續監聽
- 檢查 queue 狀態: 偶爾看一下有沒有訊息
- 批次處理: 定時跑，拉一批訊息處理完就結束

#### Basic.Consume

Pub-Sub 模式；當 Application 與 RabbitMQ 建立連線時會訂閱一次持續接收訊息，直到發送 Basic.Cancel 才停止。

- Consumer Tag：訂閱的唯一識別碼，用於區分多個訂閱來源或發送 `Basic.Cancel` 取消特定訂閱
- Delivery Tag：訊息的唯一識別碼，發送 Ack / Nack / Reject 時用來指定是哪一則訊息
- 取消訂閱時：Library 自動發送 `Basic.Cancel`，未處理的訊息會 `Basic.Nack` 重回 queue
- 效能優勢：比 Basic.Get 至少快 2 倍，RabbitMQ 可預先準備訊息推送

```md
訂閱流程：

Client                          Server
   │                               │
   │  Basic.Consume                │
   │ ────────────────────────────▶ │
   │              Basic.ConsumeOk  │
   │ ◀──────────────────────────── │
   │                               │
   │   （持續推送訊息...）            │
   │                               │
   │              Basic.Deliver    │
   │              Header + Body    │
   │ ◀──────────────────────────── │
   │                               │
   │  Basic.Ack                    │
   │ ────────────────────────────▶ │
   │                               │
   │              Basic.Deliver    │
   │              Header + Body    │
   │ ◀──────────────────────────── │
   │                               │
   │  Basic.Ack                    │
   │ ────────────────────────────▶ │
   │                               │
   │  Basic.Cancel                 │  ← 停止訂閱
   │ ────────────────────────────▶ │
   │                               │
   │              Basic.CancelOk   │
   │ ◀──────────────────────────── │
   │                               │
   │  （如果有未處理訊息）            │
   │  Basic.Nack                   │  ← 訊息重回 queue
   │ ────────────────────────────▶ │
```

### Tuning Consumers

```md
🐇 快                                              慢 🐢
◄─────────────────────────────────────────────────────►

┌─────────────┬─────────────┬─────────────┬─────────────┐
│ no_ack=True │ ack + QoS>1 │ ack 模式    │ transactions│
│             │ (prefetch)  │             │ + Get       │
└─────────────┴─────────────┴─────────────┴─────────────┘
      │                                          │
   最快                                        最慢
   最不可靠                                    最可靠
```

#### no_ack=True（自動確認模式）

TCP ACK 拿到 OS 的 Socket Buffer 就認定已送達，最快但最不可靠的方式

```md
RabbitMQ                              Consumer 機器
   │                                       │
   │  ─────── 網路傳輸 ───────▶            │
   │                                       │
   │                          ┌────────────┴────────────┐
   │                          │     Operating System    │
   │                          │  ┌───────────────────┐  │
   │                          │  │   Socket Buffer   │  │ ← 這一層就表示送達
   │                          │  │   (OS 管理的緩衝)  │  │
   │                          │  └─────────┬─────────┘  │
   │                          └────────────┼────────────┘
   │                                       │
   │                                       ▼
   │                          ┌────────────────────────┐
   │                          │    Client Library      │
   │                          │    (rabbitpy 等)       │
   │                          └────────────┬───────────┘
   │                                       │
   │                                       ▼
   │                          ┌────────────────────────┐
   │                          │   Your Application     │
   │                          │   (你的程式碼)          │
   │                          └────────────────────────┘
```

#### QoS Prefetch（預取設定）

設定 Consumer 手上最多能有幾則「未 ack」的訊息，ack 一則就補送一則，維持固定數量。

- `prefetch = 0`（預設）：無限制，RabbitMQ 全送 → 可能記憶體爆炸
- `prefetch = 1`：處理完一則才送下一則 → 最安全但最慢
- `prefetch = N`：維持 N 則在手上 → 平衡效能與可靠性

```md
RabbitMQ                              Consumer
    │                                    │
    │  prefetch_count = 10               │
    │  ─────────────────────────────▶    │
    │                                    │
    │  一次送 10 則訊息                    │
    │  ══════════════════════════════▶   │
    │                                    │
    │         （等待 ack...）             │
    │                                    │
    │                        處理完第 1 則 │
    │  ◀──────── Basic.Ack ─────────     │
    │                                    │
    │  補送 1 則（維持 10 則）             │
    │  ─────────────────────────────▶    │
```

### Reject

- Basic.Reject（AMQP 標準）: 一次只能拒絕「一則」訊息，requeue 決定是否回 queue
- Basic.Nack（RabbitMQ 擴充）:可以批次拒絕（multiple=True），其他行為和 Reject 相同
- Dead Letter Exchange: 當訊息被拒絕無效時，也可轉發到另一個 exchange 進行後續處理。

```md
Publisher ──▶ Exchange ──▶ Queue ──▶ Consumer
                                        │
                                        ▼
                                   處理成功？
                                   ╱        ╲
                                 Yes         No
                                 ╱             ╲
                                ▼               ▼
                           Basic.Ack      Basic.Reject
                               │          或 Basic.Nack
                               ▼               │
                          從 queue 刪除         │
                                               ▼
                                      requeue=True?
                                      ╱          ╲
                                    Yes           No
                                    ╱               ╲
                                   ▼                 ▼
                              重回 queue          丟棄（或進 DLX）

// 「兩次出局」策略
if message.redelivered:
    # 已經重試過一次了，這次還是失敗就丟棄
    message.reject(requeue=False)
else:
    # 第一次失敗，給它重試機會
    message.reject(requeue=True)
```

### Controlling queues

Queue 設定是**不可變的**，建立後無法修改，要改必須刪除重建。

#### Temporary queues（臨時 Queue）

| 設定 | 行為 | 刪除時機 | 用途 |
|-----|------|---------|------|
| auto_delete | 可多個 consumer | 最後一個 consumer 斷開 | 聊天室用戶 queue |
| exclusive | 只有建立者可消費 | Channel 關閉 | RPC reply queue |
| x-expires | 閒置計時 | 超過 TTL 且無活動 | 限時等待回應 |

#### Permanent queues（持久 Queue）

| 設定 | 說明 | 用途 |
|-----|------|------|
| durable | Queue 定義持久化，重啟後還在 | 多 consumer 共用的工作佇列 |
| x-message-ttl | 訊息最大存活時間，過期自動刪除或進 DLX | 避免過期資料被處理 |
| x-max-length | Queue 最大訊息數，超過時丟棄最舊的 | 聊天室只保留最新 N 則 |

#### durable vs delivery-mode 差異

| | durable=True | delivery-mode=2 |
|--|--------------|-----------------|
| 持久化什麼 | Queue 定義 | 訊息內容 |
| 重啟後 | Queue 還在 | 訊息還在 |
| 兩者都要 | ✓ | ✓ |
