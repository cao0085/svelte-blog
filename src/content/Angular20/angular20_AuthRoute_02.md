---
title: "Angular20 Auth & Route 02"
date: "2025-12-09"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "route"]
slug: "angular_AuthRoute_02"
---
###### 基於 RBAC 實作權限控管和畫面渲染，這篇處理前端架構 Service 、 Route 、 Guard

---

### Service

Angular 會使用 DI Service 的方式維護狀態管理與函數調用，通常會是 Singleton

先簡單實作 auth.service.ts 讓 APP 可以判定登入狀態

```ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import userPermissionData from '../../../mockDB/userPermission.json';

export interface User {
    id: number;
    username: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // 使用 signal 管理登入狀態
    private currentUser = signal<User | null>(null);
    private token = signal<string | null>(null);

    // 公開的唯讀 signal
    readonly user$ = this.currentUser.asReadonly();
    readonly isLoggedIn$ = this.currentUser.asReadonly();

    constructor(private router: Router) {
        // 從 localStorage 恢復登入狀態
        this.restoreSession();
    }

    /**
     * 檢查是否已登入
     */
    isAuthenticated(): boolean {
        return this.currentUser() !== null && this.token() !== null;
    }

    /**
     * 登入
     * @returns { success: boolean, message?: string }
     */
    login(username: string, password: string): { success: boolean; message?: string } {
        // 從 userPermission.json 中查找使用者
        const foundUser = userPermissionData.users.find(
            u => u.username === username && u.password === password
        );

        if (!foundUser) {
            return {
                success: false,
                message: '帳號或密碼錯誤'
            };
        }

        const user: User = {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email
        };

        const token = foundUser.token;

        // 更新狀態
        this.currentUser.set(user);
        this.token.set(token);

        // 儲存到 localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return {
            success: true
        };
    }

    /**
     * 登出
     */
    logout() {
        this.currentUser.set(null);
        this.token.set(null);

        // 清除 localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // 導向登入頁
        this.router.navigate(['/login']);
    }

    /**
     * 從 localStorage 恢復登入狀態
     */
    private restoreSession() {
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (userJson && token) {
            try {
                const user = JSON.parse(userJson) as User;
                this.currentUser.set(user);
                this.token.set(token);
            } catch (error) {
                console.error('恢復登入狀態失敗', error);
                this.logout();
            }
        }
    }

    /**
     * 取得當前使用者
     */
    getCurrentUser(): User | null {
        return this.currentUser();
    }

    /**
     * 取得 Token
     */
    getToken(): string | null {
        return this.token();
    }
}
```

permission.service.ts 用來處理權限相關，目前功能定義成

1. 存放使用者的權限 Singleton 在前端
2. 全部的權限列表，因為不是機密資料可以回傳，方便整理狀態
3. 業務邏輯處理

```ts
import { Injectable, signal, computed } from '@angular/core';
import { AuthService } from './auth.service';
import userPermissionData from '../../../mockDB/userPermission.json';

/**
 * 權限類型
 */
export enum ClaimType {
    ROUTE = 'ROUTE',    // 路由權限（頁面訪問）
    ACTION = 'ACTION'   // 操作權限（功能按鈕）
}

/**
 * 權限聲明介面
 */
export interface Claim {
    id: number;
    code: string;
    name: string;
    type: ClaimType;
    module: string;
    parentId: number | null;
}

/**
 * 使用者權限關聯介面
 */
export interface UserClaim {
    userId: number;
    claimId: number;
}

/**
 * 權限樹節點（用於建立階層結構）
 */
export interface ClaimTreeNode extends Claim {
    children: ClaimTreeNode[];
}

@Injectable({
    providedIn: 'root'
})
export class PermissionService {
    // 所有權限定義
    private allClaims = signal<Claim[]>([]);

    // 當前使用者的權限 ID 列表
    private userClaimIds = signal<number[]>([]);

    // 當前使用者的權限物件列表(List)（computed）
    readonly userClaims = computed(() => {
        const claimIds = this.userClaimIds();
        return this.allClaims().filter(claim => claimIds.includes(claim.id));
    });

    // 當前使用者的權限樹狀結構（computed, 僅包含使用者擁有的權限）
    readonly userClaimTree = computed<ClaimTreeNode[]>(() => {
        // 取得使用者擁有的權限列表
        const userClaimList = this.userClaims();

        // 用 Map 儲存節點，方便透過 ID 查找父節點
        const claimMap = new Map<number, ClaimTreeNode>();

        // 1. 初始化使用者擁有的節點
        userClaimList.forEach(claim => {
            // 使用展開運算子 (...) 建立一個新的物件，符合 ClaimTreeNode 介面
            claimMap.set(claim.id, { ...claim, children: [] });
        });

        // 2. 建立樹狀結構並過濾
        const rootNodes: ClaimTreeNode[] = [];
        claimMap.forEach(node => {
            if (node.parentId === null) {
                // 根節點 (ParentId 為 null) 直接加入根列表
                rootNodes.push(node);
            } else {
                // 嘗試從 claimMap 中取得父節點
                const parent = claimMap.get(node.parentId);

                // 確保父節點存在 (因為我們只處理使用者擁有的節點，所以 parentId 必須在 claimMap 內)
                if (parent) {
                    parent.children.push(node);
                }
            }
        });

        // 3. 回傳樹的根節點列表
        console.log('userClaimTree', rootNodes);
        return rootNodes;
    });

    // 權限是否已載入
    private isLoaded = signal<boolean>(false);

    constructor(private authService: AuthService) {
        // 載入所有權限定義
        this.loadClaims();

        // 監聽登入狀態，自動載入使用者權限
        this.authService.user$();
        this.loadUserClaims();
    }

    /**
     * 載入所有權限定義
     */
    private loadClaims(): void {
        const claims = userPermissionData.claims.map(claim => ({
            id: claim.id,
            code: claim.code,
            name: claim.name,
            type: claim.type as ClaimType,
            module: claim.module,
            parentId: claim.parentId
        }));

        this.allClaims.set(claims);
    }

    /**
     * 載入當前使用者的權限
     */
    loadUserClaims(): void {
        const user = this.authService.getCurrentUser();

        if (!user) {
            this.userClaimIds.set([]);
            this.isLoaded.set(false);
            return;
        }

        // 從 userPermission.json 中查找該使用者的權限
        const userClaimRelations = userPermissionData.userClaims.filter(
            uc => uc.userId === user.id
        );

        const claimIds = userClaimRelations.map(uc => uc.claimId);
        this.userClaimIds.set(claimIds);
        this.isLoaded.set(true);
    }

    /**
     * 核心方法：檢查是否有指定的權限
     * @param claimCode 權限代碼，例如 'BASIC_SYSTEM_LOG_VIEW'
     */
    hasClaim(claimCode: string): boolean {
        const claim = this.allClaims().find(c => c.code === claimCode);
        if (!claim) {
            console.warn(`權限代碼 ${claimCode} 不存在`);
            return false;
        }
        return this.userClaimIds().includes(claim.id);
    }

    /**
     * 檢查權限是否已載入
     */
    isPermissionLoaded(): boolean {
        return this.isLoaded();
    }

    /**
     * 清除使用者權限（登出時使用）
     */
    clearUserClaims(): void {
        this.userClaimIds.set([]);
        this.isLoaded.set(false);
    }

    /**
     * Debug 用：印出當前使用者的所有權限
     */
    debugPrintUserClaims(): void {
        console.group('🔐 使用者權限列表');
        console.log('使用者:', this.authService.getCurrentUser());
        console.log('權限數量:', this.userClaims().length);
        console.table(this.userClaims());
        console.groupEnd();
    }
}
```

Service 處理完後，就應該要拿到所有 Auth & Route 需要使用到的資料了

### Route

再來處理 route 的部分，angular 套件有提供 canActivate 屬性當作路由守衛

app.routes.ts

```ts
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { Unauthorized } from './pages/unauthorized/unauthorized';
import { ROUTE_CONFIGS, convertToRoutes } from './core/config/route.config';
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
        canActivate: [authGuard],  // 需要登入才能訪問
        children: [
            {
                path: 'basic-system/log',
                requiredClaim: ClaimCode.BASIC_SYSTEM_LOG,
                loadComponent: () => import('../../features/basic-system/system-log.component')
                    .then(m => m.SystemLogComponent),
            },
            {
                path: 'external-system/vendor-data',
                canActivate: [permissionGuard], // 需要有權限才能訪問
                requiredClaim: ClaimCode.EXTERNAL_SYSTEM_VENDOR_DATA,
                loadComponent: () => import('../../features/external-system/vendor-data.component')
                    .then(m => m.VendorDataComponent),
                reuseRoute: true
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
```

### Guard

注入 Service 檢查登入 & 權限狀態來實作二個守衛， authGuard 失敗跳轉到登入頁面、permissionGuard 失敗跳轉到未授權畫面。

```ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PermissionService } from '../services/permission.service';

/**
 * 路由守衛 - 檢查使用者是否已登入
 */
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // 檢查是否已登入
    if (authService.isAuthenticated()) {
        return true;  // 允許訪問
    }

    // 未登入，導向登入頁
    console.log('未登入，導向登入頁');
    return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }  // 記住原本要去的頁面
    });
};

/**
 * 權限守衛 - 檢查使用者
 */
export const permissionGuard: CanActivateFn = (route, state) => {
    const permissionService = inject(PermissionService);
    const router = inject(Router);

    // 從 route data 取得所需的權限代碼
    // children: [
    // {
    //     path: 'basic-system/log',
    //     requiredClaim: ClaimCode.BASIC_SYSTEM_LOG,
    // },
    const requiredClaim = route.data['requiredClaim'] as string;

    // 檢查使用者是否有所需權限
    if (permissionService.hasClaim(requiredClaim)) {
        return true;
    }

    // 沒有權限，導向未授權頁面
    console.log(`沒有權限訪問此頁面，需要權限: ${requiredClaim}`);
    return router.createUrlTree(['/unauthorized']);
};


```

這邊做好可以先純輸入 URL 測試 route 功能，剩下就是看要怎麼整理數據，集中管理轉給 Component render
