---
created: 2024-07-26T11:13
modified: 2024-08-08T17:30
url:
  - https://www.gnu.org/software/emacs/manual/index.html
draft: true
---

## 快捷键

> [!tip]+ 修饰键
> - C: Control
> - M: Meta
> - S: Shift
> - ESC
> - s: Super/Command
> - H: Hyper
> - A: Alt

https://www.gnu.org/software/emacs/refcards/pdf/refcard.pdf

- C
    - g quit 退出输入
    - p/n/b/f 上下左右
    - a/e 行首行尾
    - k kill-line
    - r/s 搜索 (C-M-r/s 正则搜索)
    - v scroll-up (可能被 cua-mode 覆盖, M-v scroll-down)
    - w 剪切 (M-w 复制)
    - y 粘贴
    - / undo
    - C-c
    - C-h 帮助 (按 q 可以关闭临时窗口)
        - b
        - f
        - k
        - m
    - C-x
        - 0 delete-window
        - 1 delete other-windows
        - 2 split-window-below
        - 3 split-window-right
        - o switch-window
        - d dired
        - h 全选
        - b switch buffer (直接按左右方向键可以快速切换)
        - k kill buffer
        - u undo
        - C-b list buffer
        - C-c 保存退出
        - C-e eval
        - C-f find-file
        - C-q read-only-mode
        - C-s save
        - C-t transpose-lines
        - C-; comment-line
- M
    - ! shell-command
    - `<>` EOF/BOF
    - % replace
    - M-x
    - M-g
        - g goto-line

## 配置

[Init File (GNU Emacs Manual)](https://www.gnu.org/software/emacs/manual/html_node/emacs/Init-File.html) 
https://github.com/emacs-tw/awesome-emacs#starter-kit

- [spacemacs](https://github.com/syl20bnr/spacemacs)
- [purcell/emacs.d](https://github.com/purcell/emacs.d)
- [bbatsov/prelude](https://github.com/bbatsov/prelude) 非常简陋
- [doomemacs](https://github.com/doomemacs/doomemacs) 模块化, 支持 evil, 插件都要源码下载后编译, 安装很慢.
- [Centaur Emacs](https://github.com/seagle0128/.emacs.d) 还可以, 不支持 evil

```lisp
;; ========== package and source config
(setq package-archives '(
  ("gnu"   . "http://mirrors.tuna.tsinghua.edu.cn/elpa/gnu/")
  ("melpa" . "http://mirrors.tuna.tsinghua.edu.cn/elpa/melpa/")
))

(when (version< emacs-version "27.0")
  (package-initialize))

(add-to-list 'load-path (expand-file-name "~/.emacs.d/lisp/"))

;; (setq default-directory "~/org/")
;; (setq user-full-name "user")
;; (setq user-mail-address "user@mail.com")

;; ========== basic config
(setq debug-on-error t)
;; 跳过起始界面
(setq inhibit-startup-message t)
;; 清除 scratch 信息
(setq initial-scratch-message nil)
;; 将默认模式更改为纯文本
(setq initial-major-mode 'text-mode)
(fset 'yes-or-no-p 'y-or-n-p)
(setq ring-bell-function 'ignore
      visible-bell nil)
(setq help-window-select 't)
(ido-mode t)
(global-auto-revert-mode t)
(setq make-backup-files nil)
(setq auto-save-default nil)
(recentf-mode t)
(setq recentf-max-menu-items 25)
(setq recentf-max-saved-items 25)
(global-set-key (kbd "C-x C-r") 'recentf-open-files)

(show-paren-mode t)  ;; default t
(electric-pair-mode t)
(delete-selection-mode 1)  ;; ?
;; (cua-mode t)
(setq track-eol t)

;; (prefer-coding-system 'cp950)
;; (prefer-coding-system 'gb2312)
;; (prefer-coding-system 'cp936)
;; (prefer-coding-system 'gb18030)
;; (prefer-coding-system 'utf-16)
;; (prefer-coding-system 'utf-8-dos)
;; (prefer-coding-system 'utf-8-unix)
;; (set-language-environment 'Chinese-GB)
;; (set-language-environment "UTF-8")
(set-default-coding-systems 'utf-8)
;; (set-terminal-coding-system  'utf-8)
;; (set-keyboard-coding-system  'utf-8)
;; (set-clipboard-coding-system 'utf-8)
;; (set-selection-coding-system 'utf-8)
;; (setq locale-coding-system   'utf-8)
;; (set-file-name-coding-system 'utf-8)
;; (set-buffer-file-coding-system 'utf-8)
;; (setq-default pathname-coding-system 'utf-8)
;; (setq default-process-coding-system '(utf-8 . utf-8))
;; (modify-coding-system-alist 'process "*" 'utf-8)
;;(add-to-list 'file-coding-system-alist '("\\.org\\'" . utf-8))

(if (version<= "26.0.50" emacs-version)
  (progn
    (global-display-line-numbers-mode)
    (setq-default display-line-numbers-type 'relative)
    (setq-default display-line-numbers-width 2)
    (set-face-background 'line-number "#2D3743")
    (set-face-foreground 'line-number-current-line "yellow")
  )
  (progn
    (global-linum-mode t)
    (eval-after-load 'hideshow '(define-key hs-minor-mode-map [left-margin mouse-1] 'hs-toggle-hiding))
  )
)
;; (global-hl-line-mode t)
(setq column-number-mode t)
;; (add-hook 'window-configuration-change-hook (lambda () (ruler-mode 1)))
(setq-default tab-width 4)
(setq-default indent-tabs-mode nil)
(setq-default fill-column 80)
(add-hook 'prog-mode-hook #'display-fill-column-indicator-mode)
(add-hook 'prog-mode-hook #'whitespace-mode)
(setq-default whitespace-style '(face tabs trailing newline empty tab-mark newline-mark))
(add-hook 'prog-mode-hook 'hs-minor-mode)
;; (setq hs-hide-comments nil)
;; (setq hs-isearch-open 'x)

;; ========== display config
(if (window-system)
  (progn
    (setq default-frame-alist `(
      (vertical-scroll-bars . nil)
      (tool-bar-lines . 0)
      (menu-bar-lines . 1)
      (mouse-wheel-frame . t)
      (cursor-type . bar)
      (cursor-color . "green")
    ))
    (setq initial-frame-alist `(
      (top . 20) (left . 150)
      ;; (width . 92) (height . ,(/ (- (x-display-pixel-height) 140) (frame-char-height)))
      (width . (text-pixels . ,(round (* (x-display-pixel-width) 0.72)))) (height . (text-pixels . ,(round (* (x-display-pixel-height) 0.84))))
    ))
    (when (eq system-type 'darwin)
      ;; bugfix
      (setq image-types (cons 'svg image-types))
      (set-face-attribute 'default nil :height 180)
      (set-fontset-font t 'symbol (font-spec :family "Apple Color Emoji") nil 'prepend)
      (add-to-list 'default-frame-alist '(ns-transparent-titlebar . t))
      (add-to-list 'default-frame-alist '(ns-appearance . dark))
    )
    ;; (when (eq system-type 'windows-nt)
    ;;   (setq fonts '("Consolas" "微软雅黑"))
    ;;   (set-fontset-font t 'unicode "Segoe UI Emoji" nil 'prepend)
    ;;   (set-face-attribute 'default nil :font
    ;;                       (format "%s:pixelsize=%d" (car fonts) 24)))
    ;; (when (eq system-type 'gnu/linux)
    ;;   (setq fonts '("SF Mono" "Noto Sans Mono CJK SC"))
    ;;   (set-fontset-font t 'unicode "Noto Color Emoji" nil 'prepend)
    ;;   (set-face-attribute 'default nil :font
    ;;                       (format "%s:pixelsize=%d" (car fonts) 24)))
    (load-theme 'misterioso' t)
    (global-tab-line-mode 1)
    ;; (set-face-attribute 'tab-line nil :background "#2D3743" :foreground "white" :box nil)
    ;; (set-face-attribute 'tab-line-tab-inactive nil :background "#2D3743" :foreground "white" :box nil)
    ;; (set-face-attribute 'tab-line-tab-current nil :background "white" :foreground "blue" :box nil)
    ;; (set-face-attribute 'region nil :background "#6B8E23" :foreground "white")

    (custom-theme-set-faces
      'misterioso
      '(tab-line ((t (:background "#2D3743" :foreground "white" :box nil))))
      '(tab-line-tab-inactive ((t (:background "#2D3743" :foreground "white" :box nil))))
      '(tab-line-tab-current ((t (:background "white" :foreground "blue" :box nil))))
      '(region ((t (:background "#6B8E23" :foreground "white"))))
      '(cursor ((t (:background "green"))))
    )
    (enable-theme 'misterioso)

    (set-frame-parameter nil 'alpha 85)
    (add-hook 'text-mode-hook (lambda () (text-scale-increase 2)))
  )
  (progn
    ;; (xterm-mouse-mode 1)
    (mouse-wheel-mode 1)
    (menu-bar-mode -1)
    (global-hl-line-mode -1)
    (load-theme 'tango-dark' t)
  )
)

;; ========== other
;; (setq scroll-margin 3
;;       scroll-step 1
;;       scroll-conservatively 10000)
;; (setq mouse-wheel-scroll-amout '(1 ((shift) . 1)))
;; (setq mouse-wheel-progressive-speed nil)
;; (setq mouse-wheel-follow-mouse 't)
(mouse-avoidance-mode 'animate)

(display-time-mode t)
(setq display-time-day-and-date t)
;; (setq display-time-24hr-format t)
;; (setq calendar-longitude 116)
;; (setq calendar-latitude 40)
;; (setq calendar-location-name "Beijing")
;; (setq calendar-time-zone 480)
;; (setq calendar-standard-time-zone-name "CST")
;; (setq calendar-daylight-time-zone-name "CDT")
(setq calendar-week-start-day 1)
(setq calendar-chinese-all-holidays-flag t)
(setq diary-file "~/.emacs.d/diary")
(setq calendar-view-diary-initially-flag t
      calendar-mark-diary-entries-flag t
      calendar-mark-holidays-flag t
      number-of-diary-entries 7)
(add-hook 'diary-display-hook 'fancy-diary-display)
(add-hook 'diary-list-entries-hook 'diary-sort-entries t)
(add-hook 'today-visible-calendar-hook 'calendar-mark-today)
(global-set-key (kbd "C-c C") 'calendar)
(global-set-key (kbd "C-c c") 'org-capture)
(global-set-key (kbd "C-c a") 'org-agenda)
(global-set-key (kbd "ESC ESC") 'view-mode)  ;; c-x c-q readonly mode

(global-set-key (kbd "C-c I") (lambda()(interactive)(find-file "~/.emacs.d/init.el")))
;; toggle transparency
(global-set-key (kbd "C-c 0") (lambda()(interactive)(set-frame-parameter nil 'alpha (if (equal (frame-parameter nil 'alpha) 85) 100 85))))

;; org
(with-eval-after-load 'org
  (setq org-adapt-indentation nil)
  (setq org-src-fontify-natively t)
  (setq org-startup-truncated nil)
  (setq org-startup-folded t)
  ;; (setq org-startup-numerated t)
  (setq org-startup-with-inline-images t)
  (setq org-agenda-include-diary t)
  (setq org-directory "~/org/"
        org-agenda-files '("~/org/" "~/org/journal/")
        org-default-notes-file (concat org-directory "/notes.org"))
  ;; (setq org-todo-keywords '((sequence "TODO" "DOING" "BLOCK" "|" "DONE")))
  ;; (setq org-stuck-projects '("+PROJECT/-DONE" ("TODO" "NEXT") nil ""))
  ;; (setq org-capture-templates
  ;; '(("t" "Todo" entry (file+headline "~/org/gtd.org" "Tasks") "* TODO %?\n  %i\n  %a")
  ;;   ("j" "Journal" entry (file+datetree "~/org/journal.org") "* %?\nEntered on %U\n  %i\n  %a")))
  (add-to-list 'org-src-lang-modes '("plantuml" . plantuml))
  (setq org-src-tab-acts-natively t)
  (org-babel-do-load-languages 'org-babel-load-languages '((emacs-lisp . t) (shell . t) (python . t))))

(progn
  (require 'comint)
  (setq comint-process-echoes t)
  (define-key comint-mode-map (kbd "<up>") 'comint-previous-input)
  (define-key comint-mode-map (kbd "<down>") 'comint-next-input))

;; ========== plugin config
(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package)
  (eval-when-compile
    (require 'use-package)
    (setq use-package-always-ensure t)
    (setq use-package-always-defer t)
    (setq use-package-always-demand nil)
    (setq use-package-expand-minimally t)
    (setq use-package-verbose t)))

(use-package auto-package-update
  :disabled t
  :config
  (setq auto-package-update-delete-old-versions t)
  (setq auto-package-update-hide-results t)
  (auto-package-update-maybe))

(use-package exec-path-from-shell
  :init
  (exec-path-from-shell-initialize))

(use-package org-autolist
  :hook (org-mode . org-autolist-mode))

(use-package ivy
  :init
  (ivy-mode t)
  :config
  (setq ivy-use-virtual-buffers t)
  (setq enable-recursive-minibuffers t)
  ;; enable this if you want `swiper' to use it
  ;; (setq search-default-mode #'char-fold-to-regexp)
  (global-set-key "\C-s" 'swiper)
  (global-set-key (kbd "C-c C-r") 'ivy-resume)
  (global-set-key (kbd "<f6>") 'ivy-resume)
  (global-set-key (kbd "M-x") 'counsel-M-x)
  (global-set-key (kbd "C-x C-f") 'counsel-find-file)
  (global-set-key (kbd "<f1> f") 'counsel-describe-function)
  (global-set-key (kbd "<f1> v") 'counsel-describe-variable)
  (global-set-key (kbd "<f1> o") 'counsel-describe-symbol)
  (global-set-key (kbd "<f1> l") 'counsel-find-library)
  (global-set-key (kbd "<f2> i") 'counsel-info-lookup-symbol)
  (global-set-key (kbd "<f2> u") 'counsel-unicode-char)
  (global-set-key (kbd "C-c g") 'counsel-git)
  ;; (global-set-key (kbd "C-c j") 'counsel-git-grep)
  (global-set-key (kbd "C-c k") 'counsel-ag)
  (global-set-key (kbd "C-x l") 'counsel-locate)
  (global-set-key (kbd "C-S-o") 'counsel-rhythmbox)
  (define-key minibuffer-local-map (kbd "C-r") 'counsel-minibuffer-history))

(use-package counsel
  :bind (("M-x" . counsel-M-x)))

(use-package swiper
  :requires (ivy counsel)
  :bind (("M-s" . counsel-grep-or-swiper)))

(use-package imenu-list
  :init
  (global-set-key (kbd "C-'") #'imenu-list-smart-toggle)
  (setq imenu-list-position 'right)
  (setq imenu-list-size 0.2)
  (setq imenu-list-auto-resize nil)
  (setq imenu-list-focus-after-activation nil)
  (setq imenu-list-after-jump-hook nil)
  ;; (imenu-list-minor-mode)
  )

;; (use-package evil
;;   :disabled t
;;   :init
;;   (setq evil-want-integration t) ;; This is optional since it's already set to t by default.
;;   (setq evil-want-keybinding nil)
;;   ;; (add-hook 'prog-mode-hook 'evil-mode)
;;   :config
;;   ;; (evil-mode 1)
;;   ;; default key is C-z
;;   (setq evil-default-state 'emacs)
;;   (setq evil-emacs-state-cursor '("SkyBlue2" bar)))

;; (use-package evil-collection
;;   :after evil
;;   :config
;;   (evil-collection-init))

(use-package which-key
  :init
  (which-key-mode)
  :config
  ;; Allow C-h to trigger which-key before it is done automatically
  (setq which-key-show-early-on-C-h t)
  ;; make sure which-key doesn't show normally but refreshes quickly after it is
  ;; triggered.
  ;; (setq which-key-idle-delay 10000)
  (setq which-key-idle-secondary-delay 0.05)
  (setq which-key-popup-type 'side-window)
  (setq which-key-side-window-location '(bottom, right))
  (setq which-key-side-window-max-width 0.33)
  (setq which-key-side-window-max-height 0.25)
  (define-key help-map "\C-h" 'which-key-C-h-dispatch))

(use-package company
  :init
  (add-hook 'after-init-hook 'global-company-mode))

(use-package smartparens
  :init
  (add-hook 'prog-mode-hook 'smartparens-mode))

(use-package rainbow-delimiters
  :init
  (add-hook 'prog-mode-hook 'rainbow-delimiters-mode)
  :custom-face
  (rainbow-delimiters-base-face ((t (:inherit nil))))
  (rainbow-delimiters-depth-1-face ((t (:foreground "red"))))
  (rainbow-delimiters-depth-2-face ((t (:foreground "orange"))))
  (rainbow-delimiters-depth-3-face ((t (:foreground "forest green"))))
  (rainbow-delimiters-depth-4-face ((t (:foreground "dodger blue"))))
  (rainbow-delimiters-depth-5-face ((t (:foreground "deep pink"))))
  (rainbow-delimiters-depth-6-face ((t (:foreground "dark turquoise"))))
  (rainbow-delimiters-depth-7-face ((t (:foreground "tomato1"))))
  (rainbow-delimiters-depth-8-face ((t (:foreground "PaleVioletRed1"))))
  (rainbow-delimiters-depth-9-face ((t (:foreground "SeaGreen1")))))

(use-package flycheck
  :init
  (add-hook 'after-init-hook 'global-flycheck-mode))

(use-package eglot
  :ensure t
  :commands (eglot eglot-ensure)
  :hook ((python-mode . eglot-ensure)
         (rust-mode . eglot-ensure))
  :config
  (setq eglot-strict-mode nil)
  (setq eglot-confirm-server-initiated-edits nil)
  (add-to-list 'eglot-server-programs '(rust-mode "rust-analyzer")))

(use-package smart-mode-line
  :init
  (setq sml/no-confirm-load-theme t)
  (sml/setup))

;; (use-package dashboard
;;   :init
;;   (dashboard-setup-startup-hook)
;; )

(use-package highlight-indentation
  :init
  ;; (add-hook 'prog-mode-hook 'highlight-indentation-mode)
  (add-hook 'prog-mode-hook 'highlight-indentation-current-column-mode)
  :config
  (set-face-background 'highlight-indentation-face "#e3e3d3")
  (set-face-background 'highlight-indentation-current-column-face "#c3b3b3"))

(use-package format-all)

(use-package right-click-context
  :init
  (right-click-context-mode 1)
  :config
  (setq right-click-context-mode-lighter ""))

(use-package drag-stuff
  :init
  (drag-stuff-global-mode 1)
  :config
  (drag-stuff-define-keys))

(use-package easy-kill
  :init
  (global-set-key [remap kill-ring-save] 'easy-kill))

(use-package valign
  :if window-system
  :init
  (add-hook 'org-mode-hook #'valign-mode))

(use-package scratch)

(use-package org-journal
  :init
  ;; Change default prefix key; needs to be set before loading org-journal
  (setq org-journal-prefix-key "C-c j")
  :config
  (setq org-journal-dir "~/org/journal/"
        org-journal-file-format "%Y-%m-%d.org"
        org-journal-file-type 'monthly
        org-journal-enable-agenda-integration t
        org-journal-carryover-items ""
        org-journal-date-format "%A, %Y/%m/%d"))

(use-package org-brain
  :init
  (setq org-brain-path "~/org/brain/")
  (global-set-key (kbd "C-c b") 'org-brain-visualize)
  ;; For Evil users
  (with-eval-after-load 'evil
    (evil-set-initial-state 'org-brain-visualize-mode 'emacs))
  :config
  (bind-key "C-c b" 'org-brain-prefix-map org-mode-map)
  (setq org-id-track-globally t)
  (setq org-id-locations-file "~/.emacs.d/.org-id-locations")
  (add-hook 'before-save-hook #'org-brain-ensure-ids-in-buffer)
  ;; (push '("b" "Brain" plain (function org-brain-goto-end)
  ;;         "* %i%?" :empty-lines 1)
  ;;       org-capture-templates)
  (setq org-brain-visualize-default-choices 'all)
  (setq org-brain-title-max-length 12)
  (setq org-brain-include-file-entries nil
        org-brain-file-entries-use-title nil))

;; Allows you to edit entries directly from org-brain-visualize
(use-package polymode
  :config
  (add-hook 'org-brain-visualize-mode-hook #'org-brain-polymode))

(use-package org-roam
  :disabled t
  :custom
  (org-roam-directory (file-truename "~/org/roam/"))
  :bind (("C-c n l" . org-roam-buffer-toggle)
         ("C-c n f" . org-roam-node-find)
         ("C-c n g" . org-roam-graph)
         ("C-c n i" . org-roam-node-insert)
         ("C-c n c" . org-roam-capture)
         ;; Dailies
         ("C-c n j" . org-roam-dailies-capture-today))
  :config
  (org-roam-db-autosync-mode)
  ;; If using org-roam-protocol
  (require 'org-roam-protocol))

(use-package yasnippet
  :disabled
  :config
  (add-to-list 'yas-snippet-dirs "~/.emacs.d/snippets")
  (yas-global-mode 1))

(use-package magit
  :bind ("C-x g" . magit-status))

(use-package markdown-mode
  :commands (markdown-mode gfm-mode)
  :mode (("README\\.md\\'" . gfm-mode)
         ("\\.md\\'" . markdown-mode)
         ("\\.markdown\\'" . markdown-mode))
  :init (setq markdown-command "multimarkdown"))

(use-package grip-mode
  ;; :hook ((markdown-mode org-mode) . grip-mode)
  :config
  (setq grip-binary-path "/opt/homebrew/bin/grip")
  (setq grip-preview-use-webkit t))

(use-package plantuml-mode
  :config
  (setq plantuml-jar-path "~/opt/plantuml.jar")
  (setq plantuml-default-exec-mode 'jar)
  :mode (("\\.plantuml\\'" . plantuml-mode))
  )

(use-package org-mind-map
  :init
  (require 'ox-org)
  :ensure t
  ;; Uncomment the below if 'ensure-system-packages` is installed
  ;;:ensure-system-package (gvgen . graphviz)
  :config
  (setq org-mind-map-engine "dot")       ; Default. Directed Graph
  ;; (setq org-mind-map-engine "neato")  ; Undirected Spring Graph
  ;; (setq org-mind-map-engine "twopi")  ; Radial Layout
  ;; (setq org-mind-map-engine "fdp")    ; Undirected Spring Force-Directed
  ;; (setq org-mind-map-engine "sfdp")   ; Multiscale version of fdp for the layout of large graphs
  ;; (setq org-mind-map-engine "twopi")  ; Radial layouts
  ;; (setq org-mind-map-engine "circo")  ; Circular Layout
  )

(use-package vimrc-mode
  :init
  (add-to-list 'auto-mode-alist '("\\.vim\\(rc\\)?\\'" . vimrc-mode)))

(use-package json-mode
  :ensure t)

(use-package lua-mode
  :config
  (setq lua-indent-level 4))

(use-package rust-mode
  :ensure t
  :mode ("\\.rs\\'" . rust-mode))

(use-package scala-mode)

;; (use-package pcre2el)

(use-package slime
  :config
  (setq inferior-lisp-program "sbcl"))

(use-package geiser-guile)

;; https://stackoverflow.com/questions/2249955/emacs-shift-tab-to-left-shift-the-block
(defun indent-region-custom(numSpaces)
  (progn
    ;; default to start and end of current line
    (setq regionStart (line-beginning-position))
    (setq regionEnd (line-end-position))
    ;; if there's a selection, use that instead of the current line
    (when (use-region-p)
      (setq regionStart (region-beginning))
      (setq regionEnd (region-end)))

    (save-excursion ; restore the position afterwards
      (goto-char regionStart) ; go to the start of region
      (setq start (line-beginning-position)) ; save the start of the line
      (goto-char regionEnd) ; go to the end of region
      (setq end (line-end-position)) ; save the end of the line

      (indent-rigidly start end numSpaces) ; indent between start and end
      (setq deactivate-mark nil) ; restore the selected region
      )))

(defun untab-region (N)
  (interactive "p")
  (indent-region-custom -4))

(defun tab-region (N)
  (interactive "p")
  (if (active-minibuffer-window)
      (minibuffer-complete)    ; tab is pressed in minibuffer window -> do completion
    (if (use-region-p)    ; tab is pressed is any other buffer -> execute with space insertion
        (indent-region-custom 4) ; region was selected, call indent-region-custom
      (insert "    ") ; else insert four spaces as expected
      )))

(defun my/hack-tab-key ()
  (interactive)
  (local-set-key (kbd "<tab>") 'tab-region)
  (local-set-key (kbd "<backtab>") 'untab-region))
(custom-set-variables
 ;; custom-set-variables was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 '(package-selected-packages
   '(geiser-guile slime scala-mode rust-mode lua-mode json-mode vimrc-mode org-mind-map plantuml-mode grip-mode markdown-mode magit polymode org-brain org-journal scratch valign easy-kill drag-stuff right-click-context format-all highlight-indentation smart-mode-line eglot flycheck rainbow-delimiters smartparens company which-key imenu-list counsel ivy exec-path-from-shell use-package)))
(custom-set-faces
 ;; custom-set-faces was added by Custom.
 ;; If you edit it by hand, you could mess it up, so be careful.
 ;; Your init file should contain only one such instance.
 ;; If there is more than one, they won't work right.
 )
```

## 插件

### [Org mode](https://www.gnu.org/software/emacs/manual/org.html)

### Eglot

### [use-package](https://www.gnu.org/software/emacs/manual/use-package.html)

### [evil](https://github.com/emacs-evil/evil)

### [swiper](https://github.com/abo-abo/swiper)

## Emacs Lisp

## Spacemacs

https://github.com/syl20bnr/spacemacs

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

## Doom Emacs

https://github.com/doomemacs/doomemacs

```lisp title:doom/config.el
;; M-x nerd-icons-install-fonts
(setq doom-font (font-spec :family "Hack Nerd Font" :size 20 :weight 'semi-light)
)
(setq doom-theme 'doom-one)
(setq display-line-numbers-type 'relative)
(global-visual-line-mode t)

(setq org-directory "~/org/")
(setq default-directory "~/org/")

(when (display-graphic-p)
  (setq initial-frame-alist `(
    (top . 20) (left . 150)
    (width . (text-pixels . ,(round (* (x-display-pixel-width) 0.72))))
    (height . (text-pixels . ,(round (* (x-display-pixel-height) 0.84))))
  ))
  (set-frame-parameter nil 'alpha 85)
  (global-tab-line-mode 1)
  ;; :ui tabs not display, https://github.com/doomemacs/doomemacs/issues/6280
  (after! centaur-tabs
    (centaur-tabs-group-by-projectile-project))
)
;; can't switch to unreal buffer, https://github.com/doomemacs/doomemacs/issues/3495
  ;; (setq doom-unreal-buffer-functions '(minibufferp))
(after! persp-mode 
  (remove-hook 'persp-add-buffer-on-after-change-major-mode-filter-functions #'doom-unreal-buffer-p))

(setq confirm-kill-emacs nil)
(add-hook 'after-init-hook 'doom/switch-to-scratch-buffer)

(add-hook 'emacs-startup-hook
  (lambda () (when (get-buffer "*scratch*") (kill-buffer "*scratch*"))))
```

## 问题技巧

`sudo ln -s /Applications/Emacs.app/Contents/MacOS/Emacs /usr/local/bin/emacs`

## 参考

-  https://github.com/emacs-tw/awesome-emacs

