---
created: 2025-09-20T16:20
modified: 2025-09-28T07:01
tags:
  - Obsidian
---

<!-- truncate -->
# obsidian wiki 链接尝试

对于 Obsidian 的用法, 目前主要可以归为两大阵营:

- 传统阵营: md 链接 + 文件夹 %% 兼容性好, 稳定可控, 缺点是需要自顶向下设计, 灵活性差 %%
- 原生阵营: wiki 链接 + 双链 %% 兼容性一般, 不易于掌控, 优点是自底向上, 灵活性高 %%
    - 数据库 %% 我发现 bases 其实就是文件夹的一种替代. 而且分类信息本就应该由笔记自身持有. %%

很多人可能会反驳说 wiki 链接 + 文件夹也是不冲突的.  
但是, 如果我要求链接的类型是 shortest 呢  
假如使用文件夹
- 如果存在冲突, 那么链接必然退化为路径
- 如果不存在冲突, 又何必要用? 而且破坏了链接与相对路径的等价.

那不用文件夹, 用什么?  
用属性和双链. %% 注意: 这得在你取消文件夹之前完成 %%  
写在笔记的属性里, 比如 Categories. %% 不就相当于标签吗 %%

Minimal 主题作者、Obsidian CEO 的用法: [How I use Obsidian — Steph Ango](https://stephango.com/vault)

- Daily: 每日笔记, 纯链接用
- ~~Categories~~: MOC? 可以通过 `categories.contains(link("xxx"))` 在 Base 中过滤 %% 记不住有哪些 categories 怎么办? 不过感觉用来管理 jottings 还是可以的 %%
- ~~Notes~~: 实际实践中会和 Categories 中的内容一并置于根目录下 %% 我觉得或许有必要区分正式的和非正式的(闪念) %%
- References: where I write about things that exist outside my world? %% 相当于 PARA 中的 Resources %%
- Clippings: 剪藏摘录(其他人写的内容)
- Attachments: 附件(图片、音频、视频、PDF 等)
- Templates
    - Bases

> [!note]+ 意见和想法补充
> - inbox、archives 由 status 字段实现 (不方便用 git 管理)
> - canvas、excalidraw 存放位置?
> - 增加 Scripts 目录存放 Templater、QuickAdd 等脚本文件
> - 相比 PARA 如何?

属性和模板

---

如何实施、过渡?

1. 调整顶层目录结构, 从 Pages 拆分出 References (或者反向操作)
2. 针对每个现有文件夹
    1. 建立类似 foldernote 的 moc, 并关联到上级 moc
    2. 调整笔记内容, 给现有笔记添加分类属性和值
    3. 拆除文件夹
3. 更改链接格式

# 后记

[question+ Pages 中剩下的内容如何组织?]
- 感觉 Jottings 有点多余?
- References 的主观部分有待商榷. 可能只适用纯知识类的, 主题经验类的不太合适.

[note+ before]
- Pages: 所有内容统一在一起, 用文件夹分类. 缺点是不太能够区分纯参考性的笔记和个人原创性笔记.

[note+ after]
- Pages: 仅保留个人笔记
- Thoughts: 思想认知类笔记
- References: 参考性笔记(不排除包含主观部分)

::: note+ full

[list2dt]
- Inbox/ | 临时文件 (同步, 私有)
    - Local/ | 本地文件 (不同步)
- Journals/ | 日记等
- Jottings/ | 非正式笔记、闪念
- Pages/ | 个人笔记? 排除参考性笔记、思想笔记
- Thoughts/ | 思想认知类 (不同于简单的 opinion)
- References/ | 参考性笔记(不排除包含主观成分)
- Clippings/ | 剪藏
- Attachments/ | 附件
- Templates/ | 模板
- Misc/ | 其他
- Ext/ | 外部链接文件

:::

::: note+ vs PARA

- Projects: 用 Inbox 兼替
- Areas: 相当于 Pages + Thoughts
- Resources: 相当于 References + Clippings
- Archives

缺失 Jottings

:::

本质上还是笔记分类的问题  
只有先解决了笔记分类的问题才能进一步决定笔记的组织结构.