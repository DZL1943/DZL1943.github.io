---
created: 2023-06-28T17:00
modified: 2025-10-20T22:02
---

## Settings

- 文本编辑器
- 工作台
- 窗口
- 功能
- 应用程序
- 安全性
- 扩展

```json
{
    "[css]": {
        "editor.tabSize": 2,
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "[html]": {
        "editor.tabSize": 2
    },
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.tabSize": 2
    },
    "[lisp]": {
        "editor.tabSize": 2
    },
    "[markdown]": {
        "editor.defaultFormatter": "DavidAnson.vscode-markdownlint",
        "editor.tabSize": 4,
        "editor.quickSuggestions": {
            "other": true,
            "comments": false,
            "strings": false
        }
    },

    "editor.accessibilitySupport": "off",
    "editor.copyWithSyntaxHighlighting": false,
    "editor.cursorBlinking": "expand",
    "editor.detectIndentation": true,
    "editor.fontSize": 20,
    "editor.guides.bracketPairs": "active",
    // "editor.insertSpaces": true,
    "editor.lineNumbers": "relative",
    "editor.linkedEditing": true,
    "editor.minimap.autohide": "mouseover",
    "editor.minimap.size": "fill",
    "editor.renderWhitespace": "all",
    "editor.stickyScroll.maxLineCount": 3,
    "editor.stickyTabStops": true,
    "editor.wordWrap": "on",
    "explorer.autoReveal": false,
    "explorer.confirmDelete": false,
    "explorer.confirmDragAndDrop": false,
    "extensions.autoUpdate": "onlyEnabledExtensions",
    "files.autoGuessEncoding": true,
    "files.autoSave": "onWindowChange",
    "files.defaultLanguage": "${activeEditorLanguage}",
    "files.exclude": {
        "**/.trash": true
    },
    "files.watcherExclude": {
        "**/.bloop": true,
        "**/.metals": true,
        "**/.ammonite": true
    },
    "git.openRepositoryInParentFolders": "never",
    // "livePreview.customExternalBrowser": "Edge",
    // "redhat.telemetry.enabled": false,
    "terminal.integrated.copyOnSelection": true,
    // "terminal.integrated.env.osx": {},
    "terminal.integrated.fontSize": 18,
    // "terminal.integrated.inheritEnv": false,
    "update.mode": "manual",
    "window.autoDetectColorScheme": false,
    "window.customTitleBarVisibility": "never",
    "window.restoreWindows": "one",
    "window.titleBarStyle": "native",  // custom
    "workbench.colorTheme": "Dracula Theme Soft",
    "workbench.editorAssociations": {},
    "workbench.editor.empty.hint": "hidden",
    "workbench.editor.pinnedTabSizing": "shrink",
    "workbench.editor.wrapTabs": false,
    "workbench.iconTheme": "vscode-icons",
    "workbench.preferredDarkColorTheme": "Night Owl",
    // "workbench.preferredLightColorTheme": "Atom One Light",
    "workbench.startupEditor": "newUntitledFile",
    "workbench.secondarySideBar.defaultVisibility": "hidden",
    "workbench.colorCustomizations": {
        "editorCursor.foreground": "#00FF00"
    },

    "prettier.tabWidth": 4,

    "markdown.extension.list.indentationSize": "inherit", // important
    // "markdown-preview-enhanced.automaticallyShowPreviewOfMarkdownBeingEdited": true,
    "markdown-preview-enhanced.frontMatterRenderingOption": "code block",
    "markdown-preview-enhanced.previewTheme": "atom-material.css",
    "markdown.preview.fontSize": 16,
    "markdownShortcuts.bullets.marker": "-",
    "markdownShortcuts.italics.marker": "*",
    "markdown.updateLinksOnFileMove.enabled": "prompt",
    "markdownlint.config": {
        "MD007": {
            "indent": 4
        },
        "MD031": false,
        "MD041": false,
        "MD045": false,
        "MD047": false,
        "no-hard-tabs": true
    },

    "code-runner.clearPreviousOutput": true,
    "code-runner.runInTerminal": true,
    "code-runner.saveFileBeforeRun": true,

    // 启动连按 defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
    "vim.disableExtension": true,
    "vim.easymotion": true,
    // "vim.leader": "<space>",
    "vim.useSystemClipboard": true,
    "vim.useCtrlKeys": true,
    "vim.hlsearch": true,
    "vim.smartRelativeLine": true,
    // "vim.startInInsertMode": true,
    "vim.handleKeys": {
        "<C-a>": false,
        "<C-f>": false,
        "<C-n>": false
    },
    "vim.autoSwitchInputMethod.enable": true,
    "vim.autoSwitchInputMethod.defaultIM": "com.apple.keylayout.ABC",
    "vim.autoSwitchInputMethod.obtainIMCmd": "/opt/homebrew/bin/im-select",
    "vim.autoSwitchInputMethod.switchIMCmd": "/opt/homebrew/bin/im-select {im}",
    "vim.whichwrap": "b,s,<,>,[,]",

    "ime-and-cursor.EnglishIM": "com.apple.keylayout.ABC",
    "ime-and-cursor.ChineseIM": "com.sogou.inputmethod.sogou.pinyin",
    "ime-and-cursor.obtainIMCmd": "/opt/homebrew/bin/im-select",
    "ime-and-cursor.switchIMCmd": "/opt/homebrew/bin/im-select {im}",
    "ime-and-cursor.helpVim": true,
    "ime-and-cursor.cursorStyle.enable": true,
    "ime-and-cursor.cursorStyle.English": "Block",
    "smart-ime.enableChineseSwitchToChinese": false,

    "ledger.binary": "/opt/homebrew/bin/ledger",
    "python.defaultInterpreterPath": "/Users/mac/opt/miniconda3/envs/py3",

    // 1.93
    // "apc.electron": {
    //     "frame": false,
    //     "titleBarStyle": "hiddenInset",
    //     "opacity": 0.9,
    //     // "transparent": true,
    //     // "vibrancy": "ultra-dark",
    //     // "visualEffectState": "active",
    //     "trafficLightPosition": {
    //       "x": 7,
    //       "y": 5
    //     }
    // },
    
    "custom-ui-style.background.opacity": 0.9,  // not working
    "custom-ui-style.electron": {
        "frame": false,
        // "transparent": true,
        // "backgroundColor": "rgba(0, 0, 0, 0)",
        // "vibrancy": "fullscreen-ui",
        // "roundedCorners": false,
    },
    "custom-ui-style.stylesheet": {
        ".monaco-workbench": {
            "&:not(.fullscreen)": {
                // Allow dragging on the activity-bar, status-bar, tabs-container, side-bar title...
                ".activitybar, .statusbar, .tabs-container, .sidebar .composite.title": {
                    "-webkit-app-region": "drag",

                // ...but still allow to click actions and items without dragging.
                    ".content .monaco-action-bar, .statusbar-item, .tab, .title .title-actions .action-label": {
                        "-webkit-app-region": "no-drag"
                    }
                }
            },
        },
        // "body > .monaco-workbench": " background-color: initial;"
    },
}
```

## Keybindings

[Keyboard shortcuts for Visual Studio Code](https://code.visualstudio.com/docs/configure/keybindings#_keyboard-shortcuts-reference)

```json
[
    {
        "key": "ctrl+q tab",
        "command": "type",
        "args": { "text": "\t" },
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+cmd+b",
        "command": "workbench.action.toggleActivityBarVisibility"
    },
    {
        "key": "ctrl+alt+v",
        "command": "toggleVim"
    }
]
```

## Themes

- [x] One Dark Pro
- [ ] Monokai Pro
- [x] Dracula
- [ ] GitHub
- [ ] Material/Vira
- [ ] Ayu
- [ ] Night Owl
- [ ] Tokyo Night
- [ ] Cobalt2
- [ ] Fleet

## Extensions

`code --list-extensions | awk -F'.' '{print $2}' | sort | tee >(pbcopy)`

### 本体类

- 简体中文
- Remote - SSH
- Remote Explorer
- Live Share
- GitLens
- Git History
- Git Graph
- indent-rainbow
- Vim
- Project Manager
- Apc Customize UI++
- Custom UI Style

### 编程类

- 通用
    - Code Spell Checker
    - CodeSnap
    - Code Runner
    - CodeLLDB
    - Better Comments
    - Output Colorizer
    - Prettier
    - IntelliCode
    - Copilot
    - Tabnine
    - REST Client
    - Regex Previewer
    - LeetCode
- 前端
    - Live Server
    - Live Preview
    - ESLint
    - HTML CSS Support
    - Auto Rename Tag
    - Auto Close Tag
    - Auto Complete Tag
    - JavaScript code snippets
    - CSS Peek
    - Quokka.js
- Python
    - Pylance
    - Python Debugger
    - Python Environments
- C/C++
- Java
- Shell
    - shell-format
    - ShellCheck
    - shellman
- Docker
- SQLTools

### 扩展类

- Jupyter
- Quarto
- Markdown
    - Markdown All in One
    - markdownlint
    - Markdown Preview Enhanced
    - Markdown Editor
    - Markdown Shortcuts
    - Markdown Table
    - Markdown Table Prettifier
    - Markdown Notes
    - Excel to Markdown table
    - Foam
    - Markmap
    - Marp
- Org Mode
- vscode-pdf
- Office
    - Office Viewer
    - Excel Viewer
- CSV
- XML
- YAML
- TOML
- Hex

### 辅助类

- Color Highlight

