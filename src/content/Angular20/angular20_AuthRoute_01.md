---
title: "Angular20 Auth & Route 01"
date: "2025-12-08"
category: "software"
subCategory: "Angular20"
tags: ["fronted", "angular", "route"]
slug: "angular_AuthRoute_01"
---
###### 基於 RBAC 實作權限控管和畫面渲染，先處理資料結構設計

---

和要求資料庫一致性一樣，越全面的權限控管程式碼就會複雜很多，所以根據專案的使用場景去選擇想要的架構。

這次需求是【登入】後才可以使用的 ERP 系統，其他都導到login、401、403、404 就可以了。這次我的需求是

1. 權限控制的顆粒度設計: 除了按照常見的 admin/manager/user 層級分級外，還需要可以控制到單一使用者的行為。

2. 限制後行為處理: 當不符權限時還需分成不同情況處理，例如
    - 目錄層級沒有權限就不顯示
    - 編輯/刪除操作需要跳出提醒框【尚無權限，請與經理申請開通】

3. 防止緩存、網路異常和惡意攻擊: 即使阻斷使用者入口(隱藏 UI 元件)，後端仍需實作獨立的權限驗證防禦。代表前後端（使用不同語言）必須維護一組權限常數定義。

### DB TABLE

最小實踐 3 張可以完成結構: 人員表 / 行為表 / 人員行為表(多對多)

```json
    // 人員表
    {
        "id": 1, // 唯一識別ID
        "username": "admin",
        "password": "admin123",
        "email": "admin@example.com",
        // 仿 JWT Token
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lWIjoiYWRtaW4ifQ.mock_token_admin"
    },
    // 聲明行為表
    {
        "id": 1, // 唯一就好不重要
        "code": "BASIC_SYSTEM_MODULE", // 常數字串，也要是唯一
        "name": "基礎系統", // 前端顯示字串，也可以在前端維護
        "type": "ROUTE", // 行為定義 "ROUTE" "ACTION" ...
        "module": "BasicSystem", // 方便查詢定義
        "parentId": null // 用樹狀結構關聯行為
    },
    // 連結表 => 該人員可以做甚麼行為
    {
        "userId": 1,
        "claimId": 1
    },
```

```json
{
    "users": [
        {
            "id": 1,
            "username": "admin",
            "password": "admin123",
            "email": "admin@example.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4ifQ.mock_token_admin"
        },
        {
            "id": 2,
            "username": "user01",
            "password": "user123",
            "email": "user01@example.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidXNlcjAxIn0.mock_token_user01"
        }
    ],
    "claims": [
        {
            "id": 1,
            "code": "BASIC_SYSTEM_MODULE",
            "name": "基礎系統",
            "type": "ROUTE",
            "module": "BasicSystem",
            "parentId": null
        },
        {
            "id": 2,
            "code": "BASIC_SYSTEM_LOG",
            "name": "系統日誌",
            "type": "ROUTE",
            "module": "BasicSystem",
            "parentId": 1
        },
        {
            "id": 3,
            "code": "BASIC_SYSTEM_DIRECTORY",
            "name": "系統目錄",
            "type": "ROUTE",
            "module": "BasicSystem",
            "parentId": 1
        },
        {
            "id": 4,
            "code": "BASIC_SYSTEM_LOG_EXPORT",
            "name": "匯出日誌",
            "type": "ACTION",
            "module": "BasicSystem",
            "parentId": 2
        },
    ],
    "userClaims": [
        {
            "userId": 1,
            "claimId": 1
        },
        {
            "userId": 1,
            "claimId": 2
        },
        {
            "userId": 1,
            "claimId": 3
        },
        {
            "userId": 1,
            "claimId": 4
        },
        {
            "userId": 2,
            "claimId": 2
        }
    ]
}
```

這時若要建立 n 帳號，連結表就會新增 n * n 筆資料，要解決資料量需要再開一張 role 定義表，來當作集合使用 ( user -> role -> Claims )

不把 userRoles 直接合併到 user 是因為有可能單一人員有多種身份(A子公司的副理、B子公司的開發人員) 保持可擴充性。

``` json
{
    "users": [
        {
            "id": 5,
            "username": "accountA_manager",
            "email": "manager@example.com"
        }
    ],
    "roles": [
        {
            "id": 2,
            "name": "ACCOUNT_MANAGER",
            "description": "帳戶管理員"
        }
    ],
    // 原先的 userClaims 移除改成 roleClaims
    "userRoles": [
        {
            "userId": 5,
            "roleId": 2  // 基礎角色
        }
    ],
    "roleClaims": [
        {
            "roleId": 2,
            "claimId": 10  // 角色預設權限
        },
        {
            "roleId": 2,
            "claimId": 11 // 角色預設權限
        }
    ],
}
```

現在則是每個角色的權限都一樣，想要開特權/黑名單則需要再開一張表。

```json
{   
    "userClaims": [
        {
            "userId": 5,
            "type": "GRANT", // GRANT=額外給予, DENY=特別剔除
            "claimId": 99,  // 指定權限
            "expiresAt": "2025-12-16T23:59:59Z", // (可選)
            "grantedBy": 1,  // 由誰授予(可選)
            "reason": "緊急處理客戶問題"  // 原因(可選)
        }
    ]
}
```

核心概念就是定義一張權限總表集中管理，存/取方式就用關聯+集合+邏輯判斷。

查詢 SQL 大概會長這樣

```sql

-- 1. 查詢指定使用者的所有權限 (透過角色 + 個人特權/黑名單)
SELECT DISTINCT 
    c.*
FROM users u
-- 透過角色獲得的權限
LEFT JOIN userRoles ur ON u.id = ur.userId
LEFT JOIN roleClaims rc ON ur.roleId = rc.roleId
LEFT JOIN claims c ON rc.claimId = c.id
-- 個人特權權限 (GRANT)
LEFT JOIN userClaims uc ON u.id = uc.userId AND uc.type = 'GRANT'
LEFT JOIN claims c2 ON uc.claimId = c2.id
WHERE u.id = @userId
  AND NOT EXISTS (
      -- 排除黑名單 (DENY)
      SELECT 1 FROM userClaims uc_deny 
      WHERE uc_deny.userId = u.id 
        AND uc_deny.type = 'DENY'
        AND uc_deny.claimId = COALESCE(c.id, c2.id)
        AND (uc_deny.expiresAt IS NULL OR uc_deny.expiresAt > NOW())
  )
  AND (uc.expiresAt IS NULL OR uc.expiresAt > NOW()) -- 檢查特權是否過期
ORDER BY c.module, c.parentId, c.id;


-- 2. 查詢指定使用者的角色資訊
SELECT 
    r.id,
    r.name,
    r.description
FROM users u
JOIN userRoles ur ON u.id = ur.userId
JOIN roles r ON ur.roleId = r.id
WHERE u.id = @userId;


-- 3. 檢查使用者是否有特定權限 (回傳 boolean)
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN 1 
        ELSE 0 
    END AS hasPermission
FROM (
    -- 從角色獲得的權限
    SELECT c.id
    FROM users u
    JOIN userRoles ur ON u.id = ur.userId
    JOIN roleClaims rc ON ur.roleId = rc.roleId
    JOIN claims c ON rc.claimId = c.id
    WHERE u.id = @userId AND c.code = @claimCode
    
    UNION
    
    -- 個人特權 (GRANT)
    SELECT c.id
    FROM userClaims uc
    JOIN claims c ON uc.claimId = c.id
    WHERE uc.userId = @userId 
      AND uc.type = 'GRANT'
      AND c.code = @claimCode
      AND (uc.expiresAt IS NULL OR uc.expiresAt > NOW())
) AS permissions
WHERE NOT EXISTS (
    -- 檢查是否被黑名單排除
    SELECT 1 
    FROM userClaims uc_deny
    JOIN claims c ON uc_deny.claimId = c.id
    WHERE uc_deny.userId = @userId
      AND uc_deny.type = 'DENY'
      AND c.code = @claimCode
      AND (uc_deny.expiresAt IS NULL OR uc_deny.expiresAt > NOW())
);


-- 4. 查詢使用者的所有特權/黑名單 (含過期時間)
SELECT 
    c.code,
    c.name,
    uc.type,
    uc.expiresAt,
    uc.reason,
    u_granter.username AS grantedByUser
FROM userClaims uc
JOIN claims c ON uc.claimId = c.id
LEFT JOIN users u_granter ON uc.grantedBy = u_granter.id
WHERE uc.userId = @userId
ORDER BY uc.type, uc.expiresAt;


-- 5. 查詢指定模組下使用者的所有權限
SELECT DISTINCT 
    c.code,
    c.name,
    c.type
FROM users u
LEFT JOIN userRoles ur ON u.id = ur.userId
LEFT JOIN roleClaims rc ON ur.roleId = rc.roleId
LEFT JOIN claims c ON rc.claimId = c.id
LEFT JOIN userClaims uc ON u.id = uc.userId AND uc.type = 'GRANT'
LEFT JOIN claims c2 ON uc.claimId = c2.id
WHERE u.id = @userId
  AND COALESCE(c.module, c2.module) = @moduleName
  AND NOT EXISTS (
      SELECT 1 FROM userClaims uc_deny 
      WHERE uc_deny.userId = u.id 
        AND uc_deny.type = 'DENY'
        AND uc_deny.claimId = COALESCE(c.id, c2.id)
        AND (uc_deny.expiresAt IS NULL OR uc_deny.expiresAt > NOW())
  )
ORDER BY c.type, c.name;
```

### 前端的資料模型

把 DB 定義的常數值複製一份到前端，避免沒有同步更新、人為字串問題時可以好找錯誤。

```ts
// 對照 DB 的 Code 值，避免人工字串值問題
export enum ClaimCode {
    BASIC_SYSTEM_MODULE = 'BASIC_SYSTEM_MODULE',
    BASIC_SYSTEM_LOG = 'BASIC_SYSTEM_LOG',
    BASIC_SYSTEM_DIRECTORY = 'BASIC_SYSTEM_DIRECTORY',
    BASIC_SYSTEM_PERMISSION = 'BASIC_SYSTEM_PERMISSION',
    BASIC_SYSTEM_LOG_VIEW = 'BASIC_SYSTEM_LOG_VIEW',
    BASIC_SYSTEM_LOG_EXPORT = 'BASIC_SYSTEM_LOG_EXPORT',
    // ...
}

// 看前端如何定義這些行為
export enum ClaimType {
    ROUTE = 'ROUTE',    // 路由權限（頁面訪問）
    ACTION = 'ACTION'   // 操作權限（功能按鈕）
}
```

### 維護更新

以後要新作功能流程時候，就是

1. DB Claim Table 添加一個事件
2. RoleClaim Table 綁定事件權限
3. 前端 ClaimCode.ts 同步添加就可以模組化使用了
