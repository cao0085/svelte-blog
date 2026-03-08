---
title: "Domain-Driven 03 - Domain Object Design"
date: "2026-02-13"
category: "software"
subCategory: "Backend"
tags: ["DDD", "backend", "design", "csharp"]
slug: "ddd_03"
---

###### Aggregate Root 與 Domain Event 是 Domain 層的兩個核心支柱

---

## Aggregate Root Base Class

所有 Aggregate Root 繼承同一個基礎類別，負責收集在業務操作中產生的 Domain Event。

```csharp
public abstract class AggregateRoot
{
    private readonly List<IDomainEvent> _domainEvents = new();
    public IReadOnlyList<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected void RaiseDomainEvent(IDomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}

public interface IDomainEvent : INotification { }
```

所有狀態修改都必須透過方法進行，欄位設為 `private set` 或完全 `private`，讓外部無法繞過驗證邏輯直接賦值。

```csharp
public class Order : AggregateRoot
{
    public Guid Id { get; private set; }
    public OrderStatus Status { get; private set; }
    public Money TotalAmount { get; private set; }

    private readonly List<OrderItem> _items = new();
    public IReadOnlyList<OrderItem> Items => _items.AsReadOnly();

    private Order() { } // EF Core 需要無參數建構子

    // 用 static factory 取代 public constructor，確保建立時一定 Raise 事件
    public static Order Create(Guid customerId, Currency currency)
    {
        var order = new Order
        {
            Id = Guid.NewGuid(),
            Status = OrderStatus.Draft,
            TotalAmount = Money.Zero(currency)
        };
        order.RaiseDomainEvent(new OrderCreatedDomainEvent(order.Id, customerId));
        return order;
    }

    public void AddItem(ProductId productId, int quantity, Money unitPrice)
    {
        if (Status != OrderStatus.Draft)
            throw new DomainException("只有 Draft 狀態的訂單可以新增商品");

        var item = new OrderItem(productId, quantity, unitPrice);
        _items.Add(item);
        TotalAmount = TotalAmount.Add(item.SubTotal);
    }

    public void Submit()
    {
        if (!_items.Any())
            throw new DomainException("訂單不能為空");

        Status = OrderStatus.Submitted;
        RaiseDomainEvent(new OrderSubmittedDomainEvent(Id, TotalAmount));
    }
}
```

---

## Entity vs Value Object

| | Entity | Value Object |
|---|---|---|
| 識別性 | 有 ID | 無 ID |
| 可變性 | 可變（透過方法） | 不可變（Immutable） |
| 相等性 | 比較 ID | 比較所有屬性值 |
| 例子 | Order、OrderItem | Money、Address、Email |

`OrderItem` 是 Entity（需要追蹤每一筆），`Money` 是 Value Object（`$100 TWD` 不需要獨立 ID，兩個 `$100 TWD` 就是相等）。

```csharp
// Entity：有 ID，有生命週期
public class OrderItem
{
    public Guid Id { get; private set; }
    public ProductId ProductId { get; private set; }
    public int Quantity { get; private set; }
    public Money UnitPrice { get; private set; }
    public Money SubTotal => UnitPrice.Multiply(Quantity);

    public OrderItem(ProductId productId, int quantity, Money unitPrice)
    {
        if (quantity <= 0) throw new DomainException("數量必須大於 0");
        Id = Guid.NewGuid();
        ProductId = productId;
        Quantity = quantity;
        UnitPrice = unitPrice;
    }
}

// Value Object Base：相等性由值決定
public abstract class ValueObject
{
    protected abstract IEnumerable<object> GetEqualityComponents();

    public override bool Equals(object? obj)
    {
        if (obj is not ValueObject other) return false;
        return GetEqualityComponents().SequenceEqual(other.GetEqualityComponents());
    }

    public override int GetHashCode()
        => GetEqualityComponents().Aggregate(0, HashCode.Combine);
}

// Value Object：無 ID，不可變
public class Money : ValueObject
{
    public decimal Amount { get; }
    public Currency Currency { get; }

    public Money(decimal amount, Currency currency)
    {
        if (amount < 0) throw new DomainException("金額不能為負數");
        Amount = amount;
        Currency = currency;
    }

    public static Money Zero(Currency currency) => new(0, currency);

    public Money Add(Money other)
    {
        if (Currency != other.Currency) throw new DomainException("不同幣別不能相加");
        return new Money(Amount + other.Amount, Currency);
    }

    public Money Multiply(int factor) => new(Amount * factor, Currency);

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Amount;
        yield return Currency;
    }
}
```

---

## Domain Event

Domain Event 代表「領域中發生了一件值得記錄的事」，例如訂單建立、訂單提交。

**設計原則：**
- Aggregate 負責 **Raise**（收集事件，不立即發送）
- Application Layer 的 Handler 負責**處理後續**（發 Email、更新統計等）
- Domain 層完全不知道後續行為，保持單向依賴

### Event 定義

```csharp
// Domain 層定義（只有資料，沒有行為）
public record OrderCreatedDomainEvent(Guid OrderId, Guid CustomerId) : IDomainEvent;
public record OrderSubmittedDomainEvent(Guid OrderId, Money TotalAmount) : IDomainEvent;
```

### 發布時機：SaveChanges 後統一發送

Domain Event 不在 Raise 的當下立即發出，而是等 `SaveChangesAsync()` 存檔成功後才統一發送，避免「資料還沒寫入就觸發後續流程」。

```csharp
// Infrastructure - DbContext override
public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
{
    // 1. 收集所有待發布事件
    var aggregates = ChangeTracker.Entries<AggregateRoot>()
        .Where(e => e.Entity.DomainEvents.Any())
        .Select(e => e.Entity)
        .ToList();

    // 2. 先存檔
    var result = await base.SaveChangesAsync(ct);

    // 3. 存檔成功後再發事件
    foreach (var aggregate in aggregates)
    {
        foreach (var domainEvent in aggregate.DomainEvents)
            await _mediator.Publish(domainEvent, ct);

        aggregate.ClearDomainEvents();
    }

    return result;
}
```

### Handler

```csharp
// Application 層
public class OrderSubmittedHandler : INotificationHandler<OrderSubmittedDomainEvent>
{
    private readonly IEmailService _emailService;

    public OrderSubmittedHandler(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public async Task Handle(OrderSubmittedDomainEvent evt, CancellationToken ct)
    {
        await _emailService.SendOrderConfirmationAsync(evt.OrderId, evt.TotalAmount);
    }
}
```

---

## Aggregate 邊界設計

設計 Aggregate 邊界是 DDD 中最難的判斷，核心原則：

**Aggregate 內：強一致性（Strong Consistency）**
同一個交易中，Aggregate 內的所有資料必須保持一致。

**Aggregate 間：最終一致性（Eventual Consistency）**
跨 Aggregate 的操作透過 Domain Event 達成，允許短暫不一致。

```
// ❌ 錯誤：Order 直接包含完整 Customer 物件（兩個 Aggregate 耦合）
Order {
    Customer customer    // 整個 Customer Aggregate
    OrderItem[] items
}

// ✅ 正確：只存 CustomerId，需要資料時由 Application Layer 另外載入
Order {
    Guid customerId      // 只存 ID 引用
    OrderItem[] items
}
```

**判斷 checklist：**
- 這個資料修改是否需要在同一筆 Transaction 完成？ → 放同一個 Aggregate
- 跨兩個 Aggregate 的操作是否可以接受短暫不一致？ → 用 Domain Event
- Aggregate 是否越來越大、難以測試？ → 重新拆分邊界
