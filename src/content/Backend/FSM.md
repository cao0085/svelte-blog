---
title: "Finite-State Machine"
date: "2025-06-30"
category: "software"
subCategory: "Backend"
tags: ["FSM", "backend", "markdown"]
slug: "FSM"
---
###### FSM 這是一種類比電路常見的概念，用金流常見的狀態模擬看看。

---

### 核心概念

狀態是封閉集合其一：Pending / Paid / Failed / RefundPending / Refunded。

事件是唯一入口：只有明確的事件才能讓狀態改變。

```csharp
// 狀態（State）
Pending(0) → Paid(1) → RefundPending(4) → Refunded(5)
Failed(2)  // 失敗 / 終端狀態

// 事件（Trigger）
PaySucceeded, PayFailed, StartRefund, RefundSucceeded, RefundFailed
```

| CurrentState    | Trigger         | NextState     |
| --------------- | --------------- | ------------- |
| Pending         | PaySucceeded    | Paid          |
| Pending         | PayFailed       | Failed        |
| Paid            | StartRefund     | RefundPending |
| RefundPending   | RefundSucceeded | Refunded      |
| RefundPending   | RefundFailed    | Paid          |
| Failed/Refunded | *(無任何事件)*       | *(終點)*        |

### 簡易流程

```csharp

// 建立 FSM
var fsm = new PaymentStateMachine((PaymentState)order.State);

// 解析金流商回傳碼
PaymentTrigger? t = dto.ReturnCode switch {
    "0000" => PaySucceeded,
    "1165" => null,         // 不轉移，維持 Pending
     _     => PayFailed
};
if (t.HasValue) fsm.Fire(t.Value);

// 交易寫 DB 前
order.State            = (byte)fsm.CurrentState;
vendorPayment.PayState = (byte)fsm.CurrentState;

// 回應前端也看 fsm.CurrentState
switch (fsm.CurrentState)
{
    case PaymentState.Paid:     // 成功
    case PaymentState.Pending:  // 等待
    default:                    // 失敗
}
```

限制行為的方式

```csharp
if (!fsm.CanFire(trigger)) 
    throw new InvalidOperationException("非法動作");
fsm.Fire(trigger);
```

### 測試與擴充

單元測試每條轉移：「Pending → PaySucceeded → Paid」。

新增流程：只要在 enum + 轉移表多加一條，和對應 trigger 的處理；主程式 switch(fsm.CurrentState) 自動接手 DB 差異。