---
created: 2024-10-14T16:02
modified: 2026-01-14T19:33
url:
  - https://foldersync.io
---

# FolderSync

- FolderSync for Android is needed if you want to sync between your Android device and server/cloud.
- FolderSync for Desktop is needed if you want to sync between Windows/MacOS/Linux PC and server/cloud.

## 入门

1. 安装(移动版)
2. 在电脑端开启共享
3. 创建账户
4. 关于-权限
5. 创建文件夹対
    1. 基本
    2. 计划任务
    3. 同步选项
    4. 同步过滤器
    5. Webhook

## 主页

这里能看同步历史和进度

## 文件夹对

- 名称
- 同步类型
    - 双向 (merge)
    - 单向 (mirror)
        - to left/local
        - to right/remote
- 左侧账户, 右侧账户
- 计划任务
- 同步选项
    - 即时同步
- 同步过滤器
- Webhook

![600](<../../../Attachments/1761259187559-320741.jpg>)

## 账户

- SD CARD (默认)
- 云服务
    - S3
    - Box
    - CloudMe
    - Dropbox
    - Google Drive
    - GCS
    - HiDrive(&WebDAV)
    - Kolab Now
    - Koofr
    - Livedrive Pre
    - luckycloud(S3 & WebDAV)
    - MEGA
    - MinIO
    - MyDrive.ch
    - NetDocuments
    - Nextcloud
    - OneDrive
    - ownCloud
    - pCloud
    - Storegate
    - SugarSync
    - WEB.DE
    - Yandex Disk
- 文件协议
    - FTP
    - SFTP
    - SMB [^1]
    - S3
    - WebDAV

![600](<../../../Attachments/1761259187605-197609.jpg>)

## 文件

## 关于

- 自动操作
- 设置
- 权限[^2]
    - 添加用户定义的文件夹 (**可以选择 Android/data 下的目录**)

## Tips

[^1]: v3, macOS 记得勾选兼容 windows, 共享名称就是你要共享的文件夹名, 可以用主机名(设置-通用-共享)代替 ip.
[^2]: 建议添加自启动权限