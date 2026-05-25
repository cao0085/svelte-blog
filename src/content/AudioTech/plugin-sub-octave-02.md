---
title: "Plugin - Sub Octave 02"
date: "2026-05-22"
category: "software"
subCategory: "AudioTech"
tags: ["audio", "dsp", "octave", "pitch", "analog", "oc-2"]
slug: "audio-sub-octave-02"
---

###### 電路解析參考 [architolk 的 OC-2 文件](https://docs.architolk.nl/subwave/oc-2)

---

```text
Input → [Buffer] → [Analyser] → [Sub Octave Creator ×2] → [Output Mix]

```

- **Buffer**：單電源設計，用 virtual ground（4.5V）撐起 AC 訊號，放大約 ×5
- **Analyser**：抓出基頻，產生兩個方波 `stage2` / `stage2inv`
- **Sub Octave Creator**：flip-flop ÷2、÷2，再用控制訊號做極性翻轉
- **Output**：Dry / Oct-1 / Oct-2 三路混音

### Buffer

```text
Signal → [AC Coupling (擋 DC)] → [×5 放大] → [Soft Clip (撞軌)] → Analyser
```

這段是拿來做訊號放大和 DC 隔離(AC coupling)，對目標音頻範圍幾乎沒有影響，值得注意的是類比電路有自然的 clip 限制。數位模擬時重點反而不用放在濾波，而是 op-amp 在訊號夠大時會 **soft clip** 可用 `tanh` 模擬這個軟削波特性：

```python
def tl072_soft_clip(x, rail=3.5/4.5):   # 正規化後的 rail
    return np.tanh(x * 2) * rail # tanh 模擬 op-amp 撞軌的軟削波

input_buffered = tl072_soft_clip(input_signal * 4.7)   # gain ≈ 1 + R5/R6
```

### Analyser

此段目的是要濾出需處理的訊號

```text
Signal → [Lowpass Filter] → [Peak Detector ×2] → [Comparator ×2] → stage2 / stage2inv
```

#### Lowpass Filter

對應電路是 R3(22k)、R4(330k)、C2(220p)、C3 加上 TL072，作用是濾掉高次諧波留基音。如果直接拿訊號去偵測頻率，後面的 flip-flop 會被泛音的小波峰誤觸發、八度音就跑掉了。所以這邊先把訊號「平滑化」，盡量只讓後級看到基頻那個大波形。

```text
基音 (fundamental)：整條弦振動
~~~~~~~~~~~~~~~~~~~  → C3 (約 130Hz)

二次諧波：弦分成兩段振動
~~~~~~~~~|~~~~~~~~~  → C4 (260Hz，高八度)

三次諧波：弦分成三段
~~~~~~|~~~~~~|~~~~~~  → G4 (390Hz)

四次諧波：
~~~~|~~~~|~~~~|~~~~  → C5 (520Hz)
```

而這類前處理在 DSP 裡叫 **fundamental tracking**，是 pitch detection 的 pre-conditioning。類比用低通是因為電路簡單便宜；數位則還可以改用 autocorrelation 直接從訊號找週期，精度更高。

數位最簡單的對應就是一階低通（one-pole LPF），逐 sample 處理：

```cpp
class OnePoleLPF {
public:
    void setCutoff(float cutoff, float sr) {
        // a = 平滑係數，cutoff 越低 a 越小、越平滑
        float x = std::exp(-2.0f * float(M_PI) * cutoff / sr);
        a = 1.0f - x;
    }

    float process(float sample) {
        z += a * (sample - z);   // 朝新樣本靠近一點
        return z;
    }

    void reset() { z = 0.0f; }

private:
    float a = 0.0f;   // 平滑係數
    float z = 0.0f;   // 上一個輸出
};

OnePoleLPF lpf;
lpf.setCutoff(800.0f, 44100.0f);
float filtered = lpf.process(input_buffered);
```

#### Peak Detector * 2

Peak Detector 是一個「記住最大值」的電路，特性是這個最大值會隨時間慢慢衰減。它的用途是替後面的 Comparator 提供一條穩定的門檻。若直接拿原始訊號當門檻，比較結果容易亂跳、觸發時機完全不可預測。Peak Detector 的工作就是把抖動的訊號變成一條穩定、緩慢下滑的線：

```text
原始訊號：  ╭╮  ╭╮  ╭╮
           ╯╰──╯╰──╯╰──

Peak 輸出：  ╭────────╮
            ╯         ╰─   ← 穩定的門檻
```

充放電的行為很直覺：訊號比目前的 peak 大就立刻跟上（充電），比較小就慢慢衰減（放電）。OC-2 用了兩個 Peak Detector，一個追正峰、一個追負峰。

```cpp
class PeakDetector {
public:
    PeakDetector(float decay = 0.9999f)
        : peak(0.0f), decay(decay) {}

    float process(float sample) {
        if (sample > peak)
            peak = sample;        // 充電：立刻跟上
        else
            peak *= decay;        // 放電：慢慢衰減
        return peak;
    }

    void reset() { peak = 0.0f; }

private:
    float peak;
    float decay;
};
```

*peak detector 也用在 compressor 裡先偵測音量，再依此計算要壓多少增益。*

#### Comparator

把訊號跟門檻比大小，大於門檻就輸出「高」、否則「低」。它**不改變週期/頻率**，只是把連續的波形整理成乾淨的開/關訊號。

關鍵在於門檻不是 0，而是 Peak Detector 給的「接近峰值」的那條線。所以訊號只有在**最靠近波峰的那一小段**才會超過門檻，其餘時間都在門檻下面。結果就是：每個週期會冒出一個窄脈衝，對齊在波峰上。

```text
輸入訊號（藍）與門檻（紅，正包絡）：

 1.0        ╭───╮           ╭───╮
 0.7  ───────────────────────────  ← 門檻（Peak Detector 輸出）
 0.0       ╯   ╰───────────╯   ╰

Comparator 輸出：每個正峰冒一個脈衝
      ╭───╮           ╭───╮
──────╯   ╰───────────╯   ╰────
```

OC-2 用兩個 Comparator 各做一次，但門檻分別來自正、負兩個包絡：

- stage2：跟正包絡比，脈衝對齊正峰
- stage2inv：跟負包絡比，脈衝對齊負峰

正峰和負峰剛好差半個週期，所以這兩路脈衝的時機錯開半個週期——`stage2inv` 等於 `stage2` 反相。兩路的脈衝頻率都還是基頻，只是把每個週期的「波峰時刻」和「波谷時刻」分別標記出來，交給後面的 flip-flop 去數。實踐上類比數位差別只在「高/低」用什麼表示；類比電路的高電平是電源（9V，virtual ground 4V）、數位就直接用 `0` / `1`。

```cpp
class Comparator {
public:
    float process(float signal, float threshold) {
        return (signal > threshold) ? 1.0f : 0.0f;
    }
};

Comparator compPos, compNeg;

float stage2    = compPos.process( signal, posEnvelope);
float stage2inv = compNeg.process(-signal, negEnvelope);
```

<!-- ### Sub Octave Creator

每次 `stage2` 上升沿觸發，flip-flop 就翻轉輸出、頻率減半。數位版直接用計數器模擬上升沿偵測：

```text
stage2 → [CD4013 ÷2] → -1 八度
                      → [CD4027 ÷2] → -2 八度
```

```cpp
class FlipFlopDivider {
public:
    float process(float trigger) {
        if (trigger > 0.5f && !lastHigh) {
            state = !state;       // 上升沿翻轉
            lastHigh = true;
        } else if (trigger < 0.5f) {
            lastHigh = false;
        }
        return state ? 1.0f : -1.0f;
    }
private:
    bool state = false;
    bool lastHigh = false;
};
```

減頻處理完後不是直接輸出這個方波，而是用它來控制極性翻轉，原始訊號先用電容 + 鍺二極體 clamp 到 virtual ground 附近，flip-flop 輸出再開關一顆電晶體，讓訊號在正、負半週之間交替切換 —— 等同於每個週期 ×1 / ×−1 交替，頻率折半、音色包絡保留：

```text
flip-flop：  ████░░░░████░░░░  (1 / -1 交替)
原始訊號：   ╭╮╭╮╭╮╭╮╭╮╭╮╭╮╭╮
相乘結果：   ╭╮╭╮╰╯╰╯╭╮╭╮╰╯╰╯  ← 週期加倍，-1 八度
```

clamp 後的波形最低點必須精確對齊 virtual ground，否則兩個半波的接縫有直流偏移，拼起來就多了諧波失真。而類比版本不可能對每個頻率都同時校正到位，反而成為了特色。 -->

---

### 小結

目前為止拿**原始訊號**搓出 2 顆方波 (stage2, stage2inv)，接著就是利用方波的特性，當作`Sub Creator`的觸發開關。

也補充一下，實作八度音效果就是需要控制**頻率**，而當訊號源的泛音列較為複雜，都會需要整理成適合電路處理的格式。OC-2 的 peak-tracking comparator 設計主要是為了讓 flip-flop 的觸發更準確、減少諧波造成的 false trigger，在其他 flip-flop 類的下八度設計中也有類似變體，但純粹做上八度的電路就不需要這個機制。

| 效果器類型 | 核心技術 | 上/下八度 |
|---|---|---|
| OC-2 | Peak-tracking comparator → flip-flop 除頻 | 下 |
| Octavia、SuperFuzz | Full-wave rectification | 上 |
| EHX Micro Synth | FWR + SR flip-flop | 下 |
| POG、Whammy | DSP pitch shifting | 上下都能 |
| Ring mod 類 | Gilbert cell / 類比乘法器 | 上 |