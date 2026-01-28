
```python
#!/usr/bin/env python3

import argparse, csv, json, re, sys, time, os
from itertools import chain

import httpx

class GitHub:
    ACCEPT = "application/vnd.github.mercy-preview+json, application/vnd.github.v3+json"
    PER_PAGE = 100
    MAX_RETRIES = 5
    FIELDMAP = {
        'full_name': 'full_name',
        'description': 'description',
        'url': 'html_url',
        'created_at': 'created_at',
        'updated_at': 'updated_at',
        'stars': 'stargazers_count',
        'forks': 'forks_count',
        'issues': 'open_issues_count',
        'language': 'language',
    }

    def __init__(self, token=None, timeout=30.0, verify=False):
        h = {"Accept": self.ACCEPT}
        if token: h["Authorization"] = f"token {token}"
        self.client = httpx.Client(headers=h, timeout=timeout, verify=verify)

    def close(self): self.client.close()

    def _get(self, url, params=None, retries=None):
        if retries is None: retries = self.MAX_RETRIES
        for attempt in range(retries):
            r = self.client.get(url, params=params)
            if r.status_code == 200: return r
            if r.status_code == 403:
                rem, reset = r.headers.get("X-RateLimit-Remaining"), r.headers.get("X-RateLimit-Reset")
                if rem == "0" and reset:
                    wait = max(0, int(reset) - int(time.time()) + 1)
                    print(f"rate limit, sleeping {wait}s...", file=sys.stderr); time.sleep(wait); continue
            if r.status_code in (429,500,502,503,504):
                time.sleep((2 ** attempt) + 0.5); continue
            r.raise_for_status()
        r.raise_for_status()

    def _paginate(self, url, params_base=None, extract_items=False, per_page=None, max_pages=None):
        if per_page is None: per_page = self.PER_PAGE
        page = 1; out = []
        while True:
            params = dict(params_base or {}, per_page=per_page, page=page)
            r = self._get(url, params=params)
            body = r.json()
            items = body.get("items") if extract_items else body
            if not isinstance(items, list): raise RuntimeError(f"Unexpected response: {body}")
            if not items: break
            out.extend(items)
            if max_pages and page >= max_pages: break
            page += 1
            if extract_items and page > 10_000: break
        return out

    def fetch_user_starred(self, username):
        if not username: raise SystemExit("username required")
        return self._paginate(f"https://api.github.com/users/{username}/starred")

    def search_repos(self, query, max_pages=None):
        return self._paginate("https://api.github.com/search/repositories",
                              params_base={"q": query, "sort": "stars", "order": "desc"},
                              extract_items=True, max_pages=max_pages)

    def fetch_top_n(self, n):
        if n <= 0: return []
        out = []; page = 1
        while len(out) < n:
            chunk = self._paginate("https://api.github.com/search/repositories",
                                   params_base={"q": "stars:>0", "sort": "stars", "order": "desc"},
                                   extract_items=True, per_page=self.PER_PAGE, max_pages=1)
            if not chunk: break
            out.extend(chunk); page += 1
            if page > 10: break
        return out[:n]

    def fetch_by_languages(self, languages, min_stars=0, per_lang_limit=None):
        res = {}
        for lang in languages:
            q = f"language:{lang}"
            if min_stars: q += f"+stars:>{min_stars}"
            res[lang] = self.search_repos(q, max_pages=per_lang_limit)
        return res

    def process(self, raw_list, fieldmap=None, sort_by_stars=True):
        if fieldmap is None: fieldmap = self.FIELDMAP
        out = []
        for r in raw_list:
            o = {k: r.get(src) for k, src in fieldmap.items()}
            if o.get("url") is None: o["url"] = r.get("html_url")
            out.append(o)
        if sort_by_stars:
            out.sort(key=lambda x: int(x.get("stars") or 0), reverse=True)
        return out

    def save_ndjson(self, items, path):
        with open(path, "w", encoding="utf-8") as f:
            for it in items: f.write(json.dumps(it, ensure_ascii=False) + "\n")

    def save_json(self, items, path):
        with open(path, "w", encoding="utf-8") as f: json.dump(items, f, ensure_ascii=False, indent=2)

    def save_csv(self, items, path):
        if isinstance(items, dict): items = list(chain.from_iterable(items.values()))
        if not items: return
        with open(path, "w", encoding="utf-8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(items[0].keys()))
            w.writeheader(); w.writerows(items)


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)

    a = sub.add_parser("starred"); a.add_argument("-u","--username", required=True); a.add_argument("-o","--output", default="starred.ndjson"); a.add_argument("-f","--format", choices=("ndjson","json","csv"), default="ndjson")
    b = sub.add_parser("search"); b.add_argument("-q","--query", required=True); b.add_argument("-o","--output", default="search.json"); b.add_argument("-f","--format", choices=("ndjson","json","csv"), default="json"); b.add_argument("--max-pages", type=int)
    c = sub.add_parser("top"); c.add_argument("--n", type=int, required=True); c.add_argument("-o","--output", default="top.ndjson"); c.add_argument("-f","--format", choices=("ndjson","json","csv"), default="ndjson")
    d = sub.add_parser("languages")
    d.add_argument("-L","--languages", required=True, help="comma-separated")
    d.add_argument("--min-stars", type=int, default=0)
    d.add_argument("--per-lang-limit", type=int)
    d.add_argument("-o","--output", default="by_lang", help="output directory (each language -> separate file)")
    d.add_argument("-f","--format", choices=("ndjson","json","csv"), default="json")

    p.add_argument("-t","--token", help="GITHUB token (optional)")

    args = p.parse_args()
    gh = GitHub(token=args.token)
    try:
        if args.cmd == "starred":
            raw = gh.fetch_user_starred(args.username); items = gh.process(raw); out, fmt = args.output, args.format
        elif args.cmd == "search":
            raw = gh.search_repos(args.query, max_pages=args.max_pages); items = gh.process(raw); out, fmt = args.output, args.format
        elif args.cmd == "top":
            raw = gh.fetch_top_n(args.n); items = gh.process(raw); out, fmt = args.output, args.format
        elif args.cmd == "languages":
            langs = [x.strip() for x in args.languages.split(",") if x.strip()]
            raw_map = gh.fetch_by_languages(langs, min_stars=args.min_stars, per_lang_limit=args.per_lang_limit)
            proc_map = {lang: gh.process(raw_map.get(lang, [])) for lang in raw_map}
            out_dir = args.output
            os.makedirs(out_dir, exist_ok=True)
            ext = {"json":"json","ndjson":"ndjson","csv":"csv"}[args.format]
            saved = {}
            for lang, lst in proc_map.items():
                path = os.path.join(out_dir, f"{lang}.{ext}")
                if args.format == "json":
                    gh.save_json(lst, path)
                elif args.format == "csv":
                    gh.save_csv(lst, path)
                else:
                    gh.save_ndjson(lst, path)
                saved[lang] = path
            print({k: len(v) for k, v in proc_map.items()}, "-> saved per-language files:", saved)
            return
        else:
            raise SystemExit("unknown cmd")

        if fmt == "json": gh.save_json(items, out)
        elif fmt == "csv": gh.save_csv(items, out)
        else: gh.save_ndjson(items, out)
        print(f"raw {len(raw)} -> processed {len(items)} -> {out}")
    finally:
        gh.close()

if __name__ == "__main__":
    main()
```