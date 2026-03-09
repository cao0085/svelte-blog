---
title: "PostgreSQL 02 - 隔離與鎖"
date: "2026-02-04"
category: "software"
subCategory: "DataStorage"
tags: ["database", "postgresql", "concurrency", "lock"]
slug: "db-concurrency-2"
---

###### PostgreSQL 的併發處理 — [PostgreSQL Doc](https://www.postgresql.org/docs)

---

### 交易隔離等級

交易並發執行時可能出現以下問題，不同隔離等級提供不同的保護程度：

| 問題 | 說明 |
|------|------|
| **Dirty Read 髒讀** | 讀到其他交易尚未 COMMIT 的資料 |
| **Nonrepeatable Read 複讀** | 同一交易內讀兩次同筆資料，值不同（被其他交易更新後 COMMIT） |
| **Phantom Read 幻讀** | 同一交易內兩次查詢，結果集的「行數」不同（被插入或刪除） |
| **Serialization 序列化** | 完全等同於序列執行，最嚴格的保證 |

PostgreSQL 預設隔離等級為 **Read Committed**（避免 Dirty Read）。

---

### 鎖類型（由低到高限制性）

PostgreSQL 提供多種表鎖層級，根據鎖之間是否衝突決定交易是否等待。

---

#### ACCESS SHARE（訪問共享鎖）

最寬鬆，只衝突 `ACCESS EXCLUSIVE`。普通 SELECT 自動取得。

```sql
BEGIN;
SELECT * FROM users;  -- 自動獲得 ACCESS SHARE 鎖
-- 其他交易可以同時讀取
COMMIT;
```

---

#### ROW SHARE（行共享鎖）

衝突 `EXCLUSIVE`、`ACCESS EXCLUSIVE`。可讀但不可改特定行。

```sql
BEGIN;
SELECT * FROM users WHERE id = 1 FOR SHARE;
-- 鎖定 id=1 的行，其他人可以讀，但不能修改
COMMIT;
```

`FOR` 子句有四種選項：

```sql
SELECT * FROM users WHERE id = 1 FOR UPDATE;        -- 最強，準備修改
SELECT * FROM users WHERE id = 1 FOR NO KEY UPDATE; -- 不鎖外鍵欄位
SELECT * FROM users WHERE id = 1 FOR SHARE;         -- 共享，可讀不可改
SELECT * FROM users WHERE id = 1 FOR KEY SHARE;     -- 最弱，只鎖主鍵
```

---

#### ROW EXCLUSIVE（行排他鎖）

`INSERT` / `UPDATE` / `DELETE` 自動取得。允許同時讀取，但阻止其他修改。

```sql
-- 交易 A
BEGIN;
UPDATE users SET age = 30 WHERE id = 1;  -- 自動獲得 ROW EXCLUSIVE 鎖

-- 交易 B（同時執行）
SELECT * FROM users;                     -- ✓ 可以讀
UPDATE users SET age = 25 WHERE id = 2;  -- ✗ 被阻塞

COMMIT;
```

---

#### SHARE UPDATE EXCLUSIVE（共享更新排他鎖）

用於系統維護操作（索引、統計），避免表被鎖死，同時允許一般讀寫繼續。

```sql
BEGIN;
ANALYZE users;                  -- 自動獲得此鎖
CREATE INDEX CONCURRENTLY ...;  -- 並行建索引時使用
CREATE STATISTICS ...;

-- 其他交易可以讀和修改，但不能同時 VACUUM 或 CREATE INDEX CONCURRENTLY
COMMIT;
```

---

#### SHARE（共享鎖）

建立普通索引時取得，允許讀取，阻止所有修改。

```sql
BEGIN;
CREATE INDEX idx_users_email ON users(email);
-- 整個建立過程持有 SHARE 鎖

-- 其他交易
SELECT * FROM users;            -- ✓ 可以讀
INSERT INTO users VALUES (...); -- ✗ 被阻塞
COMMIT;
```

---

#### SHARE ROW EXCLUSIVE

衝突大多數寫入操作，且**自衝突**（同一時間只能有一個）。

```sql
-- 交易 A
BEGIN;
CREATE TRIGGER check_age BEFORE INSERT ON users ...
-- 獲得 SHARE ROW EXCLUSIVE 鎖

-- 交易 B（同時執行）
SELECT * FROM users;            -- ✓ 可以讀
INSERT INTO users VALUES (...); -- ✗ 被阻塞
COMMIT;
```

---

#### EXCLUSIVE（排他鎖）

只允許 `ACCESS SHARE`（普通讀）。

```sql
BEGIN;
REFRESH MATERIALIZED VIEW mat_view;  -- 獲得 EXCLUSIVE 鎖

-- 其他交易
SELECT * FROM mat_view;              -- ✓ 可以讀
SELECT * FROM mat_view FOR UPDATE;   -- ✗ 被阻塞
UPDATE mat_view SET ...;             -- ✗ 被阻塞
COMMIT;
```

---

#### ACCESS EXCLUSIVE（訪問排他鎖）

限制最高，等同該表只能被此交易使用。`DROP TABLE`、`TRUNCATE`、`ALTER TABLE` 時取得。

```sql
-- 交易 A
BEGIN;
DROP TABLE users;  -- 獲得 ACCESS EXCLUSIVE 鎖

-- 交易 B（同時執行）
SELECT * FROM users;            -- ✗ 完全阻塞
INSERT INTO users VALUES (...); -- ✗ 完全阻塞
COMMIT;
```

---

### 鎖衝突速查表

| 鎖類型 | AS | RS | RE | SUE | S | SRE | E | AE |
|--------|----|----|----|----|---|-----|---|----|
| ACCESS SHARE (AS) | | | | | | | | ✗ |
| ROW SHARE (RS) | | | | | | | ✗ | ✗ |
| ROW EXCLUSIVE (RE) | | | | ✗ | ✗ | ✗ | ✗ | ✗ |
| SHARE UPDATE EXCLUSIVE (SUE) | | | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| SHARE (S) | | | ✗ | ✗ | | ✗ | ✗ | ✗ |
| SHARE ROW EXCLUSIVE (SRE) | | | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| EXCLUSIVE (E) | | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| ACCESS EXCLUSIVE (AE) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

`✗` = 衝突（後來的交易需等待）
