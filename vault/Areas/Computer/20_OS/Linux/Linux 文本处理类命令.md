---
created: 2025-10-31T02:49
modified: 2026-01-11T22:24
---

## head, tail

## grep

- -v
- -n 显示行号

```shell
# 排除空行和注释
grep -v '^$' filepath | grep -Ev '^\s*#'
```

从指定文件中搜索
```shell
find .obsidian -name "data.json" -exec grep -l "Inbox\|Archives" {} \;
grep -rn --include="data.json" "Inbox\|Archives" .obsidian
rg "Inbox|Archives" -g "**/data.json" .obsidian
```

## sed

```shell
# 删除行
sed '1d;$d'

# 替换换行
sed ':a;N;$!ba;s/\n/,/g' path/file

# 删除行首空格
sed 's/^[ ]*//g' path/file
```

## awk

## cut

## tr

```shell
# 替换换行
tr "\n" "," < path/file > path/to/file
```

## sort

## uniq

## comm

```shell
comm -3 <(command1 | sort) <(command2 | sort)
```

## join

## paste

## diff

```shell
# 比较两个命令的输出
diff <(command1) <(command2)
```