---
title: "AMQP"
date: "2025-03-10"
category: "software"
subCategory: "Communications"
tags: ["amqp", "rabbitmq", "message-queue"]
slug: "amqp"
---
###### 常常聽到的 Message Queue 是使用這個通訊協議
---

`AMQP（Advanced Message Queuing Protocol）` 是一個開放標準的應用層協議，專門設計用於訊息導向的通訊方式。

- AMQP 使用長連線 + Channel，不須每次請求重新建立連線
- 訊息路由靠 Exchange + Routing Key + Binding
- 內建 ack/nack 確認機制，保護訊息不丟失
- 支援 Dead Letter Exchange，處理失敗的訊息會有標準流程

#### Request

```md
// 連線
// 一條 TCP 連線內多路復用多個邏輯通道，避免頻繁建立連線的開銷。
Client ──── TCP 連線（長期維持）──── Broker
              │
              ├── Channel 1 (類似 HTTP/2 的 stream)
              ├── Channel 2
              └── Channel 3

// 請求
PUBLISH
Exchange: orders.exchange
Routing-Key: orders.created
Properties:
  content-type: application/json
  delivery-mode: 2 (persistent)
  message-id: abc123

{"item": "book", "qty": 1}

// 路由 Exchange + Routing Key + Binding
Exchange: events (type: topic)
  │
  ├── Binding: "order.*"       → Queue: order-service
  ├── Binding: "order.created" → Queue: notification-service  
  └── Binding: "#"             → Queue: logging-service (收全部)
```

#### Exchange

- Direct: 精確匹配 routing key
- Fanout: 廣播到所有綁定的佇列
- Topic: 模式匹配（`*` 和 `#`）
- Headers: 根據 header 屬性匹配

#### Response

```md
Producer ── Publish ──→ Broker ── Deliver ──→ Consumer
Producer ←── Confirm ── Broker ←── Ack ────── Consumer
[不阻塞，稍後收確認]
```

### Error

```md
Consumer 處理失敗
    ↓ nack
原 Queue
    ↓ 超過重試次數
Dead Letter Exchange
    ↓
Dead Letter Queue（人工檢視或另行處理）
```

#### Frame

封裝好的 Command 會被拆成 N 個 Frame 來傳遞訊息

```md
channel.basic_publish(
    exchange='orders',           # → Exchange name
    routing_key='order.created', # → Routing key value  
    body='{"id": 123}',
    mandatory=True               # → Mandatory flag
)

// Publish Flow
Method Frame > Header Frame > Body Frame // 若 Body 太大就會拆成多個 Body Frame

// Frame structure 
- Protocol Header: 連線時只用一次
- Method Frame: 攜帶 RPC 請求/回應
- Content: Header訊息的大小和屬性
- Body Frame: 訊息的實際內容
- Heartbeat: 雙向檢查連線是否正常
[Type] [Channel] [Size] [Payload] [End]

┌───────────────────────────────────────────────────────────┐
│  [1][1][41][        Method frame payload        ][0xce]   │
│             │                                             │
│             ▼                                             │
│  ┌───────┬─────────┬──────────┬─────────────┬───────────┐ │
│  │ Basic │ Publish │ Exchange │ Routing key │ Mandatory │ │
│  │  60   │   40    │  name    │    value    │   flag    │ │
│  └───────┴─────────┴──────────┴─────────────┴───────────┘ │
└───────────────────────────────────────────────────────────┘

// Method Frame Payload 
- Basic: 數字 (60) Class ID，表示這是 Basic 類別的指令
- Publish: 數字 (40) Method ID，表示是 Publish 方法
- Exchange: name 字串要發送到哪個 exchange
- Routing key: 字串路由規則，exchange 用這個決定送去哪些 queue
- Mandatory: boolean 是否強制要成功路由

// Content Header Frame Payload
- Body size: 55 bytes，告訴 RabbitMQ 接下來要收多少 body 資料（不算在 properties 裡）
- Flags: 144,200 是 bitmask，標記哪些 properties 有被設定
- content-type: "application/json"，訊息的 MIME 類型
- app-id: "Test"，發送這則訊息的應用程式名稱
- timestamp: 1014206880，Unix timestamp（binary packed 格式）
- delivery-mode: 1，訊息持久化設定（1=記憶體，2=寫入磁碟）

// Body Frame Payload
- 內容: 原始資料，完全不處理
- 格式: 任意（JSON、XML、圖片、Protobuf、純文字...）
- 特性: RabbitMQ 不解碼、不檢查、不評估，純粹轉發
```

### 核心流程

```md
Producer（生產者）
    ↓ publish
Exchange（交換機）
    ↓ routing key + binding rules
Queue（佇列）
    ↓ consume
Consumer（消費者）
    ↓
  處理成功?
(Yes)      (No)
 ack       nack
           ↓
      Dead Letter Queue
```
