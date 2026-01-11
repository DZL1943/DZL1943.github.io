---
created: 2024-06-26T22:46
modified: 2024-07-31T15:06
url:
  - https://kopia.io/docs/getting-started/
  - https://wiki.archlinux.org/title/Synchronization_and_backup_programs#Chunk-based_increments
---

## Repository

repo 是保存快照的地方
- 选择存储类型: 一般选第一个 Local Directory
- 填写 repo 存储路径: **注意这是保存快照的位置, 不是待备份的文件夹路径!** 这里必须是已经存在的完整路径, 建议创建好之后直接通过图标点选.
- 填写 repo 密码 (用于加解密)
- 点击创建 repo

## Policy

policy 是一组规则，告诉 Kopia 如何创建/管理快照;这包括压缩、快照保留和调度何时自动拍摄快照等功能。
- 选择 Policies 栏
- 点击文件夹图标选择**待备份的文件夹**
- 点击 Set policy, 在接下来的界面进行设置
    - Snapshot Retention: 快照的份数、保留时间等
        - Latest 10
        - Hourly 48
        - Daily 30
        - Weekly 4
        - Monthly 24
        - Annual 3
    - Files: 忽略文件 `.git/,.trash/,/Ext/`
    - Error Handing
    - Compression: 压缩(zstd)
    - **scheduling**: **自动**快照周期
        - Frequency 每小时
        - Times
        - Cron
        - Run Missed Snapshots on Startup
        - Manual Snapshots Only: 是否仅手动运行, Frequency 不是也能设置吗
    - Upload
    - Snapshot Actions
        - Before
        - After
    - Folder Actions
        - Before
        - After
    - logging
    - Other
- ! 点击 Save Policy 保存设置

## Snapshot

- 选择 Snapshots 栏, 此处会按路径组织快照
    - 点击 Actions 中的 Policy 可以进行对应的设置
    - 点击 `Snapshot Now` 可以手动触发快照
- 点击想要查看的备份路径, 此处将列举该路径对应的所有快照.
    - 选择一个快照点击, 将显示该路径目录结构.
        - 点击文件夹可以进入, 点击文件可以下载.
        - 点击上方的 Mount 按钮可以挂载
        - 点击上方的 Restore 按钮可以将当前目录文件恢复到指定目录(需填写绝对路径, 且目标目录为空).
    - 勾选快照前的复选框, 可在上方选择 delete 删除快照

## [CLI](https://kopia.io/docs/reference/command-line/common/)

- diff
- list
- restore
- show
- mount
- benchmark
- notification
- server
- snapshot
- policy
- repository

## FAQ

> [!tip]+ Kopia 命令行在哪?  
> 点击 KopiaUI 界面左下角一个类似 '>' 的图标, 你会发现其路径在 `/Applications/KopiaUI.app/Contents/Resources/server/kopia`

> [!question] 如何更改 Repo 路径?

> [!question] 如何更改备份文件夹路径?

> [!question]+ 修改密码

> [!question]+ 暂停自动快照
> 修改 policy 中的 scheduling 即可