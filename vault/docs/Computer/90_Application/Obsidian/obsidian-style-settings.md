---
title: Style Settings
created: 2025-05-10T15:00
modified: 2025-10-08T21:52
tags: [Obsidian/Plugins]
aliases: [Style Settings]
---

Configurable settings are defined by comments within CSS files beginning with `/* @settings`. These comments must contain YAML with `name`, `id`, and `settings` properties. Style Settings will scan for these comments in all CSS loaded by Obsidian from the `snippets`, `themes`, and `plugins` directories under your vault's configuration directory (`%yourVault%/.obsidian/`).

All settings definitions must have these parameters:

- `id`: A unique id for the setting parameter
- `title`: The name of the setting
- `description` (optional): a description of the setting
- `type`: The type of setting. Can be one of:
    - `heading`: a heading element for organizing settings
    - `class-toggle`: a switch to toggle classes on the `body` element
    - `class-select`: a dropdown menu of predefined options to add classes on the `body` element
    - `variable-text`: a text-based CSS variable
    - `variable-number`: a numeric CSS variable
    - `variable-number-slider`: a numeric CSS variable represented by a slider
    - `variable-select`: a text-based CSS variable displayed as a dropdown menu of predefined options
    - `variable-color`: a color CSS variable with corresponding color picker