---
created: 2024-11-16T10:36
modified: 2024-11-16T10:50
tags:
  - Obsidian
---

## 前言

草稿通常都是不稳定的内容, 需要频繁地编辑修改, 不适合纳入到同步中.

但有时我们又需要同步即时内容...

<!-- truncate -->

## 方案一

分两个文件
- sync: 同步
- draft: 不同步

平时主要打开 draft, 在里面嵌入 sync 即可.

## 用 canvas 统一呈现

此时的 canvas 相当于升级版 sync, 但为了引用方便以及保持 canvas 本身的不变性, 仍然需要单独的 sync、draft 文件.

## 在 canvas 中融入更多内容

不仅仅是 sync, 甚至是一个以 canvas 为基础的个人主页.

## 用 excalidraw 代替 draft.md

问题: ed 文件默认无法以 md 形式预览, 并且无法直接在 canvas 中编辑.  
结果: draft 仅能够预览(需要链接到标题)  
可选方案: 增加一个 temp 文件