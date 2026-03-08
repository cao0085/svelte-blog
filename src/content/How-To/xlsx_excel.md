---
title: "處理 Excel 檔案"
date: "2025-06-22"
category: "software"
subCategory: "How-To"
tags: ["xlsx", "javascript", "excel"]
slug: "excel-xlsx"
---
###### 記錄一下套件怎麼用 [xlsx 0.14.1](https://www.npmjs.com/package/xlsx/v/0.14.1?activeTab=readme)

---

### Workbook & Worksheet

`Workbook` 代表一份完整的 .xlsx 檔案，`Worksheet` 代表其中一個分頁，兩者都可以有多個。

```js
import XLSX from 'xlsx';

// Workbook 1：一個分頁
const wb1 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb1, XLSX.utils.aoa_to_sheet([['A', 'B']]), 'Sheet1');
XLSX.writeFile(wb1, 'output1.xlsx');

// Workbook 2：兩個分頁
const wb2 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet([['A', 'B']]), 'Sheet1');
XLSX.utils.book_append_sheet(wb2, XLSX.utils.aoa_to_sheet([['X', 'Y']]), 'Sheet2');
XLSX.writeFile(wb2, 'output2.xlsx');
```

---

### Sheet Content

兩種常用的資料填入方式：

```js
// AOA（Array of Arrays）：二維陣列，[row1, row2...]，每個 row 對應一列
const ws = XLSX.utils.aoa_to_sheet([
    ['Name', 'Age'],  // A1, B1
    ['Alice', 25],    // A2, B2
], { origin: 'A1' }); // 可指定起始座標

// JSON：每個物件轉成一列，key 自動成為表頭
const ws = XLSX.utils.json_to_sheet([
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
], {
    header: ['name', 'age'], // 明確指定欄位順序
    skipHeader: false,       // 是否略過表頭（預設 false）
    origin: 'A1'
});
```

---

### 儲存格合併

```js
// s = start, e = end，座標從 0 開始（r: 列, c: 欄）
// A1:A3 → r:0,c:0 到 r:2,c:0
worksheet['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } }
];

// 也可用 range 字串轉換
worksheet['!merges'] = [XLSX.utils.decode_range('A1:A3')];
```

---

### 一對多資料的多列合併

最常見的情境：一筆訂單對應多筆商品，輸出時訂單欄位要合併顯示。

**Step 1：攤平資料，標記第一列與合併數量**

```js
const orderList = [
    { OrderNo: 'A001', Customer: '小明', Items: [{ Product: '鉛筆', Qty: 10 }, { Product: '原子筆', Qty: 5 }] },
    { OrderNo: 'A002', Customer: '小美', Items: [{ Product: '橡皮擦', Qty: 3 }] }
];

const flatList = orderList.flatMap(order =>
    order.Items.map((item, i) => ({
        ...order,
        ...item,
        _rowCount: order.Items.length,
        _isFirst: i === 0
    }))
);
// 結果：A001 展開成 2 列，A002 展開成 1 列
```

**Step 2：計算合併範圍**

```js
const exportKeys = ['OrderNo', 'Customer', 'Product', 'Qty'];
const mergeKeys  = ['OrderNo', 'Customer']; // 這兩欄需要合併
const dataOffset = 1; // A1 是表頭，資料從第 2 列開始

const merges = [];
flatList.forEach((row, rowIndex) => {
    if (!row._isFirst) return;
    mergeKeys.forEach(key => {
        const colIndex = exportKeys.indexOf(key);
        if (colIndex === -1 || row._rowCount <= 1) return;
        merges.push({
            s: { r: rowIndex + dataOffset, c: colIndex },
            e: { r: rowIndex + dataOffset + row._rowCount - 1, c: colIndex }
        });
    });
});
```

**Step 3：完整輸出**

```js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const worksheet = XLSX.utils.json_to_sheet(flatList, {
    header: exportKeys,
    skipHeader: false,
    origin: 'A2'
});

// 手動寫入表頭（A1 列）
exportKeys.forEach((key, i) => {
    worksheet[XLSX.utils.encode_cell({ r: 0, c: i })] = { t: 's', v: key };
});

worksheet['!merges'] = merges;
worksheet['!cols'] = exportKeys.map(() => ({ wch: 14 })); // 欄寬

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
const buf = new ArrayBuffer(wbout.length);
const view = new Uint8Array(buf);
for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xff;

saveAs(new Blob([buf], { type: 'application/octet-stream' }), `report_${Date.now()}.xlsx`);
```
