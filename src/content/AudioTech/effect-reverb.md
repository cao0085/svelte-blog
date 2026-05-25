---
title: "Effect - Reverb"
date: "2026-05-11"
category: "software"
subCategory: "AudioTech"
tags: ["audio", "cpp", "dsp", "plugin", "juce"]
slug: "audio-effect-reverb"
---

###### 從《 Designing Audio Effect Plug-Ins in C++ 》了解一下基礎特性

---

Reverb 本質上是一個密度極高的 Delay 網路，回聲密度高到耳朵無法分辨單一回聲的狀態 —— Schroeder 提出每秒至少要有 1000 個回聲才能融合成我們認知的「空間殘響感」。當聲音從音源發出後，物理上發生三件事：

1. 直達聲最快到達你的耳朵
2. 聲波碰到近處的牆、地板、天花板後反彈回來，形成可辨識的早期反射（Early Reflections），這些反射讓你的大腦感知空間的大小和形狀。
3. 反射越來越多次、互相疊加，密度指數增長，形成無法辨識個別回聲的尾音（Late Reverberation）以指數方式衰減，直到消失。

而 RT60 就是測量這個尾音從最高點衰減 60dB 所需的時間，音樂廳大約 1.5～2 秒，大教堂可達 8 秒以上。

*RT60（Reverberation Time 60dB）選 60dB 是因為這大約是人耳能感知到「聲音消失」的門檻。*

#### Comb Filter

Schroeder Reverb 的核心元件之一，本質是一個帶回授的延遲線：輸出的一部分乘以衰減係數 g 後送回輸入端，讓聲音在緩衝區內來回循環，產生密集的多次反射。延遲時間決定回聲的間隔，g 值決定衰減速度（g 越接近 1，殘響越長）；多個不同延遲時間的 Comb Filter 並聯，回聲密度隨時間指數增長，模擬空間尾音。

```text
Input ──────────────────────────────────────────► + ──► Output
                                                   ▲
                                          [Buffer D] ──► × g ──┘
```

#### Delaying APF

All-Pass Filter 對所有頻率的增益相同（不改變音色），但會造成頻率相依的相位偏移。Schroeder 在 Comb Filter 之後串聯 APF，目的是打散回聲的規律性——Comb Filter 並聯輸出在頻域上仍有明顯的梳齒結構，APF 透過相位偏移將這些梳齒「抹散」，使殘響密度更均勻、更自然。

```text
Input ──► + ──────────────────────────────────────► + ──► Output
           ▲                                         │
           └──── × (-g) ◄── [Buffer D] ◄── × g ◄───┘
```

### Algorithms

#### Schroeder（1962）

最早的數位殘響架構。4 個延遲值互質的 Comb Filter 並聯（互質確保各 Comb 的共振頻率不重疊，避免金屬色澤加劇），輸出再串聯 2 個 APF 做擴散。架構簡單、運算量低，但高低頻衰減速度相同，聽起來帶有明顯的金屬梳齒感，不夠自然。

```text
                ┌-> [Comb D1] -┐
                ├-> [Comb D2] -┤
Input -> Split -┤              ├-> Mix -> [APF] -> [APF] -> Output
                ├-> [Comb D3] -┤
                └-> [Comb D4] -┘
```

#### Moorer（1979）

在 Schroeder 架構上改良：將 6 個 Comb Filter 的回授路徑各自加入一個 LPF，讓高頻先衰減、低頻後消失，更貼近真實空間的吸音特性。同時加入早期反射延遲抽頭，補足 Schroeder 缺少的空間感知線索。聽感明顯更自然，代價是運算量增加。

```text
                ┌-> [Early Reflections Taps] -┐
                ├-> [Comb + LPF D1] ----------┤
                ├-> [Comb + LPF D2] ----------┤
Input -> Split -┤                             ├-> Mix -> [APF] -> Output
                ├-> [Comb + LPF D3] ----------┤
                ├-> [Comb + LPF D4] ----------┤
                ├-> [Comb + LPF D5] ----------┤
                └-> [Comb + LPF D6] ----------┘
```

#### 現代（Gardner / Dattorro）

轉向巢狀 APF（Nested APF）與 Feedback Delay Network（FDN）：多條延遲線透過混音矩陣互相交叉餵入，回聲密度更高、金屬感更低，天然支援立體聲輸出，可調參數也更豐富。Plate Reverb 模擬亦屬此類演進方向。現代頂級插件（如 Valhalla Room）幾乎都在此基礎上再加入 **Modulated Reverb**——在延遲線長度上疊入極細微的 LFO 抖動（深度僅幾個 sample），讓梳狀共鳴頻率持續微移，徹底消滅金屬感。

```text
              ┌──────────────────────────────┐
              │        Feedback Matrix       │
Input -> [APF] -> [D1] -┐                    │
                [D2] ───┤-> [Mix Matrix] ────┘-> [APF] -> Output (L/R)
                [D3] ───┤
                [D4] ───┘
```

### 物理法 vs 感知法

演算法混響屬於 **感知法** 用 Comb + APF 網路人工合成，只要密度和衰減特性夠逼真，聽覺上就能接受，優點是參數可調、運算輕量。相對的，**物理法（卷積混響）** 錄製真實房間的衝激響應（IR）後與輸入訊號做 FIR 卷積，Waves IR-1、Altiverb 皆屬此類，但 IR 一旦錄定便無法即時調整聲場，兩者各有其用途。