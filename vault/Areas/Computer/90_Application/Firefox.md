---
created: 2024-04-22T20:39
modified: 2025-09-02T11:04
draft: true
---

## 简介

- 电脑版
    - [官方](https://www.mozilla.org/en-US/firefox/)
    - [Zen](https://github.com/zen-browser)
    - Floorp
    - [LibreWolf](https://librewolf.net/)
    - Tor
- 移动版
    - 官方/Focus/Nightly/Beta
    - Iceraven

## 设置

- 常规
    - 启动
    - 导入
    - 标签页
        - 关闭多个标签页前询问: 否
        - 退出前询问: 否
    - 语言与外观
        - 网站外观
        - 颜色
        - 字体
            - 比例
            - 衬线
            - 无衬线
            - 等宽
            - 最小字号: 14
        - 全局缩放
        - 语言: 简中
        - 翻译
    - 文件与应用程序
        - 下载
        - 应用程序
    - Zen 更新
        - 自动安装: 否
    - 性能
    - 浏览
    - 网络设置
        - 使用系统代理
- 界面外观
    - 侧边栏和标签页布局
    - 界面外观
    - 主题设置
    - 浮窗预览: Meta
    - Zen 地址栏: 默认
- 标签页管理
    - 工作区
    - 标签页卸载器
    - 固定标签页
- 键盘快捷键
- Zen 模组
- 主页
    - 新窗口和标签页
    - Firebox 主页内容
        - 网络搜索
        - 快捷方式
        - 天气
        - 近期动态
- 搜索
    - 默认搜索引擎
    - 搜索建议
    - 地址栏
    - 快捷搜索
        - bing
- 隐私安全
    - 增强型跟踪保护
    - 网站隐私首选项
    - Cookie 和网站数据
    - 密码
    - 历史记录
        - 在 Zen 关闭时清除历史记录
    - 权限
    - 安全
        - 欺诈内容和危险软件防护
        - 证书
        - HTTPS-Only
    - HttPS-DNS
- 账号同步
- 扩展和主题
- 帮助

## [扩展](https://addons.mozilla.org/en-US/firefox/)

- [ ] 浮图秀: Ctrl
- [ ] 图片助手
- [ ] 网页截图:注释&录屏
- [ ] 隐私獾
- [ ] 找回已关闭的标签页
- [ ] Auto Tab Discard
- [ ] CanvasBlocker
- [ ] Clear Browsing Data
- [ ] ClearURLs
- [ ] Close All Tabs
- [ ] Close Tab Button
- [ ] Cookie AutoDelete
- [ ] Firefox Multi-Account Containers
- [ ] Firefox Relay
- [ ] floccus
- [ ] Gesturefy
- [ ] Ghostery
- [ ] Global Speed
- [ ] History Cleaner
- [ ] Imagus: Shift 启用
- [ ] KeePassXC-Browser
- [ ] Markdown Viewer
- [ ] MarkDownload
- [ ] New Tab Override
- [ ] NoScript
- [ ] OneTab
- [ ] PopUpOFF
- [ ] Scroll To Top
- [ ] Sidebery
- [ ] smartUp
- [ ] Stylus
- [ ] Swift Selection Search
- [ ] Tabby
- [ ] Tile Tabs WE
- [ ] Tree Style Tab
- [ ] User-Agent Switcher and Manager
- [ ] Userchrome Toggle Extended
- [ ] Video DownloadHelper
- [ ] Vimium
- [x] 沉浸式翻译
- [x] 篡改猴
- [x] 沙拉查词
- [x] Dark Reader
- [x] Foxy Gestures
- [x] Notion Web Clipper
- [ ] Obsidian Web Clipper
- [x] Redirector
- [x] Tab Session Manager
- [x] TWP
- [x] uBlock Origin
- [ ] Universal Web Clipper

## Tips

### userChrome.css

首先要在 about:config 开启  `toolkit.legacyUserProfileCustomizations.stylesheets`

然后在 about:profiles 中找到当前配置目录 (mac `~/Library/Application\ Support/Firefox/Profiles/`)

在其中新建 chrome 目录, 在 chrome 目录中新建 ==userChrome.css== 文件

[userChrome.css for Customizing Firefox](https://www.userchrome.org/)

[https://github.com/Timvde/UserChrome-Tweaks](https://github.com/Timvde/UserChrome-Tweaks)

隐藏 tab 栏, 并且保留窗口控制按钮 (自行添加弹性空白后效果更佳)
```css
/* https://github.com/piroor/treestyletab/wiki/Code-snippets-for-custom-style-rules#hide-top-bar-and-move-close-minimize-restore-buttons-to-top-left-macos-big-sur-firefox-89 */
#titlebar {
    appearance: none !important;
    height: 0px;
}

#titlebar > #toolbar-menubar {
    margin-top: 0px;
}

#TabsToolbar {
    min-width: 0 !important;
    min-height: 0 !important;
}

#TabsToolbar > .titlebar-buttonbox-container {
    display: block;
    position: absolute;
    top: 12px;
    left: 0px;
}
```

[Code snippets for custom style rules](https://github.com/piroor/treestyletab/wiki/Code-snippets-for-custom-style-rules)

自动隐藏 TST 侧边栏 (使用光子主题)
```css
/* https://github.com/piroor/treestyletab/wiki/Code-snippets-for-custom-style-rules#auto-showhide-sidebar-by-mouseover-hover */
/*Collapse in default state and add transition*/
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"] {
    overflow: hidden;
    min-width: 40px !important;
    max-width: 40px !important;
    transition: all 0.2s ease;
    border-right: 1px solid #0c0c0d;
    z-index: 2;
}

/*Expand to 260px on hover*/
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"]:hover,
#sidebar-box[sidebarcommand="treestyletab_piro_sakura_ne_jp-sidebar-action"]
    #sidebar {
    min-width: 260px !important;
    max-width: 260px !important;
    z-index: 1;
}
```
https://github.com/MrOtherGuy/firefox-csshacks

隐藏地址栏 https://gist.github.com/pedroarthur/02121730f4875c14646fd5293d9818a6?permalink_comment_id=3902164#gistcomment-3902164
```css
#navigator-toolbox {
    margin-top: -32px;
    transition: margin-top 0.5s;
}

#navigator-toolbox:hover, #navigator-toolbox:focus-within {
    margin-top: 0px;
    transition: margin-top 0.5s;
}
```

> [!tip]+ 隐藏地址栏后, 不方便点选窗口控制按钮  
> 先点一下地址栏, 使其进入输入状态, 然后点其他地方应该就好使了

### Librewolf连接KeePassXC

```shell
mkdir -p "~/Library/Application Support/librewolf/NativeMessagingHosts"

ln -s "~/Library/Application Support/Mozilla/NativeMessagingHosts" "~/Library/Application Support/librewolf/NativeMessagingHosts"
```

在 KeePassXC 浏览器集成-高级勾选使用自定义浏览器配置位置, 填写 `~/Library/Application Support/librewolf/NativeMessagingHosts`