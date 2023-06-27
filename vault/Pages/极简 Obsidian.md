---
created: 2026-01-18T18:46
modified: 2026-01-18T20:03
tags:
  - Obsidian
---

<!-- truncate -->

## 概述

- what
- why
- how

## 设置

- **内部链接类型**: **相对路径**
- **使用 Wiki 链接**: **否**

## 样式

```css
body {
  --h1-color: var(--color-red);
  --h2-color: var(--color-orange);
  --h3-color: var(--color-yellow);
  --h4-color: var(--color-green);
  --h5-color: var(--color-blue);
  --h6-color: var(--color-purple);
  --bold-color: var(--color-red);
  --italic-color: var(--color-orange);
  --file-line-width: min(85vw, 1200px);
}

.cm-strikethrough,
del {
  color: var(--text-faint);
}
u,ins {
  text-decoration: none;
  border-bottom: 3px solid var(--color-green);
  text-decoration-color: var(--color-green);
  text-decoration-thickness: 3px;
}

/* list */
ul>li.task-list-item[data-task="x"],
ul>li.task-list-item[data-task="X"] {
  text-decoration: none;
}
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="x"],
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="X"] {
  text-decoration: none;
}

/* table */
.markdown-preview-view tr,
.markdown-rendered tr {
  &:nth-child(odd) {
    background-color: var(--background-primary);
  }

  &:nth-child(even) {
    background-color: var(--background-secondary);
  }
}

.nav-folder-title-content,.nav-file-title-content {
  font-size: 15px;
}

.workspace-tab-header:has(.mod-pinned) {
  /* shrink if pinned */
  max-width: 60px !important;
}

.view-header:not(:hover) {
  opacity: 0;
}

.status-bar:not(:hover) {
  opacity: 0;
  min-height: 6px;
  height: 0;
  padding: 0;
  margin: 0;
  border: 0;
}
```

## 插件

mini
- [x] better-markdown-links
- [ ] cmdr
- [x] easy-typing-obsidian
- [ ] notebook-navigator
- [x] obsidian-heading-shifter
- [x] obsidian-linter
- [x] obsidian-outliner
- [ ] quickadd
- [ ] various-complements
- [ ] virtual-linker

mobile
- [ ] any-block-min
- [ ] dataview
- [ ] note-toolbar
- [ ] notebook-navigator
- [ ] obsidian-advanced-uri
- [ ] obsidian-outliner
- [ ] omnisearch
- [ ] virtual-linker

## 结构

[Obsidian 共享配置](<Obsidian 共享配置.md>)

## 分类

[笔记分类](<笔记分类-2026.md>)

## 其他

- 同步备份: syncthing + git + kopia
    - 一键备份 `mkdir -p ~/bak/Obsidian/$(date +%F) && cp -rfP ~/Documents/Obsidian/. $_`
    - 压缩 `cd ~/bak/Obsidian/$(date +%F) && zip -r ../$(date +%Y%m%d%H%M%S).zip . -x "*.git*" "*.trash*" -e`
    - 查看压缩 `unzip -l *.zip`
    - 解压缩 `unzip *.zip -d Obsidian`
- 导入导出
    - md
    - pdf
    - word
    - html
- 草稿速记
- 附件
- 剪藏
- 日记
- GTD
- AI