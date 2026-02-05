---
title: "DDD Architecture"
date: "2026-02-04"
category: "software"
subCategory: "Golang"
tags: ["DDD", "backend", "go"]
slug: "go_ddd"
---

###### DDD 複雜的是定義規則，模型出來後就是想辦法呵護直到寫入資料庫

---

DDD 全名是 Domain Driven Design，實作前先分享我對這個概念的理解和是怎麼延伸出領域物件。

### Error Data

當系統儲存了錯誤資料，事後修正的成本遠高於寫入前就擋下。如果能保證從使用者輸入到儲存的過程中完全不會出錯，那直接把資料丟進 Excel 就夠了，也不用透過系統去處理了。

實際情況當然是不可能，所以會透過各種手段降低錯誤資料儲存的機率：

- ```UI Input Rule```: 讓使用者在輸入時就即時發現錯誤
- ```Strongly Typed Language```: 在編譯期防止開發人員犯錯
- ```DB Column Type```: 在儲存層防止不合法的資料寫入

但這些只能防止部份的錯誤（型別錯、欄位空值等），無法防止業務上的錯誤，所以還會需要添加一些規範。

```go
type Stock struct {
    Quantity int32
}

// A. 預購系統
db.update(Stock.Quantity - order)

// B. 零售系統
if Stock.Quantity - order < 0 {
    return // 超賣
}
db.update(Stock.Quantity - order)
```

如果依照上面寫，我們未來有牽涉到 Update Stock 前就要去檢查，而這就是 DDD 想要解決的問題。

### Domain Object

把業務規則定義在模型上，任何地方要修改資料都必須經過模型驗證，不合法就拋錯，從源頭保證資料的一致性。

```go
// 預購系統 Domain Model
type PreOrderStock struct {
    quantity int32
}

func (s *PreOrderStock) Deduct(order int32) {
    s.quantity -= order // 允許負數，代表預購量
}
```

```go
// 零售系統 Domain Model
type RetailStock struct {
    quantity int32
}

func (s *RetailStock) Deduct(order int32) error {
    if s.quantity - order < 0 {
        return errors.New("insufficient stock")
    }
    s.quantity -= order
    return nil
}
```

DDD 中提出 Aggregate 和 Value Object 這兩個模型概念，來去防止非預期資料寫入，拿用手機來舉例:

- Aggregate: 每一台手機拆開都會有一組 Serial Num 具有唯一識別性（ID）。即使兩台手機型號、顏色完全相同，Serial Num 不同就是不同的手機。

- Value Object: 手機的螢幕尺寸、顏色、電池容量這些屬性沒有自己的 ID，純粹由值來定義。

總結來說 Aggregate 就是由複數個定義好的欄位與 Value Object 組成，並透過業務規則盡可能保護這些值的正確性。但實務上 Value Object 和普通欄位的界線會有點模糊，例如「顏色」最終就是用 string 欄位儲存？或是需要特別抽象成 `type Color` 用列舉驗證？等等

<!-- 
專案主題是訂單搶購，以 ```Product``` 和 ```Order``` 這兩個 Aggregate 為中心出發

#### Product

很直覺的商品欄位該有要有

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

接下來就是思考這些欄位該有甚麼限制，id sku 唯一? price stock 不可為負數，status 當下可不可以

訂單進來```update Product set Stock = (stock -= order)```，這樣會有的問題:

1. 訂單實際上會有未/付款，時間內仍未付款庫存難回朔
2. 無法區分「可售庫存」和「實際庫存」

所以可以引入 Value Object 概念把 ```Stock``` 改成

```go
    type Stock struct {
        available int32
        reserved  int32
    }
``` -->
