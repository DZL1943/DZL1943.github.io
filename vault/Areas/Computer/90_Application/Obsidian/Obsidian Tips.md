---
title: Obsidian 问题技巧
created: 2025-10-08T20:39
modified: 2026-01-14T19:37
aliases:
  - Obsidian Tips
  - Obsidian issues
  - Obsidian 问题
  - Obsidian 技巧
---

# Obsidian 问题技巧

## 本体

- 按住 cmd 点击可在新标签中打开
- 固定选项卡中的链接始终在单独的选项卡中打开, 如果有另一个标签组则始终在该标签组打开.
- 按住 alt 可以多选文件
- 在社区插件市场下载安装插件后在左侧滚动一下可以避免返回时丢失原来浏览位置
- 在控制台下找图标名称
- **[移动文件后其中的相对路径不更新](https://forum.obsidian.md/t/broken-links-in-relative-path-mode-on-move-rename/4386/2)**
- 移动端查看字数统计: 左滑切换到右边栏, 在底部有显示

## 编辑

- 连续的空白(包括空行、同一行内的空格)只会渲染一个
- 未开启严格换行时在阅读模式下注释也会占据空行
- 表格前后需空行
- 图片后需空行
- 编辑模式下在链接处右键能直接重命名或移动
- 被链接的标题只有通过右键重命名才能正确更新
- 想要链接到标题可以先通过 tab 选文件再通过回车选标题, 最终的链接格式是正确的

### 换行

https://help.obsidian.md/syntax#Line+breaks

当开启 Obsidian 的"严格换行(Strict Line Breaks)"设置项时, Obsidian 遵循 markdown 的换行规范. 即

- 单回车: 合并行
- 行尾双空格+单回车: 换行(br)
- 双回车: 分段(p)

`shift+return` 也能直接插入换行

### 缩进

缩进不中断编号的关键在于空行也要有合适的缩进

## 插件

- any-block: 可能不渲染
- better-export-pdf: 无法保存
- better-markdown-links: 可能无法更新链接
- easy-typing-obsidian: canvas 下列表回车不自动新增
- file-tree-alternative: 移动文件不更新链接
- floating-settings: 有时打开设置显示空白; 打开设置再打开控制台将导致窗口无法操控; 设置字体时无法正确显示
- front-matter-title-plugin: 切换包含固定标签页的工作区后界面显示空白
- obsidian-outliner: 开启 betterEnter 时, 当有序列表从 9 变到 10, 光标位置向左偏了一格
- statusbar-organizer: 显示重叠
- kanban: 切换源文件后快捷键失效
- keyboard-analyzer: 影响 toml 代码块渲染

## 主题

- minimal 主题 7.7.3 以上版本, dataview 空属性错行
    (a:: 1) (b:: ) (c:: )  
    (a:: 2) (b:: 2) (c:: )  
    (a:: 3) (b:: ) (c:: )  
    (a:: 4) (b:: ) (c:: 4)  
    (a:: ) (b:: ) (c:: )
    
    ```dataview
    table without id
    a,b,c
    where file.path=this.file.path
    ```