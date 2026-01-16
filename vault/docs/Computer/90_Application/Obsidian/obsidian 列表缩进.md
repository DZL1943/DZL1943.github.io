---
created: 2023-06-25T17:11
modified: 2025-10-08T22:19
---

<!-- truncate -->

1. 制表符宽度设为 2 时预览模式会出错
2. 通过 `shift+ret` 可方便另起一行 (对齐行首)
3. 无论嵌入什么, 一定要保证缩进 (包括空行), 否则会中断编号
4. 建议先顶格写, 再 tab 缩进
5. 普通文本  
    末尾双空格可以换行  
    有序列表里的空行可以正常显示(多行只会显示一行, 无序列表无法换行, 当然去掉部分缩进也可以, 但会中断编号)
    
    callout 也差不多
6. 嵌入代码块 (缩进 4)
  
    ```json
    "[markdown]": {
        "editor.defaultFormatter": "DavidAnson.vscode-markdownlint",
        "editor.tabSize": 4
    },
    "markdownlint.config": {
        "MD007": {
            "indent": 4
        },
        "MD031": false,
        "MD041": false,
        "MD047": false,
        "no-hard-tabs": true
    },
    ```
  
7. 嵌入 Callout (缩进 3)
  
   > [!note]+ Callout 示例标题  
   > Callout 内容
  
   > Type something...  
   > ...
  
8. 嵌入表格 (表头前必须空行)
  
    | a | b | c |  
    |:--|:--|:--|  
    | 1 | 2 | 3 |  
    | 1 | 2 | 3 |
  
9. 测试编号能否续上