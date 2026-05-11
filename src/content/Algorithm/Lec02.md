---
title: "Lec02"
date: "2026-03-04"
category: "software"
subCategory: "Algorithm"
tags: ["algorithm", "NYCU"]
slug: "NYCU_02"
---
###### [江蕙如老師 Lec02 演算法](https://www.youtube.com/watch?v=kxIQ86qMtfk)
---

### 本週問題 - Stable Matching

- 一百位男/女生客戶並互相知道
- 每個人需要對對方做興趣排序
- 需要作配對，希望做出100對happy配對必須配完，一對一
- 配對完成需要happy & stable

what's stable matching : 不存在這對男女同時喜歡對方更勝目前的配偶

### 解法

- 男生提議
- 女生 free engaged married (decision making)

```golang
// init free
while(some man free & has not proposed)

//state
女生接受
  - 替換
  - 本來就沒有

女生拒絕
  - 比本來的不好

```


### Gale-Shapley Algorithm

延遲接受

```go
// You can edit this code!
// Click here and start typing.
package main

import (
  "fmt"
  "log"
)

func main() {
  fmt.Println("Hello, 世界")
  a := [][]int{{1}}
  b := [][]int{{2}}

  if err := checkLength(a, b); err != nil {
    log.Fatal(err)
  }
  stableMatching(a, b)
}

func stableMatching(men [][]int, woman [][]int) bool {

  // return boolean
  // true: 全部男生都有配對對象
  // false: 全部男生提議都被執行,但是沒有配對完成
  // worst case 全部男生都執行全部提案 N*N
  // 觀察 1: 男生必定是最喜歡開始
  // 觀察 2: 可以挑選中最好的
 
 // 男生會有的狀態 free match 來回切換
  // 女生會有的狀態 free engaged match 

  // 證明 perfact match
  // 程式停止條件意圖 1. has not FreeMan(不必要繼續執行) 2. all proposal do(所有提案都執行完成) n*n
  // 反證法：當程式跑完時有沒有可能出現 freeman/woman
  // 拿最糟糕情況『當所有提案都執行』後有沒有機會出現 free 
  // 女生必定會被提案一次(每個男生名單都有), 且女生在 free 的情況下是不能拒絕(觀察二), 也不會回到 free
  // 沒有 free woman = 沒有 free man = perfact match
  
  // In the men who is free and still has proposal Do
  for hasFreeMan && proposal{

  }

  // 互相喜歡對方更勝配偶

  return true
}

func checkLength(man [][]int, woman [][]int) error {
  if len(man) != len(woman) {
    return fmt.Errorf("男女配對不正確")
  }

  if len(man) == 0 {
    return fmt.Errorf("清單為空")
  }

  count := len(man[0])

  for i := 0; i < len(man); i++ {
    if len(man[i]) != count {
      return fmt.Errorf("第 %d 個男生名單數量錯誤", i+1)
    }
    if len(woman[i]) != count {
      return fmt.Errorf("第 %d 個女生名單數量錯誤", i+1)
    }
  }

  return nil
}
```
