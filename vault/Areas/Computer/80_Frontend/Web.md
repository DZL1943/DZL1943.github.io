---
created: 2026-01-08T09:06
modified: 2026-01-11T20:32
---

:::tip[MDN 里面的内容链接很乱, 因为杂糅了指南、教程、参考, 内容的准确性和完整性也有待鉴别]

- 如果想了解全貌, 建议看 All 里面的左侧大纲 (常用的已经在导航栏了)
- 如果想从零学习, 可从 Learn 入口

:::

## HTML

[HTML Standard](https://html.spec.whatwg.org/multipage/)

- [主根元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#主根元素)
- [文档元数据](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#文档元数据)
- [分区根元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#分区根元素)
- [内容分区](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#内容分区)
- [文本内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#文本内容)
- [内联文本语义](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#内联文本语义)
- [图片和多媒体](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#图片和多媒体)
- [内嵌内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#内嵌内容)
- [SVG 和 MathML](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#svg_和_mathml)
- [脚本](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#脚本)
- [编辑标识](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#编辑标识)
- [表格内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#表格内容)
- [表单](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#表单)
- [交互元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#交互元素)
- [Web 组件](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#web_组件)
- [过时的和弃用的元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements#过时的和弃用的元素)

## CSS

[Cascading Style Sheets](https://www.w3.org/Style/CSS/)

- Anchor positioning
- Animations
- Backgrounds and borders
- Basic user interface
- Borders and box decorations
- Box alignment
- Box model  
    ![](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/boxmodel.png)
- Box sizing
- Cascading and inheritance
    - User-agent stylesheets
    - Author stylesheets
    - User stylesheets
- Color adjustment
- Colors
    - sRGB: `hsl()`, `hwb()`, and `rgb()`.
    - CIELAB: `lab()` and `lch()`.
    - Oklab: `oklab()` and `oklch()`.
    - Other: `color()`, `device-cmyk()`.
- Compositing and blending
- Conditional rules
- Containment
- Counter styles
- CSSOM view
    - 坐标系
    - 视口
- Custom functions and mixins
- Custom highlight API
- Custom properties for cascading variables
- **[Display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display)**  
    ![](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_and_inline_layout/mdn-horizontal.png)  
    https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout  
    https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides  
    https://developer.mozilla.org/zh-CN/docs/Web/CSS/How_to/Layout_cookbook  
    - outside
        - block (默认)
        - inline
    - inside
        - flow (默认)
        - flow-root
        - table
        - flex
        - grid
        - ruby
    - listitem
    - internal
    - box
        - contents
        - none
    - legacy 单个关键字
        - inline-block
        - inline-table
        - inline-flex
        - inline-grid
- Easing functions
- Environment variables
- Filter effects
- *Flexible box layout*
- Font loading
- Fonts
- Fragmentation
- Generated content
- *Grid layout*
- Images
- Inline layout
- *Lists* and counters
- Logical properties and values
- Masking
- *Media queries*
- Motion path
- *Multi-column layout*
- Namespaces
- Nesting
- Overflow
- Overscroll behavior
- Paged media
- **[Positioned layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/position)**  
    https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/CSS_layout/Positioning  
    - static
    - relative
    - absolute
    - fixed
    - sticky
- Properties and values API
- Pseudo-elements
- Round display
- Ruby layout
- Scoping
- Scroll anchoring
- Scroll snap
- Scroll-driven animations
- Scrollbars styling
- **Selectors**
    - 基本选择器
        - 通用选择器 `*`
        - 元素选择器 `elementname`
        - 类选择器 `.classname`
        - ID 选择器 `#idname`
        - 属性选择器 `[attr=value]`
    - 分组选择器
        - 选择器列表 `A, B`
    - 组合器
        - 后代组合器 `A B`
        - 直接子代组合器 `A > B`
        - 一般兄弟组合器 `A ~ B`
        - 紧邻兄弟组合器 `A + B`
        - 列组合器 `A || B`
    - 伪选择器 (Pseudo)
        - 伪类 `:`
        - 伪元素 `::`
- Shadow parts
- Shapes
- Syntax
- *Table*
- Text
    - wrapping and breaking
    - whitespace
- Text decoration
- *Transforms*
- *Transitions*
- Values and units
    - Absolute length units (cm, in, mm, pc, pt, px, Q)
    - Angle units (deg, grad, rad, turn)
    - Default viewport units (vb , vh, vi , vmax, vmin, vw)
    - Dynamic viewport units (dvb, dvh, dvi, dvmax, dvmin, dvw)
    - Frequency units (Hz, kHz)
    - Large viewport-percentage units (lvb, lvh, lvi, lvmax, lvmin, lvw)
    - Local font-relative length units (cap, ch, em, ex, ic, lh)
    - Physical units (cm, in, mm, pc, pt, Q)
    - Relative length units (cap, ch, em, ex, ic, lh, rem, rlh, vb, vh, vi, vmax, vmin, vw)
    - Resolution units (dpcm, dpi , dppx, x)
    - Root font-relative length units (rcap, rch, rem, rex, ric, rlh)
    - Small viewport-percentage unit (svb, svh, svi, svmax, svmin, svw)
    - Time units (ms, s)
    - Viewport units (dvh, dvw, lvh, lvw, svh, svw, vb , vh, vi , vmax, vmin, vw)
    - Visual angle unit (px)
- View transitions
- Viewport
- Writing modes

## JavaScript

## Web API