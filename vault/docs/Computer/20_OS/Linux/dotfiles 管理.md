---
created: 2025-10-30T09:14
modified: 2026-01-11T22:24
---

## 管理工具

- [stow](https://www.gnu.org/software/stow/)
- [mackup](https://github.com/lra/mackup)
- [chezmoi](https://chezmoi.io/)
- dotbot

## python 实现

> [!note]-
> - [x] 支持简易配置
> - [ ] 支持删除备份
> - [ ] 支持 ignore
> - [ ] 支持简易模式 (所有 app 按原路径组织, 而不是各自独立)

```python
import argparse
import os
from pathlib import Path
import shutil
import yaml


class BackupManager:
    def __init__(self, config='config.yaml', source_root=None, backup_root=None):
        self.config = self._load_config(config) if os.path.isfile(config) else config
        self.source_root = Path(source_root).expanduser().resolve() if source_root else Path.home()
        self.backup_root = Path(backup_root).expanduser().resolve() if backup_root else Path.cwd()

    @staticmethod
    def _load_config(config_file):
        with open(config_file) as f:
            return yaml.safe_load(f)

    @staticmethod
    def _resolve_path(path, root=None):
        path_obj = Path(path)
        return (root / path_obj).resolve() if root else path_obj.expanduser().resolve()

    @staticmethod
    def _copy(src, dst):
        dst.parent.mkdir(parents=True, exist_ok=True)
        
        if src.is_file():
            shutil.copy2(src, dst)
        elif src.is_dir():
            if dst.exists():
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
        else:
            raise FileNotFoundError(f"路径不存在: {src}")

    def _get_app_paths(self, app):
        app_config = self.config.get(app, {})

        if isinstance(app_config, list):
            paths = app_config
            prefix = app
        else:
            paths = app_config.get('paths', [])
            prefix = app_config.get('prefix', app)
        
        result = []
        for item in paths:
            if isinstance(item, str):
                src, dst = item, Path(item).name
            elif isinstance(item, dict):
                src, dst = next(iter(item.items()))
            else:
                continue
                
            result.append((src, str(Path(prefix) / dst)))
            
        return result

    def _is_backed_up(self, app):
        return any(self._resolve_path(dst, self.backup_root).exists() for _, dst in self._get_app_paths(app))

    def list_apps(self, apps=None, backup_status=None):
        if not apps:
            apps = self.config
        for app in apps:
            if app not in self.config:
                continue
            if backup_status is not None and self._is_backed_up(app) != backup_status:
                continue
            print(app)
            if apps:
                for src, dst in self._get_app_paths(app):
                    print(f"- {src} -> {dst}")

    def backup(self, apps):
        if not apps:
            apps = self.config
        for app in apps:
            if app not in self.config:
                continue
            print(f"备份 {app}")
            for src, dst in self._get_app_paths(app):
                try:
                    self._copy(self._resolve_path(src, self.source_root), self._resolve_path(dst, self.backup_root))
                    print(f"✓ {src}")
                except Exception as e:
                    print(f"✗ {src} - {e}")

    def restore(self, apps):
        if not apps:
            apps = self.config
        for app in apps:
            if app not in self.config:
                continue
            print(f"恢复 {app}")
            for src, dst in self._get_app_paths(app):
                try:
                    self._copy(self._resolve_path(dst, self.backup_root), self._resolve_path(src, self.source_root))
                    print(f"✓ {src}")
                except Exception as e:
                    print(f"✗ {src} - {e}")


def main():
    parser = argparse.ArgumentParser(description='配置备份恢复工具')
    parser.add_argument('action', choices=['backup', 'restore', 'list'])
    parser.add_argument('--app', nargs='+', help='应用名称')
    parser.add_argument('--config', default='config.yaml')
    parser.add_argument('--source-root', help='源根路径,默认为家目录')
    parser.add_argument('--backup-root', help='备份根路径,默认为当前目录')
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--backed-up', action='store_true', dest='backup_status', help='仅列出已备份的应用')
    group.add_argument('--not-backed-up', action='store_false', dest='backup_status', help='仅列出未备份的应用')
    parser.set_defaults(backup_status=None)
    
    args = parser.parse_args()
    mgr = BackupManager(args.config, args.source_root, args.backup_root)

    match args.action:
        case 'list': 
            mgr.list_apps(args.app, args.backup_status)
        case 'backup': 
            mgr.backup(args.app)
        case 'restore': 
            mgr.restore(args.app)


if __name__ == '__main__':
    main()
```

## 配置文件路径

```yaml
Shell:
    - .alias
    - .env
    - .profile
    - .bash_profile
    - .bashrc
    - .zshenv
    - .zprofile
    - .zshrc
    - .config/fish/config.fish
Tmux:
    - .tmux.conf
Kitty:
    - .config/kitty/kitty.conf
Ghostty:
    - .config/ghostty/config
Alacritty:
    - .config/alacritty/alacritty.yml
iTerm2:
    - Library/Preferences/com.googlecode.iterm2.plist
    - .config/iterm2/AppSupport/DynamicProfiles/
Helix:
    - .config/helix/config.toml
    - .config/helix/languages.toml
Vim:
    - .vimrc
    - .gvimrc
    - .vim/
Neovim:
    - .config/nvim/
Emacs:
    - .emacs
    - .emacs.d/
    - .config/emacs/
    - .config/doom/
    - .doom.d/
    - .spacemacs.d/
    - .spacemacs
VSCode:
    - Library/Application Support/Code/User/settings.json
    - Library/Application Support/Code/User/keybindings.json
Zed:
    - .config/zed/settings.json
Yazi:
    - .config/yazi/yazi.toml
Mackup:
    - .mackup.cfg
    - .mackup/
Git:
    - .gitconfig
SSH:
    - .ssh/config
pip:
    - .config/pip/pip.conf
Conda:
    - .condarc
npm:
    - .npmrc
#maven:
Cargo:
    - .cargo/config.toml
Orbstack:
    - .orbstack/config/docker.json
Rime:
    - Library/Rime/
fcitx5:
    - .config/fcitx5/: .config/
    - .local/share/fcitx5/: .local/share/
Hammerspoon:
    - .hammerspoon/init.lua
#Raycast:
#Karabiner:
mac-mouse-fix:
    - Library/Application Support/com.nuebling.mac-mouse-fix/config.plist
xGestures:
    - Library/Preferences/what.xGestures.plist
Stats:
    - Library/Preferences/eu.exelban.Stats.plist
DockDoor:
    - Library/Preferences/com.ethanbills.DockDoor.plist
#Firefox:
```