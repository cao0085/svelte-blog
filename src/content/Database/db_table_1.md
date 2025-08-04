---
title: "資料庫表單設計"
date: "2025-06-22"
category: "software"
subCategory: "Database"
tags: ["database", "db", "sql"]
slug: "db_table_1"
---

### Recursive Hierarchy

需要儲存的資料性質為能夠

- ID
- 辨識父節點的 ID
- 其他業務欄位一樣（如名稱、排序、狀態…）

### 鄰接表 Adjacency List

表單內欄位直接標示 `UpCode`

| ID | UpCode | Name  |
| -- | ------ | ----- |
| 1  | NULL   | 電子產品  |
| 2  | 1      | 手機    |
| 3  | 1      | 筆記型電腦 |
| 4  | 2      | 智慧型手機 |


```sql

CREATE TABLE Category (
  ID            BIGINT       PRIMARY KEY,
  UpCode        BIGINT       NULL      -- 指向父節點 ID（根節點 UpCode = NULL）
  Name          NVARCHAR(100) NOT NULL,
  SortOrder     INT           NOT NULL,
  State         TINYINT       NOT NULL
);

-- 多層查詢（SQL Server 迴圈 CTE）
-- 先查 最上層 & 添加臨時欄位 Level = 1
WITH RecursiveCTE AS (
  SELECT ID, UpCode, Name, 1 AS Level
  FROM Category
  WHERE UpCode IS NULL

  UNION ALL

  SELECT c.ID, c.UpCode, c.Name, r.Level + 1
  FROM Category c
  JOIN RecursiveCTE r
    ON c.UpCode = r.ID
)
SELECT * 
FROM RecursiveCTE
ORDER BY Level, ID;

```

### Nested Set

用樹狀的概念來分類表，查找快速但新增和修改不容易維護


```scss
1. 類別A (ID=1)
   ├─ 子類A1 (ID=3)
   └─ 子類A2 (ID=4)

2. 類別B (ID=2)
   └─ 子類B1 (ID=5)
```

| ID | Name | Lft | Rgt |
| -- | ---- | --- | --- |
| 1  | 類別A  | 1   | 6   |
| 3  | 子類A1 | 2   | 3   |
| 4  | 子類A2 | 4   | 5   |
| 2  | 類別B  | 7   | 10  |
| 5  | 子類B1 | 8   | 9   |

```sql
CREATE TABLE CategoryNested (
  ID      BIGINT       PRIMARY KEY,
  Name    NVARCHAR(100) NOT NULL,
  Lft     INT           NOT NULL,  -- 左值
  Rgt     INT           NOT NULL   -- 右值
);

-- 假設要撈出「類別A」(ID=1) 的所有子孫（含自己）：
SELECT node.*
FROM CategoryNested AS node
JOIN CategoryNested AS parent
  ON node.Lft BETWEEN parent.Lft AND parent.Rgt
WHERE parent.ID = 1
ORDER BY node.Lft;

-- 新增主類別的話需要重新計算樹
DECLARE @newId INT = 6;
DECLARE @newName NVARCHAR(100) = N'類別C';

-- 1. 找到目前最大的右值
DECLARE @maxRgt INT = (SELECT MAX(Rgt) FROM CategoryNested);

-- 2. 先把所有 Lft >= maxRgt+1 的值往後推 2
UPDATE CategoryNested
SET Lft = CASE WHEN Lft > @maxRgt THEN Lft + 2 ELSE Lft END,
    Rgt = CASE WHEN Rgt >= @maxRgt THEN Rgt + 2 ELSE Rgt END;

-- 3. 插入新節點，左右值分別為 maxRgt+1, maxRgt+2
INSERT INTO CategoryNested (ID, Name, Lft, Rgt)
VALUES (@newId, @newName, @maxRgt + 1, @maxRgt + 2);
```

### Materialized Path（路徑枚舉）

使用似 URL 的方式管理

| ID | Path      | Name  |
| -- | --------- | ----- |
| 1  | `/1/`     | 電子產品  |
| 2  | `/1/2/`   | 手機    |
| 4  | `/1/2/4/` | 智慧型手機 |
| 3  | `/1/3/`   | 筆記型電腦 |

```sql
CREATE TABLE CategoryPath (
  ID      BIGINT        PRIMARY KEY,
  Path    NVARCHAR(500) NOT NULL,  -- 以 "/" 分隔的父節點路徑
  Name    NVARCHAR(100) NOT NULL
);
```

### Closure Table（關係表）

```sql
CREATE TABLE Category (
  ID   BIGINT        PRIMARY KEY,
  Name NVARCHAR(100) NOT NULL
);

CREATE TABLE CategoryClosure (
  Ancestor   BIGINT NOT NULL,  -- 祖先節點
  Descendant BIGINT NOT NULL,  -- 後代節點
  Depth      INT    NOT NULL,  -- 兩者間距離：0 = 自己
  PRIMARY KEY (Ancestor, Descendant)
);

```

```scss
A (ID=1)
├─ B (ID=2)
│   └─ D (ID=4)
└─ C (ID=3)
```

- Category table

    | ID | Name |
    | -- | ---- |
    | 1  | A    |
    | 2  | B    |
    | 3  | C    |
    | 4  | D    |

- CategoryClosure

    | Ancestor | Descendant | Depth |       |
    | -------- | ---------- | ----- | ----- |
    | 1        | 1          | 0     | ← A→A |
    | 2        | 2          | 0     | ← B→B |
    | 3        | 3          | 0     | ← C→C |
    | 4        | 4          | 0     | ← D→D |
    | 1        | 2          | 1     | ← A→B |
    | 1        | 3          | 1     | ← A→C |
    | 2        | 4          | 1     | ← B→D |
    | 1        | 4          | 2     | ← A→D |

查詢

```sql
-- 查詢某節點的所有後代（含自己）
SELECT c.*
FROM Category AS c
JOIN CategoryClosure AS cc
  ON c.ID = cc.Descendant
WHERE cc.Ancestor = @nodeId
ORDER BY cc.Depth;

-- 查詢某節點的所有祖先（含自己）   
SELECT c.*
FROM Category AS c
JOIN CategoryClosure AS cc
  ON c.ID = cc.Ancestor
WHERE cc.Descendant = @nodeId
ORDER BY cc.Depth;
```

插入

- 主表先 INSERT 一筆新節點，取得它的 ID = @newId

```sql
-- 對所有 ancestor of parentId，插入新後代關係
INSERT INTO CategoryClosure (Ancestor, Descendant, Depth)
SELECT Ancestor, @newId, Depth + 1
FROM CategoryClosure
WHERE Descendant = @parentId;

-- 再插一筆自己到自己的對應
INSERT INTO CategoryClosure VALUES (@newId, @newId, 0);
```

刪除

- 先刪除 Closure Table 中任何以該節點為 Ancestor 或 Descendant 的紀錄，然後刪除主表中的那筆節點
