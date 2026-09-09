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
