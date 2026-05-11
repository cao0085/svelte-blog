---
title: "Graph"
date: "2026-03-27"
category: "software"
subCategory: "Algorithm"
tags: ["graph", "algorithm", "data-structure"]
slug: "graph"
---
###### [江蕙如老師 Lec06~07 演算法](https://www.youtube.com/watch?v=kxIQ86qMtfk) ，描述節點與邊的關係，從 path、cycle 到 connectivity

---

Graph 是用來描述「物件之間的關係」的結構，由兩個部分組成：

- **V（Vertices）**：一組節點，代表物件類似人、城市、網頁等等
- **E（Edges）**：一組邊，每條邊連接兩個節點，代表它們之間存在某種關係

會寫成 `G = (V, E) 如：G = ({台北,台中,高雄}, {(台北,台中),(台中,高雄)})`，再來會根據邊有沒有方向，分成兩種：

- **Undirected graph**：邊沒有方向，A 認識 B 就代表 B 也認識 A
- **Directed graph**：邊有方向，A 追蹤 B 不代表 B 追蹤 A

有了這個結構之後就是節點 `V` 之間在 `E` 找不找得到 `Path` 是否為 `Connectivity` 那距離 `Distance` 是？

#### Path

兩點之間「走得到」的具體路線。假設有一串節點`v1, v2, ..., vk`，可以把它想成「從 v1 沿著邊一步步走到 vk 的路線」。

- Simple path：路徑中所有節點皆不重複。
- Cycle：首尾相同的 path（v1 = vk），中間經過的節點都不重複，且至少經過 3 個點。

#### Connected

若`v1, v2, ..., vk`任意兩個節點之間都存在一條 path，這整張圖就是 `connected` 的（所有節點都互相可達）。

#### Distance

若兩個節點之間有 path，那也可能有很多條不同 path。其中邊數最少的那條就是兩點的 `distance`。若兩點不連通，則距離為無限大。

### Tree

一個 `Undirected Graph` 如果同時滿足 `Connected` 且不包含 `Cycle` 就是一棵 tree。數是最簡單的 connected graph 且刪掉任何一條邊都會讓圖變成 disconnected。

以下三個條件中只要滿足其中任兩條，也同時會推導出第三條：
    - G is connected
    - G does not contain a cycle
    - G has n - 1 edges

*補充：任何一顆 tree 都可以「抓住一個節點往上提，讓其餘節點自然垂下」形成熟悉的 rooted tree 結構。*

### Graph Traversal

從任意一個節點出發，若走完後每個節點都被拜訪過，這張圖就是`Connected Graph`。

#### Breadth-First Search

BFS 的策略是優先平級訪問，從一個節點出發一層一層找所有可達的節點。

- L0 = 起點 s 本身 (Root)
- L1 = 所有 L0 的 neighbors（adjacent nodes）
- L(j+1) = 所有不屬於先前任何 layer、且是 Lj 的 neighbors 的節點

i 就是起點 s 到 layer Li 中節點的 `distance`。

#### BFS Tree

BFS 過程中，每個節點**第一次**被發現時所經過的邊，會形成一棵 `BFS tree` 其餘的邊稱為 `nontree edge`。

**Thm**：令 T 為一棵 BFS tree，x 和 y 分別屬於 layer Li 和 Lj，且 (x, y) 是圖 G 中的一條邊，則 i 和 j 最多相差 1。

**Pf**：

- 不失一般性，假設 j - i > 1
- 根據定義，x 屬於 Li，x 的 neighbors 最晚會在 L(i+1) 被發現
- 但 (x, y) 是 G 的邊，所以 y 是 x 的 neighbor，y 屬於 Lj 且 j 不超過 i + 1，矛盾

> 這表示 BFS tree 中的 nontree edge 只會連接**同一層**或**相鄰層**的節點，不會跨越多層。

#### Depth-First Search

DFS 的策略則是走到最深再回頭。從一個節點出發做 DFS，能走到的所有節點就屬於同一個 connected component。

```text
DFS(u)
1. 標記 u 為 explored，加入結果集 R
2. 對每條與 u 相連的邊 (u, v)
3.   如果 v 還沒被標記為 explored
4.     遞迴呼叫 DFS(v)
```

#### DFS Tree

跟 BFS 一樣，DFS 過程中也會產生 tree edge 和 nontree edge。但 DFS tree 的性質跟 BFS tree 很不一樣：

**Thm**：令 T 為一棵 DFS tree，x 和 y 是 T 中的節點，且 (x, y) 是一條 nontree edge，則 x 和 y 之間一定是**祖先-後代**（ancestor-descendant）關係。

**Pf**：

- 不失一般性，假設 x 比 y 先被 DFS 拜訪到
- 當 DFS 檢查邊 (x, y) 時，y 已經被標記為 explored，所以沒有加入 tree
- 但 y 是在 DFS(x) 的遞迴過程中被發現的，代表 y 是 x 的 descendant

> BFS tree 的 nontree edge 連接同層或相鄰層；DFS tree 的 nontree edge 則一定連接祖先與後代。這是兩種 traversal 最關鍵的結構差異。

如果整張圖不是`connected`的，一次 BFS 或 DFS 只能走到起點所在的 connected component。要找出所有`connected component`，就對每個還沒被拜訪的節點再跑一次 BFS/DFS 即可。

### Representing Graphs

在討論演算法的效率之前，先定義 graph 的大小：

- n = 節點數（V 的 cardinality）
- m = 邊數（E 的 cardinality）

一個 connected graph 的邊數 m 介於 n - 1（tree，最少邊）到 n(n-1)/2（complete graph，每對節點都有邊）之間。接近下界的叫 **sparse graph**，接近上界的叫 **dense graph**。在 graph 演算法中，**linear time** 指的是 O(m+n)，因為光是讀完整張圖的 input 就需要 O(m+n) 的時間。

#### Adjacency Matrix

以節點數量 n x n 的矩陣 A 來表示 Graph 。A(u, v) = 0 or 1 代表節點之間有無邊，且無向圖的矩陣是對稱的。

- 查找速度：O(1)
- 儲存空間：O(n^2)，對 sparse graph 來說太浪費，大部分格子都是 0

#### Adjacency List

每個節點 u 維護一個 linked list，存它所有的 neighbors。若是在有向圖中，每個節點的邊分成 **in-degree** 和 **out-degree** 。Adjacency list 通常只存 outgoing edges，如果需要查 incoming edges 就要額外維護一份反向的 list。

- 查詢速度：O(deg(u))，deg(u) 是 u 的鄰居數量，要走訪整條 list 才能確認某條邊存不存在
- 儲存空間：O(n + m)，每條邊在兩個 list 各出現一次，總共 2m 個 entries

#### 比較

| 操作 | Matrix | List |
|------|-----------------|----------------|
| 查找特定邊 | O(1) | O(deg(u)) |
| 查找 degree | O(n) | O(1) |
| 走訪整張圖 | O(n²) | O(n + m) |
| Sparse graph 空間 | O(n²) 浪費 | O(n + m) |
| Dense graph 空間 | O(n²) | O(n + m) 略多 |
| 邊的插入／刪除 | O(1) | O(deg(u)) |
