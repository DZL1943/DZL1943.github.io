---
created: 2026-01-10T16:21
modified: 2026-01-10T16:21
url:
  - https://github.com/doomemacs/doomemacs
---


```lisp title="doom/config.el"
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
