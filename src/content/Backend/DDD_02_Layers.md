---
title: "Domain-Driven 02 - Layer Structure"
date: "2026-02-12"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design", "csharp"]
slug: "ddd_02"
---

###### 分成三層 Domain, Application, Infrastructure Layer 互相有明確的依賴關係

---

### Domain Layer

需要完全獨立不可以依賴其他層（如 Application / Infrastructure），所有核心邏輯、狀態控制都應封裝在這一層。

#### Aggregate Root

- 定義資料規格與唯一性規則
- 代表一組關聯物件的一致性邊界 Consistency Boundary
- 驗證狀態轉移是否合理
- 維護領域不變式（Invariant）

#### Value Object

- 沒有識別性（ID），用來補強 Aggregate 的欄位定義，確保欄位規則（格式、範圍）正確性
- 通常不可變（Immutable），常用於輸入驗證與例外處理

#### Factory

- 專責建立新的 Aggregate 實體，將複雜的初始化規則封裝起來
- 集中初始化的邏輯、避免外部自行 new 對象產生違規狀態

#### Domain Event

- 保持單向依賴，不處理後續
- Aggregate 發出、同常由 Application Layer 的 Handler 處理後續流程（例如通知、同步、儲存等）

#### Function Interface

- 在 Domain 中定義對外依賴的介面（如 IUserRepository、INotificationService）
- 實作則由 Infrastructure 層提供，支援依賴反轉（DIP）原則，讓 Domain 不耦合具體技術細節

### Application Layer

應用層是 DDD 架構的入口點，負責接收外部請求（如 Web API、背景工作、訊息佇列等），將任務委派給```Doamin Aggregate``` 並同時調用 ```Infrastructure Layer``` 的基礎實作，此層設計應表明 **操作意圖** 每個方法通常對應完整的使用場景。(與 Infra layer 的依賴關係有點模糊)

#### Command & Query

在 DDD 架構中不希望資料異動被區分掉，但是查詢需求容易被替換和，所以發展出 Command Query Responsibility Segregation，同時在緩存處理上職責也會更清晰

- Command：代表改變系統狀態的操作（寫入），並在應用層邊界進行基本的格式驗證（如必要欄位、長度限制）。

- Query：代表查詢資料的操作（讀取），它定義了查詢所需的參數，並期望返回扁平化的視圖模型（View Model），不涉及領域邏輯。

#### Handler

每一個 Command 或 Query 都會有對應的 Handler 負責處理，是應用層的核心：

- 從 Repository 實作取得所需的領域物件。

- 呼叫領域物件的方法執行業務邏輯。

- 將結果轉換為 Response 並回傳。

- 大多不應直接操作基礎設施，通常依賴於 Domain Layer 定義的介面，具體實作由 Infrastructure 層提供。

#### Response

定義回傳給呼叫端的資料結構，通常是從領域物件轉換而來的 DTO（Data Transfer Object）。Response 應盡量扁平化，避免暴露領域物件的內部結構，同時可包含多個領域物件的組合資訊。

#### Read Interface

應用層也可定義查詢介面，每個方法直接返回對應的 Response DTO 。優點是可以讓視圖模型不受領域模型的限制，保持依賴關係分離且提升查詢效能，具體實作通常於基礎設施層。

### Infrastructure Layer

負責實作應用程式內定義的介面，並將各類依賴透過依賴注入（Dependency Injection）註冊到容器中，確保依賴層無需關心底層技術的變化。常見的基礎設施包括：

- 資料存取：實作 IOrderRepository 等介面，使用 Entity Framework Core、Dapper 或任何 ORM 操作資料庫。

- DbContext：管理資料庫連線與變更追蹤，通常與 Repository 實作緊密整合。

- 外部服務整合：例如 JWT 驗證服務、郵件發送服務、檔案儲存服務等，這些服務會實作領域層定義的 ITokenService、IEmailSender 等介面。

- 基礎架構支援：如 Outbox 模式的實作，確保領域事件可靠發佈；快取機制（Redis/MemoryCache）；訊息佇列生產者（RabbitMQ/Kafka）等。

### 外部入口

作為請求的轉發者（Request Dispatcher）是系統與外界互動的邊界，負責接收來自客戶端的請求（如 HTTP Request、Console 指令、背景觸發事件等）；它只應依賴```Application Layer``` 且能不包含任何邏輯，以典型的 Web API 情境中，外部入口由 Controller 實作：

- 接收 HTTP 請求，解析輸入參數。

- 將輸入轉換為應用層定義的 Command 或 Query 物件。

- 透過中介者（如 MediatR）或直接呼叫應用層的 Handler，執行對應的用例。

- 將 Handler 回傳的 Response 序列化為 HTTP Response，返回給客戶端。

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;

    public UsersController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
    {
        var result = await _mediator.Send(command);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser([FromRoute] GetUserByIdQuery query)
    {
        var user = await _mediator.Send(query);
        return user != null ? Ok(user) : NotFound();
    }
}
```