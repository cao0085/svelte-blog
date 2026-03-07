---
title: "Value Control - Signal"
date: "2025-10-13"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "signal"]
slug: "angular_signal_v2"
---
###### Signal 是 Angular 20 推薦的響應式狀態管理 API，參考 [Angular Signals](https://v20.angular.dev/guide/signals)

---

### 核心 API

**signal** ：建立可寫的響應式狀態

```ts
const count = signal(0);

count();              // 讀值
count.set(3);         // 設定新值
count.update(v => v + 1); // 基於舊值更新
```

**computed** ：唯讀的衍生狀態，自動追蹤依賴，依賴變動才重新計算

```ts
const count = signal(0);
const doubleCount = computed(() => count() * 2);

count.set(5);
console.log(doubleCount()); // 10
```

**effect** ：當依賴變動時自動執行副作用（打 API、操作 DOM、log 等）

```ts
effect(() => {
  console.log('count changed:', count());
});
```

---

### 在 Component 中使用

Class 內通常宣告 `readonly` 保護屬性，外部透過 `.set()` / `.update()` 修改

```ts
@Component({
  template: `
    <p>{{ name() }}</p>
    <button (click)="updateName()">Update</button>
  `,
})
export class MessageComponent {
  readonly name = signal('World');

  constructor() {
    effect(() => {
      console.log('Name changed:', this.name());
    });
  }

  updateName() {
    this.name.set('Mike');
  }
}
```

---

### signal / computed / effect / linkedSignal

以購物車的「運送方式」選單說明四者的差異

**signal** ：直接維護兩個 signal，切換選單時手動 reset

```ts
private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);
private _selected = signal(this._options()[0]);

select(index: number) {
  this._selected.set(this._options()[index]);
}

changeRegion(region: string) {
  if (region === '離島') {
    this._options.set(['船運', '空運']);
    this._selected.set(this._options()[0]); // 手動 reset
  }
}
```

**effect** ：監聽 `_options` 變動，自動 reset `_selected`

```ts
constructor() {
  effect(() => {
    const opts = this._options();
    const current = untracked(() => this._selected());
    if (!opts.includes(current)) {
      this._selected.set(opts[0]);
    }
  }, { allowSignalWrites: true });
}
```

**linkedSignal** ：`computed` 的可寫版本，來源變動時自動重新計算初始值

```ts
private _selected = linkedSignal(() => this._options()[0]);
// _options 更新 → _selected 自動 reset 為新選單第一項
// 也可以手動 this._selected.set(...)
```

進階寫法，保留當前選項在新選單中就不 reset

```ts
private _selected = linkedSignal<string[], string>({
  source: this._options,
  computation: (newOptions, previous) => {
    if (previous && newOptions.includes(previous.value)) {
      return previous.value;
    }
    return newOptions[0];
  },
});
```

小結

- `computed` ：純衍生狀態，無法寫入（沒有 `.set()`）
- `effect` ：流程控制，適合有條件的副作用
- `linkedSignal` ：可被寫入的 computed，依賴變動時重置為計算值

---

### untracked()

讀取 signal 值但不想建立響應式依賴時使用

```ts
import { signal, effect, untracked } from '@angular/core';

const count = signal(1);
const multiplier = signal(2);

effect(() => {
  // count 是依賴，multiplier 不是
  const result = count() * untracked(() => multiplier());
  console.log(result);
});
```

---

### 在 DI Service 中使用

Signal-based Service 適合取代 RxJS BehaviorSubject 管理同步狀態

```ts
@Injectable({ providedIn: 'root' })
export class AppStore {
  readonly items = signal<Item[]>([]);

  add(item: Item) {
    this.items.update(list => [...list, item]);
  }

  remove(item: Item) {
    this.items.update(list => list.filter(e => e.id !== item.id));
  }

  update(item: Item) {
    this.items.update(list => list.map(e => e.id === item.id ? item : e));
  }
}
```

---

### ngrx/signals（可選）

提供強型別和結構化規範，適合大型應用

`signalState` ：結構化的 signal 物件

```ts
import { patchState, signalState } from '@ngrx/signals';

export class AppStore {
  readonly state = signalState<Store>({ items: [] });

  add(item: StoreItem) {
    patchState(this.state, old => ({ items: [...old.items, item] }));
  }
}
```

`signalStore` ：自帶 DI 注入，完整封裝狀態和方法

```ts
const AppStore = signalStore(
  withState<Store>({ items: [] }),
  withMethods((state) => ({
    add(item: StoreItem) {
      patchState(state, old => ({ items: [...old.items, item] }));
    },
  }))
);
```
