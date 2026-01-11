---
created: 2025-10-24T06:39
modified: 2026-01-11T22:22
---

## 命令行工具

`xcode-select --install`

`softwareupdate --install-rosetta`

## 文件已损坏

`sudo xattr -r -d com.apple.quarantine xxx.app`

## 重置 LaunchPad

```shell
defaults write com.apple.dock ResetLaunchPad -bool TRUE; killall Dock
```

## 查看 Java 路径

`/usr/libexec/java_home`

## 刷新 dns

`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

## 便签默认字体

## 获取应用 id

`osascript -e 'id of app "SomeApp"'`

或在 Info.plist 中查找 CFBundleIdentifier 的值.

## 查看 plist

`plutil -p xxx`

## 更改默认应用

```shell
duti -s org.mozilla.librewolf public.html all
duti -s com.microsoft.VSCode .md all
```

## 文件夹本地化

系统级实现: `/System/Library/CoreServices/SystemFolderLocalizations/zh_CN.lproj/SystemFolderLocalizations.strings`

用户实现
1. 文件夹以 .localized 结尾
2. 创建 .localized 子文件夹
3. 在 .localized 中创建对应的文件, 例如 zh.strings, 其内容为 xxx(原文)=xxx(译文);

## 切换用户

`sudo -u username`

## Finder 添加快速操作

快速操作-打开访达项目

## 快捷键打开 app

1. 快速操作-开启应用程序
2. 键盘-快捷键-服务-通用

## 通过自动操作将 jar 制作为应用程序

以 hmcl 为例
1. 选择文稿类型 - 应用程序
2. 运行 shell 脚本 `cd ~/Games/Minecraft && java -jar $(ls hmcl*.jar | sort -rV | head -n1)`
3. 保存到应用程序目录

## 切换开关菜单栏

Raycast 插件 [toggle-menu-bar](https://github.com/raycast/extensions/tree/7e3587ede90cfc2bfbe9767f6f14c68c64387589/extensions/toggle-menu-bar/README.md)

## 退出应用

```applescript
#!/usr/bin/osascript
-- usage: osascript ~/bin/quitapps.applescript 2>&1
-- https://stackoverflow.com/questions/495323/quit-all-applications-using-applescript

set blackList to {"io.github.clash-verge-rev.clash-verge-rev", "com.microsoft.edgemac", "com.tencent.qq", "com.tencent.xinWeChat", "com.obsproject.obs-studio", "com.alicloud.smartdrive", "com.kingsoft.wpsoffice.mac"}

set whiteList to {"com.apple.finder", "com.apple.systempreferences", "com.apple.ScriptEditor2", "com.apple.Stickies", "com.googlecode.iterm2", "net.kovidgoyal.kitty", "com.microsoft.VSCode", "jacklandrin.OnlySwitch", "md.obsidian"}

-- get list of open apps
tell application "System Events"
    set allAppIds to bundle identifier of processes whose background only is false
    log allAppIds
end tell

-- quit each app
repeat with appId in allAppIds
    if appId is not in whiteList then
        log appId
        tell application id appId to quit
    end if
end repeat
```

## [防止 Mac 笔记本电脑在翻开屏幕盖或连接电源时开机 - 官方 Apple 支持 (中国)](https://support.apple.com/zh-cn/120622)