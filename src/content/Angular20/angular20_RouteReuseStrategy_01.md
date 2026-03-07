---
title: "RouteReuseStrategy 01"
date: "2026-01-23"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular"]
slug: "angular_routeReuseStrategy01"
---
###### RouteReuseStrategy 是 Angular 路由變更時會自動調用的介面，允許透過實作介面並以 DI 替換預設邏輯，控制路由元件實例的銷毀或復用。

---

Angular 的 `@angular/router` 套件在路由導航時，會從當前的路由資訊中提取內容建立`ActivatedRouteSnapshot`物件，再由`RouteReuseStrategy`介面中定義的方法處理後續流程，而預設注入的`BaseRouteReuseStrategy`行為可以看一下原始碼註解。

```ts
declare abstract class BaseRouteReuseStrategy implements RouteReuseStrategy {
    /**
     * Whether the given route should detach for later reuse.
     * Always returns false for `BaseRouteReuseStrategy`.
     * */
    shouldDetach(route: ActivatedRouteSnapshot): boolean;
    /**
     * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
     */
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void;
    /** Returns `false`, meaning the route (and its subtree) is never reattached */
    shouldAttach(route: ActivatedRouteSnapshot): boolean;
    /** Returns `null` because this strategy does not store routes for later re-use. */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null;
    /**
     * Determines if a route should be reused.
     * This strategy returns `true` when the future route config and current route config are
     * identical.
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean;
}
```

所以若想自訂路由元件的復用行為，就必須替換預設的`BaseRouteReuseStrategy`，改為實作 RouteReuseStrategy 介面定義的 5 個方法：

```typescript
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

// route-reuse.strategy.ts
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  // 實作邏輯...
}
```

實作完成後在 `app.config.ts` 的 `providers` 中替換預設策略：

```ts
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    // provideBrowserGlobalErrorListeners(),
    // provideZoneChangeDetection({ eventCoalescing: true }),
    // provideRouter(routes),
    // provideHttpClient(
    //   withInterceptors([authInterceptor]) // 註冊 Auth Interceptor
    // ),
    // provideAnimationsAsync(),

    // // App 初始化：恢復登入狀態（在路由啟動前完成）
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeAuth,
    //   multi: true
    // },

    // ========== ANGULAR DI ==========
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    // provideNzIcons(icons),
    // provideNzI18n(zh_TW),
    // provideAnimationsAsync(),
    // provideHttpClient()
  ]
};
```
