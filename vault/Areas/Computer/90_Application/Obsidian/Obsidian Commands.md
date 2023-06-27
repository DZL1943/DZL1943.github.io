---
title: Obsidian 命令
created: 2025-10-08T20:18
modified: 2026-01-14T19:36
aliases:
  - Obsidian Hotkeys
  - Obsidian 命令
---

# Obsidian 命令

## 常用命令

- 本体类
    - 快速切换
    - 命令面板
    - 全局搜索
    - 切换侧边栏
    - 前进/返回
    - 折叠/展开
    - 分屏
- 编辑类
    - 切换视图模式
    - 内部链接
    - 查找替换
    - 上/下交换行
    - 多光标
    - 格式化
        - 加粗
        - 斜体
        - 删除线
        - 下划线
        - 高亮
        - 注释
    - 脚注
    - 标注
    - 表格
    - 模板
    - 打开/新建日记
    - 新建笔记
    - 新建时间戳笔记

> [!attention] Windows 下会将 Mod(cmd) 映射为 Ctrl (不要同时使用 cmd+ctrl)

## 已设置的快捷键

```dataviewjs
dv.list(Object.entries(app.hotkeyManager.customKeys).filter(([k, v]) => v && v[0]).map(([k, v]) => `${k} \`${v[0].modifiers.join('+')}+${v[0].key}\``).sort())
```