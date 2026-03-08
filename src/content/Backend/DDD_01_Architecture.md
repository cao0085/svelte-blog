---
title: "Domain-Driven 01 - Concepts"
date: "2026-02-11"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design", "go", "csharp"]
slug: "ddd_01"
---

###### 核心概念就是自定義超多規則保護資料的正確性

---

### 資料驗證

修正已儲存的錯誤資料，成本遠高於在寫入前就將它攔下。系統會透過多層次的防護機制，從源頭降低錯誤發生的機率：

- ```UI Input Rule```: 即時回饋，引導使用者輸入符合基本格式的資料
- ```Strongly Typed Language```: 在編譯期間就提醒開發人員型別錯誤
- ```DB Column Type```: 利用資料庫本身的約束來防止不合法的資料寫入

上述這些技術層面的限制，都無法處理業務邏輯（Business Logic），例如一個庫存管理系統要求 「庫存數量不可為負」：

- ```UI Input Rule```: 無法防止程式邏輯計算後產生的負值
- ```Strongly Typed Language```: 能確保 Quantity 是整數，卻無法約束減法運算的結果
- ```DB Column Type```: 將欄位設為無符號整數，但仍可能因運算而寫入負值（或需額外使用觸發器）

這些技術都無法表達「庫存不得為負」這條業務規則，因此需要這樣處理：

```go
type Stock struct {
    Quantity int32
}

// A. 預購系統
db.update(Stock.Quantity - order)

// B. 零售系統
if Stock.Quantity - order < 0 {
    return // 超賣
}
db.update(Stock.Quantity - order)
```

上面寫法會造成的問題就是，當系統中有 5 個流程可以更新庫存時就會需要寫 5 次檢查，而這就是 DDD 想要解決的問題。

### 資料規則實體化

DDD 提倡將規則封裝在資料模型中，任何外部程式碼要修改資料，都必須透過模型提供的公開方法，由模型自身驗證規則並確保資料的一致性。

```go
// Data Model
type PreOrderStock struct {
    quantity int32
}

func (s *PreOrderStock) Deduct(order int32) {
    s.quantity -= order // 允許負數，代表預購量
}
```

```go
// Data Model
type RetailStock struct {
    quantity int32
}

func (s *RetailStock) Deduct(order int32) error {
    if s.quantity - order < 0 {
        return errors.New("insufficient stock")
    }
    s.quantity -= order
    return nil
}
```

屬性 quantity 欄位都設為私有，修改庫存的方法是呼叫 Deduct 方法，而方法內部則實作了各自對應的業務規則。任何使用此模型的地方都能確保規則被遵守，無需重複撰寫檢查邏輯。

### 描述物件

設計商業系統時經常需要處理 ***現實世界*** 中的物體，可以試想「小明的那支手機」可以如何被描述並紀錄在資料庫？若紀錄了「品牌」和「型號」足以完整描述的這支手機嗎？

**Domain Driven Design** 核心就是如何精確地描述物件和會發生的行為，為了解決這個問題進而提出兩個主要概念：
    - 值物件（Value Object）: 不具備獨立的身分，其意義來自於所含的屬性值
    - 聚合（Aggregate）: 負責維護一群物件的整體一致性，同時又具有識別性

#### Value Object

拿手機的「螢幕尺寸」為例，真實世界並不存在螢幕尺寸為 1 的手機，於是可以將螢幕尺寸封裝成 ```Value Object```，在建構的當下就驗證資料的有效性：

```csharp

public class ScreenSize : ValueObject
{
    public decimal Inches { get; }

    public ScreenSize(decimal inches)
    {
        if (inches <= 1) 
            throw new ArgumentException("螢幕尺寸必須大於 1");
        
        Inches = inches;
    }
}

// 使用方式
var size = new ScreenSize(6.7m);  // 有效
var invalidSize = new ScreenSize(0.05m); // 拋出例外
```

透過這樣的設計確保了任何一個 ScreenSize 存在系統內時就是合乎**規則**。當持續用這種方式描述組合起來的物件並分配一個識別碼，在系統內就稱之為**聚合**。

#### Aggregate

```csharp
public class Phone : AggregateRoot
{
    // 唯一識別碼（例如 IMEI）
    public string Imei { get; private set; } 
    public string Brand { get; private set; }
    public string Model { get; private set; }
    public ScreenSize ScreenSize { get; private set; }

    public Phone(string imei, string brand, string model, ScreenSize screenSize)
    {
        if (string.IsNullOrWhiteSpace(imei)) 
            throw new ArgumentException("IMEI 不可為空");
        
        Imei = imei;
        Brand = brand;
        Model = model;
        ScreenSize = screenSize ?? throw new ArgumentNullException(nameof(screenSize));
    }

    // 行為：更換螢幕（可加入額外規則）
    public void ReplaceScreen(ScreenSize newScreenSize)
    {
        // 例如：只有特定型號允許更換螢幕的規則可在此實作
        ScreenSize = newScreenSize ?? throw new ArgumentNullException(nameof(newScreenSize));
    }
}

// 使用方式
var screen = new ScreenSize(6.7m);
var phone = new Phone("123456789012345", "Apple", "iPhone 14", screen);
```

透過這樣的設計，任何一支 Phone 物件從建立的那一刻起，就擁有合法的螢幕尺寸，並且透過 Imei 與其他手機區別開來。當需要修改螢幕尺寸時，只能呼叫 ReplaceScreen 方法確保同樣經過驗證等等，這個就是 DDD 強調「描述物件」的用意。

<!--  -->

#### Value Object

1. 建構子（Constructor）: 最基本的建立方式，適合單純的驗證與賦值

    ```csharp
    public class ScreenSize : ValueObject
    {
        public decimal Inches { get; }

        public ScreenSize(decimal inches)
        {
            if (inches <= 0) throw new ArgumentException("螢幕尺寸必須大於 0");
            Inches = inches;
        }
    }

    // 使用
    var size = new ScreenSize(6.7m);
    ```

2. 靜態工廠方法（Static Factory Method）：當同一個 Value Object 可能從不同來源建立時，用具名的工廠方法

    ```csharp
    public class Description : ValueObject
    {
        public string Value { get; }

        private Description(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("描述不能為空");
            Value = value;
        }

        public static Description FromPlainText(string text)
            => new Description(text);

        public static Description FromHtml(string html)
            => new Description(Regex.Replace(html, "<.*?>", "").Trim());

        public static Description FromJson(string json)
            => new Description(JsonDocument.Parse(json).RootElement.GetProperty("description").GetString());
    }

    // 使用：不管來源是什麼，最終都正規化為同一種純文字
    var d1 = Description.FromPlainText("好手機");
    var d2 = Description.FromHtml("<p>好手機</p>");
    d1 == d2 // true
    ```

    注意建構子是 `private`，外部無法直接 `new Description()`，強制所有人透過工廠方法建立，確保每種來源都經過對應的處理邏輯。

3. Interface + Domain Service：當沒辦法靠 Value Object 獨自驗證，例如「手機支援的電信頻段是否合法」這件事，頻段清單可能存在資料庫或外部 API 會隨政策變動，不適合寫死在程式碼裡。

    ```csharp
        // Domain 層定義介面：「我需要查頻段是否合法」，但不關心怎麼查
        public interface IBandLookup
        {
            Band FindBand(string bandCode, string regionCode);
        }

        // Domain Service 負責：查外部資料 → 驗證 → 建立 Value Object
        public class BandService
        {
            private readonly IBandLookup _lookup;

            public BandService(IBandLookup lookup)
            {
                _lookup = lookup;
            }

            public SupportedBand CreateBand(string bandCode, string regionCode)
            {
                var band = _lookup.FindBand(bandCode, regionCode);
                if (band == null || !band.IsApproved)
                    throw new ArgumentException($"頻段 {bandCode} 在 {regionCode} 未核准");

                return new SupportedBand(bandCode, regionCode);
            }
        }
    ```

    ```csharp
        // Infrastructure 層提供實作：實際去查資料庫
        public class SqlBandLookup : IBandLookup
        {
            public Band FindBand(string bandCode, string regionCode)
            {
                // 查資料庫...
            }
        }
    ```

    *Interface 本身不是 Value Object 的建立手段。Value Object 最終還是透過建構子或工廠方法建立，Interface 解決的是「建立之前，怎麼取得與驗證外部資料」這件事*

<!--
### temp
# Aggregate 持久化與 Unit of Work

> 參考：Hands-On Domain-Driven Design with .NET Core - 第八章

## 架構分層職責

```
Application Layer    →  開啟/提交 Unit of Work（交易）
Domain Layer         →  業務邏輯，修改 Aggregate
Infrastructure Layer →  Repository 只負責 Load / Save
```

## 基本流程

```csharp
// Application Layer
public class ClassifiedAdService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IClassifiedAdRepository _repo;

    public async Task Handle(UpdateTitle command)
    {
        var ad = await _repo.Load(command.AdId);   // 1. 從 DB 載入
        ad.SetTitle(command.Title);                  // 2. 修改（在記憶體中）
        await _unitOfWork.Commit();                  // 3. Application 層提交
    }
}
```

## 誰在追蹤變更？

ORM 本身（EF Core 的 DbContext）負責追蹤。Repository 和 UnitOfWork **共用同一個 DbContext 實例**。

```csharp
// Infrastructure 層 - Repository
public class ClassifiedAdRepository : IClassifiedAdRepository
{
    private readonly DbContext _dbContext;

    public async Task<ClassifiedAd> Load(Guid id)
    {
        // EF Core 載入後就自動追蹤這個實體
        return await _dbContext.ClassifiedAds.FindAsync(id);
    }
}

// Infrastructure 層 - Unit of Work
public class EfUnitOfWork : IUnitOfWork
{
    private readonly DbContext _dbContext;

    public async Task Commit()
    {
        // DbContext 知道哪些實體被改過，一次送出
        await _dbContext.SaveChangesAsync();
    }
}
```

## 追蹤機制圖解

```
DI 容器註冊（Scoped，每個 Request 共用同一個）
┌───────────────────────────────────────────┐
│            DbContext（同一個實例）            │
│                                             │
│  Repository.Load()                          │
│  → dbContext.Find() → 開始追蹤實體           │
│                                             │
│  ad.SetTitle("xxx")                         │
│  → EF Core 偵測到記憶體中的值改了             │
│                                             │
│  UnitOfWork.Commit()                        │
│  → dbContext.SaveChanges()                  │
│  → EF Core 比對追蹤的實體，產生 SQL 送出      │
│                                             │
└───────────────────────────────────────────┘
```

## 為什麼交易在 Application 層而不是 Repository 層？

如果交易在 Repository 層，每次 `Save` 就提交，當一個業務操作要改**多個 Aggregate** 時就會出問題：

```csharp
// Application Layer - 一個操作改兩個東西
public async Task Handle(PublishAd command)
{
    var ad = await _adRepo.Load(command.AdId);
    ad.Publish();

    var user = await _userRepo.Load(ad.OwnerId);
    user.IncrementPublishedCount();

    // 交易在 Application 層 → 兩個一起成功或一起失敗
    // 如果交易在 Repository 層 → ad 存成功但 user 失敗 → 資料不一致
    await _unitOfWork.Commit();
}
```

## DI 註冊

```csharp
// Program.cs
services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Scoped = 每個 HTTP Request 共用同一個 DbContext
services.AddScoped<IUnitOfWork, EfUnitOfWork>();
services.AddScoped<IClassifiedAdRepository, ClassifiedAdRepository>();
```

> **重點**：同一個 Request 內，Repository 和 UnitOfWork 用的是同一個 DbContext 實例，所以追蹤是通的。Application 層呼叫 `Commit()` 時，ORM 知道哪些東西被改過，一次產生 SQL 送出。 -->

<!-- # EF Core 追蹤與 Value Object 回寫

> 參考：Hands-On Domain-Driven Design with .NET Core - 第八章延伸

## 核心問題

Aggregate 裡用了 Value Object，和 DB Table 結構不一致，EF Core 還能追蹤和回寫嗎？

**可以。** 用 Fluent API 設定映射關係後，EF Core 全程自動處理。

## Aggregate 與 DB Table 的映射

```csharp
// Domain - Aggregate 用 Value Object
public class ClassifiedAd : AggregateRoot
{
    public ClassifiedAdId Id { get; }
    public Description Title { get; private set; }  // Value Object
    public Money Price { get; private set; }          // Value Object (Amount + Currency)
}

// DB Table
// ClassifiedAds: Id (Guid), Title (string), PriceAmount (decimal), PriceCurrency (string)
```

用 Fluent API 告訴 EF Core 怎麼轉換：

```csharp
// Infrastructure 層 - EntityTypeConfiguration
public class ClassifiedAdConfiguration : IEntityTypeConfiguration<ClassifiedAd>
{
    public void Configure(EntityTypeBuilder<ClassifiedAd> builder)
    {
        builder.HasKey(x => x.Id);

        // Value Object: ClassifiedAdId → Guid
        builder.Property(x => x.Id)
            .HasConversion(id => id.Value, guid => new ClassifiedAdId(guid));

        // Value Object: Description → string
        builder.Property(x => x.Title)
            .HasConversion(d => d.Value, s => Description.FromPlainText(s));

        // Value Object: Money → 兩個欄位
        builder.OwnsOne(x => x.Price, price =>
        {
            price.Property(p => p.Amount).HasColumnName("PriceAmount");
            price.Property(p => p.Currency).HasColumnName("PriceCurrency");
        });
    }
}
```

## Value Object 更新流程

Domain 層只管驗證和改值，EF Core 自動處理回寫：

```csharp
// Domain - Aggregate 方法
public class ClassifiedAd : AggregateRoot
{
    public void SetTitle(Description newTitle)
    {
        // 驗證已經在 Description 建立時做完了
        Title = newTitle;
    }

    public void UpdatePrice(Money newPrice)
    {
        Price = newPrice;
    }
}
```

```csharp
// Application Layer
public async Task Handle(UpdateTitle command)
{
    var ad = await _repo.Load(command.AdId);

    // Description.FromHtml 裡面已經做了驗證和正規化
    // 如果不合法，這裡就會直接拋例外，不會走到下面
    var newTitle = Description.FromHtml(command.HtmlTitle);

    ad.SetTitle(newTitle);  // 只是把 Value Object 換掉

    await _unitOfWork.Commit();
}
```

## EF Core 背後發生的事

```
1. Load
   → DbContext 追蹤 ad，記住 Title.Value = "舊標題"

2. SetTitle
   → 記憶體中 Title 被換成新的 Description

3. Commit → SaveChangesAsync()
   → EF Core 比對：Title.Value 從 "舊標題" 變成 "新標題"
   → 透過 Fluent API 的 HasConversion 知道怎麼轉
   → 產生 SQL: UPDATE ClassifiedAds SET Title = '新標題' WHERE Id = '...'
```

## 注意：必須透過 DbContext 載入才有追蹤

```csharp
// ✅ 透過 DbContext 載入 → 自動追蹤
var ad = await _dbContext.ClassifiedAds.FindAsync(id);
ad.SetTitle(newTitle);
await _dbContext.SaveChangesAsync(); // 產生 UPDATE SQL

// ❌ 自己 new → EF Core 不知道這個物件
var ad = new ClassifiedAd(data.Id, data.Title);
ad.SetTitle(newTitle);
await _dbContext.SaveChangesAsync(); // 什麼都不會發生
```

## 職責劃分

| 誰 | 負責什麼 |
|---|---|
| Value Object | 建立時驗證資料正確性 |
| Aggregate | 透過方法控制修改，維護不變量 |
| Fluent API | 定義 Value Object ↔ DB 欄位的轉換規則 |
| EF Core (DbContext) | 追蹤變更，自動產生 SQL |
| Application Layer | 編排流程，控制交易提交 |

> **重點**：你完全不需要手動寫任何 UPDATE 邏輯。Value Object 的驗證歸 Domain，資料轉換歸 Fluent API，變更偵測歸 EF Core，各自負責自己的事。 -->
