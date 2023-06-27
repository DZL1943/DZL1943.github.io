---
title: Obsidian 界面
created: 2025-10-08T20:22
modified: 2026-01-14T19:35
aliases:
  - Obsidian 界面
---

# Obsidian 界面

- 功能区 ribbon
- 左侧边栏 left sidebar
    - 文件列表
    - 搜索
    - 标签
    - 书签
- 右侧边栏 right sidebar
    - 目录
    - 链接
    - 属性
- 标签栏 tabbar
- 标题栏 titlebar
- 内容区
- 状态栏 statusbar

![](<../../../../Attachments/1761259187599-920771.png>)

## css

- horizontal-main-container
    - workspace
        - workspace-split mod-left-split
        - workspace-split mod-root
            - workspace-tabs
                - workspace-tab-header-container
                    - workspace-tab-header-container-inner
                    - workspace-tab-header-new-tab
                    - workspace-tab-header-spacer
                    - workspace-tab-header-tab-list
                - workspace-tab-container
                    - workspace-leaf
                        - workspace-leaf-content
                            - view-header
                                - view-header-left
                                - view-header-title-container
                                - view-actions
                            - view-content
                                - markdown-source-view
                                    - cm-editor
                                - markdown-reading-view
                                    - markdown-preview-view
        - workspace-split mod-right-split
- status-bar
- mobile-navbar