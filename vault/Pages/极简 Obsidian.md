---
title: 极简 Obsidian
created: 2026-01-18T18:46
modified: 2026-02-13T19:46
tags:
  - Obsidian
url:
  - https://mp.weixin.qq.com/s/GnvV2zEBFKF9XJg49SAEdQ
---

<!-- truncate -->

# 极简 Obsidian

## 设置 Settings

- **内部链接类型**: **相对路径**
- **使用 Wiki 链接**: **否**

## 样式 Snippets

> [!tip] 默认主题足矣

```css fold
body {
  --h1-color: var(--color-red);
  --h2-color: var(--color-orange);
  --h3-color: var(--color-yellow);
  --h4-color: var(--color-green);
  --h5-color: var(--color-blue);
  --h6-color: var(--color-purple);
  --bold-color: var(--color-red);
  --italic-color: var(--color-orange);
  --file-line-width: min(85vw, 1200px);
}

.cm-strikethrough,
del {
  color: var(--text-faint);
}
u,ins {
  text-decoration: none;
  border-bottom: 3px solid var(--color-accent);
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 3px;
}

/* list */
ul > li.task-list-item[data-task="x" i],
.markdown-source-view.mod-cm6 .HyperMD-task-line[data-task="x" i] {
  text-decoration: none;
}

/* table */
.markdown-preview-view tr,
.markdown-rendered tr {
  &:nth-child(odd) {
    background-color: var(--background-primary);
  }
  &:nth-child(even) {
    background-color: var(--background-secondary);
  }
}

/* code */
.cm-s-obsidian .cm-inline-code:not(.cm-formatting),
.markdown-rendered :not(pre) > code {
  color: var(--color-pink) !important;
}
.markdown-rendered pre:not([class*="language-"]) code {
  color: var(--color-pink) !important;
}
```

## 插件 Plugins

> [!note] 最小化插件推荐

%%[lt]%%
- better-markdown-links | 相对路径修复
- cmdr | 自定义界面按钮
- easy-typing-obsidian | 输入增强
- editing-toolbar | 工具栏(新手必备)
- float-search | 悬浮搜索
- fuzzy-chinese-pinyin | 快速切换支持拼音
- notebook-navigator | 文件列表终极替代
- obsidian-heading-shifter | 快速切换标题层级
- obsidian-linter | 格式化
- obsidian-outliner | 列表大纲增强
- quickadd | "插件终结者"
- various-complements | 补全
- virtual-linker | 虚拟链接

## 分类 Structure

%%[dir]%%
- Inbox/ | 收集箱
- Journals/ | 日志
- Pages/ | 博客
- Thoughts/ | 思想
- Projects/ | 项目
- Areas/ | 知识
- Resources/ | 资料
- Archives/ | 归档
- Attachments/ | 附件
- Misc/ | 其他辅助文件
    - Templates/ | 模板
    - Scripts/ | 脚本

> [!tip] 
> 可将 .obsidian 集中存放到公共目录, 通过软链接的方式使用, 这样可以减少配置冗余, 同时分离内容与配置, 使提交历史纯净.  
> Templates、Scripts 等公共内容也可采用类似的方式管理.

## 实践 Tips

### 同步、备份、加密

> [!tldr] Syncthing + Git + Kopia

同步
- 本地
    - [Syncthing](https://syncthing.net/)
    - FolderSync
- 云
    - [Obsidian 官方同步](https://obsidian.md/sync)
    - iCloud
    - OneDrive
    - [Remotely Save](https://obsidian.md/plugins?id=remotely-save) 插件
    - [LiveSync](https://obsidian.md/plugins?id=obsidian-livesync) 插件

备份
- 本地
    - [Git](https://git-scm.com)
    - [Kopia](https://kopia.io/)
    - cp `cp -rP ~/Documents/Obsidian/. ~/bak/Obsidian/$(date +%F)/`
    - rsync `rsync -av --no-links --delete --exclude={'.git/','.trash/'} ~/Documents/Obsidian/ ~/bak/Obsidian/$(date +%F)/`
    - 压缩 `cd ~/bak/Obsidian/$(date +%F) && zip -r ../$(date +%Y%m%d%H%M%S).zip . -x "*.git*" "*.trash*" -e`
    - 解压缩 `unzip *.zip -d Obsidian`
- 云

加密

### 导入、导出、剪藏、发布

导入
- [Importer](https://obsidian.md/plugins?id=obsidian-importer) 插件

导出
- 图片
    - obsidian-export-image 插件
- md
    - linked-note-exporter 插件
    - [obsidian-export](https://github.com/zoni/obsidian-export)
- pdf
    - better-export-pdf 插件
- word
- html
    - webpage-html-export 插件

剪藏
-  [Obsidian Web Clipper](https://obsidian.md/clipper)

发布
- [Share to NotionNext](https://github.com/jxpeng98/obsidian-to-NotionNext) 插件
- [note-to-mp](https://github.com/sunbooshi/note-to-mp) 插件
- [WeChat Markdown Editor](https://github.com/doocs/md)
- [Enveloppe](https://github.com/Enveloppe/obsidian-enveloppe) 插件
- [Digital Garden](https://dg-docs.ole.dev/) 插件
- [Quartz](https://github.com/jackyzha0/quartz)
- [Perlite]( https://github.com/secure-77/Perlite)
- [Flowershow](https://flowershow.app/)

> [!tip] 导出、发布建议参考思源

### 草稿速记

### 日记待办

### AI

- [obsidian-agent-client](https://github.com/RAIT-09/obsidian-agent-client)

## 参考 References

- [Obsidian Help](https://help.obsidian.md/)
- [Obsidian Developer Docs](https://docs.obsidian.md/)
- [obsidian-skills](https://github.com/kepano/obsidian-skills)
- [PKMer](https://pkmer.cn/)