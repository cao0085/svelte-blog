---
title: "Value Control - Component"
date: "2025-01-11"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "value"]
slug: "angular_component_communication"
---
###### 元件之間傳遞值的常見方式：Input / Output / ViewChild / DI

---

### Input（父 → 子）

舊版 `@Input()` 裝飾器

```ts
@Component({...})
export class CustomSlider {
  @Input() value = 0;
}
```

新版 Signal Input 回傳值是 Signal

```ts
import { input } from '@angular/core';

@Component({...})
export class CustomSlider {
  value = input(0); // Signal<number>
}
```

```html
<custom-slider [value]="50" />
```

---

### Output（子 → 父）

舊版 `@Output()` + `EventEmitter`

```ts
@Component({...})
export class CustomSlider {
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  onChange(newValue: number) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
```

新版 `output()`

```ts
import { input, output } from '@angular/core';

@Component({...})
export class CustomSlider {
  value = input(0);
  valueChange = output<number>();

  onChange(newValue: number) {
    this.valueChange.emit(newValue);
  }
}
```

```html
<!-- 分開綁定 -->
<custom-slider [value]="val" (valueChange)="val = $event" />
<!-- 雙向綁定 (banana-in-a-box) -->
<custom-slider [(value)]="val" />
```

---

### ViewChild / ViewChildren

在 class 中存取 template 上的元素或子元件實例，ViewChild 抓第一個，ViewChildren 抓全部符合的

舊版 `@ViewChild()`

```ts
@ViewChild('myDiv') divElement!: ElementRef;

ngAfterViewInit() {
  console.log(this.divElement.nativeElement);
}
```

```html
<div #myDiv>hello</div>
```

新版 `viewChild()`（Signal 版本）

```ts
import { viewChild, ElementRef, effect } from '@angular/core';

export class MyComponent {
  div = viewChild<ElementRef>('myDiv');

  constructor() {
    effect(() => {
      this.div()?.nativeElement.scrollIntoView();
    });
  }
}
```

可以這樣用

```ts
// viewChild.required() 表示元素必然存在
div = viewChild.required<ElementRef>('myDiv');

effect(() => {
  const el = this.div().nativeElement;
  el.style.border = '2px solid red'; // 用邏輯操作 CSS
});

// 取子元件實例
// <app-player #playerRef />
player = viewChild<PlayerComponent>('playerRef');

effect(() => {
  this.player()?.pause(); // 操作子元件方法
});
```

---

### Dependency Injection（跨元件）

`@Injectable({ providedIn: 'root' })` 讓 Service 成為 Singleton，任意 Component 注入後共享同一份狀態

```ts
// counter.service.ts
@Injectable({ providedIn: 'root' })
export class CounterService {
  readonly count = signal(0);
  increment() { this.count.update(v => v + 1); }
}
```

```ts
// component A
export class ComponentA {
  counter = inject(CounterService);
}

// component B
export class ComponentB {
  counter = inject(CounterService);
  // counter.count() 和 ComponentA 共享同一個值
}
```

---

### 選擇原則

- 父 → 子傳值 → `Input`
- 子 → 父回傳事件 → `Output`
- 父存取子元件實例或 DOM → `ViewChild`
- 跨元件共享狀態 → `DI Service`
