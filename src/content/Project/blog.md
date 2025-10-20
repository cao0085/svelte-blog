---
title: "Svelte Blog"
date: "2025-05-05"
category: "software"
subCategory: "專案"
tags: ["svelte", "blog", "markdown"]
slug: "Svelte Blog"
---

###### 用 Svelte 做一個類似 Jekyll 的靜態生成網站 (你正在閱讀的)，提供 [Repository](https://github.com/cao0085/svelte-blog)

---

我第一個程式專案就是套Jekyll + GitHub Pages 來部屬網站，朋友推薦可以玩玩看 Svelte，就想說順手把Blog 搬過來，再加上聽說靜態頁面搜尋引擎會比較友善，決定拿來就架一個文章模板網站試試。

### 前端用混合式靜態預渲染

- CSR（Client-Side Rendering）：客戶端動態載入 Markdown 轉換的 Svelte 組件
- SSG（Static Site Generation）：構建時預渲染所有文章頁面

```markdown
檔案系統對應：
src/routes/
├── +layout.svelte              # 全局布局（Header）
└── article/                    # 子路由目錄
    ├── +layout.svelte          # 文章專用布局（側邊欄 + 內容區）
    ├── +page.svelte            # /article 列表頁
    └── [slug]/                 # 動態路由段落
        ├── +page.svelte        # 文章內容頁（渲染組件）
        └── +page.ts            # 預渲染配置
```

```markdown
構建階段 (npm run build)
  ↓
掃描 src/content/**/*.md
  ↓
提取每個 Markdown 的 metadata.slug
  ↓
生成對應的靜態 HTML 頁面
  ↓
輸出到 build/blog/{slug}.html
```

也就是說構建(打包)時，SvelteKit 會：
1. 從 `+page.ts` 的 `entries()` 函數取得所有文章的 slug 列表
2. 為每個 slug 預渲染一個靜態 HTML 檔案（例如：`build/blog/db_sql.html`）
3. 這些檔案路徑與 URL 路徑完全對應（`/article/db_sql` → `blog/db_sql.html`）

使用者訪問時：
1. 瀏覽器請求 `/article/db_sql`
2. 伺服器直接回傳已經預渲染好的 `blog/db_sql.html`（含完整內容）
3. 頁面載入後，SvelteKit 接管路由（Hydration），後續點擊文章連結變成客戶端導航


### 自動化流程

因為應用是單純的文字紀錄，所以設計成每次 Push 到 Master 就可以用 Github Action 自動執行打包，然後輸出檔案放在另一個分支。

- master (主程式碼)
- gh-pages (打包檔案)

根目錄配置 /.github/workflows/deploy.yml

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

permissions:
  contents: write  # ⬅加上這行，否則會 403 push error

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Build the site
        run:  npm run build
        env:
          NODE_ENV: production

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          publish_branch: gh-pages
          cname: blog.yoshikagehub.com
```


### 部屬

之前都是用 Github Pages 直接用，這次因為路徑想改用 CloudFlare 上買的 Domain ，所以改成用 CloudFlare 連接 Github Repository 指定分支，那 CloudFlare 就會自動路由