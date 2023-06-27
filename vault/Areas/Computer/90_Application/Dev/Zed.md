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
// custom settings, run the `zed: Open Default Settings` command
// from the command palette
{
  "ui_font_size": 16,
  "buffer_font_size": 16,
  "theme": {
    "mode": "system",
    "light": "One Light",
    "dark": "One Dark"
  },
  "telemetry": {
    // Send debug info like crash reports.
    "diagnostics": false,
    // Send anonymized usage data like what languages you're using Zed with.
    "metrics": false
  },
  "features": {
    // Which edit prediction provider to use.
    "edit_prediction_provider": "none"
  },

  "on_last_window_closed": "quit_app",

  "project_panel": { "button": false },
  "outline_panel": { "button": false },
  "search": { "button": false },
  "git_panel": { "button": false },
  "agent": { "button": false },
  "collaboration_panel": { "button": false },
  "notification_panel": { "button": false },
  "debugger": { "button": false },
  "diagnostics": { "button": false },
  "terminal": { "button": false },
  "global_lsp_settings": { "button": false },

  "status_bar": { "experimental.show": false},

  "toolbar": {
    "breadcrumbs": false, // Whether to show breadcrumbs.
    "quick_actions": false, // Whether to show quick action buttons.
    "selections_menu": false, // Whether to show the Selections menu
    "agent_review": false, // Whether to show agent review buttons
    "code_actions": false // Whether to show code action buttons
  },

  "title_bar": {
    // Whether to show user picture in the titlebar.
    "show_user_picture": false,
    // Whether to show the sign in button in the titlebar.
    "show_sign_in": false
  },

  "tab_bar": {
    "show": true, // Show/hide the tab bar
    "show_nav_history_buttons": false, // Show/hide history buttons on tab bar
    "show_tab_bar_buttons": false // Show hide buttons (new, split, zoom)
  },

  "gutter": {
    // Whether to show line numbers in the gutter.
    "line_numbers": true,
    // Whether to show runnables buttons in the gutter.
    "runnables": true,
    // Whether to show breakpoints in the gutter.
    "breakpoints": true,
    // Whether to show fold buttons in the gutter.
    "folds": true,
    // Minimum number of characters to reserve space for in the gutter.
    "min_line_number_digits": 2
  }
}
```