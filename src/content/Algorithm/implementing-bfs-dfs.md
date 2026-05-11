---
title: "Implementing BFS & DFS"
date: "2026-03-29"
category: "software"
subCategory: "Algorithm"
tags: ["graph", "bfs", "dfs", "golang"]
slug: "implementing-bfs-dfs"
---
###### 實作 BFS 和 DFS

---

### Connected Graph

通常會用 Adjacency List 或 Adjacency Matrix 當作表示圖的資料結構，兩者的解法一樣只差別在取鄰值，這邊用 Adjacency List Input 來實作：

```go
func BFS(graph map[int][]int) bool {
    if len(graph) == 0 {
        return true
    }

    visited := make(map[int]bool)

    // 取任意起點
    var start int
    for v := range graph {
        start = v
        break
    }

    queue := []int{start}
    visited[start] = true

    
    for len(queue) != 0 {
        node := queue[0]
        queue = queue[1:]

        // Adjacency List [x,x,x,x]
        for _, neighbor := range graph[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }

        // 如果是 Adjacency Matrix graph[node] = {0,0,0,1,1,0,0}, neighbor == index
        // for neighbor, connected := range graph[node] {
        //     if connected == 1 && !visited[neighbor] { // 略過 0 
        //         visited[neighbor] = true
        //         queue = append(queue, neighbor)
        //     }
        // }
    }

    // 所有節點都被拜訪到 → connected
    return len(visited) == len(graph)
}
```

```go
func DFS(graph map[int][]int) bool {

    if len(graph) == 0 {
        return true
    }

    visited := make(map[int]bool)

    // 取任意起點
    var start int
    for v := range graph {
        start = v
        break
    }

    // DFS iterative
    stack := []int{start}
    visited[start] = true

    for len(stack) != 0 {
        node := stack[len(stack)-1]        // 取頂端
        stack = stack[:len(stack)-1]       // pop

        for _, neighbor := range graph[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                stack = append(stack, neighbor)
            }
        }
    }

    return len(visited) == len(graph)
}
```

### Tree

```text
BFS(s)
 1. Discovered[s] = true; Discovered[v] = false for other v  // 初始化：起點標為已發現，其餘全部標為未發現
 2. i = 0; L[0] = (s); T = () // 第 0 層(Root)只放起點 s，T 是 BFS tree 的邊集合（初始為空）
 3. while (L[i] 不為空) do  // 只要這一層還有節點，就繼續處理
 4.   L[i+1] = () // 準備一個空的下一層 list
 5.   for each (node u in L[i]) do // 逐一取出這一層的每個節點 u
 6.     for each (edge (u, v) incident to u) do // 遍歷 u 的所有鄰居 v
 7.       if (Discovered[v] = false) then // 如果 v 還沒被發現過
 8.         Discovered[v] = true // 標記 v 為已發現，避免重複走
 9.         T = T + (u, v) // 把邊 (u→v) 加入 BFS tree
10.       L[i+1] = L[i+1] + (v) // 把 v 放進下一層（第 i+1 層）
11.   i++ // 移動到下一層繼續處理
```

每一層 L[i] 的節點可以用任何順序處理，可以把所有 layer list 合併成一條 queue 來管理。

```go
func BFSTree(graph map[int][]int, start int) (layers map[int]int, tree [][2]int) {
    discovered := make(map[int]bool)
    layers = make(map[int]int) // 記錄每個節點屬於哪一層
    tree = [][2]int{}          // BFS tree 的邊

    discovered[start] = true
    layers[start] = 0
    currentLayer := []int{start}
    i := 0

    for len(currentLayer) != 0 {
        nextLayer := []int{}
        for _, u := range currentLayer {
            for _, v := range graph[u] {
                if !discovered[v] {
                    discovered[v] = true
                    layers[v] = i + 1
                    tree = append(tree, [2]int{u, v})
                    nextLayer = append(nextLayer, v)
                }
            }
        }
        currentLayer = nextLayer
        i++
    }

    return layers, tree
}
```

```text
DFS(s)
 1. Discovered[s] = true; Discovered[v] = false for other v // 初始化：起點標為已發現，其餘全部標為未發現
 2. stack = (s); T = () // stack 放入起點 s，T 是 DFS tree 的邊集合（初始為空）
 3. while (stack 不為空) do // 只要 stack 還有節點，就繼續處理
 4.   u = stack // 頂端元素，並 pop 出來
 5.   for each (edge (u, v) incident to u) do   // 遍歷 u 的所有鄰居 v
 6.     if (Discovered[v] = false) then     // 如果 v 還沒被發現過
 7.       Discovered[v] = true      // 標記 v 為已發現，避免重複走
 8.       T = T + (u, v)    // 把邊 (u→v) 加入 DFS tree
 9.       stack = stack + (v)   // 把 v push 進 stack，下一輪優先往深處走
10. return T    // 回傳 DFS tree 的邊集合
```

```go
func DFSTree(graph map[int][]int, start int) (depth map[int]int, tree [][2]int) {
    discovered := make(map[int]bool)
    depth = make(map[int]int)
    tree = [][2]int{}

    discovered[start] = true
    depth[start] = 0

    // stack 存 node，同時記錄深度
    type frame struct {
        node   int
        d      int
    }
    stack := []frame{{start, 0}}

    for len(stack) != 0 {
        // pop
        top := stack[len(stack)-1]
        stack = stack[:len(stack)-1]

        for _, v := range graph[top.node] {
            if !discovered[v] {
                discovered[v] = true
                depth[v] = top.d + 1
                tree = append(tree, [2]int{top.node, v})
                stack = append(stack, frame{v, top.d + 1})
            }
        }
    }

    return depth, tree
}
```
