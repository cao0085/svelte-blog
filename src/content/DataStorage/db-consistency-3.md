---
title: "DDB 03 - 共識演算法"
date: "2025-07-29"
category: "software"
subCategory: "DataStorage"
tags: ["database", "distributed", "consensus", "paxos"]
slug: "db-consistency-3"
---

###### 在不可靠的分散式環境中，讓多個節點對同一個值達成共識

---

### Consensus Algorithm 的三個必要條件

| 條件 | 說明 |
|------|------|
| **Termination** | 所有無故障節點最終都會做出決定，演算法不會永遠跑下去 |
| **Validity** | 最終決議一定來自某個參與節點提出的值 |
| **Agreement** | 所有節點最終做出相同的決定 |

---

### Network Model

#### Synchronous Network（理想，現實不存在）

- 時間同步（Clock Synchronization）：每個節點時鐘彼此對齊
- 訊息延遲有上限（Bounded Network Delay）：傳遞最多延遲固定時間
- 計算速度一致（Equal Computation Speed）：所有節點處理速度相同

#### Asynchronous Network（現實）

上述三點都不保證。無法區分「節點很慢」還是「節點已死亡」。

---

### Failure Model

| 類型 | 說明 |
|------|------|
| **Byzantine failures** | 節點不按程式邏輯執行，可能惡意回傳錯誤值 |
| **Crash-recovery failures** | 計算正確，但可能因 Crash 或網路中斷需要時間恢復 |
| **Omission failures** | Crash 後不再回覆訊息（訊息丟失，不重傳） |
| **Crash failure** | Crash 後永久停止，不再與其他節點互動 |

大多數分散式資料庫（Paxos、Raft）假設 Crash-recovery 模型，不處理 Byzantine failures（區塊鏈等才需要 BFT 演算法）。

---

### Paxos Algorithm 簡介

每個節點（Process）可以同時扮演 Proposer（發起提議）與 Acceptor（接受提議）兩種角色，遵循 Asynchronous Network，不保證時間但保證最終送達。

**Phase 1 — Preparation**

Proposer 發送提案編號 `n` 給所有 Acceptor，目的是讓過半數承諾「不再接受比 n 小的提案」。

**Phase 2 — Accept**

收到過半數 Promise 後，Proposer 決定要提出的值，並廣播 Accept 請求。若過半數 Acceptor 接受，值即確定。

詳細流程請見下一篇：[Paxos Algorithm 敘事說明](/svelte-blog/article/paxos_algorithm)

---

### FLP Impossibility

> 在 Asynchronous Network 下，若允許即使只有一個節點 Crash，就**不存在**能保證所有三個條件（Termination、Validity、Agreement）的確定性演算法。

這就是為什麼現實的共識演算法（Paxos、Raft）都有「不保證在某些情況下終止」的條件，但在正常情況下仍能正常運作。
