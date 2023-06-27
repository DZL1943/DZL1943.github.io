---
created: 2025-10-21T09:06
modified: 2025-10-21T09:06
---

## 配置

```yaml
import:
  # https://github.com/alacritty/alacritty-theme
  - ~/.config/alacritty/themes/themes/ayu_dark.yaml

env:
  TERM: xterm-256color

tabspaces: 4

font:
  size: 20
  normal:
    family: Monaco

window:
  # 优化标题栏和控制按钮的显示
  #padding:
  #  x: 10
  #  y: 20
  # 起始位置 (x 受台前调度影响)
  position:
    x: 300
    y: 100
  # 窗口大小
  dimensions:
    columns: 80
    lines: 25
  #startup_mode: SimpleFullscreen
  decorations: buttonless
  opacity: 0.95

selection:
  save_to_clipboard: true

shell:
  program: /bin/zsh
  args:
    - -l
    #- -c
    #- "tmux attach || tmux"

key_bindings:
  - {key: R, mods: Command, chars: "\x0c"}
```