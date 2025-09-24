---
title: "Http Connect"
date: "2025-09-03"
category: "software"
subCategory: "Http"
tags: ["Http", "tcp", "backend"]
slug: "http_connect"
---

### TCP 連線的運作機制

1. 伺服器主機主動開啟 Port ```net.Listen("tcp", ":4000")```

2. 同時 ```conn, err := listener.Accept() ``` 等待連接

3. 客戶端發送請求 ```server_ip:4000``` OS 背後做 TCP 三次握手驗證

4. 資料會傳送到 ```OS緩衝區```，程式則會定期去緩衝區讀取資料處理

### Server 的核心特性

- 持續運行（Long-running Process）
- 對外提供通訊介面

```go
package main

import (
    "net"
    "fmt"
)

func main() {

    listener, err := net.Listen("tcp", ":8080")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer listener.Close()
    
    fmt.Println("Server listening on :8080")
    
    for {
        conn, err := listener.Accept()
        if err != nil {
            fmt.Println("Accept error:", err)
            continue
        }
        handleConnection(conn)
    }
}

func handleConnection(conn net.Conn) {
    defer conn.Close()
    
    // 創建緩衝區讀取資料
    buffer := make([]byte, 4096)
    n, err := conn.Read(buffer)
    if err != nil {
        fmt.Println("Read error:", err)
        return
    }
    
    // 將接收到的資料轉為字串
    request := string(buffer[:n])
    fmt.Println("Received request:")
    fmt.Println(request)

	// 解析 request 裡面的 path 去拿對應的 Method 

	// 定義 Response
    response := "HTTP/1.1 200 OK\r\n" +
                "Content-Type: text/html\r\n" +
                "Content-Length: 13\r\n" +
                "\r\n" +
                "Hello, World!"
    
    // 發送回應
    conn.Write([]byte(response))
}
```

HTTP 本身是個字串，會需要嚴格的解析流程，可以導入狀態機的概念去處理如:

- 解析請求行 → 提取方法、路徑、版本
- 解析標頭   → 逐行讀取 key: value
- 解析請求體 → 根據 Content-Length 讀取

```go
type HTTPRequest struct {
    Method  string              // "GET", "POST"
    Path    string              // "/users/123"
    Query   map[string]string   // {"id": "123", "name": "john"}
    Headers map[string]string   // {"Host": "localhost", ...}
    Body    []byte              // 請求體內容
    Version string              // "HTTP/1.1"
}

// 概念化的解析器
func parseHTTPRequest(raw string) (*HTTPRequest, error) {
    lines := strings.Split(raw, "\r\n")
    
    // 1. 解析請求行
    requestLine := strings.Split(lines[0], " ")
    method := requestLine[0]
    fullPath := requestLine[1] 
    version := requestLine[2]
    
    // 2. 分離路徑和查詢參數
    pathParts := strings.Split(fullPath, "?")
    path := pathParts[0]
    query := parseQuery(pathParts[1]) // ?name=john&age=25
    
    // 3. 解析標頭
    headers := make(map[string]string)
    for i := 1; i < len(lines); i++ {
        if lines[i] == "" { break } // 遇到空行停止
        header := strings.SplitN(lines[i], ": ", 2)
        headers[header[0]] = header[1]
    }
    
    // 4. 根據 Content-Length 讀取 body
    // ...
    
    return &HTTPRequest{...}, nil
}
```