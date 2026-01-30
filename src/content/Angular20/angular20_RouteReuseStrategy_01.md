---
title: "RouteReuseStrategy 1"
date: "2026-01-23"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular"]
slug: "angular_routeReuseStrategy01"
---
###### RouteReuseStrategy 是 ANGULAR 判斷路由變更時，如何處理邏輯的一個介面

---

Angular 在路由導航時，會自動把物件`route`轉成物件`ActivatedRouteSnapshot`，再經由`RouteReuse`去做邏輯判斷和流程。也就是說就算 app 沒有內部實作，系統也會自動帶入最基本的 Strategy 去過過水，可以看看檔案原始碼。

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

所以若要去控制流程，需要替換掉預設的`BaseRouteReuseStrategy`改成自己需求的策略，那就是必須實作 5 個特定物件作為參數的函式，這 5 個必須實作的接口如下：

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

再來就是去宣告 app 說若有引用到 `RouteReuseStrategy` 時都必須使用我定義好的 class

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

    // ANGULAR DI
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    // provideNzIcons(icons),
    // provideNzI18n(zh_TW),
    // provideAnimationsAsync(),
    // provideHttpClient()
  ]
};
```