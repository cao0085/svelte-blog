---
title: "PDF 檔案合併"
date: "2025-09-16"
category: "software"
subCategory: "How-To"
tags: ["pdf", "csharp", "python"]
slug: "pdf-merge"
---
###### [Repository](https://github.com/cao0085/pdfMerger)

---

合併 PDF 有 C# 和 Python 兩個選項，Python 的執行環境相容性較好（跨平台），C# 則適合整合進既有的 .NET 應用或搭配 Windows UI。

---

### C#（iText7）

```xml
<!-- .csproj -->
<PackageReference Include="itext7" Version="8.0.5" />
<PackageReference Include="itext7.bouncy-castle-adapter" Version="8.0.5" />
```

```csharp
var pdfFiles = Directory.GetFiles(folderPath, "*.pdf", SearchOption.TopDirectoryOnly)
                        .OrderBy(f => f)
                        .ToList();

using var pdfWriter = new PdfWriter(outputPath);
using var pdfDocument = new PdfDocument(pdfWriter);
var merger = new PdfMerger(pdfDocument);

foreach (var sourcePath in pdfFiles)
{
    try
    {
        using var reader = new PdfReader(sourcePath);
        using var sourceDoc = new PdfDocument(reader);
        merger.Merge(sourceDoc, 1, sourceDoc.GetNumberOfPages());
    }
    catch (Exception)
    {
        // 若遇到加密或權限問題，可嘗試 SetUnethicalReading（見下方說明）
        Console.WriteLine($"跳過：{sourcePath}");
    }
}
```

---

### Python（pypdf）

```bash
pip install pypdf cryptography
```

```python
import os
from pypdf import PdfWriter
from pathlib import Path

def merge_pdfs(input_folder="input", output_folder="output", output_filename="merged.pdf"):
    Path(output_folder).mkdir(exist_ok=True)

    pdf_files = sorted([
        os.path.join(input_folder, f)
        for f in os.listdir(input_folder)
        if f.lower().endswith('.pdf')
    ])

    if not pdf_files:
        print("找不到 PDF 檔案")
        return

    merger = PdfWriter()
    try:
        for path in pdf_files:
            merger.append(path)

        output_path = os.path.join(output_folder, output_filename)
        with open(output_path, 'wb') as f:
            merger.write(f)

        print(f"合併完成：{output_path}，共 {len(merger.pages)} 頁")
    finally:
        merger.close()
```

---

### 加密 PDF 處理

合併時若遇到有密碼保護的 PDF，兩種方式各有不同的處理方法。

**C# — `SetUnethicalReading`**

iText7 提供 `SetUnethicalReading(true)`，可在不提供密碼的情況下強制讀取部分加密 PDF（僅限讀取權限設定，非使用者密碼加密）：

```csharp
var reader = new PdfReader(sourcePath);
reader.SetUnethicalReading(true);
using var sourceDoc = new PdfDocument(reader);
merger.Merge(sourceDoc, 1, sourceDoc.GetNumberOfPages());
```

**Python — `decrypt`**

若 PDF 有使用者密碼，需先解密再操作：

```python
from pypdf import PdfReader

reader = PdfReader("protected.pdf")
if reader.is_encrypted:
    reader.decrypt("password")  # 已知密碼才能處理
```

若密碼未知，兩種方式都無法處理，只能跳過或標記為人工處理。
