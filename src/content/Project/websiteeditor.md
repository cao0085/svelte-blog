---
title: "Website Editor"
date: "2025-10-30"
category: "software"
subCategory: "專案"
tags: ["electron", "web", "local-editor"]
slug: "websiteeditor"
---

###### 基於 Electron 框架開發支援跨平台，實作一個本地端網站編輯器，解決靜態網站修改的問題

---

當客戶想對靜態網站微調時，如果沒有維護雲端伺服器和資料庫，就無法提供後台系統給客戶使用，雖然在本地 Run Server + 修改文字檔案技術上不難，但對非技術人員來說心理門檻很高，所以往往還是會陷入「無法即時預覽 → 來回修改 → 直到一方妥協」，。

以前覺得對免費仔來說是無解的問題，但有天上班開發 Windows C# 小程式突然想到：好像提供一套本地端應用程式模擬雲端後台，讓客戶可以在自己電腦上編輯和預覽網站也是個做法？

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

### 打包與部署

當編輯完成後，目前有想到二種

- 寫一個檔案匯出壓縮功能，請使用者回傳整包靜態檔案
- 直接把 KEY 寫死在 APP，客戶端觸發自動化部屬

### 小心得

因為未來是要 Mapping 給個專案使用，所以要保留很多可變動配置，整體開發下來滿複雜的，等實際上開始使用再過一次流程更新文章。
