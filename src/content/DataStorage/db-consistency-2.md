---
title: "DDB 02 - Vector Clock"
date: "2025-07-28"
category: "software"
subCategory: "DataStorage"
tags: ["database", "distributed", "consistency", "vector-clock"]
slug: "db-consistency-2"
---

###### 實作時不同伺服器中的時間戳不可當作最新資料的判斷依據

---

### 為什麼不能用時間戳？

分散式系統中，每台伺服器的時鐘無法保持完全同步（Network Time Protocol 有誤差），導致：
- 伺服器 A 的時間可能比 B 快幾毫秒
- 用「誰的時間戳更大就是最新」會誤判版本順序

解決方案：**Vector Clock**，用邏輯計數取代物理時間。

---

### Vector Clock

背景：3 台 replica R1、R2、R3，每台維護一個向量版本號。

**Client 讀資料時拿到：**

```text
value   = 100
version = { R1: 1, R2: 1, R3: 0 }
```

**Client 寫入資料時帶上舊版本：**

```text
{
  value:       99,
  old_version: { R1: 1, R2: 1, R3: 0 }
}
```

**R1 收到後，將自己的計數 +1：**

```text
{ R1: 2, R2: 1, R3: 0 }
```

**R2 收到後，將自己的計數 +1：**

```text
{ R1: 1, R2: 2, R3: 0 }
```

---

### 版本比較規則

讀取時比較多台節點的 Vector Clock，選出「數字最大」的那份作為最新版本。

```text
R1 版本: { R1: 2, R2: 1, R3: 0 }  → 較新（R1 多了一次寫入）
R2 版本: { R1: 1, R2: 2, R3: 0 }  → 不同分支

如果兩份版本無法判斷誰先誰後（都有對方沒有的更新）
→ 發生衝突（conflict），需交由應用層或使用者解決
```

### 衝突範例

```text
初始：{ R1: 1, R2: 1, R3: 1 }

A 在 R1 寫入 → R1 版本: { R1: 2, R2: 1, R3: 1 }
B 同時在 R2 寫入 → R2 版本: { R1: 1, R2: 2, R3: 1 }

→ 兩份版本無法比較（各自超前對方一步）
→ 系統偵測到衝突，需要合併策略
```

> Amazon Dynamo 使用 Vector Clock，衝突時讓用戶選擇（例如購物車合併兩份商品列表）。
