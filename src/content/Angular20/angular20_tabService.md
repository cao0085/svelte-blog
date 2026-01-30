---
title: "Angular20 RxJS TabService"
date: "2025-12-05"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "RxJS"]
slug: "angular_tabService"
---
###### 企業內部系統常用到的分頁顯示管理

---

分頁管理器，主要功能會是需要可以

1. 存放(已Instance)當前的分頁(Component)
2. 選擇該分頁替換內容
3. 銷毀分頁

至少要建立兩個資料模型

``` ts
// 每個目錄的基本資料結構，用 id 當作唯一識別
interface MenuItem {
    id: string;
    label: string;
    route: string;
    icon?: string;
    children?: MenuItem[];
    expanded?: boolean;
}

// new() 時參數拿做 MenuItem.id + MenuItem.route
// MenuItem.id 當作識別 && MenuItem.route 當作 click(() => route)
export interface Tab {
    id: string;
    title: string;
    route: string;
    closable: boolean;
}
```

### BehaviorSubject

RxJS庫提供一個可觀察物件 (Observable) BehaviorSubject。它主要用於宣告和管理一個帶有初始值的狀態變數。它同時具備「觀察者 (Observer)」和「可觀察物件 (Observable)」的特性。

```ts
export class TabService {
    private tabs = new BehaviorSubject<Tab[]>([]);
    private activeTabId = new BehaviorSubject<string>('');

    // 提供給外部使用的變數，會自動監聽值(tabs,activeTabId)
    tabs$ = this.tabs.asObservable();
    activeTabId$ = this.activeTabId.asObservable();

    constructor(private router: Router) { }

    /**
     * 開啟新分頁
     */
    openTab(tab: Tab) {
        const currentTabs = this.tabs.value;
        const existingTab = currentTabs.find(t => t.id === tab.id);

        if (existingTab) {
            // 如果分頁已存在，切換到該分頁
            this.setActiveTab(tab.id);
            this.router.navigate([tab.route]);
        } else {
            // 新增分頁
            this.tabs.next([...currentTabs, tab]); // 替換整個陣列才會觸發事件通知(rerender)
            this.setActiveTab(tab.id);
            this.router.navigate([tab.route]);
        }
    }
}
```

### Signal

新版 Angular(16+) 提供框架內部語法 Signal 來雙向監聽

```ts
import { Injectable, signal, computed, effect, Signal } from '@angular/core';

// Signal 方式
// 宣告可寫入的 Signal
private tabsSignal = signal<Tab[]>([]);
private activeTabIdSignal = signal<string>('');

readonly tabs = this.tabsSignal.asReadonly();
readonly activeTabId = this.activeTabIdSignal.asReadonly(); 

```

整體概念和 React18 useState 用法很像

```ts
function TabServiceComponent() {
    const [tabs, setTabs] = useState([])
    const [activeTabId, setActiveTabId] = useState<number>(1);

    const addTab = () => {
        const newTab: Tab = {
            id: nextId,
            title: `新分頁 ${nextId}`
        };
        
        setTabs(currentTabs => [...currentTabs, newTab]); 
        setActiveTabId(nextId);
    };

    const switchTab = (id: number) => {
        setActiveTabId(id);
    };
}
```

邏輯層 tab.service.ts

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface Tab {
    id: string;
    title: string;
    route: string;
    closable: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class TabService {
    private tabs = new BehaviorSubject<Tab[]>([]);
    private activeTabId = new BehaviorSubject<string>('');

    tabs$ = this.tabs.asObservable();
    activeTabId$ = this.activeTabId.asObservable();

    constructor(private router: Router) { }

    /**
     * 開啟新分頁
     */
    openTab(tab: Tab) {
        const currentTabs = this.tabs.value;
        const existingTab = currentTabs.find(t => t.id === tab.id);

        if (existingTab) {
            // 如果分頁已存在，切換到該分頁
            this.setActiveTab(tab.id);
            this.router.navigate([tab.route]);
        } else {
            // 新增分頁
            this.tabs.next([...currentTabs, tab]);
            this.setActiveTab(tab.id);
            this.router.navigate([tab.route]);
        }
    }

    /**
     * 關閉分頁
     */
    closeTab(tabId: string) {
        const currentTabs = this.tabs.value;
        const index = currentTabs.findIndex(t => t.id === tabId);

        if (index === -1) return;

        const newTabs = currentTabs.filter(t => t.id !== tabId);
        this.tabs.next(newTabs);

        // 如果關閉的是當前分頁，切換到前一個或後一個
        if (this.activeTabId.value === tabId && newTabs.length > 0) {
            const newActiveIndex = Math.max(0, index - 1);
            this.setActiveTab(newTabs[newActiveIndex].id);
            this.router.navigate([newTabs[newActiveIndex].route]);
        } else if (newTabs.length === 0) {
            this.activeTabId.next('');
        }
    }

    /**
     * 設定當前分頁
     */
    setActiveTab(tabId: string) {
        this.activeTabId.next(tabId);
    }

    /**
     * 關閉所有分頁
     */
    closeAllTabs() {
        this.tabs.next([]);
        this.activeTabId.next('');
    }

    /**
     * 關閉其他分頁
     */
    closeOtherTabs(tabId: string) {
        const currentTabs = this.tabs.value;
        const keepTab = currentTabs.find(t => t.id === tabId);
        if (keepTab) {
            this.tabs.next([keepTab]);
            this.setActiveTab(tabId);
        }
    }
}
```

UI層 tab-container.ts

```ts
@Component({
  selector: 'app-tab-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="tab-container">
      <!-- 分頁標籤列 -->
      <div class="tab-bar" *ngIf="(tabs$ | async)?.length">
        <div *ngFor="let tab of tabs$ | async" 
             class="tab"
             [class.active]="tab.id === (activeTabId$ | async)"
             (click)="switchTab(tab)">
          <span class="tab-title">{{ tab.title }}</span>
          <button *ngIf="tab.closable" 
                  class="close-btn"
                  (click)="closeTab($event, tab.id)">
            ✕
          </button>
        </div>
      </div>

      <!-- 分頁內容區 -->
      <div class="tab-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`...省略
  `]
})

export class TabContainerComponent {
  private tabService = inject(TabService);
  tabs$ = this.tabService.tabs$;
  activeTabId$ = this.tabService.activeTabId$;

  switchTab(tab: Tab) {
    this.tabService.setActiveTab(tab.id);
  }

  closeTab(event: Event, tabId: string) {
    event.stopPropagation();
    this.tabService.closeTab(tabId);
  }
}
```
