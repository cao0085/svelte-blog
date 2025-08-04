---
title: "Structurizr C4Model"
date: "2025-06-22"
category: "software"
subCategory: "開發筆記"
tags: ["model", "UML", "ERD"]
slug: "structurizr"
---
###### [Structurizr](https://structurizr.com/)

---

[File](https://github.com/cao0085/code-pattern/tree/main/structurizr)
<br>


### docker-compose.yml

初次建立和執行會生成基本的專案檔

```yml
// docker-compose.yml
version: '3.8'
services:
  structurizr:
    image: structurizr/lite
    ports:
      - "8080:8080"
    volumes:
      - .:/usr/local/structurizr
```

### workspace.dsl

```text
workspace "YourProjectName" {

    // **
    !identifiers hierarchical

    model {
        // Include your model files here
        // folderName_xxx/FileName_xxx

        !include index-model.dsl
    }

    views {
        styles {
            element "Component" {
                width  520
                height 500
            }
            element "tall-Element"{
                width  600
                height 700             
            }
        }
        // Include your views files here
        // folderName_xxx/FileName_xxx

        !include index-view.dsl
    }
}
```

### index-model.dsl

依序層級，每一層都可以渲染出一張圖

`Variable = softwareSystem "英文字名稱" => Variable = container "文字"  => Variable = component "文字" `

```text
YourSystem = softwareSystem "Name" {
    InitPage_1 = container "data" {
        description """
            描述該區域
        """
        Content1 = component "Content" {
            tags "tall-Element"
            description """
            描述該區域
            """
        }

        Content2 = component "Content2" {
            description """
            描述該區域
            """
        }

        InitPage_1.Content1 -> InitPage_1.Content2 "connection"
    }

    InitPage_2 = container "data2" {
        description """
            描述該區域
        """
        component Content {
            description """
            描述該區域
            """
        }
    }
}


YourSystem.InitPage_1 -> YourSystem.InitPage_2 "connection"
```


### index-model.dsl

指定要渲染哪些 index-model.dsl 裡的 model，且需要降一階處理

`index-model.dsl 裡的 YourSystem = softwareSystem` 

`index-model.dsl 要改成 container YourSystem 來指定`

```text
container YourSystem "Name" {
    include *
}


component YourSystem.InitPage_1 "InitData" {
    include *
}
```
