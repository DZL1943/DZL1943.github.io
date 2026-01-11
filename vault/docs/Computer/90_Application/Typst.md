---
created: 2024-09-25T16:43
modified: 2024-09-25T16:43
url:
  - https://typst.app
  - https://github.com/typst/typst
  - https://github.com/qjcg/awesome-typst
  - https://typst-doc-cn.github.io/docs/chinese
---

## 安装

- Linux: View [Typst on Repology](https://repology.org/project/typst/versions)
- macOS: brew install typst
- Windows: winget install --id Typst.Typst

## 编辑器

- VSCode: https://github.com/Myriad-Dreamin/tinymist
- Obsidian: https://github.com/fenjalien/obsidian-typst

## [语法](https://typst.app/docs/reference/syntax/)

三种语法模式：Markup、math 和 code

| New mode | Syntax                        | Example                       |
| -------- | ----------------------------- | ----------------------------- |
| Code     | Prefix the code with `#`      | `Number: #(1 + 2)`            |
| Math     | Surround equation with `$..$` | `$-x$ is the opposite of $x$` |
| Markup   | Surround markup with `[..]`   | `let name = [*Typst!*]`       |

https://typst.app/docs/guides/guide-for-latex-users/
### Markup

| Name             | Example                  | See                                                                              |
| ---------------- | ------------------------ | -------------------------------------------------------------------------------- |
| Paragraph break  | Blank line               | [`parbreak`](https://typst.app/docs/reference/model/parbreak/ "`parbreak`")      |
| Strong emphasis  | `*strong*`               | [`strong`](https://typst.app/docs/reference/model/strong/ "`strong`")            |
| Emphasis         | `_emphasis_`             | [`emph`](https://typst.app/docs/reference/model/emph/ "`emph`")                  |
| Raw text         | `` `print(1)` ``         | [`raw`](https://typst.app/docs/reference/text/raw/ "`raw`")                      |
| Link             | `https://typst.app/`     | [`link`](https://typst.app/docs/reference/model/link/ "`link`")                  |
| Label            | `<intro>`                | [`label`](https://typst.app/docs/reference/foundations/label/ "`label`")         |
| Reference        | `@intro`                 | [`ref`](https://typst.app/docs/reference/model/ref/ "`ref`")                     |
| Heading          | `= Heading`              | [`heading`](https://typst.app/docs/reference/model/heading/ "`heading`")         |
| Bullet list      | `- item`                 | [`list`](https://typst.app/docs/reference/model/list/ "`list`")                  |
| Numbered list    | `+ item`                 | [`enum`](https://typst.app/docs/reference/model/enum/ "`enum`")                  |
| Term list        | `/ Term: description`    | [`terms`](https://typst.app/docs/reference/model/terms/ "`terms`")               |
| Math             | `$x^2$`                  | [Math](https://typst.app/docs/reference/math/)                                   |
| Line break       | `\`                      | [`linebreak`](https://typst.app/docs/reference/text/linebreak/ "`linebreak`")    |
| Smart quote      | `'single' or "double"`   | [`smartquote`](https://typst.app/docs/reference/text/smartquote/ "`smartquote`") |
| Symbol shorthand | `~`, `---`               | [Symbols](https://typst.app/docs/reference/symbols/sym/)                         |
| Code expression  | `#rect(width: 1cm)`      | [Scripting](https://typst.app/docs/reference/scripting/#expressions)             |
| Character escape | `Tweet at us \#ad`       | [Below](https://typst.app/docs/reference/syntax/#escapes)                        |
| Comment          | `/* block */`, `// line` | [Below](https://typst.app/docs/reference/syntax/#comments)                       |

### Math mode

| Name                   | Example               | See                                                                           |
| ---------------------- | --------------------- | ----------------------------------------------------------------------------- |
| Inline math            | `$x^2$`               | [Math](https://typst.app/docs/reference/math/)                                |
| Block-level math       | `$ x^2 $`             | [Math](https://typst.app/docs/reference/math/)                                |
| Bottom attachment      | `$x_1$`               | [`attach`](https://typst.app/docs/reference/math/attach/)                     |
| Top attachment         | `$x^2$`               | [`attach`](https://typst.app/docs/reference/math/attach/)                     |
| Fraction               | `$1 + (a+b)/5$`       | [`frac`](https://typst.app/docs/reference/math/frac/)                         |
| Line break             | `$x \ y$`             | [`linebreak`](https://typst.app/docs/reference/text/linebreak/ "`linebreak`") |
| Alignment point        | `$x &= 2 \ &= 3$`     | [Math](https://typst.app/docs/reference/math/)                                |
| Variable access        | `$#x$, $pi$`          | [Math](https://typst.app/docs/reference/math/)                                |
| Field access           | `$arrow.r.long$`      | [Scripting](https://typst.app/docs/reference/scripting/#fields)               |
| Implied multiplication | `$x y$`               | [Math](https://typst.app/docs/reference/math/)                                |
| Symbol shorthand       | `$->$`, `$!=$`        | [Symbols](https://typst.app/docs/reference/symbols/sym/)                      |
| Text/string in math    | `$a "is natural"$`    | [Math](https://typst.app/docs/reference/math/)                                |
| Math function call     | `$floor(x)$`          | [Math](https://typst.app/docs/reference/math/)                                |
| Code expression        | `$#rect(width: 1cm)$` | [Scripting](https://typst.app/docs/reference/scripting/#expressions)          |
| Character escape       | `$x\^2$`              | [Below](https://typst.app/docs/reference/syntax/#escapes)                     |
| Comment                | `$/* comment */$`     | [Below](https://typst.app/docs/reference/syntax/#comments)                    |

### Code mode

| Name                     | Example                     | See                                                                          |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------- |
| None                     | `none`                      | [`none`](https://typst.app/docs/reference/foundations/none/ "`none`")        |
| Auto                     | `auto`                      | [`auto`](https://typst.app/docs/reference/foundations/auto/ "`auto`")        |
| Boolean                  | `false`, `true`             | [`bool`](https://typst.app/docs/reference/foundations/bool/ "`bool`")        |
| Integer                  | `10`, `0xff`                | [`int`](https://typst.app/docs/reference/foundations/int/ "`int`")           |
| Floating-point number    | `3.14`, `1e5`               | [`float`](https://typst.app/docs/reference/foundations/float/ "`float`")     |
| Length                   | `2pt`, `3mm`, `1em`, ..     | [`length`](https://typst.app/docs/reference/layout/length/ "`length`")       |
| Angle                    | `90deg`, `1rad`             | [`angle`](https://typst.app/docs/reference/layout/angle/ "`angle`")          |
| Fraction                 | `2fr`                       | [`fraction`](https://typst.app/docs/reference/layout/fraction/ "`fraction`") |
| Ratio                    | `50%`                       | [`ratio`](https://typst.app/docs/reference/layout/ratio/ "`ratio`")          |
| String                   | `"hello"`                   | [`str`](https://typst.app/docs/reference/foundations/str/ "`str`")           |
| Label                    | `<intro>`                   | [`label`](https://typst.app/docs/reference/foundations/label/ "`label`")     |
| Math                     | `$x^2$`                     | [Math](https://typst.app/docs/reference/math/)                               |
| Raw text                 | `` `print(1)` ``            | [`raw`](https://typst.app/docs/reference/text/raw/ "`raw`")                  |
| Variable access          | `x`                         | [Scripting](https://typst.app/docs/reference/scripting/#blocks)              |
| Code block               | `{ let x = 1; x + 2 }`      | [Scripting](https://typst.app/docs/reference/scripting/#blocks)              |
| Content block            | `[*Hello*]`                 | [Scripting](https://typst.app/docs/reference/scripting/#blocks)              |
| Parenthesized expression | `(1 + 2)`                   | [Scripting](https://typst.app/docs/reference/scripting/#blocks)              |
| Array                    | `(1, 2, 3)`                 | [Array](https://typst.app/docs/reference/foundations/array/)                 |
| Dictionary               | `(a: "hi", b: 2)`           | [Dictionary](https://typst.app/docs/reference/foundations/dictionary/)       |
| Unary operator           | `-x`                        | [Scripting](https://typst.app/docs/reference/scripting/#operators)           |
| Binary operator          | `x + y`                     | [Scripting](https://typst.app/docs/reference/scripting/#operators)           |
| Assignment               | `x = 1`                     | [Scripting](https://typst.app/docs/reference/scripting/#operators)           |
| Field access             | `x.y`                       | [Scripting](https://typst.app/docs/reference/scripting/#fields)              |
| Method call              | `x.flatten()`               | [Scripting](https://typst.app/docs/reference/scripting/#methods)             |
| Function call            | `min(x, y)`                 | [Function](https://typst.app/docs/reference/foundations/function/)           |
| Argument spreading       | `min(..nums)`               | [Arguments](https://typst.app/docs/reference/foundations/arguments/)         |
| Unnamed function         | `(x, y) => x + y`           | [Function](https://typst.app/docs/reference/foundations/function/)           |
| Let binding              | `let x = 1`                 | [Scripting](https://typst.app/docs/reference/scripting/#bindings)            |
| Named function           | `let f(x) = 2 * x`          | [Function](https://typst.app/docs/reference/foundations/function/)           |
| Set rule                 | `set text(14pt)`            | [Styling](https://typst.app/docs/reference/styling/#set-rules)               |
| Set-if rule              | `set text(..) if ..`        | [Styling](https://typst.app/docs/reference/styling/#set-rules)               |
| Show-set rule            | `show par: set block(..)`   | [Styling](https://typst.app/docs/reference/styling/#show-rules)              |
| Show rule with function  | `show raw: it => {..}`      | [Styling](https://typst.app/docs/reference/styling/#show-rules)              |
| Show-everything rule     | `show: columns.with(2)`     | [Styling](https://typst.app/docs/reference/styling/#show-rules)              |
| Context expression       | `context text.lang`         | [Context](https://typst.app/docs/reference/context/)                         |
| Conditional              | `if x == 1 {..} else {..}`  | [Scripting](https://typst.app/docs/reference/scripting/#conditionals)        |
| For loop                 | `for x in (1, 2, 3) {..}`   | [Scripting](https://typst.app/docs/reference/scripting/#loops)               |
| While loop               | `while x < 10 {..}`         | [Scripting](https://typst.app/docs/reference/scripting/#loops)               |
| Loop control flow        | `break, continue`           | [Scripting](https://typst.app/docs/reference/scripting/#loops)               |
| Return from function     | `return x`                  | [Function](https://typst.app/docs/reference/foundations/function/)           |
| Include module           | `include "bar.typ"`         | [Scripting](https://typst.app/docs/reference/scripting/#modules)             |
| Import module            | `import "bar.typ"`          | [Scripting](https://typst.app/docs/reference/scripting/#modules)             |
| Import items from module | `import "bar.typ": a, b, c` | [Scripting](https://typst.app/docs/reference/scripting/#modules)             |
| Comment                  | `/* block */`, `// line`    | [Below](https://typst.app/docs/reference/syntax/#comments)                   |

## 样式

- set
    - text
    - page
    - par
    - heading
    - document
- show

https://typst.app/docs/guides/page-setup-guide/

## 脚本

- 表达式
- 块
    - 代码块
    - 内容块

## 模板

## 示例

```typst
#set text(
  font: "Menlo",
  size: 20pt
)

= heading 1

+ The climate
  - Temperature
  - Precipitation
+ The topography
+ The geology
```