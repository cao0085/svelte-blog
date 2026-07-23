---
title: "Domain-Driven 07 - ORM Model"
date: "2026-07-23"
category: ""
subCategory: "Backend"
tags: ["DDD", "backend", "design", "csharp", "ORM"]
slug: "ddd_07"
---
###### Domain Aggregate 如何配合 EFCore 資料庫採用 PostgreSQL。

---

拿公司作為資料建模範例，假設需要持久化的資料有```唯一識別、公司名稱、負責人、類型、稅籍編號、聯繫地址```。

基礎的 EF ModelBuilder:

```csharp
public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.ToTable("companies");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Type)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Owner)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.GUINumber)
            .IsRequired();

        builder.Property(x => x.Address)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.CreatedAt)
            .HasColumnType("timestamptz")
            .IsRequired();

        builder.Property(x => x.UpdatedAt)
            .HasColumnType("timestamptz");
    }
}
```

DDD Aggregate 標準寫法可能長得像:

```csharp
public class Company
{
    public CompanyId Id { get; private set; }

    public CompanyType Type { get; private set; }

    /// <summary>統一編號。落地後會是唯一索引，是這個聚合的自然鍵。</summary>
    public GuiNumber GuiNumber { get; private set; }

    /// <summary>名稱 / 負責人 / 地址，一起變動故包成一個 VO。</summary>
    public BasicInfo BasicInfo { get; private set; }

    public DateTime CreatedAt { get; private set; }

    public DateTime? UpdatedAt { get; private set; }

    private Company(CompanyId id, CompanyType type, GuiNumber guiNumber, BasicInfo basicInfo)
    {
        Id = id;
        Type = type;
        GuiNumber = guiNumber;
        BasicInfo = basicInfo;
        CreatedAt = DateTime.UtcNow;
    }

    public static Company Create(CompanyType type, GuiNumber guiNumber, BasicInfo basicInfo)
    {
        ArgumentNullException.ThrowIfNull(guiNumber);
        ArgumentNullException.ThrowIfNull(basicInfo);

        return new Company(CompanyId.Create(), type, guiNumber, basicInfo);
    }

    // ── 商業行為 ────────────────────────────────────────────────

    /// <summary>整批更新基本資料。名稱、負責人、地址同進同出，不會有中間狀態。</summary>
    public void ChangeBasicInfo(BasicInfo basicInfo)
    {
        ArgumentNullException.ThrowIfNull(basicInfo);

        if (BasicInfo == basicInfo) // record 的值相等，內容沒變就不動
            return;

        BasicInfo = basicInfo;
        Touch();
    }

    public void ChangeOwner(string? owner) => ChangeBasicInfo(BasicInfo.WithOwner(owner));

    public void Relocate(string? address) => ChangeBasicInfo(BasicInfo.WithAddress(address));
}
```

可以看出 Runtime 使用的資料模型```Class Company```，因為領域規則的關係並沒有和資料表```<Company>```貼齊欄位；若不處理欄位轉換，應用/基礎層會長得像是:

```csharp
// 查詢時：條件得先拆成 primitive
var row = await db.Companies
    .FirstOrDefaultAsync(x => x.GuiNumber == "12345675");

// 讀出來的是資料列，得自己組回領域物件才能用領域行為
var company = Company.Create(
    (CompanyType)row.Type,
    new GuiNumber(row.GuiNumber),
    new BasicInfo(row.Name, row.Owner, row.Address));

company.Relocate("台北市信義區市府路 1 號");

row.Address = company.BasicInfo.Address;
row.UpdatedAt = company.UpdatedAt;

await db.SaveChangesAsync();
```

這樣除了程式碼冗長外還會失去 DDD 架構保護資料正確性的原意，所以會期望像這樣操作:

```csharp
// 直接用領域型別查詢與操作，EF 負責在邊界翻譯
var company = await db.Companies
    .FirstOrDefaultAsync(x => x.GuiNumber == new GuiNumber("12345675"));

company.Relocate("台北市信義區市府路 1 號");

await db.SaveChangesAsync();
```

也就是說，目標是讓 EFCore 能自動處理 DB Table 的基礎型別轉換至自訂義型別(聚合、值物件)。

### Properties

EF 慣例是「所有 public 且同時有 getter / setter 的屬性都會被納入」，欄位名稱預設等同屬性名稱，資料型別由 provider 依 .NET 型別推斷。

#### DB Set & Migration

在 Code First 做資料庫管理的情況下，會使用到 EFCore Migration 功能```dotnet ef migrations add <MigrationName>```；它會參考 ModelBuilder 產生一份 Migration 類別(用於描述如何更新資料庫表單結構)。在 app 啟動時執行 Database.Migrate() 把尚未套用的 migration 依序寫入資料庫。

```csharp
public class AppDbContext : DbContext
{
    // 1：暴露成 DbSet 屬性
    public DbSet<Company> Companies => Set<Company>();

    // 2：在 OnModelCreating 明確指定
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        modelBuilder.ApplyConfiguration(new CompanyConfiguration());
    }

    // 3：從已知 entity 的 navigation property 遞迴探索。假設 Company 之後長出 public List<Branch> Branches { get; set; }，那 Branch 就算沒有 DbSet、也沒在 OnModelCreating 出現，一樣會被自動拉進 model。
}
```

#### Generated Properties

每個屬性在存進 DB 前，值可能來自應用程式或資料庫，EF 用 ValueGenerated 三種模式描述：
    - ValueGeneratedNever(): 應用程式直接產生
    - ValueGeneratedOnAdd(): DB INSERT 時產生(自增 ID、建立時間)
    - ValueGeneratedOnAddOrUpdate(): DB，INSERT 和 UPDATE 都會(計算欄位、rowversion、更新時間)

```csharp

// 1. 預設值：只在 INSERT 且該欄位沒給值時套用
builder.Property(x => x.CreatedAt).HasDefaultValueSql("now()");
builder.Property(x => x.Type).HasDefaultValue(CompanyType.LimitedCompany);

// 2. 計算欄位：DB 依公式算，應用程式永遠不能寫
builder.Property(x => x.DisplayName)
    .HasComputedColumnSql("name || '(' || gui_number || ')'", stored: true);
```

另外 EF 判斷「有沒有給值」的方式，是看這個屬性是不是等於 CLR 型別的預設值（0、false、null）。所以可能會有宣告值被預設值取代的問題：

```csharp
builder.Property(x => x.IsActive).HasDefaultValue(true);

var company = new Company { IsActive = false };  // 你明明設了 false
await db.SaveChangesAsync();
// → EF 認為「false 就是沒設」，欄位不放進 INSERT，DB 套用預設值 true
// → 存進去變成 true

// EF Core 7 之後可以用 HasSentinel() 改變「什麼值算作沒設」來解決：
builder.Property(x => x.IsActive)
    .HasDefaultValue(true)
    .HasSentinel(null);   // 需要屬性型別是 bool?
```

#### Shadow Properties

在 EF 模型裡存在，但 C# 類別裡不存在的屬性。常用於一些稽核欄位```CreatedBy、LastModified、RowVersion```，保持領域概念同時符合基礎設施的需求。

```csharp
public class Company
{
    public CompanyId Id { get; }
    public string Name { get; }
    // 沒有 LastAccessedAt 這個屬性
}

builder.Property<DateTime>("LastAccessedAt");

// migration 會產生 last_accessed_at 欄位，查詢時 EF 也會讀它 —— 只是這個值不存在物件上，而是存在 ChangeTracker 裡。所以存取方式不一樣：

// 讀寫：透過 Entry
var value = db.Entry(company).Property<DateTime>("LastAccessedAt").CurrentValue;
db.Entry(company).Property("LastAccessedAt").CurrentValue = DateTime.UtcNow;

// 查詢：透過 EF.Property
var recent = await db.Companies
    .Where(c => EF.Property<DateTime>(c, "LastAccessedAt") > cutoff)
    .ToListAsync();
```

最常見的 shadow property 不是手動宣告的，而是慣例自動建的外鍵：

```csharp
line.WithOwner().HasForeignKey("xxxxxxId");   // ← 這個字串就是 shadow property
```

#### Setting

而 EF 允許使用 Data Annotations 或 Fluent API 這兩種方式套用上述設定修改預設值，衝突時優先序會是 Fluent API > Data Annotations。

```csharp
// Data Annotations
[Table("companies")]
public class Company
{
    [Key]                      // 慣例已會認得 Id / CompanyId，通常不必寫
    public CompanyId Id { get; }

    public CompanyType Type { get; }

    // 欄位名稱：預設同屬性名，可改
    [Column("gui_number")]
    [MaxLength(8)]
    [Unicode(false)]                        // 純 ASCII，省空間
    [Comment("統一編號")]                    // 註解寫進 DB schema
    public int GUINumber { get; }

    [MaxLength(100)]
    public string Name { get; }

    [MaxLength(50)]
    public string? Owner { get; }

    [MaxLength(200)]
    public string? Address { get; }

    // 值由 DB 產生：INSERT 時自動填 now()
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(TypeName = "timestamptz")]
    public DateTime CreatedAt { get; }

    // 由領域行為維護（Touch()），非 DB 產生
    [Column(TypeName = "timestamptz")]
    public DateTime? UpdatedAt { get; }

    // 排除不想落地的屬性
    [NotMapped]
    public string DisplayName => $"{Name}({GUINumber})";

    // 注意：shadow property 無法用 Data Annotations 表達，
    //       因為它「在類別上根本不存在」——只能用 Fluent API。
}

// Fluent API
public void Configure(EntityTypeBuilder<Company> builder)
{
    builder.ToTable("companies");

    // ── Key ──────────────────────────────────────────────
    builder.HasKey(x => x.Id)
        .HasName("pk_companies");              // 自訂約束名稱

    // 主鍵值由領域產生（CompanyId.Create()），不要讓 DB 生
    builder.Property(x => x.Id)
        .ValueGeneratedNever();

    // 替代鍵：統編是自然鍵，唯一但不當主鍵
    builder.HasAlternateKey(x => x.GUINumber);

    // ── Property ─────────────────────────────────────────
    // 欄位名稱：預設同屬性名，可改
    builder.Property(x => x.GUINumber)
        .HasColumnName("gui_number")
        .HasMaxLength(8)
        .IsUnicode(false)                       // 純 ASCII，省空間
        .HasComment("統一編號");                 // 註解寫進 DB schema

    builder.Property(x => x.Name)
        .HasMaxLength(100);

    builder.Property(x => x.Owner)
        .HasMaxLength(50);

    builder.Property(x => x.Address)
        .HasMaxLength(200);

    // ── Generated Properties ─────────────────────────────
    // INSERT 時由 DB 產生，應用程式不必也不該給值
    builder.Property(x => x.CreatedAt)
        .HasColumnType("timestamptz")
        .HasDefaultValueSql("now()")
        .ValueGeneratedOnAdd();

    // 由領域行為 Touch() 維護，DB 不介入
    builder.Property(x => x.UpdatedAt)
        .HasColumnType("timestamptz")
        .ValueGeneratedNever();

    // ── Shadow Properties ────────────────────────────────
    // 稽核欄位屬於基礎設施關注點，落地但不進領域模型
    builder.Property<string>("CreatedBy")
        .HasMaxLength(50);

    builder.Property<DateTime>("LastModified")
        .HasColumnType("timestamptz");

    // 排除不想落地的屬性
    builder.Ignore(x => x.DisplayName);
}
```

DDD 架構下的分層概念是 Domain Layer 位於依賴的最內層，不應依賴任何其他層和框架。Data Annotations 會強迫領域模型引用 ```System.ComponentModel.DataAnnotations.Schema``` 與 ```Microsoft.EntityFrameworkCore```，讓 Domain 反過來依賴 Infrastructure。因此必須採 Fluent API 的形式，透過```IEntityTypeConfiguration<T>``` 把資料表、欄位型別、值轉換這些持久化細節留在 Infrastructure Layer。

#### Value Conversions

值轉換器允許在從資料庫讀取或寫入資料時轉換屬性值。這種轉換可以是同類型值之間的轉換（例如，加密字串），也可以是不同類型值之間的轉換。

```csharp
public class Company
{
    public CompanyId Id { get; }
    public CompanyType Type { get; }
}

public enum CompanyType
{
    LimitedCompany,
    CorporationLimited,
    SoleProprietorship,
    Partnership
}

public void Configure(EntityTypeBuilder<Company> builder)
{
    // 這樣 CompanyType.LimitedCompany 在資料庫裡就是字串 "LimitedCompany"，而不是整數 0。
    builder.Property(x => x.Type)
        .HasConversion(
            // 寫入方向 (ModelClrType → ProviderClrType)：存檔時把 enum 轉成字串
            v => v.ToString(),
            // 讀取方向 (ProviderClrType → ModelClrType)：物化時把字串轉回 enum
            v => (CompanyType)Enum.Parse(typeof(CompanyType), v));
}
```

轉換器由兩個 ***Func 運算式樹*** 組成：一個從 ModelClrType（C# 端的型別，這裡是 CompanyType）轉到 ProviderClrType（資料庫看得懂的型別，這裡是 string）。用運算式樹而非委派，是為了讓 EF 能把轉換邏輯直接編譯進資料存取的委派裡，效率等同於 inline。

### Entity types

#### Construction

```csharp
public class Company
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Owner { get; set; }
    public string Address { get; set; }
    public int Type { get; set; }
    public string GuiNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

var company = new Company
{
    Id = Guid.NewGuid(),
    Name = "測試股份有限公司",
    Owner = "王小明",
    Address = "台北市中正區",
    Type = 1,
    GuiNumber = "12345675",
    CreatedAt = DateTime.UtcNow
};
db.Companies.Add(company);

// 修改：ChangeTracker 比對前後值，自動產生 UPDATE
company.Address = "台北市信義區市府路 1 號";
company.UpdatedAt = DateTime.UtcNow;

await db.SaveChangesAsync();
```

此建構方式沒有任何 **不變式(invariant)** 保護 —— 它允許 `Name` 被設成空字串、允許 `GuiNumber` 是 `"abc"`也允許繞過所有規則直接改欄位，與領域模型需要的「封裝」是直接衝突的。

所以在 DDD 架構下要使用 EF 提供的另一個建構方式「如果找得到一個參數名稱與型別都對得上已對應屬性的建構式，它會**直接呼叫那個建構式**」。

```csharp
public class Company
{
    // EF 具體化時會呼叫這個，不需要無參數建構式
    private Company(CompanyId id, CompanyType type, DateTime createdAt)
    {
        Id = id;
        Type = type;
        CreatedAt = createdAt;
    }

    public CompanyId Id { get; private set; }
    public CompanyType Type { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }   // 沒進建構式 → EF 事後 set
}
```

採用哪種建構式 EF 並無開放 API 指定，是根據該```Class有無建構式```來決定；在沒有明確寫任何建構式時，C# 會自動補一個 public 的；但只要你宣告了帶參數的建構式，這個預設建構式就會消失了，EF 也就找不到方法建立物件。

- 參數名稱與型別必須對得上屬性，唯一容許的差異是屬性 PascalCase、參數 camelCase。
- 不必涵蓋所有屬性；沒涵蓋的 EF 照舊用 setter 填。
- 建構式的存取層級不拘，`private` 也可以，剛好符合 DDD「只開放工廠方法建立聚合」的意圖。唯一例外是啟用 lazy-loading proxies 時，proxy 是繼承你的類別，建構式至少要 `protected`。

#### Navigation & VO

EF 對「已對應屬性」這個前提有不同判別:
    1. 一般屬性: 型別是 primitive、`DateTime`、`enum` 這類，一個屬性對一個欄位，直接可繫結。
    ```csharp
    private Company(CompanyId id, DateTime createdAt) { /* ... */ }
    //                            ^^^^^^^^^^^^^^^^^ 對 created_at 一欄，沒問題
    ```
    2. 單值物件: 型別雖然是自訂的 `CompanyId`、`GuiNumber`，但透過 `HasConversion` 對應；EF 只是在讀寫時多做一次型別轉換，在模型裡它仍然是一個屬性對一個欄位：
    ```csharp
    builder.Property(x => x.GuiNumber)
        .HasConversion(v => v.Value, v => new GuiNumber(v));
    ```
    3. 多欄位值物件: 例如 `BasicInfo` 包含名稱 / 負責人 / 地址三個值，一個欄位放不下，只能用 `OwnsOne` 展開成三欄：
    ```csharp
    builder.OwnsOne(x => x.BasicInfo, b =>
    {
        b.Property(p => p.Name).HasColumnName("name").HasMaxLength(100);
        b.Property(p => p.Owner).HasColumnName("owner").HasMaxLength(50);
        b.Property(p => p.Address).HasColumnName("address").HasMaxLength(200);
    });
    ```

要特別提的是 `BasicInfo 設定 OwnsOne` 後在 EF 模型裡就不再是屬性，而是**導覽(navigation)**。而 EF 不能透過建構式設定任何導覽，原因在具體化的順序：EF 得先把 `Company` 本身建出來，才知道要往哪裡掛它的關聯物件；建構式執行的當下，導覽的資料根本還沒讀進來。把這三層套回聚合：

```csharp
private Company(CompanyId id, CompanyType type, GuiNumber guiNumber, BasicInfo basicInfo)
```

| 參數 | 對應方式 | 在 EF 模型裡是 | 能否轉換 |
|---|---|---|---|
| `CompanyId` | `HasConversion`（單一欄位） | 屬性 | ✅ |
| `CompanyType` | `HasConversion` 成字串 | 屬性 | ✅ |
| `GuiNumber` | `HasConversion`（單一欄位） | 屬性 | ✅ |
| `BasicInfo` | `OwnsOne`（展開成三欄） | 導覽 | ❌ |

只要有一個參數對不上，整個建構式就不會符合轉換條件。EF 會退回去找無參數建構式；在找不到就在建立模型或查詢時直接**拋例外**。所以實務上的做法是**另外留一個給 EF 用的私有無參數建構式**：

```csharp
public class Company
{
    /// <summary>EF Core 具體化專用。領域端一律走 Create()。</summary>
    private Company() { }

    // BasicInfo 因為導覽判斷關係 EF 判定呼叫不到
    private Company(CompanyId id, CompanyType type, GuiNumber guiNumber, BasicInfo basicInfo)
    { /* ... */ }

    // 此呼叫的是 Company(CompanyId id, ...)
    public static Company Create(...) => new Company(CompanyId.Create(), ...);
}
```

*EF 挑選採購的建構式大致是【取出所有建構式 -> 逐一檢查 -> 符合條件中參數最多 -> 採用/拋例外】*

如果連 `private set` 都不想留，可以讓 EF 直接寫欄位。EF 依慣例會去找 `_name`、`_Name`、`m_name` 這類命名的欄位；找不到就用 Fluent API 指定：

```csharp
public class Company
{
    private readonly List<Branch> _branches = new();

    /// <summary>對外唯讀，任何異動都得走領域方法。</summary>
    public IReadOnlyCollection<Branch> Branches => _branches.AsReadOnly();

    public void OpenBranch(Branch branch) => _branches.Add(branch);
}

builder.Metadata
    .FindNavigation(nameof(Company.Branches))!
    .SetPropertyAccessMode(PropertyAccessMode.Field);   // 讀寫都走 _branches
```

#### Owned Entity Types

指的是「只能出現在其他實體導覽屬性上的實體型別」，持有它的那一方叫 owner。它本身不需要宣告主鍵，且 EF 會替它建一個 shadow property (同 owner 的主鍵值)當主鍵；這個特性剛好與 DDD VO 十分契合。

```csharp
// 1. Data Annotations：標在型別上，該型別被任何實體引用時都算 owned
[Owned]
public record BasicInfo(string Name, string? Owner, string? Address);

// 2. Fluent API
builder.OwnsOne(x => x.BasicInfo);
// 如果導覽屬性本身是 private，Lambda 寫不出來，可以用字串版：
builder.OwnsOne(typeof(BasicInfo), "BasicInfo");
```

關聯式資料庫下，reference 型的 owned type **預設跟 owner 對應到同一張表**，也就是所謂的 table splitting：一張表的欄位被切成兩半，一半屬於 owner、一半屬於 owned。

OwnsOne:

```csharp
builder.OwnsOne(x => x.BasicInfo, b =>
{   
    // 預設欄位名是 `導覽名稱_屬性名稱`，所以不設定的話會是 `BasicInfo_Name`...
    b.Property(p => p.Name).HasColumnName("name").HasMaxLength(100);
    b.Property(p => p.Owner).HasColumnName("owner").HasMaxLength(50);
    b.Property(p => p.Address).HasColumnName("address").HasMaxLength(200);
});

// 如果不想擠在同一張表，可以用`ToTable` 就能拆出去：
builder.OwnsOne(x => x.BasicInfo, b => b.ToTable("company_basic_info"));
```

OwnsMany 集合的情況下 shadow 主鍵不能直接沿用 owner 的鍵(會無法區分)。EF 預設的做法是**用 (FK, Id) 組合鍵**，也就是 `("CompanyId", "Id")`:

```csharp
// 集合
builder.OwnsMany(x => x.Branches, b =>
{
    b.Property(p => p.Name).HasColumnName("name");
});

// 更換獨立主鍵也可以，但通常沒必要
```csharp
builder.OwnsMany(x => x.Branches, b =>
{
    b.WithOwner().HasForeignKey("company_id");
    b.Property<int>("Id");
    b.HasKey("Id");
});
```

#### ComplexProperty

complex type 就是「多欄位的值」，這就和 VO 的定義就完全一致，兩個內容相同的 `BasicInfo` 就是同一個值。

```csharp
builder.ComplexProperty(x => x.BasicInfo, b =>
{
    b.Property(p => p.Name).HasColumnName("name").HasMaxLength(100);
    b.Property(p => p.Owner).HasColumnName("owner").HasMaxLength(50);
    b.Property(p => p.Address).HasColumnName("address").HasMaxLength(200);
});
```

它與 owned 的實際差別在追蹤語意。owned 是實體，同一個實例不能掛在兩個 owner 上(key的原因)；complex type 可以自由共用：

```csharp
// OwnsOne：同一實例掛到兩處 → 例外
// ComplexProperty：正常，就只是把同樣的值寫進兩組欄位
order.BillingAddress = customer.Address;
order.ShippingAddress = customer.Address;
```

不過共用實例帶來另一個問題。如果 complex type 是可變的參考型別，改一個地方會連動所有共用它的位置；這不會是預期行為，所以官方明確建議：**complex type 一律做成不可變的**：

```csharp
customer.Address.Line1 = "新地址";
await db.SaveChangesAsync();
// → Customers、Orders 的 billing / shipping 三組欄位全部被 UPDATE

// record + init（C# 9+）
public record BasicInfo
{
    public string Name { get; init; }
    public string? Owner { get; init; }
    public string? Address { get; init; }
}

// record 主建構式（C# 12+），最精簡
public record BasicInfo(string Name, string? Owner, string? Address);

// readonly record struct（C# 10+），連參考共用的問題都沒有，官方推薦
public readonly record struct BasicInfo(string Name, string? Owner, string? Address);

// 不可變之後，更新一律靠 `with` 產生新實例：
customer.Address = customer.Address with { Line1 = "新地址" };
```

complex type 可以自包 complex type，鏈式設定：

```csharp
// 欄位名會逐層疊加，變成 `Contact_Address_City` 這種形式。
builder.ComplexProperty(x => x.Contact, c =>
{
    c.ComplexProperty(e => e.Address);
    c.ComplexProperty(e => e.HomePhone);
});
```

看似方便但是還有些不能取代 `OwnsOne` 的原因：

- 不支援集合（沒有 `ComplexCollection`），聚合內的子實體集合仍然只能用 `OwnsMany`。
- 不支援可為 null 的 complex property，VO 若可能是 `null`，只能回去用 `OwnsOne`。
- 不支援對應到 JSON 欄位。
- 不支援建構式繫結，所以前面那個給 EF 用的私有無參數建構式還是拿不掉。
- 不支援 seed data；Cosmos provider 與 InMemory provider 也還沒支援（會影響用 InMemory 寫測試的專案）

另外 complex type 不會支援對應到自己的資料表，它的定位就是 inline 展開。需要拆表就只能使用owned。

### 小結

盡量讓 EF builder 只負責型別轉換，規則限制留在領域規則內處理。
