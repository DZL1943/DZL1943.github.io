---
created: 2024-10-18T11:10
modified: 2026-01-11T22:25
url:
  - https://www.gnu.org/software/stow/
---

## 用 stow 管理 dotfiles

[Brandon Invergo - Using GNU Stow to manage your dotfiles](https://brandon.invergo.net/news/2012-05-26-using-gnu-stow-to-manage-your-dotfiles.html)

> [!summary]+ 原理简述  
> 假设你的 dotfiles 位于 A/dotfiles 路径  
> dotfiles 中的每个子目录相当于是一个 package  
> 执行 `stow xxx` 后, 对应 package 目录内的文件和目录都将以**链接**的形式分发到 target 目录(默认是 stow 目录(默认为当前目录)的父目录)

