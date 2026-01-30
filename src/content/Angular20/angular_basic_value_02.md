---
title: "Angular Basic _ Value02"
date: "2025-06-22"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "value"]
slug: "angular_value_02"
---
###### 應用中維護值的一些關鍵字

---

### Component 層級的單向綁定( logic update -> dom rerender )

** 普通變數 + Change Detection :**  Angular 的 Zone.js 會自動觸發變更檢測

```ts
export class MyComponent {
  count = 0; // 普通變數
  
  increment() {
    this.count++; // Angular 自動觸發變更檢測
  }
}
```

``` html
<p>{{ count }}</p>
<button (click)="increment()">+1</button>
```

** Signals :** 響應式更新性能更好，需要新版 Angular 16+

```ts
import { signal } from '@angular/core';

export class MyComponent {
  count = signal(0); // 創建 Signal
  
  increment() {
    this.count.set(this.count() + 1); // 或 this.count.update(v => v + 1)
  }
}
```

```html
<p>{{ count() }}</p> <!-- 需要加 () 讀取值 -->
<button (click)="increment()">+1</button>
```

** RxJS Observable + async pipe:** 套件內有提供的一種監聽，概念是定義兩個變數值，一個可被調整的值 BehaviorSubject，另一個 Observable 限讀和 html 語法下 `{{ count$ | async }}`，值被更新時就會 rerender 了。

```ts
import { BehaviorSubject } from 'rxjs';

export class MyComponent {
  private countSubject = new BehaviorSubject(0);
  count$ = this.countSubject.asObservable();
  
  increment() {
    this.countSubject.next(this.countSubject.value + 1);
  }
}
```

```html
<p>{{ count$ | async }}</p>
<button (click)="increment()">+1</button>
```

### 響應式組件和雙向綁定

一樣是 Signals( 同步、自動追蹤依賴、更輕量 ) & RxJS Observables ( 異步、需手動訂閱 )

```ts
import { signal, computed, effect } from '@angular/core';

export class UserComponent {
  // 創建可寫信號
  count = signal(0);
  name = signal('John');
  
  // 派生狀態 - 自動追蹤依賴
  doubleCount = computed(() => this.count() * 2);
  greeting = computed(() => `Hello, ${this.name()}!`);
  
  // 副作用 - 當依賴變化時自動執行
  constructor() {
    effect(() => {
      console.log(`Count changed: ${this.count()}`);
      // 自動追蹤 count 的變化
    });
  }
  
  // 更新信號
  increment() {
    this.count.update(val => val + 1);
  }
  
  setName(newName: string) {
    this.name.set(newName);
  }
}
```

```ts
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';

// 基本 Observable
const data$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

// Subject: 可以主動發送值
const subject = new Subject<number>();
subject.next(1);
subject.subscribe(val => console.log(val));

// BehaviorSubject: 有初始值,新訂閱者會立即收到最新值
const behaviorSubject = new BehaviorSubject<number>(0);
behaviorSubject.subscribe(val => console.log(val)); // 立即輸出 0
```

還有提供表單模組 FormsModule & ReactiveFormsModule 可以配合 ngModel 使用，Service.ts 也用上述方式維護值和狀態

### APP Singleton


###### RxJS Observable 套件物件內建很多方法補充一下

- Subject: 沒有初始值、value，是用來即時發送事件通知

```ts
import { Subject } from 'rxjs';

private clickSubject = new Subject<void>();
click$ = this.clickSubject.asObservable();

onClick() {
  this.clickSubject.next(); // 推送事件
}
```

- BehaviorSubject: 可推送新值（next( )）、記住最新的值（value）、新訂閱者會立即收到當前值

```ts
import { BehaviorSubject } from 'rxjs';

private countSubject = new BehaviorSubject(0);
count$ = this.countSubject.asObservable();
```

- ReplaySubject: 記住 N 個歷史值、新訂閱者會收到過去的 N 個值

```ts
import { ReplaySubject } from 'rxjs';

private logSubject = new ReplaySubject<string>(3); // 記住最近 3 個值
log$ = this.logSubject.asObservable();

addLog(message: string) {
  this.logSubject.next(message);
}
```

- AsyncSubject:  只發送最後一個值、只關心最終結果的場景

```ts
import { AsyncSubject } from 'rxjs';

private resultSubject = new AsyncSubject<number>();
result$ = this.resultSubject.asObservable();

compute() {
  // 進行計算...
  this.resultSubject.next(10);
  this.resultSubject.next(20);
  this.resultSubject.next(30);
  this.resultSubject.complete(); // 完成時才發送
}
```

- Observable: Subject 轉成 asObservable 後就會有 subscribe、pipe、filter...等功能

```ts
data$.subscribe(value => {
  console.log('收到資料:', value);
});

data$.pipe(
  map(value => value * 2),      // 轉換資料
  filter(value => value > 10),  // 過濾資料
  debounceTime(300)             // 防抖
).subscribe(result => {
  console.log(result);
});
```
