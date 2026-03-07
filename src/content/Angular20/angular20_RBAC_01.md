---
title: "RBAC 01 - Data Design"
date: "2025-12-08"
category: "software"
subCategory: "Angular20"
tags: ["frontend", "angular", "RBAC"]
slug: "angular_rbac_01"
---
###### 以三張核心 DB TABLE 設計 RBAC 權限系統，從最小實踐到角色擴充

---

需求是登入後才可使用的 ERP 系統，其他一律導向 login / 401 / 403 / 404，設計重點：

1. **顆粒度**：除了 admin / manager / user 層級外，還要能控制到單一使用者的行為
2. **限制後行為**：目錄無權限就不顯示；操作無權限彈出提醒框
3. **前後端同步**：阻斷 UI 入口的同時，後端仍需獨立驗證，兩端共用一組權限常數定義

---

### 資料表設計

最小實踐 3 張表：人員表 / 聲明行為表 / 連結表（多對多）

```json
// 人員表
{ "id": 1, "username": "admin", "password": "admin123", "email": "admin@example.com", "token": "..." }

// 聲明行為表 - code 為唯一常數字串，type 區分 ROUTE / ACTION
{ "id": 1, "code": "BASIC_SYSTEM_MODULE", "name": "基礎系統", "type": "ROUTE", "module": "BasicSystem", "parentId": null }

// 連結表 - 該人員擁有哪些行為
{ "userId": 1, "claimId": 1 }
```

帳號一多，連結表筆數會爆增，加一張 Role 表作為集合使用（user → role → claims）

```json
{
  "roles": [{ "id": 2, "name": "ACCOUNT_MANAGER", "description": "帳戶管理員" }],
  "userRoles": [{ "userId": 5, "roleId": 2 }],
  "roleClaims": [{ "roleId": 2, "claimId": 10 }, { "roleId": 2, "claimId": 11 }]
}
```

不把 `userRoles` 合進 `users` 是為了支援一個人員同時擁有多種身份（A 子公司副理、B 子公司開發人員）

若需要對單一使用者開特權或黑名單，再開一張 `userClaims` 補充

```json
{
  "userClaims": [{
    "userId": 5,
    "type": "GRANT",       // GRANT=額外給予, DENY=特別剔除
    "claimId": 99,
    "expiresAt": "2025-12-16T23:59:59Z",
    "grantedBy": 1,
    "reason": "緊急處理客戶問題"
  }]
}
```

---

### SQL 查詢

```sql
-- 查詢指定使用者的所有權限（角色權限 + 個人特權，排除黑名單）
SELECT DISTINCT c.*
FROM users u
LEFT JOIN userRoles ur ON u.id = ur.userId
LEFT JOIN roleClaims rc ON ur.roleId = rc.roleId
LEFT JOIN claims c ON rc.claimId = c.id
LEFT JOIN userClaims uc ON u.id = uc.userId AND uc.type = 'GRANT'
LEFT JOIN claims c2 ON uc.claimId = c2.id
WHERE u.id = @userId
  AND NOT EXISTS (
    SELECT 1 FROM userClaims uc_deny
    WHERE uc_deny.userId = u.id
      AND uc_deny.type = 'DENY'
      AND uc_deny.claimId = COALESCE(c.id, c2.id)
      AND (uc_deny.expiresAt IS NULL OR uc_deny.expiresAt > NOW())
  )
  AND (uc.expiresAt IS NULL OR uc.expiresAt > NOW())
ORDER BY c.module, c.parentId, c.id;


-- 檢查使用者是否有特定權限（回傳 boolean）
SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS hasPermission
FROM (
  SELECT c.id FROM users u
  JOIN userRoles ur ON u.id = ur.userId
  JOIN roleClaims rc ON ur.roleId = rc.roleId
  JOIN claims c ON rc.claimId = c.id
  WHERE u.id = @userId AND c.code = @claimCode

  UNION

  SELECT c.id FROM userClaims uc
  JOIN claims c ON uc.claimId = c.id
  WHERE uc.userId = @userId AND uc.type = 'GRANT' AND c.code = @claimCode
    AND (uc.expiresAt IS NULL OR uc.expiresAt > NOW())
) AS permissions
WHERE NOT EXISTS (
  SELECT 1 FROM userClaims uc_deny
  JOIN claims c ON uc_deny.claimId = c.id
  WHERE uc_deny.userId = @userId AND uc_deny.type = 'DENY' AND c.code = @claimCode
    AND (uc_deny.expiresAt IS NULL OR uc_deny.expiresAt > NOW())
);
```

---

### 前端資料模型

對照 DB 的常數值，避免人工字串問題

```ts
// 對照 DB claims.code，集中管理
export enum ClaimCode {
  BASIC_SYSTEM_MODULE    = 'BASIC_SYSTEM_MODULE',
  BASIC_SYSTEM_LOG       = 'BASIC_SYSTEM_LOG',
  BASIC_SYSTEM_DIRECTORY = 'BASIC_SYSTEM_DIRECTORY',
  BASIC_SYSTEM_LOG_EXPORT = 'BASIC_SYSTEM_LOG_EXPORT',
  // ...
}

// 對照 DB claims.type
export enum ClaimType {
  ROUTE  = 'ROUTE',   // 路由權限（頁面訪問）
  ACTION = 'ACTION'   // 操作權限（功能按鈕）
}
```

---

### 維護流程

新增功能模組時：

1. DB `claims` 表新增一筆行為記錄
2. `roleClaims` 表綁定對應角色
3. 前端 `ClaimCode` 同步新增常數
