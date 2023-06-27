---
title: Templater
created: 2025-04-07T09:45
modified: 2025-10-08T21:54
tags:
  - Obsidian/Plugins
aliases:
  - Templater
url:
  - https://silentvoid13.github.io/Templater
---

## 设置

- Folder templates
- File regex templates
- Template hotkeys
- Startup templates

> [!warning] 开启语法高亮在特定情况下会导致编辑模式显示异常

## 快捷键

- Open insert template modal
- Jump to next cursor location
- Create new note from template: **尽量不要用这个**
- Replace templates in the active file

## commands

- `%`: Interpolation command. It will output the result of the expression that's inside.
- `%*`: [JavaScript execution command](https://silentvoid13.github.io/Templater/commands/execution-command.html). It will execute the JavaScript code that's inside. It does not output anything by default. to output something from a JS execution command, you just need to append what you want to output to that `tR` string variable.
- `%+`: dynamic command, which means that this command will be resolved when entering preview mode. Dynamic commands have known issues, and will likely not be maintained going forward (see [this issue](https://github.com/SilentVoid13/Templater/issues/913) for more details). In most cases the [Dataview](https://github.com/blacksmithgu/obsidian-dataview) plugin is the suggested alternative.

A specific syntax exists for whitespace control:
- An underscore `_` at the **beginning** of a tag (`<%_`) will trim **all** whitespace **before** the command
- An underscore `_` at the **end** of a tag (`_%>`) will trim **all** whitespace **after** the command
- A dash `-` at the **beginning** of a tag (`<%-`) will trim **one** newline **before** the command
- A dash `-` at the **end** of a tag (`-%>`) will trim **one** newline **after** the command.

> [!warning] 不支持自带模板语法

## functions

internal
- [App module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/app-module.html): `tp.app` This module exposes the [app](https://docs.obsidian.md/Reference/TypeScript+API/App) instance. Prefer to use this over the global app instance.
- [Config module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/config-module.html): `tp.config` This module exposes Templater's running configuration.
    - `tp.config.active_file?`
    - `tp.config.run_mode`
    - `tp.config.target_file`
    - `tp.config.template_file`
- [Date module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/date-module.html): `tp.date`
    - `tp.date.now(format: string = "YYYY-MM-DD", offset?: number⎮string, reference?: string, reference_format?: string)`
    - `tp.date.tomorrow(format: string = "YYYY-MM-DD")`
    - `tp.date.weekday(format: string = "YYYY-MM-DD", weekday: number, reference?: string, reference_format?: string)`
    - `tp.date.yesterday(format: string = "YYYY-MM-DD")`
- [File module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html): `tp.file`
    - `tp.file.content`
    - `tp.file.create_new(template: TFile ⎮ string, filename?: string, open_new: boolean = false, folder?: TFolder | string)`
    - `tp.file.creation_date(format: string = "YYYY-MM-DD HH:mm")`
    - `tp.file.cursor(order?: number)`
    - `tp.file.cursor_append(content: string)`
    - `tp.file.exists(filepath: string)`
    - `tp.file.find_tfile(filename: string)`
    - `tp.file.folder(absolute: boolean = false)`
    - `tp.file.include(include_link: string ⎮ TFile)`
    - `tp.file.last_modified_date(format: string = "YYYY-MM-DD HH:mm")`
    - `tp.file.move(new_path: string, file_to_move?: TFile)`
    - `tp.file.path(relative: boolean = false)`
    - `tp.file.rename(new_title: string)`
    - `tp.file.selection()`
    - `tp.file.tags`
    - `tp.file.title`
- [Frontmatter module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/frontmatter-module.html): `tp.frontmatter`
- [Hooks module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/hooks-module.html): `tp.hooks` This module exposes hooks that allow you to execute code when a Templater event occurs.
- [Obsidian module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/obsidian-module.html): `tp.obsidian` This module exposes all the functions and classes from the [Obsidian API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts).
- [System module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/system-module.html): `tp.system`
    - `tp.system.clipboard()`
    - `tp.system.multi_suggester(text_items: string[] ⎮ ((item: T) => string), items: T[], throw_on_cancel: boolean = false, title: string = "", limit?: number = undefined)`
    - `tp.system.prompt(prompt_text?: string, default_value?: string, throw_on_cancel: boolean = false, multiline?: boolean = false)`
    - `tp.system.suggester(text_items: string[] ⎮ ((item: T) => string), items: T[], throw_on_cancel: boolean = false, placeholder: string = "", limit?: number = undefined)`
- [Web module](https://silentvoid13.github.io/Templater/internal-functions/internal-modules/web-module.html): `tp.web`

tp.user:

**The function name corresponds to the script file name**.

You can also export an object of functions. Note that every property of the object must be a function.

## 例子

```js title:openPeriodicNote
function templaterApi() {
    const t = app.plugins.plugins["templater-obsidian"].templater;
    
    if (t.current_functions_object) {
        return t.current_functions_object;
    }
    
    const modules = t.functions_generator.internal_functions.modules_array;
    
    return new Proxy({}, {
        get: (_, module) => new Proxy({}, {
            get: (_, func) => {
                const mod = modules.find(m => m.name === module);
                return mod?.static_functions?.get(func);
            }
        })
    });
};

async function openPeriodicNote({
    period,
    offset = 0
}){
    const tp = templaterApi();
    //const period = await tp.system.suggester(Object.keys(config), Object.keys(config), false, "Choose a period type");
    
    const basepath = "Journals";
    const config = {
        daily: offset => ({
            template: tp.file.find_tfile("daily-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset}D`)}`,
            filename: `${tp.date.now("YYYY-MM-DD", `P${offset}D`)}`,
        }),
        weekly: offset => ({
            template: tp.file.find_tfile("weekly-template"),
            folder: `${basepath}/${tp.date.now("GGGG", `P${offset}W`)}`,
            filename: `${tp.date.now("GGGG-[W]WW", `P${offset}W`)}`,
        }),
        monthly: offset => ({
            template: tp.file.find_tfile("monthly-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset}M`)}`,
            filename: `${tp.date.now("YYYY-MM", `P${offset}M`)}`,
        }),
        quarterly: offset => ({
            template: tp.file.find_tfile("quarterly-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset * 3}M`)}`,
            filename: `${tp.date.now("YYYY-[Q]Q", `P${offset * 3}M`)}`,
        }),
        yearly: offset => ({
            template: tp.file.find_tfile("yearly-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset}Y`)}`,
            filename: `${tp.date.now("YYYY", `P${offset}Y`)}`,
        }),
    };
    
    const {template, folder, filename} = config[period](offset);
    
    let file = tp.file.find_tfile(`${folder}/${filename}`);
    if(!file){
        file = await tp.file.create_new(template || "", filename, false, folder);
    }
    await app.workspace.getLeaf('tab').openFile(file);
}

async function start(params={}) {
    const {quickAddApi = app.plugins.plugins.quickadd.api} = params || {};
    const values = await quickAddApi.requestInputs([
        {id: "period", type: "dropdown", options: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'], defaultValue: 'weekly'},
        {id: "offset", type: "dropdown", options: ['-2', '-1', '0', '1', '2'], defaultValue: '0'},
    ]);
    const { period, offset } = values;
    
    await openPeriodicNote({period, offset});
}

module.exports = {
    entry: start,
    daily: () => openPeriodicNote({period:'daily'}),
    weekly: () => openPeriodicNote({period:'weekly'}),
    monthly: () => openPeriodicNote({period:'monthly'}),
    quarterly: () => openPeriodicNote({period:'quarterly'}),
    yearly: () => openPeriodicNote({period:'yearly'}),
    next_daily: () => openPeriodicNote({period:'daily', offset:1}),
    next_weekly: () => openPeriodicNote({period:'weekly', offset:1}),
    next_monthly: () => openPeriodicNote({period:'monthly', offset:1}),
    next_quarterly: () => openPeriodicNote({period:'quarterly', offset:1}),
    next_yearly: () => openPeriodicNote({period:'yearly', offset:1}),
};
```

```js title:weekdays
function generateWeekdays({
    offset = 0,
    prefix = "- ",
    dataview = false,
} = {}) {
    const weekdayMap = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    
    let offset2 = offset | 0;
    
    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;  // 0 -> sunday
    
    return weekdayMap.map((day,i) => {
        const date = new Date();
        date.setDate(now.getDate() + mondayOffset + offset2 * 7 + i);
        // const date = tp.date.weekday("YYYY-MM-DD", i, tp.date.weekday("YYYY-MM-DD", offset2 * 7));
        const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
        
        return dataview 
        ? `${prefix}${day}  (date:: ${dateStr})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )  `
        : `${prefix}${day}  ${dateStr}`;
    }).join("\n");
}

async function start(params={}) {
    const { quickAddApi = app.plugins.plugins.quickadd.api, variables = {} } = params || {};
    
    const values = await quickAddApi.requestInputs([
        {id: "prefix", label: "prefix", type: "suggester", options: ["- ", "## "], defaultValue: "- "},
        {id: "offset", label: "offset", type: "suggester", options: ['0', '1'], defaultValue: '0'},
        {id: "dataview", label: "dataview", type: "dropdown", options: ['', true], defaultValue: true}
    ]);
    const { prefix, offset, dataview } = values;
    variables.result = generateWeekdays({prefix, offset, dataview});
    return variables.result;
}

module.exports = {
    entry: start,
    weekdays_list: () => generateWeekdays({prefix:'- '}),
    weekdays_list_dataview: () => generateWeekdays({prefix:'- ', dataview:true}),
    weekdays_h2: () => generateWeekdays({prefix:'## '}),
    weekdays_h2_dataview: () => generateWeekdays({prefix:'## ', dataview:true}),
    next_weekdays_list: () => generateWeekdays({prefix:'- ', offset:1}),
    next_weekdays_list_dataview: () => generateWeekdays({prefix:'- ', dataview:true, offset:1}),
    next_weekdays_h2: () => generateWeekdays({prefix:'## ', offset:1}),
    next_weekdays_h2_dataview: () => generateWeekdays({prefix:'## ', dataview:true, offset:1}),
};
```

```js title:monthdays
function generateMonthdays({
    offset = 0,
    prefix = "- ",
    dataview = false,
} = {}) {
    // 确定年份和月份
    const now = new Date();
    const fileDate = app.workspace.getActiveFile()?.basename.split("-").map(Number);
    [year, month] = fileDate?.length >= 2 ? fileDate : [now.getFullYear(), now.getMonth() + 1];
    
    // 确保 offset 是数字
    let offset2 = offset | 0;
    // 创建调整后的日期
    const adjusted = new Date(year, month - 1 + offset2, 1);
    const lastDate = new Date(adjusted.getFullYear(), adjusted.getMonth() + 1, 0).getDate();
    const weekdayMap = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    // const pad = n => n.toString().padStart(2, "0");
    
    return Array.from({ length: lastDate }, (_, i) => {
        const date = new Date(adjusted.getFullYear(), adjusted.getMonth(), i + 1);
        const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
        // const dateStr = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
        
        return dataview
        ? `${prefix}${weekdayMap[date.getDay()]}  (date:: ${dateStr})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )`
        : `${prefix}${dateStr}`;
    }).join("\n");
}

async function start(params={}){
    const { quickAddApi = app.plugins.plugins.quickadd.api, variables = {} } = params || {};
    
    const values = await quickAddApi.requestInputs([
        {id: "prefix", label: "prefix", type: "suggester", options: ["- ", "## "], defaultValue: "- "},
        {id: "offset", label: "offset", type: "suggester", options: ['0', '1'], defaultValue: '0'},
        {id: "dataview", label: "dataview", type: "dropdown", options: ['', true], defaultValue: ''}
    ]);
    
    const { prefix, offset, dataview } = values;
    variables.result = generateMonthdays({prefix, offset, dataview});
    return variables.result;
}

module.exports = {
    entry: start,
    monthdays_list: () => generateMonthdays({prefix:'- '}),
    monthdays_list_dataview: () => generateMonthdays({prefix:'- ', dataview:true}),
    monthdays_h2: () => generateMonthdays({prefix:'## '}),
    monthdays_h2_dataview: () => generateMonthdays({prefix:'## ', dataview:true}),
    next_monthdays_list: () => generateMonthdays({prefix:'- ', offset:1}),
    next_monthdays_list_dataview: () => generateMonthdays({prefix:'- ', dataview:true, offset:1}),
    next_monthdays_h2: () => generateMonthdays({prefix:'## ', offset:1}),
    next_monthdays_h2_dataview: () => generateMonthdays({prefix:'## ', dataview:true, offset:1}),
};
```