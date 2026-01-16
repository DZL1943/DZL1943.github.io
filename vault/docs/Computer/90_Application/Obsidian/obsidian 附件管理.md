---
created: 2024-08-10T17:41
modified: 2025-10-10T13:58
---

<!-- truncate -->

## 需求

- 附件的保存位置
    - 根目录
    - 指定文件夹: 由插件管理
    - 当前文件夹: 默认
    - 当前文件夹下的指定文件夹
    - 按目录
    - 按类型
    - 按标签
- ! 附件重命名[^1]
    - 原始文件名
    - 笔记名+
    - 时间戳
    - uuid
    - md5: 稳定、独立, 避免受意外更新影响
    - 序号
- 附件清理
- 附件查看
- 附件处理
    - 转换
    - 压缩
    - 标注

## 插件

### 管理类

- [ ] [Attachment Pro](https://github.com/vran-dev/obsidian-attachment-pro): 对附件位置的自定义较好(支持分别设置), 不支持更新
- [ ] Attachment Manager: 貌似有些不足
- [x] Attachment Management: 自定义附件路径和名称(` {root path}/{attachment path}/{attachment name}.extension `), 并支持更新; 支持按扩展名设置
- [ ] Attachment Name Formatting: 按序号命名
- [ ] Custom Attachment Location: 没有优势
- [ ] Unique attachments
- [ ] Consistent attachments and links: 无关
- [ ] [AttachFlow](https://github.com/Yaozhuwa/AttachFlow)
    - 点击查看大图
    - 右键
        - Copy
        - Reveal
        - **Rename**
        - Delete
    - 拖拽调节大小
- [ ] Awesome Image: 基于 Image Toolkit, 自定义程度不高
- [ ] Image Toolkit: 点击图片弹出查看(支持贴图模式), 底部有工具栏可供操作(放大缩小、旋转、复制、反色), 文件内所有图片也将显示在底部
- [x] Image Converter
    - Convert
        - WebP
        - JPG
        - PNG
    - Compress
    - Output
        - path
        - name
        - link
    - Resize/Non-destructive resize (by dragging/scrollwheel)
        - Fit
        - Fill
        - Longest/Shortest Edge
        - Width/Height
    - Copy
    - Delete
    - Annotate
- [ ] Image Upload Toolkit
- [ ] Image auto upload
- [ ] Local images plus
- [x] Janitor
    - Orphans
    - Empty
    - Big
    - Expired
- [ ] Nuke Orphans
- [ ] File Cleaner Redux

### 排版类

- [ ] Vault Explorer: Grid/List/Feed/Table
- [ ] Notes Explorer: Gallery/Masonry, 仅显示笔记
- [ ] Media Companion: 仅显示附件
- [ ] Image Picker
- [ ] Note Gallery: Masonry, 需要配置代码块
- [ ] Lite Gallery: 需配置代码块
- [ ] Image Layouts
- [ ] Media Slider

## 实践

- 统一路径管理, 好处是笔记移动时不用跟随处理, 并且也有利于多处引用.
- 对不由插件管理的附件, 指定一个默认位置
- 由插件管理的附件, 以 md5 命名.(避免受意外更新影响)

[^1]: 编辑模式选择链接右键-重命名