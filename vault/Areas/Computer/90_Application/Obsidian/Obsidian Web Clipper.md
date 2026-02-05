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
import yaml

from bs4 import BeautifulSoup
import httpx
from playwright.sync_api import sync_playwright


class BaseClipper:
    DOMAIN = None
    URL_RULES = []
    COVER_INDEX = -1
    IMAGE_EXTS = {'webp', 'jpg', 'jpeg'}
    IMAGE_FOLDER = ''
    
    def __init__(self, url, output_dir='./output', download_images=True, browser=None):
        self.url = url
        self.domain = self.DOMAIN or self._extract_domain(url)
        self.id = self._extract_id(url) or datetime.now().strftime("%Y%m%d%H%M%S%f")
        self.tags = [f"clippings/{self.domain}"]
        self.metadata = {}
        self.content = ''
        self.images = []
        self.soup = None
        self.browser = browser
        self.download_images = download_images
        self.output_dir = os.path.join(output_dir, self.domain)
        self._setup_dirs()
    
    def _setup_dirs(self):
        os.makedirs(self.output_dir, exist_ok=True)
        if self.download_images:
            os.makedirs(os.path.join(self.output_dir, self.IMAGE_FOLDER), exist_ok=True)

    @staticmethod
    def _extract_id(url):
        path = urlparse(url).path.rstrip('/')
        return path.split('/')[-1] if path else None

    @staticmethod
    def _extract_domain(url):
        return urlparse(url).netloc.replace("www.", "").split(".")[0]

    @classmethod
    def match_and_redirect(cls, url):
        for pattern, redirect in cls.URL_RULES:
            if re.search(pattern, url):
                return re.sub(pattern, redirect, url) if redirect else url

    def _fetch_html_playwright(self):
        page = self.browser.new_page()
        page.goto(self.url, wait_until="domcontentloaded", timeout=60000)
        html_content = page.content()
        # page.close()
        return html_content

    def _fetch_html_httpx(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
        resp = httpx.get(self.url, headers=headers, timeout=30.0, follow_redirects=True, verify=False)
        resp.raise_for_status()
        return resp.content

    def _fetch_html(self):
        if self.browser:
            return self._fetch_html_playwright()
        return self._fetch_html_httpx()

    def main(self):
        html = self._fetch_html()
        self.soup = BeautifulSoup(html, "html.parser")

        self.images = self.parse_images()
        self.content = self._parse_content()
        self.metadata = self._parse_metadata()
        
        markdown =  self._generate_markdown()
        return self._save(markdown)

    def _parse_metadata(self):
        return {
            'title': self._parse_title(),
            'url': self.url,
            'image': self._set_cover(),
            'tags': self.tags,
            'created': datetime.now().isoformat(timespec='seconds')
        }

    def _parse_content(self):
        return "\n\n".join(f"![]({img})" for img in self.images)

    def _parse_title(self):
        if meta_title := self.soup.find("meta", property="og:title"):
            title = meta_title.get('content', '')
        else:
            title = self.soup.title.string if self.soup.title else ''

        return title

    @staticmethod
    def _safe_name(text, max_length=50):
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

    def _parse_image(self):
        for img in self.soup.select('img'):
            if src := img.get('src'):
                yield src

    def parse_images(self):
        images = []
        for img in self._parse_image():
            url = self._normalize(img)
            if self._filter_image(url):
                images.append(self._download_image(url) or url if self.download_images else url)
        return images

    def _normalize(self, url):
        if url.startswith("//"):
            return "https:" + url
        elif url.startswith(("http://", "https://", "data:")):
            return url
        return urljoin(self.url, url)

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
                resp = httpx.get(url, timeout=30)
                resp.raise_for_status()
                img_data = resp.content
                ext = url.split('?')[0].split('#')[0].split('.')[-1].lower()
            
            filename = f"{hashlib.md5(img_data).hexdigest()}.{ext}"

            with open(os.path.join(self.output_dir, self.IMAGE_FOLDER, filename), 'wb') as f:
                f.write(img_data)
            
            return os.path.join('.', self.IMAGE_FOLDER, filename)
        except Exception as e:
            print(f"Download image failed: {url[:50]}... - {e}")
            return url

    def _generate_markdown(self):
        frontmatter = yaml.dump(self.metadata, allow_unicode=True, sort_keys=False)
        return f"---\n{frontmatter}---\n\n{self.content}"
    
    def _save(self, markdown):
        filepath = os.path.join(self.output_dir, self._filename() + '.md')
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(markdown)
        return filepath

    def _filename(self):
        return '-'.join([self.domain, self.title or self.id])


class MissavClipper(BaseClipper):
    DOMAIN = 'missav'
    URL_RULES = [
        (r'https://missav\.[a-z]+/\w+/[a-z]+/([0-9a-z-]+)', r'https://missav.live/dm18/cn/\1')
    ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tags.append('av')

    def _parse_image(self):
        for element in self.soup.select("div.plyr__poster"):
            if style := element.get('style'):
                match = re.search(r"background-image:\s*url\(['\"]?(.*?)['\"]?\)", style)
                if match:
                    yield match.group(1)

    def _parse_content(self):
        return ''

    def _filename(self):
        return self.domain + '-' + self.id


class PornyClipper(BaseClipper):
    DOMAIN = '91'
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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tags.append('av')

    def _parse_title(self):
        if content_h1 := self.soup.select_one('div.content h1'):
            title = self._safe_name(content_h1.get_text(strip=True))
            return title
        else:
            return super()._parse_title()

    def _parse_image(self):
        for img in self.soup.select('video'):
            if src := img.get('poster'):
                yield src

    def _parse_content(self):
        return ''

    def _filename(self):
        return self.domain + '-' + self.id


class ChiguaClipper(BaseClipper):
    DOMAIN = '51'
    URL_RULES = [
        (r"https://(.*)/archives/(.*)", r"https://aide.sdovcthe.com/archives/\2")
    ]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tags.append('av')

    def _parse_image(self):
        for img in self.soup.select('div.post-content img'):
            if src := img.get('src'):
                yield src
    
    def _parse_cover(self):
        return ''

    def _filename(self):
        return self.domain + '-' + self.id


class WebToMarkdown:
    def __init__(self, output_dir="./output"):
        self.clippers = []
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
        self.browser = None
        self.browser_context = None
    
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
            clipper = clipper_class(url, self.output_dir, browser=browser)
            return clipper.main()
        except Exception as e:
            print(f"ERROR {url}: {e}")
            print(traceback.format_exc())
    
    def process_urls(self, urls):
        if isinstance(urls, str):
            urls = urls.strip().split()
        
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=True,
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--disable-dev-shm-usage',
                    '--no-sandbox',
                    '--disable-extensions',
                    '--mute-audio',
                    '--no-startup-window',
                ]
            )
            browser_context = browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                locale='zh-CN',
                timezone_id='Asia/Shanghai',
                bypass_csp=True,
                java_script_enabled=True,
                ignore_https_errors=True,
            )

            for url in urls:
                self.process_url(url, browser=browser_context)
            
            input('press any key to exit: ')
            browser_context.close()
            browser.close()


if __name__ == "__main__":
    converter = WebToMarkdown()
    converter.register(PornyClipper, ChiguaClipper, MissavClipper)
    converter.process_urls([
        'https://tog.jiuse9005.com/video/view/1126684461',
        # 'https://chair.ydftqji.xyz/archives/158228',
        # 'https://missav.live/dm18/cn/fc2-ppv-1157625'
    ])
#     converter.process_urls("""

# """)