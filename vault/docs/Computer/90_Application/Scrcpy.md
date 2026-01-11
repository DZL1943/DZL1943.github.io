---
created: 2024-05-19T09:48
modified: 2024-07-31T15:06
url:
  - https://github.com/Genymobile/scrcpy#user-documentation
  - https://developer.android.com/tools/adb
---

## 安装

```shell
# macOS
brew install scrcpy
brew install android-platform-tools
```

[GitHub - viarotel-org/escrcpy](https://github.com/viarotel-org/escrcpy)

## 连接

前置条件
- 开启开发者模式
    - 开启 USB 调试(需连接 USB)
    - 开启调试-安全设置(需重启)
    - 开启无线调试(非必需)

> [!important] 首次连接时 `USB 用于` 不能选 `仅限充电`!

连接方式 (都不好使)
- by its serial: `-s or --serial=`
- the one connected over USB (if there is exactly one): `-d or --select-usb`
- the one connected over TCP/IP (if there is exactly one): `-e or --select-tcpip`
- a device already listening on TCP/IP: `--tcpip=ip:port`
- manual: `{shell} adb tcpip 5555; adb connect $(adb shell ip route | grep wlan0 | awk '{print $9}'):5555; scrcpy`

> [!summary]+ 连接方式总结
> - 有线
>     - USB (USB 调试)
> - 无线
>     - WLAN (adb connect. 需借助 USB 初始连接)
>     - WiFi (无线调试, 配对、扫码)

> [!question]- 连着 usb 也无法开启无线连接?
> 检查有无残留 adb daemon 进程

常用选项
- `-w or --stay-awake`
- `--disable-screensaver`
- `--always-on-top`

## more

- [Connection](https://github.com/Genymobile/scrcpy/blob/master/doc/connection.md)
- [Video](https://github.com/Genymobile/scrcpy/blob/master/doc/video.md)
- [Audio](https://github.com/Genymobile/scrcpy/blob/master/doc/audio.md)
- [Control](https://github.com/Genymobile/scrcpy/blob/master/doc/control.md)
- [Keyboard](https://github.com/Genymobile/scrcpy/blob/master/doc/keyboard.md)
- [Mouse](https://github.com/Genymobile/scrcpy/blob/master/doc/mouse.md)
- [Gamepad](https://github.com/Genymobile/scrcpy/blob/master/doc/gamepad.md)
- [Device](https://github.com/Genymobile/scrcpy/blob/master/doc/device.md)
- [Window](https://github.com/Genymobile/scrcpy/blob/master/doc/window.md)
- [Recording](https://github.com/Genymobile/scrcpy/blob/master/doc/recording.md)
- [Virtual display](https://github.com/Genymobile/scrcpy/blob/master/doc/virtual_display.md)
- [Tunnels](https://github.com/Genymobile/scrcpy/blob/master/doc/tunnels.md)
- [OTG](https://github.com/Genymobile/scrcpy/blob/master/doc/otg.md)
- [Camera](https://github.com/Genymobile/scrcpy/blob/master/doc/camera.md)
- [Video4Linux](https://github.com/Genymobile/scrcpy/blob/master/doc/v4l2.md)
- [Shortcuts](https://github.com/Genymobile/scrcpy/blob/master/doc/shortcuts.md)