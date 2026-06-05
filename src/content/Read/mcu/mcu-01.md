---
title: "MCU - 基礎"
date: "2026-06-04"
category: ""
subCategory:  "Tech"
tags: ["read", "blog", "MCU"]
slug: "mcu_01"
---
###### 認識微控制器

---

**Microcontroller Unit（微控制器）** 它是一顆把 CPU、記憶體、周邊整合在一起的小型 SoC，常出現在按鍵、旋鈕、LED、感測器、MIDI controller、效果器、synth、audio interface 這類控制邏輯裡，常見平台有 Arduino、STM32、ESP32、RP2040。

### 2025 年底

近年 MCU 推進的方向：

- AI / DSP / 向量化：更適合小模型推論，也更適合 audio / sensor 類資料處理。
- 內建 NPU / AI accelerator：部分新 MCU 已開始內建 AI 加速器。
- 安全架構內建化：TrustZone、secure boot、root of trust、secure update。
- 更自治的周邊：smart DMA、event-driven architecture、peripheral 能自行搬資料／前處理，CPU 不必每件事都介入。
- mixed-signal / analog 整合更好：更強的 ADC、comparator、motor control、sensing front-end。
- 工具鏈更成熟：很多能力以前理論上可以，現實務上能導入。

目標是符合 edge / IoT / 工控 / 車載這些應用場景：

- 跑小型 AI： 小模型、低延遲、低功耗在本地判斷的 edge AI，做關鍵字偵測、異常檢測、手勢／姿態辨識、預測維護、感測器資料。
- 安全： secure boot、韌體更新驗證、硬體隔離、TrustZone、root of trust。
- 無線 / IoT 標準： 常整合或搭配 Wi-Fi、BLE、Thread、Zigbee、Matter。
- 工控 / 車載 / 電力： 汽車電子、工業自動化、馬達控制、BMS、智慧電表、邊緣控制節點。

可以說到 2025 年 MCU 的發展重點是往**更智慧、更安全、更整合、更低功耗**的方向走，而不是變成大算力 CPU，另外 AI 在 MCU 的角色算是取代判斷那層。

```text
接收物理訊號（聲音 / 加速度 / 溫度 / 電流 / 壓力 / 按鍵 / 旋鈕）
        ↓
轉成數位資料
        ↓
做判斷（傳統規則  或  AI 模型判斷模式）
        ↓
輸出結果（控制功能 / 切換模式 / 發送訊息 / 觸發效果 / 顯示狀態）
```

*補充:「幾奈米」現在比較像是製程世代名稱，不只是「尺寸小」，而 MCU／車用／工控／類比晶片 不一定需要最先進製程。*

### 主要瓶頸

1. 記憶體限制： 主要瓶頸，Flash、RAM 不夠大，AI 模型與中間運算空間有限；韌體、安全功能、通訊堆疊一起塞時很緊。
2. 功耗與算力：想加 AI、無線、安全、高速 ADC / DSP，功耗就容易上去。
3. 安全要求高但資源小：安全變成必須，但 MCU 天生資源有限，常卡在「安全做不完整」或「做完整後主功能空間不足」。
4. 定位模糊：當需求變成大 UI、語音／視覺、複雜網路、更大模型，就會改用 MPU / SoC。

這些瓶頸是需要整條產業鏈解決，簡單拆成五層理解:

- 第一層 — IC / SoC design：CPU core 架構、instruction set、datapath、memory access、bus / DMA、peripheral integration。
- 第二層 — embedded system architecture：即時性、低功耗狀態切換、interrupt / DMA / peripheral 協作、deterministic behavior、韌體與硬體的整體架構。
- 第三層 — mixed-signal / analog know-how：ADC / DAC、comparator、op amp、sensing front-end、類比雜訊與準確度控制。
- 第四層 — security architecture：secure boot、TrustZone、root of trust、金鑰管理、firmware update chain、lifecycle 管理。
- 第五層 — 工具鏈與軟體生態：IDE、compiler、HAL / SDK、model deployment、middleware、範例與開發流程。

硬體能力突破主要靠**第 1 層 + 第 2 層**；安全轉型主要靠**第 4 層**；而能否落地就是**第 5 層 + 消費者**。

| 突破方向 | 主導層 | 關鍵配合 |
|---------|--------|---------|
| AI / DSP / 向量化 | 第 1 層 | 第 2 層限制 |
| NPU / accelerator | 第 1 層做出能力 | 第 5 層讓它能用 |
| 安全能力 | 第 4 層主導 | 第 1 層落地 |
| 自治周邊 / DMA / coprocessor | 第 2 層主導 | 第 1 層支撐 |
| ADC / 類比整合 | 第 3 層主導 | — |
| 開發體驗改善 | 第 5 層主導 | — |

#### 各層級的資源投入

比較這五層「最小投入能做到什麼」與「做到量產／平台級要付出多少」，比較能快速了解企業定位和故事：

- 第一層 IC / SoC design：下限是在 FPGA 上驗證 CPU core 或 accelerator 原型，數人即可；而流片、封裝、量產驗證與長期客戶支援，是重資本大團隊才能完成。
- 第二層 embedded architecture：下限是單一應用的韌體與架構，小團隊就能做到頂尖；上限是通用平台與跨產品線維護，需要企業級累積。
- 第三層 mixed-signal / analog：門檻本來就高，下限就要資深類比工程師加量測儀器才有原型；上限是高精度量產、良率與校正，資源極高。
- 第四層 security：下限是 secure boot 流程與金鑰管理邏輯，小團隊可實作；上限是 root of trust、第三方認證（如 PSA）與抗實體攻擊。
- 第五層 toolchain / 生態：下限是一套 SDK、HAL 加範例文件就能起步；上限是 IDE、編譯器、middleware 與客服的長期投入。

靠概念非重資本的是**第 2、5 層**（以及第 4 層的概念實作）；**第 3 層**比較特別，連原型都貴在設備與人，下限本身就高。
