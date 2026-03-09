---
title: "Http Connect"
date: "2025-09-03"
category: "software"
subCategory: "Communications"
tags: ["Http", "tcp", "backend"]
slug: "http_connect"
---

###### 理解一下框架幫我實作了什麼事

---

### TCP 連線的運作機制

1. 伺服器開啟 Port 監聽：`net.Listen("tcp", ":4000")`
2. 等待客戶端連接：`conn, err := listener.Accept()`
3. 客戶端發送請求至 `server_ip:4000`時，OS 背後執行 TCP 三次握手
4. 資料傳送到 OS 緩衝區，程式定期從緩衝區讀取並處理

---

### Server 的核心特性

- **持續運行**：Long-running Process，不會處理完一個請求就結束
- **對外介面**：透過 Port 提供通訊入口
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
    
    buffer := make([]byte, 4096)
    n, err := conn.Read(buffer)
    if err != nil {
        fmt.Println("Read error:", err)
        return
    }
    
    request := string(buffer[:n])
    fmt.Println("Received request:")
    fmt.Println(request)

    // 解析 request 的 path，對應到相應的 handler
    // ...

    response := "HTTP/1.1 200 OK\r\n" +
                "Content-Type: text/html\r\n" +
                "Content-Length: 13\r\n" +
                "\r\n" +
                "Hello, World!"
    
    conn.Write([]byte(response))
}
```

---

### HTTP 解析

HTTP 本質上就是一段格式化的字串，解析時需要嚴格按照規範處理：

| 階段 | 動作 |
|-----|------|
| 請求行 | 提取 Method、Path、Version |
| 標頭 | 逐行讀取 `key: value`，遇空行停止 |
| 請求體 | 根據 `Content-Length` 讀取對應長度 |
```go
type HTTPRequest struct {
    Method  string
    Path    string
    Query   map[string]string
    Headers map[string]string
    Body    []byte
    Version string
}

func parseHTTPRequest(raw string) (*HTTPRequest, error) {
    lines := strings.Split(raw, "\r\n")
    
    // 1. 解析請求行：GET /users?id=123 HTTP/1.1
    requestLine := strings.Split(lines[0], " ")
    method := requestLine[0]
    fullPath := requestLine[1]
    version := requestLine[2]
    
    // 2. 分離路徑和查詢參數
    pathParts := strings.Split(fullPath, "?")
    path := pathParts[0]
    var query map[string]string
    if len(pathParts) > 1 {
        query = parseQuery(pathParts[1]) // name=john&age=25
    }
    
    // 3. 解析標頭
    headers := make(map[string]string)
    bodyStartIndex := 0
    for i := 1; i < len(lines); i++ {
        if lines[i] == "" {
            bodyStartIndex = i + 1
            break
        }
        header := strings.SplitN(lines[i], ": ", 2)
        headers[header[0]] = header[1]
    }
    
    // 4. 讀取 body（根據 Content-Length）
    var body []byte
    if cl, ok := headers["Content-Length"]; ok {
        length, _ := strconv.Atoi(cl)
        bodyContent := strings.Join(lines[bodyStartIndex:], "\r\n")
        body = []byte(bodyContent[:length])
    }
    
    return &HTTPRequest{
        Method:  method,
        Path:    path,
        Query:   query,
        Headers: headers,
        Body:    body,
        Version: version,
    }, nil
}
```