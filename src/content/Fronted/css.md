---
title: " Html Element & CSS 參考標準"
date: "2025-08-04"
category: "software"
subCategory: "Frontend"
tags: ["css", "fronted", "web"]
slug: "css"
---
###### [U.S. Web Design System](https://designsystem.digital.gov/)

---

### HTML Element

Head

- title: 瀏覽器分頁標題/分頁名稱
- meta: 後台資訊(瀏覽器、搜尋引擎)
- script: 載入或內嵌 JavaScript
- base: 設定文件中的相對 URL 基準
- style: 內嵌 CSS

Body

- a: 超連結
- section: 用來區分區域，內部預設垂直排列
- nav: 應用中的主要導航 `<nav> -> <ul> -> <li>`
- article: 能包裹獨立內容片段
- aside: 略相關、額外內容和連結
- hgroup: 把一組標題相關的元素包成一組
- header: 某個區塊或整個頁面的開頭區域
- footer: 某個區塊或整個頁面的結尾區域
- address: 標記聯絡方式

### CSS

選擇器

- 基本選擇器: */element/ID/.class/#id/element1, element2
- 屬性選擇器: img[alt^="film"] → alt 開頭是 film 的圖片
- 結構性選擇器: :first-child、:last-child ...
- 偽元素選擇器: ::first-letter、::first-line、::before

### 字體

- 內文通常預設 16px，稍大抓 16~22px，提示文字抓 13~15px
- 行高用無單位倍率表示，標準為 16px 配 1.5 行高 => 24px (16*1.5)
  - 14px -> 1.5
  - 16px -> 1.5 ~ 1.65
  - 20px -> 需稍降行高（避免太鬆）
- 文字排版設定為左對齊
- 單行適合閱讀 45-90 字元，長文抓 66 字元 (行高抓高可以塞多一點字)
- 段落間距抓 1em ~ 1.5em
- 清單項目間距抓 0.5em
- 標題空白策略：上大、下小 → 上方 ≥ 1.5 × 下方
- 字距不隨意更動

[完整文章](https://designsystem.digital.gov/components/typography/?utm_source=chatgpt.com)

### 百分比設計

目標 ÷ 上下文 = %

```CSS
/* 固定寬版：設計師給的初稿 */
.wrapper        { width: 960px; margin: 0 auto; }
.wrapper .box   { width: 300px; }

/* → 轉為百分比（RWD 版）*/
.wrapper        { max-width: 100%;  /* 容器本身可縮放 */ }
.wrapper .box   { width: 31.25%; }  /* 300 / 960 ×100 */

/* 以下元素（wrapper 的子層）皆以 wrapper = 960px 為上下文 */
.element {
  /* 固定版 */
  padding: 10px;
  margin: 10px;
}

/* RWD 版（百分比化）*/
.element {
  padding: 1.0416667%;  /* 10 / 960 ×100 */
  margin: 1.0416667%;
}
```
