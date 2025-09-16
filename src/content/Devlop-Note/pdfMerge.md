---
title: "多個 PDF 檔案合併"
date: "2025-09-16"
category: "software"
subCategory: "開發筆記"
tags: ["pdf", "backend", "command"]
slug: "pdfmarge"
---
###### [Repository](https://github.com/cao0085/pdfMerger) ，Python 執行相容性比較好，C# UI方便友善

---

### C#

```csharp
  // .csproj
<ItemGroup>
  <PackageReference Include="itext7" Version="8.0.5" />
  <PackageReference Include="itext7.bouncy-castle-adapter" Version="8.0.5" />
</ItemGroup>
```

```csharp
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using iText.Kernel.Pdf;
using iText.Kernel.Utils;
using iText.Kernel.Exceptions;
using System.Reflection.PortableExecutable;
using System.Net.Sockets;

using PDF_Merger.PasswordHelper; // 自定義

class Program
{
  static void Main(string[] args)
  { 
    // 讀檔案...
    var pdfFiles = Directory.GetFiles(folderPath, "*.pdf", SearchOption.TopDirectoryOnly)
                          .OrderBy(f => f)
                          .ToList();

    // 處理檔案路徑和名稱...
    string defaultPath = Path.Combine("資料夾名稱", "檔案名稱");

    // 主邏輯
    using (var pdfWriter = new PdfWriter(destinationPdfPath))
    using (var pdfDocument = new PdfDocument(pdfWriter))
    {
      var merger = new PdfMerger(pdfDocument);
      int totalPages = 0;
      int successCount = 0;
      int skipCount = 0;

      // 檔案路徑
      for (int i = 0; i < sourcePdfPaths.Length; i++)
      {
          string sourcePath = sourcePdfPaths[i];
          try
          {
              using (var reader = new PdfReader(sourcePath))
              using (var sourceDoc = new PdfDocument(reader))
              {
                  int pageCount = sourceDoc.GetNumberOfPages();
                  merger.Merge(sourceDoc, 1, pageCount);
              }
              else
              {
                  skipCount++;
              }
          }
          catch (Exception fileEx)
          { 
            // 若是讀取權限問題 嘗試 SetUnethicalReading
            var reader = new PdfReader(sourcePath);
            reader.SetUnethicalReading(true); // 重點

            using (reader)
            using (var sourceDoc = new PdfDocument(reader))
            {
              merger.Merge(sourceDoc, 1, pageCount); //...
            }

            continue;
          }
      }
    }
  }
}
```

### Python3

``` bash
pip install pypdf
pip install cryptography
```

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from pypdf import PdfWriter
from pathlib import Path

def merge_pdfs(input_folder="test", output_folder="output", output_filename="merged.pdf"):
    """
    合併指定資料夾內的所有 PDF 文件
    
    Args:
        input_folder: 輸入 PDF 文件的資料夾路徑
        output_folder: 輸出資料夾路徑
        output_filename: 合併後的文件名
    """
    
    # 確保輸出資料夾存在
    Path(output_folder).mkdir(exist_ok=True)
    
    # 取得所有 PDF 文件
    pdf_files = []
    for file in os.listdir(input_folder):
        if file.lower().endswith('.pdf'):
            pdf_files.append(os.path.join(input_folder, file))
    
    # 按文件名排序
    pdf_files.sort()
    
    if not pdf_files:
        print(f"在 {input_folder} 資料夾中沒有找到 PDF 文件")
        return
    
    print(f"找到 {len(pdf_files)} 個 PDF 文件:")
    for i, file in enumerate(pdf_files, 1):
        print(f"{i}. {os.path.basename(file)}")
    
    # 創建 PDF 合併器
    merger = PdfWriter()
    
    try:
        # 逐個添加 PDF 文件
        for pdf_file in pdf_files:
            print(f"正在處理: {os.path.basename(pdf_file)}")
            merger.append(pdf_file)
        
        # 輸出合併後的文件
        output_path = os.path.join(output_folder, output_filename)
        with open(output_path, 'wb') as output_file:
            merger.write(output_file)
        
        print(f"\n合併完成！")
        print(f"輸出文件: {output_path}")
        print(f"總頁數: {len(merger.pages)}")
        
    except Exception as e:
        print(f"合併過程中發生錯誤: {e}")
    
    finally:
        merger.close()

def list_pdfs(folder="pdfs"):
    """列出資料夾內的所有 PDF 文件"""
    pdf_files = [f for f in os.listdir(folder) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print(f"在 {folder} 資料夾中沒有找到 PDF 文件")
        return
    
    print(f"找到 {len(pdf_files)} 個 PDF 文件:")
    for i, file in enumerate(sorted(pdf_files), 1):
        file_path = os.path.join(folder, file)
        file_size = os.path.getsize(file_path) / 1024  # KB
        print(f"{i}. {file} ({file_size:.1f} KB)")

if __name__ == "__main__":
    print("=== PDF 合併工具 ===\n")
    
    # 先列出所有 PDF 文件
    list_pdfs()
    
    print("\n" + "="*50)
    
    # 執行合併
    merge_pdfs()
```

