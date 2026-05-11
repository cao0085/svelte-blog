---
title: "新設備 SSH 環境建立 & CI/CD 排錯：git pull 靜默失敗"
date: "2026-03-30"
category: "software"
subCategory: "DevOps"
tags: ["ssh", "github", "gcp", "github-actions", "ci-cd", "nginx"]
slug: "new-device-ssh-setup-cicd-debug"
---

###### 新 VM 環境設定 & CI/CD 排錯筆記

---

### 問題背景

新開一台 VM，需要：
1. 設定 GitHub SSH 認證（push/pull private repo）
2. 設定連線到 GCP 部署 VM
3. 排查 GitHub Actions 顯示成功，但網站實際沒有更新的問題

---

### 一、新 VM 設定 GitHub SSH

```bash
# 設定 git 基本資訊
git config --global user.name "cao0085"
git config --global user.email "cao0085@users.noreply.github.com"

# 產生 SSH key
ssh-keygen -t ed25519 -C "cao0085@users.noreply.github.com" -f ~/.ssh/id_ed25519 -N ""

# 加入 GitHub known_hosts（避免第一次連線要手動確認）
ssh-keyscan github.com >> ~/.ssh/known_hosts

# 顯示公鑰，複製後加到 GitHub Settings → SSH and GPG keys
cat ~/.ssh/id_ed25519.pub

# 測試
ssh -T git@github.com
```

之後 clone private repo 用 SSH 格式：

```bash
git clone git@github.com:cao0085/repo-name.git
```

---

### 二、設定連線 GCP VM

在新 VM 上產生一組專用 key，加到 GCP VM 的 `authorized_keys`。

```bash
# 在新 VM 上產生 key
ssh-keygen -t ed25519 -C "gcp_vm" -f ~/.ssh/gcp_vmvm_key -N ""

# 顯示公鑰
cat ~/.ssh/gcp_vmvm_key.pub
```

在 GCP VM 上加入公鑰：

```bash
# GCP VM 上執行（需要 sudo 因為 home_mac_m1 目錄權限問題）
sudo mkdir -p /home/home_mac_m1/.ssh
echo "公鑰內容" | sudo tee /home/home_mac_m1/.ssh/authorized_keys
sudo chmod 700 /home/home_mac_m1/.ssh
sudo chmod 600 /home/home_mac_m1/.ssh/authorized_keys
sudo chown -R home_mac_m1:home_mac_m1 /home/home_mac_m1/.ssh
```

設定 SSH config 簡化連線指令：

```bash
# ~/.ssh/config
Host gcp_vmvm
    HostName 35.212.188.123
    User home_mac_m1
    IdentityFile ~/.ssh/gcp_vmvm_key
```

之後直接 `ssh gcp_vmvm` 即可。

---

### 三、CI/CD 排錯：Actions 顯示成功但網站沒更新

**症狀**：GitHub Actions 每次跑都是綠色，但 GCP VM 上的網站內容沒有變化。

**排查過程**：

```bash
# 在 GCP VM 上檢查 git 狀態
cd /var/www/yoshikage-blog && git log --oneline -5
# 結果：只有一個 init commit，origin/main 也停在這裡
```

**根本原因：兩個問題疊加**

1. **GCP VM 沒有 GitHub SSH 認證**

   `git pull origin main` 在 VM 上失敗（permission denied），但 deploy.yml 沒有 `set -e`，後面的 `npm ci` 和 `npm run build` 繼續跑舊程式碼，整個 Action 顯示成功。

2. **deploy.yml 缺少 `set -e`**

   任何指令失敗後腳本應該要立刻中止，否則失敗會被吞掉。

**修法一：設定 GCP VM 的 GitHub SSH**

VM 上已有 deploy key（`github_actions_yoshikage_blog`），但缺少 SSH config：

```bash
# 在 GCP VM 上加入
echo "Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_actions_yoshikage_blog" >> ~/.ssh/config

# 測試
ssh -T git@github.com
# Hi cao0085/yoshikage-blog! You've successfully authenticated...
```

**修法二：deploy.yml 加上 `set -e`**

```yaml
script: |
  set -e
  cd /var/www/yoshikage-blog
  git pull origin main
  npm ci
  npm run build
```

`set -e` 讓任何指令失敗時整個 script 立刻中止，Actions 才會正確標紅。

---

### 四、更新 GitHub Secrets（VM_SSH_KEY）

舊的 `VM_SSH_KEY` secret 對應的是舊設備的私鑰，需要更新為新 VM 的 key。

用 GitHub CLI 直接從檔案讀取，避免手動貼上時格式跑掉：

```bash
# 安裝 gh CLI
apt install gh -y

# 登入（需要 Classic PAT，勾選 repo + read:org 權限）
echo "your_token" | gh auth login --with-token

# 更新 secret
gh secret set VM_SSH_KEY --repo cao0085/yoshikage-blog < ~/.ssh/gcp_vmvm_key
```

---

### 常見陷阱整理

| 問題 | 症狀 | 解法 |
|------|------|------|
| deploy.yml 沒有 `set -e` | 中間指令失敗但 Action 顯示綠色 | 第一行加 `set -e` |
| VM 沒有 GitHub SSH 認證 | `git pull` 靜默失敗 | 設定 `~/.ssh/config` 指向 deploy key |
| SSH 連線 permission denied | Actions SSH 進不去 VM | 更新 `VM_SSH_KEY` secret |
| `flea0085` 沒有 sudo 權限 | `sudo: command not found` | 改用有權限的帳號操作 |
| 多個 VM 使用者 | 資料不共用 | 確認連線的 username 是否一致 |
