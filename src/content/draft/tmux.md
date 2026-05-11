---
title: "tmux "
date: "2026-03-29"
category: "software"
subCategory: "DevOps"
tags: ["tmux", "terminal", "macos", "config"]
slug: "tmux-config-mouse-split"
---

###### Mac M1 tmux 設定筆記

---

### 為什麼要設定 tmux config

tmux 預設的快捷鍵不夠直覺，分割視窗要用 `%` 和 `"`，也不支援滑鼠操作。透過 `~/.tmux.conf` 可以讓操作更接近一般終端機習慣。

---

### 建立設定檔

```bash
nano ~/.tmux.conf
```

---

### 設定內容

```bash
# 開啟滑鼠支援（點擊切換 pane、拖曳調整大小）
set -g mouse on

# 更直覺的分割快捷鍵（類似 | 和 - 的形狀）
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# 用 Alt + 方向鍵切換 pane（不需要先按 prefix）
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# 複製模式使用 vi 操作
setw -g mode-keys vi

# 在複製模式按 y 複製到系統剪貼簿
bind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "pbcopy"

# 重新載入設定檔的快捷鍵
bind r source-file ~/.tmux.conf \; display "Config reloaded!"
```

---

### 儲存並套用

在 nano 裡：

- `Ctrl + o` → Enter　← 儲存
- `Ctrl + x`　← 離開

套用設定（不需要重啟 tmux）：

```bash
tmux source-file ~/.tmux.conf
```

或在 tmux 裡按 `Ctrl+b` 然後 `r`（設定好快捷鍵之後）。

---

### 設定後的操作方式

| 操作 | 方式 |
|------|------|
| 左右分割（垂直） | `Ctrl+b` 然後 `\|` |
| 上下分割（水平） | `Ctrl+b` 然後 `-` |
| 切換 pane | 滑鼠點擊 或 `Alt + 方向鍵` |
| 調整 pane 大小 | 滑鼠拖曳邊框 |
| 重新載入設定 | `Ctrl+b` 然後 `r` |

> `#{pane_current_path}` 讓新分割的 pane 繼承目前目錄，不會跳回 home。

---

### 開啟滑鼠後的複製貼上

開啟 `set -g mouse on` 後，滑鼠事件被 tmux 攔截，無法直接用滑鼠選取複製。解法：

**方法 1：按住 Shift 繞過 tmux**

按住 `Shift` + 滑鼠拖曳選取文字，再用 `Cmd+C` 複製。

**方法 2：使用 tmux 複製模式 + pbcopy**

上面設定已加入 `copy-mode-vi` 和 `pbcopy` 整合：

1. `Ctrl+b` 然後 `[` → 進入複製模式
2. 用方向鍵移動、按 `Space` 開始選取、按 `y` 複製到系統剪貼簿
3. `Cmd+V` 即可貼上

| 操作 | 方式 |
|------|------|
| 進入複製模式 | `Ctrl+b` 然後 `[` |
| 開始選取 | `Space` |
| 複製到剪貼簿 | `y` |
| 貼上 | `Cmd+V` |
| 快速選取（繞過 tmux） | `Shift` + 滑鼠拖曳 → `Cmd+C` |