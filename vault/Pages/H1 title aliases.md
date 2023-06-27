---
title: H1、title 和 aliases
created: 2026-01-14T19:39
modified: 2026-01-14T19:40
aliases:
  - H1、title 和 aliases
tags:
  - markdown
  - Obsidian
---

# H1、title 和 aliases

原则:
- 尽量不要添加 H1, 因为在嵌入的时候会冗余
- title 用于覆盖文件名, 一般同时也应添加 aliases
- 避免同时包含 H1 和 title

实践:
- 如果文件名与标题一致, 则无需 H1、title、aliases
- 如果文件名与标题不一致, 且想用标题覆盖文件名
    - 添加 H1
    - 然后用 linter 自动添加 title、aliases