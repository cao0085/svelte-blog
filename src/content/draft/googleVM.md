---
title: "GCP SSHFS"
date: "2026-03-27"
category: "software"
subCategory: "DevOps"
tags: ["gcp", "sshfs", "macos", "ssh"]
slug: "gcp-vm-sshfs-mount"
---

###### Mac mini ↔ GCP VM 共用資料夾

---

### 為什麼用 SSHFS

已經有 SSH 連線進 VM，SSHFS 就是直接把 SSH 當傳輸層，把 VM 的目錄掛成本機資料夾，不需要額外設定任何服務或開 port，家用路由器也不需要動。

```text
Mac mini ──── SSH 連出 ──→ GCP VM (port 22)
```

---

### SSH 金鑰設定

#### 1. 本機產鑰匙

```bash
ssh-keygen -t ed25519 -f ~/.ssh/gcp_vmvm_key -C "gcp-vm"
```

會產生兩個檔案：
- `~/.ssh/gcp_vmvm_key`　← 私鑰，留在本機
- `~/.ssh/gcp_vmvm_key.pub`　← 公鑰，放到 VM

#### 2. 公鑰放到 VM

```bash
cat ~/.ssh/gcp_vmvm_key.pub
```

複製輸出內容，貼到 VM 的：

```bash
mkdir -p ~/.ssh
echo "<貼上公鑰內容>" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

#### 3. 測試連線

```bash
ssh -i ~/.ssh/gcp_vmvm_key <user>@<vm-ip>
```

---

### 安裝（本機 Mac）

#### 1. macFUSE

```bash
brew install --cask macfuse
```

> 裝完後去 **系統設定 → 隱私權與安全性** 捲到最下面，點「允許」系統軟體，然後重開機。

#### 2. sshfs-mac

```bash
brew install gromgit/fuse/sshfs-mac
```

---

### 掛載

#### 建立本機掛載點

```bash
mkdir -p ~/gcp_vmvm_shared
```

#### 掛載指令

```bash
sshfs <user>@<vm-ip>:/home/<user>/shared ~/gcp_vmvm_shared -o IdentityFile=~/.ssh/<key> -o volname=GCP_VM
```

實際範例：

```bash
sshfs home_mac_m1@35.212.188.123:/home/home_mac_m1/shared ~/gcp_vmvm_shared -o IdentityFile=~/.ssh/gcp_vmvm_key -o volname=GCP_VM
```

`volname` 是 Finder 側邊欄顯示的名稱，掛載後會出現在「遠端卷宗」而不是使用者目錄，這是正常的。

---

### 卸載

```bash
cd ~
umount ~/gcp_vmvm_shared
```

要先離開掛載目錄再卸載，不然會吃到 `Resource busy`。