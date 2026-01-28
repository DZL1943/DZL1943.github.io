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
import time
import re
import sys

import httpx

MAX_RETRIES = 5
ACCEPT = "application/vnd.github.mercy-preview+json, application/vnd.github.v3+json"

def get_with_retry(client, url, params=None, retries=MAX_RETRIES):
    for attempt in range(retries):
        r = client.get(url, params=params)
        if r.status_code == 200:
            return r
        if r.status_code == 403:
            rem = r.headers.get("X-RateLimit-Remaining")
            reset = r.headers.get("X-RateLimit-Reset")
            if rem == "0" and reset:
                wait = max(0, int(reset) - int(time.time()) + 1)
                print(f"rate limit, sleeping {wait}s...", file=sys.stderr)
                time.sleep(wait); continue
        if r.status_code in (429, 500, 502, 503, 504):
            time.sleep((2 ** attempt) + 0.5); continue
        r.raise_for_status()
    r.raise_for_status()

def make_progress(show):
    if not show:
        class D:
            def update(self, n=1): pass
            def close(self): pass
        return D()
    try:
        from tqdm import tqdm
        return tqdm(desc="pages", unit="page")
    except Exception:
        return make_progress(False)

def fetch_pages(username, per_page=100, show_progress=True):
    if not username:
        raise SystemExit("username required")
    endpoint = f"https://api.github.com/users/{username}/starred"
    client = httpx.Client(headers={"Accept": ACCEPT}, timeout=30.0, verify=False)
    page = 1
    all_items = []
    pbar = make_progress(show_progress)
    try:
        while True:
            url = f"{endpoint}?per_page={per_page}&page={page}"
            resp = get_with_retry(client, url)
            items = resp.json()
            if not isinstance(items, list):
                raise RuntimeError(f"Unexpected response: {items}")
            if page == 1 and show_progress:
                link = resp.headers.get("Link", "") or ""
                m = re.search(r'[&?]page=(\d+)>; rel="last"', link)
                if m and hasattr(pbar, "total"):
                    try:
                        pbar.total = int(m.group(1)); pbar.refresh()
                    except Exception:
                        pass
            pbar.update(1)
            if not items:
                break
            all_items.extend(items)
            page += 1
    finally:
        pbar.close()
        client.close()
    return all_items

def process_items(items):
    out = []
    for it in items:
        out.append({
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
        })
    out.sort(key=lambda x: x.get("stargazers_count", 0), reverse=True)
    return out

def save_ndjson(items, path):
    with open(path, "w", encoding="utf-8") as f:
        for it in items:
            f.write(json.dumps(it, ensure_ascii=False) + "\n")

def main():
    p = argparse.ArgumentParser(description="Fetch public GitHub starred repos and save as ndjson.")
    p.add_argument("--username", "-u", required=True, help="GitHub username")
    p.add_argument("--per-page", type=int, default=100, help="per_page (max 100)")
    p.add_argument("--output", "-o", default="starred.ndjson", help="output ndjson file")
    p.add_argument("--no-progress", action="store_true", help="hide progress")
    args = p.parse_args()

    if args.per_page > 100:
        args.per_page = 100

    try:
        raw = fetch_pages(args.username, per_page=args.per_page, show_progress=not args.no_progress)
    except Exception as e:
        print("Error:", e, file=sys.stderr)
        sys.exit(2)

    items = process_items(raw)
    save_ndjson(items, args.output)
    print(f"Fetched {len(raw)} raw items, processed {len(items)} -> {args.output}")

if __name__ == "__main__":
    main()
```