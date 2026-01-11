---
created: 2025-10-21T09:08
modified: 2025-10-21T09:09
---

Zsh 在启动时会按照以下顺序加载配置文件：

1. `/etc/zshenv`（系统级）
2. `~/.zshenv`（用户级）
3. `/etc/zprofile`（系统级，仅登录 shell）
4. `~/.zprofile`（用户级，仅登录 shell）
5. `/etc/zshrc`（系统级，交互式 shell）
6. `~/.zshrc`（用户级，交互式 shell）
7. `/etc/zlogin`（系统级，仅登录 shell）
8. `~/.zlogin`（用户级，仅登录 shell）

几种重置当前 shell 环境的方式
- `exec zsh`
- `zsh`
- `env -i zsh`

```shell title:.zshrc
# 初始化补全系统（必须）
autoload -Uz compinit && compinit

# 配置Tab补全忽略大小写
zstyle ':completion:*' matcher-list 'm:{[:lower:][:upper:]}={[:upper:][:lower:]}' 'l:|=* r:|=*'

# 配置上下键根据输入前缀搜索历史命令
bindkey "^[[A" history-search-backward
bindkey "^[[B" history-search-forward

autoload -Uz vcs_info
precmd_vcs_info() { vcs_info }
precmd_functions+=( precmd_vcs_info )
setopt prompt_subst
PROMPT='%B%F{green}%1~%f%b${vcs_info_msg_0_} %#  '
zstyle ':vcs_info:git:*' formats ' %F{red}%b%f'


source ~/.alias

export FZF_DEFAULT_COMMAND='fd --type f --strip-cwd-prefix --hidden --follow --exclude .git|sort -r'
alias fzfp="fzf --preview='bat --theme=Dracula --color=always {}' --preview-window='right:65%' --bind alt-up:preview-up,alt-down:preview-down"
alias fzf-glow="fzf --preview='glow --style=dark {}' --preview-window='right:65%' --bind alt-up:preview-up,alt-down:preview-down"

# source <(fzf --zsh)
# eval "$(zoxide init zsh)"
# eval "$(mcfly init zsh)"
```