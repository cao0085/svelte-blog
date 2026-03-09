---
title: "RDBMS - 正規化"
date: "2025-07-24"
category: "software"
subCategory: "DataStorage"
tags: ["database", "normalization", "sql"]
slug: "db-normalization"
---

###### 透過拆分、建立正確的鍵與相依關係來消除資料重複與異常的設計原則

---

正規化的目標是減少資料冗餘（redundancy），避免更新異常（update anomaly）、插入異常（insert anomaly）、刪除異常（delete anomaly）。

---

## 正規化等級

### 1NF — 每個欄位必須是原子值

不可包含多值（逗號分隔或陣列）。

```text
❌ 錯誤
UserId | Hobby
-------|-------------------------
1      | "reading, swimming, coding"

✅ 正確
UserId | Hobby
-------|--------
1      | reading
1      | swimming
1      | coding
```

---

### 2NF — 完全依賴主鍵

滿足 1NF，且所有非主鍵欄位必須**完全依賴**主鍵，不能只依賴複合主鍵的一部分。

```text
❌ 錯誤（複合主鍵 OrderID + ProductID，但 OrderDate 只依賴 OrderID）
OrderID | ProductID | OrderDate
--------|-----------|------------
1001    | A1        | 2025-07-01
1001    | A2        | 2025-07-01
```

因為 `OrderDate` 只依賴 `OrderID`，應拆到訂單主檔：

```text
✅ 訂單主檔（Order）
OrderID | OrderDate
--------|------------
1001    | 2025-07-01

✅ 訂單明細檔（OrderDetail）
OrderID | ProductID
--------|-----------
1001    | A1
1001    | A2
```

---

### 3NF — 無傳遞依賴

滿足 2NF，且非主鍵欄位不能依賴其他非主鍵欄位。

```text
❌ 錯誤（DeptName 依賴 DeptID，但 DeptID 不是主鍵 → 傳遞依賴）
StudentID | DeptID | DeptName
----------|--------|------------------
1001      | D01    | Computer Science
```

```text
✅ 正確：將 DeptID → DeptName 拆到 Department 表

Student
StudentID | DeptID
----------|--------
1001      | D01

Department
DeptID | DeptName
-------|--------------------
D01    | Computer Science
D02    | Electrical Engineering
```

---

### BCNF（3.5NF）— 所有函數依賴的左側必須是超鍵

滿足 3NF，且每個函數依賴的決定因子（左側）都必須是超鍵（Super Key）。

```text
❌ 錯誤（Course → Room、Instructor → Room 同時存在，但兩者都不是超鍵）
Course | Instructor | Room
-------|------------|-----
DB     | Smith      | R1
DB     | Jones      | R2
```

```text
✅ 拆成兩張表，讓每個依賴的左側都成為主鍵

CourseRoom
Course | Room
-------|-----
DB     | R1

InstructorRoom
Instructor | Room
-----------|-----
Smith      | R1
```

---

### 4NF — 無多值依賴

若一欄對應多值且彼此無關，應拆表避免笛卡兒積膨脹。

```text
❌ 錯誤（Crust 與 Area 彼此無關，造成所有組合）
Restaurant | Crust   | Area
-----------|---------|----------
X Pizza    | Thick   | Downtown
X Pizza    | Stuffed | Downtown
X Pizza    | Thick   | Uptown
X Pizza    | Stuffed | Uptown

✅ 正確：拆成兩張表
RestaurantCrust: Restaurant | Crust
RestaurantArea:  Restaurant | Area
```

---

### 5NF — 無連接損失

滿足 4NF，並確保拆成多個子關係後再 JOIN 回來不會產生多餘資料。常見於三元以上關聯。

```text
❌ 危險：從三張二元關係表推導出的三元組合可能不正確

Supplier-Part:    S1 | P1
Supplier-Project: S1 | J1
Part-Project:     P1 | J1

→ 拼出的組合 S1 | P1 | J1 可能是錯的（J2 不屬於 P1 的情況）

✅ 保留原始三元關係表
Supplier-Part-Project
Supplier | Part | Project
---------|------|---------
S1       | P1   | J1
```

---

### 實務建議

- 一般業務系統通常設計到 **3NF** 即可，兼顧正規化與查詢效能
- 過度正規化（5NF）會導致 JOIN 過多，反而影響效能
- 有些場景刻意保留冗餘（反正規化）以換取查詢速度，例如報表、分析資料倉儲
