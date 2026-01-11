---
title: Datacore
created: 2025-11-13T20:29
modified: 2025-11-13T20:29
aliases:
  - datacore
url:
  - https://blacksmithgu.github.io/datacore/
---

## Metadata

Datacore is a _metadata_ index - it stores information about every page, section, block, list item, canvas file, and other file in your vault in an internal database which can be quickly searched for generating nice-looking views. You access this metadata using the [query language](https://blacksmithgu.github.io/datacore/data/query), and then compile it into useful views using the [embedded views](https://blacksmithgu.github.io/datacore/code-views).

Most fields in the metadata start with a dollar sign (`$`), meaning they are _intrinsic_ - automatically provided by Obsidian and Datacore.

The data available depends on the specific type. The sections below describe metadata that is generally available for everything - for specific types, you can look at it's corresponding metadata reference page.

- `$types`
- `$parent`
- `$tags`
- `$links`
- `$file`
- `$path`

> [!summary] 
> 内部属性名用`$`前缀, 用户属性不需要. 
> 在 js 中可通过`value('xxx')`或`field('xxx').raw`的形式访问

## Queries

```js
// Inside of a react component, watch the results of a query live. Automatically updates
// whenever the query results change.
const pages = dc.useQuery("@page");

// In a plugin context or in more advanced usage, you can run a query a single time with `query`.
const pages = dc.query("@page and rating > 9");
```

- `@type` 类型
    - `@file`: All files.
    - `@page`: All markdown pages.
    - `@section`: All markdown sections in markdown pages.
    - `@block`: All markdown blocks in markdown pages.
    - `@block-list`: All markdown blocks that contain lists in them.
    - `@codeblock`: All markdown codeblocks.
    - `@datablock`: All datacore 'datablocks', which are special codeblocks annotated with `yaml:data`.
    - `@list-item`: All list items in markdown pages.
    - `@task`: All task items (of the form `- [ ]`).
- `#tag`
- `connected()`
- `path()`
- `exists()`
- `parentof()`
- `childof()`

### Pages

Datacore tracks frontmatter and inline fields on pages using the `$frontmatter` and `$infields` metadata properties, which are maps from (lower-case) field name to their value. You can directly use these types if you wish, but it is generally easier to use the shorthand methods.

```json
{
    $types: ["file", "markdown", "page", "taggable", "linkable", "links", "fields"],
    $typename: "Page",
    $id: "<path-to-file>",
    $file: "<path-to-file>",
    $frontmatter: [
        "key 1": {
            key: "key 1",
            value: "<parsed value>",
            raw: "<raw unparsed text value>"
        },
        ...
    ],
    $infields: [
        "field 1": {
            key: "field 1",
            value: "<parsed value>",
            raw: "<raw unparsed text value>",
            position: { start: 0, end: 1 }
        },
        //...
    ],
    $path: "<path-to-file>",
    $ctime: "<unix epoch seconds when file was created>",
    $mtime: "<unix epoch seconds when file was last modified>",
    $extension: "<file extension - usually 'md'>",
    $size: "<size of file in bytes>",
    // Start and end position of the whole file in lines - this usually means start is 0 and end is the number of lines in the file + 1.
    // Start position is inclusive; end is exclusive.
    $position: { start: 0, end: 1 },
    $tags: ["#tag1", "#tag2/thing"],
    $links: [ /* list of Link objects in this page. */ ],
    $sections: [ /* list of sections in this page. */ ],

    /** Derived Fields. */
    $lineCount: 1, // Number of lines in the file.
    $name: "File Name", // Name of the file as it would show up in Obsidian.
    $link: <link-to-file>, // Link object that links to this file.
}
```

### Sections

```json
{
    $types: ["markdown", "section", "taggable", "linkable", "links", "fields"],
    $typename: "Section",
    $id: "<unique id>",
    $file: "<path-to-file-containing-section>",
    $infields: [
        "field 1": {
            key: "field 1",
            value: "<parsed value>",
            raw: "<raw unparsed text value>",
            position: { start: 0, end: 1 }
        },
        //...
    ],
    $ordinal: <number>,
    $title: "<section title>",
    $name: "<section title>",
    $level: "<1-6 level of section>",
    $lineCount: 1, // Number of lines in the file.
    // Start and end position of the section in lines. Start position is inclusive; end is exclusive.
    $position: { start: 0, end: 1 },
    $link: <link-to-file>, // Link object that links to this file.
    $tags: ["#tag1", "#tag2/thing"],
    $links: [ /* list of Link objects in this section. */ ],
    $blocks: [ /* list of blocks in this section. */ ],
}
```

### Blocks

- Paragraphs (paragraph)
- YAML (yaml)
- List Blocks (list-block)
- Codeblocks (codeblock)
- Datablocks (datablock)

## Javascript Views

Datacore supports Javascript, JSX, Typescript, and TSX. To add code to a page, use an embedded codeblock with the language `datacorejs`, `datacorejsx`, `datacorets`, or `datacoretsx` respectively. Datacore also has a plugin API available via the global `window.datacore`.

### Codeblock API

- Query Hooks
    - *dc.useFile()*
    - dc.useCurrentFile()
    - dc.useCurrentPath()
    - dc.useQuery()
    - dc.useFullQuery()
    - dc.useIndexUpdates()
- Common React Hooks
    - dc.useState: Create a React state variable that can be read and updated.
    - dc.useReducer: Create a React reducer which accepts messages to update internal state.
    - dc.useMemo: Memoize a value so it only updates when a dependency array changes.
    - dc.useCallback: Memoize a function so it only is re-created when a dependency array changes.
    - dc.useEffect: Run a specific 'side-effect' whenever a dependency array changes.
    - dc.createContext: Create a react context which allows passing state down many layers without prop drilling.
    - dc.useContext: Use a previously created context.
    - dc.useRef: A state-like variable that allows directly storing a value without causing React re-renders.
    - dc.useArray()
- Direct Queries
    - dc.query()
    - dc.tryQuery()
    - dc.fullquery()
    - dc.tryFullQuery()
- Links
    - dc.resolvePath()
    - dc.fileLink()
    - dc.headerLink()
    - dc.blockLink()
    - dc.parseLink()
    - dc.tryParseLink()
- Expressions
    - dc.evaluate()
    - dc.tryEvaluate()
- Type Coercion / Parsing
    - dc.coerce.string()
    - dc.coerce.boolean()
    - dc.coerce.number()
    - dc.coerce.date()
    - dc.coerce.duration()
    - dc.coerce.link()
    - dc.coerce.array()

### List

```datacorejsx
function buildTOC(sections) {
    const result = [];
    const stack = [{ level: 0, children: result }];
    
    for (const section of sections) {
        while (stack[stack.length - 1].level >= section.$level) stack.pop();
        const parent = stack[stack.length - 1];
        (parent.children || (parent.children = [])).push(section);
        stack.push({ level: section.$level, children: section.children = [] });
    }
    
    return result;
}

return function View() {
    const sections = dc.useCurrentFile().$sections;
    return <dc.List type="unordered" rows={buildTOC(sections)} renderer={section => section.$title} />;
}
```

### Table

```datacorejsx
const COLUMNS = [
    {id: 'date', value: row => dc.evaluate(`dateformat(date, "MM/dd ccc")`, {date: row.value('date')})},
    {id: 'weather', value: row => row.value('weather')},
    {id: 'mood', value: row => row.value('mood')},
    {id: 'habits', value: row => row.value('habits')},
    {id: 'summary', value: row => (row.value('summary') ? row.value('summary')+'<br>' : "") + row.$elements.map(e=>e.$text).join('<br>')}
]

return function View(){
    const data = dc.useQuery('@list-item and childof(@page and path("Journals/2025") and $name="2025")');
    
    const sorted = dc.useArray(data, array => 
        array.where(item => item.value('habits') || item.value('summary') || item.$elements.some(e=>e.$text))
        .sort(item => item.value('date'), 'desc')
    );
    
    return <dc.Table rows={sorted} columns={COLUMNS} paging={20} scrollOnPaging={10} />;
}
```

### Data Arrays

## Expressions & Functions

- Constructors
    - object(key1, value1, ...)
    - list(value1, value2, ...)
    - date(any)
    - date(text, format)
    - dur(any)
    - number(string)
    - string(any)
    - link(path, [display])
    - embed(link, [embed?])
    - elink(url, [display])
    - typeof(any)
- Numeric Operations
    - round(number, [digits])
    - trunc(number)
    - floor(number)
    - ceil(number)
    - min(a, b, ..)
    - max(a, b, ...)
    - sum(array)
    - product(array)
    - reduce(array, operand)
    - average(array)
    - minby(array, function)
    - maxby(array, function)
- Objects, Arrays, and String Operations
    - contains() and friends
    - containsword(list|string, value)
    - extract(object, key1, key2, ...)
    - sort(list)
    - reverse(list)
    - length(object|array)
    - nonnull(array)
    - all(array)
    - any(array)
    - none(array)
    - join(array, [delimiter])
    - filter(array, predicate)
    - map(array, func)
    - flat(array, [depth])
    - slice(array, [start, [end]])
- String Operations
    - regextest(pattern, string)
    - regexmatch(pattern, string)
    - regexreplace(string, pattern, replacement)
    - replace(string, pattern, replacement)
    - lower(string)
    - upper(string)
    - split(string, delimiter, [limit])
    - startswith(string, prefix)
    - endswith(string, suffix)
    - padleft(string, length, [padding])
    - padright(string, length, [padding])
    - substring(string, start, [end])
    - truncate(string, length, [suffix])
- Utility Functions
    - default(field, value)
    - choice(bool, left, right)
    - hash(seed, [text], [variant])
    - striptime(date)
    - dateformat(date|datetime, string)
    - durationformat(duration, string)
    - currencyformat(number, [currency])
    - localtime(date)
    - meta(link)
