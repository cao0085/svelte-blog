---
title: "實作 Priority Job Queue"
date: "2026-03-17"
category: "software"
subCategory: "How-To"
tags: ["database", "postgresql", "concurrency", "queue", "performance"]
slug: "db-job-queue"
---

###### 用 PostgreSQL 實作 Priority Job Queue 會遇到的 [問題](https://www.postgresql.org/message-id/90ee725f-d003-4838-97ec-e7e4149ac75b%40mailbox.org)

---

### 問題背景

多個 worker 並發從多個 queue 取 job，queue 有優先權，高優先權先處理，且優先權重會是動態改變的。

```sql
CREATE TABLE queues (
  id       integer PRIMARY KEY,
  priority integer NOT NULL DEFAULT 0
);

CREATE TABLE jobs (
  id       serial  PRIMARY KEY,
  queue_id integer NOT NULL REFERENCES queues(id)
);

INSERT INTO queues (id, priority) VALUES (1, 0), (2, 1), (3, 1);
INSERT INTO jobs (queue_id) SELECT 1 FROM generate_series(1, 1000000);
INSERT INTO jobs (queue_id) SELECT 2 FROM generate_series(1, 1000000);
INSERT INTO jobs (queue_id) SELECT 3 FROM generate_series(1, 1000000);
```

---

### 為什麼 naive query 很慢

```sql
-- 快，但無視 priority（2ms）
SELECT * FROM jobs LIMIT 1 FOR UPDATE SKIP LOCKED;

-- 有 priority，但慢（1100ms）
-- 原因是 FOR UPDATE SKIP LOCKED 會讓 PostgreSQL 必須先排好所有資料，再逐筆嘗試加鎖。
SELECT *
FROM jobs
JOIN queues ON queues.id = jobs.queue_id
ORDER BY priority DESC
LIMIT 1
FOR UPDATE OF jobs SKIP LOCKED;
```

```md
Sort (rows=3000000)
  Sort Method: external merge Disk: 111568kB   ← 300萬筆溢出到磁碟排序
  → Hash Join 300萬筆 jobs × 3筆 queues
```

---

#### 解法一：正確建 Index

讓 B-Tree Index 維護整體排序，讀取時從第一筆逐筆嘗試；缺點是會提高寫入成本(須維護 B-Tree)，適合寫少讀多的場景。

```sql
-- queues 上的 priority index
CREATE INDEX queues_priority_idx ON queues(priority);

-- jobs 上的複合 index
CREATE INDEX jobs_queue_id_id_idx ON jobs(queue_id, id);
```

加上 index 後，planner 改走：

```md
Incremental Sort → Nested Loop
  → Index Scan Backward on queues_priority_idx   ← 直接按 priority 順序
  → Index Only Scan on jobs_queue_id_id_idx       ← 不碰 heap

執行時間：9ms（vs 原本 1347ms）
```

---

#### 解法二：分兩步驟查詢

先找 queue，再取 job 拆開 ORDER BY 和 FOR UPDATE SKIP LOCKED；但就有機會讀不到東西需要應用層 retry。

```sql
WITH best_queue AS (
  SELECT q.id
  FROM queues q
  WHERE EXISTS (SELECT 1 FROM jobs j WHERE j.queue_id = q.id)
  ORDER BY q.priority DESC
  LIMIT 1
)
SELECT j.*
FROM jobs j
JOIN best_queue bq ON j.queue_id = bq.id
LIMIT 1
FOR UPDATE OF j SKIP LOCKED;
```

---

#### 解法三：Loop 逐 Queue 嘗試

和解法二差不多，但重試邏輯直接在 SQL 處理好

```sql
CREATE OR REPLACE FUNCTION dequeue_job()
RETURNS jobs AS $$
DECLARE
  result jobs;
  q      RECORD;
BEGIN
  -- 外層：依 priority 高到低排好 queue 順序
  FOR q IN
    SELECT id FROM queues ORDER BY priority DESC
  LOOP
    -- 內層：只針對這個 queue 取一筆，走窄 index
    SELECT * INTO result
    FROM jobs
    WHERE queue_id = q.id
    LIMIT 1
    FOR UPDATE SKIP LOCKED;

    IF FOUND THEN
      RETURN result;   -- 取到就立刻回傳
    END IF;
    -- 取不到（空的 or 全被鎖）→ 繼續下一個 queue
  END LOOP;

  RETURN NULL;         -- 全部 queue 都沒號可叫
END;
$$ LANGUAGE plpgsql;
```

執行邏輯：

```md
queues（依 priority DESC）
  │
  ├─ priority=10 → 找 job → 找到！→ RETURN
  │
  ├─ priority=5  → 找 job → 全被鎖（SKIP LOCKED）→ 繼續
  │
  ├─ priority=1  → 找 job → queue 是空的 → 繼續
  │
  └─ （沒了）→ RETURN NULL
```

---

#### 小結論

推薦一或三!