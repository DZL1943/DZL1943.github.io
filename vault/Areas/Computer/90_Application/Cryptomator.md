---
created: 2023-06-18T23:31
modified: 2026-02-05T19:41
url:
  - https://cryptomator.org/
---

## 添加保险库

- 名称
- 位置: 密文位置
- 密码: 至少八位
- 选项
    - 空闲超时自动锁定
    - 启动时解锁
    - 卷类型
    - 挂载点: 解密后可以在这个路径下读写

![](<../../../Attachments/Pasted image 20260205210521.png>)

[卷类型](https://docs.cryptomator.org/en/latest/desktop/volume-type/)
[FUSE-T](https://www.fuse-t.org/)
```
brew tap macos-fuse-t/homebrew-cask
brew install fuse-t
brew install fuse-t-sshfs
# 安装后需重启 cryptomator
```

## 解锁

- 默认挂载到`~/Library/Application Support/Cryptomator/mnt/<vault>`
- 仅能够在驱动器下访问和编辑 (直接访问保险库位置是无效的)  
- 必须退出驱动器、释放所有文件才能锁定
- 锁定后驱动器目录为空  

> 保险库中的是密文, 解锁后驱动器下才是明文.

> [!summary] 
> 首先你需要创建一个保险库, 即指定一个文件夹, 你的数据将以加密的形式存储其中.  
> 其次, 当你需要查看和修改时, 指定一个文件夹用来挂载, 你可以通过访问这个文件夹的内容来查看和修改你的数据.  
> 注意在保险库上锁后, 这个被挂载的文件夹就恢复为空了.

## 与其他工具协同

- git: 解密后操作
- syncthing: 同步加密目录(如果对端能够解密的话)
- kopia: 备份解密后的驱动器目录

## 移动端

- Android: 30 欧买断
    - Google Play 版本(付费)
    - APK 版本(需要从官网购买许可证密钥)
    - F-Droid 版本(有功能阉割, 需要从官网购买许可证密钥)
    - lite 版
- iOS: 免费只读