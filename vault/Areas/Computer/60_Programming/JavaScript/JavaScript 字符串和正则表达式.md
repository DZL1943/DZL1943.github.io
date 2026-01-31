---
title: JavaScript 字符串和正则表达式
created: 2026-02-10T21:01
modified: 2026-02-10T21:01
---

# JavaScript 字符串和正则表达式

## 字符串

字符串字面量可以使用单引号或者双引号指定,它们的处理方式相同,或者使用反引号字符

字符串可以通过字符串字面量创建为原始值,也可以通过`String()`构造函数创建为字符串对象

JavaScript 将自动包装原始字符串并在包装对象上调用方法或执行属性查找.

字符串基本上表示为 UTF-16 码元的序列

[实例方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#实例方法)

## 正则表达式

字面量: 由斜杠 (/) 包围

构造函数 `RegExp`

[flags](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp#flags)
- g: 全局匹配
- i: 忽略大小写
- m: 多行匹配
- s: 点号匹配所有字符
- u: unicode
- y: sticky

[正则表达式 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions#编写一个正则表达式的模式)

与字符串转换
```js
r = /(?:)/
r.source === new RegExp(r.source).source
```