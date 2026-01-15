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

```base
filters:
  and:
    - '!file.inFolder("Ext")'
formulas:
  cdate: file.ctime.date()
  mdate: file.mtime.date()
  relative_mtime: file.mtime.relative()
  image: image(file.path)
  backlinks: file.backlinks.map(value.asFile())
  brokenLinks: file.links.filter(!value.asFile().isTruthy())
properties:
  note.title:
    displayName: 标题
  formula.cdate:
    displayName: 创建日期
  formula.mdate:
    displayName: 修改日期
  formula.relative_mtime:
    displayName: 修改时间
views:
  - type: table
    name: All
    filters:
      and:
        - file.ext == "md"
        - '!file.inFolder("Misc")'
        - '!file.inFolder("Attachments")'
    order:
      - file.folder
      - file.name
      - title
      - formula.cdate
      - formula.mdate
      - file.tags
    sort:
      - property: file.folder
        direction: ASC
      - property: file.name
        direction: DESC
    limit: 100
    columnSize:
      file.folder: 158
      file.name: 156
      note.title: 199
      file.tags: 98
  - type: table
    name: Recent
    filters:
      and:
        - file.ext == "md"
        - file.mtime > now() - "1 month"
    order:
      - file.name
      - title
      - formula.relative_mtime
    sort:
      - property: file.mtime
        direction: DESC
    limit: 25
    columnSize:
      file.name: 202
      note.title: 210
      formula.relative_mtime: 160
  - type: cards
    name: Attachments
    filters:
      and:
        - file.ext.containsAny("png", "jpg", "jpeg", "webp", "gif", "svg", "bmp")
    order:
      - file.name
      - formula.backlinks
    sort:
      - property: formula.backlinks
        direction: ASC
      - property: file.ctime
        direction: DESC
    image: formula.image
  - type: table
    name: Excalidraw
    filters:
      and:
        - file.hasTag("excalidraw")
    order:
      - file.name
      - file.folder
    image: formula.image
    columnSize:
      file.name: 283
  - type: table
    name: Canvas
    filters:
      and:
        - file.ext == "canvas"
    order:
      - file.name
      - file.folder
    image: formula.image
  - type: table
    name: Dailynotes
    filters:
      and:
        - file.ext == "md"
        - /^[0-9]{4}\w*/.matches(file.name)
        - file.folder.contains("Journals")
    order:
      - file.name
      - title
    sort:
      - property: file.name
        direction: DESC
    limit: 50
    columnSize:
      file.name: 137
      note.title: 308
  - type: table
    name: BrokenLinks
    filters:
      and:
        - file.links.filter(!value.asFile().isTruthy()).length!=0
    order:
      - file.name
      - formula.brokenLinks
  - type: table
    name: Backlinks
    filters:
      and:
        - file.links.contains(this)
  - type: table
    name: CurrentDir
    filters:
      and:
        - file.folder.startsWith(this.file.folder)
    order:
      - file.name
      - title
      - formula.cdate
      - formula.mdate
    sort:
      - property: file.ctime
        direction: DESC
    columnSize:
      file.name: 236
      note.title: 272
      formula.mdate: 109

```

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