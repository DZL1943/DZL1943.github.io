
```python
#!/usr/bin/env python3
import argparse
import csv
import json
import sys
import time
from itertools import chain

import httpx


class GitHub:
    ACCEPT = "application/vnd.github.mercy-preview+json, application/vnd.github.v3+json"
    PER_PAGE = 100
    MAX_RETRIES = 5
    SEARCH_CAP = 1000
    MAX_PAGES = SEARCH_CAP // PER_PAGE
    FIELDMAP = {
        "full_name": "full_name",
        "description": "description",
        "url": "html_url",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "stars": "stargazers_count",
        "forks": "forks_count",
        "issues": "open_issues_count",
        "language": "language",
    }

    def __init__(self, token=None, timeout=30.0, verify=False):
        headers = {"Accept": self.ACCEPT}
        if token:
            headers["Authorization"] = f"token {token}"
        self.client = httpx.Client(headers=headers, timeout=timeout, verify=verify)

    def close(self):
        self.client.close()

    def _get(self, url, params=None, retries=None):
        if retries is None:
            retries = self.MAX_RETRIES
        for attempt in range(retries):
            r = self.client.get(url, params=params)
            if r.status_code == 200:
                return r
            if r.status_code == 403:
                rem, reset = r.headers.get("X-RateLimit-Remaining"), r.headers.get("X-RateLimit-Reset")
                if rem == "0" and reset:
                    wait = max(0, int(reset) - int(time.time()) + 1)
                    print(f"rate limit, sleeping {wait}s...", file=sys.stderr)
                    time.sleep(wait)
                    continue
            if r.status_code in (429, 500, 502, 503, 504):
                time.sleep((2 ** attempt) + 0.5)
                continue
            r.raise_for_status()
        r.raise_for_status()

    def _paginate(self, url, params_base=None, extract_items=False, per_page=None, max_pages=None):
        if per_page is None:
            per_page = self.PER_PAGE
        if extract_items:
            max_pages_eff = self.MAX_PAGES if max_pages is None else min(max_pages, self.MAX_PAGES)
            if max_pages is not None and max_pages > self.MAX_PAGES:
                print(f"Warning: search results capped at {self.SEARCH_CAP}; limiting to {self.MAX_PAGES} pages.",
                      file=sys.stderr)
        else:
            max_pages_eff = max_pages

        page = 1
        out = []
        while True:
            params = dict(params_base or {}, per_page=per_page, page=page)
            r = self._get(url, params=params)
            body = r.json()
            items = body.get("items") if extract_items else body
            if not isinstance(items, list):
                raise RuntimeError(f"Unexpected response: {body}")
            if not items:
                break
            out.extend(items)
            if max_pages_eff and page >= max_pages_eff:
                break
            page += 1
        return out

    def starred(self, username):
        if not username:
            raise SystemExit("username required")
        return self._paginate(f"https://api.github.com/users/{username}/starred")

    def search_repos(self, query, max_pages=None):
        return self._paginate(
            "https://api.github.com/search/repositories",
            params_base={"q": query, "sort": "stars", "order": "desc"},
            extract_items=True,
            max_pages=max_pages,
        )

    def top_repos(self, min_stars=0, count=0, language=None):
        q = ("stars:>0" if not min_stars else f"stars:>{min_stars}")
        if language:
            q = f"language:{language}+{q}"
        pages = ((count + self.PER_PAGE - 1) // self.PER_PAGE) if count else None
        items = self.search_repos(q, max_pages=pages)
        return items[:count] if count else items

    def process(self, raw_list, fieldmap=None, sort_by_stars=True):
        if fieldmap is None:
            fieldmap = self.FIELDMAP
        out = []
        for r in raw_list:
            o = {k: r.get(src) for k, src in fieldmap.items()}
            if o.get("url") is None:
                o["url"] = r.get("html_url")
            out.append(o)
        if sort_by_stars:
            out.sort(key=lambda x: int(x.get("stars") or 0), reverse=True)
        return out

    def save_ndjson(self, items, path):
        with open(path, "w", encoding="utf-8") as f:
            for it in items:
                f.write(json.dumps(it, ensure_ascii=False) + "\n")

    def save_json(self, items, path):
        with open(path, "w", encoding="utf-8") as f:
            json.dump(items, f, ensure_ascii=False, indent=2)

    def save_csv(self, items, path):
        if isinstance(items, dict):
            items = list(chain.from_iterable(items.values()))
        if not items:
            return
        with open(path, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(items[0].keys()))
            w.writeheader()
            w.writerows(items)

    def write(self, items, name, fmt):
        path = f"{name}.{fmt}"
        if fmt == "csv":
            self.save_csv(items, path)
        elif fmt == "ndjson":
            self.save_ndjson(items, path)
        else:
            self.save_json(items, path)


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("starred").add_argument("-u", "--username", required=True)
    sub.add_parser("search").add_argument("-q", "--query", required=True).add_argument("--max-pages", type=int)
    sub.add_parser("top").add_argument("--min-stars", type=int, default=0).add_argument("--count", "-n", type=int, default=0).add_argument("--language")
    p.add_argument("-f", "--format", choices=("ndjson", "json", "csv"), default="ndjson")
    p.add_argument("-t", "--token", help="GITHUB token (optional)")
    p.add_argument("--verify", action="store_true", help="enable SSL verify (default: False)")
    args = p.parse_args()

    gh = GitHub(token=args.token, verify=args.verify)
    try:
        fmt = args.format
        if args.cmd == "starred":
            raw = gh.starred(args.username)
            gh.write(gh.process(raw), "starred", fmt)
        elif args.cmd == "search":
            raw = gh.search_repos(args.query, max_pages=getattr(args, "max_pages", None))
            gh.write(gh.process(raw), "search", fmt)
        else:  # top
            raw = gh.top_repos(min_stars=args.min_stars, count=getattr(args, "count", 0), language=getattr(args, "language", None))
            name = "top" + (f"_{args.language}" if getattr(args, "language", None) else "")
            gh.write(gh.process(raw), name, fmt)
        print("Done")
    finally:
        gh.close()


if __name__ == "__main__":
    main()
```