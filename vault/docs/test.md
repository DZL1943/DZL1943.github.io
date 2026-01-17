---
draft: true
---

# @anyblock/remark-any-block 问题记录

1. 包含删除线会报错
2. 包含数学公式会报错
3. title2tabs 仅第一个正常显示

还有如下警告

<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Can't resolve './src/remark/anyblock' in 'XXX'
<w> while resolving './src/remark/anyblock' in XXX as file
<w>  at resolve esm file ./src/remark/anyblock
<w>  at file dependencies XXX/docusaurus.config.js
<w>  at file XXX/docusaurus.config.js
<w>  at unknown 0 XXX/docusaurus.config.js