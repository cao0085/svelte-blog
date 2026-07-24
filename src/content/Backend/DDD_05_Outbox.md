---
title: "Domain-Driven 05 - Side Effect & Outbox"
date: "2026-02-15"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design", "csharp", "outbox"]
slug: "ddd_05"
---

###### 拆分主副邏輯，同時保持資料同步性

---

### 主邏輯與副作用

一個業務操作通常不只做一件事，例如創建員工帳戶：

- `<TABLE_Employee>` 新增一筆資料
- 幫對應到的 `<TABLE_Department>_Headcount` 總人數加一

以 MVC 架構會把兩件事寫在同一個方法裡：

```csharp
db_Employee.Add(data);
db_Department.AddOrUpdate(x => x.Id == data.DepartmentId, dept => dept.HandCount += 1);
db.Commit();
```

用 DDD 則是主流程只負責建立 Employee，部門人數由 Domain Event 的 Handler 處理：

```csharp
// Application Layer
public async Task<Unit> Handle(CreateEmployeeCommand command, CancellationToken ct)
{
    var employee = Employee.Create(command.Name, command.DepartmentId);

    await _employeeRepository.AddAsync(employee);
    await _unitOfWork.SaveChangesAsync(); // 儲存 Employee 的同時，Outbox 事件也一併儲存

    return Unit.Value;
}

public static Employee Create(string name, Guid departmentId)
{
    var employee = new Employee(Guid.NewGuid(), name, departmentId);

    employee.RaiseDomainEvent(new EmployeeCreatedDomainEvent(employee.Id, departmentId));
    return employee;
}

public class EmployeeCreatedHandler : INotificationHandler<EmployeeCreatedDomainEvent>
{
    public async Task Handle(EmployeeCreatedDomainEvent evt, CancellationToken ct)
    {
        var dept = await _departmentRepository.GetByIdAsync(evt.DepartmentId);
        dept.IncreaseHeadcount();
        await _unitOfWork.SaveChangesAsync();
    }
}
```

假設創建員工帳號變為須更新 5-10 張表單，函式會越來越巨大、複雜且難以測試與維護。透過 DDD 的 Domain Event 拆解副作用邏輯可異步處理，減少主流程延遲。

---

### 邏輯該放哪一層

副作用被拆出來之後，接著要決定每一段邏輯的歸屬，判斷依據只有一個：這段邏輯有沒有碰到外部世界（Repository、API、檔案）。

| 概念 | 職責 |
|---|---|
| Entity | 我自己的事我自己管 |
| Domain Service | 我們幾個一起才能做的事 |
| Domain Event | 我做完了，廣播給世界知道 |
| Domain Policy | 聽到廣播，決定下一步 |

#### Domain Service

需要多個 Aggregate 協作，但邏輯不屬於任何一個的業務行為，特徵是純計算、純協調，不碰 Repository 與外部服務。

```csharp
public class TransferDomainService
{
    public void Transfer(Account source, Account target, Money amount)
    {
        source.Debit(amount);
        target.Credit(amount);
    }
}
```

如果只用到自己的資料，寫成 Aggregate 自己的方法就好，不需要拉出 Domain Service：

| | Aggregate 方法 | Domain Service |
|---|---|---|
| 語意 | 這個邏輯屬於我 | 這個邏輯不屬於任何一方 |
| 適用 | 單一 Aggregate 內部 | 跨多個 Aggregate |
| 信號 | 只用自己的資料 | 需要傳入另一個 Aggregate |

#### Domain Policy

「當 X 發生，則執行 Y」的業務規則，是 Domain Event 的監聽者。業務上必然要發生的反應放 Domain Layer，可選擇的反應（寄信、推播）放 Application Layer。

```csharp
public class SendNotificationPolicy : IHandles<OrderCompletedEvent>
{
    public async Task Handle(OrderCompletedEvent evt, CancellationToken ct)
    {
        await notification.SendOrderCompletedAsync(evt.OrderId, ct);
    }
}
```

#### Specification

Policy 是事後反應，Specification 則是事前守門，把「可不可以做」的條件抽成一個可重用的物件。

```csharp
public class OrderCanBeCompletedSpecification
{
    public bool IsSatisfiedBy(Order order, OrderCompletionRequirements req)
    {
        return order.Status == OrderStatus.Processing
            && req.PaymentConfirmed
            && req.LogisticsConfirmed;
    }
}

public class Order
{
    public void Complete(OrderCompletionRequirements req, OrderCanBeCompletedSpecification spec)
    {
        if (!spec.IsSatisfiedBy(this, req))
            throw new DomainException("訂單狀態不符合完成條件");

        Status = OrderStatus.Completed;
        RaiseDomainEvent(new OrderCompletedEvent(Id, DateTime.UtcNow));
    }
}
```

Domain 不查詢，但有權決定查詢結果夠不夠。Application 負責收集事實，Domain 負責判斷事實是否符合業務規則，整體流程會是：

```text
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
     SendNotificationPolicy（事後）
```

---

### ASIO 原子性（Atomicity of Side-Effect & IO）

主邏輯成功時無法保證所有副作用（如更新部門、發送通知等）都成功執行，這違反了分散系統中常見的資料一致性與原子性要求。

```text
repo.Save(order)     // 成功
bus.Publish(event)   // 掛掉 → Event 消失
```

DB 和 Event 是兩個不同的操作，天然存在不一致的視窗。解決方法是設計一張資料庫新表 `<DB_Outbox_Message>`，在一筆交易中提交主邏輯與事件，且把事件訊息 `(Event、Payload、Time)` 寫入這張表。這樣執行失敗也有紀錄可以查驗，也可設計失敗的 Retry 機制。

```text
Transaction 開始
    ├─ UPDATE orders SET status = 3
    └─ INSERT outbox (OrderCompletedEvent)
Transaction Commit

Background Service（獨立）
    └─ 讀 Outbox → 發布到 Bus → 標記已處理
```

不是所有事件都值得付出這個成本，先分類再決定要不要走 Outbox：

| 可以丟失 | 不能丟失 |
|---|---|
| 發促銷推播 | 扣庫存 |
| 發歡迎 Email | 產生發票 |
| 更新統計數字 | 金流通知 |

Event 本身沒有可靠性，可靠性是 Outbox 給的。

#### Background Service

主要實踐方法是用背景應用重複執行，訪問 DB_Outbox_Message 執行該事件。

```csharp
public class OutboxDispatcherBackgroundService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<OutboxDispatcherBackgroundService> _logger;

    public OutboxDispatcherBackgroundService(IServiceProvider serviceProvider, ILogger<OutboxDispatcherBackgroundService> logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _serviceProvider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<BaseDbContext>();
            var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

            var messages = await db.OutboxMessages
                .Where(m =>
                    m.Status == "Pending" &&
                    m.RetryCount < m.MaxRetry)
                .Take(10)
                .ToListAsync(stoppingToken);


            foreach (var msg in messages)
            {
                try
                {
                    var type = Type.GetType($"CleanDDD.Domain.Users.Events.{msg.EventType}, CleanDDD.Domain");
                    if (type is null)
                    {
                        msg.Status = "Failed";
                        msg.LastError = "Cannot resolve event type.";
                        continue;
                    }

                    var evt = (INotification?)JsonSerializer.Deserialize(msg.PayloadJson, type);
                    if (evt is null)
                    {
                        msg.Status = "Failed";
                        msg.LastError = "Cannot deserialize event.";
                        continue;
                    }

                    await mediator.Publish(evt, stoppingToken);

                    msg.Status = "Sent";
                    msg.ProcessedAt = DateTime.UtcNow;
                }
                catch (Exception ex)
                {
                    msg.RetryCount++;
                    msg.LastError = ex.Message;

                    if (msg.RetryCount >= 3)
                    {
                        msg.Status = "DeadLetter";
                        _logger.LogWarning($"Outbox event {msg.Id} marked as DeadLetter after 3 retries.");
                    }
                    else
                    {
                        msg.NextAttemptAt = DateTime.UtcNow + GetRetryDelay(msg.RetryCount);
                        _logger.LogError(ex, $"Failed to process outbox event {msg.Id} (RetryCount: {msg.RetryCount})");
                    }
                }
            }

            await db.SaveChangesAsync(stoppingToken);

            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }

    private static TimeSpan GetRetryDelay(int retryCount)
    {
        // 1min → 2min → 4min → 最多 15min
        var delayMinutes = Math.Min(Math.Pow(2, retryCount), 15);
        return TimeSpan.FromMinutes(delayMinutes);
    }
}
```

---

### 識別碼設計

事件、Outbox 都需要在資料還沒寫進 DB 前就有識別碼，因此 Aggregate 的 ID 不該依賴資料庫生成。常見做法是把「業務用的 ID」和「資料庫用的 ID」分開：

```text
Aggregate
├── id (domain identity)     ← 領域層用的 UUID / value object
└── persistenceId (DB id)    ← 資料庫用的 auto-increment int

Domain Layer     → 只認識 domain id
Repository       → 知道兩個 id 的對應關係
DB               → 用 persistence id 做 index
```

Domain ID 通常是 UUID 或有語義的值（如 OrderNo: ORD-2024-00123），用於跨服務溝通與對外暴露（API response、Event payload），不依賴資料庫生成，Aggregate 在 persist 前就有 identity。Persistence ID 則是 auto-increment integer，只在 Infrastructure Layer 使用，利用 DB 的 B-tree index 效能優勢，永遠不應該洩漏到 Domain / Application Layer。

另一個解法是用自帶時間戳記的 ID，因為帶有時間前綴，insert 順序接近 sequential，B-tree fragmentation 大幅改善，效能接近 auto-increment int。

```csharp
public static Id New() => new(Guid.CreateVersion7());
```
