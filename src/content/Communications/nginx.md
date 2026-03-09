---
title: "Nginx"
date: "2025-11-27"
category: "software"
subCategory: "Communications"
tags: ["http", "nginx"]
slug: "nginx"
---
###### 用 Nginx + Docker 建立本地反向代理，方便非技術人員測試和預覽
---

### 使用場景

- 本地開發時，讓非技術人員透過區網 IP 預覽網站
- 模擬正式環境的反向代理結構
- 解決前後端分離開發時的 CORS 問題

---

### 環境配置步驟

1. 本地啟動要被代理的 Server（假設跑在 `localhost:4041`）
2. 編寫 `nginx.conf` 設定反向代理
3. 用 Docker 跑 Nginx container
4. 測試 `localhost` 是否連到 Nginx 預設頁面
5. 測試區網內其他裝置能否連線（用 `ipconfig` 查 IPv4 位址）
6. 測試反向代理是否正確轉發

``` dockerfile
# Use the specific Ubuntu 22.04 image
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y nginx
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker stop my-proxy
docker rm my-proxy
docker build -t my-nginx-proxy .
docker run -d -p 80:80 --name my-proxy my-nginx-proxy
```

---

### nginx.conf

假設後端 Server 跑在本機的 port 4041：

```conf
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name localhost;

        # 1. 預設路徑：顯示 Nginx 歡迎頁面 (確認 Nginx 有在運作)
        location / {
            root /var/www/html;
            index index.html;
            try_files $uri $uri/ =404;
        }

        # 2. 反向代理：將 /services/tsg/ 的請求轉發到你本機的 4041 port
        location /services/tsg/ {
            # host.docker.internal 是 Docker for Windows 專用的 DNS
            proxy_pass http://host.docker.internal:4041/services/tsg/;
            
            # 設定一些 header 讓後端 server 知道請求的來源
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

上面是基礎轉發功能，nginx 本身也可以 subdomain 配置，可以用來解決 cors 的問題等。其餘可進階的配置等有需求再來做看看

- SPA (單頁應用) 路由設定
- 靜態資源快取 (Browser Caching)
- Gzip 壓縮
- 限制存取 (Access Control)
- SSL/TLS (https)
