---
title: "XLSL Excel"
date: "2025-06-22"
category: "software"
subCategory: "開發筆記"
tags: ["XLSL", "js", "Excel"]
slug: "xlsx_excel"
---
###### [xlsx 0.14.1](https://www.npmjs.com/package/xlsx/v/0.14.1?activeTab=readme)

---

### Workbook & Worksheet

單個 Workbook 實例代表一份完整的xsml檔案，Worksheet 代表一頁 xsml的分頁，都可以產多個。

```js
import XLSX from 'xlsx';

function export_xsml() {
  // Workbook 1: 包含 Sheet1
  const workbook1 = XLSX.utils.book_new();
  const sheet1 = XLSX.utils.aoa_to_sheet([['s1_1', 's1_2']]);
  XLSX.utils.book_append_sheet(workbook1, sheet1, 'sheet1');

  // Workbook 2: 包含 Sheet1、Sheet2
  const workbook2 = XLSX.utils.book_new();
  const sheet2 = XLSX.utils.aoa_to_sheet([['s2_1', 's2_2']]);
  XLSX.utils.book_append_sheet(workbook2, sheet1, 'sheet1');
  XLSX.utils.book_append_sheet(workbook2, sheet2, 'sheet2');

  // 匯出兩個檔案
  // 一個檔案一個分頁
  XLSX.writeFile(workbook1, 'learning1.xlsx');
  // 一個檔案兩個分頁
  XLSX.writeFile(workbook2, 'learning2.xlsx');
}
```

### Sheet Content

```js
// Array of Arrays, AOA
// data 放入 2 維度陣列 [[row1],[row2],[row3]...]
// [row1] => 'A1','B1','C1'....
// options => { origin: 'B2' } 指定座標
const ws_array = XLSX.utils.aoa_to_sheet(data, options);

// 每一個物件會轉成一列（row）
// key 會自動變成表頭欄位 // row1
const ws_json = XLSX.utils.json_to_sheet([
  { name: 'Alice', age: 25 }, // row2
  { name: 'Bob', age: 30 }    // row3
]);

XLSX.utils.json_to_sheet(data, {
  header: ['name', 'age'], // 明確指定欄位順序（會取代自動推斷）
  skipHeader: false,       // 是否要略過產生表頭（預設 false）
  origin: 'B2'             // 從 B2 開始填入
});

```

### Merges

指定哪些儲存格要上下合併

```js
// s = start / e = end / A1 = {x:0,y:0} / A3 = {x:2,y:0}
worksheet['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 2, c: 0 } } 
];

// 也可以指定座標
XLSX.utils.decode_range('A1:A3')

```

### 多列合併實作

- 假設有一筆一對多的資料列
- 分割/合併儲存格的方式在EXCEL上呈現

<br>

先處理資料結構

```js
const orderList = [
  {
    OrderNo: 'A001',
    Customer: '小明',
    Items: [
      { Product: '鉛筆', Quantity: 10 },
      { Product: '原子筆', Quantity: 5 }
    ]
  },
  {
    OrderNo: 'A002',
    Customer: '小美',
    Items: [
      { Product: '橡皮擦', Quantity: 3 }
    ]
  }
];


const flattenedList = orderList.flatMap(order => {
  const items = order.Items.length ? order.Items : [{}];
  return items.map((item, index) => ({
    ...order,
    ...item,
    _rowCount: items.length, // 紀錄有幾筆資料
    _isFirst: index === 0 // 添加新屬性標記
  }));
});

// 資料攤平後會
const flattenedList = [
  {
    OrderNo: 'A001',
    Customer: '小明',
    Product: '鉛筆',
    Quantity: 10,
    _rowCount: 2,
    _isFirst: true
  },
  {
    OrderNo: 'A001',
    Customer: '小明',
    Product: '原子筆',
    Quantity: 5,
    _rowCount: 2,
    _isFirst: false
  },
  {
    OrderNo: 'A002',
    Customer: '小美',
    Product: '橡皮擦',
    Quantity: 3,
    _rowCount: 1,
    _isFirst: true
  }
];
```

處理合併欄位

```js
const exportKeys = ['OrderNo', 'Customer', 'Product', 'Quantity']; // Table Header
const mergeKeys = ['OrderNo', 'Customer']; // 指定的合併欄位
const dataOffset = 1; // 指定 Y 軸起始座標
const merges = []; // 存放資料

flattenedList.forEach((row, rowIndex) => {

  // 用剛剛的 _isFirst 判斷是否為第一筆
  if (row._isFirst) {
    // 總共合併的列數
    const rowspan = row._rowCount; 
    mergeKeys.forEach((key) => {
      // 鎖定該X軸
      const colIndex = exportKeys.indexOf(key); 
      if (colIndex !== -1 && rowspan > 1) {
        // 關鍵是利用 ForEach 中的 rowIndex 保持 Y 軸該擺放的位置
        const start = XLSX.utils.encode_cell({ r: rowIndex + dataOffset, c: colIndex });
        const end = XLSX.utils.encode_cell({ r: rowIndex + dataOffset + rowspan - 1, c: colIndex });
        merges.push(`${start}:${end}`);
      }
    });
  }
});

```

完整流程

```js
import * as XLSX from 'xlsx';

// === 1. 建立 worksheet from JSON，指定欄位與起始位置 ===
const worksheet = XLSX.utils.json_to_sheet(flattenedList, {
  header: exportKeys,
  skipHeader: false,
  origin: 'A2' // 表示資料從 A2 開始填（A1 為表頭）
});

// === 2. 加入欄位表頭於 A1 ===
exportKeys.forEach((key, i) => {
  const cellRef = XLSX.utils.encode_cell({ r: 0, c: i }); // A1, B1, ...
  worksheet[cellRef] = { t: 's', v: key }; // 你可改成中文名
});

// === 3. 計算合併欄位範圍 ===
const merges = [];
flattenedList.forEach((row, rowIndex) => {
  if (row._isFirst) {
    const rowspan = row._rowCount;
    mergeKeys.forEach((key) => {
      const colIndex = exportKeys.indexOf(key);
      if (colIndex !== -1 && rowspan > 1) {
        const r1 = rowIndex + 1; // 因為 origin: 'A2'，rowIndex 0 是第2列
        const r2 = r1 + rowspan - 1;
        merges.push({ s: { r: r1, c: colIndex }, e: { r: r2, c: colIndex } });
      }
    });
  }
});
worksheet['!merges'] = merges;

// 可選：欄寬
worksheet['!cols'] = exportKeys.map(() => ({ wch: 12 }));

// === 4. 建立 workbook 並加入 worksheet ===
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// === 5. 匯出 ===
const wbout = XLSX.write(workbook, {
  bookType: 'xlsx',
  type: 'binary'
});
function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `report_${Date.now()}.xlsx`);
```
