---
title: Docusaurus with anyblock
created: 2026-01-17T23:50
modified: 2026-01-17T23:51
---

<!-- truncate -->

参考

- https://docusaurus.io/docs/markdown-features/plugins#creating-new-rehyperemark-plugins
- https://github.com/any-block/DocusaurusDemo

1. 安装: `npm install @anyblock/remark-any-block`
2. 参考上述链接, 创建 MDX 插件, 添加 css, 启用.
    1. 创建 MDX 插件: src/remark/anyblock.ts anyblock2.ts
    2. 在 src/css/custom.css 中添加 css
    3. 在 docusaurus.config.js 的 presets 的 docs.remarkPlugins 中添加插件

问题记录

1. 包含删除线会报错
2. 包含数学公式会报错
3. title2tabs 仅第一个正常显示
4. ~~注释没有隐藏~~(无关)
5. fold 无法展开 (lt 正常)

还有如下警告

```
<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Can't resolve './src/remark/anyblock' in 'XXX'
<w> while resolving './src/remark/anyblock' in XXX as file
<w>  at resolve esm file ./src/remark/anyblock
<w>  at file dependencies XXX/docusaurus.config.js
<w>  at file XXX/docusaurus.config.js
<w>  at unknown 0 XXX/docusaurus.config.js
```