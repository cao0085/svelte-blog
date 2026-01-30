---
title: "RxJS Observable"
date: "2025-11-23"
category: "software"
subCategory: "Angular20"
tags: ["http", "angular", "api"]
slug: "angular_http_observable"
---
###### RxJS Observable

---

Angular 內建整合了 RxJS 函式庫，其 Observable 物件提供很多方法可用來處理異步邏輯。另外，Angular 提供的 HttpClient 預設回傳就是 Observable 物件。

```js
this.http.get('/api/getExportData')
  // 邏輯排程
  .pipe(
    switchMap(data => {
      console.log('step1 response:', data);
      const filename = 'report.pdf';
      return of(filename); // 語法 of() 傳遞參數給下一個動作
    }),
    // Step 2. 接收參數&觸發下一隻API
    switchMap((filename) => {
      console.log('step2 filename:', filename);
      return this.http.post('/api/confirmDownloaded', { file: filename });
    })
  )
  // 觸發執行
  .subscribe(result => {
    console.log('全部流程完成', result);
  });

```

### Observable 常見 Method

| Operator           | 用途說明                                       |
| ------------------ | ------------------------------------------ |
| `map()`            | 資料轉換，取出你要的欄位、格式化資料                         |
| `tap()`            | 執行副作用（不改變資料），常用來 `console.log`, 設定 loading |
| `switchMap()`      | 用一筆資料觸發下一個 Observable，並自動取消舊的              |
| `mergeMap()`       | 觸發下一個 Observable，但不取消前一筆（適合併發）             |
| `catchError()`     | 錯誤處理，不讓錯誤中斷整個流程                            |
| `finalize()`       | 無論成功/失敗，最後一定會執行（常用來清除狀態）                   |
| `retry(n)`         | API 失敗時，自動重試 n 次                           |
| `timeout(ms)`      | 若 Observable 超過時間未完成，會自動報錯                 |
| `debounceTime(ms)` | 等使用者輸入穩定後才送出請求（防抖）                         |


```js
this.api.get<any>('/api/users')
  .pipe(
    tap(() => this.loading = true),//tap：觸發副作用（如顯示 loading）
    
    map(res => res.data),// map：轉換回傳資料結構，拿出你需要的部分
    
    retry(2),// retry：API 失敗時最多重試 2 次
    
    timeout(5000),// timeout：超過 5 秒沒回應就報錯
    
    catchError(err => { // catchError：攔截錯誤，避免流程中止
      this.toast.error('API 失敗'); 
      return of([]); // 回傳預設空陣列，保持 UI 正常
    }),
    
    finalize(() => this.loading = false) // finalize：成功或失敗都會執行，關閉 loading 狀態
  )
  .subscribe(data => {
    this.users = data; // subscribe：最終資料回來後綁定到畫面
  });

```