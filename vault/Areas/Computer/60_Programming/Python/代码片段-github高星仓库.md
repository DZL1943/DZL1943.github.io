
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
    
    def _paginate(self, url, params=None, per_page=None, max_pages=None):
        per_page = per_page or self.PER_PAGE
        page = 1
        out = []
        while True:
            print(f"Begin fetching page: {page}")
            r = self._get(url, params=dict(params or {}, per_page=per_page, page=page))
            body = r.json()
            items = body.get("items") if isinstance(body, dict) else body
            
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
            max_pages=min(max_pages or self.MAX_PAGES, self.MAX_PAGES),
        )
    
    def top_repos(self, stars=0, limit=0, language=None):
        q = f"stars:>{stars}" if stars else "stars:>0"
        if language:
            q = f"language:{language}+{q}"
        pages = ((limit + self.PER_PAGE - 1) // self.PER_PAGE) if limit else None
        items = self.search_repos(q, max_pages=pages)
        return items[:limit] if limit else items
    
    def transform(self, items, fieldmap=None, filter=None, sort_by="stars", reverse=True):
        fieldmap = fieldmap or self.FIELDMAP
        out = []
        for d in items:
            o = {k: d.get(src) for k, src in fieldmap.items()}
            if callable(filter) and not filter(o):
                continue
            out.append(o)

        if sort_by:
            out.sort(key=lambda x: x.get(sort_by), reverse=reverse)
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
    
    def save(self, items, name, fmt):
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
                gh.save(gh.transform(raw), "starred", args.format)
                
            case "search":
                raw = gh.search_repos(args.query, max_pages=args.max_pages)
                gh.save(gh.transform(raw), "search", args.format)
                
            case "top":
                raw = gh.top_repos(stars=args.stars, limit=args.limit, 
                                 language=args.language)
                name = "top"
                if args.language:
                    name = f"top_{args.language}"
                gh.save(gh.transform(raw), name, args.format)
        
        print(f"Done. Output saved as {args.format} file.")
        
    finally:
        gh.close()


if __name__ == "__main__":
    main()
```

%%[list2table]%%
- [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x) | 461655
- [freeCodeCamp/freeCodeCamp](https://github.com/freeCodeCamp/freeCodeCamp) | 436439
- [sindresorhus/awesome](https://github.com/sindresorhus/awesome) | 432868
- [public-apis/public-apis](https://github.com/public-apis/public-apis) | 394066
- [EbookFoundation/free-programming-books](https://github.com/EbookFoundation/free-programming-books) | 381313
- [kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap) | 348176
- [jwasham/coding-interview-university](https://github.com/jwasham/coding-interview-university) | 336359
- [donnemartin/system-design-primer](https://github.com/donnemartin/system-design-primer) | 333672
- [vinta/awesome-python](https://github.com/vinta/awesome-python) | 280363
- [996icu/996.ICU](https://github.com/996icu/996.ICU) | 275355
- [awesome-selfhosted/awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) | 270548
- [practical-tutorials/project-based-learning](https://github.com/practical-tutorials/project-based-learning) | 256941
- [facebook/react](https://github.com/facebook/react) | 242589
- [TheAlgorithms/Python](https://github.com/TheAlgorithms/Python) | 217271
- [torvalds/linux](https://github.com/torvalds/linux) | 215548
- [vuejs/vue](https://github.com/vuejs/vue) | 209892
- [trimstray/the-book-of-secret-knowledge](https://github.com/trimstray/the-book-of-secret-knowledge) | 204097
- [ossu/computer-science](https://github.com/ossu/computer-science) | 200793
- [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms) | 195435
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 193535
- [getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS) | 184341
- [ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh) | 184291
- [CyC2018/CS-Notes](https://github.com/CyC2018/CS-Notes) | 183546
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 181525
- [microsoft/vscode](https://github.com/microsoft/vscode) | 181145
- [jackfrued/Python-100-Days](https://github.com/jackfrued/Python-100-Days) | 178194
- [flutter/flutter](https://github.com/flutter/flutter) | 174859
- [twbs/bootstrap](https://github.com/twbs/bootstrap) | 173959
- [github/gitignore](https://github.com/github/gitignore) | 172087
- [n8n-io/n8n](https://github.com/n8n-io/n8n) | 171853
- [massgravel/Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts) | 164096
- [avelino/awesome-go](https://github.com/avelino/awesome-go) | 163693
- [ollama/ollama](https://github.com/ollama/ollama) | 160963
- [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | 160269
- [jlevy/the-art-of-command-line](https://github.com/jlevy/the-art-of-command-line) | 159648
- [huggingface/transformers](https://github.com/huggingface/transformers) | 155882
- [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide) | 153641
- [airbnb/javascript](https://github.com/airbnb/javascript) | 148071
- [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp) | 144621
- [langflow-ai/langflow](https://github.com/langflow-ai/langflow) | 144330
- [DigitalPlatDev/FreeDomain](https://github.com/DigitalPlatDev/FreeDomain) | 144126
- [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | 143924
- [521xueweihan/HelloGitHub](https://github.com/521xueweihan/HelloGitHub) | 141526
- [ytdl-org/youtube-dl](https://github.com/ytdl-org/youtube-dl) | 139603
- [vercel/next.js](https://github.com/vercel/next.js) | 137380
- [yangshun/tech-interview-handbook](https://github.com/yangshun/tech-interview-handbook) | 137172
- [Genymobile/scrcpy](https://github.com/Genymobile/scrcpy) | 134856
- [labuladong/fucking-algorithm](https://github.com/labuladong/fucking-algorithm) | 132367
- [golang/go](https://github.com/golang/go) | 132176
- [microsoft/PowerToys](https://github.com/microsoft/PowerToys) | 128514
- [langgenius/dify](https://github.com/langgenius/dify) | 127883
- [Chalarangelo/30-seconds-of-code](https://github.com/Chalarangelo/30-seconds-of-code) | 126562
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 125348
- [facebook/react-native](https://github.com/facebook/react-native) | 125210
- [open-webui/open-webui](https://github.com/open-webui/open-webui) | 122226
- [krahets/hello-algo](https://github.com/krahets/hello-algo) | 121904
- [kubernetes/kubernetes](https://github.com/kubernetes/kubernetes) | 120140
- [electron/electron](https://github.com/electron/electron) | 119929
- [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | 117617
- [justjavac/free-programming-books-zh_CN](https://github.com/justjavac/free-programming-books-zh_CN) | 116238
- [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | 115562
- [nodejs/node](https://github.com/nodejs/node) | 115423
- [d3/d3](https://github.com/d3/d3) | 112226
- [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | 111668
- [iptv-org/iptv](https://github.com/iptv-org/iptv) | 110671
- [mrdoob/three.js](https://github.com/mrdoob/three.js) | 110594
- [rust-lang/rust](https://github.com/rust-lang/rust) | 109821
- [axios/axios](https://github.com/axios/axios) | 108545
- [microsoft/TypeScript](https://github.com/microsoft/TypeScript) | 107582
- [rustdesk/rustdesk](https://github.com/rustdesk/rustdesk) | 106507
- [godotengine/godot](https://github.com/godotengine/godot) | 106053
- [denoland/deno](https://github.com/denoland/deno) | 105991
- [GrowingGit/GitHub-Chinese-Top-Charts](https://github.com/GrowingGit/GitHub-Chinese-Top-Charts) | 105855
- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | 105790
- [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | 105730
- [Hack-with-Github/Awesome-Hacking](https://github.com/Hack-with-Github/Awesome-Hacking) | 105577
- [goldbergyoni/nodebestpractices](https://github.com/goldbergyoni/nodebestpractices) | 104972
- [facebook/create-react-app](https://github.com/facebook/create-react-app) | 103968
- [fatedier/frp](https://github.com/fatedier/frp) | 103961
- [papers-we-love/papers-we-love](https://github.com/papers-we-love/papers-we-love) | 102775
- [tauri-apps/tauri](https://github.com/tauri-apps/tauri) | 102007
- [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | 101772
- [microsoft/terminal](https://github.com/microsoft/terminal) | 101572
- [deepseek-ai/DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3) | 101367