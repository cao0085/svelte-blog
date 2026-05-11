---
title: "Data Structure"
date: "2026-02-10"
category: "software"
subCategory: "Algorithm"
tags: ["data-structure", "array", "linked-list", "stack", "queue", "hash-table", "tree", "heap"]
slug: "data-structure"
---
###### 複習資料結構

---

### Array

最基本的資料結構，一塊連續的記憶體空間，透過 index 直接存取。

- 讀取：O(1)，直接用 index 定位
- 插入/刪除：O(n)，需要搬移後面的元素
- 大小固定（靜態），需要事先宣告長度

### Linked List

每個節點存一份資料和一個指向下一個節點的 pointer，不需要連續記憶體。

- 讀取：O(n)，要從 head 一個一個走過去
- 插入/刪除：O(1)，只需要改 pointer
- 大小動態，不需要事先宣告

分成 **Singly Linked List**（單向）和 **Doubly Linked List**（雙向，每個節點多一個指向前一個節點的 pointer）。

```text
Singly:  [A] -> [B] -> [C] -> null

Doubly:  null <- [A] <-> [B] <-> [C] -> null
```

### Stack

**LIFO**（Last-In, First-Out）— 最後放進去的最先拿出來，像一疊盤子。

- **Push**：從 top 放入元素
- **Pop**：從 top 取出元素
- 兩者都是 O(1)

```text
  Push / Pop
      |
      v
  [ E ] <-- top
  [ D ]
  [ C ]
  [ B ]
  [ A ] <-- bottom
```

可以用 array 或 linked list 實作。Linked list 實作只需要一個 top pointer，Push/Pop 都在同一端。

### Queue

**FIFO**（First-In, First-Out）— 先進去的先出來，像排隊一樣。

- **Enqueue**：從 rear（尾端）加入元素
- **Dequeue**：從 front（前端）取出元素
- 兩者都是 O(1)

```text
Dequeue <-- [ a1 | a2 | ... | an ] <-- Enqueue
             front             rear
```

Linked list 實作需要 front 和 rear 兩個 pointer。

### Hash Table

透過 **hash function** 把 key 映射到 array 的某個位置，實現接近 O(1) 的查找。

- 讀取/插入/刪除：平均 O(1)，最差 O(n)（發生大量 collision 時）
- **Collision**：不同的 key 被映射到同一個位置，常見的處理方式有 chaining（用 linked list 串起來）和 open addressing（找下一個空位）

```text
key "apple"  -- hash --> index 3
key "banana" -- hash --> index 7
key "cherry" -- hash --> index 3  (collision!)
```

### Tree

由節點組成的階層結構，每個節點有零到多個 child。

- **Root**：最上面的節點，沒有 parent
- **Leaf**：沒有 child 的節點
- **Height**：root 到最深 leaf 的距離

#### Binary Tree

每個節點最多兩個 child（left / right）。

#### Binary Search Tree（BST）

一種 binary tree，滿足：左子樹的值都比 parent 小，右子樹的值都比 parent 大。

- 查找/插入/刪除：平均 O(log n)，最差 O(n)（退化成 linked list）

### Heap

一種特殊的 complete binary tree，滿足 **heap property**：

- **Min-Heap**：parent 的值永遠不超過 child，root 是最小值
- **Max-Heap**：parent 的值永遠不小於 child，root 是最大值

常見操作：

- Insert：O(log n)
- Extract-Min / Extract-Max：O(log n)
- Peek（看最小/最大值）：O(1)

通常用 array 實作，不需要 pointer。節點 i 的 left child 在 2i+1，right child 在 2i+2。

### 小結

| 資料結構 | 讀取 | 插入/刪除 | 特性 |
| ---- | ---- | ---- | ---- |
| Array | O(1) | O(n) | 連續記憶體，index 存取 |
| Linked List | O(n) | O(1) | 動態大小，pointer 串接 |
| Stack | O(1) top | O(1) | LIFO |
| Queue | O(1) front | O(1) | FIFO |
| Hash Table | O(1) 平均 | O(1) 平均 | key-value 映射 |
| BST | O(log n) 平均 | O(log n) 平均 | 有序結構 |
| Heap | O(1) peek | O(log n) | 快速取最大/最小值 |
