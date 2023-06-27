---
created: 2026-01-16
tags:
  - Obsidian
---

Obsidian 的配置存在于每个库的 .obsidian 目录中.
这种机制存在以下弊端:

1. 如果使用多个库, 那么这些配置将在多个目录构成冗余.
2. 如果不在 .gitignore 中添加以排除, 那么它将使得 git 提交历史变得混乱; 如果排除, 又失去了对 Obsidian 配置的学习记录.

<!-- truncate -->

解决思路是创建一个公共配置库, 或者更进一步 -- 样板库.

然后在其他库中将 .obsidian 软链接到公共库中的配置. (亲测 Templates、Scripts 也可以)

软链接配置至少比软链接内容更恰当.

示例:

- .obsidian/ | 软链接到公共位置
- .obsidian-mobile/
- Inbox/
- Journals/
- ...
- Archives/
- Attachments/
- Misc/
    - Templates/ | 软链接到公共位置
    - Scripts/ | 软链接到公共位置
- .gitignore | 排除 无关(.obsidian*、Misc/)、本地(Inbox)、私有(Journals)
- .stignore | 排除 无关(.obsidian、Misc/)、本地(Inbox)

具体如何操作?

1. 成立一个公共样板库
2. 将本地现有库的配置(以及其他将要替换为软链接的公共内容)修改为软链接的方式(先移除, 提交 git, 再链接)
3. 修改.gitignore、.stignore 忽略软链接文件

---

注意事项:

存在一些内容相关的配置, 例如:

- workspace: 考虑用工作区弥补
- bookmarks: 避免使用

以及某些插件数据

实在不行还可以退回到使用独立私有配置