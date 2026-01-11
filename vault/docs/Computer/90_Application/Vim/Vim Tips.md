
## 剪切板

1. iterm 下按住 option 选择即复制
2. `pbcopy`, `pbpaste` (仅适用于 macOS, 并且 Linux 下的替代方案 xclip 需要 XServer)
3. `set paste`
4. `set clipboard^=unnamed,unnamedplus` 同步 vim 剪贴板, 直接 y、p 即可
5. 通过 `+y` `+p` 复制粘贴 (`*y` `*p` 在 X11 中对应的是鼠标选择剪切板)

```vim
vnoremap <C-y> "+y
vnoremap <C-d> "+d
nnoremap <C-p> "+p
```

> 在 ssh 环境下不适用 (iterm 下安装 shell-integration 后可以通过 `it2copy` 复制)

## 执行当前文件

`:! "%:p"`

## 参考

- [GitHub - mhinz/vim-galore: :mortar_board: All things Vim!](https://github.com/mhinz/vim-galore)
- [GitHub - akrawchyk/awesome-vim: The Vim plugin shortlist](https://github.com/akrawchyk/awesome-vim)
- [Vim Awesome](https://vimawesome.com/)