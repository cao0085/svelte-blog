---
title: "Audio Plugin 03 - Octave Down"
date: "2026-05-20"
category: "software"
subCategory: "AudioTech"
tags: ["audio", "dsp", "octave", "pitch", "analog"]
slug: "audio-octave-down"
---

###### 從 BOSS OC-2 理解類比降八度的原理，以及怎麼用 DSP 重現

---

### Octave 效果的兩個方向

Octave 效果器分成升八度和降八度，原理完全不同。

**升八度（Octave Up）**：全波整流，把負半波翻正，波形週期數加倍，頻率 ×2。

```text
原始:    ∩ ∪ ∩ ∪       （一上一下 = 一個週期）
整流後:  ∩ ∩ ∩ ∩       （全部朝上 = 週期減半 = 頻率 ×2）
```

```cpp
float octaveUp = std::fabs(input);
```

聽起來會很 buzzy，因為整流的折點產生大量諧波。1960s 的 Octavia（Hendrix 的那顆）就是這個原理。

**降八度（Octave Down）**：沒辦法靠簡單的波形運算把頻率「減半」。需要更聰明的方法。

---

### BOSS OC-2 — 類比降八度的經典

OC-2 是 BOSS 在 1982 年推出的類比踏板，生產到 2003 年。它能產生降一個八度（OCT 1）和降兩個八度（OCT 2）的訊號，和原始乾聲混在一起輸出。

三個旋鈕：

- **Direct Level**：乾聲音量
- **OCT 1**：降一個八度的音量
- **OCT 2**：降兩個八度的音量

沒有 tone 旋鈕，沒有濾波控制。只能處理單音（monophonic），和弦會 glitch。

核心原理是 **頻率除法 + 振幅調變**，整個過程零延遲。

---

### 第一步：把輸入變成方波

OC-2 要做頻率除法，但頻率除法只對方波有效。所以第一步是把吉他訊號變成一個乾淨的方波。

```text
吉他訊號 → 低通濾波 → 增益放大 → 硬削波 → 方波（頻率 = 基頻）
```

低通濾波的目的是把高頻諧波砍掉，讓波形盡量接近正弦。這樣經過硬削波後，產生的方波每個週期只有**剛好兩個零交叉點**，不會因為諧波產生多餘的交叉。

這也是為什麼用吉他的 neck pickup + tone 關小，OC-2 追蹤會更穩——諧波越少，零交叉越乾淨。

---

### 第二步：Flip-Flop 頻率除法

方波送進 CMOS flip-flop（觸發器）。Flip-flop 的行為很簡單：每次輸入的上升沿（rising edge），輸出就切換狀態。

```text
輸入方波:     __|‾‾|__|‾‾|__|‾‾|__|‾‾|    頻率 = f

Flip-flop 1:  ____|‾‾‾‾|____|‾‾‾‾|        頻率 = f/2  → 降一個八度

Flip-flop 2:  ________|‾‾‾‾‾‾‾‾|          頻率 = f/4  → 降兩個八度
```

OCT 1 用一級 flip-flop 除以 2，OCT 2 再串一級除以 4。

OC-2 原版用的 IC：

- **BA634**（ROHM，單 T-type flip-flop，已停產）
- **µPD4013C**（雙 D-type flip-flop）

後期版本和 DIY clone 通常用 CD4013 或 CD4027 替代。

但如果直接拿 flip-flop 的方波當輸出，聽到的只會是方波嗡嗡聲，**沒有原始音色**。所以需要第三步。

---

### 第三步：振幅調變 — OC-2 的靈魂

這步是整個電路最聰明的地方。它讓降八度的聲音**保留原始吉他的音色和包絡**，而不是變成合成器。

做法：

1. 把原始輸入用鍺二極體做**半波整流**（只留正半週）
2. 用 flip-flop 的方波輸出控制一個 op-amp，**每隔一個週期反轉極性**

```text
原始半波整流:  ∩  ∩  ∩  ∩     （每個正半波都朝上）
flip-flop:     +  −  +  −     （交替 +1 / −1）
相乘結果:      ∩  ∪  ∩  ∪     （正、負交替）
```

原本半波整流後每個 bump 都是正的，現在每隔一個被翻轉成負的。結果就是：**一個完整的上下週期變成原來的兩倍長** → 頻率減半 → 降一個八度。

而且因為乘的是原始訊號（不是方波），所以音色的包絡、動態、泛音結構都被保留下來了。本質上這是一種 **ring modulation / balanced modulation**。

OCT 2 同理，只是用 f/4 的 flip-flop 輸出來控制翻轉。

---

### 第四步：混音輸出

三個旋鈕各自控制 Direct / OCT 1 / OCT 2 的音量，三路加在一起就是最終輸出。電路裡還有一個簡單的低通濾波在 octave 訊號上，讓方波切換造成的 click 平滑一點。

---

### 為什麼是零延遲？

跟 pitch shifter（需要 FFT、delay line、phase vocoder）不同，OC-2 的每一步都是**即時波形操作**：

- 低通濾波：逐 sample
- 硬削波：逐 sample
- Flip-flop：逐 sample 的狀態切換
- 半波整流 × 極性翻轉：逐 sample 的乘法

不需要任何 lookahead buffer，所以從輸入到輸出的延遲就只有濾波器造成的極小相位延遲。這也是為什麼類比 octave-down 的手感和 digital pitch shifter 完全不同。

---

### DSP 實作思路

把上面的類比電路翻譯成數位版本：

#### 零交叉偵測（取代方波 + flip-flop）

數位版不需要真的做出方波再餵進 flip-flop。直接偵測低通濾波後的訊號的**上升零交叉**就等同於 flip-flop 的 rising edge：

```cpp
// 偵測 filtered signal 的上升零交叉
bool risingZeroCross = (filtered > 0.0f) && (prevFiltered <= 0.0f);
```

#### Flip-Flop 狀態

```cpp
if (risingZeroCross)
{
    ff1 = !ff1;           // 每次上升交叉切換 → f/2
    if (ff1)
        ff2 = !ff2;      // 每兩次切換再切換 → f/4
}
```

#### Octave 訊號生成

```cpp
float polarity1 = ff1 ? 1.0f : -1.0f;
float polarity2 = ff2 ? 1.0f : -1.0f;

float rectified = std::max(0.0f, input);   // 半波整流

float oct1 = rectified * polarity1;
float oct2 = rectified * polarity2;
```

#### 完整 process 骨架

```cpp
struct OctaveDownState
{
    float prevFiltered = 0.0f;
    bool  ff1          = false;   // flip-flop 1 (÷2)
    bool  ff2          = false;   // flip-flop 2 (÷4)
    // ... 加上 pre/post filter 的 state
};

inline float processOctaveDown(float input,
                               OctaveDownState& state,
                               float directLevel,
                               float oct1Level,
                               float oct2Level) noexcept
{
    // 1. 低通濾波，砍高頻讓零交叉乾淨
    float filtered = onePoleLP(input, state.lpfState, 1500.0f);

    // 2. 偵測上升零交叉
    bool cross = (filtered > 0.0f) && (state.prevFiltered <= 0.0f);
    state.prevFiltered = filtered;

    // 3. flip-flop 狀態切換
    if (cross)
    {
        state.ff1 = !state.ff1;
        if (state.ff1)
            state.ff2 = !state.ff2;
    }

    // 4. 半波整流 × 極性翻轉
    float rectified = std::max(0.0f, input);
    float oct1 = rectified * (state.ff1 ? 1.0f : -1.0f);
    float oct2 = rectified * (state.ff2 ? 1.0f : -1.0f);

    // 5. 混音
    return input * directLevel + oct1 * oct1Level + oct2 * oct2Level;
}
```

state 很輕——一個 float（prevFiltered）、兩個 bool、加上濾波器的幾個 float，總共不到 32 bytes。

#### 追蹤穩定性的小技巧

- **振幅門檻**：當 `|input|` 很小時忽略零交叉，避免噪聲觸發 flip-flop
- **前置壓縮**：穩定輸入的動態範圍，讓零交叉更一致
- **Pre-filter cutoff**：大約 1–2 kHz，太高會讓諧波的零交叉混進來
- **Post-filter**：在 oct1 / oct2 上加一個輕柔的低通，平滑極性切換的不連續點

---

### OC-2 的「缺陷」就是它的個性

- **單音限定**：和弦會讓零交叉偵測混亂，產生不可預測的 glitch
- **追蹤不穩定**：低把位、快速演奏、泛音多的音色都會讓 flip-flop 亂跳
- **Glitch 是特色**：很多人就是喜歡 OC-2「快要失控」的感覺

如果要做數位版，可以考慮提供兩種模式：

- **Clean mode**：加強 pre-filter + 振幅門檻，追蹤穩定但少了類比味
- **Vintage mode**：刻意放寬追蹤容忍度，保留 glitch 和不穩定感

---

### Review 註解（待確認）

以下幾點不是整篇方向錯誤，而是目前寫法有點過度簡化；如果要寫成「OC-2 的實際原理」或「DSP 如何重現 OC-2」，建議再核對：

1. **「低通 → 硬削波 → 方波」這段可能太簡化**
   目前文中把分析級描述成先低通，再硬削波得到方波，接著做頻率除法。這樣有助理解，但 OC-2 的 analyser stage 實際上更接近濾波、peak detection / comparator，再去驅動 flip-flop。若直接寫成單純零交叉或硬削波，讀者容易以為任何 zero-cross based octave-down 都等同於 OC-2。
   參考：
   - https://docs.architolk.nl/subwave/oc-2
   - https://thermionic-studios.com/wiki/index.php?title=OC-2

2. **「半波整流」這段建議改成更保守的說法**
   文中第三步把 sub-octave creator 寫成「鍺二極體半波整流，只留正半週，再交替翻轉極性」。這在概念上接近，但 OC-2 真正的 sub-octave creator 更像是把訊號 clamp / level shift 到虛地附近，再由控制訊號決定極性翻轉；不是教科書式的單純 half-wave rectifier。
   參考：
   - https://docs.architolk.nl/subwave/oc-2

3. **「零延遲」這個詞太絕對**
   說 OC-2 沒有 FFT / buffer 型 pitch shifter 的演算法延遲，這點成立；但若直接寫成「整個過程零延遲」就太滿。更嚴謹的說法應該是：沒有需要 lookahead 的數位 pitch detection 延遲，但仍有濾波與類比級造成的極小群延遲 / 相位延遲，而且控制訊號與原訊號的相位對齊本身就會影響結果。
   參考：
   - https://docs.architolk.nl/subwave/oc-2

4. **DSP 段落把 rising zero-cross 寫成等同於 OC-2 flip-flop edge，建議降一級語氣**
   文中的 DSP 骨架如果目標是「做出可用的 monophonic analog-style octave down」，這樣寫沒有問題；但如果說它「等同於」OC-2 的原理，會過度武斷。比較精確的說法應該是：這是數位版的近似做法，用上升零交叉來模擬類比除頻器的控制事件。
   參考：
   - https://docs.architolk.nl/subwave/oc-2

5. **程式碼範例少了一個 state 成員**
   `processOctaveDown()` 內呼叫了 `state.lpfState`，但 `OctaveDownState` 結構裡沒有宣告它。這不是理論錯誤，但讀者如果直接照抄會無法編譯。
   參考：
   - 文內程式碼需自行補上 `lpfState`

6. **歷史資訊目前看起來大致正確，但可以附官方資料**
   「1982 推出、2003 左右停產、後續由 OC-3 接手」這條線目前沒看到明顯問題；如果想補強可信度，可以直接掛官方 manual / support 頁。
   參考：
   - https://www.boss.info/us/support/by_product/oc-2/?lang=en-US
   - https://cdn.roland.com/assets/media/pdf/OC-2_PSA_OM.pdf
