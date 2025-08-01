---
title: "Database Consistency 1"
date: "2025-06-22"
category: "software"
subCategory: "Database"
tags: ["consistency", "system", "design","database"]
slug: "database_consistency_1"
---
###### 維持多台 Server 資料唯一性的幾種選擇，[建議閱讀這裡](https://ithelp.ithome.com.tw/articles/10217086)

---

當需要維持多台DB Server，因為建置成本的關係，可依據需求去選擇不同強度的Model去實作

### Consistency Model

- Strong Consistency: 在保證最新和正確的情況下才回傳，否則就回報錯誤

- Read My Writes: 只讀取保證有最新寫入的資料庫

- Bounded Staleness: 可參數化這個 bounded值，在可允許範圍內確定資料的正確性

- Consistent Prefix: 保證資料是正確的，但是不一定是最新

- Monotonic Reads: 第一次拿取不保證正確性，但之後都會向同一台Server拿取資料

- Eventual Consistency: 只保證最後執行完畢的資料會是正確的

### Quorum System

實例情境

- 商城限量開賣一款筆電限購「100台」
- 客戶很多（C1、C2、C3...Cn）在同一時間湧進來搶購
- 為了快速處理，商城把這個「庫存數量」存在於 **3 個伺服器（R1、R2、R3）** 上，形成一個「分散式系統」

<br>

### DB Lock

每次有人要搶購時，先「鎖住所有伺服器」，等操作結束後再開放。能保證正確（強一致性）但是非常慢、任一台伺服器壞掉，整個系統卡死。

- 客戶 A 說我要買 → 鎖住 R1、R2、R3 → 扣庫存 → 解鎖
- 客戶 B 必須等待 A 的操作完

### Quorum

- 寫入：只要成功寫入 **2 台（W = 2）** 就算成功
- 讀取：也從 **2 台讀取（R = 2）**
- 且滿足 R + W > 3，就能保證「交集」裡一定有最新的資訊

<br>

對應實際流程：

1. 客戶 A 要買向 R1、R2 發出購買請求（扣除庫存 -1），系統只要有 2 台回應成功就算成功。

2. 客戶 B 要買向 R2、R3 發出購買請求，就算不同人問到不同伺服器，只要 **總是至少問 2 台（R）**，系統就可以找出正確的庫存數，避免「同時兩人都以為還有庫存」。

```text
庫存初始值：100

伺服器：
R1: 100
R2: 100
R3: 100

C1 買一台：
→ 寫入 R1 和 R2（成功）
→ R1: 99, R2: 99, R3: 100

C2 買一台：
→ 讀 R2 和 R3，選出最大版本為 99
→ 寫入 R2 和 R3 → 變成 R2: 98, R3: 98

最後
R1: 99
R2: 98
R3: 98
```

`下次再讀庫存時 → 會從 2 台讀出資料 → 看哪個版本新（有版本號或時間戳）→ 拿到正確的「98」`

假設用戶 C1 買了一台筆電，寫入筆電數量剩下 99
C1 的請求被成功寫到：R1、R2、R3
R4(讀)、R5(讀) 當時故障或太慢 → 沒有更新成功

```text
R1: 99
R2: 99
R3: 99
R4: 100
R5: 100
```

### Read-Repair

```text
R1: 99  ✅（有時間戳 t2）
R4: 100 ❌（舊）
R5: 100 ❌（舊）
```

系統根據 timestamp 判斷：99 是最新的庫存，除了把 99 回傳給用戶外，還會 99 寫回 R4、R5

```text
R1: 99
R2: 99
R3: 99
R4: 99
R5: 99
```

### Anti-Entropy

或是用背景 process 會：

- 定期掃描所有 replica

- 發現某些節點資料版本較舊

- 根據 timestamp 主動同步最新資料

<br>

### Sloppy Quorum + Hinted Handoff

之前的寫入規則是 R1, R2, R3 寫入 >= 2
但是如果_R3突然掛掉了，可以找一個替代伺服器_R4，只是_R4儲存的資料需要標記，等_R3恢復後再回補

```text
C1 發出寫入 (搶購筆電，剩 99)

[ 原本應該寫入 ]:  R1   R2   R3  
[ 實際成功寫入 ]:  R1   R4   ❌

=> 系統標記：R4 存了一份「R3 的代理資料」
```
