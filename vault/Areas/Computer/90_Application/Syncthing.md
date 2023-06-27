---
created: 2024-12-09T15:24
modified: 2024-12-09T15:36
url:
  - https://syncthing.net/
  - https://docs.syncthing.net/index.html
---

## 入门

1. 安装
    - Windows https://github.com/Bill-Stewart/SyncthingWindowsSetup/
    - macOS https://github.com/syncthing/syncthing-macos/
    - Android https://github.com/Catfriend1/syncthing-android/
    - iOS https://github.com/pixelspark/sushitrain/ , https://github.com/MobiusSync/MobiusSync/
2. 在移动端通过扫码添加电脑端设备
3. 分别在电脑端和移动端添加文件夹 (先不要共享), 暂停文件夹
4. 全量数据备份+版本管理后, 恢复, 重新扫描, 再开启共享

## 文件夹
%% [list2lt|fold] %%
- 常规
    - 路径
    - ID %% 建议和文件夹名称一致 %%
    - 标签
- 共享
- 版本控制 %% 非本机版本控制 %%
    - 回收站
        - 在该时间后清除
        - 清除间隔
    - 简单: 多一个"保留版本数量"参数
    - 阶段
        - 最近一小时内的历史版本，更新间隔小于三十秒的仅保留一份。
        - 最近一天内的历史版本，更新间隔小于一小时的仅保留一份。
        - 最近一个月内的历史版本，更新间隔小于一天的仅保留一份。
        - 距离现在超过一个月且小于最长保留时间的，更新间隔小于一周的仅保留一份
    - 外部
- 忽略模式
- 高级
    - 扫描
    - 文件夹类型
        - 发送
        - 接收
        - 发送和接收
    - 权限
    - 属性

## 此设备

## 远程设备
%% [list2lt|fold] %%
- 常规
    - 设备 ID
    - 设备名
- 共享
    - 作为中介
    - 自动接收
    - 非共享文件夹
- 高级
    - 地址 `dynamic`
    - 压缩
    - 连接管理
    - 设备速率限制

## 设置
%% [list2lt|fold] %%
- 常规
    - 设备名
    - 最低空闲磁盘空间
    - API 密钥
    - 默认配置
- GUI
    - 监听地址 `127.0.0.1:8384`
    - 用户
    - 密码
- 连接
    - 同步协议监听地址
    - 传入速率限制
    - 传出速率限制
    - 全局发现服务器
- 忽略的设备
- 忽略的文件夹

## 高级

## Tips

重置数据库