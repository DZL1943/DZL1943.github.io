---
created: 2024-07-06T20:42
modified: 2026-01-10T19:06
---

## 简介

scala 是一门基于 jvm 的静态类型语言, 由 Martin Odersky 创建, 于 2004 年正式发布. 其设计初衷是实现可伸缩的语言、并集成面向对象编程和函数式编程的各种特性. 

其主要特点为
- 自动推断类型
- 支持类似 python 的缩进语法
- 可变和不可变类型
- FP 和 OOP 的融合
- 模式匹配
- 泛型
- 元编程
- akka

[Scala FAQ](https://docs.scala-lang.org/tutorials/FAQ/index.html)  
[Scala Cheatsheet](https://docs.scala-lang.org/cheatsheets/index.html)  
[Scala for Python Developers](https://docs.scala-lang.org/scala3/book/scala-for-python-devs.html)

> [!hint] Kotlin 是一门与之相似的语言, 相当于 Scala--

## 工具链

```shell
# macOS
brew install coursier/formulas/coursier && cs setup
# curl -fL https://github.com/VirtusLab/coursier-m1/releases/latest/download/cs-aarch64-apple-darwin.gz | gzip -d > cs && chmod +x cs && (xattr -d com.apple.quarantine cs || true) && ./cs setup
```

![1761259187623-902408](<../../../Attachments/1761259187623-902408.png>)

> [!tip]+ (理论上) coursier 安装的那些命令行程序是非必要的!  
> scala 自身归根结底就是一些 jar 包, 很多的构建工具都是通过调包运作, 而与 scala 命令行程序无关. 你也可以理解为它们维护着类似 python venv 的东西.

## hello-world

https://docs.scala-lang.org/scala3/book/taste-hello-world.html
```scala title="hello-world-scala2"
object HelloScala2 {
  def main(args: Array[String]) = {
    println("Hello, World2!")
  }
}
```

```scala title="hello-world-scala3"
// 这里的方法名等同于类名
@main def helloScala3() = println("Hello, World3!")
```

```scala title="hello-world-app"
// 这种方式不支持命令行参数, 将被弃用
object HelloApp extends App {
  println("Hello World")
}
```

> [!tip] 注意文件名后缀是 `.scala`, `.sc` 是 worksheet 后缀(的一部分)!

## 构建和运行方式

### REPL、worksheet

scala 回车, 进入 repl

### scalac

用 scalac 编译, scala 运行.  
直接 `scala xxx.scala` 也能运行?

### scala-cli

基本上等同于 scala 和 scalac

### sbt

对于单个的文件, 直接 sbt run 即可运行. (若有多个入口它会提示你选择)  
更改 scalaVersion 参看下面的 build.sbt 文件
```scala title="build.sbt"
ThisBuild / scalaVersion := "3.4.2"

lazy val hello = (project in file("."))
  .settings(
    name := "Hello"
  )
```
https://docs.scala-lang.org/scala3/book/tools-sbt.html  
https://www.scala-sbt.org/1.x/docs/sbt-by-example.html  

使用项目模板创建复杂结构, 例 `sbt new scala/scala3.g8`

#### sbt 源

https://www.scala-sbt.org/1.x/docs/Proxy-Repositories.html

华为源: https://mirrors.huaweicloud.com/mirrorDetail/5ebf85de07b41baf6d0882ac?mirrorName=sbt&catalog=language

```ini title="~/.sbt/repositories"
[repositories]
local
huaweicloud-ivy: https://mirrors.huaweicloud.com/repository/ivy/, [organization]/[module]/(scala[scalaVersion]/)(sbt[sbtVersion]/)[revision]/[type]s/artifact.[ext],allowInsecureProtocol
huaweicloud-maven: https://mirrors.huaweicloud.com/repository/maven/,allowInsecureProtocol

aliyun-maven: https://maven.aliyun.com/repository/public/

typesafe: http://repo.typesafe.com/typesafe/ivy-releases/, [organization]/[module]/(scala_[scalaVersion]/)(sbt_[sbtVersion]/)[revision]/[type]s/[artifact](-[classifier]).[ext], bootOnly
```

### mill

macOS 下可通过 `brew install lefou/millw/millw` 安装, 首次运行还会自动从 maven 下载 jar 包.

以下是一份最简 build.sc 文件, 注意 scala 代码需放置在 src 目录中. 通过 `mill run` 运行.
```scala
import mill._, scalalib._

object hello extends RootModule with ScalaModule {
  def scalaVersion = "3.4.2"
}
```

### gradle

https://docs.gradle.org/current/userguide/scala_plugin.html

![](<../../../Attachments/1761259187619-309779.png>)  
![|600](<../../../Attachments/1761259187620-133846.png>)  
![](<../../../Attachments/1761259187621-271788.png>)

注意是 `app/build.gradle`, 不是根目录的 `settings.gradle`

### bazel

## 编辑器设置

### lazyvim 设置 scala

1. `:LazyExtras`
2. 找到 lang.scala, 按 x 选中, 下次进入 nvim 会自动安装
3. `:MetalsInstall`

## 语法和功能

https://docs.scala-lang.org/scala3/reference/syntax.html  
https://docs.scala-lang.org/style/index.html  

> [!tip] operators are methods. Any method with a single parameter can be used as an infix operator.

> [!tip] Everything in Scala is an expression, all have return values.

### 关键字

```
abstract  case      catch     class     def       do        else
enum      export    extends   false     final     finally   for
given     if        implicit  import    lazy      match     new
null      object    override  package   private   protected return
sealed    super     then      throw     trait     true      try
type      val       var       while     with      yield
:         =         <-        =>        <:        >:        #
@         =>>       ?=>
```

```
as  derives  end  extension  infix  inline  opaque  open  transparent  using  |  *  +  -
```

### 变量和数据类型

用 val 定义不可变量, 用 var 定义可变量. 例如

```scala
val b: Byte = 1
val i: Int = 1
val l: Long = 1
val s: Short = 1
val d: Double = 2.0
val f: Float = 3.0
val i = 123   // defaults to Int
val j = 1.0   // defaults to Double
val x = 1_000L   // val x: Long = 1000
val y = 2.2D     // val y: Double = 2.2
val z = 3.3F     // val z: Float = 3.3

var a = BigInt(1_234_567_890_987_654_321L)
var b = BigDecimal(123_456.789)

val name = "Bill"   // String
val c = 'a'         // Char

val name = "James"
val age = 30
println(s"$name is $age years old")   // "James is 30 years old"
println(s"2 + 2 = ${2 + 2}")   // prints "2 + 2 = 4"

println(s"""name: "$name",
|age: $age""".stripMargin)

val height = 1.9d
val name = "James"
println(f"$name%s is $height%2.2f meters tall")  // "James is 1.90 meters tall"

raw"a\nb"  // a\nb

// 自定义插值器
extension (sc: StringContext)
  def p(args: Double*): Point = {
    // reuse the `s`-interpolator and then split on ','
    val pts = sc.s(args: _*).split(",", 2).map { _.toDoubleOption.getOrElse(0.0) }
    Point(pts(0), pts(1))
  }

val x=12.0

p"1, -2"        // Point(1.0, -2.0)
p"${x/5}, $x"   // Point(2.4, 12.0)
```

![docs.scala-lang.org/resources/images/tour/type-casting-diagram.svg](https://docs.scala-lang.org/resources/images/tour/type-casting-diagram.svg)  
![https://docs.scala-lang.org/resources/images/tour/unified-types-diagram.svg](https://docs.scala-lang.org/resources/images/tour/unified-types-diagram.svg)

`Any` is the supertype of all types, also called the **top type**.

_ `AnyVal` _ represents value types. There are a couple of predefined value types, and they are non-nullable: `Double`, `Float`, `Long`, `Int`, `Short`, `Byte`, `Char`, `Unit`, and `Boolean`. `Unit` is a value type which carries no meaningful information. There is exactly one instance of `Unit` which we can refer to as: `()`.

_ `AnyRef` _ represents reference types. All non-value types are defined as reference types. Every user-defined type in Scala is a subtype of `AnyRef`. If Scala is used in the context of a Java runtime environment, `AnyRef` corresponds to `java.lang.Object`.

`Nothing` is a subtype of all types, also called the **bottom type**.

`Null` is a subtype of all reference types (i.e. any subtype of `AnyRef`). It has a single value identified by the keyword literal `null`. Currently, the usage of `null` is considered bad practice. It should be used mostly for interoperability with other JVM languages.

Option/Some/None; Try/Success/Failure
```scala
def makeInt(s: String): Option[Int] =
  try
    Some(Integer.parseInt(s.trim))
  catch
    case e: Exception => None
```

### 数据结构

https://docs.scala-lang.org/scala3/book/collections-classes.html  
https://docs.scala-lang.org/overviews/collections-2.13/introduction.html  

> [!hint] Scala 数据结构一个明显的不足是缺乏字面量形式.

| Collection Type  | Immutable  | Mutable  | Description                                                                                                             |
|------------------|------------|----------|-------------------------------------------------------------------------------------------------------------------------|
| List             | ✓          |          | A linear (linked list), immutable sequence                                                                              |
| Vector           | ✓          |          | An indexed, immutable sequence                                                                                          |
| LazyList         | ✓          |          | A lazy immutable linked list, its elements are computed only when they’re needed; Good for large or infinite sequences. |
| ArrayBuffer      |            | ✓        | The go-to type for a mutable, indexed sequence                                                                          |
| ListBuffer       |            | ✓        | Used when you want a mutable List; typically converted to a List                                                        |
| Map              | ✓          | ✓        | An iterable collection that consists of pairs of keys and values.                                                       |
| Set              | ✓          | ✓        | An iterable collection with no duplicate elements                                                                       |

The Scala _tuple_ is a type that lets you easily put a collection of different types in the same container.

![docs.scala-lang.org/resources/images/tour/collections-diagram-213.svg|600](https://docs.scala-lang.org/resources/images/tour/collections-diagram-213.svg)  
scala.collection.immutable  
![docs.scala-lang.org/resources/images/tour/collections-immutable-diagram-213.svg](https://docs.scala-lang.org/resources/images/tour/collections-immutable-diagram-213.svg)  
scala.collection.mutable  
![docs.scala-lang.org/resources/images/tour/collections-mutable-diagram-213.svg](https://docs.scala-lang.org/resources/images/tour/collections-mutable-diagram-213.svg)

```scala
val a = List(1, 2, 3)
val b = 0 :: a              // List(0, 1, 2, 3)
val c = List(-1, 0) ::: a   // List(-1, 0, 1, 2, 3)


val a = Vector(1,2,3)         // Vector(1, 2, 3)
val b = a :+ 4                // Vector(1, 2, 3, 4)
val c = a ++ Vector(4, 5)     // Vector(1, 2, 3, 4, 5)


val nums = ArrayBuffer(1, 2, 3)   // ArrayBuffer(1, 2, 3)
nums += 4                         // ArrayBuffer(1, 2, 3, 4)
nums ++= List(5, 6)               // ArrayBuffer(1, 2, 3, 4, 5, 6)

val a = ArrayBuffer.range('a', 'h')   // ArrayBuffer(a, b, c, d, e, f, g)
a -= 'a'                              // ArrayBuffer(b, c, d, e, f, g)
a --= Seq('b', 'c')                   // ArrayBuffer(d, e, f, g)
a --= Set('d', 'e')                   // ArrayBuffer(f, g)

val a = ArrayBuffer.range(1,5)        // ArrayBuffer(1, 2, 3, 4)
a(2) = 50                             // ArrayBuffer(1, 2, 50, 4)
a.update(0, 10)                       // ArrayBuffer(10, 2, 50, 4)


val states = Map(
  "AK" -> "Alaska",
  "AL" -> "Alabama",
  "AZ" -> "Arizona"
)
val ak = states("AK")   // ak: String = Alaska
val al = states("AL")   // al: String = Alabama

val a = Map(1 -> "one")    // a: Map(1 -> one)
val b = a + (2 -> "two")   // b: Map(1 -> one, 2 -> two)
val c = b ++ Seq(
  3 -> "three",
  4 -> "four"
)
// c: Map(1 -> one, 2 -> two, 3 -> three, 4 -> four)

val a = Map(
  1 -> "one",
  2 -> "two",
  3 -> "three",
  4 -> "four"
)
val b = a - 4       // b: Map(1 -> one, 2 -> two, 3 -> three)
val c = a - 4 - 3   // c: Map(1 -> one, 2 -> two)

val a = Map(
  1 -> "one",
  2 -> "two",
  3 -> "three"
)
val b = a.updated(3, "THREE!")   // b: Map(1 -> one, 2 -> two, 3 -> THREE!)
val c = a + (2 -> "TWO...")      // c: Map(1 -> one, 2 -> TWO..., 3 -> three)


val a = Set(1, 2)                // Set(1, 2)
val b = a + 3                    // Set(1, 2, 3)
val c = b ++ Seq(4, 1, 5, 5)     // HashSet(5, 1, 2, 3, 4)

val a = Set(1, 2, 3, 4, 5)   // HashSet(5, 1, 2, 3, 4)
val b = a - 5                // HashSet(1, 2, 3, 4)
val c = b -- Seq(3, 4)       // HashSet(1, 2)


1 to 5         // Range(1, 2, 3, 4, 5)
1 until 5      // Range(1, 2, 3, 4)
1 to 10 by 2   // Range(1, 3, 5, 7, 9)
'a' to 'c'     // NumericRange(a, b, c)
Vector.range(1, 5)       // Vector(1, 2, 3, 4)
List.range(1, 10, 2)     // List(1, 3, 5, 7, 9)
Set.range(1, 10)         // HashSet(5, 1, 6, 9, 2, 7, 3, 8, 4)
val evens = (0 to 10 by 2).toList     // List(0, 2, 4, 6, 8, 10)
val odds = (1 to 10 by 2).toList      // List(1, 3, 5, 7, 9)


val t = (11, "eleven", Person("Eleven"))
t(0)   // 11
t(1)   // "eleven"
t(2)   // Person("Eleven")
```

基本操作
- ~~add~~/put/insert
- remove
- ~~set~~/update: 或者直接赋值
- get/lift: 直接括号索引
- slice
- concat/~~extend~~
- clear

### 控制结构

https://docs.scala-lang.org/scala3/book/control-structures.html

- if/then/else
- for
- while
- match
- try/catch/finally

```scala
def compare(a: Int, b: Int): Int =
  if a < b then
    -1
  else if a == b then
    0
  else
    1

for
  i <- 1 to 2
  j <- 'a' to 'b'
  k <- 1 to 10 by 5
do
  println(s"i = $i, j = $j, k = $k")

for
  i <- 1 to 10
  if i > 3
  if i < 6
  if i % 2 == 0
do
  println(i)


val names = List("_olivia", "_walter", "_peter")

val capNames = for name <- names yield
  val nameWithoutUnderscore = name.drop(1)
  val capName = nameWithoutUnderscore.capitalize
  capName

// capNames: List[String] = List(Olivia, Walter, Peter)


var i = 0

while i < 3 do
  println(i)
  i += 1


def pattern(x: Matchable): String = x match

// constant patterns
case 0 => "zero"
case true => "true"
case "hello" => "you said 'hello'"
case Nil => "an empty List"

// sequence patterns
case List(0, _, _) => "a 3-element list with 0 as the first element"
case List(1, _*) => "list, starts with 1, has any number of elements"
case Vector(1, _*) => "vector, starts w/ 1, has any number of elements"

// tuple patterns
case (a, b) => s"got $a and $b"
case (a, b, c) => s"got $a, $b, and $c"

// constructor patterns
case Person(first, "Alexander") => s"Alexander, first name = $first"
case Dog("Zeus") => "found a dog named Zeus"

// type test patterns
case s: String => s"got a string: $s"
case i: Int => s"got an int: $i"
case f: Float => s"got a float: $f"
case a: Array[Int] => s"array of int: ${a.mkString(",")}"
case as: Array[String] => s"string array: ${as.mkString(",")}"
case d: Dog => s"dog: ${d.name}"
case list: List[?] => s"got a List: $list"
case m: Map[?, ?] => m.toString

// the default wildcard pattern
case _ => "Unknown"


var text = ""
try
  text = openAndReadAFile(filename)
catch
  case fnf: FileNotFoundException => fnf.printStackTrace()
  case ioe: IOException => ioe.printStackTrace()
finally
  // close your resources here
  println("Came to the 'finally' clause.")
```

### 函数和方法

```scala
def methodName(param1: Type1, param2: Type2): ReturnType =
  // the method body
  // goes here
end methodName   // this is optional

val double = (i: Int) => i * 2

def executeNTimes(f: () => Unit, n: Int): Unit =
for i <- 1 to n do f()
```

When a method takes no parameters, it’s said to have an _arity_ level of _arity-0_. Similarly, when a method takes one parameter it’s an _arity-1_ method. When you create arity-0 methods:

- If the method performs side effects, such as calling `println`, declare the method with empty parentheses
- If the method does not perform side effects—such as getting the size of a collection, which is similar to accessing a field on the collection—leave the parentheses off

In classes, objects, traits, and enums, Scala methods are public by default.  
Methods can also be marked as `private`. This makes them private to the current class, so they can’t be called nor overridden in subclasses.  
If you want to make a method private to the current class and also allow subclasses to call it or override it, mark the method as `protected`.  
an object can also contain methods.  
you can define extension methods to add functionality to closed classes.

when there’s only one argument, the parentheses around the parameter aren’t needed.  
Scala lets you use the `_` symbol instead of a variable name when the parameter appears only once in your function.  
if an anonymous function consists of one method call that takes a single argument, you don’t need to explicitly name and specify the argument, so you can finally write only the name of the method.

The key difference between methods and functions is that _a function is an object_, i.e. it is an instance of a class, and in turn has its own methods (e.g. try `f.apply` on a function `f`).

_Methods_ are not values that can be passed around, i.e. they can only be called via method application (e.g. `foo(arg1, arg2, ...)`). Methods can be _converted_ to a value by creating a function value that will call the method when supplied with the required arguments. This is known as eta-expansion.

More concretely: with automatic eta-expansion, the compiler automatically converts any _method reference_, without supplied arguments, to an equivalent _anonymous function_ that will call the method.

Automatic eta-expansion is a desugaring that is context-dependent (i.e. the expansion conditionally activates, depending on the surrounding code of the method reference.)

支持嵌套定义  
支持默认参数、命名参数、by-name 参数, 支持多个参数列表

#### main 方法和命令行参数

#### HOF 和函数类型签名

### 类和对象

```scala
import java.time.*

// [1] the primary constructor
class Student(
  var name: String,
  var govtId: String
):
  private var _applicationDate: Option[LocalDate] = None
  private var _studentId: Int = 0

  // [2] a constructor for when the student has completed
  // their application
  def this(
    name: String,
    govtId: String,
    applicationDate: LocalDate
  ) =
    this(name, govtId)
    _applicationDate = Some(applicationDate)

  // [3] a constructor for when the student is approved
  // and now has a student id
  def this(
    name: String,
    govtId: String,
    studentId: Int
  ) =
    this(name, govtId)
    _studentId = studentId
```

An object is a class that has exactly one instance. It’s initialized lazily when its members are referenced, similar to a `lazy val`. Objects in Scala allow grouping methods and fields under one namespace, similar to how you use `static` members on a class in Java, Javascript (ES6), or `@staticmethod` in Python.

An `object` that has the same name as a class, and is declared in the same file as the class, is called a _“companion object_.” Similarly, the corresponding class is called the object’s companion class. A companion class or object can access the private members of its companion.

An enumeration can be used to define a type that consists of a finite set of named values.

Case classes are used to model immutable data structures.  
Case objects are to objects what case classes are to classes.

By default, all member definitions in Scala are publicly visible.

类支持嵌套定义 (内部类)

#### 构造函数

#### getter/setter

For accessors of properties, the name of the method should be the name of the property.  
For mutators, the name of the method should be the name of the property with “`_=`” appended.

In Scala, there is no distinction between fields and methods. In fact, fields are completely named and controlled by the compiler.

Methods which act as accessors of any sort (either encapsulating a field or a logical property) should be declared _without_ parentheses except if they have side effects.

#### trait & mixin

a Scala trait is similar to an interface in Java 8+. Traits can contain:
- Abstract methods and fields
- Concrete methods and fields

When you want to write a class, but you know it will have abstract members, you can either create a trait or an abstract class. In most situations you’ll use traits, but historically there have been two situations where it’s better to use an abstract class than a trait:
- You want to create a base class that takes constructor arguments
- The code will be called from Java code

### 模块与包

```scala
import users.*                            // import everything from the `users` package
import users.User                         // import only the `User` class
import users.{User, UserPreferences}      // import only two selected members
import users.{UserPreferences as UPrefs}  // rename a member as you import it
```

`import` statements can be anywhere.

Two packages are implicitly imported into the scope of all of your source code files:

- java.lang.*
- scala.*

The members of the Scala object `Predef` are also imported by default.

### 类型和泛型

the `&` operator creates a so called _intersection type_. The type `A & B` represents values that are **both** of the type `A` and of the type `B` at the same time.

the `|` operator creates a so-called _union type_. The type `A | B` represents values that are **either** of the type `A` **or** of the type `B`.

Algebraic Data Types (ADTs) can be created with the `enum` construct.

Type parameter _variance_ controls the subtyping of parameterized types (like classes or traits).
- **invariant**—the default, written like `Pipeline[T]`
- **covariant**—annotated with a `+`, such as `Producer[+T]`
- **contravariant**—annotated with a `-`, like in `Consumer[-T]`

_Opaque type aliases_ provide type abstraction without any **overhead**. In Scala 2, a similar result could be achieved with [value classes](https://docs.scala-lang.org/overviews/core/value-classes.html).

_Scala 2 has a weaker form of structural types based on Java reflection, achieved with `import scala.language.reflectiveCalls` _.

A _dependent function type_ describes function types, where the result type may depend on the function’s parameter values. The concept of dependent types, and of dependent function types is more advanced and you would typically only come across it when designing your own libraries or using advanced libraries.

other advanced types:
- Type lambdas
- Match types
- Existential types
- Higher-kinded types
- Singleton types
- Refinement types
- Kind polymorphism

### 上下文抽象

### 元编程

https://docs.scala-lang.org/scala3/guides/macros  

### 并发

```scala
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global
import scala.util.{Failure, Success}

val startTime = System.currentTimeMillis()
def delta() = System.currentTimeMillis() - startTime
def sleep(millis: Long) = Thread.sleep(millis)

@main def multipleFutures1 =

  println(s"creating the futures:   ${delta()}")

  // (1) start the computations that return futures
  val f1 = Future { sleep(800); 1 }   // eventually returns 1
  val f2 = Future { sleep(200); 2 }   // eventually returns 2
  val f3 = Future { sleep(400); 3 }   // eventually returns 3

  // (2) join the futures in a `for` expression
  val result =
    for
      r1 <- f1
      r2 <- f2
      r3 <- f3
    yield
      println(s"in the 'yield': ${delta()}")
      (r1 + r2 + r3)

  // (3) process the result
  result.onComplete {
    case Success(x) =>
      println(s"in the Success case: ${delta()}")
      println(s"result = $x")
    case Failure(e) =>
      e.printStackTrace
  }

  println(s"before the 'sleep(3000)': ${delta()}")

  // important for a little parallel demo: keep the jvm alive
  sleep(3000)
```

## 库

https://www.scala-lang.org/api/current/

https://github.com/lauris/awesome-scala

https://typelevel.org/projects/

https://docs.scala-lang.org/toolkit/introduction.html

## [Scala.js](https://www.scala-js.org/)

## [Scala Native — Scala Native 0.5.4 documentation](https://scala-native.org/en/stable/)