---
title: "Nginx"
date: "2025-11-27"
category: "software"
subCategory: "Internet"
tags: ["http", "nginx"]
slug: "nginx"
---
###### 公司內部開發的時候用看看Nginx，就不用搬筆電跑來跑去
---




可以這樣配置測試環境

1. 本地先 run 一個要被訪問的 Server
2. 配置 nginx.conf，因為 nginx Server 是部屬在 docker，所以要使用 host.docker.internal
3. docker run 一個 nginx container
4. 先測看看 localhost 不帶後贅是否可以連到預設的 nginx page
5. 再看不同裝置區網內連線可不可以(--ipConfig IPv4 位址)，能否連接到上述預設 page
6. 再測試反向代理是否轉發正確


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

nginx.conf (假設 Server 部署在 local4041 )
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

上面大概就是基礎的轉發功能，剩下的就是看專案當初的環境配置了，nginx 本身也可以 subdomain 配置，可以用來解決 cors 的問題。

其餘可進階的配置

- SPA (單頁應用) 路由設定
- 靜態資源快取 (Browser Caching)
- Gzip 壓縮
- 限制存取 (Access Control)
- SSL/TLS (https)
