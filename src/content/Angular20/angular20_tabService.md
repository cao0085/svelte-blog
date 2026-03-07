---
title: "Multi-Tab Management"
date: "2026-01-05"
category: "software"
subCategory: "Angular20"
tags: ["frontend", "angular", "RxJS"]
slug: "angular_tabService"
---
###### 企業內部系統常用到的分頁顯示管理，管理分頁列的狀態與切換，記錄當前開啟的路由分頁

---

### TabService

通常可以搭配 RouteReuseStrategy 控制元件顯示和復用

- **RouteReuseStrategy**：攔截路由切換，快取 Component 實例
- **TabService**：記錄哪些分頁存在、哪個是 active、呼叫 `router.navigate()` 切換路由
    1. 存放（已 Instance）當前的分頁（Component）
    2. 選擇該分頁替換內容
    3. 銷毀分頁

至少要建立兩個資料模型

```ts
// 每個目錄的基本資料結構，用 id 當作唯一識別
interface MenuItem {
  id: string;
  label: string;
  route: string;
  icon?: string;
  children?: MenuItem[];
}

// new() 時參數取自 MenuItem.id + MenuItem.route
export interface Tab {
  id: string;
  title: string;
  route: string;
  closable: boolean;
}
```

---

### BehaviorSubject 寫法

`BehaviorSubject` 維護狀態，`.asObservable()` 提供給外部訂閱

```ts
// tab.service.ts
@Injectable({ providedIn: 'root' })
export class TabService {
  private tabs = new BehaviorSubject<Tab[]>([]);
  private activeTabId = new BehaviorSubject<string>('');

  // 外部只能訂閱，不能直接寫入
  tabs$ = this.tabs.asObservable();
  activeTabId$ = this.activeTabId.asObservable();

  constructor(private router: Router) {}

  openTab(tab: Tab) {
    const currentTabs = this.tabs.value;
    const existing = currentTabs.find(t => t.id === tab.id);

    if (existing) {
      this.setActiveTab(tab.id);
    } else {
      // 替換整個陣列才會觸發 Observable 通知
      this.tabs.next([...currentTabs, tab]);
      this.setActiveTab(tab.id);
    }
    this.router.navigate([tab.route]);
  }

  closeTab(tabId: string) {
    const currentTabs = this.tabs.value;
    const index = currentTabs.findIndex(t => t.id === tabId);
    if (index === -1) return;

    const newTabs = currentTabs.filter(t => t.id !== tabId);
    this.tabs.next(newTabs);

    // 關閉當前分頁時，切換到前一個
    if (this.activeTabId.value === tabId && newTabs.length > 0) {
      const newActive = newTabs[Math.max(0, index - 1)];
      this.setActiveTab(newActive.id);
      this.router.navigate([newActive.route]);
    } else if (newTabs.length === 0) {
      this.activeTabId.next('');
    }
  }

  setActiveTab(tabId: string) {
    this.activeTabId.next(tabId);
  }

  closeAllTabs() {
    this.tabs.next([]);
    this.activeTabId.next('');
  }

  closeOtherTabs(tabId: string) {
    const keep = this.tabs.value.find(t => t.id === tabId);
    if (keep) {
      this.tabs.next([keep]);
      this.setActiveTab(tabId);
    }
  }
}
```

---

### Signal 寫法

```ts
@Injectable({ providedIn: 'root' })
export class TabService {
  private tabsSignal = signal<Tab[]>([]);
  private activeTabIdSignal = signal<string>('');

  readonly tabs = this.tabsSignal.asReadonly();
  readonly activeTabId = this.activeTabIdSignal.asReadonly();

  constructor(private router: Router) {}

  openTab(tab: Tab) {
    const existing = this.tabsSignal().find(t => t.id === tab.id);

    if (existing) {
      this.activeTabIdSignal.set(tab.id);
    } else {
      this.tabsSignal.update(tabs => [...tabs, tab]);
      this.activeTabIdSignal.set(tab.id);
    }
    this.router.navigate([tab.route]);
  }

  closeTab(tabId: string) {
    const currentTabs = this.tabsSignal();
    const index = currentTabs.findIndex(t => t.id === tabId);
    if (index === -1) return;

    const newTabs = currentTabs.filter(t => t.id !== tabId);
    this.tabsSignal.set(newTabs);

    if (this.activeTabIdSignal() === tabId && newTabs.length > 0) {
      const newActive = newTabs[Math.max(0, index - 1)];
      this.activeTabIdSignal.set(newActive.id);
      this.router.navigate([newActive.route]);
    } else if (newTabs.length === 0) {
      this.activeTabIdSignal.set('');
    }
  }

  setActiveTab(tabId: string) {
    this.activeTabIdSignal.set(tabId);
  }

  closeAllTabs() {
    this.tabsSignal.set([]);
    this.activeTabIdSignal.set('');
  }

  closeOtherTabs(tabId: string) {
    const keep = this.tabsSignal().find(t => t.id === tabId);
    if (keep) {
      this.tabsSignal.set([keep]);
      this.activeTabIdSignal.set(tabId);
    }
  }
}
```

---

### UI 層

```ts
// tab-container.component.ts
@Component({
  selector: 'app-tab-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="tab-container">
      <div class="tab-bar" *ngIf="(tabs$ | async)?.length">
        <div *ngFor="let tab of tabs$ | async"
             class="tab"
             [class.active]="tab.id === (activeTabId$ | async)"
             (click)="switchTab(tab)">
          <span>{{ tab.title }}</span>
          <button *ngIf="tab.closable" (click)="closeTab($event, tab.id)">✕</button>
        </div>
      </div>
      <div class="tab-content">
        <router-outlet />
      </div>
    </div>
  `,
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
