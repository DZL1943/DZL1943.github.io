---
created: 2025-08-16T13:52
modified: 2025-10-08T22:21
draft: true
---

# obsidian 首行缩进

要求:
- 仅对正文首行缩进, 其他需排除
- 仅对预览模式、阅读模式生效, 不影响源码模式

## 手动方案

- 全角空格
- html 实体字符 `&ensp;` `&emsp;`

## 一

```css
/* 编辑模式首行缩进,排除标题行 */ 
div.cm-line:not(.HyperMD-header) { 
text-indent: 2em;
}

/* 预览模式首行缩进 */ 
.markdown-preview-view div p { 
text-indent: 2em; 
}
```

- 未排除列表、代码块、引用等特殊段落,会导致非正文内容错误缩进
- 预览模式选择器过于宽泛(`div p`可能影响非正文区域)
- **不支持换行后的缩进**(段落内手动换行的新行无缩进)

## [二](https://forum-zh.obsidian.md/t/topic/40452)

```css
.p-indent {
  /* 2倍字号大小的长度 */
  --indent: calc(var(--font-text-size) * 2);
}
.p-indent :is([class=cm-line], [class="cm-active cm-line"], p) {
  text-indent: var(--indent);
}
.p-indent p > br {
  content: "";
  white-space: pre;
}
.p-indent p > br::after {
  content: "\000A\200B";
  margin-inline-end: var(--indent);
}
```

- 需要手动给元素添加 `.p-indent` 类
- 换行解决方案依赖 `content` 和 `white-space`,可能在某些主题中异常

## [三](https://forum-zh.obsidian.md/t/topic/28562/23)

```css
/* === 段落-首行缩进2个字符 By Linzeal 2024/2/1更新 === */

/* 也包括段落中每个回车换行后的首行缩进 */

:is(
.markdown-source-view .cm-line:not(:is(:has(>.cm-hmd-frontmatter,>br),.HyperMD-header,.HyperMD-list-line,.HyperMD-quote,table .cm-line,.cm-s-obsidian div.HyperMD-codeblock-bg)), /* 编辑模式 */
.markdown-rendered :not(:is(blockquote)) > p /* 阅读模式 text-indent不支持each-line的办法 */
){
  text-indent: 2em !important;
}

.markdown-rendered :not(:is(blockquote)) > p
{
  /*text-indent: 2em each-line !important; 若支持each-line参数则用这个即可,更为简单,就无需下面的修正 */
}

/* 阅读模式下对每个回车换行后的首行缩进的修正 */
.markdown-rendered :not(:is(blockquote)) > p > br
{
  content:'';
  white-space:pre; 
}
.markdown-rendered :not(:is(blockquote))>p>br::after 
{
  content: '\A\0009\00A0\00A0\00A0'; /* Unicode字符编码\0009表示水平制表符,\00A0表示不换行空格,可通过增减、组合搭配这两个Unicode字符来微调回车换行后的首行缩进量 */
}

/* === CSS代码结束 === */
```

## BT 主题

```css

.markdown-source-view.mod-cm6 div.cm-line:not(.HyperMD-header) {
  text-indent: 2em;
}

.markdown-source-view.mod-cm6 div.cm-line:not(.HyperMD-header) .cm-hmd-frontmatter:first-of-type
 {
  margin-left: -2em;
}
.markdown-source-view.mod-cm6 div.has-banner.cm-line:not(.HyperMD-header) .cm-def.cm-hmd-frontmatter,
.markdown-source-view.mod-cm6 div.has-banner.cm-line:not(.HyperMD-header) .collapse-indicator {
  margin-left: 0;
  left: -3em;
}

[data-type="markdown"] div[class="el-p"]:not(blockquote) > p{
  text-indent: 2em;
}

[data-type="markdown"] div[class="el-p"]:not(blockquote) > p>br {
  content: ' ';
  white-space: pre;
  line-height: calc((var(--paragraph-spacing) + 0.3)*1em);
  display:unset;
}
[data-type="markdown"] div[class="el-p"]:not(blockquote) > p>br::after {
   content: '\A\9\A0\A0';
}

```