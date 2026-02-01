---
created: 2024-08-07T19:18
modified: 2025-10-08T22:22
---

<!-- truncate -->

> [!danger]- 重大操作之前注意事项
> - 退出应用
> - 停止同步 (恢复前先重新扫描)
> - 全量备份 (特别注意 git 的分支切换操作)
> - 备份完成之前不要同步, 同步完成之前不要打开应用

## [同步](https://help.obsidian.md/sync-notes)

- 本地/局域网同步
    - rsync
    - [Unison](https://github.com/bcpierce00/unison)
    - FreeFileSync
    - Syncthing
- 云同步(云服务商 or 自建 FTP/SFTP/SMB/S3/WebDAV) %% 适合多设备间协同 %%
    - 云服务商客户端
        - iCloud
        - OneDrive
        - Google Drive
        - Dropbox
    - [Obsidian 官方同步](https://obsidian.md/sync)
    - 插件
        - Remotely Save
        - LiveSync
    - 通用客户端
        - FolderSync
        - GoodSync
        - [Autosync](https://metactrl.com/)
        - Rclone
- Git
    - GitSync

> [!note]- 请别再说什么用 git 同步这种鬼话!
> 
> 1. git 是版本管理工具, 不是同步工具
> 2. 如果你指的是 github 或类似的东西, 请明确说明. 并且
>     1. 那其实不叫同步, 叫备份更合适
>     2. git 有门槛, github 也有门槛, 请不要因此误导新人
> 3. 没必要用 git "同步", 因为还有许多真正意义上的便捷得多的同步工具

> [!summary]+ 本质上是增量传输, 自动、实时、双向、公网都不是必要的
> - 内网首推 Syncthing
> - 小白首选 OneDrive、iCloud, 钱多就选官方同步
> - 自建用 Remotely Save 或者其他自己看着办吧
> - 不推荐 Git (门槛高, 麻烦, 没必要)

## [备份](https://help.obsidian.md/backup)
%% 同步和 git 或多或少都有 ignore, 只有全量备份才能托底保障数据的完整和安全 %%
- 本地备份
    - 通用类
        - git `{shell} if [[ -n "$(git status --porcelain)" ]]; then git add -A && git commit -m "auto commit@$(date '+%Y%m%d%H%M%S')" && git --no-pager show --name-only;fi`
        - cp `{shell} mkdir -p ~/bak/Obsidian/$(date +%F) && cp -rfP ~/Documents/Obsidian/. $_`
        - rsync `{shell} rsync -av --delete --exclude={'.git/','.trash/'} ~/Documents/Obsidian/ ~/bak/Obsidian/$(date +%F)/`
        - tar `{shell} tar --exclude .git -czvf ~/bak/Obsidian/$(date +%Y%m%d%H%M%S).tar.gz -C ~/Documents/Obsidian .`
        - zip `{shell} (cd ~/Documents/Obsidian && zip -r ~/bak/Obsidian/$(date +%Y%m%d%H%M%S).zip . -x "*.git*" "*.trash*" -e); unzip filename.zip -d "${filename%.*}"`
        - Kopia
    - 系统类
        - macOS 时间机器
    - 插件类
        - Local Backup 插件
- 云备份

## 加密

- Cryptomator
- VeraCrypt
- [Encrypto](https://macpaw.com/encrypto)
- git-crypt