---
title: "Domain-Driven 06 - Outbox Pattern"
date: "2026-02-15"
category: ""
subCategory: "Backend"
tags: ["DDD", "backend", "design", "csharp", "outbox"]
slug: "ddd_05"
---
###### 拆分主副邏輯，同時保持資料同步性

---

### 雙 ID

```text
Aggregate
├── id (domain identity)     ← 領域層用的 UUID / value object
└── persistenceId (DB id)    ← 資料庫用的 auto-increment int

優勢
Domain Layer     → 只認識 domain id
Repository       → 知道兩個 id 的對應關係
DB               → 用 persistence id 做 index
```

Domain ID（業務 ID）

通常是 UUID 或有語義的值（如 OrderNo: ORD-2024-00123）
跨服務、跨系統溝通時用這個
對外暴露的識別碼（API response、Event payload）
不依賴資料庫生成，aggregate 可以在 persist 前就有 identity

Persistence ID（資料庫 ID）

通常是 auto-increment integer
只在 infrastructure layer 使用（repository 內部）
利用 DB 的 B-tree index 效能優勢
永遠不應該洩漏到 domain / application layer

另一個解法是用自帶時間戳記的 ID, 因為帶有時間前綴，insert 順序接近 sequential，B-tree fragmentation 大幅改善，效能接近 auto-increment int。

```csharp
public static Id New() => new(Guid.CreateVersion7());
```


# DDD + Hexagonal Architecture 筆記
 
## 1. Hexagonal Architecture / Ports & Adapters
 
核心思想：把業務邏輯（Application Core）和外部世界完全隔離。
 
### 三個核心角色
 
- **Application Core**：純粹的業務邏輯，不依賴 framework、DB、HTTP
- **Port**：Core 對外界定義的介面（interface）
  - Driving Port（主動）：外部 → Core，例如 `OrderService` interface
  - Driven Port（被動）：Core → 外部，例如 `OrderRepository` interface
- **Adapter**：實作 Port 介面的具體實現，負責轉換
  - Driving Adapter：REST Controller、CLI Handler、Test
  - Driven Adapter：PostgreSQL Repo、In-Memory Repo、SMTP Client
### 依賴方向
 
```
infrastructure → application → domain
```
 
任何箭頭反過來都是錯的。
 
### 快速檢查法
 
看 `domain/` 資料夾的 import：
- import 其他 domain 物件 → ✅
- import application layer → ❌
- import infrastructure → ❌❌
- import 任何 framework → ❌❌❌
---
 
## 2. DDD + Hexagonal 常見錯誤
 
### 錯誤一：Domain 直接依賴 Port Interface
 
```csharp
// ❌ Domain Entity 不該碰 Port
class Order {
    constructor(private repo: OrderRepository) {}
}
 
// ✅ Repository 呼叫在 Application Layer
class ConfirmOrderUseCase {
    constructor(private repo: OrderRepository) {}
    async execute(orderId: string) {
        const order = await this.repo.findById(orderId);
        order.confirm();
        await this.repo.save(order);
    }
}
```
 
### 錯誤二：Repository Interface 放在 Infrastructure
 
```
// ❌ interface 放 infrastructure，依賴方向反了
infrastructure/OrderRepository.ts
 
// ✅ interface 放 domain，infrastructure 去實作它
domain/OrderRepository.ts
infrastructure/PostgresOrderRepository.ts
```
 
### 錯誤三：Handler 放在 Infrastructure 層
 
```csharp
// ❌ Infrastructure Handler 直接消費 Application Command，跳過 Application Layer
namespace Infrastructure.Identity {
    public static class KeycloakAuthHandler {
        public static async Task<AuthResult> Handle(LoginCommand cmd, ...) { }
    }
}
 
// ✅ Handler 屬於 Application Layer，透過 Port 依賴 Infrastructure
namespace Application.Identity {
    public static class LoginHandler {
        public static async Task<AuthResult> Handle(
            LoginCommand cmd,
            IIdentityProvider provider,  // Port
            CancellationToken ct) { }
    }
}
```
 
---
 
## 3. Domain 三個核心概念
 
### Domain Service
 
「需要多個 Aggregate 協作，但邏輯不屬於任何一個的業務行為。」
 
- 不碰 Repository / 外部服務
- 純計算、純協調
- 跨 Aggregate 才需要
```csharp
public class TransferDomainService {
    public void Transfer(Account source, Account target, Money amount) {
        source.Debit(amount);
        target.Credit(amount);
    }
}
```
 
判斷依據：有沒有碰 Repository / 外部服務。有碰 → Application Service。純計算協調 → Domain Service。
 
### Domain Event
 
「Aggregate 內部發生了一件重要的事，通知外部世界。」
 
- 過去式命名，表示已經發生
- 不知道誰會處理它
- 先收集在 Aggregate，Application Layer 負責發布
```csharp
public record OrderCompletedEvent(
    Guid OrderId,
    DateTime CompletedAt
) : IDomainEvent;
```
 
### Domain Policy
 
「在特定事件發生後，決定接下來要做什麼的業務規則。」
 
- `當 X 發生，則執行 Y`
- 是 Event 的反應者（監聽者）
- 業務上「必然」要發生的反應 → Domain Layer
- 業務上「可選擇」的反應 → Application Layer
```csharp
public class SendNotificationPolicy : IHandles<OrderCompletedEvent> {
    public async Task Handle(OrderCompletedEvent evt, ...) {
        await notification.SendOrderCompletedAsync(evt.OrderId, ct);
    }
}
```
 
### 一句話區分
 
| 概念 | 職責 |
|---|---|
| Entity | 我自己的事我自己管 |
| Domain Service | 我們幾個一起才能做的事 |
| Domain Event | 我做完了，廣播給世界知道 |
| Domain Policy | 聽到廣播，決定下一步 |
 
---
 
## 4. Domain Specification（事前守門）
 
Policy 是「事後反應」，Specification 是「事前守門」。
 
```csharp
public class OrderCanBeCompletedSpecification {
    public bool IsSatisfiedBy(Order order, OrderCompletionRequirements req) {
        return order.Status == OrderStatus.Processing
            && req.PaymentConfirmed
            && req.LogisticsConfirmed;
    }
}
 
public class Order {
    public void Complete(
        OrderCompletionRequirements req,
        OrderCanBeCompletedSpecification spec) {
        if (!spec.IsSatisfiedBy(this, req))
            throw new DomainException(spec.WhyNot(this, req));
 
        Status = OrderStatus.Completed;
        _events.Add(new OrderCompletedEvent(Id, DateTime.UtcNow));
    }
}
```
 
**Domain 不查詢，但有權決定查詢結果夠不夠。Application 負責收集事實，Domain 負責判斷事實是否符合業務規則。**
 
---
 
## 5. 訂單完成流程（完整）
 
```
外部 Request
     ↓
CompleteOrderCommand
     ↓
CompleteOrderHandler (Application)
     ├─ 查詢外部服務（付款、物流）
     ├─ 組成 OrderCompletionRequirements
     ├─ order.Complete(req, spec)
     │       ├─ Specification 守門（事前）
     │       ├─ Status 2 → 3
     │       └─ raise OrderCompletedEvent
     └─ 儲存 + 發布 Event（同一個 Transaction + Outbox）
          ↓
     OrderCompletedEvent
          ↓
     SendNotificationPolicy（事後）
```
 
### 各層職責
 
| 邏輯 | 放哪 | 原因 |
|---|---|---|
| 付款確認、物流確認等外部查詢 | Application Handler | 需要呼叫外部服務 |
| `Status != Processing` 不能轉 | Entity `Complete()` | 純業務規則 |
| 轉成功後發通知 | Policy | 事件反應 |
 
---
 
## 6. Outbox Pattern
 
### 為什麼需要 Outbox
 
```
repo.Save(order)     // ✅ 成功
bus.Publish(event)   // 💥 掛掉 → Event 消失
```
 
DB 和 Event 是兩個不同的操作，天然存在不一致的視窗。
 
### 解法：同一個 Transaction
 
```
Transaction 開始
    ├─ UPDATE orders SET status = 3
    └─ INSERT outbox (OrderCompletedEvent)
Transaction Commit
 
Background Service（獨立）
    └─ 讀 Outbox → 發布到 Bus → 標記已處理
```
 
### Event 重要性分類
 
| 可以丟失 | 不能丟失 |
|---|---|
| 發促銷推播 | 扣庫存 |
| 發歡迎 Email | 產生發票 |
| 更新統計數字 | 金流通知 |
 
**Event 本身沒有可靠性，可靠性是 Outbox 給的。**
 
---
 
## 7. Aggregate 收集 Event 模式
 
```csharp
public class Order {
    private readonly List<IDomainEvent> _events = new();
    public IReadOnlyList<IDomainEvent> DomainEvents => _events;
 
    public void Complete(...) {
        // 狀態轉換
        Status = OrderStatus.Completed;
        // 收集，不發布
        _events.Add(new OrderCompletedEvent(Id, DateTime.UtcNow));
    }
}
 
// Application Layer 負責發布
public async Task<IEnumerable<IDomainEvent>> Handle(CompleteOrderCommand cmd, ...) {
    order.Complete(req, spec);
    await repo.Save(order);
    return order.DomainEvents;  // Wolverine 自動發布
}
```
 
**Aggregate 負責產生 Event，Application 負責發布 Event。**
 
---
 
## 8. Domain Service vs Static Method
 
| | Static Method | Domain Service |
|---|---|---|
| 語意 | 這個邏輯屬於我 | 這個邏輯不屬於任何一方 |
| 適用 | 單一 Aggregate 內部 | 跨多個 Aggregate |
| 信號 | 只用自己的資料 | 需要傳入另一個 Aggregate |
 
**Static Method 是「我自己的工具」，Domain Service 是「我們共用的工具」。**
 
---
 
## 9. 備註生成的歸屬判斷
 
| 情況 | 歸屬 |
|---|---|
| 備註只看單一 Value Object 狀態 | Value Object 方法 |
| 備註需要跨兩個概念組合判斷（純計算） | Domain Service |
| 備註需要查 DB 或外部服務 | Application Service |
 
### 有 IO 的情況
 
```
讀取 JSON              → Infrastructure（IO）
轉換邏輯               → Domain（純計算，Value Object 方法）
組合成 Remark          → Domain（Value Object）
協調以上三件事          → Application Service
```
 
**IO 的部分推到 Infrastructure，轉換邏輯留在 Domain，Application 只負責協調。**