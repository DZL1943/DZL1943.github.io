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
      "value": "{{date}}",
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
  "noteContentFormat": "\n{{selector:div.post-content img[src*=jpeg]?src|slice:0,-1|image|join:\"\\n\\n\"}}\n",
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
      "value": "{{date}}",
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
    PATTERN = r".*"
    TEMPLATE = """---
title: {title}
url: {url}
image: {image}
tags: {tags}
created: {created}
---

{content}"""

    def __init__(self):
        self.soup = None
        self.domain = self.DOMAIN
        self.created = None
        self.tags = None
        self.url = None
        self.title = None
        self.image = None
        self.images = []
        self.content = ""

    @classmethod
    def match(cls, url):
        return bool(re.search(cls.PATTERN, url))

    def parse(self, url):
        self.url = url
        resp = httpx.get(self.url, timeout=30.0, follow_redirects=True)
        resp.raise_for_status()
        self.soup = BeautifulSoup(resp.content, "html.parser")

        self.domain = (
            self.DOMAIN or urlparse(self.url).netloc.replace("www.", "").split(".")[0]
        )
        self._parse_meta()
        self._parse_content()
        if not self.image:
            self._set_image()
        self.created = datetime.now().strftime("%Y-%m-%d")

    def _parse_meta(self):
        meta = self.soup.find("meta", property="og:title")
        self.title = (
            meta["content"]
            if meta
            else (self.soup.title.string if self.soup.title else "Untitled")
        )

        meta_image = self.soup.find("meta", property="og:image")
        self.image = meta_image["content"] if meta_image else ""

        self.tags = f"[clippings/{self.domain}]"

    def _parse_content(self):
        self.images = self._parse_images()
        self.content = "\n\n".join(f"![]({img})" for img in self.images)

    def _parse_images(self):
        def normalize(img_url):
            if img_url.startswith("//"):
                return "https:" + img_url
            elif img_url.startswith(("http://", "https://", "data:")):
                return img_url
            return urljoin(self.url, img_url)

        images = []
        seen = set()

        for img in self.soup.find_all("img"):
            if src := (img.get("src") or img.get("data-src")):
                img_url = normalize(src)
                if img_url not in seen:
                    seen.add(img_url)
                    images.append(img_url)

        return images

    def _set_image(self):
        if self.images:
            self.image = self.images[0]

    def generate_markdown(self):
        return self.TEMPLATE.format(
            title=self.title,
            url=self.url,
            image=self.image,
            tags=self.tags,
            created=self.created,
            content=self.content,
        )


class WebToMarkdown:
    PARSERS = [BaseParser]

    def __init__(self, output_dir="./output"):
        self.output_dir = output_dir
        os.makedirs(output_dir, exist_ok=True)

    def get_parser(self, url):
        for parser_class in self.PARSERS:
            if parser_class.match(url):
                return parser_class()
        return BaseParser()

    def process_url(self, url):
        try:
            parser = self.get_parser(url)
            parser.parse(url)
            self._save(
                os.path.join(self.output_dir, parser.domain),
                re.sub(r"[^\w\-]", "_", parser.title)[:50] + ".md",
                parser.generate_markdown(),
            )
        except Exception as e:
            print(f"处理失败 {url}: {e}")

    def process_urls(self, urls):
        for url in urls:
            self.process_url(url)

    def _save(self, folder, name, data):
        os.makedirs(folder, exist_ok=True)
        filepath = os.path.join(folder, name)

        if os.path.exists(filepath):
            print(f"覆盖: {filepath}")

        with open(filepath, "w", encoding="utf-8") as f:
            f.write(data)

        print(f"保存: {filepath}")


if __name__ == "__main__":
    converter = WebToMarkdown()

    urls = [
        # 在这里添加要处理的URL
    ]

    converter.process_urls(urls)

```