---
title: "Metrics Monitoring 01 - Prometheus"
date: "2026-03-17"
category: "software"
subCategory: "Monitoring"
tags: ["monitoring", "prometheus", "tsdb", "alerting"]
slug: "prometheus-core"
---
###### 監控應用層主要由 Communications、Scraper、TSDB、Rule Engine 組成，透過 Prometheus 學習 Metrics Monitoring

---

Prometheus 是用 Go 編譯的單一 binary（可執行檔），不需要額外的 runtime（JVM、Node.js 等）

```md
<!-- IN CONTAINER -->
┌─────────────────────────────────┐
│  Docker Container               │
│  ┌───────────────────────────┐  │
│  │  Prometheus Server (Go)   │  │
│  │                           │  │
│  │  - HTTP Server (:9090)    │  │
│  │  - Scraper (抓取器)       │  │
│  │  - TSDB (時序資料庫)       │  │
│  │  - Rule Engine (規則引擎)  │  │
│  └───────────────────────────┘  │
│                                 │
│  Volume: /prometheus (存資料)    │
│  Config: /etc/prometheus/       │
└────────────┬────────────────────┘
             │ port 9090
             ▼
        瀏覽器 / Grafana / API
```

---

### HTTP Server

Prometheus 溝通全部走 HTTP，唯一的變化是 Remote Write / Remote Read（送資料到遠端儲存時），body 格式從純文字變成 Protobuf（二進位編碼，更省空間），但傳輸協定仍然是 HTTP。

```MD
| 場景                          | 方式              |
|-------------------------------|-------------------|
| Prometheus 抓 metrics         | GET /metrics      |
| 瀏覽器看 Web UI               | HTTP :9090        |
| Grafana 查資料                | HTTP API          |
| 程式透過 API 查詢              | HTTP API          |
| 遠端儲存（Thanos / Cortex）    | HTTP + Protobuf   |

# 直接用 curl 就能看到 metrics（純文字）
curl http://localhost:9090/metrics

# 直接用 curl 就能查詢資料
curl http://localhost:9090/api/v1/query?query=up
```

---

### Scraper

Prometheus 採主動拉取（pull）metrics，不是被監控的服務推（push）過來：

```md
Prometheus              Target（被監控的服務）
    │                        │
    │  GET /metrics          │
    │───────────────────────>│
    │                        │
    │  回傳純文字 metrics      │
    │<───────────────────────│
    │                        │
  存進 TSDB
```

被監控的服務怎麼提供 `/metrics`？

- 應用程式暴露

```bash
GET http://your-app:8080/metrics
──────────────────────────────
http_requests_total{method="GET", path="/api/users"} 1027
http_requests_total{method="POST", path="/api/users"} 53
app_memory_usage_bytes 125829120
```

- 用 Exporter 當中間人

```md
Prometheus ──GET /metrics──> Node Exporter  ──讀系統資訊──> Linux OS
Prometheus ──GET /metrics──> MySQL Exporter ──SQL 查詢──>  MySQL
Prometheus ──GET /metrics──> Redis Exporter ──連線取資料──> Redis
```

但是不管哪種方式 Prometheus 看到的永遠是一個 HTTP endpoint。差別只是這個 endpoint 是 app 自己開的，還是中間放一個 exporter 幫忙翻譯。

---

### Time Series Database

Prometheus 內建 TSDB 針對時序資料優化（append-only、自動壓縮、自動過期）

```md
| 特性     | 一般 DB          | TSDB                              |
|----------|------------------|-----------------------------------|
| 寫入模式  | 隨機讀寫          | 只追加（append-only）               |
| 資料量   | 看業務            | 極大，每 15 秒一筆 × 上千個指標       |
| 查詢方式  | WHERE id = 1     | WHERE 時間區間（最近 1 小時）        |
| 舊資料   | 通常要保留         | 可自動過期刪除（預設 15 天）          |
```

磁碟結構

- 資料每 N 小時壓縮成一個 block
- 用 WAL 確保 crash 不丟資料
- 預設保留 N 天，超過自動刪除

```md
/prometheus/data/
├── 01HXXXXXX/          ← Block（2 小時一個區塊）
│   ├── chunks/         ← 壓縮過的時序資料
│   ├── index           ← 索引（快速查找用）
│   └── meta.json       ← 這個 block 的時間範圍
├── 01HYYYYYY/
│   ├── chunks/
│   ├── index
│   └── meta.json
└── wal/                ← Write-Ahead Log（防止 crash 丟資料）
```

---

### Rule Engine

#### Recording Rules

把複雜查詢的結果提前算好，存成新指標，避免每次查詢都即時運算：

```yaml
groups:
  - name: cpu_rules
    rules:
      - record: job:cpu_usage:avg_5m           # 新指標名稱
        expr: avg(rate(cpu_usage_seconds_total[5m]))  # 計算公式
```

Prometheus 每 15 秒自動算一次，查詢時直接讀 `job:cpu_usage:avg_5m`，不用再從原始資料計算。

#### Alerting Rules

設定條件，持續符合就觸發告警：

```yaml
groups:
  - name: alerts
    rules:
      - alert: HighCpuUsage
        expr: cpu_usage > 90          # 條件
        for: 5m                       # 持續 5 分鐘才觸發
        labels:
          severity: critical
        annotations:
          summary: "CPU 過高！"
```

```md
Rule Engine 每 15 秒檢查
        │
        ▼
  cpu_usage > 90？
        │
    YES │  持續 5 分鐘了？
        │       │
        │   YES ▼
        │   發送到 Alertmanager
        │       │
        │       ▼
        │   Alertmanager 決定怎麼通知
        │   ├── Slack
        │   ├── Email
        │   └── PagerDuty
        │
    NO  ▼
    什麼都不做
```

*Prometheus 本身不發通知，它只負責判斷條件。實際發 Slack、Email 是另一個獨立元件 Alertmanager*