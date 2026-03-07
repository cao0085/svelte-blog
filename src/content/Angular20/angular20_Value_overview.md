---
title: "Value Control - Overview"
date: "2025-10-10"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "value"]
slug: "angular_value_overview"
---
###### 整理一下 Angular 管理值的方式整理範圍、同步特性和使用場景

---

### 概覽

| 方法 | 範圍 | 同步 | 雙向綁定 | 場景 |
| --- | --- | --- | --- | --- |
| 普通變數 | Component | ✓ | ✗ | 簡單狀態 |
| Signal | Component / Global | ✓ | ✓（需配合） | 響應式狀態 |
| RxJS Observable | Component / Global | ✗ | ✗ | 異步流、事件 |
| FormControl | Component | ✓ | ✓ | 表單欄位 |
| DI Service | Global | 任意 | 任意 | 跨元件共享 |

---

### Component 層級

**普通變數**

```ts
export class MyComponent {
  count = 0;
  increment() { this.count++; }
}
```

**Signal** ：細粒度響應式更新，Angular 20 推薦寫法

```ts
import { signal, computed } from '@angular/core';

export class MyComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);
  increment() { this.count.update(v => v + 1); }
}
```

```html
<p>{{ count() }} / {{ double() }}</p>
<button (click)="increment()">+1</button>
```

**RxJS Observable + async pipe** ：適合異步資料流，訂閱由 Angular 自動管理

```ts
import { BehaviorSubject } from 'rxjs';

export class MyComponent {
  private countSubject = new BehaviorSubject(0);
  count$ = this.countSubject.asObservable();
  increment() { this.countSubject.next(this.countSubject.value + 1); }
}
```

```html
<p>{{ count$ | async }}</p>
<button (click)="increment()">+1</button>
```

**FormControl** ：表單欄位雙向綁定，詳見 Reactive Forms

```ts
import { FormControl } from '@angular/forms';
name = new FormControl('');
```

---

### Global 層級（DI Service）

透過 `@Injectable({ providedIn: 'root' })` 建立全域 Singleton，任意 Component 注入後共享同一份狀態

Signal-based Service

```ts
@Injectable({ providedIn: 'root' })
export class CounterService {
  readonly count = signal(0);
  increment() { this.count.update(v => v + 1); }
}
```

RxJS-based Service

```ts
@Injectable({ providedIn: 'root' })
export class CounterService {
  private countSubject = new BehaviorSubject(0);
  count$ = this.countSubject.asObservable();
  increment() { this.countSubject.next(this.countSubject.value + 1); }
}
```

注入使用

```ts
export class MyComponent {
  counter = inject(CounterService);
}
```

---

### 選擇原則

- 單一元件同步狀態 → **Signal**
- 異步操作、串接 API → **RxJS Observable**
- 跨元件共享狀態 → **DI Service**（Service 內部再選 Signal 或 RxJS）
- 表單欄位 → **ReactiveFormsModule**
