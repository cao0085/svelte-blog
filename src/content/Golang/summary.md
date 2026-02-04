---
title: "Golang High Concurrency Summary"
date: "2026-02-04"
category: "software"
subCategory: "Golang"
tags: ["DDD", "backend", "go"]
slug: "go-high-concurrency-Summary"
---

###### [github repo](https://github.com/cao0085/go-ddd-high-concurrency)

---

實務上比較沒有處理高併發的需求，一直想看看流程是甚麼，紀錄一下實作

### 目標

- 超賣問題 — 100 件商品，1000 人搶購，如何保證不超賣？
- 高並發寫 — 多個 goroutine 同時扣庫存，如何避免死鎖和性能下降？
- 消息隊列 — 用 Kafka 解耦請求和處理，學習背壓控制
- 一致性 — 訂單、支付、庫存的數據一致性
- 監控 — 觀察 goroutine 數量、數據庫連接、吞吐量

### 架構選擇

- **Backend**: Go 1.24.0
- **Database**: PostgreSQL 17.2
- **Cache**: Redis 7.4.1
- **Message Queue**: Kafka 3.8.1 (KRaft mode)
- **Monitoring**: Prometheus 3.1.0 + Grafana 11.4.0