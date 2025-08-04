---
title: "Database Consistency 3"
date: "2025-07-29"
category: "software"
subCategory: "Database"
tags: ["consistency", "system", "design","database"]
slug: "database_consistency_3"
---
###### 維持多台 Server 資料唯一性的幾種選擇，[建議閱讀這裡](https://ithelp.ithome.com.tw/articles/10217086)

---

### Consensus Algorithm Requirements

- Termination: 保證所有參與決策且無故障的節點最終會做一個決定，執行的演算法不會無法終止。
- Validity: 最終的決議一定是來自某一個參與的節點
- Agreement: 當演算法完成時，所有節點都會做相同的決定

<br>

### Network Model

Synchronous Network Model

- 時間同步（Clock Synchronization）: 每個節點的「時鐘」彼此對齊，雖然可能有些微差異，但保證不會無限偏移（例如都在 ±ε 範圍內）。

- 訊息延遲有上限（Bounded Network Delay）: 傳輸訊息最多只會延遲某個固定時間

- 計算速度一致（Equal Computation Speed）: 所有節點的處理速度是同步的，彼此的運算時間不會落差太大。

上述是最理想的狀態，但是在現實世界不可能達成，而 Asynchronous Network 就是相反。

<br>

Failure Model

- Byzantine failures: 該節點不按照程式邏輯執行，惡意給予錯誤的回復，比方使用者輸入0，當提出proposal給集群時，該節點隨機傳送0或1給其餘節點

- Crash-recovery failures: 節點運算總是正確，但是可能因為發生Crash或是網路中斷，需要時間Recover，因此無法保證回覆時間

- Omission failures: 發生Crash後「消息」不會回覆。比方網路中斷導致訊息丟失，不再重傳。

- Crash failure: 發生Crash，不再回復。比方某個節點發生故障，則該節點不再回復也不再跟其他系統其他節點有來往。

<br>

### Paxos Algorithm

每個節點稱作 Processes 可以同時發起提議（Proposer）/ 接受提議（Acceptor），遵循 Asynchronous Network Model 不保證時間但保證最終會送達

<br>

**Phase 1 — Preparation**：讓過半數的 Acceptors 承諾不再接受比 n 小的提案

**Phase 2 — Accept**:Proposer 收集 ack 後，決定要提出什麼值，並發送給大家