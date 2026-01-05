## app.json

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

## appearance.json

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

## core-plugins.json

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
