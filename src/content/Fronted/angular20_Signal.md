---
title: "Angular20 Signal"
date: "2025-12-12"
category: "software"
subCategory: "Frontend"
tags: ["fronted", "angular", "route"]
slug: "angular_signal"
---
###### 認識新的 StateAPI - Signal 參考 [Angular20](https://v20.angular.dev/guide/signals)、[2025 AngularStateManagement](https://nx.dev/blog/angular-state-management-2025)

---

### Signals

basic

```ts
// basic
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);

// 1
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

情境 - 根據地區(本島、外島)來控制可運送選項

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