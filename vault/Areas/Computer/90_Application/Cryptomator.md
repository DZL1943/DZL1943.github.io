---
created: 2023-06-18T23:31
modified: 2026-02-05T19:41
---

## 卷类型

[卷类型](https://docs.cryptomator.org/en/latest/desktop/volume-type/)
[FUSE-T](https://www.fuse-t.org/)
```
brew tap macos-fuse-t/homebrew-cask
brew install fuse-t
brew install fuse-t-sshfs
# 安装后需重启 cryptomator
```

![|800](<../../../Attachments/Cryptomator-20240622165000822.png>)

## 解锁

- 仅能够在驱动器下访问和编辑 (直接访问保险库位置是无效的)  
    ![](<../../../Attachments/Cryptomator-20240622165001010.png>)
- 必须退出驱动器、释放所有文件才能锁定
- 锁定后驱动器目录为空  
    ![](<../../../Attachments/Cryptomator-20240622165001193.png>)

> 保险库中的是密文, 解锁后驱动器下才是明文.

> [!summary] 
> 首先你需要创建一个保险库, 即指定一个文件夹, 你的数据将以加密的形式存储其中.  
> 其次, 当你需要查看和修改时, 指定一个文件夹用来挂载, 你可以通过访问这个文件夹的内容来查看和修改你的数据.  
> 注意在保险库上锁后, 这个被挂载的文件夹就恢复为空了.

## 与其他工具协同

- git
- syncthing: 直接同步加密文件
- kopia: 备份解密后的驱动器目录

## 移动端