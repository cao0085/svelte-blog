---
title: "生成 PDF"
date: "2025-06-22"
category: "software"
subCategory: "How-To"
tags: ["pdf", "javascript", "frontend"]
slug: "pdf-download"
---
###### Web前端常見的需求，套件容易有意外的 Bug ，需要精確的話建議用程式碼描述的方式產出。 [程式碼](https://github.com/cao0085/code-pattern/tree/main/fronted-pdf-download)

---

### DOM Capture（html2canvas、dom-to-image）

適合「版面已用 HTML/CSS 排好，直接輸出成圖」的情境，例如報表預覽、收據列印。

原理是用 `document.querySelector()` 抓取指定 DOM，在套件內部模擬瀏覽器排版引擎，繪製到 `<canvas>` 後轉成 base64 / Blob 輸出。優點是不需要重新描述排版邏輯，缺點是：
- 複雜版面容易跑版（套件模擬不保證 100% 一致）
- 外部資源（跨域圖片、自訂字體）受瀏覽器 Canvas 安全限制
- 錯誤發生在套件內部，除錯困難

### Programmatic（jsPDF、pdf-lib）

適合「用程式動態組合內容」的情境，例如依資料生成報告、加浮水印、合併多頁。

用程式碼直接描述文字、格線、圖片位置，不依賴 DOM，可控性高，但需要自己處理排版邏輯。外部資源（圖片、字體）建議預先轉為 base64 再傳入，避免套件內轉換失敗。

---

### jsPDF 實作

#### 字體載入

有兩種方式，建議用 Lazy Import，避免字型檔（通常數 MB）影響初始載入：

**方式一：直接讀取 .ttf**
```js
pdfDoc.addFont('./eduSong_Unicode.ttf', 'eduSong_Unicode', 'normal');
pdfDoc.setFont('eduSong_Unicode', 'normal');
```

**方式二：.ttf 轉 .js，Lazy Import（推薦）**
```js
async ensurePdfLib() {
    if (this.pdfReady) return this.pdfReady;

    this.pdfReady = Promise.all([
        import(/* webpackChunkName:"pdf-bundle" */ 'jspdf'),
        import(/* webpackChunkName:"pdf-bundle" */ '@/assets/fonts/eduSong_Unicode-normal.js')
    ]).then(([mod]) => mod.jsPDF || mod.default);

    return this.pdfReady;
}
```

---

#### 圖片轉 Base64

外部圖片需先轉成 Base64 Data URL，再透過 Canvas 交給 jsPDF：

```js
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

const img = await loadImage(targetImage);

const canvas = document.createElement('canvas');
canvas.width = img.naturalWidth;
canvas.height = img.naturalHeight;
canvas.getContext('2d').drawImage(img, 0, 0);
const dataUrl = canvas.toDataURL('image/jpeg', 1.0);

// 加入 PDF 當底稿（A4：210 x 297 mm）
pdfDoc.addImage(dataUrl, 'JPEG', 0, 0, 210, 297);
```

---

#### 輸出

```js
// 直接下載
pdfDoc.save('fileName.pdf');

// 或取得 Blob，插入 DOM 預覽
const blob = pdfDoc.output('blob');
const pdfUrl = URL.createObjectURL(blob);
```
