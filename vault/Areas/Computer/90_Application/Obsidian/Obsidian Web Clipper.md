---
created: 2025-12-02T22:03
modified: 2025-12-02T22:05
unlisted: true
url:
  - https://obsidian.md/clipper
  - https://help.obsidian.md/web-clipper
aliases:
  - Obsidian 剪藏
---

## 界面

- Header
    - 模板
    - 显示页面变量
    - 高亮
    - 在页面中打开
    - 设置
- Properties
- Note content
- Footer
    - 添加
    - 文件夹

## 设置

- 常规
- 属性
- 高亮
- 解释器

## 模板

- 名称
- 行为
- 文件名
- 文件夹
- 库
- 触发器
- 属性
- 内容

## 变量

- Preset variables
- Prompt variables
- Meta variables
- Selector variables
- Schema.org variables

## 过滤器

- Dates
- Text conversion and capitalization
- Text formatting
- Numbers
- HTML processing
- Arrays and objects

## Examples

```json fold
{
  "schemaVersion": "0.1.0",
  "name": "91",
  "behavior": "create",
  "noteContentFormat": "\n{{selector:video?poster|image}}\n",
  "properties": [
    {
      "name": "title",
      "value": "{{title}}",
      "type": "text"
    },
    {
      "name": "url",
      "value": "{{url}}",
      "type": "text"
    },
    {
      "name": "image",
      "value": "{{image}}",
      "type": "text"
    },
    {
      "name": "tags",
      "value": "clippings/91, av",
      "type": "multitext"
    },
    {
      "name": "created",
      "value": "{{time}} ",
      "type": "date"
    }
  ],
  "triggers": [
    "/^https:\\/\\/(.*)\\/video(s)?\\/view(hd)?\\/(.*)/"
  ],
  "noteNameFormat": "{{title|safe_name}}",
  "path": "Inbox"
}
```

```json fold
{
  "schemaVersion": "0.1.0",
  "name": "51",
  "behavior": "create",
  "noteContentFormat": "\n{{selector:div.post-content img:is([src^=\"data:image/jpeg;base64,\"], [src^=\"data:image/jpg;base64,\"])?src|slice:0,-1|image|join:\"\\n\\n\"}}\n",
  "properties": [
    {
      "name": "title",
      "value": "{{title}}",
      "type": "text"
    },
    {
      "name": "url",
      "value": "{{url}}",
      "type": "text"
    },
    {
      "name": "image",
      "value": "",
      "type": "text"
    },
    {
      "name": "tags",
      "value": "clippings/51, av",
      "type": "multitext"
    },
    {
      "name": "created",
      "value": "{{time}} ",
      "type": "date"
    }
  ],
  "triggers": [
    "/https:\\/\\/(.*)\\/archives\\/(\\d+)/"
  ],
  "noteNameFormat": "{{title|safe_name}}",
  "path": "Inbox"
}
```

## 脚本

```python fold
import base64
from datetime import datetime
import hashlib
import os
import re
import traceback
from urllib.parse import urlparse, urljoin

from bs4 import BeautifulSoup
import niquests
from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth
import yaml


class BaseClipper:
    SITE = None
    URL_RULES = []
    COVER_INDEX = -1
    IMAGE_SELECTOR = ('img', 'src', None)
    IMAGE_EXTS = {'webp', 'jpg', 'jpeg'}
    IMAGE_FOLDER = ''
    
    @classmethod
    def match_and_redirect(cls, url):
        for pattern, redirect, *_ in cls.URL_RULES:
            if re.search(pattern, url):
                return re.sub(pattern, redirect, url) if redirect else url

    def _fetch_html_playwright(self, browser):
        page = browser.new_page()
        # webdriver_status = page.evaluate("navigator.webdriver")
        # print("from new_page: ", webdriver_status)
        resp = page.goto(self.url, wait_until="domcontentloaded", timeout=60000)
        if not resp.ok:
            raise

        selector, attr, checker, *_ = self.IMAGE_SELECTOR
        if not checker:
            checker = lambda x: bool(x)
        page.wait_for_selector(selector, timeout=90000)
        last_count = len(page.query_selector_all(selector))
        for i in range(5):
            page.wait_for_timeout(500)
            elements = page.query_selector_all(selector)
            attrs = [checker(e.get_attribute(attr)) for e in elements]
            count = len(elements)
            if count == last_count and all(attrs):
                break
            last_count = count
        
        html_content = page.content()
        # page.close()
        return html_content

    def _fetch_html_niquests(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
        resp = niquests.get(self.url, headers=headers, timeout=30.0, verify=False)
        resp.raise_for_status()
        return resp.content

    def _fetch_html(self, browser=None):
        if browser:
            return self._fetch_html_playwright(browser)
        return self._fetch_html_niquests()

    def main(self, url, output_dir='./output', download_images=True, browser=None):
        self.url = url
        self.soup = BeautifulSoup(self._fetch_html(browser), "html.parser")

        self.site = self.SITE or self._parse_site()
        self.download_images = download_images
        self.output_dir = os.path.join(output_dir, self.site)
        self._setup_dirs()

        self.images = self.parse_images()
        self.content = self._parse_content()
        self.metadata = self._parse_metadata()
        
        markdown =  self._generate_markdown()
        return self._save(markdown)

    def _setup_dirs(self):
        os.makedirs(self.output_dir, exist_ok=True)
        if self.download_images:
            os.makedirs(os.path.join(self.output_dir, self.IMAGE_FOLDER), exist_ok=True)

    def _parse_id(self):
        if path := urlparse(self.url).path.rstrip('/'):
            return path.split('/')[-1]

    def _parse_site(self):
        if site_name := self.soup.find("meta", property="og:site_name"):
            return site_name.get('content')

    def _parse_content(self):
        return "\n\n".join(f"![]({img})" for img in self.images)

    def _parse_metadata(self):
        return {
            'title': self._safe_name(self._parse_title()),
            'url': self.url,
            'image': self._set_cover(),
            'tags': self._set_tags(),
            'created': self._set_created()
        }

    def _set_tags(self):
        return [f"clippings/{self.site}"]
    
    def _set_created(self):
        return datetime.now().isoformat(timespec='seconds')

    def _parse_title(self):
        if twitter_title := self.soup.find("meta", property="twitter:title"):
            title = twitter_title.get('content', '')
        elif meta_title := self.soup.find("meta", property="og:title"):
            title = meta_title.get('content', '')
        else:
            title = self.soup.title.string if self.soup.title else ''

        return title

    @staticmethod
    def _safe_name(text, max_length=100):
        return re.sub(r'[^\w\-_\. ]', '_', text).strip()[:max_length]

    def _parse_cover(self):
        if meta_image := self.soup.find("meta", property="og:image"):
            cover = meta_image.get('content')
        return cover or ''

    def _set_cover(self):
        cover = self._parse_cover()
        if cover and self.download_images:
            cover = self._download_image(cover) or cover
        if not cover and self.images:
            cover = self._safe_index(self.images, self.COVER_INDEX)
        
        if cover.startswith('./'):
            cover = f'[[{cover}]]'
        return cover
    
    @staticmethod
    def _safe_index(arr, pos):
        pos = len(arr) + pos if pos < 0 else pos
        return arr[max(0, min(pos, len(arr) - 1))]

    @staticmethod
    def _style2dict(style):
        style = style.split('style=')[-1]
        return {
            k.strip(): v.strip()
            for attr in style.split(";")
            if attr and ":" in attr
            for k, v in [attr.split(":", 1)]
        }

    def _parse_image(self):
        selector, attr, *_ = self.IMAGE_SELECTOR
        for img in self.soup.select(selector):
            if src := img.get(attr):
                if attr == 'style':
                    match = re.search(r"background-image:\s*url\(['\"]?(.*?)['\"]?\)", src)
                    if match:
                        yield match.group(1)
                yield src

    def parse_images(self):
        images = []
        for img in self._parse_image():
            url = self._normalize(img)
            if self._filter_image(url):
                images.append(self._download_image(url) or url if self.download_images else url)
        return images

    def _normalize(self, src):
        if src.startswith("//"):
            return "https:" + src
        elif src.startswith(("http://", "https://", "data:")):
            return src
        return urljoin(self.url, src)

    def _filter_image(self, url):
        if not self.IMAGE_EXTS:
            return True
        
        if url.startswith("data:image/"):
            ext = url.split(';')[0].split('/')[1]
        else:
            ext = url.split('?')[0].split('#')[0].split('.')[-1].lower()
        return ext in self.IMAGE_EXTS

    def _download_image(self, url):
        try:
            if url.startswith("data:image/"):
                header, data = url.split(",", 1)
                img_data = base64.b64decode(data)
                ext = header.split(';')[0].split('/')[1]
            else:
                resp = niquests.get(url, timeout=30)
                resp.raise_for_status()
                img_data = resp.content
                ext = url.split('?')[0].split('#')[0].split('.')[-1].lower()
            
            filename = f"{hashlib.md5(img_data).hexdigest()}.{ext}"

            with open(os.path.join(self.output_dir, self.IMAGE_FOLDER, filename), 'wb') as f:
                f.write(img_data)
            
            return os.path.join('.', self.IMAGE_FOLDER, filename)
        except Exception as e:
            print(f"Download image failed: {url[:50]}... - {e}")
            return None

    def _generate_markdown(self):
        frontmatter = yaml.dump(self.metadata, allow_unicode=True, sort_keys=False, indent=2)
        return f"---\n{frontmatter}---\n\n{self.content}"
    
    def _save(self, markdown):
        filepath = os.path.join(self.output_dir, self._filename() + '.md')
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(markdown)
        return filepath

    def _filename(self):
        if id := self._parse_id():
            return f'{self.site}-{id}'
        return f'{datetime.now().strftime("%Y%m%d%H%M%S")}{self.metadata.get('title')}'


class MissavClipper(BaseClipper):
    SITE = 'missav'
    URL_RULES = [
        (r'https://missav[^/]*/((?:[0-9a-z]+/)?)([a-z]+)/([0-9a-z-]+)', r'https://missav.live/\1\2/\3')
    ]
    IMAGE_SELECTOR = ('div.plyr__poster', 'style', None)

    def _set_tags(self):
        tags = super()._set_tags()
        tags.append('av')
        return tags

    def _parse_content(self):
        return ''


class PornyClipper(BaseClipper):
    SITE = '91'
    URL_RULES = [
        (
            r"https://(.*)/view_video\.php\?viewkey=([a-z0-9]+).*",
            r"https://tog.jiuse9002.com/video/view/\2",
        ),
        (
            r"https://(.*)/video(s)?/view(hd)?/(.*)",
            r"https://tog.jiuse9002.com/video\2/view/\4",
        ),
    ]
    IMAGE_SELECTOR = ('video', 'poster', None)

    def _set_tags(self):
        tags = super()._set_tags()
        tags.append('av')
        return tags

    def _parse_content(self):
        return ''


class ChiguaClipper(BaseClipper):
    SITE = '51'
    URL_RULES = [
        (r"https://(.*)/archives/(.*)", r"https://also.etlauzw.cc/archives/\2")
    ]
    IMAGE_SELECTOR = ('div.post-content img', 'src', lambda x: x and x.startswith('data:image/'))
    
    def _set_tags(self):
        tags = super()._set_tags()
        tags.append('av')
        return tags
    
    def _parse_cover(self):
        return ''
    
    def parse_images(self):
        return super().parse_images()[:-1]


class WebToMarkdown:
    def __init__(self, output_dir="./output"):
        self.clippers = []
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
    
    def register(self, *clipper_classes):
        self.clippers.extend(clipper_classes)
        return self

    def match_clipper(self, url):
        for clipper_class in self.clippers:
            if real_url := clipper_class.match_and_redirect(url):
                print(f"\n{clipper_class.__name__}:  {real_url}")
                return clipper_class, real_url
        return BaseClipper, url
    
    def process_url(self, url, browser=None):
        try:
            clipper_class, url = self.match_clipper(url)
            clipper = clipper_class()
            return clipper.main(url, self.output_dir, browser=browser)
        except Exception as e:
            print(f"ERROR {url}: {e}")
            print(traceback.format_exc())
    
    def process_urls(self, urls):
        if isinstance(urls, str):
            urls = urls.strip().split()
        
        with Stealth().use_sync(sync_playwright()) as p:
        # with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=False,
                args=[
                        '--disable-blink-features=AutomationControlled',
                        '--disable-features=IsolateOrigins,site-per-process',
                        '--disable-features=BlockInsecurePrivateNetworkRequests',
                        '--disable-features=OutOfBlinkCors',
                        '--disable-features=AudioServiceOutOfProcess',
                        '--disable-features=ChromeWhatsNewUI',
                        '--no-default-browser-check',
                        '--no-startup-window',
                        '--no-first-run',
                        '--disable-notifications',
                        '--disable-popup-blocking',
                        '--disable-background-timer-throttling',
                        '--disable-backgrounding-occluded-windows',
                        '--disable-renderer-backgrounding',
                        '--disable-breakpad',
                        '--disable-component-extensions-with-background-pages',
                        '--disable-client-side-phishing-detection',
                        '--disable-crash-reporter',
                        '--disable-device-discovery-notifications',
                        '--disable-ipc-flooding-protection',
                        '--disable-prompt-on-repost',
                        '--disable-sync',
                        '--metrics-recording-only',
                        '--safebrowsing-disable-auto-update',
                        '--password-store=basic',
                        '--use-mock-keychain',
                        '--remote-debugging-port=0',   # 某些网站检测此端口
                        # '--disable-gpu',                # 在无头模式下有时需要
                        '--hide-scrollbars',
                        '--mute-audio',
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-extensions',
                        '--ignore-certificate-errors',
                ]
            )
            browser_context = browser.new_context(
                    viewport={'width': 1100, 'height': 700},
                    user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    locale='zh-CN,zh;q=0.9,en;q=0.8',
                    timezone_id='Asia/Shanghai',
                    bypass_csp=True,
                    java_script_enabled=True,
                    ignore_https_errors=True,
                    permissions=['geolocation'],
                    extra_http_headers={
                        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                        'Connection': 'keep-alive',
                        # 'Upgrade-Insecure-Requests': '1'
                    }
            )

            browser_context.add_init_script("""
                // 隐藏 webdriver（Stealth 已做，但可以覆盖）
                Object.defineProperty(navigator, 'webdriver', { get: () => undefined });

                // 伪造 plugins
                Object.defineProperty(navigator, 'plugins', {
                    get: () => [1, 2, 3, 4, 5].map(i => ({ name: 'Chrome PDF Plugin' })),
                });

                // 伪造 languages
                Object.defineProperty(navigator, 'languages', {
                    get: () => ['zh-CN', 'zh', 'en'],
                });

                // 伪造 chrome 对象
                if (!window.chrome) {
                    window.chrome = { runtime: {} };
                }

                // 伪造 permissions
                const originalQuery = window.navigator.permissions.query;
                window.navigator.permissions.query = (parameters) => (
                    parameters.name === 'notifications' ?
                        Promise.resolve({ state: Notification.permission }) :
                        originalQuery(parameters)
                );

                // 修改连接属性（RTC、硬件并发数等）
                Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
                Object.defineProperty(navigator, 'deviceMemory', { get: () => 8 });

                // 覆盖 WebGL 供应商（防止虚拟机检测）
                const getParameter = WebGLRenderingContext.prototype.getParameter;
                WebGLRenderingContext.prototype.getParameter = function(parameter) {
                    if (parameter === 37445) return 'Intel Inc.';  // UNMASKED_VENDOR_WEBGL
                    if (parameter === 37446) return 'Intel Iris OpenGL Engine'; // UNMASKED_RENDERER_WEBGL
                    return getParameter(parameter);
                };
            """)

            for url in urls:
                self.process_url(url, browser=browser_context)
            
            input('press any key to exit: ')
            browser_context.close()
            browser.close()


if __name__ == "__main__":
    converter = WebToMarkdown()
    converter.register(PornyClipper, ChiguaClipper, MissavClipper)
    # converter.process_urls([
    #     # 'https://tog.jiuse9005.com/video/view/1126684461',
    #     # 'https://chair.ydftqji.xyz/archives/158228',
    #     'https://missav.live/dm194/cn/fc2-ppv-1157625'
    # ])
    converter.process_urls("""
""")