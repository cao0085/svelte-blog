---
title: "RBAC 02 - Service & Guard"
date: "2025-12-09"
category: "software"
subCategory: "Angular20"
tags: ["frontend", "angular", "RBAC"]
slug: "angular_rbac_02"
---
###### Angular DI Service 管理登入狀態與權限資料，Guard 攔截未授權的路由訪問

---

### AuthService

用 Signal 管理登入狀態，對外只暴露唯讀 signal，登入後把資料存進 localStorage 支援重新整理後恢復 session

```ts
// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  private token = signal<string | null>(null);

  readonly user$ = this.currentUser.asReadonly();

  constructor(private router: Router) {
    this.restoreSession();
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null && this.token() !== null;
  }

  login(username: string, password: string): { success: boolean; message?: string } {
    const foundUser = userPermissionData.users.find(
      u => u.username === username && u.password === password
    );

    if (!foundUser) return { success: false, message: '帳號或密碼錯誤' };

    const user: User = { id: foundUser.id, username: foundUser.username, email: foundUser.email };

    this.currentUser.set(user);
    this.token.set(foundUser.token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', foundUser.token);

    return { success: true };
  }

  logout() {
    this.currentUser.set(null);
    this.token.set(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private restoreSession() {
    const userJson = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userJson && token) {
      try {
        this.currentUser.set(JSON.parse(userJson) as User);
        this.token.set(token);
      } catch {
        this.logout();
      }
    }
  }

  getCurrentUser(): User | null { return this.currentUser(); }
  getToken(): string | null { return this.token(); }
}
```

---

### PermissionService

存放使用者的權限列表，提供 `hasClaim()` 作為核心查詢方法

`userClaims` 和 `userClaimTree` 都是 `computed`，依賴 `userClaimIds` 自動更新

```ts
// permission.service.ts
@Injectable({ providedIn: 'root' })
export class PermissionService {
  private allClaims = signal<Claim[]>([]);
  private userClaimIds = signal<number[]>([]);
  private isLoaded = signal<boolean>(false);

  // 使用者擁有的權限列表
  readonly userClaims = computed(() => {
    const claimIds = this.userClaimIds();
    return this.allClaims().filter(claim => claimIds.includes(claim.id));
  });

  // 使用者擁有的權限樹（僅包含有權限的節點）
  readonly userClaimTree = computed<ClaimTreeNode[]>(() => {
    const claimMap = new Map<number, ClaimTreeNode>();

    // 初始化使用者擁有的節點
    this.userClaims().forEach(claim => {
      claimMap.set(claim.id, { ...claim, children: [] });
    });

    // 建立樹狀結構
    const rootNodes: ClaimTreeNode[] = [];
    claimMap.forEach(node => {
      if (node.parentId === null) {
        rootNodes.push(node);
      } else {
        claimMap.get(node.parentId)?.children.push(node);
      }
    });

    return rootNodes;
  });

  constructor(private authService: AuthService) {
    this.loadClaims();
    this.loadUserClaims();
  }

  private loadClaims(): void {
    const claims = userPermissionData.claims.map(claim => ({
      ...claim,
      type: claim.type as ClaimType,
    }));
    this.allClaims.set(claims);
  }

  loadUserClaims(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.userClaimIds.set([]);
      this.isLoaded.set(false);
      return;
    }
    const claimIds = userPermissionData.userClaims
      .filter(uc => uc.userId === user.id)
      .map(uc => uc.claimId);
    this.userClaimIds.set(claimIds);
    this.isLoaded.set(true);
  }

  // 核心方法：檢查是否有指定的權限
  hasClaim(claimCode: string): boolean {
    const claim = this.allClaims().find(c => c.code === claimCode);
    if (!claim) return false;
    return this.userClaimIds().includes(claim.id);
  }

  isPermissionLoaded(): boolean { return this.isLoaded(); }

  clearUserClaims(): void {
    this.userClaimIds.set([]);
    this.isLoaded.set(false);
  }
}
```

---

### Route

```ts
// app.routes.ts
export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'unauthorized', component: Unauthorized },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: convertToRoutes(ROUTE_CONFIGS) // 集中管理的路由配置，詳見 RBAC-03
  },
  { path: '**', redirectTo: '/login' }
];
```

---

### Guard

注入 Service 實作兩個守衛，`authGuard` 檢查登入狀態、`permissionGuard` 檢查路由所需權限

```ts
// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) return true;

  // 未登入，導向登入頁並記住原本要去的路由
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

// permission.guard.ts
export const permissionGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // 從 route.data 取得所需權限代碼（由 route.config.ts 注入）
  const requiredClaim = route.data['requiredClaim'] as string;

  if (permissionService.hasClaim(requiredClaim)) return true;

  return router.createUrlTree(['/unauthorized']);
};
```

Guard 設定好後可以先用直接輸入 URL 測試路由攔截是否正常，再整合 UI 層
