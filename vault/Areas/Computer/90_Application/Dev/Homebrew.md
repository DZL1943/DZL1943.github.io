---
created: 2024-04-22T20:39
modified: 2025-10-21T19:44
url:
  - https://github.com/Homebrew/brew
  - https://docs.brew.sh/
---

## 安装

repo
- brew
- homebrew-core
- homebrew-cask
- homebrew-command-note-found
- install

注:
- 自 brew 4.0.0 (2023 年 2 月 16 日) 起,`HOMEBREW_INSTALL_FROM_API` 会成为默认行为,无需设置.大部分用户无需再克隆 homebrew-core 仓库,故无需设置 `HOMEBREW_CORE_GIT_REMOTE` 环境变量;但若需要运行 brew 的开发命令或者 brew 安装在非官方支持的默认 prefix 位置,则仍需设置 `HOMEBREW_CORE_GIT_REMOTE` 环境变量.如果不想通过 API 安装,可以设置 `HOMEBREW_NO_INSTALL_FROM_API=1`.
- 目前,`homebrew-cask-{drivers,versions,fonts}` 已被弃用,所有 cask 合并至 homebrew-cask 仓库.本帮助内已移除克隆这些仓库的命令.已克隆用户(brew tap 查看)可使用 brew untap 移除废弃的仓库.
- 截止到 brew 4.6.12,`homebrew-{services,bundle,homebrew-command-not-found}` 均已被弃用,所有 tap 合并至 brew 仓库.本帮助内已移除克隆这些仓库的命令.已克隆用户(brew tap 查看)可使用 brew untap 移除废弃的仓库.

```shell
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_INSTALL_FROM_API=1
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_PIP_INDEX_URL="https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple"

# 从镜像下载安装脚本并安装 Homebrew / Linuxbrew
git clone --depth=1 https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/install.git brew-install
/bin/bash brew-install/install.sh
rm -rf brew-install

# 也可从 GitHub 获取官方安装脚本安装 Homebrew / Linuxbrew
#/bin/bash -c "$(curl -fsSL https://github.com/Homebrew/install/raw/master/install.sh)"

# 安装成功后需将 brew 程序的相关路径加入到环境变量中
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.bash_profile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile

# 替换现有仓库上游
# 注：自 brew 4.0 起，大部分 Homebrew 用户无需设置 homebrew/core 和 homebrew/cask 镜像，只需设置 HOMEBREW_API_DOMAIN 即可。
# 如果需要使用 Homebrew 的开发命令 (如 `brew cat <formula>`)，则仍然需要设置 homebrew/core 和 homebrew/cask 镜像。
# 请按需执行如下两行命令：
brew tap --custom-remote homebrew/core https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
brew tap --custom-remote homebrew/cask https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

brew update

# 环境变量持久化, 避免被 brew update 自动设置
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"' >> ~/.bash_profile  # bash
echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"' >> ~/.bash_profile
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"' >> ~/.profile
echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"' >> ~/.profile
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"' >> ~/.zprofile  # zsh
echo 'export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"' >> ~/.zprofile
# bottles
echo 'export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"' >> ~/.bash_profile
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"' >> ~/.bash_profile
echo 'export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"' >> ~/.zprofile
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"' >> ~/.zprofile
```

## 概念

- formula
- cask
- prefix
- keg
- rack
- Cellar: directory containing one or more named racks, e.g. /opt/homebrew/Cellar
- Tap: third-party repos
- Bottle: binary packages
- Bundle

## 命令

Built-in
```
--cache                   command                   info                      pyenv-sync                unpin
--caskroom                commands                  install                   rbenv-sync                untap
--cellar                  completions               leaves                    readall                   update-if-needed
--env                     config                    link                      reinstall                 update-report
--prefix                  deps                      list                      search                    update-reset
--repository              desc                      log                       services                  update
--version                 developer                 mcp-server                setup-ruby                upgrade
alias                     docs                      migrate                   shellenv                  uses
analytics                 doctor                    missing                   tab                       vendor-install
autoremove                fetch                     nodenv-sync               tap-info                  which-formula
bundle                    formulae                  options                   tap
casks                     gist-logs                 outdated                  unalias
cleanup                   help                      pin                       uninstall
command-not-found-init    home                      postinstall               unlink
```

## Tips

### 查找安装路径

`brew --prefix xxx`

### 更新和清理

- brew update: 更新自身
- brew outdated: 查看需要更新的包
- brew upgrade
- `brew cleanup --prune=all` 慎用!

### cask 缓存路径

brew --cache `~/Library/Caches/Homebrew/Cask`

### 导出安装列表

`brew bundle dump`

## 参考

- [homebrew | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)
- [Homebrew 源使用帮助 — USTC Mirror Help 文档](https://mirrors.ustc.edu.cn/help/brew.git.html)
- [homebrew镜像\_homebrew下载地址\_homebrew安装教程-阿里巴巴开源镜像站](https://developer.aliyun.com/mirror/homebrew/)
- [HomebrewCN: Homebrew 国内安装脚本,快速部署 brew ,国内镜像](https://gitee.com/cunkai/HomebrewCN)
- [程序员 Homebrew 使用指北 - 少数派 (sspai.com)](https://sspai.com/post/56009)

## Brewfile

```shell
brew "bat"
brew "coreutils"
brew "duf"
brew "dust"
brew "eza"
brew "fd"
brew "findutils"
brew "fish"
brew "fzf"
brew "gawk"
brew "gnu-sed"
brew "gnu-tar"
brew "grep"
brew "helix"
brew "httpx"
brew "jq"
brew "lazygit"
brew "lsd"
brew "lua"
brew "luarocks"
brew "mackup"
brew "mcfly"
brew "neovim"
brew "node"
brew "openjdk"
brew "ripgrep"
brew "starship"
brew "tealdeer"
brew "tmux"
brew "trash"
brew "tree-sitter-cli"
brew "wget"
brew "yazi"
brew "zellij"
brew "zoxide"
cask "font-hack-nerd-font"
```