---
title: "Message Queue 03 - Setup"
date: "2026-03-14"
category: "software"
subCategory: "Backend"
tags: ["Queue", "Clusters", "RabbitMQ"]
slug: "message-queue-03"
---
###### 透過 RabbitMQ 學習 Message Queue

---

### Single Node

所有資源（Exchange、Queue、訊息）集中在單一節點，雖然可透過 durable/persistent 設定讓資料在重啟後恢復，但節點硬體故障時資料將永久消失，無法容許硬體上的錯誤。

### Cluster

首先每台機器都需要安裝 RabbitMQ，並確保所有節點共享相同的 Erlang Cookie（節點間認證用）。

#### 1. 確認 Erlang Cookie 一致

```bash
# 查看 Cookie
cat /var/lib/rabbitmq/.erlang.cookie

# 所有節點的 Cookie 必須相同
# 若不同，手動複製機器 A 的 Cookie 到 B、C
```

#### 2. 機器 A 作為主節點，保持運行

```bash
# 機器 A 正常啟動即可，作為叢集的第一個節點
rabbitmq-server -detached
```

#### 3. 機器 B、C 加入叢集

```bash
# 在機器 B 上執行
rabbitmqctl stop_app # 停止 RabbitMQ 應用程式（不是整個服務）
rabbitmqctl reset # 清除該節點原本的狀態，準備加入新叢集
rabbitmqctl join_cluster rabbit@machineA
rabbitmqctl start_app

# 在機器 C 上執行
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@machineA
rabbitmqctl start_app
```

#### 4. 確認叢集狀態

```bash
rabbitmqctl cluster_status
```

加入成功後，節點間的訊息路由由 RabbitMQ 內建處理，
Application 只需連線到任意節點即可，不需要額外設定。

### Cluster Node Types

Rabbit MQ 提供 3 種節點型態用於不同場景

#### Disk Node（磁碟節點）

    - 執行期狀態同時儲存於 RAM 與磁碟（Exchange、Queue、Binding 等結構）
    - 重啟後可自行從磁碟還原叢集結構，不依賴其他節點
    - 叢集中至少需要一個 Disk Node

#### RAM Node（記憶體節點）

    - 執行期狀態僅存於 RAM，不寫入磁碟
    - 重啟後結構清空，需重新加入叢集並從 Disk Node 取得結構
    - 適合結構變動頻繁的場景，一般情況 Disk Node 即可

> 注意：節點類型只影響「叢集結構」的儲存方式
> 訊息是否持久化由 durable / persistent 參數決定，與節點類型無關

若多個 Disk Node 對叢集狀態產生分歧，建議關閉整個叢集
先啟動狀態最正確的 Disk Node，再依序加入其他節點

#### Stats Node

    - 需啟用 rabbitmq-management plugin 才有此節點類型
    - 負責收集叢集中所有節點的統計與狀態資料
    - 整個叢集同時只能有一個 Stats Node，通常由主要 Disk Node 擔任

### Queue 類型

RabbitMQ 隨著分散式系統對需求的演進過程也發展出不同的 Queue 種類

### 1. Classic Queue

以下以 **1 Disk Node + 2 RAM Node** 的叢集為例說明。

#### durable: false + persistent: false（預設）

訊息與 Queue 結構僅存於 RAM，任一節點重啟，
該節點上的 Queue 與訊息永久消失。

適合日誌、即時通知等可丟失的場景，速度最快。

#### durable: true + persistent: true

- Queue 宣告在 Disk Node: 節點重啟後，結構與訊息皆可恢復，硬碟故障時資料永久消失
- Queue 宣告在 RAM Node: 訊息雖然寫入磁碟，但 Queue 結構本身重啟後消失，訊息也因此拿不到

> `persistent: true` 只保證訊息寫入磁碟
> `durable: true` 只有在 Disk Node 上才能完整保證 Queue 結構重啟後還在

#### 正確的規劃方式

    - 重要的 Queue → 連線到 Disk Node 宣告，搭配 durable: true + persistent: true
    - 可丟失的 Queue → 連線到 RAM Node 宣告，搭配 durable: false + persistent: false

RabbitMQ 不會自動幫你選節點，Queue 建立在哪個節點需要開發者自行規劃。訊息可以跨節點路由，但 Queue 的資料不會自動複製到其他節點。

---

### 2. Mirrored Queue

Classic Queue 的高可用方案，Queue 會有一個 Master 節點和多個 Mirror 節點。
Master 掛掉後 Mirror 自動升為新 Master。

但存在**腦裂（Split-brain）**問題：
網路短暫中斷時，Mirror 可能誤判 Master 已掛掉並自行升級，
網路恢復後出現兩個 Master，導致訊息不一致甚至丟失。

RabbitMQ 官方已不推薦使用，新系統應改用 Quorum Queue。

---

### 3. Quorum Queue

以 **Raft 共識演算法**為基礎的現代 Queue 類型，解決了 Classic Queue 和 Mirrored Queue 的根本問題。

- Queue 資料自動複製到多個節點，不需要開發者決定放哪個節點
- 少數節點故障時自動選出新的 Leader，不需要人工介入
- 透過 Raft 演算法保證資料一致性，從根本解決腦裂問題

```javascript
channel.assertQueue('my-queue', {
  durable: true,
  arguments: {
    'x-queue-type': 'quorum'
  }
})
```

RabbitMQ 官方現在建議優先使用 Quorum Queue 處理重要訊息，Classic Queue 僅適用於可丟失的場景。
