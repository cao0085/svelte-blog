---
title: "Angular Basic _ Route"
date: "2025-06-22"
category: "software"
subCategory: "Frontend"
tags: ["route", "angular", "api"]
slug: "angular_router"
---
###### 參考這個[專案範本](https://github.com/mbejda/AngularFire-Starter-Template)、官方文件學習

---

專案起始 index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyAngular18App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

元件去抓專案的根節點，render的內容用`<router-outlet>`佔位

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

Route

設定該路由(Path) `<router-outlet>`映射的元件

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
      },      {
        path: 'form',
        loadComponent: () =>
          import('@features/form/form.component').then(m => m.FormComponent),
      },
    ]
  },
];
```

且若添加 children 屬性擇該 映射的元件 裡面也可以再放一個佔位

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

### Route順序和路由守衛

Angular自帶跳轉和瀏覽權限設定，可自行放入`canActivate[]`裡面做邏輯判斷

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
    canActivate:[authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'alerts', component: AlertsComponent },
      { path: 'buttons', component: ButtonsComponent }
    ]
  },
  {
    path: 'logout',
    canActivate:[logoutGuard],
    component:LoginComponent
  },
  { path: '**', redirectTo: 'login' }
];
```