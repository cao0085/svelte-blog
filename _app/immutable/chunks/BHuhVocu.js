import{b as U,d as xn,f as y,a as f}from"./Cew64nlL.js";import"./C5SEx9ip.js";import{t as On,h as B,a as V,P as Nn,aH as Ln,d as W,V as $n,Y as qn,W as Fn,B as jn,T as O,s as t,o as v,v as n,w as s,aI as P}from"./COc0ozwQ.js";import{r as Mn}from"./CR_4RHM7.js";function a(u,o,p=!1,k=!1,e=!1){var r=u,c="";On(()=>{var d=Nn;if(c===(c=o()??"")){B&&V();return}if(d.nodes_start!==null&&(Ln(d.nodes_start,d.nodes_end),d.nodes_start=d.nodes_end=null),c!==""){if(B){W.data;for(var l=V(),g=l;l!==null&&(l.nodeType!==8||l.data!=="");)g=l,l=$n(l);if(l===null)throw qn(),Fn;U(W,g),r=jn(l);return}var i=c+"";p?i=`<svg>${i}</svg>`:k&&(i=`<math>${i}</math>`);var w=xn(i);if((p||k)&&(w=O(w)),U(O(w),w.lastChild),p||k)for(;O(w);)r.before(O(w));else r.before(w)}})}const Y={title:"Base Backgroud Service",date:"2025-09-25",category:"software",subCategory:"Backend",tags:["Backgroud","backend","markdown"],slug:"backgroudservice"},{title:Oa,date:Na,category:La,subCategory:$a,tags:qa,slug:Fa}=Y;var Hn=y('<h6>C#實作</h6> <hr/> <h3>使用背景</h3> <p>當主程式的 DI 註冊週期是以 HTTP lifecycle 為主時，可藉由 Background Service 提供長期運行的服務容器。</p> <ol><li>非阻塞式處理：可由外部 API 觸發某些動作，立即回應用戶端而不等待處理完成</li> <li>解耦合設計：將耗時的業務邏輯從 HTTP 請求週期中分離出來</li> <li>簡易事件模式：作為一個輕量級的 Event pattern 實現，處理非即時性任務</li> <li>資源管理：避免長時間佔用 HTTP 連線資源，提升系統整體效能</li></ol> <h3>Channel 基礎原理</h3> <p>Channel 是 .NET Core 提供的 thread-safe 生產者-消費者模式實作，基於 System.Threading.Channels 命名空間。它解決了多執行緒環境下的資料傳遞問題。</p> <pre class="language-csharp"><!></pre> <h3>Channel 的監聽機制</h3> <p>寫入機制 (Producer)</p> <pre class="language-csharp"><!></pre> <p>讀取監聽機制 (Consumer)</p> <pre class="language-csharp"><!></pre> <h3>基本架構</h3> <p>DI註冊</p> <pre class="language-csharp"><!></pre> <p>Controller</p> <pre class="language-csharp"><!></pre> <p>服務內部</p> <pre class="language-csharp"><!></pre>',1);function Un(u){var o=Hn(),p=t(v(o),14),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> channel <span class="token operator">=</span> Channel<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateUnbounded</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>YourRequestType<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Channel 包含兩個部分</span>
channel<span class="token punctuation">.</span>Writer <span class="token comment">// 用於寫入資料 (生產者) => Controller 需要寫入能力</span>
channel<span class="token punctuation">.</span>Reader <span class="token comment">// 用於讀取資料 (消費者) => Background 需要讀取能力</span>

┌─────────────────────┐    寫入    ┌──────────────┐    讀取    ┌──────────────────────┐
│   Controller        │ ─────────<span class="token operator">></span> │   Channel    │ ─────────<span class="token operator">></span> │  Background Service  │
│  <span class="token punctuation">(</span>ChannelWriter<span class="token punctuation">)</span>    │           │   <span class="token punctuation">(</span>Queue<span class="token punctuation">)</span>    │            │  <span class="token punctuation">(</span>ChannelReader<span class="token punctuation">)</span>     │
└─────────────────────┘           └──────────────┘            └──────────────────────┘
<span class="token comment">// FIFO 先進先出的順序處理</span></code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-csharp"><span class="token comment">// 非同步寫入 - 不會阻塞，立即將資料放入佇列</span>
<span class="token keyword">await</span> channelWriter<span class="token punctuation">.</span><span class="token function">WriteAsync</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 同步寫入 - 立即返回 bool</span>
<span class="token class-name"><span class="token keyword">bool</span></span> success <span class="token operator">=</span> channelWriter<span class="token punctuation">.</span><span class="token function">TryWrite</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 標記寫入完成 (關閉 Writer)</span>
channelWriter<span class="token punctuation">.</span><span class="token function">Complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token comment">// ReadAllAsync</span>
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
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddHostedService</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>YourBackgroundService<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,4),w=n(i);a(w,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"trigger-action"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
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
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,4),_=n(m);a(_,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">YourBackgroundService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BackgroundService</span></span>
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
<span class="token punctuation">&#125;</span></code>`),s(m),f(u,o)}const Bn=Object.freeze(Object.defineProperty({__proto__:null,default:Un,metadata:Y},Symbol.toStringTag,{value:"Module"})),K={title:"Finite-State Machine",date:"2025-06-22",category:"software",subCategory:"Backend",tags:["FSM","backend","markdown"],slug:"FSM"},{title:ja,date:Ma,category:Ha,subCategory:Ua,tags:Ba,slug:Va}=K;var Vn=y('<h6>導入類比電路的概念來實作，用金流串接當作範例</h6> <hr/> <h3>核心概念</h3> <p>狀態是封閉集合：Pending / Paid / Failed / RefundPending / Refunded。事件（Trigger）是唯一入口：只有明確的事件才能讓狀態改變。</p> <pre class="language-csharp"><!></pre> <table><thead><tr><th>CurrentState</th><th>Trigger</th><th>NextState</th></tr></thead><tbody><tr><td>Pending</td><td>PaySucceeded</td><td>Paid</td></tr><tr><td>Pending</td><td>PayFailed</td><td>Failed</td></tr><tr><td>Paid</td><td>StartRefund</td><td>RefundPending</td></tr><tr><td>RefundPending</td><td>RefundSucceeded</td><td>Refunded</td></tr><tr><td>RefundPending</td><td>RefundFailed</td><td>Paid</td></tr><tr><td>Failed/Refunded</td><td><em>(無任何事件)</em></td><td><em>(終點)</em></td></tr></tbody></table> <h3>簡易流程</h3> <pre class="language-csharp"><!></pre> <p>限制行為的方式</p> <pre class="language-csharp"><!></pre> <h3>測試與擴充</h3> <p>單元測試每條轉移：「Pending → PaySucceeded → Paid」。</p> <p>新增流程：只要在 enum + 轉移表多加一條，和對應 trigger 的處理；主程式 switch(fsm.CurrentState) 自動接手 DB 差異。</p>',1);function Wn(u){var o=Vn(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token comment">// 狀態（State）</span>
<span class="token function">Pending</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> → <span class="token function">Paid</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> → <span class="token function">RefundPending</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> → <span class="token function">Refunded</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token function">Failed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>  <span class="token comment">// 失敗 / 終端狀態</span>

<span class="token comment">// 事件（Trigger）</span>
PaySucceeded<span class="token punctuation">,</span> PayFailed<span class="token punctuation">,</span> StartRefund<span class="token punctuation">,</span> RefundSucceeded<span class="token punctuation">,</span> RefundFailed</code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-csharp">
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
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>fsm<span class="token punctuation">.</span><span class="token function">CanFire</span><span class="token punctuation">(</span>trigger<span class="token punctuation">)</span><span class="token punctuation">)</span> 
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">InvalidOperationException</span><span class="token punctuation">(</span><span class="token string">"非法動作"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fsm<span class="token punctuation">.</span><span class="token function">Fire</span><span class="token punctuation">(</span>trigger<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c),P(6),f(u,o)}const zn=Object.freeze(Object.defineProperty({__proto__:null,default:Wn,metadata:K},Symbol.toStringTag,{value:"Module"})),G={title:"Paxon",date:"2025-09-02",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"paxon"},{title:Wa,date:za,category:Ya,subCategory:Ka,tags:Ga,slug:Xa}=G;var Yn=y("<h6>保證的是 “記錄的事實必定相同” 這件事情，不同節點 (DB Server) 資料(ID) 僅可以是 有/無 的差異</h6> <hr/> <p>在古希臘的Paxon島上，有一個議會制政府。這個島上的議員們需要通過投票來決定各種法案和政策。但是這個政治體系面臨著一些現實挑戰：</p> <ol><li><p>議員可能缺席：有些議員可能因為各種原因離開議會或無法參與投票</p></li> <li><p>通信不可靠：通過信使傳遞消息，可能會迷路、延遲送達和重複傳遞同樣的消息</p></li> <li><p>異步環境：沒有統一的時鐘，無法保證消息的送達順序</p></li></ol> <p>在不可靠的環境，如何讓議會就某個提案達成一致(簡單多數)的決定？</p> <h3>概念</h3> <p>上個月趙議員發起 <strong>002號提案</strong>：</p> <p>「各位同仁，我想申請討論A路段修整的開工日期，這是002號提案申請。」</p> <ul><li>李議員：「好的我同意討論。我承諾在您的002號提案結束前，不接受編號更低的提案。」</li> <li>但也有部分議員沒有接收到消息</li></ul> <p>但是趙議員後來因為生病，002號提案沒有進行到第二階段就中斷</p> <p>__</p> <br/> <p>今天林議員想發起提案，他不知道有 <strong>002號提案</strong> 狀況。</p> <p>林議員：「各位同仁，我想申請討論A路段修整的開工日期，這是<strong>001號提案</strong>申請。」</p> <ul><li>王議員：「好的林議員，我同意討論。我這邊沒有其他相關提案記錄。我承諾在您的001號提案結束前，不接受編號更低的提案。」</li></ul> <p><em>Promise(001, null)</em></p> <ul><li><em>回覆：Promise(001, null)</em> 張議員：「好的林議員，我同意討論。雖然陳議員曾經在私下討論中提到『3月20日』這個想法，雖然沒有正式提案。我承諾支持您的001號提案。」</li></ul> <p><em>Promise(001, null)</em></p> <ul><li><em>回覆：</em> 李議員：「抱歉林議員，我必須拒絕。上個月趙議員的002號提案還沒有正式結束，基於議會流程，我不能接受您的提案。」</li></ul> <p><em>Reject(002)</em></p> <p>__</p> <br/> <p>林議員：「什麼？還有002號提案？那麼依規定我需要更高的編號！」</p> <p>林議員：「各位同仁我重新申請：這是003號提案，討論A路段修整開工日期。」</p> <ul><li>王議員：「好的，003號比之前都大，我同意。」</li></ul> <p><em>Promise(003, null)</em></p> <ul><li>張議員：「我也同意003號提案」</li></ul> <p><em>Promise(003, null)</em></p> <ul><li>李議員：「003號比002號大，我可以接受。趙議員當時沒有提出具體日期就中斷了。」</li></ul> <p><em>Promise(003, null)</em></p> <p>__</p> <p>林議員：「我獲得了多數支持，而且對於結果都沒有意見，我可以提議自己原本想要的『3月15日』。」正式提案</p> <ul><li>張議員：「我接受003號提案。A路段開工日期：3月15日。」</li></ul> <p><em>Accepted(003, “3月15日”)</em></p> <ul><li>李議員：「我接受003號提案。A路段開工日期：3月15日。」</li></ul> <p><em>Accepted(003, “3月15日”)</em></p> <br/> <p>林議員收到回覆後：「太好了！我有收到了2個接受回覆，超過半數了！」</p> <p>書記員宣布：「根據一致決議，003號提案通過！A路段修整開工日期確定為『3月15日』。」</p> <h3>實務</h3> <p>通常應用在DB集群維護 Acceptor 節點，任一個DB收到寫入資料就可以視作是 Proposer，其他DB節點作為 Acceptor 參與共識決策。</p> <ul><li>Proposer: 收到寫入請求的 DB 節點（動態角色）</li> <li>Acceptor: 集群中的所有 DB 節點（包括 Proposer 自己）</li> <li>Learner: 需要同步最終結果的節點，或客戶端應用</li></ul> <br/> <p>實際運作</p> <ol><li>前端寫入請求 → DB-1</li> <li>DB-1 變成 Proposer，向所有節點（包括自己）發起提案</li> <li>所有 DB 節點作為 Acceptor 回應是否接受</li> <li>達成多數決 後，寫入被確認</li> <li>Learner 節點（如快取、備份系統）獲得最終結果</li></ol>",1);function Kn(u){var o=Yn();P(88),f(u,o)}const Gn=Object.freeze(Object.defineProperty({__proto__:null,default:Kn,metadata:G},Symbol.toStringTag,{value:"Module"})),X={title:"Paxon with Golang",date:"2025-09-02",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"paxonGolang"},{title:Ja,date:Qa,category:Za,subCategory:nt,tags:st,slug:at}=X;var Xn=y('<h6>基本概念如下，當然實務上要如何分發ID、定義節點的生命週期會更複雜</h6> <hr/> <p>型別</p> <pre class="language-go"><!></pre> <p>第一階段 - 獲取提案許可</p> <pre class="language-go"><!></pre> <p>第二階段 - 承諾提案內容有共識</p> <pre class="language-go"><!></pre> <pre class="language-golang"><!></pre>',1);function Jn(u){var o=Xn(),p=t(v(o),6),k=n(p);a(k,()=>`<code class="language-go"><span class="token keyword">type</span> Proposer <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
    Name  <span class="token builtin">string</span>
    ID    <span class="token builtin">int</span>
    Value <span class="token builtin">int</span>
<span class="token punctuation">&#125;</span>

<span class="token keyword">type</span> Acceptor <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
    Name        <span class="token builtin">string</span>
    HandleID    <span class="token builtin">int</span>
    HandleValue <span class="token builtin">int</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-go">
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
</code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-go"><span class="token keyword">func</span> <span class="token function">getAcceptorInfo</span><span class="token punctuation">(</span>proposer Proposer<span class="token punctuation">,</span> acceptors <span class="token punctuation">[</span><span class="token punctuation">]</span>Acceptor<span class="token punctuation">)</span> <span class="token builtin">bool</span><span class="token punctuation">&#123;</span>

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
</code>`),s(l),f(u,o)}const Qn=Object.freeze(Object.defineProperty({__proto__:null,default:Jn,metadata:X},Symbol.toStringTag,{value:"Module"})),J={title:"Database Consistency 1",date:"2025-07-28",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"database_consistency_1"},{title:tt,date:pt,category:ot,subCategory:et,tags:ct,slug:lt}=J;var Zn=y(`<h6>維持多台 Server 資料唯一性的幾種選擇，<a href="https://ithelp.ithome.com.tw/articles/10217086" rel="nofollow">建議閱讀這裡</a></h6> <hr/> <p>當需要維持多台DB Server，因為建置成本的關係，可依據需求去選擇不同強度的Model去實作</p> <h3>Consistency Model</h3> <ul><li><p>Strong Consistency: 在保證最新和正確的情況下才回傳，否則就回報錯誤</p></li> <li><p>Read My Writes: 只讀取保證有最新寫入的資料庫</p></li> <li><p>Bounded Staleness: 可參數化這個 bounded值，在可允許範圍內確定資料的正確性</p></li> <li><p>Consistent Prefix: 保證資料是正確的，但是不一定是最新</p></li> <li><p>Monotonic Reads: 第一次拿取不保證正確性，但之後都會向同一台Server拿取資料</p></li> <li><p>Eventual Consistency: 只保證最後執行完畢的資料會是正確的</p></li></ul> <h3>Quorum System</h3> <p>實例情境</p> <ul><li>商城限量開賣一款筆電限購「100台」</li> <li>客戶很多（C1、C2、C3…Cn）在同一時間湧進來搶購</li> <li>為了快速處理，商城把這個「庫存數量」存在於 <strong>3 個伺服器（R1、R2、R3）</strong> 上，形成一個「分散式系統」</li></ul> <br/> <h3>DB Lock</h3> <p>每次有人要搶購時，先「鎖住所有伺服器」，等操作結束後再開放。能保證正確（強一致性）但是非常慢、任一台伺服器壞掉，整個系統卡死。</p> <ul><li>客戶 A 說我要買 → 鎖住 R1、R2、R3 → 扣庫存 → 解鎖</li> <li>客戶 B 必須等待 A 的操作完</li></ul> <h3>Quorum</h3> <ul><li>寫入：只要成功寫入 <strong>2 台（W = 2）</strong> 就算成功</li> <li>讀取：也從 <strong>2 台讀取（R = 2）</strong></li> <li>且滿足 R + W > 3，就能保證「交集」裡一定有最新的資訊</li></ul> <br/> <p>對應實際流程：</p> <ol><li><p>客戶 A 要買向 R1、R2 發出購買請求（扣除庫存 -1），系統只要有 2 台回應成功就算成功。</p></li> <li><p>客戶 B 要買向 R2、R3 發出購買請求，就算不同人問到不同伺服器，只要 <strong>總是至少問 2 台（R）</strong>，系統就可以找出正確的庫存數，避免「同時兩人都以為還有庫存」。</p></li></ol> <pre class="language-text"><!></pre> <p><code>下次再讀庫存時 → 會從 2 台讀出資料 → 看哪個版本新（有版本號或時間戳）→ 拿到正確的「98」</code></p> <p>假設用戶 C1 買了一台筆電，寫入筆電數量剩下 99
C1 的請求被成功寫到：R1、R2、R3
R4(讀)、R5(讀) 當時故障或太慢 → 沒有更新成功</p> <pre class="language-text"><!></pre> <h3>Read-Repair</h3> <pre class="language-text"><!></pre> <p>系統根據 timestamp 判斷：99 是最新的庫存，除了把 99 回傳給用戶外，還會 99 寫回 R4、R5</p> <pre class="language-text"><!></pre> <h3>Anti-Entropy</h3> <p>或是用背景 process 會：</p> <ul><li><p>定期掃描所有 replica</p></li> <li><p>發現某些節點資料版本較舊</p></li> <li><p>根據 timestamp 主動同步最新資料</p></li></ul> <br/> <h3>Sloppy Quorum + Hinted Handoff</h3> <p>之前的寫入規則是 R1, R2, R3 寫入 >= 2
但是如果_R3突然掛掉了，可以找一個替代伺服器_R4，只是_R4儲存的資料需要標記，等_R3恢復後再回補</p> <pre class="language-text"><!></pre>`,1);function ns(u){var o=Zn(),p=t(v(o),34),k=n(p);a(k,()=>`<code class="language-text">庫存初始值：100

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
R3: 98</code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-text">R1: 99
R2: 99
R3: 99
R4: 100
R5: 100</code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-text">R1: 99  ✅（有時間戳 t2）
R4: 100 ❌（舊）
R5: 100 ❌（舊）</code>`),s(c);var l=t(c,4),g=n(l);a(g,()=>`<code class="language-text">R1: 99
R2: 99
R3: 99
R4: 99
R5: 99</code>`),s(l);var i=t(l,14),w=n(i);a(w,()=>`<code class="language-text">C1 發出寫入 (搶購筆電，剩 99)

[ 原本應該寫入 ]:  R1   R2   R3  
[ 實際成功寫入 ]:  R1   R4   ❌

=&gt; 系統標記：R4 存了一份「R3 的代理資料」</code>`),s(i),f(u,o)}const ss=Object.freeze(Object.defineProperty({__proto__:null,default:ns,metadata:J},Symbol.toStringTag,{value:"Module"})),Q={title:"Database Consistency 2",date:"2025-07-28",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"database_consistency_2"},{title:ut,date:kt,category:rt,subCategory:it,tags:dt,slug:gt}=Q;var as=y('<h6>維持多台 Server 資料唯一性的幾種選擇，<a href="https://ithelp.ithome.com.tw/articles/10217086" rel="nofollow">建議閱讀這裡</a></h6> <hr/> <p>實作時不同伺服器中的時間戳不可當作最新資料的判斷依據</p> <br/> <h3>Vector Clock</h3> <p>背景設定有 3 台 replica：R1、R2、R3，每個伺服器都有一個 Vector Clock (DB自己處理+1)來追蹤</p> <br/> <p>Client 讀資料會拿到的格式</p> <pre class="language-text"><!></pre> <p>Client 寫入資料</p> <pre class="language-text"><!></pre> <p>若是 R1 收到資料後 → 它把自己的版本數加 1</p> <pre class="language-text"><!></pre> <p>R2 收到資料後 → 也是一樣，把自己的欄位 R2 +1</p> <pre class="language-text"><!></pre> <p>之後的取就拿數字最大的版本當作最新來源</p>',1);function ts(u){var o=as(),p=t(v(o),16),k=n(p);a(k,()=>`<code class="language-text">value = 100
version = &#123; R1: 1, R2: 1, R3: 0 &#125;</code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-text">&#123;
  value: 99,
  old_version: &#123; R1: 1, R2: 1, R3: 0 &#125;
&#125;</code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>'<code class="language-text">&#123; R1: 2, R2: 1, R3: 0 &#125;</code>'),s(c);var l=t(c,4),g=n(l);a(g,()=>'<code class="language-text">&#123; R1: 1, R2: 2, R3: 0 &#125;</code>'),s(l),P(2),f(u,o)}const ps=Object.freeze(Object.defineProperty({__proto__:null,default:ts,metadata:Q},Symbol.toStringTag,{value:"Module"})),Z={title:"Database Consistency 3",date:"2025-07-29",category:"software",subCategory:"Database",tags:["consistency","system","design","database"],slug:"database_consistency_3"},{title:mt,date:yt,category:ft,subCategory:wt,tags:ht,slug:vt}=Z;var os=y('<h6>維持多台 Server 資料唯一性的幾種選擇，<a href="https://ithelp.ithome.com.tw/articles/10217086" rel="nofollow">建議閱讀這裡</a></h6> <hr/> <h3>Consensus Algorithm Requirements</h3> <ul><li>Termination: 保證所有參與決策且無故障的節點最終會做一個決定，執行的演算法不會無法終止。</li> <li>Validity: 最終的決議一定是來自某一個參與的節點</li> <li>Agreement: 當演算法完成時，所有節點都會做相同的決定</li></ul> <br/> <h3>Network Model</h3> <p>Synchronous Network Model</p> <ul><li><p>時間同步（Clock Synchronization）: 每個節點的「時鐘」彼此對齊，雖然可能有些微差異，但保證不會無限偏移（例如都在 ±ε 範圍內）。</p></li> <li><p>訊息延遲有上限（Bounded Network Delay）: 傳輸訊息最多只會延遲某個固定時間</p></li> <li><p>計算速度一致（Equal Computation Speed）: 所有節點的處理速度是同步的，彼此的運算時間不會落差太大。</p></li></ul> <p>上述是最理想的狀態，但是在現實世界不可能達成，而 Asynchronous Network 就是相反。</p> <br/> <p>Failure Model</p> <ul><li><p>Byzantine failures: 該節點不按照程式邏輯執行，惡意給予錯誤的回復，比方使用者輸入0，當提出proposal給集群時，該節點隨機傳送0或1給其餘節點</p></li> <li><p>Crash-recovery failures: 節點運算總是正確，但是可能因為發生Crash或是網路中斷，需要時間Recover，因此無法保證回覆時間</p></li> <li><p>Omission failures: 發生Crash後「消息」不會回覆。比方網路中斷導致訊息丟失，不再重傳。</p></li> <li><p>Crash failure: 發生Crash，不再回復。比方某個節點發生故障，則該節點不再回復也不再跟其他系統其他節點有來往。</p></li></ul> <br/> <h3>Paxos Algorithm</h3> <p>每個節點稱作 Processes 可以同時發起提議（Proposer）/ 接受提議（Acceptor），遵循 Asynchronous Network Model 不保證時間但保證最終會送達</p> <br/> <p><strong>Phase 1 — Preparation</strong>：讓過半數的 Acceptors 承諾不再接受比 n 小的提案</p> <p><strong>Phase 2 — Accept</strong>:Proposer 收集 ack 後，決定要提出什麼值，並發送給大家</p>',1);function es(u){var o=os();P(34),f(u,o)}const cs=Object.freeze(Object.defineProperty({__proto__:null,default:es,metadata:Z},Symbol.toStringTag,{value:"Module"})),nn={title:"LeetCode SQL 50",date:"2025-07-24",category:"software",subCategory:"Database",tags:["database","leetcode","sql"],slug:"db_leetcode50"},{title:bt,date:_t,category:Ct,subCategory:St,tags:Rt,slug:Dt}=nn;var ls=y('<h6>練習練習練習</h6> <hr/> <h3><a href="https://leetcode.com/problems/managers-with-at-least-5-direct-reports/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">570. Manager…</a></h3> <p>GROUP BY + HAVING 選出符合條件值當作 where 條件</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/confirmation-rate/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1934. Confirmation Rate</a></h3> <p>用 GROUP BY + function 做出一張暫時表單 join 到主表，再處理 IFNULL 的邏輯</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/monthly-transactions-i/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1193. Monthly Transactions I</a></h3> <p>熟悉在SELECT欄位可一起使用到的語法</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/immediate-food-delivery-ii/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1174. Immediate Food Delivery II</a></h3> <p>先用 GROUPBY + MIN(DATE) 找到顧客的首筆訂單，但因為是聚合函數，無法直接帶出該筆訂單的 delivery_id ，再用 Duplicate ID key 找出該對應的原始表欄位。</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/employees-whose-manager-left-the-company/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1978. Employees Whose Manager Left the Company</a></h3> <p>利用 left join 會填補 null 的特性去篩選出欄位</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/movie-rating/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">1341. Movie Rating</a></h3> <p>取同一個變數名稱 results + 練習 LIMIT + 雙排序</p> <pre class="language-sql"><!></pre> <h3><a href="https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/description/?envType=study-plan-v2&amp;envId=top-sql-50" rel="nofollow">602. Friend Requests II: Who Has the Most Friends</a></h3> <p>總數可直接用 requester_id + accepter_id 加總來處理，所以先用 UNION ALL 攤平就好處理了</p> <pre class="language-sql"><!></pre>',1);function us(u){var o=ls(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> name
<span class="token keyword">FROM</span> Employee
<span class="token keyword">WHERE</span> id <span class="token operator">IN</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> managerId
    <span class="token keyword">FROM</span> Employee
    <span class="token keyword">WHERE</span> managerId <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
    <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> managerId
    <span class="token keyword">HAVING</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token number">5</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> s<span class="token punctuation">.</span>user_id<span class="token punctuation">,</span> 
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
<span class="token keyword">ON</span> s<span class="token punctuation">.</span>user_id <span class="token operator">=</span> aa<span class="token punctuation">.</span>user_id<span class="token punctuation">;</span></code>`),s(e);var c=t(e,6),d=n(c);a(d,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> 
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
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,6),w=n(i);a(w,()=>`<code class="language-sql"><span class="token keyword">select</span> e1<span class="token punctuation">.</span>employee_id
<span class="token keyword">from</span> <span class="token punctuation">(</span>
    <span class="token keyword">select</span> <span class="token operator">*</span>
    <span class="token keyword">from</span> Employees
    <span class="token keyword">where</span> salary <span class="token operator">&lt;</span> <span class="token number">30000</span> <span class="token operator">AND</span> manager_id <span class="token operator">is</span> <span class="token operator">not</span> <span class="token boolean">null</span>
    <span class="token keyword">order</span> <span class="token keyword">by</span> employee_id
<span class="token punctuation">)</span> <span class="token keyword">as</span> e1
<span class="token keyword">left</span> <span class="token keyword">join</span> Employees <span class="token keyword">as</span> e2
<span class="token keyword">on</span> e1<span class="token punctuation">.</span>manager_id <span class="token operator">=</span> e2<span class="token punctuation">.</span>employee_id
<span class="token keyword">where</span> e2<span class="token punctuation">.</span>employee_id <span class="token operator">is</span> <span class="token boolean">null</span>
<span class="token keyword">order</span> <span class="token keyword">by</span> employee_id <span class="token keyword">asc</span></code>`),s(i);var m=t(i,6),_=n(m);a(_,()=>`<code class="language-sql"><span class="token punctuation">(</span>
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
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m);var h=t(m,6),S=n(h);a(S,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> id<span class="token punctuation">,</span> <span class="token function">COUNT</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">AS</span> num
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
  <span class="token keyword">SELECT</span> requester_id <span class="token keyword">AS</span> id <span class="token keyword">FROM</span> RequestAccepted
  <span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
  <span class="token keyword">SELECT</span> accepter_id <span class="token keyword">AS</span> id <span class="token keyword">FROM</span> RequestAccepted
<span class="token punctuation">)</span> <span class="token keyword">AS</span> all_ids
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span> id
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> num <span class="token keyword">DESC</span>
<span class="token keyword">LIMIT</span> <span class="token number">1</span><span class="token punctuation">;</span></code>`),s(h),f(u,o)}const ks=Object.freeze(Object.defineProperty({__proto__:null,default:us,metadata:nn},Symbol.toStringTag,{value:"Module"})),sn={title:"資料庫正規化",date:"2025-07-24",category:"software",subCategory:"Database",tags:["database","normalization","sql"],slug:"db_normalization"},{title:It,date:Pt,category:Tt,subCategory:Et,tags:At,slug:xt}=sn;var rs=y(`<h6>透過拆分、建立正確的鍵與相依關係來消除資料重複與異常的設計原則</h6> <hr/> <h2>正規化等級</h2> <p>1NF 每個欄位都必須是原子值（不可包含多值，例如逗號分隔或陣列）</p> <pre class="language-text"><!></pre> <p>2NF 滿足 1NF，所有非主鍵欄位必須完全依賴主鍵，不能只依賴主鍵的一部分（常發生在複合主鍵情況）</p> <p>錯誤 (複合主鍵 OrderID + ProductID，但 OrderDate 只依賴 OrderID)</p> <pre class="language-text"><!></pre> <p>因為 OrderDate 只依賴 OrderID，所以應該從明細表中拆出來，存放在訂單主檔中。</p> <pre class="language-text"><!></pre> <p>3NF 滿足 2NF 非主鍵欄位不能依賴其他非主鍵欄位（即無傳遞依賴）</p> <p>錯誤：這裡 DeptName 是依賴 DeptID，但 DeptID 不是主鍵 → 傳遞依賴</p> <pre class="language-text"><!></pre> <p>正確做法：將 DeptID → DeptName 拆到 Department 表</p> <pre class="language-text"><!></pre> <p>BCNF（Boyce-Codd Normal Form / 3.5NF）滿足 3NF，所有函數依賴的左側必須是超鍵（Super Key）</p> <p>錯誤 (Course → Room、Instructor → Room 同時存在，但都不是超鍵，則違反 BCNF。)</p> <pre class="language-text"><!></pre> <p>拆成兩張表，每個依賴的左側都變成主鍵（超鍵）：</p> <pre class="language-text"><!></pre> <p>4NF 無多值依賴（Multivalued Dependency），若一欄對應多值且彼此無關，應拆表避免組合膨脹</p> <p>錯誤 Crust 與 Area 無關，造成笛卡兒組合</p> <pre class="language-text"><!></pre> <p>正確 拆成兩張表</p> <pre class="language-text"><!></pre> <p>5NF 滿足 4NF，並確保將資料拆成多個子關係後，再重新 join 回來時不會產生多餘資料（避免 join loss）。
常見於 三元以上關聯（例如三欄組合關係）。</p> <p>假設你用以下三張表建構資料：</p> <pre class="language-text"><!></pre> <p>在滿足 5NF 的設計中，會保留一張三元關聯表來表達實際的資料：</p> <pre class="language-text"><!></pre>`,1);function is(u){var o=rs(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-text">錯誤
UserId | Hobby
-------|--------
1      | &quot;reading, swimming, coding&quot;

正確
UserId | Hobby
-------|--------
1      | reading
1      | swimming
1      | coding</code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-text">OrderID | ProductID | OrderDate
--------|-----------|------------
1001    | A1        | 2025-07-01
1001    | A2        | 2025-07-01</code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-text">-- 訂單主檔（Order）
OrderID | OrderDate
--------|------------
1001    | 2025-07-01

-- 訂單明細檔（OrderDetail）
OrderID | ProductID
--------|-----------
1001    | A1
1001    | A2</code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-text">StudentID | DeptID | DeptName
----------|--------|----------
1001      | D01    | Computer Science</code>`),s(l);var i=t(l,4),w=n(i);a(w,()=>`<code class="language-text">StudentID | DeptID
----------|--------
1001      | D01
1002      | D02

DeptID | DeptName
-------|--------------------
D01    | Computer Science
D02    | Electrical Engineering</code>`),s(i);var m=t(i,6),_=n(m);a(_,()=>`<code class="language-text">Course | Instructor | Room
-------|------------|-----
DB     | Smith      | R1
DB     | Jones      | R2</code>`),s(m);var h=t(m,4),S=n(h);a(S,()=>`<code class="language-text">-- 課程與教室（CourseRoom）
Course | Room
-------|-----
DB     | R1

-- 講師與教室（InstructorRoom）
Instructor | Room
-----------|-----
Smith      | R1</code>`),s(h);var b=t(h,6),I=n(b);a(I,()=>`<code class="language-text">錯誤
Restaurant | Crust   | Area
-----------|---------|--------
X Pizza    | Thick   | Downtown
X Pizza    | Stuffed | Downtown
X Pizza    | Thick   | Uptown
X Pizza    | Stuffed | Uptown</code>`),s(b);var C=t(b,4),T=n(C);a(T,()=>`<code class="language-text">Restaurant | Crust
Restaurant | Area</code>`),s(C);var R=t(C,6),E=n(R);a(E,()=>`<code class="language-text">-- Supplier-Part
S1 | P1

-- Supplier-Project
S1 | J1

-- Part-Project
P1 | J1

-- 拼出來的關聯（有可能是錯的）
Supplier | Part | Project
---------|------|---------
S1       | P1   | J1  （合理）
S1       | P1   | J2  （若 J2 並不屬於 P1）</code>`),s(R);var D=t(R,4),A=n(D);a(A,()=>`<code class="language-text">-- Supplier-Part-Project
Supplier | Part | Project
---------|------|---------
S1       | P1   | J1</code>`),s(D),f(u,o)}const ds=Object.freeze(Object.defineProperty({__proto__:null,default:is,metadata:sn},Symbol.toStringTag,{value:"Module"})),an={title:"關聯式資料庫",date:"2025-06-22",category:"software",subCategory:"Database",tags:["database","db","sql"],slug:"db_relational"},{title:Ot,date:Nt,category:Lt,subCategory:$t,tags:qt,slug:Ft}=an;var gs=y('<pre class="language-pgsql"><!></pre> <p>連接 SQL Server 時是透過 TDS（Tabular Data Stream）的通訊協定來交換資料。</p> <ul><li>TDS 是 SQL Server 專用的底層通訊協定，負責在用戶端與資料庫伺服器之間傳遞</li> <li>通常透過 TCP/IP 傳輸，預設使用的連接埠為 1433。</li> <li>用戶端要連接資料庫時，會使用一段 Connection String（連線字串）</li></ul> <pre class="language-pgsql"><!></pre> <h3>Table（資料表）</h3> <p>資料表是資料的儲存核心，每個表由「列（row）」與「欄（column）」構成。</p> <pre class="language-sql"><!></pre> <h3>Primary Key（主鍵）</h3> <p>能唯一標識每一筆資料，一張表只能有一個主鍵，可以是單一欄位或多欄位組成（複合主鍵）。</p> <pre class="language-sql"><!></pre> <h3>Unique Constraint（唯一約束）</h3> <p>限制欄位值不能重複，一張表可以有多個唯一欄位。</p> <pre class="language-sql"><!></pre> <h3>Foreign Key（外鍵）</h3> <pre class="language-sql"><!></pre> <h3>Index（索引）</h3> <p>加速查詢效率，類似書本的目錄，索引可以建立在單一欄位或多個欄位上。</p> <pre class="language-sql"><!></pre>',1);function ms(u){var o=gs(),p=v(o),k=n(p);a(k,()=>`<code class="language-pgsql">SQL Server Instance
├── Database
│   ├── Schema
│   │   ├── Table
│   │   ├── View
│   │   ├── Stored Procedure
│   │   ├── Function
│   │   ├── Synonym
│   │   └── Permissions / Roles
│   └── Security Settings
└── System Databases (master, msdb, model, tempdb)</code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>'<code class="language-pgsql">Server=127.0.0.1,1433;Database=MyDb;User Id=sa;Password=MyPassword;TrustServerCertificate=True;</code>'),s(e);var c=t(e,6),d=n(c);a(d,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Users <span class="token punctuation">(</span>
    Id <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    UserName NVARCHAR<span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    Email NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span><span class="token punctuation">,</span>
    CreatedAt <span class="token keyword">DATETIME</span> <span class="token keyword">DEFAULT</span> GETDATE<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-sql"><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> Users
<span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> PK_Users <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>Id<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,6),w=n(i);a(w,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Products <span class="token punctuation">(</span>
    ProductId <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    SKU NVARCHAR<span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">UNIQUE</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(i);var m=t(i,4),_=n(m);a(_,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Orders <span class="token punctuation">(</span>
    OrderId <span class="token keyword">INT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    UserId <span class="token keyword">INT</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>UserId<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> Users<span class="token punctuation">(</span>Id<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m);var h=t(m,6),S=n(h);a(S,()=>'<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">INDEX</span> IDX_Users_UserName <span class="token keyword">ON</span> Users<span class="token punctuation">(</span>UserName<span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(h),f(u,o)}const ys=Object.freeze(Object.defineProperty({__proto__:null,default:ms,metadata:an},Symbol.toStringTag,{value:"Module"})),tn={title:"SQL Command",date:"2025-06-22",category:"software",subCategory:"Database",tags:["database","db","sql"],slug:"db_sql"},{title:jt,date:Mt,category:Ht,subCategory:Ut,tags:Bt,slug:Vt}=tn;var fs=y('<h3>特性</h3> <ul><li>同步執行：必須有結果才會繼續，報錯會停止。</li> <li>四大分類：<code>SELECT</code> / <code>INSERT</code> / <code>UPDATE</code> / <code>DELETE</code></li> <li><strong>SELECT</strong>：從資料表中篩出符合條件的資料，組成一張新結果表（結果集）。</li></ul> <h3>查詢最小單元範例</h3> <pre class="language-sql"><!></pre> <h3>常用子句與函數</h3> <ul><li><code>WHERE</code>：條件篩選</li> <li><code>ORDER BY</code>：排序</li> <li><code>LIMIT</code> / <code>TOP</code>：只取前幾筆（需搭配 <code>ORDER BY</code>）</li> <li><code>DISTINCT</code>：唯一值</li> <li><code>LIKE</code>：模糊搜尋</li> <li><code>AS</code>：欄位命名別名</li> <li><code>GROUP BY</code> + <code>HAVING</code>：群組後條件</li> <li>聚合函數：<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MAX</code>, <code>MIN</code></li></ul> <h3>LEFT JOIN</h3> <p><code>LEFT JOIN = INNER JOIN + 左表未對應資料（右表為 NULL）</code></p> <h3>RIGHT JOIN</h3> <p>同 <code>LEFT JOIN</code>，只是語法方向相反</p> <h3>FULL OUTER JOIN</h3> <p><code>LEFT JOIN</code> + <code>RIGHT JOIN</code>（合併後去重）</p> <h3>CROSS JOIN</h3> <p>所有組合（兩表 row 數乘積）</p> <p><strong>應用場景：</strong></p> <table><thead><tr><th>Color</th><th>Size</th></tr></thead><tbody><tr><td>Red</td><td>S</td></tr><tr><td>Red</td><td>M</td></tr><tr><td>Red</td><td>L</td></tr><tr><td>Blue</td><td>S</td></tr><tr><td>Blue</td><td>M</td></tr><tr><td>Blue</td><td>L</td></tr></tbody></table> <h3>SELF JOIN</h3> <pre class="language-sql"><!></pre> <p>同一張表內查上下屬關係</p> <h3>APPLY（SQL Server 專用）</h3> <ul><li><code>CROSS APPLY</code>：類似 <code>INNER JOIN</code>，但可動態過濾副表</li> <li><code>OUTER APPLY</code>：類似 <code>LEFT JOIN</code>，但可動態過濾副表</li></ul>',1);function ws(u){var o=fs(),p=t(v(o),6),k=n(p);a(k,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> id <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> status_id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> name<span class="token punctuation">,</span> email <span class="token keyword">FROM</span> users<span class="token punctuation">;</span></code>`),s(p);var e=t(p,28),r=n(e);a(r,()=>`<code class="language-sql"><span class="token keyword">SELECT</span> 
  A<span class="token punctuation">.</span>name <span class="token keyword">AS</span> employee<span class="token punctuation">,</span>
  B<span class="token punctuation">.</span>name <span class="token keyword">AS</span> manager
<span class="token keyword">FROM</span> Employees A
<span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> Employees B <span class="token keyword">ON</span> A<span class="token punctuation">.</span>manager_id <span class="token operator">=</span> B<span class="token punctuation">.</span>id<span class="token punctuation">;</span></code>`),s(e),P(6),f(u,o)}const hs=Object.freeze(Object.defineProperty({__proto__:null,default:ws,metadata:tn},Symbol.toStringTag,{value:"Module"})),pn={title:"資料庫表單設計",date:"2025-06-22",category:"software",subCategory:"Database",tags:["database","db","sql"],slug:"db_table_1"},{title:Wt,date:zt,category:Yt,subCategory:Kt,tags:Gt,slug:Xt}=pn;var vs=y('<h3>Recursive Hierarchy</h3> <p>需要儲存的資料性質為能夠</p> <ul><li>ID</li> <li>辨識父節點的 ID</li> <li>其他業務欄位一樣（如名稱、排序、狀態…）</li></ul> <h3>鄰接表 Adjacency List</h3> <p>表單內欄位直接標示 <code>UpCode</code></p> <table><thead><tr><th>ID</th><th>UpCode</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td>NULL</td><td>電子產品</td></tr><tr><td>2</td><td>1</td><td>手機</td></tr><tr><td>3</td><td>1</td><td>筆記型電腦</td></tr><tr><td>4</td><td>2</td><td>智慧型手機</td></tr></tbody></table> <pre class="language-sql"><!></pre> <h3>Nested Set</h3> <p>用樹狀的概念來分類表，查找快速但新增和修改不容易維護</p> <pre class="language-scss"><!></pre> <table><thead><tr><th>ID</th><th>Name</th><th>Lft</th><th>Rgt</th></tr></thead><tbody><tr><td>1</td><td>類別A</td><td>1</td><td>6</td></tr><tr><td>3</td><td>子類A1</td><td>2</td><td>3</td></tr><tr><td>4</td><td>子類A2</td><td>4</td><td>5</td></tr><tr><td>2</td><td>類別B</td><td>7</td><td>10</td></tr><tr><td>5</td><td>子類B1</td><td>8</td><td>9</td></tr></tbody></table> <pre class="language-sql"><!></pre> <h3>Materialized Path（路徑枚舉）</h3> <p>使用似 URL 的方式管理</p> <table><thead><tr><th>ID</th><th>Path</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td><code>/1/</code></td><td>電子產品</td></tr><tr><td>2</td><td><code>/1/2/</code></td><td>手機</td></tr><tr><td>4</td><td><code>/1/2/4/</code></td><td>智慧型手機</td></tr><tr><td>3</td><td><code>/1/3/</code></td><td>筆記型電腦</td></tr></tbody></table> <pre class="language-sql"><!></pre> <h3>Closure Table（關係表）</h3> <pre class="language-sql"><!></pre> <pre class="language-scss"><!></pre> <ul><li><p>Category table</p> <table><thead><tr><th>ID</th><th>Name</th></tr></thead><tbody><tr><td>1</td><td>A</td></tr><tr><td>2</td><td>B</td></tr><tr><td>3</td><td>C</td></tr><tr><td>4</td><td>D</td></tr></tbody></table></li> <li><p>CategoryClosure</p> <table><thead><tr><th>Ancestor</th><th>Descendant</th><th>Depth</th><th></th></tr></thead><tbody><tr><td>1</td><td>1</td><td>0</td><td>← A→A</td></tr><tr><td>2</td><td>2</td><td>0</td><td>← B→B</td></tr><tr><td>3</td><td>3</td><td>0</td><td>← C→C</td></tr><tr><td>4</td><td>4</td><td>0</td><td>← D→D</td></tr><tr><td>1</td><td>2</td><td>1</td><td>← A→B</td></tr><tr><td>1</td><td>3</td><td>1</td><td>← A→C</td></tr><tr><td>2</td><td>4</td><td>1</td><td>← B→D</td></tr><tr><td>1</td><td>4</td><td>2</td><td>← A→D</td></tr></tbody></table></li></ul> <p>查詢</p> <pre class="language-sql"><!></pre> <p>插入</p> <ul><li>主表先 INSERT 一筆新節點，取得它的 ID = @newId</li></ul> <pre class="language-sql"><!></pre> <p>刪除</p> <ul><li>先刪除 Closure Table 中任何以該節點為 Ancestor 或 Descendant 的紀錄，然後刪除主表中的那筆節點</li></ul>',1);function bs(u){var o=vs(),p=t(v(o),12),k=n(p);a(k,()=>`<code class="language-sql">
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
</code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-scss">1. 類別A <span class="token punctuation">(</span>ID=1<span class="token punctuation">)</span>
   ├─ 子類A1 <span class="token punctuation">(</span>ID=3<span class="token punctuation">)</span>
   └─ 子類A2 <span class="token punctuation">(</span>ID=4<span class="token punctuation">)</span>

2. 類別B <span class="token punctuation">(</span>ID=2<span class="token punctuation">)</span>
   └─ 子類B1 <span class="token punctuation">(</span>ID=5<span class="token punctuation">)</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> CategoryNested <span class="token punctuation">(</span>
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
<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,4),w=n(i);a(w,()=>`<code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Category <span class="token punctuation">(</span>
  ID   <span class="token keyword">BIGINT</span>        <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
  Name NVARCHAR<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> CategoryClosure <span class="token punctuation">(</span>
  Ancestor   <span class="token keyword">BIGINT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 祖先節點</span>
  Descendant <span class="token keyword">BIGINT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 後代節點</span>
  Depth      <span class="token keyword">INT</span>    <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>  <span class="token comment">-- 兩者間距離：0 = 自己</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>Ancestor<span class="token punctuation">,</span> Descendant<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(i);var m=t(i,2),_=n(m);a(_,()=>`<code class="language-scss">A <span class="token punctuation">(</span>ID=1<span class="token punctuation">)</span>
├─ B <span class="token punctuation">(</span>ID=2<span class="token punctuation">)</span>
│   └─ D <span class="token punctuation">(</span>ID=4<span class="token punctuation">)</span>
└─ C <span class="token punctuation">(</span>ID=3<span class="token punctuation">)</span></code>`),s(m);var h=t(m,6),S=n(h);a(S,()=>`<code class="language-sql"><span class="token comment">-- 查詢某節點的所有後代（含自己）</span>
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
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span> cc<span class="token punctuation">.</span>Depth<span class="token punctuation">;</span></code>`),s(h);var b=t(h,6),I=n(b);a(I,()=>`<code class="language-sql"><span class="token comment">-- 對所有 ancestor of parentId，插入新後代關係</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> CategoryClosure <span class="token punctuation">(</span>Ancestor<span class="token punctuation">,</span> Descendant<span class="token punctuation">,</span> Depth<span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> Ancestor<span class="token punctuation">,</span> <span class="token variable">@newId</span><span class="token punctuation">,</span> Depth <span class="token operator">+</span> <span class="token number">1</span>
<span class="token keyword">FROM</span> CategoryClosure
<span class="token keyword">WHERE</span> Descendant <span class="token operator">=</span> <span class="token variable">@parentId</span><span class="token punctuation">;</span>

<span class="token comment">-- 再插一筆自己到自己的對應</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> CategoryClosure <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token variable">@newId</span><span class="token punctuation">,</span> <span class="token variable">@newId</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(b),P(4),f(u,o)}const _s=Object.freeze(Object.defineProperty({__proto__:null,default:bs,metadata:pn},Symbol.toStringTag,{value:"Module"})),on={title:"POS機金流處理",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["金流","backend","payment"],slug:"cashflow"},{title:Jt,date:Qt,category:Zt,subCategory:np,tags:sp,slug:ap}=on;var Cs=y(`<h6>POS機金流商串接流程</h6> <hr/> <p><a href="https://github.com/cao0085/code-pattern/tree/main/cashflow" rel="nofollow">相關程式碼</a></p> <h3>實踐重點</h3> <ul><li><strong>交易一致性</strong>：更新多張表時務必使用 Transaction。</li> <li><strong>完整留痕</strong>：Request/Response 原文（或至少摘要＋關鍵欄位）存檔，方便日後對帳與疑難排解。</li> <li><strong>Idempotency</strong>：以自家訂單編號（orderId）做遞送重試時的唯一索引，避免重複請款/退款。</li> <li><strong>錯誤碼映射表</strong>：將 PP 的 ReturnCode 對應到自家錯誤碼與訊息，集中管理。</li> <li><strong>人工介入流程</strong>：人工處理的狀況，要有後台工具或警示流程。</li> <li><strong>查詢補償機制</strong>：定時 Job/手動工具執行 Query，同步漏單、退款差額。</li></ul> <h3>主要流程</h3> <p><code>Request =&gt; Pre-commit / record original state =&gt; Response Logging =&gt; State Machine =&gt; Commit</code></p> <p><code>*** pp = Payment Provider</code></p> <h3>發送交易 / 退款</h3> <h3>HTTP Request Skeleton</h3> <ul><li>依 PP 文件將必要 Header（例如 ChannelId / Secret…）與 Body JSON 組起來。</li> <li>這層邏輯最好抽成共用：<code>GenerateProviderRequest(method, url, envConfig)</code>。</li> <li>若有簽章/加密，放在這層集中處理（本案沒有，就預留 Hook）。</li></ul> <pre class="language-csharp"><!></pre> <h3>Pre-commit</h3> <p>先在自家 DB 建立一筆「金流交易主檔（含交易序號、金額、初始狀態等），<code>Commit()</code> 後再呼叫 PP，若網路或對方故障，你仍有一筆記錄可查，方便後續查詢/補單/人工處理。</p> <pre class="language-csharp"><!></pre> <h3>SendRequest</h3> <p><code>SendRequestAsync(req)</code> 後，先檢查是否為預期內的回應(成功/失敗…)，記錄 Log（含狀態碼與錯誤訊息）</p> <pre class="language-csharp"><!></pre> <h3>State Machine</h3> <p>邏輯判斷回傳資訊，與 DB 互動（更新狀態、寫入明細）包在 Transaction 中，確保一致性。</p> <pre class="language-csharp"><!></pre> <br/> <h3>查詢交易狀態</h3> <p>若在發送請求時遇到網路異常、非預期回應，通常會用查詢確認金流商最新狀態，把金流商回應的狀態和自家資料庫比對/修改。</p> <p>這邊可以根據自己的需求定義成純查詢/查詢必定同步更新等等。</p> <br/> <h3>Finite State Machine</h3> <p>金流處理也適合導入有限狀態機的概念，因為資料變更會是有條件的例如</p> <ul><li><p>付款待確認
-可變成: 付款成功、付款失敗、付款取消
-不可變成: 退款、退款失敗</p></li> <li><p>付款成功
-可變成: 退款、退款失敗
-不可變成: 付款待確認、付款失敗、付款取消</p></li></ul> <p>…</p>`,1);function Ss(u){var o=Cs(),p=t(v(o),22),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> req <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpRequestMessage</span><span class="token punctuation">(</span>HttpMethod<span class="token punctuation">.</span>Post<span class="token punctuation">,</span> fullUrl<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">></span> req<span class="token punctuation">.</span>Headers<span class="token punctuation">.</span><span class="token function">TryAddWithoutValidation</span><span class="token punctuation">(</span><span class="token string">"X-Provider-Id"</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span>ChannelId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">></span> req<span class="token punctuation">.</span>Headers<span class="token punctuation">.</span><span class="token function">TryAddWithoutValidation</span><span class="token punctuation">(</span><span class="token string">"X-Provider-Secret"</span><span class="token punctuation">,</span> env<span class="token punctuation">.</span>Secret<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">></span> req<span class="token punctuation">.</span>Content <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">StringContent</span><span class="token punctuation">(</span>bodyJson<span class="token punctuation">,</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">,</span> <span class="token string">"application/json"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>'<code class="language-csharp">db<span class="token punctuation">.</span><span class="token function">SaveChanges</span><span class="token punctuation">(</span>payInfo<span class="token punctuation">)</span></code>'),s(e);var c=t(e,6),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> res <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">SendAsync</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span>HttpCompletionOption<span class="token punctuation">.</span>ResponseHeadersRead<span class="token punctuation">,</span>ct<span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(c);var l=t(c,6),g=n(l);a(g,()=>`<code class="language-csharp"><span class="token keyword">switch</span> <span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">.</span>ReturnCode<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">case</span> <span class="token string">"0000"</span><span class="token punctuation">:</span> <span class="token comment">// 成功處理 =></span>
    <span class="token keyword">case</span> <span class="token string">"1165"</span><span class="token punctuation">:</span> <span class="token comment">// 失敗處理 =></span>
    <span class="token keyword">case</span> <span class="token string">"xxxx"</span><span class="token punctuation">:</span> <span class="token comment">// 例外處理 ...</span>
    <span class="token comment">//...</span>
<span class="token punctuation">&#125;</span>
<span class="token keyword">await</span> db<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">CommitAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> Response<span class="token punctuation">;</span></code>`),s(l),P(18),f(u,o)}const Rs=Object.freeze(Object.defineProperty({__proto__:null,default:Ss,metadata:on},Symbol.toStringTag,{value:"Module"})),en={title:"Download PDF",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["pdf","js","dom"],slug:"jsPDF"},{title:tp,date:pp,category:op,subCategory:ep,tags:cp,slug:lp}=en;var Ds=y('<h6>紀錄下載影像相關處理</h6> <hr/> <h3>畫面截圖（html2canvas、dom-to-image…）</h3> <p>原理大多是用<code>document.query(ID / class)</code>抓取指定的<code>DOM</code>，在套件內<strong>模擬</strong>JS排版樣式引擎(所以可能會跑版)，繪圖在 HTML<code>&lt;canvas&gt;</code>Element 後再轉成 base64/Blob 格式輸出。</p> <p>要注意的是瀏覽器對於能當作繪製<code>&lt;canvas&gt;</code>的來源控管較為嚴格，例如在瀏覽器渲染的 img 來源可以使用，套件內被擋下來的問題，再來就是錯誤是發生在套件內部不好除錯。</p> <h3>向量型（jsPDF、pdf-lib…）</h3> <p>用程式碼直接描述格線、文字 ，也可以插入圖片當作背景。要注意的一樣是外部來源的合法(圖片、字體)，圖片可先在.js 轉換成 base64 當作來源給套件使用，減少套件內轉換失敗的風險。</p> <h3>jsPDF</h3> <p>添加字體方式有兩種方式讀取.ttf和.js，一樣讓套件讀取處理過的資源部屬比較穩定</p> <p>網站下載 .ttf 字體向量檔案</p> <pre class="language-js"><!></pre> <p>把 .ttf 轉成.js 再import到模組，因為字型檔案很大要用到再載入就好</p> <pre class="language-js"><!></pre> <p>圖片轉URL</p> <pre class="language-js"><!></pre> <p>下載和預覽</p> <pre class="language-js"><!></pre> <p><a href="https://github.com/cao0085/code-pattern/tree/main/fronted-pdf-download" rel="nofollow">相關程式碼</a></p>',1);function Is(u){var o=Ds(),p=t(v(o),20),k=n(p);a(k,()=>`<code class="language-js"><span class="token comment">// var pdfDoc = 建立一個 jsPDF 提供的物件(&#123; unit: 'mm', format: 'a4' &#125;)</span>
pdfDoc<span class="token punctuation">.</span><span class="token function">addFont</span><span class="token punctuation">(</span><span class="token string">'./eduSong_Unicode.ttf'</span><span class="token punctuation">,</span> <span class="token string">'eduSong_Unicode'</span><span class="token punctuation">,</span> <span class="token string">'normal'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pdfDoc<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token string">'eduSong_Unicode'</span><span class="token punctuation">,</span> <span class="token string">'normal'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-js"><span class="token comment">// 有呼叫函式再import</span>
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
pdfDoc<span class="token punctuation">.</span><span class="token function">setFont</span><span class="token punctuation">(</span><span class="token string">'eduSong_Unicode'</span><span class="token punctuation">,</span> <span class="token string">'normal'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-js"><span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadImage</span><span class="token punctuation">(</span>targetImage<span class="token punctuation">)</span><span class="token punctuation">;</span>
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
pdfDoc<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token string">"fileName.pdf"</span><span class="token punctuation">)</span></code>`),s(l),P(2),f(u,o)}const Ps=Object.freeze(Object.defineProperty({__proto__:null,default:Is,metadata:en},Symbol.toStringTag,{value:"Module"})),cn={title:"多個 PDF 檔案合併",date:"2025-09-16",category:"software",subCategory:"開發筆記",tags:["pdf","backend","command"],slug:"pdfmarge"},{title:up,date:kp,category:rp,subCategory:ip,tags:dp,slug:gp}=cn;var Ts=y('<h6><a href="https://github.com/cao0085/pdfMerger" rel="nofollow">Repository</a> ，Python 執行相容性比較好，C# UI方便友善</h6> <hr/> <h3>C#</h3> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre> <h3>Python3</h3> <pre class="language-bash"><!></pre> <pre class="language-python"><!></pre>',1);function Es(u){var o=Ts(),p=t(v(o),6),k=n(p);a(k,()=>`<code class="language-csharp">  <span class="token comment">// .csproj</span>
<span class="token operator">&lt;</span>ItemGroup<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"itext7"</span> Version<span class="token operator">=</span><span class="token string">"8.0.5"</span> <span class="token operator">/</span><span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"itext7.bouncy-castle-adapter"</span> Version<span class="token operator">=</span><span class="token string">"8.0.5"</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>ItemGroup<span class="token operator">></span></code>`),s(p);var e=t(p,2),r=n(e);a(r,()=>`<code class="language-csharp"><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
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
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-bash">pip <span class="token function">install</span> pypdf
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
    merge_pdfs<span class="token punctuation">(</span><span class="token punctuation">)</span></code>`),s(l),f(u,o)}const As=Object.freeze(Object.defineProperty({__proto__:null,default:Es,metadata:cn},Symbol.toStringTag,{value:"Module"})),ln={title:"SFTP、FTPS C# 連線測試",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["tcp","ip","container"],slug:"sftp_ftps"},{title:mp,date:yp,category:fp,subCategory:wp,tags:hp,slug:vp}=ln;var xs=y('<h6>紀錄本地端測試方法</h6> <hr/> <h3>SFTP</h3> <p>docker-compose.yml</p> <pre class="language-yml"><!></pre> <pre class="language-csharp"><!></pre> <h3>FTPS</h3> <pre class="language-csharp"><!></pre> <p>docker-compose.yml</p> <pre class="language-yml"><!></pre>',1);function Os(u){var o=xs(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-yml"><span class="token key atrule">services</span><span class="token punctuation">:</span>
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
      <span class="token punctuation">-</span> SFTP_USERS=user01<span class="token punctuation">:</span>password01<span class="token punctuation">:</span><span class="token number">1001</span>  <span class="token comment"># 設置 SFTP 用戶</span></code>`),s(p);var e=t(p,2),r=n(e);a(r,()=>`<code class="language-csharp"><span class="token keyword">using</span> <span class="token namespace">Renci<span class="token punctuation">.</span>SshNet</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> ftpsClient <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FtpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped</code>`),s(l),f(u,o)}const Ns=Object.freeze(Object.defineProperty({__proto__:null,default:Os,metadata:ln},Symbol.toStringTag,{value:"Module"})),un={title:"Structurizr C4Model",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["model","UML","ERD"],slug:"structurizr"},{title:bp,date:_p,category:Cp,subCategory:Sp,tags:Rp,slug:Dp}=un;var Ls=y('<h6><a href="https://structurizr.com/" rel="nofollow">Structurizr</a></h6> <hr/> <p><a href="https://github.com/cao0085/code-pattern/tree/main/structurizr" rel="nofollow">File</a></p> <br/> <h3>docker-compose.yml</h3> <p>初次建立和執行會生成基本的專案檔</p> <pre class="language-yml"><!></pre> <h3>workspace.dsl</h3> <pre class="language-text"><!></pre> <h3>index-model.dsl</h3> <p>依序層級，每一層都可以渲染出一張圖</p> <p><code>Variable = softwareSystem "英文字名稱" =&gt; Variable = container "文字"  =&gt; Variable = component "文字"</code></p> <pre class="language-text"><!></pre> <h3>index-model.dsl</h3> <p>指定要渲染哪些 index-model.dsl 裡的 model，且需要降一階處理</p> <p><code>index-model.dsl 裡的 YourSystem = softwareSystem</code></p> <p><code>index-model.dsl 要改成 container YourSystem 來指定</code></p> <pre class="language-text"><!></pre>',1);function $s(u){var o=Ls(),p=t(v(o),12),k=n(p);a(k,()=>`<code class="language-yml">// docker<span class="token punctuation">-</span>compose.yml
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.8'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">structurizr</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> structurizr/lite
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"8080:8080"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> .<span class="token punctuation">:</span>/usr/local/structurizr</code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-text">workspace &quot;YourProjectName&quot; &#123;

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
&#125;</code>`),s(e);var c=t(e,8),d=n(c);a(d,()=>`<code class="language-text">YourSystem = softwareSystem &quot;Name&quot; &#123;
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
&#125;</code>`),s(l),f(u,o)}const qs=Object.freeze(Object.defineProperty({__proto__:null,default:$s,metadata:un},Symbol.toStringTag,{value:"Module"})),kn={title:"XLSL Excel",date:"2025-06-22",category:"software",subCategory:"開發筆記",tags:["XLSL","js","Excel"],slug:"xlsx_excel"},{title:Ip,date:Pp,category:Tp,subCategory:Ep,tags:Ap,slug:xp}=kn;var Fs=y('<h6><a href="https://www.npmjs.com/package/xlsx/v/0.14.1?activeTab=readme" rel="nofollow">xlsx 0.14.1</a></h6> <hr/> <h3>Workbook & Worksheet</h3> <p>單個 Workbook 實例代表一份完整的xsml檔案，Worksheet 代表一頁 xsml的分頁，都可以產多個。</p> <pre class="language-js"><!></pre> <h3>Sheet Content</h3> <pre class="language-js"><!></pre> <h3>Merges</h3> <p>指定哪些儲存格要上下合併</p> <pre class="language-js"><!></pre> <h3>多列合併實作</h3> <ul><li>假設有一筆一對多的資料列</li> <li>分割/合併儲存格的方式在EXCEL上呈現</li></ul> <br/> <p>先處理資料結構</p> <pre class="language-js"><!></pre> <p>處理合併欄位</p> <pre class="language-js"><!></pre> <p>完整流程</p> <pre class="language-js"><!></pre>',1);function js(u){var o=Fs(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token constant">XLSX</span> <span class="token keyword">from</span> <span class="token string">'xlsx'</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-js"><span class="token comment">// Array of Arrays, AOA</span>
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
</code>`),s(e);var c=t(e,6),d=n(c);a(d,()=>`<code class="language-js"><span class="token comment">// s = start / e = end / A1 = &#123;x:0,y:0&#125; / A3 = &#123;x:2,y:0&#125;</span>
worksheet<span class="token punctuation">[</span><span class="token string">'!merges'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">&#123;</span> <span class="token literal-property property">s</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span> <span class="token literal-property property">e</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">&#125;</span> <span class="token punctuation">&#125;</span> 
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 也可以指定座標</span>
<span class="token constant">XLSX</span><span class="token punctuation">.</span>utils<span class="token punctuation">.</span><span class="token function">decode_range</span><span class="token punctuation">(</span><span class="token string">'A1:A3'</span><span class="token punctuation">)</span>
</code>`),s(c);var l=t(c,10),g=n(l);a(g,()=>`<code class="language-js"><span class="token keyword">const</span> orderList <span class="token operator">=</span> <span class="token punctuation">[</span>
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
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,4),w=n(i);a(w,()=>`<code class="language-js"><span class="token keyword">const</span> exportKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'OrderNo'</span><span class="token punctuation">,</span> <span class="token string">'Customer'</span><span class="token punctuation">,</span> <span class="token string">'Product'</span><span class="token punctuation">,</span> <span class="token string">'Quantity'</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// Table Header</span>
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
</code>`),s(i);var m=t(i,4),_=n(m);a(_,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">XLSX</span> <span class="token keyword">from</span> <span class="token string">'xlsx'</span><span class="token punctuation">;</span>

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
<span class="token function">saveAs</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Blob</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">s2ab</span><span class="token punctuation">(</span>wbout<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'application/octet-stream'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">report_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">.xlsx</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m),f(u,o)}const Ms=Object.freeze(Object.defineProperty({__proto__:null,default:js,metadata:kn},Symbol.toStringTag,{value:"Module"})),rn={title:"Basic",date:"2025-06-22",category:"software",subCategory:"Domain-Driven Design",tags:["DDD","backend","design"],slug:"ddd_layer"},{title:Op,date:Np,category:Lp,subCategory:$p,tags:qp,slug:Fp}=rn;var Hs=y(`<h6>事件目的為核心設計模式 Domain-Driven Design</h6> <hr/> <h3>網路層 (Web / Controller)</h3> <p>接收 HTTP Request 入口和 <strong>實例轉發(消息)控制器</strong> 的層面，僅作為轉發者（Request Dispatcher）指定事件指令&回傳格式，不做商業邏輯處理。</p> <pre class="language-csharp"><!></pre> <h3>應用層 (Application / Logic)</h3> <p>主要負責實作 Command / Query / Handler 等指令消息物件，處理商業邏輯。</p> <p><strong>Handler 主要負責</strong></p> <ul><li>取得並操作 Domain 層定義的 Aggregate / Value Object</li> <li>結合外部輸入（如 Request Body DTO），執行業務流程與驗證邏輯</li> <li>將驗證後的資料傳遞至 Infrastructure ，進行資料存取(Repository)或第三方(AuthService)互動</li></ul> <p><strong>實作讀寫分離（CQRS）</strong></p> <ul><li>讀取邏輯（Query + Handler） 可透過 IReadRepository / ReadModel / ViewModel</li> <li>將 Read 專用 Repository Interface 也放置在 Application 層，避免對 Domain 汙染</li></ul> <p><strong>資料物件模型（Data Transfer Object）</strong></p> <ul><li>與 Domain Model（Aggregate / ValueObject）分離，不承擔任何商業規則驗證</li> <li>可搭配 FluentValidation 先進行格式驗證</li> <li>也可作為 Request body/Response 輸出格式 Mapping 對象</li></ul> <h3>事件核心層 (Domain)</h3> <p>DDD 架構的核心，必須完全獨立、不依賴其他層（如 Application / Infrastructure），所有核心邏輯、商業規則、狀態控制都應封裝在這一層。</p> <p><strong>Aggregate Root（聚合根）</strong></p> <ul><li>代表一組關聯物件的 一致性邊界（Consistency Boundary）</li> <li>定義資料規格與唯一性規則（如 ID）</li> <li>驗證狀態轉移是否合理</li> <li>維護領域不變式（Invariant）</li></ul> <p><strong>Value Object（值物件）</strong></p> <ul><li>沒有識別性（ID），補強 Aggregate 的欄位定義，確保欄位規則（格式、範圍）正確性</li> <li>通常不可變（Immutable），常用於輸入驗證與例外處理</li></ul> <p><strong>Factory</strong></p> <ul><li>專責建立 新的 Aggregate 實體，將複雜的初始化規則封裝起來</li> <li>集中初始化的邏輯、避免外部自行 new 對象產生違規狀態</li></ul> <p><strong>Domain Event</strong></p> <ul><li>Aggregate 發出、由 Application Layer 的 Handler 處理後續流程（例如通知、同步、儲存等）</li> <li>保持單向依賴（Domain 發出事件，不處理後續）</li></ul> <p><strong>Interface</strong></p> <ul><li>在 Domain 中定義對外依賴的介面（如 IUserRepository、INotificationService）</li> <li>實作則由 Infrastructure 層提供，以支援 依賴反轉（DIP）原則，讓 Domain 不耦合具體技術細節</li></ul> <h3>基礎層（Infrastructure）</h3> <p>基礎設施 DI Injection & DBContext & Repositroy & Service(JWT) & Outbox …等
同時負責實作 Domain 定義的介面，並將應用程式所需的各類依賴透過 依賴注入（DI） 註冊進容器中。</p>`,1);function Us(u){var o=Hs(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"register"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">Register</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromBody</span></span><span class="token punctuation">]</span> <span class="token class-name">RegisterUserCommand</span> command<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">Ok</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p),P(44),f(u,o)}const Bs=Object.freeze(Object.defineProperty({__proto__:null,default:Us,metadata:rn},Symbol.toStringTag,{value:"Module"})),dn={title:"Mediator",date:"2025-06-22",category:"software",subCategory:"Domain-Driven Design",tags:["DDD","backend","design"],slug:"ddd_mediator"},{title:jp,date:Mp,category:Hp,subCategory:Up,tags:Bp,slug:Vp}=dn;var Vs=y(`<h6>事件驅動搭配中介者模式</h6> <hr/> <h2>MediatR</h2> <p>用於應用程式內部模組之間的指令與事件傳遞，運作於主記憶體中不需外部中介。自身架構處理 Command、Query、Domain Event，也可擴充 IPipelineBehavior 實作驗證、日誌、監控等。若搭配 Outbox 實作，亦可延伸為可靠事件傳遞模式。</p> <pre class="language-csharp"><!></pre> <p>放入自定義的<strong>Command</strong>後，會自動註冊所有 <code>IRequestHandler&lt;,&gt;</code>、<code>INotificationHandler&lt;&gt;</code> 相關的 Handler</p> <pre class="language-csharp"><!></pre> <p><strong>Send 流程（Command / Query）</strong></p> <pre class="language-csharp"><!></pre> <p>背後處理步驟：</p> <ol><li>呼叫 Send() → 取得 command 型別（如 LoginUserCommand）</li> <li>檢查快取中有沒有 RequestHandlerWrapper<code>&lt;LoginUserCommand, TResult&gt;</code></li> <li>若無，透過反射產生 Wrapper 並快取</li> <li>Wrapper 使用 DI container (ServiceFactory) 找出對應的 LoginUserCommandHandler</li> <li>包上所有 IPipelineBehavior（如 Logging / Validation）</li> <li>呼叫 Handle() 執行實際邏輯</li></ol> <p><strong>Publish 流程（Event）</strong></p> <p>會呼叫所有註冊的 INotificationHandler<code>&lt;UserLoggedInNotification&gt;</code> 處理器
適合用於事件廣播 / DomainEvent 傳遞（例如搭配 Outbox）</p> <pre class="language-csharp"><!></pre> <p><strong>Controller 呼叫</strong></p> <pre class="language-csharp"><!></pre> <p><strong>IPipelineBehavior</strong></p> <p>MediatR 在處理 Send() 時，會把整個流程包裝在一連串的 IPipelineBehavior<code>&lt;TRequest, TResponse&gt;</code> 中，最後才執行真正的 Handle() 方法。</p> <p><code>Client → [LoggingBehavior] → [ValidationBehavior] → CommandHandler.Handle()</code></p> <p>每一個 Behavior 都像 Middleware，可以：</p> <ul><li>做前置驗證（FluentValidation）</li> <li>加入日誌記錄（ILogger）</li> <li>加入監控（OpenTelemetry, AppInsights）</li> <li>加入自定義錯誤處理、授權檢查</li></ul> <pre class="language-csharp"><!></pre> <br/> <h2>MassTransit</h2> <p>適合分散式系統中的服務間訊息通訊，需外部 message broker（如 RabbitMQ、Kafka）。支援 Command / Event 發送，可串接 Retry、延遲隊列、DeadLetter 等進階功能，常用於微服務間傳遞資料、非同步背景處理等情境。</p> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre> <p><strong>Send()</strong></p> <pre class="language-csharp"><!></pre> <p><strong>Publish()</strong></p> <pre class="language-csharp"><!></pre> <p><strong>Middleware pipeline</strong></p> <pre class="language-csharp"><!></pre> <pre class="language-csharp"><!></pre>`,1);function Ws(u){var o=Vs(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-csharp"><span class="token comment">//.csproj</span>
<span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"MediatR"</span> Version<span class="token operator">=</span><span class="token string">"12.5.0"</span> <span class="token operator">/</span><span class="token operator">></span>

<span class="token comment">//Program.cs</span>
builder<span class="token punctuation">.</span><span class="token function">InstallMediatR</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-csharp"><span class="token comment">// Infrastructure/Installers/MediatRInstaller.cs</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InstallMediatR</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token class-name">WebApplicationBuilder</span> builder<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddMediatR</span><span class="token punctuation">(</span>cfg <span class="token operator">=></span>
    <span class="token punctuation">&#123;</span>
        cfg<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">RegisterServicesFromAssemblyContaining</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>LoginUserCommand<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">RegisterServicesFromAssemblyContaining</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>RefreshTokenCommand<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>'<code class="language-csharp"><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">LoginUserCommand</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token string">"pwd"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(c);var l=t(c,10),g=n(l);a(g,()=>'<code class="language-csharp"><span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserLoggedInNotification</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(l);var i=t(l,4),w=n(i);a(w,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">Login</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromBody</span></span><span class="token punctuation">]</span> <span class="token class-name">LoginUserCommand</span> command<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> _mediator<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">Ok</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,12),_=n(m);a(_,()=>`<code class="language-csharp">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddTransient</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IPipelineBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">LoggingBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddTransient</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">IPipelineBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">ValidationBehavior<span class="token punctuation">&lt;</span><span class="token punctuation">,</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(m);var h=t(m,8),S=n(h);a(S,()=>`<code class="language-csharp"><span class="token comment">// .csproj</span>
<span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"MassTransit.AspNetCore"</span> Version<span class="token operator">=</span><span class="token string">"8.1.2"</span> <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token class-name">PackageReference</span> Include<span class="token operator">=</span><span class="token string">"MassTransit.RabbitMQ"</span> Version<span class="token operator">=</span><span class="token string">"8.1.2"</span> <span class="token operator">/</span><span class="token operator">></span></code>`),s(h);var b=t(h,2),I=n(b);a(I,()=>`<code class="language-csharp"><span class="token comment">// Program.cs</span>
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
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(b);var C=t(b,4),T=n(C);a(T,()=>'<code class="language-csharp"><span class="token keyword">await</span> _sendEndpoint<span class="token punctuation">.</span><span class="token function">Send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">GenerateInvoice</span> <span class="token punctuation">&#123;</span> OrderId <span class="token operator">=</span> <span class="token string">"123"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(C);var R=t(C,4),E=n(R);a(E,()=>'<code class="language-csharp"><span class="token keyword">await</span> _publishEndpoint<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserCreated</span> <span class="token punctuation">&#123;</span> UserId <span class="token operator">=</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>'),s(R);var D=t(R,4),A=n(D);a(A,()=>`<code class="language-csharp">cfg<span class="token punctuation">.</span><span class="token function">ConfigureMediator</span><span class="token punctuation">(</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> cfg<span class="token punctuation">)</span> <span class="token operator">=></span>
    <span class="token punctuation">&#123;</span>
        <span class="token comment">// 驗證資料結構</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">ValidationFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">LoggingFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">RedisFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">EventsFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cfg<span class="token punctuation">.</span><span class="token function">UseConsumeFilter</span><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">HtmlSanitizerFilter<span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> context<span class="token punctuation">,</span> x <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">Include</span><span class="token punctuation">(</span>type <span class="token operator">=></span> <span class="token operator">!</span>type<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">HasInterface</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDomainEvent<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(D);var x=t(D,2),N=n(x);a(N,()=>`<code class="language-csharp"><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">HttpPost</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"register"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">Register</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FromServices</span></span><span class="token punctuation">]</span> <span class="token class-name">IPublishEndpoint</span> publishEndpoint<span class="token punctuation">)</span>
<span class="token punctuation">&#123;</span>
    <span class="token keyword">await</span> publishEndpoint<span class="token punctuation">.</span><span class="token function">Publish</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">CreateUser</span> <span class="token punctuation">&#123;</span> UserName <span class="token operator">=</span> <span class="token string">"tony"</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">Ok</span><span class="token punctuation">(</span><span class="token string">"Published!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(x),f(u,o)}const zs=Object.freeze(Object.defineProperty({__proto__:null,default:Ws,metadata:dn},Symbol.toStringTag,{value:"Module"})),gn={title:"Outbox Message",date:"2025-06-23",category:"software",subCategory:"Domain-Driven Design",tags:["DDD","backend","design"],slug:"ddd_outbox"},{title:Wp,date:zp,category:Yp,subCategory:Kp,tags:Gp,slug:Xp}=gn;var Ys=y('<h6>拆分主副邏輯，同時保持資料同步性</h6> <hr/> <h2>SideEffect</h2> <p>若把 DDD 流程中的主副行為拆分：</p> <ul><li>創建員工帳戶的時候 <code>&lt;TABLE_Employee&gt;</code> 新增一筆資料</li> <li>幫對應到的 <code>&lt;TABLE_Department&gt;_Headcount</code> 總人數加一</li></ul> <br/> <p>若是以依照 MVC 架構會是</p> <pre class="language-csharp"><!></pre> <p>用 DDD 寫則變成是</p> <pre class="language-csharp"><!></pre> <p>假設創建員工帳號變為須更新 5-10 張表單,函式會越來越巨大、複雜且難以測試與維護。透過 DDD 的 Domain Event 拆解副作用邏輯可異步處理，減少主流程延遲。</p> <h2>ASIO 原子性（Atomicity of Side-Effect & IO）</h2> <p>剛剛提到的行為，主邏輯成功時無法保證所有副作用（如更新部門、發送通知等）都成功執行，這違反了分散系統中常見的 資料一致性與原子性要求。</p> <p>解決方法是設計一張資料庫新表<code>&lt;DB_Outbox_Message&gt;</code>，在一筆交易中提交主邏輯與事件，且把事件訊息<code>(Event、Payload、Time)</code>寫入這張表。這樣執行失敗也有紀錄可以查驗，也可設計失敗的 Retry 機制。</p> <br/> <p>主要實踐方法是用背景應用重複執行，訪問 DB_Outbox_Message 執行該事件</p> <pre class="language-csharp"><!></pre>',1);function Ks(u){var o=Ys(),p=t(v(o),14),k=n(p);a(k,()=>`<code class="language-csharp">db_Employee<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
db_Department<span class="token punctuation">.</span><span class="token function">AddOrUpdate</span><span class="token punctuation">(</span>x <span class="token operator">=></span> x<span class="token punctuation">.</span>Id <span class="token operator">==</span> data<span class="token punctuation">.</span>DepartmentId<span class="token punctuation">,</span> dept <span class="token operator">=></span> dept<span class="token punctuation">.</span>HandCount <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">Commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-csharp"><span class="token comment">// Application Layer</span>
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
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,14),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OutboxDispatcherBackgroundService</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">BackgroundService</span></span>
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
<span class="token punctuation">&#125;</span></code>`),s(c),f(u,o)}const Gs=Object.freeze(Object.defineProperty({__proto__:null,default:Ks,metadata:gn},Symbol.toStringTag,{value:"Module"})),mn={title:"插入 3D 影像",date:"2025-08-13",category:"software",subCategory:"Frontend",tags:["css","fronted","web"],slug:"css"},{title:Jp,date:Qp,category:Zp,subCategory:no,tags:so,slug:ao}=mn;var Xs=y(`<h6><a href="https://designsystem.digital.gov/" rel="nofollow">U.S. Web Design System</a></h6> <hr/> <h3>匯入 .glb</h3> <p>透過用 three.js 匯入
Canvas ➜ WebGL ➜ Three.js ➜ GLB 模型 ➜ GPU 顯示</p> <pre class="language-js"><!></pre>`,1);function Js(u){var o=Xs(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-js">  <span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> <span class="token constant">THREE</span> <span class="token keyword">from</span> <span class="token string">'three'</span><span class="token punctuation">;</span>
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
  <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(p),f(u,o)}const Qs=Object.freeze(Object.defineProperty({__proto__:null,default:Js,metadata:mn},Symbol.toStringTag,{value:"Module"})),yn={title:"Basic",date:"2025-06-22",category:"software",subCategory:"Angular18",tags:["fronted","angular","layout"],slug:"angular_basic"},{title:to,date:po,category:oo,subCategory:eo,tags:co,slug:lo}=yn;var Zs=y(`<h6>參考這個<a href="https://github.com/mbejda/AngularFire-Starter-Template" rel="nofollow">專案範本</a>、官方文件學習</h6> <hr/> <p><a href="https://github.com/cao0085/angular-18" rel="nofollow">練習Repository</a></p> <pre class="language-shell"><!></pre> <h3>.component.ts</h3> <p>Component是Angular核心，負責收集要渲染的資料和掛載到指定節點，邏輯函式也是寫在這一層。</p> <pre class="language-ts"><!></pre> <h3>.component.html</h3> <pre class="language-html"><!></pre> <h3>表單處理</h3> <p>傳統資料流處理</p> <p><code>點擊輸入文字 -&gt; 觸發 'input' event -&gt; Calls setValue() -&gt; 'valueChanges' event to observers -&gt; Observers</code></p> <br/> <p>Angular 內保持雙向同步有兩種做法</p> <ol><li><p>Reactive forms (新版主流)</p> <p><code>點擊輸入文字 -&gt; 觸發 FormControl</code></p> <p><code>1. -&gt; Fires a 'valueChanges' event to observers -&gt; Observers</code></p> <p><code>2. -&gt; Notifies the ControlValueAccessor -&gt; Updates the DataValue</code></p></li></ol> <ol start="2"><li><p>Template-Driven forms (NgModel)</p> <p><code>點擊輸入文字 -&gt; 觸發 'input' event -&gt; ControlValueAccessor</code></p> <p><code>1. -&gt; Calls setValue() on the FormControl -&gt; Fires a 'valueChanges' event to observers -&gt; Observers</code></p> <p><code>2. -&gt; Calls viewToModelUpdate() -&gt; NgModel -&gt; Emits an ngModelChange event -&gt; Component -&gt; Component</code></p></li></ol> <p>驗證</p> <pre class="language-js"><!></pre> <pre class="language-js"><!></pre> <h3>投影 Content Projection</h3> <p>主要是讓元件的導入方可以自訂內容插入到這個元件中，就像 React 的 <code>props.children</code>。適合「UI 容器元件 + 插槽」的場景，例如 Dialog、Card、Tab、Layout 等常見 UI 元件。</p> <p>元件容器</p> <pre class="language-ts"><!></pre> <p>使用元件</p> <pre class="language-ts"><!></pre> <p>指定該 ClassName 去插入內容取代<code>ng-content</code>,且若沒被指定到<code>ng-content</code>也不會占位</p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre>`,1);function na(u){var o=Zs(),p=t(v(o),6),k=n(p);a(k,()=>`<code class="language-shell">ng generate component hello-world

src/app/hello-world/
├── hello-world.component.ts
├── hello-world.component.html
├── hello-world.component.css
└── hello-world.component.spec.ts</code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">"@angular/core"</span><span class="token punctuation">;</span>

    <span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
    selector<span class="token operator">:</span> <span class="token string">"app-item"</span><span class="token punctuation">,</span> <span class="token comment">// 目標的根節點,類似選擇器</span>
    standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否為獨立組件</span>
    imports<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    templateUrl<span class="token operator">:</span> <span class="token string">"./item.component.html"</span><span class="token punctuation">,</span> <span class="token comment">// 要 render 的 html element</span>
    styleUrl<span class="token operator">:</span> <span class="token string">"./item.component.css"</span><span class="token punctuation">,</span> <span class="token comment">// 同上</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
    <span class="token comment">// 傳統JS程式碼寫在這裡 </span>
    <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ItemComponent</span> <span class="token punctuation">&#123;</span>
    
        title <span class="token operator">=</span> <span class="token string">"todo"</span><span class="token punctuation">;</span>
        filter<span class="token operator">:</span> <span class="token string">"all"</span> <span class="token operator">|</span> <span class="token string">"active"</span> <span class="token operator">|</span> <span class="token string">"done"</span> <span class="token operator">=</span> <span class="token string">"all"</span><span class="token punctuation">;</span>
        allItems <span class="token operator">=</span> <span class="token punctuation">[</span>
            <span class="token punctuation">&#123;</span> description<span class="token operator">:</span> <span class="token string">"eat"</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
            <span class="token punctuation">&#123;</span> description<span class="token operator">:</span> <span class="token string">"sleep"</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
            <span class="token punctuation">&#123;</span> description<span class="token operator">:</span> <span class="token string">"play"</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
            <span class="token punctuation">&#123;</span> description<span class="token operator">:</span> <span class="token string">"laugh"</span><span class="token punctuation">,</span> done<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token comment">// 當 filter 改變屬性 return 不同值,用法和 React setState 有點像</span>
        <span class="token keyword">get</span> <span class="token function">items</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>filter <span class="token operator">===</span> <span class="token string">"all"</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>allItems<span class="token punctuation">;</span>
            <span class="token punctuation">&#125;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>allItems<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">=></span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>filter <span class="token operator">===</span> <span class="token string">"done"</span> <span class="token operator">?</span> item<span class="token punctuation">.</span>done <span class="token operator">:</span> <span class="token operator">!</span>item<span class="token punctuation">.</span>done
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>

        <span class="token function">addItem</span><span class="token punctuation">(</span>description<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>allItems<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
                description<span class="token punctuation">,</span>
                done<span class="token operator">:</span> <span class="token boolean">false</span>
            <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-html">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 拿 Component 的 items 來當 Arrary + Render to Element --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>My To Do List<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>What would you like to do today?<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">*ngFor</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>let item of items<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>&#123;&#123;item.description&#125;&#125;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>

        <span class="token comment">&lt;!-- 新增 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>label</span> <span class="token attr-name">for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>addItemInput<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>What would you like to do today?<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>label</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span>
            <span class="token attr-name">#newItem</span>
            <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>add an item<span class="token punctuation">"</span></span>
            <span class="token attr-name">(keyup.enter)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>addItem(newItem.value); newItem.value = <span class="token punctuation">'</span><span class="token punctuation">'</span><span class="token punctuation">"</span></span>
            <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lg-text-input<span class="token punctuation">"</span></span>
            <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>addItemInput<span class="token punctuation">"</span></span>
        <span class="token punctuation">/></span></span>

        <span class="token comment">&lt;!-- 導入方法 addItem(param) --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn-primary<span class="token punctuation">"</span></span> <span class="token attr-name">(click)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>addItem(newItem.value)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Add<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`),s(c);var l=t(c,18),g=n(l);a(g,()=>`<code class="language-js"><span class="token comment">// 依序放入同步/非同步自定義驗證規則</span>
<span class="token comment">// [fieldInitialValue, syncValidators?, asyncValidators?]</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>fb<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  <span class="token literal-property property">fieldName</span><span class="token operator">:</span> <span class="token punctuation">[</span>initialValue<span class="token punctuation">,</span> syncValidators<span class="token punctuation">,</span> asyncValidators<span class="token punctuation">]</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(l);var i=t(l,2),w=n(i);a(w,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> FormControl<span class="token punctuation">,</span>FormsModule<span class="token punctuation">,</span> ReactiveFormsModule<span class="token punctuation">,</span> FormBuilder<span class="token punctuation">,</span> FormGroup <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/forms'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Validators <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/forms'</span><span class="token punctuation">;</span>

@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  <span class="token literal-property property">selector</span><span class="token operator">:</span> <span class="token string">'app-form'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">standalone</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">imports</span><span class="token operator">:</span> <span class="token punctuation">[</span>ReactiveFormsModule<span class="token punctuation">,</span>FormsModule<span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">templateUrl</span><span class="token operator">:</span> <span class="token string">'./form.component.html'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">styleUrl</span><span class="token operator">:</span> <span class="token string">'./form.component.css'</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">FormComponent</span> <span class="token punctuation">&#123;</span>
  categories <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">&#123;</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'music'</span><span class="token punctuation">,</span>  <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Music'</span>  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'movie'</span><span class="token punctuation">,</span>  <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Movie'</span>  <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
    <span class="token punctuation">&#123;</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'book'</span><span class="token punctuation">,</span>   <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">'Book'</span>   <span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token literal-property property">searchForm</span><span class="token operator">:</span> FormGroup<span class="token punctuation">;</span>
  newOptionValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FormControl</span><span class="token punctuation">(</span><span class="token string">'initial value'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">private</span> <span class="token literal-property property">fb</span><span class="token operator">:</span> FormBuilder</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token comment">// 建立兩個控制項：category 與 title</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>searchForm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fb<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
      <span class="token literal-property property">category</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>categories<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>value<span class="token punctuation">,</span> Validators<span class="token punctuation">.</span>required<span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">''</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>Validators<span class="token punctuation">.</span>required<span class="token punctuation">,</span> Validators<span class="token punctuation">.</span><span class="token function">minLength</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token function">onSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>searchForm<span class="token punctuation">.</span>invalid<span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
      console<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'表單驗證未通過'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>searchForm<span class="token punctuation">.</span><span class="token function">markAllAsTouched</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 觸發所有欄位的 touched</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">&#125;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'表單資料:'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>searchForm<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span><span class="token punctuation">;</span>

<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,8),_=n(m);a(_,()=>`<code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-card'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
    &lt;div class="card">
      &lt;div class="card-header">
        &lt;ng-content select="[card-header]">&lt;/ng-content>
      &lt;/div>
      &lt;div class="card-body">
        &lt;ng-content>&lt;/ng-content> &lt;!-- 預設內容 -->
      &lt;/div>
    &lt;/div>
  </span><span class="token template-punctuation string">&#96;</span></span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CardComponent</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`),s(m);var h=t(m,4),S=n(h);a(S,()=>`<code class="language-ts"><span class="token operator">&lt;</span>app<span class="token operator">-</span>card<span class="token operator">></span>
  <span class="token operator">&lt;</span>div card<span class="token operator">-</span>header<span class="token operator">></span>卡片標題<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token operator">&lt;</span>p<span class="token operator">></span>這是卡片的主體內容<span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>app<span class="token operator">-</span>card<span class="token operator">></span></code>`),s(h);var b=t(h,4),I=n(b);a(I,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'my-dialog'</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">
    &lt;div class="dialog">
      &lt;div class="dialog-header" *ngIf="hasHeader">
        &lt;ng-content select="[dialog-header]">&lt;/ng-content>
      &lt;/div>
      &lt;div class="dialog-body" *ngIf="hasBody">
        &lt;ng-content select="[dialog-body]">&lt;/ng-content>
      &lt;/div>
      &lt;div class="dialog-footer" *ngIf="hasFooter">
        &lt;ng-content select="[dialog-footer]">&lt;/ng-content>
      &lt;/div>
    &lt;/div>
  </span><span class="token template-punctuation string">&#96;</span></span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">DialogComponent</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// Angular 無法直接偵測 ng-content 是否有內容，只能用 JS 側邊處理</span>
  hasHeader <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  hasBody <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  hasFooter <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(b);var C=t(b,2),T=n(C);a(T,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>my-dialog</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">dialog-header</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h2</span><span class="token punctuation">></span></span>標題<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h2</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">dialog-body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>這是內容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

  <span class="token comment">&lt;!-- 若不寫 footer，就不會出現空的 footer --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>my-dialog</span><span class="token punctuation">></span></span></code>`),s(C),f(u,o)}const sa=Object.freeze(Object.defineProperty({__proto__:null,default:na,metadata:yn},Symbol.toStringTag,{value:"Module"})),fn={title:"Http Observable",date:"2025-06-22",category:"software",subCategory:"Angular18",tags:["http","angular","api"],slug:"angular_http_observable"},{title:uo,date:ko,category:ro,subCategory:io,tags:go,slug:mo}=fn;var aa=y('<h6>RxJS Observable</h6> <hr/> <p>在 Angular 裡，HttpClient 的每個方法都會回傳一個 RxJS Observable，這些 Observable 屬於 cold 類型 —— 在訂閱（subscribe）時才真正發送請求。</p> <p>多次訂閱同一個 Observable 會觸發多次獨立的後端呼叫；若在請求途中解除訂閱，Angular 會直接 中止（abort）尚未完成的 HTTP 連線。</p> <pre class="language-js"><!></pre> <p>簡易封裝才可以靈活使用 pipe()、switchMap() …</p> <pre class="language-js"><!></pre> <h3>Observable 常見 Method</h3> <table><thead><tr><th>Operator</th><th>用途說明</th></tr></thead><tbody><tr><td><code>map()</code></td><td>資料轉換，取出你要的欄位、格式化資料</td></tr><tr><td><code>tap()</code></td><td>執行副作用（不改變資料），常用來 <code>console.log</code>, 設定 loading</td></tr><tr><td><code>switchMap()</code></td><td>用一筆資料觸發下一個 Observable，並自動取消舊的</td></tr><tr><td><code>mergeMap()</code></td><td>觸發下一個 Observable，但不取消前一筆（適合併發）</td></tr><tr><td><code>catchError()</code></td><td>錯誤處理，不讓錯誤中斷整個流程</td></tr><tr><td><code>finalize()</code></td><td>無論成功/失敗，最後一定會執行（常用來清除狀態）</td></tr><tr><td><code>retry(n)</code></td><td>API 失敗時，自動重試 n 次</td></tr><tr><td><code>timeout(ms)</code></td><td>若 Observable 超過時間未完成，會自動報錯</td></tr><tr><td><code>debounceTime(ms)</code></td><td>等使用者輸入穩定後才送出請求（防抖）</td></tr></tbody></table> <pre class="language-js"><!></pre>',1);function ta(u){var o=aa(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/getExportData'</span><span class="token punctuation">)</span>
  <span class="token comment">// 邏輯排程</span>
  <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>
    <span class="token comment">// Step 1. 拿取 res.data</span>
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
</code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-js"><span class="token comment">// src/app/core/api/api.service.ts</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Injectable <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> HttpClient<span class="token punctuation">,</span> HttpParams <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/common/http'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Observable <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'rxjs'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> environment <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'../../../environments/environment'</span><span class="token punctuation">;</span>

@<span class="token function">Injectable</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span> <span class="token literal-property property">providedIn</span><span class="token operator">:</span> <span class="token string">'root'</span> <span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">ApiService</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">private</span> readonly baseUrl <span class="token operator">=</span> environment<span class="token punctuation">.</span>apiBaseUrl<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">private</span> <span class="token literal-property property">http</span><span class="token operator">:</span> HttpClient</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>

  get<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span>url<span class="token operator">:</span> string<span class="token punctuation">,</span> params<span class="token operator">?</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span>string<span class="token punctuation">,</span> any<span class="token operator">></span><span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">const</span> httpParams <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HttpParams</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
      <span class="token literal-property property">fromObject</span><span class="token operator">:</span> params <span class="token operator">||</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span>
    <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span>get<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>url<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span> <span class="token punctuation">&#123;</span> <span class="token literal-property property">params</span><span class="token operator">:</span> httpParams <span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  post<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span>url<span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">body</span><span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span>post<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>url<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span> body<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  put<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span>url<span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token literal-property property">body</span><span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span>put<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>url<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">,</span> body<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>

  <span class="token keyword">delete</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span>url<span class="token operator">:</span> string<span class="token punctuation">)</span><span class="token operator">:</span> Observable<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>http<span class="token punctuation">.</span>delete<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>url<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,6),d=n(c);a(d,()=>`<code class="language-js"><span class="token keyword">this</span><span class="token punctuation">.</span>api<span class="token punctuation">.</span>get<span class="token operator">&lt;</span>any<span class="token operator">></span><span class="token punctuation">(</span><span class="token string">'/api/users'</span><span class="token punctuation">)</span>
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
</code>`),s(c),f(u,o)}const pa=Object.freeze(Object.defineProperty({__proto__:null,default:ta,metadata:fn},Symbol.toStringTag,{value:"Module"})),wn={title:"Router",date:"2025-06-22",category:"software",subCategory:"Angular18",tags:["route","angular","api"],slug:"angular_router"},{title:yo,date:fo,category:wo,subCategory:ho,tags:vo,slug:bo}=wn;var oa=y('<h6>參考這個<a href="https://github.com/mbejda/AngularFire-Starter-Template" rel="nofollow">專案範本</a>、官方文件學習</h6> <hr/> <p>專案起始 index.html</p> <pre class="language-html"><!></pre> <p>元件去抓專案的根節點，render的內容用<code>&lt;router-outlet&gt;</code>佔位</p> <pre class="language-ts"><!></pre> <p>Route</p> <p>設定該路由(Path) <code>&lt;router-outlet&gt;</code>映射的元件</p> <pre class="language-ts"><!></pre> <p>且若添加 children 屬性擇該 映射的元件 裡面也可以再放一個佔位</p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre> <h3>Route順序和路由守衛</h3> <p>Angular自帶跳轉和瀏覽權限設定，可自行放入<code>canActivate[]</code>裡面做邏輯判斷</p> <pre class="language-ts"><!></pre>',1);function ea(u){var o=oa(),p=t(v(o),6),k=n(p);a(k,()=>`<code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token name">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
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
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">&#123;</span> RouterOutlet <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span>
  selector<span class="token operator">:</span> <span class="token string">'app-root'</span><span class="token punctuation">,</span>
  standalone<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  imports<span class="token operator">:</span> <span class="token punctuation">[</span>RouterOutlet<span class="token punctuation">]</span><span class="token punctuation">,</span>
  template<span class="token operator">:</span> <span class="token string">'&lt;router-outlet>&lt;/router-outlet>'</span><span class="token punctuation">,</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">AppComponent</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,6),d=n(c);a(d,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Routes <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
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
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">LayoutComponent</span> <span class="token punctuation">&#123;</span><span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,2),w=n(i);a(w,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app-container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app-side-panel</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>side<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>app-side-panel</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>main</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>main-content<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-outlet</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-outlet</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>main</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>app-footer</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>footer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>app-footer</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>`),s(i);var m=t(i,6),_=n(m);a(_,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Routes <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/router'</span><span class="token punctuation">;</span>
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
<span class="token punctuation">]</span><span class="token punctuation">;</span></code>`),s(m),f(u,o)}const ca=Object.freeze(Object.defineProperty({__proto__:null,default:ea,metadata:wn},Symbol.toStringTag,{value:"Module"})),hn={title:"Value Control",date:"2025-06-22",category:"software",subCategory:"Angular18",tags:["fronted","angular","value"],slug:"angular_value"},{title:_o,date:Co,category:So,subCategory:Ro,tags:Do,slug:Io}=hn;var la=y(`<h6>應用中傳遞值的方法</h6> <hr/> <p><a href="https://angular.dev/guide/components/inputs#declaring-inputs-with-the-input-decorator" rel="nofollow">官方文件</a></p> <h3>Input</h3> <p>舊版寫法 <code>@Input()</code></p> <p>有提供一些屬性操作，可參考文件</p> <pre class="language-ts"><!></pre> <p>新版寫法 <code>import &#123; input &#125; from '@angular/core'</code></p> <pre class="language-ts"><!></pre> <pre class="language-html"><!></pre> <h3>Output</h3> <p>都須維護兩個值</p> <br/> <p>舊版寫法 <code>@Output()</code></p> <pre class="language-js"><!></pre> <p>新版寫法<code>import &#123; input, output &#125; from '@angular/core'</code></p> <pre class="language-js"><!></pre> <pre class="language-html"><!></pre> <h3>ViewChild & ViewChildren</h3> <p>ViewChild(抓第一個) & ViewChildren(抓符合條件) 是 Angular 中的一種在元件 class 中存取 template 上某個/種類元素或元件實例的方法。</p> <p>舊版 @ViewChild()</p> <pre class="language-js"><!></pre> <pre class="language-html"><!></pre> <p>新版 viewChild()</p> <pre class="language-js"><!></pre> <p>可以這樣用</p> <pre class="language-js"><!></pre> <h3>Dependency Injection</h3> <pre class="language-ts"><!></pre> <pre class="language-ts"><!></pre> <h3>Signals</h3> <pre class="language-js"><!></pre> <pre class="language-ts"><!></pre> <p>常見用法</p> <pre class="language-ts"><!></pre> <h3>untracked()</h3> <p>讀取 signal 值，但不想讓它變成 reactive 依賴時，就用 untracked()</p> <p>原本</p> <pre class="language-js"><!></pre> <p>有時只需初始化時取值就好，所以不須自動追蹤。有需要再寫一個 function 取值</p> <pre class="language-js"><!></pre> <p>條件符合再反應一次</p> <pre class="language-js"><!></pre>`,1);function ua(u){var o=la(),p=t(v(o),12),k=n(p);a(k,()=>`<code class="language-ts"><span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  <span class="token comment">// = 0 為初始值, 若有傳遞進來就取代</span>
  <span class="token decorator"><span class="token at operator">@</span><span class="token function">Input</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> defineValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> input <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token decorator"><span class="token at operator">@</span><span class="token function">Component</span></span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  defineValue <span class="token operator">=</span> <span class="token function">input</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 這就是 signal 版本的 Input</span>
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,2),d=n(c);a(d,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>custom-slider</span> <span class="token attr-name">[defineValue]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>`),s(c);var l=t(c,10),g=n(l);a(g,()=>`<code class="language-js">@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  @<span class="token function">Input</span><span class="token punctuation">(</span><span class="token punctuation">)</span> defineValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  @<span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span> defineValueChange <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EventEmitter</span><span class="token operator">&lt;</span>number<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">onValueChange</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">newValue</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValue <span class="token operator">=</span> newValue<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValueChange<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,4),w=n(i);a(w,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> input<span class="token punctuation">,</span> output <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

@<span class="token function">Component</span><span class="token punctuation">(</span><span class="token punctuation">&#123;</span><span class="token operator">...</span><span class="token punctuation">&#125;</span><span class="token punctuation">)</span>
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">CustomSlider</span> <span class="token punctuation">&#123;</span>
  defineValue <span class="token operator">=</span> <span class="token function">input</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  defineValueChange <span class="token operator">=</span> output<span class="token operator">&lt;</span>number<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token function">onValueChange</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">newValue</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>defineValueChange<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,2),_=n(m);a(_,()=>`<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>custom-slider</span>
  <span class="token attr-name">[defineValue]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sliderValue<span class="token punctuation">"</span></span>
  <span class="token attr-name">(defineValueChange)</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sliderValue = $event<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>custom-slider</span> <span class="token attr-name">[(defineValue)]</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span></code>`),s(m);var h=t(m,8),S=n(h);a(S,()=>`<code class="language-js">@<span class="token function">ViewChild</span><span class="token punctuation">(</span><span class="token string">'myDiv'</span><span class="token punctuation">)</span> divElement<span class="token operator">!</span><span class="token operator">:</span> ElementRef<span class="token punctuation">;</span>

<span class="token function">ngAfterViewInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>divElement<span class="token punctuation">.</span>nativeElement<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var b=t(h,2),I=n(b);a(I,()=>'<code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">#myDiv</span><span class="token punctuation">></span></span>hello<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></code>'),s(b);var C=t(b,4),T=n(C);a(T,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component<span class="token punctuation">,</span> effect<span class="token punctuation">,</span> viewChild<span class="token punctuation">,</span> ElementRef <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`),s(C);var R=t(C,4),E=n(R);a(E,()=>`<code class="language-js"><span class="token comment">// div = viewChild.required('myDiv', &#123; read: ElementRef &#125;);</span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">div</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>nativeElement<span class="token punctuation">;</span>
  el<span class="token punctuation">.</span><span class="token function">scrollIntoView</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  el<span class="token punctuation">.</span>style<span class="token punctuation">.</span>border <span class="token operator">=</span> <span class="token string">'2px solid red'</span><span class="token punctuation">;</span> <span class="token comment">// 用邏輯操作 CSS</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// &lt;app-player #playerRef /></span>
<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">playerRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 操作&lt;DOM>方法</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code>`),s(R);var D=t(R,4),A=n(D);a(A,()=>`<code class="language-ts"><span class="token comment">// hero.service.ts</span>
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
<span class="token punctuation">&#125;</span></code>`),s(D);var x=t(D,2),N=n(x);a(N,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> HeroService <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'../services/hero.service'</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`),s(x);var L=t(x,4),Dn=n(L);a(Dn,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> signal <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> firstName <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">'Morgan'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 讀值（注意！不是 firstName.value，而是呼叫它）</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">firstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 'Morgan'</span>

<span class="token comment">// 設定新值</span>
firstName<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Jaime'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 基於舊值更新</span>
firstName<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token parameter">name</span> <span class="token operator">=></span> name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(L);var $=t(L,2),In=n($);a(In,()=>`<code class="language-ts"><span class="token keyword">const</span> firstName <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token string">'Morgan'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> firstNameCapitalized <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">firstName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 唯獨變數，類似 Vue 自動追蹤</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">firstNameCapitalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'MORGAN'</span>

firstName<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'Jaime'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">firstNameCapitalized</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'JAIME'（自動反應）</span></code>`),s($);var q=t($,4),Pn=n(q);a(Pn,()=>`<code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Component<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> computed <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`),s(q);var F=t(q,8),Tn=n(F);a(Tn,()=>`<code class="language-js"><span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">&#123;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Computing message...'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Count is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(F);var j=t(F,4),En=n(j);a(En,()=>`<code class="language-js"><span class="token keyword">import</span> <span class="token punctuation">&#123;</span> signal<span class="token punctuation">,</span> effect<span class="token punctuation">,</span> untracked <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@angular/core'</span><span class="token punctuation">;</span>

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
<span class="token punctuation">&#125;</span></code>`),s(j);var H=t(j,4),An=n(H);a(An,()=>`<code class="language-js"><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token function">signal</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
<span class="token punctuation">&#125;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code>`),s(H),f(u,o)}const ka=Object.freeze(Object.defineProperty({__proto__:null,default:ua,metadata:hn},Symbol.toStringTag,{value:"Module"})),vn={title:" Html Element & CSS 參考標準",date:"2025-08-04",category:"software",subCategory:"Frontend",tags:["css","fronted","web"],slug:"css"},{title:Po,date:To,category:Eo,subCategory:Ao,tags:xo,slug:Oo}=vn;var ra=y('<h6><a href="https://designsystem.digital.gov/" rel="nofollow">U.S. Web Design System</a></h6> <hr/> <h3>HTML Element</h3> <p>Head</p> <ul><li>title: 瀏覽器分頁標題/分頁名稱</li> <li>meta: 後台資訊(瀏覽器、搜尋引擎)</li> <li>script: 載入或內嵌 JavaScript</li> <li>base: 設定文件中的相對 URL 基準</li> <li>style: 內嵌 CSS</li></ul> <p>Body</p> <ul><li>a: 超連結</li> <li>section: 用來區分區域，內部預設垂直排列</li> <li>nav: 應用中的主要導航 <code>&lt;nav&gt; -&gt; &lt;ul&gt; -&gt; &lt;li&gt;</code></li> <li>article: 能包裹獨立內容片段</li> <li>aside: 略相關、額外內容和連結</li> <li>hgroup: 把一組標題相關的元素包成一組</li> <li>header: 某個區塊或整個頁面的開頭區域</li> <li>footer: 某個區塊或整個頁面的結尾區域</li> <li>address: 標記聯絡方式</li></ul> <h3>CSS</h3> <p>選擇器</p> <ul><li>基本選擇器: */element/ID/.class/#id/element1, element2</li> <li>屬性選擇器: img[alt^=“film”] → alt 開頭是 film 的圖片</li> <li>結構性選擇器: :first-child、:last-child …</li> <li>偽元素選擇器: ::first-letter、::first-line、::before</li></ul> <h3>字體</h3> <ul><li>內文通常預設 16px，稍大抓 16~22px，提示文字抓 13~15px</li> <li>行高用無單位倍率表示，標準為 16px 配 1.5 行高 => 24px (16*1.5) <ul><li>14px -> 1.5</li> <li>16px -> 1.5 ~ 1.65</li> <li>20px -> 需稍降行高（避免太鬆）</li></ul></li> <li>文字排版設定為左對齊</li> <li>單行適合閱讀 45-90 字元，長文抓 66 字元 (行高抓高可以塞多一點字)</li> <li>段落間距抓 1em ~ 1.5em</li> <li>清單項目間距抓 0.5em</li> <li>標題空白策略：上大、下小 → 上方 ≥ 1.5 × 下方</li> <li>字距不隨意更動</li></ul> <p><a href="https://designsystem.digital.gov/components/typography/?utm_source=chatgpt.com" rel="nofollow">完整文章</a></p> <h3>百分比設計</h3> <p>目標 ÷ 上下文 = %</p> <pre class="language-css"><!></pre>',1);function ia(u){var o=ra(),p=t(v(o),30),k=n(p);a(k,()=>`<code class="language-css"><span class="token comment">/* 固定寬版：設計師給的初稿 */</span>
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
<span class="token punctuation">&#125;</span></code>`),s(p),f(u,o)}const da=Object.freeze(Object.defineProperty({__proto__:null,default:ia,metadata:vn},Symbol.toStringTag,{value:"Module"})),bn={title:"Design Token",date:"2025-08-18",category:"software",subCategory:"Frontend",tags:["css","fronted","web"],slug:"css"},{title:No,date:Lo,category:$o,subCategory:qo,tags:Fo,slug:jo}=bn;var ga=y('<h6><a href="https://designsystem.digital.gov/" rel="nofollow">U.S. Web Design System</a></h6> <hr/> <h3>Color System</h3> <p>Primary Colors</p> <pre class="language-json"><!></pre> <p>Status Colors</p> <pre class="language-json"><!></pre> <p>Neutral Colors</p> <pre class="language-json"><!></pre> <h3>Typography System</h3> <p>Font Family</p> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre> <pre class="language-json"><!></pre>',1);function ma(u){var o=ga(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"color"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"primary"</span><span class="token operator">:</span> <span class="token string">"#6366F1"</span><span class="token punctuation">,</span>
    <span class="token property">"secondary"</span><span class="token operator">:</span> <span class="token string">"#10B981"</span><span class="token punctuation">,</span>
    <span class="token property">"foreground"</span><span class="token operator">:</span> <span class="token string">"#D92514"</span><span class="token punctuation">,</span>
    <span class="token property">"background"</span><span class="token operator">:</span> <span class="token string">"#F5F4E6"</span><span class="token punctuation">,</span>
    <span class="token property">"surface"</span><span class="token operator">:</span> <span class="token string">"#EDECD8"</span><span class="token punctuation">,</span>
    <span class="token property">"surface-alt"</span><span class="token operator">:</span> <span class="token string">"#374151"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(p);var e=t(p,4),r=n(e);a(r,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"color"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"success"</span><span class="token operator">:</span> <span class="token string">"#34D399"</span><span class="token punctuation">,</span>
    <span class="token property">"warning"</span><span class="token operator">:</span> <span class="token string">"#FBBF24"</span><span class="token punctuation">,</span>
    <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"#F87171"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(e);var c=t(e,4),d=n(c);a(d,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
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
<span class="token punctuation">&#125;</span></code>`),s(l);var i=t(l,2),w=n(i);a(w,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"fontSize"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"14px"</span><span class="token punctuation">,</span>
    <span class="token property">"base"</span><span class="token operator">:</span> <span class="token string">"16px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"18px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"20px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(i);var m=t(i,2),_=n(m);a(_,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"spacing"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"xs"</span><span class="token operator">:</span> <span class="token string">"4px"</span><span class="token punctuation">,</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"8px"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"16px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"24px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"32px"</span><span class="token punctuation">,</span>
    <span class="token property">"2xl"</span><span class="token operator">:</span> <span class="token string">"48px"</span><span class="token punctuation">,</span>
    <span class="token property">"3xl"</span><span class="token operator">:</span> <span class="token string">"64px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(m);var h=t(m,2),S=n(h);a(S,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"borderRadius"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"none"</span><span class="token operator">:</span> <span class="token string">"0px"</span><span class="token punctuation">,</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"4px"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"8px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"12px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"16px"</span><span class="token punctuation">,</span>
    <span class="token property">"full"</span><span class="token operator">:</span> <span class="token string">"9999px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(h);var b=t(h,2),I=n(b);a(I,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"shadow"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"0 1px 2px 0 rgba(0, 0, 0, 0.05)"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"0 4px 6px -1px rgba(0, 0, 0, 0.1)"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"0 10px 15px -3px rgba(0, 0, 0, 0.1)"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"0 20px 25px -5px rgba(0, 0, 0, 0.1)"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(b);var C=t(b,2),T=n(C);a(T,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"breakpoints"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"sm"</span><span class="token operator">:</span> <span class="token string">"640px"</span><span class="token punctuation">,</span>
    <span class="token property">"md"</span><span class="token operator">:</span> <span class="token string">"768px"</span><span class="token punctuation">,</span>
    <span class="token property">"lg"</span><span class="token operator">:</span> <span class="token string">"1024px"</span><span class="token punctuation">,</span>
    <span class="token property">"xl"</span><span class="token operator">:</span> <span class="token string">"1280px"</span><span class="token punctuation">,</span>
    <span class="token property">"2xl"</span><span class="token operator">:</span> <span class="token string">"1536px"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(C);var R=t(C,2),E=n(R);a(E,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"duration"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"fast"</span><span class="token operator">:</span> <span class="token string">"150ms"</span><span class="token punctuation">,</span>
    <span class="token property">"normal"</span><span class="token operator">:</span> <span class="token string">"250ms"</span><span class="token punctuation">,</span>
    <span class="token property">"slow"</span><span class="token operator">:</span> <span class="token string">"350ms"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(R);var D=t(R,2),A=n(D);a(A,()=>`<code class="language-json"><span class="token punctuation">&#123;</span>
  <span class="token property">"easing"</span><span class="token operator">:</span> <span class="token punctuation">&#123;</span>
    <span class="token property">"linear"</span><span class="token operator">:</span> <span class="token string">"linear"</span><span class="token punctuation">,</span>
    <span class="token property">"easeIn"</span><span class="token operator">:</span> <span class="token string">"cubic-bezier(0.4, 0, 1, 1)"</span><span class="token punctuation">,</span>
    <span class="token property">"easeOut"</span><span class="token operator">:</span> <span class="token string">"cubic-bezier(0, 0, 0.2, 1)"</span><span class="token punctuation">,</span>
    <span class="token property">"easeInOut"</span><span class="token operator">:</span> <span class="token string">"cubic-bezier(0.4, 0, 0.2, 1)"</span>
  <span class="token punctuation">&#125;</span>
<span class="token punctuation">&#125;</span></code>`),s(D),f(u,o)}const ya=Object.freeze(Object.defineProperty({__proto__:null,default:ma,metadata:bn},Symbol.toStringTag,{value:"Module"})),_n={title:"Http Connect",date:"2025-09-03",category:"software",subCategory:"Http",tags:["Http","tcp","backend"],slug:"http_connect"},{title:Mo,date:Ho,category:Uo,subCategory:Bo,tags:Vo,slug:Wo}=_n;var fa=y('<h3>TCP 連線的運作機制</h3> <ol><li><p>伺服器主機主動開啟 Port <code>net.Listen("tcp", ":4000")</code></p></li> <li><p>同時 <code>conn, err := listener.Accept()</code> 等待連接</p></li> <li><p>客戶端發送請求 <code>server_ip:4000</code> OS 背後做 TCP 三次握手驗證</p></li> <li><p>資料會傳送到 <code>OS緩衝區</code>，程式則會定期去緩衝區讀取資料處理</p></li></ol> <h3>Server 的核心特性</h3> <ul><li>持續運行（Long-running Process）</li> <li>對外提供通訊介面</li></ul> <pre class="language-go"><!></pre> <p>HTTP 本身是個字串，會需要嚴格的解析流程，可以導入狀態機的概念去處理如:</p> <ul><li>解析請求行 → 提取方法、路徑、版本</li> <li>解析標頭   → 逐行讀取 key: value</li> <li>解析請求體 → 根據 Content-Length 讀取</li></ul> <pre class="language-go"><!></pre>',1);function wa(u){var o=fa(),p=t(v(o),8),k=n(p);a(k,()=>`<code class="language-go"><span class="token keyword">package</span> main

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
<span class="token punctuation">&#125;</span></code>`),s(p);var e=t(p,6),r=n(e);a(r,()=>`<code class="language-go"><span class="token keyword">type</span> HTTPRequest <span class="token keyword">struct</span> <span class="token punctuation">&#123;</span>
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
<span class="token punctuation">&#125;</span></code>`),s(e),f(u,o)}const ha=Object.freeze(Object.defineProperty({__proto__:null,default:wa,metadata:_n},Symbol.toStringTag,{value:"Module"})),Cn={title:"Http 加密",date:"2025-09-23",category:"software",subCategory:"Http",tags:["Http","tcp","backend"],slug:"http_secretKey"},{title:zo,date:Yo,category:Ko,subCategory:Go,tags:Xo,slug:Jo}=Cn;var va=y('<hr/> <h3>SHA256 - 雙方同步加密</h3> <p>雙方約定使用同一組字串、演算法生成【HASH】當作簽名，一樣就當作比對成功</p> <p>實作:</p> <ol><li>雙方私下約定一組 KEY 都用 HMAC-SHA256 加密</li> <li>發送方在 Header 加入生成的【簽名】、【時間戳】，可以把【時間戳】當成是方便使用和驗證的變數</li> <li>接收方先拿明文的【時間戳】檢查是否在有效期間，接者用 KEY+TIME 生成簽名</li> <li>若產出值一樣就代表成功</li></ol> <pre class="language-js"><!></pre> <pre class="language-csharp"><!></pre> <h3>RSA - 約定加密</h3> <p>金鑰值是由RSA演算法生成一對【Private / Public】Key，雙方用KEY加解密和辨識。</p> <p>實作:</p> <ol><li>接收方私下提供一組 PublicKey 給發送方，自己維護一組 PrivateKey</li> <li>發送方用 PublicKey + RSA 去加密字串如 “ServerName|TimeStamp” 後把值放到 Header</li> <li>接收方拿到 Header 值後使用 PrivateKey + RSA 去解密取得 “ServerName|TimeStamp”</li> <li>接收方可以自己去驗證 ServerName 是否在名單 & TimeStamp 等邏輯</li></ol> <pre class="language-csharp"><!></pre>',1);function ba(u){var o=va(),p=t(v(o),10),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">const</span> <span class="token function-variable function">secretKey</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token constant">HMAC</span><span class="token operator">-</span><span class="token constant">SHA256</span><span class="token punctuation">(</span>TimeStemp <span class="token operator">+</span> Key<span class="token punctuation">)</span> <span class="token comment">// 產生密鑰</span>
<span class="token literal-property property">header</span> <span class="token operator">:</span> secretKey
<span class="token literal-property property">header</span> <span class="token operator">:</span> TimeStemp
<span class="token comment">// https request -> Service Server</span></code>`),s(p);var e=t(p,2),r=n(e);a(r,()=>`<code class="language-csharp"><span class="token comment">// Service Server</span>

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
</code>`),s(e);var c=t(e,10),d=n(c);a(d,()=>`<code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnActionExecuting</span><span class="token punctuation">(</span><span class="token class-name">ActionExecutingContext</span> context<span class="token punctuation">)</span>
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
<span class="token punctuation">&#125;</span></code>`),s(c),f(u,o)}const _a=Object.freeze(Object.defineProperty({__proto__:null,default:ba,metadata:Cn},Symbol.toStringTag,{value:"Module"})),Sn={title:"CSS Render 範本",date:"2025-06-22",category:"",subCategory:"",tags:["read","book","markdown"],slug:"the_beggers_strike"},{title:Qo,date:Zo,category:ne,subCategory:se,tags:ae,slug:te}=Sn;var Ca=y("<p>非洲文學家</p> <hr/> <p>###　乞丐的罷工</p> <p>角色定位鮮明、閱讀起來很像長篇寓言故事。可以把世界背景想像成架空於印度之上，內容主線如同書名；在一個外來的打破平衡的事件，政府開始掃蕩下乞丐掀起革命。</p> <p>有趣的地方是把人性醜陋的特質，放到不同位階的人身上，盲從的乞丐、固執的部長、貪婪的候選人、女人、窄眼的教士和詐欺教宗，同時又有一種核心概念是在堅守自己的價值</p> <p>導致看到每個角色都會覺得 難怪你會是這個位階的人 和 嗯嗯、我如果是他我應該也會這樣做切換，</p> <p>，例如容易被煽動的乞丐、貫徹信念到底的部長、貪婪權位者、不寬心的教士和水份很高的教宗?</p>",1);function Sa(u){var o=Ca();P(12),f(u,o)}const Ra=Object.freeze(Object.defineProperty({__proto__:null,default:Sa,metadata:Sn},Symbol.toStringTag,{value:"Module"})),Rn={title:"CSS Render 範本",date:"2025-06-22",category:null,subCategory:null,tags:["svelte","blog","markdown"],slug:"example"},{title:pe,date:oe,category:ee,subCategory:ce,tags:le,slug:ue}=Rn;var Da=y('<p>這是第一篇文章，用來展示部落格如何從 markdown 載入內容。</p> <hr/> <h1>這是 H1 標題</h1> <h2>這是 H2 標題</h2> <h3>這是 H3 標題</h3> <hr/> <p>段落文字：這是一段普通的段落內容，展示預設的段落文字樣式。</p> <p>強調文字：<strong>粗體</strong>、<em>斜體</em>、<del>刪除線</del>。</p> <hr/> <h3>清單測試</h3> <ul><li>無序清單項目 1</li> <li>無序清單項目 2 <ul><li>子項目 a</li> <li>子項目 b</li></ul></li></ul> <ol><li>有序清單項目 1</li> <li>有序清單項目 2 <ol><li>子項目 i</li> <li>子項目 ii</li></ol></li></ol> <hr/> <h3>程式碼區塊</h3> <h4>行內程式碼</h4> <p>例如你可以這樣寫：<code>console.log("Hello Svelte!")</code></p> <h4>區塊程式碼</h4> <pre class="language-js"><!></pre>',1);function Ia(u){var o=Da(),p=t(v(o),34),k=n(p);a(k,()=>`<code class="language-js"><span class="token keyword">function</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">&#123;</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>name<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token string">!</span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">;</span>
<span class="token punctuation">&#125;</span></code>`),s(p),f(u,o)}const Pa=Object.freeze(Object.defineProperty({__proto__:null,default:Ia,metadata:Rn},Symbol.toStringTag,{value:"Module"})),M=[],z=Object.assign({"/src/content/Backend/BackgroudService.md":Bn,"/src/content/Backend/FSM.md":zn,"/src/content/Database/Paxon_1.md":Gn,"/src/content/Database/Paxon_2.md":Qn,"/src/content/Database/consistency_1.md":ss,"/src/content/Database/consistency_2.md":ps,"/src/content/Database/consistency_3.md":cs,"/src/content/Database/db_leetcode50.md":ks,"/src/content/Database/db_normalization.md":ds,"/src/content/Database/db_relational.md":ys,"/src/content/Database/db_sql.md":hs,"/src/content/Database/db_table_1.md":_s,"/src/content/Devlop-Note/cashflow.md":Rs,"/src/content/Devlop-Note/jsPDF.md":Ps,"/src/content/Devlop-Note/pdfMerge.md":As,"/src/content/Devlop-Note/sftp_ftps.md":Ns,"/src/content/Devlop-Note/structurizr.md":qs,"/src/content/Devlop-Note/xlsx_excel.md":Ms,"/src/content/Domain-Driven/DDD_layer.md":Bs,"/src/content/Domain-Driven/DDD_mediator.md":zs,"/src/content/Domain-Driven/DDD_outbox.md":Gs,"/src/content/Fronted/ThreeJS.md":Qs,"/src/content/Fronted/angular_basic.md":sa,"/src/content/Fronted/angular_http.md":pa,"/src/content/Fronted/angular_router.md":ca,"/src/content/Fronted/angular_value.md":ka,"/src/content/Fronted/css.md":da,"/src/content/Fronted/design_token.md":ya,"/src/content/Http/http_connect.md":ha,"/src/content/Http/http_secretKey.md":_a,"/src/content/Read/the_beggers_strike.md":Ra,"/src/content/empty.md":Pa});for(const u in z){const o=z[u];M.push({category:o.metadata.category,subCategory:o.metadata.subCategory,title:o.metadata.title,slug:o.metadata.slug,date:o.metadata.date,tags:o.metadata.tags,excerpt:o.metadata.excerpt??"",component:o.default})}M.sort((u,o)=>o.date.localeCompare(u.date));const ke=Mn(M);export{ss as A,Qn as B,Gn as C,zn as D,Bn as E,ke as F,Pa as _,Ra as a,_a as b,ha as c,ya as d,da as e,ka as f,ca as g,pa as h,sa as i,Qs as j,Gs as k,zs as l,Bs as m,Ms as n,qs as o,Ns as p,As as q,Ps as r,Rs as s,_s as t,hs as u,ys as v,ds as w,ks as x,cs as y,ps as z};
