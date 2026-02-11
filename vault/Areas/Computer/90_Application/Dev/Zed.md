---
created: 2025-10-21T09:03
modified: 2025-10-21T09:03
---

## Settings

```json
{
  "agent": {
    "button": false,
    "favorite_models": [],
    "model_parameters": []
  },
  "autosave": "on_window_change",
  "buffer_font_size": 16,
  "collaboration_panel": {
    "button": false
  },
  "colorize_brackets": true,
  "debugger": {
    "button": false
  },
  "diagnostics": {
    "button": false
  },
  "disable_ai": true,
  "format_on_save": "off",
  "gutter": {
    "min_line_number_digits": 2
  },
  "icon_theme": "Material Icon Theme",
  "languages": {
    "JavaScript": {
      "tab_size": 4
    },
    "Markdown": {
      "tab_size": 4
    }
  },
  "minimap": {
    "show": "auto"
  },
  "notification_panel": {
    "button": false
  },
  "on_last_window_closed": "quit_app",
  "project_panel": {
    "auto_open": {
      "on_drop": false,
      "on_paste": false
    },
    "auto_reveal_entries": false,
    "hide_root": true
  },
  "remove_trailing_whitespace_on_save": false,
  "scrollbar": {
    "axes": {
      "horizontal": false
    }
  },
  "search": {
    "button": false
  },
  "status_bar": {
    "cursor_position_button": false
  },
  "tab_size": 4,
  "telemetry": {
    "diagnostics": false,
    "metrics": false
  },
  "terminal": {
    "button": false,
    "copy_on_select": true,
    "option_as_meta": true
  },
  "theme": {
    "dark": "Dracula",
    "light": "One Light",
    "mode": "dark"
  },
  "title_bar": {
    "show_sign_in": false
  },
  "toolbar": {
    "agent_review": true,
    "breadcrumbs": false,
    "quick_actions": false,
    "selections_menu": true
  },
  "use_on_type_format": false,
  "vim": {
    "toggle_relative_line_numbers": true,
    "use_smartcase_find": true
  },
  "which_key": {
    "enabled": true
  }
}
```

## Extensions

- HTML
- Material Icon Theme
- Dracula
- Markdown Oxide
- Marksman
- Markdownlint

> [!tip] 貌似只有安装/卸载, 不支持状态启停

## Tips

外观层面
- title_bar: 无法取消或隐藏
- status_bar: 无法自动隐藏、调整按钮顺序

编辑层面
- 默认 indent 貌似没有生效, 建议明确写入配置.
- 折叠功能还不够好, 比如 markdown 标题

lsp
- 未保存的文件没有 lsp 支持.
- 无法禁用自动下载 lsp, 无法手动安装
