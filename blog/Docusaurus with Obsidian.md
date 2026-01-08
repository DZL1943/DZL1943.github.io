
如何将 Docusaurus 与 Obsidian 协同?

如何同时处理 docs 和 blog 两种类型?

如何处理附件和链接?

<!-- truncate -->

在现有的目录结构下, 应该做不到兼容 docs、blog 两者吧.

因为如果把整个 Docusaurus website 目录当作 vault, 会有很多不相干的东西, 比如 build、node_modules.

可以通过多实例, 把外部内容包含进来.
但我还是想基于现有目录结构.

那就只能分库处理了.  
并且附件应统一存放, 用相对链接. 后续调整为静态资源也更加方便.