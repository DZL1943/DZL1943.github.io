
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

```json
{"full_name":"codecrafters-io/build-your-own-x","html_url":"https://github.com/codecrafters-io/build-your-own-x","stars":461655}
{"full_name":"freeCodeCamp/freeCodeCamp","html_url":"https://github.com/freeCodeCamp/freeCodeCamp","stars":436439}
{"full_name":"sindresorhus/awesome","html_url":"https://github.com/sindresorhus/awesome","stars":432868}
{"full_name":"public-apis/public-apis","html_url":"https://github.com/public-apis/public-apis","stars":394066}
{"full_name":"EbookFoundation/free-programming-books","html_url":"https://github.com/EbookFoundation/free-programming-books","stars":381313}
{"full_name":"kamranahmedse/developer-roadmap","html_url":"https://github.com/kamranahmedse/developer-roadmap","stars":348176}
{"full_name":"jwasham/coding-interview-university","html_url":"https://github.com/jwasham/coding-interview-university","stars":336359}
{"full_name":"donnemartin/system-design-primer","html_url":"https://github.com/donnemartin/system-design-primer","stars":333672}
{"full_name":"vinta/awesome-python","html_url":"https://github.com/vinta/awesome-python","stars":280363}
{"full_name":"996icu/996.ICU","html_url":"https://github.com/996icu/996.ICU","stars":275355}
{"full_name":"awesome-selfhosted/awesome-selfhosted","html_url":"https://github.com/awesome-selfhosted/awesome-selfhosted","stars":270548}
{"full_name":"practical-tutorials/project-based-learning","html_url":"https://github.com/practical-tutorials/project-based-learning","stars":256941}
{"full_name":"facebook/react","html_url":"https://github.com/facebook/react","stars":242589}
{"full_name":"TheAlgorithms/Python","html_url":"https://github.com/TheAlgorithms/Python","stars":217271}
{"full_name":"torvalds/linux","html_url":"https://github.com/torvalds/linux","stars":215548}
{"full_name":"vuejs/vue","html_url":"https://github.com/vuejs/vue","stars":209892}
{"full_name":"trimstray/the-book-of-secret-knowledge","html_url":"https://github.com/trimstray/the-book-of-secret-knowledge","stars":204097}
{"full_name":"ossu/computer-science","html_url":"https://github.com/ossu/computer-science","stars":200793}
{"full_name":"trekhleb/javascript-algorithms","html_url":"https://github.com/trekhleb/javascript-algorithms","stars":195435}
{"full_name":"tensorflow/tensorflow","html_url":"https://github.com/tensorflow/tensorflow","stars":193535}
{"full_name":"getify/You-Dont-Know-JS","html_url":"https://github.com/getify/You-Dont-Know-JS","stars":184341}
{"full_name":"ohmyzsh/ohmyzsh","html_url":"https://github.com/ohmyzsh/ohmyzsh","stars":184291}
{"full_name":"CyC2018/CS-Notes","html_url":"https://github.com/CyC2018/CS-Notes","stars":183546}
{"full_name":"Significant-Gravitas/AutoGPT","html_url":"https://github.com/Significant-Gravitas/AutoGPT","stars":181525}
{"full_name":"microsoft/vscode","html_url":"https://github.com/microsoft/vscode","stars":181145}
{"full_name":"jackfrued/Python-100-Days","html_url":"https://github.com/jackfrued/Python-100-Days","stars":178194}
{"full_name":"flutter/flutter","html_url":"https://github.com/flutter/flutter","stars":174859}
{"full_name":"twbs/bootstrap","html_url":"https://github.com/twbs/bootstrap","stars":173959}
{"full_name":"github/gitignore","html_url":"https://github.com/github/gitignore","stars":172087}
{"full_name":"n8n-io/n8n","html_url":"https://github.com/n8n-io/n8n","stars":171853}
{"full_name":"massgravel/Microsoft-Activation-Scripts","html_url":"https://github.com/massgravel/Microsoft-Activation-Scripts","stars":164096}
{"full_name":"avelino/awesome-go","html_url":"https://github.com/avelino/awesome-go","stars":163693}
{"full_name":"ollama/ollama","html_url":"https://github.com/ollama/ollama","stars":160963}
{"full_name":"AUTOMATIC1111/stable-diffusion-webui","html_url":"https://github.com/AUTOMATIC1111/stable-diffusion-webui","stars":160269}
{"full_name":"jlevy/the-art-of-command-line","html_url":"https://github.com/jlevy/the-art-of-command-line","stars":159648}
{"full_name":"huggingface/transformers","html_url":"https://github.com/huggingface/transformers","stars":155882}
{"full_name":"Snailclimb/JavaGuide","html_url":"https://github.com/Snailclimb/JavaGuide","stars":153641}
{"full_name":"airbnb/javascript","html_url":"https://github.com/airbnb/javascript","stars":148071}
{"full_name":"yt-dlp/yt-dlp","html_url":"https://github.com/yt-dlp/yt-dlp","stars":144621}
{"full_name":"langflow-ai/langflow","html_url":"https://github.com/langflow-ai/langflow","stars":144330}
{"full_name":"DigitalPlatDev/FreeDomain","html_url":"https://github.com/DigitalPlatDev/FreeDomain","stars":144126}
{"full_name":"f/awesome-chatgpt-prompts","html_url":"https://github.com/f/awesome-chatgpt-prompts","stars":143924}
{"full_name":"521xueweihan/HelloGitHub","html_url":"https://github.com/521xueweihan/HelloGitHub","stars":141526}
{"full_name":"ytdl-org/youtube-dl","html_url":"https://github.com/ytdl-org/youtube-dl","stars":139603}
{"full_name":"vercel/next.js","html_url":"https://github.com/vercel/next.js","stars":137380}
{"full_name":"yangshun/tech-interview-handbook","html_url":"https://github.com/yangshun/tech-interview-handbook","stars":137172}
{"full_name":"Genymobile/scrcpy","html_url":"https://github.com/Genymobile/scrcpy","stars":134856}
{"full_name":"labuladong/fucking-algorithm","html_url":"https://github.com/labuladong/fucking-algorithm","stars":132367}
{"full_name":"golang/go","html_url":"https://github.com/golang/go","stars":132176}
{"full_name":"microsoft/PowerToys","html_url":"https://github.com/microsoft/PowerToys","stars":128514}
{"full_name":"langgenius/dify","html_url":"https://github.com/langgenius/dify","stars":127883}
{"full_name":"Chalarangelo/30-seconds-of-code","html_url":"https://github.com/Chalarangelo/30-seconds-of-code","stars":126562}
{"full_name":"langchain-ai/langchain","html_url":"https://github.com/langchain-ai/langchain","stars":125348}
{"full_name":"facebook/react-native","html_url":"https://github.com/facebook/react-native","stars":125210}
{"full_name":"open-webui/open-webui","html_url":"https://github.com/open-webui/open-webui","stars":122226}
{"full_name":"krahets/hello-algo","html_url":"https://github.com/krahets/hello-algo","stars":121904}
{"full_name":"kubernetes/kubernetes","html_url":"https://github.com/kubernetes/kubernetes","stars":120140}
{"full_name":"electron/electron","html_url":"https://github.com/electron/electron","stars":119929}
{"full_name":"ripienaar/free-for-dev","html_url":"https://github.com/ripienaar/free-for-dev","stars":117617}
{"full_name":"justjavac/free-programming-books-zh_CN","html_url":"https://github.com/justjavac/free-programming-books-zh_CN","stars":116238}
{"full_name":"excalidraw/excalidraw","html_url":"https://github.com/excalidraw/excalidraw","stars":115562}
{"full_name":"nodejs/node","html_url":"https://github.com/nodejs/node","stars":115423}
{"full_name":"d3/d3","html_url":"https://github.com/d3/d3","stars":112226}
{"full_name":"x1xhlol/system-prompts-and-models-of-ai-tools","html_url":"https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools","stars":111668}
{"full_name":"iptv-org/iptv","html_url":"https://github.com/iptv-org/iptv","stars":110671}
{"full_name":"mrdoob/three.js","html_url":"https://github.com/mrdoob/three.js","stars":110594}
{"full_name":"rust-lang/rust","html_url":"https://github.com/rust-lang/rust","stars":109821}
{"full_name":"axios/axios","html_url":"https://github.com/axios/axios","stars":108545}
{"full_name":"microsoft/TypeScript","html_url":"https://github.com/microsoft/TypeScript","stars":107582}
{"full_name":"rustdesk/rustdesk","html_url":"https://github.com/rustdesk/rustdesk","stars":106507}
{"full_name":"godotengine/godot","html_url":"https://github.com/godotengine/godot","stars":106053}
{"full_name":"denoland/deno","html_url":"https://github.com/denoland/deno","stars":105991}
{"full_name":"GrowingGit/GitHub-Chinese-Top-Charts","html_url":"https://github.com/GrowingGit/GitHub-Chinese-Top-Charts","stars":105855}
{"full_name":"microsoft/generative-ai-for-beginners","html_url":"https://github.com/microsoft/generative-ai-for-beginners","stars":105790}
{"full_name":"shadcn-ui/ui","html_url":"https://github.com/shadcn-ui/ui","stars":105730}
{"full_name":"Hack-with-Github/Awesome-Hacking","html_url":"https://github.com/Hack-with-Github/Awesome-Hacking","stars":105577}
{"full_name":"goldbergyoni/nodebestpractices","html_url":"https://github.com/goldbergyoni/nodebestpractices","stars":104972}
{"full_name":"facebook/create-react-app","html_url":"https://github.com/facebook/create-react-app","stars":103968}
{"full_name":"fatedier/frp","html_url":"https://github.com/fatedier/frp","stars":103961}
{"full_name":"papers-we-love/papers-we-love","html_url":"https://github.com/papers-we-love/papers-we-love","stars":102775}
{"full_name":"tauri-apps/tauri","html_url":"https://github.com/tauri-apps/tauri","stars":102007}
{"full_name":"Comfy-Org/ComfyUI","html_url":"https://github.com/Comfy-Org/ComfyUI","stars":101772}
{"full_name":"microsoft/terminal","html_url":"https://github.com/microsoft/terminal","stars":101572}
{"full_name":"deepseek-ai/DeepSeek-V3","html_url":"https://github.com/deepseek-ai/DeepSeek-V3","stars":101367}
```