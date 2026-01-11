---
created: 2025-12-21T11:41
tags: [Git]
---

Git 是如何实现版本管理的? 分为哪些阶段? 每个阶段能做哪些操作? 如何撤销?

<!-- truncate -->

先来梳理一下各个阶段的状态与操作

当在 git 库中新建一个文件, 它的初始状态是 Untracked, 目前只存在于工作区(Working Directory), 如果它没有被 .gitignore 中的规则匹配, 那么它将在 `git status` 命令下显示.

当执行 `git add` 命令, 该文件被添加到暂存区(Staging Area), 其状态为 Staged.  
这个 add 相当于 GUI 下的勾选, 而所谓的暂存区就是存储这个勾选列表的一个 index 文件.

当执行`git commit` 命令, git 会将暂存区的所有修改提交到版本库(Repository), 并且清空暂存区. 此时该文件的状态是 Unmodified.

下次修改该文件时, 其状态为 Modified, 并且会显示相比上次修改的差异.

重复上述 add、commit 的过程, 这一系列提交便构成了该文件的变更历史.  
至此我们便有了版本管理.

接下来分析一下不同阶段下的撤销方式

1. 撤销当前工作区的修改: `git restore` 或 `git checkout -- ` 或 `git stash`
2. 撤销 add: `git restore --staged` 或 `git reset HEAD`
3. 撤销 commit: `git reset --soft HEAD~` 仅回退版本历史(恢复到 commit 之前)
4. "撤销" push: `git revert HEAD` 将创建一个新的提交, 直接 push 就行
5. 撤销任意操作: 通过 `git reflog` 找到当时的状态 id, 再通过 reset 恢复, 例如 `git reset --hard HEAD@{1}`

[Git - Undoing Things](https://git-scm.com/book/en/v2/Git-Basics-Undoing-Things)