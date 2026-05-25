---
title: "Plugin - Basic"
date: "2026-05-19"
category: "software"
subCategory: "AudioTech"
tags: ["audio", "cpp", "dsp", "plugin"]
slug: "audio-plugin-process-block"
---

###### 用 JUCE plugin 出發看 audio plugin 如何處理即時處理聲音

---

不管太複雜的函式邏輯先從 `sample` 去理解，在 JUCE 裡 host 會定期呼叫 `processBlock()`，並丟進來一小包 audio buffer：

```cpp
void ExampleAudioProcessor::processBlock(juce::AudioBuffer<float>& buffer, juce::MidiBuffer&)
{
    juce::ScopedNoDenormals noDenormals;

    // 取得此批 buffer 單位訊息
    const int numSamples = buffer.getNumSamples();
    const int numChannels = juce::jmin(buffer.getNumChannels(), getTotalNumOutputChannels());
    if (numSamples == 0 || numChannels == 0)
        return;

    for (int ch = getTotalNumInputChannels(); ch < getTotalNumOutputChannels(); ++ch)
        buffer.clear(ch, 0, numSamples);
    
    // 開始自訂義每個 sample 如何處理
    const auto params = readParams();
    for (int n = 0; n < numSamples; ++n)
    {   
        dsp::beginEffectChainFrame(chainState, params, currentSampleRate);

        for (int ch = 0; ch < numChannels; ++ch)
        {
            const float x = buffer.getSample(ch, n);
            const float y = dsp::processEffectChainSample(x, ch, chainState, params, currentSampleRate);
            buffer.setSample(ch, n, y); 
        }
    }
}
```

#### buffer

假設傳入 stereo audio 那麼在拿到 buffer 時就會是兩條 channel 資料：

```text
            sample 0   sample 1   sample 2   sample 3
channel 0      L0         L1         L2         L3
channel 1      R0         R1         R2         R3
```

所以：

```cpp
buffer.getSample(0, 100); // Left channel 的第 100 個 sample
buffer.getSample(1, 100); // Right channel 的第 100 個 sample
```

---

### Sample Process

```cpp
// 取一個時間點(numSamples是有序排列的)
for (int n = 0; n < numSamples; ++n)
{   
    // 每個時間點只推進一次 state，避免各 channel 重複消費。
    dsp::beginEffectChainFrame(chainState, params, currentSampleRate);

    // 同時間點的每條 channel 都執行
    for (int ch = 0; ch < numChannels; ++ch)
    {
        const float x = buffer.getSample(ch, n);

        // 每個 Sample 都執行
        const float y = dsp::processEffectChainSample(x, ch, chainState, params, currentSampleRate);

        // 回寫該 channel 的 sample
        buffer.setSample(ch, n, y);
    }
}
```

設計模式不多，實踐上就是從哪個分類開始 `for loop`，狀態在不同模組間有無需要共用等等

#### Sample-by-sample

如上面範例，適合需要跨 channel 同步 state 的效果，例如 mid/side processing、stereo imager。

```cpp
for (int n = 0; n < numSamples; ++n)
    for (int ch = 0; ch < numChannels; ++ch)
```

#### Channel-first

```cpp
for (int ch = 0; ch < numChannels; ++ch)
    for (int n = 0; n < numSamples; ++n)
```

適合每個 channel 完全獨立的效果，例如 per-channel EQ、compressor（mono link 關閉時）。Cache 友好，pointer 連續讀取：

```cpp
auto* channelData = buffer.getWritePointer(ch);
for (int n = 0; n < numSamples; ++n)
    channelData[n] = process(channelData[n]);
```

#### Block-level

JUCE 的 ProcessorChain 底層就是一次把整個 block 傳給每個 processor。串接多個效果時不用手寫巢狀 loop，但 state 管理被封裝進各 processor 裡。

```cpp
juce::dsp::AudioBlock<float> block(buffer);
juce::dsp::ProcessContextReplacing<float> context(block);
chain.process(context);
```

#### SIMD / 向量化

gain、filter coefficient 套用這類 stateless 或可向量化的運算才適合。有 state dependency（例如 IIR filter 的 feedback）就不能直接向量化。

```cpp
// 手動一次處理 4 個 sample（SSE）
for (int n = 0; n < numSamples; n += 4)
{
    __m128 x = _mm_loadu_ps(&channelData[n]);
    __m128 y = process_simd(x);
    _mm_storeu_ps(&channelData[n], y);
}
```
