---
title: "Redis"
date: "2026-02-06"
category: "software"
subCategory: "Golang"
tags: ["DDD", "backend", "go"]
slug: "go_redis"
---

###### 用 Redis 的原子性去處理資料寫入前的檢查

---

Redis 全名是 Remote Dictionary Server，特性是讀寫速度極快和保證原子性，但容量小，基本上先視作進階版 Cache 來使用

### 基本指令

<!-- docker exec -it flashsale-redis redis-cli -->
```bash
# 查看所有 keys
KEYS *

# 查看 Redis 信息
INFO

# 查看記憶體使用情況
INFO memory

# 查看連接的客戶端
CLIENT LIST

# 監控實時命令
MONITOR

# 退出
exit
```

```bash
# 查看實時日誌
docker logs -f flashsale-redis

# 查看最近 100 行日誌
docker logs --tail 100 flashsale-redis

# 不進入容器，直接執行命令
docker exec flashsale-redis redis-cli INFO stats
docker exec flashsale-redis redis-cli DBSIZE
docker exec flashsale-redis redis-cli KEYS "*"
```

### 同步策略

- TTL (Time To Live)

    固定時間更新一次資料 ```SET key value EX 300```

- Write-Through

    資料須更新時，同時更新 DB 和 Redis，例如訂單庫存

- Cache-Aside

    讀：先查 Redis，沒有再查 DB 並回寫 Redis

    寫：先更新 DB，再刪除 Redis（下次讀取時重建）

- Event-Driven

    被動觸發
