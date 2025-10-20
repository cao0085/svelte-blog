---
title: "Base Backgroud Service"
date: "2025-09-25"
category: "software"
subCategory: "Backend"
tags: ["Backgroud", "backend", "markdown"]
slug: "backgroudservice"
---
###### C#實作非立即性的服務排序

---

### 使用背景

當主程式的 DI 註冊週期是以 HTTP lifecycle 為主時，可藉由 Background Service 提供長期運行的服務容器。

1. 非阻塞式處理：可由外部 API 觸發某些動作，立即回應用戶端而不等待處理完成
2. 解耦合設計：將耗時的業務邏輯從 HTTP 請求週期中分離出來
3. 簡易事件模式：作為一個輕量級的 Event pattern 實現，處理非即時性任務
4. 資源管理：避免長時間佔用 HTTP 連線資源，提升系統整體效能

### Channel 基礎原理

Channel 是 .NET Core 提供的 thread-safe 生產者-消費者模式實作，基於 System.Threading.Channels 命名空間。它解決了多執行緒環境下的資料傳遞問題。

```csharp
var channel = Channel.CreateUnbounded<YourRequestType>(); // Channel 包含兩個部分
channel.Writer // 用於寫入資料 (生產者) => Controller 需要寫入能力
channel.Reader // 用於讀取資料 (消費者) => Background 需要讀取能力

┌─────────────────────┐    寫入    ┌──────────────┐    讀取    ┌──────────────────────┐
│   Controller        │ ─────────> │   Channel    │ ─────────> │  Background Service  │
│  (ChannelWriter)    │           │   (Queue)    │            │  (ChannelReader)     │
└─────────────────────┘           └──────────────┘            └──────────────────────┘
// FIFO 先進先出的順序處理
```

### Channel 的監聽機制

寫入機制 (Producer)

```csharp
// 非同步寫入 - 不會阻塞，立即將資料放入佇列
await channelWriter.WriteAsync(data);

// 同步寫入 - 立即返回 bool
bool success = channelWriter.TryWrite(data);

// 標記寫入完成 (關閉 Writer)
channelWriter.Complete();
```

讀取監聽機制 (Consumer)

```csharp
// ReadAllAsync
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    // 持續監聽，有資料時立即處理
    await foreach (var item in _reader.ReadAllAsync(stoppingToken))
    {
        // 立即處理接收到的資料
        await ProcessItem(item);
    }
}

// WaitToReadAsync + TryRead
protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    // while 持續監聽
    while (await _reader.WaitToReadAsync(stoppingToken))
    {
        // 一次處理所有可用的資料
        while (_reader.TryRead(out var item))
        {
            await ProcessItem(item);
        }
    }
}
```

### 基本架構

DI註冊

```csharp
// 註冊 Channel 用於背景服務通訊
var channel = Channel.CreateUnbounded<YourRequestType>();
builder.Services.AddSingleton(channel.Reader);
builder.Services.AddSingleton(channel.Writer);

// 註冊背景服務
builder.Services.AddHostedService<YourBackgroundService>();
```

Controller

```csharp
[HttpPost("trigger-action")]
public async Task<IActionResult> TriggerAction(
    [FromBody] YourRequest requestBody,
    [FromServices] ChannelWriter<YourRequestType> queue) // 也可放在 Controller constructor
{

    // 建立內部請求物件
    var request = new YourRequestType
    {
        Data = requestBody.Data,
        RequestTime = DateTime.Now,
    };

    try
    {
        await queue.WriteAsync(request);
        _logger.LogInformation("Action queued successfully");
        return Ok(new { Message = "Action queued for processing" });
    }
    catch (InvalidOperationException ex) when (ex.Message.Contains("closed"))
    {
        _logger.LogError(ex, "Background service unavailable");
        return StatusCode(503, "Service temporarily unavailable");
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Failed to queue action");
        return StatusCode(500, "Internal server error");
    }
}
```

服務內部

```csharp
public class YourBackgroundService : BackgroundService
{
    private readonly ChannelReader<YourRequestType> _reader;
    private readonly ILogger<YourBackgroundService> _logger;
    private readonly IServiceProvider _serviceProvider; // 用來創造一個 scope 正確管理 DI Lifecycle 

    public YourBackgroundService(
        ChannelReader<YourRequestType> reader,
        ILogger<YourBackgroundService> logger,
        IServiceProvider serviceProvider)
    {
        _reader = reader;
        _logger = logger;
        _serviceProvider = serviceProvider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await foreach (var request in _reader.ReadAllAsync(stoppingToken))
        {
            try
            {
                using var scope = _serviceProvider.CreateScope();
                var logic = scope.ServiceProvider.GetRequiredService<YourLogic>();
                
                await logic.ProcessAsync(request);
                _logger.LogInformation("Request processed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to process request");
            }
        }
    }
}
```

