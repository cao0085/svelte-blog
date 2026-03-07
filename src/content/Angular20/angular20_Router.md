---
title: "Router Basic"
date: "2025-10-30"
category: "software"
subCategory: "Angular20"
tags: ["route", "angular", "api"]
slug: "angular_router"
---
###### 可以參考這個[專案範本](https://github.com/mbejda/AngularFire-Starter-Template)、官方文件學習

---

### Entry

Angular SPA 的進入點 `index.html` 中的 `<base href="/">` 讓路由系統正確解析 URL。

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

根元件 `AppComponent` 透過 `<router-outlet>` 作為路由渲染的佔位符，根據當前 URL 動態替換顯示的元件。

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
```

### Routes

每個 Route 物件定義 `path` 與對應元件的映射，Angular 依序比對 URL 決定渲染哪個元件。

```ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@features/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'form',
        loadComponent: () =>
          import('@features/form/form.component').then(m => m.FormComponent),
      },
    ]
  },
];
```

加入 `children` 後，父層元件的樣板中也需要放置 `<router-outlet>`，作為子路由的渲染位置。

```ts
import { Component } from '@angular/core';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidePanelComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {}
```

```html
<div class="app-container">
  <app-side-panel class="side"></app-side-panel>

  <div class="main">
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer class="footer"></app-footer>
  </div>
</div>
```

### Guard

`canActivate` 在路由執行前的守衛邏輯，可用來控制頁面存取權限。路由設定會依序比對，需注意順序。

```ts
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {AlertsComponent} from './pages/alerts/alerts.component';
import {ButtonsComponent} from './pages/buttons/buttons.component';
import {authGuard} from './guards/auth.guard';
import {logoutGuard} from './guards/logout.guard';

export const routes: Routes = [
  // Path mapping 會照順序檢查
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'buttons', component: ButtonsComponent }
    ]
  },
  {
    path: 'logout',
    canActivate: [logoutGuard],
    component: LoginComponent
  },
  { path: '**', redirectTo: 'login' }
];
```
