---
title: "EF Core - CodeFirst"
date: "2025-12-24"
category: "software"
subCategory: "Backend"
tags: ["Backend", "EFCore", "Migration", "ASP.NET Core"]
slug: "efcore-codefirst"
---

###### 使用 EF Core 可以處理 CodeBase Model 與 DB Table 的一致姓，常見的有兩種 DB/Code first

---

### 基本設定

套件除了 EF Core 外需多安裝

```csharp
Microsoft.EntityFrameworkCore.Design 9.0.0
dotnet tool install --global dotnet-ef --version 9.0.0
```

基本概念就是繼承 EF Core 套件內的各個物件，讓套件可以抓起來辨識

```csharp

// 會對應到資料表的欄位名稱
public partial class ActionInfo : Entity
{
    public int ActionInfoId { get; set; }

    public string Name { get; set; } = null!;

    /// <summary>
    /// 外顯名稱
    /// </summary>
    public string DisplayName { get; set; } = null!;

    /// <summary>
    /// 敘述
    /// </summary>
    public string? Description { get; set; }

    public virtual ICollection<MenuAction> MenuAction { get; set; } = new List<MenuAction>();
}
```

```cs
// 欄位細項
public partial class ActionInfoConfiguration : IEntityTypeConfiguration<ActionInfo>
{
    public void Configure(EntityTypeBuilder<ActionInfo> entity)
    {
        entity.HasKey(e => e.ActionInfoId).HasName("PK__Action__FFE3F4D99575B07E");

        entity.HasIndex(e => e.Name, "UQ__Action__A25C5AA7F76A945E").IsUnique();

        entity.Property(e => e.Description)
            .HasMaxLength(200)
            .HasComment("敘述");
        entity.Property(e => e.DisplayName)
            .HasMaxLength(50)
            .HasComment("外顯名稱");
        entity.Property(e => e.Name).HasMaxLength(50);

        OnConfigurePartial(entity);
    }

    partial void OnConfigurePartial(EntityTypeBuilder<ActionInfo> modelBuilder);
}
```

```csharp
public partial class BaseDbContext : DbContext, IBaseDbContext
{
    public BaseDbContext(DbContextOptions<BaseDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ActionInfo> ActionInfo { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new Configurations.ActionInfoConfiguration());

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

public interface IBaseDbContext
{
    public DbSet<ActionInfo> ActionInfo { get; set; }
}
```

補充一下: 套件執行的時候會需要連線 DB，但是跨層可能會吃不到 appsetting 參數，會需要建立一個 Factory 拿參數配置

```csharp
// Infrastructure/Persistence/YourDbContextFactory.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace YourProject.Infrastructure.Persistence;

public class YourDbContextFactory : IDesignTimeDbContextFactory<YourDbContext>
{
    public YourDbContext CreateDbContext(string[] args)
    {
        // 讀取 appsettings.json
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../YourWebApi"))
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<YourDbContext>();
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        optionsBuilder.UseSqlServer(connectionString);

        return new YourDbContext(optionsBuilder.Options);
    }
}
```

準備好後就可以下終端機指令:

產版本控制檔案 ```(首次執行會建立 BaseDbContextModelSnapshot.cs 用來進行快照)```

```bash
dotnet ef migrations add AddNewFeature --context MyDbContext // AddNewFeature 版本控制名稱, MyDbContext C# 的 DB Instance
dotnet ef migrations add AddNewFeature --project DDD.Infrastructure --startup-project DDD.WebApi --context BaseDbContext // 跨層設定
```

拿 migration 檔案產SQL語法與資料庫更新```(首次執行資料庫會建一張表 __EFMigrationsHistory 用來進行版本控制)```

```bash
dotnet ef database update --context BaseDbContext --project ... --startup-project ...
```

這時候可以去資料庫檢查```__EFMigrationsHistory``` 是不是有紀錄和更新成功與否。

另外如果專案是從 DbFirst 轉 CodeFirst ，你的第一次```dotnet ef migrations add```產檔完成後,應該會是一整排 CreateTable 但實際資料庫已有了，可以直接把檔案中的 Up Scope 清空，邏輯上不動作保留提交紀錄。

```csharp
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 資料庫已存在，不需要建立資料表
            // Database already exists, no need to create tables
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // 不執行任何還原動作
            // No rollback actions
        }
    }
```

剩下的操作就類似``git``一樣了。

### 自動化

為了避免忘記手動執行 ```dotnet ef database update```，可以做一個 Installer 自動更新，正式環境需不需要就看習慣。

```csharp
// Infrastructure/Settings/DatabaseMigrate.cs
namespace YourProject.Infrastructure.Settings;

public record DatabaseMigrate
{
    public required string DefaultConnection { get; init; }
    public required bool AutoMigrate { get; init; }
}
```

appsettings.json

```json
// 正式

{
  "DatabaseMigrate": {
    "DefaultConnection": "Server=prod-server;Database=ProdDB;...",
    "AutoMigrate": false
  }
}

// 測試
{
  "DatabaseMigrate": {
    "DefaultConnection": "Server=dev-server;Database=DevDB;...",
    "AutoMigrate": true
  }
}
```

Installer

```csharp
// Infrastructure/Installers/DatabaseMigrationInstaller.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace YourProject.Infrastructure.Installers;

public static class DatabaseMigrationInstaller
{
    public static void ApplyDatabaseMigrations(this WebApplication app)
    {
        var configuration = app.Services.GetRequiredService<IConfiguration>();
        var databaseMigrate = configuration
            .GetSection(nameof(DatabaseMigrate))
            .Get<DatabaseMigrate>();

        if (databaseMigrate == null || !databaseMigrate.AutoMigrate)
        {
            return;
        }

        using var scope = app.Services.CreateScope();
        var loggerFactory = scope.ServiceProvider.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger("DatabaseMigration");

        try
        {
            // 建立 DbContext
            var optionsBuilder = new DbContextOptionsBuilder<YourDbContext>();
            optionsBuilder.UseSqlServer(databaseMigrate.DefaultConnection);

            // 忽略 PendingModelChanges 警告（允許開發時 Entity 有變更）
            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Ignore(
                    Microsoft.EntityFrameworkCore.Diagnostics
                        .RelationalEventId.PendingModelChangesWarning));

            using var context = new YourDbContext(optionsBuilder.Options);

            // 檢查待執行的 Migrations
            var pendingMigrations = context.Database.GetPendingMigrations().ToList();

            if (pendingMigrations.Any())
            {
                logger.LogInformation(
                    "發現 {count} 個待執行的 migrations: {migrations}",
                    pendingMigrations.Count,
                    string.Join(", ", pendingMigrations));

                logger.LogInformation("開始執行資料庫 Migration...");
                context.Database.Migrate();
                logger.LogInformation("資料庫 Migration 執行完成！");
            }
            else
            {
                logger.LogInformation("資料庫已是最新版本，無需執行 Migration");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "執行資料庫 Migration 時發生錯誤");
            throw;
        }
    }
}
```

Program.cs

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// 註冊服務...
builder.Services.AddDbContext<YourDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// 自動執行資料庫 Migration
app.ApplyDatabaseMigrations();

// Configure the HTTP request pipeline...
app.Run();
```

常見的合併衝突可能會是```Snapshot.cs```，通常會是最後一個人先捨棄自己當前的 migration，再重新做一份比較安全。