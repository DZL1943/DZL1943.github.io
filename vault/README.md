---
created: 2024-07-30T13:30
modified: 2026-01-15T23:44
---

# README

## Index

```base
formulas:
  backlinks: file.backlinks.map(value.asFile())
  TopSubFolder: file.folder.split('/').slice(0,this.file.folder.split('/').length+1).join('/')
views:
  - type: cards
    name: notes
    filters:
      and:
        - file.ext.containsAny("md")
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
  - type: cards
    name: images
    filters:
      and:
        - file.ext.containsAny("png", "jpg", "jpeg", "webp", "gif", "svg", "bmp")
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