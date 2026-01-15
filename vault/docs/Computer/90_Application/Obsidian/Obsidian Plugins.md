---
title: Obsidian 插件
created: 2025-10-08T20:32
modified: 2026-01-15T11:32
url:
  - https://obsidian.md/plugins
  - https://www.obsidianstats.com/
aliases:
  - Obsidian 插件
---

# Obsidian 插件

## 已安装

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

### 本体类
%% 对核心功能进行改进 %%
### 界面类
%% 对主程序交互界面进行改进 %%
### 编辑类
%% 增强编辑体验 %%
### 渲染类
%% 影响笔记内容和预览显示效果 %%
### 扩展类
%% 带来新的常驻功能玩法 %%
### 辅助类
%% 提供可按需运行的辅助工具命令 %%

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

```shell fold title:jq
jq -n --slurpfile stats Misc/community-plugin-stats.json --slurpfile info Misc/Data/community-plugins.json '
  $info[0] | map(. + ($stats[0][.id] // {}))
  | map(select(.downloads > 100000))
  | sort_by(-.downloads)
  | .[0:100][]
  | {id: .id, downloads: .downloads}
' | jq -c
```

```dataviewjs
const { Notice } = require('obsidian');

// 状态常量配置
const STATE_CONFIG = {
  symbols: ["X", "P", "/", "+", "?", "C", "-"],
  names: ["必备", "推荐", "可选", "备用", "待定", "不用", "废弃"]
};

// 创建状态映射
const createStateMaps = () => {
  const { symbols, names } = STATE_CONFIG;
  const stateMap = new Map(symbols.map((key, index) => [key, names[index]]));
  const reversedStateMap = new Map(names.map((value, index) => [value, symbols[index]]));
  return { stateMap, reversedStateMap };
};

const installedPlugins = app.plugins.manifests;
const enabledPlugins = app.plugins.plugins;

// 加载数据
async function loadData() {
  const CACHE_AGE = 6048e5; // 7天
  const DATA_MAP = {
    plugins: {
      path: "Misc/community-plugins.json",
      url: "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json",
    },
    stats: {
      path: "Misc/community-plugin-stats.json",
      url: "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugin-stats.json",
    },
  };

  // 步骤1：判断下载需求
  const needsUpdate = await Promise.all(
    Object.entries(DATA_MAP).map(async ([type, { path }]) =>
      app.vault.adapter
        .stat(path)
        .then((s) => Date.now() - s.mtime > CACHE_AGE)
        .catch(() => true)
    )
  );

  // 步骤2：并行下载（带超时）
  const fetchWithTimeout = (url) => {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 30000);

    return fetch(url, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .finally(() => clearTimeout(timeout));
  };

  await Promise.allSettled(
    Object.entries(DATA_MAP).map(async ([type, { path, url }], i) => {
      if (!needsUpdate[i]) return;

      try {
        console.debug(`[${type}] 开始更新`);
        const text = await fetchWithTimeout(url);
        await app.vault.adapter.write(path, text);
        console.info(`[${type}] 更新成功`);
        new Notice('✅ 数据已更新', 5000);
      } catch (e) {
        console.warn(`[${type}] 更新失败：${e}`);
      }
    })
  );

  // 步骤3：统一读取返回
  return Object.fromEntries(
    await Promise.all(
      Object.entries(DATA_MAP).map(async ([type, { path }]) => [
        `${type}Data`,
        JSON.parse(await app.vault.adapter.read(path)),
      ])
    )
  );
}

// 解析插件状态数据
function parsePluginStates(content) {
  const { stateMap } = createStateMaps();

  return content.split("\n").reduce((acc, line) => {
    // 修正后的单行正则（无换行问题）
    const match = line.match(
      /^-\s+\[(.)\]\s+\[([^|\]]+)(?:\|([^\]]*))?\]\s*(?:\(https:\/\/github\.com\/([\w-]+\/[\w-]+)\))?(?:\s*\|\s*(.*))?$/
    );
    if (!match) return acc;

    const [, state, idPart, namePart, repo, attrsStr] = match.map((s) =>
      (s || "").trim()
    );

    // 基础信息处理
    const entry = {
      state: stateMap.get(state),
      id: idPart.replace(/\\([\\|])/g, "$1"),
      ...(namePart && { name: namePart.replace(/\\([\\|])/g, "$1") }),
      ...(repo && { repo }),
    };

    // 强制键值对属性解析
    if (attrsStr) {
      attrsStr.split("|").forEach((segment) => {
        const [key, ...vals] = segment.split(":").map((s) => s.trim());
        if (vals.length) entry[key] = vals.join(":");
      });
    }

    acc[entry.id] = entry;
    return acc;
  }, {});
}

// 合并数据
function mergeData(plugins, stats, stateContent) {
  const pluginStates = parsePluginStates(stateContent);
  
  return plugins.map((plugin, index) => ({
    state: Object.keys(enabledPlugins).includes(plugin.id) ? "**已启用**" : Object.keys(installedPlugins).includes(plugin.id) ? "未启用" : "未安装",
    ...(pluginStates[plugin.id] || {}),
    ...plugin,
    index,
    downloads: stats[plugin.id]?.downloads || 0,
    updated: stats[plugin.id]?.updated || '',
  }));
}

// 渲染输出
function renderList(filteredData) {
  const { reversedStateMap } = createStateMaps();
  const content = filteredData.map((p) => `[${reversedStateMap.get(p.state) || " "}] [${p.id}|${p.name}](https://github.com/${p.repo})`);
  dv.paragraph("```ad-info\n" + dv.markdownList(content) + "\n```");
}

function renderTable(data, fields=['name', 'updated', 'downloads', 'state']) {
  // 默认格式化函数映射（精简版）
  const defaultFormatter = {
    name: (p) => `[${p.name}](https://github.com/${p.repo})`,
    updated: (p) => moment(p.updated).fromNow(),
    downloads: (p) => p.downloads.toLocaleString(),
    state: (p) => p.state,
  };
  // 标准化字段配置
  const normalizedFields = fields.map((f) => {
    const field = typeof f === "string" ? { name: f } : f;
    // 确定格式化函数
    field.format =
      field.format ||
      defaultFormatter[field.name] ||
      ((p) => p[field.name] || "");

    return field;
  });
  // 生成并渲染表格
  dv.table(
    normalizedFields.map((f) => f.name),
    data.map((obj) => normalizedFields.map((f) => f.format(obj)))
  );
}

// 主执行流程
async function main() {
  const { pluginsData, statsData } = await loadData();
  const stateContent = await dv.io.load(dv.current().file.path);
  
  const mergedData = mergeData(pluginsData, statsData, stateContent);
  const filteredData = mergedData
    .filter(p => 
        // 确保已安装的插件无条件保留，未安装的插件需满足条件
        (p.id in installedPlugins) || 
        (moment(p.updated).isAfter(moment().subtract(1, "years")) && 
        p.downloads > 10000
    ))
    .sort((a, b) => b.downloads - a.downloads || a.id.localeCompare(b.id));

  dv.header(2, "Popular");
  renderTable(filteredData);
  dv.list(Object.keys(installedPlugins).filter(id => !mergedData.some(p => p.id === id)).sort((a, b) => a.localeCompare(b)));
  
  dv.header(2, "New");
  renderTable(mergedData.filter(p => p.downloads > 1000).slice(-100).toReversed());
  
  dv.header(2, "Canvas");
  renderTable(mergedData.filter(p=>["id", "name", "description"].some(attr => String(p[attr]).toLowerCase().includes("canvas"))), ['name', 'description', 'downloads']);
}

await main();
```
