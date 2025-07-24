---
title: "Domain-Driven Design - Outbox Message"
date: "2025-06-23"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design"]
slug: "ddd_outbox"
---
這是第一篇文章，用來展示部落格如何從 markdown 載入內容。

---

## OutBox Message


## with SideEffect

把 DDD 流程中的主副行為拆分, 例如有一個需求是創建員工帳戶的時候,需要輸入TABLE_Employee 新增一筆資料
另外還需幫對應到的 TABLE_Department 總人數新增一筆, 若是以依照 MVC 架構會是

```csharp
db_Employee.Add(data);
db_Department.AddOrUpdate(x => x.Id == data.DepartmentId, dept => dept.HandCount += 1);
db.Commit();
```

那若用 DDD 寫則變成是

``` csharp
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

一個行為還好,但假設創建員工帳號會需要更新 5-10 張表單,這時候如果都集中會越來越巨大、複雜且難以測試與維護。且透過 DDD 的 Domain Event 拆解副作用邏輯可異步處理，減少主流程延遲。

## ASIO 原子性（Atomicity of Side-Effect & IO）

剛剛提到的行為中，主邏輯（例如新增員工）成功時，無法保證所有副作用（如更新部門、發送通知等）也一定成功執行。
這違反了分散系統中常見的 資料一致性與原子性要求。

所以可以設計一張資料庫新表 DB_Outbox_Message，在與主邏輯同一個交易中**一起 Commit**，把事件訊息(哪個事件、Payload、Time ...)寫入這張表，且可以設計失敗時的 Retry 機制，這樣就算執行失敗也會有紀錄可以查驗。

主要實踐方法是用背景重複執行，訪問執行 DB_Outbox_Message

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
                        msg.LastError = "❌ Cannot resolve event type.";
                        continue;
                    }

                    var evt = (INotification?)JsonSerializer.Deserialize(msg.PayloadJson, type);
                    if (evt is null)
                    {
                        msg.Status = "Failed";
                        msg.LastError = "❌ Cannot deserialize event.";
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
                        _logger.LogWarning($"⚠️ Outbox event {msg.Id} marked as DeadLetter after 3 retries.");
                    }
                    else
                    {
                        msg.NextAttemptAt = DateTime.UtcNow + GetRetryDelay(msg.RetryCount);
                        _logger.LogError(ex, $"❌ Failed to process outbox event {msg.Id} (RetryCount: {msg.RetryCount})");
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
