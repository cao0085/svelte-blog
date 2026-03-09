---
title: "RDBMS - 關聯式資料庫"
date: "2025-06-21"
category: "software"
subCategory: "DataStorage"
tags: ["database", "relational", "sql"]
slug: "db-relational"
---

###### 以「表格（Table）」為核心，透過鍵值關聯管理結構化資料的資料庫系統

---

關聯式資料庫（RDBMS）將資料組織成多張表格，每張表格由列（Row）與欄（Column）構成，並透過主鍵、外鍵建立表之間的關聯。

### 結構層次（以 SQL Server 為例）

```text
SQL Server Instance
├── Database
│   ├── Schema
│   │   ├── Table
│   │   ├── View
│   │   ├── Stored Procedure
│   │   ├── Function
│   │   ├── Synonym
│   │   └── Permissions / Roles
│   └── Security Settings
└── System Databases (master, msdb, model, tempdb)
```

連接 SQL Server 時是透過 TDS（Tabular Data Stream）的通訊協定來交換資料。

- TDS 是 SQL Server 專用的底層通訊協定，負責在用戶端與資料庫伺服器之間傳遞資料
- 通常透過 TCP/IP 傳輸，預設使用的連接埠為 1433
- 用戶端要連接資料庫時，會使用一段 Connection String（連線字串）

```text
Server=127.0.0.1,1433;Database=MyDb;User Id=sa;Password=MyPassword;TrustServerCertificate=True;
```

---

### Table（資料表）

資料表是資料的儲存核心，每個表由「列（row）」與「欄（column）」構成。

```sql
CREATE TABLE Users (
    Id INT PRIMARY KEY,
    UserName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) UNIQUE,
    CreatedAt DATETIME DEFAULT GETDATE()
);
```

### Primary Key（主鍵）

能唯一標識每一筆資料，一張表只能有一個主鍵，可以是單一欄位或多欄位組成（複合主鍵）。

```sql
ALTER TABLE Users
ADD CONSTRAINT PK_Users PRIMARY KEY (Id);
```

### Unique Constraint（唯一約束）

限制欄位值不能重複，一張表可以有多個唯一欄位。

```sql
CREATE TABLE Products (
    ProductId INT PRIMARY KEY,
    SKU NVARCHAR(20) UNIQUE
);
```

### Foreign Key（外鍵）

建立兩張表之間的參照關係，確保資料完整性（referential integrity）。

```sql
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY,
    UserId INT,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);
```

### Index（索引）

加速查詢效率，類似書本的目錄，索引可以建立在單一欄位或多個欄位上。

```sql
CREATE INDEX IDX_Users_UserName ON Users(UserName);
```

> 索引加速 SELECT，但會略為拖慢 INSERT / UPDATE / DELETE，因為每次寫入都需同步更新索引。
