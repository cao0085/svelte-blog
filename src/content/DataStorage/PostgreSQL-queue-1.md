---
title: "PostgreSQL - Queue"
date: "2026-03-16"
category: "software"
subCategory: "DataStorage"
tags: ["database", "postgresql", "message-queue"]
slug: "db-postgresql-queue"
---

###### PostgreSQL 有支援可以實作 Queue

---

### SKIP LOCKED

```SKIP LOCKED```的概念是在一個範圍內找出可被上鎖的資料，而當多個 Worker 同時競搶任務時，傳統 `FOR UPDATE` 會讓後面的 Worker 等待。`SKIP LOCKED` 改為跳過被鎖定的 row，直接拿下一筆可用的任務：

```sql
SELECT * FROM job_queue
WHERE status = 'pending'
  AND run_at <= NOW()
ORDER BY run_at
FOR UPDATE SKIP LOCKED
LIMIT 1;

-- 執行流程：
-- 1. 依條件過濾、排序出候選資料
-- 2. 從第一筆開始嘗試加鎖
--    - 成功 → 回傳這筆，停止
--    - 失敗（被其他 Worker 鎖住）→ 跳過，試下一筆
-- 3. `LIMIT 1` 的意思是「找到第一筆可鎖的就停」，不是「只看前 1 筆」
```

*```SKIP LOCKED` 故意違反 Repeatable Read，結果取決於當下誰鎖了哪些 row，專門為 queue dispatch 場景設計，不適合用在需要一致性保證的查詢。*

---

### LISTEN / NOTIFY

PostgreSQL 原生的 **pub/sub 機制**，讓 Worker 只在收到通知時才去撈任務，不需要背景輪詢（polling）DB，大幅減少不必要的 DB 查詢。

```sql
-- Worker 訂閱頻道
LISTEN job_created;

-- 有新任務時，由 application 發送通知
NOTIFY job_created, '{"job_id": 123}';
```

---

### JSONB

Job 的 payload 通常是結構不固定的資料，`JSONB` 讓 payload 存起來之後仍然可以查詢與過濾：

```sql
-- 建立 Queue table
CREATE TABLE job_queue (
  id        BIGSERIAL PRIMARY KEY,
  type      TEXT NOT NULL,
  payload   JSONB,                        -- 彈性 payload
  status    TEXT DEFAULT 'pending',
  run_at    TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 查詢特定 payload 條件的任務
SELECT * FROM job_queue
WHERE payload->>'user_id' = '42'
  AND status = 'failed';
```

---

### 生態系支援

社群直接把 PostgreSQL 包裝成完整的 Job Queue Library，代表「PostgreSQL 當 Queue」已被認可為合理且推薦的做法：

| Library | 語言 | 特點 |
|---------|------|------|
| `pg_boss` | Node.js | 功能完整，支援 delay、retry、cron |
| `river` | Go | 高效能，官方推薦架構 |
| `good_job` | Ruby | Rails 生態整合 |
| `procrastinate` | Python | async 支援 |

這些 Library 都建立在 `SKIP LOCKED` + `LISTEN / NOTIFY` 之上。

---

### 何時換掉 PostgreSQL Queue

PostgreSQL 作為 Queue 的限制：

- Job 量達到每秒數千筆以上，DB I/O 成為瓶頸
- 需要跨服務、跨語言的訊息傳遞（考慮 Kafka / RabbitMQ）
- 需要嚴格的 exactly-once 語意
- 需要複雜的 routing、fanout、topic 管理
