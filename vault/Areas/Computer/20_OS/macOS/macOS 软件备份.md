---
created: 2024-08-22T09:28
modified: 2026-01-30T16:40
draft: true
---

## GUI

`(cd /Applications; for app in *.app; output=$(plutil -extract CFBundleShortVersionString raw "/Applications/$app/Contents/Info.plist") && echo "${app%.app} : $output" || echo "${app%.app}") | pbcopy`

- AlDente : 1.36.3
- BetterAndBetter : 2.7.3
- Clash Verge : 2.4.4
- DockDoor : 1.31.2
- Emacs : 30.2
- Escrcpy : 1.32.2
- FreeFileSync : 14.6
- GitHub Desktop : 3.5.4
- IINA : 1.4.1
- Ice : 0.11.12
- Input Source Pro : 2.9.0
- Karabiner-Elements : 15.7.0
- Karabiner-EventViewer : 15.7.0
- KeePassXC : 2.7.10
- KopiaUI : 0.20.1
- LocalSend : 1.17.0
- Logi Options : 10.26.49
- LyricsX : 1.7.4
- Mac Mouse Fix : 3.0.8
- Microsoft Edge : 144.0.3719.92
- OBS : 32.0.2
- Obsidian : 1.11.4
- OrbStack : 2.0.4
- Pearcleaner : 4.4.3
- PixPin : 2.3.8.0
- QQ : 6.9.81
- Raycast : 1.104.1
- RealTimeSync : 14.6
- RustDesk : 1.4.3
- Safari : 26.2
- Spotify : 1.2.79.427
- Stats : 2.11.64
- Syncthing : 1.30.0-1
- TickTick : 6.4.10
- Visual Studio Code : 1.108.2
- Warp : 0.2026.01.28.08.14.01
- WeChat : 4.1.6
- Whistle : 1.4.2
- Zen : 1.17.15b
- aDrive : 6.8.7
- dev-sidecar : 2.0.0
- wpsoffice : 12.1.23141

![](<../../../../Attachments/Pasted image 20260130164220.png>)

## CLI

`brew leaves`

- bat
- coreutils
- duf
- dust
- duti
- eza
- fd
- ffmpeg
- findutils
- fish
- fzf
- gawk
- gh
- gnu-sed
- gnu-tar
- grep
- helix
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
- vim
- wget
- yazi
- zellij
- zoxide

### Cask

`brew list --cask -1`

- android-platform-tools
- font-hack-nerd-font
- font-source-code-pro