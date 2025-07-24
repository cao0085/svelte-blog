---
title: "Domain-Driven Design - Mediator in C#"
date: "2025-06-22"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design"]
slug: "ddd_mediator"
---
這是第一篇文章，用來展示部落格如何從 markdown 載入內容。

---

## Mediator

## MediatR

用於應用程式內部模組之間的指令與事件傳遞，運作於記憶體中，不需外部中介。自身架構處理 Command、Query、Domain Event，也可擴充 IPipelineBehavior 實作驗證、日誌、監控等。若搭配 Outbox 實作，亦可延伸為可靠事件傳遞模式。

套件安裝

```csharp
//.csproj
<PackageReference Include="MediatR" Version="12.5.0" />
//Program.cs
builder.InstallMediatR();
```

放入自定義的**Command**後，會自動註冊所有 `IRequestHandler<,>`、`INotificationHandler<>` 相關的 Handler

```csharp
// Infrastructure/Installers/MediatRInstaller.cs
public static void InstallMediatR(this WebApplicationBuilder builder)
{
    builder.Services.AddMediatR(cfg =>
    {
        cfg.RegisterServicesFromAssemblyContaining<LoginUserCommand>();
        cfg.RegisterServicesFromAssemblyContaining<RefreshTokenCommand>();
    });
}
```

Send 流程（Command / Query）

```csharp
var result = await _mediator.Send(new LoginUserCommand("user", "pwd"));
```

背後處理步驟：

  1. 呼叫 Send() → 取得 command 型別（如 LoginUserCommand）
  2. 檢查快取中有沒有 RequestHandlerWrapper`<LoginUserCommand, TResult>`
  3. 若無，透過反射產生 Wrapper 並快取
  4. Wrapper 使用 DI container (ServiceFactory) 找出對應的 LoginUserCommandHandler
  5. 包上所有 IPipelineBehavior（如 Logging / Validation）
  6. 呼叫 Handle() 執行實際邏輯

Publish 流程（Event）

```csharp
await _mediator.Publish(new UserLoggedInNotification(userId));
```

會呼叫所有註冊的 INotificationHandler`<UserLoggedInNotification>` 處理器
適合用於事件廣播 / DomainEvent 傳遞（例如搭配 Outbox）

Controller 範例流程

```csharp
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
{
    var result = await _mediator.Send(command);
    return Ok(result);
}
```

IPipelineBehavior

MediatR 在處理 Send() 時，會把整個流程包裝在一連串的 IPipelineBehavior`<TRequest, TResponse>` 中，最後才執行真正的 Handle() 方法。
`Client → [LoggingBehavior] → [ValidationBehavior] → CommandHandler.Handle()`
每一個 Behavior 都像 Middleware，可以：

  -做前置驗證（FluentValidation）
  -加入日誌記錄（ILogger）
  -加入監控（OpenTelemetry, AppInsights）
  -加入自定義錯誤處理、授權檢查

```csharp
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
```

## MassTransit

適合**分散式系統**中的服務間訊息通訊，需外部 message broker（如 RabbitMQ、Kafka）。支援 Command / Event 發送，可串接 Retry、延遲隊列、DeadLetter 等進階功能，常用於微服務間傳遞資料、非同步背景處理等情境。

套件安裝

```csharp
// .csproj
<PackageReference Include="MassTransit.AspNetCore" Version="8.1.2" />
<PackageReference Include="MassTransit.RabbitMQ" Version="8.1.2" />
```

```csharp
// Program.cs
builder.Services.AddMassTransit(x =>
{
    // 自動註冊所有的消費者 (Consumer)
    // 表示該層級專案
    x.AddConsumers(typeof(CreateUserConsumer).Assembly);

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("rabbitmq://localhost");
        cfg.ConfigureEndpoints(context); // 自動綁定 queue
    });
});
```

Send: 命令傳遞（Command），對應的 Queue 處理一次。

```csharp
await _sendEndpoint.Send(new GenerateInvoice { OrderId = "123" });
```

Publish: 事件廣播（Event），所有訂閱該事件的 Consumer 都會收到。

```csharp
await _publishEndpoint.Publish(new UserCreated { UserId = Guid.NewGuid() });
```

Middleware pipeline

``` csharp
cfg.ConfigureMediator((context, cfg) =>
    {
        // 驗證資料結構
        cfg.UseConsumeFilter(typeof(ValidationFilter<>), context, x => x.Include(type => !type.HasInterface<IDomainEvent>()));
        cfg.UseConsumeFilter(typeof(LoggingFilter<>), context, x => x.Include(type => !type.HasInterface<IDomainEvent>()));
        cfg.UseConsumeFilter(typeof(RedisFilter<>), context, x => x.Include(type => !type.HasInterface<IDomainEvent>()));
        cfg.UseConsumeFilter(typeof(EventsFilter<>), context, x => x.Include(type => !type.HasInterface<IDomainEvent>()));
        cfg.UseConsumeFilter(typeof(HtmlSanitizerFilter<>), context, x => x.Include(type => !type.HasInterface<IDomainEvent>()));
    });
```

```csharp
[HttpPost("register")]
public async Task<IActionResult> Register([FromServices] IPublishEndpoint publishEndpoint)
{
    await publishEndpoint.Publish(new CreateUser { UserName = "tony" });
    return Ok("Published!");
}
```
