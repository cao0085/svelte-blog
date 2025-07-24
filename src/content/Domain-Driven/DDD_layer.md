---
title: "Domain-Driven Design - Basic Layer"
date: "2025-06-22"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design"]
slug: "ddd_layer"
---
這是第一篇文章，用來展示部落格如何從 markdown 載入內容。

---

## Web Layer

Controller 是接收 HTTP Request 的入口，負責對接外部應用程式。
實例 **消息控制器(Mediator)** 的地方，僅作為轉發者（Request Dispatcher）指定事件指令&回傳格式，不做商業邏輯處理

```csharp
[HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
{
    var result = await _mediator.Send(command);
    return Ok(result);
}
```

## Application Layer

主要負責實作 Command / Query 物件 與其對應的 Handler 處理器

Handler 中會

- 取得並操作 Domain 層定義的 Aggregate / Value Object
- 結合外部輸入（如 Request Body DTO），執行業務流程與驗證邏輯
- 將驗證後的資料傳遞至 **Infrastructure** 層，進行資料存取(Repository)或第三方(AuthService)互動。

若有實作 CQRS（讀寫分離）

- 讀取邏輯（Query + Handler） 可透過 IReadRepository / ReadModel / ViewModel
- 將 Read 專用 Repository Interface 也放置在 Application 層，避免對 Domain 汙染

DDD 中的 DTO（Data Transfer Object）

- 與 Domain Model（Aggregate / ValueObject）分離，不承擔任何商業規則驗證
- 也常搭配 FluentValidation 先進行格式驗證
- 可作為 Request body/Response 輸出格式 Mapping 對象

## Domain Layer

DDD 架構的核心，必須完全獨立、不依賴其他層（如 Application / Infrastructure），所有核心邏輯、商業規則、狀態控制都應封裝在這一層。

Aggregate Root（聚合根）

- 代表一組關聯物件的 一致性邊界（Consistency Boundary）。
- 定義資料規格與唯一性規則（如 ID）
- 驗證狀態轉移是否合理
- 維護領域不變式（Invariant）

Value Object（值物件）

- 沒有識別性（ID），補強 Aggregate 的欄位定義，確保欄位規則（格式、範圍）正確性。
- 通常不可變（Immutable），常用於輸入驗證與例外處理。

Factory

- 專責建立 新的 Aggregate 實體，將複雜的初始化規則封裝起來。

可以集中初始化的邏輯、避免外部自行 new 對象產生違規狀態。

Domain Event

- 表示領域內「發生過的事」。
- 由 Aggregate 發出、由 Application Layer 的 Handler 處理後續流程（例如通知、同步、儲存等）。
- 保持單向依賴（Domain 發出事件，不處理後續）。

Interface

- 在 Domain 中定義對外依賴的介面（如 IUserRepository、INotificationService）。
- 實作則由 Infrastructure 層提供，以支援 依賴反轉（DIP）原則，讓 Domain 不耦合具體技術細節。

## Infrastructure Layer

基礎設施 DI Injection & DBContext & Repositroy & Service(JWT) & Outbox ...等。
同時負責實作 Domain 定義的介面，並將應用程式所需的各類依賴透過 依賴注入（DI） 註冊進容器中。
