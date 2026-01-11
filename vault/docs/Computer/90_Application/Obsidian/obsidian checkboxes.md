---
created: 2024-12-05T16:16
modified: 2025-03-03T15:53
unlisted: true
url:
  - https://publish.obsidian.md/slrvb-docs/ITS+Theme/Alternate+Checkboxes
  - https://minimal.guide/checklists
  - https://github.com/colineckert/obsidian-things?tab=readme-ov-file#checkbox-styling
  - https://github.com/AnubisNekhet/anuppuccin#custom-checkboxes--speech-bubbles
obsidianEditingMode: source
---

```dataviewjs
const minimal = `
- [ ] to-do
- [/]  incomplete
- [x] done
- [-]  canceled
- [>]  forwarded
- [<]  scheduling
- [?]  question
- [!]  important
- [*]  star
- ["]  quote
- [l]  location
- [b]  bookmark
- [i]  information
- [S]  savings
- [I]  idea
- [p]  pros
- [c]  cons
- [f]  fire
- [k]  key
- [w]  win
- [u]  up
- [d]  down
`;

const things = `
- [ ] to-do
- [/] incomplete
- [x] done
- [-] canceled
- [>] forwarded
- [<] scheduling
- [?] question
- [!] important
- [*] star
- ["] quote
- [l] location
- [b] bookmark
- [i] information
- [S] savings
- [I] idea
- [p] pros
- [c] cons
- [f] fire
- [k] key
- [w] win
- [u] up
- [d] down
- [D] draft pull request
- [P] open pull request
- [M] merged pull request
`;

const its = `
- [ ] Unchecked
- [x] Regular
- [X] Checked
- [-] Dropped
- [>] Forward
- [<] Migrated
- [D] Date
- [?] Question
- [/] Half Done
- [+] Add
- [R] Research
- [!] Important
- [i] Idea
- [B] Brainstorm
- [P] Pro
- [C] Con
- [Q] Quote
- [N] Note
- [b] Bookmark
- [I] Information
- [p] Paraphrase
- [L] Location
- [E] Example
- [A] Answer
- [r] Reward
- [c] Choice
- [d] Doing
- [T] Time
- [@] Character / Person
- [t] Talk
- [O] Outline / Plot
- [~] Conflict
- [W] World
- [f] Clue / Find
- [F] Foreshadow
- [H] Favorite / Health
- [&] Symbolism
- [s] Secret
`;

function printAll() {
  const chars = {
    "digits": Array.from({ length: 10 }, (_, i) => String.fromCharCode(i + 48)),
    "lowcases": Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 97)),
    "upcases": Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)),
    "punctuations": [
      ...Array.from({ length: 15 }, (_, i) => String.fromCharCode(i + 33)), // ASCII 33-47
      ...Array.from({ length: 7 }, (_, i) => String.fromCharCode(i + 58)), // ASCII 58-64
      ...Array.from({ length: 6 }, (_, i) => String.fromCharCode(i + 91)), // ASCII 91-96
      ...Array.from({ length: 4 }, (_, i) => String.fromCharCode(i + 123)) // ASCII 123-126
    ]
  };
  
  for (const [category, charArray] of Object.entries(chars)) {
    dv.header(3, `${category}`);
    let md = dv.markdownList(charArray.map(c=>`[${c}] ${c}`));
    md = "```\n"+md+"\n```";
    dv.paragraph(md);
  }
}

const parseStyleList = (styleText, currentListName) =>
  styleText
    .trim()
    .split("\n")
    .flatMap((line) => {
      const statusMatch = line.match(/-\s*\[(.)\]\s*(.*)/);
      if (!statusMatch) return [];
      const [, status, content] = statusMatch;

      return content
        .split("|")
        .map((part) => {
          const itemMatch = part.trim().match(/(.*?)(?:\s*\((.*?)\))?$/);
          if (!itemMatch) return null;
          const [, name, sources] = itemMatch;

          return {
            status, // 保留原始大小写
            name: name.trim().toLowerCase(), // 统一小写用于合并
            sources: [
              ...new Set(
                (sources ? sources.split(/,\s*/) : []).concat(currentListName)
              ),
            ].sort(),
          };
        })
        .filter(Boolean);
    });

const mergeStyleEntries = (entries) => {
  // 外层Map按原始status分组，内层Map按小写name分组
  const statusMap = entries.reduce((map, entry) => {
    const nameMap = map.get(entry.status) || new Map();
    const existing = nameMap.get(entry.name);

    if (existing) {
      existing.sources = [
        ...new Set([...existing.sources, ...entry.sources]),
      ].sort();
    } else {
      nameMap.set(entry.name, { ...entry, sources: entry.sources });
    }
    map.set(entry.status, nameMap);
    return map;
  }, new Map());

  // 生成最终格式
  return Array.from(statusMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([status, nameMap]) => {
      const items = Array.from(nameMap.values())
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => `${item.name}(${item.sources.join(",")})`); // 直接用小写name输出
      return `- [${status}] ${items.join(" | ")}`;
    });
};

function mergeStyles(styles) {
  const allEntries = Object.entries(styles).flatMap(([listName, styleText]) =>
    parseStyleList(styleText, listName)
  );
  return mergeStyleEntries(allEntries).join("\n");
}

dv.paragraph("```ad-info\n"+mergeStyles({minimal, things, its})+"\n```");
```
