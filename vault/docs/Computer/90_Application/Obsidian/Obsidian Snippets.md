---
title: Obsidian 代码片段
created: 2025-10-08T20:23:30
modified: 2025-10-09T14:41:21
aliases:
  - Obsidian 代码片段
---

## UI

### 功能区

```css title:legacy-vault-switcher
/* https://forum.obsidian.md/t/please-restore-the-location-of-the-settings-and-help-buttons/83312/20 */
/* 需配合 commander 插件一起生效 */
.side-dock-actions {
  height: 100%;
  justify-content: flex-start;
}
div[aria-label="打开其他仓库"] {
  margin-top: auto !important;
  order: 997;
}
div[aria-label="查看帮助"] {
  order: 998;
}
div[aria-label="打开设置"] {
  order: 999;
}

/* body:not(.is-mobile) .side-dock-actions > *:nth-last-child(3) {
  margin-top: auto;
} */
```

### 侧边栏

```css
.nav-folder-title-content,.nav-file-title-content {
  font-size: 15px;
}
```

```css
/* 隐藏多个文件 */
.nav-file:has(>.nav-file-title:is(
    [data-path^='sortspec.md'],
)) {
    display: none;
}

/* 隐藏多个文件夹 */
.nav-folder:has(>.nav-folder-title:is(
    [data-path^='Misc'],
)) {
    display: none;
}
```

### 标签栏

```css
body {
  --header-height: 34px;
}

.workspace-tab-header:has(.mod-pinned) {
  /* shrink if pinned */
  max-width: 60px !important;
}
```

```css title:hide-tab
.workspace-tab-header-container {
  opacity: 0;
  position: absolute;
  z-index: 10; /* 不能高于30，否则会挡住titlebar */
  width: 100%;
  transition: all 0.2s ease;
}

.workspace-tab-header-container:hover {
  opacity: 1;
}
```

### 标题栏

```css
.view-header:not(:hover) {
  opacity: 0;
}
```

```css
/* Hide top bar when keyboard is open on mobile (includes tab bar on tablet).
Workaround for https://forum.obsidian.md/t/option-to-show-hide-top-bar-s-when-note-is-scrolled/69610?u=cawlinteffid
Courtesy of sailKite https://discord.com/channels/686053708261228577/702656734631821413/1242571258881642547 
Remaining border removed by me. */

.workspace-leaf.mod-active > * > .view-header,
body.is-tablet .workspace-tabs.mod-active > .workspace-tab-header-container {
    transition: height 250ms;

    .app-container:has(.mobile-toolbar) & {
        border-bottom: 0;
        height: 0;
        overflow: hidden;
    }
}
```

```css
/* 移动端悬浮编辑按钮 */
body.is-mobile .view-action:nth-last-of-type(2) {
  color: white;
  background-color: var(--color-accent);
  opacity: 1;
  top: calc(90vh - 110px);
  display: flex;
  padding: 5px;
  position: fixed;
  left: 86vw;
  transform: translate(-40%, 5%);
  justify-content: center;
  align-items: center;
  width: 53px;
  height: 53px;
  border-radius: 50% !important;
  box-shadow: 1.1px 0.3px 2.2px rgba(0, 0, 0, 0.02),
    2.7px 0.7px 5.3px rgba(0, 0, 0, 0.028),
    5px 1.3px 10px rgba(0, 0, 0, 0.035),
    8.9px 2.2px 17.9px rgba(0, 0, 0, 0.042),
    16.7px 4.2px 33.4px rgba(0, 0, 0, 0.05),
    40px 10px 80px rgba(0, 0, 0, 0.07);
}

/* 高级工具栏模式下的调整 */
body.is-mobile.advanced-toolbar .view-action:nth-last-of-type(2) {
  top: calc(100vh - 138px);
  transform: translate(-40%, -115%);
}
```

### 内容区

```css
body {
  --file-line-width: min(85vw, 1200px);
  /* --file-margins: var(--size-4-8) 10%; */
  --caret-color: var(--text-accent);
  --embed-max-height: unset;
}

.cm-active.cm-line{
  background-color: hsla(var(--accent-h, 254), var(--accent-s, 80%), var(--accent-l, 68%), 0.1);
}

.cm-scroller,
.markdown-preview-view {
  padding-top: 10px !important;
}
```

```css title:font
.markdown-source-view, .markdown-preview-view { 
  font-family: 'Menlo', monospace; 
  font-size: 18px;
}
```

```css
/* .obsidian-search-match-highlight {
    background-color: var(--text-highlight-bg);
}
.search-highlight > div{
  background-color: var(--text-highlight-bg);
} */
```

### 状态栏

```css
.status-bar:not(:hover) {
  opacity: 0;
  min-height: 6px;
  height: 0;
  padding: 0;
  margin: 0;
  border: 0;
}
```

## Markdown

### 标题和段落

```css
body {
  --h1-color: var(--color-red);
  --h2-color: var(--color-orange);
  --h3-color: var(--color-yellow);
  --h4-color: var(--color-green);
  --h5-color: var(--color-blue);
  --h6-color: var(--color-purple);
  --bold-color: var(--color-red);
  --italic-color: var(--color-orange);
  --heading-spacing: calc(1rem * 1.5);
  --p-spacing: 1rem;
}

:is(.markdown-preview-view, .markdown-rendered) p {
  margin-block-end: 0.5em;
}

.cm-strikethrough,
del {
  color: var(--text-faint);
}
u,ins {
  text-decoration-color: var(--color-green);
  text-decoration-thickness: 3px;
}

.HyperMD-header-2.cm-line,
h2 {
  border-bottom: 2px solid var(--background-modifier-border);
  padding-bottom: 2px;
}
```

https://forum-zh.obsidian.md/t/topic/45368  
https://forum-zh.obsidian.md/t/topic/25531  
https://forum.obsidian.md/t/reduce-the-margin-between-headers-paragraphs-headers-lists-paragraphs-lists-but-keep-the-margin-between-paragraphs-reading/33632

### 列表

```css
ul>li.task-list-item[data-task="x"],
ul>li.task-list-item[data-task="X"] {
  text-decoration: none;
}
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="x"],
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="X"] {
  text-decoration: none;
}

.cm-formatting.cm-formatting-list.cm-formatting-list-ul {
  padding-left: 0;
}
.cm-formatting.cm-formatting-list.cm-formatting-list-ol {
  padding-left: 0;
}

.markdown-rendered ul, .markdown-rendered ol {
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
}
```

### 标注

```css
.markdown-rendered blockquote {
  background-color: var(--background-modifier-hover);
  border-inline-start: 5px solid var(--background-modifier-border-focus);
  padding-inline-start: 12px;
  border-radius: 5px;
}
```

### 表格

```css
.markdown-preview-view tr,
.markdown-rendered tr {
  &:nth-child(odd) {
    background-color: var(--background-primary);
  }

  &:nth-child(even) {
    background-color: var(--background-secondary);
  }
}
```

### 代码

```css
.cm-s-obsidian .cm-inline-code:not(.cm-formatting),
.markdown-rendered :not(pre) > code {
  color: var(--color-pink) !important;
}
.markdown-rendered pre:not([class*="language-"]) code {
  color: var(--color-pink) !important;
}
```

### 公式
### 图片
### 链接

### 嵌入

```css
/* === 预览和编辑模式下的卡片样式 == */
.markdown-preview-view .markdown-embed,
.markdown-preview-view .file-embed {
  border: 1px solid var(--background-modifier-border);
  border-radius: 8px;
  margin-top: 0px;
  display: block;
}

/* 实时预览模式下：块嵌入不缩进，无左侧标志 */
.markdown-embed {
  border-left: none;
  border: 1px solid var(--background-modifier-border);
  border-radius: 8px;
}

/* 隐藏嵌入的标题 */
.embed-title {
  display: none;
}

/* 设置嵌入样式 */
:is(.markdown-preview-view, .markdown-rendered) .markdown-embed-content {
  padding-right: 0px;
  max-width: 100%;
  overflow: auto;
}
/* 在callout中的高度限制 */
:is(.callout) .markdown-embed-content {
  padding-right: 0px;
  max-height: 350px;
  max-width: 100%;
  overflow: auto;
}

```

## Extra

%% 不常用, 可能未经实验, 仅供参考 %%

### 首行缩进

https://forum-zh.obsidian.md/t/topic/28562  
https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E5%A4%96%E8%A7%82/css-%E7%89%87%E6%AE%B5/obsidian%E6%A0%B7%E5%BC%8F-%E6%AE%B5%E8%90%BD%E9%A6%96%E8%A1%8C%E5%A2%9E%E5%8A%A0%E7%BC%A9%E8%BF%9B/

### 水平分隔线

https://forum.obsidian.md/t/meta-post-common-css-hacks/1978/223

https://forum.obsidian.md/t/creating-fancy-horizontal-rule-lines/63700

### file-icons

```css
/* https://forum.obsidian.md/t/meta-post-common-css-hacks/1978/109 */
/* 为文件夹添加图标 */
.nav-folder-title-content::before {
    content: '📁 '; /* 你可以更改为你喜欢的图标 */
    margin-right: 5px;
}

/* 为文件添加图标 */
.nav-file-title-content::before {
    content: '📄 '; /* 你可以更改为你喜欢的图标 */
    margin-right: 5px;
}
```

### hide-sidebar

```css
/* hide right sidebar */
.workspace-split.mod-horizontal.mod-right-split {
width: 1px !important;
transition: 0s;
transition-delay: 50ms;
}

/* reveal right sidebar on hover */
.workspace-split.mod-horizontal.mod-right-split:hover {
width: 255px !important;
transition: 0s;
}
```

### show-whitespace

```css
.cm-trailing-space-a::before,
.cm-trailing-space-b::before,
.cm-trailing-space-new-line::before {
  content: "·";
  color: var(--list-marker-color);
  position: absolute;
}

.cm-trailing-space-new-line::after {
  content: "↲";
  color: var(--list-marker-color);
}

/* .markdown-source-view.mod-cm6 .cm-indent::before { */
  /* content: '⇥'; */
  /* color: var(--list-marker-color); */
/* } */
```

https://forum.obsidian.md/t/editors-css-to-show-tabs-trailing-whitespace-and-strict-line-breaks/4234  
https://wiki.loikein.one/computer/software/multi/obsidian/#showing-whitespace-control-characters

### image

```css fold
.small-image img:not([width]) {
    max-height: 300px;
    max-width: 400px;
}

.small-image img:hover {
    width: 100%;
    height:100%;
    max-width: min(100%, 80vw);
    max-height: min(100%, 80vh);
}

.image-embed[alt]:after {
    content: attr(alt);
    display: block;
    text-align: center;
    color: var(--text-faint);
}

/* https://forum.obsidian.md/t/image-zoom-click-hold-to-expand-images/5164 */
.view-content img {
  cursor:zoom-in;
}

.view-content img:active {
  cursor:zoom-out;
}

.view-content .markdown-preview-view img[referrerpolicy='no-referrer']:active,
.view-content .image-embed:active {
  background:var(--background-primary);
  cursor:zoom-out;
  display:block;
  z-index:200;
  position:fixed;
  max-height:100%;
  max-width:100%;
  height:auto;
  width:auto;
  object-fit:contain;
  margin:0 auto;
  text-align:center;
  padding:0;
  left:0;
  right:0;
  top: 0%;
  bottom:0;
}

.view-content .image-embed:active img {
  top:50%;
  transform:translateY(-50%);
  padding:0;
  margin:0 auto;
  width: auto;
  height: auto;
  max-height: min(100%, 100vh);
  max-width: min(100%, 100vw);
  object-fit:contain;
  left:0;
  right:0;
  bottom:0;
  position:absolute;
  opacity:1;
}
```

### link-title

```css
/* The following two blocks hide the link primary text
 * and swap in the title if the target not
 * has a ``title`` property.
 */

/* In reading view, hide link content */
.markdown-reading-view .data-link-text[data-link-title]
{
    font-size: 0px;
    visibility: hidden;
}

/* In reading view, show linked title */
.markdown-reading-view .data-link-text[data-link-title]::before
{
    font-size: initial;
    content: attr(data-link-title);
    visibility: visible;
}
```

### table-rows-number

```css
/* https://forum.obsidian.md/t/markdown-tables-with-row-numbers/35515/3 */
.numberedrows table {
  counter-reset: rowNumber;
}

.numberedrows table tr::before {
  display: table-cell;
  counter-increment: rowNumber;
  content: counter(rowNumber) ".";
  padding-right: 0.3em;
  padding-top: 0.3em;
  text-align: right;
}
```

### list-guideline

```css fold
/* 无序列表有序列表仿logseq大纲引导线 */
body {
  --outline-guideline-width: var(--size-2-1);
  --outline-guideline-color: var(--color-accent);
  --outline-item-height: calc(var(--nav-item-size) * 1.8);
}
li {
  position: relative;
}
li:hover > ul > li:has(~li:hover)::before,
li:hover > ol > li:has(~li:hover)::before {
  content: "";
  width: var(--outline-guideline-width);
  position: absolute;
  background-color: var(--outline-guideline-color);
  top: calc(var(--outline-item-height) / 2 * -1);
  left: calc(-2px - 2em - var(--size-4-4));
  height: calc(100% - var(--outline-item-height) + var(--size-4-8) + 2px);
}

li:hover > ul > li:hover::before,
li:hover > ol > li:hover::before {
  content: "";
  position: absolute;
  top: calc(var(--outline-item-height) / 2 * -1);
  left: calc(-2px - 2em - var(--size-4-4));
  bottom: calc(100% - (var(--outline-item-height) + var(--size-4-2)) / 2 + 1px);
  width: calc(1em + var(--size-4-4) - 2px);
  border-bottom-left-radius: var(--radius-m);
  border-bottom: var(--outline-guideline-width) solid var(--outline-guideline-color);
  border-left: var(--outline-guideline-width) solid var(--outline-guideline-color);
}
```

### hide-property

```css
/* https://forum.obsidian.md/t/add-setting-to-collapse-fold-properties-across-all-notes-by-default/67943/31 */
/* reading mode */
.workspace-leaf-content[data-type=markdown] .metadata-container:hover .metadata-content,
.workspace-leaf-content[data-type=markdown] .frontmatter-container:hover .metadata-content {
	display: block;
}

.workspace-leaf-content[data-type=markdown] .metadata-container .metadata-content,
.workspace-leaf-content[data-type=markdown] .frontmatter-container .metadata-content {
	display: none;
}

/* editing mode */
.cm-s-obsidian .HyperMD-frontmatter:hover,
.cm-s-obsidian .frontmatter-container:hover {
	display: block;
}

.cm-s-obsidian .HyperMD-frontmatter,
.cm-s-obsidian .frontmatter-container {
	display: none;
}
```

### settings-layout

```css fold

/* @settings

name: Obsidian-Setting-Grid-Layout
description: 一个用于 Obsidian 设置页面的网格布局
id: obsidian-setting-grid-layout
settings:
    - 
        id: Grid-Layout-info-text
        title: Information
        description: "本样式参考了Huajin的[obsidian-settings-management](https://github.com/xhuajin/obsidian-settings-management/)插件的样式."
        type: info-text
        markdown: true
    - 
        id: hotkey-layout
        title: 关闭快捷键列表卡片化
        type: class-toggle
        default: false
    - 
        id: plugin-layout
        title: 关闭核心插件列表卡片化
        type: class-toggle
        default: false
    - 
        id: installed-plugin-layout
        title: 关闭第三方插件列表卡片化
        type: class-toggle
        default: false
*/

/* 设置界面的宽度设置 */
.modal.mod-settings.mod-settings.mod-settings.mod-settings {
  /* min-width: 1200px !important; */
}

/* 2024-12-17 参考Huajin的obsidian-settings-management插件的样式 https://github.com/xhuajin/obsidian-settings-management/blob/master/src/styles.css */
/* 快捷键列表 */
body:not(.hotkey-layout) .vertical-tabs-container .vertical-tab-content>.hotkey-list-container,
/* 核心插件列表 */
body:not(.plugin-layout) .vertical-tabs-container .plugin-list-plugins>div:not(.setting-item),
/* 第三方插件列表 */
body:not(.installed-plugin-layout) .vertical-tabs-container .installed-plugins-container {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  /* 子项目设置 */
  .setting-item:not(:has(~.setting-item-heading)):not(.setting-item-heading) {
    border: 1px solid var(--background-modifier-border);
    border-radius: 8px;
    padding: 1em;
  }

  .setting-item:is(:has(~.setting-item-heading), .setting-item-heading) {
    grid-column: 1 / -1;
  }

  .setting-item-info {

    overflow: hidden;
    overflow-wrap: anywhere;
  }
}

/* 第三方插件列表 按钮微调*/
.installed-plugins-container .setting-item.mod-toggle {
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  .setting-item-info {
    flex: 2 0 auto;
    width: 100%;
    margin-left: 10px;
  }
}

.installed-plugins-container .setting-item-control {
  flex: 0;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  right: 0px;
  justify-content: right;
}

```

### privacy-mode

```css fold
/* @settings
name: 【字体-熊猫】隐私模式
id: 202412181338
settings:
  - 
      id: privacy-mode
      title: 隐私模式
      description: 文字加密,图片模糊
      type: class-toggle
      addCommand: true
  - 
      id: privacy-mode-text
      title: 文本显示模式
      type: variable-select
      default: circle
      options:
          - 
              label: 类似密码输入的点来显示文本
              value: disc
          - 
              label: 小圆圈替换文本
              value: circle
          - 
              label: 方块替换文本
              value: square
  - 
      id: privacy-mode-image
      title: 图片是否模糊化
      type: class-toggle
      default: true
*/

/* .privacy-mode span,li,h3,h2, */
.privacy-mode {
  .el-p,
  span, li{
    -webkit-text-security: var(--privacy-mode-text);
  }
  h1,h2,h3,h4,h5,h6{
    -webkit-text-security: none !important;
  }
}

.privacy-mode.privacy-mode-image :is(.media-embed, .image-container) :is(img, video, svg, canvas) {
  filter: blur(5px) !important;
}

```

## Tweak
%% 插件样式微调等 %%
### bugfix

```css
.markdown-preview-view .collapse-indicator {
    top: inherit;
}
```

### hover-editor

```css
.popover.hover-editor {
  opacity: 0.95;
  /* font-size: var(--popover-font-size); */
}
```

### anyblock

```css
.ab-note .ab-deco-fold .ab-deco-fold-button {
    display: none;
    color: unset;
}

.ab-note table.ab-list-table .ab-table-fold {
    /* display: none; */
}
```

### note-toolbar

```css
.cg-note-toolbar-bar-container {
  margin: 0;
}

.callout[data-callout="note-toolbar"] {
  & .callout-content {
    & ul {
      margin: 0;
    }
  }
}
```

### MySnippets

```css
/* ! 插件:MySnippet */
.MySnippets-statusbar-menu {
  min-width: 50vw !important;
  max-height: 80vh !important;
  .menu-scroll {
    display: block !important;
    column-width: 320px;
    width: 100%;
    height: 100%;
  }
}
```

### dataview

```css
.block-language-dataview  {
  display: block;
  max-height: 600px;
  overflow: auto;
}

.block-language-dataviewjs   {
  display: block;
  max-height: 600px;
  overflow: auto;
}
```

## References

- https://forum.obsidian.md/t/meta-post-common-css-hacks/1978
- https://github.com/r-u-s-h-i-k-e-s-h/Obsidian-CSS-Snippets
- https://github.com/Dmytro-Shulha/obsidian-css-snippets
- https://github.com/efemkay/obsidian-modular-css-layout