---
title: "PostgreSQL 01 - 交易效能"
date: "2026-02-03"
category: "software"
subCategory: "DataStorage"
tags: ["database", "postgresql", "concurrency", "transaction"]
slug: "db-concurrency-1"
---

###### 任何 DB 操作（包含讀取）都是一個交易，理解開銷才能做出正確的設計取捨

---

### 交易的生命週期

任何 DB 指令包含讀取，都從 `BEGIN` 到 `COMMIT`。

```sql
-- BEGIN 時的開銷
1. 分配 Transaction ID (XID)
2. 在 WAL (Write-Ahead Log) 寫入事務開始記錄
3. 初始化 MVCC 快照（Snapshot）
4. 分配 undo log 空間
5. 在記憶體中建立事務上下文

時間：0.1 ~ 0.5ms（本地資料庫）
      1 ~ 5ms（遠端資料庫，包含 RTT）

-- COMMIT 時的開銷
1. 檢查衝突（MVCC）
2. 寫入 WAL（Write-Ahead Log）
3. 刷新到磁碟（fsync，如果開啟持久化）
4. 釋放鎖
5. 清理 undo log
6. 更新事務狀態表

時間：0.5 ~ 2ms（無 fsync）
      5 ~ 50ms（有 fsync，取決於磁碟）
```

### 未提交交易的持續開銷

當一個交易沒有 `COMMIT` 之前，會持續消耗以下資源：

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

連線被佔用（不可用給其他請求）
```

---

### 單一長交易 vs 多個短交易

網路延遲（RTT）對效能的影響至關重要：

```sql
-- 本地資料庫 RTT ≈ 0.1ms

方案 A（1 個長交易）
BEGIN     0.1ms
SELECT    0.1ms + 1ms = 1.1ms
UPDATE    0.1ms + 1ms = 1.1ms
UPDATE    0.1ms + 1ms = 1.1ms
COMMIT    0.1ms
總計: 3.5ms

方案 B（3 個短交易）
BEGIN + SELECT + COMMIT  × 3 = 3.9ms
差異: +11%（本地差異不大）

---

-- 遠端資料庫 RTT ≈ 10ms（跨雲端區域）

方案 A（1 個長交易）
BEGIN     10ms
SELECT    10ms + 1ms = 11ms
UPDATE    10ms + 1ms = 11ms
UPDATE    10ms + 1ms = 11ms
COMMIT    10ms
總計: 53ms

方案 B（3 個短交易）
事務 1: 10 + 11 + 10 = 31ms
事務 2: 10 + 11 + 10 = 31ms
事務 3: 10 + 11 + 10 = 31ms
總計: 93ms
差異: +75%（遠端差異顯著）
```

---

### 連線池的影響

長交易讓連線長期被佔用，直接限制系統吞吐量：

```python
# 方案 A（長交易）
with connection_pool.get_connection() as conn:  # 佔用開始
    conn.execute("BEGIN")
    conn.execute("SELECT ... FOR UPDATE")
    # 業務邏輯 200ms ⚠️ 連線一直被佔用
    conn.execute("UPDATE ...")
    conn.execute("COMMIT")
# 佔用結束

連線佔用時間：205ms
連線池 10 個連線，最多支援: 10 / 0.205 ≈ 48 TPS

# 方案 B（短交易 + 連線歸還後執行業務邏輯）
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
連線池 10 個連線，最多支援: 10 / 0.015 ≈ 666 TPS
```

---

### COMMIT 的磁碟同步開銷

```sql
-- PostgreSQL 預設 synchronous_commit = on
COMMIT;  -- 執行 fsync()，強制寫入磁碟

-- 磁碟性能比較：
HDD:      10ms / fsync
SATA SSD: 1ms  / fsync
NVMe SSD: 0.1ms / fsync

-- 方案 A（1 次 COMMIT）vs 方案 B（3 次 COMMIT）：
SSD: 1ms vs 3ms
HDD: 10ms vs 30ms
```

---

### 小結論

- 多個短交易通常優於單個長交易，當然前提是業務邏輯允許拆分（不需要跨操作的原子性）。
- 長交易的核心問題不只是效能，還有連線佔用、鎖持有時間延長，進而影響系統整體吞吐量。
