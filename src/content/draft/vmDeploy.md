---
title: "GCP E2 Micro & CI/CD"
date: "2026-03-28"
category: "software"
subCategory: "DevOps"
tags: ["gcp", "nginx", "github-actions", "cloudflare", "sveltekit", "ci-cd"]
slug: "gcp-e2-micro-static-deploy"
---

###### GCP E2 Micro 部署記錄一下

---

### 整體架構

```
git push (main)
  → GitHub Actions 觸發
  → SSH 進 GCP VM
  → git pull + npm ci + npm run build
  → nginx serve build/
  → Cloudflare Proxy
  → blog.yoshikagehub.com (HTTPS)
```

build 失敗時 Actions 標紅，舊的 `build/` 不會被覆蓋，網站不會掛掉。

---

### 一、VM 初始設定

```bash
# nginx
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx

# Node.js 20（Ubuntu 預設版本太舊，要先加 source）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 建立專案目錄
sudo mkdir /var/www/yoshikage-blog
```

---

### 二、SSH Key 設定

GitHub Actions 要 SSH 進 VM 執行部署指令，需要產生一組專用 key。

```bash
# 在 VM 上產生
ssh-keygen -t ed25519 -C "github-actions-yoshikage-blog" \
  -f ~/.ssh/github_actions_yoshikage_blog -N ""

# 加入 authorized_keys（讓這組 key 有權限 SSH 進來）
cat ~/.ssh/github_actions_yoshikage_blog.pub >> ~/.ssh/authorized_keys

# 複製私鑰內容，等一下貼到 GitHub Secrets
cat ~/.ssh/github_actions_yoshikage_blog
```

**GitHub Secrets 設定**

GitHub repo → Settings → Secrets and variables → Actions

| 名稱 | 內容 |
|------|------|
| `VM_SSH_KEY` | 私鑰內容（從 `-----BEGIN` 到 `-----END` 整段） |
| `VM_HOST` | VM 的 External IP |
| `VM_USER` | VM 的使用者名稱 |

---

### 三、Private Repo Clone 設定

Repo 是 private，VM clone 需要另外設定 Deploy Key（比 PAT 好，不會過期）。

```bash
# 取得公鑰
cat ~/.ssh/github_actions_yoshikage_blog.pub
```

**GitHub Deploy Key 設定**

GitHub repo → Settings → Deploy keys → Add deploy key
- Title：`vm-yoshikage-blog`
- Key：貼上公鑰
- Allow write access：不勾（只需要 read）

```bash
# Clone（指定用哪組 SSH key）
sudo git clone git@github.com:cao0085/yoshikage-blog.git /var/www/yoshikage-blog \
  --config core.sshCommand="ssh -i /home/${USER}/.ssh/github_actions_yoshikage_blog"

# 修正目錄 owner（sudo clone 的 owner 是 root，npm 會沒權限）
sudo chown -R ${USER}:${USER} /var/www/yoshikage-blog

# 讓 git 信任這個目錄
git config --global --add safe.directory /var/www/yoshikage-blog
```

---

### 四、GitHub Actions Workflow

`.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VM
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USER }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            cd /var/www/yoshikage-blog
            git pull origin main
            npm ci
            npm run build
```

四行指令依序執行，任何一行失敗後面就不跑，`build/` 不會被新內容覆蓋。

---

### 五、Nginx 設定

SvelteKit adapter-static 輸出的是 `article.html`，但瀏覽器打的是 `/article`，需要 `$uri.html` 才能對應到。

```bash
sudo nano /etc/nginx/sites-enabled/default
```

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name blog.yoshikagehub.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    server_name blog.yoshikagehub.com;

    ssl_certificate /etc/ssl/cloudflare/cert.pem;
    ssl_certificate_key /etc/ssl/cloudflare/key.pem;

    root /var/www/yoshikage-blog/build;
    index index.html index.htm;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

### 六、Cloudflare HTTPS 設定

Cloudflare Proxy（橘色雲）預設用 **HTTPS** 連 origin server。VM 只有開 port 80 → Error 521。解法是建立 Cloudflare Origin Certificate，讓 VM 也能接受 443。

**建立 Origin Certificate**

Cloudflare Dashboard → SSL/TLS → Origin Server → Create Certificate

離開頁面後 Private Key 就看不到，建立時要馬上複製存好。

```bash
sudo mkdir -p /etc/ssl/cloudflare
sudo nano /etc/ssl/cloudflare/cert.pem   # 貼上 Certificate
sudo nano /etc/ssl/cloudflare/key.pem    # 貼上 Private Key
sudo chmod 600 /etc/ssl/cloudflare/key.pem
```

**SSL 模式**

SSL/TLS → Overview → 設為 **Full**

**DNS 設定**

| Type | Name | Content | Proxy status |
|------|------|---------|--------------|
| A | blog | VM External IP | Proxied（橘色）|

---

### 目錄結構

```
/var/www/
├── html/                      # nginx 預設目錄，保留不動
└── yoshikage-blog/
    ├── .git/
    ├── .github/workflows/
    ├── src/
    ├── static/
    ├── package.json
    ├── svelte.config.js
    └── build/                 # nginx 實際 serve 的位置
        ├── article.html
        ├── resume.html
        ├── skills.html
        └── _app/
```

---

### SSL 模式比較

| 模式 | Cloudflare ↔ VM | 需要憑證 | 安全性 |
|------|----------------|----------|--------|
| Flexible | HTTP | 不需要 | 低（VM 到 CF 明文） |
| Full | HTTPS | 自簽憑證即可 | 中 |
| Full (strict) | HTTPS | 有效憑證 | 高 |

> 個人 blog 用 **Full** 搭配 Origin Certificate 即可。有登入或金流的網站建議 **Full (strict)**。

---

### 常用指令

```bash
# nginx 狀態
sudo systemctl status nginx

# 重啟
sudo systemctl restart nginx

# 查看錯誤
sudo tail /var/log/nginx/error.log

# 確認 port 監聽
sudo ss -tlnp | grep nginx
```