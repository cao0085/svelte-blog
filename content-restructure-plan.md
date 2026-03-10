# Content 目錄重整計劃

## 新目錄結構

```
content/
├── Algorithm/        ← 保留不動
├── Angular/          ← 原 Angular20/（改名）
├── Backend/          ← 保留，定位：library/framework 用法 + DDD/架構類文章
├── Database/         ← 保留，定位：SQL/協議/一致性概念
├── Frontend/         ← 原 Fronted/（修正拼字）
├── Golang/           ← 保留不動
├── Http/             ← 保留不動，定位：HTTP 協議說明
├── How-To/           ← 新建（原 Devlop-Note + Backend 架構類文章）
├── Project/          ← 保留不動
└── Read/             ← 不動
```

---

## 各分類文章對照表

### Algorithm/ — 保留不動

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| Lec02.md | Lec02 | Stable Matching & Gale-Shapley | 標題太模糊，建議改 |

---

### Backend/（定位：library/framework 用法 + DDD/架構類文章）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| EFCore_Codefirst.md | EF Core - CodeFirst | EF Core - Code First Migration | 加 Migration 更清楚 |
| HttpCancel.md | Canceling Http Requests | Canceling HTTP Requests - CancellationToken | OK |
| DDD_01.md | DDD Architecture | Domain-Driven 01 - Architecture & Core Concepts | 從 Golang/ 移入 ✅ |
| DDD_02.md | Domain-Driven - Basic | Domain-Driven 02 - Layer Structure | 原 DDD_layer.md ✅ |
| DDD_03.md | Domain-Driven - Basic | Domain-Driven 03 - Domain Object Design | 原 DDD_Domain.md，內容補寫 ✅ |
| DDD_04.md | Domain-Driven - Mediator | Domain-Driven 04 - MediatR & MassTransit | 原 DDD_mediator.md ✅ |
| DDD_05.md | Domain-Driven - Outbox Message | Domain-Driven 05 - Outbox Pattern | 原 DDD_outbox.md ✅ |
| FSM.md | Finite-State Machine | How to Design a Finite-State Machine | |
| BackgroudService.md | Base Backgroud Service | How to Build a Background Service | 修正拼字 → BackgroundService.md |

---

### Database/（定位：SQL / 一致性 / 協議概念）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| db_normalization.md | 資料庫正規化 | 資料庫正規化 | OK |
| db_relational.md | 關聯式資料庫 | 關聯式資料庫 | OK |
| db_sql.md | SQL Command | SQL Command Reference | 加 Reference |
| db_leetcode50.md | LeetCode SQL 50 | LeetCode SQL 50 | OK |
| db_table_1.md | 資料庫表單設計 | 資料庫表單設計 | OK |
| db_concurrency_1.md | PostgreSQL 併發控制 1 | PostgreSQL 併發控制 - Locking | 加副標題 |
| db_concurrency_2.md | PostgreSQL 併發控制 2 | PostgreSQL 併發控制 - MVCC | 加副標題 |
| consistency_1.md | Database Consistency 1 | Database Consistency - 模型概述 | 加副標題 |
| consistency_2.md | Database Consistency 2 | Database Consistency - Quorum & Read-Repair | 加副標題 |
| consistency_3.md | Database Consistency 3 | Database Consistency - Anti-Entropy | 加副標題 |
| Paxon_1.md | Paxon | Paxos - Consensus Algorithm | 修正拼字（Paxon → Paxos） |
| Paxon_2.md | Paxon with Golang | Paxos - Golang Implementation | 同上 |

**合併建議：**

- `Paxon_1 + Paxon_2`：可合成一篇（概念 + Go 實作）
- `consistency_1/2/3`：系列文維持

---

### Golang/（保留不動）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| Redis.md | Redis | Redis with Go | 加 "with Go" |
| summary.md | Golang High Concurrency Summary | Golang - High Concurrency Summary | 加連字號 |
---


## 關鍵問題（執行前需處理）

1. ~~**DDD_Domain.md 和 DDD_layer.md 的 slug 相同（ddd_layer）**~~ → 已解決，全部改為 ddd_01 ~ ddd_05 ✅
2. **BackgroudService.md 拼字** — 改為 `BackgroundService.md`
3. **Paxon → Paxos** 拼字（選擇性修正）

---

## 執行步驟

1. ~~移動 `Golang/DDD_01.md` → `Backend/`，更新 frontmatter~~ ✅
2. ~~修改 DDD 系列文章 frontmatter（title、slug ddd_01~05、date 遞增）、檔名改為 DDD_01~05.md~~ ✅
3. 修改其他 Backend 文章 frontmatter（BackgroudService.md 改名）
7. 修改其餘文章 frontmatter（title、category）

---

## 驗證

1. 本地啟動 blog (`npm run dev`) 確認所有文章可正常瀏覽
2. 確認沒有重複 slug 導致的 404
3. 確認 frontmatter category 與目錄一致
