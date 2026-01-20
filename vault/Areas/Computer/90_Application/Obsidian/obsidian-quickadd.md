---
title: QuickAdd
created: 2024-12-04T14:32
modified: 2026-01-15T20:17
tags:
  - Obsidian/Plugins
aliases:
  - quickadd
url:
  - https://quickadd.obsidian.guide/docs/
---

## 概述

QuickAdd 的 核心概念是 Choice, 即当你通过命令或快捷键运行时, 会显示一个选项列表, 你可以从中选择你要运行的功能.  
这些 Choice 分为 Template、Capture、Macro、Multi 四类. 每个 Choice 还可以设置单独的快捷键, 其中 Macro 还能够在启动时自动运行.

- Template: 较少用, **语法**类似自带模板插件, **兼容 Templater**? 优点是能够很方便的预留待填空位, 创建时会提示填写. 支持 Inline Script
- Capture: 最常用, 作用勉强类似 Templater 的 Insert 模式, 但更强大易用. 支持 Template 语法(format syntax)、Inline Script
- Macro: 一系列命令、Choice 的有序组合, 支持 User Script, 类似 Templater 的`%*`模式, 即写 js 代码.
- **Api**: 在写 User Script 时用到(也可以在其他插件中调用). 核心就是 Prompt、Suggester, 相当于一个方便获取用户输入的*表单*.

与 Templater 协同
- 优先用 tp 的模板格式
- 避免在模板中混杂无关代码
- 尽量将代码独立成 js, qa、tp 均能通用

## Template

- template path: 必需
- filename format
- location folder
- linking
- behavior

特点:
- 类似自带模板插件的语法
- 可以很方便地预留待填空位, 创建时会提示填写
- 兼容 tp
- 支持 inline script

## Capture

- location file path/format
- position top/cursor/bottom
- linking
- content format
- behavior

注: 并非一定要在编辑模式下写入点什么才行, 用来运行 inline script 也是 ok 的.

## Macro

A **macro** is a collection of commands that execute sequentially. Each macro is associated with a **macro choice**, which allows you to trigger the macro from the QuickAdd command palette.

- obsidian command
- editor commands
- **user scripts**
- choices
- wait
- open file
- conditional

When using `{{VALUE:variableName}}` in your templates, QuickAdd decides whether to prompt you for input based on how the variable was set in your script:

**Variables That Trigger Prompts**
- Unset variables: Variables that were never assigned a value
- Undefined variables: Variables explicitly set to `undefined` in scripts
- Null variables: Variables explicitly set to `null` in scripts

Variables That Don't Trigger Prompts
- Empty string variables: Variables explicitly set to `""` in scripts
- Variables with any other value: Including `"0"`, `"false"`, or any non-empty string

After setting variables in a script, you can use them in subsequent commands:
- In templates: `{{VALUE:bookTitle}}`
- In file names: `Books/{{VALUE:bookTitle}} - Notes`
- In captures: `Read "{{VALUE:bookTitle}}" on {{VALUE:readDate}}`

Exporting Multiple Functions
```js
module.exports = {
    option1: async (params) => {
        console.log("Running option 1");
    },
    
    option2: async (params) => {
        console.log("Running option 2");
    },
    
    // Can also include variables
    defaultValue: "some default",
    
    // Main entry point
    start: async (params) => {
        const { quickAddApi } = params;
        const choice = await quickAddApi.suggester(
            ["Run Option 1", "Run Option 2"],
            ["option1", "option2"]
        );
        
        if (choice === "option1") {
            await module.exports.option1(params);
        } else if (choice === "option2") {
            await module.exports.option2(params);
        }
    }
};
```

You can skip the selection prompt by specifying the function directly:
- `{{MACRO:MyMacro::option1}}` - Runs option1 directly
- `{{MACRO:MyMacro::start}}` - Runs the start function

宏可以设置在 obsidian 启动时运行.

## Multi

相当于二级菜单, 用处不大

拖动以组合

## Syntax

https://quickadd.obsidian.guide/docs/FormatSyntax

- `{{DATE:<DATEFORMAT>}}` %% 和自带语法一样 %%
- `{{VDATE:<variable-name>, <date-format>|<default>}}`
- `{{VALUE:<options>|custom}}`: Use comma separation to get a suggester rather than a prompt.
- `{{LINKCURRENT}}`
- `{{FILENAMECURRENT}}`
- `{{MACRO:<MACRONAME>}}`
- `{{TEMPLATE:<TEMPLATEPATH>}}`
- `{{GLOBAL_VAR:<name>}}`
- `{{MVALUE}}`
- `{{FIELD:<FIELDNAME>}}`
- `{{selected}}`
- `{{CLIPBOARD}}`
- `{{RANDOM:<length>}}`
- `{{TITLE}}`

## Inline scripts

```js quickadd
const input = await this.quickAddApi.inputPrompt("✍");
return `Input given: ${input}`;
```

可以用 `{{MACRO:}}` 的方式获得其 return 值.

## API

Accessing the API
- From QuickAdd Scripts (Macros/User Scripts)
- From Other Plugins/Scripts

User Input Methods
- requestInputs
    - `id` (string, required)
    - `label` (string)
    - `type` ("text" | "textarea" | "dropdown" | "date" | "field-suggest" | "suggester")
    - `placeholder` (string)
    - `defaultValue` (string)
    - `options` (string[] for dropdown and suggester)
    - `dateFormat` (string for date)
    - `description` (string)
    - `suggesterConfig` (object for suggester: `{ allowCustomInput?: boolean, caseSensitive?: boolean, multiSelect?: boolean }`)
- inputPrompt
- wideInputPrompt
- yesNoPrompt
- infoDialog
- suggester
- checkboxPrompt

```js
module.exports = async (params) => {
    const { quickAddApi } = params;
    
    // Text input
    const text = await quickAddApi.inputPrompt("Enter text:");
    
    // Wide text input (multi-line)
    const longText = await quickAddApi.wideInputPrompt("Enter description:");
    
    // Yes/No confirmation
    const confirmed = await quickAddApi.yesNoPrompt("Are you sure?");
    
    // Suggester (dropdown selection)
    const choice = await quickAddApi.suggester(
        ["Option 1", "Option 2", "Option 3"],
        ["value1", "value2", "value3"]
    );
    
    // Checkbox selection
    const selected = await quickAddApi.checkboxPrompt(
        ["Item 1", "Item 2", "Item 3"],
        ["Item 1"]  // Pre-selected items
    );
};
```

Format

Choice Execution
- executeChoice

Utility Module
- getClipboard
- setClipboard

Date Module
- now
- tomorrow
- yesterday

AI Module

Field Suggestions Module

## User Scripts

User scripts are JavaScript files that extend macro functionality. They have access to:
- The Obsidian app object
- The QuickAdd API
- A variables object for passing data between commands

Every user script must export a module with at least an entry point function.
Or with the object syntax:
```js
module.exports = {
    entry: start,
    settings: {
        name: "Script Name",
        author: "Your Name",
        options: {
            // Define configurable options here
        }
    }
};

async function start(params, settings) {
    const { app, quickAddApi, variables, obsidian } = params;
    // Your code here
}
```

params
```js
const {
    app: _app = app,                  // Obsidian app instance - see https://docs.obsidian.md/Reference/TypeScript+API/App
    obsidian,         // Obsidian module with all classes and utilities
    quickAddApi: app.plugins.plugins.quickadd.api,   // QuickAdd API methods (documented below)
    variables = {},              // Variables object for sharing data between scripts and templates
    abort: (message) => never   // Abort macro execution with optional message
} = params || {};
```

settings - option type
- text
- toggle
- dropdown
- format

Multiple Entry Points
```js
module.exports = {
    "Create Note": createNote,
    "Update Note": updateNote,
    "Delete Note": deleteNote
};

async function createNote(params) {
    // Implementation
}

async function updateNote(params) {
    // Implementation
}

async function deleteNote(params) {
    // Implementation
}
```

Recipes
```js title:"working-with-files" fold
async function start(params, settings) {
    const { app, obsidian } = params;
    
    // Get all markdown files
    const files = app.vault.getMarkdownFiles();
    
    // Get a specific file
    const file = app.vault.getAbstractFileByPath("path/to/file.md");
    if (file instanceof obsidian.TFile) {
        // Read file content
        const content = await app.vault.read(file);
        
        // Get file metadata
        const metadata = app.metadataCache.getFileCache(file);
        const frontmatter = metadata?.frontmatter;
        const links = metadata?.links || [];
        const tags = metadata?.tags || [];
        
        // Process content
        const modified = content.replace(/old/g, "new");
        
        // Save changes
        await app.vault.modify(file, modified);
    }
    
    // Create new file
    const newFile = await app.vault.create(
        "folder/subfolder/new-note.md", 
        "# Title\n\nContent here"
    );
    
    // Rename file
    await app.fileManager.renameFile(
        newFile, 
        "folder/subfolder/renamed-note.md"
    );
    
    // Delete file
    await app.vault.delete(newFile);
    
    // Copy file
    await app.vault.copy(
        file, 
        "path/to/copy.md"
    );
    
    // Get folder
    const folder = app.vault.getAbstractFileByPath("folder/subfolder");
    if (folder instanceof obsidian.TFolder) {
        // List folder contents
        const children = folder.children;
        
        // Create folder if it doesn't exist
        const path = "new/folder/structure";
        if (!app.vault.getAbstractFileByPath(path)) {
            await app.vault.createFolder(path);
        }
    }
}
```

```js title:"working-with-the-active-file" fold
async function start(params, settings) {
    const { app, obsidian } = params;
    
    // Get active file
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new obsidian.Notice("No active file");
        return;
    }
    
    // Get active editor
    const activeView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
    if (activeView) {
        const editor = activeView.editor;
        
        // Get selected text
        const selection = editor.getSelection();
        
        // Get current line
        const cursor = editor.getCursor();
        const line = editor.getLine(cursor.line);
        
        // Replace selection
        editor.replaceSelection("New text");
        
        // Insert at cursor
        editor.replaceRange(
            "Inserted text", 
            cursor
        );
        
        // Get entire document
        const fullText = editor.getValue();
        
        // Replace entire document
        editor.setValue("Completely new content");
    }
}
```

```js title:"working-with-metadata-and-frontmatter" fold
async function start(params, settings) {
    const { app, obsidian } = params;
    
    const file = app.workspace.getActiveFile();
    if (!file) return;
    
    // Get frontmatter
    const cache = app.metadataCache.getFileCache(file);
    const frontmatter = cache?.frontmatter || {};
    
    // Update frontmatter
    await app.fileManager.processFrontMatter(file, (fm) => {
        fm.tags = fm.tags || [];
        fm.tags.push("processed");
        fm.date = new Date().toISOString();
        fm.status = "completed";
        delete fm.oldField;  // Remove a field
    });
    
    // Get all files with specific frontmatter
    const filesWithTag = app.vault.getMarkdownFiles().filter(f => {
        const meta = app.metadataCache.getFileCache(f);
        return meta?.frontmatter?.tags?.includes("important");
    });
    
    // Get backlinks
    const backlinks = app.metadataCache.getBacklinksForFile(file);
    
    // Get outgoing links
    const links = cache?.links || [];
    const embeds = cache?.embeds || [];
}
```

```js title:"opening-and-navigating-files" fold
async function start(params, settings) {
    const { app, obsidian } = params;
    
    // Open file in active pane
    const file = app.vault.getAbstractFileByPath("path/to/note.md");
    if (file instanceof obsidian.TFile) {
        await app.workspace.getLeaf().openFile(file);
    }
    
    // Open in new pane
    await app.workspace.getLeaf('split').openFile(file);
    
    // Open in new tab
    await app.workspace.getLeaf('tab').openFile(file);
    
    // Open in new window
    await app.workspace.getLeaf('window').openFile(file);
    
    // Navigate to specific heading
    await app.workspace.openLinkText(
        "note#heading", 
        "",  // source path
        true  // new leaf
    );
    
    // Create and open a daily note
    const { createDailyNote } = app.plugins.plugins["daily-notes"].instance;
    const dailyNote = await createDailyNote(moment());
    await app.workspace.getLeaf().openFile(dailyNote);
}
```

## Examples

### 开关代码片段

```js
module.exports = async function toggleSnippets(params) {
    const { quickAddApi = app.plugins.plugins.quickadd.api } = params || {};

    const snippets = app.customCss.snippets;
    const enabledSnippets = app.customCss.enabledSnippets;

    const selected = await quickAddApi.checkboxPrompt(
        snippets,
        enabledSnippets
    );

    for (const snippet of snippets) {
        app.customCss.setCssEnabledStatus(snippet, selected.includes(snippet));
    }
    app.customCss.requestLoadSnippets();
};

```

### 跳转标题

```js
async function generateHeadings(params){
    const { quickAddApi = app.plugins.plugins.quickadd.api, variables = {} } = params || {};
    const { headings } = app.metadataCache.getFileCache(app.workspace.getActiveFile());
    if (!headings) return;

    const startHeadingLevel = 1;
    variables.result = headings.map(h => `${' '.repeat((h.level - startHeadingLevel) * 4)}- ${h.heading}`).join('\n');
    await quickAddApi.utility.setClipboard(variables.result);
    return variables.result;
}

async function showAndGotoHeadings(params) {
    const { quickAddApi = app.plugins.plugins.quickadd.api } = params || {};
    const { headings } = app.metadataCache.getFileCache(app.workspace.getActiveFile());
    if (!headings) return;

    const heading = await quickAddApi.suggester(
        headings.map(h=>`H${h.level}: ${h.heading}`),    // default render
        headings,
        'choose a heading to goto',
        false,
        {renderItem: (h, el) => {
            const row = el.createEl('div');
            const marker = row.createEl('span', {text: 'H'});
            marker.setAttr('style', `font-weight:bold;color:var(--h${h.level}-color)`);
            const level = row.createEl('sub', {text: `${h.level}`});
            level.setAttr('style', `color:gray;`);
            row.createEl('span', {text: `  ${h.heading}`});
        }}
    );
    
    app.workspace.activeLeaf?.view?.currentMode.applyScroll(heading.position.start.line);
}

module.exports = {
    entry: showAndGotoHeadings,
    generateHeadings,
};
```

### 正则替换

```js fold
let Notice;

function applyRule(rule, text) {
    if (!text || !rule) return text;
    
    const { pattern, replacement, useRegex } = Array.isArray(rule) 
        ? { pattern: rule[0], replacement: rule[1], useRegex: rule[2] }
        : rule || {};

    if (!pattern) return text;

    try {
        const isRegex = /^(true|yes|y|1|是)$/i.test(String(useRegex || "").trim());
        const newText = isRegex
            ? text.replace(new RegExp(pattern, "gm"), replacement || "")
            : text.replaceAll(pattern, replacement || "");
        console.debug(`Replace "${pattern}" success.`);
        return newText;
    } catch(error) {
        console.error(`Replace "${pattern}" failed:`, error);
        return text;
    }
}

async function replaceInFile(rules, file) {
    let content = await app.vault.read(file);
    
    for (const rule of rules) {
        if (!content) break;
        content = applyRule(rule, content);
    }
    await app.vault.modify(file, content);
}

async function globalReplace(rules, filter) {
    const files = app.vault.getMarkdownFiles();
    for (const file of files) {
        if(!filter || filter(file))
            await replaceInFile(rules, file);
    }
    new Notice(`Finished.`, 3000);
}

function replaceByEditor(rules, editor) {
    if (!editor) return;
    const selection = editor.getSelection();
    let text = selection || editor.getValue();
    
    for (const rule of rules) {
        if (!text) break;
        text = applyRule(rule, text);
    }
    selection ? editor.replaceSelection(text) : editor.setValue(text);
    new Notice(`Finished.`, 3000);
}

async function start(params, settings) {
    const { obsidian, quickAddApi = app.plugins.plugins.quickadd.api } = params || {};
    ({ Notice } = obsidian);

    let ruleset;
    try {
        ruleset = {scope: settings.scope, rules: JSON.parse(settings.rules || "[]")}
    } catch (error) {}

    if (!ruleset?.rules?.length) {
        const inputs = await quickAddApi?.requestInputs([
            { id: 'pattern', label: "查找", type: "text" },
            { id: 'replacement', label: "替换", type: "text" },
            { id: 'useRegex', label: "正则", type: "dropdown", options: ['yes', 'no'], defaultValue: 'no' },
            { id: 'scope', label: "范围", type: "dropdown", options: ['selection', 'file', 'folder', 'vault'], defaultValue: 'file' },
        ]);
        ruleset = {scope: inputs.scope, rules: [inputs]}
    }

    const {scope, rules} = ruleset;
    switch (scope) {
        case 'selection':
        case 'file':
            replaceByEditor(rules, app.workspace.activeEditor?.editor);
            break;
        case 'folder':
            const currentFolder = app.workspace.getActiveFile().parent.path;
            await globalReplace(rules, (f) => f.parent.path === currentFolder);
            break;
        case 'vault':
            await globalReplace(rules);
            break;
        default:
            break;
    }
}

module.exports = {
    entry: start,
    settings: {
        name: '',
        author: '',
        options: {
            rules: {
                type: "textarea",
                defaultValue: "[]",
                placeholder: '[["pattern", "replacement", "useRegex"]]',
            },
            scope: {
                type: "dropdown",
                defaultValue: "file",
                options: ['selection', 'file', 'folder', 'vault']
            }
        }
    }
}
```

例子:  

- 移除外部链接 `(?<!!)\[([^\]]+)\]\([^)]+\)` -> `$1`

### 标签管理

```js
module.exports = async (params) => {
    const { obsidian, quickAddApi = app.plugins.plugins.quickadd.api } = params || {};
    
    const { operation, tag, newTag, filepaths } = await quickAddApi.requestInputs([
        { id: 'operation', type: 'dropdown', options: ['add', 'remove', 'replace'] },
        { id: 'tag', type: 'text' },
        { id: 'newTag', type: 'text' },
        { id: 'filepaths', type: 'textarea' },
    ]);

    const ops = {
        add: (fm) => !fm.tags ? (fm.tags = [tag], true) : !fm.tags.includes(tag) && (fm.tags.push(tag), true),
        remove: (fm) => fm.tags?.includes(tag) && fm.tags.splice(fm.tags.indexOf(tag), 1).length,
        replace: (fm) => fm.tags?.includes(tag) && (fm.tags[fm.tags.indexOf(tag)] = newTag, true)
    };

    let modified = 0;
    
    const files = filepaths && filepaths.trim()
        ? filepaths.split('\n')
            .map(p => p.trim())
            .filter(p => p)
            .map(p => app.vault.getFileByPath(p))
            .filter(f => f)
        : app.vault.getMarkdownFiles();
    
    for (const file of files) {
        await app.fileManager.processFrontMatter(file, (fm) => ops[operation](fm) && modified++);
    }
    
    new obsidian.Notice(`Modified ${modified} files`);
    return modified;
};
```

### 附件管理

```js fold
let TFile;

const imageExtensions = ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp'];

function getByIndex(arr, pos) {
    return arr?.[Math.max(0,Math.min(pos < 0 ? arr.length + pos : pos, arr.length - 1))];
}

async function poll(func, { interval = 100, timeout = 3000, attempts } = {}) {
    const endTime = Date.now() + timeout;
    for (let count = 0; Date.now() < endTime && (!attempts || count < attempts); count++) {
        const result = await func();
        if (result) return result;
        await new Promise(r => setTimeout(r, interval));
    }
}

// const tagPartsCache = new WeakMap();

function getTagParts(tags) {
    if (!tags) return new Set();
    
    // if (tagPartsCache.has(tags)) {
    //     return tagPartsCache.get(tags);
    // }
    
    const parts = new Set();
    
    for (const tag of tags) {
        const segments = tag.split('/');
        for (let i = 0; i < segments.length; i++) {
            for (let j = i; j < segments.length; j++) {
                const subPath = segments.slice(i, j + 1).join('/');
                parts.add(subPath);
            }
        }
    }
    
    // tagPartsCache.set(tags, parts);
    return parts;
}

function hasTag(tags, pattern) {
    const regex = new RegExp(`(^|/)${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/|$)`);
    return tags?.some(tag => regex.test(tag)) ?? false;
}

async function renameAttachment(file) {
    if (!imageExtensions.includes(file.extension.toLowerCase())) return;
    
    const newName = `${file.stat.ctime}-${file.stat.size}.${file.extension}`;
    if (file.name === newName) return;
    
    await app.fileManager.renameFile(file, `${file.parent.path}/${newName}`);
}

async function renameAttachmentsInFolder(folder) {
    const files = Array.from(folder.children).filter(e => e instanceof TFile);
    
    for (const file of files) {
        try {
            await renameAttachment(file);
        } catch (error) {
            console.error(`Failed to rename ${file.path}`, error);
        }
    }
}

async function renameAttachmentsInFile(file) {
    if (file.extension !== 'md') return;
    
    const cache = app.metadataCache.getFileCache(file);
    const links = [
        ...(cache?.embeds?.map(e => e.link) || []),
        ...(cache?.frontmatterLinks?.map(e => e.link) || [])
    ].filter(link => link);
    const processed = new Set();
    
    for (const link of links) {
        try {
            const attachment = app.metadataCache.getFirstLinkpathDest(link, file.path);
            if (attachment && !processed.has(attachment.path)) {
                processed.add(attachment.path);
                await renameAttachment(attachment);
            }
        } catch (error) {
            console.error(`Failed to rename ${link}`, error);
        }
    }
}

async function downloadAttachments(file) {
    if (file.extension !== 'md') return;
    await app.workspace.getLeaf().openFile(file);
    await app.commands.executeCommandById('editor:download-attachments');
    (await poll(() => document.querySelector('.mod-cta')))?.click();
    
    if(!await poll(() => {
        const cache = app.metadataCache.getFileCache(file);
        return !!(cache?.embeds?.length || cache?.frontmatterLinks?.length);
    })) return;
    
    const cache = app.metadataCache.getFileCache(file);
    const fm = cache.frontmatter;
    if (!fm.image && cache.embeds?.length) {
        await app.fileManager.processFrontMatter(file, (fm) => {
            fm.image = `[[${getByIndex(cache.embeds, -1).link}]]`;
        });
    }
}

async function registerEvent(params) {
    app.plugins.plugins.quickadd.registerEvent(app.vault.on('create', async (file) => {
        if (file.extension === 'md') {
            if (!await poll(() => {
                const tags = app.metadataCache.getFileCache(file)?.frontmatter?.tags;
                if (!tags) return false;
                
                const tagParts = getTagParts(tags);
                return tagParts.has('clippings');
            })) return;
            await downloadAttachments(file);
            await renameAttachmentsInFile(file);
        } 
        // else {
            //     renameAttachment(file);
        // }
    }));
    console.log('registered');
}

async function cleanUnusedAttachments(params) {
    const {quickAddApi = app.plugins.plugins.quickadd.api} = params || {};
    const attachments = app.vault.getFiles().filter(f => imageExtensions.includes(f.extension.toLowerCase()));
    
    const unused = Object.fromEntries(
        attachments
            .filter((a) => !app.metadataCache.getBacklinksForFile(a)?.data?.size)
            .map((a) => [a.path, a])
    );

    const selected = await quickAddApi.checkboxPrompt(Object.keys(unused));
    for (path of selected) {
        try {
            await app.vault.delete(unused[path]);
            console.log(`Delete ${path} success.`);
        } catch(error) {
            console.error(`Delete ${path} failed: ${error}`);
        }
    }
}

module.exports = {
    registerEvent,
    downloadAttachments: async (params) => {
        await downloadAttachments(app.workspace.getActiveFile());
    },
    downloadAndRenameAttachments: async (params) => {
        const file = app.workspace.getActiveFile();
        await downloadAttachments(file);
        await renameAttachmentsInFile(file);
    },
    renameAttachmentsInCurrentFile: async (params) => {
        await renameAttachmentsInFile(app.workspace.getActiveFile());
    },
    renameAttachmentsInFolder: async (params) => {
        const { app, obsidian, quickAddApi } = params || {};
        ({TFile} = obsidian);
        const folders = app.vault.getAllFolders(true);
        const folder = await quickAddApi.suggester(
            folders.map(i=>i.path),
            folders
        );
        await renameAttachmentsInFolder(folder);
    },
    cleanUnusedAttachments,
};
```

## Tips

### require

```js
const mod = require(app.vault.adapter.basePath+'/path/xxx.js');
```

### 全局变量

```js
let obsidian, Notice;

function test(){
    new Notice(`${obsidian.apiVersion}`, 1000);
}

async function start(params, settings) {
    const {
        app: _app = app,
        obsidian: _ob,
        quickAddApi = app.plugins.plugins.quickadd.api,
        variables = {},
    } = params || {};
    obsidian = _ob;
    ({Notice} = obsidian);
    test();
    variables.result = app.workspace.getActiveFile().parent.path;
    return variables.result;
}

module.exports = {
    entry: start,
    // settings: {name: '', author: '', options: {}}
}
```