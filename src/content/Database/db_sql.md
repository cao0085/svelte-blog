---
title: "SQL Command"
date: "2025-06-22"
category: "software"
subCategory: "Database"
tags: ["database", "db", "sql"]
slug: "db_sql"
---

### 特性

- 同步執行：必須有結果才會繼續，報錯會停止。
- 四大分類：`SELECT` / `INSERT` / `UPDATE` / `DELETE`
- **SELECT**：從資料表中篩出符合條件的資料，組成一張新結果表（結果集）。

### 查詢最小單元範例

```sql
SELECT * FROM users;
SELECT * FROM users WHERE id = 123;
SELECT * FROM users WHERE status_id = 2;
SELECT name, email FROM users;
```

### 常用子句與函數

- `WHERE`：條件篩選
- `ORDER BY`：排序
- `LIMIT` / `TOP`：只取前幾筆（需搭配 `ORDER BY`）
- `DISTINCT`：唯一值
- `LIKE`：模糊搜尋
- `AS`：欄位命名別名
- `GROUP BY` + `HAVING`：群組後條件
- 聚合函數：`COUNT`, `SUM`, `AVG`, `MAX`, `MIN`


### LEFT JOIN

`LEFT JOIN = INNER JOIN + 左表未對應資料（右表為 NULL）`

### RIGHT JOIN

同 `LEFT JOIN`，只是語法方向相反

### FULL OUTER JOIN

`LEFT JOIN` + `RIGHT JOIN`（合併後去重）

### CROSS JOIN

所有組合（兩表 row 數乘積）

**應用場景：**

| Color | Size |
| ----- | ---- |
| Red   | S    |
| Red   | M    |
| Red   | L    |
| Blue  | S    |
| Blue  | M    |
| Blue  | L    |

### SELF JOIN

```sql
SELECT 
  A.name AS employee,
  B.name AS manager
FROM Employees A
LEFT JOIN Employees B ON A.manager_id = B.id;
```

同一張表內查上下屬關係

### APPLY（SQL Server 專用）

- `CROSS APPLY`：類似 `INNER JOIN`，但可動態過濾副表
- `OUTER APPLY`：類似 `LEFT JOIN`，但可動態過濾副表