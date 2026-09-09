---
title: "Unity learning draft"
date: "2026-08-10"
category: ""
subCategory:  "Unity"
tags: ["read", "blog", "Money"]
slug: "unity"
---
###### 123

---

### 價格

你的背景其實幫很大：ERP 全端 = 資料建模、狀態管理、序列化都不用重學；JUCE = 你已經懂即時執行緒、buffer、DSP 圖，Unity 的 AudioMixer 對你會非常直覺。真正陌生的只有兩件事——component / frame-loop 思維（不是 MVC，也不是事件驅動 request-response）和美術/資產管線。所以計畫應該把時間壓在這兩塊。

開工前必須先釘死的決策

這些改起來成本極高，先定義好：

1. 世界尺度：Pixels Per Unit (PPU)
2D 最重要的一個數字。決定 1 Unity unit 對應幾個像素。像素風常用 16 或 32，手繪風常用 100。全專案所有 sprite 匯入設定必須一致，否則物理、碰撞、攝影機大小全部歪掉。順帶決定「一個角色大約幾 unit 高」（建議 1~2）。

2. 解析度與 aspect ratio 策略
目標解析度（如 320×180 放大、或 1920×1080）、支援的長寬比範圍、超出時是黑邊還是多看到場景。這決定 UI 錨點規則和攝影機 orthographic size。像素風還要決定要不要 pixel-perfect（有專用 package，事後加會讓所有動畫抖動）。

3. 移動要不要走物理
Rigidbody2D 驅動 vs 自己算位移 + Raycast。平台跳躍遊戲多半自幹（Unity 2D 物理的跳躍手感很難調），俯視角/解謎用物理沒問題。這決定你第 7 章要不要細讀。

4. 資料與存檔格式
你 ERP 的直覺可以直接用：定義 save schema，第一版就加 version 欄位和 migration 路徑。另外決定「設計資料」放哪 —— ScriptableObject（Unity 原生、可在 Inspector 編）vs 外部 JSON/CSV（可用 Excel 編、可熱更）。混用最常見：設計數值走 CSV → 生成 SO。

5. Sorting Layer / Order in Layer 命名規範
2D 的 z-order 全靠這個。一開始就列好層級表（Background / Terrain / Entities / VFX / UI）並寫進文件，晚期補會出現大量遮擋 bug。

6. 音訊架構
你最熟的一塊，但先定：AudioMixer 的 bus 樹（Master → Music / SFX / Voice / Ambience）、每個 bus 的 exposed parameter 名稱、音樂是單軌還是分層（stem-based，做動態配樂用）、要不要一開始就上 FMOD/Wwise。如果你想做動態配樂（依戰鬥狀態切段、無縫轉場），建議直接上 FMOD —— 以你 JUCE 的底子學 FMOD 的成本很低，而 Unity 原生 AudioMixer 做互動式音樂會綁手綁腳。

7. 版控
Git + Git LFS（追 .png/.wav/.psd）、.gitignore 用 Unity 官方版、Editor Settings 設 Asset Serialization = Force Text、Version Control Mode = Visible Meta Files。第一天做，不然 merge 會地獄。

8. Unity 版本
選一個 LTS 然後整個專案不要動。2D 用 Universal Render Pipeline (URP) 才有 2D lights / shader graph。

分區學習路徑

區域 A：把手弄髒（1~2 週）
書的 Ch1、Ch2。目標不是學完，是能讀懂 Unity 的世界觀：GameObject/Component 為何優於繼承、Update vs FixedUpdate vs coroutine、Prefab 的意義、Inspector 序列化規則（為什麼 property 不會顯示、為什麼 [SerializeField] 存在）。

以你的背景，這裡最容易犯的錯是想套 ERP 的架構——建一堆 Manager、Service、DI container。先忍住，用 Unity 的方式寫幾個小東西再回頭重構。

區域 B：核心迴圈（3~4 週）
Ch3 輸入（直接學新版 Input System，別學舊的）、Ch4 數學（2D 只需要 Vector2、dot product、lerp，四元數可跳過）、Ch5 2D 圖形與物理。

產出：一個可玩的原型 —— 能移動、能碰撞、能觸發、能死。手感調到自己滿意（coyote time、jump buffer、加速度曲線）。這個階段就要決定移動是否走物理（前面第 3 點）。

區域 C：內容化（3~4 週）
Ch8 動畫（2D 只需 Animator + Animation Clip + Blend Tree 概念，3D 的 humanoid rig 跳過）、Ch9 邏輯與 gameplay、Ch12 UI。

這階段開始「放入自己的視覺模組」：Sprite 切割與 Sprite Atlas、9-slice、Tilemap（2D 場景幾乎必用，書裡份量不多，要另外補）、URP 2D Light 與 Shader Graph 做特效。

區域 D：音樂與音效（1~2 週，你會很快）
Ch11。重點只在 Unity 端的接法：AudioSource pooling、3D vs 2D spatial blend、snapshot 轉場、ducking。你在 JUCE 的知識大多能直接搬。若走 FMOD 就改讀 FMOD Unity 整合文件。

區域 E：組裝與出貨（持續）
Ch13 檔案與網路（存檔、截圖）、Scene 管理與載入、設定選單、Build 設定、平台輸出。

「進程」（我理解成流程/關卡推進）屬於這區 + Ch9：定義 GameState 機（Boot → Menu → Playing → Paused → GameOver）、場景載入策略（additive scene 讓 UI 和關卡分離）、存檔點設計。

可以跳過的：Ch6（3D 材質著色）大部分、Ch7（3D 物理）、Ch10 的 3D 導航與 ML-Agents（除非要做複雜 AI）。

一個建議

這本 cookbook 是查詢用而不是通讀用。比較有效的方式是：先訂一個小到能在 4~6 週做完的遊戲（單一機制、10 個關卡、無存檔或極簡存檔），照上面的區域邊做邊查書。做完一個完整循環（含 build 出可執行檔）學到的東西，遠多於通讀 13 章。

你想做的是哪種 2D？平台跳躍、俯視角動作、解謎、還是敘事向？這會顯著影響區域 B 和 C 的重心，我可以再細化。