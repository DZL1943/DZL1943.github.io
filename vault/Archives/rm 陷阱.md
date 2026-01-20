---
title: rm 陷阱
created: 2026-01-20T19:30
modified: 2026-01-20T19:33
tags:
  - AI
draft: true
---

<!-- truncate -->

## 问题场景

### 1. 通配符的"零匹配”陷阱

```bash
# 当没有匹配文件时,某些shell配置下:
rm *.log  # 没有.log文件 → 实际执行: rm

# 解决方案:设置nullglob或failglob
shopt -s nullglob  # 无匹配时展开为空
# 或
shopt -s failglob  # 无匹配时报错而非执行
```

### 2. 变量未定义或空值

```bash
# 最隐蔽的坑:变量为空
rm -rf ${DIRECTORY}/*

# 当DIRECTORY未定义时:rm -rf /*
# 解决方案:
rm -rf "${DIRECTORY:-/tmp/fallback}"/*  # 设置默认值
# 或
[[ -n "$DIRECTORY" ]] && rm -rf "$DIRECTORY"/*
```

### 3. 带空格的路径

```bash
# 文件名含空格
rm -rf My Documents/  # 删除"My"和"Documents/"
# 正确:
rm -rf "My Documents/"
rm -rf My\ Documents/
```

### 4. 点号开头文件

```bash
# 删除所有文件(包括隐藏文件)
rm -rf .*  # 危险!也会匹配到".."(上级目录)
# 应使用:
rm -rf .[!.]*  # 排除".."
```

### 5. 路径遍历攻击

```bash
# 用户输入作为参数时
rm -rf "$USER_INPUT"
# 用户输入"../../../etc" → 灾难
# 解决方案:
realpath=$(realpath --relative-to=. "$USER_INPUT")
[[ "$realpath" =~ ^/ ]] && echo "拒绝绝对路径" && exit 1
```

### 6. 脚本中的路径漂移

```bash
#!/bin/bash
cd /some/dir || exit
# 如果cd失败,脚本继续在当前目录执行
rm -rf ./cache/  # 可能删除错误目录
# 解决方案:
cd /some/dir || { echo "cd失败"; exit 1; }
```

## 解决方案

### 第一层: Shell 配置防护

```bash
# ~/.bashrc 或 ~/.zshrc
# 1. 防止通配符零匹配灾难
shopt -s failglob  # bash
# 或
setopt no_nomatch  # zsh

# 2. 设置安全选项
set -o noclobber   # 防止覆盖重要文件
set -o pipefail    # 管道中任一命令失败则失败

# 3. 危险命令提示
export RM_OPTIONS="-I"  # 删除超过3个文件时询问
```

### 第二层: 路径验证函数

```bash
# 任何脚本中都可用的安全函数
safe_delete() {
    local target="$1"
    local abs_path
    
    # 解析绝对路径
    abs_path=$(realpath "$target" 2>/dev/null)
    
    # 检查是否尝试删除根目录
    if [[ "$abs_path" == "/" ]]; then
        echo "错误:拒绝删除根目录" >&2
        return 1
    fi
    
    # 检查是否在保护列表
    local protected_dirs=("/etc" "/boot" "/usr" "/var" "/home")
    for dir in "${protected_dirs[@]}"; do
        if [[ "$abs_path" == "$dir" || "$abs_path" == "$dir"/* ]]; then
            echo "警告:尝试删除保护目录 $dir" >&2
            read -p "确认删除?(输入DELETE大写): " confirm
            [[ "$confirm" != "DELETE" ]] && return 1
        fi
    done
    
    # 显示将要删除的内容
    if [[ -d "$target" ]]; then
        echo "将删除目录: $target"
        echo "包含文件数: $(find "$target" -type f | wc -l)"
    fi
    
    # 执行删除
    command rm -rf "$target"
}
```

### 第三层: 针对特定场景的包装器

```bash
# 针对通配符场景
safe_wildcard_delete() {
    # 先扩展通配符,检查结果
    local files=($1)
    
    if [[ ${#files[@]} -eq 0 ]]; then
        echo "警告:通配符未匹配到任何文件" >&2
        return 1
    fi
    
    echo "匹配到 ${#files[@]} 个文件:"
    printf '  %s\n' "${files[@]:0:10}"
    (( ${#files[@]} > 10 )) && echo "  ... (还有更多)"
    
    read -p "确认删除?(y/N): " confirm
    [[ "$confirm" == "y" ]] || return 1
    
    rm -f "${files[@]}"
}

# 使用示例
safe_wildcard_delete "*.log"
```

### 第四层: 关键目录保护

```bash
# 创建不可删除的标记文件
protect_directory() {
    local dir="$1"
    touch "$dir/.protected"
    chattr +i "$dir/.protected" 2>/dev/null  # Linux
    # macOS: chflags uchg "$dir/.protected"
    
    # 设置目录本身不可删除 (仅Linux)
    chattr +i "$dir" 2>/dev/null
}

# 保护关键目录
protect_directory /etc
protect_directory /usr
protect_directory /home
```

### 第五层: rm 别名增强(非禁用)

```bash
# 增强版rm,不是替换
alias rm='_safe_rm'
_safe_rm() {
    # 检测危险模式
    if echo "$*" | grep -qE '\s-(r|f|rf|fr)'; then
        local args=()
        for arg in "$@"; do
            # 检查每个参数是否可能为路径
            if [[ "$arg" =~ ^/|^\.|^~ ]] && [[ -e "$arg" ]]; then
                echo "危险操作提醒:将删除 $arg"
                read -p "按Enter继续,或Ctrl+C取消"
            fi
            args+=("$arg")
        done
    fi
    
    # 执行原命令
    command rm "${args[@]}"
}
```

## 按问题类型的解决方案

| 问题类型 | 根本原因 | 针对性方案 |
|---------|---------|-----------|
| 通配符零匹配 | shell配置问题 | `shopt -s failglob` |
| 变量为空 | 缺少验证 | `rm "${VAR:-/tmp/fallback}"/*` |
| 路径含空格 | 引号问题 | 总是用引号包裹变量 |
| 点文件问题 | 模式匹配过广 | 使用`.[!.]*`而非`.*` |
| 路径遍历 | 未规范化路径 | 用`realpath`检查相对路径 |
| 脚本路径漂移 | 未检查命令返回值 | 关键命令后检查`$?` |

## 脚本模板: 安全的删除操作

```bash
#!/bin/bash
set -euo pipefail  # 关键:错误时退出,使用未定义变量时报错

delete_safely() {
    local target="$1"
    
    # 1. 规范化路径
    local abs_path
    abs_path=$(realpath "$target")
    
    # 2. 检查保护列表
    [[ "$abs_path" == "/" ]] && { echo "不能删除根目录"; exit 1; }
    
    # 3. 预检查
    if [[ -d "$abs_path" ]]; then
        echo "目录包含: $(find "$abs_path" -type f | wc -l) 个文件"
    fi
    
    # 4. 删除(保留原rm命令)
    rm -rf "$abs_path"
}

# 使用
delete_safely "$@"
```

## 核心原则

1. 不禁止`rm`,但增强安全性
2. 针对具体问题,而非一概而论
3. 在问题发生的层面解决(shell配置、脚本验证、文件系统)
4. 保留`rm`的灵活性,但添加安全护栏

这样既能继续使用喜欢的`rm`命令,又能避免其潜在的危害.