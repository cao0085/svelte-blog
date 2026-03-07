---
title: "RBAC 03 - Sidebar UI"
date: "2025-12-11"
category: "software"
subCategory: "Angular20"
tags: ["frontend", "angular", "RBAC"]
slug: "angular_rbac_03"
---
###### 根據使用者權限動態渲染側邊欄，將 PermissionService 的權限樹轉換為 UI 資料結構

---

### Layout

主畫面的 Layout 是常見的三段式：

1. **Header**：放入基本資料
2. **Sidebar**：根據權限 render 出目錄入口
3. **ContentView**：根據路由顯示對應的 Component

---

### SidebarComponent

主要工作是把 `permissionService.userClaimTree()` 轉成 UI 好渲染的 `menuItems`

- 遞迴過濾出 `ROUTE` 類型的節點（去掉 ACTION 類型）
- 用 `buildAllClaimRouteMap()` 把 ClaimCode 對應到實際 URL path
- `menuItems` 用 `computed` 自動追蹤權限變化

```ts
// sidebar.component.ts
interface MenuItem {
  id: string;
  name: string;
  route: string;
  icon?: string;
  children?: MenuItem[];
  expanded?: boolean;
  claimCode?: string;
}

export class SidebarComponent {
  isCollapsed = false;
  private allRouteMap = buildAllClaimRouteMap();

  menuItems = computed(() => {
    const claimTree = this.permissionService.userClaimTree();
    const routeTree = this.filterRoutePermissions(claimTree);
    return this.convertToMenuItems(routeTree);
  });

  constructor(
    private tabService: TabService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  // 遞迴過濾 ROUTE 類型的權限節點
  private filterRoutePermissions(nodes: ClaimTreeNode[]): ClaimTreeNode[] {
    return nodes
      .filter(node => node.type === ClaimType.ROUTE)
      .map(node => ({
        ...node,
        children: node.children ? this.filterRoutePermissions(node.children) : []
      }));
  }

  // 遞迴將 ClaimTreeNode 轉換為 MenuItem
  private convertToMenuItems(nodes: ClaimTreeNode[]): MenuItem[] {
    return nodes.map(node => ({
      id: node.id.toString(),
      name: node.name,
      route: this.allRouteMap[node.code as ClaimCode] || '#',
      claimCode: node.code,
      expanded: false,
      children: node.children?.length ? this.convertToMenuItems(node.children) : undefined
    }));
  }

  goToRoute(item: MenuItem) { this.router.navigate([item.route]); }
  toggleSidebar() { this.isCollapsed = !this.isCollapsed; }
  toggleMenu(item: MenuItem) { item.expanded = !item.expanded; }
}
```

---

### RouteConfig

`PermissionService` 的 ClaimCode 是 DB 常數，Sidebar 需要對應到實際 URL，為此定義 `RouteConfig` 作為橋接

```ts
export interface RouteConfig {
  path: string;          // URL path
  claim: ClaimCode;      // 對應的 DB 權限常數
  loadComponent: () => Promise<any>;
  reuseRoute?: boolean;
}

export enum ClaimCode {
  BASIC_SYSTEM_MODULE          = 'BASIC_SYSTEM_MODULE',
  BASIC_SYSTEM_LOG             = 'BASIC_SYSTEM_LOG',
  EXTERNAL_SYSTEM_MODULE       = 'EXTERNAL_SYSTEM_MODULE',
  EXTERNAL_SYSTEM_VENDOR_DATA  = 'EXTERNAL_SYSTEM_VENDOR_DATA',
  PAYMENT_SYSTEM_MODULE        = 'PAYMENT_SYSTEM_MODULE',
  PAYMENT_SYSTEM_METHOD        = 'PAYMENT_SYSTEM_METHOD',
}
```

---

### route.config.ts

集中管理所有路由設定，提供三個工具函式：

- `convertToRoute()` ：將一筆 RouteConfig 轉成 Angular Route（自動掛上 `permissionGuard`）
- `convertToRoutes()` ：批次轉換
- `buildAllClaimRouteMap()` ：建立 ClaimCode → path 的 Map，給 Sidebar 使用

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
];

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

export function convertToRoutes(configs: RouteConfig[]): Route[] {
  return configs.map(convertToRoute);
}

// Sidebar 用：建立 ClaimCode → path 的映射表
export function buildAllClaimRouteMap(): Partial<Record<ClaimCode, string>> {
  const map: Partial<Record<ClaimCode, string>> = {};
  ROUTE_CONFIGS.forEach(config => { map[config.claim] = config.path; });
  return map;
}
```

---

### 新增畫面流程

未來要新增一個畫面，前端只需：

```ts
// 1. ClaimCode 新增常數
PARKING_SYSTEM_ORDER = 'PARKING_SYSTEM_ORDER',

// 2. ROUTE_CONFIGS 新增一筆
{
  path: 'parking-system/order-management',
  claim: ClaimCode.PARKING_SYSTEM_ORDER,
  loadComponent: () => import('../../features/parking-system/order-management.component')
    .then(m => m.OrderManagementComponent),
}
```

DB 那邊同步新增 claim 記錄並綁定角色，Sidebar 和 Guard 會自動套用。
