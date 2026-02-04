---
title: "DDD Architecture"
date: "2026-02-04"
category: "software"
subCategory: "Golang"
tags: ["DDD", "backend", "go"]
slug: "go_ddd"
---

###### DDD 複雜的是定義邊界，模型出來後就是想辦法呵護他直到寫入資料庫

---

### Domain Layer

主題是訂單搶購，主領域就 ```Product 、 Order``` ，就以這兩個為中心出發

#### Product

很直覺的欄位該有要有

```go
    // Aggregate Object
    type Product struct {
        id          int64
        sku         string
        name        string
        price       int16
        stock       int16
        description string
        status      int8
        createdAt   time.Time
        updatedAt   time.Time
    }
```

訂單進來```update Product set Stock = (stock -= order)```，這樣會有的問題:

1. 訂單實際上會有未/付款，時間內仍未付款庫存難回朔
2. 無法區分「可售庫存」和「實際庫存」

所以可以引入 Value Object 概念把 ```Stock``` 改成

```go
    type Stock struct {
        available int32
        reserved  int32
    }