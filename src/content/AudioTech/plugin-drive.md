---
title: "Plugin - Drive"
date: "2026-05-20"
category: "software"
subCategory: "AudioTech"
tags: ["audio", "cpp", "dsp", "drive", "saturation"]
slug: "audio-plugin-drive"
---

###### 實作 Drive Effect 了解一個 sample 是怎麼被修改

---

從一顆未處理的 sample `x` 出發，最後 return 一個 `float y`，所有控制參數都從 `params` 進來。

```cpp
inline float processDriveSample(float x, const DriveParams& params) noexcept
{   
    if (params.bypassed)
        return x;
    
    const float a = juce::jlimit(0.0f, 1.0f, params.amount); // 0 ~ 100%，通常來自旋鈕
    const float driven = x * driveInputGain(a);              // 先把訊號推大

    const float saturated     = consoleSaturate(driven, a);              // 主要破音
    const float lowFoundation = driveCleanFoundation(x, a);              // 乾淨基礎層
    const float edge          = driveFuzzyEdge(driven - lowFoundation, a); // 抓毛邊

    const float bodyBlend = juce::jmap(a, 0.0f, 1.0f, 0.72f, 0.50f);
    const float y = (saturated * bodyBlend + lowFoundation + edge)
                  * driveMakeupGain(a)
                  * juce::jmax(0.0f, params.effectVol); // 三層混和 + 補償 + 音量

    return juce::jlimit(-1.55f, 1.55f, y);
}
```

整顆函式做三件事：把訊號推大、做飽和、再把三層聲音混在一起。

#### 推大 sample

Drive 設計的慣例是先把訊號推大，再餵進 saturation。這邊 `driveInputGain(a)` 最大會推到 `10.5` 倍，所以 amount 越高，driven 越大，後面 saturation 也就越明顯。

呼叫端：

```cpp
const float driven = x * driveInputGain(a);
W
inline float driveInputGain(float amount) noexcept
{
    const float a = juce::jlimit(0.0f, 1.0f, amount);
    return juce::jmap(a * a, 0.0f, 1.0f, 1.0f, 10.5f);
}
```

注意這裡用的是 `a * a`，不是 `a`。意思是 amount 旋鈕在前半段轉動時 gain 增加很慢，到後半段才急劇拉起來，比較貼近耳朵對 Drive 量感的感受，旋鈕轉到一半不會就直接爆掉。

#### 主要算法

這條 curve 由三種非線性混出來：`tanh` 佔 0.58，負責比較圓的 soft saturation；`atan` 佔 0.34，補中頻 body；`sin` 佔 0.08，加一點 edge harmonic。

```cpp
inline float consoleSaturationCurve(float x, float amount) noexcept
{
    const float a = juce::jlimit(0.0f, 1.0f, amount);
    const float rounded  = std::tanh(x * (1.05f + a * 0.45f));
    const float atanBody = (2.0f / juce::MathConstants<float>::pi) * std::atan(x * (1.0f + a * 1.15f));
    const float sineEdge = std::sin(juce::jlimit(-1.45f, 1.45f, x) * (1.0f + a * 0.28f));

    return 0.58f * rounded + 0.34f * atanBody + 0.08f * sineEdge;
}
```

***我也不懂原理但滿好聽的***

#### 保留乾淨基礎層

實作很單純，就是把**原始訊號 `x`**（注意不是 `driven`）縮小一點留著，當作底層支撐。可以把它當成一個「基數」，但又不是完整的 dry signal — Drive amount 越高，這份 foundation 就讓出越多空間給上面的飽和與毛邊。

呼叫端：

```cpp
const float lowFoundation = driveCleanFoundation(x, a);

inline float driveCleanFoundation(float x, float amount) noexcept
{
    const float a = juce::jlimit(0.0f, 1.0f, amount);
    return x * juce::jmap(a, 0.0f, 1.0f, 0.82f, 0.58f);
}
```

兩個關鍵點：

- 縮放比例從 `0.82` 線性降到 `0.58`，不會降到 0，所以 bass / body 永遠有一份乾淨訊號撐著，整顆聲音不會在 amount 拉高時整個糊掉。
- 輸入是 `x` 而不是 `driven`，所以這層完全沒被 input gain 推過，保留的是真正乾淨的能量。

#### Edge

毛邊這層的輸入用的是 `driven - lowFoundation`，也就是 **drive residue** — 訊號被推大之後、扣掉乾淨基礎那份，剩下來的「額外能量」。但它不是頻率分層 (`lowFoundation` 不是 lowpass)，而是**訊號預算的分層**：

- 乾淨那份 (`lowFoundation`) 直接加回去，不破音。
- 多出來的那份 (`driveResidue`) 才送進 fuzzy edge 做非線性。

這樣的好處是：amount 低時 `driveGain ≈ 1.0`、`foundationGain ≈ 0.82`，residue 很小、edge 自然很輕；amount 高時 `driveGain ≈ 10.5`、`foundationGain ≈ 0.58`，residue 變大、edge 才會兇起來。整個毛邊量會跟 Drive 推動感連動，而不是另外疊一層固定噪。

```cpp
const float edge = driveFuzzyEdge(driven - lowFoundation, a);

inline float driveFuzzyEdge(float x, float amount) noexcept
{
    const float a      = juce::jlimit(0.0f, 1.0f, amount);
    const float shaped = std::sin(juce::jlimit(-1.35f, 1.35f, x * (1.0f + a * 0.7f)));
    const float folded = std::tanh((x + shaped * 0.18f) * (1.0f + a * 1.4f));
    return folded * juce::jmap(a, 0.0f, 1.0f, 0.18f, 0.42f);
}
```

### 三層聲音加起來

```cpp
const float bodyBlend = juce::jmap(a, 0.0f, 1.0f, 0.72f, 0.50f);
const float y = (saturated * bodyBlend + lowFoundation + edge)
              * driveMakeupGain(a)
              * juce::jmax(0.0f, params.effectVol);
```

這就是 layer mixing：`saturated * bodyBlend` 是飽和主體、`lowFoundation` 是乾淨基礎、`edge` 是毛邊。三層都是 sample 數字，直接相加就好。

後面再乘上兩個 gain：`driveMakeupGain(a)` 是 Drive amount 相關的音量補償，`params.effectVol` 則是整顆 Drive module 的音量。

最後：

```cpp
return juce::jlimit(-1.55f, 1.55f, y);
```

把輸出夾在 `-1.55` 到 `1.55` 之間，避免太誇張的數值跑出去。
