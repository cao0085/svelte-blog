---
title: "Algorithm - Basic"
date: "2026-09-02"
category: "software"
subCategory: "NYCU Algorithm"
tags: ["algorithm", "NYCU"]
slug: "NYCU_03"
---
###### 概要
---

一個 ```problem``` 是否包含一個 ```solution``` ? 問題本身可能會含 ```parameter``` or ```variable```，藉由設定這些參數獲得不同的 ```instance```；而透過演算法的 ```implementation``` 轉化成可以讓電腦運作的程式。

### Computablility

給定一個類型的問題，是不是有一個演算法可以解決此類當中的所有問題? 其中還可以粗分為:

- 決定性問題: 僅需知道可不可以。

- 最優化問題: 能找到這個算法的上下界。

### Complexity

使用 O(logN) 表示運算時間，若不同的 ```instance``` 差異過份龐大，一般不會認為是可以 ```implementation``` 的算法。

例如當有 10,000 筆訂單需要按順序排列:

1. 每次都遍歷陣列找到最小值後移除，花費的時間是```n + (n-1) + (n-2) ... = n(n+1)/2```，花費的時間隨指數成長，當資料量差異 100 倍時間差 10000 倍時間。

```TS
function selectionSort(input: number[]): number[] {
  const arr = [...input];

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 原地交換，不重建陣列
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }

  return arr;
}
```

2. 把資料已經先被排成一棵樹狀結構（堆），每次只需要「從樹頂走到樹底」→ 找 n 次，但每次只要問 log(n) （樹的高度），花費的時間是 n × log(n)，當資料量差異 100 倍時間差 200 倍時間。

```TS
function heapSort(input: number[]): number[] {
  const arr = [...input];
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapify(arr, end, 0);
  }

  return arr;
}

// 讓以 index i 為根的子樹符合 max-heap 性質 —— O(log n)
function heapify(arr: number[], heapSize: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, heapSize, largest); // 遞迴往下調整
  }
}
```

即使這兩個解都能找到上下界，但第一種通常不會被視為有效的演算法。

