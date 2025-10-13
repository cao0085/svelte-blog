---
title: "Electron With WebContentsView"
date: "2025-10-12"
category: "software"
subCategory: "Frontend"
tags: ["Electron", "fronted", "web"]
slug: "electron-01"
---
###### 用 Electron 的 WebContentsView 實作編輯器

---

### 主要架構

Electron 基於 **Node.js** 和 **Chromium** 建構而成：
- Node.js：提供後端能力，可以存取檔案系統、作業系統 API 等原生功能
- Chromium：負責渲染使用者界面，提供現代化的網頁技術支援
- 主進程 (Main Process)：負責管理應用程式生命週期、建立視窗、處理系統事件
- 渲染進程 (Renderer Process)：每個視窗或 WebContentsView 都運行在獨立的渲染進程中

### WebContentsView
可以想像成一個獨立的瀏覽器分頁：
- 每個 View 運行在獨立的渲染進程中
- 進程之間互相隔離，提升穩定性與安全性
- 各自維護獨立的狀態，不會互相干擾
- 適合用於建立多文件編輯器、分頁瀏覽器等應用

<br>

困難的地方在於模組化 WebContentsView 的配置與切換，基本設定流程會是

```js
async function createWCV(viewType, isIntegration = false, isIsolation= true) {

  if(!(viewType in WEBVIEW_SOURCE)) {
    return null;
  }

  const viewConfig = WEBVIEW_SOURCE[viewType]
  const contentsView = new WebContentsView({
      webPreferences: {
          nodeIntegration: isIntegration,
          contextIsolation: isIsolation,
          preload: viewConfig.preload || undefined
      }
  });

  contentsView.setVisible(false);
  contentsView.webContents.once('did-finish-load', () => {
    console.log('Content WebContentsView finished loading');
  });
  contentsView.webContents.once('dom-ready', () => {
    console.log('Content WebContentsView DOM ready');
  });

  // SOURCE_TYPES
  const {LOCAL_HTML, REMOTE_URL, SERVER_URL, EMBEDDED} = SOURCE_TYPES
  const srcPath = viewConfig.path;
  const srcType = viewConfig.srcType;
  const isSingleton = viewConfig.singleton || false;
  switch (srcType) {
    case LOCAL_HTML:
      await contentsView.webContents.loadFile(srcPath);
      break;
    case REMOTE_URL:
    case SERVER_URL:
      await contentsView.webContents.loadURL(srcPath);
      break;
    case EMBEDDED:
      break;
    default:
      console.log('FC:CreateWCView Error => Not Define SrcType');
      return null;
  }

  // 自訂義辨識屬性
  contentsView._inAppCustomType = viewType
  contentsView._isSingleton = isSingleton

  return contentsView;// WebContentsView Instance
}
```

完成後，整體架構會類似前端框架的 Router 系統，每個 WebContentsView 定義了該頁面使用的資源來源。困難點是**規格定義**與**實例管理**，例如

- 編輯器視圖（多實例）：允許同時開啟多個編輯器，每個編輯不同的檔案
- 預覽視圖（單實例）：整個應用只能存在一個預覽畫面，確保客戶端是看到最新渲染


也就是要解決以下問題：

- 實例標記：如何標記某個 View 類型是單例（Singleton）還是多例
- 防呆機制：如何防止創建重複的單例 View
- 實例查找：呼叫時如何確保取得正確的 View 實例
- 生命週期管理：如何追蹤和清理不再使用的 View

目前我是用透過 `_isSingleton` 和 `_inAppCustomType` 來自訂屬性來標記 View，有點卡卡以後可能會再更新

<br>

### Inter-Process Communication

基於安全性考量，Renderer Process 運行在沙盒環境中，無法直接存取系統資源。當需要執行特權操作（如檔案讀寫、系統 API 呼叫）時，必須透過 IPC 與 Main Process 通信。而實踐的方式類似前端的全域資料管理，都是透過**統一的接口**來管理和存取共享資源。

<br>

React 為例：

- 整個應用共用一個 Singleton Data（例如 Context 或 Redux Store）
- 需要提供 `update` API 讓元件更新資料
- 某個 Renderer View 要使用時，就要 `import` 或透過事件反向 callback 注入

<br>

Electron IPC：
- Main Process 管理共享資料和特權操作
- 提供 IPC 通道（channel）讓 Renderer Process 請求或更新資料
- Renderer Process 透過 `ipcRenderer.invoke()` 發送請求
- Main Process 透過 `ipcMain.handle()` 處理請求並回傳結果
