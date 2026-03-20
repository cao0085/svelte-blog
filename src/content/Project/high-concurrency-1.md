---
title: "High Concurrency System 01"
date: "2026-03-20"
category: "software"
subCategory: "Side Project"
tags: ["go", "redis", "ddd", "backend"]
slug: "flash-sale-part1"
---

###### 用 Go 實作高併發系統 [flash-sale-order-system](https://github.com/cao0085/flash-sale-order-system)

---

最近開始在看分散式系統設計，試試看傳統後端架構怎麼接 Redis 和 Message Queue

- **Backend**: Go 1.24.0
- **Database**: PostgreSQL 17.2
- **Cache**: Redis 7.4.1
- **Message Queue**: RabbitMQ 3.13 (with Management UI)
- **Monitoring**: Prometheus 3.1.0 + Grafana 11.4.0

### 架構設計

專案採用 DDD 架構，過程中順便驗證自己對 DDD 抽象層的理解是否正確。先將三層架構建立起來，串接 Gin 跑通主要業務流程；後續分別將庫存檢查從直接讀寫 DB 改為透過 Redis 判斷，並將同步寫入 DB 調整為發送訊息至 Queue。如果整個過程中幾乎不需要修改 Domain 層就算保持低耦合，以後要替換框架也容易。

```text
interfaces/      ← HTTP Handler（接收請求、回應格式）
    │
application/     ← Use Case（串聯 Domain + Infrastructure）
    │
domain/          ← 業務規則（Product、Order Aggregate）
    │
infrastructure/  ← 實作細節（PostgreSQL、Redis、RabbitMQ）
```

#### Domain Aggregate

這次主要是測試高併發，聚合規則就簡單寫示意

```go
type Product struct {
    id          int64
    sku         string
    name        string
    description string
    status      int8   // 1=上架, 9=下架
    stock       Stock  // Value Object
}

// 庫存抽成 Value Object，把所有庫存相關運算封在裡面，確保不會出現負庫存：
type Stock struct {
    available int32   // 可購買數量
    reserved  int32   // 已預扣（待確認）
}

// Reserve: available → reserved（下單時）
// ConfirmReservation: reserved 歸零（入庫後）
// CancelReservation: reserved → available（失敗時 rollback）
```

```go
// Order Aggregate
type Status string
const (
    StatusPending   Status = "pending"
    StatusConfirmed Status = "confirmed"
    StatusCancelled Status = "cancelled"
)
```

---

### Redis

為了應對高並發下大量請求 DB 可能導致的超賣問題，將庫存扣減邏輯移至 Redis，利用其提供的原子操作避免競爭條件。在此設計下，Redis 的庫存視為落後指標，最終一致性由 Domain Aggregate 負責保護 DB 資料的正確性。實作上寧可因 Redis 庫存不足而擋掉請求，也不能讓超賣發生；需要校正時則以定時任務（類似清票）進行同步。

Key 設計採雙鍵結構

```text
stock:product:{productID}:available    ← 可購買庫存
stock:product:{productID}:reserved     ← 預扣庫存
```

預扣庫存的 Lua Script：

```lua
local availKey = KEYS[1]
local reservKey = KEYS[2]
local quantity = tonumber(ARGV[1])

local available = tonumber(redis.call('GET', availKey) or 0)

if available < quantity then
    return 0   -- 庫存不足
end

redis.call('DECRBY', availKey, quantity)
redis.call('INCRBY', reservKey, quantity)
return 1   -- 預扣成功
```

Lua Script 在 Redis server 端執行，整段是原子保證的，不會有「讀到 available=1、另一個請求也讀到 1、兩個都扣成功」這種 Race Condition。

類似的設計也用在確認預扣和取消預扣：

```lua
-- ConfirmReservation: 訂單寫入 DB 後，清除 reserved
local reserved = tonumber(redis.call('GET', reservKey) or 0)
if reserved < quantity then return 0 end
redis.call('DECRBY', reservKey, quantity)
return 1

-- CancelReservation: 發布 MQ 失敗時，reserved 歸還 available
if reserved < quantity then return 0 end
redis.call('INCRBY', availKey, quantity)
redis.call('DECRBY', reservKey, quantity)
return 1
```

### Message Queue

再來就是讓 DB 寫入透過 MQ 非同步完成，控制 DB 連線壓力，提升系統吞吐能力，另外一個好處是可以減少不同 Aggregate 強耦合。

```text
HTTP 請求 → Redis 原子預扣 → 發佈到 RabbitMQ → 立刻回 202
                                      ↓
                              Consumer 非同步處理
                                      ↓
                              寫入 PostgreSQL
```

#### Warm-up

app 啟動時從 PostgreSQL 把所有商品庫存載入 Redis，確保第一個請求打進來時 cache 已經就緒：

```go
func (s *StockService) WarmUp(ctx context.Context) error {
    products, err := s.productRepo.FindAll(ctx)
    // ...
    for _, p := range products {
        s.stockCache.InitStock(ctx, p.ID(), p.Stock().Available(), p.Stock().Reserved())
    }
    log.Printf("stock warm-up: initialized %d products", len(products))
    return nil
}
```

#### Reconciliation

背景 goroutine 每 5 分鐘把 Redis 現值同步回 PostgreSQL，防止長期跑下來兩邊數值飄移：

```go
func (s *StockService) StartReconcile(ctx context.Context, interval time.Duration) {
    ticker := time.NewTicker(interval)
    defer ticker.Stop()
    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            s.reconcile(ctx)
        }
    }
}
```

Reconcile 邏輯只更新有差異的商品：

```go
// 只在 Redis 與 DB 數值不同時才更新
if redisAvail == p.Stock().Available() && redisReserved == p.Stock().Reserved() {
    continue
}
productRepo.UpdateStock(ctx, p.ID(), redisAvail, redisReserved)
```

#### Snowflake ID

另外補一個訂單 ID 用 Snowflake 演算法生成，不用資料庫的 auto-increment，原因是：

- 可在應用層生成，不用多一次 DB 往返
- 分散式環境下依然唯一
- ID 帶時間戳，天然可排序

格式：`293227368682622976`（int64，毫秒級時間戳 + 機器 ID + 序號）
