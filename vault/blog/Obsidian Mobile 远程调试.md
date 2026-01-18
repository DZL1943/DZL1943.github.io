---
created: 2026-01-18T15:06
modified: 2026-01-18T16:23
---

<!-- truncate -->

# Obsidian Mobile 远程调试

1. 手机开启 USB 调试或无线调试
2. 用类似 scrcpy 的工具连接电脑
3. 打开 obsidian
4. 以 Edge 为例, 打开 `edge://inspect/#devices`, 找到对应的设备, 点击 inspect, 之后就是熟悉的 DevTools 界面了

![](<../Attachments/Pasted image 20260118150748.png>)

## ui

- horizontal-main-container
    - workspace
        - workspace-drawer
        - workspace-split
            - workspace-tabs
                - workspace-tab-header-container
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
        - workspace-drawer
- status-bar
- mobile-navbar