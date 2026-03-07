---
title: "HTTP - RxJS Observable"
date: "2025-11-23"
category: "software"
subCategory: "Angular20"
tags: ["http", "angular", "api"]
slug: "angular_http_observable"
---
###### Angular 內建整合 RxJS，Observable 是處理非同步資料流的核心物件，也是 HttpClient 的預設回傳型別。

---

`pipe()` 將多個 operator 串接成處理鏈，每個 operator 負責一個步驟，資料依序流過：

```ts
this.http.get('/api/getExportData')
  .pipe(
    switchMap(data => {
      console.log('step1 response:', data);
      const filename = 'report.pdf';
      return of(filename); // of() 傳遞參數給下一個 operator
    }),
    switchMap((filename) => {
      console.log('step2 filename:', filename);
      return this.http.post('/api/confirmDownloaded', { file: filename });
    })
  )
  .subscribe(result => {
    console.log('全部流程完成', result);
  });
```

### 常見 Operator

| Operator           | 用途說明                                           |
| ------------------ | -------------------------------------------------- |
| `map()`            | 資料轉換，取出你要的欄位、格式化資料               |
| `tap()`            | 執行副作用（不改變資料），常用來 `console.log`、設定 loading |
| `switchMap()`      | 用一筆資料觸發下一個 Observable，並自動取消舊的    |
| `mergeMap()`       | 觸發下一個 Observable，但不取消前一筆（適合併發） |
| `catchError()`     | 錯誤處理，不讓錯誤中斷整個流程                     |
| `finalize()`       | 無論成功／失敗，最後一定會執行（常用來清除狀態）   |
| `retry(n)`         | API 失敗時自動重試 n 次                            |
| `timeout(ms)`      | 若 Observable 超過時間未完成，自動拋出錯誤         |
| `debounceTime(ms)` | 等使用者輸入穩定後才送出請求（防抖）               |

實際使用時通常會組合多個 operator：

```ts
this.api.get<any>('/api/users')
  .pipe(
    tap(() => this.loading = true),          // 顯示 loading

    map(res => res.data),                    // 取出需要的資料

    retry(2),                                // 失敗時最多重試 2 次

    timeout(5000),                           // 超過 5 秒報錯

    catchError(err => {                      // 攔截錯誤，避免流程中止
      this.toast.error('API 失敗');
      return of([]);                         // 回傳預設空陣列，保持 UI 正常
    }),

    finalize(() => this.loading = false)     // 成功或失敗都關閉 loading
  )
  .subscribe(data => {
    this.users = data;
  });
```