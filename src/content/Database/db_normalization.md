---
title: "Database Normalization 筆記"
date: "2025-07-24"
category: "software"
subCategory: "Database"
tags: ["database", "normalization", "sql"]
slug: "db_normalization"
---
關聯式資料庫中的正規化（Normalization）是用來消除資料重複與異常的設計原則，主要透過將資料拆分成不同表格、建立正確的鍵與相依關係來達成。

---

## 正規化等級對照表

1NF 每個欄位都必須是原子值（不可包含多值，例如逗號分隔或陣列）

```text
錯誤
UserId | Hobby
-------|--------
1      | "reading, swimming, coding"

正確
UserId | Hobby
-------|--------
1      | reading
1      | swimming
1      | coding
```

2NF 滿足 1NF，所有非主鍵欄位必須完全依賴主鍵，不能只依賴主鍵的一部分（常發生在複合主鍵情況）

錯誤 (複合主鍵 OrderID + ProductID，但 OrderDate 只依賴 OrderID)

```text
OrderID | ProductID | OrderDate
--------|-----------|------------
1001    | A1        | 2025-07-01
1001    | A2        | 2025-07-01
```

因為 OrderDate 只依賴 OrderID，所以應該從明細表中拆出來，存放在訂單主檔中。

```text
-- 訂單主檔（Order）
OrderID | OrderDate
--------|------------
1001    | 2025-07-01

-- 訂單明細檔（OrderDetail）
OrderID | ProductID
--------|-----------
1001    | A1
1001    | A2
```

3NF 滿足 2NF 非主鍵欄位不能依賴其他非主鍵欄位（即無傳遞依賴）

錯誤：這裡 DeptName 是依賴 DeptID，但 DeptID 不是主鍵 → 傳遞依賴

```text
StudentID | DeptID | DeptName
----------|--------|----------
1001      | D01    | Computer Science
```

正確做法：將 DeptID → DeptName 拆到 Department 表

```text
StudentID | DeptID
----------|--------
1001      | D01
1002      | D02

DeptID | DeptName
-------|--------------------
D01    | Computer Science
D02    | Electrical Engineering
```

BCNF（Boyce-Codd Normal Form / 3.5NF）滿足 3NF，所有函數依賴的左側必須是超鍵（Super Key）

錯誤 (Course → Room、Instructor → Room 同時存在，但都不是超鍵，則違反 BCNF。)

```text
Course | Instructor | Room
-------|------------|-----
DB     | Smith      | R1
DB     | Jones      | R2
```

拆成兩張表，每個依賴的左側都變成主鍵（超鍵）：

```text
-- 課程與教室（CourseRoom）
Course | Room
-------|-----
DB     | R1

-- 講師與教室（InstructorRoom）
Instructor | Room
-----------|-----
Smith      | R1
```

4NF 無多值依賴（Multivalued Dependency），若一欄對應多值且彼此無關，應拆表避免組合膨脹

錯誤 Crust 與 Area 無關，造成笛卡兒組合

```text
錯誤
Restaurant | Crust   | Area
-----------|---------|--------
X Pizza    | Thick   | Downtown
X Pizza    | Stuffed | Downtown
X Pizza    | Thick   | Uptown
X Pizza    | Stuffed | Uptown
```

正確 拆成兩張表

```text
Restaurant | Crust
Restaurant | Area
```

5NF 滿足 4NF，並確保將資料拆成多個子關係後，再重新 join 回來時不會產生多餘資料（避免 join loss）。
常見於 三元以上關聯（例如三欄組合關係）。

假設你用以下三張表建構資料：

```text
-- Supplier-Part
S1 | P1

-- Supplier-Project
S1 | J1

-- Part-Project
P1 | J1

-- 拼出來的關聯（有可能是錯的）
Supplier | Part | Project
---------|------|---------
S1       | P1   | J1  （合理）
S1       | P1   | J2  （若 J2 並不屬於 P1）
```

在滿足 5NF 的設計中，會保留一張三元關聯表來表達實際的資料：

```text
-- Supplier-Part-Project
Supplier | Part | Project
---------|------|---------
S1       | P1   | J1
```