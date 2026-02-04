---
title: Playwright
created: 2026-02-04T11:21
modified: 2026-02-04T11:22
---

Playwright 是一个 Microsoft 开源的用 TypeScript 开发的浏览器自动化测试框架.

## 安装

以 python 为例
1. 安装本体 `pip install playwright==1.57`
2. 安装浏览器 `PLAYWRIGHT_DOWNLOAD_HOST=https://npmmirror.com/mirrors/playwright playwright install chromium`

注意:  
- playwright 本体与浏览器版本存在严格对应关系. (当前镜像源仅支持到 1200, 即 143 版本, 对应 playwright 1.57) 参考 https://playwright.dev/docs/release-notes, https://registry.npmmirror.com/binary.html?path=playwright/builds/chromium/
- 如果只写 `playwright install`会安装所有浏览器和 ffmpeg

## 概念

- browser: 浏览器
- context: 窗口
- page: 标签页