---
title: "Database Consistency 2"
date: "2025-07-28"
category: "software"
subCategory: "Database"
tags: ["consistency", "system", "design","database"]
slug: "database_consistency_2"
---
###### 維持多台 Server 資料唯一性的幾種選擇，[建議閱讀這裡](https://ithelp.ithome.com.tw/articles/10217086)

---

實作時不同伺服器中的時間戳不可當作最新資料的判斷依據

<br>

### Vector Clock

背景設定有 3 台 replica：R1、R2、R3，每個伺服器都有一個 Vector Clock (DB自己處理+1)來追蹤

<br>

Client 讀資料會拿到的格式

```text
value = 100
version = { R1: 1, R2: 1, R3: 0 }
```

Client 寫入資料

```text
{
  value: 99,
  old_version: { R1: 1, R2: 1, R3: 0 }
}
```

若是 R1 收到資料後 → 它把自己的版本數加 1

```text
{ R1: 2, R2: 1, R3: 0 }
```

R2 收到資料後 → 也是一樣，把自己的欄位 R2 +1

```text
{ R1: 1, R2: 2, R3: 0 }
```

之後的取就拿數字最大的版本當作最新來源
