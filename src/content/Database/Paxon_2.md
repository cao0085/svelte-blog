---
title: "Paxon with Golang"
date: "2025-09-02"
category: "software"
subCategory: "Database"
tags: ["consistency", "system", "design","database"]
slug: "paxonGolang"
---
###### 基本概念如下，當然實務上要如何分發ID、定義節點的生命週期會更複雜

---

型別

```Go
type Proposer struct {
    Name  string
    ID    int
    Value int
}

type Acceptor struct {
    Name        string
    HandleID    int
    HandleValue int
}
```

第一階段 - 獲取提案許可

```go

func getProposal(proposer Proposer, acceptors []Acceptor) bool{

    promiseCount := 0
    maxID := 0

    // 檢查有沒有參與者持有 > 的編號
    for _, value := range acceptors {
        if value.HandleID > maxID {
            maxID = value.HandleID
        } else {
            promiseCount ++ // 模擬網路傳遞失敗 有回應才 ++ 
        }
    }

    if maxID >= proposer.ID {
        newProposerID := maxID + 1
        fmt.Printf("提案 ID %d 順位太低，請使用新的 proposer ID: %d 再次提案\n", proposer.ID, newProposerID)
        return false
    } else {
        if promiseCount > len(acceptors)/2 {
            fmt.Println("✓ 獲得多數承諾，可以進入 Accept 階段")
            return true
        } else {
            fmt.Println("✗ 未獲得多數承諾，提案失敗")
            return false
        }
    }
}

```

第二階段 - 承諾提案內容有共識

```go
func getAcceptorInfo(proposer Proposer, acceptors []Acceptor) bool{

    acceptorCount := 0;
    for _, acceptor := range acceptors {
        acceptorCount ++
        fmt.Printf("接受者: %s (ID: %d, 值: %d)\n", 
                   acceptor.Name, acceptor.HandleID, acceptor.HandleValue)
    }

    if acceptorCount > len(acceptors)/2 {
        fmt.Println("獲得多數承諾，可以廣播")
        return true
    } else {
        fmt.Println("無得到多數回應，提案失敗")
        return false
    }
}
```


```golang

package main

import "fmt"

type Proposer struct {
    Name  string
    ID    int
    Value int
}

type Acceptor struct {
    Name        string
    HandleID    int
    HandleValue int
}

func main() {
    // 建立一個提案者
    proposer := Proposer{
        Name:  "Alice",
        ID:    1,
        Value: 100, // 改成 Value
    }

    // 建立三個接受者 (模擬不同的狀態)
    acceptor1 := Acceptor{
        Name:        "Server-A",
        HandleID:    0, // 還沒處理過任何提案
        HandleValue: 0,
    }

    acceptor2 := Acceptor{
        Name:        "Server-B", 
        HandleID:    2, // 之前處理過 ID=2 的提案
        HandleValue: 50,
    }

    acceptor3 := Acceptor{
        Name:        "Server-C",
        HandleID:    1, // 之前處理過 ID=1 的提案
        HandleValue: 75,
    }

    acceptors := []Acceptor{acceptor1, acceptor2, acceptor3}

    // 執行 Paxos
    if getProposalInfo(proposer, acceptors) {
        if getAcceptorInfo(proposer, acceptors) {
          fmt.Println(proposer.ID, proposer.Value)
        }
    }

    fmt.Println("\n=== 測試案例 2: 提案者 ID 更高 ===")
    proposer2 := Proposer{
        Name:  "Bob",
        ID:    5, // 比所有 acceptor 的 HandleID 都高
        Value: 200, // 改成 Value
    }
    
    if getProposalInfo(proposer2, acceptors) {
        if getAcceptorInfo(proposer2, acceptors) {
          fmt.Println(proposer2.ID, proposer2.Value)
        }
    }
}

func getProposalInfo(proposer Proposer, acceptors []Acceptor) bool{

    promiseCount := 0
    maxID := 0

    fmt.Printf("開始 Paxos 流程 - 提案者: %s\n", proposer.Name)

    // 先處理提案編號
    for _, value := range acceptors {
        if value.HandleID > maxID {
            maxID = value.HandleID
        } else {
            promiseCount ++ // 因若是網路傳遞，會需要紀錄回傳次數結果
        }
    }

    if maxID >= proposer.ID { // 修正條件：應該是 >= 而不是 > 0
        newProposerID := maxID + 1
        fmt.Printf("提案 ID %d 太低，請使用新的 proposer ID: %d 再次提案\n", proposer.ID, newProposerID)
        return false
    } else {
        if promiseCount > len(acceptors)/2 {
            fmt.Println("✓ 獲得多數承諾，可以進入 Accept 階段")
            return true
        } else {
            fmt.Println("✗ 未獲得多數承諾，提案失敗")
            return false
        }
    }
}

func getAcceptorInfo(proposer Proposer, acceptors []Acceptor) bool{

    acceptorCount := 0;
    for _, acceptor := range acceptors {
        acceptorCount ++
        fmt.Printf("接受者: %s (ID: %d, 值: %d)\n", 
                   acceptor.Name, acceptor.HandleID, acceptor.HandleValue)
    }

    if acceptorCount > len(acceptors)/2 {
        fmt.Println("獲得多數承諾，可以廣播")
        return true
    } else {
        fmt.Println("無得到多數回應，提案失敗")
        return false
    }
}

```


