---
title: "Effect - Oscillators"
date: "2026-05-12"
category: "software"
subCategory: "AudioTech"
tags: ["audio", "cpp", "dsp", "plugin", "juce"]
slug: "audio-effect-oscillators"
---

###### 從《 Designing Audio Effect Plug-Ins in C++ 》了解一下基礎特性

---

### Oscillators

振盪器的核心概念就是「能量在兩個儲能元件之間來回交換」—— 最簡單的例子是 LC 電路：電感（L）儲存磁場能量、電容（C）儲存電場能量，兩者互相充放電，就會產生正弦波。只要系統沒有損耗（電阻=0），這個振盪就會永遠持續。物理上還有一個關鍵條件：系統需要一個初始擾動（initial kick）才能啟動，啟動後靠「回饋」維持，數位振盪器也保留了這個概念，只是用數學結構取代物理元件。在音頻效果裡，振盪器可以應用在:

- 作為聲音來源：合成器按下琴鍵時，振盪器產生特定頻率的波形，這個波形就是聲音本身，加法合成和音頻測試訊號都屬於這類用法。

- 作為控制訊號：振盪器輸出的波形不進喇叭，而是去週期性地調變另一個參數 —— 最典型的例子是 Chorus 效果器，一個低頻振盪器（LFO）產生緩慢的正弦波，這個波形持續改變延遲時間，讓音高微微飄移。

#### Direct Form Oscillators

把一對極點（poles）放在 z 平面的「單位圓」上。極點在圓上 = 系統能量不衰減也不爆炸，永遠振盪。這就是數位版的「LC 電路無損耗條件」。振盪頻率由極點的角度 θ 決定，結構上就是一個沒有輸入的 IIR 回饋濾波器，靠預設的初始值啟動。缺點是換頻率時需要重新計算初始條件，稍微處理不好就會有爆音（pop）。

#### Gordon–Smith Oscillators

換個環狀結構，用兩個延遲元素互相交叉回饋，神奇的是這樣同時產生 sin 和 cos 兩路輸出，相位差剛好 90 度（正交輸出）。設計上每路輸出只需一個延遲，換頻率時幾乎不用重設，聲音切換更平順，純淨度達到儀器等級，是三種方法中品質最高的正弦振盪器。

#### Wavetable　Oscillators

預先把一個完整週期的波形（可以是正弦、鋸齒、方波、三角，甚至任何錄音樣本）存進一個 1024 點的環狀緩衝區。播放時根據目標頻率計算「讀取步進量」，以小數點精度在兩個取樣之間做線性插值（linear interpolation）讀出。這個方法的靈活性最高，任何波形都能做，但鋸齒波和方波本身含有無限泛音，超過 Nyquist 頻率的泛音會折疊回來造成 aliasing（頻率混疊）。

*其餘補充 : Wavetable aliasingBand-limited wavetable、BLEP（Band-Limited Step）、CORDIC 演算法、DPW（Differentiated Parabolic Waveform）*
