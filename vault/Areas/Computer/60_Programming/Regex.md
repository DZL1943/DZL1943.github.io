## 元字符

```
. 匹配除换行之外的任何单个字符
^ 行首
$ 行尾
* {0,}
+ {1,}
? {0,1}
{ }
[ ] 集合
\ 转义
| 或
( ) 捕获
```

## 转义、序列

```
\d 匹配一个数字, 等价于 [0-9]
\D 匹配一个非数字字符, 等价于 [^0-9]
\s 匹配一个空白字符，包括空格、制表符、换页符和换行符
\S 匹配一个非空白字符
\w 匹配一个单字字符, 等价于 [a-zA-Z0-9_]
\W 匹配一个非单字字符, 等价于 [^a-zA-Z0-9_]
```

## 断言

```
x(?=y) 先行断言
x(?!y) 先行否定断言
(?<=y)x 后行断言
(?<!y)x 后行否定断言
```

## 分组和引用

```
(x) 捕获组
(?<Name>x) 具名捕获组
(?:x) 非捕获组
```

## 参考

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_expressions
- https://www.runoob.com/regexp/regexp-metachar.html
