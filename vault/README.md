---
created: 2026-01-15T14:43
modified: 2026-01-15T14:56
---

## Notes

```base
filters:
  and:
    - file.ext.containsAny("md")
formulas:
  TopSubFolder: file.folder.split('/').slice(0,this.file.folder.split('/').length+1).join('/')
views:
  - type: cards
    name: notes
    groupBy:
      property: formula.TopSubFolder
      direction: ASC
    order:
      - file.name
    sort:
      - property: file.folder
        direction: ASC
    indentProperties: false
    cardSize: 150

```

## Attachments

```base
filters:
  and:
    - '!file.ext.containsAny("md", "js")'
formulas:
  backlinks: file.backlinks.map(value.asFile())
views:
  - type: cards
    name: images
    order:
      - file.name
      - formula.backlinks
    sort:
      - property: formula.backlinks
        direction: ASC
      - property: file.ctime
        direction: DESC
    image: file.file
```
