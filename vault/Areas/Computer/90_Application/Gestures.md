---
title: 手势快捷键
created: 2024-09-05T09:37
modified: 2026-01-14T19:29
tags: [excalidraw]
aliases: [手势快捷键, 手势]
excalidraw-open-md: true
excalidraw-plugin: parsed
---

# 手势快捷键

## 鼠标手势

%% [lt] %%
- [x] 左 L
    - [x] 左右 | back `cmd+[`
    - [x] 左右左(S) | `cmd+,`
    - [x] 左右上(◀️) | prev song
    - [ ] 左右下 | voice-?
    - [x] 左上 | undo `cmd+z`
    - [ ] 左上右 | split left?
    - [ ] 左上左
    - [x] 左下 | close all `alt+cmd+w`
    - [x] 左下右(\[) | left space `ctrl+left`
    - [ ] 左下左 | zoom-
- [x] 右 R
    - [x] 右左 | forward `cmd+]`
    - [x] 右左右(Z) | max `ctrl+cmd+f`
    - [x] 右左上(▶️) | next song
    - [ ] 右左下 | voice+?
    - [x] 右上 | new `cmd+t`
    - [ ] 右上左 | split right?
    - [ ] 右上右
    - [x] 右下 | **refresh** `cmd+r`
    - [x] 右下左(\]) | right space `ctrl+right`
    - [ ] 右下右 | zoom+
- [x] 上 U
    - [x] 上下 | top `fn+left`
    - [x] 上下上(N) | zoom
    - [ ] 上下左(🔼) | light+
    - [ ] 上下右 | un-translate?
    - [x] 上左 | prev `shift+ctrl+tab`
    - [ ] 上左下 | split up
    - [ ] 上左上
    - [x] 上右 | next `ctrl+tab`
    - [ ] 上右下 | `ctrl+up`
    - [ ] 上右上
- [x] 下 D
    - [x] 下上 | bottom `fn+right`
    - [x] 下上下(H) | `cmd+h`
    - [ ] 下上左(🔽) | light-
    - [ ] 下上右 | translate?
    - [x] 下左 | quit `cmd+q`
    - [ ] 下左上 | split down
    - [ ] 下左下
    - [x] 下右 | **close** `cmd+w`
    - [ ] 下右上(U) | `ctrl+down`
    - [ ] 下右下

![0a7f6ad85bc76da7|800](<../../../Attachments/1761259187532-209521.png>)

![](<../../../Attachments/Pasted image 20260124100515.png>)

## 触摸板手势

| 手势/手指 | 2          | 3                                  | 4                          |
| ----- | ---------- | ---------------------------------- | -------------------------- |
| 单击    | 右键         | 切换应用 `cmd+tab`                     | *切换全屏* `ctrl+cmd+F`        |
| 双击    | 缩放         | 隐藏其他窗口 `alt+cmd+H`                 |                            |
| 左滑    | 后退 `cmd+[` | prev                               | **切换桌面** `ctrl+left`       |
| 右滑    | 前进 `cmd+]` | next                               | **切换桌面** `ctrl+right`      |
| 上滑    | 滚屏         | *zoom*                             | **调度中心** `ctrl+up`         |
| 下滑    | 滚屏         | *窗口最小化* `cmd+M`<br/>应用隐藏 `cmd+H`    | **App Expose** `ctrl+down` |
| 合拢    | 缩放         | 关闭 tab `cmd+W`<br/>关闭窗口 `opt+cmd+W` | **启动台**                    |
| 张开    | 缩放         | 退出应用 `cmd+Q`<br/>强制退出 `opt+cmd+esc` | **显示桌面** `F11`             |

![](<../../../Attachments/Pasted image 20260124110228.png>)

## 软件工具

- [Karabiner](https://github.com/pqrs-org/Karabiner-Elements): 开源改键软件, 支持鼠标
- [MacMouseFix](https://github.com/noah-nuebling/mac-mouse-fix): 支持滚动优化以及对除了左右键以外的键进行设置. 不能自定义手势, 不能针对 app 设置. 国区免费?
- [Mos](https://github.com/Caldis/Mos): 一个开源的简单的鼠标滚动优化工具
- [BetterAndBetter](https://www.better365.cn/bab2.html): 大而全
- **[xGestures](https://briankendall.net/xGestures/)**: 一个老牌鼠标手势软件, 支持 AppleScript, 特点是支持修饰键控制(按需触发), 不足是不能同时支持右键、中键触发
- MacGesture
- MacStroke: 基于 MacGesture 的修改增强
- WGestures2: 一个原 Windows 下的收费手势工具, 现支持了 mac, 功能上看着不错.

> [!tip]+ 用 karabiner 把鼠标中键(button3)改为 shift, 把 xGestures 的修饰键设为 shift, 这样便能最大程度保留 MacMouseFix 功能的同时支持鼠标手势.

浏览器手势插件  
Chrome/Edge (这几个都不行了)
- SmartUp
- CrxMouse: 不建议, 非要用的话用 clean 版  

Firefox
- Foxy Gestures
- Gesturefy

## 参考

- [使用多点触控手势](https://support.apple.com/zh-cn/102482)
- [Mac 键盘快捷键](https://support.apple.com/zh-cn/102650)

# Excalidraw Data

## Text Elements

上: fn+left ^Y7z77tsR

下: fn+right ^VhGhEOw2

左: back(cmd+[) ^lzkpkcKT

右: forward(cmd+]) ^CxBX06Oe

上下: reload(cmd+r) ^zB54TF3W

下上: new(cmd+t) ^SmEi2X31

左右 ^toI0qa91

右左 ^ONXOLTd8

上左: prev(shift+ctrl+tab) ^NBvSjsT7

上右: next(ctrl+tab) ^fkwEHJaN

下左: close other/all ^IKCZWfCG

下右: close(cmd+w) ^foCudkBe

左上: restore ^5KNr2akD

左下: hide others(alt+cmd+h) ^YvL2re6X

右上: zoom ^y4HFz5td

右下: hide(cmd+h) ^qXJbh8ea

refresh ^008J6SmD

zoom ^ou7Hfzi6

hide ^UU038TMa

new ^GWfwU0gH

left space ^TvplmEPJ

right space ^u1bMVtEu

%%

## Drawing

```compressed-json
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
```
%%