---
created: 2024-07-25 11:32
modified: 2024-07-31 15:06
aliases:
  - 鼠须管
  - Squirrel
  - 小狼毫
  - Weasel
  - 中州韵
categories: 软件
url:
  - https://rime.im/
---

## 安装

- 从官网下载对应的版本
    - Windows: 小狼毫 Weasel
    - macOS: 鼠鬚管 Squirrel、小企鹅 fcitx5-macos
    - Linux: ibus-rime、fcitx5-rime
    - Android: fcitx5-android、同文 Trime
- 安装后退出登录
- 在输入法中添加 (左下角 `+|-`,先任选一其他语言再切到简体中文)

卸载
- 在输入法中移除
- 重新登录
- 在 /Library/Input Methods 中移除
- 移除 ~/Library/Rime/

## 配置

配置文件路径 (可以通过 `用户设定` 进入)
- `~/.config/ibus/rime` (Linux)
- `~/Library/Rime` (Mac OS)
- `%APPDATA%\Rime` (Windows)

配置方法 [CustomizationGuide · rime/home Wiki · GitHub](https://github.com/rime/home/wiki/CustomizationGuide)
- 創建一個文件名的主體部份（「.」之前）與要定製的文件相同、次級擴展名（「.yaml」之前）爲 .custom 的定製文檔
- **重新部署**

配置文件
- 客户端
    - weasel.custom.yaml
    - squirrel.custom.yaml
- 输入方案
    - default.custom.yaml
    - luna_pinyin_simp.custom.yaml
- 其他
    - rime.lua

```yaml title:squirrel.custom.yaml fold
patch:
  style/horizontal: true
  "style/font_point": 16
  show_notifications_when: appropriate     # 状态通知，可设为全开（always）全关（never）  

  # 皮肤主题名称输入在下方，分为浅色和深色
  # 浅色主题
  style/color_scheme: mac_light
  # 深色主题
  style/color_scheme_dark: mac_dark

  # 皮肤主题
  preset_color_schemes:
    wechat_light:
      name: 微信键盘浅色
      horizontal: true                          # true横排，false竖排
      back_color: 0xFFFFFF                      # 候选条背景色
      border_height: 0                          # 窗口上下高度，大于圆角半径才生效
      border_width: 8                           # 窗口左右宽度，大于圆角半径才生效
      candidate_format: "%c %@ "                # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      comment_text_color: 0x999999              # 拼音等提示文字颜色
      corner_radius: 5                          # 窗口圆角
      hilited_corner_radius: 5                  # 高亮圆角
      font_face: PingFangSC                     # 候选词字体
      font_point: 16                            # 候选字大小
      hilited_candidate_back_color: 0x75B100    # 第一候选项背景色
      hilited_candidate_text_color: 0xFFFFFF    # 第一候选项文字颜色
      label_font_point: 12                      # 候选编号大小
      text_color: 0x424242                      # 拼音行文字颜色
      inline_preedit: true                      # 拼音位于： 候选框 false | 行内 true

    wechat_dark:
      name: 微信键盘深色
      horizontal: true                          # true横排，false竖排
      back_color: 0x2e2925                      # 候选条背景色
      border_height: 0                          # 窗口上下高度，大于圆角半径才生效
      border_width: 8                           # 窗口左右宽度，大于圆角半径才生效
      candidate_format: "%c %@ "                # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      comment_text_color: 0x999999              # 拼音等提示文字颜色
      corner_radius: 5                          # 窗口圆角
      hilited_corner_radius: 5                  # 高亮圆角
      font_face: PingFangSC                     # 候选词字体
      font_point: 16                            # 候选字大小
      hilited_candidate_back_color: 0x75B100    # 第一候选项背景色
      hilited_candidate_text_color: 0xFFFFFF    # 第一候选项文字颜色
      label_font_point: 12                      # 候选编号大小
      text_color: 0x424242                      # 拼音行文字颜色
      label_color: 0x999999                     # 预选栏编号颜色
      candidate_text_color: 0xe9e9ea            # 预选项文字颜色
      inline_preedit: true                      # 拼音位于： 候选框 false | 行内 true

    mac_light:
      name: Mac浅色
      horizontal: true             # true横排，false竖排
      candidate_format: "%c %@ "   # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 5                             # 窗口圆角
      hilited_corner_radius: 5                     # 高亮圆角
      line_spacing: 10                             # 行间距(适用于竖排)
      border_height: 4                             # 窗口上下高度，大于圆角半径才生效
      border_width: 4                              # 窗口左右宽度，大于圆角半径才生效
      font_face: "PingFangSC"                      # 候选词字体
      font_point: 16                               # 候选字大小
      label_font_point: 13                         # 候选编号大小
      text_color: 0x424242                    # 拼音行文字颜色
      back_color: 0xFFFFFF                    # 候选条背景色
      border_color: 0xFFFFFF                  # 边框色
      label_color: 0x999999                   # 预选栏编号颜色
      candidate_text_color: 0x3c3c3c          # 预选项文字颜色
      comment_text_color: 0x999999            # 拼音等提示文字颜色
      hilited_text_color: 0x999999            # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0xD75A00            # 第一候选项背景背景色
      hilited_candidate_text_color: 0xFFFFFF  # 第一候选项文字颜色
      hilited_candidate_label_color: 0xFFFFFF # 第一候选项编号颜色
      hilited_comment_text_color: 0x999999    # 注解文字高亮

    mac_dark:
      name: Mac深色
      horizontal: true             # true横排，false竖排
      candidate_format: "%c %@ "   # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 5                             # 窗口圆角
      hilited_corner_radius: 5                     # 高亮圆角
      line_spacing: 10                              # 行间距(适用于竖排)
      border_height: 4                             # 窗口上下高度，大于圆角半径才生效
      border_width: 4                              # 窗口左右宽度，大于圆角半径才生效 
      font_face: "PingFangSC"                      # 候选词字体
      font_point: 16                               # 候选字大小
      label_font_point: 13                         # 候选编号大小
      text_color: 0x424242                    # 拼音行文字颜色
      back_color: 0x252a2e                    # 候选条背景色
      border_color: 0x050505                  # 边框色
      label_color: 0x999999                   # 预选栏编号颜色
      candidate_text_color: 0xe9e9ea          # 预选项文字颜色
      comment_text_color: 0x999999            # 拼音等提示文字颜色
      hilited_text_color: 0x999999            # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0xD75A00            # 第一候选项背景背景色
      hilited_candidate_text_color: 0xFFFFFF  # 第一候选项文字颜色
      hilited_candidate_label_color: 0xFFFFFF # 第一候选项编号颜色
      hilited_comment_text_color: 0x999999    # 注解文字高亮

    mac_green:
      name: Mac绿
      horizontal: true             # true横排，false竖排
      candidate_format: "%c %@ "   # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 5                             # 窗口圆角
      hilited_corner_radius: 5                     # 高亮圆角
      line_spacing: 10                              # 行间距(适用于竖排)
      border_height: 4                             # 窗口上下高度，大于圆角半径才生效
      border_width: 4                              # 窗口左右宽度，大于圆角半径才生效
      font_face: "PingFangSC"                      # 候选词字体
      font_point: 16                               # 候选字大小
      label_font_point: 13                         # 候选编号大小
      text_color: 0x424242                    # 拼音行文字颜色
      back_color: 0xFFFFFF                    # 候选条背景色
      border_color: 0xFFFFFF                  # 边框色
      label_color: 0x999999                   # 预选栏编号颜色
      candidate_text_color: 0x3c3c3c          # 预选项文字颜色
      comment_text_color: 0x999999            # 拼音等提示文字颜色
      hilited_text_color: 0x999999            # 高亮拼音 (需要开启内嵌编码)
      hilited_candidate_back_color: 0x32A14C  # 第一候选项背景色
      hilited_candidate_text_color: 0xFFFFFF  # 第一候选项文字颜色
      hilited_candidate_label_color: 0xFFFFFF # 第一候选项编号颜色
      hilited_comment_text_color: 0x999999    # 注解文字高亮

    mac_orange:
      name: Mac橙
      horizontal: true             # true横排，false竖排
      candidate_format: "%c %@ "   # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 5                             # 窗口圆角
      hilited_corner_radius: 5                     # 高亮圆角
      line_spacing: 10                              # 行间距(适用于竖排)
      border_height: 4                             # 窗口上下高度，大于圆角半径才生效
      border_width: 4                              # 窗口左右宽度，大于圆角半径才生效
      font_face: "PingFangSC"                      # 候选词字体
      font_point: 16                               # 候选字大小
      label_font_point: 13                         # 候选编号大小
      text_color: 0x424242                    # 拼音行文字颜色
      back_color: 0xFFFFFF                    # 候选条背景色
      border_color: 0xFFFFFF                  # 边框色
      label_color: 0x999999                   # 预选栏编号颜色
      candidate_text_color: 0x3c3c3c          # 预选项文字颜色
      comment_text_color: 0x999999            # 拼音等提示文字颜色
      hilited_text_color: 0x999999            # 高亮拼音 (需要开启内嵌编码)
      hilited_candidate_back_color: 0x0E6BD8  # 第一候选项背景色
      hilited_candidate_text_color: 0xFFFFFF  # 第一候选项文字颜色
      hilited_candidate_label_color: 0xFFFFFF # 第一候选项编号颜色
      hilited_comment_text_color: 0x999999    # 注解文字高亮

    mac_blue:
      name: Mac浅蓝
      horizontal: false              # true横排，false竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 5                             # 窗口圆角
      font_face: "PingFangSC"                      # 候选词字体
      font_point: 16                               # 候选字大小
      label_font_point: 13                         # 候选编号大小
      line_spacing: 10                              # 行间距(适用于竖排)
      text_color: 0x424242                    # 拼音行文字颜色
      back_color: 0xFFFFFF                    # 候选条背景色
      border_color: 0xFFFFFF                  # 边框色
      label_color: 0x999999                   # 预选栏编号颜色
      candidate_text_color: 0x3c3c3c          # 预选项文字颜色
      comment_text_color: 0x999999            # 拼音等提示文字颜色
      hilited_text_color: 0x999999            # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0xF8AA4D            # 第一候选项背景背景色
      hilited_candidate_text_color: 0xFFFFFF  # 第一候选项文字颜色
      hilited_candidate_label_color: 0xFFFFFF # 第一候选项编号颜色
      hilited_comment_text_color: 0x999999    # 注解文字高亮

    psionics:
      name: 幽能
      horizontal: true              # true横排，false竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 5                             # 窗口圆角 
      font_point: 16                               # 候选文字大小
      label_font_point: 14                         # 候选编号大小
      line_spacing: 10                              # 行间距(适用于竖排)
      font_face: "PingFangSC-Regular,HanaMinB"     # 候选词字体  
      text_color: 0xc2c2c2                     # 拼音行文字颜色
      back_color: 0x444444                     # 候选条背景色，24位色值，16进制，BGR顺序
      candidate_text_color: 0xeeeeee           # 预选项文字颜色
      hilited_candidate_back_color: 0xd4bc00   # 候选文字背景色
      comment_text_color: 0x808080             # 拼音等提示文字颜色
      hilited_text_color: 0xeeeeee             # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0x444444             # 第一候选项背景背景色
      hilited_candidate_label_color: 0xfafafa  # 第一候选项编号颜色
      hilited_candidate_text_color: 0xfafafa   # 第一候选项文字颜色
      hilited_comment_text_color: 0x444444     # 注解文字高亮

    win10:
      horizontal: true                  # true横排，false竖排
      candidate_format: "%c %@  "       # 如果是竖排建议改为 "%c\u2005%@"
      font_point: 17              # 候选文字大小
      label_font_point: 16        # 候选编号大小
      corner_radius: 0            # 候选条圆角
      border_width: 6             # 窗口左右宽度
      border_height: 6            # 窗口左右高度
      margin_x: 12                # 字起始距左边距离
      margin_y: 12                # 字上下边距
      spacing: 10                 # 间距
      candidate_spacing: 24       # 候选字间隔
      hilite_spacing: 8           # 序号和候选字之间的间隔
      hilite_padding: 12          # 候选字背景色色块高度 若想候选字背景色块无边界填充候选框，仅需其高度和候选字上下边距一致即可
      round_corner: 0             # 候选字背景色块圆角幅度
      line_spacing: 10            # 行间距(适用于竖排)
      candidate_text_color: 0x000000          # 预选项文字颜色
      comment_text_color: 0x888888            # 拼音等提示文字颜色
      text_color: 0x000000                    # 拼音行文字颜色
      back_color: 0xffffff                    # 候选条背景色，24位色值，16进制，BGR顺序
      hilited_text_color: 0x000000            # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0xffffff            # 第一候选项背景背景色
      hilited_candidate_text_color: 0xffffff  # 第一候选项文字颜色
      hilited_candidate_back_color: 0xcc8f29  # 候选文字背景色
      hilited_comment_text_color: 0xffffff    # 注解文字高亮
      hilited_label_color: 0xffffff           # 已选字的数字的颜色
      label_color: 0x888888                   # 预选栏编号颜色

    solarized_rock:
      name: 日光石
      horizontal: true              # true横排，false竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 6                             # 窗口圆角 
      font_point: 16                               # 候选文字大小
      label_font_point: 15                         # 候选编号大小
      line_spacing: 10                             # 行间距(适用于竖排)
      font_face: "PingFangSC-Regular,HanaMinB"     # 候选词字体
      text_color: 0x8236d3                     # 拼音行文字颜色
      back_color: 0x362b00                     # 候选条背景色，24位色值，16进制，BGR顺序
      candidate_text_color: 0x969483           # 预选项文字颜色
      comment_text_color: 0xc098a12a           # 拼音等提示文字颜色
      hilited_text_color: 0x98a12a             # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0x444444             # 第一候选项背景背景色
      hilited_candidate_label_color: 0xfafafa  # 第一候选项编号颜色
      hilited_candidate_back_color: 0x8236d3   # 候选文字背景色
      hilited_candidate_text_color: 0xffffff   # 第一候选项文字颜色
      hilited_comment_text_color: 0x362b00     # 注解文字高亮  

    solarized_dark:
      name: 夜光石
      horizontal: true              # true横排，false竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      corner_radius: 6                             # 窗口圆角 
      font_point: 16                               # 候选文字大小
      label_font_point: 15                         # 候选编号大小
      line_spacing: 10                             # 行间距(适用于竖排)
      font_face: "PingFangSC-Regular,HanaMinB"     # 候选词字体
      text_color: 0xA1A095                     # 拼音行文字颜色
      border_color: 0xf02A1F00                 # 边框颜色
      label_color: 0xCC8947                    # 预选栏编号颜色
      back_color: 0xf0352A0A                   # 候选条背景色，24位色值，16进制，BGR顺序
      candidate_text_color: 0x989F52           # 预选项文字颜色
      comment_text_color: 0x289989             # 拼音等提示文字颜色
      hilited_text_color: 0x2C8BAE             # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0x444444             # 第一候选项背景背景色
      hilited_candidate_label_color: 0x2566C6  # 第一候选项编号颜色
      hilited_candidate_back_color: 0xD7E8ED   # 候选文字背景色
      hilited_candidate_text_color: 0x3942CB   # 第一候选项文字颜色
      hilited_comment_text_color: 0x8144C2     # 注解文字高亮         

    apathy:
      name: 冷漠
      horizontal: true               # true横排，false竖排
      back_color: 0xFFFFFF           # 候选条背景色，24位色值，16进制，BGR顺序
      border_height: 0               # 窗口上下高度，大于圆角半径才生效
      border_width: 8                # 窗口左右宽度
      line_spacing: 10               # 行间距(适用于竖排)
      candidate_format: "%c %@ "     # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      comment_text_color: 0x999999              # 拼音等提示文字颜色
      corner_radius: 5                          # 窗口圆角
      font_point: 17                            # 候选文字大小
      hilited_candidate_back_color: 0xFFF0E4    # 候选文字背景色
      hilited_candidate_text_color: 0xEE6E00    # 第一候选项文字颜色
      inline_preedit: true           # 拼音位于： 候选框 false | 行内 true
      label_font_point: 12           # 候选编号大小
      text_color: 0x424242           # 拼音行文字颜色

    google:
      name: 谷歌
      horizontal: true              # true横排，false竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      font_point: 16                           # 候选文字大小
      label_font_point: 15                     # 候选编号大小
      corner_radius: 6                         # 窗口圆角
      line_spacing: 10                         # 行间距(适用于竖排)
      text_color: 0x666666                     # 拼音行文字颜色
      candidate_text_color: 0x000000           # 预选项文字颜色
      back_color: 0xFFFFFF                     # 候选条背景色
      border_color: 0xE2E2E2                   # 边框
      hilited_text_color: 0x000000             # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0xFFFFFF             # 第一候选项背景背景色
      hilited_candidate_text_color: 0xffffff   # 第一候选项文字颜色
      hilited_candidate_back_color: 0xCE7539   # 候选文字背景色 
      comment_text_color: 0x6D6D6D             # 拼音等提示文字颜色
      hilited_comment_text_color: 0xEBC6B0     # 注解文字高亮
      hilited_candidate_label_color: 0xfafafa  # 第一候选项编号颜色

    milan:
      name: 米兰
      horizontal: false              # true 横排，false 竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      font_point: 16                           # 候选文字大小
      label_font_point: 14                     # 候选编号大小
      line_spacing: 10                         # 行间距(适用于竖排)
      border_height: 4                         # 窗口上下高度，大于圆角半径才生效
      border_width: 4                          # 窗口左右宽度，大于圆角半径才生效
      corner_radius: 5                         # 窗口圆角
      back_color: 0xFFFFFF                     # 候选条背景色
      comment_text_color: 0x999999             # 拼音等提示文字颜色
      hilited_candidate_back_color: 0xF5803B   # 候选文字背景色
      hilited_candidate_text_color: 0xFFFFFF   # 第一候选项文字颜色
      text_color: 0x424242                     # 拼音行文字颜色

    ink:
      name: 墨池
      horizontal: true              # true 横排，false 竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      font_point: 16                           # 候选文字大小
      label_font_point: 14                     # 候选编号大小
      corner_radius: 5                         # 窗口圆角
      line_spacing: 10                         # 行间距(适用于竖排)
      text_color: 0x5a5a5a                     # 拼音等提示文字颜色
      back_color: 0xeeffffff                   # 候选条背景色
      candidate_text_color: 0x000000           # 第一候选项文字颜色
      hilited_text_color: 0x000000             # 高亮拼音 (需要开启内嵌编码)
      hilited_candidate_text_color: 0xffffff   # 第一候选项文字颜色
      hilited_candidate_back_color: 0xcc000000 # 候选文字背景色
      comment_text_color: 0x5a5a5a             # 拼音等提示文字颜色
      hilited_comment_text_color: 0x808080     # 注解文字高亮

    purity:
      name: 纯洁
      horizontal: true              # true 横排，false 竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      font_point: 16                           # 候选文字大小
      label_font_point: 14                     # 候选编号大小
      corner_radius: 5                         # 窗口圆角
      line_spacing: 10                         # 行间距(适用于竖排)
      text_color: 0xc2c2c2                     # 拼音等提示文字颜色
      back_color: 0x444444                     # 候选条背景色
      candidate_text_color: 0xeeeeee           # 第一候选项文字颜色
      hilited_text_color: 0xeeeeee             # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0x444444             # 第一候选项背景背景色
      hilited_candidate_text_color: 0x000000   # 第一候选项文字颜色
      hilited_candidate_back_color: 0xfafafa   # 候选文字背景色
      comment_text_color: 0x808080             # 拼音等提示文字颜色

    starcraft:
      name: 星际争霸
      horizontal: true              # true 横排，false 竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      font_point: 16                           # 候选文字大小
      label_font_point: 14                     # 候选编号大小
      corner_radius: 5                         # 窗口圆角
      line_spacing: 10                         # 行间距(适用于竖排)
      text_color: 0xccaa88                     # 拼音等提示文字颜色
      candidate_text_color: 0x30bb55           # 第一候选项文字颜色
      back_color: 0xee000000                   # 候选条背景色
      border_color: 0x1010a0                   # 边框色
      hilited_text_color: 0xfecb96             # 高亮拼音 (需要开启内嵌编码)
      hilited_back_color: 0x000000             # 第一候选项背景背景色
      hilited_candidate_text_color: 0x70ffaf   # 第一候选项文字颜色
      hilited_candidate_back_color: 0x000000   # 候选文字背景色
      comment_text_color: 0x1010d0             # 拼音等提示文字颜色
      hilited_comment_text_color: 0x1010f0     # 注解文字高亮

    nord_light:
      name: 北方浅色
      horizontal: true              # true 横排，false 竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      font_point: 16                           # 候选文字大小
      label_font_point: 14                     # 候选编号大小
      corner_radius: 5                         # 窗口圆角
      line_spacing: 10                         # 行间距(适用于竖排)
      back_color: 0xF4EFEC                     # 候选条背景色
      border_color: 0xF4EFEC                   # 边框色
      candidate_text_color: 0xC1A181           # 第一候选项文字颜色
      comment_text_color: 0xD0C088             # 拼音等提示文字颜色
      hilited_back_color: 0xF0E9E5             # 第一候选项背景背景色
      hilited_candidate_back_color: 0xE9DED8   # 候选文字背景色
      hilited_candidate_text_color: 0xAC815E   # 第一候选项文字颜色
      hilited_text_color: 0xAD8EB4             # 高亮拼音 (需要开启内嵌编码)
      text_color: 0x7087D0                     # 拼音等提示文字颜色

    nord_dark:
      name: 北方深色
      horizontal: true              # true 横排，false 竖排
      candidate_format: "%c %@ "    # 用 1/6 em 空格 U+2005 来控制编号 %c 和候选词 %@ 前后的空间
      font_point: 16                           # 候选文字大小
      label_font_point: 14                     # 候选编号大小
      corner_radius: 5                         # 窗口圆角
      line_spacing: 10                         # 行间距(适用于竖排)
      back_color: 0x473A33                     # 候选条背景色
      border_color: 0x473A33                   # 边框色
      candidate_text_color: 0xF5D887           # 第一候选项文字颜色
      comment_text_color: 0xE6B687             # 拼音等提示文字颜色
      hilited_back_color: 0x473A33             # 第一候选项背景背景色
      hilited_candidate_back_color: 0x5D4C43   # 候选文字背景色
      hilited_candidate_text_color: 0xC0E077   # 第一候选项文字颜色
      hilited_text_color: 0x6EC8F5             # 高亮拼音 (需要开启内嵌编码)
      text_color: 0x78E8F0                     # 拼音等提示文字颜色
  
  # 特定 App 默认中/英文输入
  app_options:
    com.apple.Spotlight:
      ascii_mode: true
    com.raycast.macos:
      ascii_mode: true
    com.apple.Terminal:
      ascii_mode: true
      vim_mode: true
    com.googlecode.iterm2:
      ascii_mode: true
      vim_mode: true
    com.microsoft.VSCode:
      ascii_mode: true
      ascii_punct: true            # 中文状态输出英文标点(半角)
      vim_mode: true
    org.gnu.Emacs:
      ascii_mode: true
    org.vim.MacVim:
      ascii_mode: true
      vim_mode: true
```

```yaml title:default.custom.yaml fold
patch:
  schema_list:
    - schema: luna_pinyin_simp # 朙月拼音
    #- schema: easy_en
    #- schema: double_pinyin_flypy # 小鹤双拼
    #- schema: double_pinyin # 自然码双拼
    #- schema: numbers # 大写数字

  menu/page_size: 9 # 候选词个数

  # 若 caps 切换大小写无效, 打开 Mac 系统偏好设置 > 键盘 > 输入法 > 取消勾选[使用大写锁定键切换“美国”输入模式]
  ascii_composer/good_old_caps_lock: true # 若为 true， Caps 只切换大小写
  ascii_composer/switch_key:
    Caps_Lock: commit_code # Caps 键
    Shift_L: commit_code # 左 Shift，切换中英文
    Shift_R: commit_code # 右 Shift，切换中英文
    Control_L: noop # 左 Control，屏蔽该切换键
    Control_R: noop # 右 Control，屏蔽该切换键

  key_binder/bindings: # 若开启, 去掉前面#
    # 翻页
    #- { when: has_menu, accept: Tab, send: Page_Down }            # "tab" 键翻页, 和 "tab" 键分词只能二选一
    - { when: composing, accept: Tab, send: Shift+Right } # "tab" 键分词
    - { when: paging, accept: minus, send: Page_Up } # "-" 上一页
    - { when: has_menu, accept: equal, send: Page_Down } # "=" 下一页
    - { when: paging, accept: comma, send: Page_Up } # "," 上一页
    - { when: has_menu, accept: period, send: Page_Down } # "." 下一页
    - { when: paging, accept: bracketleft, send: Page_Up } # "[" 上一页
    - { when: has_menu, accept: bracketright, send: Page_Down } # "]" 下一页
```

```yaml title:luna_pinyin_simp.custom.yaml fold
patch:
  menu/page_size: 9
  punctuator/symbols:
    '/bq': [😄,😊,🙂,🙃,😶,😑,😒,🤔,😞,😟,😠,😔,😕,☹️,😣,😫,😮,😓,😭,]
    '/tq': [☀️, ⛅️, ☁️, 🌧, ⛈, 🌨]
    '/tab': '	'
  punctuator/full_shape:
  punctuator/half_shape:
    '(': '('
    ')': ')'
    '[': '['
    ']': ']'
    '{': '{'
    '}': '}'
    '<': '<'
    '>': '>'
    '"': '"'
    "'": "'"
    ',': ','
    '.': '.'
    ':': ':'
    ';': ';'
    '?': '?'
    '!': '!'
    '\': '、'
    '|': '|'
    #'/': '/'
    '`': '`'
    '~': '~'
    '*': '*'
    '^': '^'
    '%': '%'
    '$': '$'
    '@': '@'
    '#': '#'
    '=': '='
    '_': '_'
    '-': '-'
  recognizer/patterns/reverse_lookup: {}  # 解决反引号无法直接上屏问题
  #"translator/dictionary": luna_pinyin.extended
  engine/+:
    translators/+:
      - lua_translator@date_translator
  # 以下是模糊音设置
  'speller/algebra':
    - erase/^xx$/                      # 第一行保留

    # 模糊音定義
    # 需要哪組就刪去行首的 # 號，單雙向任選
    - derive/^([zcs])h/$1/             # zh, ch, sh => z, c, s
    - derive/^([zcs])([^h])/$1h$2/     # z, c, s => zh, ch, sh

    #- derive/^n/l/                     # n => l
    #- derive/^l/n/                     # l => n

    # 這兩組一般是單向的
    #- derive/^r/l/                     # r => l

    #- derive/^ren/yin/                 # ren => yin, reng => ying
    #- derive/^r/y/                     # r => y

    # 下面 hu <=> f 這組寫法複雜一些，分情況討論
    #- derive/^hu$/fu/                  # hu => fu
    #- derive/^hong$/feng/              # hong => feng
    #- derive/^hu([in])$/fe$1/          # hui => fei, hun => fen
    #- derive/^hu([ao])/f$1/            # hua => fa, ...

    #- derive/^fu$/hu/                  # fu => hu
    #- derive/^feng$/hong/              # feng => hong
    #- derive/^fe([in])$/hu$1/          # fei => hui, fen => hun
    #- derive/^f([ao])/hu$1/            # fa => hua, ...

    # 韻母部份
    - derive/^([bpmf])eng$/$1ong/      # meng = mong, ...
    - derive/([ei])n$/$1ng/            # en => eng, in => ing
    - derive/([ei])ng$/$1n/            # eng => en, ing => in

    # 樣例足夠了，其他請自己總結……

    # 反模糊音？
    # 誰說方言沒有普通話精確、有模糊音，就能有反模糊音。
    # 示例爲分尖團的中原官話：
    #- derive/^ji$/zii/   # 在設計者安排下鳩佔鵲巢，尖音 i 只好雙寫了
    #- derive/^qi$/cii/
    #- derive/^xi$/sii/
    #- derive/^ji/zi/
    #- derive/^qi/ci/
    #- derive/^xi/si/
    #- derive/^ju/zv/
    #- derive/^qu/cv/
    #- derive/^xu/sv/
    # 韻母部份，只能從大面上覆蓋
    #- derive/^([bpm])o$/$1eh/          # bo => beh, ...
    #- derive/(^|[dtnlgkhzcs]h?)e$/$1eh/  # ge => geh, se => sheh, ...
    #- derive/^([gkh])uo$/$1ue/         # guo => gue, ...
    #- derive/^([gkh])e$/$1uo/          # he => huo, ...
    #- derive/([uv])e$/$1o/             # jue => juo, lve => lvo, ...
    #- derive/^fei$/fi/                 # fei => fi
    #- derive/^wei$/vi/                 # wei => vi
    #- derive/^([nl])ei$/$1ui/          # nei => nui, lei => lui
    #- derive/^([nlzcs])un$/$1vn/       # lun => lvn, zun => zvn, ... 
    #- derive/^([nlzcs])ong$/$1iong/    # long => liong, song => siong, ...
    # 這個辦法雖從拼寫上做出了區分，然而受詞典制約，候選字仍是混的。
    # 只有真正的方音輸入方案纔能做到！但「反模糊音」這個玩法快速而有效！

    # 模糊音定義先於簡拼定義，方可令簡拼支持以上模糊音
    - abbrev/^([a-z]).+$/$1/           # 簡拼（首字母）
    - abbrev/^([zcs]h).+$/$1/          # 簡拼（zh, ch, sh）

    # 以下是一組容錯拼寫，《漢語拼音》方案以前者爲正
    - derive/^([nl])ve$/$1ue/          # nve = nue, lve = lue
    - derive/^([jqxy])u/$1v/           # ju = jv,
    - derive/un$/uen/                  # gun = guen,
    - derive/ui$/uei/                  # gui = guei,
    - derive/iu$/iou/                  # jiu = jiou,

    # 自動糾正一些常見的按鍵錯誤
    - derive/([aeiou])ng$/$1gn/        # dagn => dang 
    - derive/([dtngkhrzcs])o(u|ng)$/$1o/  # zho => zhong|zhou
    - derive/ong$/on/                  # zhonguo => zhong guo
    - derive/ao$/oa/                   # hoa => hao
    - derive/([iu])a(o|ng?)$/a$1$2/    # tain => tian

  # 分尖團後 v => ü 的改寫條件也要相應地擴充：
  #'translator/preedit_format':
  #  - "xform/([nljqxyzcs])v/$1ü/"
```

```lua title:rime.lua fold
function date_translator(input, seg)
    if (input == "date") then
        --- Candidate(type, start, end, text, comment)
        yield(Candidate("date", seg.start, seg._end, os.date("%Y-%m-%d"), ""))
        yield(Candidate("date", seg.start, seg._end, os.date("%Y/%m/%d"), ""))
        yield(Candidate("date", seg.start, seg._end, os.date("%Y 年%m 月%d 日"), ""))
        yield(Candidate("date", seg.start, seg._end, os.date("%m-%d"), ""))
    end
    if (input == "time") then
        --- Candidate(type, start, end, text, comment)
        yield(Candidate("time", seg.start, seg._end, os.date("%H:%M"), ""))
        yield(Candidate("time", seg.start, seg._end, os.date("%H:%M:%S"), ""))
    end
    if (input == "week") then
        local weakTab = {'日', '一', '二', '三', '四', '五', '六'}
        yield(Candidate("week", seg.start, seg._end, "周"..weakTab[tonumber(os.date("%w")+1)], ""))
        yield(Candidate("week", seg.start, seg._end, "星期"..weakTab[tonumber(os.date("%w")+1)], ""))
        yield(Candidate("week", seg.start, seg._end, "礼拜"..weakTab[tonumber(os.date("%w")+1)], ""))
    end
end
```

模块化 (参考 https://github.com/hchunhui/librime-lua/wiki/Scripting ):
- 新建 lua 目录
- 在其中新建 date_translator.lua 文件, 剪切上述 rime.lua 中的 `function date_translator` 函数
    - 修改 `function date_translator` 为 `local function translator`
    - 在末尾增加 `return translator`
- 修改 luna_pinyin_simp.custom.yaml 中的 ` lua_translator@date_translator ` 为 `lua_translator@*date_translator`

[emoji](https://github.com/rime/rime-emoji)

1. `bash rime-install emoji`
2. `bash rime-install emoji:customize:schema=luna_pinyin_simp` 运行后将在 custom 文件后添加如下内容 (似乎只支持 pinyin 不支持英文?)
    ```yaml
    __patch:
    # Rx: emoji:customize:schema=luna_pinyin_simp {
      - patch/+:
          __include: emoji_suggestion:/patch
    # }
    ```

词库

`bash rime-install iDvel/rime-ice:others/recipes/cn_dicts`

词库以 .dict.yaml 结尾, 例如
```yaml
---
name: luna_pinyin.extended      # 词库名
version: "0.1"
sort: by_weight                 # by_weight（按词频高低排序）或 original（保持原码表中的顺序）
#use_preset_vocabulary : true     # true 或 false，选择是否导入预设词汇表【八股文】

import_tables:
  - cn_dicts/base

#...
```

载入扩充词库: `"translator/dictionary": luna_pinyin.extended`

[easy-en](https://github.com/BlindingDark/rime-easy-en)
1. `bash rime-install BlindingDark/rime-easy-en`
2. 添加 schema: easy_en
3. 中英混输 `bash rime-install BlindingDark/rime-easy-en:customize:schema=luna_pinyin_simp` (与扩充词库冲突)
    ```yaml
    # Rx: BlindingDark/rime-easy-en:customize:schema=luna_pinyin_simp {
      - patch/+:
          __include: easy_en:/patch
          easy_en/initial_quality: -1.5
          easy_en/enable_sentence: false
          # easy_en/split_sentence: false
    # }
    ```
4. 连续输入增强
    ```lua  title:"rime.lua"
    -- easy_en_enhance_filter: 连续输入增强
    -- 详见 `lua/easy_en.lua`
    local easy_en = require("easy_en")
    easy_en_enhance_filter = easy_en.enhance_filter
    ```


> [!tip] 
> - 缩进以及配置错误可能导致不生效, 建议先移除不必要的设置再测试
> - 尽量用 a/b 的形式修改 (这种方式只会修改 a/b 而不会整个替换 a)

参考
- [GitHub - iDvel/rime-ice: Rime 配置：雾凇拼音 | 长期维护的简体词库](https://github.com/iDvel/rime-ice)
- [GitHub - Mintimate/oh-my-rime: The Simple Config Template Of Rime By Mintimate.](https://github.com/Mintimate/oh-my-rime)
- [GitHub - ssnhd/rime: Rime Squirrel 鼠须管配置文件（朙月拼音、小鹤双拼、自然码双拼）](https://github.com/ssnhd/rime)
- [GitHub - gaboolic/rime-frost: 白霜拼音](https://github.com/gaboolic/rime-frost)
- [GitHub - amzxyz/rime_wanxiang: Rime万象拼音输入方案](https://github.com/amzxyz/rime_wanxiang)
- [GitHub - ayaka14732/awesome-rime: A curated list of Rime IME schemata and configs | Rime 輸入方案和配置列表](https://github.com/ayaka14732/awesome-rime)
- [GitHub - LEOYoon-Tsaw/Rime_collections: All collections for Rime IME](https://github.com/LEOYoon-Tsaw/Rime_collections)
- [小狼毫皮肤编辑器](https://owlzou.github.io/weasel-theme-editor/)

## [东风破 plum](https://github.com/rime/plum)

选择一个目录, 直接把仓库克隆下来, 主要用其中的 `rime-install` 脚本