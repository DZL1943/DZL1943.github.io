https://macos-defaults.com

## 键盘连按

```shell
defaults write -g ApplePressAndHoldEnabled -bool false
# or
defaults write NSGlobalDomain ApplePressAndHoldEnabled -boolean false
```

## 任意位置拖拽窗口

```shell
defaults write -g NSWindowShouldDragOnGesture -bool true
```
按住 ctrl+cmd 即可用鼠标在窗口内任意位置拖拽.

## 程序坞加速

```shell
# 缩减延迟
defaults write com.apple.dock autohide-delay -int 0
# 加速动画
defaults write com.apple.dock autohide-time-modifier -float 0.5
# 重启
killall Dock
```