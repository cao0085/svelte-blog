---
title: "Angular20 Auth & Route 03"
date: "2025-12-11"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "route"]
slug: "angular_AuthRoute_03"
---
###### 基於 RBAC 實作權限控管和畫面渲染，處理 UI/UX

---

### Layout

主畫面的 Layout 會是常見的

1. Header 放入基本資料
2. SideBar 側邊攔根據權限 Render 出入口
3. ContentView 根據不同路由顯示不同畫面

** sidebar.component.ts **

這邊主要功能是整理 permissionService 的權限列表( 有設計 TabService 但可解耦的先忽略)，轉成 UI 好渲染的資料結構(menuItems)，Click( ) Enevt就是跳轉到該 permissionService 對應的 route，ContentView 再根據 Route 顯示綁定的 Component

```ts

interface MenuItem {
  id: string;
  name: string;
  route: string;
  icon?: string;
  children?: MenuItem[];
  expanded?: boolean;
  claimCode?: string; // 權限代碼
}

export class SidebarComponent {
  isCollapsed = false;
  private allRouteMap = buildAllClaimRouteMap();

  // UI DataSource => 根據權限動態建構
  menuItems = computed(() => {
    const claimTree = this.permissionService.userClaimTree();
    const routeTree = this.filterRoutePermissions(claimTree);
    return this.convertToMenuItems(routeTree);
  });

  constructor(
    private tabService: TabService,
    private permissionService: PermissionService,
    private router: Router
  ) { }

  /**
   * 拿 ROUTE 類型的權限(遞迴)
   */
  private filterRoutePermissions(nodes: ClaimTreeNode[]): ClaimTreeNode[] {
    return nodes
      .filter(node => node.type === ClaimType.ROUTE)
      .map(node => ({
        ...node,
        children: node.children ? this.filterRoutePermissions(node.children) : []
      }));
  }

  /**
   * 將 ClaimTreeNode 轉換為 MenuItem (遞迴)
   */
  private convertToMenuItems(nodes: ClaimTreeNode[]): MenuItem[] {
    return nodes.map(node => {
      const route = this.allRouteMap[node.code as ClaimCode] || '#';

      return {
        id: node.id.toString(),
        name: node.name,
        route: route,
        claimCode: node.code,
        expanded: false,
        children: node.children && node.children.length > 0
          ? this.convertToMenuItems(node.children)
          : undefined
      };
    });
  }

  goToHome() {
    // 關閉所有分頁，返回首頁
    this.tabService.closeAllTabs();
  }

  goToRoute(item: MenuItem) {
    this.router.navigate([item.route]);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }
}
```

所以麻煩的部份會是 permissionService (原資料) 要如何 MAPPING 到前端定義的 URL ROUTE 字串值，為此會需要定義一個介面

```ts
/**
 * 路由配置介面
 */
export interface RouteConfig {
    path: string; // APP Path
    claim: ClaimCode; // DB TABLE Value
    loadComponent: () => Promise<any>; // ContentView
    reuseRoute?: boolean; // 套件提供暫時忽略
}

/**
 * 權限代碼枚舉
 */
export enum ClaimCode {
    // ========================================
    // 基礎系統
    // ========================================
    BASIC_SYSTEM_MODULE = 'BASIC_SYSTEM_MODULE',
    BASIC_SYSTEM_LOG = 'BASIC_SYSTEM_LOG',

    // ========================================
    // 外部系統
    // ========================================
    EXTERNAL_SYSTEM_MODULE = 'EXTERNAL_SYSTEM_MODULE',
    EXTERNAL_SYSTEM_VENDOR_DATA = 'EXTERNAL_SYSTEM_VENDOR_DATA',

    // ========================================
    // 金流系統
    // ========================================
    PAYMENT_SYSTEM_MODULE = 'PAYMENT_SYSTEM_MODULE',
    PAYMENT_SYSTEM_METHOD = 'PAYMENT_SYSTEM_METHOD',
}

```

route.config.ts

資料整理完後，還需自行轉換成 Angular Route 套件可以吃的資料模型 convertToRoute( )，丟回給 app.routes.ts 使用

```ts
export const ROUTE_CONFIGS: RouteConfig[] = [
    {
        path: 'basic-system/log',
        claim: ClaimCode.BASIC_SYSTEM_LOG,
        loadComponent: () => import('../../features/basic-system/system-log.component')
            .then(m => m.SystemLogComponent),
        reuseRoute: true
    },
    {
        path: 'payment-system/payment-method',
        claim: ClaimCode.PAYMENT_SYSTEM_METHOD,
        loadComponent: () => import('../../features/payment-system/payment-method.component')
            .then(m => m.PaymentMethodComponent),
    },
    {
        path: 'parking-system/order-management',
        claim: ClaimCode.PARKING_SYSTEM_ORDER,
        loadComponent: () => import('../../features/parking-system/order-management.component')
            .then(m => m.OrderManagementComponent),
    }
];

/**
 * 將 RouteConfig 轉換為 Angular Route
 */
export function convertToRoute(config: RouteConfig): Route {
    return {
        path: config.path,
        loadComponent: config.loadComponent,
        canActivate: [permissionGuard],
        data: {
            requiredClaim: config.claim,
            reuseRoute: config.reuseRoute ?? true
        }
    };
}

/**
 * 將所有 RouteConfig 轉換為 Angular Routes
 */
export function convertToRoutes(configs: RouteConfig[]): Route[] {
    return configs.map(convertToRoute);
}

/**
 * 從 ROUTE_CONFIGS 取出所有路徑設定，建立權限(ClaimCode)到路由(path)的映射表
 */
export function buildAllClaimRouteMap(): Partial<Record<ClaimCode, string>> {
    const map: Partial<Record<ClaimCode, string>> = {};

    ROUTE_CONFIGS.forEach(config => {
        map[config.claim] = `${config.path}`;
    });

    return map;
}
```

app.routes.ts 會變成

```ts
export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'unauthorized',
        component: Unauthorized
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        // 舊有的
        // children: [
        //     {
        //         path: 'basic-system/log',
        //         requiredClaim: ClaimCode.BASIC_SYSTEM_LOG,
        //         loadComponent: () => import('../../features/basic-system/    system-log.component')
        //             .then(m => m.SystemLogComponent),
        //     },
        //     {
        //         path: 'external-system/vendor-data',
        //         canActivate: [permissionGuard], // 需要有權限才能訪問
        //         requiredClaim: ClaimCode.EXTERNAL_SYSTEM_VENDOR_DATA,
        //         loadComponent: () => import('../../features/external-system/vendor-data.component')
        //             .then(m => m.VendorDataComponent),
        //         reuseRoute: true
        //     }
        // ]
        children: convertToRoutes(ROUTE_CONFIGS)  // 使用集中管理的路由配置
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
```

未來要新增一個畫面，前端就是添加一組
```ts
// ClaimCode
xxxxx_SYSTEM_MODULE = 'XXXXX_SYSTEM_MODULE',

// 路徑畫面設定
{
    path: 'parking-system/order-management',
    claim: ClaimCode.PARKING_SYSTEM_ORDER,
    loadComponent: () => import('../../features/parking-system/order-management.component')
        .then(m => m.OrderManagementComponent),
}
```