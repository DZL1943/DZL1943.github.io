---
created: 2025-10-23T14:21
modified: 2025-10-23T14:22
---

```vim title="minimal"
set nocp
set mouse=a
colorscheme desert

syntax enable
filetype plugin indent on

set nu ru rnu cul cuc

set ts=4 sw=4 sts=4 et ai

set hls is scs

set clipboard^=unnamed,unnamedplus
```

```vim
if has("gui_running")
    set gfn=Menlo-Regular:h18
    set lines=35 columns=90
    winp 140 20
    set guioptions-=r
    set guioptions+=a
    set guioptions+=k
    set transparency=10  " set it at .gvimrc
    set shortmess=atl   " set it at .gvimrc
    set imactivatekey=C-space
      "inoremap <ESC> <ESC>:set iminsert=0<CR>
endif

if exists('$TMUX')
  " 在 tmux 中需要特殊处理
  let &t_SI = "\<Esc>Ptmux;\<Esc>\<Esc>[6 q\<Esc>\\"
  let &t_EI = "\<Esc>Ptmux;\<Esc>\<Esc>[2 q\<Esc>\\"
else
  " 普通终端
  let &t_SI = "\<Esc>[6 q"
  let &t_EI = "\<Esc>[2 q"
endif

set nocp
colorscheme desert
syntax enable
filetype plugin indent on
set nu ru rnu cul cuc
set ts=4 sw=4 sts=4 sr et ai
set backspace=indent,eol,start
set wrap
set whichwrap=b,s,<,>,[,]
"set list
if has('multi_byte') && &encoding ==# 'utf-8'
  let &listchars = 'tab:▸ ,extends:❯,precedes:❮,nbsp:±'
else
  let &listchars = 'tab:> ,extends:>,precedes:<,nbsp:.'
endif
set fen    "foldenable
set fdm=indent
set foldlevelstart=99
set hls is ic scs
set sm    "showmatch
"set nosmd    "showmode
set sc    "showcmd
set wildmenu
"set ls=2
set stal=1    "showtabline
"set acd
set autoread
set clipboard^=unnamed,unnamedplus

" Put all temporary files under the same directory.
" https://github.com/mhinz/vim-galore#temporary-files
set backup
set backupdir   =$HOME/.vim/files/backup/
set backupext   =-vimbackup
set backupskip  =
set directory   =$HOME/.vim/files/swap//
set updatecount =100
set undofile
set undodir     =$HOME/.vim/files/undo/
set viminfo     ='100,n$HOME/.vim/files/info/viminfo

set mouse=a
map <ScrollWheelUp> <C-y>
map <ScrollWheelDown> <C-e>

au CursorHold,CursorHoldI * checktime

autocmd BufWritePost $MYVIMRC source $MYVIMRC
"let g:Powerline_colorscheme='solarized256'

"autocmd FileType help wincmd L
"autocmd InsertLeave * :silent !/opt/homebrew/bin/im-select com.apple.keylayout.ABC
"autocmd VimEnter,BufNewFile,BufRead * if &ft == '' && @% == '' | set ft=markdown | endif
autocmd FileType make setlocal noet
autocmd FileType python setlocal et ts=4 sts=4 sw=4
autocmd FileType lisp setlocal ts=2 sts=2 sw=2

nnoremap <A-Up> :m-2<CR>
nnoremap <A-Down> :m+<CR>
inoremap <A-Up> <Esc>:m-2<CR>
inoremap <A-Down> <Esc>:m+<CR>

let g:netrw_liststyle = 3
let g:netrw_banner = 0
let g:netrw_winsize = 100
"let g:netrw_browse_split = 4
let g:netrw_altv=1
"let g:netrw_chgwin = 2
let g:netrw_keepdir = 0
let g:netrw_list_hide = '\(^\|\s\s\)\zs\.\S\+'

augroup netrw
    au!
    "autocmd VimEnter * if argc() == 0 | 20 Lexplore | endif
    autocmd VimEnter * wincmd l
    autocmd WinEnter * if winnr('$') == 1 && getbufvar(winbufnr(winnr()), "&filetype") == "netrw" || &buftype == 'quickfix' |q|endif
augroup end

```

参考
- [amix/vimrc](https://github.com/amix/vimrc)
- [spf13-vim](https://github.com/spf13/spf13-vim)
- [SpaceVim](https://github.com/SpaceVim/SpaceVim)