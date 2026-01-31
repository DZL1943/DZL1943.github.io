---
created: 2025-10-31T01:59
modified: 2026-01-11T22:24
---

## pwd, cd, pushd, popd

## mkdir

- -p: 不存在则创建父目录
- -m: 设置模式

## dirname, basename

## rename

```shell
# 更改后缀名
rename 's/\.txt$/.md/' *.txt

# 更改首字母大写
rename -f 's/^([a-z])/\u$1/' *
```

## chmod, chown, chgrp

## stat

## ln

```shell
# 创建软连接. 省略 name (但要保留尾斜杠)默认同名
ln -s source_path target_path/name
# 删除软连接注意不要带尾斜杠
```

## ls

- -A: 显示.开头的项, 但是除了.和..
- -C: (默认)多列显示
- -F: 显示类型标识
    - `/` 目录
    - `*` 可执行文件
    - `@` 符号链接
    - `=` socket
    - `%` whiteout
    - `|` FIFO
- -p: 目录加上尾斜杆
- -P
- -L 
- -H
- -R 递归显示子目录
- -r: reverse order
- -S: sort by size
- -t: sort by desc time modified
- -u: time of last access

```
# The Long Format
-     Regular file.
b     Block special file.
c     Character special file.
d     Directory.
l     Symbolic link.
p     FIFO.
s     Socket.
w     Whiteout.
```

### 仅列出目录

```shell
# .* 将包括隐藏项(如果不存在将失败)
ls -d1 */ .[^.]*/ | sed -e 's-/$--'
# or
gfind . -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort
```

### 打印目录树

```shell
ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'
```

## cp

- -a archive
- -b backup
- -l 硬链接
- -L always follow symbolic links in SOURCE
- -P never follow symbolic links in SOURCE
- --parents: 保留目录结构
- -s 符号链接
- -T treat DEST as a normal file
- -u: 只在目标不存在或不同时进行

> [!tip] `cp -r dir/. dir2` 可将 dir 中的所有内容复制到 dir2  
> macOS: If the source_file ends in a /, the contents of the directory are copied rather than the directory itself.

## mv

- 文件到文件
    - 若目标存在, 则覆盖
    - 若不存在, 则重命名
- 文件到目录
    - 若目标存在, 则移入
    - **若不存在, 则当成文件重命名**
- 文件到目录/
    - 若目标存在, 则移入
    - 若不存在, 则报错
- 目录到目录
    - 若目标存在, 则移入
    - 若不存在, 则重命名

## rm

```shell
# 不建议
rm -rf * .*

rm -rf {,.[!.],..?}*

ls -A1 | xargs -I{} rm -rf {}

find . -mindepth 1 -delete
```

## touch

## cat, less

## find

```shell
# 仅输出路径
gfind .obsidian -maxdepth 1 -type f -printf '%P\n'
```

```shell
# 查询特定后缀的文件
find . -name '*.json'
```

```shell
# 排除目录
find . ! \( -path './.trash/*' -o -path './.obsidian/*' \) -name '*.png'

find . ! -path './.trash/*' ! -path './resources/*' ! -path './.obsidian/*' -name '*.png' -exec ls -lh {} \;
```

```shell
# 查询大文件
find . -size +100M -exec ls -lh {} \;
```

## fd

- `--no-ignore`

## fzf

```shell
cd **<TAB>
vim $(fzf)
# 通过 bat 预览
fzf --preview='bat --theme=Dracula --color=always {}' --preview-window='right:65%' --bind alt-up:preview-up,alt-down:preview-down
# 通过 glow 预览 markdown
fzf --preview='glow --style=dark {}' --preview-window='right:65%' --bind alt-up:preview-up,alt-down:preview-down
```

## du

`du -hd1`

## zip

```shell
# 最好是先 cd 到 source_path
zip -r dest_path source_path -e
unzip -l filename
unzip filename -d path

for i in */; do zip -r "${i%/}.zip" "$i"; done
```

## tar

```shell
# 压缩 path 下所有内容到当前目录 (这种写法在解压时最好指定目录名)
tar czvf filename.tar.gz -C path .
# 查看
tar tvf filename.tar.gz
# 解压到指定目录 (要求目录存在)
tar xvf filename.tar.gz -C path
```

## rsync

重要选项
- -a
- -n
- --no-links
- --delete
- --exclude
- -P

辅助选项
- -v
- -h

注意
- 源路径尾斜杆指目录内容不包括目录自身

用例
- `{shell} rsync -avh source ~/bak`
