---
title: "Paxos with Golang"
date: "2025-09-02"
category: ""
subCategory: "DataStorage"
tags: ["distributed", "consensus", "database", "paxos", "golang"]
slug: "paxos-golang"
---

###### 基本概念實作，實務上 ID 分發與節點生命週期管理會更複雜

---

演算法概念請先閱讀：[Paxos Algorithm](/paxos-algorithm)

---

### 型別定義

```go
type Proposer struct {
    Name  string
    ID    int   // 提案編號
    Value int   // 提案值
}

type Acceptor struct {
    Name        string
    HandleID    int  // 目前持有的最高提案編號
    HandleValue int  // 對應的值
}
```

---

### Phase 1：取得提案許可（Prepare）

Proposer 向所有 Acceptor 詢問：「我的編號夠高嗎？」

```go
func getProposalInfo(proposer Proposer, acceptors []Acceptor) bool {
    promiseCount := 0
    maxID := 0

    fmt.Printf("開始 Paxos 流程 - 提案者: %s\n", proposer.Name)

    // 找出所有 Acceptor 中最高的提案編號
    for _, value := range acceptors {
        if value.HandleID > maxID {
            maxID = value.HandleID
        } else {
            promiseCount++ // 模擬：有回應才計數（網路可能丟包）
        }
    }

    if maxID >= proposer.ID {
        // 提案編號不夠高，需要更新
        newProposerID := maxID + 1
        fmt.Printf("提案 ID %d 太低，請使用新的 proposer ID: %d 再次提案\n",
            proposer.ID, newProposerID)
        return false
    }

    if promiseCount > len(acceptors)/2 {
        fmt.Println("✓ 獲得多數承諾，可以進入 Accept 階段")
        return true
    }

    fmt.Println("✗ 未獲得多數承諾，提案失敗")
    return false
}
```

---

### Phase 2：廣播提案值（Accept）

Proposer 確認多數承諾後，廣播實際的提案值。

```go
func getAcceptorInfo(proposer Proposer, acceptors []Acceptor) bool {
    acceptorCount := 0

    for _, acceptor := range acceptors {
        acceptorCount++
        fmt.Printf("接受者: %s (ID: %d, 值: %d)\n",
            acceptor.Name, acceptor.HandleID, acceptor.HandleValue)
    }

    if acceptorCount > len(acceptors)/2 {
        fmt.Println("獲得多數承諾，可以廣播")
        return true
    }

    fmt.Println("無得到多數回應，提案失敗")
    return false
}
```

---

### 完整範例

```go
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
    // 案例 1：提案者 ID 太低
    proposer := Proposer{Name: "Alice", ID: 1, Value: 100}

    acceptors := []Acceptor{
        {Name: "Server-A", HandleID: 0, HandleValue: 0},  // 尚未處理提案
        {Name: "Server-B", HandleID: 2, HandleValue: 50}, // 持有 ID=2 提案
        {Name: "Server-C", HandleID: 1, HandleValue: 75}, // 持有 ID=1 提案
    }

    if getProposalInfo(proposer, acceptors) {
        if getAcceptorInfo(proposer, acceptors) {
            fmt.Println(proposer.ID, proposer.Value)
        }
    }

    // 案例 2：提案者 ID 夠高
    fmt.Println("\n=== 提案者 ID 更高 ===")
    proposer2 := Proposer{Name: "Bob", ID: 5, Value: 200}

    if getProposalInfo(proposer2, acceptors) {
        if getAcceptorInfo(proposer2, acceptors) {
            fmt.Println(proposer2.ID, proposer2.Value)
        }
    }
}

func getProposalInfo(proposer Proposer, acceptors []Acceptor) bool {
    promiseCount := 0
    maxID := 0

    fmt.Printf("開始 Paxos 流程 - 提案者: %s\n", proposer.Name)

    for _, value := range acceptors {
        if value.HandleID > maxID {
            maxID = value.HandleID
        } else {
            promiseCount++
        }
    }

    if maxID >= proposer.ID {
        newProposerID := maxID + 1
        fmt.Printf("提案 ID %d 太低，請使用新的 proposer ID: %d 再次提案\n",
            proposer.ID, newProposerID)
        return false
    }

    if promiseCount > len(acceptors)/2 {
        fmt.Println("✓ 獲得多數承諾，可以進入 Accept 階段")
        return true
    }

    fmt.Println("✗ 未獲得多數承諾，提案失敗")
    return false
}

func getAcceptorInfo(proposer Proposer, acceptors []Acceptor) bool {
    acceptorCount := 0

    for _, acceptor := range acceptors {
        acceptorCount++
        fmt.Printf("接受者: %s (ID: %d, 值: %d)\n",
            acceptor.Name, acceptor.HandleID, acceptor.HandleValue)
    }

    if acceptorCount > len(acceptors)/2 {
        fmt.Println("獲得多數承諾，可以廣播")
        return true
    }

    fmt.Println("無得到多數回應，提案失敗")
    return false
}
```

---

### 注意事項

此實作為概念示意，與真實 Paxos 有以下簡化：

- **未實作網路通訊**：真實場景 Proposer 需透過 RPC 向各 Acceptor 發送 Prepare/Accept 訊息
- **未處理 Acceptor 回傳已接受的值**：Phase 1 收到 Promise 時，若 Acceptor 已接受過某個值，Proposer 必須採用最高編號對應的值，而不是自己的值
- **未實作持久化**：Acceptor 需將承諾寫入磁碟，防止 Crash 後忘記承諾
