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
import httpx
import re
import os
from urllib.parse import urlparse, urljoin
from datetime import datetime
from bs4 import BeautifulSoup


class BaseParser:
    DOMAIN = None
    REDIRECT_RULES = []
    IMAGE_INDEX = -1
    IMAGE_SELECTOR = 'img'
    IMAGE_ATTR = 'src'
    IMAGE_EXTS = {'webp', 'jpg', 'jpeg'}
    
    def __init__(self, url):
        self.url = url
        self.domain = self.DOMAIN or urlparse(self.url).netloc.replace("www.", "").split(".")[0]
        self.tags = [f"clippings/{self.domain}"]
        self.title = ''
        self.image = ''
        self.images = []
        self.content = ''
        self.created = ''
        self.soup = None
    
    @classmethod
    def match_and_redirect(cls, url):
        for pattern, redirect in cls.REDIRECT_RULES:
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
        self._set_image()
        self.created = datetime.now().isoformat(timespec='seconds')
    
    def _parse_meta(self):
        if meta_title := self.soup.find("meta", property="og:title"):
            self.title = meta_title.get('content')
        else:
            self.title = self.soup.title.string
        
        if meta_image := self.soup.find("meta", property="og:image"):
            self.image = meta_image.get('content')
    
    def _parse_content(self):
        self.images = self._parse_images()
        self.content = "\n\n".join(f"![]({img})" for img in self.images)
    
    def _normalize(self, url):
        if url.startswith("//"):
            return "https:" + url
        elif url.startswith(("http://", "https://", "data:")):
            return url
        return urljoin(self.url, url)

    def _parse_images(self):
        images = []
        seen = set()
        
        for img in self.soup.select(self.IMAGE_SELECTOR):
            if src := img.get(self.IMAGE_ATTR):
                img_url = self._normalize(src)
                if not self._filter_image(img_url):
                    continue
                if img_url not in seen:
                    seen.add(img_url)
                    images.append(img_url)
        return images
    
    def _filter_image(self, img_url):
        if not self.IMAGE_EXTS:
            return True

        if img_url.startswith("data:image/"):
            ext = img_url.split(';')[0].split('/')[1]
        else:
            clean = img_url.split('?')[0].split('#')[0]
            ext = clean.split('.')[-1].lower() if '.' in clean else ''
        
        return ext in self.IMAGE_EXTS
    
    def _set_image(self):
        if not self.image and self.images:
            self.image = self._get_by_index(self.images, self.IMAGE_INDEX)
    
    @staticmethod
    def _get_by_index(arr, pos):
        if not arr:
            return None
        if pos < 0:
            pos = len(arr) + pos
        pos = max(0, min(pos, len(arr) - 1))
        return arr[pos]
    
    def generate_markdown(self):
        frontmatter = f"""---
title: {self.title}
url: {self.url}
image: {self.image}
tags: {self.tags}
created: {self.created}
---"""
        return f"{frontmatter}\n\n{self.content}"


class PornyClipper(BaseParser):
    DOMAIN = '91'
    REDIRECT_RULES = [
        (r'https://(.*)/view_video\.php\?viewkey=([a-z0-9]+).*', r'https://tog.jiuse9002.com/video/view/\2'),
        (r"https://(.*)/video(s)?/view(hd)?/(.*)", r"https://tog.jiuse9002.com/video\2/view/\4")
    ]
    IMAGE_SELECTOR = 'video'
    IMAGE_ATTR = 'poster'


class ChiguaClipper(BaseParser):
    DOMAIN = '51'
    REDIRECT_RULES = [
        (r"https://(.*)/archives/(.*)", r"https://basket.gekjezba.cc/archives/\2")
    ]
    IMAGE_SELECTOR = 'div.post-content img'
    IMAGE_ATTR = 'data-xkrkllgl'
    
    def _set_image(self):
        self.image = ''


class WebToMarkdown:
    PARSERS = [PornyClipper, ChiguaClipper]
    
    def __init__(self, output_dir="./output"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)
    
    def get_parser(self, url):
        for parser_class in self.PARSERS:
            if new_url := parser_class.match_and_redirect(url):
                print(f"{parser_class}  {new_url}")
                return parser_class(new_url)
        return BaseParser(url)
    
    def process_url(self, url):
        try:
            parser = self.get_parser(url)
            parser.parse()
            self._save(
                os.path.join(
                    self.output_dir,
                    parser.domain,
                    (
                        re.sub(r"[^\w\-]", "_", parser.title)[:50]
                        if parser.title
                        else datetime.now().strftime("%Y%m%d%H%M%S")
                    )
                    + ".md",
                ),
                parser.generate_markdown(),
            )
        except Exception as e:
            print(f"处理失败 {url}: {e}")
    
    def process_urls(self, urls):
        for url in urls:
            self.process_url(url)
    
    def _save(self, filepath, data):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        if os.path.exists(filepath):
            print(f"覆盖: {filepath}")
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(data)

        print(f"保存: {filepath}")


if __name__ == "__main__":
    converter = WebToMarkdown()
    converter.process_urls([
        "https://uiq.91pn104.cc/video/view/e07fb0de0d968fbb0724",
        "https://affect.ffqrvjzr.com/archives/158228/",
    ])
```