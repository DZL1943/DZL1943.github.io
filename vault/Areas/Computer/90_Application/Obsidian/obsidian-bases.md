---
title: Obsidian Bases
created: 2025-08-19T16:25
modified: 2025-10-08T21:38
aliases: [Obsidian Bases]
url:
  - https://help.obsidian.md/bases/syntax
---

# Obsidian Bases

## 概述

Bases 是一个 Obsidian 1.9 版本新增的核心插件, 其作用类似 dataview 插件或 Notion database. 即支持以不同的视图呈现笔记及其属性.

优缺点:
- [x] 支持可视化操作
- [x] 支持分组和统计
- [ ] 批量编辑
- [ ] 支持 inline 属性
- [ ] 支持 relation, 从而实现字段级过滤

## 示例

[Obsidian.base](<Obsidian.base>)

## 创建

1. 创建 base 文件, 嵌入 `![[File.base#View]]`
2. 创建 base 代码块

## 界面

- 视图 | create, edit, and switch views.
    - 布局
        - [x] table | Display files as rows in a table. Columns are populated from properties in your notes.
        - [x] cards | Display files as a grid of cards. Lets you create gallery-like views with images.
        - [x] list | Display files as a list with bulleted or numbered markers.
        - [x] map | Display files as pins on an interactive map. Requires the Maps plugin.
        - [ ] kanban
        - [ ] calendar
- 结果数 | limit, copy and export files.
- 排序 | sort and group files.
- 筛选 | filter files.
- 属性 | choose properties to display and create formulas.
    - file: 每个文件固有的属性
        - file.backlinks | List of backlink files
        - file.ctime
        - file.embeds | List of all embeds in the note
        - file.ext
        - file.file
        - file.folder
        - file.links | List of all internal links in the note, including frontmatter
        - file.mtime
        - file.name
        - file.path
        - file.properties | All properties on the file
        - file.size
        - file.tags | List of all tags <ins>in the file content and frontmatter</ins>
    - note(default): [YAML frontmatter properties](https://help.obsidian.md/properties)
        - Text
        - Number
        - Date & time
        - Checkbox
        - List
    - formula: base 中用公式定义的属性
- 新建 | create a new file in the current view.

## 语法

- filters: 全局过滤器
- formulas: 公式属性
- properties: 自定义属性 (file, note, formula)
- summaries
- views: 视图设置
    - type
    - name
    - filters
    - **order**: 是字段, **不是排序**!
    - sort
    - groupBy
    - limit
    - summaries

## Types and Functions

- Strings, numbers, and booleans
- Dates and durations
- Objects and lists
- Files and links

## Tips

- 所有操作优先在图形界面下进行, 尽量避免手写源码.
- 属性无作用域隔离, 需规范命名以免冲突