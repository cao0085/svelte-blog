# Content 目錄重整計劃

## 新目錄結構

```
content/
├── Algorithm/        ← 保留不動
├── Angular/          ← 原 Angular20/（改名）
├── Backend/          ← 保留，定位：library/framework 用法（EFCore、HttpCancel）
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

### Angular/（原 Angular20/）— 改目錄名

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| angular20_API_01.md | RxJS Observable | RxJS Observable | OK |
| angular20_API_02.md | HttpClient | HttpClient & HttpResource | 加 HttpResource 更清楚 |
| angular20_Forms.md | Forms | Reactive Forms | 加 Reactive 更具體 |
| angular20_Signal.md | Signal | Signal - State Management | OK（可加副標） |
| angular20_tabService.md | TabService | TabService - Multi-Tab Management | OK |
| angular_basic_value.md | Value 1 | Value Passing - Input / Output / ViewChild | 比 "Value 1" 清楚 |
| angular_basic_value_02.md | Value 2 | Value Passing - Signal / RxJS / Computed | 比 "Value 2" 清楚 |
| angular_router.md | Basic Router | Angular Router - Basic | OK |
| angular20_AuthRoute_01.md | Auth & Route 1 | Auth & Route - Database & RBAC Design | 系列文 |
| angular20_AuthRoute_02.md | Auth & Route 2 | Auth & Route - Service & Guard | |
| angular20_AuthRoute_03.md | Auth & Route 3 | Auth & Route - Sidebar UI/UX | |
| angular20_RouteReuseStrategy_01.md | RouteReuseStrategy 1 | RouteReuseStrategy - Concepts | |
| angular20_RouteReuseStrategy_02.md | RouteReuseStrategy 2 | RouteReuseStrategy - Implementation | |

**合併建議：**

- `AuthRoute 01/02/03`：主題連貫，可考慮合成一篇（也可維持）
- `RouteReuseStrategy 01/02`：同上，可合可維持

---

### Backend/（定位：library/framework 說明）— 移出架構類後只剩 2 篇

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| EFCore_Codefirst.md | EF Core - CodeFirst | EF Core - Code First Migration | 加 Migration 更清楚 |
| HttpCancel.md | Canceling Http Requests | Canceling HTTP Requests - CancellationToken | OK |

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

### Frontend/（原 Fronted/）— 修正拼字

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| css.md | Html Element & CSS 參考標準 | HTML & CSS Reference | 簡化標題 |
| design_token.md | Design Token | Design Token | OK |
| ThreeJS.md | 插入 3D 影像 | Three.js - 插入 3D 場景 | 加框架名 |
| Electron_01.md | Electron With WebContentsView | Electron - WebContentsView | OK |
| Kotlin_01.md | Android with Kotlin2.0 | Android with Kotlin 2.0 | OK（加空格） |

---

### Golang/（保留不動）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| DDD_01.md | DDD Architecture | DDD Architecture in Go | 加 "in Go" 更清楚 |
| Redis.md | Redis | Redis with Go | 加 "with Go" |
| summary.md | Golang High Concurrency Summary | Golang - High Concurrency Summary | 加連字號 |

---

### Http/（保留不動）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| CORS.md | CORS & SOP | CORS & Same-Origin Policy | 展開縮寫更友善 |
| http_connect.md | Http Connect | HTTP Connection Lifecycle | 更有描述性 |
| http_secretKey.md | Http 加密 | HTTP - 請求加密與簽章 | 更具體 |
| nginx.md | Nginx | Nginx - 基本設定 | 加副標 |
| filestream.md | HTTP & FileStream | HTTP - File Streaming | OK |

---

### How-To/（新建）

#### 來自 Backend/（架構類文章）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| DDD_Domain.md | Domain-Driven - Basic | How to Design DDD Domain Layer | slug 重複，需修正（見下） |
| DDD_layer.md | Domain-Driven - Basic | How to Structure DDD Layers | 原標題與 DDD_Domain 相同 |
| DDD_mediator.md | Domain-Driven - Mediator | How to Use MediatR & MassTransit | |
| DDD_outbox.md | Domain-Driven - Outbox Message | How to Implement Outbox Pattern | |
| FSM.md | Finite-State Machine | How to Design a Finite-State Machine | |
| BackgroudService.md | Base Backgroud Service | How to Build a Background Service | 修正拼字 → BackgroundService.md |

#### 來自 Devlop-Note/（全部移入）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| cashflow.md | POS機台金流串接處理 | How to Integrate POS Payment Gateway | |
| reconcile.md | 會計對帳檔案處理 | How to Handle Payment Reconciliation | |
| jsPDF.md | Download PDF | How to Generate PDF with jsPDF | |
| pdfMerge.md | 多個 PDF 檔案合併 | How to Merge PDF Files | |
| xlsx_excel.md | XLSL Excel 套件 | How to Handle Excel Files with xlsx | 修正拼字 XLSL → XLSX |
| sftp_ftps.md | SFTP、FTPS C# 連線測試 | How to Connect SFTP / FTPS in C# | |
| structurizr.md | Structurizr C4Model | How to Use Structurizr C4 Model | |
| summary_2025.md | 2025 軟體開發 | 2025 Software Development Reflection | 暫放 How-To |

---

### Project/（保留不動）

| 原檔名 | 現有標題 | 建議新標題 | 備註 |
|--------|----------|-----------|------|
| blog.md | Svelte Blog | Svelte Blog | OK |
| webpreviewer.md | Website Previewer | Website Previewer | OK |
| websiteeditor.md | Website Editor | Website Editor | OK |

---

## 關鍵問題（執行前需處理）

1. **DDD_Domain.md 和 DDD_layer.md 的 slug 相同（ddd_layer）** — 其中一個需改 slug，否則路由會衝突
2. **BackgroudService.md 拼字** — 改為 `BackgroundService.md`
3. **Paxon → Paxos** 拼字（選擇性修正）

---

## 執行步驟

1. 建立 `How-To/` 目錄
2. 移動 Backend 架構類文章 → `How-To/`
3. 移動 `Devlop-Note/` 全部 → `How-To/`，刪除 `Devlop-Note/`
4. 重命名 `Angular20/` → `Angular/`
5. 重命名 `Fronted/` → `Frontend/`
6. 修改各文章 frontmatter（title、category、修正重複 slug）
7. 必要時重新命名 md 檔名（如 BackgroudService.md）

---

## 驗證

1. 本地啟動 blog (`npm run dev`) 確認所有文章可正常瀏覽
2. 確認沒有重複 slug 導致的 404
3. 確認 frontmatter category 與目錄一致
