---
title: "Domain-Driven 07 - ORM Query"
date: "2026-07-24"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design", "EF", "ORM"]
slug: "ddd_07"
---
###### Domain Aggregate 如何配合 EFCore 資料庫採用 PostgreSQL。

---

### Pipeline

EF 提供解析 LINQ 的能力，再轉譯成 SQL 送資料庫執行取得結果。

```csharp
// Many
using (var context = new BloggingContext())
{
    var blogs = await context.Blogs.ToListAsync();
}

// One
using (var context = new BloggingContext())
{
    var blog = await context.Blogs
        .SingleAsync(b => b.BlogId == 1);
}

// Filter
using (var context = new BloggingContext())
{
    var blogs = await context.Blogs
        .Where(b => b.Url.Contains("dotnet"))
        .ToListAsync();
}
```

#### Compile-time

C# 的 `System.Linq` 底下其實有兩組不同的 `Where` extension method:

- `Enumerable.Where`:參數型別是 `Func<T, bool>`(可直接執行的方法)
- `Queryable.Where`:參數型別是 `Expression<Func<T, bool>>`(描述邏輯結構的資料,非可執行的方法)

而編譯器會依照**呼叫 `.Where()` 的物件**，判定編譯期型使用哪組:

- 一般物件只實作 `IEnumerable<T>` → 編譯器選 `Enumerable.Where` 編譯成一般可執行的方法 → 執行時直接讀 .dll 在記憶體裡跑邏輯

    ```csharp
    // 參數型別是 Func<T, bool>
    List<Blog> blogs = ...;
    blogs.Where(b => b.Url.Contains("dotnet"));
    ```

- DbSet 物件實作 `IQueryable<T>` → 編譯器選 `Queryable.Where` 編譯成 IL 指令 → 執行時到這行才會組出 Expression Tree 物件

    ```csharp
    // 參數型別是 Expression<Func<T, bool>>
    context.Blogs.Where(b => b.Url.Contains("dotnet"));
    ```

#### Runtime

在 Runtime 上可以分成三個階段

1. LINQ → EF Core

   執行時到這行時 EF Core 才會拿到 IL Command 組出實際的 Expression Tree 物件，並解析轉成 EF Core 內部的查詢表示法；另外，這個解析結果會**被快取**，它的 key 是查詢的「形狀」(shape)。

   ```csharp
   // 命中快取的寫法:值是「變數」傳進去,兩次呼叫的查詢形狀相同
    string input1 = "dotnet";
    string input2 = "react";

    // 第一次:解析 + 翻譯 + 存入快取
    await context.Blogs.Where(b => b.Url.Contains(input1)).ToListAsync(); 
    // 第二次:形狀相同 → 命中快取,直接重用翻譯結果,只換參數值
    await context.Blogs.Where(b => b.Url.Contains(input2)).ToListAsync(); 
    ```

    但如果值是直接寫死在 lambda 裡(literal)，每次都會被當成不同形狀的樹，快取會 miss。

    ```csharp
    // 解析 + 翻譯 + 存入快取(形狀 A)
    await context.Blogs.Where(b => b.Url.Contains("dotnet")).ToListAsync();
    // 形狀不同(常數不同)→ 快取 miss,重新解析 + 翻譯
    await context.Blogs.Where(b => b.Url.Contains("react")).ToListAsync();
    ```

2. EF Core → Database Provider

   EF Core 把內部查詢表示法交給對應的 Database Provider (SQL Server / PostgreSQL / SQLite...)；分析整棵 Expression Tree 後，**判斷哪些部分能在資料庫端處理翻譯成 SQL**，送出查詢後拿回的結果是原始值 (raw rows) 交給下一階段組裝。

    ```csharp
    // 能被翻成 SQL 的部分交給資料庫執行
    // → 例如翻成 SQL Server: SELECT * FROM Blogs WHERE Url LIKE '%dotnet%'
    await context.Blogs.Where(b => b.Url.Contains("dotnet")).ToListAsync();
    ```

    EF Core 允許**最上層的 `Select()`** 裡包含翻不出 SQL 的邏輯，其餘部分(例如 `Where`)如果翻不出來，會直接丟出例外，而不是把整包資料撈回記憶體用 C# 算,避免效能地雷。

    ```csharp
    // 出現在最後的 Select() → 允許,前面能翻的部分(OrderByDescending)照樣送 SQL,
    // Select 裡翻不出的 StandardizeUrl 則在拿到原始值後,才在 C# 端執行
    await context.Blogs
        .OrderByDescending(b => b.Rating)
        .Select(b => new { Id = b.BlogId, Url = StandardizeUrl(b.Url) })
        .ToListAsync();

    // 出現在 Where(非最上層 Select)→ 不允許,直接丟出 Exception
    await context.Blogs.Where(b => StandardizeUrl(b.Url).Contains("dotnet")).ToListAsync();
    ```

3. 組裝結果回傳 entity

   EF Core 拿到原始值 (raw rows) 後，會把欄位值組裝 (materialize) 成 entity 物件，但是在組裝前會先檢查是否有同個實例:

   - Tracking query (預設): 會先檢查 change tracker 裡是否已有對應的 entity

    ```csharp
    // Tracking query(預設行為,不需額外設定)
    var blog1_a = await context.Blogs.SingleAsync(b => b.BlogId == 1);
    var blog1_b = await context.Blogs.SingleAsync(b => b.BlogId == 1);

    // blog1_a 跟 blog1_b 指向 managed heap 上同一塊記憶體
    Console.WriteLine(ReferenceEquals(blog1_a, blog1_b)); // true
    ```

    雖然背後實際發生的行為不一樣，但只要是同一個 DbContext 實例，查到同一筆資料(key 值相同)，不管用哪種 LINQ 寫法查詢，都會拿到同一個物件實例。

    ```csharp
    using var context = new BloggingContext();

    // 一定送 SQL 查資料庫,查完後才在 tracker 裡登記 BlogId=1 這筆
    var blog1 = await context.Blogs.SingleAsync(b => b.BlogId == 1);

    // FindAsync 會先檢查 tracker:BlogId=1 已存在追蹤物件
    // → 直接回傳既有物件,完全不送 SQL 查資料庫
    var blog2 = await context.Blogs.FindAsync(1);

    // Where/FirstAsync 一定送 SQL(表達式跟第一行完全不同,但剛好也查到 BlogId=1 這筆)
    // 查完後在 tracker 裡比對到 BlogId=1 已存在 → 回傳既有物件,不建立新的
    var blog3 = await context.Blogs
        .Where(b => b.Url.Contains("dotnet"))
        .FirstAsync();

    // tracker 比對依據是「key 值」,不是「查詢表達式長怎樣」,所以三者指向同一個實例
    Console.WriteLine(ReferenceEquals(blog1, blog2)); // true
    Console.WriteLine(ReferenceEquals(blog1, blog3)); // true(前提是這筆資料的 BlogId 剛好也是 1)
    ```

    所以這邊隱藏著一個問題 —— tracker 無法追蹤資料庫變更。

    ```csharp
    var blog = await context.Blogs.SingleAsync(b => b.BlogId == 1);
    // ...假設資料庫裡這筆資料的 Url 被流程更改...

    // 再次查詢 SQL,資料庫回傳新值，但因為 tracker 裡已有追蹤物件，EF Core 預設不覆蓋
    var blog_new = await context.Blogs.SingleAsync(b => b.BlogId == 1);

    // 記憶體內仍是指向 DbContext 生命週期內第一次的查詢值
    Console.WriteLine(ReferenceEquals(blog, blog_new)); // true
    ```

    若要確實拿資料庫最新值覆蓋既有物件，就要呼叫不同函式讓每次查詢都建立全新物件、不受 tracker 干擾。

    ```csharp
    // 方法一:明確 Reload,強制用資料庫最新值覆蓋這個物件的屬性
    var blog = await context.Blogs.SingleAsync(b => b.BlogId == 1);
    await context.Entry(blog).ReloadAsync();
    // blog 的屬性現在是資料庫最新值

    // 方法二:AsNoTracking,不進 tracker,每次查詢都是全新物件、全新的值
    var blogA = await context.Blogs.AsNoTracking().SingleAsync(b => b.BlogId == 1);
    var blogB = await context.Blogs.AsNoTracking().SingleAsync(b => b.BlogId == 1);
    Console.WriteLine(ReferenceEquals(blogA, blogB)); // false,兩個獨立物件,各自反映查詢當下的最新值
    ```

    *另外還有的問題會是多人修改同筆資料 EF 要如何追蹤等...就先不討論*

   - No-tracking query: 不檢查與比對，每次都直接建立新物件

    ```csharp
    // 加上 AsNoTracking(),不做 change tracker 比對
    var blog1 = await context.Blogs.AsNoTracking().SingleAsync(b => b.BlogId == 1);
    var blog2 = await context.Blogs.AsNoTracking().SingleAsync(b => b.BlogId == 1);

    // 兩次都建立新物件,不是同一個實例
    Console.WriteLine(ReferenceEquals(blog1, blog2)); // false
    ```

   > 所以只需要唯讀顯示資料、不會修改後存回資料庫的情境，盡量使用 `AsNoTracking()` 省去 change tracker 比對跟維護的開銷，查詢效能會較好。

*呼叫 `.Where()`、`.Select()` 這些 LINQ 運算子的當下，並不會真的觸發上述 runtime 流程。真正觸發送到資料庫的時機是結果被消費的那一刻，常見觸發點有 `ToList()`、`ToArray()`、`Single()`、`Count()`。*

### Loading Related

EF Core 允許用 navigation property 載入關聯資料，有三種常見的 O/RM 載入模式：

#### Eager Loading

最常見的查詢策略，用 `Include` 指定要一起載入的關聯：

```csharp
var blogs = await context.Blogs
    .Include(blog => blog.Posts)
    .ToListAsync();

var blogs = await context.Blogs
    .Include(blog => blog.Posts)
    .Include(blog => blog.Owner)
    .ToListAsync();

// Filtered Include
// 可在 `Include` 加 `Where`、`OrderBy`、`Take` 等
var filteredBlogs = await context.Blogs
    .Include(blog => blog.Posts
        .Where(post => post.BlogId == 1)
        .OrderByDescending(post => post.Title)
        .Take(5))
    .ToListAsync();
```

`ThenInclude` 往下層：

```csharp
var blogs = await context.Blogs
    .Include(blog => blog.Posts)
    .ThenInclude(post => post.Author)
    .ThenInclude(author => author.Photo)
    .ToListAsync();

// 若同一個 navigation 要接拿不同子物件
// 要各自從根節點重寫一次 Include（不會產生重複 JOIN，EF 通常會自動合併）
var blogs = await context.Blogs
    .Include(blog => blog.Posts).ThenInclude(post => post.Author)
    .Include(blog => blog.Posts).ThenInclude(post => post.Tags)
    .ToListAsync();
```

#### Explicit Loading

「有時候需要、有時候不需要」關聯資料的情境，查主體後用 `context.Entry(...)` 手動額外查詢：

```csharp
var blog = await context.Blogs.SingleAsync(b => b.BlogId == 1);
// blog.Posts 此時是空的

await context.Entry(blog).Collection(b => b.Posts).LoadAsync();  // 一對多
await context.Entry(blog).Reference(b => b.Owner).LoadAsync();   // 一對一/多對一

// 也可以先取得代表 navigation 內容的 LINQ 查詢，做進一步運算(不必整批載入記憶體):
var postCount = await context.Entry(blog)
    .Collection(b => b.Posts)
    .Query()
    .CountAsync();

// 也可以過濾要載入的關聯資料：
var goodPosts = await context.Entry(blog)
    .Collection(b => b.Posts)
    .Query()
    .Where(p => p.Rating > 3)
    .ToListAsync();
```

#### Lazy Loading

一種是安裝套件和設定 navigation property 為 `virtual`且類別本身也要能被繼承：

```csharp
optionsBuilder.UseLazyLoadingProxies().UseSqlServer(myConnectionString);
```

```csharp
public class Blog
{
    public int Id { get; set; }
    public virtual ICollection<Post> Posts { get; set; }
}
```

使用時就不用額外呼叫任何東西，存取當下自動觸發查詢：

```csharp
var blog = await context.Blogs.FindAsync(1);
foreach (var post in blog.Posts) { ... } // 存取 blog.Posts 時,背後自動送出查詢
```

但容易造成 **N+1 查詢問題**(迴圈中對每個 entity 各自觸發一次獨立查詢)。

另一種則是注入 `ILazyLoader` 後用 `new` 建立的物件 attach 到 context。

```csharp
public class Blog
{
    private ICollection<Post> _posts;
    private Blog(ILazyLoader lazyLoader) { LazyLoader = lazyLoader; }
    private ILazyLoader LazyLoader { get; set; }

    public ICollection<Post> Posts
    {
        get => LazyLoader.Load(this, ref _posts);
        set => _posts = value;
    }
}
```

#### Related Data and Serialization

假設資料庫裡 BlogId=1 這篇 blog 底下有兩篇 post(PostId=10、PostId=20)。EF Core 查回來組裝物件時，會做兩件事:

- 正向連結: blog.Posts 這個 collection 塞進 [post10, post20]
- 反向連結(fixup): post10.Blog 跟 post20.Blog 都指回同一個 blog 物件

```csharp
var blogs = await context.Blogs
    .Include(blog => blog.Posts)
    .ToListAsync();
```

這在記憶體裡沒問題，因為記憶體內是儲存指標，邏輯上不合理但不會有問題。

``` text
blog → blog.Posts[0] (post10) → post10.Blog → blog → blog.Posts[0] (post10) → ...
```

但在 `JSON serializer` 就會需要展開所有物件攤平成一段文字，這樣會造成循環依賴拋出例外：

- Json.NET:`Self referencing loop detected`
- System.Text.Json:`A possible object cycle was detected`

分別有二種解法

```csharp
// 1. 設定 serializer 忽略循環

// Json.NET
services.AddMvc()
    .AddJsonOptions(options =>
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

// System.Text.Json
services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// 用 `[JsonIgnore]` 跳過其中一端
public class Post
{
    [JsonIgnore]
    public Blog Blog { get; set; }
}
```

而在實務上更推薦的做法是把 EF entity 先轉成專用的 DTO，只挑要回傳的欄位。

```csharp
// EF entity(含雙向 navigation,直接序列化容易踩雷)
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public ICollection<Post> Posts { get; set; }
}

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public Blog Blog { get; set; }   // 這個反向參照是循環的來源
}

// 專用 DTO,只挑要回傳的欄位,不含雙向 navigation
public class BlogDto
{
    public int BlogId { get; set; }
    public string Url { get; set; }
    public List<string> PostTitles { get; set; }
}

// 查詢時直接投影成 DTO,而不是回傳完整 entity
// blogDtos 可以直接安全序列化成 JSON,沒有循環參照問題
var blogDtos = await context.Blogs
    .Include(b => b.Posts)
    .Select(b => new BlogDto
    {
        BlogId = b.BlogId,
        Url = b.Url,
        PostTitles = b.Posts.Select(p => p.Title).ToList()
    })
    .ToListAsync();
```

### DDD Query

在 DDD 架構下，常會將 Value Object 對應到 EF Core 的 Entity 屬性上藉此保護領域規則；但也正因為規則嚴謹，在需要查詢時反而會衍生出不同的問題。

#### Value Object 在 EF 內的型別翻譯

單一欄位包裝 - HasConversion

```csharp
public record Email
{
    public string Value { get; }
    private Email(string value) => Value = value;
    public static Email Create(string value)
    {
        if (!value.Contains('@')) throw new DomainException("invalid email");
        return new Email(value);
    }
}

modelBuilder.Entity<Order>()
    .Property(o => o.Email)
    .HasConversion(e => e.Value, v => Email.Create(v));
```

對 EF Core 來說 `Order.Email` 是「一個被轉換過的欄位」不是物件。

```csharp
// 通常可以翻譯 —— EF Core 會去查 HasConversion 定義的轉換規則:
context.Orders.Where(o => o.Email == Email.Create("test@test.com"))

// 背後查的就是這段 mapping 設定：
modelBuilder.Entity<Order>()
    .Property(o => o.Email)
    .HasConversion(
        e => e.Value,           // VO → 底層值(這裡用來把 Email.Create(...) 轉成底層值)
        v => Email.Create(v));  // 底層值 → VO(讀出資料庫時用)
```

另一個常見錯誤是 `.Value` 這種比較方法，原因是前面提到的 `Where()` 裡的 lambda 要等 Runtime 才會被解析成 Expression Tree。而 `.Value` 這種 getter 對 EF 來說是一段不透明的 C# 邏輯；沒辦法保證它跟底層欄位是一對一對應，所以無法翻譯直接丟出例外。

```csharp
// ERROR: 深入存取 .Value 常常翻不出來，會丟 client eval 例外
context.Orders.Where(o => o.Email.Value == "test@test.com")
```

所以可以的話就盡量比較整個 VO，不要在 `Where` 裡去存取 `.Value`

```csharp
var target = Email.Create(searchEmail);
context.Orders.Where(o => o.Email == target);   // 穩定可翻譯
```

多欄位 - OwnsOne & Complex Type

```csharp
public record Address(string City, string Street);

modelBuilder.Entity<Order>().OwnsOne(o => o.Address);
// 或 EF Core 8+
modelBuilder.Entity<Order>().ComplexProperty(o => o.Address);
```

因為 `Address.City`、`Address.Street` 各自對應到實際獨立的欄位，不是靠不透明的轉換函式包起來的，EF Core 可以直接翻譯進去存取每個屬性：

```csharp
// 沒問題，因為 City 本身就是實際欄位，不是靠 converter 猜出來的
context.Orders.Where(o => o.Address.City.Contains("台北"))
```

---

### 問題二:VO 的 `Create()` 驗證規則 vs. 模糊查詢

**核心問題**:`Create()` 是為了保護「寫入時」的領域不變量(invariant),但查詢條件經常是不完整、不符合 VO 規則的片段字串——例如搜尋 email 包含 `"gmail"`,這個字串本身不是合法 email,丟進 `Email.Create("gmail")` 會直接炸掉領域驗證例外。

**原則**:查詢條件(query criteria)跟領域物件(domain entity)的不變量,本來就是兩件不同的事,不該共用同一個建構入口。

#### 解法一:查詢層直接用原生型別,不強迫走 VO

```csharp
// Repository / Query 方法參數就是 string,不是 Email VO
public async Task<List<Order>> SearchByEmailFragmentAsync(string emailFragment)
{
    var pattern = $"%{emailFragment}%";
    return await context.Orders
        .Where(o => EF.Functions.Like(o.Email.Value, pattern))  // OwnsOne/Complex Type 下穩定可翻譯
        .ToListAsync();
}
```

如果 Email VO 用 Complex Type/OwnsOne 映射,`.Value`(或底層屬性)本身是真實欄位,`Contains`/`EF.Functions.Like` 可以正常翻譯,完全不需經過 `Create()`。

#### 解法二:VO 提供「查詢專用、不驗證」的建構方式

若 VO 必須維持 `HasConversion` 映射,又想在查詢層保留 VO 型別一致性,可額外提供繞過驗證的建構子:

```csharp
public record Email
{
    public string Value { get; }
    private Email(string value) => Value = value;

    // 寫入 / 建立 entity 時用,強制驗證領域規則
    public static Email Create(string value)
    {
        if (!value.Contains('@')) throw new DomainException("invalid email");
        return new Email(value);
    }

    // 查詢時專用,不做完整驗證,只是包裝型別讓 EF 能比對
    internal static Email ForQuery(string rawFragment) => new Email(rawFragment);
}
```

`Create()` 保護的是「這個物件被存進資料庫、代表真實業務實體」的正確性;查詢條件只是「使用者想找的一段文字」,兩者驗證責任本來就不該共用同一個入口。用 `internal` 限制這個繞過驗證的建構子只能在查詢/基礎設施層使用,避免被誤用去建立真正要寫入的 entity。

#### 解法三:退回原生 SQL

當 VO 邏輯複雜到 LINQ 翻譯常踩到 Client Evaluation 邊界情況時,直接用 `FromSql`/`SqlQuery` 繞開 VO 型別系統的翻譯問題:

```csharp
var pattern = $"%{emailFragment}%";
var orders = await context.Orders
    .FromSql($"SELECT * FROM Orders WHERE Email LIKE {pattern}")
    .ToListAsync();
```

拿到的仍是完整的 `Order` entity(包含正確組裝、驗證過的 `Email` VO),只是查詢條件不經過 LINQ 翻譯層,自己控制 SQL 怎麼寫。

---

### 一句話總結

**VO 的驗證規則(`Create()`)屬於「寫入/領域不變量」的責任範圍,不該套用在「查詢條件」上**——查詢條件本質上是不完整、模糊、甚至不合法的片段,硬要它符合 VO 的建構規則,是把兩種不同性質的責任混在一起。實務分工建議:**查詢方法的參數盡量收原生型別(string/int),在 repository 內部才決定要不要包成 VO 去比對**,而不是要求呼叫端先建出一個合法的 VO 才能查詢。

Mapping 方式選擇上,若 VO 常需要被查詢(尤其是模糊查詢),**優先選 Complex Type(或 OwnsOne)而不是 `HasConversion`**——結構化欄位映射對 LINQ 翻譯友善很多,能避免大部分 `.Value` 存取翻不出來的窘境。