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
import httpx


class BaseClipper:
    DOMAIN = None
    URL_RULES = []
    COVER_INDEX = -1
    IMAGE_EXTS = {'webp', 'jpg', 'jpeg'}
    IMAGE_FOLDER = ''
    
    def __init__(self, url, output_dir, is_download_images=True):
        self.url = url
        self.domain = self.DOMAIN or urlparse(self.url).netloc.replace("www.", "").split(".")[0]
        self.tags = [f"clippings/{self.domain}"]
        self.title = ''
        self.cover = ''
        self.images = []
        self.content = ''
        self.created = ''
        self.soup = None
        self.output_dir = os.path.join(output_dir, self.domain)
        os.makedirs(self.output_dir, exist_ok=True)
        self.is_download_images = is_download_images
        if self.is_download_images:
            os.makedirs(os.path.join(self.output_dir, self.IMAGE_FOLDER), exist_ok=True)
    
    @classmethod
    def match_and_redirect(cls, url):
        for pattern, redirect in cls.URL_RULES:
            if re.search(pattern, url):
                if redirect:
                    try:
                        url = re.sub(pattern, redirect, url)
                    except Exception:
                        pass
                return url

    def parse(self):
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
        resp = httpx.get(self.url, headers=headers, timeout=30.0, follow_redirects=True, verify=False)
        resp.raise_for_status()
        self.soup = BeautifulSoup(resp.content, "html.parser")
        
        self._parse_meta()
        self._parse_content()
        self._set_cover()
        self.created = datetime.now().isoformat(timespec='seconds')
    
    def _parse_meta(self):
        if meta_title := self.soup.find("meta", property="og:title"):
            self.title = meta_title.get('content')
        else:
            self.title = self.soup.title.string
        
        if meta_image := self.soup.find("meta", property="og:image"):
            self.cover = meta_image.get('content')
            if self.cover and self.is_download_images:
                self.cover = self._download_image(self.cover)
    
    def _parse_images(self):
        images = []
        seen = set()
        
        for url in self._parse_image():
            img_url = self._normalize(url)
            if self._filter_image(img_url) and img_url not in seen:
                seen.add(img_url)
                images.append(self._download_image(img_url) if self.is_download_images else img_url)
        return images

    def _parse_image(self):
        for img in self.soup.select('img'):
            if src := img.get('src'):
                yield src

    def _normalize(self, url):
        if url.startswith("//"):
            return "https:" + url
        elif url.startswith(("http://", "https://", "data:")):
            return url
        return urljoin(self.url, url)

    def _filter_image(self, img_url):
        if not self.IMAGE_EXTS:
            return True

        if img_url.startswith("data:image/"):
            ext = img_url.split(';')[0].split('/')[1]
        else:
            ext = img_url.split('?')[0].split('#')[0].split('.')[-1].lower()
        
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

    def _set_cover(self):
        if not self.cover and self.images:
            self.cover = self._get_by_index(self.images, self.COVER_INDEX)
    
    @staticmethod
    def _get_by_index(arr, pos):
        if not arr:
            return None
        pos = len(arr) + pos if pos < 0 else pos
        return arr[max(0, min(pos, len(arr) - 1))]

    def _parse_content(self):
        self.images = self._parse_images()
        self.content = "\n\n".join(f"![]({img})" for img in self.images)
    
    def generate_markdown(self):
        cover = f'"[[{self.cover}]]"' if self.cover and self.cover.startswith('./') else (self.cover or '')

        frontmatter = f"""---
title: {self.title}
url: {self.url}
image: {cover}
tags: {self.tags}
created: {self.created}
---"""
        return f"{frontmatter}\n\n{self.content}"
    
    def save(self):
        filepath = os.path.join(self.output_dir, self._filename() + '.md')
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(self.generate_markdown())

    def _filename(self):
        return re.sub(r"[^\w\-]", "_", self.title)[:50] if self.title else datetime.now().strftime("%Y%m%d%H%M%S%f")


class MissavClipper(BaseClipper):
    DOMAIN = 'missav'
    URL_RULES = [
        (r'https://missav\.([a-z]+)/dm18/cn/([0-9a-z-]+)', '')
    ]

    def __init__(self, url, output_dir, is_download_images=True):
        super().__init__(url, output_dir, is_download_images)
        self.tags.append('av')

    def _parse_image(self):
        for element in self.soup.select("div.plyr__poster"):
            if style := element.get('style'):
                match = re.search(r"background-image:\s*url\(['\"]?(.*?)['\"]?\)", style)
                if match:
                    yield match.group(1)

    def _parse_content(self):
        pass

    def _filename(self):
        return self.domain + '-' + self.url.rstrip('/').split('?')[0].split('#')[0].split('/')[-1]


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

    def __init__(self, url, output_dir, is_download_images=True):
        super().__init__(url, output_dir, is_download_images)
        self.tags.append('av')

    def _parse_image(self):
        for img in self.soup.select('video'):
            if src := img.get('poster'):
                yield src

    def _parse_content(self):
        pass

    def _filename(self):
        return self.domain + '-' + self.url.rstrip('/').split('?')[0].split('#')[0].split('/')[-1]


class ChiguaClipper(BaseClipper):
    DOMAIN = '51'
    URL_RULES = [
        (r"https://(.*)/archives/(.*)", r"https://aide.sdovcthe.com/archives/\2")
    ]
    
    def __init__(self, url, output_dir, is_download_images=False):
        super().__init__(url, output_dir, is_download_images)
        self.tags.append('av')

    def _parse_image(self):
        for img in self.soup.select('div.post-content img'):
            if src := img.get('data-xkrkllgl'):
                yield src

    def _parse_images(self):
        return []

    def _set_cover(self):
        self.cover = ''

    def _filename(self):
        return self.domain + '-' + self.url.rstrip('/').split('?')[0].split('#')[0].split('/')[-1]


class WebToMarkdown:
    CLIPPERS = [PornyClipper, ChiguaClipper]
    
    def __init__(self, output_dir="./output"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
    
    def get_clipper(self, url):
        for clipper_class in self.CLIPPERS:
            if new_url := clipper_class.match_and_redirect(url):
                print(f"\n{clipper_class.__name__}  {new_url}")
                return clipper_class(new_url, self.output_dir)
        return BaseClipper(url, self.output_dir)
    
    def process_url(self, url):
        try:
            clipper = self.get_clipper(url)
            clipper.parse()
            clipper.save()
        except Exception as e:
            print(f"ERROR {url}: {e}")
            print(traceback.format_exc())
    
    def process_urls(self, urls):
        if isinstance(urls, str):
            urls = urls.strip().split()
        for url in urls:
            self.process_url(url)


if __name__ == "__main__":
    converter = WebToMarkdown()
    converter.process_urls([
        'https://tog.jiuse9005.com/video/view/1126684461',
        'https://chair.ydftqji.xyz/archives/158228',
        'https://missav.live/dm18/cn/fc2-ppv-1157625'
    ])
    converter.process_urls("""

""")