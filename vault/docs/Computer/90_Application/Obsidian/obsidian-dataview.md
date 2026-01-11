---
title: Dataview
created: 2024-07-25T10:35:00
modified: 2025-10-08T21:27:13
tags:
  - Obsidian/Plugins
aliases:
  - Dataview
  - dataview
obsidianEditingMode: source
obsidianUIMode: preview
url:
  - https://blacksmithgu.github.io/obsidian-dataview/
---

# Dataview

## Metadata

- Frontmatter
- Inline fields
- Implicit fields
    - [Metadata on Pages - Dataview](https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-pages/)
    - [Metadata on Tasks and Lists - Dataview](https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/)

### Data Types

## [DQL](https://blacksmithgu.github.io/obsidian-dataview/queries/structure/) & Inline DQL

```dataview-
<QUERY-TYPE> <fields>
FROM <source>
<DATA-COMMAND> <expression>
<DATA-COMMAND> <expression>
          ...
```

### [Query Types](https://blacksmithgu.github.io/obsidian-dataview/queries/query-types/)

#### LIST

#### TABLE

#### TASK

#### CALENDAR

### Query Sources

- Tags
- Folders
- Specific Files
- Links

其中文件夹和路径需要加双引号.  
多个来源可以用 and or 和括号组合.

### [Data Commands](https://blacksmithgu.github.io/obsidian-dataview/queries/data-commands/)

- FROM
    - `#tag`
    - `"folder"`
    - `"path/to/file"`
    - `[[note]]`
    - `outgoing([[note]])`
- WHERE
- SORT
- GROUP BY
- FLATTEN
- LIMIT

### Expressions

### Literals

### [Functions](https://blacksmithgu.github.io/obsidian-dataview/reference/functions/)

- Constructors
    - object
    - list
    - date
    - dur
    - number
    - string
    - link
    - embed
    - elink
    - typeof
- Numberic
- Objects, Arrays, String
- String
- Utility

## [DataviewJS](https://blacksmithgu.github.io/obsidian-dataview/api/intro/) & Inline DataviewJS

- dv.current
- dv.pages
- dv.pagePaths
- dv.page
- dv.el
- dv.header
- dv.paragraph
- dv.span
- dv.execute
- dv.executeJs
- dv.view
- dv.list
- dv.taskList
- dv.table
- dv.markdownTable
- dv.markdownList
- dv.markdownTaskList
- dv.array
- dv.fileLink
- dv.sectionLink
- dv.blockLink

## Examples

### 正反链

```dataview
list
from [[obsidian-dataview]]
```

```dataview
list
from outgoing([[obsidian-dataview]])
```

### 任务

```dataview
TASK
WHERE !completed AND contains(tags, "#task")
GROUP BY file.link
```

### 日历

```dataview
CALENDAR file.mtime
```

```dataviewjs
const months = Array.from({ length: 12 }, (_, i) => 
    `M${(i + 1).toString().padStart(2, '0')}`
);

const weeks = Array.from({ length: 52 }, (_, i) => 
    `W${(i + 1).toString().padStart(2, '0')}`
);

const result = [
    months.join(' ') + '  ',
    ...Array.from({ length: 4 }, (_, i) => weeks.slice(i * 13, (i + 1) * 13).join(' ') + '  ')
].join('\n')

dv.paragraph(result);
```

### 列举书签文件

```dataview
list
rows.file.link
where file.starred and file.folder
group by split(file.folder, "/")[0]
```

### 列举标签

```dataview
TABLE WITHOUT ID
  tag,
  length(rows) AS count,
  join(map(rows.file.link, (f) => f), ", ") AS files
FROM ""
FLATTEN file.tags AS tag
GROUP BY tag
SORT tag ASC
```

### 仅列举根目录下的文件

```dataviewjs
var files = app.vault.getFiles().filter(f => f.parent.path == "/" && !["sortspec", "Vault", "broken links output"].some(s => f.name.includes(s))).sort((a,b)=>a.name.localeCompare(b.name));
//console.log(files);
dv.list(files.map(f => dv.fileLink(f.path)));
```

### 列举特定深度的目录结构

1. `^([^\/]+).*$`
2. `^([^\/]+\/[^\/]+).*$`
3. `^([^\/]+\/[^\/]+\/[^\/]+).*$`

```dataview
LIST
FROM "" AND -"Ext"
FLATTEN regexreplace(file.folder, "^([^\/]+\/[^\/]+).*$", "$1") as folder
WHERE folder !=""
GROUP BY folder
```

### 最近修改的文件

```dataview
TABLE length(rows) as count, choice(length(rows)>10,join(map(rows.new_title, (f) => f), ", "),rows.new_title) AS files
WHERE date(today) - file.mtime <= dur(30 days)
WHERE !econtains(["temp", "sortspec", "broken links output"], file.name) and !startswith(file.path, "Misc/")
SORT file.mtime DESC
LIMIT 100
FLATTEN choice(title and title!=file.name, file.link+" "+title, file.link) as new_title
GROUP BY file.mday as date
SORT date DESC
LIMIT 5
```

### 所有文件按文件夹分组

```dataview
table rows.new_title as filename, rows.file.cday as created, rows.file.mday as modified
from "" and -"Misc" and -"Ext"
where !econtains(["sortspec", "broken links output"], file.name)
sort file.name, created desc, modified desc
flatten choice(title and title!=file.name, file.link+" "+title, file.link) as new_title
group by "`" + file.folder + "`" as folder
sort file.folder
```

### 所有文件按当前文件夹下的子文件夹分组

```dataviewjs
const fs = require('fs')

var basedir = app.vault.adapter.basePath
var currentdir = dv.current().file.folder
var subfolders = fs.readdirSync(`${basedir}/${currentdir}`)
subfolders.sort((a,b)=>a.localeCompare(b))

for (let d of subfolders){
    let p = `${basedir}/${currentdir}/${d}`
    if (fs.statSync(p).isDirectory()){
        dv.header(2, d)
        dv.list(dv.pages(`"${currentdir}/${d}"`).where(p=>p.file.name != 'sortspec').sort(p=>p.file.name, 'asc').file.link)
    }
}
```

```dataviewjs
const fs = require('fs')
const base = app.vault.adapter.basePath
const curDir = dv.current().file.folder
const fullPath = `${base}/${curDir}`

const tableData = fs.readdirSync(fullPath)
    .filter(name => fs.statSync(`${fullPath}/${name}`).isDirectory())
    .sort((a, b) => a.localeCompare(b))
    .map(dir => {
        const pages = dv.pages(`"${curDir}/${dir}"`).where(p => p.file.name !== 'sortspec')
        return [
            dir,
            pages.values.length,
            pages.sort(p => p.file.name, 'asc').file.link.join(', ')
        ]
    })

dv.table(['dir', 'count', 'files'], tableData)
```

```dataviewjs
const targetDir = dv.current().file.folder;
const currentDepth = targetDir.split('/').length;

const tableData = app.vault.getAllFolders()
    .filter(folder => {
        const parts = folder.path.split('/')
        return (
            parts.length === currentDepth + 1 && 
            folder.path.startsWith(targetDir ? `${targetDir}/` : '')
        )
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(folder => {
        const pages = dv.pages(`"${folder.path}"`).where(p => p.file.name !== 'sortspec')
        return [
            `${folder.name}`,
            pages.values.length,
            pages.sort(p => p.file.name, 'asc').file.link.join(', ')
        ]
    });

dv.table(['dir', 'count', 'files'], tableData);
```

### 列举当前目录下特定文件名的文件, 并用 callout 显示其内容

```dataviewjs
dv.pages('').where(p=>dv.func.contains(p.file.folder, dv.current().file.folder)).where(p=>dv.func.regexmatch("^[0-9]{8,15}.*", p.file.name)).sort(p=>p.file.name, "desc").limit(30).forEach(p=>{
    dv.paragraph(`
>[!cite]- ${p.file.link} : ${p.title?p.title:""} : ${p.description?p.description:""}
>![[${p.file.link.path} | clean no-title]]
    `);
})
```

### 在单文件日记中使用 flatten

```dataview
table without id
split(meta(L.section).subpath, " ")[0] as week,
dateformat(L.date, "MM/dd ccc") as date, L.weather as weather, L.mood as mood, L.habits as habits, choice(L.summary, L.summary+"<br>", "")+join(L.children.text,"<br>") as summary
where file.path = this.file.path
flatten file.lists as L
where L.summary or L.habits or L.children
sort L.date desc
limit 30
```

### dvjs 手动构造数据

```dataviewjs unwrap:false title:"dataviewjs example"
//console.log(dv)

const keys = ["text", "date", "number"]
const values = [
    ["text1", "2023-01-10", 10],
    ["text2", "2023-09-10", 200],
    ["text2", "2023-01-10", 10],
    ["text1", "2023-09-10", 100],
]

//dv.list(values.map(e=>e[0]))

//dv.table(keys, dv.array(values).groupBy(v => v[0]).sort(g=>g.key, "desc").map(g=>[g.key, g.rows.sort(v=>v[2]).map(v=>v[1]), g.rows.sort(v=>v[2]).map(v=>v[2]), ]) )

for (let group of dv.array(values).where(p=>dv.date(p[1])<dv.date("today")).groupBy(p => dv.date(p[1]).month).sort(g=>g.key, "desc")) {
    dv.header(3, group.key+"月");
    dv.table(keys,
        group.rows
            .map(v=>[v[0], dv.func.dateformat(dv.date(v[1]), "MM-dd ccc"), v[2]])
            .sort(v=>v[2], "asc")
    )
}
```

### 手动扩展 pages

```dataviewjs
var pages = dv.pages().where(p=>!p.file.folder);
// manually add non markdown file links
pages=pages.concat(dv.array([
    {"file": {"link": dv.func.link("Home.canvas","Home")}},
]))
dv.list(pages.file.link)
```

### 单文件查询时按某字段展平

```dataviewjs title:"对单文件中的 inline fileds 查询时按某字段展平为多行"
let pages = dv.pages(`"${dv.current().file.path}"`)
console.log(pages)

//let pages1 = pages.map(p=>[dv.func.dateformat(p.date,"MM-dd ccc"), p.weather, p.mood, p.habits, p.summary]).sort(p => p.date)

let pages2 = pages.date.map((date,i)=>[dv.func.dateformat(date, "MM-dd ccc"), pages.weather[i],pages.mood[i],pages.habits[i],pages.summary[i],]).sort(p => p.date).slice(-30)

dv.table(
    ["date", "weather", "mood", "habits", "summary"],
    pages2
)
```

### 构造链接

`$=dv.span(dv.func.link(dv.func.join(dv.func.list("#", dv.func.dateformat(dv.date("today"), "kkkk-'W'WW"), " (", moment().startOf("isoweek").format("MM/DD"), " ~ ", moment().endOf("isoweek").format("MM/DD"), ")"), ""), "本周"))` | `\=link("#"+dateformat(date(today), "yyyy-MM"), "本月")`

### 汇集特定标题下的内容

```dataviewjs
// Headings you would like to summarise the text for
// 注意标题前后不能有多余的空格, 前后应有空行
const headings = ['Context', 'Habit']

// 修改这里
const pages = dv.pages('"Journals"').where(p=>dv.func.contains(p.file.folder, dv.current().file.folder)).where(p=>dv.func.regexmatch("[0-9]{4}-[0-9]{2}", p.file.name)).sort(p=>p.file.name, 'desc').limit(12)

const output = {}
headings.forEach(x => output[x] = [])
for (const page of pages) {
  const file = app.vault.getAbstractFileByPath(page.file.path)
  // Read the file contents
  const contents = await app.vault.read(file)
  for (let heading of headings) {
    // Sanitise the provided heading to use in a regex
    heading = heading.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
    const regex = `(?<=^|\n)#+ ${heading}\r?\n(.*?)(?=\n#+ |\n---|$)`
    // Extract the summary
    for (const block of contents.match(new RegExp(regex, 'isg')) || []) {
      const match = block.match(new RegExp(regex, 'is'))
      output[heading].push({
        title: page.file.link,
        text: match[1].trim()
      })
    }
  }
}
Object.keys(output).forEach(heading => {
  dv.header(2, heading)
  output[heading].forEach(entry => {
    dv.header(3, entry.title)
    dv.paragraph(entry.text)
  })
})
```

### 与 Habit Calendar 联合并使用模版

```dataviewjs-
const data = [
    //{date: "2024-06-01", content: "666/111"},
]
<%*
var title = tp.file.title;
if (/[0-9]{4}-[0-9]{2}/.test(title)) {
    var [year, month, day] = title.split('-')
} else {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
}
var output = `
const year = "${year}";
const month = "${month}";
`
tR += output
%>
try{//Habit Calendar Plugin
renderHabitCalendar(this.container, dv, {
    year,
    month,
    data: data.filter((function(e){return e["date"].startsWith(`${year}-${month.toString().padStart(2,0)}`)})),
})}catch(e){console.log(e)}
```

### 显示日期

```dataviewjs
dv.paragraph(`现在是 ${moment().format('GGGG年第W周')} `+
  new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "full",
    timeStyle: "long",
    hour12: true
  }).format(new Date()),
);
```

```dataviewjs
//console.log(`${moment().format('现在是: NYYYY年M月D日 [W]W-dddd AHH时mm分ss秒(Z)')}`);

(() => {
    const now = new Date();
    const isoWeek = ((date) => {
        const d = new Date(date);
        d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
        return Math.floor((d - new Date(d.getFullYear(), 0, 1)) / 6048e5) + 1;
    })(now);

    const options = {
        era: 'short',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'long',
        dayPeriod: 'short',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: "shortGeneric",
    }

    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("zh-CN", options)
            .formatToParts(now)
            .filter((p) => Object.keys(options).includes(p.type))
            .map((p) => [p.type, p.value])
    );

    dv.paragraph(`现在是: ${parts.timeZoneName} ${parts.era}${parts.year}年${parts.month}月${parts.day}日 ${parts.weekday}(第${isoWeek}周) ${parts.dayPeriod}${parts.hour}时${parts.minute}分`)
})()
```

### 🕰️ 时间进度仪表盘

```dataviewjs
// ===== 工具函数 =====
function 获取当前日期() {
    return new Date();
}

function 生成进度条(百分比, 长度 = 20) {
    const 完成格子数 = Math.floor(百分比 / 100 * 长度);
    const 剩余格子 = 长度 - 完成格子数;
    
    // 红绿灯三色:
    const 颜色 = 
        百分比 > 70 ? "#4CAF50" :  // 绿(安全)
        百分比 > 40 ? "#FFC107" :  // 黄(警告)
        "#F44336";                // 红(危险)

    return `│<span style="color:${颜色}">${"█".repeat(完成格子数)}</span>` +
           `<span style="color:#E0E0E0">${"░".repeat(剩余格子)}</span>│`;
}

// ===== 主计算逻辑 =====
const 当前日期 = 获取当前日期();
const 当前年份 = 当前日期.getFullYear();

// 1. 年进度
const 年初 = new Date(当前年份, 0, 1);
const 年末 = new Date(当前年份, 11, 31);
const 全年天数 = Math.floor((年末 - 年初) / 86400000) + 1;
const 已过天数 = Math.floor((当前日期 - 年初) / 86400000) + 1;
const 年进度百分比 = (已过天数 / 全年天数 * 100).toFixed(1);
const 剩余天数 = 全年天数 - 已过天数;

// 2. 月进度
const 当月天数 = new Date(当前年份, 当前日期.getMonth() + 1, 0).getDate();
const 已过当月天数 = 当前日期.getDate();
const 月进度百分比 = (已过当月天数 / 当月天数 * 100).toFixed(1);
const 剩余当月天数 = 当月天数 - 已过当月天数;

// 3. 周进度
const 本周第几天 = 当前日期.getDay(); // 0=周日
const 已过周天数 = 本周第几天 === 0 ? 6 : 本周第几天 - 1; // 周一为 0 → 周日为 6
const 周进度百分比 = ((已过周天数 + 1) / 7 * 100).toFixed(1); // +1 因为当天也算已过
const 剩余周天数 = 6 - 已过周天数;

// ===== 输出结果 =====
dv.span(`
| 周期  | 进度百分比 | 进度条                  | 已过时间     | 剩余时间     | 总时长    |
|-------|------------|-------------------------|--------------|--------------|-----------|
| ☀️ 年 | ${年进度百分比}%  | ${生成进度条(年进度百分比)} | ${已过天数}天  | ${剩余天数}天  | ${全年天数}天 |
| 🌙 月 | ${月进度百分比}%  | ${生成进度条(月进度百分比)} | ${已过当月天数}天 | ${剩余当月天数}天 | ${当月天数}天  |
| ⭐ 周 | ${周进度百分比}%  | ${生成进度条(周进度百分比)} | ${已过周天数+1}天  | ${剩余周天数}天  | 7 天       |
`);
```

## Tips

## References

[Dataview Example Vault](https://s-blu.github.io/obsidian_dataview_example_vault/)
