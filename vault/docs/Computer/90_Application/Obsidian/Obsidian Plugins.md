---
title: Obsidian 插件
created: 2025-10-08T20:32
modified: 2025-10-09T08:12
url:
  - https://obsidian.md/plugins
  - https://www.obsidianstats.com/
---

```ad-note
title: 状态分级图例
collapse: true

- [=] 已知
    - [x] 已启用
        - [X] 必备
        - [P] 推荐
        - [/] 可选
    - [\>] 未启用
        - [+] 备用
        - [?] 待定
    - [\<] 未安装
        - [_] 忽略
        - [C] 不推荐
        - [-] 废弃
- [ ] 未知
```

## Awesome

- advanced-canvas
- *any-block*
- better-export-pdf
- *better-markdown-links*
- *better-plugins-manager*
- cmdr
- codeblock-customizer
- css-editor
- *custom-sort*
- **dataview**
- dust-calendar
- **easy-typing-obsidian**
- **editing-toolbar**
- find-unlinked-files
- float-search
- floating-toc
- *fuzzy-chinese-pinyin*
- heading-decorator
- *image-converter*
- janitor
- keyboard-analyzer
- links
- multi-properties
- nldates-redux
- *note-toolbar*
- **notebook-navigator**
- obsidian-admonition
- obsidian-advanced-uri
- obsidian-auto-hide
- **obsidian-excalidraw-plugin**
- obsidian-export-image
- obsidian-front-matter-title-plugin
- obsidian-heading-shifter
- *obsidian-hover-editor*
- obsidian-image-toolkit
- obsidian-kanban
- *obsidian-latex-suite*
- **obsidian-linter**
- **obsidian-outliner**
- obsidian-plugin-proxy
- obsidian-plugin-update-tracker
- **obsidian-style-settings**
- obsidian-tasks-plugin
- obsidian-zoom
- obsidian42-brat
- paste-link
- quick-explorer
- **quickadd**
- refresh-preview
- settings-search
- show-whitespace-cm6
- solve
- statusbar-organizer
- table-editor-obsidian
- **templater-obsidian**
- *various-complements*
- *virtual-linker*

## Installed

```shell title="community-plugins.json 和 plugins 目录解析" fold
cd .obsidian
# 解析已启用的插件
cat community-plugins.json | grep -Ev '\[|\]' | sed 's/[[:space:]]//g' | sed 's/"//g' | sed 's/,//g' | sort | tee enabled-plugins >(pbcopy)
# jq 'sort' community-plugins.json | sed '1d;$d'
# jq '(.desktop.plugins | keys)|.[]' plugins/lazy-plugins/data.json | sed 's/"//g'
# (可选)以多列的方式呈现
# cat enabled-plugins | xargs -n3 | column -t
# 列出已安装的插件(默认已有序)
gfind plugins -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort > all-installed-plugins
# 仅列出未启用的插件
grep -wvf enabled-plugins all-installed-plugins
```

```dataviewjs
dv.table(["id", "name", "version", "enabled"], Object.values(app.plugins.manifests).sort((a,b)=>a.id.localeCompare(b.id)).map(p=>[p.id, p.name, p.version, app.plugins.plugins[p.id] !== undefined]))
```

## Community

- 文件列表类
- 搜索类
- 快捷键类
- 附件类
- 表格类
- 白板类
- 日记待办类

## Notes

> [!note]- 命名规范
> - filename: 参考插件目录名, 例如 'obsidian-xxx-plugin'
> - title: 插件显示名称 name
> - aliases: 插件 id (与 filename 相同则省略) 和 name

```base
views:
  - type: table
    name: 表格
    filters:
      and:
        - file.hasTag("Obsidian/Plugins")
    sort: []
```