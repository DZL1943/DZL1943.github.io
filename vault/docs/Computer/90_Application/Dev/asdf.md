---
created: 2024-04-22T20:39
modified: 2024-05-21T16:59
---

## 简介

[快速入门 | asdf (asdf-vm.com)](https://asdf-vm.com/zh-hans/guide/getting-started.html)

asdf 是一个开发工具版本管理器.
通过插件的方式支持多种工具, 例如 nodejs、python、java 等.

## 安装

```shell
# 安装依赖
brew install coreutils curl git
# 通过 git 下载
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.11.3
# 在 .zshrc 中添加 asdf 插件
```
## Plugin & 版本

```python
# 安装 plugin, 以 Python 为例
asdf plugin add python
# 查看有哪些版本
asdf list all python
# 安装指定版本
asdf install python latest:3
# 设置 global 为系统版本
asdf global python system
# 查看当前工具链
asdf current
# 如果要完全卸载, 则还需执行 plugin remove
```

## 原理
#todo

## 总结

首先因为 Homebrew 是系统级别的, 所以不建议直接使用 brew 的版本.

其次, 相对于手动安装, 缺少 offline 能力, 对网络要求较高.

但安装好之后的体验还是不错的.