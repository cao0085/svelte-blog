---
title: "Website Editor"
date: "2025-10-30"
category: "software"
subCategory: "Side Project"
tags: ["electron", "web", "local-editor"]
slug: "websiteeditor"
---

###### 基於 Electron 框架開發本機程式，主要是想試跨平台程式架構會是?

---

曾幫朋友弄個宣傳活動型靜態網站，資料來源就簡單放在專案內部不額外實作 API，但任何小改動都會需要透過我修改和重新佈署。想透過 Electron 可以讀/寫本機內檔案的優勢，做一個簡單的參數編輯器看會不會方便一點。

### 專案架構

用 Electron 他基於 Chromium 引擎和 Node.js 又可以跨平台，可以簡單理解為：

- 內建瀏覽器（Chromium）：負責渲染 UI 和即時預覽
- 內建伺服器（Node.js）：處理檔案讀寫和本地服務

這個專案的核心目標是把使用門檻降低，目前編輯的部份用這樣設計：

1. 資料層：所有可編輯的內容都存放在 `data.json` 中
2. 載入方式：專案就採用類似 i18n 多語系的方式，Import 載入.json文字
3. 編輯介面：提供視覺化的編輯頁面，讓客戶透過表單修改內容，而非直接編輯 JSON 檔案

簡單理解就是 `.json = Database` / `Import = Query Db API` / `編輯 = Update Db API`

#### 核心組件

專案用 Electron - WebContentsView + IPC 實踐多進程管理，技術有點複雜可以問 AI 比較好，但大概會如下

```text
┌─────────────────────────────────────┐
│         Main Window (BrowserWindow) │
├──────────┬──────────┬───────────────┤
│ Sidebar  │  Editor  │   Previewer   │
│          │          │               │
│ • 檔案樹 │ • 編輯器 │  • 即時預覽    │
│ • 切換   │ • 內容   │  • 內建伺服器  │
└──────────┴──────────┴───────────────┘
```

然後我們的目標是讓，毫無相關的專案與此 Electron Editor 共用一份 data.json，這樣才可以修改、即時預覽和打包，所以將構建好的靜態網站專案放入指定目錄 `/Website` ，再去設定專案路徑和資料路徑
，決定 Editor 的資料來源，這邊就要考慮備份返回機制，看是要 APP Run 時直接 COPY 一份靜態檔案等等...。

```json
{
    "webProject": {
    "projectPath": "./webProject/xxxxx",
    "source": "./webProject/xxxxx/public",
    "source2": "./xxxxx" //
    },
    "serverSettings": {
    "port": 3000,
    "hotReload": true
    }
}
```

再來就是根據客戶內的需求，寫出各個小應用，例如

- A 客戶網站內有一張圖片當初是 800px*600px，那就寫一個裁切小工具讓他符合原始尺寸不跑版面
- B 客戶有音樂播放器的需求，需要轉檔或切片，那也就寫一套自動化幫他產出

總之就是去減少他們爆破網站的機率...，所以隨著時間可能會變成一個超級工具箱，根據不同客戶需求，來去決定打包輸出時的項目。

```javascript
const WCV_DEFAULT_SETTING = {
  panels: {
    'sidebar': { type: 'SIDEBAR', name: '側邊欄' },
    'editor-1': { type: 'EDITOR', name: '編輯器' },
    'previewer-1': { type: 'PREVIEWER', name: '預覽1' },
    // 'image-1': { type: 'uitity', name: '照片編輯' },
    // 'audio-1': { type: 'uitity', name: '音樂檔編輯' },
  },
  defaultView: {
    layoutMode: 'sidebar_with_main',
    sidebar: 'sidebar',
    main: 'editor-1',
  }
}
```

當編輯完成後，可以用二種方式處理

- 寫一個檔案匯出壓縮功能，請使用者回傳整包靜態檔案
- 直接把 KEY 寫死在 APP，客戶端觸發自動化部屬

### 心得

過程中可以理解連線池、主執行緒切換概念等開發 Web 時比較少碰到的東西；概念也可以延伸到做地端小工具箱和 APP 開發，整體開發下來滿複雜的，不推薦用這方式解決資料修改問題，設定好 CI/CD + 寫一份說明書比較實在!
