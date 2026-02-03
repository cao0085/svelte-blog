---
title: "PostgreSQL 併發控制 2"
date: "2026-02-04"
category: "software"
subCategory: "Database"
tags: ["database", "concurrency", "sql"]
slug: "db_concurrency02"
---

###### PostgreSQL 的併發處理 [PostgreSQL Doc](https://www.postgresql.org/docs)

---

### 交易隔離

交易開始後可能會有以下問題:

1. Dirty Read 髒讀 :
    - 不保證讀到的資料都是已 Commit 的。

2. Nonrepeatable Read 複讀 :
    - 保證讀取的資料是已 Commit
    - 不保證同個交易獲得的資料一樣(期間該交易被更新)

3. Phantom Read 幻讀 :
    - 保證讀取的"現有行"數據一樣（不會被修改）
    - 不保證獲得的"行集合"一樣(期間插入/刪除)

4. Serialization 序列化 :
    - 保證讀取的資料來源、邏輯一致

### 鎖表

PostgreSQL 提供以下鎖層級，根據鎖之間是否產生衝突，來決定該交易列隊等待與否，按限制性從低到高排列：

#### ACCESS SHARE（訪問共享鎖）

只衝突```ACCESS EXCLUSIVE```，普通的讀取。

```sql
BEGIN;
SELECT * FROM users;  -- 自動獲得 ACCESS SHARE 鎖
-- 其他交易也可以同時讀取 users 表
COMMIT;
```

---

#### ROW SHARE（行共享鎖）

只衝突```EXCLUSIVE, ACCESS EXCLUSIVE```，可讀不改。

```sql
BEGIN;
SELECT * FROM users WHERE id = 1 FOR SHARE;  
-- 鎖定 id=1 的行，但其他人可以讀
-- 只是不能修改這一行
COMMIT;
```

ROW SHARE 總共有四種模式

```sql
SELECT * FROM users WHERE id = 1 FOR UPDATE;
SELECT * FROM users WHERE id = 1 FOR NO KEY UPDATE;
SELECT * FROM users WHERE id = 1 FOR SHARE;
SELECT * FROM users WHERE id = 1 FOR KEY SHARE;
```

---

#### ROW EXCLUSIVE（行排他鎖）

衝突```SHARE, SHARE UPDATE EXCLUSIVE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE```，常見的編輯。

```sql
-- 交易 A
BEGIN;
UPDATE users SET age = 30 WHERE id = 1;  
-- 自動獲得 ROW EXCLUSIVE 鎖
-- 其他交易可以讀，但不能修改

-- 交易 B（同時執行）
SELECT * FROM users;  -- ✓ 可以讀
UPDATE users SET age = 25 WHERE id = 2;  -- ✗ 被阻塞

COMMIT;
```

---

#### SHARE UPDATE EXCLUSIVE（共享更新排他鎖）

衝突```SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE```，用來執行系統性設定(索引創建)，避免該表被鎖死。

```sql
BEGIN;
ANALYZE users;  -- 自動獲得 SHARE UPDATE EXCLUSIVE 鎖
CREATE INDEX CONCURRENTLY    -- 並行創建索引
CREATE STATISTICS            -- 創建統計信息

-- 其他交易可以讀和修改，但不能同時 VACUUM 或 CREATE INDEX CONCURRENTLY
COMMIT;
```

---

#### SHARE（共享鎖）

衝突```ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE```

```sql
BEGIN;
CREATE INDEX idx_users_email ON users(email);  
-- 獲得 SHARE 鎖（整個創建過程持有）
-- 阻止所有修改，但允許讀取

-- 其他交易
SELECT * FROM users;  -- ✓ 可以讀
INSERT INTO users VALUES (...);  -- ✗ 被阻塞
COMMIT;
```

---

#### SHARE ROW EXCLUSIVE

衝突```ROW EXCLUSIVE, SHARE UPDATE EXCLUSIVE, SHARE, SHARE ROW EXCLUSIVE, EXCLUSIVE, ACCESS EXCLUSIVE```，會自衝突。

```sql
-- 交易 A
BEGIN;
CREATE TRIGGER check_age BEFORE INSERT ON users ...
-- 獲得 SHARE ROW EXCLUSIVE 鎖

-- 交易 B（同時執行）
SELECT * FROM users;  -- ✓ 可以讀
INSERT INTO users VALUES (...);  -- ✗ 被阻塞（衝突）
COMMIT;
```

---

### EXCLUSIVE（排他鎖）

限制性非常高，只允許```ACCESS SHARE```

```sql
BEGIN;
REFRESH MATERIALIZED VIEW mat_view;
-- 獲得 EXCLUSIVE 鎖

-- 其他交易
SELECT * FROM mat_view;  -- ✓ 可以讀
SELECT * FROM mat_view FOR UPDATE;  -- ✗ 被阻塞
UPDATE mat_view SET ... ;  -- ✗ 被阻塞
COMMIT;
```

---

### ACCESS EXCLUSIVE（訪問排他鎖）

限制性最高，等同該表只能被該交易使用

```sql
-- 交易 A
BEGIN;
DROP TABLE users;  -- 獲得 ACCESS EXCLUSIVE 鎖

-- 交易 B（同時執行）
SELECT * FROM users;  -- ✗ 被完全阻塞！
INSERT INTO users VALUES (...);  -- ✗ 被完全阻塞！
COMMIT;
```


