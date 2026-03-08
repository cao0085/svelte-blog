---
title: "Structurizr C4 Model"
date: "2025-06-22"
category: "software"
subCategory: "How-To"
tags: ["c4model", "architecture", "docker"]
slug: "structurizr-c4"
---
###### [Example](https://github.com/cao0085/code-pattern/tree/main/structurizr)，[Structurizr](https://structurizr.com/)

---

###### 2025/10/15 更新：改用 Figma 桌面版來畫架構圖操作更直覺！
---

C4 Model 是一種分層描述系統架構的方式，從高到低依序為：`System → Container → Component` 每一層都可以單獨渲染成一張架構圖，適合用來溝通不同粒度的設計。

### 啟動

```yml
# docker-compose.yml
services:
  structurizr:
    image: structurizr/lite
    ports:
      - "8080:8080"
    volumes:
      - .:/usr/local/structurizr
```

首次啟動會在掛載目錄生成基本專案檔，再依需求修改。

---

### workspace.dsl

主設定檔，引入 model 和 view 的定義：

```text
workspace "YourProjectName" {

    !identifiers hierarchical

    model {
        !include index-model.dsl
    }

    views {
        styles {
            element "Component" {
                width  520
                height 500
            }
        }
        !include index-view.dsl
    }
}
```

---

### index-model.dsl

依層級定義系統結構，每層都可以渲染出一張圖：

```text
YourSystem = softwareSystem "Name" {

    InitPage_1 = container "Page 1" {
        description "描述這個 Container"

        Content1 = component "Content A" {
            description "描述這個 Component"
        }
        Content2 = component "Content B" {
            description "描述這個 Component"
        }

        InitPage_1.Content1 -> InitPage_1.Content2 "connection"
    }

    InitPage_2 = container "Page 2" {
        description "描述這個 Container"
    }
}

YourSystem.InitPage_1 -> YourSystem.InitPage_2 "connection"
```

---

### index-view.dsl

指定要渲染哪些 model，注意層級需降一階：model 裡是 `softwareSystem`，view 裡要用 `container` 來指定它：

```text
container YourSystem "Overview" {
    include *
}

component YourSystem.InitPage_1 "InitData" {
    include *
}
```
