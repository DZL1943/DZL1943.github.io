---
created: 2023-07-08T11:54
modified: 2026-01-10T19:02
---

## hello-world

```shell
cargo new hello && cd "$_"
```

```rust title:"src/main.rs"
fn main() {
    //println!("Hello, world!");
    for c in "Hello 世界!\n".chars() {
        print!("{}", c)
    }
}
```

## 词法

- 注释
    - 行 `//`
    - 块 `/* */`
- 文档注释
    - 行 `///`
    - 块 `/** */`
- 包、模块注释
    - 行 `//!`
    - 块 `/*! */`
- **语句**分隔符 `;`
- 标识符/ [关键字](https://doc.rust-lang.org/book/appendix-01-keywords.html)
- [运算符](https://doc.rust-lang.org/book/appendix-02-operators.html)

## 变量

- let
    - mut **默认是不可变的**
- const
- static

**静态变量和常量的区别**

- 静态变量不会被内联，在整个程序中，静态变量只有一个实例，所有的引用都会指向同一个地址
- 存储在静态变量中的值必须要实现 Sync trait

## 作用域、所有权、生命周期

1. Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
2. 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
3. 当所有者(变量)离开作用域范围时，这个值将被丢弃(drop)

**获取变量的引用，称之为借用(borrowing)**

**同一作用域，特定数据只能有一个可变引用**

**可变引用与不可变引用不能同时存在**

每一个引用都有其 **生命周期**（_lifetime_），也就是引用保持有效的作用域。
- 编译器为每一个引用参数都分配一个生命周期参数
- 如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数
- 如果方法有多个输入生命周期参数并且其中一个参数是 `&self` 或 `&mut self`，说明是个对象的方法 (method)，那么所有输出生命周期参数被赋予 `self` 的生命周期

slice, 例如 `&[i32]`

'static

## 数据类型

- 标量
    - 整数
        - 有符号例如 i32 i64
        - 无符号例如 u32 u64
    - 浮点: f32 f64
    - 布尔 bool: true, false
    - 字符 char
- 复合
    - 元组 `(,)`
    - 数组 `[,]`

## 结构体

> 形式上类似 JavaScript 的对象

关联函数 impl

不是方法的关联函数经常被用作返回一个结构体新实例的构造函数

`Self` 指代被实现方法的结构体类型，`self` 指代此类型的实例

## 枚举和模式匹配

## [collections](https://doc.rust-lang.org/std/collections/index.html)

> 集合指向的数据储存在堆上

- `Vec<_>`: 注意不是数组
- String: A `String` is a wrapper over a `Vec<u8>`
    - **Rust 中的字符是 Unicode 类型，因此每个字符占据 4 个字节内存空间，但是在字符串中不一样，字符串是 UTF-8 编码，也就是字符串中的字符所占的字节数是变化的(1 - 4)**
    - Rust 在语言级别，只有一种字符串类型： `str`
    - 字符串字面量是切片
    - 不支持索引操作
- HashMap: 看上去不太好用

## 控制流

- 条件
    - if/else if
- 循环
    - loop
        - break 可以返回值
        - 支持标签
    - while
    - for in

## 函数

```rust
fn add(i: i32, j: i32) -> i32 {
   i + j
 }
```

不支持重载、剩余参数、默认参数/命名参数

支持将函数绑定到变量

函数参数的三种传入方式：转移所有权 FnOnce、可变借用 FnMut、不可变借用 Fn

闭包是**一种匿名函数，它可以赋值给变量也可以作为参数传递给其它函数，不同于函数的是，它允许捕获调用者作用域中的值**

**闭包实现了哪种 Fn 特征取决于该闭包如何使用被捕获的变量，而不是取决于闭包如何捕获它们**
- 所有的闭包都自动实现了 FnOnce 特征，因此任何一个闭包都至少可以被调用一次
- 没有移出所捕获变量的所有权的闭包自动实现了 FnMut 特征
- 不需要对捕获变量进行改变的闭包自动实现了 Fn 特征

## 错误处理

## 泛型

## trait

**每一个特征都是一个可以通过名称来引用的动态大小类型**

## 指针

**指针是一个包含了内存地址的变量，该内存地址引用或者指向了另外的数据**

- 引用(& 和 &mut)
- 裸指针(`*const` 和 `*mut`)
- 智能指针
    - `Box<T>`，可以将值分配到堆上
    - `Rc<T>`，引用计数类型，允许多所有权存在
    - `Ref<T>` 和 `RefMut<T>`，通过 `RefCell<T>` 访问, 允许将借用规则检查从编译期移动到运行期进行

智能指针往往是基于结构体实现，它与我们自定义的结构体最大的区别在于它实现了 `Deref` 和 `Drop` 特征：

- `Deref` 可以让智能指针像引用那样工作，这样你就可以写出同时支持智能指针和引用的代码，例如 `*T`
- `Drop` 允许你指定智能指针超出作用域后自动执行的代码，例如做一些数据清除等收尾工作

| Rust 规则            | 智能指针带来的额外规则            |
|--------------------|------------------------|
| 一个数据只有一个所有者        | Rc/Arc 让一个数据可以拥有多个所有者   |
| 要么多个不可变借用，要么一个可变借用 | RefCell 实现编译期可变、不可变引用共存 |
| 违背规则导致编译错误         | 违背规则导致运行时 panic         |

| Weak                                | Rc                      |
|-------------------------------------|-------------------------|
| 不计数                                 | 引用计数                    |
| 不拥有所有权                              | 拥有值的所有权                 |
| 不阻止值被释放(drop)                       | 所有权计数归零，才能 drop         |
| 引用的值存在返回 Some，不存在返回 None            | 引用的值必定存在                |
| 通过 upgrade 取到 `Option<Rc<T>>`，然后再取值 | 通过 Deref 自动解引用，取值无需任何操作 |

`Weak` 通过 `use std::rc::Weak` 来引入，它具有以下特点:

- 可访问，但没有所有权，不增加引用计数，因此不会影响被引用值的释放回收
- 可由 `Rc<T>` 调用 `downgrade` 方法转换成 `Weak<T>`
- `Weak<T>` 可使用 `upgrade` 方法转换成 `Option<Rc<T>>`，如果资源已经被释放，则 `Option` 的值是 `None`
- 常用于解决循环引用的问题

## 并发 (Concurrent)

- 多线程 std::thread
- **消息传递**（_Message passing_）并发 std::sync::mpsc，其中信道（channel）被用来在线程间传递消息。
- **共享状态**（_Shared state_）并发，其中多个线程可以访问同一片数据。
- `Sync` 和 `Send` trait，将 Rust 的并发保证扩展到用户定义的以及标准库提供的类型中

## 模块

- `mod`
    - 编译器会在以父模块命名的目录中寻找子模块代码
- `crate`
    - crate 是 Rust 在编译时最小的代码单位
    - crate 可以包含模块，模块可以定义在其他文件
    - crate 有两种形式：二进制项和库
    - _crate root_ 是一个源文件，Rust 编译器以它为起始点，并构成你的 crate 的根模块. ==对于一个库 crate 而言是 _src/lib.rs_，对于一个二进制 crate 而言是 _src/main.rs_==
- package
    - _包_（_package_）是提供一系列功能的一个或者多个 crate
    - 一个包会包含一个 _Cargo.toml_ 文件
    - 包中可以包含至多一个库 crate(library crate)。包中可以包含任意多个二进制 crate(binary crate)，但是必须至少包含一个 crate（无论是库的还是二进制的）。
        - 通过将文件放在 _src/bin_ 目录下，一个包可以拥有多个二进制 crate
- workspace

## 宏

## 工具链

Rustup

```shell
#export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
#export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup

export RUSTUP_UPDATE_ROOT=https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup
export RUSTUP_DIST_SERVER=https://mirrors.tuna.tsinghua.edu.cn/rustup
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup install nightly
rustup default nightly
```

```
Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /Users/mac/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

  /Users/mac/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /Users/mac/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /Users/mac/.profile
  /Users/mac/.zshenv
  /Users/mac/.config/fish/conf.d/rustup.fish

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.
```

Cargo

```toml
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
# 指定镜像
replace-with = 'tuna' # 如：tuna、sjtu、ustc，或者 rustcc

# 注：以下源配置一个即可，无需全部

# 中国科学技术大学
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

# 上海交通大学
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"

# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# rustcc社区
[source.rustcc]
registry = "https://code.aliyun.com/rustcc/crates.io-index.git"
```

rust-analyzer

`rustup component add rust-analyzer`

## 生态

![](https://pic2.zhimg.com/v2-2aba1db6a039076eab1449406184b5e5_r.jpg)

![](https://pic1.zhimg.com/v2-fbf031c202cf6f42a3ca626da7e19d80_r.jpg)

- https://github.com/flosse/rust-os-comparison
    - https://gitlab.redox-os.org/redox-os/redox
- https://github.com/flosse/rust-web-framework-comparison
- https://github.com/tokio-rs/tokio
- https://github.com/tauri-apps/tauri

## 文档和参考资料

- Official
    - https://doc.rust-lang.org/book/
        - https://kaisery.github.io/trpl-zh-cn/
    - https://doc.rust-lang.org/stable/rust-by-example/
        - https://rustwiki.org/zh-CN/rust-by-example/
    - https://github.com/rust-lang/rustlings/
    - https://doc.rust-lang.org/std/index.html
    - https://doc.rust-lang.org/reference/index.html
        - https://rustwiki.org/zh-CN/reference/introduction.html
- UnOfficial
    - https://course.rs/about-book.html
    - https://zh.practice.rs/why-exercise.html
- Others
    - https://lborb.github.io/book/title-page.html
    - https://github.com/rust-unofficial/awesome-rust
    - https://github.com/TheAlgorithms/Rust
    - https://github.com/tokio-rs/mini-redis
    - [简介 - 使用太多的链表学习 Rust (rust-unofficial.github.io)](https://rust-unofficial.github.io/too-many-lists/)
