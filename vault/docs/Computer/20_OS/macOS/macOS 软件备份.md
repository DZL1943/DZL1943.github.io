---
created: 2024-08-22T09:28
modified: 2025-08-06T18:06
draft: true
---

## GUI

`(cd /Applications; for app in *.app; output=$(plutil -extract CFBundleShortVersionString raw "/Applications/$app/Contents/Info.plist") && echo "${app%.app} : $output" || echo "${app%.app}") | pbcopy`

- AlDente : 1.35.1
- Applite : 1.3.1
- BetterAndBetter : 2.7.1
- Clash Verge : 2.4.2
- Emacs : 30.2
- Escrcpy : 1.32.2
- GitHub Desktop : 3.5.3
- IINA : 1.4.1
- Ice : 0.11.12
- Input Source Pro : 2.6.1
- Karabiner-Elements : 15.4.0
- Karabiner-EventViewer : 15.4.0
- KopiaUI : 0.20.1
- LocalSend : 1.17.0
- Logi Options : 10.26.49
- LyricsX : 1.7.4
- Mac Mouse Fix : 3.0.8
- OBS : 32.0.1
- Obsidian : 1.9.14
- OrbStack : 2.0.4
- Pearcleaner : 4.4.3
- PixPin : 2.0.0.3
- QQ : 6.9.81
- Raycast : 1.103.4
- RustDesk : 1.4.3
- Safari : 26.0.1
- Spotify : 1.2.75.510
- Stats : 2.11.57
- Syncthing : 1.30.0-1
- Visual Studio Code : 1.105.1
- Warp : 0.2025.10.22.08.13.02
- WeChat : 4.1.1
- Zen : 1.17.3b
- aDrive : 6.8.7
- dev-sidecar : 2.0.0
- wpsoffice : 12.1.23141

## CLI

`brew leaves`

- bat
- clojure/tools/clojure
- coreutils
- duf
- dust
- eza
- fd
- findutils
- fish
- fzf
- gawk
- gh
- gnu-sed
- gnu-tar
- grep
- helix
- httpie
- jj
- jq
- lazygit
- lsd
- luarocks
- mackup
- maven
- mcfly
- neovim
- node
- ripgrep
- rsync
- starship
- tealdeer
- tmux
- trash
- tree-sitter-cli
- uv
- wget
- yazi
- zellij
- zoxide
