---
created: 2023-06-17T12:06
modified: 2024-07-31T15:06
---

# Logseq

> 本文记录对 Logseq v0.9.9 的学习体验过程.

## 序

Logseq 是一个开源的本地文件存储的大纲式笔记软件.  
相比 Obsidian、思源笔记这些同为本地存储的笔记工具, 大纲是其核心特征.

选择 Logseq 作为体验对象的原因:
- Logseq 有比较完善的 DailyNotes 和双链功能, Obsidian 则较弱
- Logseq 基于本地 markdown 文件存储 (后续会改版), 思源则是 json
- Logseq 有移动端 App, 思源则较弱

## 适用对象  

Logseq 不是传统意义上的笔记软件. 而是基于块和双链的大纲式笔记软件.  
换句话说, 在 Logseq 中没有文件夹的概念, 甚至页面也是不必要的.

建议参考[双向链接时代的快速无压记录 (yuque.com)](https://www.yuque.com/deerain/gannbs/ffqk2e) 了解相关概念.

## 文档

- https://docs.logseq.com
- https://docs.logseq.com/#/page/tutorial

## Logseq 设置

- 常规
    - 快捷键
        - trigger
            - `/`
            - `<` Callout?
            - `[[]]` 页面引用
            - `(())` 块引用
        - Markdown
        - 基操
        - 移动
            - 聚焦 `cmd+.`
            - 退出聚焦 `cmd+,`
            - 折叠/展开 `cmd + ↕`
            - 回退/前进 `cmd+[]`
            - 首页 `g h`
        - 块编辑
            - 聚焦
            - 退出聚焦
            - 侧边栏打开 `cmd+shift+o`
        - 块选择
        - 格式化
        - 切换
            - 文档模式 `t d`
            - 卡片 `t c`
            - 主题 `t t`
            - 左栏 `t l`
            - 右栏 `t r`
            - 设置 `t s`
        - 白板
        - 插件
        - 其他
            - 命令面板 `cmd+shift+p`
- 编辑器
    - 文件格式
    - 日期格式
    - TODO 样式
    - 逻辑缩进
    - 引用样式
- 版本控制 (Git)
- 高级
- 更多
    - 日记
    - 白板
    - 插件
    - server
    - 卡片
    - Zotero

## Logseq UI

- left `t l`
    - Graph Library
    - Journals `g j`
    - Whiteboards `g w`
    - Flashcards `g f`
    - Graph view `g g`
    - All pages `g a`
    - FAVORITES
    - RECENT
- right `t r`
    - Contents
    - Page graph
    - Help
        - Usage
            - 快捷键
            - [文档](https://docs.logseq.com)
                - New
                - Misc
                - Features
                    - Commands
                    - Templates
                    - Properties
                    - Tables
                - Advanced
                    - Queries `{{query ...}}`
                    - Advanced Queries (Datalog)
                        - [Datomic 查询和规则 |达托姆](https://docs.datomic.com/pro/query/query.html)
            - [入门](https://docs.logseq.com/#/page/tutorial) 推荐
            - FAQ
        - Community
        - Development
        - About
        - Terms

## Commands

- Basic
    - Page reference
    - Page embed
    - Block reference
    - Block embed
    - Link
    - Image link
    - Underline
    - Template
    - Upload an asset
    - h1~6
- Time & Date
- List
- Task
- Priority
- Advanced
    - Query
    - Zotero
    - Query table
    - Calc
    - Draw
    - HTML
    - Video
    - Cards
    - Cloze