---
created: 2024-04-22T20:39
modified: 2024-05-21T16:59
aliases:
  - Bash
---

## 保留字

| if   | then | elif   | else   | fi       | time |
|------|------|--------|--------|----------|------|
| for  | in   | until  | while  | do       | done |
| case | esac | coproc | select | function |
| `{`    | `}`    | `[[`     | `]]`     | !        |

## 变量

## 运算符

## 数据结构

数组、关联数组

## 控制流

- 条件
    - if
        - `-e` True if file exists (regardless of type)
        - `-d` True if file exists and is a directory
        - `-f` True if file exists and is a regular file
        - `-n` True if the length of string is nonzero
        - `-z` True if the length of string is zero
    - case
    - select
    - `((…))`
    - `[[…]]`
- 循环
    - until `until test-commands; do consequent-commands; done`
    - while `while test-commands; do consequent-commands; done`
    - for
        - `for name [ [in [words …] ] ; ] do commands; done`
        - `for (( expr1 ; expr2 ; expr3 )) ; do commands ; done`
- 分组
    - `()`
    - `{}`
- 协同

## 函数

`fname () compound-command [ redirections ]` 或 `function fname [()] compound-command [ redirections ]`

- 位置参数 `${N}`
- 特殊参数
    - `*`
    - `@`
    - `#`
    - `?`
    - `-`
    - `$`
    - `!`
    - `0`

## Shell Expansions

- brace expansion
- tilde expansion
- parameter and variable expansion
- command substitution
- arithmetic expansion
- word splitting
- filename expansion

## 重定向

## 内置命令

- [Bourne Shell Builtins](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Bourne-Shell-Builtins)
    - :
    - .
    - break
    - cd
    - continue
    - eval
    - exec
    - exit
    - export
    - false
    - getopts
    - hash
    - pwd
    - readonly
    - return
    - shift
    - test
    - \[
    - times
    - trap
    - true
    - umask
    - unset
- [Bash Builtin Commands](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Bash-Builtins)
    - alias
    - bind
    - builtin
    - caller
    - command
    - declare
    - echo
    - enable
    - help
    - let
    - local
    - logout
    - mapfile
    - printf
    - read
    - readarray
    - source
    - type
    - typeset
    - ulimit
    - unalias
- [Modifying Shell Behavior](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Modifying-Shell-Behavior)
    - set
    - shopt
- [Special Builtins](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Special-Builtins)

## 作业控制

## 参考

- https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html  
- https://google.github.io/styleguide/shellguide.html  
- https://linuxcommand.org/lc3_man_page_index.php#builtins