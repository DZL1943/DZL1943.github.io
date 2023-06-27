---
created: 2026-01-04
---

Docusaurus 默认的首页包含很多我们不需要的元素, 简单地移除还会有一些问题, 以下是我的调整记录和解决办法.

<!-- truncate -->

首页大致包括如下部分, 绝大多数的调整在 docusaurus.config 的 themeConfig 里

- navbar: 几乎无需调整
- header: .hero 区域
- main: 移除或替换 HomepageFeatures
- footer: 移除或替换 links

移除 HomepageFeatures 后, header 下面存在空白区域, 无法全部占满.

解决办法:

```css
.hero {
    flex: 1;
}
```

(可选) 移除或更换背景色
```css
.hero--primary {
  --ifm-hero-background-color: var(--ifm-background-color);
  --ifm-hero-text-color: var(--ifm-font-color-base);
}
```

![](<../Attachments/1767854664276-570502.png>)