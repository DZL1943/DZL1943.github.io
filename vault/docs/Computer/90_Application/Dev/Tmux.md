---
created: 2026-01-10T16:01
modified: 2026-01-14T19:34
url: 
  - https://github.com/tmux/tmux/wiki/Getting-Started
---

## 命令

参考 `tmux list-commands`

- attach-session/attach
- bind-key/bind
- detach-client/detach
- list-commands/lscm
- list-keys/lsk
- list-sessions/ls
- new-session/new
- set-option/set
- show-options/show

## 快捷键

默认的 prefix key: `C-b`  
参考 `tmux list-keys -N`

%%[list2table]%%
- C-b C-b    | Send the prefix key
- C-b C-o    | Rotate through the panes
- C-b C-z    | Suspend the current client
- C-b Space  | Select next layout
- C-b !      | Break pane to a new window
- C-b "      | **Split window vertically**
- C-b #      | List all paste buffers
- C-b $      | Rename current session
- C-b %      | **Split window horizontally**
- C-b &      | **Kill current window**
- C-b '      | Prompt for window index to select
- C-b (      | Switch to previous client
- C-b )      | Switch to next client
- C-b ,      | Rename current window
- C-b -      | Delete the most recent paste buffer
- C-b .      | Move the current window
- C-b /      | Describe key binding
- C-b 0      | Select window 0
- C-b 1      | Select window 1
- C-b 2      | Select window 2
- C-b 3      | Select window 3
- C-b 4      | Select window 4
- C-b 5      | Select window 5
- C-b 6      | Select window 6
- C-b 7      | Select window 7
- C-b 8      | Select window 8
- C-b 9      | Select window 9
- C-b :      | Prompt for a command
- C-b ;      | Move to the previously active pane
- C-b =      | Choose a paste buffer from a list
- C-b ?      | **List key bindings**
- C-b C      | Customize options
- C-b D      | Choose and detach a client from a list
- C-b E      | Spread panes out evenly
- C-b L      | Switch to the last client
- C-b M      | Clear the marked pane
- C-b \[     | **Enter copy mode**
- C-b ]      | Paste the most recent paste buffer
- C-b c      | Create a new window
- C-b d      | **Detach the current client**
- C-b f      | Search for a pane
- C-b i      | Display window information
- C-b l      | Select the previously current window
- C-b m      | Toggle the marked pane
- C-b n      | Select the next window
- C-b o      | **Select the next pane**
- C-b p      | Select the previous window
- C-b q      | Display pane numbers
- C-b r      | Redraw the current client
- C-b s      | Choose a session from a list
- C-b t      | Show a clock
- C-b w      | Choose a window from a list
- C-b x      | **Kill the active pane**
- C-b z      | **Zoom the active pane**
- C-b \{      | Swap the active pane with the pane above
- C-b \}      | Swap the active pane with the pane below
- C-b ~      | Show messages
- C-b DC     | Reset so the visible part of the window follows the cursor
- C-b PPage  | Enter copy mode and scroll up
- C-b Up     | Select the pane above the active pane
- C-b Down   | Select the pane below the active pane
- C-b Left   | Select the pane to the left of the active pane
- C-b Right  | Select the pane to the right of the active pane
- C-b M-1    | Set the even-horizontal layout
- C-b M-2    | Set the even-vertical layout
- C-b M-3    | Set the main-horizontal layout
- C-b M-4    | Set the main-vertical layout
- C-b M-5    | Select the tiled layout
- C-b M-n    | Select the next window with an alert
- C-b M-o    | Rotate through the panes in reverse
- C-b M-p    | Select the previous window with an alert
- C-b M-Up   | Resize the pane up by 5
- C-b M-Down | Resize the pane down by 5
- C-b M-Left | Resize the pane left by 5
- C-b M-Right| Resize the pane right by 5
- C-b C-Up   | Resize the pane up
- C-b C-Down | Resize the pane down
- C-b C-Left | Resize the pane left
- C-b C-Right| Resize the pane right
- C-b S-Up   | Move the visible part of the window up
- C-b S-Down | Move the visible part of the window down
- C-b S-Left | Move the visible part of the window left
- C-b S-Right| Move the visible part of the window right

## 配置

```properties
unbind C-b
set -g prefix C-z
bind C-z send-prefix
set -g prefix2 M-a
bind M-a send-prefix -2

set -g default-terminal "screen-256color"
set -g mouse on
set -s escape-time 10
set -sg repeat-time 600
set -g display-time 1000
set -g display-panes-time 800
set -g history-limit 5000
set -q -g status-utf8 on
setw -q -g utf8 on
set -g monitor-activity on

set -g base-index 1
setw -g pane-base-index 1
setw -g automatic-rename on
set -g renumber-windows on
set -g set-titles on
set -g set-titles-string '#I:#W'

set -g status-interval 10
#set -g status-position top
set -g status-style fg=black,bg=lightgray
set -g status-left ''
set -g status-right '%H:%M'
set -g window-status-format "#W"
set -g window-status-current-style 'bg=red, underscore'
set -g pane-active-border-style 'fg=red,bg=default'
#set -g pane-border-status top
set -g pane-border-format '#[bold]#{pane_title}#[default]'

bind-key -T copy-mode-vi WheelUpPane send -N1 -X scroll-up
bind-key -T copy-mode-vi WheelDownPane send -N1 -X scroll-down

set -g mode-keys vi
bind R source ~/.tmux.conf\; display "~/.tmux.conf sourced!"
bind _ split-window -v
bind | split-window -h
bind x kill-pane
bind X kill-window
bind Q confirm-before -p "kill-session #S? (y/n)" kill-session
#bind -r h select-pane -L  # move left
#bind -r j select-pane -D  # move down
#bind -r k select-pane -U  # move up
#bind -r l select-pane -R  # move right
#bind > swap-pane -D       # swap current pane with the next one
#bind < swap-pane -U       # swap current pane with the previous one
#bind -r H resize-pane -L 2
#bind -r J resize-pane -D 2
#bind -r K resize-pane -U 2
#bind -r L resize-pane -R 2

# Mouse menu behavior
# Window tab menu
bind-key  -T root  MouseDown3Status       display-menu -O -T "#[align=centre]#{window_index}:#{window_name}" -t = -x W -y S\
  "Swap Left"                         l "swap-window -t:-1"                                  \
  "Swap Right"                        r "swap-window -t:+1"                                  \
  "#{?pane_marked_set,,-}Swap Marked" s swap-window                                          \
  ""                                                                                         \
  Kill                                X kill-window                                          \
  Respawn                             R "respawn-window -k"                                  \
  "#{?pane_marked,Unmark,Mark}"       m "select-pane -m"                                     \
  Rename                              n "command-prompt -I \"#W\" \"rename-window -- '%%'\"" \
  ""                                                                                         \
  "New After"                         w "new-window -a"                                      \
  "New At End"                        W new-window

# Window status left menu
bind-key  -T root  MouseDown3StatusLeft   display-menu -O -T "#[align=centre]#{session_name}" -t = -x M -y S \
  Next          n "switch-client -n"                                    \
  Previous      p "switch-client -p"                                    \
  ""                                                                    \
  Renumber      N "move-window -r"                                      \
  Rename        n "command-prompt -I \"#S\" \"rename-session -- '%%'\"" \
  ""                                                                    \
  "New Session" s new-session                                           \
  "New Window"  w "new-window -c \"#{pane_current_path}\""              \

# Window status right menu
bind-key  -T root  MouseDown3StatusRight  display-menu -O -T "#[align=centre]#{client_name}" -t = -x M -y S \
  Detach            d   detach-client                                                        \
  "Detach & Kill"   X   "detach-client -P"                                                   \
  "Detach Others"   o   "detach-client -a"                                                   \
  ""                                                                                         \
  "Save session"    C-s "run-shell ~/.tmux/plugins/tmux-resurrect/scripts/save.sh"           \
  "Restore session" C-r "run-shell ~/.tmux/plugins/tmux-resurrect/scripts/restore.sh"        \
  "Switch to"       g   "run-shell ~/.tmux/plugins/tmux-sessionist/scripts/goto_session.sh"  \
  ""                                                                                         \
  "Reload config"   R   "source-file ~/.tmux.conf \; display-message \"Config reloaded...\"" \
  "Install plugin"  I   "run-shell ~/.tmux/plugins/tpm/bindings/install_plugins"             \
  ""                                                                                         \
  Lock              l   lock-client                                                          \

# Pane
# Pane menu
bind-key -n MouseDown3Pane      display-menu -O -T "#[align=centre] Menu (#{pane_index}) " -t = -x '#{?#{e|>:#{e|+:#{e|+:#{popup_mouse_x}, 1}, #{popup_width}}, #{client_width}}, #{e|-:#{e|-:#{popup_mouse_x}, 1}, #{popup_width}}, #{e|+:#{popup_mouse_x}, 1}}' -y '#{?#{e|>:#{e|+:#{popup_mouse_y}, #{popup_height}}, #{client_height}}, #{popup_mouse_y}, #{e|+:#{popup_mouse_y}, #{popup_height}}}' \
  "Search regexp"                                                 /   "run-shell ~/.tmux/plugins/tmux-copycat/scripts/copycat_search.sh" \
  "#{?mouse_word,Search For #[underscore]#{=/9/...:mouse_word},}" C-r "copy-mode -t=; send -Xt= search-backward \"#{q:mouse_word}\""     \
  "#{?mouse_word,Copy #[underscore]#{=/9/...:mouse_word},}"       c   "run-shell -b \"tmux set-buffer -- '#{q:mouse_word}' && tmux show-buffer | timeout 1 wl-copy\"" \
  "#{?mouse_line,Copy Line,}"                                     l   "run-shell -b \"tmux set-buffer -- '#{q:mouse_line}' && tmux show-buffer | timeout 1 wl-copy\"" \
  "Paste"                                                         p   "paste-buffer"                                                     \
  ""                                                                                                                                     \
  "Toggle logging"                                                P   "run-shell ~/.tmux/plugins/tmux-logging/scripts/toggle_logging.sh" \
  "Screen capture"                                                M-p "run-shell ~/.tmux/plugins/tmux-logging/scripts/screen_capture.sh" \
  "Save history"                                                  M-P "run-shell ~/.tmux/plugins/tmux-logging/scripts/save_complete_history.sh" \
  "Clear pane history"                                            M-c "run-shell ~/.tmux/plugins/tmux-logging/scripts/clear_history.sh"  \
  ""                                                                                                                                     \
  "Horizontal Split"                                              h   "split-window -h -c \"#{pane_current_path}\""                      \
  "Vertical Split"                                                v   "split-window -v -c \"#{pane_current_path}\""                      \
  ""                                                                                                                                     \
  "Swap Up"                                                       u   "swap-pane -U"                                                     \
  "Swap Down"                                                     d   "swap-pane -D"                                                     \
  "#{?pane_marked_set,,-}Swap Marked"                             s   swap-pane                                                          \
  ""                                                                                                                                     \
  Kill                                                            X   kill-pane                                                          \
  Respawn                                                         R   "respawn-pane -k"                                                  \
  "#{?pane_marked,Unmark,Mark}"                                   m   "select-pane -m"                                                   \
  ""                                                                                                                                     \
  "#{?window_zoomed_flag,Unzoom,Zoom}"                            z   "resize-pane -Z"    \
```

### prefix key

- a 备选
- b 默认
- z 推荐
- q
- x
- s
- \`
- \ 

## 问题技巧

### 随 shell 自动运行

[tmux Integration - Documentation - iTerm2 - macOS Terminal Replacement](https://iterm2.com/documentation-tmux-integration.html)  
[iterm2 - iTerm 2 not honoring key bindings declared in .tmux.conf - Stack Overflow](https://stackoverflow.com/questions/26063195/iterm-2-not-honoring-key-bindings-declared-in-tmux-conf)