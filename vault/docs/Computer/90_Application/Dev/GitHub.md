---
created: 2026-01-10T16:24
modified: 2026-01-11T22:34
---

## Client

- CLI
    ```shell
    brew install gh
    
    gh auth login
    
    gh repo create
    ```
- Mobile
- Desktop

## Repository

- Create
- Clone
    - HTTPS
    - SSH
    - GitHub CLI
- Push
- Fork
- Star
- Pull Request
- Issue
- Discussion
- Wiki
- Release

## Gist

## Project

## DevOps

- Actions
- Packages
- [Pages](https://pages.github.com)

## Tips

### [SSH](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh) 连接

1. 新建 ssh key: `ssh-keygen -t ed25519 -C "your_email@example.com"`  
   备注: 此处的 -C 仅仅是对该 key 的备注, 并不需要和别的地方保持一致
2. `eval "$(ssh-agent -s)"`
3. `touch ~/.ssh/config`
  
    ```text
    Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
    ```
  
4. `ssh-add --apple-use-keychain ~/.ssh/id_ed25519`
5. `pbcopy < ~/.ssh/id_ed25519.pub`
6. 在 GitHub Settings 中添加
7. 在提交之前
  
    ```shell
    git config --global user.name "John Doe"
    git config --global user.email johndoe@example.com
    ```
  
   在 GitHub 中主要通过 email 识别用户

### Git Credential Manager

  
```shell
brew tap microsoft/git
brew install --cask git-credential-manager-core
```
