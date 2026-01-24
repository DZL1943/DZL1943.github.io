---
title: Obsidian 配置文件
created: 2025-10-08T20:19
modified: 2026-01-14T19:36
aliases:
  - Obsidian 配置
---

# Obsidian 配置文件

## app.json | 核心配置

```json
{
  // preview|source
  "defaultViewMode": "preview",
  // 建议移动端
  "livePreview": false,
  // 推荐
  "readableLineLength": true,
  // 推荐
  "strictLineBreaks": true,
  "propertiesInDocument": "visible",
  "useTab": false,
  "promptDelete": false,
  // local|system|none
  "trashOption": "local",
  "alwaysUpdateLinks": true,
  // root|current|folder
  "newFileLocation": "current",
  "newFileFolderPath": "Inbox",
  // 重要! shortest|relative|absolute
  "newLinkFormat": "relative",
  // 重要
  "useMarkdownLinks": true,
  "showUnsupportedFiles": true,
  // /|./|Attachments|./assets
  "attachmentFolderPath": "./",
  "showInlineTitle": false,
  "focusNewTab": true,
  "foldHeading": true,
  "foldIndent": true,
  "showLineNumber": false,
  "showIndentGuide": true,
  "rightToLeft": false,
  "spellcheck": true,
  "autoPairBrackets": true,
  "autoPairMarkdown": true,
  "smartIndentList": true,
  "autoConvertHtml": true,
  "vimMode": false,
  "userIgnoreFilters": [
    "Archives"
  ],
  "uriCallbacks": false,
  "pdfExportSettings": {
    "pageSize": "A4",
    "landscape": false,
    "margin": "0",
    "downscalePercent": 80
  },
  "mobileToolbarCommands": [
    "editor:undo",
    "editor:redo",
    "editor:swap-line-up",
    "editor:swap-line-down",
    "editor:indent-list",
    "editor:unindent-list",
    "obsidian-outliner:move-list-item-up",
    "obsidian-outliner:move-list-item-down",
    "obsidian-outliner:indent-list",
    "obsidian-outliner:outdent-list",
    "editor:set-heading",
    "editor:rename-heading",
    "editor:insert-wikilink",
    "editor:insert-embed",
    "editor:insert-link",
    "editor:attach-file",
    "editor:insert-tag",
    "editor:toggle-checklist-status",
    "editor:toggle-numbered-list",
    "editor:toggle-bullet-list",
    "editor:toggle-blockquote",
    "editor:insert-callout",
    "editor:toggle-bold",
    "editor:toggle-italics",
    "editor:toggle-strikethrough",
    "editor:toggle-highlight",
    "editor:toggle-comments",
    "editor:clear-formatting",
    "editor:insert-horizontal-rule",
    "editor:insert-footnote",
    "editor:insert-codeblock",
    "editor:insert-mathblock",
    "insert-current-date",
    "insert-current-time",
    "editor:insert-table",
    "editor:context-menu",
    "editor:configure-toolbar"
  ],
  "mobilePullAction": "command-palette:open"
}
```

## appearance.json | 外观

```json
{
  "accentColor": "#14907a",
  "interfaceFontFamily": "Monaco,Menlo",
  "textFontFamily": "Monaco,Menlo,UbuntuMono Nerd Font Mono,PingFang SC,LXGW WenKai Mono",
  "monospaceFontFamily": "Monaco,Menlo",
  "baseFontSize": 18,
  "baseFontSizeAction": true,
  "showViewHeader": false,
  "showRibbon": false,
  "nativeMenus": true,
  "translucency": false,
  "theme": "system",
  "cssTheme": "",
  "enabledCssSnippets": [
  ],
}
```

## bookmarks.json | 书签

```json
{
  "items": [
    {
      "type": "group",
      "ctime": 1762169468554,
      "items": [
        {
          "type": "file",
          "ctime": 1762169444029,
          "path": "Index.md"
        }
      ],
      "title": "Default"
    }
  ]
}
```

## canvas.json | 白板

```json
{
  "snapToObjects": true,
  "snapToGrid": true,
  "newFileLocation": "current"
}
```

## command-palette.json | 命令面板

```json
{
  "pinned": [
    "app:open-settings",
    "app:toggle-ribbon",
    "workspaces:open-modal",
    "daily-notes",
    "zk-prefixer"
  ]
}
```

## community-plugins.json | 社区插件

```json
[
  "better-markdown-links",
  "better-plugins-manager",
  "custom-sort",
  "easy-typing-obsidian",
  "float-search",
  "fuzzy-chinese-pinyin",
  "legacy-vault-switcher",
  "obsidian-admonition",
  "obsidian-auto-hide",
  "obsidian-front-matter-title-plugin",
  "obsidian-heading-shifter",
  "obsidian-image-toolkit",
  "obsidian-linter",
  "obsidian-outliner",
  "paste-link",
  "various-complements",
  "virtual-linker"
]
```

## ~~core-plugins-migration.json~~ | 内容同上
## core-plugins.json | 核心插件

```json
{
  "file-explorer": true,
  "global-search": true,
  "switcher": true,
  "graph": true,
  "backlink": true,
  "canvas": true,
  "outgoing-link": true,
  "tag-pane": true,
  "footnotes": false,
  "properties": false,
  "page-preview": true,
  "daily-notes": true,
  "templates": true,
  "note-composer": true,
  "command-palette": true,
  "slash-command": false,
  "editor-status": true,
  "bookmarks": true,
  "markdown-importer": false,
  // 可替代新建笔记
  "zk-prefixer": true,
  "random-note": false,
  "outline": true,
  // 没啥用还占用状态栏空间
  "word-count": false,
  "slides": false,
  "audio-recorder": false,
  "workspaces": false,
  "file-recovery": true,
  "publish": false,
  "sync": false,
  "bases": true,
  "webviewer": false
}
```

## daily-notes.json | 日记

```json
{
  "folder": "Journals",
  "template": "",
  "format": "YYYY-MM-DD",
  "autorun": false
}
```

## file-recovery.json | 文件恢复

```json
{
  "intervalMinutes": 10,
  "keepDays": 10
}
```

## global-search.json | 搜索

## graph.json | 图谱

```json
{
  "collapse-filter": true,
  "search": "",
  "showTags": false,
  "showAttachments": false,
  "hideUnresolved": false,
  "showOrphans": true,
  "collapse-color-groups": true,
  "colorGroups": [],
  "collapse-display": true,
  "showArrow": false,
  "textFadeMultiplier": 0,
  "nodeSizeMultiplier": 1,
  "lineSizeMultiplier": 1,
  "collapse-forces": true,
  "centerStrength": 0.518713248970312,
  "repelStrength": 10,
  "linkStrength": 1,
  "linkDistance": 250,
  "scale": 1,
  "close": false
}
```

## hotkeys.json | 快捷键

```json
{
  "fuzzy-chinese-pinyin:open-search": [
    {
      "modifiers": [
        "Mod"
      ],
      "key": "O"
    }
  ],
  "fuzzy-chinese-pinyin:execute-command": [
    {
      "modifiers": [
        "Mod"
      ],
      "key": "P"
    }
  ],
  "float-search:search-obsidian-globally-state": [
    {
      "modifiers": [
        "Mod",
        "Shift"
      ],
      "key": "F"
    }
  ],
  "editor:swap-line-up": [
    {
      "modifiers": [
        "Alt"
      ],
      "key": "ArrowUp"
    }
  ],
  "editor:swap-line-down": [
    {
      "modifiers": [
        "Alt"
      ],
      "key": "ArrowDown"
    }
  ]
}

```

## note-composer.json | 笔记重组
## page-preview.json | 页面预览
## switcher.json | 快速切换

```json
{
  "showExistingOnly": true,
  "showAttachments": true,
  "showAllFileTypes": false
}
```

## templates.json | 模板

```json
{
  "folder": "Templates"
}
```

## types.json | 属性

```json
{
  "types": {
    "aliases": "aliases",
    "cssclasses": "multitext",
    "tags": "tags",
    "created": "datetime",
    "modified": "datetime"
  }
}
```

## webviewer.json | 浏览器

```json
{
  "openExternalURLs": true,
  "enableAdblocking": true,
  "searchEngine": "bing",
  "markdownPath": "Clippings"
}
```

## workspace.json | 桌面端工作区
## workspace-mobile.json | 移动端工作区
## workspaces.json | 工作区
## zk-prefixer.json | 时间戳笔记

```json
{
  "folder": "Inbox"
}
```
