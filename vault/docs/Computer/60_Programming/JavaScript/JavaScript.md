---
created: 2023-07-03T07:03
modified: 2026-01-10T19:01
url:
  - https://babeljs.io/docs/learn
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
---

## 基本语法

- 注释: 类 C 风格
- (可选)语句用分号结尾

## 变量声明

- var: 声明全局或局部变量 (在函数内声明的变量)
- let: 声明块级作用域的局部变量
- const: 常量

> [!note] var 和 let 的差异
> - let 支持块级作用域, var 仅支持函数级作用域
> - 均会被变量提升, 但访问 undefined 的 let 会报 ReferenceError. (即可以直接 `a=2` 这样定义, 但在严格模式下会报错)
> - 全局 var 相当于全局对象 window 的属性 (let 则不会)

严格模式: 在文件、函数顶部 `"use strict;"`

## 八种数据类型

- Boolean
- null: 初始化为空, 原型链的顶端
- undefined: 未初始化
- Number: 均为 double
- BigInt
- String
- Symbol
- Object: 通过 new 创建

```JavaScript
"37" - 7 // 30
"37" + 7 // "377"
```

```JavaScript
var foo = {a: "alpha", 2: "two"};
console.log(foo.a);    // alpha
console.log(foo[2]);   // two
//console.log(foo.2);  // SyntaxError: missing ) after argument list
//console.log(foo[a]); // ReferenceError: a is not defined
console.log(foo["a"]); // alpha
console.log(foo["2"]); // two
```

## 条件判断

- if/else if
- switch/case/default

错误的值 (falsy values)

- false: (`new Boolean (false)` 为真)
- understand
- null
- 0
- NaN
- 空字符串

## 循环迭代

- c-for
- for in: 枚举属性
- for of: 枚举元素
- while
- do-while

```JavaScript
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
  console.log(i); // 输出 "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); // 输出 "3", "5", "7"
}

// 注意 for...of 的输出没有出现 "hello"
```

> 数组还有 forEach 方法

## 函数

> 函数是 Function 的实例

函数表达式

```JavaScript
// 函数名是可选的
const factorial = function fac(n) {return n<2 ? 1 : n*fac(n-1)};

console.log(factorial(3));
```

嵌套和闭包

arguments

默认参数

剩余参数 `...args`

箭头函数

预定义函数 (build-in)

## 表达式与运算符

- 赋值
- 比较
- 算术
- 位
- 逻辑
- 字符串
- 条件
- 逗号
- 一元
- 关系

## 数字、日期、字符串、正则表达式

## Array、Map、Set

## 对象和类

属性

构造函数

原型继承

方法: 值为函数的对象属性

比较对象

[details of javaScript's objects model](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

[JavaScript classes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)

## 事件循环

## Promise

## 元编程

## 模块化