import{b as F,d as Kn,f as w,a as f}from"./BRBz30gx.js";import"./OqQvD7rY.js";import{a0 as Xn,h as V,a as G,j as Qn,aJ as Zn,d as W,G as ns,af as ss,ae as as,C as ts,J as M,$ as t,_ as b,a2 as n,a3 as s,aK as A}from"./0ToATJGC.js";import{r as ps}from"./DAfH7ANP.js";function a(u,e,p=!1,k=!1,o=!1){var r=u,c="";Xn(()=>{var d=Qn;if(c===(c=e()??"")){V&&G();return}if(d.nodes_start!==null&&(Zn(d.nodes_start,d.nodes_end),d.nodes_start=d.nodes_end=null),c!==""){if(V){W.data;for(var l=G(),g=l;l!==null&&(l.nodeType!==8||l.data!=="");)g=l,l=ns(l);if(l===null)throw ss(),as;F(W,g),r=ts(l);return}var i=c+"";p?i=`<svg>${i}</svg>`:k&&(i=`<math>${i}</math>`);var y=Kn(i);if((p||k)&&(y=M(y)),F(M(y),y.lastChild),p||k)for(;M(y);)r.before(M(y));else r.before(y)}})}const z={title:"RxJS Observable",date:"2025-11-23",category:"software",subCategory:"Angular20",tags:["http","angular","api"],slug:"angular_http_observable"},{title:Xt,date:Qt,category:Zt,subCategory:np,tags:sp,slug:ap}=z;var os=w('<h6>RxJS Observable</h6> <hr/> <p>Angular 內建整合了 RxJS 函式庫，其 Observable 物件提供很多方法可用來處理異步邏輯。另外，Angular 提供的 HttpClient 預設回傳就是 Observable 物件。</p> <pre class="language-js"><!></pre> <h3>Observable 常見 Method</h3> <table><thead><tr><th>Operator</th><th>用途說明</th></tr></thead><tbody><tr><td><code>map()</code></td><td>資料轉換，取出你要的欄位、格式化資料</td></tr><tr><td><code>tap()</code></td><td>執行副作用（不改變資料），常用來 <code>console.log</code>, 設定 loading</td></tr><tr><td><code>switchMap()</code></td><td>用一筆資料觸發下一個 Observable，並自動取消舊的</td></tr><tr><td><code>mergeMap()</code></td><td>觸發下一個 Observable，但不取消前一筆（適合併發）</td></tr><tr><td><code>catchError()</code></td><td>錯誤處理，不讓錯誤中斷整個流程</td></tr><tr><td><code>finalize()</code></td><td>無論成功/失敗，最後一定會執行（常用來清除狀態）</td></tr><tr><td><code>retry(n)</code></td><td>API 失敗時，自動重試 n 次</td></tr><tr><td><code>timeout(ms)</code></td><td>若 Observable 超過時間未完成，會自動報錯</td></tr><tr><td><code>debounceTime(ms)</code></td><td>等使用者輸入穩定後才送出請求（防抖）</td></tr></tbody></table> <pre class="language-js"><!></pre>',1);function es(u){var e=os(),p=t(b(e),6),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/getExportData'</span><span class="token punctuation">)</span>
  <span class="token comment">// 邏輯排程</span>
  <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
    <span class="token function">switchMap</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'step1 response:'</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> filename <span class="token operator">=</span> <span class="token string">'report.pdf'</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">of</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 語法 of() 傳遞參數給下一個動作</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token comment">// Step 2. 接收參數&amp;觸發下一隻API</span>
    <span class="token function">switchMap</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">filename</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'step2 filename:'</span><span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/api/confirmDownloaded'</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">file</span><span class="token operator">:</span> filename <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token comment">// 觸發執行</span>
  <span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">result</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'全部流程完成'</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-js"><span class="token keyword">this</span><span class="token punctuation">.</span>api<span class="token punctuation">.</span>get<span class="token operator">&lt;</span>any<span class="token operator">></span><span class="token punctuation">(</span><span class="token string">'/api/users'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
    <span class="token function">tap</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">//tap：觸發副作用（如顯示 loading）</span>
    
    <span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// map：轉換回傳資料結構，拿出你需要的部分</span>
    
    <span class="token function">retry</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// retry：API 失敗時最多重試 2 次</span>
    
    <span class="token function">timeout</span><span class="token punctuation">(</span><span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token comment">// timeout：超過 5 秒沒回應就報錯</span>
    
    <span class="token function">catchError</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span> <span class="token comment">// catchError：攔截錯誤，避免流程中止</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>toast<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'API 失敗'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token keyword">return</span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 回傳預設空陣列，保持 UI 正常</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    
    <span class="token function">finalize</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>loading <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token comment">// finalize：成功或失敗都會執行，關閉 loading 狀態</span>
  <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>users <span class="token operator">=</span> data<span class="token punctuation">;</span> <span class="token comment">// subscribe：最終資料回來後綁定到畫面</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(o),f(u,e)}const cs=Object.freeze(Object.defineProperty({__proto__:null,default:es,metadata:z},Symbol.toStringTag,{value:"Module"})),J={title:"HttpClient",date:"2025-11-22",category:"software",subCategory:"Angular20",tags:["fronted","angular","route"],slug:"angular_http"},{title:tp,date:pp,category:op,subCategory:ep,tags:cp,slug:lp}=J;var ls=w('<h6>Angular 有包好 HttpClient & HttpResource 可以直接拿來用</h6> <hr/> <p><strong><em>HttpClient</em></strong></p> <p>基於 RxJS Observable 所以可以使用物件提供的一套方法，錯誤自動透過 Observable 的 error channel 處理 2XX 外的都會拋出，需要手動 subscribe() 或搭配 async pipe 使用</p> <p><strong><em>HttpResource</em></strong></p> <p>基於 Signal 新推出 API，當依賴的 Signal 變化時自動重新請求，回傳的是 Resource 物件，包含 value()、status()、error() 等 Signal</p> <pre class="language-ts"><!></pre> <p>這邊的配置功能上</p> <ol><li>HttpResource 只做 Get( ) 用來處理 Service 類型的資料(權限表、個人資料等)</li> <li>HttpClient 、 error 做最基本，業務邏輯外部處理</li> <li>用繼承的方式處理不同 Domain 的使用場景</li></ol> <p>其餘有特殊需求就直接在該元件拿 BaseApiService + 額外實作就好</p> <pre class="language-ts"><!></pre>',1);function us(u){var e=ls(),p=t(b(e),12),k=n(p);a(k,()=>`<code class="language-ts"><span class="token comment">// HttpClient 傳統寫法</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/users'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
  <span class="token function">catchError</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token keyword">of</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>users <span class="token operator">=</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// HttpResource 寫法</span>
searchQuery <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
results <span class="token operator">=</span> <span class="token function">httpResource</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">/api/search?q=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">searchQuery</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// searchQuery 變化時自動觸發新請求</span></code>`),s(p);var o=t(p,8),r=n(o);a(r,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Injectable<span class="token punctuation">,</span> resource<span class="token punctuation">,</span> Signal <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> HttpClient<span class="token punctuation">,</span> HttpParams<span class="token punctuation">,</span> HttpErrorResponse <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/common/http'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Observable<span class="token punctuation">,</span> throwError <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> catchError <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs/operators'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> environment <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'../../../environments/environment'</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * 基礎 API Service
 * 可直接使用（需要完整 URL）或繼承使用（自動帶 base URL）
 */</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">BaseApiService</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 子類可以覆蓋這個屬性來設定預設的 base URL</span>
    <span class="token keyword">protected</span> baseUrl <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">protected</span> http<span class="token operator">:</span> HttpClient<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span> <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 構建完整 URL
     * 如果有 baseUrl 則自動拼接，否則直接使用傳入的 url
     */</span>
    <span class="token keyword">protected</span> <span class="token function">buildUrl</span><span class="token punctuation">(</span>path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> path<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token comment">// 確保不會有雙斜線</span>
        <span class="token keyword">const</span> normalizedPath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span> <span class="token operator">?</span> path <span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>normalizedPath<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// ========================================</span>
    <span class="token comment">// HttpResource - 只用於 GET（讀取數據，自動響應變化）</span>
    <span class="token comment">// ========================================</span>

    <span class="token comment">/**
     * 創建 GET Resource - 自動追蹤數據變化
     * @param url - API 端點 (使用 Signal)
     * @param params - 查詢參數（可選，使用 Signal）
     *
     * 使用範例：
     * const userId = signal('1');
     * const userResource = this.apiService.createGetResource&lt;User>(
     *   computed(() => &#96;/users/$&#123;userId()&#125;&#96;)
     * );
     */</span>
    <span class="token generic-function"><span class="token function">createGetResource</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
        url<span class="token operator">:</span> Signal<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span><span class="token punctuation">,</span>
        params<span class="token operator">?</span><span class="token operator">:</span> Signal<span class="token operator">&lt;</span>Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">>></span>
    <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token function">resource</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
            <span class="token function-variable function">loader</span><span class="token operator">:</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">const</span> currentUrl <span class="token operator">=</span> <span class="token function">url</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">const</span> currentParams <span class="token operator">=</span> params<span class="token operator">?.</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">const</span> queryString <span class="token operator">=</span> currentParams
                    <span class="token operator">?</span> <span class="token string">'?'</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">URLSearchParams</span><span class="token punctuation">(</span>currentParams<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">;</span>

                <span class="token comment">// 使用 buildUrl 自動處理 baseUrl</span>
                <span class="token keyword">const</span> fullUrl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildUrl</span><span class="token punctuation">(</span>currentUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>fullUrl<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>queryString<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
                    method<span class="token operator">:</span> <span class="token string">'GET'</span><span class="token punctuation">,</span>
                    headers<span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span> <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>response<span class="token punctuation">.</span>ok<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleFetchError</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>

                <span class="token keyword">return</span> <span class="token keyword">await</span> response<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token constant">T</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// ========================================</span>
    <span class="token comment">// HttpClient - 用於所有操作（GET/POST/PUT/PATCH/DELETE）</span>
    <span class="token comment">// ========================================</span>

    <span class="token comment">/**
     * GET 請求 - 一次性數據獲取
     * @param url - API 端點（相對路徑）
     * @param params - 查詢參數（可選）
     */</span>
    <span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> params<span class="token operator">?</span><span class="token operator">:</span> HttpParams<span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> fullUrl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>fullUrl<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> params <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
            <span class="token function">catchError</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleHttpClientError</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * POST 請求 - 新增數據
     * @param url - API 端點（相對路徑）
     * @param data - 請求數據
     */</span>
    <span class="token generic-function"><span class="token function">post</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> fullUrl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">post</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>fullUrl<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
            <span class="token function">catchError</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleHttpClientError</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * PUT 請求 - 完整更新
     * @param url - API 端點（相對路徑）
     * @param data - 請求數據
     */</span>
    <span class="token generic-function"><span class="token function">put</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> fullUrl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">put</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>fullUrl<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
            <span class="token function">catchError</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleHttpClientError</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * PATCH 請求 - 部分更新
     * @param url - API 端點（相對路徑）
     * @param data - 請求數據
     */</span>
    <span class="token generic-function"><span class="token function">patch</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> data<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> fullUrl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">patch</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>fullUrl<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
            <span class="token function">catchError</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleHttpClientError</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * DELETE 請求 - 刪除數據
     * @param url - API 端點（相對路徑）
     */</span>
    <span class="token keyword">delete</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> fullUrl <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildUrl</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">delete</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>fullUrl<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
            <span class="token function">catchError</span><span class="token punctuation">(</span>error <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleHttpClientError</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// ========================================</span>
    <span class="token comment">// 錯誤處理 - 只處理通用錯誤</span>
    <span class="token comment">// ========================================</span>

    <span class="token comment">/**
     * 處理 Fetch API 錯誤（用於 HttpResource）
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">async</span> <span class="token function">handleFetchError</span><span class="token punctuation">(</span>response<span class="token operator">:</span> Response<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">never</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> status <span class="token operator">=</span> response<span class="token punctuation">.</span>status<span class="token punctuation">;</span>

        <span class="token comment">// 處理通用錯誤</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleGlobalError</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 拋出錯誤供外部捕獲</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">HTTP Error: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>status<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> - </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>response<span class="token punctuation">.</span>statusText<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 處理 HttpClient 錯誤
     */</span>
    <span class="token keyword">private</span> <span class="token function">handleHttpClientError</span><span class="token punctuation">(</span>error<span class="token operator">:</span> HttpErrorResponse<span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token builtin">never</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 處理通用錯誤</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">handleGlobalError</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 拋出錯誤供外部捕獲</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'API Error:'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">throwError</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 通用錯誤處理
     * 只處理全局性錯誤：認證、權限、服務器錯誤、網絡錯誤
     */</span>
    <span class="token keyword">private</span> <span class="token function">handleGlobalError</span><span class="token punctuation">(</span>status<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">case</span> <span class="token number">401</span><span class="token operator">:</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'[Global Error] 未授權：登入已過期，請重新登入'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// TODO: 導向登入頁</span>
                <span class="token comment">// this.router.navigate(['/login']);</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">403</span><span class="token operator">:</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'[Global Error] 無權限：您沒有權限執行此操作'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// TODO: 顯示無權限提示</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">500</span><span class="token operator">:</span>
            <span class="token keyword">case</span> <span class="token number">502</span><span class="token operator">:</span>
            <span class="token keyword">case</span> <span class="token number">503</span><span class="token operator">:</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'[Global Error] 服務器錯誤：服務器發生錯誤，請稍後再試'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// TODO: 顯示服務器錯誤提示</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'[Global Error] 網絡錯誤：網絡連接失敗，請檢查網絡'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// TODO: 顯示網絡錯誤提示</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token comment">// 其他錯誤（400, 404, 409 等）不在這裡處理，交給外部業務邏輯</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// ========================================</span>
<span class="token comment">// Domain Services - 預設 Domain 配置</span>
<span class="token comment">// ========================================</span>

<span class="token comment">/**
 * Domain 1 API Service
 * 自動帶 Domain 1 的 base URL（從環境配置讀取）
 */</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Domain1ApiService</span> <span class="token keyword">extends</span> <span class="token class-name">BaseApiService</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">protected</span> override baseUrl <span class="token operator">=</span> environment<span class="token punctuation">.</span>apiUrls<span class="token punctuation">.</span>npcsDomain<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * Domain 2 API Service
 * 自動帶 Domain 2 的 base URL（從環境配置讀取）
 */</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Domain2ApiService</span> <span class="token keyword">extends</span> <span class="token class-name">BaseApiService</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">protected</span> override baseUrl <span class="token operator">=</span> environment<span class="token punctuation">.</span>apiUrls<span class="token punctuation">.</span>domain2<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * Domain 3 API Service
 * 自動帶 Domain 3 的 base URL（從環境配置讀取）
 */</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Domain3ApiService</span> <span class="token keyword">extends</span> <span class="token class-name">BaseApiService</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">protected</span> override baseUrl <span class="token operator">=</span> environment<span class="token punctuation">.</span>apiUrls<span class="token punctuation">.</span>domain3<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * Domain 4 API Service
 * 自動帶 Domain 4 的 base URL（從環境配置讀取）
 */</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Domain4ApiService</span> <span class="token keyword">extends</span> <span class="token class-name">BaseApiService</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">protected</span> override baseUrl <span class="token operator">=</span> environment<span class="token punctuation">.</span>apiUrls<span class="token punctuation">.</span>domain4<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(o),f(u,e)}const ks=Object.freeze(Object.defineProperty({__proto__:null,default:us,metadata:J},Symbol.toStringTag,{value:"Module"})),K={title:"Auth & Route 1",date:"2025-12-08",category:"software",subCategory:"Angular20",tags:["fronted","angular","route"],slug:"angular_AuthRoute_01"},{title:up,date:kp,category:ip,subCategory:rp,tags:dp,slug:mp}=K;var is=w('<h6>基於 RBAC 實作權限控管和畫面渲染，先處理資料結構設計</h6> <hr/> <p>和要求資料庫一致性一樣，越全面的權限控管程式碼就會複雜很多，所以根據專案的使用場景去選擇想要的架構。</p> <p>這次需求是【登入】後才可以使用的 ERP 系統，其他都導到login、401、403、404 就可以了。這次我的需求是</p> <ol><li><p>權限控制的顆粒度設計: 除了按照常見的 admin/manager/user 層級分級外，還需要可以控制到單一使用者的行為。</p></li> <li><p>限制後行為處理: 當不符權限時還需分成不同情況處理，例如</p> <ul><li>目錄層級沒有權限就不顯示</li> <li>編輯/刪除操作需要跳出提醒框【尚無權限，請與經理申請開通】</li></ul></li> <li><p>防止緩存、網路異常和惡意攻擊: 即使阻斷使用者入口(隱藏 UI 元件)，後端仍需實作獨立的權限驗證防禦。代表前後端（使用不同語言）必須維護一組權限常數定義。</p></li></ol> <h3>DB TABLE</h3> <p>最小實踐 3 張可以完成結構: 人員表 / 行為表 / 人員行為表(多對多)</p> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <p>這時若要建立 n 帳號，連結表就會新增 n * n 筆資料，要解決資料量需要再開一張 role 定義表，來當作集合使用 ( user -> role -> Claims )</p> <p>不把 userRoles 直接合併到 user 是因為有可能單一人員有多種身份(A子公司的副理、B子公司的開發人員) 保持可擴充性。</p> <pre class="language-json"><!></pre> <p>現在則是每個角色的權限都一樣，想要開特權/黑名單則需要再開一張表。</p> <pre class="language-json"><!></pre> <p>核心概念就是定義一張權限總表集中管理，存/取方式就用關聯+集合+邏輯判斷。</p> <p>查詢 SQL 大概會長這樣</p> <pre class="language-sql"><!></pre> <h3>前端的資料模型</h3> <p>把 DB 定義的常數值複製一份到前端，避免沒有同步更新、人為字串問題時可以好找錯誤。</p> <pre class="language-ts"><!></pre> <h3>維護更新</h3> <p>以後要新作功能流程時候，就是</p> <ol><li>DB Claim Table 添加一個事件</li> <li>RoleClaim Table 綁定事件權限</li> <li>前端 ClaimCode.ts 同步添加就可以模組化使用了</li></ol>',1);function rs(u){var e=is(),p=t(b(e),14),k=n(p);a(k,()=>`<code class="language-json">    <span class="token comment">// 人員表</span>
    <span class="token punctuation">&#123;</span>
        <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 唯一識別ID</span>
        <span class="token property">"username"</span><span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span>
        <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"admin123"</span><span class="token punctuation">,</span>
        <span class="token property">"email"</span><span class="token operator">:</span> <span class="token string">"admin@example.com"</span><span class="token punctuation">,</span>
        <span class="token comment">// 仿 JWT Token</span>
        <span class="token property">"token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lWIjoiYWRtaW4ifQ.mock_token_admin"</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token comment">// 聲明行為表</span>
    <span class="token punctuation">&#123;</span>
        <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 唯一就好不重要</span>
        <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"BASIC_SYSTEM_MODULE"</span><span class="token punctuation">,</span> <span class="token comment">// 常數字串，也要是唯一</span>
        <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"基礎系統"</span><span class="token punctuation">,</span> <span class="token comment">// 前端顯示字串，也可以在前端維護</span>
        <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"ROUTE"</span><span class="token punctuation">,</span> <span class="token comment">// 行為定義 "ROUTE" "ACTION" ...</span>
        <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"BasicSystem"</span><span class="token punctuation">,</span> <span class="token comment">// 方便查詢定義</span>
        <span class="token property">"parentId"</span><span class="token operator">:</span> <span class="token null keyword">null</span> <span class="token comment">// 用樹狀結構關聯行為</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token comment">// 連結表 => 該人員可以做甚麼行為</span>
    <span class="token punctuation">&#123;</span>
        <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span></code>`),s(p);var o=t(p,2),r=n(o);a(r,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
    <span class="token property">"users"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"username"</span><span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span>
            <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"admin123"</span><span class="token punctuation">,</span>
            <span class="token property">"email"</span><span class="token operator">:</span> <span class="token string">"admin@example.com"</span><span class="token punctuation">,</span>
            <span class="token property">"token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.mock_token_admin"</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">"username"</span><span class="token operator">:</span> <span class="token string">"user01"</span><span class="token punctuation">,</span>
            <span class="token property">"password"</span><span class="token operator">:</span> <span class="token string">"user123"</span><span class="token punctuation">,</span>
            <span class="token property">"email"</span><span class="token operator">:</span> <span class="token string">"user01@example.com"</span><span class="token punctuation">,</span>
            <span class="token property">"token"</span><span class="token operator">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidXNlcjAxIn0.mock_token_user01"</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"claims"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"BASIC_SYSTEM_MODULE"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"基礎系統"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"ROUTE"</span><span class="token punctuation">,</span>
            <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"BasicSystem"</span><span class="token punctuation">,</span>
            <span class="token property">"parentId"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"BASIC_SYSTEM_LOG"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"系統日誌"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"ROUTE"</span><span class="token punctuation">,</span>
            <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"BasicSystem"</span><span class="token punctuation">,</span>
            <span class="token property">"parentId"</span><span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
            <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"BASIC_SYSTEM_DIRECTORY"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"系統目錄"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"ROUTE"</span><span class="token punctuation">,</span>
            <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"BasicSystem"</span><span class="token punctuation">,</span>
            <span class="token property">"parentId"</span><span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
            <span class="token property">"code"</span><span class="token operator">:</span> <span class="token string">"BASIC_SYSTEM_LOG_EXPORT"</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"匯出日誌"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"ACTION"</span><span class="token punctuation">,</span>
            <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"BasicSystem"</span><span class="token punctuation">,</span>
            <span class="token property">"parentId"</span><span class="token operator">:</span> <span class="token number">2</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"userClaims"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">2</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">3</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">4</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">2</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
    <span class="token property">"users"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
            <span class="token property">"username"</span><span class="token operator">:</span> <span class="token string">"accountA_manager"</span><span class="token punctuation">,</span>
            <span class="token property">"email"</span><span class="token operator">:</span> <span class="token string">"manager@example.com"</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"roles"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"ACCOUNT_MANAGER"</span><span class="token punctuation">,</span>
            <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"帳戶管理員"</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 原先的 userClaims 移除改成 roleClaims</span>
    <span class="token property">"userRoles"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
            <span class="token property">"roleId"</span><span class="token operator">:</span> <span class="token number">2</span>  <span class="token comment">// 基礎角色</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"roleClaims"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"roleId"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">10</span>  <span class="token comment">// 角色預設權限</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"roleId"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">11</span> <span class="token comment">// 角色預設權限</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>   
    <span class="token property">"userClaims"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">&#123;</span>
            <span class="token property">"userId"</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"GRANT"</span><span class="token punctuation">,</span> <span class="token comment">// GRANT=額外給予, DENY=特別剔除</span>
            <span class="token property">"claimId"</span><span class="token operator">:</span> <span class="token number">99</span><span class="token punctuation">,</span>  <span class="token comment">// 指定權限</span>
            <span class="token property">"expiresAt"</span><span class="token operator">:</span> <span class="token string">"2025-12-16T23:59:59Z"</span><span class="token punctuation">,</span> <span class="token comment">// (可選)</span>
            <span class="token property">"grantedBy"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>  <span class="token comment">// 由誰授予(可選)</span>
            <span class="token property">"reason"</span><span class="token operator">:</span> <span class="token string">"緊急處理客戶問題"</span>  <span class="token comment">// 原因(可選)</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,6),y=n(i);a(y,()=>`<code class="language-sql">
<span class="token comment">-- 1. 查詢指定使用者的所有權限 (透過角色 + 個人特權/黑名單)</span>
<span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> 
    c<span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">FROM</span> users u
<span class="token comment">-- 透過角色獲得的權限</span>
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> userRoles ur <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> ur<span class="token punctuation">.</span>userId
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> roleClaims rc <span class="token keyword">ON</span> ur<span class="token punctuation">.</span>roleId <span class="token operator">=</span> rc<span class="token punctuation">.</span>roleId
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> claims c <span class="token keyword">ON</span> rc<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c<span class="token punctuation">.</span>id
<span class="token comment">-- 個人特權權限 (GRANT)</span>
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> userClaims uc <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> uc<span class="token punctuation">.</span>userId <span class="token operator">AND</span> uc<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token string">'GRANT'</span>
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> claims c2 <span class="token keyword">ON</span> uc<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c2<span class="token punctuation">.</span>id
<span class="token keyword">WHERE</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token variable">@userId</span>
  <span class="token operator">AND</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span>
      <span class="token comment">-- 排除黑名單 (DENY)</span>
      <span class="token keyword">SELECT</span> <span class="token number">1</span> <span class="token keyword">FROM</span> userClaims uc_deny 
      <span class="token keyword">WHERE</span> uc_deny<span class="token punctuation">.</span>userId <span class="token operator">=</span> u<span class="token punctuation">.</span>id 
        <span class="token operator">AND</span> uc_deny<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token string">'DENY'</span>
        <span class="token operator">AND</span> uc_deny<span class="token punctuation">.</span>claimId <span class="token operator">=</span> <span class="token keyword">COALESCE</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>id<span class="token punctuation">,</span> c2<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
        <span class="token operator">AND</span> <span class="token punctuation">(</span>uc_deny<span class="token punctuation">.</span>expiresAt <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token operator">OR</span> uc_deny<span class="token punctuation">.</span>expiresAt <span class="token operator">></span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token operator">AND</span> <span class="token punctuation">(</span>uc<span class="token punctuation">.</span>expiresAt <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token operator">OR</span> uc<span class="token punctuation">.</span>expiresAt <span class="token operator">></span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">-- 檢查特權是否過期</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> c<span class="token punctuation">.</span>module<span class="token punctuation">,</span> c<span class="token punctuation">.</span>parentId<span class="token punctuation">,</span> c<span class="token punctuation">.</span>id<span class="token punctuation">;</span>


<span class="token comment">-- 2. 查詢指定使用者的角色資訊</span>
<span class="token keyword">SELECT</span> 
    r<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
    r<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    r<span class="token punctuation">.</span>description
<span class="token keyword">FROM</span> users u
<span class="token keyword">JOIN</span> userRoles ur <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> ur<span class="token punctuation">.</span>userId
<span class="token keyword">JOIN</span> roles r <span class="token keyword">ON</span> ur<span class="token punctuation">.</span>roleId <span class="token operator">=</span> r<span class="token punctuation">.</span>id
<span class="token keyword">WHERE</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token variable">@userId</span><span class="token punctuation">;</span>


<span class="token comment">-- 3. 檢查使用者是否有特定權限 (回傳 boolean)</span>
<span class="token keyword">SELECT</span> 
    <span class="token keyword">CASE</span> 
        <span class="token keyword">WHEN</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token keyword">THEN</span> <span class="token number">1</span> 
        <span class="token keyword">ELSE</span> <span class="token number">0</span> 
    <span class="token keyword">END</span> <span class="token keyword">AS</span> hasPermission
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
    <span class="token comment">-- 從角色獲得的權限</span>
    <span class="token keyword">SELECT</span> c<span class="token punctuation">.</span>id
    <span class="token keyword">FROM</span> users u
    <span class="token keyword">JOIN</span> userRoles ur <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> ur<span class="token punctuation">.</span>userId
    <span class="token keyword">JOIN</span> roleClaims rc <span class="token keyword">ON</span> ur<span class="token punctuation">.</span>roleId <span class="token operator">=</span> rc<span class="token punctuation">.</span>roleId
    <span class="token keyword">JOIN</span> claims c <span class="token keyword">ON</span> rc<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c<span class="token punctuation">.</span>id
    <span class="token keyword">WHERE</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token variable">@userId</span> <span class="token operator">AND</span> c<span class="token punctuation">.</span>code <span class="token operator">=</span> <span class="token variable">@claimCode</span>
    
    <span class="token keyword">UNION</span>
    
    <span class="token comment">-- 個人特權 (GRANT)</span>
    <span class="token keyword">SELECT</span> c<span class="token punctuation">.</span>id
    <span class="token keyword">FROM</span> userClaims uc
    <span class="token keyword">JOIN</span> claims c <span class="token keyword">ON</span> uc<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c<span class="token punctuation">.</span>id
    <span class="token keyword">WHERE</span> uc<span class="token punctuation">.</span>userId <span class="token operator">=</span> <span class="token variable">@userId</span> 
      <span class="token operator">AND</span> uc<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token string">'GRANT'</span>
      <span class="token operator">AND</span> c<span class="token punctuation">.</span>code <span class="token operator">=</span> <span class="token variable">@claimCode</span>
      <span class="token operator">AND</span> <span class="token punctuation">(</span>uc<span class="token punctuation">.</span>expiresAt <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token operator">OR</span> uc<span class="token punctuation">.</span>expiresAt <span class="token operator">></span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">AS</span> permissions
<span class="token keyword">WHERE</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span>
    <span class="token comment">-- 檢查是否被黑名單排除</span>
    <span class="token keyword">SELECT</span> <span class="token number">1</span> 
    <span class="token keyword">FROM</span> userClaims uc_deny
    <span class="token keyword">JOIN</span> claims c <span class="token keyword">ON</span> uc_deny<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c<span class="token punctuation">.</span>id
    <span class="token keyword">WHERE</span> uc_deny<span class="token punctuation">.</span>userId <span class="token operator">=</span> <span class="token variable">@userId</span>
      <span class="token operator">AND</span> uc_deny<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token string">'DENY'</span>
      <span class="token operator">AND</span> c<span class="token punctuation">.</span>code <span class="token operator">=</span> <span class="token variable">@claimCode</span>
      <span class="token operator">AND</span> <span class="token punctuation">(</span>uc_deny<span class="token punctuation">.</span>expiresAt <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token operator">OR</span> uc_deny<span class="token punctuation">.</span>expiresAt <span class="token operator">></span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">-- 4. 查詢使用者的所有特權/黑名單 (含過期時間)</span>
<span class="token keyword">SELECT</span> 
    c<span class="token punctuation">.</span>code<span class="token punctuation">,</span>
    c<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    uc<span class="token punctuation">.</span><span class="token keyword">type</span><span class="token punctuation">,</span>
    uc<span class="token punctuation">.</span>expiresAt<span class="token punctuation">,</span>
    uc<span class="token punctuation">.</span>reason<span class="token punctuation">,</span>
    u_granter<span class="token punctuation">.</span>username <span class="token keyword">AS</span> grantedByUser
<span class="token keyword">FROM</span> userClaims uc
<span class="token keyword">JOIN</span> claims c <span class="token keyword">ON</span> uc<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c<span class="token punctuation">.</span>id
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> users u_granter <span class="token keyword">ON</span> uc<span class="token punctuation">.</span>grantedBy <span class="token operator">=</span> u_granter<span class="token punctuation">.</span>id
<span class="token keyword">WHERE</span> uc<span class="token punctuation">.</span>userId <span class="token operator">=</span> <span class="token variable">@userId</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> uc<span class="token punctuation">.</span><span class="token keyword">type</span><span class="token punctuation">,</span> uc<span class="token punctuation">.</span>expiresAt<span class="token punctuation">;</span>


<span class="token comment">-- 5. 查詢指定模組下使用者的所有權限</span>
<span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> 
    c<span class="token punctuation">.</span>code<span class="token punctuation">,</span>
    c<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
    c<span class="token punctuation">.</span><span class="token keyword">type</span>
<span class="token keyword">FROM</span> users u
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> userRoles ur <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> ur<span class="token punctuation">.</span>userId
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> roleClaims rc <span class="token keyword">ON</span> ur<span class="token punctuation">.</span>roleId <span class="token operator">=</span> rc<span class="token punctuation">.</span>roleId
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> claims c <span class="token keyword">ON</span> rc<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c<span class="token punctuation">.</span>id
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> userClaims uc <span class="token keyword">ON</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> uc<span class="token punctuation">.</span>userId <span class="token operator">AND</span> uc<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token string">'GRANT'</span>
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> claims c2 <span class="token keyword">ON</span> uc<span class="token punctuation">.</span>claimId <span class="token operator">=</span> c2<span class="token punctuation">.</span>id
<span class="token keyword">WHERE</span> u<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token variable">@userId</span>
  <span class="token operator">AND</span> <span class="token keyword">COALESCE</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>module<span class="token punctuation">,</span> c2<span class="token punctuation">.</span>module<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token variable">@moduleName</span>
  <span class="token operator">AND</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span>
      <span class="token keyword">SELECT</span> <span class="token number">1</span> <span class="token keyword">FROM</span> userClaims uc_deny 
      <span class="token keyword">WHERE</span> uc_deny<span class="token punctuation">.</span>userId <span class="token operator">=</span> u<span class="token punctuation">.</span>id 
        <span class="token operator">AND</span> uc_deny<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token operator">=</span> <span class="token string">'DENY'</span>
        <span class="token operator">AND</span> uc_deny<span class="token punctuation">.</span>claimId <span class="token operator">=</span> <span class="token keyword">COALESCE</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>id<span class="token punctuation">,</span> c2<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
        <span class="token operator">AND</span> <span class="token punctuation">(</span>uc_deny<span class="token punctuation">.</span>expiresAt <span class="token operator">IS</span> <span class="token boolean">NULL</span> <span class="token operator">OR</span> uc_deny<span class="token punctuation">.</span>expiresAt <span class="token operator">></span> <span class="token function">NOW</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> c<span class="token punctuation">.</span><span class="token keyword">type</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span>name<span class="token punctuation">;</span></code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-ts"><span class="token comment">// 對照 DB 的 Code 值，避免人工字串值問題</span>
<span class="token keyword">export</span> <span class="token keyword">enum</span> ClaimCode <span class="token punctuation">&#123;</span>
    <span class="token constant">BASIC_SYSTEM_MODULE</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_MODULE'</span><span class="token punctuation">,</span>
    <span class="token constant">BASIC_SYSTEM_LOG</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_LOG'</span><span class="token punctuation">,</span>
    <span class="token constant">BASIC_SYSTEM_DIRECTORY</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_DIRECTORY'</span><span class="token punctuation">,</span>
    <span class="token constant">BASIC_SYSTEM_PERMISSION</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_PERMISSION'</span><span class="token punctuation">,</span>
    <span class="token constant">BASIC_SYSTEM_LOG_VIEW</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_LOG_VIEW'</span><span class="token punctuation">,</span>
    <span class="token constant">BASIC_SYSTEM_LOG_EXPORT</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_LOG_EXPORT'</span><span class="token punctuation">,</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// 看前端如何定義這些行為</span>
<span class="token keyword">export</span> <span class="token keyword">enum</span> ClaimType <span class="token punctuation">&#123;</span>
    <span class="token constant">ROUTE</span> <span class="token operator">=</span> <span class="token string">'ROUTE'</span><span class="token punctuation">,</span>    <span class="token comment">// 路由權限（頁面訪問）</span>
    <span class="token constant">ACTION</span> <span class="token operator">=</span> <span class="token string">'ACTION'</span>   <span class="token comment">// 操作權限（功能按鈕）</span>
<span class="token punctuation">&#125;</span></code>`),s(m),A(6),f(u,e)}const ds=Object.freeze(Object.defineProperty({__proto__:null,default:rs,metadata:K},Symbol.toStringTag,{value:"Module"})),X={title:"Auth & Route 2",date:"2025-12-09",category:"software",subCategory:"Angular20",tags:["fronted","angular","route"],slug:"angular_AuthRoute_02"},{title:gp,date:yp,category:wp,subCategory:fp,tags:hp,slug:bp}=X;var ms=w('<h6>基於 RBAC 實作權限控管和畫面渲染，這篇處理前端架構 Service 、 Route 、 Guard</h6> <hr/> <h3>Service</h3> <p>Angular 會使用 DI Service 的方式維護狀態管理與函數調用，通常會是 Singleton</p> <p>先簡單實作 auth.service.ts 讓 APP 可以判定登入狀態</p> <pre class="language-ts"><!></pre> <p>permission.service.ts 用來處理權限相關，目前功能定義成</p> <ol><li>存放使用者的權限 Singleton 在前端</li> <li>全部的權限列表，因為不是機密資料可以回傳，方便整理狀態</li> <li>業務邏輯處理</li></ol> <pre class="language-ts"><!></pre> <p>Service 處理完後，就應該要拿到所有 Auth & Route 需要使用到的資料了</p> <h3>Route</h3> <p>再來處理 route 的部分，angular 套件有提供 canActivate 屬性當作路由守衛</p> <p>app.routes.ts</p> <pre class="language-ts"><!></pre> <h3>Guard</h3> <p>注入 Service 檢查登入 & 權限狀態來實作二個守衛， authGuard 失敗跳轉到登入頁面、permissionGuard 失敗跳轉到未授權畫面。</p> <pre class="language-ts"><!></pre> <p>這邊做好可以先純輸入 URL 測試 route 功能，剩下就是看要怎麼整理數據，集中管理轉給 Component render</p>',1);function gs(u){var e=ms(),p=t(b(e),10),k=n(p);a(k,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Injectable<span class="token punctuation">,</span> signal <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Router <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> userPermissionData <span class="token keyword">from</span> <span class="token string">'../../../mockDB/userPermission.json'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">User</span> <span class="token punctuation">&#123;</span>
    id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    email<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AuthService</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 使用 signal 管理登入狀態</span>
    <span class="token keyword">private</span> currentUser <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span>User <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> token <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 公開的唯讀 signal</span>
    <span class="token keyword">readonly</span> user$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentUser<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> isLoggedIn$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>currentUser<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> router<span class="token operator">:</span> Router<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 從 localStorage 恢復登入狀態</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">restoreSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 檢查是否已登入
     */</span>
    <span class="token function">isAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">currentUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">token</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 登入
     * @returns &#123; success: boolean, message?: string &#125;
     */</span>
    <span class="token function">login</span><span class="token punctuation">(</span>username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> password<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> success<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> message<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#125;</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 從 userPermission.json 中查找使用者</span>
        <span class="token keyword">const</span> foundUser <span class="token operator">=</span> userPermissionData<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>
            u <span class="token operator">=></span> u<span class="token punctuation">.</span>username <span class="token operator">===</span> username <span class="token operator">&amp;&amp;</span> u<span class="token punctuation">.</span>password <span class="token operator">===</span> password
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>foundUser<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
                success<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
                message<span class="token operator">:</span> <span class="token string">'帳號或密碼錯誤'</span>
            <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">const</span> user<span class="token operator">:</span> User <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
            id<span class="token operator">:</span> foundUser<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
            username<span class="token operator">:</span> foundUser<span class="token punctuation">.</span>username<span class="token punctuation">,</span>
            email<span class="token operator">:</span> foundUser<span class="token punctuation">.</span>email
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> token <span class="token operator">=</span> foundUser<span class="token punctuation">.</span>token<span class="token punctuation">;</span>

        <span class="token comment">// 更新狀態</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>currentUser<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>token<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 儲存到 localStorage</span>
        localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">,</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        localStorage<span class="token punctuation">.</span><span class="token function">setItem</span><span class="token punctuation">(</span><span class="token string">'token'</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
            success<span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 登出
     */</span>
    <span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>currentUser<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>token<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 清除 localStorage</span>
        localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        localStorage<span class="token punctuation">.</span><span class="token function">removeItem</span><span class="token punctuation">(</span><span class="token string">'token'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 導向登入頁</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'/login'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 從 localStorage 恢復登入狀態
     */</span>
    <span class="token keyword">private</span> <span class="token function">restoreSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> userJson <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'user'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'token'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>userJson <span class="token operator">&amp;&amp;</span> token<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">try</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>userJson<span class="token punctuation">)</span> <span class="token keyword">as</span> User<span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>currentUser<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>token<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'恢復登入狀態失敗'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">logout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 取得當前使用者
     */</span>
    <span class="token function">getCurrentUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> User <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">currentUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 取得 Token
     */</span>
    <span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">token</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Injectable<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> computed <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AuthService <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./auth.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> userPermissionData <span class="token keyword">from</span> <span class="token string">'../../../mockDB/userPermission.json'</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * 權限類型
 */</span>
<span class="token keyword">export</span> <span class="token keyword">enum</span> ClaimType <span class="token punctuation">&#123;</span>
    <span class="token constant">ROUTE</span> <span class="token operator">=</span> <span class="token string">'ROUTE'</span><span class="token punctuation">,</span>    <span class="token comment">// 路由權限（頁面訪問）</span>
    <span class="token constant">ACTION</span> <span class="token operator">=</span> <span class="token string">'ACTION'</span>   <span class="token comment">// 操作權限（功能按鈕）</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 權限聲明介面
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Claim</span> <span class="token punctuation">&#123;</span>
    id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    type<span class="token operator">:</span> ClaimType<span class="token punctuation">;</span>
    module<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    parentId<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 使用者權限關聯介面
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">UserClaim</span> <span class="token punctuation">&#123;</span>
    userId<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    claimId<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 權限樹節點（用於建立階層結構）
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ClaimTreeNode</span> <span class="token keyword">extends</span> <span class="token class-name">Claim</span> <span class="token punctuation">&#123;</span>
    children<span class="token operator">:</span> ClaimTreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">PermissionService</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 所有權限定義</span>
    <span class="token keyword">private</span> allClaims <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span>Claim<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 當前使用者的權限 ID 列表</span>
    <span class="token keyword">private</span> userClaimIds <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 當前使用者的權限物件列表(List)（computed）</span>
    <span class="token keyword">readonly</span> userClaims <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> claimIds <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">userClaimIds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">allClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>claim <span class="token operator">=></span> claimIds<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>claim<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 當前使用者的權限樹狀結構（computed, 僅包含使用者擁有的權限）</span>
    <span class="token keyword">readonly</span> userClaimTree <span class="token operator">=</span> <span class="token generic-function"><span class="token function">computed</span><span class="token generic class-name"><span class="token operator">&lt;</span>ClaimTreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 取得使用者擁有的權限列表</span>
        <span class="token keyword">const</span> userClaimList <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">userClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 用 Map 儲存節點，方便透過 ID 查找父節點</span>
        <span class="token keyword">const</span> claimMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token punctuation">,</span> ClaimTreeNode<span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 1. 初始化使用者擁有的節點</span>
        userClaimList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>claim <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 使用展開運算子 (...) 建立一個新的物件，符合 ClaimTreeNode 介面</span>
            claimMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>claim<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> <span class="token operator">...</span>claim<span class="token punctuation">,</span> children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2. 建立樹狀結構並過濾</span>
        <span class="token keyword">const</span> rootNodes<span class="token operator">:</span> ClaimTreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        claimMap<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>node <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>parentId <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// 根節點 (ParentId 為 null) 直接加入根列表</span>
                rootNodes<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// 嘗試從 claimMap 中取得父節點</span>
                <span class="token keyword">const</span> parent <span class="token operator">=</span> claimMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>parentId<span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token comment">// 確保父節點存在 (因為我們只處理使用者擁有的節點，所以 parentId 必須在 claimMap 內)</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    parent<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 3. 回傳樹的根節點列表</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'userClaimTree'</span><span class="token punctuation">,</span> rootNodes<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> rootNodes<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 權限是否已載入</span>
    <span class="token keyword">private</span> isLoaded <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> authService<span class="token operator">:</span> AuthService<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 載入所有權限定義</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 監聽登入狀態，自動載入使用者權限</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>authService<span class="token punctuation">.</span><span class="token function">user$</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadUserClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 載入所有權限定義
     */</span>
    <span class="token keyword">private</span> <span class="token function">loadClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> claims <span class="token operator">=</span> userPermissionData<span class="token punctuation">.</span>claims<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>claim <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
            id<span class="token operator">:</span> claim<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
            code<span class="token operator">:</span> claim<span class="token punctuation">.</span>code<span class="token punctuation">,</span>
            name<span class="token operator">:</span> claim<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
            type<span class="token operator">:</span> claim<span class="token punctuation">.</span><span class="token keyword">type</span> <span class="token class-name"><span class="token keyword">as</span></span> ClaimType<span class="token punctuation">,</span>
            module<span class="token operator">:</span> claim<span class="token punctuation">.</span>module<span class="token punctuation">,</span>
            parentId<span class="token operator">:</span> claim<span class="token punctuation">.</span>parentId
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>allClaims<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>claims<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 載入當前使用者的權限
     */</span>
    <span class="token function">loadUserClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>authService<span class="token punctuation">.</span><span class="token function">getCurrentUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>user<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>userClaimIds<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>isLoaded<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">// 從 userPermission.json 中查找該使用者的權限</span>
        <span class="token keyword">const</span> userClaimRelations <span class="token operator">=</span> userPermissionData<span class="token punctuation">.</span>userClaims<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>
            uc <span class="token operator">=></span> uc<span class="token punctuation">.</span>userId <span class="token operator">===</span> user<span class="token punctuation">.</span>id
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> claimIds <span class="token operator">=</span> userClaimRelations<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>uc <span class="token operator">=></span> uc<span class="token punctuation">.</span>claimId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userClaimIds<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>claimIds<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoaded<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 核心方法：檢查是否有指定的權限
     * @param claimCode 權限代碼，例如 'BASIC_SYSTEM_LOG_VIEW'
     */</span>
    <span class="token function">hasClaim</span><span class="token punctuation">(</span>claimCode<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> claim <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">allClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>c <span class="token operator">=></span> c<span class="token punctuation">.</span>code <span class="token operator">===</span> claimCode<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>claim<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">權限代碼 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>claimCode<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> 不存在</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">userClaimIds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>claim<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 檢查權限是否已載入
     */</span>
    <span class="token function">isPermissionLoaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isLoaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 清除使用者權限（登出時使用）
     */</span>
    <span class="token function">clearUserClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>userClaimIds<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>isLoaded<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * Debug 用：印出當前使用者的所有權限
     */</span>
    <span class="token function">debugPrintUserClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token string">'🔐 使用者權限列表'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'使用者:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>authService<span class="token punctuation">.</span><span class="token function">getCurrentUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'權限數量:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">userClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">table</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">userClaims</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">groupEnd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,10),d=n(c);a(d,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Routes <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Login <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./pages/login/login'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> MainLayoutComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./core/layout/main-layout.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> authGuard <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./core/guards/auth.guard'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Unauthorized <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./pages/unauthorized/unauthorized'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> <span class="token constant">ROUTE_CONFIGS</span><span class="token punctuation">,</span> convertToRoutes <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./core/config/route.config'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'login'</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> Login
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'unauthorized'</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> Unauthorized
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> MainLayoutComponent<span class="token punctuation">,</span>
        canActivate<span class="token operator">:</span> <span class="token punctuation">[</span>authGuard<span class="token punctuation">]</span><span class="token punctuation">,</span>  <span class="token comment">// 需要登入才能訪問</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">&#123;</span>
                path<span class="token operator">:</span> <span class="token string">'basic-system/log'</span><span class="token punctuation">,</span>
                requiredClaim<span class="token operator">:</span> ClaimCode<span class="token punctuation">.</span><span class="token constant">BASIC_SYSTEM_LOG</span><span class="token punctuation">,</span>
                <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'../../features/basic-system/system-log.component'</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>SystemLogComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
            <span class="token punctuation">&#123;</span>
                path<span class="token operator">:</span> <span class="token string">'external-system/vendor-data'</span><span class="token punctuation">,</span>
                canActivate<span class="token operator">:</span> <span class="token punctuation">[</span>permissionGuard<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 需要有權限才能訪問</span>
                requiredClaim<span class="token operator">:</span> ClaimCode<span class="token punctuation">.</span><span class="token constant">EXTERNAL_SYSTEM_VENDOR_DATA</span><span class="token punctuation">,</span>
                <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'../../features/external-system/vendor-data.component'</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>VendorDataComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
                reuseRoute<span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'**'</span><span class="token punctuation">,</span>
        redirectTo<span class="token operator">:</span> <span class="token string">'/login'</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> inject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Router<span class="token punctuation">,</span> CanActivateFn <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AuthService <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'../services/auth.service'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> PermissionService <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'../services/permission.service'</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * 路由守衛 - 檢查使用者是否已登入
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> authGuard<span class="token operator">:</span> <span class="token function-variable function">CanActivateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>route<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> authService <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>AuthService<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 檢查是否已登入</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>authService<span class="token punctuation">.</span><span class="token function">isAuthenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>  <span class="token comment">// 允許訪問</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// 未登入，導向登入頁</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'未登入，導向登入頁'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> router<span class="token punctuation">.</span><span class="token function">createUrlTree</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'/login'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
        queryParams<span class="token operator">:</span> <span class="token punctuation">&#123;</span> returnUrl<span class="token operator">:</span> state<span class="token punctuation">.</span>url <span class="token punctuation">&#125;</span>  <span class="token comment">// 記住原本要去的頁面</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * 權限守衛 - 檢查使用者
 */</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> permissionGuard<span class="token operator">:</span> <span class="token function-variable function">CanActivateFn</span> <span class="token operator">=</span> <span class="token punctuation">(</span>route<span class="token punctuation">,</span> state<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> permissionService <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>PermissionService<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>Router<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 從 route data 取得所需的權限代碼</span>
    <span class="token comment">// children: [</span>
    <span class="token comment">// &#123;</span>
    <span class="token comment">//     path: 'basic-system/log',</span>
    <span class="token comment">//     requiredClaim: ClaimCode.BASIC_SYSTEM_LOG,</span>
    <span class="token comment">// &#125;,</span>
    <span class="token keyword">const</span> requiredClaim <span class="token operator">=</span> route<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token string">'requiredClaim'</span><span class="token punctuation">]</span> <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

    <span class="token comment">// 檢查使用者是否有所需權限</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>permissionService<span class="token punctuation">.</span><span class="token function">hasClaim</span><span class="token punctuation">(</span>requiredClaim<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">// 沒有權限，導向未授權頁面</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">沒有權限訪問此頁面，需要權限: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>requiredClaim<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> router<span class="token punctuation">.</span><span class="token function">createUrlTree</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'/unauthorized'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

</code>`),s(l),A(2),f(u,e)}const ys=Object.freeze(Object.defineProperty({__proto__:null,default:gs,metadata:X},Symbol.toStringTag,{value:"Module"})),Q={title:"Auth & Route 3",date:"2025-12-11",category:"software",subCategory:"Angular20",tags:["fronted","angular","route"],slug:"angular_AuthRoute_03"},{title:vp,date:_p,category:Sp,subCategory:Cp,tags:Rp,slug:Tp}=Q;var ws=w('<h6>基於 RBAC 實作權限控管和畫面渲染，處理 UI/UX</h6> <hr/> <h3>Layout</h3> <p>主畫面的 Layout 會是常見的</p> <ol><li>Header 放入基本資料</li> <li>SideBar 側邊攔根據權限 Render 出入口</li> <li>ContentView 根據不同路由顯示不同畫面</li></ol> <p><strong>sidebar.component.ts</strong></p> <p>這邊主要功能是整理 permissionService 的權限列表( 有設計 TabService 但可解耦的先忽略)，轉成 UI 好渲染的資料結構(menuItems)，Click( ) Enevt就是跳轉到該 permissionService 對應的 route，ContentView 再根據 Route 顯示綁定的 Component</p> <pre class="language-ts"><!></pre> <p>所以麻煩的部份會是 permissionService (原資料) 要如何 MAPPING 到前端定義的 URL ROUTE 字串值，為此會需要定義一個介面</p> <pre class="language-ts"><!></pre> <p>route.config.ts</p> <p>資料整理完後，還需自行轉換成 Angular Route 套件可以吃的資料模型 convertToRoute( )，丟回給 app.routes.ts 使用</p> <pre class="language-ts"><!></pre> <p>app.routes.ts 會變成</p> <pre class="language-ts"><!></pre> <p>未來要新增一個畫面，前端就是添加一組</p> <pre class="language-ts"><!></pre>',1);function fs(u){var e=ws(),p=t(b(e),14),k=n(p);a(k,()=>`<code class="language-ts">
<span class="token keyword">interface</span> <span class="token class-name">MenuItem</span> <span class="token punctuation">&#123;</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  route<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  icon<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  children<span class="token operator">?</span><span class="token operator">:</span> MenuItem<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  expanded<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
  claimCode<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 權限代碼</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">SidebarComponent</span> <span class="token punctuation">&#123;</span>
  isCollapsed <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> allRouteMap <span class="token operator">=</span> <span class="token function">buildAllClaimRouteMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// UI DataSource => 根據權限動態建構</span>
  menuItems <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> claimTree <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>permissionService<span class="token punctuation">.</span><span class="token function">userClaimTree</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> routeTree <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">filterRoutePermissions</span><span class="token punctuation">(</span>claimTree<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">convertToMenuItems</span><span class="token punctuation">(</span>routeTree<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> tabService<span class="token operator">:</span> TabService<span class="token punctuation">,</span>
    <span class="token keyword">private</span> permissionService<span class="token operator">:</span> PermissionService<span class="token punctuation">,</span>
    <span class="token keyword">private</span> router<span class="token operator">:</span> Router
  <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span> <span class="token punctuation">&#125;</span>

  <span class="token comment">/**
   * 拿 ROUTE 類型的權限(遞迴)
   */</span>
  <span class="token keyword">private</span> <span class="token function">filterRoutePermissions</span><span class="token punctuation">(</span>nodes<span class="token operator">:</span> ClaimTreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> ClaimTreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> nodes
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>node <span class="token operator">=></span> node<span class="token punctuation">.</span>type <span class="token operator">===</span> ClaimType<span class="token punctuation">.</span><span class="token constant">ROUTE</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>node <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
        <span class="token operator">...</span>node<span class="token punctuation">,</span>
        children<span class="token operator">:</span> node<span class="token punctuation">.</span>children <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">filterRoutePermissions</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>children<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token comment">/**
   * 將 ClaimTreeNode 轉換為 MenuItem (遞迴)
   */</span>
  <span class="token keyword">private</span> <span class="token function">convertToMenuItems</span><span class="token punctuation">(</span>nodes<span class="token operator">:</span> ClaimTreeNode<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> MenuItem<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> nodes<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>node <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">const</span> route <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>allRouteMap<span class="token punctuation">[</span>node<span class="token punctuation">.</span>code <span class="token keyword">as</span> ClaimCode<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token string">'#'</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
        id<span class="token operator">:</span> node<span class="token punctuation">.</span>id<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        name<span class="token operator">:</span> node<span class="token punctuation">.</span>name<span class="token punctuation">,</span>
        route<span class="token operator">:</span> route<span class="token punctuation">,</span>
        claimCode<span class="token operator">:</span> node<span class="token punctuation">.</span>code<span class="token punctuation">,</span>
        expanded<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> node<span class="token punctuation">.</span>children <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span>children<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span>
          <span class="token operator">?</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">convertToMenuItems</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>children<span class="token punctuation">)</span>
          <span class="token operator">:</span> <span class="token keyword">undefined</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">goToHome</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 關閉所有分頁，返回首頁</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tabService<span class="token punctuation">.</span><span class="token function">closeAllTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">goToRoute</span><span class="token punctuation">(</span>item<span class="token operator">:</span> MenuItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>item<span class="token punctuation">.</span>route<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">toggleSidebar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>isCollapsed <span class="token operator">=</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>isCollapsed<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">toggleMenu</span><span class="token punctuation">(</span>item<span class="token operator">:</span> MenuItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    item<span class="token punctuation">.</span>expanded <span class="token operator">=</span> <span class="token operator">!</span>item<span class="token punctuation">.</span>expanded<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-ts"><span class="token comment">/**
 * 路由配置介面
 */</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">RouteConfig</span> <span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// APP Path</span>
    claim<span class="token operator">:</span> ClaimCode<span class="token punctuation">;</span> <span class="token comment">// DB TABLE Value</span>
    <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span><span class="token punctuation">;</span> <span class="token comment">// ContentView</span>
    reuseRoute<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span> <span class="token comment">// 套件提供暫時忽略</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 權限代碼枚舉
 */</span>
<span class="token keyword">export</span> <span class="token keyword">enum</span> ClaimCode <span class="token punctuation">&#123;</span>
    <span class="token comment">// ========================================</span>
    <span class="token comment">// 基礎系統</span>
    <span class="token comment">// ========================================</span>
    <span class="token constant">BASIC_SYSTEM_MODULE</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_MODULE'</span><span class="token punctuation">,</span>
    <span class="token constant">BASIC_SYSTEM_LOG</span> <span class="token operator">=</span> <span class="token string">'BASIC_SYSTEM_LOG'</span><span class="token punctuation">,</span>

    <span class="token comment">// ========================================</span>
    <span class="token comment">// 外部系統</span>
    <span class="token comment">// ========================================</span>
    <span class="token constant">EXTERNAL_SYSTEM_MODULE</span> <span class="token operator">=</span> <span class="token string">'EXTERNAL_SYSTEM_MODULE'</span><span class="token punctuation">,</span>
    <span class="token constant">EXTERNAL_SYSTEM_VENDOR_DATA</span> <span class="token operator">=</span> <span class="token string">'EXTERNAL_SYSTEM_VENDOR_DATA'</span><span class="token punctuation">,</span>

    <span class="token comment">// ========================================</span>
    <span class="token comment">// 金流系統</span>
    <span class="token comment">// ========================================</span>
    <span class="token constant">PAYMENT_SYSTEM_MODULE</span> <span class="token operator">=</span> <span class="token string">'PAYMENT_SYSTEM_MODULE'</span><span class="token punctuation">,</span>
    <span class="token constant">PAYMENT_SYSTEM_METHOD</span> <span class="token operator">=</span> <span class="token string">'PAYMENT_SYSTEM_METHOD'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span>
</code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">ROUTE_CONFIGS</span><span class="token operator">:</span> RouteConfig<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'basic-system/log'</span><span class="token punctuation">,</span>
        claim<span class="token operator">:</span> ClaimCode<span class="token punctuation">.</span><span class="token constant">BASIC_SYSTEM_LOG</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'../../features/basic-system/system-log.component'</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>SystemLogComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
        reuseRoute<span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'payment-system/payment-method'</span><span class="token punctuation">,</span>
        claim<span class="token operator">:</span> ClaimCode<span class="token punctuation">.</span><span class="token constant">PAYMENT_SYSTEM_METHOD</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'../../features/payment-system/payment-method.component'</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>PaymentMethodComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'parking-system/order-management'</span><span class="token punctuation">,</span>
        claim<span class="token operator">:</span> ClaimCode<span class="token punctuation">.</span><span class="token constant">PARKING_SYSTEM_ORDER</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'../../features/parking-system/order-management.component'</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>OrderManagementComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * 將 RouteConfig 轉換為 Angular Route
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">convertToRoute</span><span class="token punctuation">(</span>config<span class="token operator">:</span> RouteConfig<span class="token punctuation">)</span><span class="token operator">:</span> Route <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> config<span class="token punctuation">.</span>path<span class="token punctuation">,</span>
        loadComponent<span class="token operator">:</span> config<span class="token punctuation">.</span>loadComponent<span class="token punctuation">,</span>
        canActivate<span class="token operator">:</span> <span class="token punctuation">[</span>permissionGuard<span class="token punctuation">]</span><span class="token punctuation">,</span>
        data<span class="token operator">:</span> <span class="token punctuation">&#123;</span>
            requiredClaim<span class="token operator">:</span> config<span class="token punctuation">.</span>claim<span class="token punctuation">,</span>
            reuseRoute<span class="token operator">:</span> config<span class="token punctuation">.</span>reuseRoute <span class="token operator">??</span> <span class="token boolean">true</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 將所有 RouteConfig 轉換為 Angular Routes
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">convertToRoutes</span><span class="token punctuation">(</span>configs<span class="token operator">:</span> RouteConfig<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> Route<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> configs<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>convertToRoute<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 從 ROUTE_CONFIGS 取出所有路徑設定，建立權限(ClaimCode)到路由(path)的映射表
 */</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">buildAllClaimRouteMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Record<span class="token operator">&lt;</span>ClaimCode<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">>></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> map<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Record<span class="token operator">&lt;</span>ClaimCode<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">>></span> <span class="token operator">=</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

    <span class="token constant">ROUTE_CONFIGS</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>config <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        map<span class="token punctuation">[</span>config<span class="token punctuation">.</span>claim<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>config<span class="token punctuation">.</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> map<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'login'</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> Login
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'unauthorized'</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> Unauthorized
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        component<span class="token operator">:</span> MainLayoutComponent<span class="token punctuation">,</span>
        canActivate<span class="token operator">:</span> <span class="token punctuation">[</span>authGuard<span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">// 舊有的</span>
        <span class="token comment">// children: [</span>
        <span class="token comment">//     &#123;</span>
        <span class="token comment">//         path: 'basic-system/log',</span>
        <span class="token comment">//         requiredClaim: ClaimCode.BASIC_SYSTEM_LOG,</span>
        <span class="token comment">//         loadComponent: () => import('../../features/basic-system/    system-log.component')</span>
        <span class="token comment">//             .then(m => m.SystemLogComponent),</span>
        <span class="token comment">//     &#125;,</span>
        <span class="token comment">//     &#123;</span>
        <span class="token comment">//         path: 'external-system/vendor-data',</span>
        <span class="token comment">//         canActivate: [permissionGuard], // 需要有權限才能訪問</span>
        <span class="token comment">//         requiredClaim: ClaimCode.EXTERNAL_SYSTEM_VENDOR_DATA,</span>
        <span class="token comment">//         loadComponent: () => import('../../features/external-system/vendor-data.component')</span>
        <span class="token comment">//             .then(m => m.VendorDataComponent),</span>
        <span class="token comment">//         reuseRoute: true</span>
        <span class="token comment">//     &#125;</span>
        <span class="token comment">// ]</span>
        children<span class="token operator">:</span> <span class="token function">convertToRoutes</span><span class="token punctuation">(</span><span class="token constant">ROUTE_CONFIGS</span><span class="token punctuation">)</span>  <span class="token comment">// 使用集中管理的路由配置</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'**'</span><span class="token punctuation">,</span>
        redirectTo<span class="token operator">:</span> <span class="token string">'/login'</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-ts"><span class="token comment">// ClaimCode</span>
xxxxx_SYSTEM_MODULE <span class="token operator">=</span> <span class="token string">'XXXXX_SYSTEM_MODULE'</span><span class="token punctuation">,</span>

<span class="token comment">// 路徑畫面設定</span>
<span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">'parking-system/order-management'</span><span class="token punctuation">,</span>
    claim<span class="token operator">:</span> ClaimCode<span class="token punctuation">.</span><span class="token constant">PARKING_SYSTEM_ORDER</span><span class="token punctuation">,</span>
    <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'../../features/parking-system/order-management.component'</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>OrderManagementComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span></code>`),s(i),f(u,e)}const hs=Object.freeze(Object.defineProperty({__proto__:null,default:fs,metadata:Q},Symbol.toStringTag,{value:"Module"})),Z={title:"RouteReuseStrategy 1",date:"2026-01-23",category:"software",subCategory:"Angular20",tags:["fronted","angular"],slug:"angular_routeReuseStrategy01"},{title:Ip,date:Ap,category:Ep,subCategory:xp,tags:Pp,slug:Dp}=Z;var bs=w('<h6>RouteReuseStrategy 是 ANGULAR 判斷路由變更時，如何處理邏輯的一個介面</h6> <hr/> <p>Angular 在路由導航時，會自動把物件<code>route</code>轉成物件<code>ActivatedRouteSnapshot</code>，再經由<code>RouteReuse</code>去做邏輯判斷和流程。也就是說就算 app 沒有內部實作，系統也會自動帶入最基本的 Strategy 去過過水，可以看看檔案原始碼。</p> <pre class="language-ts"><!></pre> <p>所以若要去控制流程，需要替換掉預設的<code>BaseRouteReuseStrategy</code>改成自己需求的策略，那就是必須實作 5 個特定物件作為參數的函式，這 5 個必須實作的接口如下：</p> <pre class="language-typescript"><!></pre> <p>再來就是去宣告 app 說若有引用到 <code>RouteReuseStrategy</code> 時都必須使用我定義好的 class</p> <pre class="language-ts"><!></pre>',1);function vs(u){var e=bs(),p=t(b(e),6),k=n(p);a(k,()=>`<code class="language-ts"><span class="token keyword">declare</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">BaseRouteReuseStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">RouteReuseStrategy</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">/**
     * Whether the given route should detach for later reuse.
     * Always returns false for &#96;BaseRouteReuseStrategy&#96;.
     * */</span>
    <span class="token function">shouldDetach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
    <span class="token comment">/**
     * A no-op; the route is never stored since this strategy never detaches routes for later re-use.
     */</span>
    <span class="token function">store</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> detachedTree<span class="token operator">:</span> DetachedRouteHandle<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token comment">/** Returns &#96;false&#96;, meaning the route (and its subtree) is never reattached */</span>
    <span class="token function">shouldAttach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
    <span class="token comment">/** Returns &#96;null&#96; because this strategy does not store routes for later re-use. */</span>
    <span class="token function">retrieve</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">/**
     * Determines if a route should be reused.
     * This strategy returns &#96;true&#96; when the future route config and current route config are
     * identical.
     */</span>
    <span class="token function">shouldReuseRoute</span><span class="token punctuation">(</span>future<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> curr<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-typescript"><span class="token keyword">interface</span> <span class="token class-name">RouteReuseStrategy</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// 1. 判斷是否允許將當前路由從 DOM「分離」(detach) 並保存</span>
  <span class="token function">shouldDetach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

  <span class="token comment">// 2. 當 shouldDetach 返回 true 時觸發，將分離下來的路由「快照」存入你的儲存空間</span>
  <span class="token function">store</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> handle<span class="token operator">:</span> DetachedRouteHandle<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

  <span class="token comment">// 3. 判斷當前路由是否允許「還原」(attach) 之前存下來的快照</span>
  <span class="token function">shouldAttach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

  <span class="token comment">// 4. 當 shouldAttach 返回 true 時觸發，從你的儲存空間「取回」快照</span>
  <span class="token function">retrieve</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

  <span class="token comment">// 5. 判斷導航前後是否視為「同一個路由」(決定要重用還是銷毀重建)</span>
  <span class="token function">shouldReuseRoute</span><span class="token punctuation">(</span>future<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> curr<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// route-reuse.strategy.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> DetachedRouteHandle<span class="token punctuation">,</span> RouteReuseStrategy <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomRouteReuseStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">RouteReuseStrategy</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// 實作邏輯...</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-ts"><span class="token comment">// app.config.ts</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> appConfig<span class="token operator">:</span> ApplicationConfig <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  providers<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// provideBrowserGlobalErrorListeners(),</span>
    <span class="token comment">// provideZoneChangeDetection(&#123; eventCoalescing: true &#125;),</span>
    <span class="token comment">// provideRouter(routes),</span>
    <span class="token comment">// provideHttpClient(</span>
    <span class="token comment">//   withInterceptors([authInterceptor]) // 註冊 Auth Interceptor</span>
    <span class="token comment">// ),</span>
    <span class="token comment">// provideAnimationsAsync(),</span>

    <span class="token comment">// // App 初始化：恢復登入狀態（在路由啟動前完成）</span>
    <span class="token comment">// &#123;</span>
    <span class="token comment">//   provide: APP_INITIALIZER,</span>
    <span class="token comment">//   useFactory: initializeAuth,</span>
    <span class="token comment">//   multi: true</span>
    <span class="token comment">// &#125;,</span>

    <span class="token comment">// ANGULAR DI</span>
    <span class="token punctuation">&#123;</span> provide<span class="token operator">:</span> RouteReuseStrategy<span class="token punctuation">,</span> useClass<span class="token operator">:</span> CustomRouteReuseStrategy <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token comment">// provideNzIcons(icons),</span>
    <span class="token comment">// provideNzI18n(zh_TW),</span>
    <span class="token comment">// provideAnimationsAsync(),</span>
    <span class="token comment">// provideHttpClient()</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span></code>`),s(c),f(u,e)}const _s=Object.freeze(Object.defineProperty({__proto__:null,default:vs,metadata:Z},Symbol.toStringTag,{value:"Module"})),nn={title:"RouteReuseStrategy 2",date:"2026-01-24",category:"software",subCategory:"Angular20",tags:["fronted","angular"],slug:"angular_routeReuseStrategy02"},{title:Op,date:Np,category:Mp,subCategory:Lp,tags:$p,slug:qp}=nn;var Ss=w('<h6>RouteReuseStrategy 是 ANGULAR 判斷路由變更時，如何處理邏輯的一個介面</h6> <hr/> <p>前置流程:</p> <p><code>url變更 -&gt; angular 去找有沒有物件 route -&gt; 轉成物件 ActivatedRouteSnapshot -&gt; 進入 Strategy</code></p> <pre class="language-ts"><!></pre> <p>運行時序</p> <pre class="language-md"><!></pre> <h3>儲存</h3> <p>第一步要在物件 route 內部塞值當作 <code>shouldDetach()</code> 的依據，<code>route</code>本身開放 data 屬性可以塞自訂義資料</p> <pre class="language-ts"><!></pre> <p>實作 func shouldDetach() 就變成</p> <pre class="language-ts"><!></pre> <p>再來是用 func store() 來維護已儲存的快照。參數<code>ActivatedRouteSnapshot</code>就是拿剛剛的、<code>handle</code>由 angular 自己處理 Dom 快照後傳入，這邊執行成功後就是保存快照完成了。</p> <pre class="language-ts"><!></pre> <h3>讀取</h3> <p>跳轉路由時，就是去檢查 this.handlers 有沒有快照紀錄，來決定是否要 new Component() / retrieve()</p> <pre class="language-ts"><!></pre> <p>最後是判斷不同 URL 但使用相同路由設定的情況，例如不同參數的情境（如 /user/1 → /user/2）</p> <pre class="language-ts"><!></pre> <h3>遞迴</h3> <p>當路由設定為父子結構時（父路由 path: ‘basic/catalogmanagement’，子路由 path: ”），兩者組合出的路由路徑相同，作為 key 時會指向同一個值。導致父路由和子路由在 retrieve 時都匹配到同一個 key，retrieve 逐層解析路由樹時反覆取到同一個 handle，形成無限遞迴。</p> <pre class="language-ts"><!></pre> <p>所以我們要做的事情是流程避免掉父路由，那判斷依據可以用有沒有 component 去識別</p> <pre class="language-ts"><!></pre> <p>完整程式碼</p> <pre class="language-ts"><!></pre>',1);function Cs(u){var e=Ss(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">RouteReuseStrategy</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// 1. 判斷是否允許將當前路由從 DOM「分離」(detach) 並保存</span>
  <span class="token function">shouldDetach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

  <span class="token comment">// 2. 當 shouldDetach 返回 true 時觸發，將分離下來的路由「快照」存入你的儲存空間</span>
  <span class="token function">store</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> handle<span class="token operator">:</span> DetachedRouteHandle<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

  <span class="token comment">// 3. 判斷當前路由是否允許「還原」(attach) 之前存下來的快照</span>
  <span class="token function">shouldAttach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

  <span class="token comment">// 4. 當 shouldAttach 返回 true 時觸發，從你的儲存空間「取回」快照</span>
  <span class="token function">retrieve</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

  <span class="token comment">// 5. 判斷導航前後是否視為「同一個路由」(決定要重用還是銷毀重建)</span>
  <span class="token function">shouldReuseRoute</span><span class="token punctuation">(</span>future<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> curr<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-md">理想上的時序

導航：頁面 A → 頁面 B

<span class="token list punctuation">1.</span> shouldReuseRoute(B, A) → false（不同路由，繼續往下）

── 處理「舊路由 A」──
<span class="token list punctuation">2.</span> shouldDetach(A)         → 要不要保存 A？
<span class="token list punctuation">3.</span> store(A, handle)        → （如果 yes）把 A 存起來

── 處理「新路由 B」──
<span class="token list punctuation">4.</span> shouldAttach(B)         → B 之前有被存過嗎？
<span class="token list punctuation">5.</span> retrieve(B)             → （如果 yes）把 B 的快照拿出來用</code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-ts"><span class="token comment">// router_module.d.d.ts</span>
<span class="token keyword">interface</span> <span class="token class-name">Route</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">/**
     * Additional developer-defined data provided to the component via
     * &#96;ActivatedRoute&#96;. By default, no additional data is passed.
     */</span>
    data<span class="token operator">?</span><span class="token operator">:</span> Data<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// new Route()</span>
<span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">'-'</span><span class="token punctuation">,</span>
    <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'@app/features/basic-system/--'</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>CatalogManagement<span class="token punctuation">)</span><span class="token punctuation">,</span>
    canActivate<span class="token operator">:</span> <span class="token punctuation">[</span>routeGuard<span class="token punctuation">]</span><span class="token punctuation">,</span>
    data<span class="token operator">:</span> <span class="token punctuation">&#123;</span> reuseRoute<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">&#125;</span> <span class="token comment">// reuseRoute: true</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-ts"><span class="token comment">/**
 * 決定是否應該分離（保存）這個路由
 * @param route 當前路由快照
 * @returns true = 保存組件, false = 銷毀組件
 */</span>
<span class="token function">shouldDetach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> route<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token string">'reuseRoute'</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// 只保存有 data.reuseRoute 標記的路由</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-ts">
<span class="token comment">/**
 * 最大快取數量，超過時會移除最舊的快取
 */</span>
<span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token constant">MAX_CACHE_SIZE</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * 儲存已分離的路由組件
 * key: 路由路徑
 * value: 組件快照（包含狀態）
 */</span>
<span class="token keyword">private</span> handlers<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> DetachedRouteHandle<span class="token operator">></span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/**
 * 儲存分離的路由組件
 * @param route 路由快照
 * @param handle 組件快照（包含 DOM、狀態等）
 */</span>
<span class="token function">store</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> handle<span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>handle<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 如果快取已滿，移除最舊的快取（Map 保持插入順序）</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span>size <span class="token operator">>=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">MAX_CACHE_SIZE</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">const</span> oldestKey <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">const</span> oldHandle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>oldHandle <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>oldHandle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token punctuation">(</span>oldHandle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 快取已滿，移除最舊的: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>oldestKey<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 保存路由: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> (快取數量: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">MAX_CACHE_SIZE</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">)</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 生成路由的唯一鍵值
 * @param route 路由快照
 * @returns 路由鍵值
 */</span>
<span class="token keyword">private</span> <span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 使用 routeConfig.path 來組合完整路徑，避免空路徑子路由造成的問題</span>
    <span class="token keyword">const</span> segments<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> current<span class="token operator">:</span> ActivatedRouteSnapshot <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> route<span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>routeConfig <span class="token operator">&amp;&amp;</span> current<span class="token punctuation">.</span>routeConfig<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            segments<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>routeConfig<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        current <span class="token operator">=</span> current<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> segments<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-ts"><span class="token comment">/**
 * 決定是否應該重新附加（恢復）之前保存的路由
 * @param route 路由快照
 * @returns true = 使用保存的組件, false = 創建新組件
 */</span>
<span class="token function">shouldAttach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>route<span class="token punctuation">.</span>component <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>route<span class="token punctuation">.</span>routeConfig<span class="token operator">?.</span>loadComponent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> hasStored <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>hasStored<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 恢復路由: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> hasStored<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 取回之前保存的路由組件
 * @param route 路由快照
 * @returns 保存的組件快照
 */</span>
<span class="token function">retrieve</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 防止 Angular 13+ 的路由資料繼承問題：</span>
    <span class="token comment">// 沒有組件的路由不應該取回快取，避免無限迴圈</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>route<span class="token punctuation">.</span>component <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>route<span class="token punctuation">.</span>routeConfig<span class="token operator">?.</span>loadComponent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(m);var h=t(m,4),R=n(h);a(R,()=>`<code class="language-ts"><span class="token comment">/**
 * 決定是否應該重用路由
 * @param future 即將進入的路由
 * @param curr 當前路由
 * @returns true = 重用, false = 不重用
 */</span>
<span class="token function">shouldReuseRoute</span><span class="token punctuation">(</span>future<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> curr<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> future<span class="token punctuation">.</span>routeConfig <span class="token operator">===</span> curr<span class="token punctuation">.</span>routeConfig<span class="token punctuation">;</span> <span class="token comment">// 比較的是物件參考</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var _=t(h,6),I=n(_);a(I,()=>`<code class="language-ts"><span class="token comment">// 路由設定：</span>
<span class="token punctuation">&#123;</span>
  path<span class="token operator">:</span> <span class="token string">'basic/catalogmanagement'</span><span class="token punctuation">,</span>     <span class="token comment">// 父路由（沒有 component）</span>
  children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>                          <span class="token comment">// 子路由（有 component）</span>
    data<span class="token operator">:</span> <span class="token punctuation">&#123;</span> reuseRoute<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span></code>`),s(_);var S=t(_,4),E=n(S);a(E,()=>`<code class="language-ts">
<span class="token comment">/**
 * 決定是否應該重新附加（恢復）之前保存的路由
 * @param route 路由快照
 * @returns true = 使用保存的組件, false = 創建新組件
 */</span>
<span class="token function">shouldAttach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>route<span class="token punctuation">.</span>component <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>route<span class="token punctuation">.</span>routeConfig<span class="token operator">?.</span>loadComponent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> hasStored <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>hasStored<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 恢復路由: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> hasStored<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/**
 * 取回之前保存的路由組件
 * @param route 路由快照
 * @returns 保存的組件快照
 */</span>
<span class="token function">retrieve</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 防止 Angular 13+ 的路由資料繼承問題：</span>
    <span class="token comment">// 沒有組件的路由不應該取回快取，避免無限迴圈</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>route<span class="token punctuation">.</span>component <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>route<span class="token punctuation">.</span>routeConfig<span class="token operator">?.</span>loadComponent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`),s(S);var C=t(S,4),x=n(C);a(x,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> DetachedRouteHandle<span class="token punctuation">,</span> RouteReuseStrategy <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomRouteReuseStrategy</span> <span class="token keyword">implements</span> <span class="token class-name">RouteReuseStrategy</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">/**
     * 最大快取數量，超過時會移除最舊的快取
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token constant">MAX_CACHE_SIZE</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * 儲存已分離的路由組件
     * key: 路由路徑
     * value: 組件快照（包含狀態）
     */</span>
    <span class="token keyword">private</span> handlers<span class="token operator">:</span> Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> DetachedRouteHandle<span class="token operator">></span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * 標記準備要被銷毀的路由路徑
     * 用於處理「關閉當前分頁」的情況，防止路由在導航離開時被再次保存
     */</span>
    <span class="token keyword">private</span> safeToDestroy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/**
     * 決定是否應該分離（保存）這個路由
     * @param route 當前路由快照
     * @returns true = 保存組件, false = 銷毀組件
     */</span>
    <span class="token function">shouldDetach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果該路徑被標記為要銷毀（即正在關閉分頁）</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>safeToDestroy<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>safeToDestroy<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 路由標記為銷毀，不進行保存: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">// 只保存有 data.reuseRoute 標記的路由</span>
        <span class="token keyword">return</span> route<span class="token punctuation">.</span>data<span class="token punctuation">[</span><span class="token string">'reuseRoute'</span><span class="token punctuation">]</span> <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 儲存分離的路由組件
     * @param route 路由快照
     * @param handle 組件快照（包含 DOM、狀態等）
     */</span>
    <span class="token function">store</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> handle<span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 再次檢查是否被標記為銷毀（雙重保險）</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>safeToDestroy<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>safeToDestroy<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>handle<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 如果快取已滿，移除最舊的快取（Map 保持插入順序）</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span>size <span class="token operator">>=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">MAX_CACHE_SIZE</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">const</span> oldestKey <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token keyword">const</span> oldHandle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>oldestKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldHandle <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>oldHandle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                        <span class="token punctuation">(</span>oldHandle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 快取已滿，移除最舊的: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>oldestKey<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span>

            <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> handle<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 保存路由: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string"> (快取數量: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token constant">MAX_CACHE_SIZE</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">)</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 決定是否應該重新附加（恢復）之前保存的路由
     * @param route 路由快照
     * @returns true = 使用保存的組件, false = 創建新組件
     */</span>
    <span class="token function">shouldAttach</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>route<span class="token punctuation">.</span>component <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>route<span class="token punctuation">.</span>routeConfig<span class="token operator">?.</span>loadComponent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> hasStored <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>hasStored<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 恢復路由: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>path<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">return</span> hasStored<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 取回之前保存的路由組件
     * @param route 路由快照
     * @returns 保存的組件快照
     */</span>
    <span class="token function">retrieve</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> DetachedRouteHandle <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 防止 Angular 13+ 的路由資料繼承問題：</span>
        <span class="token comment">// 沒有組件的路由不應該取回快取，避免無限迴圈</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>route<span class="token punctuation">.</span>component <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>route<span class="token punctuation">.</span>routeConfig<span class="token operator">?.</span>loadComponent<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 決定是否應該重用路由
     * @param future 即將進入的路由
     * @param curr 當前路由
     * @returns true = 重用, false = 不重用
     */</span>
    <span class="token function">shouldReuseRoute</span><span class="token punctuation">(</span>future<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">,</span> curr<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> future<span class="token punctuation">.</span>routeConfig <span class="token operator">===</span> curr<span class="token punctuation">.</span>routeConfig<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 處理分頁關閉的邏輯
     * @param url 完整的路由路徑 (e.g. /main/basic-system/log)
     */</span>
    <span class="token function">close</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 確保格式一致（移除開頭 slash）</span>
        <span class="token keyword">const</span> key <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span> <span class="token operator">?</span> url<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">:</span> url<span class="token punctuation">;</span>

        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 嘗試關閉路由: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>key<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 1. 如果該路由目前在背景緩存中，直接移除並銷毀</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">const</span> handle <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 嘗試手動銷毀組件以釋放資源</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>handle <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>handle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token punctuation">(</span>handle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[RouteReuse] 已清除緩存並銷毀組件: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>key<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">// 2. 標記該路徑為待銷毀</span>
        <span class="token comment">// 這樣如果它是「當前分頁」，在導航離開觸發 shouldDetach 時會回傳 false</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>safeToDestroy<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 生成路由的唯一鍵值
     * @param route 路由快照
     * @returns 路由鍵值
     */</span>
    <span class="token keyword">private</span> <span class="token function">getRouteKey</span><span class="token punctuation">(</span>route<span class="token operator">:</span> ActivatedRouteSnapshot<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 使用 routeConfig.path 來組合完整路徑，避免空路徑子路由造成的問題</span>
        <span class="token keyword">const</span> segments<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> current<span class="token operator">:</span> ActivatedRouteSnapshot <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> route<span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>current<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>routeConfig <span class="token operator">&amp;&amp;</span> current<span class="token punctuation">.</span>routeConfig<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                segments<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>routeConfig<span class="token punctuation">.</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            current <span class="token operator">=</span> current<span class="token punctuation">.</span>parent<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">return</span> segments<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 清除所有保存的路由
     */</span>
    <span class="token function">clearAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>handle <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>handle <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>handle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token punctuation">(</span>handle <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token punctuation">.</span>componentRef<span class="token punctuation">.</span><span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>handlers<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>safeToDestroy<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[RouteReuse] 清除所有保存的路由'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 清除特定路由（舊版相容）
     */</span>
    <span class="token function">clear</span><span class="token punctuation">(</span>path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(C),f(u,e)}const Rs=Object.freeze(Object.defineProperty({__proto__:null,default:Cs,metadata:nn},Symbol.toStringTag,{value:"Module"})),sn={title:"Signal",date:"2025-11-12",category:"software",subCategory:"Angular20",tags:["fronted","angular","route"],slug:"angular_signal"},{title:jp,date:Hp,category:Up,subCategory:Bp,tags:Fp,slug:Vp}=sn;var Ts=w(`<h6>認識新的 StateAPI - Signal 參考 <a href="https://v20.angular.dev/guide/signals" rel="nofollow">Angular20</a>、<a href="https://nx.dev/blog/angular-state-management-2025" rel="nofollow">2025 AngularStateManagement</a></h6> <hr/> <h3>Signals</h3> <p>Writable signals</p> <p>宣告一個 WritableSignal<number>初始值為 signal(a)</number></p> <pre class="language-ts"><!></pre> <p>Computed signals</p> <p>宣告一個 Signal<number>初始值由 signal() * 2 計算得出
當 computed 被宣告時，會執行一次函數</number></p> <ul><li>函數內呼叫 signal() 時，signal 會自動記錄 “computed 依賴”
當 signal 被更新(set)時，會通知所有依賴它的 computed</li> <li>標記那些 computed 的快取為無效
當讀取 computed() 時，檢查快取是否無效</li> <li>無效 → 重新執行函數計算新值</li> <li>有效 → 直接回傳快取值</li></ul> <pre class="language-ts"><!></pre> <pre class="language-ts"><!></pre> <p>實務開發上 Angular20 都是寫 class component 和有提供 DI 注入(全域管理)，大多是 Class 內宣告 readonly 來完整保護屬性 <code>readonly count = signal(0)</code>，外部需要修改值直接使用 <code>count.set(3)</code> 就可以了。</p> <pre class="language-ts"><!></pre> <p><strong><em>signal 、 computed 、 effect、 linkedSignal</em></strong></p> <p>順便提另外一種寫法就是限讀 <code>private _options = signal&lt;string[]&gt;</code>，確認變數在外部只能讀取無法調用 signal API</p> <pre class="language-ts"><!></pre> <p>目前選單重置後都會預設第一個，再添加一個判斷”當前選項在新選單內就不變動”</p> <pre class="language-ts"><!></pre> <p>小結一下</p> <ul><li>computed : 純粹的衍生狀態 (tax = priceSignal * 0.05)</li> <li>effect : 當作流程控制響應(副作用處理)，例如跳出彈窗或打 API 等</li> <li>linkedSignal: 可被寫入的 computed</li></ul> <p><strong><em>signal state</em></strong></p> <p>ngrx 提供的API，主要在強型別和結構化上的規範</p> <pre class="language-ts"><!></pre> <p><strong><em>signal Store</em></strong></p> <pre class="language-ts"><!></pre>`,1);function Is(u){var e=Ts(),p=t(b(e),10),k=n(p);a(k,()=>`<code class="language-ts"><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'The count is: '</span> <span class="token operator">+</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
count<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
count<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>value <span class="token operator">=></span> value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 當前值 ++</span></code>`),s(p);var o=t(p,8),r=n(o);a(r,()=>`<code class="language-ts"><span class="token keyword">const</span> count<span class="token operator">:</span> WritableSignal<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> doubleCount<span class="token operator">:</span> Signal<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(o);var c=t(o,2),d=n(c);a(d,()=>`<code class="language-ts"><span class="token comment">// in class </span>
<span class="token keyword">readonly</span> showCount <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">readonly</span> count <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">readonly</span> conditionalCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">showCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">The count is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">.</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token string">'Nothing to see here!'</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
    &lt;p>Hello, &#123;&#123; name() &#125;&#125;&lt;/p>
    &lt;button (click)="updateName()">Update&lt;/button>
  </span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MessageComponent</span> <span class="token punctuation">&#123;</span>
  name <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">'World'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 宣告同步變數</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span> <span class="token comment">// 掛載監聽事件</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Name has changed: '</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token function">updateName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Mike'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
<span class="token comment">// 2</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppStore</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">readonly</span> state <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">add</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token operator">...</span>oldState<span class="token punctuation">,</span> item<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token keyword">delete</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> oldState<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> e<span class="token punctuation">.</span>id <span class="token operator">!==</span> item<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token function">update</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span>
      oldState<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>id <span class="token operator">===</span> item<span class="token punctuation">.</span>id <span class="token operator">?</span> item <span class="token operator">:</span> e<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,6),y=n(i);a(y,()=>`<code class="language-ts"><span class="token comment">// signal</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> _options <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'標準運送'</span><span class="token punctuation">,</span> <span class="token string">'快速運送'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _selected <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  selected <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 用戶選擇</span>
  <span class="token function">select</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token comment">// 模擬：根據地區更新運送選項</span>
  <span class="token function">changeRegion</span><span class="token punctuation">(</span>region<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>region <span class="token operator">===</span> <span class="token string">'離島'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'船運'</span><span class="token punctuation">,</span> <span class="token string">'空運'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 此時 _selected 還會是 init 的值"標準運送"</span>
      <span class="token comment">// 所以還需要更新 this._selected</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// computed (false)</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> _options <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'標準運送'</span><span class="token punctuation">,</span> <span class="token string">'快速運送'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// 可能會想這樣寫...</span>
  <span class="token keyword">private</span> _selected <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  selected <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">;</span> <span class="token comment">// computed 本身就是 readonly</span>

  <span class="token function">select</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token comment">// 會編譯錯誤，computed 沒有 .set() 方法</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">changeRegion</span><span class="token punctuation">(</span>region<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>region <span class="token operator">===</span> <span class="token string">'離島'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'船運'</span><span class="token punctuation">,</span> <span class="token string">'空運'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// _selected 會自動變成 '船運'，這部分沒問題</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// computed</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> _options <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'標準運送'</span><span class="token punctuation">,</span> <span class="token string">'快速運送'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 堅持用 computed 會變成</span>
  <span class="token keyword">private</span> _#selected <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _selected <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span>_<span class="token function">#selected</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 好處只有 _selected 變成 readonly</span>

  options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  selected <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">;</span>

  <span class="token function">select</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_#selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
  <span class="token punctuation">&#125;</span>

  <span class="token function">changeRegion</span><span class="token punctuation">(</span>region<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>region <span class="token operator">===</span> <span class="token string">'離島'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'船運'</span><span class="token punctuation">,</span> <span class="token string">'空運'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_#selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 重複第一種</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// effect</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> _options <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'標準運送'</span><span class="token punctuation">,</span> <span class="token string">'快速運送'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _selected <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  selected <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 用 effect 監聽變化並重設，解決了手動 reset 問題</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">const</span> opts <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>opts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> allowSignalWrites<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 需要加這個選項才能在 effect 內寫入 signal</span>
  <span class="token punctuation">&#125;</span>

  <span class="token comment">// 用戶選擇</span>
  <span class="token function">select</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token comment">// 模擬：根據地區更新運送選項</span>
  <span class="token function">changeRegion</span><span class="token punctuation">(</span>region<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>region <span class="token operator">===</span> <span class="token string">'離島'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'船運'</span><span class="token punctuation">,</span> <span class="token string">'空運'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// linkedSignal</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> _options <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'標準運送'</span><span class="token punctuation">,</span> <span class="token string">'快速運送'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _selected <span class="token operator">=</span> <span class="token function">linkedSignal</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 不用額外寫監聽、好維護</span>

  options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  selected <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">select</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">changeRegion</span><span class="token punctuation">(</span>region<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>region <span class="token operator">===</span> <span class="token string">'離島'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'船運'</span><span class="token punctuation">,</span> <span class="token string">'空運'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,4),v=n(m);a(v,()=>`<code class="language-ts"><span class="token comment">// effect</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> _options <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'標準運送'</span><span class="token punctuation">,</span> <span class="token string">'快速運送'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">private</span> _selected <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  selected <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">const</span> opts <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> current <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_selected</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>opts<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span> <span class="token comment">// 如果當前選項還在新選單中，就保留；否則重置為首項</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>opts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> allowSignalWrites<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 需要加這個選項才能在 effect 內寫入 signal</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">select</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">changeRegion</span><span class="token punctuation">(</span>region<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>region <span class="token operator">===</span> <span class="token string">'離島'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'船運'</span><span class="token punctuation">,</span> <span class="token string">'空運'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// linkedSignal</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ShoppingCart</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> _options <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'標準運送'</span><span class="token punctuation">,</span> <span class="token string">'快速運送'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// 有提供 API 方便處理</span>
  <span class="token keyword">private</span> _selected <span class="token operator">=</span> <span class="token generic-function"><span class="token function">linkedSignal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    source<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">,</span>
    <span class="token function-variable function">computation</span><span class="token operator">:</span> <span class="token punctuation">(</span>newOptions<span class="token punctuation">,</span> previous<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>previous <span class="token operator">&amp;&amp;</span> newOptions<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>previous<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> previous<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
      <span class="token punctuation">&#125;</span>
      <span class="token keyword">return</span> newOptions<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  selected <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">select</span><span class="token punctuation">(</span>index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_selected<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_options</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">changeRegion</span><span class="token punctuation">(</span>region<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>region <span class="token operator">===</span> <span class="token string">'離島'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_options<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'船運'</span><span class="token punctuation">,</span> <span class="token string">'空運'</span><span class="token punctuation">,</span> <span class="token string">'超商取貨'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(m);var h=t(m,10),R=n(h);a(R,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> patchState<span class="token punctuation">,</span> signalState <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@ngrx/signals'</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppStore</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">readonly</span> state <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signalState</span><span class="token generic class-name"><span class="token operator">&lt;</span>Store<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> items<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">addToStore</span><span class="token punctuation">(</span>item<span class="token operator">:</span> StoreItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">patchState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
      <span class="token operator">...</span>oldState<span class="token punctuation">,</span>
      items<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span>oldState<span class="token punctuation">.</span>items<span class="token punctuation">,</span> item<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token function">removeFromStore</span><span class="token punctuation">(</span>item<span class="token operator">:</span> StoreItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">patchState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
      <span class="token operator">...</span>oldState<span class="token punctuation">,</span>
      items<span class="token operator">:</span> oldState<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> e<span class="token punctuation">.</span>id <span class="token operator">!==</span> item<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token function">updateStore</span><span class="token punctuation">(</span>item<span class="token operator">:</span> StoreItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">patchState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">,</span> <span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
      <span class="token operator">...</span>oldState<span class="token punctuation">,</span>
      items<span class="token operator">:</span> oldState<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
        e<span class="token punctuation">.</span>id <span class="token operator">===</span> item<span class="token punctuation">.</span>id <span class="token operator">?</span> <span class="token punctuation">&#123;</span> <span class="token operator">...</span>item<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">'bar'</span> <span class="token punctuation">&#125;</span> <span class="token operator">:</span> e
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var _=t(h,4),I=n(_);a(I,()=>`<code class="language-ts"><span class="token comment">// signalStore () 算是會自動 DI </span>
<span class="token keyword">const</span> AppStore <span class="token operator">=</span> <span class="token function">signalStore</span><span class="token punctuation">(</span>
  <span class="token generic-function"><span class="token function">withState</span><span class="token generic class-name"><span class="token operator">&lt;</span>Store<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    items<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">withMethods</span><span class="token punctuation">(</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token function">addToStore</span><span class="token punctuation">(</span>item<span class="token operator">:</span> StoreItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token function">patchState</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> <span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
        <span class="token operator">...</span>oldState<span class="token punctuation">,</span>
        items<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">...</span>oldState<span class="token punctuation">.</span>items<span class="token punctuation">,</span> item<span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token function">removeFromStore</span><span class="token punctuation">(</span>item<span class="token operator">:</span> StoreItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token function">patchState</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> <span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
        <span class="token operator">...</span>oldState<span class="token punctuation">,</span>
        items<span class="token operator">:</span> oldState<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span> e<span class="token punctuation">.</span>id <span class="token operator">!==</span> item<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token function">updateStore</span><span class="token punctuation">(</span>item<span class="token operator">:</span> StoreItem<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token function">patchState</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> <span class="token punctuation">(</span>oldState<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
        <span class="token operator">...</span>oldState<span class="token punctuation">,</span>
        items<span class="token operator">:</span> oldState<span class="token punctuation">.</span>items<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
          e<span class="token punctuation">.</span>id <span class="token operator">===</span> item<span class="token punctuation">.</span>id <span class="token operator">?</span> <span class="token punctuation">&#123;</span> <span class="token operator">...</span>item<span class="token punctuation">,</span> name<span class="token operator">:</span> <span class="token string">'bar'</span> <span class="token punctuation">&#125;</span> <span class="token operator">:</span> e
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(_),f(u,e)}const As=Object.freeze(Object.defineProperty({__proto__:null,default:Is,metadata:sn},Symbol.toStringTag,{value:"Module"})),an={title:"TabService",date:"2025-12-05",category:"software",subCategory:"Angular20",tags:["fronted","angular","RxJS"],slug:"angular_tabService"},{title:Gp,date:Wp,category:Yp,subCategory:zp,tags:Jp,slug:Kp}=an;var Es=w('<h6>企業內部系統常用到的分頁顯示管理</h6> <hr/> <p>分頁管理器，主要功能會是需要可以</p> <ol><li>存放(已Instance)當前的分頁(Component)</li> <li>選擇該分頁替換內容</li> <li>銷毀分頁</li></ol> <p>至少要建立兩個資料模型</p> <pre class="language-ts"><!></pre> <h3>BehaviorSubject</h3> <p>RxJS庫提供一個可觀察物件 (Observable) BehaviorSubject。它主要用於宣告和管理一個帶有初始值的狀態變數。它同時具備「觀察者 (Observer)」和「可觀察物件 (Observable)」的特性。</p> <pre class="language-ts"><!></pre> <h3>Signal</h3> <p>新版 Angular(16+) 提供框架內部語法 Signal 來雙向監聽</p> <pre class="language-ts"><!></pre> <p>整體概念和 React18 useState 用法很像</p> <pre class="language-ts"><!></pre> <p>邏輯層 tab.service.ts</p> <pre class="language-ts"><!></pre> <p>UI層 tab-container.ts</p> <pre class="language-ts"><!></pre>',1);function xs(u){var e=Es(),p=t(b(e),10),k=n(p);a(k,()=>`<code class="language-ts"><span class="token comment">// 每個目錄的基本資料結構，用 id 當作唯一識別</span>
<span class="token keyword">interface</span> <span class="token class-name">MenuItem</span> <span class="token punctuation">&#123;</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    label<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    route<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    icon<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    children<span class="token operator">?</span><span class="token operator">:</span> MenuItem<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    expanded<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// new() 時參數拿做 MenuItem.id + MenuItem.route</span>
<span class="token comment">// MenuItem.id 當作識別 &amp;&amp; MenuItem.route 當作 click(() => route)</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Tab</span> <span class="token punctuation">&#123;</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    route<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    closable<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TabService</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">private</span> tabs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BehaviorSubject<span class="token operator">&lt;</span>Tab<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> activeTabId <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BehaviorSubject<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 提供給外部使用的變數，會自動監聽值(tabs,activeTabId)</span>
    tabs$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    activeTabId$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>activeTabId<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> router<span class="token operator">:</span> Router<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span> <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 開啟新分頁
     */</span>
    <span class="token function">openTab</span><span class="token punctuation">(</span>tab<span class="token operator">:</span> Tab<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> currentTabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">const</span> existingTab <span class="token operator">=</span> currentTabs<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>t <span class="token operator">=></span> t<span class="token punctuation">.</span>id <span class="token operator">===</span> tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>existingTab<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 如果分頁已存在，切換到該分頁</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setActiveTab</span><span class="token punctuation">(</span>tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>tab<span class="token punctuation">.</span>route<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 新增分頁</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>currentTabs<span class="token punctuation">,</span> tab<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 替換整個陣列才會觸發事件通知(rerender)</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setActiveTab</span><span class="token punctuation">(</span>tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>tab<span class="token punctuation">.</span>route<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Injectable<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> effect<span class="token punctuation">,</span> Signal <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token comment">// Signal 方式</span>
<span class="token comment">// 宣告可寫入的 Signal</span>
<span class="token keyword">private</span> tabsSignal <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span>Tab<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> activeTabIdSignal <span class="token operator">=</span> <span class="token generic-function"><span class="token function">signal</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">readonly</span> tabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabsSignal<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">readonly</span> activeTabId <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>activeTabIdSignal<span class="token punctuation">.</span><span class="token function">asReadonly</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-ts"><span class="token keyword">function</span> <span class="token function">TabServiceComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>tabs<span class="token punctuation">,</span> setTabs<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>activeTabId<span class="token punctuation">,</span> setActiveTabId<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">useState</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">addTab</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> newTab<span class="token operator">:</span> Tab <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
            id<span class="token operator">:</span> nextId<span class="token punctuation">,</span>
            title<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">新分頁 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>nextId<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span>
        <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
        
        <span class="token function">setTabs</span><span class="token punctuation">(</span>currentTabs <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token operator">...</span>currentTabs<span class="token punctuation">,</span> newTab<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token function">setActiveTabId</span><span class="token punctuation">(</span>nextId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">switchTab</span> <span class="token operator">=</span> <span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token function">setActiveTabId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Injectable <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BehaviorSubject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Router <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">Tab</span> <span class="token punctuation">&#123;</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    title<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    route<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    closable<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    providedIn<span class="token operator">:</span> <span class="token string">'root'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TabService</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">private</span> tabs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BehaviorSubject<span class="token operator">&lt;</span>Tab<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> activeTabId <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BehaviorSubject<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    tabs$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    activeTabId$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>activeTabId<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> router<span class="token operator">:</span> Router<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span> <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 開啟新分頁
     */</span>
    <span class="token function">openTab</span><span class="token punctuation">(</span>tab<span class="token operator">:</span> Tab<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> currentTabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">const</span> existingTab <span class="token operator">=</span> currentTabs<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>t <span class="token operator">=></span> t<span class="token punctuation">.</span>id <span class="token operator">===</span> tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>existingTab<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 如果分頁已存在，切換到該分頁</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setActiveTab</span><span class="token punctuation">(</span>tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>tab<span class="token punctuation">.</span>route<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 新增分頁</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span>currentTabs<span class="token punctuation">,</span> tab<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setActiveTab</span><span class="token punctuation">(</span>tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>tab<span class="token punctuation">.</span>route<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 關閉分頁
     */</span>
    <span class="token function">closeTab</span><span class="token punctuation">(</span>tabId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> currentTabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">const</span> index <span class="token operator">=</span> currentTabs<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span>t <span class="token operator">=></span> t<span class="token punctuation">.</span>id <span class="token operator">===</span> tabId<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token keyword">const</span> newTabs <span class="token operator">=</span> currentTabs<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>t <span class="token operator">=></span> t<span class="token punctuation">.</span>id <span class="token operator">!==</span> tabId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>newTabs<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果關閉的是當前分頁，切換到前一個或後一個</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>activeTabId<span class="token punctuation">.</span>value <span class="token operator">===</span> tabId <span class="token operator">&amp;&amp;</span> newTabs<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">const</span> newActiveIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setActiveTab</span><span class="token punctuation">(</span>newTabs<span class="token punctuation">[</span>newActiveIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>router<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>newTabs<span class="token punctuation">[</span>newActiveIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>route<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>newTabs<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>activeTabId<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 設定當前分頁
     */</span>
    <span class="token function">setActiveTab</span><span class="token punctuation">(</span>tabId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>activeTabId<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>tabId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 關閉所有分頁
     */</span>
    <span class="token function">closeAllTabs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>activeTabId<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token comment">/**
     * 關閉其他分頁
     */</span>
    <span class="token function">closeOtherTabs</span><span class="token punctuation">(</span>tabId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> currentTabs <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">const</span> keepTab <span class="token operator">=</span> currentTabs<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>t <span class="token operator">=></span> t<span class="token punctuation">.</span>id <span class="token operator">===</span> tabId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>keepTab<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>tabs<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">[</span>keepTab<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setActiveTab</span><span class="token punctuation">(</span>tabId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,4),v=n(m);a(v,()=>`<code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-tab-container'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>CommonModule<span class="token punctuation">,</span> RouterOutlet<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
    &lt;div class="tab-container">
      &lt;!-- 分頁標籤列 -->
      &lt;div class="tab-bar" *ngIf="(tabs$ | async)?.length">
        &lt;div *ngFor="let tab of tabs$ | async" 
             class="tab"
             [class.active]="tab.id === (activeTabId$ | async)"
             (click)="switchTab(tab)">
          &lt;span class="tab-title">&#123;&#123; tab.title &#125;&#125;&lt;/span>
          &lt;button *ngIf="tab.closable" 
                  class="close-btn"
                  (click)="closeTab($event, tab.id)">
            ✕
          &lt;/button>
        &lt;/div>
      &lt;/div>

      &lt;!-- 分頁內容區 -->
      &lt;div class="tab-content">
        &lt;router-outlet>&lt;/router-outlet>
      &lt;/div>
    &lt;/div>
  </span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span>
  styles<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">...省略
  </span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">TabContainerComponent</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> tabService <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>TabService<span class="token punctuation">)</span><span class="token punctuation">;</span>
  tabs$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabService<span class="token punctuation">.</span>tabs$<span class="token punctuation">;</span>
  activeTabId$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>tabService<span class="token punctuation">.</span>activeTabId$<span class="token punctuation">;</span>

  <span class="token function">switchTab</span><span class="token punctuation">(</span>tab<span class="token operator">:</span> Tab<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tabService<span class="token punctuation">.</span><span class="token function">setActiveTab</span><span class="token punctuation">(</span>tab<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">closeTab</span><span class="token punctuation">(</span>event<span class="token operator">:</span> Event<span class="token punctuation">,</span> tabId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    event<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>tabService<span class="token punctuation">.</span><span class="token function">closeTab</span><span class="token punctuation">(</span>tabId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(m),f(u,e)}const Ps=Object.freeze(Object.defineProperty({__proto__:null,default:xs,metadata:an},Symbol.toStringTag,{value:"Module"})),tn={title:"Value 1",date:"2025-06-22",category:"software",subCategory:"Angular20",tags:["fronted","angular","value"],slug:"angular_value02"},{title:Xp,date:Qp,category:Zp,subCategory:no,tags:so,slug:ao}=tn;var Ds=w(`<h6>應用中傳遞值的方法</h6> <hr/> <p><a href="https://angular.dev/guide/components/inputs#declaring-inputs-with-the-input-decorator" rel="nofollow">官方文件</a></p> <h3>Input</h3> <p>舊版寫法 <code>@Input()</code></p> <p>有提供一些屬性操作，可參考文件</p> <pre class="language-ts"><!></pre> <p>新版寫法 <code>import &#123; input &#125; from '@angular/core'</code></p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre> <h3>Output</h3> <p>都須維護兩個值</p> <br/> <p>舊版寫法 <code>@Output()</code></p> <pre class="language-js"><!></pre> <p>新版寫法<code>import &#123; input, output &#125; from '@angular/core'</code></p> <pre class="language-js"><!></pre> <pre class="language-html"><!></pre> <h3>ViewChild & ViewChildren</h3> <p>ViewChild(抓第一個) & ViewChildren(抓符合條件) 是 Angular 中的一種在元件 class 中存取 template 上某個/種類元素或元件實例的方法。</p> <p>舊版 @ViewChild()</p> <pre class="language-js"><!></pre> <pre class="language-html"><!></pre> <p>新版 viewChild()</p> <pre class="language-js"><!></pre> <p>可以這樣用</p> <pre class="language-js"><!></pre> <h3>Dependency Injection</h3> <pre class="language-ts"><!></pre> <pre class="language-ts"><!></pre> <h3>Signals</h3> <pre class="language-js"><!></pre> <pre class="language-ts"><!></pre> <p>常見用法</p> <pre class="language-ts"><!></pre> <h3>untracked()</h3> <p>讀取 signal 值，但不想讓它變成 reactive 依賴時，就用 untracked()</p> <p>原本</p> <pre class="language-js"><!></pre> <p>有時只需初始化時取值就好，所以不須自動追蹤。有需要再寫一個 function 取值</p> <pre class="language-js"><!></pre> <p>條件符合再反應一次</p> <pre class="language-js"><!></pre>`,1);function Os(u){var e=Ds(),p=t(b(e),12),k=n(p);a(k,()=>`<code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// = 0 為初始值, 若有傳遞進來就取代</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> defineValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> input <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  defineValue <span class="token operator">=</span> <span class="token function">input</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 這就是 signal 版本的 Input</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,2),d=n(c);a(d,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>custom-slider</span> <span class="token attr-name">[defineValue]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>`),s(c);var l=t(c,10),g=n(l);a(g,()=>`<code class="language-js">@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  @<span class="token function">Input</span><span class="token punctuation">(</span><span class="token punctuation">)</span> defineValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  @<span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span> defineValueChange <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventEmitter</span><span class="token operator">&lt;</span>number<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">onValueChange</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">newValue</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValueChange<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> input<span class="token punctuation">,</span> output <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  defineValue <span class="token operator">=</span> <span class="token function">input</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  defineValueChange <span class="token operator">=</span> output<span class="token operator">&lt;</span>number<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token function">onValueChange</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">newValue</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValueChange<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,2),v=n(m);a(v,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>custom-slider</span>
  <span class="token attr-name">[defineValue]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sliderValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">(defineValueChange)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sliderValue = $event<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>custom-slider</span> <span class="token attr-name">[(defineValue)]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>`),s(m);var h=t(m,8),R=n(h);a(R,()=>`<code class="language-js">@<span class="token function">ViewChild</span><span class="token punctuation">(</span><span class="token string">'myDiv'</span><span class="token punctuation">)</span> divElement<span class="token operator">!</span><span class="token operator">:</span> ElementRef<span class="token punctuation">;</span>

<span class="token function">ngAfterViewInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>divElement<span class="token punctuation">.</span>nativeElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var _=t(h,2),I=n(_);a(I,()=>'<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">#myDiv</span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>'),s(_);var S=t(_,4),E=n(S);a(E,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component<span class="token punctuation">,</span> effect<span class="token punctuation">,</span> viewChild<span class="token punctuation">,</span> ElementRef <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  <span class="token literal-property property">selector</span><span class="token operator">:</span> <span class="token string">'app-my-component'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">standalone</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">&lt;div #myDiv>Hello&lt;/div></span><span class="token template-punctuation string">&#96;</span></span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token punctuation">&#123;</span>
  div <span class="token operator">=</span> <span class="token function">viewChild</span><span class="token punctuation">(</span><span class="token string">'myDiv'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'div:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?.</span>nativeElement<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// signal.value 可改寫為函式形式</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(S);var C=t(S,4),x=n(C);a(x,()=>`<code class="language-js"><span class="token comment">// div = viewChild.required('myDiv', &#123; read: ElementRef &#125;);</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>nativeElement<span class="token punctuation">;</span>
  el<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>border <span class="token operator">=</span> <span class="token string">'2px solid red'</span><span class="token punctuation">;</span> <span class="token comment">// 用邏輯操作 CSS</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// &lt;app-player #playerRef /></span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">playerRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 操作&lt;DOM>方法</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(C);var T=t(C,4),D=n(T);a(D,()=>`<code class="language-ts"><span class="token comment">// hero.service.ts</span>
<span class="token comment">// @Injectabl語法會編譯期自動註冊進global</span>
<span class="token decorator"><span class="token at operator">@</span><span class="token function">Injectable</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  providedIn<span class="token operator">:</span> <span class="token string">'root'</span> <span class="token comment">// angular rule => hardcode </span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HeroService</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> heroes<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'IronMan'</span><span class="token punctuation">,</span> <span class="token string">'Thor'</span><span class="token punctuation">,</span> <span class="token string">'Hulk'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token function">getHeroes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heroes<span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">addHero</span><span class="token punctuation">(</span>hero<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heroes<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>hero<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">removeHero</span><span class="token punctuation">(</span>hero<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heroes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heroes<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>h <span class="token operator">=></span> h <span class="token operator">!==</span> hero<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(T);var P=t(T,2),O=n(P);a(O,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> HeroService <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'../services/hero.service'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-hero'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">&lt;div *ngFor="let h of heroes">&#123;&#123; h &#125;&#125;&lt;/div></span><span class="token template-punctuation string">&#96;</span></span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HeroComponent</span> <span class="token punctuation">&#123;</span>
  heroes<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token keyword">private</span> heroService<span class="token operator">:</span> HeroService<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

  <span class="token function">ngOnInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heroes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heroService<span class="token punctuation">.</span><span class="token function">getHeroes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heroService<span class="token punctuation">.</span><span class="token function">addHero</span><span class="token punctuation">(</span><span class="token string">'Captain Marvel'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>heroes <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>heroService<span class="token punctuation">.</span><span class="token function">getHeroes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(P);var N=t(P,4),L=n(N);a(L,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> signal <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> firstName <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">'Morgan'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 讀值（注意！不是 firstName.value，而是呼叫它）</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">firstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 'Morgan'</span>

<span class="token comment">// 設定新值</span>
firstName<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Jaime'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 基於舊值更新</span>
firstName<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">name</span> <span class="token operator">=></span> name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(N);var $=t(N,2),Gn=n($);a(Gn,()=>`<code class="language-ts"><span class="token keyword">const</span> firstName <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">'Morgan'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> firstNameCapitalized <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">firstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 唯獨變數，類似 Vue 自動追蹤</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">firstNameCapitalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'MORGAN'</span>

firstName<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Jaime'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">firstNameCapitalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'JAIME'（自動反應）</span></code>`),s($);var q=t($,4),Wn=n(q);a(Wn,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> computed <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
    &lt;p>Hello, &#123;&#123; name() &#125;&#125;!&lt;/p>
    &lt;button (click)="setName('Morgan')">Change&lt;/button>
    &lt;p>Upper: &#123;&#123; nameUpper() &#125;&#125;&lt;/p>
  </span><span class="token template-punctuation string">&#96;</span></span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">HelloComponent</span> <span class="token punctuation">&#123;</span>
  name <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">'Jaime'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  nameUpper <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">setName</span><span class="token punctuation">(</span>newName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>newName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(q);var j=t(q,8),Yn=n(j);a(Yn,()=>`<code class="language-js"><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Computing message...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Count is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(j);var H=t(j,4),zn=n(H);a(zn,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> signal<span class="token punctuation">,</span> effect<span class="token punctuation">,</span> untracked <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token comment">// 1. 建立 signal 狀態</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 2. 初始化時 log，一次就好</span>
<span class="token keyword">const</span> logCountEffect <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> initialValue <span class="token operator">=</span> <span class="token function">untracked</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">[Init] count = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>initialValue<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 3. 提供一個隨時手動讀取但不追蹤的方法</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">readCountWithoutTracking</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> number <span class="token punctuation">&#123;</span>
  <span class="token keyword">return</span> <span class="token function">untracked</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// 4. 例：更新 count 值（可在任意地方呼叫）</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">incrementCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  count<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">c</span> <span class="token operator">=></span> c <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(H);var B=t(H,4),Jn=n(B);a(Jn,()=>`<code class="language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 錯誤：這樣 b() 會被加入依賴</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 即使沒執行，也可能被追蹤</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 正確：不讓 b() 成為依賴</span>
<span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token function">untracked</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(B),f(u,e)}const Ns=Object.freeze(Object.defineProperty({__proto__:null,default:Os,metadata:tn},Symbol.toStringTag,{value:"Module"})),pn={title:"Value 2",date:"2025-06-22",category:"software",subCategory:"Angular20",tags:["fronted","angular","value"],slug:"angular_value_02"},{title:to,date:po,category:oo,subCategory:eo,tags:co,slug:lo}=pn;var Ms=w('<h6>應用中維護值的一些關鍵字</h6> <hr/> <h3>Component 層級的單向綁定( logic update -> dom rerender )</h3> <p><strong>普通變數 + Change Detection :</strong> Angular 的 Zone.js 會自動觸發變更檢測</p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre> <p><strong>Signals :</strong> 響應式更新性能更好，需要新版 Angular 16+</p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre> <p><strong>RxJS Observable + async pipe:</strong> 套件內有提供的一種監聽，概念是定義兩個變數值，一個可被調整的值 BehaviorSubject，另一個 Observable 限讀和 html 語法下 <code>&#123;&#123; count$ | async &#125;&#125;</code>，值被更新時就會 rerender 了。</p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre> <h3>響應式組件和雙向綁定</h3> <p>一樣是 Signals( 同步、自動追蹤依賴、更輕量 ) & RxJS Observables ( 異步、需手動訂閱 )</p> <pre class="language-ts"><!></pre> <pre class="language-ts"><!></pre> <p>還有提供表單模組 FormsModule & ReactiveFormsModule 可以配合 ngModel 使用，Service.ts 也用上述方式維護值和狀態</p> <h3>APP Singleton</h3> <h6>RxJS Observable 套件物件內建很多方法補充一下</h6> <ul><li>Subject: 沒有初始值、value，是用來即時發送事件通知</li></ul> <pre class="language-ts"><!></pre> <ul><li>BehaviorSubject: 可推送新值（next( )）、記住最新的值（value）、新訂閱者會立即收到當前值</li></ul> <pre class="language-ts"><!></pre> <ul><li>ReplaySubject: 記住 N 個歷史值、新訂閱者會收到過去的 N 個值</li></ul> <pre class="language-ts"><!></pre> <ul><li>AsyncSubject:  只發送最後一個值、只關心最終結果的場景</li></ul> <pre class="language-ts"><!></pre> <ul><li>Observable: Subject 轉成 asObservable 後就會有 subscribe、pipe、filter…等功能</li></ul> <pre class="language-ts"><!></pre>',1);function Ls(u){var e=Ms(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-ts"><span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token punctuation">&#123;</span>
  count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 普通變數</span>
  
  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">// Angular 自動觸發變更檢測</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,2),r=n(o);a(r,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>&#123;&#123; count &#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>increment()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>+1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> signal <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token punctuation">&#123;</span>
  count <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 創建 Signal</span>
  
  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 或 this.count.update(v => v + 1)</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,2),g=n(l);a(g,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>&#123;&#123; count() &#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span> <span class="token comment">&lt;!-- 需要加 () 讀取值 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>increment()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>+1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BehaviorSubject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">MyComponent</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> countSubject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BehaviorSubject</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  count$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>countSubject<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>countSubject<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>countSubject<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,2),v=n(m);a(v,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>&#123;&#123; count$ | async &#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>increment()<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>+1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span></code>`),s(m);var h=t(m,6),R=n(h);a(R,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> signal<span class="token punctuation">,</span> computed<span class="token punctuation">,</span> effect <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">UserComponent</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// 創建可寫信號</span>
  count <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  name <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">'John'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// 派生狀態 - 自動追蹤依賴</span>
  doubleCount <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  greeting <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">!</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token comment">// 副作用 - 當依賴變化時自動執行</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Count changed: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 自動追蹤 count 的變化</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  
  <span class="token comment">// 更新信號</span>
  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>val <span class="token operator">=></span> val <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  
  <span class="token function">setName</span><span class="token punctuation">(</span>newName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>newName<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var _=t(h,2),I=n(_);a(I,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Observable<span class="token punctuation">,</span> Subject<span class="token punctuation">,</span> BehaviorSubject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> map<span class="token punctuation">,</span> filter<span class="token punctuation">,</span> debounceTime <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs/operators'</span><span class="token punctuation">;</span>

<span class="token comment">// 基本 Observable</span>
<span class="token keyword">const</span> data$ <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observable</span><span class="token punctuation">(</span>observer <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  observer<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  observer<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  observer<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Subject: 可以主動發送值</span>
<span class="token keyword">const</span> subject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subject<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
subject<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
subject<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>val <span class="token operator">=></span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// BehaviorSubject: 有初始值,新訂閱者會立即收到最新值</span>
<span class="token keyword">const</span> behaviorSubject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BehaviorSubject<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
behaviorSubject<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>val <span class="token operator">=></span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 立即輸出 0</span></code>`),s(_);var S=t(_,10),E=n(S);a(E,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Subject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> clickSubject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subject<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
click$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>clickSubject<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">onClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>clickSubject<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 推送事件</span>
<span class="token punctuation">&#125;</span></code>`),s(S);var C=t(S,4),x=n(C);a(x,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> BehaviorSubject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> countSubject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BehaviorSubject</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
count$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>countSubject<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(C);var T=t(C,4),D=n(T);a(D,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> ReplaySubject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> logSubject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReplaySubject<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 記住最近 3 個值</span>
log$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>logSubject<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">addLog</span><span class="token punctuation">(</span>message<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>logSubject<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(T);var P=t(T,4),O=n(P);a(O,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> AsyncSubject <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>

<span class="token keyword">private</span> resultSubject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AsyncSubject<span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
result$ <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>resultSubject<span class="token punctuation">.</span><span class="token function">asObservable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">compute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// 進行計算...</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>resultSubject<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>resultSubject<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>resultSubject<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>resultSubject<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 完成時才發送</span>
<span class="token punctuation">&#125;</span></code>`),s(P);var N=t(P,4),L=n(N);a(L,()=>`<code class="language-ts">data$<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>value <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'收到資料:'</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

data$<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
  <span class="token function">map</span><span class="token punctuation">(</span>value <span class="token operator">=></span> value <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>      <span class="token comment">// 轉換資料</span>
  <span class="token function">filter</span><span class="token punctuation">(</span>value <span class="token operator">=></span> value <span class="token operator">></span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>  <span class="token comment">// 過濾資料</span>
  <span class="token function">debounceTime</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span>             <span class="token comment">// 防抖</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>result <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(N),f(u,e)}const $s=Object.freeze(Object.defineProperty({__proto__:null,default:Ls,metadata:pn},Symbol.toStringTag,{value:"Module"})),on={title:"Basic Router",date:"2025-06-22",category:"software",subCategory:"Angular20",tags:["route","angular","api"],slug:"angular_router"},{title:uo,date:ko,category:io,subCategory:ro,tags:mo,slug:go}=on;var qs=w('<h6>參考這個<a href="https://github.com/mbejda/AngularFire-Starter-Template" rel="nofollow">專案範本</a>、官方文件學習</h6> <hr/> <p>專案起始 index.html</p> <pre class="language-html"><!></pre> <p>元件去抓專案的根節點，render的內容用<code>&lt;router-outlet&gt;</code>佔位</p> <pre class="language-ts"><!></pre> <p>Route</p> <p>設定該路由(Path) <code>&lt;router-outlet&gt;</code>映射的元件</p> <pre class="language-ts"><!></pre> <p>且若添加 children 屬性擇該 映射的元件 裡面也可以再放一個佔位</p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre> <h3>Route順序和路由守衛</h3> <p>Angular自帶跳轉和瀏覽權限設定，可自行放入<code>canActivate[]</code>裡面做邏輯判斷</p> <pre class="language-ts"><!></pre>',1);function js(u){var e=qs(),p=t(b(e),6),k=n(p);a(k,()=>`<code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>MyAngular18App<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>base</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/x-icon<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>favicon.ico<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app-root</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>app-root</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RouterOutlet <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterOutlet<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token string">'&lt;router-outlet>&lt;/router-outlet>'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Routes <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> LayoutComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./layout/layout.component'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> LayoutComponent<span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
          <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'@features/home/home.component'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>HomeComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'about'</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
          <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./features/about/about.component'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>AboutComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>      <span class="token punctuation">&#123;</span>
        path<span class="token operator">:</span> <span class="token string">'form'</span><span class="token punctuation">,</span>
        <span class="token function-variable function">loadComponent</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
          <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'@features/form/form.component'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>m <span class="token operator">=></span> m<span class="token punctuation">.</span>FormComponent<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> SidePanelComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./side-panel/side-panel.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FooterComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./footer/footer.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RouterOutlet <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-layout'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>
    SidePanelComponent<span class="token punctuation">,</span>
    FooterComponent<span class="token punctuation">,</span>
    RouterOutlet<span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  templateUrl<span class="token operator">:</span> <span class="token string">'./layout.component.html'</span><span class="token punctuation">,</span>
  styleUrls<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'./layout.component.css'</span><span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">LayoutComponent</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,2),y=n(i);a(y,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app-container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app-side-panel</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>side<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>app-side-panel</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>main</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-outlet</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-outlet</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app-footer</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>app-footer</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Routes <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> LoginComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./auth/login/login.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RegisterComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./auth/register/register.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> DashboardComponent <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./pages/dashboard/dashboard.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>ForgotPasswordComponent<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./auth/forgot-password/forgot-password.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>MainLayoutComponent<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./layouts/main-layout/main-layout.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>AlertsComponent<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./pages/alerts/alerts.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>ButtonsComponent<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./pages/buttons/buttons.component'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>authGuard<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./guards/auth.guard'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span>logoutGuard<span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'./guards/logout.guard'</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> routes<span class="token operator">:</span> Routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// Path mapping 會照順序檢查</span>
  <span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span> redirectTo<span class="token operator">:</span> <span class="token string">'login'</span><span class="token punctuation">,</span> pathMatch<span class="token operator">:</span> <span class="token string">'full'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">'login'</span><span class="token punctuation">,</span> component<span class="token operator">:</span> LoginComponent <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">'register'</span><span class="token punctuation">,</span> component<span class="token operator">:</span> RegisterComponent <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">'forgot-password'</span><span class="token punctuation">,</span> component<span class="token operator">:</span> ForgotPasswordComponent <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>

    <span class="token punctuation">]</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">''</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span> MainLayoutComponent<span class="token punctuation">,</span>
    canActivate<span class="token operator">:</span><span class="token punctuation">[</span>authGuard<span class="token punctuation">]</span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">'dashboard'</span><span class="token punctuation">,</span> component<span class="token operator">:</span> DashboardComponent <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">'alerts'</span><span class="token punctuation">,</span> component<span class="token operator">:</span> AlertsComponent <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">'buttons'</span><span class="token punctuation">,</span> component<span class="token operator">:</span> ButtonsComponent <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span>
    path<span class="token operator">:</span> <span class="token string">'logout'</span><span class="token punctuation">,</span>
    canActivate<span class="token operator">:</span><span class="token punctuation">[</span>logoutGuard<span class="token punctuation">]</span><span class="token punctuation">,</span>
    component<span class="token operator">:</span>LoginComponent
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span> path<span class="token operator">:</span> <span class="token string">'**'</span><span class="token punctuation">,</span> redirectTo<span class="token operator">:</span> <span class="token string">'login'</span> <span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`),s(m),f(u,e)}const Hs=Object.freeze(Object.defineProperty({__proto__:null,default:js,metadata:on},Symbol.toStringTag,{value:"Module"})),en={title:"Base Backgroud Service",date:"2025-09-25",category:"software",subCategory:"Backend",tags:["Backgroud","backend","markdown"],slug:"backgroudservice"},{title:yo,date:wo,category:fo,subCategory:ho,tags:bo,slug:vo}=en;var Us=w('<h6>C#實作非立即性的服務排序</h6> <hr/> <h3>使用背景</h3> <p>當主程式的 DI 註冊週期是以 HTTP lifecycle 為主時，可藉由 Background Service 提供長期運行的服務容器。</p> <ol><li>非阻塞式處理：可由外部 API 觸發某些動作，立即回應用戶端而不等待處理完成</li> <li>解耦合設計：將耗時的業務邏輯從 HTTP 請求週期中分離出來</li> <li>簡易事件模式：作為一個輕量級的 Event pattern 實現，處理非即時性任務</li> <li>資源管理：避免長時間佔用 HTTP 連線資源，提升系統整體效能</li></ol> <h3>Channel 基礎原理</h3> <p>Channel 是 .NET Core 提供的 thread-safe 生產者-消費者模式實作，基於 System.Threading.Channels 命名空間。它解決了多執行緒環境下的資料傳遞問題。</p> <pre class="language-csharp"><!></pre> <h3>Channel 的監聽機制</h3> <p>寫入機制 (Producer)</p> <pre class="language-csharp"><!></pre> <p>讀取監聽機制 (Consumer)</p> <pre class="language-csharp"><!></pre> <h3>基本架構</h3> <p>DI註冊</p> <pre class="language-csharp"><!></pre> <p>Controller</p> <pre class="language-csharp"><!></pre> <p>服務內部</p> <pre class="language-csharp"><!></pre>',1);function Bs(u){var e=Us(),p=t(b(e),14),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> channel <span class="token operator">=</span> Channel<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateUnbounded</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>YourRequestType<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Channel 包含兩個部分</span>
channel<span class="token punctuation">.</span>Writer <span class="token comment">// 用於寫入資料 (生產者) => Controller 需要寫入能力</span>
channel<span class="token punctuation">.</span>Reader <span class="token comment">// 用於讀取資料 (消費者) => Background 需要讀取能力</span>

┌─────────────────────┐    寫入    ┌──────────────┐    讀取    ┌──────────────────────┐
│   Controller        │ ─────────<span class="token operator">></span> │   Channel    │ ─────────<span class="token operator">></span> │  Background Service  │
│  <span class="token punctuation">(</span>ChannelWriter<span class="token punctuation">)</span>    │           │   <span class="token punctuation">(</span>Queue<span class="token punctuation">)</span>    │            │  <span class="token punctuation">(</span>ChannelReader<span class="token punctuation">)</span>     │
└─────────────────────┘           └──────────────┘            └──────────────────────┘
<span class="token comment">// FIFO 先進先出的順序處理</span></code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-csharp"><span class="token comment">// 非同步寫入 - 不會阻塞，立即將資料放入佇列</span>
<span class="token keyword">await</span> channelWriter<span class="token punctuation">.</span><span class="token function">WriteAsync</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 同步寫入 - 立即返回 bool</span>
<span class="token class-name"><span class="token keyword">bool</span></span> success <span class="token operator">=</span> channelWriter<span class="token punctuation">.</span><span class="token function">TryWrite</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 標記寫入完成 (關閉 Writer)</span>
channelWriter<span class="token punctuation">.</span><span class="token function">Complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token comment">// ReadAllAsync</span>
<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token comment">// 持續監聽，有資料時立即處理</span>
    <span class="token keyword">await</span> <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> item <span class="token keyword">in</span> _reader<span class="token punctuation">.</span><span class="token function">ReadAllAsync</span><span class="token punctuation">(</span>stoppingToken<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 立即處理接收到的資料</span>
        <span class="token keyword">await</span> <span class="token function">ProcessItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// WaitToReadAsync + TryRead</span>
<span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token comment">// while 持續監聽</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token keyword">await</span> _reader<span class="token punctuation">.</span><span class="token function">WaitToReadAsync</span><span class="token punctuation">(</span>stoppingToken<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 一次處理所有可用的資料</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>_reader<span class="token punctuation">.</span><span class="token function">TryRead</span><span class="token punctuation">(</span><span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">var</span></span> item<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token keyword">await</span> <span class="token function">ProcessItem</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-csharp"><span class="token comment">// 註冊 Channel 用於背景服務通訊</span>
<span class="token class-name"><span class="token keyword">var</span></span> channel <span class="token operator">=</span> Channel<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateUnbounded</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>YourRequestType<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddSingleton</span><span class="token punctuation">(</span>channel<span class="token punctuation">.</span>Reader<span class="token punctuation">)</span><span class="token punctuation">;</span>
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddSingleton</span><span class="token punctuation">(</span>channel<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 註冊背景服務</span>
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddHostedService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>YourBackgroundService<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"trigger-action"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">TriggerAction</span><span class="token punctuation">(</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromBody</span></span><span class="token punctuation">]</span> <span class="token class-name">YourRequest</span> requestBody<span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromServices</span></span><span class="token punctuation">]</span> <span class="token class-name">ChannelWriter<span class="token punctuation">&lt;</span>YourRequestType<span class="token punctuation">></span></span> queue<span class="token punctuation">)</span> <span class="token comment">// 也可放在 Controller constructor</span>
<span class="token punctuation">&#123;</span>

    <span class="token comment">// 建立內部請求物件</span>
    <span class="token class-name"><span class="token keyword">var</span></span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">YourRequestType</span>
    <span class="token punctuation">&#123;</span>
        Data <span class="token operator">=</span> requestBody<span class="token punctuation">.</span>Data<span class="token punctuation">,</span>
        RequestTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">&#123;</span>
        <span class="token keyword">await</span> queue<span class="token punctuation">.</span><span class="token function">WriteAsync</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span><span class="token string">"Action queued successfully"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">Ok</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token punctuation">&#123;</span> Message <span class="token operator">=</span> <span class="token string">"Action queued for processing"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InvalidOperationException</span> ex<span class="token punctuation">)</span> <span class="token keyword">when</span> <span class="token punctuation">(</span>ex<span class="token punctuation">.</span>Message<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span><span class="token string">"closed"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token string">"Background service unavailable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">StatusCode</span><span class="token punctuation">(</span><span class="token number">503</span><span class="token punctuation">,</span> <span class="token string">"Service temporarily unavailable"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token string">"Failed to queue action"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">StatusCode</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token string">"Internal server error"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,4),v=n(m);a(v,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">YourBackgroundService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BackgroundService</span></span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">ChannelReader<span class="token punctuation">&lt;</span>YourRequestType<span class="token punctuation">></span></span> _reader<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">ILogger<span class="token punctuation">&lt;</span>YourBackgroundService<span class="token punctuation">></span></span> _logger<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IServiceProvider</span> _serviceProvider<span class="token punctuation">;</span> <span class="token comment">// 用來創造一個 scope 正確管理 DI Lifecycle </span>

    <span class="token keyword">public</span> <span class="token function">YourBackgroundService</span><span class="token punctuation">(</span>
        <span class="token class-name">ChannelReader<span class="token punctuation">&lt;</span>YourRequestType<span class="token punctuation">></span></span> reader<span class="token punctuation">,</span>
        <span class="token class-name">ILogger<span class="token punctuation">&lt;</span>YourBackgroundService<span class="token punctuation">></span></span> logger<span class="token punctuation">,</span>
        <span class="token class-name">IServiceProvider</span> serviceProvider<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _reader <span class="token operator">=</span> reader<span class="token punctuation">;</span>
        _logger <span class="token operator">=</span> logger<span class="token punctuation">;</span>
        _serviceProvider <span class="token operator">=</span> serviceProvider<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token keyword">await</span> <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> request <span class="token keyword">in</span> _reader<span class="token punctuation">.</span><span class="token function">ReadAllAsync</span><span class="token punctuation">(</span>stoppingToken<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token keyword">try</span>
            <span class="token punctuation">&#123;</span>
                <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> scope <span class="token operator">=</span> _serviceProvider<span class="token punctuation">.</span><span class="token function">CreateScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name"><span class="token keyword">var</span></span> logic <span class="token operator">=</span> scope<span class="token punctuation">.</span>ServiceProvider<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>YourLogic<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                
                <span class="token keyword">await</span> logic<span class="token punctuation">.</span><span class="token function">ProcessAsync</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">;</span>
                _logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span><span class="token string">"Request processed successfully"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
            <span class="token punctuation">&#123;</span>
                _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token string">"Failed to process request"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(m),f(u,e)}const Fs=Object.freeze(Object.defineProperty({__proto__:null,default:Bs,metadata:en},Symbol.toStringTag,{value:"Module"})),cn={title:"Domain-Driven - Basic",date:"2025-06-21",category:"software",subCategory:"Backend",tags:["DDD","backend","design"],slug:"ddd_layer"},{title:_o,date:So,category:Co,subCategory:Ro,tags:To,slug:Io}=cn;var Vs=w(`<h6>事件目的為核心設計模式 Domain-Driven Design</h6> <hr/> <h3>網路層 (Web / Controller)</h3> <p>接收 HTTP Request 入口和 <strong>實例轉發(消息)控制器</strong> 的層面，僅作為轉發者（Request Dispatcher）指定事件指令&回傳格式，不做商業邏輯處理。</p> <pre class="language-csharp"><!></pre> <h3>應用層 (Application / Logic)</h3> <p>主要負責實作 Command / Query / Handler 等指令消息物件，處理商業邏輯。</p> <p><strong>Handler 主要負責</strong></p> <ul><li>取得並操作 Domain 層定義的 Aggregate / Value Object</li> <li>結合外部輸入（如 Request Body DTO），執行業務流程與驗證邏輯</li> <li>將驗證後的資料傳遞至 Infrastructure ，進行資料存取(Repository)或第三方(AuthService)互動</li></ul> <p><strong>實作讀寫分離（CQRS）</strong></p> <ul><li>讀取邏輯（Query + Handler） 可透過 IReadRepository / ReadModel / ViewModel</li> <li>將 Read 專用 Repository Interface 也放置在 Application 層，避免對 Domain 汙染</li></ul> <p><strong>資料物件模型（Data Transfer Object）</strong></p> <ul><li>與 Domain Model（Aggregate / ValueObject）分離，不承擔任何商業規則驗證</li> <li>可搭配 FluentValidation 先進行格式驗證</li> <li>也可作為 Request body/Response 輸出格式 Mapping 對象</li></ul> <h3>事件核心層 (Domain)</h3> <p>DDD 架構的核心，必須完全獨立、不依賴其他層（如 Application / Infrastructure），所有核心邏輯、商業規則、狀態控制都應封裝在這一層。</p> <p><strong>Aggregate Root（聚合根）</strong></p> <ul><li>代表一組關聯物件的 一致性邊界（Consistency Boundary）</li> <li>定義資料規格與唯一性規則（如 ID）</li> <li>驗證狀態轉移是否合理</li> <li>維護領域不變式（Invariant）</li></ul> <p><strong>Value Object（值物件）</strong></p> <ul><li>沒有識別性（ID），補強 Aggregate 的欄位定義，確保欄位規則（格式、範圍）正確性</li> <li>通常不可變（Immutable），常用於輸入驗證與例外處理</li></ul> <p><strong>Factory</strong></p> <ul><li>專責建立 新的 Aggregate 實體，將複雜的初始化規則封裝起來</li> <li>集中初始化的邏輯、避免外部自行 new 對象產生違規狀態</li></ul> <p><strong>Domain Event</strong></p> <ul><li>Aggregate 發出、由 Application Layer 的 Handler 處理後續流程（例如通知、同步、儲存等）</li> <li>保持單向依賴（Domain 發出事件，不處理後續）</li></ul> <p><strong>Interface</strong></p> <ul><li>在 Domain 中定義對外依賴的介面（如 IUserRepository、INotificationService）</li> <li>實作則由 Infrastructure 層提供，以支援 依賴反轉（DIP）原則，讓 Domain 不耦合具體技術細節</li></ul> <h3>基礎層（Infrastructure）</h3> <p>基礎設施 DI Injection & DBContext & Repositroy & Service(JWT) & Outbox …等
同時負責實作 Domain 定義的介面，並將應用程式所需的各類依賴透過 依賴注入（DI） 註冊進容器中。</p>`,1);function Gs(u){var e=Vs(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"register"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">Register</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromBody</span></span><span class="token punctuation">]</span> <span class="token class-name">RegisterUserCommand</span> command<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">Ok</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p),A(44),f(u,e)}const Ws=Object.freeze(Object.defineProperty({__proto__:null,default:Gs,metadata:cn},Symbol.toStringTag,{value:"Module"})),ln={title:"Domain-Driven - Mediator",date:"2025-06-22",category:"software",subCategory:"Backend",tags:["DDD","backend","design"],slug:"ddd_mediator"},{title:Ao,date:Eo,category:xo,subCategory:Po,tags:Do,slug:Oo}=ln;var Ys=w(`<h6>事件驅動搭配中介者模式</h6> <hr/> <h2>MediatR</h2> <p>用於應用程式內部模組之間的指令與事件傳遞，運作於主記憶體中不需外部中介。自身架構處理 Command、Query、Domain Event，也可擴充 IPipelineBehavior 實作驗證、日誌、監控等。若搭配 Outbox 實作，亦可延伸為可靠事件傳遞模式。</p> <pre class="language-csharp"><!></pre> <p>放入自定義的<strong>Command</strong>後，會自動註冊所有 <code>IRequestHandler&lt;,&gt;</code>、<code>INotificationHandler&lt;&gt;</code> 相關的 Handler</p> <pre class="language-csharp"><!></pre> <p><strong>Send 流程（Command / Query）</strong></p> <pre class="language-csharp"><!></pre> <p>背後處理步驟：</p> <ol><li>呼叫 Send() → 取得 command 型別（如 LoginUserCommand）</li> <li>檢查快取中有沒有 RequestHandlerWrapper<code>&lt;LoginUserCommand, TResult&gt;</code></li> <li>若無，透過反射產生 Wrapper 並快取</li> <li>Wrapper 使用 DI container (ServiceFactory) 找出對應的 LoginUserCommandHandler</li> <li>包上所有 IPipelineBehavior（如 Logging / Validation）</li> <li>呼叫 Handle() 執行實際邏輯</li></ol> <p><strong>Publish 流程（Event）</strong></p> <p>會呼叫所有註冊的 INotificationHandler<code>&lt;UserLoggedInNotification&gt;</code> 處理器
適合用於事件廣播 / DomainEvent 傳遞（例如搭配 Outbox）</p> <pre class="language-csharp"><!></pre> <p><strong>Controller 呼叫</strong></p> <pre class="language-csharp"><!></pre> <p><strong>IPipelineBehavior</strong></p> <p>MediatR 在處理 Send() 時，會把整個流程包裝在一連串的 IPipelineBehavior<code>&lt;TRequest, TResponse&gt;</code> 中，最後才執行真正的 Handle() 方法。</p> <p><code>Client → [LoggingBehavior] → [ValidationBehavior] → CommandHandler.Handle()</code></p> <p>每一個 Behavior 都像 Middleware，可以：</p> <ul><li>做前置驗證（FluentValidation）</li> <li>加入日誌記錄（ILogger）</li> <li>加入監控（OpenTelemetry, AppInsights）</li> <li>加入自定義錯誤處理、授權檢查</li></ul> <pre class="language-csharp"><!></pre> <br/> <h2>MassTransit</h2> <p>適合分散式系統中的服務間訊息通訊，需外部 message broker（如 RabbitMQ、Kafka）。支援 Command / Event 發送，可串接 Retry、延遲隊列、DeadLetter 等進階功能，常用於微服務間傳遞資料、非同步背景處理等情境。</p> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre> <p><strong>Send()</strong></p> <pre class="language-csharp"><!></pre> <p><strong>Publish()</strong></p> <pre class="language-csharp"><!></pre> <p><strong>Middleware pipeline</strong></p> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre>`,1);function zs(u){var e=Ys(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token comment">//.csproj</span>
<span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"MediatR"</span> Version<span class="token operator">=</span><span class="token string">"12.5.0"</span> <span class="token operator">/</span><span class="token operator">></span>

<span class="token comment">//Program.cs</span>
builder<span class="token punctuation">.</span><span class="token function">InstallMediatR</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-csharp"><span class="token comment">// Infrastructure/Installers/MediatRInstaller.cs</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InstallMediatR</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">WebApplicationBuilder</span> builder<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddMediatR</span><span class="token punctuation">(</span>cfg <span class="token operator">=></span>
    <span class="token punctuation">&#123;</span>
        cfg<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">RegisterServicesFromAssemblyContaining</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>LoginUserCommand<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">RegisterServicesFromAssemblyContaining</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>RefreshTokenCommand<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>'<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">LoginUserCommand</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token string">"pwd"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(c);var l=t(c,10),g=n(l);a(g,()=>'<code class="language-csharp"><span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserLoggedInNotification</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">Login</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromBody</span></span><span class="token punctuation">]</span> <span class="token class-name">LoginUserCommand</span> command<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">Ok</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,12),v=n(m);a(v,()=>`<code class="language-csharp">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddTransient</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IPipelineBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">LoggingBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddTransient</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IPipelineBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">ValidationBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m);var h=t(m,8),R=n(h);a(R,()=>`<code class="language-csharp"><span class="token comment">// .csproj</span>
<span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"MassTransit.AspNetCore"</span> Version<span class="token operator">=</span><span class="token string">"8.1.2"</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"MassTransit.RabbitMQ"</span> Version<span class="token operator">=</span><span class="token string">"8.1.2"</span> <span class="token operator">/</span><span class="token operator">></span></code>`),s(h);var _=t(h,2),I=n(_);a(I,()=>`<code class="language-csharp"><span class="token comment">// Program.cs</span>
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddMassTransit</span><span class="token punctuation">(</span>x <span class="token operator">=></span>
<span class="token punctuation">&#123;</span>
    <span class="token comment">// 自動註冊所有的消費者 (Consumer)</span>
    <span class="token comment">// 表示該層級專案</span>
    x<span class="token punctuation">.</span><span class="token function">AddConsumers</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CreateUserConsumer</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Assembly<span class="token punctuation">)</span><span class="token punctuation">;</span>

    x<span class="token punctuation">.</span><span class="token function">UsingRabbitMq</span><span class="token punctuation">(</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> cfg<span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">&#123;</span>
        cfg<span class="token punctuation">.</span><span class="token function">Host</span><span class="token punctuation">(</span><span class="token string">"rabbitmq://localhost"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">ConfigureEndpoints</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 自動綁定 queue</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(_);var S=t(_,4),E=n(S);a(E,()=>'<code class="language-csharp"><span class="token keyword">await</span> _sendEndpoint<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">GenerateInvoice</span> <span class="token punctuation">&#123;</span> OrderId <span class="token operator">=</span> <span class="token string">"123"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(S);var C=t(S,4),x=n(C);a(x,()=>'<code class="language-csharp"><span class="token keyword">await</span> _publishEndpoint<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserCreated</span> <span class="token punctuation">&#123;</span> UserId <span class="token operator">=</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(C);var T=t(C,4),D=n(T);a(D,()=>`<code class="language-csharp">cfg<span class="token punctuation">.</span><span class="token function">ConfigureMediator</span><span class="token punctuation">(</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> cfg<span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 驗證資料結構</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">ValidationFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">LoggingFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">RedisFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">EventsFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">HtmlSanitizerFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(T);var P=t(T,2),O=n(P);a(O,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"register"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">Register</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromServices</span></span><span class="token punctuation">]</span> <span class="token class-name">IPublishEndpoint</span> publishEndpoint<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">await</span> publishEndpoint<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">CreateUser</span> <span class="token punctuation">&#123;</span> UserName <span class="token operator">=</span> <span class="token string">"tony"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">Ok</span><span class="token punctuation">(</span><span class="token string">"Published!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(P),f(u,e)}const Js=Object.freeze(Object.defineProperty({__proto__:null,default:zs,metadata:ln},Symbol.toStringTag,{value:"Module"})),un={title:"Domain-Driven - Outbox Message",date:"2025-06-23",category:"software",subCategory:"Backend",tags:["DDD","backend","design"],slug:"ddd_outbox"},{title:No,date:Mo,category:Lo,subCategory:$o,tags:qo,slug:jo}=un;var Ks=w('<h6>拆分主副邏輯，同時保持資料同步性</h6> <hr/> <h2>SideEffect</h2> <p>若把 DDD 流程中的主副行為拆分：</p> <ul><li>創建員工帳戶的時候 <code>&lt;TABLE_Employee&gt;</code> 新增一筆資料</li> <li>幫對應到的 <code>&lt;TABLE_Department&gt;_Headcount</code> 總人數加一</li></ul> <br/> <p>若是以依照 MVC 架構會是</p> <pre class="language-csharp"><!></pre> <p>用 DDD 寫則變成是</p> <pre class="language-csharp"><!></pre> <p>假設創建員工帳號變為須更新 5-10 張表單,函式會越來越巨大、複雜且難以測試與維護。透過 DDD 的 Domain Event 拆解副作用邏輯可異步處理，減少主流程延遲。</p> <h2>ASIO 原子性（Atomicity of Side-Effect & IO）</h2> <p>剛剛提到的行為，主邏輯成功時無法保證所有副作用（如更新部門、發送通知等）都成功執行，這違反了分散系統中常見的 資料一致性與原子性要求。</p> <p>解決方法是設計一張資料庫新表<code>&lt;DB_Outbox_Message&gt;</code>，在一筆交易中提交主邏輯與事件，且把事件訊息<code>(Event、Payload、Time)</code>寫入這張表。這樣執行失敗也有紀錄可以查驗，也可設計失敗的 Retry 機制。</p> <br/> <p>主要實踐方法是用背景應用重複執行，訪問 DB_Outbox_Message 執行該事件</p> <pre class="language-csharp"><!></pre>',1);function Xs(u){var e=Ks(),p=t(b(e),14),k=n(p);a(k,()=>`<code class="language-csharp">db_Employee<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
db_Department<span class="token punctuation">.</span><span class="token function">AddOrUpdate</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span>Id <span class="token operator">==</span> data<span class="token punctuation">.</span>DepartmentId<span class="token punctuation">,</span> dept <span class="token operator">=></span> dept<span class="token punctuation">.</span>HandCount <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-csharp"><span class="token comment">// Application Layer</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>Unit<span class="token punctuation">></span></span> <span class="token function">Handle</span><span class="token punctuation">(</span><span class="token class-name">CreateEmployeeCommand</span> command<span class="token punctuation">,</span> <span class="token class-name">CancellationToken</span> ct<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> employee <span class="token operator">=</span> Employee<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>command<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> command<span class="token punctuation">.</span>DepartmentId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">await</span> _employeeRepository<span class="token punctuation">.</span><span class="token function">AddAsync</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> _unitOfWork<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 儲存 Employee 的同時，Outbox 事件也一併儲存</span>

    <span class="token keyword">return</span> Unit<span class="token punctuation">.</span>Value<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Employee</span> <span class="token function">Create</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">,</span> <span class="token class-name">Guid</span> departmentId<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> employee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Employee</span><span class="token punctuation">(</span>Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> departmentId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    employee<span class="token punctuation">.</span><span class="token function">RaiseDomainEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">EmployeeCreatedDomainEvent</span><span class="token punctuation">(</span>employee<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> departmentId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> employee<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeCreatedHandler</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">INotificationHandler<span class="token punctuation">&lt;</span>EmployeeCreatedDomainEvent<span class="token punctuation">></span></span></span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">Handle</span><span class="token punctuation">(</span><span class="token class-name">EmployeeCreatedDomainEvent</span> evt<span class="token punctuation">,</span> <span class="token class-name">CancellationToken</span> ct<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> dept <span class="token operator">=</span> <span class="token keyword">await</span> _departmentRepository<span class="token punctuation">.</span><span class="token function">GetByIdAsync</span><span class="token punctuation">(</span>evt<span class="token punctuation">.</span>DepartmentId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        dept<span class="token punctuation">.</span><span class="token function">IncreaseHeadcount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">await</span> _unitOfWork<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,14),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OutboxDispatcherBackgroundService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BackgroundService</span></span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IServiceProvider</span> _serviceProvider<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">ILogger<span class="token punctuation">&lt;</span>OutboxDispatcherBackgroundService<span class="token punctuation">></span></span> _logger<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token function">OutboxDispatcherBackgroundService</span><span class="token punctuation">(</span><span class="token class-name">IServiceProvider</span> serviceProvider<span class="token punctuation">,</span> <span class="token class-name">ILogger<span class="token punctuation">&lt;</span>OutboxDispatcherBackgroundService<span class="token punctuation">></span></span> logger<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _serviceProvider <span class="token operator">=</span> serviceProvider<span class="token punctuation">;</span>
        _logger <span class="token operator">=</span> logger<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name">CancellationToken</span> stoppingToken<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stoppingToken<span class="token punctuation">.</span>IsCancellationRequested<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> scope <span class="token operator">=</span> _serviceProvider<span class="token punctuation">.</span><span class="token function">CreateScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">var</span></span> db <span class="token operator">=</span> scope<span class="token punctuation">.</span>ServiceProvider<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BaseDbContext<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">var</span></span> mediator <span class="token operator">=</span> scope<span class="token punctuation">.</span>ServiceProvider<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IMediator<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name"><span class="token keyword">var</span></span> messages <span class="token operator">=</span> <span class="token keyword">await</span> db<span class="token punctuation">.</span>OutboxMessages
                <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>m <span class="token operator">=></span>
                    m<span class="token punctuation">.</span>Status <span class="token operator">==</span> <span class="token string">"Pending"</span> <span class="token operator">&amp;&amp;</span>
                    m<span class="token punctuation">.</span>RetryCount <span class="token operator">&lt;</span> m<span class="token punctuation">.</span>MaxRetry<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">Take</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">ToListAsync</span><span class="token punctuation">(</span>stoppingToken<span class="token punctuation">)</span><span class="token punctuation">;</span>


            <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> msg <span class="token keyword">in</span> messages<span class="token punctuation">)</span>
            <span class="token punctuation">&#123;</span>
                <span class="token keyword">try</span>
                <span class="token punctuation">&#123;</span>
                    <span class="token class-name"><span class="token keyword">var</span></span> type <span class="token operator">=</span> Type<span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"CleanDDD.Domain.Users.Events.</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">msg<span class="token punctuation">.</span>EventType</span><span class="token punctuation">&#125;</span></span><span class="token string">, CleanDDD.Domain"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token keyword">is</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token punctuation">&#123;</span>
                        msg<span class="token punctuation">.</span>Status <span class="token operator">=</span> <span class="token string">"Failed"</span><span class="token punctuation">;</span>
                        msg<span class="token punctuation">.</span>LastError <span class="token operator">=</span> <span class="token string">"❌ Cannot resolve event type."</span><span class="token punctuation">;</span>
                        <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>

                    <span class="token class-name"><span class="token keyword">var</span></span> evt <span class="token operator">=</span> <span class="token punctuation">(</span>INotification<span class="token punctuation">?</span><span class="token punctuation">)</span>JsonSerializer<span class="token punctuation">.</span><span class="token function">Deserialize</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>PayloadJson<span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>evt <span class="token keyword">is</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token punctuation">&#123;</span>
                        msg<span class="token punctuation">.</span>Status <span class="token operator">=</span> <span class="token string">"Failed"</span><span class="token punctuation">;</span>
                        msg<span class="token punctuation">.</span>LastError <span class="token operator">=</span> <span class="token string">"❌ Cannot deserialize event."</span><span class="token punctuation">;</span>
                        <span class="token keyword">continue</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>

                    <span class="token keyword">await</span> mediator<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span>evt<span class="token punctuation">,</span> stoppingToken<span class="token punctuation">)</span><span class="token punctuation">;</span>

                    msg<span class="token punctuation">.</span>Status <span class="token operator">=</span> <span class="token string">"Sent"</span><span class="token punctuation">;</span>
                    msg<span class="token punctuation">.</span>ProcessedAt <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>UtcNow<span class="token punctuation">;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
                <span class="token punctuation">&#123;</span>
                    msg<span class="token punctuation">.</span>RetryCount<span class="token operator">++</span><span class="token punctuation">;</span>
                    msg<span class="token punctuation">.</span>LastError <span class="token operator">=</span> ex<span class="token punctuation">.</span>Message<span class="token punctuation">;</span>

                    <span class="token keyword">if</span> <span class="token punctuation">(</span>msg<span class="token punctuation">.</span>RetryCount <span class="token operator">>=</span> <span class="token number">3</span><span class="token punctuation">)</span>
                    <span class="token punctuation">&#123;</span>
                        msg<span class="token punctuation">.</span>Status <span class="token operator">=</span> <span class="token string">"DeadLetter"</span><span class="token punctuation">;</span>
                        _logger<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"⚠️ Outbox event </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">msg<span class="token punctuation">.</span>Id</span><span class="token punctuation">&#125;</span></span><span class="token string"> marked as DeadLetter after 3 retries."</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                    <span class="token keyword">else</span>
                    <span class="token punctuation">&#123;</span>
                        msg<span class="token punctuation">.</span>NextAttemptAt <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>UtcNow <span class="token operator">+</span> <span class="token function">GetRetryDelay</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>RetryCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$"❌ Failed to process outbox event </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">msg<span class="token punctuation">.</span>Id</span><span class="token punctuation">&#125;</span></span><span class="token string"> (RetryCount: </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">msg<span class="token punctuation">.</span>RetryCount</span><span class="token punctuation">&#125;</span></span><span class="token string">)"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span>

            <span class="token keyword">await</span> db<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span>stoppingToken<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span>TimeSpan<span class="token punctuation">.</span><span class="token function">FromSeconds</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">,</span> stoppingToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name">TimeSpan</span> <span class="token function">GetRetryDelay</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> retryCount<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 1min → 2min → 4min → 最多 15min</span>
        <span class="token class-name"><span class="token keyword">var</span></span> delayMinutes <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">Min</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">Pow</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> retryCount<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> TimeSpan<span class="token punctuation">.</span><span class="token function">FromMinutes</span><span class="token punctuation">(</span>delayMinutes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(c),f(u,e)}const Qs=Object.freeze(Object.defineProperty({__proto__:null,default:Xs,metadata:un},Symbol.toStringTag,{value:"Module"})),kn={title:"EF Core - CodeFirst",date:"2025-12-24",category:"software",subCategory:"Backend",tags:["Backend","EFCore","Migration","ASP.NET Core"],slug:"efcore-codefirst"},{title:Ho,date:Uo,category:Bo,subCategory:Fo,tags:Vo,slug:Go}=kn;var Zs=w('<h6>使用 EF Core 可以處理 CodeBase Model 與 DB Table 的一致姓，常見的有兩種 DB/Code first</h6> <hr/> <h3>基本設定</h3> <p>套件除了 EF Core 外需多安裝</p> <pre class="language-csharp"><!></pre> <p>基本概念就是繼承 EF Core 套件內的各個物件，讓套件可以抓起來辨識</p> <pre class="language-csharp"><!></pre> <pre class="language-cs"><!></pre> <pre class="language-csharp"><!></pre> <p>補充一下: 套件執行的時候會需要連線 DB，但是跨層可能會吃不到 appsetting 參數，會需要建立一個 Factory 拿參數配置</p> <pre class="language-csharp"><!></pre> <p>準備好後就可以下終端機指令:</p> <p>產版本控制檔案 <code>(首次執行會建立 BaseDbContextModelSnapshot.cs 用來進行快照)</code></p> <pre class="language-bash"><!></pre> <p>拿 migration 檔案產SQL語法與資料庫更新<code>(首次執行資料庫會建一張表 __EFMigrationsHistory 用來進行版本控制)</code></p> <pre class="language-bash"><!></pre> <p>這時候可以去資料庫檢查<code>__EFMigrationsHistory</code> 是不是有紀錄和更新成功與否。</p> <p>另外如果專案是從 DbFirst 轉 CodeFirst ，你的第一次<code>dotnet ef migrations add</code>產檔完成後,應該會是一整排 CreateTable 但實際資料庫已有了，可以直接把檔案中的 Up Scope 清空，邏輯上不動作保留提交紀錄。</p> <pre class="language-csharp"><!></pre> <p>剩下的操作就類似<code>git</code>一樣了。</p> <h3>自動化</h3> <p>為了避免忘記手動執行 <code>dotnet ef database update</code>，可以做一個 Installer 自動更新，正式環境需不需要就看習慣。</p> <pre class="language-csharp"><!></pre> <p>appsettings.json</p> <pre class="language-json"><!></pre> <p>Installer</p> <pre class="language-csharp"><!></pre> <p>Program.cs</p> <pre class="language-csharp"><!></pre> <p>常見的合併衝突可能會是<code>Snapshot.cs</code>，通常會是最後一個人先捨棄自己當前的 migration，再重新做一份比較安全。</p>',1);function na(u){var e=Zs(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-csharp">Microsoft<span class="token punctuation">.</span>EntityFrameworkCore<span class="token punctuation">.</span>Design <span class="token number">9.0</span><span class="token number">.0</span>
dotnet tool install <span class="token operator">--</span><span class="token keyword">global</span> dotnet<span class="token operator">-</span>ef <span class="token operator">--</span>version <span class="token number">9.0</span><span class="token number">.0</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-csharp">
<span class="token comment">// 會對應到資料表的欄位名稱</span>
<span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">ActionInfo</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Entity</span></span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> ActionInfoId <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">;</span>

    <span class="token comment">/// &lt;summary></span>
    <span class="token comment">/// 外顯名稱</span>
    <span class="token comment">/// &lt;/summary></span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> DisplayName <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">;</span>

    <span class="token comment">/// &lt;summary></span>
    <span class="token comment">/// 敘述</span>
    <span class="token comment">/// &lt;/summary></span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> Description <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>

    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name">ICollection<span class="token punctuation">&lt;</span>MenuAction<span class="token punctuation">></span></span> MenuAction <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>MenuAction<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,2),d=n(c);a(d,()=>`<code class="language-cs"><span class="token comment">// 欄位細項</span>
<span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">ActionInfoConfiguration</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IEntityTypeConfiguration<span class="token punctuation">&lt;</span>ActionInfo<span class="token punctuation">></span></span></span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">EntityTypeBuilder<span class="token punctuation">&lt;</span>ActionInfo<span class="token punctuation">></span></span> entity<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        entity<span class="token punctuation">.</span><span class="token function">HasKey</span><span class="token punctuation">(</span>e <span class="token operator">=></span> e<span class="token punctuation">.</span>ActionInfoId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">HasName</span><span class="token punctuation">(</span><span class="token string">"PK__Action__FFE3F4D99575B07E"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        entity<span class="token punctuation">.</span><span class="token function">HasIndex</span><span class="token punctuation">(</span>e <span class="token operator">=></span> e<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> <span class="token string">"UQ__Action__A25C5AA7F76A945E"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">IsUnique</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        entity<span class="token punctuation">.</span><span class="token function">Property</span><span class="token punctuation">(</span>e <span class="token operator">=></span> e<span class="token punctuation">.</span>Description<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">HasMaxLength</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">HasComment</span><span class="token punctuation">(</span><span class="token string">"敘述"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        entity<span class="token punctuation">.</span><span class="token function">Property</span><span class="token punctuation">(</span>e <span class="token operator">=></span> e<span class="token punctuation">.</span>DisplayName<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">HasMaxLength</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">HasComment</span><span class="token punctuation">(</span><span class="token string">"外顯名稱"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        entity<span class="token punctuation">.</span><span class="token function">Property</span><span class="token punctuation">(</span>e <span class="token operator">=></span> e<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">HasMaxLength</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">OnConfigurePartial</span><span class="token punctuation">(</span>entity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">partial</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnConfigurePartial</span><span class="token punctuation">(</span><span class="token class-name">EntityTypeBuilder<span class="token punctuation">&lt;</span>ActionInfo<span class="token punctuation">></span></span> modelBuilder<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,2),g=n(l);a(g,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">BaseDbContext</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">DbContext</span><span class="token punctuation">,</span> <span class="token class-name">IBaseDbContext</span></span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> <span class="token function">BaseDbContext</span><span class="token punctuation">(</span><span class="token class-name">DbContextOptions<span class="token punctuation">&lt;</span>BaseDbContext<span class="token punctuation">></span></span> options<span class="token punctuation">)</span>
        <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name">DbSet<span class="token punctuation">&lt;</span>ActionInfo<span class="token punctuation">></span></span> ActionInfo <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>

    <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnModelCreating</span><span class="token punctuation">(</span><span class="token class-name">ModelBuilder</span> modelBuilder<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        modelBuilder<span class="token punctuation">.</span><span class="token function">ApplyConfiguration</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Configurations<span class="token punctuation">.</span>ActionInfoConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">OnModelCreatingPartial</span><span class="token punctuation">(</span>modelBuilder<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">partial</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnModelCreatingPartial</span><span class="token punctuation">(</span><span class="token class-name">ModelBuilder</span> modelBuilder<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IBaseDbContext</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DbSet<span class="token punctuation">&lt;</span>ActionInfo<span class="token punctuation">></span></span> ActionInfo <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-csharp"><span class="token comment">// Infrastructure/Persistence/YourDbContextFactory.cs</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>EntityFrameworkCore</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>EntityFrameworkCore<span class="token punctuation">.</span>Design</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Extensions<span class="token punctuation">.</span>Configuration</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">YourProject<span class="token punctuation">.</span>Infrastructure<span class="token punctuation">.</span>Persistence</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">YourDbContextFactory</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IDesignTimeDbContextFactory<span class="token punctuation">&lt;</span>YourDbContext<span class="token punctuation">></span></span></span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">YourDbContext</span> <span class="token function">CreateDbContext</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 讀取 appsettings.json</span>
        <span class="token class-name"><span class="token keyword">var</span></span> configuration <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConfigurationBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">SetBasePath</span><span class="token punctuation">(</span>Path<span class="token punctuation">.</span><span class="token function">Combine</span><span class="token punctuation">(</span>Directory<span class="token punctuation">.</span><span class="token function">GetCurrentDirectory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"../YourWebApi"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">AddJsonFile</span><span class="token punctuation">(</span><span class="token string">"appsettings.json"</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">optional</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">AddJsonFile</span><span class="token punctuation">(</span><span class="token string">"appsettings.Development.json"</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">optional</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">var</span></span> optionsBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DbContextOptionsBuilder<span class="token punctuation">&lt;</span>YourDbContext<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> connectionString <span class="token operator">=</span> configuration<span class="token punctuation">.</span><span class="token function">GetConnectionString</span><span class="token punctuation">(</span><span class="token string">"DefaultConnection"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        optionsBuilder<span class="token punctuation">.</span><span class="token function">UseSqlServer</span><span class="token punctuation">(</span>connectionString<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">YourDbContext</span><span class="token punctuation">(</span>optionsBuilder<span class="token punctuation">.</span>Options<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-bash">dotnet ef migrations <span class="token function">add</span> AddNewFeature <span class="token parameter variable">--context</span> MyDbContext // AddNewFeature 版本控制名稱, MyDbContext C<span class="token comment"># 的 DB Instance</span>
dotnet ef migrations <span class="token function">add</span> AddNewFeature <span class="token parameter variable">--project</span> DDD.Infrastructure --startup-project DDD.WebApi <span class="token parameter variable">--context</span> BaseDbContext // 跨層設定</code>`),s(m);var h=t(m,4),R=n(h);a(R,()=>'<code class="language-bash">dotnet ef database update <span class="token parameter variable">--context</span> BaseDbContext <span class="token parameter variable">--project</span> <span class="token punctuation">..</span>. --startup-project <span class="token punctuation">..</span>.</code>'),s(h);var _=t(h,6),I=n(_);a(I,()=>`<code class="language-csharp">    <span class="token keyword">public</span> <span class="token keyword">partial</span> <span class="token keyword">class</span> <span class="token class-name">InitialCreate</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Migration</span></span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">/// &lt;inheritdoc /></span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Up</span><span class="token punctuation">(</span><span class="token class-name">MigrationBuilder</span> migrationBuilder<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token comment">// 資料庫已存在，不需要建立資料表</span>
            <span class="token comment">// Database already exists, no need to create tables</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">/// &lt;inheritdoc /></span>
        <span class="token keyword">protected</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Down</span><span class="token punctuation">(</span><span class="token class-name">MigrationBuilder</span> migrationBuilder<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token comment">// 不執行任何還原動作</span>
            <span class="token comment">// No rollback actions</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span></code>`),s(_);var S=t(_,8),E=n(S);a(E,()=>`<code class="language-csharp"><span class="token comment">// Infrastructure/Settings/DatabaseMigrate.cs</span>
<span class="token keyword">namespace</span> <span class="token namespace">YourProject<span class="token punctuation">.</span>Infrastructure<span class="token punctuation">.</span>Settings</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">record</span> <span class="token class-name">DatabaseMigrate</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> required <span class="token return-type class-name"><span class="token keyword">string</span></span> DefaultConnection <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">init</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>
    <span class="token keyword">public</span> required <span class="token return-type class-name"><span class="token keyword">bool</span></span> AutoMigrate <span class="token punctuation">&#123;</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">init</span><span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(S);var C=t(S,4),x=n(C);a(x,()=>`<code class="language-json"><span class="token comment">// 正式</span>

<span class="token punctuation">&#123;</span>
  <span class="token property">"DatabaseMigrate"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"DefaultConnection"</span><span class="token operator">:</span> <span class="token string">"Server=prod-server;Database=ProdDB;..."</span><span class="token punctuation">,</span>
    <span class="token property">"AutoMigrate"</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// 測試</span>
<span class="token punctuation">&#123;</span>
  <span class="token property">"DatabaseMigrate"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"DefaultConnection"</span><span class="token operator">:</span> <span class="token string">"Server=dev-server;Database=DevDB;..."</span><span class="token punctuation">,</span>
    <span class="token property">"AutoMigrate"</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(C);var T=t(C,4),D=n(T);a(D,()=>`<code class="language-csharp"><span class="token comment">// Infrastructure/Installers/DatabaseMigrationInstaller.cs</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>AspNetCore<span class="token punctuation">.</span>Builder</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>EntityFrameworkCore</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Extensions<span class="token punctuation">.</span>Configuration</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Extensions<span class="token punctuation">.</span>DependencyInjection</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>Extensions<span class="token punctuation">.</span>Logging</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">YourProject<span class="token punctuation">.</span>Infrastructure<span class="token punctuation">.</span>Installers</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">DatabaseMigrationInstaller</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ApplyDatabaseMigrations</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">WebApplication</span> app<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> configuration <span class="token operator">=</span> app<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IConfiguration<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> databaseMigrate <span class="token operator">=</span> configuration
            <span class="token punctuation">.</span><span class="token function">GetSection</span><span class="token punctuation">(</span><span class="token keyword">nameof</span><span class="token punctuation">(</span>DatabaseMigrate<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Get</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DatabaseMigrate<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>databaseMigrate <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>databaseMigrate<span class="token punctuation">.</span>AutoMigrate<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> scope <span class="token operator">=</span> app<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">CreateScope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> loggerFactory <span class="token operator">=</span> scope<span class="token punctuation">.</span>ServiceProvider<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetRequiredService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ILoggerFactory<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> logger <span class="token operator">=</span> loggerFactory<span class="token punctuation">.</span><span class="token function">CreateLogger</span><span class="token punctuation">(</span><span class="token string">"DatabaseMigration"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">try</span>
        <span class="token punctuation">&#123;</span>
            <span class="token comment">// 建立 DbContext</span>
            <span class="token class-name"><span class="token keyword">var</span></span> optionsBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DbContextOptionsBuilder<span class="token punctuation">&lt;</span>YourDbContext<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            optionsBuilder<span class="token punctuation">.</span><span class="token function">UseSqlServer</span><span class="token punctuation">(</span>databaseMigrate<span class="token punctuation">.</span>DefaultConnection<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 忽略 PendingModelChanges 警告（允許開發時 Entity 有變更）</span>
            optionsBuilder<span class="token punctuation">.</span><span class="token function">ConfigureWarnings</span><span class="token punctuation">(</span>warnings <span class="token operator">=></span>
                warnings<span class="token punctuation">.</span><span class="token function">Ignore</span><span class="token punctuation">(</span>
                    Microsoft<span class="token punctuation">.</span>EntityFrameworkCore<span class="token punctuation">.</span>Diagnostics
                        <span class="token punctuation">.</span>RelationalEventId<span class="token punctuation">.</span>PendingModelChangesWarning<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">YourDbContext</span><span class="token punctuation">(</span>optionsBuilder<span class="token punctuation">.</span>Options<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 檢查待執行的 Migrations</span>
            <span class="token class-name"><span class="token keyword">var</span></span> pendingMigrations <span class="token operator">=</span> context<span class="token punctuation">.</span>Database<span class="token punctuation">.</span><span class="token function">GetPendingMigrations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>pendingMigrations<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">&#123;</span>
                logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span>
                    <span class="token string">"發現 &#123;count&#125; 個待執行的 migrations: &#123;migrations&#125;"</span><span class="token punctuation">,</span>
                    pendingMigrations<span class="token punctuation">.</span>Count<span class="token punctuation">,</span>
                    <span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">", "</span><span class="token punctuation">,</span> pendingMigrations<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span><span class="token string">"開始執行資料庫 Migration..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                context<span class="token punctuation">.</span>Database<span class="token punctuation">.</span><span class="token function">Migrate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span><span class="token string">"資料庫 Migration 執行完成！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">else</span>
            <span class="token punctuation">&#123;</span>
                logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span><span class="token string">"資料庫已是最新版本，無需執行 Migration"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token string">"執行資料庫 Migration 時發生錯誤"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">throw</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(T);var P=t(T,4),O=n(P);a(O,()=>`<code class="language-csharp"><span class="token comment">// Program.cs</span>
<span class="token class-name"><span class="token keyword">var</span></span> builder <span class="token operator">=</span> WebApplication<span class="token punctuation">.</span><span class="token function">CreateBuilder</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 註冊服務...</span>
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddDbContext</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>YourDbContext<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>options <span class="token operator">=></span>
    options<span class="token punctuation">.</span><span class="token function">UseSqlServer</span><span class="token punctuation">(</span>builder<span class="token punctuation">.</span>Configuration<span class="token punctuation">.</span><span class="token function">GetConnectionString</span><span class="token punctuation">(</span><span class="token string">"DefaultConnection"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> app <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 自動執行資料庫 Migration</span>
app<span class="token punctuation">.</span><span class="token function">ApplyDatabaseMigrations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Configure the HTTP request pipeline...</span>
app<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(P),A(2),f(u,e)}const sa=Object.freeze(Object.defineProperty({__proto__:null,default:na,metadata:kn},Symbol.toStringTag,{value:"Module"})),rn={title:"Finite-State Machine",date:"2025-06-30",category:"software",subCategory:"Backend",tags:["FSM","backend","markdown"],slug:"FSM"},{title:Wo,date:Yo,category:zo,subCategory:Jo,tags:Ko,slug:Xo}=rn;var aa=w('<h6>FSM 這是一種類比電路常見的概念，用金流常見的狀態模擬看看。</h6> <hr/> <h3>核心概念</h3> <p>狀態是封閉集合其一：Pending / Paid / Failed / RefundPending / Refunded。</p> <p>事件是唯一入口：只有明確的事件才能讓狀態改變。</p> <pre class="language-csharp"><!></pre> <table><thead><tr><th>CurrentState</th><th>Trigger</th><th>NextState</th></tr></thead><tbody><tr><td>Pending</td><td>PaySucceeded</td><td>Paid</td></tr><tr><td>Pending</td><td>PayFailed</td><td>Failed</td></tr><tr><td>Paid</td><td>StartRefund</td><td>RefundPending</td></tr><tr><td>RefundPending</td><td>RefundSucceeded</td><td>Refunded</td></tr><tr><td>RefundPending</td><td>RefundFailed</td><td>Paid</td></tr><tr><td>Failed/Refunded</td><td><em>(無任何事件)</em></td><td><em>(終點)</em></td></tr></tbody></table> <h3>簡易流程</h3> <pre class="language-csharp"><!></pre> <p>限制行為的方式</p> <pre class="language-csharp"><!></pre> <h3>測試與擴充</h3> <p>單元測試每條轉移：「Pending → PaySucceeded → Paid」。</p> <p>新增流程：只要在 enum + 轉移表多加一條，和對應 trigger 的處理；主程式 switch(fsm.CurrentState) 自動接手 DB 差異。</p>',1);function ta(u){var e=aa(),p=t(b(e),10),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token comment">// 狀態（State）</span>
<span class="token function">Pending</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> → <span class="token function">Paid</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> → <span class="token function">RefundPending</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> → <span class="token function">Refunded</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token function">Failed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment">// 失敗 / 終端狀態</span>

<span class="token comment">// 事件（Trigger）</span>
PaySucceeded<span class="token punctuation">,</span> PayFailed<span class="token punctuation">,</span> StartRefund<span class="token punctuation">,</span> RefundSucceeded<span class="token punctuation">,</span> RefundFailed</code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-csharp">
<span class="token comment">// 建立 FSM</span>
<span class="token class-name"><span class="token keyword">var</span></span> fsm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PaymentStateMachine</span><span class="token punctuation">(</span><span class="token punctuation">(</span>PaymentState<span class="token punctuation">)</span>order<span class="token punctuation">.</span>State<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 解析金流商回傳碼</span>
<span class="token class-name">PaymentTrigger<span class="token punctuation">?</span></span> t <span class="token operator">=</span> dto<span class="token punctuation">.</span>ReturnCode <span class="token keyword">switch</span> <span class="token punctuation">&#123;</span>
    <span class="token string">"0000"</span> <span class="token operator">=></span> PaySucceeded<span class="token punctuation">,</span>
    <span class="token string">"1165"</span> <span class="token operator">=></span> <span class="token keyword">null</span><span class="token punctuation">,</span>         <span class="token comment">// 不轉移，維持 Pending</span>
     _     <span class="token operator">=></span> PayFailed
<span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>t<span class="token punctuation">.</span>HasValue<span class="token punctuation">)</span> fsm<span class="token punctuation">.</span><span class="token function">Fire</span><span class="token punctuation">(</span>t<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 交易寫 DB 前</span>
order<span class="token punctuation">.</span>State            <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span>fsm<span class="token punctuation">.</span>CurrentState<span class="token punctuation">;</span>
vendorPayment<span class="token punctuation">.</span>PayState <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span>fsm<span class="token punctuation">.</span>CurrentState<span class="token punctuation">;</span>

<span class="token comment">// 回應前端也看 fsm.CurrentState</span>
<span class="token keyword">switch</span> <span class="token punctuation">(</span>fsm<span class="token punctuation">.</span>CurrentState<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">case</span> PaymentState<span class="token punctuation">.</span>Paid<span class="token punctuation">:</span>     <span class="token comment">// 成功</span>
    <span class="token keyword">case</span> PaymentState<span class="token punctuation">.</span>Pending<span class="token punctuation">:</span>  <span class="token comment">// 等待</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>                    <span class="token comment">// 失敗</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fsm<span class="token punctuation">.</span><span class="token function">CanFire</span><span class="token punctuation">(</span>trigger<span class="token punctuation">)</span><span class="token punctuation">)</span> 
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvalidOperationException</span><span class="token punctuation">(</span><span class="token string">"非法動作"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fsm<span class="token punctuation">.</span><span class="token function">Fire</span><span class="token punctuation">(</span>trigger<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c),A(6),f(u,e)}const pa=Object.freeze(Object.defineProperty({__proto__:null,default:ta,metadata:rn},Symbol.toStringTag,{value:"Module"})),dn={title:"Paxon",date:"2025-09-02",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"paxon"},{title:Qo,date:Zo,category:ne,subCategory:se,tags:ae,slug:te}=dn;var oa=w("<h6>保證的是 “記錄的事實必定相同” 這件事情，不同節點 (DB Server) 資料(ID) 僅可以是 有/無 的差異</h6> <hr/> <p>在古希臘的Paxon島上，有一個議會制政府。這個島上的議員們需要通過投票來決定各種法案和政策。但是這個政治體系面臨著一些現實挑戰：</p> <ol><li><p>議員可能缺席：有些議員可能因為各種原因離開議會或無法參與投票</p></li> <li><p>通信不可靠：通過信使傳遞消息，可能會迷路、延遲送達和重複傳遞同樣的消息</p></li> <li><p>異步環境：沒有統一的時鐘，無法保證消息的送達順序</p></li></ol> <p>在不可靠的環境，如何讓議會就某個提案達成一致(簡單多數)的決定？</p> <h3>概念</h3> <p>上個月趙議員發起 <strong>002號提案</strong>：</p> <p>「各位同仁，我想申請討論A路段修整的開工日期，這是002號提案申請。」</p> <ul><li>李議員：「好的我同意討論。我承諾在您的002號提案結束前，不接受編號更低的提案。」</li> <li>但也有部分議員沒有接收到消息</li></ul> <p>但是趙議員後來因為生病，002號提案沒有進行到第二階段就中斷</p> <p>__</p> <br/> <p>今天林議員想發起提案，他不知道有 <strong>002號提案</strong> 狀況。</p> <p>林議員：「各位同仁，我想申請討論A路段修整的開工日期，這是<strong>001號提案</strong>申請。」</p> <ul><li>王議員：「好的林議員，我同意討論。我這邊沒有其他相關提案記錄。我承諾在您的001號提案結束前，不接受編號更低的提案。」</li></ul> <p><em>Promise(001, null)</em></p> <ul><li><em>回覆：Promise(001, null)</em> 張議員：「好的林議員，我同意討論。雖然陳議員曾經在私下討論中提到『3月20日』這個想法，雖然沒有正式提案。我承諾支持您的001號提案。」</li></ul> <p><em>Promise(001, null)</em></p> <ul><li><em>回覆：</em> 李議員：「抱歉林議員，我必須拒絕。上個月趙議員的002號提案還沒有正式結束，基於議會流程，我不能接受您的提案。」</li></ul> <p><em>Reject(002)</em></p> <p>__</p> <br/> <p>林議員：「什麼？還有002號提案？那麼依規定我需要更高的編號！」</p> <p>林議員：「各位同仁我重新申請：這是003號提案，討論A路段修整開工日期。」</p> <ul><li>王議員：「好的，003號比之前都大，我同意。」</li></ul> <p><em>Promise(003, null)</em></p> <ul><li>張議員：「我也同意003號提案」</li></ul> <p><em>Promise(003, null)</em></p> <ul><li>李議員：「003號比002號大，我可以接受。趙議員當時沒有提出具體日期就中斷了。」</li></ul> <p><em>Promise(003, null)</em></p> <p>__</p> <p>林議員：「我獲得了多數支持，而且對於結果都沒有意見，我可以提議自己原本想要的『3月15日』。」正式提案</p> <ul><li>張議員：「我接受003號提案。A路段開工日期：3月15日。」</li></ul> <p><em>Accepted(003, “3月15日”)</em></p> <ul><li>李議員：「我接受003號提案。A路段開工日期：3月15日。」</li></ul> <p><em>Accepted(003, “3月15日”)</em></p> <br/> <p>林議員收到回覆後：「太好了！我有收到了2個接受回覆，超過半數了！」</p> <p>書記員宣布：「根據一致決議，003號提案通過！A路段修整開工日期確定為『3月15日』。」</p> <h3>實務</h3> <p>通常應用在DB集群維護 Acceptor 節點，任一個DB收到寫入資料就可以視作是 Proposer，其他DB節點作為 Acceptor 參與共識決策。</p> <ul><li>Proposer: 收到寫入請求的 DB 節點（動態角色）</li> <li>Acceptor: 集群中的所有 DB 節點（包括 Proposer 自己）</li> <li>Learner: 需要同步最終結果的節點，或客戶端應用</li></ul> <br/> <p>實際運作</p> <ol><li>前端寫入請求 → DB-1</li> <li>DB-1 變成 Proposer，向所有節點（包括自己）發起提案</li> <li>所有 DB 節點作為 Acceptor 回應是否接受</li> <li>達成多數決 後，寫入被確認</li> <li>Learner 節點（如快取、備份系統）獲得最終結果</li></ol>",1);function ea(u){var e=oa();A(88),f(u,e)}const ca=Object.freeze(Object.defineProperty({__proto__:null,default:ea,metadata:dn},Symbol.toStringTag,{value:"Module"})),mn={title:"Paxon with Golang",date:"2025-09-02",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"paxonGolang"},{title:pe,date:oe,category:ee,subCategory:ce,tags:le,slug:ue}=mn;var la=w('<h6>基本概念如下，當然實務上要如何分發ID、定義節點的生命週期會更複雜</h6> <hr/> <p>型別</p> <pre class="language-go"><!></pre> <p>第一階段 - 獲取提案許可</p> <pre class="language-go"><!></pre> <p>第二階段 - 承諾提案內容有共識</p> <pre class="language-go"><!></pre> <pre class="language-golang"><!></pre>',1);function ua(u){var e=la(),p=t(b(e),6),k=n(p);a(k,()=>`<code class="language-go"><span class="token keyword">type</span> Proposer <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
    Name  <span class="token builtin">string</span>
    ID    <span class="token builtin">int</span>
    Value <span class="token builtin">int</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">type</span> Acceptor <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
    Name        <span class="token builtin">string</span>
    HandleID    <span class="token builtin">int</span>
    HandleValue <span class="token builtin">int</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-go">
<span class="token keyword">func</span> <span class="token function">getProposal</span><span class="token punctuation">(</span>proposer Proposer<span class="token punctuation">,</span> acceptors <span class="token punctuation">[</span><span class="token punctuation">]</span>Acceptor<span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">&#123;</span>

    promiseCount <span class="token operator">:=</span> <span class="token number">0</span>
    maxID <span class="token operator">:=</span> <span class="token number">0</span>

    <span class="token comment">// 檢查有沒有參與者持有 > 的編號</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> value <span class="token operator">:=</span> <span class="token keyword">range</span> acceptors <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> value<span class="token punctuation">.</span>HandleID <span class="token operator">></span> maxID <span class="token punctuation">&#123;</span>
            maxID <span class="token operator">=</span> value<span class="token punctuation">.</span>HandleID
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            promiseCount <span class="token operator">++</span> <span class="token comment">// 模擬網路傳遞失敗 有回應才 ++ </span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">if</span> maxID <span class="token operator">>=</span> proposer<span class="token punctuation">.</span>ID <span class="token punctuation">&#123;</span>
        newProposerID <span class="token operator">:=</span> maxID <span class="token operator">+</span> <span class="token number">1</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"提案 ID %d 順位太低，請使用新的 proposer ID: %d 再次提案&#92;n"</span><span class="token punctuation">,</span> proposer<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> newProposerID<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> promiseCount <span class="token operator">></span> <span class="token function">len</span><span class="token punctuation">(</span>acceptors<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span> <span class="token punctuation">&#123;</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"✓ 獲得多數承諾，可以進入 Accept 階段"</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"✗ 未獲得多數承諾，提案失敗"</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
</code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-go"><span class="token keyword">func</span> <span class="token function">getAcceptorInfo</span><span class="token punctuation">(</span>proposer Proposer<span class="token punctuation">,</span> acceptors <span class="token punctuation">[</span><span class="token punctuation">]</span>Acceptor<span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">&#123;</span>

    acceptorCount <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> acceptor <span class="token operator">:=</span> <span class="token keyword">range</span> acceptors <span class="token punctuation">&#123;</span>
        acceptorCount <span class="token operator">++</span>
        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"接受者: %s (ID: %d, 值: %d)&#92;n"</span><span class="token punctuation">,</span> 
                   acceptor<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> acceptor<span class="token punctuation">.</span>HandleID<span class="token punctuation">,</span> acceptor<span class="token punctuation">.</span>HandleValue<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">if</span> acceptorCount <span class="token operator">></span> <span class="token function">len</span><span class="token punctuation">(</span>acceptors<span class="token punctuation">)</span><span class="token operator">/</span><span class="token number">2</span> <span class="token punctuation">&#123;</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"獲得多數承諾，可以廣播"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"無得到多數回應，提案失敗"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,2),g=n(l);a(g,()=>`<code class="language-golang">
package main

import &quot;fmt&quot;

type Proposer struct &#123;
    Name  string
    ID    int
    Value int
&#125;

type Acceptor struct &#123;
    Name        string
    HandleID    int
    HandleValue int
&#125;

func main() &#123;
    // 建立一個提案者
    proposer := Proposer&#123;
        Name:  &quot;Alice&quot;,
        ID:    1,
        Value: 100, // 改成 Value
    &#125;

    // 建立三個接受者 (模擬不同的狀態)
    acceptor1 := Acceptor&#123;
        Name:        &quot;Server-A&quot;,
        HandleID:    0, // 還沒處理過任何提案
        HandleValue: 0,
    &#125;

    acceptor2 := Acceptor&#123;
        Name:        &quot;Server-B&quot;, 
        HandleID:    2, // 之前處理過 ID=2 的提案
        HandleValue: 50,
    &#125;

    acceptor3 := Acceptor&#123;
        Name:        &quot;Server-C&quot;,
        HandleID:    1, // 之前處理過 ID=1 的提案
        HandleValue: 75,
    &#125;

    acceptors := []Acceptor&#123;acceptor1, acceptor2, acceptor3&#125;

    // 執行 Paxos
    if getProposalInfo(proposer, acceptors) &#123;
        if getAcceptorInfo(proposer, acceptors) &#123;
          fmt.Println(proposer.ID, proposer.Value)
        &#125;
    &#125;

    fmt.Println(&quot;&#92;n=== 測試案例 2: 提案者 ID 更高 ===&quot;)
    proposer2 := Proposer&#123;
        Name:  &quot;Bob&quot;,
        ID:    5, // 比所有 acceptor 的 HandleID 都高
        Value: 200, // 改成 Value
    &#125;
    
    if getProposalInfo(proposer2, acceptors) &#123;
        if getAcceptorInfo(proposer2, acceptors) &#123;
          fmt.Println(proposer2.ID, proposer2.Value)
        &#125;
    &#125;
&#125;

func getProposalInfo(proposer Proposer, acceptors []Acceptor) bool&#123;

    promiseCount := 0
    maxID := 0

    fmt.Printf(&quot;開始 Paxos 流程 - 提案者: %s&#92;n&quot;, proposer.Name)

    // 先處理提案編號
    for _, value := range acceptors &#123;
        if value.HandleID &gt; maxID &#123;
            maxID = value.HandleID
        &#125; else &#123;
            promiseCount ++ // 因若是網路傳遞，會需要紀錄回傳次數結果
        &#125;
    &#125;

    if maxID &gt;= proposer.ID &#123; // 修正條件：應該是 &gt;= 而不是 &gt; 0
        newProposerID := maxID + 1
        fmt.Printf(&quot;提案 ID %d 太低，請使用新的 proposer ID: %d 再次提案&#92;n&quot;, proposer.ID, newProposerID)
        return false
    &#125; else &#123;
        if promiseCount &gt; len(acceptors)/2 &#123;
            fmt.Println(&quot;✓ 獲得多數承諾，可以進入 Accept 階段&quot;)
            return true
        &#125; else &#123;
            fmt.Println(&quot;✗ 未獲得多數承諾，提案失敗&quot;)
            return false
        &#125;
    &#125;
&#125;

func getAcceptorInfo(proposer Proposer, acceptors []Acceptor) bool&#123;

    acceptorCount := 0;
    for _, acceptor := range acceptors &#123;
        acceptorCount ++
        fmt.Printf(&quot;接受者: %s (ID: %d, 值: %d)&#92;n&quot;, 
                   acceptor.Name, acceptor.HandleID, acceptor.HandleValue)
    &#125;

    if acceptorCount &gt; len(acceptors)/2 &#123;
        fmt.Println(&quot;獲得多數承諾，可以廣播&quot;)
        return true
    &#125; else &#123;
        fmt.Println(&quot;無得到多數回應，提案失敗&quot;)
        return false
    &#125;
&#125;
</code>`),s(l),f(u,e)}const ka=Object.freeze(Object.defineProperty({__proto__:null,default:ua,metadata:mn},Symbol.toStringTag,{value:"Module"})),gn={title:"Database Consistency 1",date:"2025-07-28",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"database_consistency_1"},{title:ke,date:ie,category:re,subCategory:de,tags:me,slug:ge}=gn;var ia=w(`<h6>維持多台 Server 資料唯一性的幾種選擇，<a href="https://ithelp.ithome.com.tw/articles/10217086" rel="nofollow">建議閱讀這裡</a></h6> <hr/> <p>當需要維持多台DB Server，因為建置成本的關係，可依據需求去選擇不同強度的Model去實作</p> <h3>Consistency Model</h3> <ul><li><p>Strong Consistency: 在保證最新和正確的情況下才回傳，否則就回報錯誤</p></li> <li><p>Read My Writes: 只讀取保證有最新寫入的資料庫</p></li> <li><p>Bounded Staleness: 可參數化這個 bounded值，在可允許範圍內確定資料的正確性</p></li> <li><p>Consistent Prefix: 保證資料是正確的，但是不一定是最新</p></li> <li><p>Monotonic Reads: 第一次拿取不保證正確性，但之後都會向同一台Server拿取資料</p></li> <li><p>Eventual Consistency: 只保證最後執行完畢的資料會是正確的</p></li></ul> <h3>Quorum System</h3> <p>實例情境</p> <ul><li>商城限量開賣一款筆電限購「100台」</li> <li>客戶很多（C1、C2、C3…Cn）在同一時間湧進來搶購</li> <li>為了快速處理，商城把這個「庫存數量」存在於 <strong>3 個伺服器（R1、R2、R3）</strong> 上，形成一個「分散式系統」</li></ul> <br/> <h3>DB Lock</h3> <p>每次有人要搶購時，先「鎖住所有伺服器」，等操作結束後再開放。能保證正確（強一致性）但是非常慢、任一台伺服器壞掉，整個系統卡死。</p> <ul><li>客戶 A 說我要買 → 鎖住 R1、R2、R3 → 扣庫存 → 解鎖</li> <li>客戶 B 必須等待 A 的操作完</li></ul> <h3>Quorum</h3> <ul><li>寫入：只要成功寫入 <strong>2 台（W = 2）</strong> 就算成功</li> <li>讀取：也從 <strong>2 台讀取（R = 2）</strong></li> <li>且滿足 R + W > 3，就能保證「交集」裡一定有最新的資訊</li></ul> <br/> <p>對應實際流程：</p> <ol><li><p>客戶 A 要買向 R1、R2 發出購買請求（扣除庫存 -1），系統只要有 2 台回應成功就算成功。</p></li> <li><p>客戶 B 要買向 R2、R3 發出購買請求，就算不同人問到不同伺服器，只要 <strong>總是至少問 2 台（R）</strong>，系統就可以找出正確的庫存數，避免「同時兩人都以為還有庫存」。</p></li></ol> <pre class="language-text"><!></pre> <p><code>下次再讀庫存時 → 會從 2 台讀出資料 → 看哪個版本新（有版本號或時間戳）→ 拿到正確的「98」</code></p> <p>假設用戶 C1 買了一台筆電，寫入筆電數量剩下 99
C1 的請求被成功寫到：R1、R2、R3
R4(讀)、R5(讀) 當時故障或太慢 → 沒有更新成功</p> <pre class="language-text"><!></pre> <h3>Read-Repair</h3> <pre class="language-text"><!></pre> <p>系統根據 timestamp 判斷：99 是最新的庫存，除了把 99 回傳給用戶外，還會 99 寫回 R4、R5</p> <pre class="language-text"><!></pre> <h3>Anti-Entropy</h3> <p>或是用背景 process 會：</p> <ul><li><p>定期掃描所有 replica</p></li> <li><p>發現某些節點資料版本較舊</p></li> <li><p>根據 timestamp 主動同步最新資料</p></li></ul> <br/> <h3>Sloppy Quorum + Hinted Handoff</h3> <p>之前的寫入規則是 R1, R2, R3 寫入 >= 2
但是如果_R3突然掛掉了，可以找一個替代伺服器_R4，只是_R4儲存的資料需要標記，等_R3恢復後再回補</p> <pre class="language-text"><!></pre>`,1);function ra(u){var e=ia(),p=t(b(e),34),k=n(p);a(k,()=>`<code class="language-text">庫存初始值：100

伺服器：
R1: 100
R2: 100
R3: 100

C1 買一台：
→ 寫入 R1 和 R2（成功）
→ R1: 99, R2: 99, R3: 100

C2 買一台：
→ 讀 R2 和 R3，選出最大版本為 99
→ 寫入 R2 和 R3 → 變成 R2: 98, R3: 98

最後
R1: 99
R2: 98
R3: 98</code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-text">R1: 99
R2: 99
R3: 99
R4: 100
R5: 100</code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-text">R1: 99  ✅（有時間戳 t2）
R4: 100 ❌（舊）
R5: 100 ❌（舊）</code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-text">R1: 99
R2: 99
R3: 99
R4: 99
R5: 99</code>`),s(l);var i=t(l,14),y=n(i);a(y,()=>`<code class="language-text">C1 發出寫入 (搶購筆電，剩 99)

[ 原本應該寫入 ]:  R1   R2   R3  
[ 實際成功寫入 ]:  R1   R4   ❌

=&gt; 系統標記：R4 存了一份「R3 的代理資料」</code>`),s(i),f(u,e)}const da=Object.freeze(Object.defineProperty({__proto__:null,default:ra,metadata:gn},Symbol.toStringTag,{value:"Module"})),yn={title:"Database Consistency 2",date:"2025-07-28",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"database_consistency_2"},{title:ye,date:we,category:fe,subCategory:he,tags:be,slug:ve}=yn;var ma=w('<h6>維持多台 Server 資料唯一性的幾種選擇，<a href="https://ithelp.ithome.com.tw/articles/10217086" rel="nofollow">建議閱讀這裡</a></h6> <hr/> <p>實作時不同伺服器中的時間戳不可當作最新資料的判斷依據</p> <br/> <h3>Vector Clock</h3> <p>背景設定有 3 台 replica：R1、R2、R3，每個伺服器都有一個 Vector Clock (DB自己處理+1)來追蹤</p> <br/> <p>Client 讀資料會拿到的格式</p> <pre class="language-text"><!></pre> <p>Client 寫入資料</p> <pre class="language-text"><!></pre> <p>若是 R1 收到資料後 → 它把自己的版本數加 1</p> <pre class="language-text"><!></pre> <p>R2 收到資料後 → 也是一樣，把自己的欄位 R2 +1</p> <pre class="language-text"><!></pre> <p>之後的取就拿數字最大的版本當作最新來源</p>',1);function ga(u){var e=ma(),p=t(b(e),16),k=n(p);a(k,()=>`<code class="language-text">value = 100
version = &#123; R1: 1, R2: 1, R3: 0 &#125;</code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-text">&#123;
  value: 99,
  old_version: &#123; R1: 1, R2: 1, R3: 0 &#125;
&#125;</code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>'<code class="language-text">&#123; R1: 2, R2: 1, R3: 0 &#125;</code>'),s(c);var l=t(c,4),g=n(l);a(g,()=>'<code class="language-text">&#123; R1: 1, R2: 2, R3: 0 &#125;</code>'),s(l),A(2),f(u,e)}const ya=Object.freeze(Object.defineProperty({__proto__:null,default:ga,metadata:yn},Symbol.toStringTag,{value:"Module"})),wn={title:"Database Consistency 3",date:"2025-07-29",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"database_consistency_3"},{title:_e,date:Se,category:Ce,subCategory:Re,tags:Te,slug:Ie}=wn;var wa=w('<h6>維持多台 Server 資料唯一性的幾種選擇，<a href="https://ithelp.ithome.com.tw/articles/10217086" rel="nofollow">建議閱讀這裡</a></h6> <hr/> <h3>Consensus Algorithm Requirements</h3> <ul><li>Termination: 保證所有參與決策且無故障的節點最終會做一個決定，執行的演算法不會無法終止。</li> <li>Validity: 最終的決議一定是來自某一個參與的節點</li> <li>Agreement: 當演算法完成時，所有節點都會做相同的決定</li></ul> <br/> <h3>Network Model</h3> <p>Synchronous Network Model</p> <ul><li><p>時間同步（Clock Synchronization）: 每個節點的「時鐘」彼此對齊，雖然可能有些微差異，但保證不會無限偏移（例如都在 ±ε 範圍內）。</p></li> <li><p>訊息延遲有上限（Bounded Network Delay）: 傳輸訊息最多只會延遲某個固定時間</p></li> <li><p>計算速度一致（Equal Computation Speed）: 所有節點的處理速度是同步的，彼此的運算時間不會落差太大。</p></li></ul> <p>上述是最理想的狀態，但是在現實世界不可能達成，而 Asynchronous Network 就是相反。</p> <br/> <p>Failure Model</p> <ul><li><p>Byzantine failures: 該節點不按照程式邏輯執行，惡意給予錯誤的回復，比方使用者輸入0，當提出proposal給集群時，該節點隨機傳送0或1給其餘節點</p></li> <li><p>Crash-recovery failures: 節點運算總是正確，但是可能因為發生Crash或是網路中斷，需要時間Recover，因此無法保證回覆時間</p></li> <li><p>Omission failures: 發生Crash後「消息」不會回覆。比方網路中斷導致訊息丟失，不再重傳。</p></li> <li><p>Crash failure: 發生Crash，不再回復。比方某個節點發生故障，則該節點不再回復也不再跟其他系統其他節點有來往。</p></li></ul> <br/> <h3>Paxos Algorithm</h3> <p>每個節點稱作 Processes 可以同時發起提議（Proposer）/ 接受提議（Acceptor），遵循 Asynchronous Network Model 不保證時間但保證最終會送達</p> <br/> <p><strong>Phase 1 — Preparation</strong>：讓過半數的 Acceptors 承諾不再接受比 n 小的提案</p> <p><strong>Phase 2 — Accept</strong>:Proposer 收集 ack 後，決定要提出什麼值，並發送給大家</p>',1);function fa(u){var e=wa();A(34),f(u,e)}const ha=Object.freeze(Object.defineProperty({__proto__:null,default:fa,metadata:wn},Symbol.toStringTag,{value:"Module"})),fn={title:"LeetCode SQL 50",date:"2025-07-24",category:"software",subCategory:"Database",tags:["database","leetcode","sql"],slug:"db_leetcode50"},{title:Ae,date:Ee,category:xe,subCategory:Pe,tags:De,slug:Oe}=fn;var ba=w('<h6>練習練習練習</h6> <hr/> <h3><a href="https://leetcode.com/problems/managers-with-at-least-5-direct-reports/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">570. Manager…</a></h3> <p>GROUP BY + HAVING 選出符合條件值當作 where 條件</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/confirmation-rate/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1934. Confirmation Rate</a></h3> <p>用 GROUP BY + function 做出一張暫時表單 join 到主表，再處理 IFNULL 的邏輯</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/monthly-transactions-i/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1193. Monthly Transactions I</a></h3> <p>熟悉在SELECT欄位可一起使用到的語法</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/immediate-food-delivery-ii/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1174. Immediate Food Delivery II</a></h3> <p>先用 GROUPBY + MIN(DATE) 找到顧客的首筆訂單，但因為是聚合函數，無法直接帶出該筆訂單的 delivery_id ，再用 Duplicate ID key 找出該對應的原始表欄位。</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/employees-whose-manager-left-the-company/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1978. Employees Whose Manager Left the Company</a></h3> <p>利用 left join 會填補 null 的特性去篩選出欄位</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/movie-rating/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1341. Movie Rating</a></h3> <p>取同一個變數名稱 results + 練習 LIMIT + 雙排序</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">602. Friend Requests II: Who Has the Most Friends</a></h3> <p>總數可直接用 requester_id + accepter_id 加總來處理，所以先用 UNION ALL 攤平就好處理了</p> <pre class="language-sql"><!></pre>',1);function va(u){var e=ba(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> name
<span class="token keyword">FROM</span> Employee
<span class="token keyword">WHERE</span> id <span class="token operator">IN</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> managerId
    <span class="token keyword">FROM</span> Employee
    <span class="token keyword">WHERE</span> managerId <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
    <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> managerId
    <span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">5</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span> 
       IFNULL<span class="token punctuation">(</span>aa<span class="token punctuation">.</span>confirmation_rate<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> confirmation_rate
<span class="token keyword">FROM</span> Signups <span class="token keyword">AS</span> s
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span>
      user_id<span class="token punctuation">,</span>
      <span class="token function">ROUND</span><span class="token punctuation">(</span>
        <span class="token function">SUM</span><span class="token punctuation">(</span><span class="token keyword">CASE</span> <span class="token keyword">WHEN</span> <span class="token keyword">action</span> <span class="token operator">=</span> <span class="token string">'confirmed'</span> <span class="token keyword">THEN</span> <span class="token number">1</span> <span class="token keyword">ELSE</span> <span class="token number">0</span> <span class="token keyword">END</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">1.0</span> <span class="token operator">/</span>
        <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token number">2</span>
      <span class="token punctuation">)</span> <span class="token keyword">AS</span> confirmation_rate
    <span class="token keyword">FROM</span> Confirmations
    <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> user_id
<span class="token punctuation">)</span> <span class="token keyword">AS</span> aa
<span class="token keyword">ON</span> s<span class="token punctuation">.</span>user_id <span class="token operator">=</span> aa<span class="token punctuation">.</span>user_id<span class="token punctuation">;</span></code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> 
    DATE_FORMAT<span class="token punctuation">(</span>trans_date<span class="token punctuation">,</span> <span class="token string">'%Y-%m'</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> <span class="token keyword">month</span><span class="token punctuation">,</span>
    country<span class="token punctuation">,</span>
    <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> trans_count<span class="token punctuation">,</span>
    <span class="token function">SUM</span><span class="token punctuation">(</span><span class="token keyword">CASE</span> <span class="token keyword">WHEN</span> state <span class="token operator">=</span> <span class="token string">'approved'</span> <span class="token keyword">THEN</span> <span class="token number">1</span> <span class="token keyword">ELSE</span> <span class="token number">0</span> <span class="token keyword">END</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> approved_count<span class="token punctuation">,</span>
    <span class="token function">SUM</span><span class="token punctuation">(</span>amount<span class="token punctuation">)</span> <span class="token keyword">AS</span> trans_total_amount<span class="token punctuation">,</span>
    <span class="token function">SUM</span><span class="token punctuation">(</span><span class="token keyword">CASE</span> <span class="token keyword">WHEN</span> state <span class="token operator">=</span> <span class="token string">'approved'</span> <span class="token keyword">THEN</span> amount <span class="token keyword">ELSE</span> <span class="token number">0</span> <span class="token keyword">END</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> approved_total_amount
<span class="token keyword">FROM</span> 
    <span class="token keyword">Transactions</span>
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> 
    DATE_FORMAT<span class="token punctuation">(</span>trans_date<span class="token punctuation">,</span> <span class="token string">'%Y-%m'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    country<span class="token punctuation">;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-sql"><span class="token keyword">SELECT</span>
  <span class="token function">ROUND</span><span class="token punctuation">(</span>
    <span class="token function">SUM</span><span class="token punctuation">(</span>order_date <span class="token operator">=</span> customer_pref_delivery_date<span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100.0</span> <span class="token operator">/</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token number">2</span>
  <span class="token punctuation">)</span> <span class="token keyword">AS</span> immediate_percentage
<span class="token keyword">FROM</span> Delivery
<span class="token keyword">WHERE</span> <span class="token punctuation">(</span>customer_id<span class="token punctuation">,</span> order_date<span class="token punctuation">)</span> <span class="token operator">IN</span> <span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> customer_id<span class="token punctuation">,</span> <span class="token function">MIN</span><span class="token punctuation">(</span>order_date<span class="token punctuation">)</span>
  <span class="token keyword">FROM</span> Delivery
  <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> customer_id
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,6),y=n(i);a(y,()=>`<code class="language-sql"><span class="token keyword">select</span> e1<span class="token punctuation">.</span>employee_id
<span class="token keyword">from</span> <span class="token punctuation">(</span>
    <span class="token keyword">select</span> <span class="token operator">*</span>
    <span class="token keyword">from</span> Employees
    <span class="token keyword">where</span> salary <span class="token operator">&lt;</span> <span class="token number">30000</span> <span class="token operator">AND</span> manager_id <span class="token operator">is</span> <span class="token operator">not</span> <span class="token boolean">null</span>
    <span class="token keyword">order</span> <span class="token keyword">by</span> employee_id
<span class="token punctuation">)</span> <span class="token keyword">as</span> e1
<span class="token keyword">left</span> <span class="token keyword">join</span> Employees <span class="token keyword">as</span> e2
<span class="token keyword">on</span> e1<span class="token punctuation">.</span>manager_id <span class="token operator">=</span> e2<span class="token punctuation">.</span>employee_id
<span class="token keyword">where</span> e2<span class="token punctuation">.</span>employee_id <span class="token operator">is</span> <span class="token boolean">null</span>
<span class="token keyword">order</span> <span class="token keyword">by</span> employee_id <span class="token keyword">asc</span></code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-sql"><span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> name <span class="token keyword">AS</span> results
  <span class="token keyword">FROM</span> Users u
  <span class="token keyword">JOIN</span> MovieRating r <span class="token keyword">ON</span> u<span class="token punctuation">.</span>user_id <span class="token operator">=</span> r<span class="token punctuation">.</span>user_id
  <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> u<span class="token punctuation">.</span>user_id
  <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">DESC</span><span class="token punctuation">,</span> name <span class="token keyword">ASC</span>
  <span class="token keyword">LIMIT</span> <span class="token number">1</span>
<span class="token punctuation">)</span>
<span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> title <span class="token keyword">AS</span> results
  <span class="token keyword">FROM</span> Movies m
  <span class="token keyword">JOIN</span> MovieRating r <span class="token keyword">ON</span> m<span class="token punctuation">.</span>movie_id <span class="token operator">=</span> r<span class="token punctuation">.</span>movie_id
  <span class="token keyword">WHERE</span> r<span class="token punctuation">.</span>created_at <span class="token operator">BETWEEN</span> <span class="token string">'2020-02-01'</span> <span class="token operator">AND</span> <span class="token string">'2020-02-29'</span>
  <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> m<span class="token punctuation">.</span>movie_id<span class="token punctuation">,</span> m<span class="token punctuation">.</span>title
  <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token function">AVG</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>rating<span class="token punctuation">)</span> <span class="token keyword">DESC</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>title <span class="token keyword">ASC</span>
  <span class="token keyword">LIMIT</span> <span class="token number">1</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m);var h=t(m,6),R=n(h);a(R,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> id<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> num
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> requester_id <span class="token keyword">AS</span> id <span class="token keyword">FROM</span> RequestAccepted
  <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
  <span class="token keyword">SELECT</span> accepter_id <span class="token keyword">AS</span> id <span class="token keyword">FROM</span> RequestAccepted
<span class="token punctuation">)</span> <span class="token keyword">AS</span> all_ids
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> id
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> num <span class="token keyword">DESC</span>
<span class="token keyword">LIMIT</span> <span class="token number">1</span><span class="token punctuation">;</span></code>`),s(h),f(u,e)}const _a=Object.freeze(Object.defineProperty({__proto__:null,default:va,metadata:fn},Symbol.toStringTag,{value:"Module"})),hn={title:"資料庫正規化",date:"2025-07-24",category:"software",subCategory:"Database",tags:["database","normalization","sql"],slug:"db_normalization"},{title:Ne,date:Me,category:Le,subCategory:$e,tags:qe,slug:je}=hn;var Sa=w(`<h6>透過拆分、建立正確的鍵與相依關係來消除資料重複與異常的設計原則</h6> <hr/> <h2>正規化等級</h2> <p>1NF 每個欄位都必須是原子值（不可包含多值，例如逗號分隔或陣列）</p> <pre class="language-text"><!></pre> <p>2NF 滿足 1NF，所有非主鍵欄位必須完全依賴主鍵，不能只依賴主鍵的一部分（常發生在複合主鍵情況）</p> <p>錯誤 (複合主鍵 OrderID + ProductID，但 OrderDate 只依賴 OrderID)</p> <pre class="language-text"><!></pre> <p>因為 OrderDate 只依賴 OrderID，所以應該從明細表中拆出來，存放在訂單主檔中。</p> <pre class="language-text"><!></pre> <p>3NF 滿足 2NF 非主鍵欄位不能依賴其他非主鍵欄位（即無傳遞依賴）</p> <p>錯誤：這裡 DeptName 是依賴 DeptID，但 DeptID 不是主鍵 → 傳遞依賴</p> <pre class="language-text"><!></pre> <p>正確做法：將 DeptID → DeptName 拆到 Department 表</p> <pre class="language-text"><!></pre> <p>BCNF（Boyce-Codd Normal Form / 3.5NF）滿足 3NF，所有函數依賴的左側必須是超鍵（Super Key）</p> <p>錯誤 (Course → Room、Instructor → Room 同時存在，但都不是超鍵，則違反 BCNF。)</p> <pre class="language-text"><!></pre> <p>拆成兩張表，每個依賴的左側都變成主鍵（超鍵）：</p> <pre class="language-text"><!></pre> <p>4NF 無多值依賴（Multivalued Dependency），若一欄對應多值且彼此無關，應拆表避免組合膨脹</p> <p>錯誤 Crust 與 Area 無關，造成笛卡兒組合</p> <pre class="language-text"><!></pre> <p>正確 拆成兩張表</p> <pre class="language-text"><!></pre> <p>5NF 滿足 4NF，並確保將資料拆成多個子關係後，再重新 join 回來時不會產生多餘資料（避免 join loss）。
常見於 三元以上關聯（例如三欄組合關係）。</p> <p>假設你用以下三張表建構資料：</p> <pre class="language-text"><!></pre> <p>在滿足 5NF 的設計中，會保留一張三元關聯表來表達實際的資料：</p> <pre class="language-text"><!></pre>`,1);function Ca(u){var e=Sa(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-text">錯誤
UserId | Hobby
-------|--------
1      | &quot;reading, swimming, coding&quot;

正確
UserId | Hobby
-------|--------
1      | reading
1      | swimming
1      | coding</code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-text">OrderID | ProductID | OrderDate
--------|-----------|------------
1001    | A1        | 2025-07-01
1001    | A2        | 2025-07-01</code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-text">-- 訂單主檔（Order）
OrderID | OrderDate
--------|------------
1001    | 2025-07-01

-- 訂單明細檔（OrderDetail）
OrderID | ProductID
--------|-----------
1001    | A1
1001    | A2</code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-text">StudentID | DeptID | DeptName
----------|--------|----------
1001      | D01    | Computer Science</code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-text">StudentID | DeptID
----------|--------
1001      | D01
1002      | D02

DeptID | DeptName
-------|--------------------
D01    | Computer Science
D02    | Electrical Engineering</code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-text">Course | Instructor | Room
-------|------------|-----
DB     | Smith      | R1
DB     | Jones      | R2</code>`),s(m);var h=t(m,4),R=n(h);a(R,()=>`<code class="language-text">-- 課程與教室（CourseRoom）
Course | Room
-------|-----
DB     | R1

-- 講師與教室（InstructorRoom）
Instructor | Room
-----------|-----
Smith      | R1</code>`),s(h);var _=t(h,6),I=n(_);a(I,()=>`<code class="language-text">錯誤
Restaurant | Crust   | Area
-----------|---------|--------
X Pizza    | Thick   | Downtown
X Pizza    | Stuffed | Downtown
X Pizza    | Thick   | Uptown
X Pizza    | Stuffed | Uptown</code>`),s(_);var S=t(_,4),E=n(S);a(E,()=>`<code class="language-text">Restaurant | Crust
Restaurant | Area</code>`),s(S);var C=t(S,6),x=n(C);a(x,()=>`<code class="language-text">-- Supplier-Part
S1 | P1

-- Supplier-Project
S1 | J1

-- Part-Project
P1 | J1

-- 拼出來的關聯（有可能是錯的）
Supplier | Part | Project
---------|------|---------
S1       | P1   | J1  （合理）
S1       | P1   | J2  （若 J2 並不屬於 P1）</code>`),s(C);var T=t(C,4),D=n(T);a(D,()=>`<code class="language-text">-- Supplier-Part-Project
Supplier | Part | Project
---------|------|---------
S1       | P1   | J1</code>`),s(T),f(u,e)}const Ra=Object.freeze(Object.defineProperty({__proto__:null,default:Ca,metadata:hn},Symbol.toStringTag,{value:"Module"})),bn={title:"關聯式資料庫",date:"2025-06-22",category:"software",subCategory:"Database",tags:["database","db","sql"],slug:"db_relational"},{title:He,date:Ue,category:Be,subCategory:Fe,tags:Ve,slug:Ge}=bn;var Ta=w('<pre class="language-pgsql"><!></pre> <p>連接 SQL Server 時是透過 TDS（Tabular Data Stream）的通訊協定來交換資料。</p> <ul><li>TDS 是 SQL Server 專用的底層通訊協定，負責在用戶端與資料庫伺服器之間傳遞</li> <li>通常透過 TCP/IP 傳輸，預設使用的連接埠為 1433。</li> <li>用戶端要連接資料庫時，會使用一段 Connection String（連線字串）</li></ul> <pre class="language-pgsql"><!></pre> <h3>Table（資料表）</h3> <p>資料表是資料的儲存核心，每個表由「列（row）」與「欄（column）」構成。</p> <pre class="language-sql"><!></pre> <h3>Primary Key（主鍵）</h3> <p>能唯一標識每一筆資料，一張表只能有一個主鍵，可以是單一欄位或多欄位組成（複合主鍵）。</p> <pre class="language-sql"><!></pre> <h3>Unique Constraint（唯一約束）</h3> <p>限制欄位值不能重複，一張表可以有多個唯一欄位。</p> <pre class="language-sql"><!></pre> <h3>Foreign Key（外鍵）</h3> <pre class="language-sql"><!></pre> <h3>Index（索引）</h3> <p>加速查詢效率，類似書本的目錄，索引可以建立在單一欄位或多個欄位上。</p> <pre class="language-sql"><!></pre>',1);function Ia(u){var e=Ta(),p=b(e),k=n(p);a(k,()=>`<code class="language-pgsql">SQL Server Instance
├── Database
│   ├── Schema
│   │   ├── Table
│   │   ├── View
│   │   ├── Stored Procedure
│   │   ├── Function
│   │   ├── Synonym
│   │   └── Permissions / Roles
│   └── Security Settings
└── System Databases (master, msdb, model, tempdb)</code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>'<code class="language-pgsql">Server=127.0.0.1,1433;Database=MyDb;User Id=sa;Password=MyPassword;TrustServerCertificate=True;</code>'),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Users <span class="token punctuation">(</span>
    Id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    UserName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    Email NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span>
    CreatedAt <span class="token keyword">DATETIME</span> <span class="token keyword">DEFAULT</span> GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-sql"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Users
<span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> PK_Users <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,6),y=n(i);a(y,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Products <span class="token punctuation">(</span>
    ProductId <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    SKU NVARCHAR<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(i);var m=t(i,4),v=n(m);a(v,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Orders <span class="token punctuation">(</span>
    OrderId <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    UserId <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>UserId<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> Users<span class="token punctuation">(</span>Id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m);var h=t(m,6),R=n(h);a(R,()=>'<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> IDX_Users_UserName <span class="token keyword">ON</span> Users<span class="token punctuation">(</span>UserName<span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(h),f(u,e)}const Aa=Object.freeze(Object.defineProperty({__proto__:null,default:Ia,metadata:bn},Symbol.toStringTag,{value:"Module"})),vn={title:"SQL Command",date:"2025-06-22",category:"software",subCategory:"Database",tags:["database","db","sql"],slug:"db_sql"},{title:We,date:Ye,category:ze,subCategory:Je,tags:Ke,slug:Xe}=vn;var Ea=w('<h3>特性</h3> <ul><li>同步執行：必須有結果才會繼續，報錯會停止。</li> <li>四大分類：<code>SELECT</code> / <code>INSERT</code> / <code>UPDATE</code> / <code>DELETE</code></li> <li><strong>SELECT</strong>：從資料表中篩出符合條件的資料，組成一張新結果表（結果集）。</li></ul> <h3>查詢最小單元範例</h3> <pre class="language-sql"><!></pre> <h3>常用子句與函數</h3> <ul><li><code>WHERE</code>：條件篩選</li> <li><code>ORDER BY</code>：排序</li> <li><code>LIMIT</code> / <code>TOP</code>：只取前幾筆（需搭配 <code>ORDER BY</code>）</li> <li><code>DISTINCT</code>：唯一值</li> <li><code>LIKE</code>：模糊搜尋</li> <li><code>AS</code>：欄位命名別名</li> <li><code>GROUP BY</code> + <code>HAVING</code>：群組後條件</li> <li>聚合函數：<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MAX</code>, <code>MIN</code></li></ul> <h3>LEFT JOIN</h3> <p><code>LEFT JOIN = INNER JOIN + 左表未對應資料（右表為 NULL）</code></p> <h3>RIGHT JOIN</h3> <p>同 <code>LEFT JOIN</code>，只是語法方向相反</p> <h3>FULL OUTER JOIN</h3> <p><code>LEFT JOIN</code> + <code>RIGHT JOIN</code>（合併後去重）</p> <h3>CROSS JOIN</h3> <p>所有組合（兩表 row 數乘積）</p> <p><strong>應用場景：</strong></p> <table><thead><tr><th>Color</th><th>Size</th></tr></thead><tbody><tr><td>Red</td><td>S</td></tr><tr><td>Red</td><td>M</td></tr><tr><td>Red</td><td>L</td></tr><tr><td>Blue</td><td>S</td></tr><tr><td>Blue</td><td>M</td></tr><tr><td>Blue</td><td>L</td></tr></tbody></table> <h3>SELF JOIN</h3> <pre class="language-sql"><!></pre> <p>同一張表內查上下屬關係</p> <h3>APPLY（SQL Server 專用）</h3> <ul><li><code>CROSS APPLY</code>：類似 <code>INNER JOIN</code>，但可動態過濾副表</li> <li><code>OUTER APPLY</code>：類似 <code>LEFT JOIN</code>，但可動態過濾副表</li></ul>',1);function xa(u){var e=Ea(),p=t(b(e),6),k=n(p);a(k,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> status_id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> name<span class="token punctuation">,</span> email <span class="token keyword">FROM</span> users<span class="token punctuation">;</span></code>`),s(p);var o=t(p,28),r=n(o);a(r,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> 
  A<span class="token punctuation">.</span>name <span class="token keyword">AS</span> employee<span class="token punctuation">,</span>
  B<span class="token punctuation">.</span>name <span class="token keyword">AS</span> manager
<span class="token keyword">FROM</span> Employees A
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> Employees B <span class="token keyword">ON</span> A<span class="token punctuation">.</span>manager_id <span class="token operator">=</span> B<span class="token punctuation">.</span>id<span class="token punctuation">;</span></code>`),s(o),A(6),f(u,e)}const Pa=Object.freeze(Object.defineProperty({__proto__:null,default:xa,metadata:vn},Symbol.toStringTag,{value:"Module"})),_n={title:"資料庫表單設計",date:"2025-06-22",category:"software",subCategory:"Database",tags:["database","db","sql"],slug:"db_table_1"},{title:Qe,date:Ze,category:nc,subCategory:sc,tags:ac,slug:tc}=_n;var Da=w('<h3>Recursive Hierarchy</h3> <p>需要儲存的資料性質為能夠</p> <ul><li>ID</li> <li>辨識父節點的 ID</li> <li>其他業務欄位一樣（如名稱、排序、狀態…）</li></ul> <h3>鄰接表 Adjacency List</h3> <p>表單內欄位直接標示 <code>UpCode</code></p> <table><thead><tr><th>ID</th><th>UpCode</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td>NULL</td><td>電子產品</td></tr><tr><td>2</td><td>1</td><td>手機</td></tr><tr><td>3</td><td>1</td><td>筆記型電腦</td></tr><tr><td>4</td><td>2</td><td>智慧型手機</td></tr></tbody></table> <pre class="language-sql"><!></pre> <h3>Nested Set</h3> <p>用樹狀的概念來分類表，查找快速但新增和修改不容易維護</p> <pre class="language-scss"><!></pre> <table><thead><tr><th>ID</th><th>Name</th><th>Lft</th><th>Rgt</th></tr></thead><tbody><tr><td>1</td><td>類別A</td><td>1</td><td>6</td></tr><tr><td>3</td><td>子類A1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>子類A2</td><td>4</td><td>5</td></tr><tr><td>2</td><td>類別B</td><td>7</td><td>10</td></tr><tr><td>5</td><td>子類B1</td><td>8</td><td>9</td></tr></tbody></table> <pre class="language-sql"><!></pre> <h3>Materialized Path（路徑枚舉）</h3> <p>使用似 URL 的方式管理</p> <table><thead><tr><th>ID</th><th>Path</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td><code>/1/</code></td><td>電子產品</td></tr><tr><td>2</td><td><code>/1/2/</code></td><td>手機</td></tr><tr><td>4</td><td><code>/1/2/4/</code></td><td>智慧型手機</td></tr><tr><td>3</td><td><code>/1/3/</code></td><td>筆記型電腦</td></tr></tbody></table> <pre class="language-sql"><!></pre> <h3>Closure Table（關係表）</h3> <pre class="language-sql"><!></pre> <pre class="language-scss"><!></pre> <ul><li><p>Category table</p> <table><thead><tr><th>ID</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td>A</td></tr><tr><td>2</td><td>B</td></tr><tr><td>3</td><td>C</td></tr><tr><td>4</td><td>D</td></tr></tbody></table></li> <li><p>CategoryClosure</p> <table><thead><tr><th>Ancestor</th><th>Descendant</th><th>Depth</th><th></th></tr></thead><tbody><tr><td>1</td><td>1</td><td>0</td><td>← A→A</td></tr><tr><td>2</td><td>2</td><td>0</td><td>← B→B</td></tr><tr><td>3</td><td>3</td><td>0</td><td>← C→C</td></tr><tr><td>4</td><td>4</td><td>0</td><td>← D→D</td></tr><tr><td>1</td><td>2</td><td>1</td><td>← A→B</td></tr><tr><td>1</td><td>3</td><td>1</td><td>← A→C</td></tr><tr><td>2</td><td>4</td><td>1</td><td>← B→D</td></tr><tr><td>1</td><td>4</td><td>2</td><td>← A→D</td></tr></tbody></table></li></ul> <p>查詢</p> <pre class="language-sql"><!></pre> <p>插入</p> <ul><li>主表先 INSERT 一筆新節點，取得它的 ID = @newId</li></ul> <pre class="language-sql"><!></pre> <p>刪除</p> <ul><li>先刪除 Closure Table 中任何以該節點為 Ancestor 或 Descendant 的紀錄，然後刪除主表中的那筆節點</li></ul>',1);function Oa(u){var e=Da(),p=t(b(e),12),k=n(p);a(k,()=>`<code class="language-sql">
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Category <span class="token punctuation">(</span>
  ID            <span class="token keyword">BIGINT</span>       <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
  UpCode        <span class="token keyword">BIGINT</span>       <span class="token boolean">NULL</span>      <span class="token comment">-- 指向父節點 ID（根節點 UpCode = NULL）</span>
  Name          NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  SortOrder     <span class="token keyword">INT</span>           <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  State         <span class="token keyword">TINYINT</span>       <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 多層查詢（SQL Server 迴圈 CTE）</span>
<span class="token comment">-- 先查 最上層 &amp; 添加臨時欄位 Level = 1</span>
<span class="token keyword">WITH</span> RecursiveCTE <span class="token keyword">AS</span> <span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> ID<span class="token punctuation">,</span> UpCode<span class="token punctuation">,</span> Name<span class="token punctuation">,</span> <span class="token number">1</span> <span class="token keyword">AS</span> <span class="token keyword">Level</span>
  <span class="token keyword">FROM</span> Category
  <span class="token keyword">WHERE</span> UpCode <span class="token operator">IS</span> <span class="token boolean">NULL</span>

  <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>

  <span class="token keyword">SELECT</span> c<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> c<span class="token punctuation">.</span>UpCode<span class="token punctuation">,</span> c<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token keyword">Level</span> <span class="token operator">+</span> <span class="token number">1</span>
  <span class="token keyword">FROM</span> Category c
  <span class="token keyword">JOIN</span> RecursiveCTE r
    <span class="token keyword">ON</span> c<span class="token punctuation">.</span>UpCode <span class="token operator">=</span> r<span class="token punctuation">.</span>ID
<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> 
<span class="token keyword">FROM</span> RecursiveCTE
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> <span class="token keyword">Level</span><span class="token punctuation">,</span> ID<span class="token punctuation">;</span>
</code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-scss">1. 類別A <span class="token punctuation">(</span>ID=1<span class="token punctuation">)</span>
   ├─ 子類A1 <span class="token punctuation">(</span>ID=3<span class="token punctuation">)</span>
   └─ 子類A2 <span class="token punctuation">(</span>ID=4<span class="token punctuation">)</span>

2. 類別B <span class="token punctuation">(</span>ID=2<span class="token punctuation">)</span>
   └─ 子類B1 <span class="token punctuation">(</span>ID=5<span class="token punctuation">)</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> CategoryNested <span class="token punctuation">(</span>
  ID      <span class="token keyword">BIGINT</span>       <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
  Name    NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  Lft     <span class="token keyword">INT</span>           <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 左值</span>
  Rgt     <span class="token keyword">INT</span>           <span class="token operator">NOT</span> <span class="token boolean">NULL</span>   <span class="token comment">-- 右值</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 假設要撈出「類別A」(ID=1) 的所有子孫（含自己）：</span>
<span class="token keyword">SELECT</span> node<span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">FROM</span> CategoryNested <span class="token keyword">AS</span> node
<span class="token keyword">JOIN</span> CategoryNested <span class="token keyword">AS</span> parent
  <span class="token keyword">ON</span> node<span class="token punctuation">.</span>Lft <span class="token operator">BETWEEN</span> parent<span class="token punctuation">.</span>Lft <span class="token operator">AND</span> parent<span class="token punctuation">.</span>Rgt
<span class="token keyword">WHERE</span> parent<span class="token punctuation">.</span>ID <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> node<span class="token punctuation">.</span>Lft<span class="token punctuation">;</span>

<span class="token comment">-- 新增主類別的話需要重新計算樹</span>
<span class="token keyword">DECLARE</span> <span class="token variable">@newId</span> <span class="token keyword">INT</span> <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
<span class="token keyword">DECLARE</span> <span class="token variable">@newName</span> NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">=</span> N<span class="token string">'類別C'</span><span class="token punctuation">;</span>

<span class="token comment">-- 1. 找到目前最大的右值</span>
<span class="token keyword">DECLARE</span> <span class="token variable">@maxRgt</span> <span class="token keyword">INT</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token function">MAX</span><span class="token punctuation">(</span>Rgt<span class="token punctuation">)</span> <span class="token keyword">FROM</span> CategoryNested<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 2. 先把所有 Lft >= maxRgt+1 的值往後推 2</span>
<span class="token keyword">UPDATE</span> CategoryNested
<span class="token keyword">SET</span> Lft <span class="token operator">=</span> <span class="token keyword">CASE</span> <span class="token keyword">WHEN</span> Lft <span class="token operator">></span> <span class="token variable">@maxRgt</span> <span class="token keyword">THEN</span> Lft <span class="token operator">+</span> <span class="token number">2</span> <span class="token keyword">ELSE</span> Lft <span class="token keyword">END</span><span class="token punctuation">,</span>
    Rgt <span class="token operator">=</span> <span class="token keyword">CASE</span> <span class="token keyword">WHEN</span> Rgt <span class="token operator">>=</span> <span class="token variable">@maxRgt</span> <span class="token keyword">THEN</span> Rgt <span class="token operator">+</span> <span class="token number">2</span> <span class="token keyword">ELSE</span> Rgt <span class="token keyword">END</span><span class="token punctuation">;</span>

<span class="token comment">-- 3. 插入新節點，左右值分別為 maxRgt+1, maxRgt+2</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> CategoryNested <span class="token punctuation">(</span>ID<span class="token punctuation">,</span> Name<span class="token punctuation">,</span> Lft<span class="token punctuation">,</span> Rgt<span class="token punctuation">)</span>
<span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token variable">@newId</span><span class="token punctuation">,</span> <span class="token variable">@newName</span><span class="token punctuation">,</span> <span class="token variable">@maxRgt</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token variable">@maxRgt</span> <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,8),g=n(l);a(g,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> CategoryPath <span class="token punctuation">(</span>
  ID      <span class="token keyword">BIGINT</span>        <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
  Path    NVARCHAR<span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 以 "/" 分隔的父節點路徑</span>
  Name    NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Category <span class="token punctuation">(</span>
  ID   <span class="token keyword">BIGINT</span>        <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
  Name NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> CategoryClosure <span class="token punctuation">(</span>
  Ancestor   <span class="token keyword">BIGINT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 祖先節點</span>
  Descendant <span class="token keyword">BIGINT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 後代節點</span>
  Depth      <span class="token keyword">INT</span>    <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 兩者間距離：0 = 自己</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>Ancestor<span class="token punctuation">,</span> Descendant<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(i);var m=t(i,2),v=n(m);a(v,()=>`<code class="language-scss">A <span class="token punctuation">(</span>ID=1<span class="token punctuation">)</span>
├─ B <span class="token punctuation">(</span>ID=2<span class="token punctuation">)</span>
│   └─ D <span class="token punctuation">(</span>ID=4<span class="token punctuation">)</span>
└─ C <span class="token punctuation">(</span>ID=3<span class="token punctuation">)</span></code>`),s(m);var h=t(m,6),R=n(h);a(R,()=>`<code class="language-sql"><span class="token comment">-- 查詢某節點的所有後代（含自己）</span>
<span class="token keyword">SELECT</span> c<span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">FROM</span> Category <span class="token keyword">AS</span> c
<span class="token keyword">JOIN</span> CategoryClosure <span class="token keyword">AS</span> cc
  <span class="token keyword">ON</span> c<span class="token punctuation">.</span>ID <span class="token operator">=</span> cc<span class="token punctuation">.</span>Descendant
<span class="token keyword">WHERE</span> cc<span class="token punctuation">.</span>Ancestor <span class="token operator">=</span> <span class="token variable">@nodeId</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> cc<span class="token punctuation">.</span>Depth<span class="token punctuation">;</span>

<span class="token comment">-- 查詢某節點的所有祖先（含自己）   </span>
<span class="token keyword">SELECT</span> c<span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">FROM</span> Category <span class="token keyword">AS</span> c
<span class="token keyword">JOIN</span> CategoryClosure <span class="token keyword">AS</span> cc
  <span class="token keyword">ON</span> c<span class="token punctuation">.</span>ID <span class="token operator">=</span> cc<span class="token punctuation">.</span>Ancestor
<span class="token keyword">WHERE</span> cc<span class="token punctuation">.</span>Descendant <span class="token operator">=</span> <span class="token variable">@nodeId</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> cc<span class="token punctuation">.</span>Depth<span class="token punctuation">;</span></code>`),s(h);var _=t(h,6),I=n(_);a(I,()=>`<code class="language-sql"><span class="token comment">-- 對所有 ancestor of parentId，插入新後代關係</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> CategoryClosure <span class="token punctuation">(</span>Ancestor<span class="token punctuation">,</span> Descendant<span class="token punctuation">,</span> Depth<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> Ancestor<span class="token punctuation">,</span> <span class="token variable">@newId</span><span class="token punctuation">,</span> Depth <span class="token operator">+</span> <span class="token number">1</span>
<span class="token keyword">FROM</span> CategoryClosure
<span class="token keyword">WHERE</span> Descendant <span class="token operator">=</span> <span class="token variable">@parentId</span><span class="token punctuation">;</span>

<span class="token comment">-- 再插一筆自己到自己的對應</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> CategoryClosure <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token variable">@newId</span><span class="token punctuation">,</span> <span class="token variable">@newId</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(_),A(4),f(u,e)}const Na=Object.freeze(Object.defineProperty({__proto__:null,default:Oa,metadata:_n},Symbol.toStringTag,{value:"Module"})),Sn={title:"POS機台金流串接處理",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["金流","backend","payment"],slug:"cashflow"},{title:pc,date:oc,category:ec,subCategory:cc,tags:lc,slug:uc}=Sn;var Ma=w(`<h6><a href="https://github.com/cao0085/code-pattern/tree/main/cashflow" rel="nofollow">相關程式碼範例</a></h6> <hr/> <h3>實踐重點</h3> <ul><li>交易一致性：更新多張表時務必使用 Transaction</li> <li>完整留痕：Request/Response 重要欄位存檔，方便日後錯誤處理</li> <li>編號唯一：重試時的唯一索引，避免重複請款/退款。</li> <li>錯誤碼映射表：將各家金流商的 ReturnCode Mapping 集中管理。</li> <li>人工介入流程：定義特殊處理的狀況，要有後台工具或警示流程。</li> <li>查詢補償機制：定時 Job/手動工具執行 Query，同步漏單、退款差額。</li></ul> <p><code>主要流程: Request =&gt; Pre-commit / record original state =&gt; Response Logging =&gt; State Machine =&gt; Commit</code></p> <h3>HTTP Request Skeleton</h3> <ul><li>依 PP 文件將必要 Header（例如 ChannelId / Secret…）與 Body JSON 組起來。</li> <li>這層邏輯最好抽成共用：<code>GenerateProviderRequest(method, url, envConfig)</code>。</li> <li>若有簽章/加密，放在這層集中處理</li></ul> <pre class="language-csharp"><!></pre> <h3>Pre-commit</h3> <p>先在自家 DB 建立一筆「金流交易主檔（含交易序號、金額、初始狀態等），<code>Commit()</code> 後再呼叫 PP，若網路或對方故障，你仍有一筆記錄可查，方便後續查詢/補單/人工處理。</p> <pre class="language-csharp"><!></pre> <h3>SendRequest</h3> <p><code>SendRequestAsync(req)</code> 後，先檢查是否為預期內的回應(成功/失敗…)，記錄 Log（含狀態碼與錯誤訊息）</p> <pre class="language-csharp"><!></pre> <h3>State Machine</h3> <p>邏輯判斷回傳資訊，與 DB 互動（更新狀態、寫入明細）包在 Transaction 中，確保一致性。</p> <pre class="language-csharp"><!></pre> <br/> <h3>補查詢交易狀態</h3> <p>若在發送請求時遇到網路異常、非預期回應，通常會用查詢確認金流商最新狀態，把金流商回應的狀態和自家資料庫比對/修改。這邊可以根據需求定義成純查詢/查詢後必定同步更新等等。</p> <br/> <h3>Finite State Machine</h3> <p>金流處理也適合導入有限狀態機的概念，因為資料變更會是有條件的例如</p> <ul><li><p>付款待確認
-可變成: 付款成功、付款失敗、付款取消
-不可變成: 退款、退款失敗</p></li> <li><p>付款成功
-可變成: 退款、退款失敗
-不可變成: 付款待確認、付款失敗、付款取消</p></li></ul> <p>等等…</p>`,1);function La(u){var e=Ma(),p=t(b(e),14),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> req <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpRequestMessage</span><span class="token punctuation">(</span>HttpMethod<span class="token punctuation">.</span>Post<span class="token punctuation">,</span> fullUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">></span> req<span class="token punctuation">.</span>Headers<span class="token punctuation">.</span><span class="token function">TryAddWithoutValidation</span><span class="token punctuation">(</span><span class="token string">"X-Provider-Id"</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span>ChannelId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">></span> req<span class="token punctuation">.</span>Headers<span class="token punctuation">.</span><span class="token function">TryAddWithoutValidation</span><span class="token punctuation">(</span><span class="token string">"X-Provider-Secret"</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span>Secret<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">></span> req<span class="token punctuation">.</span>Content <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringContent</span><span class="token punctuation">(</span>bodyJson<span class="token punctuation">,</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>'<code class="language-csharp">db<span class="token punctuation">.</span><span class="token function">SaveChanges</span><span class="token punctuation">(</span>payInfo<span class="token punctuation">)</span></code>'),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> res <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">SendAsync</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span>HttpCompletionOption<span class="token punctuation">.</span>ResponseHeadersRead<span class="token punctuation">,</span>ct<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-csharp"><span class="token keyword">switch</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>ReturnCode<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">case</span> <span class="token string">"0000"</span><span class="token punctuation">:</span> <span class="token comment">// 成功處理 =></span>
    <span class="token keyword">case</span> <span class="token string">"1165"</span><span class="token punctuation">:</span> <span class="token comment">// 失敗處理 =></span>
    <span class="token keyword">case</span> <span class="token string">"xxxx"</span><span class="token punctuation">:</span> <span class="token comment">// 例外處理 ...</span>
    <span class="token comment">//...</span>
<span class="token punctuation">&#125;</span>
<span class="token keyword">await</span> db<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">CommitAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> Response<span class="token punctuation">;</span></code>`),s(l),A(16),f(u,e)}const $a=Object.freeze(Object.defineProperty({__proto__:null,default:La,metadata:Sn},Symbol.toStringTag,{value:"Module"})),Cn={title:"Download PDF",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["pdf","js","dom"],slug:"jsPDF"},{title:kc,date:ic,category:rc,subCategory:dc,tags:mc,slug:gc}=Cn;var qa=w('<h6>紀錄下載影像相關處理 <a href="https://github.com/cao0085/code-pattern/tree/main/fronted-pdf-download" rel="nofollow">相關程式碼</a></h6> <hr/> <h3>畫面截圖類型（html2canvas、dom-to-image…）</h3> <p>原理大多是用<code>document.query(ID / class)</code>抓取指定的<code>DOM</code>，在套件內<strong>模擬</strong>JS排版樣式引擎(所以可能會跑版)，繪圖在 HTML<code>&lt;canvas&gt;</code>Element 後再轉成 base64/Blob 格式輸出。</p> <p>要注意的是瀏覽器對於能當作繪製<code>&lt;canvas&gt;</code>的來源控管較為嚴格，例如在瀏覽器渲染的 img 來源可以使用，套件內被擋下來的問題，再來就是錯誤是發生在套件內部不好除錯。</p> <br/> <h3>向量型（jsPDF、pdf-lib…）</h3> <p>用程式碼直接描述格線、文字 ，也可以插入圖片當作背景。要注意的一樣是外部來源的合法(圖片、字體)，圖片可先在.js 轉換成 base64 當作來源給套件使用，減少套件內轉換失敗的風險。</p> <h4>jsPDF</h4> <p>添加字體方式有兩種方式讀取.ttf和.js，一樣讓套件讀取處理過的資源部屬比較穩定</p> <p>網站下載 .ttf 字體向量檔案</p> <pre class="language-js"><!></pre> <p>把 .ttf 轉成.js 再import到模組，因為字型檔案很大要用到再載入就好</p> <pre class="language-js"><!></pre> <p>圖片轉URL</p> <pre class="language-js"><!></pre> <p>下載和預覽</p> <pre class="language-js"><!></pre>',1);function ja(u){var e=qa(),p=t(b(e),22),k=n(p);a(k,()=>`<code class="language-js"><span class="token comment">// var pdfDoc = 建立一個 jsPDF 提供的物件(&#123; unit: 'mm', format: 'a4' &#125;)</span>
pdfDoc<span class="token punctuation">.</span><span class="token function">addFont</span><span class="token punctuation">(</span><span class="token string">'./eduSong_Unicode.ttf'</span><span class="token punctuation">,</span> <span class="token string">'eduSong_Unicode'</span><span class="token punctuation">,</span> <span class="token string">'normal'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pdfDoc<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token string">'eduSong_Unicode'</span><span class="token punctuation">,</span> <span class="token string">'normal'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-js"><span class="token comment">// 有呼叫函式再import</span>
<span class="token keyword">async</span> <span class="token function">ensurePdfLib</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token comment">// 若 import 過就不動作</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>pdfReady<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pdfReady<span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>pdfReady <span class="token operator">=</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName:"pdf-bundle" */</span> <span class="token string">'jspdf'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackChunkName:"pdf-bundle" */</span> <span class="token string">'@/assets/fonts/eduSong_Unicode-normal.js'</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>mod<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> mod<span class="token punctuation">.</span>jsPDF <span class="token operator">||</span> mod<span class="token punctuation">.</span>default<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>pdfReady<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
<span class="token comment">// var pdfDoc = 建立一個 jsPDF 提供的物件(&#123; unit: 'mm', format: 'a4' &#125;)</span>
pdfDoc<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token string">'eduSong_Unicode'</span><span class="token punctuation">,</span> <span class="token string">'normal'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-js"><span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadImage</span><span class="token punctuation">(</span>targetImage<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">loadImage</span><span class="token punctuation">(</span><span class="token parameter">url</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span>onerror <span class="token operator">=</span> reject<span class="token punctuation">;</span>
        img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>
      <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>

<span class="token comment">// 讀取圖片</span>
<span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadImage</span><span class="token punctuation">(</span>targetImage<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 先轉成 Base64 Data URL</span>
<span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'canvas'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
canvas<span class="token punctuation">.</span>width <span class="token operator">=</span> img<span class="token punctuation">.</span>naturalWidth <span class="token operator">||</span> img<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
canvas<span class="token punctuation">.</span>height <span class="token operator">=</span> img<span class="token punctuation">.</span>naturalHeight <span class="token operator">||</span> img<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
<span class="token keyword">const</span> ctx <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">'2d'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ctx<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>img<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> dataUrl <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">toDataURL</span><span class="token punctuation">(</span><span class="token string">'image/jpeg'</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 加入 jsPDF 當作底稿</span>
pdfDoc<span class="token punctuation">.</span><span class="token function">addImage</span><span class="token punctuation">(</span>dataUrl<span class="token punctuation">,</span> <span class="token string">'JPEG'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">210</span><span class="token punctuation">,</span> <span class="token number">297</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pdfDoc<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token string">'eduSong_Unicode'</span><span class="token punctuation">,</span> <span class="token string">'normal'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-js"><span class="token keyword">const</span> blob <span class="token operator">=</span> pdfDoc<span class="token punctuation">.</span><span class="token function">output</span><span class="token punctuation">(</span><span class="token string">'blob'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> pdfUrl <span class="token operator">=</span> <span class="token constant">URL</span><span class="token punctuation">.</span><span class="token function">createObjectURL</span><span class="token punctuation">(</span>blob<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 可插入 DOM </span>
pdfDoc<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token string">"fileName.pdf"</span><span class="token punctuation">)</span></code>`),s(l),f(u,e)}const Ha=Object.freeze(Object.defineProperty({__proto__:null,default:ja,metadata:Cn},Symbol.toStringTag,{value:"Module"})),Rn={title:"多個 PDF 檔案合併",date:"2025-09-16",category:"software",subCategory:"開發筆記",tags:["pdf","backend","command"],slug:"pdfmarge"},{title:yc,date:wc,category:fc,subCategory:hc,tags:bc,slug:vc}=Rn;var Ua=w('<h6><a href="https://github.com/cao0085/pdfMerger" rel="nofollow">Repository</a> ，Python 執行相容性比較好，C# UI方便友善</h6> <hr/> <h3>C#</h3> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre> <h3>Python3</h3> <pre class="language-bash"><!></pre> <pre class="language-python"><!></pre>',1);function Ba(u){var e=Ua(),p=t(b(e),6),k=n(p);a(k,()=>`<code class="language-csharp">  <span class="token comment">// .csproj</span>
<span class="token operator">&lt;</span>ItemGroup<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"itext7"</span> Version<span class="token operator">=</span><span class="token string">"8.0.5"</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"itext7.bouncy-castle-adapter"</span> Version<span class="token operator">=</span><span class="token string">"8.0.5"</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>ItemGroup<span class="token operator">></span></code>`),s(p);var o=t(p,2),r=n(o);a(r,()=>`<code class="language-csharp"><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>IO</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Linq</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Collections<span class="token punctuation">.</span>Generic</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">iText<span class="token punctuation">.</span>Kernel<span class="token punctuation">.</span>Pdf</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">iText<span class="token punctuation">.</span>Kernel<span class="token punctuation">.</span>Utils</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">iText<span class="token punctuation">.</span>Kernel<span class="token punctuation">.</span>Exceptions</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection<span class="token punctuation">.</span>PortableExecutable</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Net<span class="token punctuation">.</span>Sockets</span><span class="token punctuation">;</span>

<span class="token keyword">using</span> <span class="token namespace">PDF_Merger<span class="token punctuation">.</span>PasswordHelper</span><span class="token punctuation">;</span> <span class="token comment">// 自定義</span>

<span class="token keyword">class</span> <span class="token class-name">Program</span>
<span class="token punctuation">&#123;</span>
  <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
  <span class="token punctuation">&#123;</span> 
    <span class="token comment">// 讀檔案...</span>
    <span class="token class-name"><span class="token keyword">var</span></span> pdfFiles <span class="token operator">=</span> Directory<span class="token punctuation">.</span><span class="token function">GetFiles</span><span class="token punctuation">(</span>folderPath<span class="token punctuation">,</span> <span class="token string">"*.pdf"</span><span class="token punctuation">,</span> SearchOption<span class="token punctuation">.</span>TopDirectoryOnly<span class="token punctuation">)</span>
                          <span class="token punctuation">.</span><span class="token function">OrderBy</span><span class="token punctuation">(</span>f <span class="token operator">=></span> f<span class="token punctuation">)</span>
                          <span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 處理檔案路徑和名稱...</span>
    <span class="token class-name"><span class="token keyword">string</span></span> defaultPath <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">Combine</span><span class="token punctuation">(</span><span class="token string">"資料夾名稱"</span><span class="token punctuation">,</span> <span class="token string">"檔案名稱"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 主邏輯</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> pdfWriter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PdfWriter</span><span class="token punctuation">(</span>destinationPdfPath<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> pdfDocument <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PdfDocument</span><span class="token punctuation">(</span>pdfWriter<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
      <span class="token class-name"><span class="token keyword">var</span></span> merger <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PdfMerger</span><span class="token punctuation">(</span>pdfDocument<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name"><span class="token keyword">int</span></span> totalPages <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token class-name"><span class="token keyword">int</span></span> successCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
      <span class="token class-name"><span class="token keyword">int</span></span> skipCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

      <span class="token comment">// 檔案路徑</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> sourcePdfPaths<span class="token punctuation">.</span>Length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
      <span class="token punctuation">&#123;</span>
          <span class="token class-name"><span class="token keyword">string</span></span> sourcePath <span class="token operator">=</span> sourcePdfPaths<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
          <span class="token keyword">try</span>
          <span class="token punctuation">&#123;</span>
              <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PdfReader</span><span class="token punctuation">(</span>sourcePath<span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> sourceDoc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PdfDocument</span><span class="token punctuation">(</span>reader<span class="token punctuation">)</span><span class="token punctuation">)</span>
              <span class="token punctuation">&#123;</span>
                  <span class="token class-name"><span class="token keyword">int</span></span> pageCount <span class="token operator">=</span> sourceDoc<span class="token punctuation">.</span><span class="token function">GetNumberOfPages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  merger<span class="token punctuation">.</span><span class="token function">Merge</span><span class="token punctuation">(</span>sourceDoc<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> pageCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">&#125;</span>
              <span class="token keyword">else</span>
              <span class="token punctuation">&#123;</span>
                  skipCount<span class="token operator">++</span><span class="token punctuation">;</span>
              <span class="token punctuation">&#125;</span>
          <span class="token punctuation">&#125;</span>
          <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> fileEx<span class="token punctuation">)</span>
          <span class="token punctuation">&#123;</span> 
            <span class="token comment">// 若是讀取權限問題 嘗試 SetUnethicalReading</span>
            <span class="token class-name"><span class="token keyword">var</span></span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PdfReader</span><span class="token punctuation">(</span>sourcePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
            reader<span class="token punctuation">.</span><span class="token function">SetUnethicalReading</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 重點</span>

            <span class="token keyword">using</span> <span class="token punctuation">(</span>reader<span class="token punctuation">)</span>
            <span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> sourceDoc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PdfDocument</span><span class="token punctuation">(</span>reader<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">&#123;</span>
              merger<span class="token punctuation">.</span><span class="token function">Merge</span><span class="token punctuation">(</span>sourceDoc<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> pageCount<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//...</span>
            <span class="token punctuation">&#125;</span>

            <span class="token keyword">continue</span><span class="token punctuation">;</span>
          <span class="token punctuation">&#125;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-bash">pip <span class="token function">install</span> pypdf
pip <span class="token function">install</span> cryptography</code>`),s(c);var l=t(c,2),g=n(l);a(g,()=>`<code class="language-python"><span class="token comment">#!/usr/bin/env python3</span>
<span class="token comment"># -*- coding: utf-8 -*-</span>

<span class="token keyword">import</span> os
<span class="token keyword">from</span> pypdf <span class="token keyword">import</span> PdfWriter
<span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path

<span class="token keyword">def</span> <span class="token function">merge_pdfs</span><span class="token punctuation">(</span>input_folder<span class="token operator">=</span><span class="token string">"test"</span><span class="token punctuation">,</span> output_folder<span class="token operator">=</span><span class="token string">"output"</span><span class="token punctuation">,</span> output_filename<span class="token operator">=</span><span class="token string">"merged.pdf"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">"""
    合併指定資料夾內的所有 PDF 文件
    
    Args:
        input_folder: 輸入 PDF 文件的資料夾路徑
        output_folder: 輸出資料夾路徑
        output_filename: 合併後的文件名
    """</span>
    
    <span class="token comment"># 確保輸出資料夾存在</span>
    Path<span class="token punctuation">(</span>output_folder<span class="token punctuation">)</span><span class="token punctuation">.</span>mkdir<span class="token punctuation">(</span>exist_ok<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 取得所有 PDF 文件</span>
    pdf_files <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token builtin">file</span> <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>input_folder<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token builtin">file</span><span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">'.pdf'</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            pdf_files<span class="token punctuation">.</span>append<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>input_folder<span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 按文件名排序</span>
    pdf_files<span class="token punctuation">.</span>sort<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">if</span> <span class="token keyword">not</span> pdf_files<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"在 </span><span class="token interpolation"><span class="token punctuation">&#123;</span>input_folder<span class="token punctuation">&#125;</span></span><span class="token string"> 資料夾中沒有找到 PDF 文件"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"找到 </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token builtin">len</span><span class="token punctuation">(</span>pdf_files<span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span><span class="token string"> 個 PDF 文件:"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> <span class="token builtin">file</span> <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>pdf_files<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">&#123;</span>i<span class="token punctuation">&#125;</span></span><span class="token string">. </span><span class="token interpolation"><span class="token punctuation">&#123;</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>basename<span class="token punctuation">(</span><span class="token builtin">file</span><span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    
    <span class="token comment"># 創建 PDF 合併器</span>
    merger <span class="token operator">=</span> PdfWriter<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 逐個添加 PDF 文件</span>
        <span class="token keyword">for</span> pdf_file <span class="token keyword">in</span> pdf_files<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"正在處理: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>basename<span class="token punctuation">(</span>pdf_file<span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
            merger<span class="token punctuation">.</span>append<span class="token punctuation">(</span>pdf_file<span class="token punctuation">)</span>
        
        <span class="token comment"># 輸出合併後的文件</span>
        output_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>output_folder<span class="token punctuation">,</span> output_filename<span class="token punctuation">)</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>output_path<span class="token punctuation">,</span> <span class="token string">'wb'</span><span class="token punctuation">)</span> <span class="token keyword">as</span> output_file<span class="token punctuation">:</span>
            merger<span class="token punctuation">.</span>write<span class="token punctuation">(</span>output_file<span class="token punctuation">)</span>
        
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"&#92;n合併完成！"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"輸出文件: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>output_path<span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"總頁數: </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token builtin">len</span><span class="token punctuation">(</span>merger<span class="token punctuation">.</span>pages<span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
        
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"合併過程中發生錯誤: </span><span class="token interpolation"><span class="token punctuation">&#123;</span>e<span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    
    <span class="token keyword">finally</span><span class="token punctuation">:</span>
        merger<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">list_pdfs</span><span class="token punctuation">(</span>folder<span class="token operator">=</span><span class="token string">"pdfs"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">"""列出資料夾內的所有 PDF 文件"""</span>
    pdf_files <span class="token operator">=</span> <span class="token punctuation">[</span>f <span class="token keyword">for</span> f <span class="token keyword">in</span> os<span class="token punctuation">.</span>listdir<span class="token punctuation">(</span>folder<span class="token punctuation">)</span> <span class="token keyword">if</span> f<span class="token punctuation">.</span>lower<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>endswith<span class="token punctuation">(</span><span class="token string">'.pdf'</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    
    <span class="token keyword">if</span> <span class="token keyword">not</span> pdf_files<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"在 </span><span class="token interpolation"><span class="token punctuation">&#123;</span>folder<span class="token punctuation">&#125;</span></span><span class="token string"> 資料夾中沒有找到 PDF 文件"</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"找到 </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token builtin">len</span><span class="token punctuation">(</span>pdf_files<span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span><span class="token string"> 個 PDF 文件:"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> <span class="token builtin">file</span> <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>pdf_files<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>folder<span class="token punctuation">,</span> <span class="token builtin">file</span><span class="token punctuation">)</span>
        file_size <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>getsize<span class="token punctuation">(</span>file_path<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1024</span>  <span class="token comment"># KB</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">&#123;</span>i<span class="token punctuation">&#125;</span></span><span class="token string">. </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token builtin">file</span><span class="token punctuation">&#125;</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token punctuation">&#123;</span>file_size<span class="token punctuation">:</span><span class="token format-spec">.1f</span><span class="token punctuation">&#125;</span></span><span class="token string"> KB)"</span></span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"=== PDF 合併工具 ===&#92;n"</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 先列出所有 PDF 文件</span>
    list_pdfs<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">"&#92;n"</span> <span class="token operator">+</span> <span class="token string">"="</span><span class="token operator">*</span><span class="token number">50</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 執行合併</span>
    merge_pdfs<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`),s(l),f(u,e)}const Fa=Object.freeze(Object.defineProperty({__proto__:null,default:Ba,metadata:Rn},Symbol.toStringTag,{value:"Module"})),Tn={title:"會計對帳檔案處理",date:"2025-09-30",category:"software",subCategory:"開發筆記",tags:["金流","reconcile","payment"],slug:"reconcile"},{title:_c,date:Sc,category:Cc,subCategory:Rc,tags:Tc,slug:Ic}=Tn;var Va=w(`<h6>金流商通常會在N工作日後，提供一份撥款檔案視為實際銀行帳務核實依據</h6> <hr/> <p>通常為每日定時執行的自動化流程,但實務上常面臨以下異常狀況:</p> <ul><li>系統異常(網路中斷、伺服器故障)</li> <li>金流商未按時提供檔案</li> <li>資料格式錯誤或不完整</li></ul> <p>若每次異常都從頭重跑整個流程,會造成大量的資源浪費。因此需要設計重試節點(Checkpoint),讓人工介入後可以從中斷點繼續執行,而非全部重來。</p> <br/> <h3>1. 取得金流商靜態檔案</h3> <p>發生異常的話表示沒有寫入本地端，重試點就從 ERROR LOG 去找該參數直接重試可以了。</p> <pre class="language-csharp"><!></pre> <h3>2. 寫入資料到記憶體暫存</h3> <p>很單純直接檢查該路徑檔案存在與否+重試</p> <pre class="language-csharp"><!></pre> <h3>3. 解析檔案 & 儲存</h3> <p>主要是解析、分類檔案，其中出現異常就Catch住保留原始資料，等待人工檢閱
重試的斷點就是把這批資料回丟這個 function 去處理</p> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre> <h3>4. 若還須提供靜態檔案給外部</h3> <p>在記錄對帳的表單欄位添加以下屬性，把資料庫當作SSOT
並且把 產出檔案 => 資料更新 包在同一個 Transaction
確認檔案產出再 Update 資料庫</p> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre>`,1);function Ga(u){var e=Va(),p=t(b(e),16),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token comment">/// &lt;summary></span>
<span class="token comment">/// 取得遠端檔案</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">DownloadRemoteFileAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> connectionJsonStr<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> storagePath<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> filePrefix<span class="token punctuation">,</span> <span class="token class-name">DateTime<span class="token punctuation">?</span></span> startDate <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">DateTime<span class="token punctuation">?</span></span> endDate <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> yesterday <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Today<span class="token punctuation">.</span><span class="token function">AddDays</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> fromDate <span class="token operator">=</span> startDate <span class="token operator">??</span> yesterday<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> toDate <span class="token operator">=</span> endDate <span class="token operator">??</span> yesterday<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>fromDate <span class="token operator">></span> toDate<span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">"起訖日期參數設定異常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> connectionConfig <span class="token operator">=</span> JsonSerializer<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Deserialize</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JsonElement<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>connectionJsonStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SftpConfig</span>
    <span class="token punctuation">&#123;</span>
        SftpIP <span class="token operator">=</span> connectionConfig<span class="token punctuation">.</span><span class="token function">GetProperty</span><span class="token punctuation">(</span><span class="token string">"SftpIP"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">"ip is required"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        SftpPort <span class="token operator">=</span> <span class="token keyword">int</span><span class="token punctuation">.</span><span class="token function">TryParse</span><span class="token punctuation">(</span>connectionConfig<span class="token punctuation">.</span><span class="token function">GetProperty</span><span class="token punctuation">(</span><span class="token string">"SftpPort"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">var</span></span> port<span class="token punctuation">)</span><span class="token punctuation">?</span> port <span class="token punctuation">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
        SftpAccount <span class="token operator">=</span> connectionConfig<span class="token punctuation">.</span><span class="token function">GetProperty</span><span class="token punctuation">(</span><span class="token string">"SftpAccount"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">"Account is required"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        SftpPassword <span class="token operator">=</span> connectionConfig<span class="token punctuation">.</span><span class="token function">GetProperty</span><span class="token punctuation">(</span><span class="token string">"SftpPassword"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">??</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ArgumentException</span><span class="token punctuation">(</span><span class="token string">"Password is required"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">&#123;</span>
        <span class="token preprocessor property">#<span class="token directive keyword">region</span> 處理遠端連線和指定檔案</span>
        <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> sftpClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SftpClient</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>SftpIP<span class="token punctuation">,</span> config<span class="token punctuation">.</span>SftpPort<span class="token punctuation">,</span> config<span class="token punctuation">.</span>SftpAccount<span class="token punctuation">,</span> config<span class="token punctuation">.</span>SftpPassword<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">EnsureStftConnected</span><span class="token punctuation">(</span>sftpClient<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">var</span></span> sftpFiles <span class="token operator">=</span> <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> sftpClient<span class="token punctuation">.</span><span class="token function">ListDirectory</span><span class="token punctuation">(</span><span class="token string">"."</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> csvFiles <span class="token operator">=</span> sftpFiles<span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>file <span class="token operator">=></span> file<span class="token punctuation">.</span>IsRegularFile <span class="token operator">&amp;&amp;</span> file<span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">EndsWith</span><span class="token punctuation">(</span><span class="token string">".csv"</span><span class="token punctuation">,</span> StringComparison<span class="token punctuation">.</span>OrdinalIgnoreCase<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> targetFiles <span class="token operator">=</span> csvFiles
            <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>file <span class="token operator">=></span>
            <span class="token punctuation">&#123;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> date <span class="token operator">=</span> fromDate<span class="token punctuation">;</span> date <span class="token operator">&lt;=</span> toDate<span class="token punctuation">.</span>Date<span class="token punctuation">;</span> date <span class="token operator">=</span> date<span class="token punctuation">.</span><span class="token function">AddDays</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 取得指定日期範圍資料(檔名)</span>
                <span class="token punctuation">&#123;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>file<span class="token punctuation">.</span>Name<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>date<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token string">"yyyyMMdd"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">&#123;</span>
                        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token punctuation">&#125;</span>
                <span class="token punctuation">&#125;</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> 下載至本地端</span>
        Directory<span class="token punctuation">.</span><span class="token function">CreateDirectory</span><span class="token punctuation">(</span>storagePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> filesPath <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> file <span class="token keyword">in</span> targetFiles<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token class-name"><span class="token keyword">var</span></span> path <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">Combine</span><span class="token punctuation">(</span>storagePath<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">filePrefix</span><span class="token punctuation">&#125;</span></span><span class="token string">_</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">file<span class="token punctuation">.</span>Name</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> fileStream <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> sftpClient<span class="token punctuation">.</span><span class="token function">DownloadFile</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span>FullName<span class="token punctuation">,</span> fileStream<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            filesPath<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token keyword">return</span> filesPath<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"LinePay SFTP 下載失敗: </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">ex<span class="token punctuation">.</span>Message</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">ReadFileAndGetValidLines</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> fileLines <span class="token operator">=</span> <span class="token keyword">await</span> File<span class="token punctuation">.</span><span class="token function">ReadAllLinesAsync</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">)</span><span class="token punctuation">;</span>
    excludedLine <span class="token operator">=</span> fileLines<span class="token punctuation">.</span>Length <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">?</span> fileLines<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>

    <span class="token keyword">return</span> fileLines<span class="token punctuation">.</span><span class="token function">Skip</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 根據金流商提供的規則</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>ReconciliationResult<span class="token punctuation">></span></span> <span class="token function">ProcessReconciliation</span><span class="token punctuation">(</span><span class="token class-name">CFContext</span> db<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> storeId<span class="token punctuation">,</span> <span class="token class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span> data<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> successCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span> unmatchedRows <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span> failedRows <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> data<span class="token punctuation">.</span>Count<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">&#123;</span>
            <span class="token class-name"><span class="token keyword">var</span></span> row <span class="token operator">=</span> data<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token char">','</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Replace</span><span class="token punctuation">(</span><span class="token string">"""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token preprocessor property">#<span class="token directive keyword">region</span> 解析字串欄位</span>
            <span class="token class-name"><span class="token keyword">string</span></span> trx_seq <span class="token operator">=</span> row<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Linepay 定義的交易號碼</span>
            <span class="token class-name"><span class="token keyword">string</span></span> pay_status <span class="token operator">=</span> row<span class="token punctuation">[</span><span class="token number">16</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">string</span></span> orderNo <span class="token operator">=</span> row<span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token class-name">DateTime</span> scheduled_ymd <span class="token operator">=</span> DateTime<span class="token punctuation">.</span><span class="token function">TryParseExact</span><span class="token punctuation">(</span>row<span class="token punctuation">[</span><span class="token number">6</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"yyyyMMdd"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> DateTimeStyles<span class="token punctuation">.</span>None<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name">DateTime</span> ymd<span class="token punctuation">)</span> <span class="token punctuation">?</span> ymd <span class="token punctuation">:</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 撥款日</span>
            <span class="token class-name"><span class="token keyword">decimal</span></span> pay_amount <span class="token operator">=</span> <span class="token keyword">decimal</span><span class="token punctuation">.</span><span class="token function">TryParse</span><span class="token punctuation">(</span>row<span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">decimal</span></span> dmTemp<span class="token punctuation">)</span> <span class="token punctuation">?</span> dmTemp <span class="token punctuation">:</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">decimal</span></span> fee_amount <span class="token operator">=</span> <span class="token keyword">decimal</span><span class="token punctuation">.</span><span class="token function">TryParse</span><span class="token punctuation">(</span>row<span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">out</span> dmTemp<span class="token punctuation">)</span><span class="token punctuation">?</span> dmTemp <span class="token punctuation">:</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">decimal</span></span> tax_amount <span class="token operator">=</span> <span class="token keyword">decimal</span><span class="token punctuation">.</span><span class="token function">TryParse</span><span class="token punctuation">(</span>row<span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">out</span> dmTemp<span class="token punctuation">)</span><span class="token punctuation">?</span> dmTemp <span class="token punctuation">:</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">decimal</span></span> total_fee_amount <span class="token operator">=</span> <span class="token keyword">decimal</span><span class="token punctuation">.</span><span class="token function">TryParse</span><span class="token punctuation">(</span>row<span class="token punctuation">[</span><span class="token number">13</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">out</span> dmTemp<span class="token punctuation">)</span><span class="token punctuation">?</span> dmTemp <span class="token punctuation">:</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">decimal</span></span> scheduled_amount <span class="token operator">=</span> <span class="token keyword">decimal</span><span class="token punctuation">.</span><span class="token function">TryParse</span><span class="token punctuation">(</span>row<span class="token punctuation">[</span><span class="token number">14</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">out</span> dmTemp<span class="token punctuation">)</span><span class="token punctuation">?</span> dmTemp <span class="token punctuation">:</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>


            <span class="token preprocessor property">#<span class="token directive keyword">region</span> 查詢現有對應資料</span>
            <span class="token comment">// ... 其餘業務邏輯</span>
            <span class="token comment">// 比對內部資料，異常就看怎麼處理</span>
            <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>   
            <span class="token comment">// 系統(...DB)異常就先記錄起來</span>
            failedRows<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ReconciliationResult</span>
    <span class="token punctuation">&#123;</span>
        SuccessCount <span class="token operator">=</span> successCount<span class="token punctuation">,</span>
        ProcessFailedData <span class="token operator">=</span> failedRows<span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        SeqNoUnmatchData <span class="token operator">=</span> unmatchedRows<span class="token punctuation">.</span><span class="token function">ToArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,2),g=n(l);a(g,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">SaveRawDataToFile</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> savedPath<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> fileName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span> data<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token comment">// 寫入的資料(含標題)</span>
    <span class="token class-name"><span class="token keyword">var</span></span> linesToWrite <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>excludedLine<span class="token punctuation">)</span><span class="token punctuation">)</span>
        linesToWrite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>excludedLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
    linesToWrite<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 檔案名稱 &amp;&amp; 檔案路徑</span>
    Directory<span class="token punctuation">.</span><span class="token function">CreateDirectory</span><span class="token punctuation">(</span>savedPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> filePath <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">Combine</span><span class="token punctuation">(</span>savedPath<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">fileName</span><span class="token punctuation">&#125;</span></span><span class="token string">.csv"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">await</span> File<span class="token punctuation">.</span><span class="token function">WriteAllLinesAsync</span><span class="token punctuation">(</span>filePath<span class="token punctuation">,</span> linesToWrite<span class="token punctuation">,</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,6),y=n(i);a(y,()=>`<code class="language-csharp">CreateDate <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">,</span>
Exported <span class="token operator">=</span> <span class="token class-name">false</span>
FileName <span class="token operator">=</span> <span class="token keyword">null</span></code>`),s(i);var m=t(i,2),v=n(m);a(v,()=>`<code class="language-csharp"><span class="token comment">/// &lt;summary></span>
<span class="token comment">/// 產檔處理</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">GenerateStaticFile</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> storeID<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name">List<span class="token punctuation">&lt;</span>CfReconciliation<span class="token punctuation">></span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _db<span class="token punctuation">.</span>CfReconciliation
        <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span>StoreID <span class="token operator">==</span> storeID<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span>exported <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">ToListAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 1. 先準備 CSV 內容</span>
        <span class="token class-name"><span class="token keyword">var</span></span> linesToWrite <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 加入標頭（依你的需求調整）</span>
        linesToWrite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">"Column1,Column2,Column3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 加入資料列</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> data <span class="token keyword">in</span> result<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            linesToWrite<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">data<span class="token punctuation">.</span>StoreID</span><span class="token punctuation">&#125;</span></span><span class="token string">,</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">data<span class="token punctuation">.</span>SeqNo</span><span class="token punctuation">&#125;</span></span><span class="token string">,......"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">// 2. 確保目錄存在並寫入檔案</span>
        <span class="token class-name"><span class="token keyword">var</span></span> savedPath <span class="token operator">=</span> <span class="token string">"TEMP_PATH"</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> fileName <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$"TEST_</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">DateTime<span class="token punctuation">.</span>Now</span><span class="token format-string"><span class="token punctuation">:</span>MMddHHmmss</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">;</span>
        Directory<span class="token punctuation">.</span><span class="token function">CreateDirectory</span><span class="token punctuation">(</span>savedPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> filePath <span class="token operator">=</span> Path<span class="token punctuation">.</span><span class="token function">Combine</span><span class="token punctuation">(</span>savedPath<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">fileName</span><span class="token punctuation">&#125;</span></span><span class="token string">.csv"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">await</span> File<span class="token punctuation">.</span><span class="token function">WriteAllLinesAsync</span><span class="token punctuation">(</span>filePath<span class="token punctuation">,</span> linesToWrite<span class="token punctuation">,</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 3. 檔案寫入成功後，才更新資料庫</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> data <span class="token keyword">in</span> result<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            data<span class="token punctuation">.</span>exported <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            data<span class="token punctuation">.</span>exportedTime <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>Now<span class="token punctuation">;</span>
            data<span class="token punctuation">.</span>exportedFileName <span class="token operator">=</span> fileName<span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">await</span> _db<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        _logger<span class="token punctuation">.</span><span class="token function">LogInformation</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"產檔成功: </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">filePath</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token interpolation-string"><span class="token string">$"產檔失敗: StoreID=test"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">throw</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(m),f(u,e)}const Wa=Object.freeze(Object.defineProperty({__proto__:null,default:Ga,metadata:Tn},Symbol.toStringTag,{value:"Module"})),In={title:"SFTP、FTPS C# 連線測試",date:"2025-10-01",category:"software",subCategory:"開發筆記",tags:["tcp","ip","container"],slug:"sftp_ftps"},{title:Ac,date:Ec,category:xc,subCategory:Pc,tags:Dc,slug:Oc}=In;var Ya=w('<h6>紀錄本地端測試方法</h6> <hr/> <h3>SFTP</h3> <p>docker-compose.yml</p> <pre class="language-yml"><!></pre> <pre class="language-csharp"><!></pre> <h3>FTPS</h3> <pre class="language-csharp"><!></pre> <p>docker-compose.yml</p> <pre class="language-yml"><!></pre> <h3>2SFTP+FTPS</h3> <pre class="language-yml"><!></pre>',1);function za(u){var e=Ya(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-yml"><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">sftp</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> atmoz/sftp
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> sftp<span class="token punctuation">-</span>server
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"7070:22"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./sftp<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/home/user01/upload  <span class="token comment"># 本地資料夾同步掛載</span>
      <span class="token punctuation">-</span> ./sftp<span class="token punctuation">-</span>config<span class="token punctuation">:</span>/etc/sftp.d
    <span class="token key atrule">command</span><span class="token punctuation">:</span> user01<span class="token punctuation">:</span>password01<span class="token punctuation">:</span><span class="token number">1001</span>  <span class="token comment"># 用戶名:密碼:UID</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SFTP_USERS=user01<span class="token punctuation">:</span>password01<span class="token punctuation">:</span><span class="token number">1001</span>  <span class="token comment"># 設置 SFTP 用戶</span></code>`),s(p);var o=t(p,2),r=n(o);a(r,()=>`<code class="language-csharp"><span class="token keyword">using</span> <span class="token namespace">Renci<span class="token punctuation">.</span>SshNet</span><span class="token punctuation">;</span>

<span class="token comment">/// _sftpIP = localhost</span>
<span class="token comment">/// _sftpPort = 7070</span>
<span class="token comment">/// _sftpAccount = user01</span>
<span class="token comment">/// _sftpPassword = password01</span>
<span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> sftpClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">SftpClient</span><span class="token punctuation">(</span>_sftpIP<span class="token punctuation">,</span> _sftpPort<span class="token punctuation">,</span> _sftpAccount<span class="token punctuation">,</span> _sftpPassword<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 套件</span>
<span class="token keyword">await</span> <span class="token function">EnsureStftConnectedAsync</span><span class="token punctuation">(</span>sftpClient<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Retries</span>

<span class="token keyword">private</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">EnsureStftConnectedAsync</span><span class="token punctuation">(</span><span class="token class-name">SftpClient</span> client<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">int</span></span> maxRetries <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> attempt <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> attempt <span class="token operator">&lt;=</span> maxRetries<span class="token punctuation">;</span> attempt<span class="token operator">++</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token keyword">try</span>
        <span class="token punctuation">&#123;</span>
            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> client<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>client<span class="token punctuation">.</span>IsConnected<span class="token punctuation">)</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
        <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>attempt <span class="token operator">==</span> maxRetries<span class="token punctuation">)</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"SFTP 連線失敗，已重試 </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">maxRetries</span><span class="token punctuation">&#125;</span></span><span class="token string"> 次: </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">ex<span class="token punctuation">.</span>Message</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> ftpsClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FtpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Host <span class="token operator">=</span> <span class="token string">"127.0.0.1"</span><span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Port <span class="token operator">=</span> <span class="token number">9090</span><span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Credentials <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">NetworkCredential</span><span class="token punctuation">(</span><span class="token string">"user01"</span><span class="token punctuation">,</span> <span class="token string">"password01"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>EncryptionMode <span class="token operator">=</span> FtpEncryptionMode<span class="token punctuation">.</span>None<span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>DataConnectionType <span class="token operator">=</span> FtpDataConnectionType<span class="token punctuation">.</span>PASV<span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>ConnectTimeout <span class="token operator">=</span> <span class="token number">30000</span><span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>ReadTimeout <span class="token operator">=</span> <span class="token number">30000</span><span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>LogToConsole <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
ftpsClient<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-yml"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">ftps</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> fauria/vsftpd
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> ftps<span class="token punctuation">-</span>server
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"9090:21"</span>
      <span class="token punctuation">-</span> <span class="token string">"21100-21110:21100-21110"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./ftps<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/home/vsftpd/user01
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> FTP_USER=user01
      <span class="token punctuation">-</span> FTP_PASS=password01
      <span class="token punctuation">-</span> PASV_MIN_PORT=21100
      <span class="token punctuation">-</span> PASV_MAX_PORT=21110
      <span class="token punctuation">-</span> SSL_ENABLE=NO
      <span class="token punctuation">-</span> LOG_STDOUT=YES
      <span class="token punctuation">-</span> WRITE_ENABLE=YES
      <span class="token punctuation">-</span> CHROOT_LOCAL_USER=YES
      <span class="token punctuation">-</span> REVERSE_LOOKUP_ENABLE=NO
      <span class="token punctuation">-</span> PASV_ENABLE=YES           <span class="token comment"># 明確啟用 PASV</span>
      <span class="token punctuation">-</span> PORT_ENABLE=YES           <span class="token comment"># 也啟用 PORT 模式</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped</code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-yml"><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment"># CashFlow SFTP Server (Port 6060)</span>
  <span class="token key atrule">cashflow-sftp</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> atmoz/sftp
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> cashflow<span class="token punctuation">-</span>sftp<span class="token punctuation">-</span>server
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"6060:22"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./CashServer_Sftp<span class="token punctuation">:</span>/home/cashflow  <span class="token comment"># 本地資料夾同步掛載</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> cashflow<span class="token punctuation">:</span>password01<span class="token punctuation">:</span><span class="token number">1001</span>  <span class="token comment"># 用戶名:密碼:UID</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SFTP_USERS=cashflow<span class="token punctuation">:</span>password01<span class="token punctuation">:</span><span class="token number">1001</span>

  <span class="token comment"># CashVendor SFTP Server (Port 7070)</span>
  <span class="token key atrule">cashvendor-sftp</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> atmoz/sftp
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> cashvendor<span class="token punctuation">-</span>sftp<span class="token punctuation">-</span>server
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"7070:22"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./CashVendor_Sftp<span class="token punctuation">:</span>/home/user01  <span class="token comment"># 本地資料夾同步掛載</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> user01<span class="token punctuation">:</span>password01<span class="token punctuation">:</span><span class="token number">1002</span>  <span class="token comment"># 用戶名:密碼:UID</span>
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> SFTP_USERS=user01<span class="token punctuation">:</span>password01<span class="token punctuation">:</span><span class="token number">1002</span>

  <span class="token comment"># CashVendor FTPS Server (Port 9090)</span>
  <span class="token key atrule">cashvendor-ftps</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> fauria/vsftpd
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> cashvendor<span class="token punctuation">-</span>ftps<span class="token punctuation">-</span>server
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"9090:21"</span>
      <span class="token punctuation">-</span> <span class="token string">"21100-21110:21100-21110"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./CashVendor_Ftps<span class="token punctuation">:</span>/home/vsftpd/user01
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> FTP_USER=user01
      <span class="token punctuation">-</span> FTP_PASS=password01
      <span class="token punctuation">-</span> PASV_MIN_PORT=21100
      <span class="token punctuation">-</span> PASV_MAX_PORT=21110
      <span class="token punctuation">-</span> SSL_ENABLE=NO
      <span class="token punctuation">-</span> LOG_STDOUT=YES
      <span class="token punctuation">-</span> WRITE_ENABLE=YES
      <span class="token punctuation">-</span> CHROOT_LOCAL_USER=YES
      <span class="token punctuation">-</span> REVERSE_LOOKUP_ENABLE=NO
      <span class="token punctuation">-</span> PASV_ENABLE=YES
      <span class="token punctuation">-</span> PORT_ENABLE=YES
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
</code>`),s(i),f(u,e)}const Ja=Object.freeze(Object.defineProperty({__proto__:null,default:za,metadata:In},Symbol.toStringTag,{value:"Module"})),An={title:"Structurizr C4Model",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["model","UML","ERD"],slug:"structurizr"},{title:Nc,date:Mc,category:Lc,subCategory:$c,tags:qc,slug:jc}=An;var Ka=w('<h6>請改用Figma桌面版本太好用了(2025/10/15更新)，<a href="https://github.com/cao0085/code-pattern/tree/main/structurizr" rel="nofollow">Example</a>，<a href="https://structurizr.com/" rel="nofollow">Structurizr</a></h6> <hr/> <h3>docker-compose.yml</h3> <p>初次建立和執行會生成基本的專案檔</p> <pre class="language-yml"><!></pre> <h3>workspace.dsl</h3> <pre class="language-text"><!></pre> <h3>index-model.dsl</h3> <p>依序層級，每一層都可以渲染出一張圖</p> <p><code>Variable = softwareSystem "英文字名稱" =&gt; Variable = container "文字"  =&gt; Variable = component "文字"</code></p> <pre class="language-text"><!></pre> <h3>index-model.dsl</h3> <p>指定要渲染哪些 index-model.dsl 裡的 model，且需要降一階處理</p> <p><code>index-model.dsl 裡的 YourSystem = softwareSystem</code></p> <p><code>index-model.dsl 要改成 container YourSystem 來指定</code></p> <pre class="language-text"><!></pre>',1);function Xa(u){var e=Ka(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-yml">// docker<span class="token punctuation">-</span>compose.yml
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">structurizr</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> structurizr/lite
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"8080:8080"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> .<span class="token punctuation">:</span>/usr/local/structurizr</code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-text">workspace &quot;YourProjectName&quot; &#123;

    // **
    !identifiers hierarchical

    model &#123;
        // Include your model files here
        // folderName_xxx/FileName_xxx

        !include index-model.dsl
    &#125;

    views &#123;
        styles &#123;
            element &quot;Component&quot; &#123;
                width  520
                height 500
            &#125;
            element &quot;tall-Element&quot;&#123;
                width  600
                height 700             
            &#125;
        &#125;
        // Include your views files here
        // folderName_xxx/FileName_xxx

        !include index-view.dsl
    &#125;
&#125;</code>`),s(o);var c=t(o,8),d=n(c);a(d,()=>`<code class="language-text">YourSystem = softwareSystem &quot;Name&quot; &#123;
    InitPage_1 = container &quot;data&quot; &#123;
        description &quot;&quot;&quot;
            描述該區域
        &quot;&quot;&quot;
        Content1 = component &quot;Content&quot; &#123;
            tags &quot;tall-Element&quot;
            description &quot;&quot;&quot;
            描述該區域
            &quot;&quot;&quot;
        &#125;

        Content2 = component &quot;Content2&quot; &#123;
            description &quot;&quot;&quot;
            描述該區域
            &quot;&quot;&quot;
        &#125;

        InitPage_1.Content1 -&gt; InitPage_1.Content2 &quot;connection&quot;
    &#125;

    InitPage_2 = container &quot;data2&quot; &#123;
        description &quot;&quot;&quot;
            描述該區域
        &quot;&quot;&quot;
        component Content &#123;
            description &quot;&quot;&quot;
            描述該區域
            &quot;&quot;&quot;
        &#125;
    &#125;
&#125;


YourSystem.InitPage_1 -&gt; YourSystem.InitPage_2 &quot;connection&quot;</code>`),s(c);var l=t(c,10),g=n(l);a(g,()=>`<code class="language-text">container YourSystem &quot;Name&quot; &#123;
    include *
&#125;


component YourSystem.InitPage_1 &quot;InitData&quot; &#123;
    include *
&#125;</code>`),s(l),f(u,e)}const Qa=Object.freeze(Object.defineProperty({__proto__:null,default:Xa,metadata:An},Symbol.toStringTag,{value:"Module"})),En={title:"2025 軟體開發",date:"2025-10-30",category:"software",subCategory:"開發筆記",tags:["read","summary","backend"],slug:"2025_summary"},{title:Hc,date:Uc,category:Bc,subCategory:Fc,tags:Vc,slug:Gc}=En;var Za=w('<h6>寫業務邏輯為重的情況下，只要關鍵字抓對技術上都不會有問題，這邊小結一下今年所學觀念。</h6> <hr/> <h3>虛實物件與事件</h3> <p>拿發票當作舉例，它應只有【未開立】【已開立】【已折讓】【已作廢】四種狀態可以描述，再延伸到【發票作廢】這件事，在紙本發票時代流程是需拿著 <strong>實體發票</strong> ，並在時限內繳回給政府；另一個視角是可以根據 <strong>實體發票</strong> 在各單位間的流轉狀態來追蹤進度:</p> <ol><li>發票在買方手上 = 交易尚未取消</li> <li>發票已繳回賣方 = 雙方同意作廢,賣方可進行申報</li> <li>發票隨申報表送出 = 已向稅務機關申報作廢</li> <li>稅務機關已收存 = 作廢流程完成</li></ol> <p>若要電子化流程就失去了 <strong>實體流轉</strong>，且會衍伸出以下狀態節點：</p> <ol><li>取得作廢同意 : 客服受理 → 買方線上簽名 → 系統記錄同意時間</li> <li>內部審核流程 : 客服定時確認 → 會計核對 → 系統註記審核結果</li> <li>政府申報追蹤 : 上傳平台 → 系統驗證 → 定期查詢核准狀態</li> <li>政府與否核可 : 流程結束 → 系統紀錄</li></ol> <p>狀態設計會變得複雜許多，且系統必須明確記錄當前進度。這時若能清楚分離「實體狀態」與「流程狀態」，就可以在系統上實踐成:</p> <ul><li>主表: 記錄發票的實體狀態(未開立/已開立/已折讓/已作廢) ← 對應稅務規定</li> <li>子表: 記錄作廢流程狀態(State 1~9) ← 對應流程 <ul><li>State 1~4: 內部審核流程(受理、簽名、核對…)</li> <li>State 5~8: 與財政部往來(上傳、驗證、查詢…)</li> <li>State 9: 財政部核准完成 → 觸發同步,更新主表為「已作廢」</li></ul></li></ul> <p>這樣能保持主表的簡潔性，且在不影響其他現有流程下；又能完整追蹤內部進度，這是在閱讀 Domain-Driven Design 後得到的啟發，在任何需要業務邏輯的系統應該都用得上。</p> <br/> <h3>彈性與異常處理</h3> <p>當新項目開發到一半時，發現必須更改舊有程式碼，否則資料吃進來會有 0.02% 內重複紀錄，那我是要:</p> <ol><li>花費一個月，更改舊有程式碼符合讓資料記錄完全正確</li> <li>花費五個工作天，額外寫流程去定時處理資料去做重</li></ol> <p>在市場上品質好、價格低與供貨穩定性是不可能同時兼具，在軟體工程上也是如此，所以寫程式碼時必須放下想要面面俱到的歹念，舉例來說不同情境可能會是:</p> <ul><li><p>金流系統 - 消費者付款</p> <ul><li>牽連到商譽(金流商、顧客) 採第一種方法犧牲效能，確保三方資料一致姓</li></ul></li> <li><p>記帳系統 - 比對外部與內部帳務</p> <ul><li>採第二種犧牲即時性，但開發起來比較快、可讀/變性高、減少測試成本</li></ul></li></ul> <p>所以只要能明確定位「異常」和如何後續處理，那它就成為可控的預期行為而非實務錯誤，再根據風險等級來設計容錯策略，不必都追求零錯誤的系統設計。</p> <br/> <h3>效能提升</h3> <p>初寫程式都會被效能兩個字阻礙，會想要用最適合的語法和資料結構，像是糾結<code>Array vs Set</code> 誰查找更快、React 元件要不要包<code>memo()</code>、<code>state & debounce</code> 等等。</p> <p>但其實因為是寫高階語言甚至框架，這些優化是讓程式從 80 分到 88 分的微微體感提升，相比下來維護性、可讀性會更重要。例如像是現在宣告變數用 <code>Array</code> 不用 <code>List</code> 是防止不小心添加元素；資料整理成 <code>Map</code> 而不寫 <code>list.find().container</code> 都是為了好閱讀、防呆和「清楚表達意圖」。</p> <p>而想實際上有感的提升效能，思考架構與資源分配實際一些</p> <ul><li>查詢特定資料，要在後端還是資料庫整理? 資料庫有添加索引嗎?</li> <li>現代瀏覽器性能好，資料暫存就由客戶端保留可行嗎? 封包大小是否在網路傳輸的建議值內?</li> <li>花兩個月優化程式碼效能，目前架構允許橫向擴展嗎? 或是買張卡插在伺服器主機上?</li></ul> <p>簡單來說能從源頭開始修改，效能會提升最多，以上感想來自這部影片<a href="https://youtu.be/HnwJZjEhrf8" rel="nofollow">細節不決定成敗</a>，以及幾次自己瞎忙的經驗。簡單來說我們是工程人員而非研發人員，職責是選擇並善用現有的成熟工具，而不是花時間去最大化效能。</p>',1);function nt(u){var e=Za();A(46),f(u,e)}const st=Object.freeze(Object.defineProperty({__proto__:null,default:nt,metadata:En},Symbol.toStringTag,{value:"Module"})),xn={title:"XLSL Excel 套件",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["XLSL","js","Excel"],slug:"xlsx_excel"},{title:Wc,date:Yc,category:zc,subCategory:Jc,tags:Kc,slug:Xc}=xn;var at=w('<h6>紀錄一下套件用法和邏輯，<a href="https://www.npmjs.com/package/xlsx/v/0.14.1?activeTab=readme" rel="nofollow">xlsx 0.14.1</a></h6> <hr/> <h3>Workbook & Worksheet</h3> <p>單個 Workbook 實例代表一份完整的xsml檔案，Worksheet 代表一頁 xsml的分頁，都可以產多個。</p> <pre class="language-js"><!></pre> <h3>Sheet Content</h3> <pre class="language-js"><!></pre> <h3>Merges</h3> <p>指定哪些儲存格要上下合併</p> <pre class="language-js"><!></pre> <h3>多列合併實作</h3> <ul><li>假設有一筆一對多的資料列</li> <li>分割/合併儲存格的方式在EXCEL上呈現</li></ul> <p>先處理資料結構</p> <pre class="language-js"><!></pre> <p>處理合併欄位</p> <pre class="language-js"><!></pre> <p>完整流程</p> <pre class="language-js"><!></pre>',1);function tt(u){var e=at(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token constant">XLSX</span> <span class="token keyword">from</span> <span class="token string">'xlsx'</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">export_xsml</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// Workbook 1: 包含 Sheet1</span>
  <span class="token keyword">const</span> workbook1 <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">book_new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> sheet1 <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">aoa_to_sheet</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'s1_1'</span><span class="token punctuation">,</span> <span class="token string">'s1_2'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">book_append_sheet</span><span class="token punctuation">(</span>workbook1<span class="token punctuation">,</span> sheet1<span class="token punctuation">,</span> <span class="token string">'sheet1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// Workbook 2: 包含 Sheet1、Sheet2</span>
  <span class="token keyword">const</span> workbook2 <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">book_new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> sheet2 <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">aoa_to_sheet</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">'s2_1'</span><span class="token punctuation">,</span> <span class="token string">'s2_2'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">book_append_sheet</span><span class="token punctuation">(</span>workbook2<span class="token punctuation">,</span> sheet1<span class="token punctuation">,</span> <span class="token string">'sheet1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">book_append_sheet</span><span class="token punctuation">(</span>workbook2<span class="token punctuation">,</span> sheet2<span class="token punctuation">,</span> <span class="token string">'sheet2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 匯出兩個檔案</span>
  <span class="token comment">// 一個檔案一個分頁</span>
  <span class="token constant">XLSX</span><span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>workbook1<span class="token punctuation">,</span> <span class="token string">'learning1.xlsx'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 一個檔案兩個分頁</span>
  <span class="token constant">XLSX</span><span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>workbook2<span class="token punctuation">,</span> <span class="token string">'learning2.xlsx'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-js"><span class="token comment">// Array of Arrays, AOA</span>
<span class="token comment">// data 放入 2 維度陣列 [[row1],[row2],[row3]...]</span>
<span class="token comment">// [row1] => 'A1','B1','C1'....</span>
<span class="token comment">// options => &#123; origin: 'B2' &#125; 指定座標</span>
<span class="token keyword">const</span> ws_array <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">aoa_to_sheet</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 每一個物件會轉成一列（row）</span>
<span class="token comment">// key 會自動變成表頭欄位 // row1</span>
<span class="token keyword">const</span> ws_json <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">json_to_sheet</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token punctuation">&#123;</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Alice'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">25</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token comment">// row2</span>
  <span class="token punctuation">&#123;</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Bob'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">30</span> <span class="token punctuation">&#125;</span>    <span class="token comment">// row3</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">json_to_sheet</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">header</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'age'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 明確指定欄位順序（會取代自動推斷）</span>
  <span class="token literal-property property">skipHeader</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>       <span class="token comment">// 是否要略過產生表頭（預設 false）</span>
  <span class="token literal-property property">origin</span><span class="token operator">:</span> <span class="token string">'B2'</span>             <span class="token comment">// 從 B2 開始填入</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(o);var c=t(o,6),d=n(c);a(d,()=>`<code class="language-js"><span class="token comment">// s = start / e = end / A1 = &#123;x:0,y:0&#125; / A3 = &#123;x:2,y:0&#125;</span>
worksheet<span class="token punctuation">[</span><span class="token string">'!merges'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">&#123;</span> <span class="token literal-property property">s</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">&#125;</span> <span class="token punctuation">&#125;</span> 
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 也可以指定座標</span>
<span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">decode_range</span><span class="token punctuation">(</span><span class="token string">'A1:A3'</span><span class="token punctuation">)</span>
</code>`),s(c);var l=t(c,8),g=n(l);a(g,()=>`<code class="language-js"><span class="token keyword">const</span> orderList <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">OrderNo</span><span class="token operator">:</span> <span class="token string">'A001'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Customer</span><span class="token operator">:</span> <span class="token string">'小明'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">&#123;</span> <span class="token literal-property property">Product</span><span class="token operator">:</span> <span class="token string">'鉛筆'</span><span class="token punctuation">,</span> <span class="token literal-property property">Quantity</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
      <span class="token punctuation">&#123;</span> <span class="token literal-property property">Product</span><span class="token operator">:</span> <span class="token string">'原子筆'</span><span class="token punctuation">,</span> <span class="token literal-property property">Quantity</span><span class="token operator">:</span> <span class="token number">5</span> <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">OrderNo</span><span class="token operator">:</span> <span class="token string">'A002'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Customer</span><span class="token operator">:</span> <span class="token string">'小美'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Items</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">&#123;</span> <span class="token literal-property property">Product</span><span class="token operator">:</span> <span class="token string">'橡皮擦'</span><span class="token punctuation">,</span> <span class="token literal-property property">Quantity</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">&#125;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>


<span class="token keyword">const</span> flattenedList <span class="token operator">=</span> orderList<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token parameter">order</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> items <span class="token operator">=</span> order<span class="token punctuation">.</span>Items<span class="token punctuation">.</span>length <span class="token operator">?</span> order<span class="token punctuation">.</span>Items <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> items<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    <span class="token operator">...</span>order<span class="token punctuation">,</span>
    <span class="token operator">...</span>item<span class="token punctuation">,</span>
    <span class="token literal-property property">_rowCount</span><span class="token operator">:</span> items<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token comment">// 紀錄有幾筆資料</span>
    <span class="token literal-property property">_isFirst</span><span class="token operator">:</span> index <span class="token operator">===</span> <span class="token number">0</span> <span class="token comment">// 添加新屬性標記</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 資料攤平後會</span>
<span class="token keyword">const</span> flattenedList <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">OrderNo</span><span class="token operator">:</span> <span class="token string">'A001'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Customer</span><span class="token operator">:</span> <span class="token string">'小明'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Product</span><span class="token operator">:</span> <span class="token string">'鉛筆'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Quantity</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_rowCount</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_isFirst</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">OrderNo</span><span class="token operator">:</span> <span class="token string">'A001'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Customer</span><span class="token operator">:</span> <span class="token string">'小明'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Product</span><span class="token operator">:</span> <span class="token string">'原子筆'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Quantity</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_rowCount</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_isFirst</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">OrderNo</span><span class="token operator">:</span> <span class="token string">'A002'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Customer</span><span class="token operator">:</span> <span class="token string">'小美'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Product</span><span class="token operator">:</span> <span class="token string">'橡皮擦'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Quantity</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_rowCount</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_isFirst</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,4),y=n(i);a(y,()=>`<code class="language-js"><span class="token keyword">const</span> exportKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'OrderNo'</span><span class="token punctuation">,</span> <span class="token string">'Customer'</span><span class="token punctuation">,</span> <span class="token string">'Product'</span><span class="token punctuation">,</span> <span class="token string">'Quantity'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Table Header</span>
<span class="token keyword">const</span> mergeKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'OrderNo'</span><span class="token punctuation">,</span> <span class="token string">'Customer'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 指定的合併欄位</span>
<span class="token keyword">const</span> dataOffset <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 指定 Y 軸起始座標</span>
<span class="token keyword">const</span> merges <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 存放資料</span>

flattenedList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">row<span class="token punctuation">,</span> rowIndex</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>

  <span class="token comment">// 用剛剛的 _isFirst 判斷是否為第一筆</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>row<span class="token punctuation">.</span>_isFirst<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 總共合併的列數</span>
    <span class="token keyword">const</span> rowspan <span class="token operator">=</span> row<span class="token punctuation">.</span>_rowCount<span class="token punctuation">;</span> 
    mergeKeys<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token comment">// 鎖定該X軸</span>
      <span class="token keyword">const</span> colIndex <span class="token operator">=</span> exportKeys<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token keyword">if</span> <span class="token punctuation">(</span>colIndex <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> rowspan <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 關鍵是利用 ForEach 中的 rowIndex 保持 Y 軸該擺放的位置</span>
        <span class="token keyword">const</span> start <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">encode_cell</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> rowIndex <span class="token operator">+</span> dataOffset<span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> colIndex <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> end <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">encode_cell</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> rowIndex <span class="token operator">+</span> dataOffset <span class="token operator">+</span> rowspan <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> colIndex <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        merges<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>start<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>end<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(i);var m=t(i,4),v=n(m);a(v,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">XLSX</span> <span class="token keyword">from</span> <span class="token string">'xlsx'</span><span class="token punctuation">;</span>

<span class="token comment">// === 1. 建立 worksheet from JSON，指定欄位與起始位置 ===</span>
<span class="token keyword">const</span> worksheet <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">json_to_sheet</span><span class="token punctuation">(</span>flattenedList<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">header</span><span class="token operator">:</span> exportKeys<span class="token punctuation">,</span>
  <span class="token literal-property property">skipHeader</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">origin</span><span class="token operator">:</span> <span class="token string">'A2'</span> <span class="token comment">// 表示資料從 A2 開始填（A1 為表頭）</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// === 2. 加入欄位表頭於 A1 ===</span>
exportKeys<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> cellRef <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">encode_cell</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> i <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// A1, B1, ...</span>
  worksheet<span class="token punctuation">[</span>cellRef<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">t</span><span class="token operator">:</span> <span class="token string">'s'</span><span class="token punctuation">,</span> <span class="token literal-property property">v</span><span class="token operator">:</span> key <span class="token punctuation">&#125;</span><span class="token punctuation">;</span> <span class="token comment">// 你可改成中文名</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// === 3. 計算合併欄位範圍 ===</span>
<span class="token keyword">const</span> merges <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
flattenedList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">row<span class="token punctuation">,</span> rowIndex</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>row<span class="token punctuation">.</span>_isFirst<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> rowspan <span class="token operator">=</span> row<span class="token punctuation">.</span>_rowCount<span class="token punctuation">;</span>
    mergeKeys<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      <span class="token keyword">const</span> colIndex <span class="token operator">=</span> exportKeys<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>colIndex <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">&amp;&amp;</span> rowspan <span class="token operator">></span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">const</span> r1 <span class="token operator">=</span> rowIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 因為 origin: 'A2'，rowIndex 0 是第2列</span>
        <span class="token keyword">const</span> r2 <span class="token operator">=</span> r1 <span class="token operator">+</span> rowspan <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        merges<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> <span class="token literal-property property">s</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> r1<span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> colIndex <span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> r2<span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> colIndex <span class="token punctuation">&#125;</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
worksheet<span class="token punctuation">[</span><span class="token string">'!merges'</span><span class="token punctuation">]</span> <span class="token operator">=</span> merges<span class="token punctuation">;</span>

<span class="token comment">// 可選：欄寬</span>
worksheet<span class="token punctuation">[</span><span class="token string">'!cols'</span><span class="token punctuation">]</span> <span class="token operator">=</span> exportKeys<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">&#123;</span> <span class="token literal-property property">wch</span><span class="token operator">:</span> <span class="token number">12</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// === 4. 建立 workbook 並加入 worksheet ===</span>
<span class="token keyword">const</span> workbook <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">book_new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">book_append_sheet</span><span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> worksheet<span class="token punctuation">,</span> <span class="token string">'Sheet1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// === 5. 匯出 ===</span>
<span class="token keyword">const</span> wbout <span class="token operator">=</span> <span class="token constant">XLSX</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>workbook<span class="token punctuation">,</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">bookType</span><span class="token operator">:</span> <span class="token string">'xlsx'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'binary'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">s2ab</span><span class="token punctuation">(</span><span class="token parameter">s</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> buf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBuffer</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> view <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Uint8Array</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> view<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">charCodeAt</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token number">0xff</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> buf<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
<span class="token function">saveAs</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">s2ab</span><span class="token punctuation">(</span>wbout<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'application/octet-stream'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">report_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">.xlsx</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m),f(u,e)}const pt=Object.freeze(Object.defineProperty({__proto__:null,default:tt,metadata:xn},Symbol.toStringTag,{value:"Module"})),Pn={title:"Electron With WebContentsView",date:"2025-10-12",category:"software",subCategory:"Frontend",tags:["Electron","fronted","web"],slug:"electron-01"},{title:Qc,date:Zc,category:nl,subCategory:sl,tags:al,slug:tl}=Pn;var ot=w('<h6>用 Electron 的 WebContentsView 實作編輯器</h6> <hr/> <h3>主要架構</h3> <p>Electron 基於 <strong>Node.js</strong> 和 <strong>Chromium</strong> 建構而成：</p> <ul><li>Node.js：提供後端能力，可以存取檔案系統、作業系統 API 等原生功能</li> <li>Chromium：負責渲染使用者界面，提供現代化的網頁技術支援</li> <li>主進程 (Main Process)：負責管理應用程式生命週期、建立視窗、處理系統事件</li> <li>渲染進程 (Renderer Process)：每個視窗或 WebContentsView 都運行在獨立的渲染進程中</li></ul> <h3>WebContentsView</h3> <p>可以想像成一個獨立的瀏覽器分頁：</p> <ul><li>每個 View 運行在獨立的渲染進程中</li> <li>進程之間互相隔離，提升穩定性與安全性</li> <li>各自維護獨立的狀態，不會互相干擾</li> <li>適合用於建立多文件編輯器、分頁瀏覽器等應用</li></ul> <br/> <p>困難的地方在於模組化 WebContentsView 的配置與切換，基本設定流程會是</p> <pre class="language-js"><!></pre> <p>完成後，整體架構會類似前端框架的 Router 系統，每個 WebContentsView 定義了該頁面使用的資源來源。困難點是<strong>規格定義</strong>與<strong>實例管理</strong>，例如</p> <ul><li>編輯器視圖（多實例）：允許同時開啟多個編輯器，每個編輯不同的檔案</li> <li>預覽視圖（單實例）：整個應用只能存在一個預覽畫面，確保客戶端是看到最新渲染</li></ul> <p>也就是要解決以下問題：</p> <ul><li>實例標記：如何標記某個 View 類型是單例（Singleton）還是多例</li> <li>防呆機制：如何防止創建重複的單例 View</li> <li>實例查找：呼叫時如何確保取得正確的 View 實例</li> <li>生命週期管理：如何追蹤和清理不再使用的 View</li></ul> <p>目前我是用透過 <code>_isSingleton</code> 和 <code>_inAppCustomType</code> 來自訂屬性來標記 View，有點卡卡以後可能會再更新</p> <br/> <h3>Inter-Process Communication</h3> <p>基於安全性考量，Renderer Process 運行在沙盒環境中，無法直接存取系統資源。當需要執行特權操作（如檔案讀寫、系統 API 呼叫）時，必須透過 IPC 與 Main Process 通信。而實踐的方式類似前端的全域資料管理，都是透過<strong>統一的接口</strong>來管理和存取共享資源。</p> <br/> <p>React 為例：</p> <ul><li>整個應用共用一個 Singleton Data（例如 Context 或 Redux Store）</li> <li>需要提供 <code>update</code> API 讓元件更新資料</li> <li>某個 Renderer View 要使用時，就要 <code>import</code> 或透過事件反向 callback 注入</li></ul> <br/> <p>Electron IPC：</p> <ul><li>Main Process 管理共享資料和特權操作</li> <li>提供 IPC 通道（channel）讓 Renderer Process 請求或更新資料</li> <li>Renderer Process 透過 <code>ipcRenderer.invoke()</code> 發送請求</li> <li>Main Process 透過 <code>ipcMain.handle()</code> 處理請求並回傳結果</li></ul>',1);function et(u){var e=ot(),p=t(b(e),20),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">createWCV</span><span class="token punctuation">(</span><span class="token parameter">viewType<span class="token punctuation">,</span> isIntegration <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> isIsolation<span class="token operator">=</span> <span class="token boolean">true</span></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>viewType <span class="token keyword">in</span> <span class="token constant">WEBVIEW_SOURCE</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token keyword">const</span> viewConfig <span class="token operator">=</span> <span class="token constant">WEBVIEW_SOURCE</span><span class="token punctuation">[</span>viewType<span class="token punctuation">]</span>
  <span class="token keyword">const</span> contentsView <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WebContentsView</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
      <span class="token literal-property property">webPreferences</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
          <span class="token literal-property property">nodeIntegration</span><span class="token operator">:</span> isIntegration<span class="token punctuation">,</span>
          <span class="token literal-property property">contextIsolation</span><span class="token operator">:</span> isIsolation<span class="token punctuation">,</span>
          <span class="token literal-property property">preload</span><span class="token operator">:</span> viewConfig<span class="token punctuation">.</span>preload <span class="token operator">||</span> <span class="token keyword">undefined</span>
      <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  contentsView<span class="token punctuation">.</span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  contentsView<span class="token punctuation">.</span>webContents<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">'did-finish-load'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Content WebContentsView finished loading'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  contentsView<span class="token punctuation">.</span>webContents<span class="token punctuation">.</span><span class="token function">once</span><span class="token punctuation">(</span><span class="token string">'dom-ready'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Content WebContentsView DOM ready'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// SOURCE_TYPES</span>
  <span class="token keyword">const</span> <span class="token punctuation">&#123;</span><span class="token constant">LOCAL_HTML</span><span class="token punctuation">,</span> <span class="token constant">REMOTE_URL</span><span class="token punctuation">,</span> <span class="token constant">SERVER_URL</span><span class="token punctuation">,</span> <span class="token constant">EMBEDDED</span><span class="token punctuation">&#125;</span> <span class="token operator">=</span> <span class="token constant">SOURCE_TYPES</span>
  <span class="token keyword">const</span> srcPath <span class="token operator">=</span> viewConfig<span class="token punctuation">.</span>path<span class="token punctuation">;</span>
  <span class="token keyword">const</span> srcType <span class="token operator">=</span> viewConfig<span class="token punctuation">.</span>srcType<span class="token punctuation">;</span>
  <span class="token keyword">const</span> isSingleton <span class="token operator">=</span> viewConfig<span class="token punctuation">.</span>singleton <span class="token operator">||</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>srcType<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">case</span> <span class="token constant">LOCAL_HTML</span><span class="token operator">:</span>
      <span class="token keyword">await</span> contentsView<span class="token punctuation">.</span>webContents<span class="token punctuation">.</span><span class="token function">loadFile</span><span class="token punctuation">(</span>srcPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">REMOTE_URL</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token constant">SERVER_URL</span><span class="token operator">:</span>
      <span class="token keyword">await</span> contentsView<span class="token punctuation">.</span>webContents<span class="token punctuation">.</span><span class="token function">loadURL</span><span class="token punctuation">(</span>srcPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token constant">EMBEDDED</span><span class="token operator">:</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'FC:CreateWCView Error => Not Define SrcType'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token comment">// 自訂義辨識屬性</span>
  contentsView<span class="token punctuation">.</span>_inAppCustomType <span class="token operator">=</span> viewType
  contentsView<span class="token punctuation">.</span>_isSingleton <span class="token operator">=</span> isSingleton

  <span class="token keyword">return</span> contentsView<span class="token punctuation">;</span><span class="token comment">// WebContentsView Instance</span>
<span class="token punctuation">&#125;</span></code>`),s(p),A(28),f(u,e)}const ct=Object.freeze(Object.defineProperty({__proto__:null,default:et,metadata:Pn},Symbol.toStringTag,{value:"Module"})),Dn={title:"Android with Kotlin2.0",date:"2025-10-12",category:"software",subCategory:"Frontend",tags:["Android","Kotlin","APP"],slug:"android_01"},{title:pl,date:ol,category:el,subCategory:cl,tags:ll,slug:ul}=Dn;var lt=w(`<h6>第一次寫 Android APP : Kotlin2.0 + Jetpack Compose</h6> <hr/> <h3>環境配置</h3> <p>build.gradle.kts</p> <pre class="language-kotlin"><!></pre> <pre class="language-.toml"><!></pre> <h3>入口設定</h3> <p>Android 會自己抓，AndroidManifest.xml 裡面的 Activity LAUNCHER 相關當作 APP 啟動的入口，然後根據開發模式設計成</p> <ul><li>Activity + Navigation 一個主視窗管理分頁</li> <li>多個 Activity</li></ul> <pre class="language-xml"><!></pre> <p>Activity.kt</p> <pre class="language-kt"><!></pre> <h3>執行緒</h3> <p>Android 系統有 Application Not Responding 機制，主執行緒卡住超過一定時間，Android 系統就會判定你的 App 沒反應，然後跳出系統層級的「關閉 App」的對話框。</p> <p>實務上可以理解 主執行緒(單) = UI Thread 和背景處理執行緒(多) = Background Threads，每條獨立的 Background Thread 內部會自動堵塞，而 Coroutine 則使用 launch()、 withContext() 來決定需不需要等待結果。</p> <h4>發文</h4> <p>切換執行緒前先卡一個 isLoading 遮罩，等待背景執行緒的回應結果
讓主執行緒”持續”跑【載入中】的畫面和 APP 不會被 ANR && 觸發新的事件</p> <pre class="language-kotlin"><!></pre> <h4>取得當前文章瀏覽數</h4> <p>主執行緒可以持續使用不影響，只要在開背景執行緒拿到結果後更新到該 UI 的值就可以了</p> <pre class="language-kotlin"><!></pre> <h4>瀏覽紀錄給伺服器 (純發送)</h4> <p>開發商紀錄用的，所以不管有無成功都不應該影響使用者 UI</p> <pre class="language-kotlin"><!></pre> <p>剩下還有輪詢通知(launch + while)、並行載入(async + await)和即時監聽(Flow.collect)等等</p> <h3>錯誤處理</h3> <p>UI 執行緒上不應牽涉外部邏輯，錯誤等同程式設計上有漏洞，應該直接特殊處理或崩潰</p> <p>例如 APP 在未登入的情況下，被進入到某個分頁</p> <pre class="language-kotlin"><!></pre> <p>而 Background Thread 則是需要去處理每個錯誤，防 APP 因為外力而崩潰</p> <pre class="language-kotlin"><!></pre>`,1);function ut(u){var e=lt(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-kotlin">    plugins <span class="token punctuation">&#123;</span>
        <span class="token function">alias</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>android<span class="token punctuation">.</span>application<span class="token punctuation">)</span>
        <span class="token function">alias</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>kotlin<span class="token punctuation">.</span>android<span class="token punctuation">)</span>
        <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"org.jetbrains.kotlin.plugin.compose"</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>

    android <span class="token punctuation">&#123;</span>
        namespace <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"com.example.test_android"</span></span>
        compileSdk <span class="token punctuation">&#123;</span>
            version <span class="token operator">=</span> <span class="token function">release</span><span class="token punctuation">(</span><span class="token number">36</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#125;</span>

        defaultConfig <span class="token punctuation">&#123;</span>
            applicationId <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"com.example.test_android"</span></span>
            minSdk <span class="token operator">=</span> <span class="token number">24</span>
            targetSdk <span class="token operator">=</span> <span class="token number">36</span>
            versionCode <span class="token operator">=</span> <span class="token number">1</span>
            versionName <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"1.0"</span></span>

            testInstrumentationRunner <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"androidx.test.runner.AndroidJUnitRunner"</span></span>
        <span class="token punctuation">&#125;</span>

        buildTypes <span class="token punctuation">&#123;</span>
            release <span class="token punctuation">&#123;</span>
                isMinifyEnabled <span class="token operator">=</span> <span class="token boolean">false</span>
                <span class="token function">proguardFiles</span><span class="token punctuation">(</span>
                    <span class="token function">getDefaultProguardFile</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"proguard-android-optimize.txt"</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                    <span class="token string-literal singleline"><span class="token string">"proguard-rules.pro"</span></span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
        compileOptions <span class="token punctuation">&#123;</span>
            sourceCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_11
            targetCompatibility <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_11
        <span class="token punctuation">&#125;</span>
        kotlinOptions <span class="token punctuation">&#123;</span>
            jvmTarget <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"11"</span></span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">//</span>
        buildFeatures <span class="token punctuation">&#123;</span>
            compose <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>

    dependencies <span class="token punctuation">&#123;</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>core<span class="token punctuation">.</span>ktx<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>appcompat<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>material<span class="token punctuation">)</span>

        <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token function">platform</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>bom<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>ui<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>ui<span class="token punctuation">.</span>graphics<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>ui<span class="token punctuation">.</span>tooling<span class="token punctuation">.</span>preview<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>material3<span class="token punctuation">)</span>
        <span class="token function">debugImplementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>ui<span class="token punctuation">.</span>tooling<span class="token punctuation">)</span>
        <span class="token function">debugImplementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>ui<span class="token punctuation">.</span>test<span class="token punctuation">.</span>manifest<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>activity<span class="token punctuation">.</span>compose<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>lifecycle<span class="token punctuation">.</span>viewmodel<span class="token punctuation">.</span>compose<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>lifecycle<span class="token punctuation">.</span>runtime<span class="token punctuation">.</span>ktx<span class="token punctuation">)</span>
        <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>navigation<span class="token punctuation">.</span>compose<span class="token punctuation">)</span>

        <span class="token function">testImplementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>junit<span class="token punctuation">)</span>
        <span class="token function">androidTestImplementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>junit<span class="token punctuation">)</span>
        <span class="token function">androidTestImplementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>androidx<span class="token punctuation">.</span>espresso<span class="token punctuation">.</span>core<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,2),r=n(o);a(r,()=>`<code class="language-.toml">[versions]
agp = &quot;8.13.1&quot;
kotlin = &quot;2.0.21&quot;
coreKtx = &quot;1.10.1&quot;
junit = &quot;4.13.2&quot;
junitVersion = &quot;1.1.5&quot;
espressoCore = &quot;3.5.1&quot;
appcompat = &quot;1.6.1&quot;
material = &quot;1.10.0&quot;

# Jetpack Compose
composeBom = &quot;2024.12.01&quot;
activityCompose = &quot;1.9.3&quot;
lifecycleViewmodelCompose = &quot;2.8.7&quot;
lifecycleRuntimeKtx = &quot;2.8.7&quot;
navigationCompose = &quot;2.8.6&quot;
</code>`),s(o);var c=t(o,8),d=n(c);a(d,()=>`<code class="language-xml"><span class="token prolog">&lt;?xml version="1.0" encoding="utf-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifest</span> <span class="token attr-name"><span class="token namespace">xmlns:</span>android</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/apk/res/android<span class="token punctuation">"</span></span>
    <span class="token attr-name"><span class="token namespace">xmlns:</span>tools</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://schemas.android.com/tools<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 主執行緒 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>application</span> 
        <span class="token attr-name"><span class="token namespace">android:</span>allowBackup</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>dataExtractionRules</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@xml/data_extraction_rules<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>fullBackupContent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@xml/backup_rules<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>icon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@mipmap/ic_launcher<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@string/app_name<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>roundIcon</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@mipmap/ic_launcher_round<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>supportsRtl</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span>
        <span class="token attr-name"><span class="token namespace">android:</span>theme</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>@style/Theme.TEST_Android<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- activity = 單個主視窗，類似 Electron Windows --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>activity</span>
            <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>.MainActivity<span class="token punctuation">"</span></span>
            <span class="token attr-name"><span class="token namespace">android:</span>exported</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>intent-filter</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>action</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.intent.action.MAIN<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>category</span> <span class="token attr-name"><span class="token namespace">android:</span>name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>android.intent.category.LAUNCHER<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>intent-filter</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>activity</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- activity...--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>application</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifest</span><span class="token punctuation">></span></span></code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-kt"><span class="token keyword">package</span> com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>test_android

<span class="token keyword">import</span> android<span class="token punctuation">.</span>os<span class="token punctuation">.</span>Bundle
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>activity<span class="token punctuation">.</span>ComponentActivity
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>activity<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>setContent
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>foundation<span class="token punctuation">.</span>layout<span class="token punctuation">.</span>fillMaxSize
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>material3<span class="token punctuation">.</span>MaterialTheme
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>material3<span class="token punctuation">.</span>Surface
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>material3<span class="token punctuation">.</span>Text
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>runtime<span class="token punctuation">.</span>Composable
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>ui<span class="token punctuation">.</span>Modifier
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>compose<span class="token punctuation">.</span>ui<span class="token punctuation">.</span>tooling<span class="token punctuation">.</span>preview<span class="token punctuation">.</span>Preview

<span class="token comment">// 1. 繼承 ComponentActivity</span>
<span class="token keyword">class</span> MainActivity <span class="token operator">:</span> <span class="token function">ComponentActivity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token operator">:</span> Bundle<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// 1. 初始化邏輯 savedInstanceState 系統自己儲存的參數</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span>savedInstanceState<span class="token punctuation">)</span>

        <span class="token comment">// 檢查是否有之前儲存的狀態</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>savedInstanceState <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">val</span> userName <span class="token operator">=</span> savedInstanceState<span class="token punctuation">.</span><span class="token function">getString</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"user_name"</span></span><span class="token punctuation">)</span>
            <span class="token keyword">val</span> score <span class="token operator">=</span> savedInstanceState<span class="token punctuation">.</span><span class="token function">getInt</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"score"</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 第一次啟動,使用預設值</span>
        <span class="token punctuation">&#125;</span>
        <span class="token comment">// From Jetpack Compose fun setContent(content: @Composable () -> Unit)</span>
        <span class="token function">setContent</span><span class="token punctuation">(</span>content <span class="token operator">=</span> <span class="token punctuation">&#123;</span> <span class="token function">MyAPP</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onSaveInstanceState</span><span class="token punctuation">(</span>outState<span class="token operator">:</span> Bundle<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onSaveInstanceState</span><span class="token punctuation">(</span>outState<span class="token punctuation">)</span>
        outState<span class="token punctuation">.</span><span class="token function">putString</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"user_name"</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">"Tony"</span></span><span class="token punctuation">)</span>
        outState<span class="token punctuation">.</span><span class="token function">putInt</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"score"</span></span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>
<span class="token annotation builtin">@Preview</span><span class="token punctuation">(</span>showBackground <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@Composable</span>
<span class="token keyword">fun</span> <span class="token function">MyAPP</span><span class="token punctuation">(</span>modifier<span class="token operator">:</span> Modifier <span class="token operator">=</span> Modifier<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    MaterialTheme <span class="token punctuation">&#123;</span>
        <span class="token function">Surface</span><span class="token punctuation">(</span>
            modifier <span class="token operator">=</span> Modifier<span class="token punctuation">.</span><span class="token function">fillMaxSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            color <span class="token operator">=</span> MaterialTheme<span class="token punctuation">.</span>colorScheme<span class="token punctuation">.</span>background
        <span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token function">Text</span><span class="token punctuation">(</span>
                text <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"Hello Android!"</span></span><span class="token punctuation">,</span>
                modifier <span class="token operator">=</span> modifier
            <span class="token punctuation">)</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,12),y=n(i);a(y,()=>`<code class="language-kotlin"><span class="token keyword">class</span> CreatePostViewModel <span class="token operator">:</span> <span class="token function">ViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    
    <span class="token keyword">private</span> <span class="token keyword">val</span> _isPosting <span class="token operator">=</span> <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> isPosting<span class="token operator">:</span> StateFlow<span class="token operator">&lt;</span>Boolean<span class="token operator">></span> <span class="token operator">=</span> _isPosting
    
    <span class="token keyword">fun</span> <span class="token function">publishPost</span><span class="token punctuation">(</span>text<span class="token operator">:</span> String<span class="token punctuation">,</span> images<span class="token operator">:</span> List<span class="token operator">&lt;</span>Uri<span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        viewModelScope<span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">&#123;</span>
            
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span class="token comment">// 執行緒 1: UI Thread</span>
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            _isPosting<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span>  <span class="token comment">// 顯示 Loading 卡住畫面</span>
            
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span class="token comment">// 執行緒 2: Background Thread + withContext 等待回應</span>
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span class="token keyword">val</span> success <span class="token operator">=</span> <span class="token function">withContext</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">try</span> <span class="token punctuation">&#123;</span>
                    <span class="token comment">// 1. 上傳圖片</span>
                    <span class="token keyword">val</span> imageUrls <span class="token operator">=</span> images<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">&#123;</span> uri <span class="token operator">-></span>
                        <span class="token function">uploadImage</span><span class="token punctuation">(</span>uri<span class="token punctuation">)</span>  <span class="token comment">// 網路請求</span>
                    <span class="token punctuation">&#125;</span>
                    
                    <span class="token comment">// 2. 發送貼文</span>
                    api<span class="token punctuation">.</span><span class="token function">createPost</span><span class="token punctuation">(</span>
                        text <span class="token operator">=</span> text<span class="token punctuation">,</span>
                        images <span class="token operator">=</span> imageUrls
                    <span class="token punctuation">)</span>
                    
                    <span class="token comment">// 3. 儲存到本地資料庫</span>
                    database<span class="token punctuation">.</span><span class="token function">insertPost</span><span class="token punctuation">(</span><span class="token operator">..</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
                    
                    <span class="token boolean">true</span>
                <span class="token punctuation">&#125;</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token boolean">false</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span>
            
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span class="token comment">// 執行緒 1: UI Thread (自動切回)</span>
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            _isPosting<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span>  <span class="token comment">// 隱藏 Loading</span>
            
            <span class="token keyword">if</span> <span class="token punctuation">(</span>success<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// 顯示成功訊息,導航回首頁</span>
                _navigationEvent<span class="token punctuation">.</span>value <span class="token operator">=</span> NavigateToHome
            <span class="token punctuation">&#125;</span> <span class="token keyword">else</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// 顯示錯誤訊息</span>
                _errorMessage<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"發文失敗"</span></span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-kotlin"><span class="token keyword">class</span> ArticleViewModel <span class="token operator">:</span> <span class="token function">ViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    
    <span class="token keyword">private</span> <span class="token keyword">val</span> _viewCount <span class="token operator">=</span> <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> viewCount<span class="token operator">:</span> StateFlow<span class="token operator">&lt;</span>Int<span class="token operator">></span> <span class="token operator">=</span> _viewCount
    
    <span class="token keyword">fun</span> <span class="token function">fetchViewCount</span><span class="token punctuation">(</span>articleId<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        viewModelScope<span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">&#123;</span>
            
            <span class="token comment">// （直接切換執行緒，不需要 loading 遮罩）</span>

            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span class="token comment">// 執行緒 2: Background Thread + 等待回應</span>
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span class="token keyword">val</span> count <span class="token operator">=</span> <span class="token function">withContext</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">try</span> <span class="token punctuation">&#123;</span>
                    api<span class="token punctuation">.</span><span class="token function">getViewCount</span><span class="token punctuation">(</span>articleId<span class="token punctuation">)</span>  <span class="token comment">// 網路請求</span>
                <span class="token punctuation">&#125;</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    <span class="token number">0</span>  <span class="token comment">// 失敗預設值</span>
                <span class="token punctuation">&#125;</span>
            <span class="token punctuation">&#125;</span>
            
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            <span class="token comment">// 執行緒 1: UI Thread (自動切回)</span>
            <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
            _viewCount<span class="token punctuation">.</span>value <span class="token operator">=</span> count  <span class="token comment">// 更新 UI 值</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(m);var h=t(m,6),R=n(h);a(R,()=>`<code class="language-kotlin"><span class="token keyword">class</span> ArticleViewModel <span class="token operator">:</span> <span class="token function">ViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    
    <span class="token keyword">fun</span> <span class="token function">recordPageView</span><span class="token punctuation">(</span>articleId<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
        <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
        <span class="token comment">// launch(Dispatchers.IO) 切到 Background Thread（發射並忘記 fire-and-forget）</span>
        <span class="token comment">// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
        viewModelScope<span class="token punctuation">.</span><span class="token function">launch</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">try</span> <span class="token punctuation">&#123;</span>
                api<span class="token punctuation">.</span><span class="token function">recordPageView</span><span class="token punctuation">(</span>articleId<span class="token punctuation">)</span>  <span class="token comment">// 發送請求</span>
                <span class="token comment">// 上傳完就結束，不等待，也不需要回傳結果</span>
            <span class="token punctuation">&#125;</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token comment">// 失敗也不用處理，靜默忽略</span>
                Log<span class="token punctuation">.</span><span class="token function">e</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"PageView"</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">"Failed to record"</span></span><span class="token punctuation">,</span> e<span class="token punctuation">)</span>
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var _=t(h,10),I=n(_);a(I,()=>`<code class="language-kotlin"><span class="token comment">// 這種錯誤應該 Crash,讓開發者知道有 Bug</span>
<span class="token keyword">val</span> userId <span class="token operator">=</span> intent<span class="token punctuation">.</span><span class="token function">getIntExtra</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"user_id"</span></span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>userId <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">throw</span> <span class="token function">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"user_id is required!"</span></span><span class="token punctuation">)</span>  <span class="token comment">// 應該 Crash</span>
<span class="token punctuation">&#125;</span></code>`),s(_);var S=t(_,4),E=n(S);a(E,()=>`<code class="language-kotlin">
<span class="token comment">// 可以先設計預期內錯誤的 error type</span>

<span class="token comment">// RetrofitClient.kt (全域設定)</span>
<span class="token keyword">object</span> RetrofitClient <span class="token punctuation">&#123;</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> okHttpClient <span class="token operator">=</span> OkHttpClient<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">connectTimeout</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">readTimeout</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">writeTimeout</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">,</span> TimeUnit<span class="token punctuation">.</span>SECONDS<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">val</span> api<span class="token operator">:</span> ApiService <span class="token operator">=</span> Retrofit<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">baseUrl</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"https://api.threads.net"</span></span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">client</span><span class="token punctuation">(</span>okHttpClient<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>ApiService<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span>
 

<span class="token comment">// ViewModel.kt (再加 Timeout catch)</span>
<span class="token keyword">fun</span> <span class="token function">loadPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    viewModelScope<span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">try</span> <span class="token punctuation">&#123;</span>
            <span class="token comment">// 額外的 Timeout 保護 (可選)</span>
            <span class="token function">withTimeout</span><span class="token punctuation">(</span><span class="token number">10000</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                <span class="token keyword">val</span> posts <span class="token operator">=</span> <span class="token function">withContext</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>IO<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
                    repository<span class="token punctuation">.</span><span class="token function">getPosts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment">// 已經有 HTTP Timeout</span>
                <span class="token punctuation">&#125;</span>
                _posts<span class="token punctuation">.</span>value <span class="token operator">=</span> posts
            <span class="token punctuation">&#125;</span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> TimeoutCancellationException<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            _error<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"載入超時"</span></span>
        <span class="token punctuation">&#125;</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            _error<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"載入失敗"</span></span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(S),f(u,e)}const kt=Object.freeze(Object.defineProperty({__proto__:null,default:ut,metadata:Dn},Symbol.toStringTag,{value:"Module"})),On={title:"插入 3D 影像",date:"2025-08-13",category:"software",subCategory:"Frontend",tags:["css","fronted","web"],slug:"threeJs"},{title:kl,date:il,category:rl,subCategory:dl,tags:ml,slug:gl}=On;var it=w(`<h6><a href="https://designsystem.digital.gov/" rel="nofollow">U.S. Web Design System</a></h6> <hr/> <h3>匯入 .glb</h3> <p>透過用 three.js 匯入
Canvas ➜ WebGL ➜ Three.js ➜ GLB 模型 ➜ GPU 顯示</p> <pre class="language-js"><!></pre>`,1);function rt(u){var e=it(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-js">  <span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> GLTFLoader <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/loaders/GLTFLoader.js'</span><span class="token punctuation">;</span>
  <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> OrbitControls <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'three/examples/jsm/controls/OrbitControls.js'</span><span class="token punctuation">;</span>

  <span class="token comment">// 建立場景</span>
  <span class="token keyword">const</span> scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 建立相機(視角)</span>
  <span class="token keyword">const</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span>
    <span class="token number">75</span><span class="token punctuation">,</span>
    window<span class="token punctuation">.</span>innerWidth <span class="token operator">/</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">,</span>
    <span class="token number">0.1</span><span class="token punctuation">,</span>
    <span class="token number">100</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 建立渲染器</span>
  <span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> <span class="token literal-property property">antialias</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">,</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>renderer<span class="token punctuation">.</span>domElement<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 加入控制器</span>
  <span class="token keyword">const</span> controls <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrbitControls</span><span class="token punctuation">(</span>camera<span class="token punctuation">,</span> renderer<span class="token punctuation">.</span>domElement<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 加入環境光</span>
  scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>AmbientLight</span><span class="token punctuation">(</span><span class="token number">0xffffff</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 載入 glb 模型（放在 public 資料夾）</span>
  <span class="token keyword">const</span> loader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GLTFLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  loader<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>
    <span class="token string">'/DamagedHelmet.glb'</span><span class="token punctuation">,</span> <span class="token comment">// ← public 資料夾下</span>
    <span class="token punctuation">(</span><span class="token parameter">gltf</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'模型載入成功'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>gltf<span class="token punctuation">.</span>scene<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">xhr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">載入進度 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token punctuation">(</span>xhr<span class="token punctuation">.</span>loaded <span class="token operator">/</span> xhr<span class="token punctuation">.</span>total <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">%</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
      console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">'載入失敗'</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 渲染迴圈</span>
  <span class="token keyword">function</span> <span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>animate<span class="token punctuation">)</span><span class="token punctuation">;</span>
    controls<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token function">animate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 視窗調整</span>
  window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'resize'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
    camera<span class="token punctuation">.</span>aspect <span class="token operator">=</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">/</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">;</span>
    camera<span class="token punctuation">.</span><span class="token function">updateProjectionMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">,</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p),f(u,e)}const dt=Object.freeze(Object.defineProperty({__proto__:null,default:rt,metadata:On},Symbol.toStringTag,{value:"Module"})),Nn={title:" Html Element & CSS 參考標準",date:"2025-08-04",category:"software",subCategory:"Frontend",tags:["css","fronted","web"],slug:"css"},{title:yl,date:wl,category:fl,subCategory:hl,tags:bl,slug:vl}=Nn;var mt=w('<h6><a href="https://designsystem.digital.gov/" rel="nofollow">U.S. Web Design System</a></h6> <hr/> <h3>HTML Element</h3> <p>Head</p> <ul><li>title: 瀏覽器分頁標題/分頁名稱</li> <li>meta: 後台資訊(瀏覽器、搜尋引擎)</li> <li>script: 載入或內嵌 JavaScript</li> <li>base: 設定文件中的相對 URL 基準</li> <li>style: 內嵌 CSS</li></ul> <p>Body</p> <ul><li>a: 超連結</li> <li>section: 用來區分區域，內部預設垂直排列</li> <li>nav: 應用中的主要導航 <code>&lt;nav&gt; -&gt; &lt;ul&gt; -&gt; &lt;li&gt;</code></li> <li>article: 能包裹獨立內容片段</li> <li>aside: 略相關、額外內容和連結</li> <li>hgroup: 把一組標題相關的元素包成一組</li> <li>header: 某個區塊或整個頁面的開頭區域</li> <li>footer: 某個區塊或整個頁面的結尾區域</li> <li>address: 標記聯絡方式</li></ul> <h3>CSS</h3> <p>選擇器</p> <ul><li>基本選擇器: */element/ID/.class/#id/element1, element2</li> <li>屬性選擇器: img[alt^=“film”] → alt 開頭是 film 的圖片</li> <li>結構性選擇器: :first-child、:last-child …</li> <li>偽元素選擇器: ::first-letter、::first-line、::before</li></ul> <h3>字體</h3> <ul><li>內文通常預設 16px，稍大抓 16~22px，提示文字抓 13~15px</li> <li>行高用無單位倍率表示，標準為 16px 配 1.5 行高 => 24px (16*1.5) <ul><li>14px -> 1.5</li> <li>16px -> 1.5 ~ 1.65</li> <li>20px -> 需稍降行高（避免太鬆）</li></ul></li> <li>文字排版設定為左對齊</li> <li>單行適合閱讀 45-90 字元，長文抓 66 字元 (行高抓高可以塞多一點字)</li> <li>段落間距抓 1em ~ 1.5em</li> <li>清單項目間距抓 0.5em</li> <li>標題空白策略：上大、下小 → 上方 ≥ 1.5 × 下方</li> <li>字距不隨意更動</li></ul> <p><a href="https://designsystem.digital.gov/components/typography/?utm_source=chatgpt.com" rel="nofollow">完整文章</a></p> <h3>百分比設計</h3> <p>目標 ÷ 上下文 = %</p> <pre class="language-css"><!></pre>',1);function gt(u){var e=mt(),p=t(b(e),30),k=n(p);a(k,()=>`<code class="language-css"><span class="token comment">/* 固定寬版：設計師給的初稿 */</span>
<span class="token selector">.wrapper</span>        <span class="token punctuation">&#123;</span> <span class="token property">width</span><span class="token punctuation">:</span> 960px<span class="token punctuation">;</span> <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>
<span class="token selector">.wrapper .box</span>   <span class="token punctuation">&#123;</span> <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>

<span class="token comment">/* → 轉為百分比（RWD 版）*/</span>
<span class="token selector">.wrapper</span>        <span class="token punctuation">&#123;</span> <span class="token property">max-width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>  <span class="token comment">/* 容器本身可縮放 */</span> <span class="token punctuation">&#125;</span>
<span class="token selector">.wrapper .box</span>   <span class="token punctuation">&#123;</span> <span class="token property">width</span><span class="token punctuation">:</span> 31.25%<span class="token punctuation">;</span> <span class="token punctuation">&#125;</span>  <span class="token comment">/* 300 / 960 ×100 */</span>

<span class="token comment">/* 以下元素（wrapper 的子層）皆以 wrapper = 960px 為上下文 */</span>
<span class="token selector">.element</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">/* 固定版 */</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/* RWD 版（百分比化）*/</span>
<span class="token selector">.element</span> <span class="token punctuation">&#123;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 1.0416667%<span class="token punctuation">;</span>  <span class="token comment">/* 10 / 960 ×100 */</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 1.0416667%<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p),f(u,e)}const yt=Object.freeze(Object.defineProperty({__proto__:null,default:gt,metadata:Nn},Symbol.toStringTag,{value:"Module"})),Mn={title:"Design Token",date:"2025-08-18",category:"software",subCategory:"Frontend",tags:["css","fronted","web"],slug:"webdesign"},{title:_l,date:Sl,category:Cl,subCategory:Rl,tags:Tl,slug:Il}=Mn;var wt=w('<h6><a href="https://designsystem.digital.gov/" rel="nofollow">U.S. Web Design System</a></h6> <hr/> <h3>Color System</h3> <p>Primary Colors</p> <pre class="language-json"><!></pre> <p>Status Colors</p> <pre class="language-json"><!></pre> <p>Neutral Colors</p> <pre class="language-json"><!></pre> <h3>Typography System</h3> <p>Font Family</p> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre>',1);function ft(u){var e=wt(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"color"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"primary"</span><span class="token operator">:</span> <span class="token string">"#6366F1"</span><span class="token punctuation">,</span>
    <span class="token property">"secondary"</span><span class="token operator">:</span> <span class="token string">"#10B981"</span><span class="token punctuation">,</span>
    <span class="token property">"foreground"</span><span class="token operator">:</span> <span class="token string">"#D92514"</span><span class="token punctuation">,</span>
    <span class="token property">"background"</span><span class="token operator">:</span> <span class="token string">"#F5F4E6"</span><span class="token punctuation">,</span>
    <span class="token property">"surface"</span><span class="token operator">:</span> <span class="token string">"#EDECD8"</span><span class="token punctuation">,</span>
    <span class="token property">"surface-alt"</span><span class="token operator">:</span> <span class="token string">"#374151"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"color"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"success"</span><span class="token operator">:</span> <span class="token string">"#34D399"</span><span class="token punctuation">,</span>
    <span class="token property">"warning"</span><span class="token operator">:</span> <span class="token string">"#FBBF24"</span><span class="token punctuation">,</span>
    <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"#F87171"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"color"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"neutral"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
      <span class="token property">"50"</span><span class="token operator">:</span> <span class="token string">"#FAFAFA"</span><span class="token punctuation">,</span>
      <span class="token property">"100"</span><span class="token operator">:</span> <span class="token string">"#F5F5F5"</span><span class="token punctuation">,</span>
      <span class="token property">"300"</span><span class="token operator">:</span> <span class="token string">"#374151"</span><span class="token punctuation">,</span>
      <span class="token property">"500"</span><span class="token operator">:</span> <span class="token string">"#9CA3AF"</span><span class="token punctuation">,</span>
      <span class="token property">"900"</span><span class="token operator">:</span> <span class="token string">"#F9FAFB"</span>
    <span class="token punctuation">&#125;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"font"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"primary"</span><span class="token operator">:</span> <span class="token string">"Pressio"</span><span class="token punctuation">,</span>
    <span class="token property">"secondary"</span><span class="token operator">:</span> <span class="token string">"Poppins"</span><span class="token punctuation">,</span>
    <span class="token property">"mono"</span><span class="token operator">:</span> <span class="token string">"monospace"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,2),y=n(i);a(y,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"fontSize"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"14px"</span><span class="token punctuation">,</span>
    <span class="token property">"base"</span><span class="token operator">:</span> <span class="token string">"16px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"18px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"20px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,2),v=n(m);a(v,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"spacing"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"xs"</span><span class="token operator">:</span> <span class="token string">"4px"</span><span class="token punctuation">,</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"8px"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"16px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"24px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"32px"</span><span class="token punctuation">,</span>
    <span class="token property">"2xl"</span><span class="token operator">:</span> <span class="token string">"48px"</span><span class="token punctuation">,</span>
    <span class="token property">"3xl"</span><span class="token operator">:</span> <span class="token string">"64px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(m);var h=t(m,2),R=n(h);a(R,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"borderRadius"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"none"</span><span class="token operator">:</span> <span class="token string">"0px"</span><span class="token punctuation">,</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"4px"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"8px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"12px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"16px"</span><span class="token punctuation">,</span>
    <span class="token property">"full"</span><span class="token operator">:</span> <span class="token string">"9999px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var _=t(h,2),I=n(_);a(I,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"shadow"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"0 1px 2px 0 rgba(0, 0, 0, 0.05)"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"0 4px 6px -1px rgba(0, 0, 0, 0.1)"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"0 10px 15px -3px rgba(0, 0, 0, 0.1)"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"0 20px 25px -5px rgba(0, 0, 0, 0.1)"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(_);var S=t(_,2),E=n(S);a(E,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"breakpoints"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"640px"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"768px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"1024px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"1280px"</span><span class="token punctuation">,</span>
    <span class="token property">"2xl"</span><span class="token operator">:</span> <span class="token string">"1536px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(S);var C=t(S,2),x=n(C);a(x,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"duration"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"fast"</span><span class="token operator">:</span> <span class="token string">"150ms"</span><span class="token punctuation">,</span>
    <span class="token property">"normal"</span><span class="token operator">:</span> <span class="token string">"250ms"</span><span class="token punctuation">,</span>
    <span class="token property">"slow"</span><span class="token operator">:</span> <span class="token string">"350ms"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(C);var T=t(C,2),D=n(T);a(D,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"easing"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"linear"</span><span class="token operator">:</span> <span class="token string">"linear"</span><span class="token punctuation">,</span>
    <span class="token property">"easeIn"</span><span class="token operator">:</span> <span class="token string">"cubic-bezier(0.4, 0, 1, 1)"</span><span class="token punctuation">,</span>
    <span class="token property">"easeOut"</span><span class="token operator">:</span> <span class="token string">"cubic-bezier(0, 0, 0.2, 1)"</span><span class="token punctuation">,</span>
    <span class="token property">"easeInOut"</span><span class="token operator">:</span> <span class="token string">"cubic-bezier(0.4, 0, 0.2, 1)"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(T),f(u,e)}const ht=Object.freeze(Object.defineProperty({__proto__:null,default:ft,metadata:Mn},Symbol.toStringTag,{value:"Module"})),Ln={title:"CORS & SOP",date:"2025-10-27",category:"software",subCategory:"Internet",tags:["http","SOP","CORS"],slug:"cors"},{title:Al,date:El,category:xl,subCategory:Pl,tags:Dl,slug:Ol}=Ln;var bt=w('<h2>常常看到 CORS 今天才知道有 SOP</h2> <p>瀏覽器原生就有一個預設的安全機制叫做 <code>Same-Origin Policy (SOP)</code>，它只允許網頁接收來自相同來源（Same Origin）的資料。</p> <p>這個限制在實務上會造成一些不便：如果前後端分別部署在不同的 Server 上，前端就無法直接向後端發送請求取得資料。傳統的解決方式是讓後端先接收外部資料，再轉發給前端。</p> <p>為了突破這個限制，讓跨來源的資料交換更方便，<code>CORS（Cross-Origin Resource Sharing）</code> 機制因此誕生。</p> <h3>Same-Origin Policy</h3> <p>主要用來防範 <strong>跨站請求偽造（CSRF）</strong> 等攻擊。由於瀏覽器發送請求時會自動帶上當前網站的 Origin，且 JavaScript 無法隨意偽造這個值，因此 SOP 可以有效防止惡意網站冒用使用者身份。</p> <p>假設你登入了銀行網站 A，此時瀏覽器會儲存 A 網站的 Cookie（包含登入憑證）。如果沒有 SOP 保護，當你訪問惡意網站 B 時，B 網站的 JavaScript 就能向 A 銀行發送請求，並自動帶上你的登入 Cookie，進而盜取資料或進行轉帳。有了 SOP，瀏覽器會阻擋 B 網站讀取來自 A 網站的回應資料。</p> <pre class="language-md"><!></pre> <h3>Cross-Origin Resource Sharing</h3> <p>當進入 CORS 流程時，瀏覽器會先檢查該請求是簡單請求還是預檢請求。</p> <p>為什麼要分兩種請求？主要是為了保護舊的後端伺服器。簡單請求通常只是讀取資料，比較安全，可以直接送出。但如果是可能修改資料的請求（如 PUT、DELETE）或帶有自訂 Header，就需要先用預檢確認後端有支援 CORS，避免對不支援的舊伺服器造成意外影響。</p> <p><strong>簡單請求 (Simple Request)</strong></p> <p>符合以下條件的請求會被視為簡單請求：</p> <ul><li>HTTP Method 為 <code>GET</code>、<code>HEAD</code> 或 <code>POST</code></li> <li>Content-Type 只能是 <code>application/x-www-form-urlencoded</code>、<code>multipart/form-data</code> 或 <code>text/plain</code></li> <li>沒有自訂的 Header</li></ul> <p>簡單請求會直接送出，伺服器透過回應 Header 告知瀏覽器是否允許該跨來源請求。</p> <p><strong>預檢請求 (Preflight Request)</strong></p> <p>不符合簡單請求條件的請求，瀏覽器會先發送一個 <code>OPTIONS</code> 方法的預檢請求，詢問伺服器是否允許實際請求。只有當預檢通過後，才會發送真正的請求。</p> <pre class="language-md"><!></pre> <p><strong>常見的 CORS Headers</strong></p> <p>伺服器端需要設定的主要 Headers：</p> <ul><li><code>Access-Control-Allow-Origin</code>: 指定允許的來源，可設為特定網域或 <code>*</code>（所有來源）</li> <li><code>Access-Control-Allow-Methods</code>: 允許的 HTTP 方法，如 <code>GET, POST, PUT, DELETE</code></li> <li><code>Access-Control-Allow-Headers</code>: 允許的自訂 Headers</li> <li><code>Access-Control-Allow-Credentials</code>: 是否允許攜帶憑證（如 Cookie）</li> <li><code>Access-Control-Max-Age</code>: 預檢請求的快取時間（秒）</li></ul> <p><strong>範例設定</strong></p> <pre class="language-javascript"><!></pre> <p>分兩種請求主要是保護舊的後端伺服器。簡單請求通常只是讀取資料，可以直接送出。但如果是可能修改資料的請求（如 PUT、DELETE）或帶有自訂 Header，就需要先用預檢確認後端有支援 CORS，避免對不支援的舊伺服器造成意外影響。</p> <p><strong>實際測試 CORS</strong></p> <p>架好後端後，用瀏覽器打開任意網站（例如 <code>https://policy.medium.com/medium-terms-of-service-9db0094a1e0f</code>），開啟開發者工具的主控台執行：</p> <pre class="language-js"><!></pre> <p>此時前端會看到 CORS 錯誤，但如果觀察後端 Log，會發現請求有成功並回應，只是瀏覽器阻擋了回應。</p> <p>回到瀏覽器切換到「網路」面板，找到這個請求，查看「要求標頭」中的 <code>Origin</code> 欄位（例如 <code>https://policy.medium.com</code>）這就是瀏覽器自動帶上的來源網域。回到後端程式碼，加上允許的來源並重啟：</p> <pre class="language-golang"><!></pre> <p>重新執行 fetch，就可以成功取得資料了。</p> <p><strong>完整程式碼</strong></p> <pre class="language-golang"><!></pre>',1);function vt(u){var e=bt(),p=t(b(e),14),k=n(p);a(k,()=>`<code class="language-md">    B 網站的 JS 發起請求到 A Server
            ↓
    瀏覽器檢查:
    「B 的 origin」 vs 「A 的 origin」
            ↓
        是否同源?
    (Yes)      (No)
    直接發送    進入 CORS 流程
    正常讀取</code>`),s(p);var o=t(p,20),r=n(o);a(r,()=>`<code class="language-md">    瀏覽器發送 OPTIONS 請求
            ↓
    伺服器檢查並回應 CORS Headers
            ↓
        預檢是否通過?
    (Yes)         (No)
    發送實際請求    阻擋請求
    取得回應      顯示 CORS 錯誤</code>`),s(o);var c=t(o,10),d=n(c);a(d,()=>`<code class="language-javascript"><span class="token comment">// Node.js Express 範例</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Origin'</span><span class="token punctuation">,</span> <span class="token string">'https://example.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Methods'</span><span class="token punctuation">,</span> <span class="token string">'GET, POST, PUT, DELETE'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Headers'</span><span class="token punctuation">,</span> <span class="token string">'Content-Type, Authorization'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">'Access-Control-Allow-Credentials'</span><span class="token punctuation">,</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>method <span class="token operator">===</span> <span class="token string">'OPTIONS'</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">sendStatus</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,8),g=n(l);a(g,()=>`<code class="language-js"><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'http://127.0.0.1:8080/api'</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">r</span> <span class="token operator">=></span> r<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">d</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">)</span></code>`),s(l);var i=t(l,6),y=n(i);a(y,()=>`<code class="language-golang">w.Header().Set(&quot;Access-Control-Allow-Origin&quot;, &quot;https://policy.medium.com&quot;) // 允許特定網域
w.Header().Set(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;) // 允許所有來源</code>`),s(i);var m=t(i,6),v=n(m);a(v,()=>`<code class="language-golang">// golang
package main 

import (
	&quot;fmt&quot;
	&quot;net/http&quot;
)

func main() &#123;
	fmt.Println(&quot;=== HTTP 伺服器 (允許 CORS) ===&quot;)
	fmt.Println()
	fmt.Println(&quot;✓ 伺服器已啟動&quot;)
	fmt.Println(&quot;├─ 監聽地址: http://127.0.0.1:8080&quot;)
	fmt.Println(&quot;├─ CORS: 已啟用 ✓&quot;)
	fmt.Println(&quot;└─ 在瀏覽器打開這個網址，然後在 Console 執行 fetch&quot;)
	fmt.Println()

	// 定義路由 - 主頁
	http.HandleFunc(&quot;/&quot;, func(w http.ResponseWriter, r *http.Request) &#123;
		fmt.Println(&quot;=== 收到瀏覽器請求 ===&quot;)
		fmt.Println(&quot;請求方法:&quot;, r.Method)
		fmt.Println(&quot;請求路徑:&quot;, r.URL.Path)
		fmt.Println(&quot;客戶端地址:&quot;, r.RemoteAddr)
		fmt.Println()

		response := &#96;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;TCP Server Response&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;h1&gt;🎉 連接成功！&lt;/h1&gt;
        &lt;p class=&quot;success&quot;&gt;✓ Server received your message!&lt;/p&gt;
        
        &lt;div class=&quot;info&quot;&gt;
            &lt;h3&gt;你現在可以做什麼:&lt;/h3&gt;
            &lt;ul&gt;
                &lt;li&gt;按 F12 打開開發者工具&lt;/li&gt;
                &lt;li&gt;打開 Network 面板&lt;/li&gt;
                &lt;li&gt;點擊下面的按鈕發送 API 請求&lt;/li&gt;
                &lt;li&gt;在 Network 面板看到請求&lt;/li&gt;
                &lt;li&gt;在 Console 看到回應&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;

        &lt;button onclick=&quot;testAPI()&quot;&gt;🔗 發送 API 請求&lt;/button&gt;
        &lt;div id=&quot;result&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;

    &lt;script&gt;
        function testAPI() &#123;
            document.getElementById(&quot;result&quot;).textContent = &quot;正在發送請求...&quot;;
            
            fetch(&#39;http://127.0.0.1:8080/api&#39;, &#123;
                method: &#39;GET&#39;,
                headers: &#123;
                    &#39;X-Custom-Token&#39;: &#39;my-secret-123&#39;,
                    &#39;Content-Type&#39;: &#39;application/json&#39;
                &#125;
            &#125;)
            .then(response =&gt; &#123;
                console.log(&quot;回應狀態:&quot;, response.status);
                console.log(&quot;回應 Headers:&quot;, response.headers);
                return response.json();
            &#125;)
            .then(data =&gt; &#123;
                console.log(&quot;回應數據:&quot;, data);
                document.getElementById(&quot;result&quot;).textContent = 
                    &quot;✓ 成功！&#92;n&#92;n回應:&#92;n&quot; + JSON.stringify(data, null, 2);
            &#125;)
            .catch(error =&gt; &#123;
                console.error(&quot;❌ 失敗:&quot;, error);
                document.getElementById(&quot;result&quot;).textContent = 
                    &quot;❌ 失敗: &quot; + error.message;
            &#125;);
        &#125;
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
		&#96;
		w.Header().Set(&quot;Content-Type&quot;, &quot;text/html; charset=utf-8&quot;)
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, response)
	&#125;)

	// 【重要】添加 CORS 中間件
	corsMiddleware := func(next http.Handler) http.Handler &#123;
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) &#123;
			// 【設置 CORS Headers】
			w.Header().Set(&quot;Access-Control-Allow-Origin&quot;, &quot;隨意添加你想測試的網址&quot;)
			w.Header().Set(&quot;Access-Control-Allow-Methods&quot;, &quot;GET, POST, PUT, DELETE, OPTIONS&quot;)
			w.Header().Set(&quot;Access-Control-Allow-Headers&quot;, &quot;Content-Type, X-Custom-Token, Authorization&quot;)

			// 處理 OPTIONS 預檢請求
			if r.Method == &quot;OPTIONS&quot; &#123;
				w.WriteHeader(http.StatusOK)
				return
			&#125;

			next.ServeHTTP(w, r)
		&#125;)
	&#125;

	// API 端點
	http.HandleFunc(&quot;/api&quot;, func(w http.ResponseWriter, r *http.Request) &#123;
		fmt.Println(&quot;=== 收到 API 請求 ===&quot;)
		fmt.Println(&quot;方法:&quot;, r.Method)
		fmt.Println(&quot;路徑:&quot;, r.URL.Path)
		fmt.Println(&quot;Header &#39;X-Custom-Token&#39;:&quot;, r.Header.Get(&quot;X-Custom-Token&quot;))
		fmt.Println()

		w.Header().Set(&quot;Content-Type&quot;, &quot;application/json; charset=utf-8&quot;)
		w.WriteHeader(http.StatusOK)

		response := &#96;&#123;
  &quot;message&quot;: &quot;Hello from Server!&quot;,
  &quot;status&quot;: &quot;success&quot;,
  &quot;timestamp&quot;: &quot;2025-10-28T08:00:00Z&quot;,
  &quot;receivedHeader&quot;: &quot;&#96; + r.Header.Get(&quot;X-Custom-Token&quot;) + &#96;&quot;
&#125;&#96;
		fmt.Fprint(w, response)
	&#125;)

	fmt.Println(&quot;伺服器正在監聽 :8080&quot;)
	fmt.Println(&quot;打開瀏覽器: http://127.0.0.1:8080&quot;)
	fmt.Println()

	// 【使用 CORS 中間件】
	http.ListenAndServe(&quot;:8080&quot;, corsMiddleware(http.DefaultServeMux))
&#125;</code>`),s(m),f(u,e)}const _t=Object.freeze(Object.defineProperty({__proto__:null,default:vt,metadata:Ln},Symbol.toStringTag,{value:"Module"})),$n={title:"HTTP & FileStream",date:"2025-10-27",category:null,subCategory:null,tags:["http","filestream"],slug:"filestream"},{title:Nl,date:Ml,category:Ll,subCategory:$l,tags:ql,slug:jl}=$n;var St=w('<p>實作串流相關 API</p> <hr/> <h3>FileStream 特性</h3> <ul><li>指針機制：串流有一個內部指針，讀取時會向前移動，讀完後就到了末尾</li> <li>記憶體效率：串流設計用來處理大文件，不會把整個文件載入記憶體</li> <li>即時處理：數據是可以邊讀邊處理的，適合有獨立資料結構導向的檔案類型</li></ul> <p><strong>適合的類型</strong> : <code>.txt</code>, <code>.csv</code>,<code>.jsonl</code>,<code>.mp3</code>, <code>.mp4</code></p> <p><strong>不適合的類型</strong> : <code>.json</code>, <code>.zip</code>, <code>.rar</code></p> <pre class="language-csharp"><!></pre> <p>這邊可邊接收邊處理，是因為 <strong>HTTP 不同 Request 參數類型，會有不同的執行時機</strong>，例如:</p> <ul><li><p>String / Object：Body 完整接收後才執行，資料立即可用（適合小型資料、JSON）</p></li> <li><p>IFormFile：Headers 接收後就執行，檔案資訊立即可用但內容需等待串流（適合大型檔案）</p></li></ul>',1);function Ct(u){var e=St(),p=t(b(e),12),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token comment">// 串流處理：記憶體效率高</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>ActionResult<span class="token punctuation">></span></span> <span class="token function">UploadFile</span><span class="token punctuation">(</span><span class="token class-name">IFormFile</span> file<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StreamReader</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">OpenReadStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">string</span></span> line<span class="token punctuation">;</span>
    
    <span class="token comment">// 可邊接收邊處理，不佔用大量記憶體</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>line <span class="token operator">=</span> <span class="token keyword">await</span> reader<span class="token punctuation">.</span><span class="token function">ReadLineAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        <span class="token function">ProcessLine</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 處理完就釋放記憶體</span>
    <span class="token punctuation">&#125;</span>
    <span class="token comment">// while 結束 = 檔案完全接收完畢</span>
<span class="token punctuation">&#125;</span></code>`),s(p),A(4),f(u,e)}const Rt=Object.freeze(Object.defineProperty({__proto__:null,default:Ct,metadata:$n},Symbol.toStringTag,{value:"Module"})),qn={title:"Http Connect",date:"2025-09-03",category:"software",subCategory:"Internet",tags:["Http","tcp","backend"],slug:"http_connect"},{title:Hl,date:Ul,category:Bl,subCategory:Fl,tags:Vl,slug:Gl}=qn;var Tt=w('<h3>TCP 連線的運作機制</h3> <ol><li><p>伺服器主機主動開啟 Port <code>net.Listen("tcp", ":4000")</code></p></li> <li><p>同時 <code>conn, err := listener.Accept()</code> 等待連接</p></li> <li><p>客戶端發送請求 <code>server_ip:4000</code> OS 背後做 TCP 三次握手驗證</p></li> <li><p>資料會傳送到 <code>OS緩衝區</code>，程式則會定期去緩衝區讀取資料處理</p></li></ol> <h3>Server 的核心特性</h3> <ul><li>持續運行（Long-running Process）</li> <li>對外提供通訊介面</li></ul> <pre class="language-go"><!></pre> <p>HTTP 本身是個字串，會需要嚴格的解析流程，可以導入狀態機的概念去處理如:</p> <ul><li>解析請求行 → 提取方法、路徑、版本</li> <li>解析標頭   → 逐行讀取 key: value</li> <li>解析請求體 → 根據 Content-Length 讀取</li></ul> <pre class="language-go"><!></pre>',1);function It(u){var e=Tt(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-go"><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"net"</span>
    <span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>

    listener<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">":8080"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">&#123;</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">defer</span> listener<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Server listening on :8080"</span><span class="token punctuation">)</span>
    
    <span class="token keyword">for</span> <span class="token punctuation">&#123;</span>
        conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">&#123;</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Accept error:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">&#125;</span>
        <span class="token function">handleConnection</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">func</span> <span class="token function">handleConnection</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 創建緩衝區讀取資料</span>
    buffer <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">4096</span><span class="token punctuation">)</span>
    n<span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">&#123;</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Read error:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">&#125;</span>
    
    <span class="token comment">// 將接收到的資料轉為字串</span>
    request <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>buffer<span class="token punctuation">[</span><span class="token punctuation">:</span>n<span class="token punctuation">]</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Received request:"</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span>

	<span class="token comment">// 解析 request 裡面的 path 去拿對應的 Method </span>

	<span class="token comment">// 定義 Response</span>
    response <span class="token operator">:=</span> <span class="token string">"HTTP/1.1 200 OK&#92;r&#92;n"</span> <span class="token operator">+</span>
                <span class="token string">"Content-Type: text/html&#92;r&#92;n"</span> <span class="token operator">+</span>
                <span class="token string">"Content-Length: 13&#92;r&#92;n"</span> <span class="token operator">+</span>
                <span class="token string">"&#92;r&#92;n"</span> <span class="token operator">+</span>
                <span class="token string">"Hello, World!"</span>
    
    <span class="token comment">// 發送回應</span>
    conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var o=t(p,6),r=n(o);a(r,()=>`<code class="language-go"><span class="token keyword">type</span> HTTPRequest <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
    Method  <span class="token builtin">string</span>              <span class="token comment">// "GET", "POST"</span>
    Path    <span class="token builtin">string</span>              <span class="token comment">// "/users/123"</span>
    Query   <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>   <span class="token comment">// &#123;"id": "123", "name": "john"&#125;</span>
    Headers <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span>   <span class="token comment">// &#123;"Host": "localhost", ...&#125;</span>
    Body    <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>              <span class="token comment">// 請求體內容</span>
    Version <span class="token builtin">string</span>              <span class="token comment">// "HTTP/1.1"</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">// 概念化的解析器</span>
<span class="token keyword">func</span> <span class="token function">parseHTTPRequest</span><span class="token punctuation">(</span>raw <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>HTTPRequest<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    lines <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>raw<span class="token punctuation">,</span> <span class="token string">"&#92;r&#92;n"</span><span class="token punctuation">)</span>
    
    <span class="token comment">// 1. 解析請求行</span>
    requestLine <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>lines<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">" "</span><span class="token punctuation">)</span>
    method <span class="token operator">:=</span> requestLine<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    fullPath <span class="token operator">:=</span> requestLine<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> 
    version <span class="token operator">:=</span> requestLine<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
    
    <span class="token comment">// 2. 分離路徑和查詢參數</span>
    pathParts <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span>fullPath<span class="token punctuation">,</span> <span class="token string">"?"</span><span class="token punctuation">)</span>
    path <span class="token operator">:=</span> pathParts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    query <span class="token operator">:=</span> <span class="token function">parseQuery</span><span class="token punctuation">(</span>pathParts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// ?name=john&amp;age=25</span>
    
    <span class="token comment">// 3. 解析標頭</span>
    headers <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token function">len</span><span class="token punctuation">(</span>lines<span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">&#123;</span>
        <span class="token keyword">if</span> lines<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">&#123;</span> <span class="token keyword">break</span> <span class="token punctuation">&#125;</span> <span class="token comment">// 遇到空行停止</span>
        header <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">SplitN</span><span class="token punctuation">(</span>lines<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">": "</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
        headers<span class="token punctuation">[</span>header<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> header<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span>
    
    <span class="token comment">// 4. 根據 Content-Length 讀取 body</span>
    <span class="token comment">// ...</span>
    
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>HTTPRequest<span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">&#125;</span></code>`),s(o),f(u,e)}const At=Object.freeze(Object.defineProperty({__proto__:null,default:It,metadata:qn},Symbol.toStringTag,{value:"Module"})),jn={title:"Http 加密",date:"2025-09-23",category:"software",subCategory:"Internet",tags:["Http","tcp","backend"],slug:"http_secretKey"},{title:Wl,date:Yl,category:zl,subCategory:Jl,tags:Kl,slug:Xl}=jn;var Et=w('<hr/> <h3>SHA256 - 雙方同步加密</h3> <p>雙方約定使用同一組字串、演算法生成【HASH】當作簽名，一樣就當作比對成功</p> <p>實作:</p> <ol><li>雙方私下約定一組 KEY 都用 HMAC-SHA256 加密</li> <li>發送方在 Header 加入生成的【簽名】、【時間戳】，可以把【時間戳】當成是方便使用和驗證的變數</li> <li>接收方先拿明文的【時間戳】檢查是否在有效期間，接者用 KEY+TIME 生成簽名</li> <li>若產出值一樣就代表成功</li></ol> <pre class="language-js"><!></pre> <pre class="language-csharp"><!></pre> <h3>RSA - 約定加密</h3> <p>金鑰值是由RSA演算法生成一對【Private / Public】Key，雙方用KEY加解密和辨識。</p> <p>實作:</p> <ol><li>接收方私下提供一組 PublicKey 給發送方，自己維護一組 PrivateKey</li> <li>發送方用 PublicKey + RSA 去加密字串如 “ServerName|TimeStamp” 後把值放到 Header</li> <li>接收方拿到 Header 值後使用 PrivateKey + RSA 去解密取得 “ServerName|TimeStamp”</li> <li>接收方可以自己去驗證 ServerName 是否在名單 & TimeStamp 等邏輯</li></ol> <pre class="language-csharp"><!></pre>',1);function xt(u){var e=Et(),p=t(b(e),10),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">secretKey</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token constant">HMAC</span><span class="token operator">-</span><span class="token constant">SHA256</span><span class="token punctuation">(</span>TimeStemp <span class="token operator">+</span> Key<span class="token punctuation">)</span> <span class="token comment">// 產生密鑰</span>
<span class="token literal-property property">header</span> <span class="token operator">:</span> secretKey
<span class="token literal-property property">header</span> <span class="token operator">:</span> TimeStemp
<span class="token comment">// https request -> Service Server</span></code>`),s(p);var o=t(p,2),r=n(o);a(r,()=>`<code class="language-csharp"><span class="token comment">// Service Server</span>

<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ValidateSignature</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> timestamp<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> receivedSignature<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> secretKey <span class="token operator">=</span> _configuration<span class="token punctuation">[</span><span class="token string">"ApiSecurity:SecretKey"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 發給對方的KEY</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>secretKey<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span><span class="token string">"未設定 SecretKey"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> dataToSign <span class="token operator">=</span> timestamp <span class="token operator">+</span> secretKey<span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> expectedSignature <span class="token operator">=</span> <span class="token function">ComputeHmacSha256</span><span class="token punctuation">(</span>dataToSign<span class="token punctuation">,</span> secretKey<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 用同一個加密演算法生成簽名</span>

    <span class="token comment">// 比對有無一樣、不做解密</span>
    <span class="token keyword">return</span> expectedSignature<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>receivedSignature<span class="token punctuation">,</span> StringComparison<span class="token punctuation">.</span>OrdinalIgnoreCase<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">&#125;</span>

<span class="token comment">/// &lt;summary></span>
<span class="token comment">/// 計算 HMAC-SHA256 簽名</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ComputeHmacSha256</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> data<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> hmac <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HMACSHA256</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> hashBytes <span class="token operator">=</span> hmac<span class="token punctuation">.</span><span class="token function">ComputeHash</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Convert<span class="token punctuation">.</span><span class="token function">ToHexString</span><span class="token punctuation">(</span>hashBytes<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>
</code>`),s(o);var c=t(o,10),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnActionExecuting</span><span class="token punctuation">(</span><span class="token class-name">ActionExecutingContext</span> context<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 取得 Header 中的加密數據</span>
        <span class="token comment">// 測試網址 https://www.devglan.com/online-tools/rsa-encryption-decryption</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>context<span class="token punctuation">.</span>HttpContext<span class="token punctuation">.</span>Request<span class="token punctuation">.</span>Headers<span class="token punctuation">.</span><span class="token function">TryGetValue</span><span class="token punctuation">(</span><span class="token string">"X-Encrypted-Data"</span><span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">var</span></span> encryptedHeader<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            _logger<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token string">"缺少必要的 Header: X-Encrypted-Data"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            context<span class="token punctuation">.</span>Result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UnauthorizedObjectResult</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token punctuation">&#123;</span> message <span class="token operator">=</span> <span class="token string">"缺少必要的驗證 Header"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token class-name"><span class="token keyword">var</span></span> encryptedData <span class="token operator">=</span> encryptedHeader<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 解密並驗證</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">DecryptAndValidate</span><span class="token punctuation">(</span>encryptedData<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            _logger<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token string">"解密驗證失敗"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            context<span class="token punctuation">.</span>Result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UnauthorizedObjectResult</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token punctuation">&#123;</span> message <span class="token operator">=</span> <span class="token string">"解密驗證失敗"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token string">"RSA 簽名驗證過程發生錯誤"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span>Result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StatusCodeResult</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnActionExecuting</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/// &lt;summary></span>
<span class="token comment">/// 驗證時間戳是否在有效範圍內 (3分鐘)</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ValidateTimestamp</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> timestamp<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">long</span><span class="token punctuation">.</span><span class="token function">TryParse</span><span class="token punctuation">(</span>timestamp<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">var</span></span> requestTime<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token class-name"><span class="token keyword">var</span></span> currentTime <span class="token operator">=</span> DateTimeOffset<span class="token punctuation">.</span>UtcNow<span class="token punctuation">.</span><span class="token function">ToUnixTimeSeconds</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> timeoutMinutes <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 固定3分鐘</span>
    <span class="token class-name"><span class="token keyword">var</span></span> maxDifference <span class="token operator">=</span> timeoutMinutes <span class="token operator">*</span> <span class="token number">60</span><span class="token punctuation">;</span> <span class="token comment">// 轉換為秒</span>

    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span>currentTime <span class="token operator">-</span> requestTime<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> maxDifference<span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/// &lt;summary></span>
<span class="token comment">/// 解密並驗證數據</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">DecryptAndValidate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> encryptedData<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> privateKeyPath <span class="token operator">=</span> _configuration<span class="token punctuation">[</span><span class="token string">"ApiSecurity:RSAPrivateKeyPath"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> privateKeyPem <span class="token operator">=</span> File<span class="token punctuation">.</span><span class="token function">ReadAllText</span><span class="token punctuation">(</span>privateKeyPath<span class="token operator">!</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> validServer <span class="token operator">=</span> _configuration<span class="token punctuation">.</span><span class="token function">GetSection</span><span class="token punctuation">(</span><span class="token string">"ApiSecurity:RSAValidServer"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Get</span><span class="token generic class-name"><span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>privateKeyPem<span class="token punctuation">)</span> <span class="token operator">||</span> validServer <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> validServer<span class="token punctuation">.</span>Length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span><span class="token string">"未設定 RSA 私鑰、有效的公鑰列表"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>

    <span class="token keyword">try</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 解密數據</span>
        <span class="token class-name"><span class="token keyword">var</span></span> decryptedText <span class="token operator">=</span> <span class="token function">DecryptRSA</span><span class="token punctuation">(</span>encryptedData<span class="token punctuation">,</span> privateKeyPem<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>decryptedText<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            _logger<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token string">"RSA 解密失敗"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">// 解析解密後的數據 (格式: ServerStr|timestamp)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">ParseDecryptedData</span><span class="token punctuation">(</span>decryptedText<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> publicKey<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> timestamp<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            _logger<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token string">"解密數據格式錯誤"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">// 驗證時間戳</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">ValidateTimestamp</span><span class="token punctuation">(</span>timestamp<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            _logger<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"時間戳驗證失敗: </span><span class="token interpolation"><span class="token punctuation">&#123;</span><span class="token expression language-csharp">timestamp</span><span class="token punctuation">&#125;</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token comment">// 驗證公鑰是否為我方發行</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">ValidatePublicKey</span><span class="token punctuation">(</span>publicKey<span class="token punctuation">,</span> validServer<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            _logger<span class="token punctuation">.</span><span class="token function">LogWarning</span><span class="token punctuation">(</span><span class="token string">"公鑰驗證失敗，非我方發行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token string">"RSA 解密驗證過程發生錯誤"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/// &lt;summary></span>
<span class="token comment">/// RSA 解密</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">DecryptRSA</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> encryptedData<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> privateKeyPem<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">&#123;</span>
        <span class="token class-name"><span class="token keyword">var</span></span> encryptedBytes <span class="token operator">=</span> Convert<span class="token punctuation">.</span><span class="token function">FromBase64String</span><span class="token punctuation">(</span>encryptedData<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> rsa <span class="token operator">=</span> RSA<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        rsa<span class="token punctuation">.</span><span class="token function">ImportFromPem</span><span class="token punctuation">(</span>privateKeyPem<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name"><span class="token keyword">var</span></span> decryptedBytes <span class="token operator">=</span> rsa<span class="token punctuation">.</span><span class="token function">Decrypt</span><span class="token punctuation">(</span>encryptedBytes<span class="token punctuation">,</span> RSAEncryptionPadding<span class="token punctuation">.</span>Pkcs1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>decryptedBytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> ex<span class="token punctuation">)</span>
    <span class="token punctuation">&#123;</span>
        _logger<span class="token punctuation">.</span><span class="token function">LogError</span><span class="token punctuation">(</span>ex<span class="token punctuation">,</span> <span class="token string">"RSA 解密失敗"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/// &lt;summary></span>
<span class="token comment">/// 解析解密後的數據</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ParseDecryptedData</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> decryptedText<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> publicKey<span class="token punctuation">,</span> <span class="token keyword">out</span> <span class="token class-name"><span class="token keyword">string</span></span> timestamp<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    publicKey <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>
    timestamp <span class="token operator">=</span> <span class="token keyword">string</span><span class="token punctuation">.</span>Empty<span class="token punctuation">;</span>
    <span class="token keyword">try</span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 格式為: ServerStr|timestamp</span>
        <span class="token class-name"><span class="token keyword">var</span></span> parts <span class="token operator">=</span> decryptedText<span class="token punctuation">.</span><span class="token function">Split</span><span class="token punctuation">(</span><span class="token char">'|'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>parts<span class="token punctuation">.</span>Length <span class="token operator">!=</span> <span class="token number">2</span><span class="token punctuation">)</span>
        <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        publicKey <span class="token operator">=</span> parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        timestamp <span class="token operator">=</span> parts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    <span class="token keyword">catch</span>
    <span class="token punctuation">&#123;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span>

<span class="token comment">/// &lt;summary></span>
<span class="token comment">/// 驗證公鑰是否為我方發行</span>
<span class="token comment">/// &lt;/summary></span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">ValidatePublicKey</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> publicKey<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> validPublicKeys<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> validPublicKeys<span class="token punctuation">.</span><span class="token function">Contains</span><span class="token punctuation">(</span>publicKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(c),f(u,e)}const Pt=Object.freeze(Object.defineProperty({__proto__:null,default:xt,metadata:jn},Symbol.toStringTag,{value:"Module"})),Hn={title:"Nginx",date:"2025-11-27",category:"software",subCategory:"Internet",tags:["http","nginx"],slug:"nginx"},{title:Ql,date:Zl,category:nu,subCategory:su,tags:au,slug:tu}=Hn;var Dt=w('<h6>公司內部開發的時候用看看Nginx，就不用搬筆電跑來跑去</h6> <hr/> <p>可以這樣配置測試環境</p> <ol><li>本地先 run 一個要被訪問的 Server</li> <li>配置 nginx.conf，因為 nginx Server 是部屬在 docker，所以要使用 host.docker.internal</li> <li>docker run 一個 nginx container</li> <li>先測看看 localhost 不帶後贅是否可以連到預設的 nginx page</li> <li>再看不同裝置區網內連線可不可以(—ipConfig IPv4 位址)，能否連接到上述預設 page</li> <li>再測試反向代理是否轉發正確</li></ol> <pre class="language-dockerfile"><!></pre> <pre class="language-bash"><!></pre> <p>nginx.conf (假設 Server 部署在 local4041 )</p> <pre class="language-conf"><!></pre> <p>上面大概就是基礎的轉發功能，剩下的就是看專案當初的環境配置了，nginx 本身也可以 subdomain 配置，可以用來解決 cors 的問題。</p> <p>其餘可進階的配置</p> <ul><li>SPA (單頁應用) 路由設定</li> <li>靜態資源快取 (Browser Caching)</li> <li>Gzip 壓縮</li> <li>限制存取 (Access Control)</li> <li>SSL/TLS (https)</li></ul>',1);function Ot(u){var e=Dt(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-dockerfile"><span class="token comment"># Use the specific Ubuntu 22.04 image</span>
<span class="token instruction"><span class="token keyword">FROM</span> ubuntu:22.04</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; apt-get install -y nginx</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>
<span class="token instruction"><span class="token keyword">COPY</span> nginx.conf /etc/nginx/nginx.conf</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"nginx"</span>, <span class="token string">"-g"</span>, <span class="token string">"daemon off;"</span>]</span></code>`),s(p);var o=t(p,2),r=n(o);a(r,()=>`<code class="language-bash"><span class="token function">docker</span> stop my-proxy
<span class="token function">docker</span> <span class="token function">rm</span> my-proxy
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> my-nginx-proxy <span class="token builtin class-name">.</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">--name</span> my-proxy my-nginx-proxy</code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-conf">events &#123;
    worker_connections 1024;
&#125;

http &#123;
    server &#123;
        listen 80;
        server_name localhost;

        # 1. 預設路徑：顯示 Nginx 歡迎頁面 (確認 Nginx 有在運作)
        location / &#123;
            root /var/www/html;
            index index.html;
            try_files $uri $uri/ =404;
        &#125;

        # 2. 反向代理：將 /services/tsg/ 的請求轉發到你本機的 4041 port
        location /services/tsg/ &#123;
            # host.docker.internal 是 Docker for Windows 專用的 DNS
            proxy_pass http://host.docker.internal:4041/services/tsg/;
            
            # 設定一些 header 讓後端 server 知道請求的來源
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        &#125;
    &#125;
&#125;</code>`),s(c),A(6),f(u,e)}const Nt=Object.freeze(Object.defineProperty({__proto__:null,default:Ot,metadata:Hn},Symbol.toStringTag,{value:"Module"})),Un={title:"Svelte Blog",date:"2025-09-09",category:"software",subCategory:"專案",tags:["svelte","blog","markdown"],slug:"svelteblog"},{title:pu,date:ou,category:eu,subCategory:cu,tags:lu,slug:uu}=Un;var Mt=w('<h6>用 Svelte 做一個類似 Jekyll 的 Markdown 語法生成網站 (你正在閱讀的)，提供 <a href="https://github.com/cao0085/svelte-blog" rel="nofollow">Repository</a> 參考</h6> <hr/> <p>我第一個專案就是套 Jekyll + GitHub Pages 架 Blog ，有朋友推薦可以玩玩看 Svelte，就決定拿來就架一個文章模板網站，也順手把 Blog 搬過來。</p> <h3>專案架構評估</h3> <p>有傳說搜尋引擎對於靜態 HTML 的權重比較高，所以推薦文字內容為主的網站使用靜態網站的形式，但傳統靜態網站的缺點是需要維護多張 HTML、切換頁面都需要發送網路請求。</p> <p>而另一種主流 SPA (Single Page Application) 的優勢是首次載入後，後續切換頁面完全由 JavaScript 在記憶體中處理，缺點就是搜尋引擎可能只看到空白的 HTML 殼。</p> <p>要結合上述的優點就是要</p> <ul><li>首次訪問返回完整 HTML (SEO 友善 + 快速顯示)</li> <li>後續在站內切換文章，由使用端觸發 JavaScript 操作 (SPA 體驗)</li></ul> <p>需求聽起來矛盾，但是基本上就是預先準備好 N 份 JavaScript 一樣 + 不同文字的 HTML (SPA) 當作入口被訪問，常見名稱叫做【混合式渲染】<code>SSG（Static Site Generation）+ CSR（Client-Side Rendering）</code>。</p> <p>你現在可以打開開發者面板觀察，在站內切換文章是不會向外部發送網路請求的。</p> <h3>混合式渲染</h3> <p>在 Svelte 可以用 mdsvex 套件來實踐，他提供 run build 時把你指定的 模板 + .md 輸出成 HTML。整體流程如下:</p> <ol><li>構建時: 為<strong>每篇</strong>文章生成獨立的靜態 HTML，內含 Markdown 完整的文字內容</li> <li>首次訪問: 伺服器返回該路由的 HTML</li> <li>Hydration: Svelte runtime 載入後接管頁面</li> <li>文章切換: 用 JS 做虛擬路由切換，後續點擊文章連結變成客戶端導航</li></ol> <p>程式碼架構</p> <pre class="language-markdown"><!></pre> <p>.md 檔案根據程式邏輯寫一些變數屬性</p> <pre class="language-markdown"><!></pre> <pre class="language-markdown"><!></pre> <p>也就是說構建(打包)時會：</p> <ol><li>從 <code>+page.ts</code> 的 <code>entries()</code> 函數取得所有文章的 slug 列表</li> <li>為每個 slug 預渲染一個靜態 HTML 檔案（例如：<code>build/blog/db_sql.html</code>）</li> <li>這些檔案路徑會要與 URL 路徑完全對應（<code>/article/db_sql</code> → <code>blog/db_sql.html</code>）</li></ol> <p>需要注意的就是路徑配置， run build 時的靜態檔案路徑；虛擬路由的路徑和攔截；部屬正式環境的 Domain 有沒有替換正確。</p> <h3>自動化流程</h3> <p>因為網站目前是單純的文字紀錄，所以設計成每次 Push 到 Master 就可以用 Github Action 自動執行程式碼，然後輸出檔案放在另一個分支。原理是推上 RP 時候會自動檢查 /.github/workflows 有無檔案並自動執行。</p> <ul><li>master (主程式碼)</li> <li>gh-pages (打包檔案)</li></ul> <p>根目錄配置 /.github/workflows/deploy.yml</p> <pre class="language-yml"><!></pre> <h3>部屬</h3> <p>這邊就是設定 Github Pages 檔案來源指向分支 gh-pages ，然後去 Cloudflare 買好 Domain 在 Pages Setting 替換訪問路徑。</p> <p>還有另一個做法是在 Cloudflare 開一個入口，而資源指向 Repository 指定分支，Cloudflare 就會去讀取該檔案來源部屬，好處是 github rp 就不用公開了。</p>',1);function Lt(u){var e=Mt(),p=t(b(e),28),k=n(p);a(k,()=>`<code class="language-markdown">src/routes/
├── +layout.svelte              # 全局布局（Header）
└── article/                    # 子路由目錄
    ├── +layout.svelte          # 文章專用布局（側邊欄 + 內容區）
    ├── +page.svelte            # /article 列表頁
    └── [slug]/                 # 動態路由段落
        ├── +page.svelte        # 文章內容頁（渲染組件）
        └── +page.ts            # 預渲染配置</code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-markdown"><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"Render 範本"</span>
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token string">"2025-06-22"</span>
<span class="token key atrule">category</span><span class="token punctuation">:</span>
<span class="token key atrule">subCategory</span><span class="token punctuation">:</span>
<span class="token key atrule">tags</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"svelte"</span><span class="token punctuation">,</span> <span class="token string">"blog"</span><span class="token punctuation">,</span> <span class="token string">"markdown"</span><span class="token punctuation">]</span>
<span class="token key atrule">slug</span><span class="token punctuation">:</span> <span class="token string">"example"</span></span>
<span class="token punctuation">---</span></span>
<span class="token title important">... ... ... ... 文章內容
<span class="token punctuation">---</span></span></code>`),s(o);var c=t(o,2),d=n(c);a(d,()=>`<code class="language-markdown">構建階段 (npm run build)
  ↓
掃描 src/content/*<span class="token italic"><span class="token punctuation">*</span><span class="token content">/</span><span class="token punctuation">*</span></span>.md
  ↓
提取每個 Markdown 的 metadata.slug
  ↓
生成對應的靜態 HTML 頁面
  ↓
輸出到 build/blog/&#123;slug&#125;.html</code>`),s(c);var l=t(c,16),g=n(l);a(g,()=>`<code class="language-yml"><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> master

<span class="token key atrule">permissions</span><span class="token punctuation">:</span>
  <span class="token key atrule">contents</span><span class="token punctuation">:</span> write  <span class="token comment"># ⬅加上這行，否則會 403 push error?</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout repo
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">20</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm ci

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build the site
        <span class="token key atrule">run</span><span class="token punctuation">:</span>  npm run build
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">NODE_ENV</span><span class="token punctuation">:</span> production

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">&#123;</span><span class="token punctuation">&#123;</span> secrets.GITHUB_TOKEN <span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span>
          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> ./build
          <span class="token key atrule">publish_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token key atrule">cname</span><span class="token punctuation">:</span> blog.yoshikagehub.com</code>`),s(l),A(6),f(u,e)}const $t=Object.freeze(Object.defineProperty({__proto__:null,default:Lt,metadata:Un},Symbol.toStringTag,{value:"Module"})),Bn={title:"Website Previewer",date:"2025-10-21",category:"software",subCategory:"專案",tags:["react","typescript","redux"],slug:"base-web-design"},{title:ku,date:iu,category:ru,subCategory:du,tags:mu,slug:gu}=Bn;var qt=w('<h6>用 React + TypeScript + Vite 建立自己習慣的專案架構</h6> <hr/> <p>主要是每次要做新網站，都要重複安裝一些套件和狀態管理設計，所以決定設計成一個整合型範本專案。好處是這個專案可以一直留著當作母版範本持續優化，同時當需要正式部屬時開時，複製一份範本再刪掉不需要的 views 就能脫鉤成為全新的獨立專案。</p> <h3>專案架構</h3> <pre class="language-markdown"><!></pre> <p>簡單來說就是一套自己慣用的 Template 類似 <code>npm create xxxxx</code>，然後每個 view/page 視為一個專案有自己的 index + css + 共用靜態資源與 JS 程式碼。</p> <h3>程式碼實踐</h3> <p>紀錄一下套件使用</p> <p>Redux Toolkit 進行狀態管理</p> <pre class="language-typescript"><!></pre> <p>React Router v6 的巢狀路由結構，所有頁面都包裹在 <code>MainLayout</code> 中：</p> <pre class="language-markdown"><!></pre> <p>路由配置使用 <code>useRoutes</code> hook，提供更靈活的路由管理：</p> <pre class="language-typescript"><!></pre> <p>實作動態主題切換功能，支援 light、dark 和 system 模式：</p> <ul><li>主題狀態儲存在 Redux store 的 <code>viewsSlice</code> 中</li> <li>使用 CSS Custom Properties（Design Tokens）管理主題變數</li> <li>透過 <code>data-theme</code> 屬性動態切換主題</li></ul> <pre class="language-typescript"><!></pre> <p>整合 i18next 提供完整的國際化支援：</p> <ul><li>語系檔案放在 <code>public/language/</code> 目錄</li> <li>支援 <code>en</code>（英文）和 <code>zh</code>（中文）</li> <li>使用 <code>i18next-http-backend</code> 動態載入語系檔案</li> <li>透過 Redux 管理語系狀態</li></ul> <p>語系檔案結構：</p> <pre class="language-markdown"><!></pre> <p>使用 Axios 進行 API 請求：</p> <ul><li>基礎配置在 <code>src/api/baseAPI.ts</code></li> <li>支援環境變數配置（<code>src/constants/env.ts</code>）</li> <li>可擴展的 API 架構設計</li></ul> <p>使用 Vite 作為建置工具，提供以下指令：</p> <pre class="language-bash"><!></pre>',1);function jt(u){var e=qt(),p=t(b(e),8),k=n(p);a(k,()=>`<code class="language-markdown">src/
├── App.tsx                      # 應用程式主入口
├── routes.tsx                   # 路由配置
├── main.tsx                     # React DOM 渲染入口
├── components/                  # 共用元件
│   └── MainLayout.tsx          # 主要布局元件
├── views/                       # 頁面元件
│   ├── index.tsx               # 首頁
│   ├── category_1/             # 分類頁面 1
│   ├── category_2/             # 分類頁面 2
│   └── BrandPage/              # 品牌頁面
│       ├── index.tsx           # 主頁面
│       └── css/                # CSS 設計預覽
│           └── design-preview.tsx
├── store/                       # Redux 狀態管理
│   ├── store.tsx               # Store 配置
│   └── slices/                 # State Slices
│       ├── userSlice.ts        # 使用者狀態
│       ├── viewsSlice.ts       # 視圖狀態（主題等）
│       ├── languageSlice.ts    # 語言狀態
│       └── playerSlice.ts      # 播放器狀態
├── i18n/                        # 國際化配置
│   └── index.ts                # i18next 初始化
├── api/                         # API 層
│   └── baseAPI.ts              # 基礎 API 配置
├── assets/                      # 靜態資源
│   ├── svgIcon/                # SVG 圖標元件
│   │   ├── Earth.tsx           # 地球圖標
│   │   └── Pause.tsx           # 暫停圖標
│   └── react.svg
├── css/                         # 樣式檔案
│   ├── theme.module.css        # 主題樣式（Design Tokens）
│   └── views/                  # 頁面專用樣式
│       └── HomePage.module.css
└── constants/                   # 常數配置
    └── env.ts                  # 環境變數</code>`),s(p);var o=t(p,10),r=n(o);a(r,()=>`<code class="language-typescript"><span class="token comment">// store 配置範例</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  reducer<span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    user<span class="token operator">:</span> userReducer<span class="token punctuation">,</span>
    views<span class="token operator">:</span> viewsReducer<span class="token punctuation">,</span>
    language<span class="token operator">:</span> languageReducer<span class="token punctuation">,</span>
    player<span class="token operator">:</span> playerReducer<span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(o);var c=t(o,4),d=n(c);a(d,()=>`<code class="language-markdown">/                           # 首頁
├── category_1              # 分類頁面 1（Mix）
├── category_2              # 分類頁面 2
├── BrandPage               # 品牌頁面
├── BrandPage/css           # CSS 設計預覽頁面
└── *                       # 404 導向首頁</code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>'<code class="language-typescript"><span class="token keyword">const</span> element <span class="token operator">=</span> <span class="token function">useRoutes</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span></code>'),s(l);var i=t(l,6),y=n(i);a(y,()=>`<code class="language-typescript"><span class="token comment">// 主題切換實作</span>
<span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">'data-theme'</span><span class="token punctuation">,</span> theme<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>theme<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(i);var m=t(i,8),v=n(m);a(v,()=>`<code class="language-markdown">public/language/
├── en/
│   └── translation.json
└── zh/
    └── translation.json</code>`),s(m);var h=t(m,8),R=n(h);a(R,()=>`<code class="language-bash"><span class="token function">npm</span> run dev      <span class="token comment"># 啟動開發伺服器（HMR 支援）</span>
<span class="token function">npm</span> run build    <span class="token comment"># TypeScript 編譯檢查 + 打包生產版本</span>
<span class="token function">npm</span> run lint     <span class="token comment"># ESLint 程式碼檢查</span>
<span class="token function">npm</span> run preview  <span class="token comment"># 預覽打包後的結果</span>
<span class="token function">npm</span> run deploy   <span class="token comment"># 執行建置並部署（需要 deploy.sh）</span></code>`),s(h),f(u,e)}const Ht=Object.freeze(Object.defineProperty({__proto__:null,default:jt,metadata:Bn},Symbol.toStringTag,{value:"Module"})),Fn={title:"Website Editor",date:"2025-10-30",category:"software",subCategory:"專案",tags:["electron","web","local-editor"],slug:"websiteeditor"},{title:yu,date:wu,category:fu,subCategory:hu,tags:bu,slug:vu}=Fn;var Ut=w(`<h6>基於 Electron 框架開發支援跨平台，實作一個本地端網站編輯器，解決靜態網站修改的問題</h6> <hr/> <p>當客戶想對靜態網站微調時，如果沒有維護雲端伺服器和資料庫，就無法提供後台系統給客戶使用，雖然在本地 Run Server + 修改文字檔案技術上不難，但對非技術人員來說心理門檻很高，所以往往還是會陷入「無法即時預覽 → 來回修改 → 直到一方妥協」，。</p> <p>以前覺得對免費仔來說是無解的問題，但有天上班開發 Windows C# 小程式突然想到：好像提供一套本地端應用程式模擬雲端後台，讓客戶可以在自己電腦上編輯和預覽網站也是個做法？</p> <h3>專案架構</h3> <p>用 Electron 他基於 Chromium 引擎和 Node.js 又可以跨平台，可以簡單理解為：</p> <ul><li>內建瀏覽器（Chromium）：負責渲染 UI 和即時預覽</li> <li>內建伺服器（Node.js）：處理檔案讀寫和本地服務</li></ul> <p>這個專案的核心目標是把使用門檻降低，目前編輯的部份用這樣設計：</p> <ol><li>資料層：所有可編輯的內容都存放在 <code>data.json</code> 中</li> <li>載入方式：專案就採用類似 i18n 多語系的方式，Import 載入.json文字</li> <li>編輯介面：提供視覺化的編輯頁面，讓客戶透過表單修改內容，而非直接編輯 JSON 檔案</li></ol> <p>簡單理解就是 <code>.json = Database</code> / <code>Import = Query Db API</code> / <code>編輯 = Update Db API</code></p> <h4>核心組件</h4> <p>專案用 Electron - WebContentsView + IPC 實踐多進程管理，技術有點複雜可以問 AI 比較好，但大概會如下</p> <pre class="language-text"><!></pre> <p>然後我們的目標是讓，毫無相關的專案與此 Electron Editor 共用一份 data.json，這樣才可以修改、即時預覽和打包，所以將構建好的靜態網站專案放入指定目錄 <code>/Website</code> ，再去設定專案路徑和資料路徑
，決定 Editor 的資料來源，這邊就要考慮備份返回機制，看是要 APP Run 時直接 COPY 一份靜態檔案等等…。</p> <pre class="language-json"><!></pre> <p>再來就是根據客戶內的需求，寫出各個小應用，例如</p> <ul><li>A 客戶網站內有一張圖片當初是 800px*600px，那就寫一個裁切小工具讓他符合原始尺寸不跑版面</li> <li>B 客戶有音樂播放器的需求，需要轉檔或切片，那也就寫一套自動化幫他產出</li></ul> <p>總之就是去減少他們爆破網站的機率…，所以隨著時間可能會變成一個超級工具箱，根據不同客戶需求，來去決定打包輸出時的項目。</p> <pre class="language-javascript"><!></pre> <h3>打包與部署</h3> <p>當編輯完成後，目前有想到二種</p> <ul><li>寫一個檔案匯出壓縮功能，請使用者回傳整包靜態檔案</li> <li>直接把 KEY 寫死在 APP，客戶端觸發自動化部屬</li></ul> <h3>小心得</h3> <p>因為未來是要 Mapping 給個專案使用，所以要保留很多可變動配置，整體開發下來滿複雜的，等實際上開始使用再過一次流程更新文章。</p>`,1);function Bt(u){var e=Ut(),p=t(b(e),24),k=n(p);a(k,()=>`<code class="language-text">┌─────────────────────────────────────┐
│         Main Window (BrowserWindow) │
├──────────┬──────────┬───────────────┤
│ Sidebar  │  Editor  │   Previewer   │
│          │          │               │
│ • 檔案樹 │ • 編輯器 │  • 即時預覽    │
│ • 切換   │ • 內容   │  • 內建伺服器  │
└──────────┴──────────┴───────────────┘</code>`),s(p);var o=t(p,4),r=n(o);a(r,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
    <span class="token property">"webProject"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"projectPath"</span><span class="token operator">:</span> <span class="token string">"./webProject/xxxxx"</span><span class="token punctuation">,</span>
    <span class="token property">"source"</span><span class="token operator">:</span> <span class="token string">"./webProject/xxxxx/public"</span><span class="token punctuation">,</span>
    <span class="token property">"source2"</span><span class="token operator">:</span> <span class="token string">"./xxxxx"</span> <span class="token comment">//</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token property">"serverSettings"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">3000</span><span class="token punctuation">,</span>
    <span class="token property">"hotReload"</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(o);var c=t(o,8),d=n(c);a(d,()=>`<code class="language-javascript"><span class="token keyword">const</span> <span class="token constant">WCV_DEFAULT_SETTING</span> <span class="token operator">=</span> <span class="token punctuation">&#123;</span>
  <span class="token literal-property property">panels</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token string-property property">'sidebar'</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'SIDEBAR'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'側邊欄'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token string-property property">'editor-1'</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'EDITOR'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'編輯器'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token string-property property">'previewer-1'</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'PREVIEWER'</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'預覽1'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token comment">// 'image-1': &#123; type: 'uitity', name: '照片編輯' &#125;,</span>
    <span class="token comment">// 'audio-1': &#123; type: 'uitity', name: '音樂檔編輯' &#125;,</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">defaultView</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token literal-property property">layoutMode</span><span class="token operator">:</span> <span class="token string">'sidebar_with_main'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token string">'sidebar'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token string">'editor-1'</span><span class="token punctuation">,</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(c),A(10),f(u,e)}const Ft=Object.freeze(Object.defineProperty({__proto__:null,default:Bt,metadata:Fn},Symbol.toStringTag,{value:"Module"})),Vn={title:"CSS Render 範本",date:"2025-06-22",category:null,subCategory:null,tags:["svelte","blog","markdown"],slug:"example"},{title:_u,date:Su,category:Cu,subCategory:Ru,tags:Tu,slug:Iu}=Vn;var Vt=w('<p>這是第一篇文章，用來展示部落格如何從 markdown 載入內容。</p> <hr/> <h1>這是 H1 標題</h1> <h2>這是 H2 標題</h2> <h3>這是 H3 標題</h3> <hr/> <p>段落文字：這是一段普通的段落內容，展示預設的段落文字樣式。</p> <p>強調文字：<strong>粗體</strong>、<em>斜體</em>、<del>刪除線</del>。</p> <hr/> <h3>清單測試</h3> <ul><li>無序清單項目 1</li> <li>無序清單項目 2 <ul><li>子項目 a</li> <li>子項目 b</li></ul></li></ul> <ol><li>有序清單項目 1</li> <li>有序清單項目 2 <ol><li>子項目 i</li> <li>子項目 ii</li></ol></li></ol> <hr/> <h3>程式碼區塊</h3> <h4>行內程式碼</h4> <p>例如你可以這樣寫：<code>console.log("Hello Svelte!")</code></p> <h4>區塊程式碼</h4> <pre class="language-js"><!></pre>',1);function Gt(u){var e=Vt(),p=t(b(e),34),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">function</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">!</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p),f(u,e)}const Wt=Object.freeze(Object.defineProperty({__proto__:null,default:Gt,metadata:Vn},Symbol.toStringTag,{value:"Module"})),U=[],Y=Object.assign({"/src/content/Angular20/angular20_API_01.md":cs,"/src/content/Angular20/angular20_API_02.md":ks,"/src/content/Angular20/angular20_AuthRoute_01.md":ds,"/src/content/Angular20/angular20_AuthRoute_02.md":ys,"/src/content/Angular20/angular20_AuthRoute_03.md":hs,"/src/content/Angular20/angular20_RouteReuseStrategy_01.md":_s,"/src/content/Angular20/angular20_RouteReuseStrategy_02.md":Rs,"/src/content/Angular20/angular20_Signal.md":As,"/src/content/Angular20/angular20_tabService.md":Ps,"/src/content/Angular20/angular_basic_value.md":Ns,"/src/content/Angular20/angular_basic_value_02.md":$s,"/src/content/Angular20/angular_router.md":Hs,"/src/content/Backend/BackgroudService.md":Fs,"/src/content/Backend/DDD_layer.md":Ws,"/src/content/Backend/DDD_mediator.md":Js,"/src/content/Backend/DDD_outbox.md":Qs,"/src/content/Backend/EFCore_Codefirst.md":sa,"/src/content/Backend/FSM.md":pa,"/src/content/Database/Paxon_1.md":ca,"/src/content/Database/Paxon_2.md":ka,"/src/content/Database/consistency_1.md":da,"/src/content/Database/consistency_2.md":ya,"/src/content/Database/consistency_3.md":ha,"/src/content/Database/db_leetcode50.md":_a,"/src/content/Database/db_normalization.md":Ra,"/src/content/Database/db_relational.md":Aa,"/src/content/Database/db_sql.md":Pa,"/src/content/Database/db_table_1.md":Na,"/src/content/Devlop-Note/cashflow.md":$a,"/src/content/Devlop-Note/jsPDF.md":Ha,"/src/content/Devlop-Note/pdfMerge.md":Fa,"/src/content/Devlop-Note/reconcile.md":Wa,"/src/content/Devlop-Note/sftp_ftps.md":Ja,"/src/content/Devlop-Note/structurizr.md":Qa,"/src/content/Devlop-Note/summary_2025.md":st,"/src/content/Devlop-Note/xlsx_excel.md":pt,"/src/content/Fronted/Electron_01.md":ct,"/src/content/Fronted/Kotlin_01.md":kt,"/src/content/Fronted/ThreeJS.md":dt,"/src/content/Fronted/css.md":yt,"/src/content/Fronted/design_token.md":ht,"/src/content/Http/CORS.md":_t,"/src/content/Http/filestream.md":Rt,"/src/content/Http/http_connect.md":At,"/src/content/Http/http_secretKey.md":Pt,"/src/content/Http/nginx.md":Nt,"/src/content/Project/blog.md":$t,"/src/content/Project/webpreviewer.md":Ht,"/src/content/Project/websiteeditor.md":Ft,"/src/content/empty.md":Wt});for(const u in Y){const e=Y[u];U.push({category:e.metadata.category,subCategory:e.metadata.subCategory,title:e.metadata.title,slug:e.metadata.slug,date:e.metadata.date,tags:e.metadata.tags,excerpt:e.metadata.excerpt??"",component:e.default})}U.sort((u,e)=>e.date.localeCompare(u.date));const Au=ps(U);export{ha as A,ya as B,da as C,ka as D,ca as E,pa as F,sa as G,Qs as H,Js as I,Ws as J,Fs as K,Hs as L,$s as M,Ns as N,Ps as O,As as P,Rs as Q,_s as R,hs as S,ys as T,ds as U,ks as V,cs as W,Au as X,Wt as _,Ft as a,Ht as b,$t as c,Nt as d,Pt as e,At as f,Rt as g,_t as h,ht as i,yt as j,dt as k,kt as l,ct as m,pt as n,st as o,Qa as p,Ja as q,Wa as r,Fa as s,Ha as t,$a as u,Na as v,Pa as w,Aa as x,Ra as y,_a as z};
