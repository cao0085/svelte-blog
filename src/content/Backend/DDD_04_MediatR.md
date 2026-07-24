---
title: "Domain-Driven 04 - MediatR & MassTransit"
date: "2026-02-14"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design", "csharp", "mediator"]
slug: "ddd_04"
---

###### 事件驅動搭配中介者模式，讓呼叫端只認識訊息不認識實作

---

### 為什麼需要中介者

Application Layer 的入口若直接注入各個 Handler，Controller 就會知道每一個用例的具體型別，新增一個流程就要改一次建構子。中介者模式把這層依賴收斂成單一介面，呼叫端只負責「送出訊息」，由中介者查表找出對應的 Handler：

```csharp
// Controller 直接依賴每一個 Handler
public UsersController(LoginUserHandler login, RefreshTokenHandler refresh) { }

// Controller 只依賴中介者，訊息型別決定走到哪個 Handler
public UsersController(IMediator mediator) { }
```

同樣是傳遞訊息，依照是否跨越行程邊界分成兩種選擇：

| | MediatR | MassTransit |
|---|---|---|
| 傳遞範圍 | 同一個行程（In-Memory） | 跨服務、跨機器 |
| 外部依賴 | 無 | Message Broker（RabbitMQ、Kafka） |
| 可靠性 | 行程結束即遺失 | 持久化、可重送 |
| 擴充點 | IPipelineBehavior | Consume Filter |
| 適用情境 | Command / Query / Domain Event | 微服務通訊、非同步背景處理 |

---

### MediatR

用於應用程式內部模組之間的指令與事件傳遞，運作於主記憶體中不需外部中介。自身架構處理 Command、Query、Domain Event，也可擴充 IPipelineBehavior 實作驗證、日誌、監控等。若搭配 Outbox 實作，亦可延伸為可靠事件傳遞模式。

```csharp
//.csproj
<PackageReference Include="MediatR" Version="12.5.0" />

//Program.cs
builder.InstallMediatR();
```

註冊時只需指定任一個 Command 所在的組件，MediatR 會掃描該組件並自動註冊所有 `IRequestHandler<,>`、`INotificationHandler<>` 的實作。

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

#### Send：Command / Query

`Send()` 對應一對一的請求，一個訊息型別只會有一個 Handler，並且會回傳結果。

```csharp
var result = await _mediator.Send(new LoginUserCommand("user", "pwd"));
```

背後處理步驟：

1. 呼叫 Send() 取得 command 型別（如 LoginUserCommand）
2. 檢查快取中有沒有 RequestHandlerWrapper`<LoginUserCommand, TResult>`
3. 若無，透過反射產生 Wrapper 並快取
4. Wrapper 使用 DI container (ServiceFactory) 找出對應的 LoginUserCommandHandler
5. 包上所有 IPipelineBehavior（如 Logging / Validation）
6. 呼叫 Handle() 執行實際邏輯

```csharp
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
{
    var result = await _mediator.Send(command);
    return Ok(result);
}
```

#### Publish：Event

`Publish()` 對應一對多的廣播，會呼叫所有註冊的 `INotificationHandler<UserLoggedInNotification>`，發送端不知道也不在意有幾個訂閱者，適合用於 Domain Event 傳遞（例如搭配 Outbox）。

```csharp
await _mediator.Publish(new UserLoggedInNotification(userId));
```

#### IPipelineBehavior

MediatR 在處理 `Send()` 時，會把整個流程包裝在一連串的 `IPipelineBehavior<TRequest, TResponse>` 中，最後才執行真正的 `Handle()` 方法。

```text
Client → [LoggingBehavior] → [ValidationBehavior] → CommandHandler.Handle()
```

每一個 Behavior 都像 Middleware，可以：

- 做前置驗證（FluentValidation）
- 加入日誌記錄（ILogger）
- 加入監控（OpenTelemetry, AppInsights）
- 加入自定義錯誤處理、授權檢查

註冊順序即為執行順序，先註冊的 Behavior 在外層：

```csharp
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
```

---

### MassTransit

適合分散式系統中的服務間訊息通訊，需外部 message broker（如 RabbitMQ、Kafka）。支援 Command / Event 發送，可串接 Retry、延遲隊列、DeadLetter 等進階功能，常用於微服務間傳遞資料、非同步背景處理等情境。

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

#### Send & Publish

與 MediatR 相同的語意區分：`Send()` 送到指定的 queue 由單一 Consumer 處理，`Publish()` 送到 exchange 由所有訂閱者各自收到一份。

```csharp
// 指定接收端，一對一
await _sendEndpoint.Send(new GenerateInvoice { OrderId = "123" });

// 廣播，一對多
await _publishEndpoint.Publish(new UserCreated { UserId = Guid.NewGuid() });
```

```csharp
[HttpPost("register")]
public async Task<IActionResult> Register([FromServices] IPublishEndpoint publishEndpoint)
{
    await publishEndpoint.Publish(new CreateUser { UserName = "tony" });
    return Ok("Published!");
}
```

#### Consume Filter

對應 MediatR 的 IPipelineBehavior，差別在於可以用條件排除特定訊息型別，下例讓 Domain Event 略過所有驗證與加工的 Filter。

```csharp
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
