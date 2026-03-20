---
title: "High Concurrency System 02"
date: "2026-03-21"
category: "software"
subCategory: "Side Project"
tags: ["go", "rabbitmq", "postgresql", "concurrency"]
slug: "flash-sale-part2"
---

###### 訂單流程、RabbitMQ Consumer、壓測驗證

---

一個訂單從 HTTP 進來到最終寫入 DB，會經過以下步驟：

```text
1. 收到請求（POST /api/v1/orders）
2. Redis Lua Script 原子預扣庫存
3. Snowflake 生成訂單 ID，建立 Order Aggregate
4. 發佈 OrderMessage 到 RabbitMQ
5. 立刻回 202 Accepted（含 order_id）
     ↓（非同步）
6. Consumer 消費訊息，INSERT order 到 PostgreSQL
7. Redis ConfirmReservation（清掉 reserved 數字）
8. UPDATE products.available_stock（DB 跟上 Redis）
9. Ack message，訊息從佇列移除
```

HTTP 層只做2, 3, 4，不碰 DB，回應時間基本上就是 Redis 一次 Lua Script 的耗時。

### PlaceOrder Handler

```go
func (h *PlaceOrderHandler) Handle(ctx context.Context, cmd PlaceOrderCommand) (int64, error) {
    // ① 原子預扣
    ok, err := h.stockCache.Reserve(ctx, cmd.ProductID, cmd.Quantity)
    if err != nil {
        return 0, err
    }
    if !ok {
        return 0, ErrInsufficientStock
    }

    // ② 建立訂單
    orderID, _ := h.idGen.Generate()
    userID, _ := strconv.ParseInt(cmd.UserID, 10, 64)
    order := domain.NewOrder(orderID, userID, cmd.ProductID, cmd.Quantity, cmd.Price)

    // ③ 發佈到 RabbitMQ
    msg := rabbitmq.OrderMessage{OrderID: order.ID, ...}
    if err := h.producer.Publish(msg); err != nil {
        // 發佈失敗 → Rollback Redis
        h.stockCache.CancelReservation(ctx, cmd.ProductID, cmd.Quantity)
        return 0, err
    }

    return orderID, nil
}
```

HTTP Handler 的回應：

```go
// 成功
c.JSON(http.StatusAccepted, gin.H{
    "order_id": orderID,
    "status":   "queued",
})

// 庫存不足
c.JSON(http.StatusConflict, gin.H{
    "error": "insufficient stock for product 1",
})
```

### RabbitMQ 設定

Producer 和 Consumer 用獨立的 Channel，避免互相阻塞：

```go
// main.go 裡分開建立
conn, mainCh, _ := rabbitmq.NewConnection(rabbitmqURL)

producerCh, _ := conn.Channel()   // 給 producer 用
consumerCh, _ := conn.Channel()   // 給 consumer 用
```

Queue 宣告為 **durable**，訊息 delivery mode 為 **Persistent**，broker 重啟後訊息不會消失：

```go
q, err := ch.QueueDeclare(
    OrderQueue, // name
    true,       // durable ← 重啟不消失
    false,      // auto-delete
    false,      // exclusive
    false,
    nil,
)
```

Consumer 用 手動 Ack（`auto-ack=false`），這樣處理失敗可以 Nack + requeue 讓訊息重試：

```go
func (c *OrderConsumer) Start(ctx context.Context, handler func(OrderMessage) error) error {
    msgs, _ := c.ch.Consume(OrderQueue, "", false, ...) // auto-ack=false

    go func() {
        for msg := range msgs {
            var orderMsg OrderMessage
            json.Unmarshal(msg.Body, &orderMsg)

            if err := handler(orderMsg); err != nil {
                msg.Nack(false, true) // requeue=true，稍後重試
                continue
            }
            msg.Ack(false) // 確認消費完成，移出佇列
        }
    }()
    return nil
}
```

### SaveOrder Consumer

Consumer 收到訊息後做三件事：

```go
func (h *SaveOrderHandler) Handle(ctx context.Context, msg rabbitmq.OrderMessage) error {
    // 1. 寫訂單到 DB
    _, err := h.db.ExecContext(ctx, `
        INSERT INTO orders (order_id, user_id, product_id, quantity, total_price, status)
        VALUES ($1, $2, $3, $4, $5, 'pending')
    `, msg.OrderID, userID, productID, msg.Quantity, totalPrice)
    if err != nil {
        return err // 失敗 → Nack，訊息 requeue 重試
    }

    // 2. 清除 Redis reserved（確認預扣完成）
    h.stockCache.ConfirmReservation(ctx, productID, int32(msg.Quantity))

    // 3. 更新 DB 的 available_stock（讓 DB 跟上 Redis）
    h.db.ExecContext(ctx, `
        UPDATE products
        SET available_stock = available_stock - $1, updated_at = NOW()
        WHERE id = $2
    `, msg.Quantity, productID)

    return nil
}
```

這邊第 2 步很重要，沒有 ConfirmReservation 的話，Redis 的 reserved 永遠不會歸零，長時間跑下來會讓 available + reserved ≠ 實際庫存。

### 庫存狀態追蹤

用一個具體例子說明整個過程中，Redis 跟 DB 的數字怎麼變：

```text
初始狀態
  Redis: available=100, reserved=0
  DB: available_stock=100, reserved_stock=0

→ 訂單 A 下單 50 個
  Redis Lua Reserve: available=50, reserved=50
  DB: 不動

→ 訂單 B 嘗試下單 60 個
  Redis Lua 檢查: available=50 < 60 → return 0
  HTTP 回 409 Conflict

→ Consumer 處理訂單 A
  DB: INSERT order
  Redis ConfirmReservation: reserved=0
  DB: UPDATE available_stock=50

最終
  Redis: available=50, reserved=0
  DB: available_stock=50, reserved_stock=0
```

### 高並發壓測

用 `hey` 工具打 10,000 個請求，200 concurrent：

```bash
hey -n 10000 -c 200 \
  -m POST \
  -H "Content-Type: application/json" \
  -d '{"user_id":"1","product_id":1,"quantity":1,"price":99.99}' \
  http://localhost:8080/api/v1/orders
```

結果：

```text
Summary:
  Total:        0.7717 secs
  Requests/sec: 12,958.08

Response time histogram:
  0.001 [1]    |
  0.008 [7028] |■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.015 [2178] |■■■■■■■■■■■
  0.057 [704]  |■■■■

Status code distribution:
  [202] 9952 responses   ← 成功下單
  [409] 43 responses     ← 庫存不足（正常）
  [500] 5 responses      ← 極少數錯誤
```

~13,000 req/sec，P99 在 57ms 以內，成功率 99.5%。

壓測完驗證沒有超賣：

```bash
# Redis 剩餘庫存
docker exec flashsale-redis redis-cli GET "stock:product:1:available"

# DB 訂單數
docker exec flashsale-postgres psql -U flashsale -d flashsale_db \
  -c "SELECT COUNT(*) FROM orders;"
```

### 監控

這部分比較不熟，先串起來看儀表板有在跑而已：

```go
// Prometheus metrics server（port 9100）
go metrics.StartServer(":9100")
```

加一個 redis-exporter sidecar，讓 Prometheus 可以抓 Redis 的指標（連線數、命令耗時、記憶體使用量等）：

```yaml
redis-exporter:
  image: oliver006/redis_exporter:latest
  environment:
    REDIS_ADDR: redis://redis:6379
  ports:
    - "9121:9121"
```

### 心得

因為沒處理伺服器異常的補償機制，整個專案實作下來難度還行。有趣的是過程中可以感受到軟體工程的演進，從手動控制物件鎖、到語言/框架層封裝、再到 Redis Server 端的原子操作；從同步直寫 DB、到非同步 thread 處理、再到 MQ 讓服務分離同時保證訊息不丟。
