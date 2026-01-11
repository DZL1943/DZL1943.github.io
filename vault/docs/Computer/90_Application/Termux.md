---
created: 2024-11-13T06:49
modified: 2024-11-13T06:49
url:
  - https://github.com/termux/termux-app
  - https://termux.dev/cn
---

## 换源

[termux | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/termux/)

`termux-change-repo` 里面有清华源可选

## 基础软件安装

`pkg install git vim perl nodejs-lts wget curl nano cronie moreutils`
## adb

https://github.com/rendiix/termux-adb-fastboot
https://github.com/MasterDevX/Termux-ADB
https://github.com/nohajc/termux-adb

```shell
pkg install android-tools
# 在开发者选项中打开无线调试, 点击配对
adb pair ip:port
# 输入配对码
# 如果失败, 尝试重进app或分屏操作 
```

## ssh

## Tips

- 放大字体? 双指张开
- 设置启动目录? 修改$PREFEX/etc/bash.bashrc