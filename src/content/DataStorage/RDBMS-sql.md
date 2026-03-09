---
title: "RDBMS - SQL 指令"
date: "2025-06-22"
category: "software"
subCategory: "DataStorage"
tags: ["database", "sql"]
slug: "db-sql"
---

###### 操作關聯式資料庫的標準語言，分為查詢、寫入、更新、刪除四大類

---

### 特性

- 同步執行：必須有結果才會繼續，報錯會停止
- 四大分類：`SELECT` / `INSERT` / `UPDATE` / `DELETE`
- `SELECT`：從資料表中篩出符合條件的資料，組成一張新結果表（結果集）

### 查詢範例

```sql
SELECT * FROM users;
SELECT * FROM users WHERE id = 123;
SELECT * FROM users WHERE status_id = 2;
SELECT name, email FROM users;
```

---

### 常用子句

| 子句 | 說明 |
|------|------|
| `WHERE` | 條件篩選 |
| `ORDER BY` | 排序（預設 ASC，加 DESC 反序） |
| `LIMIT` / `TOP` | 只取前幾筆（需搭配 `ORDER BY`） |
| `DISTINCT` | 唯一值，去除重複列 |
| `LIKE` | 模糊搜尋，`%` 代表任意字元 |
| `AS` | 欄位或表別名 |
| `GROUP BY` + `HAVING` | 群組後再做條件篩選 |

### 聚合函數

```sql
SELECT COUNT(*), SUM(amount), AVG(price), MAX(score), MIN(score)
FROM orders
WHERE status = 'paid'
GROUP BY user_id
HAVING COUNT(*) > 3;
```

---

### JOIN 類型

#### INNER JOIN（預設 JOIN）

只回傳兩表都有對應的資料。

```sql
SELECT u.name, o.order_id
FROM users u
JOIN orders o ON u.id = o.user_id;
```

#### LEFT JOIN

`LEFT JOIN = INNER JOIN + 左表未對應資料（右表為 NULL）`

```sql
SELECT u.name, o.order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- 沒有訂單的用戶也會出現，order_id 為 NULL
```

#### RIGHT JOIN

同 `LEFT JOIN`，只是語法方向相反。

#### FULL OUTER JOIN

`LEFT JOIN` + `RIGHT JOIN`（合併後去重），兩表所有資料都出現。

#### CROSS JOIN

所有組合（兩表 row 數乘積）。

**應用場景：** 商品顏色 × 尺寸組合

| Color | Size |
| ----- | ---- |
| Red   | S    |
| Red   | M    |
| Red   | L    |
| Blue  | S    |
| Blue  | M    |
| Blue  | L    |

#### SELF JOIN

同一張表查上下屬關係。

```sql
SELECT
  A.name AS employee,
  B.name AS manager
FROM Employees A
LEFT JOIN Employees B ON A.manager_id = B.id;
```

#### APPLY（SQL Server 專用）

- `CROSS APPLY`：類似 `INNER JOIN`，但可動態過濾副表
- `OUTER APPLY`：類似 `LEFT JOIN`，但可動態過濾副表
