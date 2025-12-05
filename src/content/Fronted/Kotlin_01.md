---
title: "Android with Kotlin2.0"
date: "2025-10-12"
category: "software"
subCategory: "Frontend"
tags: ["Android", "Kotlin", "APP"]
slug: "android_01"
---
###### 第一次寫 Android APP : Kotlin2.0 + Jetpack Compose

---

### 環境配置

build.gradle.kts

```kotlin
    plugins {
        alias(libs.plugins.android.application)
        alias(libs.plugins.kotlin.android)
        id("org.jetbrains.kotlin.plugin.compose")
    }

    android {
        namespace = "com.example.test_android"
        compileSdk {
            version = release(36)
        }

        defaultConfig {
            applicationId = "com.example.test_android"
            minSdk = 24
            targetSdk = 36
            versionCode = 1
            versionName = "1.0"

            testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        }

        buildTypes {
            release {
                isMinifyEnabled = false
                proguardFiles(
                    getDefaultProguardFile("proguard-android-optimize.txt"),
                    "proguard-rules.pro"
                )
            }
        }
        compileOptions {
            sourceCompatibility = JavaVersion.VERSION_11
            targetCompatibility = JavaVersion.VERSION_11
        }
        kotlinOptions {
            jvmTarget = "11"
        }

        //
        buildFeatures {
            compose = true
        }
    }

    dependencies {
        implementation(libs.androidx.core.ktx)
        implementation(libs.androidx.appcompat)
        implementation(libs.material)

        implementation(platform(libs.compose.bom))
        implementation(libs.androidx.compose.ui)
        implementation(libs.androidx.compose.ui.graphics)
        implementation(libs.androidx.compose.ui.tooling.preview)
        implementation(libs.androidx.compose.material3)
        debugImplementation(libs.androidx.compose.ui.tooling)
        debugImplementation(libs.androidx.compose.ui.test.manifest)
        implementation(libs.androidx.activity.compose)
        implementation(libs.androidx.lifecycle.viewmodel.compose)
        implementation(libs.androidx.lifecycle.runtime.ktx)
        implementation(libs.androidx.navigation.compose)

        testImplementation(libs.junit)
        androidTestImplementation(libs.androidx.junit)
        androidTestImplementation(libs.androidx.espresso.core)
    }
```

``` .toml
[versions]
agp = "8.13.1"
kotlin = "2.0.21"
coreKtx = "1.10.1"
junit = "4.13.2"
junitVersion = "1.1.5"
espressoCore = "3.5.1"
appcompat = "1.6.1"
material = "1.10.0"

# Jetpack Compose
composeBom = "2024.12.01"
activityCompose = "1.9.3"
lifecycleViewmodelCompose = "2.8.7"
lifecycleRuntimeKtx = "2.8.7"
navigationCompose = "2.8.6"

```

### 入口設定

Android 會自己抓，AndroidManifest.xml 裡面的 Activity LAUNCHER 相關當作 APP 啟動的入口，然後根據開發模式設計成
-  Activity + Navigation 一個主視窗管理分頁
- 多個 Activity

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- 主執行緒 -->
    <application 
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.TEST_Android">
        <!-- activity = 單個主視窗，類似 Electron Windows -->
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <!-- activity...-->
    </application>

</manifest>
```

Activity.kt

```kt
package com.example.test_android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview

// 1. 繼承 ComponentActivity
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        // 1. 初始化邏輯 savedInstanceState 系統自己儲存的參數
        super.onCreate(savedInstanceState)

        // 檢查是否有之前儲存的狀態
        if (savedInstanceState != null) {
            val userName = savedInstanceState.getString("user_name")
            val score = savedInstanceState.getInt("score")
        } else {
            // 第一次啟動,使用預設值
        }
        // From Jetpack Compose fun setContent(content: @Composable () -> Unit)
        setContent(content = { MyAPP() })
    }
    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putString("user_name", "Tony")
        outState.putInt("score", 100)
    }
}
@Preview(showBackground = true)
@Composable
fun MyAPP(modifier: Modifier = Modifier) {
    MaterialTheme {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            Text(
                text = "Hello Android!",
                modifier = modifier
            )
        }
    }
}
```

### 執行緒

Android 系統有 Application Not Responding 機制，主執行緒卡住超過一定時間，Android 系統就會判定你的 App 沒反應，然後跳出系統層級的「關閉 App」的對話框。

實務上可以理解 主執行緒(單) = UI Thread 和背景處理執行緒(多) = Background Threads，每條獨立的 Background Thread 內部會自動堵塞，而 Coroutine 則使用 launch()、 withContext() 來決定需不需要等待結果。

#### 發文

切換執行緒前先卡一個 isLoading 遮罩，等待背景執行緒的回應結果
讓主執行緒"持續"跑【載入中】的畫面和 APP 不會被 ANR && 觸發新的事件

```kotlin
class CreatePostViewModel : ViewModel() {
    
    private val _isPosting = MutableStateFlow(false)
    val isPosting: StateFlow<Boolean> = _isPosting
    
    fun publishPost(text: String, images: List<Uri>) {
        viewModelScope.launch {
            
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // 執行緒 1: UI Thread
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            _isPosting.value = true  // 顯示 Loading 卡住畫面
            
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // 執行緒 2: Background Thread + withContext 等待回應
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            val success = withContext(Dispatchers.IO) {
                try {
                    // 1. 上傳圖片
                    val imageUrls = images.map { uri ->
                        uploadImage(uri)  // 網路請求
                    }
                    
                    // 2. 發送貼文
                    api.createPost(
                        text = text,
                        images = imageUrls
                    )
                    
                    // 3. 儲存到本地資料庫
                    database.insertPost(...)
                    
                    true
                } catch (e: Exception) {
                    false
                }
            }
            
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // 執行緒 1: UI Thread (自動切回)
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            _isPosting.value = false  // 隱藏 Loading
            
            if (success) {
                // 顯示成功訊息,導航回首頁
                _navigationEvent.value = NavigateToHome
            } else {
                // 顯示錯誤訊息
                _errorMessage.value = "發文失敗"
            }
        }
    }
}
```

#### 取得當前文章瀏覽數

主執行緒可以持續使用不影響，只要在開背景執行緒拿到結果後更新到該 UI 的值就可以了

```kotlin
class ArticleViewModel : ViewModel() {
    
    private val _viewCount = MutableStateFlow(0)
    val viewCount: StateFlow<Int> = _viewCount
    
    fun fetchViewCount(articleId: String) {
        viewModelScope.launch {
            
            // （直接切換執行緒，不需要 loading 遮罩）

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // 執行緒 2: Background Thread + 等待回應
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            val count = withContext(Dispatchers.IO) {
                try {
                    api.getViewCount(articleId)  // 網路請求
                } catch (e: Exception) {
                    0  // 失敗預設值
                }
            }
            
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // 執行緒 1: UI Thread (自動切回)
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            _viewCount.value = count  // 更新 UI 值
        }
    }
}
```

#### 瀏覽紀錄給伺服器 (純發送)

開發商紀錄用的，所以不管有無成功都不應該影響使用者 UI

```kotlin
class ArticleViewModel : ViewModel() {
    
    fun recordPageView(articleId: String) {
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // launch(Dispatchers.IO) 切到 Background Thread（發射並忘記 fire-and-forget）
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        viewModelScope.launch(Dispatchers.IO) {
            try {
                api.recordPageView(articleId)  // 發送請求
                // 上傳完就結束，不等待，也不需要回傳結果
            } catch (e: Exception) {
                // 失敗也不用處理，靜默忽略
                Log.e("PageView", "Failed to record", e)
            }
        }
    }
}
```

剩下還有輪詢通知(launch + while)、並行載入(async + await)和即時監聽(Flow.collect)等等

### 錯誤處理

UI 執行緒上不應牽涉外部邏輯，錯誤等同程式設計上有漏洞，應該直接特殊處理或崩潰

例如 APP 在未登入的情況下，被進入到某個分頁

```kotlin
// 這種錯誤應該 Crash,讓開發者知道有 Bug
val userId = intent.getIntExtra("user_id", -1)
if (userId == -1) {
    throw IllegalArgumentException("user_id is required!")  // 應該 Crash
}
```

而 Background Thread 則是需要去處理每個錯誤，防 APP 因為外力而崩潰

```kotlin

// 可以先設計預期內錯誤的 error type

// RetrofitClient.kt (全域設定)
object RetrofitClient {
    private val okHttpClient = OkHttpClient.Builder()
        .connectTimeout(10, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()
    
    val api: ApiService = Retrofit.Builder()
        .baseUrl("https://api.threads.net")
        .client(okHttpClient)
        .build()
        .create(ApiService::class.java)
}
 

// ViewModel.kt (再加 Timeout catch)
fun loadPosts() {
    viewModelScope.launch {
        try {
            // 額外的 Timeout 保護 (可選)
            withTimeout(10000) {
                val posts = withContext(Dispatchers.IO) {
                    repository.getPosts()  // 已經有 HTTP Timeout
                }
                _posts.value = posts
            }
        } catch (e: TimeoutCancellationException) {
            _error.value = "載入超時"
        } catch (e: Exception) {
            _error.value = "載入失敗"
        }
    }
}
```
