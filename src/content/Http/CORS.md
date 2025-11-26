---
title: "CORS & SOP"
date: "2025-10-27"
category: "software"
subCategory: "Internet"
tags: ["http", "SOP", "CORS"]
slug: "cors"
---
常常看到 CORS 今天才知道有 SOP
---

瀏覽器原生就有一個預設的安全機制叫做 `Same-Origin Policy (SOP)`，它只允許網頁接收來自相同來源（Same Origin）的資料。

這個限制在實務上會造成一些不便：如果前後端分別部署在不同的 Server 上，前端就無法直接向後端發送請求取得資料。傳統的解決方式是讓後端先接收外部資料，再轉發給前端。

為了突破這個限制，讓跨來源的資料交換更方便，`CORS（Cross-Origin Resource Sharing）` 機制因此誕生。

### Same-Origin Policy

主要用來防範 **跨站請求偽造（CSRF）** 等攻擊。由於瀏覽器發送請求時會自動帶上當前網站的 Origin，且 JavaScript 無法隨意偽造這個值，因此 SOP 可以有效防止惡意網站冒用使用者身份。

假設你登入了銀行網站 A，此時瀏覽器會儲存 A 網站的 Cookie（包含登入憑證）。如果沒有 SOP 保護，當你訪問惡意網站 B 時，B 網站的 JavaScript 就能向 A 銀行發送請求，並自動帶上你的登入 Cookie，進而盜取資料或進行轉帳。有了 SOP，瀏覽器會阻擋 B 網站讀取來自 A 網站的回應資料。

```md
    B 網站的 JS 發起請求到 A Server
            ↓
    瀏覽器檢查:
    「B 的 origin」 vs 「A 的 origin」
            ↓
        是否同源?
    (Yes)      (No)
    直接發送    進入 CORS 流程
    正常讀取
```

### Cross-Origin Resource Sharing

當進入 CORS 流程時，瀏覽器會先檢查該請求是簡單請求還是預檢請求。

為什麼要分兩種請求？主要是為了保護舊的後端伺服器。簡單請求通常只是讀取資料，比較安全，可以直接送出。但如果是可能修改資料的請求（如 PUT、DELETE）或帶有自訂 Header，就需要先用預檢確認後端有支援 CORS，避免對不支援的舊伺服器造成意外影響。

**簡單請求 (Simple Request)**

符合以下條件的請求會被視為簡單請求：
- HTTP Method 為 `GET`、`HEAD` 或 `POST`
- Content-Type 只能是 `application/x-www-form-urlencoded`、`multipart/form-data` 或 `text/plain`
- 沒有自訂的 Header

簡單請求會直接送出，伺服器透過回應 Header 告知瀏覽器是否允許該跨來源請求。

**預檢請求 (Preflight Request)**

不符合簡單請求條件的請求，瀏覽器會先發送一個 `OPTIONS` 方法的預檢請求，詢問伺服器是否允許實際請求。只有當預檢通過後，才會發送真正的請求。

```md
    瀏覽器發送 OPTIONS 請求
            ↓
    伺服器檢查並回應 CORS Headers
            ↓
        預檢是否通過?
    (Yes)         (No)
    發送實際請求    阻擋請求
    取得回應      顯示 CORS 錯誤
```

**常見的 CORS Headers**

伺服器端需要設定的主要 Headers：

- `Access-Control-Allow-Origin`: 指定允許的來源，可設為特定網域或 `*`（所有來源）
- `Access-Control-Allow-Methods`: 允許的 HTTP 方法，如 `GET, POST, PUT, DELETE`
- `Access-Control-Allow-Headers`: 允許的自訂 Headers
- `Access-Control-Allow-Credentials`: 是否允許攜帶憑證（如 Cookie）
- `Access-Control-Max-Age`: 預檢請求的快取時間（秒）

**範例設定**

```javascript
// Node.js Express 範例
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
```

分兩種請求主要是保護舊的後端伺服器。簡單請求通常只是讀取資料，可以直接送出。但如果是可能修改資料的請求（如 PUT、DELETE）或帶有自訂 Header，就需要先用預檢確認後端有支援 CORS，避免對不支援的舊伺服器造成意外影響。

**實際測試 CORS**

架好後端後，用瀏覽器打開任意網站（例如 `https://policy.medium.com/medium-terms-of-service-9db0094a1e0f`），開啟開發者工具的主控台執行：

```js
fetch('http://127.0.0.1:8080/api', {})
  .then(r => r.json())
  .then(d => console.log(d))
```

此時前端會看到 CORS 錯誤，但如果觀察後端 Log，會發現請求有成功並回應，只是瀏覽器阻擋了回應。

回到瀏覽器切換到「網路」面板，找到這個請求，查看「要求標頭」中的 `Origin` 欄位（例如 `https://policy.medium.com`）這就是瀏覽器自動帶上的來源網域。回到後端程式碼，加上允許的來源並重啟：

```golang
w.Header().Set("Access-Control-Allow-Origin", "https://policy.medium.com") // 允許特定網域
w.Header().Set("Access-Control-Allow-Origin", "*") // 允許所有來源
```

重新執行 fetch，就可以成功取得資料了。


**完整程式碼**

```golang
// golang
package main 

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("=== HTTP 伺服器 (允許 CORS) ===")
	fmt.Println()
	fmt.Println("✓ 伺服器已啟動")
	fmt.Println("├─ 監聽地址: http://127.0.0.1:8080")
	fmt.Println("├─ CORS: 已啟用 ✓")
	fmt.Println("└─ 在瀏覽器打開這個網址，然後在 Console 執行 fetch")
	fmt.Println()

	// 定義路由 - 主頁
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("=== 收到瀏覽器請求 ===")
		fmt.Println("請求方法:", r.Method)
		fmt.Println("請求路徑:", r.URL.Path)
		fmt.Println("客戶端地址:", r.RemoteAddr)
		fmt.Println()

		response := `
<!DOCTYPE html>
<html>
<head>
    <title>TCP Server Response</title>
</head>
<body>
    <div class="container">
        <h1>🎉 連接成功！</h1>
        <p class="success">✓ Server received your message!</p>
        
        <div class="info">
            <h3>你現在可以做什麼:</h3>
            <ul>
                <li>按 F12 打開開發者工具</li>
                <li>打開 Network 面板</li>
                <li>點擊下面的按鈕發送 API 請求</li>
                <li>在 Network 面板看到請求</li>
                <li>在 Console 看到回應</li>
            </ul>
        </div>

        <button onclick="testAPI()">🔗 發送 API 請求</button>
        <div id="result"></div>
    </div>

    <script>
        function testAPI() {
            document.getElementById("result").textContent = "正在發送請求...";
            
            fetch('http://127.0.0.1:8080/api', {
                method: 'GET',
                headers: {
                    'X-Custom-Token': 'my-secret-123',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log("回應狀態:", response.status);
                console.log("回應 Headers:", response.headers);
                return response.json();
            })
            .then(data => {
                console.log("回應數據:", data);
                document.getElementById("result").textContent = 
                    "✓ 成功！\n\n回應:\n" + JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error("❌ 失敗:", error);
                document.getElementById("result").textContent = 
                    "❌ 失敗: " + error.message;
            });
        }
    </script>
</body>
</html>
		`
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, response)
	})

	// 【重要】添加 CORS 中間件
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// 【設置 CORS Headers】
			w.Header().Set("Access-Control-Allow-Origin", "隨意添加你想測試的網址")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Custom-Token, Authorization")

			// 處理 OPTIONS 預檢請求
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	// API 端點
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("=== 收到 API 請求 ===")
		fmt.Println("方法:", r.Method)
		fmt.Println("路徑:", r.URL.Path)
		fmt.Println("Header 'X-Custom-Token':", r.Header.Get("X-Custom-Token"))
		fmt.Println()

		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(http.StatusOK)

		response := `{
  "message": "Hello from Server!",
  "status": "success",
  "timestamp": "2025-10-28T08:00:00Z",
  "receivedHeader": "` + r.Header.Get("X-Custom-Token") + `"
}`
		fmt.Fprint(w, response)
	})

	fmt.Println("伺服器正在監聽 :8080")
	fmt.Println("打開瀏覽器: http://127.0.0.1:8080")
	fmt.Println()

	// 【使用 CORS 中間件】
	http.ListenAndServe(":8080", corsMiddleware(http.DefaultServeMux))
}
```