---
title: "HTTP - HttpClient & HttpResource"
date: "2025-11-22"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "route"]
slug: "angular_http"
---
###### Angular 內建的兩種 HTTP 工具 HttpClient & HttpResource

---

#### HttpClient

基於 RxJS Observable 可搭配 `pipe()` operator 處理資料流。非 2XX 的回應會自動拋出錯誤，需手動 `subscribe()` 或搭配 `async pipe` 觸發。

#### HttpResource

Angular 新推出的 Signal-based API，當依賴的 Signal 變化時自動重新請求，回傳 Resource 物件，包含 `value()`、`status()`、`error()` 等 Signal 屬性。

```ts
// HttpClient 寫法
this.http.get('/api/users').pipe(
  catchError(err => of([]))
).subscribe(data => this.users = data);

// HttpResource 寫法 - searchQuery 變化時自動觸發新請求
searchQuery = signal('');
results = httpResource(() => `/api/search?q=${this.searchQuery()}`);
```

### 實作策略

在專案中統一管理 API 請求，設計原則如下：

1. `HttpResource` 只用於 GET，處理會隨 Signal 自動更新的資料（權限表、個人資料等）
2. `HttpClient` 處理其餘所有操作，特定錯誤可以在 Service 層統一攔截，業務邏輯由外部處理
3. 以繼承的方式對應不同 Domain，各 Domain Service 只需覆寫 `baseUrl`

有特殊需求時，可直接注入對應的 Domain Service 並在元件層額外實作。

```ts
import { Injectable, resource, Signal } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * 基礎 API Service
 * 可直接使用（需要完整 URL）或繼承使用（自動帶 base URL）
 */
@Injectable({
    providedIn: 'root'
})
export class BaseApiService {
    // 子類可以覆蓋這個屬性來設定預設的 base URL
    protected baseUrl = '';

    constructor(protected http: HttpClient) { }

    /**
     * 構建完整 URL
     * 如果有 baseUrl 則自動拼接，否則直接使用傳入的 url
     */
    protected buildUrl(path: string): string {
        if (!this.baseUrl) {
            return path;
        }
        // 確保不會有雙斜線
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${this.baseUrl}${normalizedPath}`;
    }

    // ========================================
    // HttpResource - 只用於 GET（讀取數據，自動響應變化）
    // ========================================

    /**
     * 創建 GET Resource - 自動追蹤數據變化
     * @param url - API 端點 (使用 Signal)
     * @param params - 查詢參數（可選，使用 Signal）
     */
    createGetResource<T>(
        url: Signal<string>,
        params?: Signal<Record<string, string>>
    ) {
        return resource({
            loader: async () => {
                const currentUrl = url();
                const currentParams = params?.();
                const queryString = currentParams
                    ? '?' + new URLSearchParams(currentParams).toString()
                    : '';

                const fullUrl = this.buildUrl(currentUrl);
                const response = await fetch(`${fullUrl}${queryString}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    await this.handleFetchError(response);
                }

                return await response.json() as T;
            }
        });
    }

    // ========================================
    // HttpClient - 用於所有操作（GET/POST/PUT/PATCH/DELETE）
    // ========================================

    get<T>(url: string, params?: HttpParams): Observable<T> {
        const fullUrl = this.buildUrl(url);
        return this.http.get<T>(fullUrl, { params }).pipe(
            catchError(error => this.handleHttpClientError(error))
        );
    }

    post<T>(url: string, data: any): Observable<T> {
        const fullUrl = this.buildUrl(url);
        return this.http.post<T>(fullUrl, data).pipe(
            catchError(error => this.handleHttpClientError(error))
        );
    }

    put<T>(url: string, data: any): Observable<T> {
        const fullUrl = this.buildUrl(url);
        return this.http.put<T>(fullUrl, data).pipe(
            catchError(error => this.handleHttpClientError(error))
        );
    }

    patch<T>(url: string, data: any): Observable<T> {
        const fullUrl = this.buildUrl(url);
        return this.http.patch<T>(fullUrl, data).pipe(
            catchError(error => this.handleHttpClientError(error))
        );
    }

    delete<T>(url: string): Observable<T> {
        const fullUrl = this.buildUrl(url);
        return this.http.delete<T>(fullUrl).pipe(
            catchError(error => this.handleHttpClientError(error))
        );
    }

    // ========================================
    // 錯誤處理 - 只處理通用錯誤
    // ========================================

    private async handleFetchError(response: Response): Promise<never> {
        const status = response.status;
        this.handleGlobalError(status);
        throw new Error(`HTTP Error: ${status} - ${response.statusText}`);
    }

    private handleHttpClientError(error: HttpErrorResponse): Observable<never> {
        this.handleGlobalError(error.status);
        console.error('API Error:', error);
        return throwError(() => error);
    }

    /**
     * 通用錯誤處理
     * 只處理全局性錯誤：認證、權限、服務器錯誤、網絡錯誤
     */
    private handleGlobalError(status: number): void {
        switch (status) {
            case 401:
                console.error('[Global Error] 未授權：登入已過期，請重新登入');
                break;
            case 403:
                console.error('[Global Error] 無權限：您沒有權限執行此操作');
                break;
            case 500:
            case 502:
            case 503:
                console.error('[Global Error] 服務器錯誤：請稍後再試');
                break;
            case 0:
                console.error('[Global Error] 網絡錯誤：請檢查網絡連線');
                break;
            // 其他錯誤（400, 404, 409 等）交給外部業務邏輯處理
        }
    }
}

// ========================================
// Domain Services - 各 Domain 繼承 BaseApiService 並覆寫 baseUrl
// ========================================

@Injectable({ providedIn: 'root' })
export class Domain1ApiService extends BaseApiService {
    protected override baseUrl = environment.apiUrls.npcsDomain;
}

@Injectable({ providedIn: 'root' })
export class Domain2ApiService extends BaseApiService {
    protected override baseUrl = environment.apiUrls.domain2;
}

@Injectable({ providedIn: 'root' })
export class Domain3ApiService extends BaseApiService {
    protected override baseUrl = environment.apiUrls.domain3;
}

@Injectable({ providedIn: 'root' })
export class Domain4ApiService extends BaseApiService {
    protected override baseUrl = environment.apiUrls.domain4;
}
```
