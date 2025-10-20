---
title: "Angular Value Control"
date: "2025-06-22"
category: "software"
subCategory: "Frontend"
tags: ["fronted", "angular", "value"]
slug: "angular_value"
---
###### 應用中傳遞值的方法

---

[官方文件](https://angular.dev/guide/components/inputs#declaring-inputs-with-the-input-decorator)

### Input

舊版寫法 `@Input()`

有提供一些屬性操作，可參考文件

```ts
@Component({...})
export class CustomSlider {
  // = 0 為初始值, 若有傳遞進來就取代
  @Input() defineValue = 0;
}
```

新版寫法 `import { input } from '@angular/core'`

```ts
import { input } from '@angular/core';

@Component({...})
export class CustomSlider {
  defineValue = input(0); // 這就是 signal 版本的 Input
}
```

```html
<div>

<custom-slider [defineValue]="50" />
```

### Output

都須維護兩個值

<br>

舊版寫法 `@Output()`

```js
@Component({...})
export class CustomSlider {
  @Input() defineValue = 0;
  @Output() defineValueChange = new EventEmitter<number>();

  onValueChange(newValue: number) {
    this.defineValue = newValue;
    this.defineValueChange.emit(newValue);
  }
}
```

新版寫法`import { input, output } from '@angular/core'`

```js
import { input, output } from '@angular/core';

@Component({...})
export class CustomSlider {
  defineValue = input(0);
  defineValueChange = output<number>();
  
  onValueChange(newValue: number) {
    this.defineValue.set(newValue);
    this.defineValueChange.emit(newValue);
  }
}
```

```html
<custom-slider
  [defineValue]="sliderValue"
  (defineValueChange)="sliderValue = $event"
/>
<custom-slider [(defineValue)]="50" />
```

### ViewChild & ViewChildren

ViewChild(抓第一個) & ViewChildren(抓符合條件) 是 Angular 中的一種在元件 class 中存取 template 上某個/種類元素或元件實例的方法。

舊版 @ViewChild()

```js
@ViewChild('myDiv') divElement!: ElementRef;

ngAfterViewInit() {
  console.log(this.divElement.nativeElement);
}
```

```html
<div #myDiv>hello</div>
```

新版 viewChild()

```js
import { Component, effect, viewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  template: `<div #myDiv>Hello</div>`
})

export class MyComponent {
  div = viewChild('myDiv');

  constructor() {
    effect(() => {
      console.log('div:', this.div()?.nativeElement); // signal.value 可改寫為函式形式
    });
  }
}
```

可以這樣用

```js
// div = viewChild.required('myDiv', { read: ElementRef });
effect(() => {
  const el = this.div().nativeElement;
  el.scrollIntoView();
  el.style.border = '2px solid red'; // 用邏輯操作 CSS
});

// <app-player #playerRef />
effect(() => {
  this.playerRef().pause(); // 操作<DOM>方法
});

```

### Dependency Injection

```ts
// hero.service.ts
// @Injectabl語法會編譯期自動註冊進global
@Injectable({
  providedIn: 'root' // angular rule => hardcode 
})
export class HeroService {
  private heroes: string[] = ['IronMan', 'Thor', 'Hulk'];

  getHeroes(): string[] {
    return this.heroes;
  }

  addHero(hero: string) {
    this.heroes.push(hero);
  }

  removeHero(hero: string) {
    this.heroes = this.heroes.filter(h => h !== hero);
  }
}
```

```ts
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `<div *ngFor="let h of heroes">{{ h }}</div>`
})
export class HeroComponent {
  heroes: string[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes = this.heroService.getHeroes();
  }

  add() {
    this.heroService.addHero('Captain Marvel');
    this.heroes = this.heroService.getHeroes();
  }
}
```

### Signals

```js
import { signal } from '@angular/core';

const firstName = signal('Morgan');

// 讀值（注意！不是 firstName.value，而是呼叫它）
console.log(firstName());  // 'Morgan'

// 設定新值
firstName.set('Jaime');

// 基於舊值更新
firstName.update(name => name.toUpperCase());
```

```ts
const firstName = signal('Morgan');
const firstNameCapitalized = computed(() => firstName().toUpperCase());// 唯獨變數，類似 Vue 自動追蹤

console.log(firstNameCapitalized()); // 'MORGAN'

firstName.set('Jaime');
console.log(firstNameCapitalized()); // 'JAIME'（自動反應）
```

常見用法

```ts
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'hello',
  standalone: true,
  template: `
    <p>Hello, {{ name() }}!</p>
    <button (click)="setName('Morgan')">Change</button>
    <p>Upper: {{ nameUpper() }}</p>
  `
})
export class HelloComponent {
  name = signal('Jaime');

  nameUpper = computed(() => this.name().toUpperCase());

  setName(newName: string) {
    this.name.set(newName);
  }
}
```

### untracked()

讀取 signal 值，但不想讓它變成 reactive 依賴時，就用 untracked()

原本

```js
const count = signal(1);

const message = computed(() => {
  console.log('Computing message...');
  return `Count is ${count()}`;
});
```

有時只需初始化時取值就好，所以不須自動追蹤。有需要再寫一個 function 取值

```js
import { signal, effect, untracked } from '@angular/core';

// 1. 建立 signal 狀態
export const count = signal(1);

// 2. 初始化時 log，一次就好
const logCountEffect = effect(() => {
  const initialValue = untracked(() => count());
  console.log(`[Init] count = ${initialValue}`);
});

// 3. 提供一個隨時手動讀取但不追蹤的方法
export function readCountWithoutTracking(): number {
  return untracked(() => count());
}

// 4. 例：更新 count 值（可在任意地方呼叫）
export function incrementCount() {
  count.update(c => c + 1);
}
```

條件符合再反應一次

```js
const a = signal(1);
const b = signal(2);

// 錯誤：這樣 b() 會被加入依賴
const result = computed(() => {
  if (a() > 0) return b(); // 即使沒執行，也可能被追蹤
  return 0;
});

// 正確：不讓 b() 成為依賴
const result = computed(() => {
  if (a() > 0) return untracked(() => b());
  return 0;
});
```