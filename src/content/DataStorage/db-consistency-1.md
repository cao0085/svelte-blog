---
title: "DDB 01 - Consistency Model 與 Quorum"
date: "2025-07-26"
category: "software"
subCategory: "DataStorage"
tags: ["database", "distributed", "consistency"]
slug: "db-consistency-1"
---

###### 採用分散式資料庫時，維持多台 Server 資料唯一性的幾種選擇，[建議閱讀這裡](https://ithelp.ithome.com.tw/articles/10217086)

---

當需要維持多台 DB Server 時，因為建置成本的關係，可依據需求選擇策略:

#### Consistency Model

| 模型 | 保證 | 適用場景 |
|------|------|----------|
| Strong Consistency | 保證最新且正確才回傳，否則報錯 | 金融交易、庫存扣減 |
| Read My Writes | 只讀取保證有最新寫入的資料庫 | 個人設定、用戶資料更新 |
| Bounded Staleness | 允許資料落後一定範圍（可設定閾值） | 監控數據、排行榜 |
| Consistent Prefix | 資料正確但不保證最新 | 社交動態、評論 |
| Monotonic Reads | 第一次不保證最新，但之後固定讀同一台 | 一般讀取場景 |
| Eventual Consistency | 只保證最終所有節點會收斂到同一結果 | DNS、快取、通知 |

#### Quorum System

**情境：** 商城限量開賣筆電 100 台，資料存在 3 台伺服器（R1、R2、R3）上。

#### DB Lock（強一致性）

每次購買前鎖住所有伺服器，保證正確但效能差：
- 客戶 A 買 → 鎖住 R1、R2、R3 → 扣庫存 → 解鎖
- 客戶 B 必須等待 A 完成

#### Quorum（讀寫法定人數）

- 寫入：成功寫入 2 台（W = 2）即算成功
- 讀取：從 2 台讀取（R = 2）
- 只要 R + W > N（節點數），讀寫必有交集，保證能讀到最新資料

```text
庫存初始值：100
R1: 100 / R2: 100 / R3: 100

C1 買一台：
→ 寫入 R1 和 R2（成功）
→ R1: 99, R2: 99, R3: 100（未更新）

C2 買一台：
→ 讀 R2 和 R3，選出最大版本為 99
→ 寫入 R2 和 R3
→ R1: 99, R2: 98, R3: 98

下次讀取 → 從 2 台讀出 → 選版本最新的 → 拿到正確的 98
```

---

### 節點故障後的一致性修復

假設 C1 成功寫入 R1、R2、R3，但 R4、R5 當時故障沒更新：

```text
R1: 99 / R2: 99 / R3: 99
R4: 100（舊）/ R5: 100（舊）
```

#### Read-Repair

讀取時系統發現 R4、R5 版本較舊，除了回傳正確值，還會主動寫回：

```text
讀取結果：R1: 99（t2） / R4: 100（舊）
系統判斷 99 是最新，回傳 99 給用戶
同時將 99 寫回 R4、R5 → 所有節點回到一致
```

#### Anti-Entropy

背景 process 定期掃描所有 replica，發現版本落後的節點就主動同步最新資料，不等讀取觸發。

---

### Sloppy Quorum + Hinted Handoff

當目標節點暫時故障，允許找「替代伺服器」暫存資料，故障恢復後再回補：

```text
原本應寫入：R1  R2  R3
R3 故障 →  R1  R2  R4（代理，標記「這份資料原屬 R3」）

R3 恢復後，R4 將代理資料回補給 R3，完成 Hinted Handoff
```

> 這讓系統在部分節點故障時仍能繼續寫入，犧牲短暫的強一致性換取可用性。
