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

在 DDD 架構下，常會將 Value Object 對應到 EF Core 的 Entity 屬性上藉此保護領域規則；但也正因為規則嚴謹，在需要查詢時反而會衍生出不同的問題。查詢可分成 **精準查詢**(翻成 SQL 的 `=`) 與 **模糊查詢**(翻成 SQL 的 `LIKE`) ，都會遇到不同問題，而關鍵都取決於 VO 是用哪種方式映射。

#### 兩種型別翻譯

- HasConversion: 只把整個 VO 登記成一欄不透明純量，model 裡沒有這個屬性。

    ```csharp
    public record GuiNumber
    {
        public string Value { get; }
        private GuiNumber(string value) => Value = value;
        public static GuiNumber Create(string value)
        {
            if (value.Length != 8) throw new DomainException("統一編號必須為 8 碼");
            return new GuiNumber(value);
        }
    }

    modelBuilder.Entity<Company>()
        .Property(c => c.GuiNumber)
        .HasColumnName("gui_number")
        .HasConversion(g => g.Value, v => GuiNumber.Create(v));
    ```

    對 EF Core 來說 `Company.GuiNumber` 是「一個被轉換過的欄位」不是物件，整個 VO 被登記成一欄不透明純量，EF 不知道裡面有哪些成員。

- OwnsOne / ComplexProperty: 把每個成員各自登記成獨立屬性、各自對應一欄，是一個有對應欄位的已知屬性。

    ```csharp
    public record BasicInfo(string Name, string? Owner, string? Address);

    modelBuilder.Entity<Company>().OwnsOne(c => c.BasicInfo, b =>
    {
        b.Property(p => p.Name).HasColumnName("name");
        b.Property(p => p.Owner).HasColumnName("owner");
        b.Property(p => p.Address).HasColumnName("address");
    });
    // 或 EF Core 8+
    modelBuilder.Entity<Company>().ComplexProperty(c => c.BasicInfo);
    ```

    因為 `BasicInfo.Name`、`BasicInfo.Owner`、`BasicInfo.Address` 各自對應到實際獨立的欄位，EF Core 可以直接翻譯進去存取每個屬性。

這個差異會決定下面兩種查詢能不能翻譯成 SQL。

#### 精準查詢

核心原則是比較「整個 VO」，不要在 `Where` 裡把 EF 欄位取 `.Value`。

```csharp
// 通常可以翻譯 —— EF Core 會去查 HasConversion 定義的轉換規則,把整個 VO 換成底層值:
context.Companies.Where(c => c.GuiNumber == GuiNumber.Create("12345675"))
```

```sql
-- 翻譯後:整個 VO 被 converter 換成底層值,比對 gui_number 欄
SELECT c."Id", c."Type", c.gui_number, c.name, c.owner, c.address, c."CreatedAt", c."UpdatedAt"
FROM companies AS c
WHERE c.gui_number = '12345675'
```

```csharp
// ERROR: HasConversion 下深入存取 .Value 翻不出來會丟例外
context.Companies.Where(c => c.GuiNumber.Value == "12345675")
// → 直接丟 InvalidOperationException(could not be translated),連 SQL 都產不出來
```

背後查的就是這段 mapping 設定：

```csharp
modelBuilder.Entity<Company>()
    .Property(c => c.GuiNumber)
    .HasColumnName("gui_number")
    .HasConversion(
        g => g.Value,               // VO → 底層值(把 GuiNumber.Create(...) 轉成底層值送進 WHERE)
        v => GuiNumber.Create(v));  // 底層值 → VO(讀出資料庫時用)
```

那這邊的問題會是 `c.GuiNumber == target` 需要先有一個 `GuiNumber` 實例，而 `Create()` 會跑領域驗證。如果使用者輸入的是不完整字串(例如只打了統編前幾碼)，`Create()` 會直接報錯，在查詢上會非常不便。

#### 模糊查詢

核心限制是 `LIKE` 需要EF翻譯器最後能指到「一個真實的 text 欄位」。

1. HasConversion

    這類欄位**沒辦法直接模糊查詢**——VO 被登記成一欄不透明純量，model 裡根本沒有可以 `LIKE` 的真實成員欄位。頂多只能提供一個「查詢專用、不驗證」的建構入口做**等值比對**(跳過 `Create()` 驗證，讓不完整輸入也能參與 `==`):

    ```csharp
    public record GuiNumber
    {
        public string Value { get; }
        private GuiNumber(string value) => Value = value;

        // 寫入 / 建立 entity 時用,強制驗證領域規則
        public static GuiNumber Create(string value)
        {
            if (value.Length != 8) throw new DomainException("統一編號必須為 8 碼");
            return new GuiNumber(value);
        }

        // 查詢時專用,不做完整驗證,只是包裝型別讓 EF 能做「等值比對」
        internal static GuiNumber ForQuery(string raw) => new GuiNumber(raw);
    }

    // 未驗證的輸入也能參與 == 比對
    context.Companies.Where(c => c.GuiNumber == GuiNumber.ForQuery(userInput));
    ```

    ```sql
    -- 注意:仍是 = 不是 LIKE。ForQuery 只跳過驗證,運算子還是等值比對
    SELECT c."Id", c."Type", c.gui_number, c.name, c.owner, c.address, c."CreatedAt", c."UpdatedAt"
    FROM companies AS c
    WHERE c.gui_number = '1234'   -- @p = 使用者輸入的片段
    ```

    真的要對 HasConversion 欄位做模糊查詢，只能「攤出一個真實 text 欄位」再 `LIKE`：改成下面的 OwnsOne / Complex Type 映射，或加一個持久化計算欄位(computed column)把值攤成可查的欄，再不然就退回原生 SQL(見 3.)。

2. OwnsOne / Complex Type

    複合欄位在 EF 的 `Contains` / `EF.Functions.Like` 都能正常翻譯，且是純屬性欄位完全不需經過 `Create()`。而且查詢方法的參數直接收原生 `string`，不強迫走 VO，自然避開驗證問題:

    ```csharp
    // 沒問題,Address 本身就是實際欄位
    context.Companies.Where(c => c.BasicInfo.Address.Contains("台北"))
    ```

    ```sql
    -- 翻譯後:Contains 在 Npgsql 通常翻成 strpos(...) > 0(部分版本為 LIKE '%台北%')
    SELECT c."Id", c."Type", c.gui_number, c.name, c.owner, c.address, c."CreatedAt", c."UpdatedAt"
    FROM companies AS c
    WHERE strpos(c.address, '台北') > 0
    ```

    ```csharp
    // Repository / Query 方法參數就是 string,不是 VO
    public async Task<List<Company>> SearchByAddressAsync(string addressFragment)
    {
        var pattern = $"%{addressFragment}%";
        return await context.Companies
            .Where(c => EF.Functions.Like(c.BasicInfo.Address, pattern))
            .ToListAsync();
    }
    ```

    ```sql
    -- 翻譯後:EF.Functions.Like 直接翻成 LIKE
    SELECT c."Id", c."Type", c.gui_number, c.name, c.owner, c.address, c."CreatedAt", c."UpdatedAt"
    FROM companies AS c
    WHERE c.address LIKE '%台北%' ESCAPE ''
    ```

3. SQL Row

    其實不必執著 EF 提供的語法，現在有 AI 寫 SQL ROW 很快效能也好評估，退回原生語法也會是個選擇:

    ```csharp
    var pattern = $"%{addressFragment}%";
    var companies = await context.Companies
        .FromSql($"SELECT * FROM companies WHERE address LIKE {pattern}")  // {pattern} 會被參數化,非字串拼接
        .ToListAsync();
    ```

    ```sql
    -- 翻譯後:幾乎原樣送出,只有 {pattern} 被換成參數
    SELECT * FROM companies WHERE address LIKE $1   -- $1 = '%台北%'
    ```
