---
created: 2025-10-08T20:32
modified: 2025-10-09T08:12
aliases:
  - obsidian plugins
url:
  - https://obsidian.md/plugins
  - https://www.obsidianstats.com/
---

## 插件分类

## 状态分级

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

## 已安装插件

### community-plugins.json 和 plugins 目录解析

```shell
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

### dvjs 查询

```dataviewjs
dv.table(["id", "name", "version", "enabled"], Object.values(app.plugins.manifests).sort((a,b)=>a.id.localeCompare(b.id)).map(p=>[p.id, p.name, p.version, app.plugins.plugins[p.id] !== undefined]))
```

## 社区插件

- 文件列表类
- 搜索类
- 快捷键类
- 附件类
- 表格类
- 白板类
- 日记待办类
## 插件精选

- 增强类: style-settings, notebook-navigator, hover-editor, virtual-linker
- UI 类: cmdr, editing-toolbar, note-toolbar
- 扩展类: excalidraw, templater, quickadd, dataview, anyblock
- 编辑类: outliner, admonition, easy-typing, various-complements, latex-suite
- 辅助类: image-toolkit, image-converter, janitor

## 插件笔记

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
