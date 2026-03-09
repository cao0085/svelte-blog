---
title: "RDBMS - 表單設計"
date: "2025-06-22"
category: "software"
subCategory: "DataStorage"
tags: ["database", "sql", "schema"]
slug: "db-table-design"
---

###### 當資料具有層級關係（父子、樹狀），有四種常見的儲存模式，各有取捨

---

### Recursive Hierarchy（遞迴層級）

適用情境：類別樹、組織架構、選單、地區層級等

每筆資料的共通特性：
- ID
- 辨識父節點的 ID
- 其他業務欄位（名稱、排序、狀態…）

---

### 鄰接表 Adjacency List

最直觀的設計，欄位直接標示父節點 `UpCode`。

| ID | UpCode | Name  |
| -- | ------ | ----- |
| 1  | NULL   | 電子產品  |
| 2  | 1      | 手機    |
| 3  | 1      | 筆記型電腦 |
| 4  | 2      | 智慧型手機 |

```sql
CREATE TABLE Category (
  ID        BIGINT        PRIMARY KEY,
  UpCode    BIGINT        NULL,         -- 指向父節點 ID（根節點 UpCode = NULL）
  Name      NVARCHAR(100) NOT NULL,
  SortOrder INT           NOT NULL,
  State     TINYINT       NOT NULL
);

-- 多層查詢（SQL Server Recursive CTE）
WITH RecursiveCTE AS (
  -- 從最上層開始，標記 Level = 1
  SELECT ID, UpCode, Name, 1 AS Level
  FROM Category
  WHERE UpCode IS NULL

  UNION ALL

  SELECT c.ID, c.UpCode, c.Name, r.Level + 1
  FROM Category c
  JOIN RecursiveCTE r ON c.UpCode = r.ID
)
SELECT * FROM RecursiveCTE
ORDER BY Level, ID;
```

**優點：** 結構簡單，新增容易
**缺點：** 查詢整棵樹需要遞迴，效能較差

---

### Nested Set（巢狀集合）

用左（Lft）、右（Rgt）兩個數字表達樹的範圍，查找快但維護難。

```text
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
  ID   BIGINT        PRIMARY KEY,
  Name NVARCHAR(100) NOT NULL,
  Lft  INT           NOT NULL,
  Rgt  INT           NOT NULL
);

-- 查詢「類別A」(ID=1) 的所有子孫（含自己）
SELECT node.*
FROM CategoryNested AS node
JOIN CategoryNested AS parent
  ON node.Lft BETWEEN parent.Lft AND parent.Rgt
WHERE parent.ID = 1
ORDER BY node.Lft;

-- 新增主類別（需重新計算 Lft / Rgt）
DECLARE @newId INT = 6;
DECLARE @newName NVARCHAR(100) = N'類別C';
DECLARE @maxRgt INT = (SELECT MAX(Rgt) FROM CategoryNested);

UPDATE CategoryNested
SET Lft = CASE WHEN Lft > @maxRgt THEN Lft + 2 ELSE Lft END,
    Rgt = CASE WHEN Rgt >= @maxRgt THEN Rgt + 2 ELSE Rgt END;

INSERT INTO CategoryNested (ID, Name, Lft, Rgt)
VALUES (@newId, @newName, @maxRgt + 1, @maxRgt + 2);
```

**優點：** 查詢整棵子樹只需一個 BETWEEN 查詢，極快
**缺點：** 新增或移動節點需重新計算全表，維護成本高

---

### Materialized Path（路徑枚舉）

用類似 URL 的路徑字串記錄完整祖先鏈。

| ID | Path      | Name  |
| -- | --------- | ----- |
| 1  | `/1/`     | 電子產品  |
| 2  | `/1/2/`   | 手機    |
| 4  | `/1/2/4/` | 智慧型手機 |
| 3  | `/1/3/`   | 筆記型電腦 |

```sql
CREATE TABLE CategoryPath (
  ID   BIGINT        PRIMARY KEY,
  Path NVARCHAR(500) NOT NULL,  -- 以 "/" 分隔的父節點路徑
  Name NVARCHAR(100) NOT NULL
);

-- 查詢某節點的所有子孫
SELECT * FROM CategoryPath WHERE Path LIKE '/1/2/%';
```

**優點：** 查詢子樹只需 LIKE，新增節點容易
**缺點：** Path 欄位需要 LIKE 查詢（不易用到索引），移動節點需批次更新 Path

---

### Closure Table（關係表）

用獨立表記錄所有祖先-後代關係，查詢與維護都最完整。

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

```text
A (ID=1)
├─ B (ID=2)
│   └─ D (ID=4)
└─ C (ID=3)
```

CategoryClosure 資料（每個節點都與所有祖先有一筆記錄）：

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

```sql
-- 查詢某節點的所有後代（含自己）
SELECT c.*
FROM Category AS c
JOIN CategoryClosure AS cc ON c.ID = cc.Descendant
WHERE cc.Ancestor = @nodeId
ORDER BY cc.Depth;

-- 查詢某節點的所有祖先（含自己）
SELECT c.*
FROM Category AS c
JOIN CategoryClosure AS cc ON c.ID = cc.Ancestor
WHERE cc.Descendant = @nodeId
ORDER BY cc.Depth;

-- 插入新節點（先 INSERT 主表取得 @newId）
INSERT INTO CategoryClosure (Ancestor, Descendant, Depth)
SELECT Ancestor, @newId, Depth + 1
FROM CategoryClosure
WHERE Descendant = @parentId;

INSERT INTO CategoryClosure VALUES (@newId, @newId, 0);

-- 刪除節點（先刪 Closure，再刪主表）
DELETE FROM CategoryClosure
WHERE Descendant = @nodeId OR Ancestor = @nodeId;
```

**優點：** 查詢任意祖先/後代都只需 JOIN，效能最佳；新增容易
**缺點：** Closure 表資料量為 O(節點數²)，移動節點操作較複雜

---

### 比較總結

| 方案 | 查詢子樹 | 新增節點 | 移動節點 | 適用場景 |
|------|----------|----------|----------|----------|
| Adjacency List | 慢（遞迴） | 容易 | 容易 | 簡單層級，少量資料 |
| Nested Set | 快 | 難 | 難 | 唯讀或極少異動的樹 |
| Materialized Path | 中等 | 容易 | 中等 | 路徑可讀性重要的場景 |
| Closure Table | 快 | 容易 | 中等 | 查詢頻繁、需要任意層查詢 |
