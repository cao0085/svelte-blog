---
title: "Domain-Driven - Outbox Message"
date: "2025-06-23"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design"]
slug: "ddd_outbox"
---
###### 拆分主副邏輯，同時保持資料同步性

---

## SideEffect

若把 DDD 流程中的主副行為拆分：

- 創建員工帳戶的時候  `<TABLE_Employee>` 新增一筆資料
- 幫對應到的 `<TABLE_Department>_Headcount` 總人數加一

<br>

若是以依照 MVC 架構會是
```csharp
db_Employee.Add(data);
db_Department.AddOrUpdate(x => x.Id == data.DepartmentId, dept => dept.HandCount += 1);
db.Commit();
```

用 DDD 寫則變成是

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

假設創建員工帳號變為須更新 5-10 張表單,函式會越來越巨大、複雜且難以測試與維護。透過 DDD 的 Domain Event 拆解副作用邏輯可異步處理，減少主流程延遲。

## ASIO 原子性（Atomicity of Side-Effect & IO）

剛剛提到的行為，主邏輯成功時無法保證所有副作用（如更新部門、發送通知等）都成功執行，這違反了分散系統中常見的 資料一致性與原子性要求。

解決方法是設計一張資料庫新表`<DB_Outbox_Message>`，在一筆交易中提交主邏輯與事件，且把事件訊息`(Event、Payload、Time)`寫入這張表。這樣執行失敗也有紀錄可以查驗，也可設計失敗的 Retry 機制。

<br>

主要實踐方法是用背景應用重複執行，訪問 DB_Outbox_Message 執行該事件

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
