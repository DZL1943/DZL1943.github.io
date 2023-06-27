---
created: 2025-10-21T09:04
modified: 2025-10-21T09:04
---

## 配置

```properties
font_size 20.0
cursor_shape block
shell_integration enabled no-cursor
cursor_blink_interval 0
copy_on_select yes
remember_window_size  yes
initial_window_width  640
initial_window_height 400
enabled_layouts splits, stack
placement_strategy center
 hide_window_decorations no
tab_bar_style powerline
tab_title_template "{title.split('/')[-1]}"
background_opacity 0.9
dynamic_background_opacity yes
allow_remote_control yes
clipboard_control write-clipboard write-primary read-clipboard-ask read-primary-ask
shell_integration enabled
macos_titlebar_color system
macos_option_as_alt yes
map cmd+c       copy_to_clipboard
map cmd+v       paste_from_clipboard

map kitty_mod+] next_window
map kitty_mod+[ previous_window

map cmd+alt+enter launch --location=vsplit --cwd=current
map ctrl+alt+enter launch --location=hsplit --cwd=current

#map f5 launch --location=hsplit
#map f6 launch --location=vsplit
#map f4 launch --location=split
#map f7 layout_action rotate

# map shift+up move_window up
# map shift+left move_window left
# map shift+right move_window right
# map shift+down move_window down

# map ctrl+shift+up layout_action move_to_screen_edge top
# map ctrl+shift+left layout_action move_to_screen_edge left
# map ctrl+shift+right layout_action move_to_screen_edge right
# map ctrl+shift+down layout_action move_to_screen_edge bottom

#map ctrl+left neighboring_window left
#map ctrl+right neighboring_window right
#map ctrl+up neighboring_window up
#map ctrl+down neighboring_window down
```