---
created: 2026-01-10T16:19
modified: 2026-01-10T16:20
url:
  - https://github.com/syl20bnr/spacemacs
---

安装:
```shell
[ -d $HOME/.emacs.d ] && mv $HOME/.emacs.d $HOME/.emacs.d.bak
[ -f $HOME/.emacs.el ] && mv $HOME/.emacs.el .emacs.el.bak
[ -f $HOME/.emacs ] && mv $HOME/.emacs $HOME/.emacs.bak

git clone https://github.com/syl20bnr/spacemacs $HOME/.emacs.d
```

三种模式:  
- Vim
- Emacs
- Hybrid

模式切换:  
`C-z` 仅在当前 buffer 临时从 evil 切换到 emacs 模式  
`SPC t E` 从 evil 模式切换  
`M-m t E` 从 emacs 模式切换

`(global-set-key (kbd "<f9>") 'holy-mode)`

[Spacemacs documentation](https://www.spacemacs.org/doc/DOCUMENTATION.html#dotfile-configuration)  
[Spacemacs layers list](https://www.spacemacs.org/layers/LAYERS.html#general-purpose)

- layers
    - dotspacemacs-configuration-layers
        ```lisp
        (tabs :variables tabs-icons nil)
        markdown
        (conda :variables conda-anaconda-home "~/opt/miniconda3")
        (python :variables python-backend 'anaconda python-virtualenv-management 'pet python-enable-tools '(uv))
        javascript
        emacs-lisp
        common-lisp
        clojure
        ```
- init
    - [dotspacemacs-editing-style](https://www.spacemacs.org/doc/DOCUMENTATION.html#editing-styles)
    - dotspacemacs-startup-lists
    - dotspacemacs-new-empty-buffer-major-mode
    - dotspacemacs-scratch-mode
    - dotspacemacs-themes
    - dotspacemacs-mode-line-theme
    - dotspacemacs-default-font
    - dotspacemacs-maximized-at-startup
    - dotspacemacs-line-numbers
    - dotspacemacs-frame-title-format
- user-env
- user-init
    ```lisp
    (setq configuration-layer-elpa-archives
          '(("melpa-cn" . "https://mirrors.tuna.tsinghua.edu.cn/elpa/melpa/")
            ("org-cn"   . "https://mirrors.tuna.tsinghua.edu.cn/elpa/org/")
            ("gnu-cn"   . "https://mirrors.tuna.tsinghua.edu.cn/elpa/gnu/")))
    ```
- user-config
    ```lisp
    (when (window-system)
      ;; 基础窗口尺寸设置
      (setq initial-frame-alist
            `((top    . 20)
              (left   . 150)
              (width  . (text-pixels . ,(round (* (x-display-pixel-width) 0.72))))
              (height . (text-pixels . ,(round (* (x-display-pixel-height) 0.84))))))
    
      ;; 窗口透明度设置
      ;;(set-frame-parameter nil 'alpha 90)
    
      ;; macOS 特定设置
      (when (eq system-type 'darwin)
        (add-to-list 'default-frame-alist '(ns-transparent-titlebar . t))
        (add-to-list 'default-frame-alist '(ns-appearance . dark)))
      
      ;; 全局标签栏
      ;;(global-tab-line-mode 1)
      )
    ;; 主题自定义
    (custom-theme-set-faces
      'misterioso
      '(tab-line             ((t (:background "#2D3743" :foreground "white" :box nil))))
      '(tab-line-tab-inactive ((t (:background "#2D3743" :foreground "white" :box nil))))
      '(tab-line-tab-current  ((t (:background "white" :foreground "blue" :box nil))))
      '(region               ((t (:background "#6B8E23" :foreground "white"))))
      '(cursor               ((t (:background "green")))))
    (enable-theme 'misterioso)
    
    (setq evil-emacs-state-cursor '("green" bar))
    (spacemacs/toggle-transparency)
    
    (setq evil-emacs-state-cursor '("green" (bar . 2))
      evil-hybrid-state-cursor  '("yellow" (bar . 2))
    )
    
    (defun osc52-copy (text &optional push)
      "Send TEXT to terminal via OSC52."
      (when (and text (not (display-graphic-p)))
        (let ((base64-text (base64-encode-string (encode-coding-string text 'utf-8 t) t)))
          (send-string-to-terminal (format "\033]52;c;%s\a" base64-text))
          (send-string-to-terminal (format "\033]52;p;%s\a" base64-text)))))
    
    (setq interprogram-cut-function 'osc52-copy)
    
    (load (expand-file-name "~/.quicklisp/slime-helper.el"))
    (setq inferior-lisp-program "sbcl")
    
    (global-set-key (kbd "<f9>") 'holy-mode)
    ```
