
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
        for attempt in range(retries or self.MAX_RETRIES):
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
    
    def _paginate(self, url, params=None, extract_items=False, per_page=None, max_pages=None):
        per_page = per_page or self.PER_PAGE
        if extract_items:
            max_pages = min(max_pages or self.MAX_PAGES, self.MAX_PAGES)
        
        page = 1
        out = []
        while True:
            print(f"Begin fetching page: {page}")
            r = self._get(url, params=dict(params or {}, per_page=per_page, page=page))
            body = r.json()
            items = body.get("items") if extract_items else body
            
            if not isinstance(items, list):
                raise RuntimeError(f"Unexpected response: {body}")
            if not items:
                break
            out.extend(items)

            if max_pages and page >= max_pages:
                break
            link_header = r.headers.get("link")
            if link_header and 'rel="next"' not in link_header:
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
            params={"q": query, "sort": "stars", "order": "desc"},
            extract_items=True,
            max_pages=max_pages,
        )
    
    def top_repos(self, stars=0, limit=0, language=None):
        q = f"stars:>{stars}" if stars else "stars:>0"
        if language:
            q = f"language:{language}+{q}"
        pages = ((limit + self.PER_PAGE - 1) // self.PER_PAGE) if limit else None
        items = self.search_repos(q, max_pages=pages)
        return items[:limit] if limit else items
    
    def process(self, raw_list, fieldmap=None, sort_by_stars=True):
        fieldmap = fieldmap or self.FIELDMAP
        out = []
        for r in raw_list:
            o = {k: r.get(src) for k, src in fieldmap.items()}
            o["url"] = o.get("url") or r.get("html_url")
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
        getattr(self, f"save_{fmt}")(items, f"{name}.{fmt}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--format", 
                       choices=("ndjson", "json", "csv"), 
                       default="json")
    parser.add_argument("-t", "--token", 
                       help="GitHub API token (optional)")
    parser.add_argument("--verify", action="store_true",
                       help="enable SSL verification (default: False)")

    subparsers = parser.add_subparsers(dest="cmd", required=True)
    
    starred_parser = subparsers.add_parser("starred")
    starred_parser.add_argument("-u", "--username", required=True)

    search_parser = subparsers.add_parser("search")
    search_parser.add_argument("-q", "--query", required=True)
    search_parser.add_argument("--max-pages", type=int)
    
    top_parser = subparsers.add_parser("top")
    top_parser.add_argument("--stars", type=int, default=0, 
                          help="minimum stars (default: 0)")
    top_parser.add_argument("--limit", "-n", type=int, default=0,
                          help="maximum number of repos (default: unlimited)")
    top_parser.add_argument("--language", 
                          help="filter by programming language")
    
    args = parser.parse_args()
    
    gh = GitHub(token=args.token, verify=args.verify)
    try:
        match args.cmd:
            case "starred":
                if not args.username:
                    raise SystemExit("Error: username is required")
                raw = gh.starred(args.username)
                gh.write(gh.process(raw), "starred", args.format)
                
            case "search":
                raw = gh.search_repos(args.query, max_pages=args.max_pages)
                gh.write(gh.process(raw), "search", args.format)
                
            case "top":
                raw = gh.top_repos(stars=args.stars, limit=args.limit, 
                                 language=args.language)
                name = "top"
                if args.language:
                    name = f"top_{args.language.lower().replace(' ', '_')}"
                gh.write(gh.process(raw), name, args.format)
        
        print(f"Done. Output saved as {args.format} file.")
        
    finally:
        gh.close()


if __name__ == "__main__":
    main()
```