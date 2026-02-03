---
title: "PostgreSQL 併發控制 1"
date: "2026-02-03"
category: "software"
subCategory: "Database"
tags: ["database", "concurrency", "sql"]
slug: "db_concurrency01"
---

###### 先了解一下資料庫效能開銷

---

任何 DB 指令包含讀取都是 ```begin transaction```到 ```COMMIT```

```sql
-- BEGIN (START TRANSACTION)
1. 分配 Transaction ID (XID)
2. 在 WAL (Write-Ahead Log) 寫入事務開始記錄
3. 初始化 MVCC 快照（Snapshot）
4. 分配 undo log 空間
5. 在記憶體中建立事務上下文

時間：0.1 ~ 0.5ms（本地資料庫）
      1 ~ 5ms（遠端資料庫，包含 RTT）

-- COMMIT
1. 檢查衝突（MVCC）
2. 寫入 WAL（Write-Ahead Log）
3. 刷新到磁碟（fsync，如果開啟持久化）
4. 釋放鎖
5. 清理 undo log
6. 更新事務狀態表

時間：0.5 ~ 2ms（無 fsync）
      5 ~ 50ms（有 fsync，取決於磁碟）
```

當一個交易沒有```COMMIT```之前都會持續消耗資源

```sql

BEGIN;

MVCC Snapshot（快照）
  - 記錄當前所有活躍 Transaction ID
  - 佔用記憶體
  
Transaction ID (XID)
  - 持有不釋放
  - 阻止 VACUUM 清理舊資料
  
Undo Log 空間
  - 用於 Rollback
  
鎖資訊
  - Lock table entries
  - 即使沒有 FOR UPDATE，也可能持有隱式鎖

死鎖檢測 (Deadlock Detection)
  - 每 1 秒掃描一次所有活躍連線
  - 連線越多，掃描開銷越大

Idle Transaction Timeout 檢查
  - 定期檢查連線是否超時

統計資訊收集
  - pg_stat_activity 更新


連線被佔用（不可用給其他請求）
連線池計數器維護
連線健康檢查（heartbeat）
```

### 開銷

主要會分成網路連線和資料庫主機處理，所以相同程式碼在不同設備下會有不同結果

```sql
-- 本地資料庫 (localhost)
# RTT ≈ 0.1ms

方案 A（1 個事務）:
BEGIN     0.1ms (RTT)
SELECT    0.1ms (RTT) + 1ms (查詢) = 1.1ms
UPDATE    0.1ms (RTT) + 1ms (查詢) = 1.1ms
UPDATE    0.1ms (RTT) + 1ms (查詢) = 1.1ms
COMMIT    0.1ms (RTT)
總計: 0.5ms (RTT) + 3ms (查詢) = 3.5ms

方案 B（3 個事務）:
BEGIN + SELECT + COMMIT    (0.3ms RTT + 1ms 查詢)
BEGIN + UPDATE + COMMIT    (0.3ms RTT + 1ms 查詢)
BEGIN + UPDATE + COMMIT    (0.3ms RTT + 1ms 查詢)
總計: 0.9ms (RTT) + 3ms (查詢) = 3.9ms

差異: +11%

-- 遠端資料庫（跨區域）
# RTT ≈ 10ms（跨雲端區域）

方案 A（1 個事務）:
BEGIN     10ms
SELECT    10ms + 1ms = 11ms
UPDATE    10ms + 1ms = 11ms
UPDATE    10ms + 1ms = 11ms
COMMIT    10ms
總計: 50ms (RTT) + 3ms (查詢) = 53ms

方案 B（3 個事務）:
事務 1: BEGIN(10ms) + SELECT(11ms) + COMMIT(10ms) = 31ms
事務 2: BEGIN(10ms) + UPDATE(11ms) + COMMIT(10ms) = 31ms
事務 3: BEGIN(10ms) + UPDATE(11ms) + COMMIT(10ms) = 31ms
總計: 93ms

差異: +75%
```

因為一個交易不提交也會吃效能，寫邏輯時就會需要取捨一下。

```python
# 邏輯方案 A（長事務）
with connection_pool.get_connection() as conn:  # 佔用開始
    conn.execute("BEGIN")
    conn.execute("SELECT ... FOR UPDATE")
    # 業務邏輯 200ms ⚠️ 連線一直被佔用
    conn.execute("UPDATE ...")
    conn.execute("COMMIT")
# 佔用結束

連線佔用時間：205ms
如果連線池只有 10 個連線，最多支援: 10 / 0.205 ≈ 48 TPS

# 方案 B（短事務）
with connection_pool.get_connection() as conn:
    conn.execute("BEGIN")
    conn.execute("SELECT ...")
    conn.execute("COMMIT")
# 連線立即歸還

# 業務邏輯 200ms（不佔用連線）

with connection_pool.get_connection() as conn:
    conn.execute("BEGIN")
    conn.execute("UPDATE ...")
    conn.execute("COMMIT")

連線佔用時間：5ms × 3 = 15ms
如果連線池只有 10 個連線，最多支援: 10 / 0.015 ≈ 666 TPS
```

```sql
# COMMIT 的磁碟同步
-- PostgreSQL 預設 synchronous_commit = on
COMMIT;
-- 會執行 fsync()，強制寫入磁碟

-- 磁碟性能：
HDD:        10ms / fsync
SATA SSD:   1ms / fsync
NVMe SSD:   0.1ms / fsync ✓
# 1 個 COMMIT vs 3 個 COMMIT

方案 A: 1 次 fsync = 1ms (SSD)
方案 B: 3 次 fsync = 3ms (SSD)

如果是 HDD:
方案 A: 10ms
方案 B: 30ms
```

結論是若可以保證資料一致性，大多情況多個提交 > 單個長交易。
