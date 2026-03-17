---
title: "整合身份認證"
date: "2026-03-16"
category: "software"
subCategory: "How-To"
tags: ["keycloak", "auth", "oauth", "jwt", "oidc"]
slug: "keycloak"
---

###### 自架身份認證伺服器 — [Keycloak Doc](https://www.keycloak.org/documentation)

---

Keycloak 是開源的身份認證與授權管理平台（Identity and Access Management），讓自己架設一個類似 Google OAuth 2.0 的 Token 發行商，統一管理使用者登入、Token 簽發與權限控制。

### 整體架構

```md
┌───────────────────────────────────────────────────┐
│                   Keycloak Server                  │
│                 (基於 Quarkus / Java)               │
│                                                    │
│  ┌──────────────┐  ┌───────────────────────────┐  │
│  │  Admin UI     │  │  Login / Account Pages    │  │
│  │  (React SPA)  │  │  (Server-side templates)  │  │
│  └──────┬────────┘  └─────────────┬─────────────┘  │
│         │                         │                │
│  ┌──────▼─────────────────────────▼─────────────┐  │
│  │            REST API Layer                     │  │
│  │  (Admin API / Account API / OIDC endpoints)   │  │
│  └───────────────────┬──────────────────────────┘  │
│                      │                             │
│  ┌───────────────────▼──────────────────────────┐  │
│  │          Core Engine (SPI 插件架構)            │  │
│  │  Authentication / Authorization / Sessions    │  │
│  └──────┬───────────────────────┬───────────────┘  │
│         │                       │                  │
│  ┌──────▼───────┐    ┌─────────▼─────────┐        │
│  │  Infinispan   │    │  Hibernate ORM    │        │
│  │ (快取/Session) │    │  (資料存取)        │        │
│  └──────────────┘    └─────────┬─────────┘        │
└────────────────────────────────┼───────────────────┘
                                 │
                     ┌───────────▼────────────┐
                     │        Database         │
                     │   Dev: H2（內嵌）        │
                     │   Prod: PostgreSQL 等    │
                     └────────────────────────┘
```

Keycloak 的核心設計是 **SPI（Service Provider Interface）**，功能設計成可插拔的模組：

| SPI | 作用 |
|-----|------|
| `AuthenticatorSPI` | 登入流程 |
| `UserStorageSPI` | 使用者儲存（可接 LDAP、外部 DB）|
| `ProtocolMapperSPI` | Token 處理 |

資料庫方面，Keycloak 自己不帶資料庫引擎：

| 模式 | 資料庫 |
|------|--------|
| `start-dev` | 內嵌 H2（開發用，重啟可能遺失）|
| `start`（正式）| 自行接 PostgreSQL / MySQL / MariaDB |

---

### 核心概念

#### Realm、Client、User、Role 的關係

```md
Keycloak Instance
├── master（系統管理用的 Realm）
└── company-realm（你的業務 Realm）
    ├── Clients（代表每個接入的應用）
    │   ├── erp-finance
    │   ├── erp-warehouse
    │   └── erp-hr
    │
    ├── Users（使用者）
    │   ├── 小明
    │   ├── 小華
    │   └── 小美
    │
    ├── Roles（每個 Client 各自定義）
    │   ├── erp-finance:   [viewer, accountant, finance-admin]
    │   ├── erp-warehouse: [viewer, operator, warehouse-admin]
    │   └── erp-hr:        [viewer, hr-staff, hr-admin]
    │
    └── Identity Providers（選配，第三方登入）
        ├── Google
        ├── GitHub
        └── 企業 SAML / LDAP
```

- Realm：領域空間，彼此完全隔離。同一批使用者放同一個 Realm，不同客戶放不同 Realm
- Client：代表一個接入的應用程式
- User：使用者帳號
- Role：權限角色，分為 Realm Role（全域）和 Client Role（各系統獨立）

---

### 架構範例（3 套 ERP）

#### 情境一：使用者是同一批人 → 同一個 Realm

```md
Keycloak
└── company-realm
    ├── 密鑰（一對，綁在 Realm 上）
    │   ├── 私鑰（只有 Keycloak 持有）
    │   └── 公鑰（公開給所有 ERP）
    │
    ├── Client: erp-finance    ── Token 用同一把私鑰簽
    ├── Client: erp-warehouse  ── Token 用同一把私鑰簽
    └── Client: erp-hr         ── Token 用同一把私鑰簽
```

三套 ERP 都去同一個 endpoint 拿公鑰：

```bash
GET http://localhost:6752/realms/company-realm/.well-known/openid-configuration
```

#### 情境二：使用者完全不同 → 各自 Realm

```md
Keycloak
├── Realm: customer-a（A 公司）
│   ├── Client: erp
│   └── Users: A 公司的人
│
├── Realm: customer-b（B 公司）
│   ├── Client: erp
│   └── Users: B 公司的人
│
└── Realm: customer-c（C 公司）
    ├── Client: erp
    └── Users: C 公司的人
```

*密鑰解決的是信任問題（這個 Token 是不是 Keycloak 簽的？），權限解決的是授權問題（這個人能不能用這套系統？）*

---

### 與 Google OAuth 2.0 的對比

| | Google OAuth | Keycloak |
|---|---|---|
| **誰是發行商** | Google | 自己 |
| **使用者帳號在哪** | Google 管 | KeyCloak DB |
| **權限控制單位** | scope（mail, calendar）| role / scope|
| **能打什麼 API** | Google 的 API | Application API |
| **同意畫面** | Google 的授權頁 | 可自訂的授權頁 |

---

### Quick Start（Docker Compose）

```yml
version: "3.9"

services:
  keycloak:
    image: quay.io/keycloak/keycloak:26.1
    container_name: keycloak
    command: start-dev
    environment:
      KC_BOOTSTRAP_ADMIN_USERNAME: admin
      KC_BOOTSTRAP_ADMIN_PASSWORD: admin
      KC_HTTP_PORT: "6752"
      KC_HTTP_MANAGEMENT_PORT: "9000"
      KC_HEALTH_ENABLED: "true"
      KC_METRICS_ENABLED: "true"
    ports:
      - "6752:6752"   # Keycloak main UI & API
      - "9000:9000"   # Management interface (health, metrics)
    restart: unless-stopped
```

```bash
docker compose up -d

# Admin Console: http://localhost:6752
# Health Check: http://localhost:9000/health
# Metrics: http://localhost:9000/metrics
# 登入帳密：`admin` / `admin`
```
