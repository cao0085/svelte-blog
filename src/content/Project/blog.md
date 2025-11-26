---
title: "Svelte Blog"
date: "2025-09-09"
category: "software"
subCategory: "專案"
tags: ["svelte", "blog", "markdown"]
slug: "svelteblog"
---

###### 用 Svelte 做一個類似 Jekyll 的 Markdown 語法生成網站 (你正在閱讀的)，提供 [Repository](https://github.com/cao0085/svelte-blog) 參考

---

我第一個專案就是套 Jekyll + GitHub Pages 架 Blog ，有朋友推薦可以玩玩看 Svelte，就決定拿來就架一個文章模板網站，也順手把 Blog 搬過來。

### 專案架構評估

有傳說搜尋引擎對於靜態 HTML 的權重比較高，所以推薦文字內容為主的網站使用靜態網站的形式，但傳統靜態網站的缺點是需要維護多張 HTML、切換頁面都需要發送網路請求。

而另一種主流 SPA (Single Page Application) 的優勢是首次載入後，後續切換頁面完全由 JavaScript 在記憶體中處理，缺點就是搜尋引擎可能只看到空白的 HTML 殼。

要結合上述的優點就是要

- 首次訪問返回完整 HTML (SEO 友善 + 快速顯示)
- 後續在站內切換文章，由使用端觸發 JavaScript 操作 (SPA 體驗)

需求聽起來矛盾，但是基本上就是預先準備好 N 份 JavaScript 一樣 + 不同文字的 HTML (SPA) 當作入口被訪問，常見名稱叫做【混合式渲染】`SSG（Static Site Generation）+ CSR（Client-Side Rendering）`。

你現在可以打開開發者面板觀察，在站內切換文章是不會向外部發送網路請求的。

### 混合式渲染

在 Svelte 可以用 mdsvex 套件來實踐，他提供 run build 時把你指定的 模板 + .md 輸出成 HTML。整體流程如下:

1. 構建時: 為**每篇**文章生成獨立的靜態 HTML，內含 Markdown 完整的文字內容
2. 首次訪問: 伺服器返回該路由的 HTML
3. Hydration: Svelte runtime 載入後接管頁面
4. 文章切換: 用 JS 做虛擬路由切換，後續點擊文章連結變成客戶端導航

程式碼架構

```markdown
src/routes/
├── +layout.svelte              # 全局布局（Header）
└── article/                    # 子路由目錄
    ├── +layout.svelte          # 文章專用布局（側邊欄 + 內容區）
    ├── +page.svelte            # /article 列表頁
    └── [slug]/                 # 動態路由段落
        ├── +page.svelte        # 文章內容頁（渲染組件）
        └── +page.ts            # 預渲染配置
```

.md 檔案根據程式邏輯寫一些變數屬性

```markdown
---
title: "Render 範本"
date: "2025-06-22"
category:
subCategory:
tags: ["svelte", "blog", "markdown"]
slug: "example"
---
... ... ... ... 文章內容
---
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

也就是說構建(打包)時會：
1. 從 `+page.ts` 的 `entries()` 函數取得所有文章的 slug 列表
2. 為每個 slug 預渲染一個靜態 HTML 檔案（例如：`build/blog/db_sql.html`）
3. 這些檔案路徑會要與 URL 路徑完全對應（`/article/db_sql` → `blog/db_sql.html`）

需要注意的就是路徑配置， run build 時的靜態檔案路徑；虛擬路由的路徑和攔截；部屬正式環境的 Domain 有沒有替換正確。

### 自動化流程

因為網站目前是單純的文字紀錄，所以設計成每次 Push 到 Master 就可以用 Github Action 自動執行程式碼，然後輸出檔案放在另一個分支。原理是推上 RP 時候會自動檢查 /.github/workflows 有無檔案並自動執行。

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
  contents: write  # ⬅加上這行，否則會 403 push error?

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

這邊就是設定 Github Pages 檔案來源指向分支 gh-pages ，然後去 Cloudflare 買好 Domain 在 Pages Setting 替換訪問路徑。

還有另一個做法是在 Cloudflare 開一個入口，而資源指向 Repository 指定分支，Cloudflare 就會去讀取該檔案來源部屬，好處是 github rp 就不用公開了。
