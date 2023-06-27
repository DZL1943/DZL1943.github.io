---
title: Obsidian 内部接口
created: 2025-10-08T20:39
modified: 2026-01-15T16:33
aliases:
  - Obsidian 接口
url:
  - https://docs.obsidian.md/Reference/TypeScript+API/index
  - https://github.com/obsidianmd/obsidian-api
---

# Obsidian 内部接口

## app

- commands
- customCss
- fileManager
- hotkeyManager
- internalPlugins
- **metadataCache**
- plugins
- **vault**
- **workspace**

### vault

库路径: `$=app.vault.adapter.basePath`  
配置文件夹: `$=app.vault.configDir`  
总文件数: `$=app.vault.getFiles().length`  
笔记数: `$=app.vault.getFiles().filter(f=>f.name.split(".").slice(-1)=="md").length`  

#### config

```dataviewjs
dv.paragraph(app.vault.config)
```

### fileManager

- renameFile

### metadataCache

#### tags

```dataviewjs
const tags = app.metadataCache.getTags();
dv.list(Object.keys(tags));
```

#### headings

```dataviewjs
//https://forum-zh.obsidian.md/t/topic/28337
const startHeadingLevel = 1
const file = app.workspace.getActiveFile()
const { headings } = app.metadataCache.getFileCache(file)
const lists = headings.map(p=>
  `${' '.repeat((p.level - startHeadingLevel) * 4)}- ${p.heading}`
)
dv.paragraph(lists.join('\n'))
```

#### unresolvedLinks

```dataviewjs
dv.list(Object.entries(app.metadataCache.unresolvedLinks).filter(([file, links]) => file !== "broken links output.md" && Object.keys(links).length > 0).map(([file, links]) => `${dv.fileLink(file, false, file)} -> ${Object.keys(links).map(x=>dv.fileLink(x)).join(',')}`))
```

### workspace

- activeEditor
- activeLeaf
- getLeaf(newLeaf, direction)
    - If newLeaf is false (or not set) then an existing leaf which can be navigated is returned, or a new leaf will be created if there was no leaf available.
    - If newLeaf is 'tab' or true then a new leaf will be created in the preferred location within the root split and returned.
    - If newLeaf is 'split' then a new leaf will be created adjacent to the currently active leaf.
        - If direction is 'vertical', the leaf will appear to the right.
        - If direction is 'horizontal', the leaf will appear below the current leaf.
    - If newLeaf is 'window' then a popout window will be created with a new leaf inside.
- getActiveFile()
- getActiveViewOfType(type)

#### WorkspaceLeaf

- view
- detach()
- openFile(file, openState)

#### recentFiles

```dataviewjs
dv.list(app.workspace.recentFileTracker.lastOpenFiles.filter(p=>app.vault.getAbstractFileByPath(p) && p.slice(-2) =='md').map(p=>dv.fileLink(p)))
```

#### navFile

```js
const wrap = (i, n) => ((i % n) + n) % n;

function navFile(s) {
    const cf = app.workspace.getActiveFile();
    const fs = cf?.parent?.children?.filter(f => !f.children) || [];
    const ci = fs.findIndex(f => f.path === cf.path);
    if (fs.length > 1)
        app.workspace.activeLeaf.openFile(fs[wrap(ci + s, fs.length)]);
}

// prev
navFile(-1);
// next
navFile(1);
```

#### 刷新

```js
await app.workspace.activeLeaf.rebuildView();
```

#### view

```js title:scrollTopBottom
const view = app.workspace.activeLeaf?.view;
const {editor, currentMode} = view;
const lineCount = editor.lineCount();

const clamp = (line, max) => line < 0 ? Math.max(0, max + line + 1) : Math.min(line, max);

const scrollActions = {
  source: (line) => editor.setCursor(clamp(line, lineCount), 0),
  preview: (line) => currentMode.applyScroll(clamp(line, lineCount - 1))
};

scrollActions[view.getMode()]?.(0);  // -1 表示末尾
```
simpler impl:
```js
const {editor, currentMode} = app.workspace.activeLeaf?.view;
// bottom
currentMode.applyScroll(editor.lineCount()-1)
// top
app.workspace.activeLeaf?.view?.currentMode.applyScroll(1)
```

### Event

```js
app.plugins.plugins.quickadd.registerEvent(app.vault.on('create', downloadAttachments));
```

### hotkeys

```dataviewjs
dv.table(["command", "hotkey"],Object.keys(app.hotkeyManager.customKeys).sort().map(k => [k, app.hotkeyManager.printHotkeyForCommand(k)]))
```

### commands

```js
app.commands.executeCommandById('editor:download-attachments');
```

### setting

```js
app.setting.openTabById("community-plugins");
app.setting.open();
app.setting.activeTab.containerEl.find(".mod-cta").click();
```

### customCss

`app.customCss.setCssEnabledStatus(snippetName, true);`

### plugins

```dataviewjs
dv.table(["id", "name", "version", "enabled"], Object.values(app.plugins.manifests).sort((a,b)=>a.id.localeCompare(b.id)).map(p=>[p.id, p.name, p.version, app.plugins.plugins[p.id] !== undefined]))
```

### bookmarks

```dataviewjs
dv.paragraph(Object.keys(app.internalPlugins.plugins.bookmarks.instance.bookmarkLookup).map(p=>dv.fileLink(p)))
```

## obsidian

## electron

版本号: `$=require("electron").ipcRenderer.sendSync("version")`  

```js
const window = require('electron').remote.getCurrentWindow();
window.setOpacity(0.88);
window.setAlwaysOnTop(true);
```

## 参考

- [obsidian常用api汇总 - 开发讨论 - Obsidian 中文论坛](https://forum-zh.obsidian.md/t/topic/50607)