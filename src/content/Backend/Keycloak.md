---
title: "Keycloak"
date: "2026-09-09"
category: "software"
subCategory: "Backend"
tags: ["Keycloak", "backend", "auth"]
slug: "keycloak"
---
###### Keycloak

---

### Setting

docker compose

```yml
services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.4
    container_name: cms_keycloak
    command:
      - start-dev
      - --import-realm
    environment:
      KC_BOOTSTRAP_ADMIN_USERNAME: admin
      KC_BOOTSTRAP_ADMIN_PASSWORD: admin
      KC_HTTP_PORT: 8080
      KC_HEALTH_ENABLED: 'true'
    ports:
      - '20050:8080'
    volumes:
      - ./realm-export.json:/opt/keycloak/data/import/realm-export.json:ro
    healthcheck:
      test:
        [
          'CMD-SHELL',
          "exec 3<>/dev/tcp/127.0.0.1/9000; echo -e 'GET /health/ready HTTP/1.1\\r\\nHost: localhost\\r\\nConnection: close\\r\\n\\r\\n' >&3; grep -q '\"status\": \"UP\"' <&3",
        ]
      interval: 10s
      timeout: 5s
      retries: 20
      start_period: 30s
```

```json
{
  "realm": "erp-system",
  "enabled": true,
  "sslRequired": "none",
  "registrationAllowed": false,
  "loginTheme": "keycloak",
  "accessTokenLifespan": 300,
  "ssoSessionIdleTimeout": 1800,
  "ssoSessionMaxLifespan": 36000,
  "roles": {
    "client": {
      "cms-backend": [
        {
          "name": "admin",
          "description": "系統管理員（後端 IdentityEndpoints 會直接放行全部選單）"
        },
        {
          "name": "user",
          "description": "一般使用者（權限走 DB 的 InternalUser 對應）"
        }
      ]
    }
  },
  "clients": [
    {
      "clientId": "cms-backend",
      "name": "CMS Backend (confidential)",
      "description": "後端 API 的 resource server；同時用 client_credentials 呼叫 Keycloak Admin API",
      "enabled": true,
      "protocol": "openid-connect",
      "publicClient": false,
      "bearerOnly": false,
      "secret": "dev-cms-backend-secret",
      "standardFlowEnabled": false,
      "implicitFlowEnabled": false,
      "directAccessGrantsEnabled": true,
      "serviceAccountsEnabled": true,
      "fullScopeAllowed": true,
      "attributes": {
        "access.token.lifespan": "300"
      }
    },
    {
      "clientId": "cms-frontend",
      "name": "CMS Frontend SPA (public)",
      "description": "Angular SPA，Authorization Code + PKCE",
      "enabled": true,
      "protocol": "openid-connect",
      "publicClient": true,
      "bearerOnly": false,
      "standardFlowEnabled": true,
      "implicitFlowEnabled": false,
      "directAccessGrantsEnabled": false,
      "serviceAccountsEnabled": false,
      "fullScopeAllowed": true,
      "redirectUris": [
        "http://localhost:4200/*",
        "http://127.0.0.1:4200/*"
      ],
      "webOrigins": [
        "http://localhost:4200",
        "http://127.0.0.1:4200"
      ],
      "attributes": {
        "pkce.code.challenge.method": "S256",
        "post.logout.redirect.uris": "http://localhost:4200/*##http://127.0.0.1:4200/*"
      },
      "protocolMappers": [
        {
          "name": "cms-backend-audience",
          "protocol": "openid-connect",
          "protocolMapper": "oidc-audience-mapper",
          "consentRequired": false,
          "config": {
            "included.client.audience": "cms-backend",
            "id.token.claim": "false",
            "access.token.claim": "true",
            "introspection.token.claim": "true"
          }
        }
      ]
    }
  ],
  "users": [
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "username": "admin.test",
      "email": "admin.test@example.com",
      "firstName": "測試",
      "lastName": "管理員",
      "enabled": true,
      "emailVerified": true,
      "credentials": [
        {
          "type": "password",
          "value": "Test1234!",
          "temporary": false
        }
      ],
      "clientRoles": {
        "cms-backend": ["admin"]
      }
    },
    {
      "id": "22222222-2222-2222-2222-222222222222",
      "username": "user.test",
      "email": "user.test@example.com",
      "firstName": "測試",
      "lastName": "使用者",
      "enabled": true,
      "emailVerified": true,
      "credentials": [
        {
          "type": "password",
          "value": "Test1234!",
          "temporary": false
        }
      ],
      "clientRoles": {
        "cms-backend": ["user"]
      }
    },
    {
      "username": "service-account-cms-backend",
      "enabled": true,
      "serviceAccountClientId": "cms-backend",
      "clientRoles": {
        "realm-management": [
          "view-realm",
          "view-users",
          "query-users",
          "query-groups",
          "manage-users",
          "view-clients",
          "query-clients",
          "manage-clients"
        ]
      }
    }
  ]
}
```

### Core

#### Manage

- Realms : 網域管理一組使用者、憑證、角色和群組。使用者歸屬於某個網域並登入該網域。各個域相互隔離，僅能管理和驗證其所轄範圍內的使用者。

- Roles : 標識使用者的類型或類別。管理者、普通使用者、經理和員工都是組織中常見的角色。應用程式通常將存取權限分配給特定的角色，因為針對單一用戶進行管理往往過於瑣碎且難以維護。

- Users : 能夠登入系統的實體。他們可以擁有諸如電子郵件、使用者名稱、地址、電話號碼和生日等相關屬性，也可以被分配到特定群組並被賦予特定角色。

- User Role Mapping : 一個使用者可以關聯零個或多個角色。此類資訊可封裝在令牌（token）和斷言（assertion）中，以便應用程式能夠據此確定對所管理各類資源的存取權限。

- Composite Roles : 複合角色是指可以與其他角色相關聯的角色。例如，一個「超級使用者」複合角色可以與「銷售管理員」和「訂單輸入管理員」角色相關聯。

- Groups : 用於管理使用者（Users）群體。可以為群組定義屬性，也可以將角色對應到群組。成為群組內成員的用戶，將繼承該群組所定義的屬性及角色映射。

#### Clients

- Clients : 能夠請求 Keycloak 對使用者進行身份驗證的實體。通常是指希望利用 Keycloak 來保障資安並提供單一登入（SSO）解決方案的應用程式和服務。此外，用戶端也可以是僅需取得身分資訊或存取權杖的實體，以便安全地呼叫網路中受 Keycloak 保護的其他服務。

- Client Scopes : 在註冊用戶端時，必須為該客戶端定義協定映射器（protocol mappers）和角色範圍映射（role scope mappings）。通常，定義「客戶端範圍」（client scope）會很有用，因為它可以共用通用設置，從而簡化新客戶端的建立過程。此外，它還支援根據 scope 參數的值，有條件地請求特定的聲明（claims）或角色。 Keycloak 為此提供了「客戶端範圍」這個概念。

- Client Role : 客戶可以定義專屬於自己的角色。這本質上是一個專屬於該客戶的角色命名空間。

- Service Account : 每個客戶端都有一個內建的服務帳戶，允許其取得存取權杖。

#### Auth

- Identity Token : 一種提供使用者識別資訊的令牌，屬於 OpenID Connect 規範的一部分。

- Authorization & Authentication : 授予使用者存取權限 & 識別並驗證使用者的過程。

- Credentials : 憑證是 Keycloak 用於驗證使用者身分的資料。例如密碼、一次性密碼、數位證書，甚至是指紋。

- Consent : 指在客戶端（Clients）參與身份驗證流程之前，管理員（Admin）要求使用者（User）授予該用戶端授權的機制。當使用者提交憑證（密碼、指紋）驗證成功後會彈出介面，顯示請求登入的用戶端（Clients）資訊以及該用戶端（Clients）向使用者（User）索取的身份資訊；使用者隨後可決定是否授予該請求。

- Access Token : 一種可作為 HTTP 請求一部分提供的令牌，用於授予對所呼叫服務的存取權限。這是 OpenID Connect 和 OAuth 2.0 規範的一部分。

- Assertion : 關於用戶的資訊。這通常指包含在 SAML 身份驗證回應中的 XML 資料區塊，其中提供了有關已通過身份驗證的使用者的身份元資料。

- Direct Grant : 一種客戶端透過 REST 呼叫代表使用者取得存取令牌的方式。

- Protocol Mappers : 可以針對每個客戶端，自訂儲存在 OIDC 令牌或 SAML 斷言中的聲明（claims）與斷言內容。具體做法是為每個客戶端建立並配置協定映射器。

- Session : 當使用者登入時，系統會建立一個會話來管理該登入會話。會話中包含諸如使用者登入時間以及在該會話期間參與了單一登入（SSO）的應用程式等資訊。管理員和使用者均可查看會話資訊。

### Web App Authentication Flow

#### Public Access

這流程解決的是「如何在不約定 Sercret Key 的情況下完成認證授權?」

1. 取得雜湊值 : 前台產生 code_verifier 雜湊算出 code_challenge，並把 verifier 存在 sessionStorage 不外洩

2. 帶入參數跳轉 : 帶著 code_challenge 和其他參數跳轉至登入頁面 (放在 get parameter)

3. 登入認證成功 : Keycloak 會再產生一個 code_B 並連同雜湊值和其他資料存入暫存

4. 導轉回應用頁面 : 登入頁面帶著參數 code_B 跳轉回 Redirect_URL

5. 應用頁面取得認證 : 拿 code_B 與 code_verifier 當作 POST Method 的參數，用 API 的形式要求認證權限

    ```text
    POST /realms/xxx/protocol/openid-connect/token
    grant_type=authorization_code
    code=SplxlOBeZQQ // Keycloak 產
    code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk // Step1. 前端存在 SS 內
    ```

6. Keycloak 驗證 : 用 Body 傳入的 code & code_verifier 的雜湊值，去暫存 Mapping 資料，成功後就核發 token

7. 後端驗證 : token 上面帶著 Keycloak 用私鑰做的簽章，後端只要有 Keycloak 的公鑰就能夠驗證

### 簽章內容

Keycloak 定義是依照 Realms 為單位隔離資料，User 預設能夠登入 Realms 內所有的 Client (取得 token)；所以 token 裡面會包含各 client 內的權限資料。例如可以從 ```resource_access``` 內得知此 User 在 A 權限是 ```writer,reader``` 在 B 內是 ```reader```。

```json
{
  "exp": 1789018851,
  "iat": 1789018551,
  "auth_time": 1789018550,
  "jti": "onrtac:192afefa-83ae-12b0-6974-a0dcebaeae74",
  "iss": "http://localhost:20050/realms/{realmsName}",
  "sub": "63b0ed3a-1cdd-418e-a38f-d257feb5091a",
  "typ": "Bearer",
  "azp": "CC", // 核發的 client_id，
  "sid": "9029ba8f-c994-431b-bbc6-675c918dc7d8",
  "acr": "1",
  "allowed-origins": [
    "http://localhost:4200"
  ],
  "resource_access": {
    "Client_ID_A": {
      "roles": [
        "reader",
        "writer"
      ]
    },
    "Client_ID_B": {
      "roles": [
        "reader"
      ]
    }
  },
  "scope": "openid email profile",
  "email_verified": false,
  "name": "cc cc",
  "preferred_username": "bothc",
  "given_name": "cc",
  "family_name": "cc",
  "email": "bothc@23"
}
```

### 系統架構

以此需求作為範例:

- 統一由主系統創建帳號、維護 Keycloak admin
- 該帳號可以登入不同系統 (SSO)
- 各自系統獨立維護操作權限
- 新建帳號後須立即設定操作權限

#### 設計原則

- Keycloak 只處理帳號與能不能呼叫某支 keycloak API，不定義任何系統的業務職權
- Keycloak admin 憑證僅存在主系統後端，子系統一律不持有
- 跨系統的使用者外鍵一律使用 Keycloak `sub` (UUID)
- 子系統須實作同步使用者清單功能，或改為每次即時查詢主系統

#### Keycloak

1. 單個 Realm 加上複數 Client
   - `main-web` / `sub-web` (public, PKCE) — 各系統前端登入
   - `main-backend` (confidential, service account) — 主系統 call keycloak admin API
   - `sub-backend` (confidential, service account) — 子系統 call 主系統查詢 API
   - `main-api` (資源伺服器識別，不參與 flow) — 承載 aud 與 client role
2. Realm Role 僅需建立 `kc-admin` / `kc-user-admin`，負責 Keycloak 的 CRUD 權限
3. Group / Attribute 僅宣告組織事實，子系統可參考作為**權限預設值或過濾條件**，不作為授權依據
   - Group: `/company/finance` (部門)
   - Attribute: `job_level` = `manager` | `staff`、`employee_no`
4. Client Scopes 設定不同 Client 返回的 token 資訊 (aud / role)
   - Client role 掛在 `main-api` 之下，例如 `employee:read`、`department:read`
   - 子系統只取得所需的最小 role

#### 主系統

1. 前端提供自定義介面，後端維護一組 Keycloak admin env (client_id / client_secret)
2. Keycloak 任何異動資料也都同步至主系統，作為整個企業的 SOT
3. 設計一支唯讀查詢 API 提供子系統使用者資訊
   - 僅回傳必要欄位 (`sub` / 姓名 / 部門 / `active`)，採白名單
   - 需回傳 `active` 狀態，離職者標記停用而非從清單消失
   - 資料直接取自主系統 DB，不即時打 Keycloak
4. API 存取控制
   - 本地 JWKS 離線驗簽，不使用 introspection endpoint
   - 驗證 `iss` / `exp` / 簽章
   - 檢查 `azp` 白名單 (或 `aud` 含 `main-api`)
   - 檢查 `resource_access["main-api"].roles` 含對應 role
   - 欄位與資料範圍限制由主系統本地 policy 維護，不放進 Keycloak

#### 子系統

1. 處理兩種 token，用途分離
   - 使用者 token：OIDC 登入 (public client + PKCE)，取得 `sub` 作為使用者識別
   - service account token：client_credentials，供後端呼叫主系統 API
2. service account token 向主系統取得唯讀使用者資訊
   - 需快取 token 至到期前，避免每次請求重換
   - 使用者清單加短快取 (約 5 分鐘)，降低對主系統可用性依賴
3. 子系統內存放一份業務操作權限資料，以 `sub` 為外鍵
4. 權限設定頁面不從自己 DB 撈人，改以主系統回傳清單 left join 本地權限表
   - 未設定者顯示為「未設定」，點選後才於本地建立 record
   - 藉此滿足「帳號創建後立即可設定權限」，不需 provisioning 推送

```text
使用者   -> 各系統前端      -> Keycloak OIDC 登入 (不經過主系統)
主系統   -> 使用者管理頁面  -> CRUD 使用者 -> Keycloak & 主系統 DB
子系統   -> 操作權限頁面    -> API 取得主系統資料 + 子資料庫資料 -> 處理權限
```

#### 可用性

1. 登入流程不經過主系統，主系統中斷不影響既有使用者登入與操作
2. 主系統中斷時，子系統以快取清單降級運作，最壞情況為新進員工延遲出現於權限設定頁
3. Keycloak 中斷時，各系統已簽發的 token 在有效期內仍可離線驗證通過
