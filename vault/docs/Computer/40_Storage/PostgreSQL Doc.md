---
created: 2024-08-26T10:58
modified: 2024-08-27T13:46
---

## 一. 教程

### 1. 入门

#### 1.3 创建数据库

```shell
createdb mydb

dropdb mydb
```

### 2. SQL 语言

#### 2.3 创建新表

```sql
CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,           -- low temperature
    temp_hi         int,           -- high temperature
    prcp            real,          -- precipitation
    date            date
);

CREATE TABLE cities (
    name            varchar(80),
    location        point
);
```

#### 2.4 用行填充表

```sql
COPY weather FROM '/home/user/weather.txt';

INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');

INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');

INSERT INTO weather (date, city, temp_hi, temp_lo)
    VALUES ('1994-11-29', 'Hayward', 54, 37);

INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');
```

#### 2.5 查询表

```sql
--SELECT * FROM weather;
SELECT city, temp_lo, temp_hi, prcp, date FROM weather;
SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;

SELECT * FROM weather
    WHERE city = 'San Francisco' AND prcp > 0.0;

SELECT * FROM weather
    ORDER BY city;

SELECT * FROM weather
    ORDER BY city, temp_lo;

SELECT DISTINCT city
    FROM weather;

SELECT DISTINCT city
    FROM weather
    ORDER BY city;
```

#### 2.6 表之间的联接

```sql
SELECT * FROM weather JOIN cities ON city = name;

SELECT weather.city, weather.temp_lo, weather.temp_hi,
   weather.prcp, weather.date, cities.location
FROM weather JOIN cities ON weather.city = cities.name;

SELECT *
    FROM weather, cities
    WHERE city = name;

SELECT *
    FROM weather LEFT OUTER JOIN cities ON weather.city = cities.name;

SELECT w1.city, w1.temp_lo AS low, w1.temp_hi AS high,
   w2.city, w2.temp_lo AS low, w2.temp_hi AS high
FROM weather w1 JOIN weather w2
    ON w1.temp_lo < w2.temp_lo AND w1.temp_hi > w2.temp_hi;

SELECT *
    FROM weather w JOIN cities c ON w.city = c.name;
```

#### 2.7 聚合函数

```sql
SELECT max(temp_lo) FROM weather;

SELECT city FROM weather
    WHERE temp_lo = (SELECT max(temp_lo) FROM weather);

SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city;

SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city
    HAVING max(temp_lo) < 40;

SELECT city, count(*), max(temp_lo)
    FROM weather
    WHERE city LIKE 'S%'            -- (1)
    GROUP BY city;

SELECT city, count(*) FILTER (WHERE temp_lo < 45), max(temp_lo)
    FROM weather
    GROUP BY city;
```

#### 2.8 更新

```sql
UPDATE weather
    SET temp_hi = temp_hi - 2,  temp_lo = temp_lo - 2
    WHERE date > '1994-11-28';
```

#### 2.9 删除

```sql
DELETE FROM weather WHERE city = 'Hayward';
```

### 3. 高级功能

#### 3.2 视图

```sql
CREATE VIEW myview AS
    SELECT name, temp_lo, temp_hi, prcp, date, location
        FROM weather, cities
        WHERE city = name;

SELECT * FROM myview;
```

#### 3.3 外键

```sql
CREATE TABLE cities (
        name     varchar(80) primary key,
        location point
);

CREATE TABLE weather (
        city      varchar(80) references cities(name),
        temp_lo   int,
        temp_hi   int,
        prcp      real,
        date      date
);
```

#### 3.4 事务

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc
COMMIT;

BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Wally';
COMMIT;
```

#### 3.5 窗口函数

#### 3.6 继承

```sql
CREATE TABLE cities (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE TABLE capitals (
  state      char(2) UNIQUE NOT NULL
) INHERITS (cities);
```

## 二. SQL 语言

### 4. SQL 语法

#### 4.1 词法结构

关键字和未加引号的标识符不区分大小写

经常使用的约定是用大写字母写关键词，用小写字母写名字

还有第二种标识符：_分隔标识符_ 或 _带引号的标识符_。它是通过将任意字符序列括在双引号 （“） 中形成的。分隔标识符始终是标识符，而不是关键字。

带引号的标识符可以包含任何字符，但代码为零的字符除外。

引用标识符也会使其区分大小写，而未引用的名称始终折叠为小写。(与 SQL 标准不兼容)

带引号的标识符的变体允许包含由其代码点标识的转义 Unicode 字符。此变体以 `U&` 开头（大写或小写 U 后跟 & 符号），紧接在左双引号之前，中间没有任何空格

PostgreSQL 中有三种 _隐式类型的常量_：字符串、位字符串和数字

SQL 中的字符串常量是用单引号 （`'`） 括起来的任意字符序列

两个仅由 _空格分隔且至少有一个换行_ 符的字符串常量被连接起来，并有效地被视为字符串已写入一个常量

PostgreSQL 还接受 “escape” 字符串常量，这是 SQL 标准的扩展。通过在左单引号之前写下字母 `E`（大写或小写）来指定转义字符串常量，例如 `E'foo'`。

Unicode 转义字符串常量以 `U&`（大写或小写字母 U 后跟 & 符号）开头，紧接在左引号之前，中间没有任何空格，例如 `U&'foo'`。

美元引用的字符串常量由一个美元符号 （`$`）、一个由零个或多个字符组成的可选“标记”、另一个美元符号、构成字符串内容的任意字符序列、一个美元符号、开始此美元引号的相同标记和一个美元符号组成。  
美元引用的字符串中没有任何字符被转义

位串常量看起来像常规字符串常量，在开始引号之前有一个 `B`（大写或小写）（中间没有空格），例如 `B'1001'`。位串常量中唯一允许的字符是 `0` 和 `1`。可以使用前导 `X`（大写或小写）以十六进制表示法指定位字符串常量，例如 `X'1FF'`。

运算符名称是以下列表中最多 `NAMEDATALEN-1`（默认为 63 个）字符的序列： ``+ - * / < > = ~ ! @ # % ^ & | ` ? ``

特殊字符
- 美元符号 （`$`） 后跟数字用于表示函数定义或准备好的语句主体中的位置参数。在其他上下文中，美元符号可以是标识符的一部分，也可以是美元引用的字符串常量。
- 圆括号 （`（）`） 具有其通常的含义，用于对表达式进行分组并强制执行优先级。在某些情况下，需要括号作为特定 SQL 命令的固定语法的一部分。
- 方括号 （`[]`） 用于选择数组的元素。有关数组的更多信息，请参见[Section 8.15](https://www.postgresql.org/docs/current/arrays.html "8.15. Arrays")。
- 逗号 （`，`） 在某些语法结构中用于分隔列表的元素。
- 分号 （`;`） 终止 SQL 命令。它不能出现在命令中的任何位置，除非出现在字符串常量或带引号的标识符中。
- 冒号 （`：`） 用于从数组中选择 “切片”。（参见[第 8.15 节](https://www.postgresql.org/docs/current/arrays.html "8.15. Arrays") 。在某些 SQL 方言（例如嵌入式 SQL）中，冒号用于为变量名称添加前缀。
- 星号 （`*`） 在某些上下文中用于表示表行或复合值的所有字段。当用作聚合函数的参数时，它也具有特殊含义，即聚合不需要任何显式参数。
- 句点 （`.`） 用于数字常量，并用于分隔架构、表和列名称。

注释是以双破折号开头并延伸到行尾的字符序列. 或者，可以使用 C 样式的块注释

运算符优先级

| Operator/Element                        | Associativity | Description                                                |
| --------------------------------------- | ------------- | ---------------------------------------------------------- |
| `.`                                     | left          | table/column name separator                                |
| `::`                                    | left          | PostgreSQL-style typecast                                  |
| `[` `]`                                 | left          | array element selection                                    |
| `+` `-`                                 | right         | unary plus, unary minus                                    |
| `COLLATE`                               | left          | collation selection                                        |
| `AT`                                    | left          | `AT TIME ZONE`                                             |
| `^`                                     | left          | exponentiation                                             |
| `*` `/` `%`                             | left          | multiplication, division, modulo                           |
| `+` `-`                                 | left          | addition, subtraction                                      |
| (any other operator)                    | left          | all other native and user-defined operators                |
| `BETWEEN` `IN` `LIKE` `ILIKE` `SIMILAR` |               | range containment, set membership, string matching         |
| `<` `>` `=` `<=` `>=` `<>`              |               | comparison operators                                       |
| `IS` `ISNULL` `NOTNULL`                 |               | `IS TRUE`, `IS FALSE`, `IS NULL`, `IS DISTINCT FROM`, etc. |
| `NOT`                                   | right         | logical negation                                           |
| `AND`                                   | left          | logical conjunction                                        |
| `OR`                                    | left          | logical disjunction                                        |

#### 4.2 值表达式

值表达式用于各种上下文，例如在 `SELECT` 命令的目标列表中，作为 `INSERT` 或 `UPDATE` 中的新列值，或者在许多命令的搜索条件中使用。值表达式的结果有时称为 _标量_，以区别于表表达式（即表）的结果。因此，值表达式也称为 _标量表达式_（甚至简称_为表达式_）。表达式语法允许使用 arithmetic、logical、set 和其他操作从原始部分计算值。

值表达式是以下值之一：

- 常量或文本值
- 列引用
- 位置参数引用，位于函数定义或预编译语句的主体中
- 下标表达式
- 字段选择表达式
- 运算符调用
- 函数调用
- 聚合表达式
- 窗口函数调用
- A 型强制转换
- 排序规则表达式
- 标量子查询
- 数组构造函数
- 行构造函数
- 括号中的另一个值表达式（用于对子表达式进行分组并覆盖优先级）

#### 4.3 调用函数

```sql
CREATE FUNCTION concat_lower_or_upper(a text, b text, uppercase boolean DEFAULT false)
RETURNS text
AS
$$
 SELECT CASE
        WHEN $3 THEN UPPER($1 || ' ' || $2)
        ELSE LOWER($1 || ' ' || $2)
        END;
$$
LANGUAGE SQL IMMUTABLE STRICT;
```

在命名表示法中，每个参数的名称都使用 `=>` 指定，以将其与参数表达式分开. 为了向后兼容，支持基于 “：=” 的旧语法

### 5. 数据定义

#### 5.2 默认值

默认值可以是一个表达式，每当插入默认值时（_而不是_ 在创建表时），都会对其进行评估. 例如 `timestamp` 列的默认值为 `CURRENT_TIMESTAMP`, 另一个常见示例是为每一行生成一个 “serial number”。

```sql
CREATE TABLE products (
    product_no integer DEFAULT nextval('products_product_no_seq'),
    ...
);
```

#### 5.3 生成的列

生成列是始终从其他列计算的特殊列。因此，它之于列就像视图之于表。生成列有两种类型：stored 和 virtual。存储的生成列在写入（插入或更新）时计算，并像普通列一样占用存储空间。虚拟生成列不占用存储空间，在读取时计算。因此，虚拟生成列类似于视图，而存储的生成列类似于具体化视图（不同之处在于它始终自动更新）。PostgreSQL 目前仅实现存储的生成列。

```sql
CREATE TABLE people (
    ...,
    height_cm numeric,
    height_in numeric GENERATED ALWAYS AS (height_cm / 2.54) STORED
);
```

#### 5.4 约束

- Check
- Not-Null
- Unique
- Primary Key
- Foreign Key
- Exclusion

约束定义位于 data type 之后，就像 default value 定义一样。默认值和约束可以按任意顺序列出。

一个列可以有多个约束

要指定命名约束，请使用关键字 `CONSTRAINT`，后跟标识符，后跟约束定义。（如果您未以这种方式指定约束名称，系统会为您选择一个名称。)

列约束也可以写为 table 约束，而相反的情况不一定可能，因为列约束应该只引用它所附加到的列。

```sql
CREATE TABLE products (
    product_no integer,
    name text,
    price numeric CHECK (price > 0),
    discounted_price numeric CHECK (discounted_price > 0),
    CHECK (price > discounted_price)
);
```

在大多数数据库设计中，大多数列应标记为非 null。

要为一组列定义唯一约束，请将其编写为 table 约束，列名以逗号分隔

添加唯一约束将自动在约束中列出的列或列组上创建唯一的 B 树索引。

主键约束指示一列或一组列可用作表中行的唯一标识符。这要求值既唯一又不为空。(UNIQUE NOT NULL)

主键可以跨越多个列

添加主键将自动在主键中列出的列或列组上创建唯一的 B 树索引，并强制将列标记为 `NOT NULL`。

一个表最多可以有一个主键。（可以有任意数量的唯一和非空约束，它们在功能上几乎相同，但只有一个可以被标识为主键。关系数据库理论规定每个表都必须有一个主键。PostgreSQL 不强制执行此规则，但通常最好遵循它。

外键约束指定一列（或一组列）中的值必须与出现在另一个表的某一行中的值匹配。我们说这维护了两个相关表之间的 _引用完整性_。

外键还可以约束和引用一组列

有时，外键约束的 “other table” 是同一个 table 很有用;这称为 _自引用_ 外键。

一个表可以有多个外键约束。这用于实现表之间的多对多关系。

ON DELETE 时的引用处理策略
- RESTRICT: 防止删除引用的行
- CASCADE: 在删除引用的行时，引用该行的行也应自动删除
- SET NULL, SET DEFAULT: 在删除引用行时，引用行中的引用列分别设置为 null 或其默认值

#### 5.5 系统列

- tableoid
- xmin
- cmin
- xmax
- cmax
- ctid

#### 5.6 修改表

- 增删列
- 增删约束
- 更改默认值
- 更改列数据类型
- 重命名列
- 重命名表

#### 5.7 权限

SELECT、INSERT、UPDATE、DELETE、TRUNCATE、REFERENCES、TRIGGER、CREATE、CONNECT、TEMPORARY、EXECUTE、USAGE、SET、ALTER SYSTEM

| Privilege      | Abbreviation   | Applicable Object Types                                                                      |
| -------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `SELECT`       | `r` (“read”)   | `LARGE OBJECT`, `SEQUENCE`, `TABLE` (and table-like objects), table column                   |
| `INSERT`       | `a` (“append”) | `TABLE`, table column                                                                        |
| `UPDATE`       | `w` (“write”)  | `LARGE OBJECT`, `SEQUENCE`, `TABLE`, table column                                            |
| `DELETE`       | `d`            | `TABLE`                                                                                      |
| `TRUNCATE`     | `D`            | `TABLE`                                                                                      |
| `REFERENCES`   | `x`            | `TABLE`, table column                                                                        |
| `TRIGGER`      | `t`            | `TABLE`                                                                                      |
| `CREATE`       | `C`            | `DATABASE`, `SCHEMA`, `TABLESPACE`                                                           |
| `CONNECT`      | `c`            | `DATABASE`                                                                                   |
| `TEMPORARY`    | `T`            | `DATABASE`                                                                                   |
| `EXECUTE`      | `X`            | `FUNCTION`, `PROCEDURE`                                                                      |
| `USAGE`        | `U`            | `DOMAIN`, `FOREIGN DATA WRAPPER`, `FOREIGN SERVER`, `LANGUAGE`, `SCHEMA`, `SEQUENCE`, `TYPE` |
| `SET`          | `s`            | `PARAMETER`                                                                                  |
| `ALTER SYSTEM` | `A`            | `PARAMETER`                                                                                  |

| Object Type                      | All Privileges | Default `PUBLIC` Privileges | psql Command |
| -------------------------------- | -------------- | --------------------------- | ------------ |
| `DATABASE`                       | `CTc`          | `Tc`                        | `\l`         |
| `DOMAIN`                         | `U`            | `U`                         | `\dD+`       |
| `FUNCTION` or `PROCEDURE`        | `X`            | `X`                         | `\df+`       |
| `FOREIGN DATA WRAPPER`           | `U`            | none                        | `\dew+`      |
| `FOREIGN SERVER`                 | `U`            | none                        | `\des+`      |
| `LANGUAGE`                       | `U`            | `U`                         | `\dL+`       |
| `LARGE OBJECT`                   | `rw`           | none                        | `\dl+`       |
| `PARAMETER`                      | `sA`           | none                        | `\dconfig+`  |
| `SCHEMA`                         | `UC`           | none                        | `\dn+`       |
| `SEQUENCE`                       | `rwU`          | none                        | `\dp`        |
| `TABLE` (and table-like objects) | `arwdDxt`      | none                        | `\dp`        |
| Table column                     | `arwx`         | none                        | `\dp`        |
| `TABLESPACE`                     | `C`            | none                        | `\db+`       |
| `TYPE`                           | `U`            | `U`                         | `\dT+`       |

#### 5.8 行安全策略

#### 5.9 Schema

PostgreSQL 数据库集群包含一个或多个命名数据库。角色和一些其他对象类型在整个集群中共享。与服务器的客户端连接只能访问单个数据库（连接请求中指定的数据库）中的数据。

数据库包含一个或多个命名架构，而这些 _架构_ 又包含表。架构还包含其他类型的命名对象，包括数据类型、函数和运算符。相同的对象名称可以在不同的 schema 中使用，而不会发生冲突

与数据库不同，模式不是严格分离的：如果用户具有访问权限，则可以访问他们所连接的数据库中的任何模式中的对象。

架构类似于操作系统级别的目录，不同之处在于架构不能嵌套。

除了 `公共` 架构和用户创建的架构之外，每个数据库还包含一个 `pg_catalog` 架构，其中包含系统表和所有内置数据类型、函数和运算符。`pg_catalog` 始终是搜索路径的有效部分。如果未在路径中显式命名，则在搜索路径的架构_之前_会隐式搜索它。这可确保始终可找到内置名称。但是，如果您希望用户定义的名称覆盖内置名称，则可以将 `pg_catalog` 显式放在搜索路径的末尾。

在 SQL 标准中，不存在同一架构中的对象由不同用户拥有的概念。此外，某些实施不允许您创建名称与其所有者不同的架构。事实上，在仅实现标准中指定的基本架构支持的数据库系统中，schema 和 user 的概念几乎是等效的。  
SQL 标准中没有 `公共` 架构的概念

#### 5.11 表分区

分区是指将逻辑上的一个大表拆分为较小的物理块

- 范围分区
- 列表分区
- 哈希分区

### 6. 数据操作

### 7. 查询

#### 7.2 表表达式

联接类型
- natural
- cross
- inner
- outer
    - left
    - right
    - full

INNER 和 OUTER 这两个词在所有形式中都是可选的。INNER 是默认值;LEFT、RIGHT 和 FULL 表示外部联接。

内部联接的联接条件可以写在 `WHERE` 子句或 `JOIN` 子句中  
`FROM` 子句中的 `JOIN` 语法可能不适用于其他 SQL 数据库管理系统  
对于 outer joins，别无选择：它们必须在 `FROM` 子句中完成。

### 8. 数据类型

| Name                                            | Aliases                        | Description                                                        |
| ----------------------------------------------- | ------------------------------ | ------------------------------------------------------------------ |
| `bigint`                                        | `int8`                         | signed eight-byte integer                                          |
| `bigserial`                                     | `serial8`                      | autoincrementing eight-byte integer                                |
| ``bit [ (_`n`_) ]``                             |                                | fixed-length bit string                                            |
| ``bit varying [ (_`n`_) ]``                     | ``varbit [ (_`n`_) ]``         | variable-length bit string                                         |
| `boolean`                                       | `bool`                         | logical Boolean (true/false)                                       |
| `box`                                           |                                | rectangular box on a plane                                         |
| `bytea`                                         |                                | binary data (“byte array”)                                         |
| ``character [ (_`n`_) ]``                       | ``char [ (_`n`_) ]``           | fixed-length character string                                      |
| ``character varying [ (_`n`_) ]``               | ``varchar [ (_`n`_) ]``        | variable-length character string                                   |
| `cidr`                                          |                                | IPv4 or IPv6 network address                                       |
| `circle`                                        |                                | circle on a plane                                                  |
| `date`                                          |                                | calendar date (year, month, day)                                   |
| `double precision`                              | `float8`                       | double precision floating-point number (8 bytes)                   |
| `inet`                                          |                                | IPv4 or IPv6 host address                                          |
| `integer`                                       | `int`, `int4`                  | signed four-byte integer                                           |
| ``interval [ _`fields`_ ] [ (_`p`_) ]``         |                                | time span                                                          |
| `json`                                          |                                | textual JSON data                                                  |
| `jsonb`                                         |                                | binary JSON data, decomposed                                       |
| `line`                                          |                                | infinite line on a plane                                           |
| `lseg`                                          |                                | line segment on a plane                                            |
| `macaddr`                                       |                                | MAC (Media Access Control) address                                 |
| `macaddr8`                                      |                                | MAC (Media Access Control) address (EUI-64 format)                 |
| `money`                                         |                                | currency amount                                                    |
| ``numeric [ (_`p`_, _`s`_) ]``                  | ``decimal [ (_`p`_, _`s`_) ]`` | exact numeric of selectable precision                              |
| `path`                                          |                                | geometric path on a plane                                          |
| `pg_lsn`                                        |                                | PostgreSQL Log Sequence Number                                     |
| `pg_snapshot`                                   |                                | user-level transaction ID snapshot                                 |
| `point`                                         |                                | geometric point on a plane                                         |
| `polygon`                                       |                                | closed geometric path on a plane                                   |
| `real`                                          | `float4`                       | single precision floating-point number (4 bytes)                   |
| `smallint`                                      | `int2`                         | signed two-byte integer                                            |
| `smallserial`                                   | `serial2`                      | autoincrementing two-byte integer                                  |
| `serial`                                        | `serial4`                      | autoincrementing four-byte integer                                 |
| `text`                                          |                                | variable-length character string                                   |
| ``time [ (_`p`_) ] [ without time zone ]``      |                                | time of day (no time zone)                                         |
| ``time [ (_`p`_) ] with time zone``             | `timetz`                       | time of day, including time zone                                   |
| ``timestamp [ (_`p`_) ] [ without time zone ]`` |                                | date and time (no time zone)                                       |
| ``timestamp [ (_`p`_) ] with time zone``        | `timestamptz`                  | date and time, including time zone                                 |
| `tsquery`                                       |                                | text search query                                                  |
| `tsvector`                                      |                                | text search document                                               |
| `txid_snapshot`                                 |                                | user-level transaction ID snapshot (deprecated; see `pg_snapshot`) |
| `uuid`                                          |                                | universally unique identifier                                      |
| `xml`                                           |                                | XML data                                                           |

The following types (or spellings thereof) are specified by SQL: `bigint`, `bit`, `bit varying`, `boolean`, `char`, `character varying`, `character`, `varchar`, `date`, `double precision`, `integer`, `interval`, `numeric`, `decimal`, `real`, `smallint`, `time` (with or without time zone), `timestamp` (with or without time zone), `xml`.

#### 数字类型

| Name               | Storage Size | Description                     | Range                                                                                    |
| ------------------ | ------------ | ------------------------------- | ---------------------------------------------------------------------------------------- |
| `smallint`         | 2 bytes      | small-range integer             | -32768 to +32767                                                                         |
| `integer`          | 4 bytes      | typical choice for integer      | -2147483648 to +2147483647                                                               |
| `bigint`           | 8 bytes      | large-range integer             | -9223372036854775808 to +9223372036854775807                                             |
| `decimal`          | variable     | user-specified precision, exact | up to 131072 digits before the decimal point; up to 16383 digits after the decimal point |
| `numeric`          | variable     | user-specified precision, exact | up to 131072 digits before the decimal point; up to 16383 digits after the decimal point |
| `real`             | 4 bytes      | variable-precision, inexact     | 6 decimal digits precision                                                               |
| `double precision` | 8 bytes      | variable-precision, inexact     | 15 decimal digits precision                                                              |
| `smallserial`      | 2 bytes      | small autoincrementing integer  | 1 to 32767                                                                               |
| `serial`           | 4 bytes      | autoincrementing integer        | 1 to 2147483647                                                                          |
| `bigserial`        | 8 bytes      | large autoincrementing integer  | 1 to 9223372036854775807                                                                 |

#### 货币类型

#### 字符类型

| Name                                                     | Description                              |
| -------------------------------------------------------- | ---------------------------------------- |
| ``character varying(_`n`_)``, ``varchar(_`n`_)``         | variable-length with limit               |
| ``character(_`n`_)``, ``char(_`n`_)``, ``bpchar(_`n`_)`` | fixed-length, blank-padded               |
| `bpchar`                                                 | variable unlimited length, blank-trimmed |
| `text`                                                   | variable unlimited length                |

#### 二进制数据类型

#### 日期时间类型

| Name                                            | Storage Size | Description                           | Low Value        | High Value      | Resolution    |
| ----------------------------------------------- | ------------ | ------------------------------------- | ---------------- | --------------- | ------------- |
| ``timestamp [ (_`p`_) ] [ without time zone ]`` | 8 bytes      | both date and time (no time zone)     | 4713 BC          | 294276 AD       | 1 microsecond |
| ``timestamp [ (_`p`_) ] with time zone``        | 8 bytes      | both date and time, with time zone    | 4713 BC          | 294276 AD       | 1 microsecond |
| `date`                                          | 4 bytes      | date (no time of day)                 | 4713 BC          | 5874897 AD      | 1 day         |
| ``time [ (_`p`_) ] [ without time zone ]``      | 8 bytes      | time of day (no date)                 | 00:00:00         | 24:00:00        | 1 microsecond |
| ``time [ (_`p`_) ] with time zone``             | 12 bytes     | time of day (no date), with time zone | 00:00:00+1559    | 24:00:00-1559   | 1 microsecond |
| ``interval [ _`fields`_ ] [ (_`p`_) ]``         | 16 bytes     | time interval                         | -178000000 years | 178000000 years | 1 microsecond |

#### 布尔类型

#### 枚举类型

#### 几何类型

| Name      | Storage Size | Description                      | Representation                      |
| --------- | ------------ | -------------------------------- | ----------------------------------- |
| `point`   | 16 bytes     | Point on a plane                 | `(x,y)`                               |
| `line`    | 24 bytes     | Infinite line                    | `{A,B,C}`                             |
| `lseg`    | 32 bytes     | Finite line segment              | `((x1,y1),(x2,y2))`                   |
| `box`     | 32 bytes     | Rectangular box                  | `((x1,y1),(x2,y2))`                   |
| `path`    | 16+16n bytes | Closed path (similar to polygon) | `((x1,y1),...)`                       |
| `path`    | 16+16n bytes | Open path                        | `[(x1,y1),...]`                       |
| `polygon` | 40+16n bytes | Polygon (similar to closed path) | `((x1,y1),...)`                       |
| `circle`  | 24 bytes     | Circle                           | `<(x,y),r> (center point and radius)` |

#### 网络地址类型

| Name       | Storage Size  | Description                      |
| ---------- | ------------- | -------------------------------- |
| `cidr`     | 7 or 19 bytes | IPv4 and IPv6 networks           |
| `inet`     | 7 or 19 bytes | IPv4 and IPv6 hosts and networks |
| `macaddr`  | 6 bytes       | MAC addresses                    |
| `macaddr8` | 8 bytes       | MAC addresses (EUI-64 format)    |

#### 位字符串类型

#### 文本搜索类型

#### UUID 类型

#### XML 类型

#### JSON 类型

#### 数组

#### 复合类型

#### 范围类型

#### 域类型

#### 对象标识符类型

#### pg_lsn 类型

#### 伪类型

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `any`                     | Indicates that a function accepts any input data type.                                                                                                                                                                                                                                                                                                                         |
| `anyelement`              | Indicates that a function accepts any data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types")).                                                                                                                                                                                  |
| `anyarray`                | Indicates that a function accepts any array data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types")).                                                                                                                                                                            |
| `anynonarray`             | Indicates that a function accepts any non-array data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types")).                                                                                                                                                                        |
| `anyenum`                 | Indicates that a function accepts any enum data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types") and [Section 8.7](https://www.postgresql.org/docs/current/datatype-enum.html "8.7. Enumerated Types")).                                                                       |
| `anyrange`                | Indicates that a function accepts any range data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types") and [Section 8.17](https://www.postgresql.org/docs/current/rangetypes.html "8.17. Range Types")).                                                                            |
| `anymultirange`           | Indicates that a function accepts any multirange data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types") and [Section 8.17](https://www.postgresql.org/docs/current/rangetypes.html "8.17. Range Types")).                                                                       |
| `anycompatible`           | Indicates that a function accepts any data type, with automatic promotion of multiple arguments to a common data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types")).                                                                                                            |
| `anycompatiblearray`      | Indicates that a function accepts any array data type, with automatic promotion of multiple arguments to a common data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types")).                                                                                                      |
| `anycompatiblenonarray`   | Indicates that a function accepts any non-array data type, with automatic promotion of multiple arguments to a common data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types")).                                                                                                  |
| `anycompatiblerange`      | Indicates that a function accepts any range data type, with automatic promotion of multiple arguments to a common data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types") and [Section 8.17](https://www.postgresql.org/docs/current/rangetypes.html "8.17. Range Types")).      |
| `anycompatiblemultirange` | Indicates that a function accepts any multirange data type, with automatic promotion of multiple arguments to a common data type (see [Section 38.2.5](https://www.postgresql.org/docs/current/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC "38.2.5. Polymorphic Types") and [Section 8.17](https://www.postgresql.org/docs/current/rangetypes.html "8.17. Range Types")). |
| `cstring`                 | Indicates that a function accepts or returns a null-terminated C string.                                                                                                                                                                                                                                                                                                       |
| `internal`                | Indicates that a function accepts or returns a server-internal data type.                                                                                                                                                                                                                                                                                                      |
| `language_handler`        | A procedural language call handler is declared to return `language_handler`.                                                                                                                                                                                                                                                                                                   |
| `fdw_handler`             | A foreign-data wrapper handler is declared to return `fdw_handler`.                                                                                                                                                                                                                                                                                                            |
| `table_am_handler`        | A table access method handler is declared to return `table_am_handler`.                                                                                                                                                                                                                                                                                                        |
| `index_am_handler`        | An index access method handler is declared to return `index_am_handler`.                                                                                                                                                                                                                                                                                                       |
| `tsm_handler`             | A tablesample method handler is declared to return `tsm_handler`.                                                                                                                                                                                                                                                                                                              |
| `record`                  | Identifies a function taking or returning an unspecified row type.                                                                                                                                                                                                                                                                                                             |
| `trigger`                 | A trigger function is declared to return `trigger.`                                                                                                                                                                                                                                                                                                                            |
| `event_trigger`           | An event trigger function is declared to return `event_trigger.`                                                                                                                                                                                                                                                                                                               |
| `pg_ddl_command`          | Identifies a representation of DDL commands that is available to event triggers.                                                                                                                                                                                                                                                                                               |
| `void`                    | Indicates that a function returns no value.                                                                                                                                                                                                                                                                                                                                    |
| `unknown`                 | Identifies a not-yet-resolved type, e.g., of an undecorated string literal.                                                                                                                                                                                                                                                                                                    |

### 9. 函数和运算符
### 10. 类型转换
### 11. 索引
### 12. 全文搜索
### 13. 并发控制
## 三. 服务器管理

## 四. 客户端接口

## 五. 服务器编程

## 六. 参考资料

[PostgreSQL: Documentation: 16: SQL Commands](https://www.postgresql.org/docs/current/sql-commands.html)

## 七. 内部结构

## 八. 附录

[PostgreSQL: Documentation: 16: Appendix C. SQL Key Words](https://www.postgresql.org/docs/current/sql-keywords-appendix.html)