---
title: "RouteReuseStrategy 02"
date: "2026-01-24"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular"]
slug: "angular_routeReuseStrategy02"
---
###### RouteReuseStrategy 是 Angular 路由變更時會自動調用的介面，允許透過實作介面並以 DI 替換預設邏輯，控制路由元件實例的銷毀或復用。

---

RouteReuseStrategy 介面定義了 5 個必須實作的方法：

```ts
interface RouteReuseStrategy {
  // 1. 判斷是否允許將當前路由從 DOM「分離」(detach) 並保存
  shouldDetach(route: ActivatedRouteSnapshot): boolean;

  // 2. 當 shouldDetach 返回 true 時觸發，將分離下來的路由「快照」存入你的儲存空間
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void;

  // 3. 判斷當前路由是否允許「還原」(attach) 之前存下來的快照
  shouldAttach(route: ActivatedRouteSnapshot): boolean;

  // 4. 當 shouldAttach 返回 true 時觸發，從你的儲存空間「取回」快照
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null;

  // 5. 判斷導航前後是否視為「同一個路由」(決定要重用還是銷毀重建)
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
}
```

### 執行流程

```url變更 -> angular 去找有沒有紀錄過 -> 轉成物件 ActivatedRouteSnapshot -> 進入 Strategy```

``` md
導航：頁面 A → 頁面 B (理想上的時序如下)

1. shouldReuseRoute(B, A) → false（不同路由，繼續往下）

── 第一部分處理「舊路由 A」──
2. shouldDetach(A)         → 要不要保存 A？
3. store(A, handle)        → （如果 yes）把 A 存起來

── 第二部分處理「新路由 B」──
4. shouldAttach(B)         → B 之前有被存過嗎？
5. retrieve(B)             → （如果 yes）把 B 的快照拿出來用
```

### 儲存流程

#### shouldDetach()

`shouldDetach()` 需要一個判斷依據，做法是在`route`的 `data` 屬性中加入自訂標記：

``` ts
// router_module.d.d.ts
interface Route {
    /**
     * Additional developer-defined data provided to the component via
     * `ActivatedRoute`. By default, no additional data is passed.
     */
    data?: Data;
}

// new Route()
{
    path: '-',
    loadComponent: () => import('@app/features/basic-system/--')
        .then(m => m.CatalogManagement),
    canActivate: [routeGuard],
    data: { reuseRoute: true } // reuseRoute: true
}
```

實作 `shouldDetach()`後就是

```ts
/**
 * 決定是否應該分離（保存）這個路由
 * @param route 當前路由快照
 * @returns true = 保存組件, false = 銷毀組件
 */
shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['reuseRoute'] === true; // 只保存有 data.reuseRoute 標記的路由
}
```

### store()

`store(route, handle)` 的兩個參數是由 Angular 自動傳入
    - `route` 是當前路由快照
    - `handle` 是 Angular 處理好的 DOM 快照

`store()`只負責傳入，所以需實作儲存邏輯，這邊簡單用 Map & LRU 管理元件快取

```ts

/**
 * 最大快取數量，超過時會移除最舊的快取
 */
private readonly MAX_CACHE_SIZE = 3;

/**
 * 儲存已分離的路由組件
 * key: 路由路徑
 * value: 組件快照（包含狀態）
 */
private handlers: Map<string, DetachedRouteHandle> = new Map();

/**
 * 儲存分離的路由組件
 * @param route 路由快照
 * @param handle 組件快照（包含 DOM、狀態等）
 */
store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    const path = this.getRouteKey(route);

    if (handle) {
        // 如果快取已滿，移除最舊的快取（Map 保持插入順序）
        if (this.handlers.size >= this.MAX_CACHE_SIZE && !this.handlers.has(path)) {
            const oldestKey = this.handlers.keys().next().value;
            if (oldestKey) {
                const oldHandle = this.handlers.get(oldestKey);
                this.handlers.delete(oldestKey);
                if (oldHandle && (oldHandle as any).componentRef) {
                    (oldHandle as any).componentRef.destroy();
                }
                console.log(`[RouteReuse] 快取已滿，移除最舊的: ${oldestKey}`);
            }
        }

        this.handlers.set(path, handle);
        console.log(`[RouteReuse] 保存路由: ${path} (快取數量: ${this.handlers.size}/${this.MAX_CACHE_SIZE})`);
    }
}

/**
 * 生成路由的唯一鍵值
 * @param route 路由快照
 * @returns 路由鍵值
 */
private getRouteKey(route: ActivatedRouteSnapshot): string {
    // 使用 routeConfig.path 來組合完整路徑，避免空路徑子路由造成的問題
    const segments: string[] = [];
    let current: ActivatedRouteSnapshot | null = route;

    while (current) {
        if (current.routeConfig && current.routeConfig.path) {
            segments.unshift(current.routeConfig.path);
        }
        current = current.parent;
    }

    return segments.join('/');
}
```

### 讀取流程

#### shouldAttach()

`shouldAttach()` 同樣由 Angular 自動傳入參數，
實作上只需查詢剛剛自己實作 Map 中是否有對應的快取紀錄：
    - return `true` 時 Angular 會接著呼叫 `retrieve()` 流程
    - return `false` 則重新建立 `route` 元件

```ts
/**
 * 決定是否應該重新附加（恢復）之前保存的路由
 * @param route 路由快照
 * @returns true = 使用保存的組件, false = 創建新組件
 */
shouldAttach(route: ActivatedRouteSnapshot): boolean {

    if (!route.component && !route.routeConfig?.loadComponent) {
        return false;
    }

    const path = this.getRouteKey(route);
    const hasStored = this.handlers.has(path);

    if (hasStored) {
        console.log(`[RouteReuse] 恢復路由: ${path}`);
    }

    return hasStored;
}
```

#### retrieve()

```ts
/**
 * 取回之前保存的路由組件
 * @param route 路由快照
 * @returns 保存的組件快照
 */
retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // 防止 Angular 13+ 的路由資料繼承問題：
    // 沒有組件的路由不應該取回快取，避免無限迴圈
    if (!route.component && !route.routeConfig?.loadComponent) {
        return null;
    }

    const path = this.getRouteKey(route);
    return this.handlers.get(path) || null;
}
```

#### shouldReuseRoute()

 `shouldReuseRoute()`用來判斷前後路由是否視為同一個，例如不同參數的情境（如 /user/1 → /user/2）

```ts
/**
 * 決定是否應該重用路由
 * @param future 即將進入的路由
 * @param curr 當前路由
 * @returns true = 重用, false = 不重用
 */
shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig; // 比較的是物件參考
}
```

### 遞迴

觸發原因是空路徑子路由（`path: ''`）不會有 key 可以識別，導致父路由與子路由會產生相同的快取 key。
Angular 逐層處理路由樹時，兩層都命中同一個 handle，`retrieve` 陷入反覆呼叫的無限迴圈。

```ts
// 路由設定：
{
  path: 'basic/catalogmanagement',     // 父路由（沒有 component）
  children: [{
    path: '',                          // 子路由（有 component）
    data: { reuseRoute: true }
  }]
}
```

解法是在 `shouldAttach` 和 `retrieve` 中跳過沒有 component 的路由，用屬性 `route.component` 或 `route.routeConfig?.loadComponent` 判斷

```ts

/**
 * 決定是否應該重新附加（恢復）之前保存的路由
 * @param route 路由快照
 * @returns true = 使用保存的組件, false = 創建新組件
 */
shouldAttach(route: ActivatedRouteSnapshot): boolean {

    if (!route.component && !route.routeConfig?.loadComponent) {
        return false;
    }

    const path = this.getRouteKey(route);
    const hasStored = this.handlers.has(path);

    if (hasStored) {
        console.log(`[RouteReuse] 恢復路由: ${path}`);
    }

    return hasStored;
}

/**
 * 取回之前保存的路由組件
 * @param route 路由快照
 * @returns 保存的組件快照
 */
retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // 防止 Angular 13+ 的路由資料繼承問題：
    // 沒有組件的路由不應該取回快取，避免無限迴圈
    if (!route.component && !route.routeConfig?.loadComponent) {
        return null;
    }

    const path = this.getRouteKey(route);
    return this.handlers.get(path) || null;
}

```

### 完整程式碼

```ts
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    /**
     * 最大快取數量，超過時會移除最舊的快取
     */
    private readonly MAX_CACHE_SIZE = 3;

    /**
     * 儲存已分離的路由組件
     * key: 路由路徑
     * value: 組件快照（包含狀態）
     */
    private handlers: Map<string, DetachedRouteHandle> = new Map();

    /**
     * 標記準備要被銷毀的路由路徑
     * 用於處理「關閉當前分頁」的情況，防止路由在導航離開時被再次保存
     */
    private safeToDestroy = new Set<string>();

    /**
     * 決定是否應該分離（保存）這個路由
     * @param route 當前路由快照
     * @returns true = 保存組件, false = 銷毀組件
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getRouteKey(route);

        // 如果該路徑被標記為要銷毀（即正在關閉分頁）
        if (this.safeToDestroy.has(path)) {
            this.safeToDestroy.delete(path);
            console.log(`[RouteReuse] 路由標記為銷毀，不進行保存: ${path}`);
            return false;
        }

        // 只保存有 data.reuseRoute 標記的路由
        return route.data['reuseRoute'] === true;
    }

    /**
     * 儲存分離的路由組件
     * @param route 路由快照
     * @param handle 組件快照（包含 DOM、狀態等）
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        const path = this.getRouteKey(route);

        // 再次檢查是否被標記為銷毀（雙重保險）
        if (this.safeToDestroy.has(path)) {
            this.safeToDestroy.delete(path);
            return;
        }

        if (handle) {
            // 如果快取已滿，移除最舊的快取（Map 保持插入順序）
            if (this.handlers.size >= this.MAX_CACHE_SIZE && !this.handlers.has(path)) {
                const oldestKey = this.handlers.keys().next().value;
                if (oldestKey) {
                    const oldHandle = this.handlers.get(oldestKey);
                    this.handlers.delete(oldestKey);
                    if (oldHandle && (oldHandle as any).componentRef) {
                        (oldHandle as any).componentRef.destroy();
                    }
                    console.log(`[RouteReuse] 快取已滿，移除最舊的: ${oldestKey}`);
                }
            }

            this.handlers.set(path, handle);
            console.log(`[RouteReuse] 保存路由: ${path} (快取數量: ${this.handlers.size}/${this.MAX_CACHE_SIZE})`);
        }
    }

    /**
     * 決定是否應該重新附加（恢復）之前保存的路由
     * @param route 路由快照
     * @returns true = 使用保存的組件, false = 創建新組件
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {

        if (!route.component && !route.routeConfig?.loadComponent) {
            return false;
        }

        const path = this.getRouteKey(route);
        const hasStored = this.handlers.has(path);

        if (hasStored) {
            console.log(`[RouteReuse] 恢復路由: ${path}`);
        }

        return hasStored;
    }

    /**
     * 取回之前保存的路由組件
     * @param route 路由快照
     * @returns 保存的組件快照
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        // 防止 Angular 13+ 的路由資料繼承問題：
        // 沒有組件的路由不應該取回快取，避免無限迴圈
        if (!route.component && !route.routeConfig?.loadComponent) {
            return null;
        }

        const path = this.getRouteKey(route);
        return this.handlers.get(path) || null;
    }

    /**
     * 決定是否應該重用路由
     * @param future 即將進入的路由
     * @param curr 當前路由
     * @returns true = 重用, false = 不重用
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    /**
     * 處理分頁關閉的邏輯
     * @param url 完整的路由路徑 (e.g. /main/basic-system/log)
     */
    close(url: string): void {
        // 確保格式一致（移除開頭 slash）
        const key = url.startsWith('/') ? url.substring(1) : url;

        console.log(`[RouteReuse] 嘗試關閉路由: ${key}`);

        // 1. 如果該路由目前在背景緩存中，直接移除並銷毀
        if (this.handlers.has(key)) {
            const handle = this.handlers.get(key);
            this.handlers.delete(key);

            // 嘗試手動銷毀組件以釋放資源
            if (handle && (handle as any).componentRef) {
                (handle as any).componentRef.destroy();
            }
            console.log(`[RouteReuse] 已清除緩存並銷毀組件: ${key}`);
        }

        // 2. 標記該路徑為待銷毀
        // 這樣如果它是「當前分頁」，在導航離開觸發 shouldDetach 時會回傳 false
        this.safeToDestroy.add(key);
    }

    /**
     * 生成路由的唯一鍵值
     * @param route 路由快照
     * @returns 路由鍵值
     */
    private getRouteKey(route: ActivatedRouteSnapshot): string {
        // 使用 routeConfig.path 來組合完整路徑，避免空路徑子路由造成的問題
        const segments: string[] = [];
        let current: ActivatedRouteSnapshot | null = route;

        while (current) {
            if (current.routeConfig && current.routeConfig.path) {
                segments.unshift(current.routeConfig.path);
            }
            current = current.parent;
        }

        return segments.join('/');
    }

    /**
     * 清除所有保存的路由
     */
    clearAll(): void {
        this.handlers.forEach(handle => {
            if (handle && (handle as any).componentRef) {
                (handle as any).componentRef.destroy();
            }
        });
        this.handlers.clear();
        this.safeToDestroy.clear();
        console.log('[RouteReuse] 清除所有保存的路由');
    }

    /**
     * 清除特定路由（舊版相容）
     */
    clear(path: string): void {
        this.close(path);
    }
}
```