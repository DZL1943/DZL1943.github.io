---
created: 2025-09-02T11:59
modified: 2025-09-02T11:59
url:
  - https://jqlang.org/manual/
---

## 过滤器

- Identity: `.`
- Object Identifier-Index: `.foo`, `.foo.bar`
- Optional Object Identifier-Index: `.foo?`
- Object Index: `.[<string>]`
- Array Index: `.[<number>]`
- Array/String Slice: `.[<number>:<number>]`
- Array/Object Value Iterator: `.[]`
- `.[]?`
- Comma: `,`
- Pipe: `|`
- Parenthesis

## [运算符和函数](https://jqlang.org/manual/#builtin-operators-and-functions)

- `keys`, `keys_unsorted`
- `has(key)`
- `in`
- `to_entries`, `from_entries`, `with_entries(f)`
- `select(boolean_expression)`
- `sort`, `sort_by(path_expression)`

## Tips

### 不支持非标 json

例如注释、多余逗号

### 格式化输出

```shell
# -C 可以保留彩色
jq -C '.' extensions.json | less
```

### to csv

[How to convert arbitrary simple JSON to CSV using jq? - Stack Overflow](https://stackoverflow.com/questions/32960857/how-to-convert-arbitrary-simple-json-to-csv-using-jq)

### 输出顶层的 keys

`jq 'keys' xxx.json`

### 选择数组元素

`jq '.addons[0]' xxx.json`

[jq cheat sheet | Zendesk Developer Docs](https://developer.zendesk.com/documentation/integration-services/developer-guide/jq-cheat-sheet/)
### 选择对象属性

`jq '.addons[].id xxx.json'`

### 排序
```shell
# 对json数组排序. sponge 是为了写回 json 文件
cat xxx.json | jq 'sort' | sponge xxx.json

jq '.desktop.plugins | to_entries | sort_by(.key) | from_entries' .obsidian/plugins/lazy-plugins/data.json
```

[Sorting JSON Objects | jq ‘sort’ Function Guide](https://ioflood.com/blog/jq-sort/)

### 删除

```shell
jq 'del (.lastOpenFiles[])'  workspace.json
```

### 原地修改

- sponge
- yq -i