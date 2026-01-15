# Obsidian-sidebar-expand-on-hover-Plus
版本调试信息：Obsidian v1.9.12 

插件优点：界面喜欢极简风的同学推荐使用。 

## 使用演示
启用插件后自动隐藏左右侧边栏，鼠标划向边缘自动展开。想要暂时不隐藏可以用鼠标在侧边栏右键双击，即可暂时锁定/解锁。
支持右键双击暂时锁定/解锁：左侧边栏、右侧边栏、左侧边栏标签栏、右侧边栏标签栏、标题栏（最大化那三个图标）。
https://www.bilibili.com/video/BV19fxSzjEKf/?spm_id_from=333.1387.homepage.video_card.click&vd_source=94214b5a164248e6c4b4da8d57e53aa1
![演示](https://github.com/ttyyxx-ser/Obsidian-sidebar-expand-on-hover-Plus/blob/main/20251007_135740-ezgif.com-video-to-gif-converter.gif)


## 如何安装
1. 点击上方code --> Download ZIP 下载保存到本地。
2. Obsidian-sidebar-expand-on-hover-Plus-main.zip 解压缩到 `Obsidian-sidebar-expand-on-hover-Plus` 文件夹。(文件夹名字不要错)
3. `Obsidian-sidebar-expand-on-hover-Plus` 文件夹要移动到obsidian的 `.obsidian\plugins` 文件夹中
4. 重启或重载Obsidian。
5. 在第三方插件中找到 `Sidebar Expand on Hover Plus` 启用插件即可。  
<img width="1092" height="711" alt="image" src="https://github.com/user-attachments/assets/0ff0e310-fc69-49e4-9931-20855afc9fbb" />

## 如何设置
- 启用/关闭左侧边栏、右侧边栏、标签栏、标题栏。也可以用鼠标右键双击来锁定/解锁。
- 一般用默认设置调一下栏宽即可。
<img width="859" height="872" alt="image" src="https://github.com/user-attachments/assets/b7cde91e-dd1c-4685-b620-d0897be31dc3" />
<img width="794" height="380" alt="image" src="https://github.com/user-attachments/assets/e19bbbdd-052a-4ae8-92f0-0beee9b123a3" />



## 日志
- **添加对功能区的鼠标跟踪，不会自动隐藏左侧边栏**
- **添加对左侧边栏选项卡的鼠标跟踪，会自动隐藏左侧边栏**
- **添加延时1秒隐藏**
- **修复右侧边栏激活问题**
  - 添加了热区检测功能，当鼠标移动到窗口右侧边缘时自动展开右侧边栏
  - 新增 hotzoneWidth 设置项，默认10像素，可在设置中调整
  - 通过监听工作区容器的 mousemove 事件实时检测鼠标位置
- **新增双击锁定功能**
  - 为左右侧边栏添加了双击事件监听
  - 双击侧边栏区域可切换锁定状态（对应区域的 pin 设置）
  - 锁定状态下侧边栏不会自动隐藏
  - 提供视觉反馈通知用户当前状态
-  **移除原来的双击事件监听**
  - 删除了侧边栏的 dblclick 事件监听
  - 保留了功能区的双击事件（左键双击），因为功能区不容易误触
- **新增右键双击检测**
  - 添加了 contextmenu 事件监听（右键点击事件）
  - 新增 handleRightClick 方法来处理右键双击逻辑
  - 添加了 rightClickTimerLeft 和 rightClickTimerRight 计时器来检测右键双击
- **右键双击逻辑**
  - 使用 500 毫秒的时间间隔检测右键双击
  - 第一次右键点击时启动计时器
  - 在 500 毫秒内再次右键点击则触发锁定切换
  - 阻止了默认的右键菜单弹出
  - **标题栏自动隐藏**
  - 添加了 `titleBarEnabled` 设置，默认开启标题栏自动隐藏
  - 通过 CSS 类 `auto-hide-titlebar` 实现标题栏的淡入淡出效果
  - 鼠标悬停时显示标题栏，离开后延迟隐藏
 - **顶部热区检测**
  - 添加了 `titleBarHotzoneHeight` 设置，默认5像素
  - 当鼠标移动到窗口顶部热区时自动显示标题栏
  - 与侧边栏展开状态联动
 - **标题栏锁定功能**
  - 添加了 `titleBarPin` 设置
  - 在标题栏区域内**右键双击**可以锁定/解锁标题栏
  - 锁定状态下标题栏保持显示，不会自动隐藏
 - **与侧边栏联动**
    - 当左侧或右侧边栏展开时，标题栏会自动显示
    - 当所有侧边栏都折叠且鼠标不在热区内时，标题栏会自动隐藏
    - 侧边栏锁定状态也会影响标题栏的显示
- **完整的标题栏管理**
    - 新增了标题栏的显示/隐藏方法
    - 添加了标题栏的定时器管理
    - 在插件卸载时自动恢复标题栏显示 
- **修复当功能区被设置为向左自动隐藏（style settings的功能）并ob在窗口化时，鼠标移至左边缘左侧边栏不会自动展开但最大化时正常的问题。** 

## 用户体验优化
- 添加了中文操作说明和状态提示
- 统一了双击功能区与双击侧边栏的锁定行为
- 新增切换锁定状态的命令，方便快捷键操作
- 改进了设置界面，增加热区宽度配置

## 代码结构优化
- 新增 toggleSidebarLock 方法统一处理锁定逻辑
- 缓存工作区容器引用，提高性能
- 保持与原有代码风格的一致性 
