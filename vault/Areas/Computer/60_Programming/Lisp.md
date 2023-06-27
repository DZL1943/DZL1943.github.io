---
created: 2025-04-18T14:10
modified: 2025-04-18T14:10
url:
  - https://lisp-lang.org/
  - https://common-lisp.net/
  - https://www.lispworks.com/documentation/HyperSpec/Front/Contents.htm
---

## 安装

```shell
brew install sbcl
```

```shell
curl -o /tmp/ql.lisp http://beta.quicklisp.org/quicklisp.lisp

sbcl --no-sysinit --no-userinit --load /tmp/ql.lisp \
       --eval '(quicklisp-quickstart:install :path "~/.quicklisp")' \
       --eval '(ql:add-to-init-file)' \
       --quit
```

```shell
sbcl --eval '(ql:quickload :quicklisp-slime-helper)' --quit
```

```lisp
(format t "Hello, world!")
```

## 语法

### 变量

### 数据结构

### 控制结构

### 函数

### 宏

## 库

## 参考

- 《[Practical Common Lisp](https://gigamonkeys.com/book/)》 —— Peter Seibel
- 《ANSI Common Lisp》—— Paul Graham
- 《On Lisp》—— Paul Graham
- 《Land of Lisp》—— Conrad Barski
- 《Let Over Lambda》
- 《Professional Automated Trading》
- 《Principles of Biomedical Informatics》
- 《Common Lisp Recipes》
- 《Common Lisp in the Wild》
- 《[The Common Lisp Cookbook](https://lispcookbook.github.io/cl-cookbook/)》