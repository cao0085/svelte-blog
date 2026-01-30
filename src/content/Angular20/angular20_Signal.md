---
title: "Signal"
date: "2025-11-12"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "route"]
slug: "angular_signal"
---
###### 認識新的 StateAPI - Signal 參考 [Angular20](https://v20.angular.dev/guide/signals)、[2025 AngularStateManagement](https://nx.dev/blog/angular-state-management-2025)

---

### Signals

Writable signals

宣告一個 WritableSignal<number> 初始值為 signal(a)

```ts
const count = signal(0);
console.log('The count is: ' + count());
count.set(3);
count.update(value => value + 1); // 當前值 ++
```

Computed signals

宣告一個 Signal<number> 初始值由 signal() * 2 計算得出
當 computed 被宣告時，會執行一次函數
  - 函數內呼叫 signal() 時，signal 會自動記錄 "computed 依賴"
當 signal 被更新(set)時，會通知所有依賴它的 computed
  - 標記那些 computed 的快取為無效
當讀取 computed() 時，檢查快取是否無效
  - 無效 → 重新執行函數計算新值
  - 有效 → 直接回傳快取值

```ts
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

```ts
// in class 
readonly showCount = signal(false);
readonly count = signal(0);
readonly conditionalCount = computed(() => {
  if (showCount()) {
    return `The count is ${count()}.`;
  } else {
    return 'Nothing to see here!';
  }
});
```

實務開發上 Angular20 都是寫 class component 和有提供 DI 注入(全域管理)，大多是 Class 內宣告 readonly 來完整保護屬性 ```readonly count = signal(0)```，外部需要修改值直接使用 ```count.set(3)``` 就可以了。

```ts
@Component({
  template: `
    <p>Hello, {{ name() }}</p>
    <button (click)="updateName()">Update</button>
  `,
})
export class MessageComponent {
  name = signal('World'); // 宣告同步變數
  constructor() {
    effect(() => { // 掛載監聽事件
      console.log('Name has changed: ', this.name());
    });
  }
  updateName() {
    this.name.set('Mike');
  }
}
// 2
export class AppStore {
  readonly state = signal([]);

  add(item) {
    this.state.update((oldState) => [...oldState, item]);
  }
  delete(item) {
    this.state.update((oldState) => oldState.filter((e) => e.id !== item.id));
  }
  update(item) {
    this.state.update((oldState) =>
      oldState.map((e) => (e.id === item.id ? item : e))
    );
  }
}
```

*** signal 、 computed 、 effect、 linkedSignal ***

順便提另外一種寫法就是限讀 ```private _options = signal<string[]>```，確認變數在外部只能讀取無法調用 signal API

```ts
// signal
@Component({...})
export class ShoppingCart {
  private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);
  private _selected = signal(this._options()[0]);
  
  options = this._options.asReadonly();
  selected = this._selected.asReadonly();

  // 用戶選擇
  select(index: number) {
    this._selected.set(this._options()[index]);
  }

  // 模擬：根據地區更新運送選項
  changeRegion(region: string) {
    if (region === '離島') {
      this._options.set(['船運', '空運']);
      // 此時 _selected 還會是 init 的值"標準運送"
      // 所以還需要更新 this._selected
      this._selected.set(this._options()[0]);
    }
  }
}

// computed (false)
@Component({...})
export class ShoppingCart {
  private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);
  
  // 可能會想這樣寫...
  private _selected = computed(() => this._options()[0]);

  options = this._options.asReadonly();
  selected = this._selected; // computed 本身就是 readonly

  select(index: number) {
    this._selected.set(this._options()[index]); 
    // 會編譯錯誤，computed 沒有 .set() 方法
  }

  changeRegion(region: string) {
    if (region === '離島') {
      this._options.set(['船運', '空運']);
      // _selected 會自動變成 '船運'，這部分沒問題
    }
  }
}

// computed
@Component({...})
export class ShoppingCart {
  private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);

  // 堅持用 computed 會變成
  private _#selected = signal(this._options()[0]);
  private _selected = computed(() => this._#selected());
  // 好處只有 _selected 變成 readonly

  options = this._options.asReadonly();
  selected = this._selected;

  select(index: number) {
    this._#selected.set(this._options()[index]); 
  }

  changeRegion(region: string) {
    if (region === '離島') {
      this._options.set(['船運', '空運']);
      this._#selected.set(this._options()[0]); // 重複第一種
    }
  }
}

// effect
@Component({...})
export class ShoppingCart {
  private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);
  private _selected = signal(this._options()[0]);
  
  options = this._options.asReadonly();
  selected = this._selected.asReadonly();

  constructor() {
    // 用 effect 監聽變化並重設，解決了手動 reset 問題
    effect(() => {
      const opts = this._options();
      this._selected.set(opts[0]);
    }, { allowSignalWrites: true }); // 需要加這個選項才能在 effect 內寫入 signal
  }

  // 用戶選擇
  select(index: number) {
    this._selected.set(this._options()[index]);
  }

  // 模擬：根據地區更新運送選項
  changeRegion(region: string) {
    if (region === '離島') {
      this._options.set(['船運', '空運']);
    }
  }
}

// linkedSignal
@Component({...})
export class ShoppingCart {
  private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);
  private _selected = linkedSignal(() => this._options()[0]); // 不用額外寫監聽、好維護

  options = this._options.asReadonly();
  selected = this._selected.asReadonly();

  select(index: number) {
    this._selected.set(this._options()[index]);
  }

  changeRegion(region: string) {
    if (region === '離島') {
      this._options.set(['船運', '空運']);
    }
  }
}
```

目前選單重置後都會預設第一個，再添加一個判斷"當前選項在新選單內就不變動"

```ts
// effect
@Component({...})
export class ShoppingCart {
  private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);
  private _selected = signal(this._options()[0]);

  options = this._options.asReadonly();
  selected = this._selected.asReadonly();

  constructor() {
    effect(() => {
      const opts = this._options();
      const current = this._selected();
      if (!opts.includes(current)) { // 如果當前選項還在新選單中，就保留；否則重置為首項
        this._selected.set(opts[0]);
      }
    }, { allowSignalWrites: true }); // 需要加這個選項才能在 effect 內寫入 signal
  }

  select(index: number) {
    this._selected.set(this._options()[index]);
  }

  changeRegion(region: string) {
    if (region === '離島') {
      this._options.set(['船運', '空運', '超商取貨']);
    }
  }
}

// linkedSignal
@Component({...})
export class ShoppingCart {
  private _options = signal<string[]>(['標準運送', '快速運送', '超商取貨']);
  
  // 有提供 API 方便處理
  private _selected = linkedSignal<string[], string>({
    source: this._options,
    computation: (newOptions, previous) => {
      if (previous && newOptions.includes(previous.value)) {
        return previous.value;
      }
      return newOptions[0];
    },
  });

  options = this._options.asReadonly();
  selected = this._selected.asReadonly();

  select(index: number) {
    this._selected.set(this._options()[index]);
  }

  changeRegion(region: string) {
    if (region === '離島') {
      this._options.set(['船運', '空運', '超商取貨']);
    }
  }
}
```

小結一下

- computed : 純粹的衍生狀態 (tax = priceSignal * 0.05)
- effect : 當作流程控制響應(副作用處理)，例如跳出彈窗或打 API 等
- linkedSignal: 可被寫入的 computed

*** signal state ***

ngrx 提供的API，主要在強型別和結構化上的規範

```ts
import { patchState, signalState } from '@ngrx/signals';
export class AppStore {
  readonly state = signalState<Store>({ items: [] });

  addToStore(item: StoreItem) {
    patchState(this.state, (oldState) => ({
      ...oldState,
      items: [...oldState.items, item],
    }));
  }
  removeFromStore(item: StoreItem) {
    patchState(this.state, (oldState) => ({
      ...oldState,
      items: oldState.items.filter((e) => e.id !== item.id),
    }));
  }
  updateStore(item: StoreItem) {
    patchState(this.state, (oldState) => ({
      ...oldState,
      items: oldState.items.map((e) =>
        e.id === item.id ? { ...item, name: 'bar' } : e
      ),
    }));
  }
}
```

*** signal Store *** 

```ts
// signalStore () 算是會自動 DI 
const AppStore = signalStore(
  withState<Store>({
    items: [],
  }),
  withMethods((state) => ({
    addToStore(item: StoreItem) {
      patchState(state, (oldState) => ({
        ...oldState,
        items: [...oldState.items, item],
      }));
    },
    removeFromStore(item: StoreItem) {
      patchState(state, (oldState) => ({
        ...oldState,
        items: oldState.items.filter((e) => e.id !== item.id),
      }));
    },
    updateStore(item: StoreItem) {
      patchState(state, (oldState) => ({
        ...oldState,
        items: oldState.items.map((e) =>
          e.id === item.id ? { ...item, name: 'bar' } : e
        ),
      }));
    },
  }))
);
```