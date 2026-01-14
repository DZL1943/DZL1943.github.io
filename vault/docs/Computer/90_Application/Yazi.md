---
created: 2026-01-14T13:35
modified: 2026-01-14T13:35
url:
  - https://yazi-rs.github.io/
---

## Installation

prerequisites
- [`file`](https://github.com/file/file) (for file type detection)

optionally
- [nerd-fonts](https://www.nerdfonts.com/) ([_recommended_](https://yazi-rs.github.io/docs/faq#dont-like-nerd-fonts))
- [`ffmpeg`](https://www.ffmpeg.org/) (for video thumbnails)
- [7-Zip](https://www.7-zip.org/) (for archive extraction and preview, requires non-standalone version)
- [`jq`](https://jqlang.github.io/jq/) (for JSON preview)
- [`poppler`](https://poppler.freedesktop.org/) (for PDF preview)
- [`fd`](https://github.com/sharkdp/fd) (for file searching)
- [`rg`](https://github.com/BurntSushi/ripgrep) (for file content searching)
- [`fzf`](https://github.com/junegunn/fzf) (for quick file subtree navigation, >= 0.53.0)
- [`zoxide`](https://github.com/ajeetdsouza/zoxide) (for historical directories navigation, requires `fzf`)
- [`resvg`](https://github.com/linebender/resvg) (for SVG preview)
- [ImageMagick](https://imagemagick.org/) (for Font, HEIC, and JPEG XL preview, >= 7.1.1)
- [`xclip`](https://github.com/astrand/xclip) / [`wl-clipboard`](https://github.com/bugaevc/wl-clipboard) / [`xsel`](https://github.com/kfish/xsel) (for Linux clipboard support)

packages

- Arch Linux
- Nix
- Nix flakes
- Homebrew `brew install yazi ffmpeg sevenzip jq poppler fd ripgrep fzf zoxide resvg imagemagick font-symbols-only-nerd-font`
- MacPorts
- Solus Linux
- Void Linux
- NetBSD
- Windows https://git-scm.com/download/win
    - Install with Scoop
    - Install with WinGet
- Debian based Linux
- Fedora/Centos Stream 9+/RHEL 9+
- Snapcraft
- Flatpak
- AOSC OS
- x-cmd
- [Official binaries](https://github.com/sxyazi/yazi/releases)
- crates.io
- Build from source
- Build from source in debug mode

## Keybindings

https://github.com/sxyazi/yazi/blob/shipped/yazi-config/preset/keymap-default.toml

navigation
- k
- j
- l
- h

selection
- space
- v
- V

file operations
- o | enter
- tab
- y
- x
- p
- d
- a: create a file
- r
- .
- ;
- :
- -: symlink
- _

copy paths

filter files
- f

find files
- /
- ?
- n
- N

search files
- s: by name
- S: by content

sorting

multi-tab

## Configuration

- [`yazi.toml`](https://yazi-rs.github.io/docs/configuration/yazi) - General configuration.
    - mgr
        - ratio
        - sort_by
        - sort_sensitive
        - sort_reverse
        - sort_dir_first
        - sort_translit
        - linemode
        - show_hidden
        - show_symlink
        - scrolloff
        - mouse_events
        - title_format
    - preview
        - wrap
        - tab_size
        - max_width
        - max_height
        - cache_dir
        - image_delay
        - image_filter
        - image_quality
        - ueberzug_scale / ueberzug_offset
    - opener
    - open
    - tasks
    - plugin
    - input
    - confirm
    - pick
    - which
- [`keymap.toml`](https://yazi-rs.github.io/docs/configuration/keymap) - Keybindings configuration.
- [`theme.toml`](https://yazi-rs.github.io/docs/configuration/theme) - Color scheme configuration.