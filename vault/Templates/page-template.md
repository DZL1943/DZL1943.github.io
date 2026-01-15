---
id: <tp.date.now("YYYYMMDDHHmmss")>
title: <% tp.file.title %>
description:
author:
url:
image:
modified: <% tp.file.last_modified_date("YYYY-MM-DD[T]HH:mm") %>
created: <% tp.file.creation_date("YYYY-MM-DD[T]HH:mm") %>
status:
type:
categories:
tags:
aliases:
remark:
---

```ad-abstract
title: 摘要 Abstract
collapse: true
```

```ad-tldr
title: 目录 TOC
collapse: true

~~~dataviewjs
//https://forum-zh.obsidian.md/t/topic/28337
const startHeadingLevel = 1
const file = app.workspace.getActiveFile()
const { headings } = app.metadataCache.getFileCache(file)
const lists = headings.map(p=>
  `${' '.repeat((p.level - startHeadingLevel) * 2)}- ${p.heading}`
)
dv.paragraph(lists.join('\n'))
~~~

```

```ad-quote
title: 前言 Preface
collapse: true
```

# <% tp.file.title %>

## 引言 Introduction

# 参考 References

```dataview
list
where file.folder = this.file.folder
where file.path != this.file.path
```

# 附录 Appendices

# 后记 Afterword

# 脚注 Footnotes