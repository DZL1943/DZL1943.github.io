---
created: 2026-01-10T16:57
modified: 2026-01-11T22:32
aliases:
  - 小企鹅输入法
---

## 安装

https://github.com/fcitx-contrib/fcitx5-macos-installer

建议选择中州韵版 (包含 pinyin)

## 配置

- 输入法
    - 键盘 - 英语(美国)
    - 拼音
    - 中州韵 `~/.local/share/fcitx5/rime`
- 全局配置
    - 快捷键
    - 行为
- 主题编辑器 `~/.local/share/fcitx5/theme`
- 插件管理器
    - 中文
    - 通用
        - rime
    - 其他
        - lua
- 高级
    - 数据管理
    - Frontend
    - Module

配置目录  
`~/.config/fcitx5/`
- conf/
    - cached_layouts
    - chttrans.conf
    - macosfrontend.conf
    - macosnotifications.conf
    - pinyin.conf
    - punctuation.conf
    - rime.conf
- config
- profile

`~/.local/share/fcitx5/`
- pinyin/
    - dictionaries/
    - customphrase
- punctuation/
- rime/
- theme/