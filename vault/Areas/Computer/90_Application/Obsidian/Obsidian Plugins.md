---
title: Obsidian 插件
created: 2025-10-08T20:32
modified: 2026-01-15T21:15
url:
  - https://obsidian.md/plugins
  - https://www.obsidianstats.com/
aliases:
  - Obsidian 插件
---

# Obsidian 插件

```ad-note
title: 状态分级图例
collapse: true

- [=] 已知
    - [x] 已启用
        - [X] 必备
        - [P] 推荐
        - [/] 可选
    - [>] 未启用
        - [+] 备用
        - [?] 待定
    - [<] 未安装
        - [_] 忽略
        - [C] 不推荐
        - [-] 废弃
- [ ] 未知
```

## 本体类
%% 对核心功能进行改进 %%

- [X] better-markdown-links
- [P] css-editor
- [X] custom-sort
- [X] fuzzy-chinese-pinyin
- [X] notebook-navigator
- [X] obsidian-front-matter-title-plugin
- [X] virtual-linker

## 界面类
%% 对主程序交互界面进行改进 %%

- [X] cmdr
- [P] float-search
- [P] floating-toc
- [P] note-toolbar
- [X] obsidian-hover-editor
- [P] obsidian-style-settings

## 编辑类
%% 增强编辑体验 %%

- [X] easy-typing-obsidian
- [P] editing-toolbar
- [X] obsidian-heading-shifter
- [P] obsidian-latex-suite
- [X] obsidian-linter
- [X] obsidian-outliner
- [P] paste-link
- [X] table-editor-obsidian
- [X] various-complements

## 渲染类
%% 影响笔记内容和预览显示效果 %%

- [P] any-block
- [X] codeblock-customizer
- [P] dataview
- [P] obsidian-admonition

## 扩展类
%% 带来新的常驻功能玩法 %%

- [P] advanced-canvas
- [P] obsidian-excalidraw-plugin
- [P] obsidian-kanban
- [P] obsidian-tasks-plugin
- [X] quickadd
- [P] templater-obsidian

## 辅助类
%% 提供可按需运行的辅助工具命令 %%

- [P] image-converter
- [X] obsidian-image-toolkit

## 备用待定

- Obsidian-sidebar-expand-on-hover-Plus
- **ace-code-editor**
- any-block-pro
- auto-embed
- better-search-views
- block-link-plus
- breadcrumbs
- buttons
- canvas-mindmap
- cm-chs-patch
- conditional-properties
- *consistent-attachments-and-links*
- continuous-mode
- css-inlay-colors
- custom-commands
- *custom-theme-studio*
- ~~daily-note-calendar~~
- daily-notes-editor
- *darlal-switcher-plus*
- *datacore*
- datepicker
- drawio-obsidian
- *dust-calendar*
- enhanced-annotations
- extended-graph
- external-rename-handler
- ~~file-tree-alternative~~
- fix-require-modules
- *floating-settings*
- folder-notes
- frontmatter-modified-date
- gridexplorer
- iconic
- journals
- js-engine
- keyshots
- legacy-vault-switcher
- lineage
- linked-note-exporter
- longform
- *make-md*
- markdown-table-editor
- markwhen
- *media-extended*
- mermaid-tools
- *metadata-menu*
- modal-opener
- modalforms
- mrj-text-expand
- note-definitions
- note-status
- note-to-mp
- novel-word-count
- obsidian-custom-attachment-location
- *obsidian-day-planner*
- obsidian-douban-plugin
- obsidian-file-cooker
- **obsidian-git**
- obsidian-importer
- obsidian-livesync
- *obsidian-local-images-plus*
- **obsidian-markmind**
- **obsidian-memos**
- *obsidian-meta-bind-plugin*
- obsidian-mindmap-nextgen
- obsidian-minimal-settings
- *obsidian-plugin-proxy*
- obsidian-plugin-update-tracker
- *obsidian-quiet-outline*
- obsidian-shellcommands
- obsidian-spaced-repetition
- obsidian-style-settings
- **obsidian-tagfolder**
- **obsidian-task-progress-bar**
- obsidian-tracker
- obsidian-weread-plugin
- obsidian42-brat
- obsidian42-strange-new-worlds
- *outliner-md*
- pane-relief
- **pdf-plus**
- pexels-banner
- *pretty-properties*
- *quick-plugin-switcher*
- quicklink
- recent-files-obsidian
- refresh-preview
- **remotely-save**
- share-to-notionnext
- sheet-plus
- shiki-highlighter
- sidebar-highlights
- simple-canvasearch
- slash-commander
- sticky-notes
- supercharged-links-obsidian
- tag-buddy
- tag-wrangler
- task-board
- **tasknotes**
- terminal
- theme-picker
- time-ruler
- typewriter-mode
- unitade
- vare
- vault-explorer
- vcf-contacts
- version-control
- *vertical-tabs*
- waypoint
- webpage-html-export
- zettelflow

## 参考

- [obsidian 白板相关插件](<obsidian 白板相关插件.md>)
- [obsidian 表格类插件](<obsidian 表格类插件.md>)
- [obsidian 附件管理](<obsidian 附件管理.md>)
- [obsidian 快捷键类插件](<obsidian 快捷键类插件.md>)
- [obsidian 搜索类插件](<obsidian 搜索类插件.md>)
- [obsidian 文件管理类插件](<obsidian 文件管理类插件.md>)
- [obsidian 移动端插件](<obsidian 移动端插件.md>)
- [obsidian GTD类插件](<obsidian GTD类插件.md>)
- [obsidian42-brat](<obsidian42-brat.md>)

### 插件笔记

> [!note]- 命名规范
> - filename: 参考插件目录名, 例如 'obsidian-xxx-plugin'
> - title: 插件显示名称 name
> - aliases: 插件 id (与 filename 相同则省略) 和 name

```base
views:
  - type: list
    name: plugins
    filters:
      and:
        - file.hasTag("Obsidian/Plugins")
    sort: []

```

### 已安装插件解析方法

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

[Better Plugins Manager](<obsidian-better-plugins-manager.md>)

### 社区插件列表解析

```shell fold title="jq"
jq -n --slurpfile stats Misc/community-plugin-stats.json --slurpfile info Misc/Data/community-plugins.json '
  $info[0] | map(. + ($stats[0][.id] // {}))
  | map(select(.downloads > 100000))
  | sort_by(-.downloads)
  | .[0:100][]
  | {id: .id, downloads: .downloads}
' | jq -c
```

```js datacorejsx title="simplest impl. render by datacore" fold
const PLUGINS_URL = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json";
const STATS_URL   = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json";

async function main() {
    const { manifests: installed, plugins: enabled } = app.plugins;
    
    const [plugins = [], stats = {}] = await Promise.all([
        fetch(PLUGINS_URL).then(r => r.json()).catch(() => []),
        fetch(STATS_URL).then(r => r.json()).catch(() => ({})),
    ]);
    
    const oneYearAgo = moment().subtract(1, "years");
    const filtered = plugins
        .map((p, i) => ({
            ...p,
            index: i,
            downloads: stats[p.id]?.downloads || 0,
            updated: stats[p.id]?.updated || "",
            state: enabled[p.id] ? "**已启用**" : installed[p.id] ? "未启用" : "未安装",
        }))
        .filter(p => 
            p.id in installed || 
            (moment(p.updated).isAfter(oneYearAgo) && p.downloads > 10000)
        )
        .sort((a, b) => b.downloads - a.downloads || a.id.localeCompare(b.id));
    
    return (
        <dc.Table
            rows={filtered}
            columns={[
                {id: 'name', value: p => `[${p.name}](https://github.com/${p.repo})`},
                {id: 'updated', value: p => p.updated ? moment(p.updated).fromNow() : ""},
                {id: 'downloads', value: p => p.downloads.toLocaleString()},
                {id: 'state', value: p => p.state},
            ]}
            paging={50}
        />
    );
}

return await main();
```

```js dataviewjs fold
const installed = app.plugins.manifests;
const enabled = app.plugins.plugins;

const DATA_MAP = {
    plugins: { path: "Misc/community-plugins.json", url: "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json" },
    stats:   { path: "Misc/community-plugin-stats.json", url: "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json" },
};

const CACHE_AGE = 6048e5; // 7 天
const FETCH_TIMEOUT = 30000;

const fetchData = async (url, t = FETCH_TIMEOUT) => {
    const c = new AbortController(), id = setTimeout(() => c.abort(), t);
    try {
        const r = await fetch(url, { signal: c.signal });
        if (!r.ok) throw r.status;
        return await r.json();
    } finally {
        clearTimeout(id);
    }
};

const saveData = async (path, obj) => {
    try { await app.vault.adapter.write(path, JSON.stringify(obj)); return true; } catch { return false; }
};

const getDataFromCache = async (path) => {
    try { return JSON.parse(await app.vault.adapter.read(path)); } catch { return null; }
};

const isCacheStale = async (path, maxAge = CACHE_AGE) =>
    app.vault.adapter.stat(path).then(s => Date.now() - s.mtime > maxAge).catch(() => true);

// 智能获取（优先未过期缓存，否则拉取并保存，失败回退缓存或默认）
async function getData({ useCache = true, force = false } = {}) {
    const out = {};
    await Promise.all(Object.entries(DATA_MAP).map(async ([k, { path, url }]) => {
        const need = force || !useCache || await isCacheStale(path);
        if (!need) {
            const c = await getDataFromCache(path);
            if (c != null) { out[`${k}Data`] = c; return; }
        }
        try {
            const remote = await fetchData(url);
            out[`${k}Data`] = remote;
            saveData(path, remote); // best-effort
            new Notice(`✅ ${k} 更新`);
        } catch (e) {
            const fallback = await getDataFromCache(path);
            out[`${k}Data`] = fallback != null ? fallback : (k === "plugins" ? [] : {});
            console.warn(`[getData] ${k} fetch failed:`, e);
        }
    }));
    return out;
}

// 将 plugins + stats 合并成可直接渲染的行对象（独立函数）
function mergeData(plugins = [], stats = {}, installedMap = installed, enabledMap = enabled) {
    return (plugins || []).map((p, i) => ({
        ...p,
        index: i,
        downloads: stats[p.id]?.downloads || 0,
        updated: stats[p.id]?.updated || "",
        state: Object.keys(enabledMap).includes(p.id) ? "**已启用**"
        : Object.keys(installedMap).includes(p.id) ? "未启用" : "未安装",
    }));
}

// 预设查询
const queryPresets = {
    popular: (data) =>
        data
            .filter(
                (p) =>
                    p.id in installed ||
                    (moment(p.updated).isAfter(moment().subtract(1, "years")) &&
                        p.downloads > 10000),
            )
            .sort(
                (a, b) => b.downloads - a.downloads || a.id.localeCompare(b.id),
            ),
    new: (data) =>
        data
            .filter((p) => p.downloads > 1000)
            .slice(-100)
            .toReversed(),
    canvas: (data) =>
        data.filter((p) =>
            ["id", "name", "description"].some((k) =>
                String(p[k] || "")
                    .toLowerCase()
                    .includes("canvas"),
            ),
        ),
};

// 渲染表格
const renderTable = (title, rows, fields = ["name","updated","downloads","state"]) => {
    dv.header(3, title);
    dv.table(fields, rows.map(p => [
        `[${p.name}](https://github.com/${p.repo})`,
        p.updated ? moment(p.updated).fromNow() : "",
        p.downloads.toLocaleString(),
        p.state
    ]));
};

// 主流程：获取 -> 合并 -> 多个查询 -> 渲染
async function main() {
    const { pluginsData = [], statsData = {} } = await getData();
    const merged = mergeData(pluginsData, statsData);
    
    renderTable("Popular", queryPresets.popular(merged));
    renderTable("New", queryPresets.new(merged));
    renderTable("Canvas", queryPresets.canvas(merged));
}

await main();
```
