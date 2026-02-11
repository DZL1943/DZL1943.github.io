---
created: 2025-10-21T09:03
modified: 2025-10-21T09:03
---

## 配置

```json
// Zed settings
//
// For information on how to configure Zed, see the Zed
// documentation: https://zed.dev/docs/configuring-zed
//
// To see all of Zed's default settings without changing your
// custom settings, run `zed: open default settings` from the
// command palette (cmd-shift-p / ctrl-shift-p)
{
  "colorize_brackets": true,
  "prettier": {
    "allowed": true,
  },
  "scrollbar": {
    "axes": {
      "horizontal": false,
    },
  },
  "status_bar": {
    "active_language_button": true,
    "cursor_position_button": false,
  },
  "debugger": {
    "button": false,
  },
  "diagnostics": {
    "button": false,
  },
  "search": {
    "button": false,
  },
  "disable_ai": true,
  "terminal": {
    "button": false,
    "copy_on_select": true,
    "option_as_meta": true,
  },
  "notification_panel": {
    "button": false,
  },
  "agent": {
    "button": false,
    "favorite_models": [],
    "model_parameters": [],
  },
  "collaboration_panel": {
    "button": false,
  },
  "project_panel": {
    "auto_open": {
      "on_drop": false,
      "on_paste": false,
    },
    "hide_root": true,
    "auto_reveal_entries": false,
  },
  "title_bar": {
    "show_sign_in": false,
  },
  "use_on_type_format": false,
  "remove_trailing_whitespace_on_save": false,
  "format_on_save": "off",
  "vim": {
    "use_smartcase_find": true,
    "toggle_relative_line_numbers": true,
  },
  "toolbar": {
    "agent_review": true,
    "selections_menu": true,
    "quick_actions": false,
    "breadcrumbs": false,
  },
  "gutter": {
    "min_line_number_digits": 2,
  },
  "relative_line_numbers": "disabled",
  "which_key": {
    "enabled": true,
  },
  "autosave": "on_window_change",
  "telemetry": {
    "diagnostics": false,
    "metrics": false,
  },
  "buffer_font_size": 15.0,
  "theme": {
    "mode": "dark",
    "light": "One Light",
    "dark": "Dracula",
  },
}

```