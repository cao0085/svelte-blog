---
title: "Website Previewer"
date: "2025-10-21"
category: "software"
subCategory: "專案"
tags: ["react", "typescript", "redux"]
slug: "base-web-design"
---

###### 用 React + TypeScript + Vite 建立自己習慣的專案架構

---

主要是每次要做新網站，都要重複安裝一些套件和狀態管理設計，所以決定設計成一個整合型範本專案。好處是這個專案可以一直留著當作母版範本持續優化，同時當需要正式部屬時開時，複製一份範本再刪掉不需要的 views 就能脫鉤成為全新的獨立專案。

### 專案架構

```markdown
src/
├── App.tsx                      # 應用程式主入口
├── routes.tsx                   # 路由配置
├── main.tsx                     # React DOM 渲染入口
├── components/                  # 共用元件
│   └── MainLayout.tsx          # 主要布局元件
├── views/                       # 頁面元件
│   ├── index.tsx               # 首頁
│   ├── category_1/             # 分類頁面 1
│   ├── category_2/             # 分類頁面 2
│   └── BrandPage/              # 品牌頁面
│       ├── index.tsx           # 主頁面
│       └── css/                # CSS 設計預覽
│           └── design-preview.tsx
├── store/                       # Redux 狀態管理
│   ├── store.tsx               # Store 配置
│   └── slices/                 # State Slices
│       ├── userSlice.ts        # 使用者狀態
│       ├── viewsSlice.ts       # 視圖狀態（主題等）
│       ├── languageSlice.ts    # 語言狀態
│       └── playerSlice.ts      # 播放器狀態
├── i18n/                        # 國際化配置
│   └── index.ts                # i18next 初始化
├── api/                         # API 層
│   └── baseAPI.ts              # 基礎 API 配置
├── assets/                      # 靜態資源
│   ├── svgIcon/                # SVG 圖標元件
│   │   ├── Earth.tsx           # 地球圖標
│   │   └── Pause.tsx           # 暫停圖標
│   └── react.svg
├── css/                         # 樣式檔案
│   ├── theme.module.css        # 主題樣式（Design Tokens）
│   └── views/                  # 頁面專用樣式
│       └── HomePage.module.css
└── constants/                   # 常數配置
    └── env.ts                  # 環境變數
```

簡單來說就是一套自己慣用的 Template 類似 `npm create xxxxx`，然後每個 view/page 視為一個專案有自己的 index + css + 共用靜態資源與 JS 程式碼。

### 程式碼實踐

紀錄一下套件使用

Redux Toolkit 進行狀態管理

```typescript
// store 配置範例
export const store = configureStore({
  reducer: {
    user: userReducer,
    views: viewsReducer,
    language: languageReducer,
    player: playerReducer,
  },
});
```

React Router v6 的巢狀路由結構，所有頁面都包裹在 `MainLayout` 中：

```markdown
/                           # 首頁
├── category_1              # 分類頁面 1（Mix）
├── category_2              # 分類頁面 2
├── BrandPage               # 品牌頁面
├── BrandPage/css           # CSS 設計預覽頁面
└── *                       # 404 導向首頁
```

路由配置使用 `useRoutes` hook，提供更靈活的路由管理：

```typescript
const element = useRoutes(routes)
```

實作動態主題切換功能，支援 light、dark 和 system 模式：

- 主題狀態儲存在 Redux store 的 `viewsSlice` 中
- 使用 CSS Custom Properties（Design Tokens）管理主題變數
- 透過 `data-theme` 屬性動態切換主題

```typescript
// 主題切換實作
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
```

整合 i18next 提供完整的國際化支援：

- 語系檔案放在 `public/language/` 目錄
- 支援 `en`（英文）和 `zh`（中文）
- 使用 `i18next-http-backend` 動態載入語系檔案
- 透過 Redux 管理語系狀態

語系檔案結構：
```markdown
public/language/
├── en/
│   └── translation.json
└── zh/
    └── translation.json
```

使用 Axios 進行 API 請求：

- 基礎配置在 `src/api/baseAPI.ts`
- 支援環境變數配置（`src/constants/env.ts`）
- 可擴展的 API 架構設計

使用 Vite 作為建置工具，提供以下指令：

```bash
npm run dev      # 啟動開發伺服器（HMR 支援）
npm run build    # TypeScript 編譯檢查 + 打包生產版本
npm run lint     # ESLint 程式碼檢查
npm run preview  # 預覽打包後的結果
npm run deploy   # 執行建置並部署（需要 deploy.sh）
```
