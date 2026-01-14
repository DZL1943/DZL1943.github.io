---
created: 2026-01-10T16:58
modified: 2026-01-10T16:58
---

# Helix

A [Kakoune](https://github.com/mawww/kakoune) / [Neovim](https://github.com/neovim/neovim) inspired editor, written in Rust.

- Vim-like modal editing
- Multiple selections
- Built-in language server support
- Smart, incremental syntax highlighting and code editing via tree-sitter

## Keymap

[Keymap](https://docs.helix-editor.com/keymap.html)  
[Migrating from Vim](https://docs.helix-editor.com/from-vim.html)  
[helix/helix-term/src/commands.rs](https://github.com/helix-editor/helix/blob/master/helix-term/src/commands.rs)  

### Normal mode

#### Movement

- `hjkl` 左下上右
- `bwe`
- `ft`
- `ctrl-b/f` pageup/down
- `ctrl-u/d` half pageup/down
- `ctrl-i/o` jump forward/backward

#### Changes

- `r`
- `~` switch case
- \` lower case
- `ia`
- `oO`
- `uU`
- `y`
- `pP`
- `<>`
- `=`
- `d Alt-d`
- `c Alt-c`
- `Ctrl-a/x`
- `qQ`

##### Shell

#### Selection manipulation

- `sS Alt-s`
- `&`
- `_`
- `; Alt-;`
- `, Alt-,`
- `C Alt-C`
- `()`
- `%` select entire file
- `xX` select current line
- `J Alt-J` join lines
- `K Alt-K`
- `Ctrl-c` comment/uncomment
- `Alt-up/down/left/right`

#### Search

- `/?`
- `nN`
- `*`

#### Minor modes

|Key|Description|Command|
|---|---|---|
| `v` |Enter [select (extend) mode](https://docs.helix-editor.com/keymap.html#select--extend-mode) | `select_mode` |
| `g` |Enter [goto mode](https://docs.helix-editor.com/keymap.html#goto-mode) |N/A|
| `m` |Enter [match mode](https://docs.helix-editor.com/keymap.html#match-mode) |N/A|
| `:` |Enter command mode| `command_mode` |
| `z` |Enter [view mode](https://docs.helix-editor.com/keymap.html#view-mode) |N/A|
| `Z` |Enter sticky [view mode](https://docs.helix-editor.com/keymap.html#view-mode) |N/A|
| `Ctrl-w` |Enter [window mode](https://docs.helix-editor.com/keymap.html#window-mode) |N/A|
| `Space` |Enter [space mode](https://docs.helix-editor.com/keymap.html#space-mode) |N/A|

### Insert mode

### Select/extend mode

## Commands

## Config

```toml
theme = "monokai_pro_octagon"

[editor]
color-modes = true
bufferline = "multiple"
default-line-ending = "lf"
cursorline = true
line-number = "relative"
#workspace-lsp-roots = ["~/Workspace"]

[editor.cursor-shape]
insert = "bar"
normal = "block"
select = "underline"

[editor.statusline]
mode.normal = "NORMAL"
mode.insert = "INSERT"
mode.select = "SELECT"
# left = ["mode", "spinner"]
# center = ["file-name"]
# right = ["diagnostics", "selections", "position", "file-encoding", "file-line-ending", "file-type"]
# separator = "│"


[editor.whitespace.render]
# space = "all"
tab = "all"
nbsp = "none"
nnbsp = "none"
newline = "none"

[editor.whitespace.characters]
space = "·"
nbsp = "⍽"
nnbsp = "␣"
tab = "→"
newline = "⏎"
tabpad = "·" # Tabs will look like "→···" (depending on tab width)

[editor.indent-guides]
# render = true
character = "╎" # Some characters that work well: "▏", "┆", "┊", "⸽"
skip-levels = 1

[editor.soft-wrap]
enable = true
max-wrap = 25 # increase value to reduce forced mid-word wrapping
max-indent-retain = 0
wrap-indicator = ""  # set wrap-indicator to "" to hide it


[keys.normal]
S-left = "extend_char_left"
S-right = "extend_char_right"
S-up = "extend_line_up"
S-down = "extend_line_down"
S-A-left = "extend_prev_word_start"
S-A-right = "extend_next_word_start"
# A-left = "move_prev_word_start"
# A-right = "move_next_word_end"
A-j = ["extend_to_line_bounds", "delete_selection", "paste_after"]
A-k = ["extend_to_line_bounds", "delete_selection", "move_line_up", "paste_before"]
#d = { d = ["extend_to_line_bounds", "delete_selection"] }
"C-/" = "toggle_comments"

[keys.insert]
#j = { k = "normal_mode" }
S-left = "extend_char_left"
S-right = "extend_char_right"
S-up = "extend_line_up"
S-down = "extend_line_down"

C-a = "goto_line_start"
C-e = "goto_line_end"
# A-w = "yank"
# C-w = ["yank", "delete_selection"]
# C-y = "paste_after"
```

### LSP

[Language Server Configurations · helix-editor/helix Wiki · GitHub](https://github.com/helix-editor/helix/wiki/Language-Server-Configurations)

```toml
[[language]]
name = "python"
file-types = ["py"]
comment-tokens = "#"
indent = { tab-width = 4 }
language-servers = [ "pyright", "ruff" ]

[language-server.pyright.config.python.analysis]
typeCheckingMode = "basic"

[language-server.ruff]
command = "ruff-lsp"

[language-server.ruff.config.settings]
args = ["--ignore", "E501"]

[language.formatter]
command = "black"
args = ["--line-length", "88", "--quiet", "-"]
```

### Plugins

暂不支持 [Plugin system · helix-editor/helix · Discussion #3806 · GitHub](https://github.com/helix-editor/helix/discussions/3806)

## Tips

### 复制到系统剪切板

`<space>y`

### 全选

`%`

### 跳到文首文尾

`gg` `ge`

### 删除字符、行

单个字符: `d`  
一行: `xd`

### hlsearch

不支持?

### 列编辑

`C Alt-C` `,` 退出