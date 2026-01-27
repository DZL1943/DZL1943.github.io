---
created: 2025-12-21T21:18
modified: 2026-01-22T19:02
---

<!-- truncate -->

- App: 软件应用
    - Desktop
        - Windows
        - macOS
    - Mobile
        - Android
        - iOS
    - Web
    - CLI
- Tool: 开发或运维工具?
- Code: Lib、Framework、Middleware
    - C/C++
    - Rust
    - Go
    - Java
    - Python
    - JavaScript
    - Shell
- Resource
- Archived
- Inbox

> [!tip] 只整理在用的就行.

```python fold
#!/usr/bin/env python3
import argparse
import json
import sys
import time
from typing import List, Dict, Any, Optional

import httpx
from tqdm import tqdm


def fetch_pages(username: Optional[str],
                per_page: int = 100, max_pages: Optional[int] = None) -> List[Dict[str, Any]]:
    """
    分页抓取 starred
    """
    headers = {"Accept": "application/vnd.github.mercy-preview+json, application/vnd.github.v3+json"}

    client = httpx.Client(headers=headers, timeout=30.0, verify=False)
    page = 1
    all_items: List[Dict[str, Any]] = []

    pbar = None
    try:
        while True:
            url = f"https://api.github.com/users/{username}/starred?per_page={per_page}&page={page}"
            # 重试
            for attempt in range(5):
                resp = client.get(url)
                if resp.status_code == 200:
                    break
                # 速率限制处理
                if resp.status_code == 403:
                    remaining = resp.headers.get("X-RateLimit-Remaining")
                    reset = resp.headers.get("X-RateLimit-Reset")
                    if remaining == "0" and reset:
                        reset_ts = int(reset)
                        wait = max(0, reset_ts - int(time.time()) + 1)
                        print(f"Rate limit reached. Waiting {wait} seconds until reset...")
                        time.sleep(wait)
                        continue
                    # 其他 403 情况，短暂退避
                if resp.status_code in (429, 500, 502, 503, 504):
                    backoff = (2 ** attempt) + 0.5
                    time.sleep(backoff)
                    continue
                # 无法恢复的错误直接报错
                resp.raise_for_status()
            else:
                resp.raise_for_status()

            items = resp.json()
            if not isinstance(items, list):
                # 有时 GitHub 会返回错误对象
                raise RuntimeError(f"Unexpected response: {items}")

            if page == 1:
                # 尝试从 Link header 或 total count 估算进度（若存在）
                link = resp.headers.get("Link", "")
                if link and "rel=\"last\"" in link:
                    # 解析 last 页码（简单字符串查找）
                    import re
                    m = re.search(r'[&?]page=(\d+)>; rel="last"', link)
                    if m:
                        last_page = int(m.group(1))
                        pbar = tqdm(total=last_page, desc="pages", unit="page")
                        pbar.update(1)
                else:
                    pbar = tqdm(desc="pages", unit="page")
                    pbar.update(1)

            else:
                if pbar:
                    pbar.update(1)

            if len(items) == 0:
                break

            # 只保留必要字段，topics 字段可能为空或需要特殊 Accept header（我们已包含）
            for it in items:
                # Some fields might be missing; use .get
                repo = {
                    "name": it.get("name"),
                    "full_name": it.get("full_name"),
                    "html_url": it.get("html_url"),
                    "description": it.get("description"),
                    "language": it.get("language"),
                    "topics": it.get("topics") or [],
                    "archived": bool(it.get("archived")),
                    "fork": bool(it.get("fork")),
                    "stargazers_count": it.get("stargazers_count", 0),
                    "pushed_at": it.get("pushed_at"),
                }
                all_items.append(repo)

            if max_pages and page >= max_pages:
                break

            page += 1
            # 速率限制防护：若未认证，睡一小段以更稳妥（可注释）
            # time.sleep(0.1)

    finally:
        if pbar:
            pbar.close()
        client.close()

    return all_items


def main():
    parser = argparse.ArgumentParser(description="Fetch GitHub starred repos (paginated) using httpx.")
    parser.add_argument("--username", "-u", type=str, help="GitHub username (for public stars).")
    parser.add_argument("--output", "-o", type=str, default="starred-all.json", help="output filepath.")
    args = parser.parse_args()

    try:
        items = fetch_pages(username=args.username)
    except Exception as e:
        print(f"Error fetching pages: {e}", file=sys.stderr)
        sys.exit(2)

    items.sort(key=lambda x: x.get("stargazers_count", 0), reverse=True)

    # 保存
    with open(args.output, "w", encoding="utf-8") as f:
        for item in items:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")
            
    print(f"Saved {len(items)} repos to {args.output}")


if __name__ == "__main__":
    main()
```