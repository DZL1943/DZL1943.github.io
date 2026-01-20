---
title: AnyBlock
created: 2024-09-27T19:37
modified: 2025-10-09T14:47
tags:
  - Obsidian/Plugins
aliases:
  - AnyBlock
  - any-block
url:
  - https://lincdocs.github.io/AnyBlock/README.zh.html
obsidianEditingMode: source
---

# AnyBlock

## [选择器](https://lincdocs.github.io/AnyBlock/docs/zh/03.%20%E9%80%89%E6%8B%A9%E5%99%A8.html)

- 代码块
- 引用块
- AB `[]`
    - 列表
    - 标题
    - 代码
    - 引用
    - 表格
- 头尾(markdown-it-container) `:::`

## [处理器](https://lincdocs.github.io/AnyBlock/docs/api/)

[list2c2t]
- 代码文本类
    - region2indent
    - mdit2code
- 纯文本类
    - add | 增加
    - X | 去除
    - slice
    - listroot
    - addList
    - xList
    - addQuote
    - xQuote
    - addCode
    - xCode
- 列表类
    - list2listdata
    - title2listdata
    - listdata 到列表
    - listdata2nodes
    - listdata2strict
    - list2listnode
- 二列列表类
    - list2c2listdata
    - title2c2listdata
    - c2listdata2tab
    - c2listdata2items
- 目录类
    - list2lt | 列表转列表表格/树形表格
    - list2dt
    - list2astreeH
- 表格类
    - title2table
    - list2table
    - list2ut | 列表转二维表格/数据表格
    - list2c2t | 列表转二列表格
    - timeline
    - title2timeline
- 装饰类
    - md
    - text
    - fold
    - scroll
    - overfold
    - width
    - addClass
    - addDiv
    - title
    - transposition
    - transpose
    - exTable
    - strictTable
- mdit_container
    - mditTabs
    - mditDemo
    - mditABDemo
    - mditCol
    - mditCard
    - mditChat
- mermaid
    - title2mindmap
    - list2mindmap
    - list2mermaid
    - list2mermaidText
    - list2mehrmaidText
    - mermaid
- plantuml
    - json2pumlJson
    - list2pumlWBS
    - list2pumlMindmap
    - list2pumlActivityDiagram
    - list2pumlActivityDiagramText
- markmap
    - list2markmap
- 特殊类
    - faq
    - info_converter | 查看处理器列表
    - info_alias | 查看别名列表
- Alias
    - info|note|warn|warning|error
    - timeline, tabs, col, card, nodes
    - flow, mindmap, markmap, wbs
    - lt, list, dir, fakeList

## [示例](https://lincdocs.github.io/AnyBlock/README.show.html)

### 代码块

```anyblock
[note+ test]
hello

world
```

### Quote

[question- ?]
- a
- b
- c

:::note- title

content

:::

### 列表与表格

%% [title2tabs] %%

#### 列表表格

%% 用|分隔列, 列表的每一项都是一行, 可折叠 %%  

[list2lt]
- 1
    - 1.1
    - 1.2 | 第二列 | 第三列
- 2
    - 2.1 | 第二列 | 第三列
    - 2.2
- 3

#### 多叉表格

%% 用缩进表示列 (|也是支持的) %%  

[list2table]
- < 第一列 | 第二列 | 第三列 %% 可选表头 %%
- 第一列
    - 第二列
- 第一列
    - 第二列
        - 第三列

#### 二维表格

%% 第一层是第一列, 第二层的每一项依次为后续列 %%  

[list2ut|transposition]
- 小写
    - a
    - b
    - c
- 大写
    - A
    - B
    - C

#### 二列表格

%% 第一层为一列, 剩下层均属第二列 %%  

[list2c2t]
- a
    - A
        - AA
    - A2
- b
    - B
- c
    - C

#### 目录树

[list2dt]
- folder1/ | aaa
    - folder/
    - file | bbb
- folder2/
    - file
- file

#### 时间线

[list2timeline]
- 1840 | 鸦片战争
    - 南京条约
- 1856 | 第二次鸦片战争
    - 天津条约
    - 北京条约
- 1861 | 洋务运动
- 1883 | 中法战争
    - 中法新约
- 1894 | 中日甲午战争
    - 马关条约
- 1898 | 戊戌变法

### 分栏和卡片

#### 分栏

[list2col|width(25,25,25,25)]
- a
- b
- c
- d


:::mditCol

@col 第一列

第一列内容

@col 第二列

第二列内容

:::

#### 卡片

[list2card|addClass(ab-col2)]
- a
- b
- c
- d

### 脑图

[listroot()|list2node]
- a
    - 1
    - 2
- b
    - 3
    - 4