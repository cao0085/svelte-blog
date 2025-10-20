---
title: "Angular Basic"
date: "2025-06-22"
category: "software"
subCategory: "Frontend"
tags: ["fronted", "angular", "layout"]
slug: "angular_basic"
---
###### 參考這個[專案範本](https://github.com/mbejda/AngularFire-Starter-Template) 、[練習Repository](https://github.com/cao0085/angular-18)、官方文件學習

---


```shell
ng generate component hello-world

src/app/hello-world/
├── hello-world.component.ts
├── hello-world.component.html
├── hello-world.component.css
└── hello-world.component.spec.ts
```


### .component.ts

Component是Angular核心，負責收集要渲染的資料和掛載到指定節點，邏輯函式也是寫在這一層。

```ts
import { Component } from "@angular/core";

    @Component({
    selector: "app-item", // 目標的根節點,類似選擇器
    standalone: true, // 是否為獨立組件
    imports: [],
    templateUrl: "./item.component.html", // 要 render 的 html element
    styleUrl: "./item.component.css", // 同上
    })
    // 傳統JS程式碼寫在這裡 
    export class ItemComponent {
    
        title = "todo";
        filter: "all" | "active" | "done" = "all";
        allItems = [
            { description: "eat", done: true },
            { description: "sleep", done: false },
            { description: "play", done: false },
            { description: "laugh", done: false },
        ];

        // 當 filter 改變屬性 return 不同值,用法和 React setState 有點像
        get items() {
            if (this.filter === "all") {
            return this.allItems;
            }
            return this.allItems.filter((item) =>
            this.filter === "done" ? item.done : !item.done
            );
        }

        addItem(description: string) {
            this.allItems.unshift({
                description,
                done: false
            });
        }
    }
```


### .component.html

``` html
    <div class="main">
        <!-- 拿 Component 的 items 來當 Arrary + Render to Element -->
        <h1>My To Do List</h1>
        <h2>What would you like to do today?</h2>
        <ul>
            <li *ngFor="let item of items">{{item.description}}</li>
        </ul>

        <!-- 新增 -->
        <label for="addItemInput">What would you like to do today?</label>
        <input
            #newItem
            placeholder="add an item"
            (keyup.enter)="addItem(newItem.value); newItem.value = ''"
            class="lg-text-input"
            id="addItemInput"
        />

        <!-- 導入方法 addItem(param) -->
        <button class="btn-primary" (click)="addItem(newItem.value)">Add</button>
    </div>
```

### 表單處理

傳統資料流處理

`點擊輸入文字 -> 觸發 'input' event -> Calls setValue() -> 'valueChanges' event to observers -> Observers`

<br>

Angular 內保持雙向同步有兩種做法

1. Reactive forms (新版主流)

    `點擊輸入文字 -> 觸發 FormControl`

        `1. -> Fires a 'valueChanges' event to observers -> Observers`

        `2. -> Notifies the ControlValueAccessor -> Updates the DataValue`


2. Template-Driven forms (NgModel)

    `點擊輸入文字 -> 觸發 'input' event -> ControlValueAccessor`

        `1. -> Calls setValue() on the FormControl -> Fires a 'valueChanges' event to observers -> Observers`

        `2. -> Calls viewToModelUpdate() -> NgModel -> Emits an ngModelChange event -> Component -> Component`

驗證

```js
// 依序放入同步/非同步自定義驗證規則
// [fieldInitialValue, syncValidators?, asyncValidators?]
this.fb.group({
  fieldName: [initialValue, syncValidators, asyncValidators]
});
```

```js
import { Component } from '@angular/core';
import { FormControl,FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  categories = [
    { value: 'music',  label: 'Music'  },
    { value: 'movie',  label: 'Movie'  },
    { value: 'book',   label: 'Book'   },
  ];

  searchForm: FormGroup;
  newOptionValue = new FormControl('initial value');

  constructor(private fb: FormBuilder) {
    // 建立兩個控制項：category 與 title
    this.searchForm = this.fb.group({
      category: [this.categories[0].value, Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      console.warn('表單驗證未通過');
      this.searchForm.markAllAsTouched(); // 觸發所有欄位的 touched
      return;
    }
    console.log('表單資料:', this.searchForm.value);
  };

}
```

### 投影 Content Projection

主要是讓元件的導入方可以自訂內容插入到這個元件中，就像 React 的 `props.children`。適合「UI 容器元件 + 插槽」的場景，例如 Dialog、Card、Tab、Layout 等常見 UI 元件。

元件容器

```ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content> <!-- 預設內容 -->
      </div>
    </div>
  `
})
export class CardComponent {}
```

使用元件

```ts
<app-card>
  <div card-header>卡片標題</div>
  <p>這是卡片的主體內容</p>
</app-card>
```

指定該 ClassName 去插入內容取代`ng-content`,且若沒被指定到`ng-content`也不會占位

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-dialog',
  template: `
    <div class="dialog">
      <div class="dialog-header" *ngIf="hasHeader">
        <ng-content select="[dialog-header]"></ng-content>
      </div>
      <div class="dialog-body" *ngIf="hasBody">
        <ng-content select="[dialog-body]"></ng-content>
      </div>
      <div class="dialog-footer" *ngIf="hasFooter">
        <ng-content select="[dialog-footer]"></ng-content>
      </div>
    </div>
  `
})
export class DialogComponent {
  // Angular 無法直接偵測 ng-content 是否有內容，只能用 JS 側邊處理
  hasHeader = true;
  hasBody = true;
  hasFooter = true;
}
```

```html
<my-dialog>
  <div dialog-header>
    <h2>標題</h2>
  </div>

  <div dialog-body>
    <p>這是內容</p>
  </div>

  <!-- 若不寫 footer，就不會出現空的 footer -->
</my-dialog>
```
