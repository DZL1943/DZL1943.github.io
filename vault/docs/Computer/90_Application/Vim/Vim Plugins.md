---
created: 2025-10-24T06:39
modified: 2025-11-01T14:57
---

## packages

## vim-plug

`curl -fLo ~/.vim/autoload/plug.vim --create-dirs  
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim`

```vim
let data_dir = has('nvim') ? stdpath('data') . '/site' : '~/.vim'
if empty(glob(data_dir . '/autoload/plug.vim'))
  silent execute '!curl -fLo '.data_dir.'/autoload/plug.vim --create-dirs  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

" Install vim-plug if not found
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
endif

" Run PlugInstall if there are missing plugins
autocmd VimEnter * if len(filter(values(g:plugs), '!isdirectory(v:val.dir)'))
  \| PlugInstall --sync | source $MYVIMRC
\| endif


call plug#begin()

" List your plugins here

call plug#end()
```

- PlugInstall
- PlugUpdate
- PlugUpgrade
- PlugStatus
- PlugDiff
- PlugClean

插件安装路径: `~/.vim/plugged/`

## coc

```vim
Plug 'neoclide/coc.nvim', {'branch': 'release'}


hi CocMenuSel ctermfg=white ctermbg=DarkCyan

let g:coc_node_path = '/opt/homebrew/bin/node'
let g:coc_global_extensions = [
            \'coc-yank',
            \'coc-pairs',
            \'coc-json',
            \'coc-css',
            \'coc-html',
            \'coc-tsserver',
            \'coc-yaml',
            \'coc-lists',
            \'coc-snippets',
            \'coc-pyright',
            \'coc-clangd',
            \'coc-prettier',
            \'coc-xml',
            \'coc-syntax',
            \'coc-git',
            \'coc-marketplace',
            \'coc-highlight',
            \'coc-sh',
            \'coc-rust-analyzer',
            \'coc-metals',
            \]

" Use tab for trigger completion with characters ahead and navigate.
" NOTE: There's always complete item selected by default, you may want to enable
" no select by `"suggest.noselect": true` in your configuration file.
" NOTE: Use command ':verbose imap <tab>' to make sure tab is not mapped by
" other plugin before putting this into your config.
inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
      \ coc#refresh()
inoremap <expr><S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>"

" Make <CR> to accept selected completion item or notify coc.nvim to format
" <C-g>u breaks current undo, please make your own choice.
inoremap <silent><expr> <CR> coc#pum#visible() ? coc#pum#confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

function! CheckBackspace() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction
```

- CocInstall
- CocConfig
- CocInfo
## ale

```vim
Plug 'dense-analysis/ale'
```

## lsp

```vim
Plug 'prabirshrestha/vim-lsp'
Plug 'mattn/vim-lsp-settings'

let g:lsp_settings_enable_suggestions = 0
let g:lsp_settings_filetype_python = 'pyright-langserver'
```

命令
- LspStatus
- LspInstallServer

server 安装路径: `~/.local/share/vim-lsp-settings/servers/`

## complete

```vim
Plug 'prabirshrestha/asyncomplete.vim'
Plug 'prabirshrestha/asyncomplete-lsp.vim'

inoremap <expr> <Tab>   pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
inoremap <expr> <cr>    pumvisible() ? asyncomplete#close_popup() : "\<cr>"
```

## snippets

1. [vim-vsnip](https://github.com/hrsh7th/vim-vsnip) together with [vim-vsnip-integ](https://github.com/hrsh7th/vim-vsnip-integ)
2. [UltiSnips](https://github.com/SirVer/ultisnips) together with [vim-lsp-ultisnips](https://github.com/thomasfaingnaert/vim-lsp-ultisnips)
3. [neosnippet.vim](https://github.com/Shougo/neosnippet.vim) together with [vim-lsp-neosnippet](https://github.com/thomasfaingnaert/vim-lsp-neosnippet)

```vim
" Track the engine.
Plugin 'SirVer/ultisnips'

" Snippets are separated from the engine. Add this if you want them:
Plugin 'honza/vim-snippets'

" Trigger configuration. You need to change this to something other than <tab> if you use one of the following:
" - https://github.com/Valloric/YouCompleteMe
" - https://github.com/nvim-lua/completion-nvim
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"

" If you want :UltiSnipsEdit to split your window.
let g:UltiSnipsEditSplit="vertical"
```

感觉不咋的

## markdown

```vim
Plug 'godlygeek/tabular'
Plug 'preservim/vim-markdown'
```