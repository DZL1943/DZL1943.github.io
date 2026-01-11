```javascript
const fs = require('node:fs');

function write(data, path="data.json") {
    const content = JSON.stringify(data)
    fs.writeFileSync(path, content)
}

function read(path="data.json") {
    const content = fs.readFileSync(path)
    return JSON.parse(content)
}

const data = [
    {date: "2024-06-01", content: "666"},
    {date: "2024-07-01", content: "777"},
    {date: "2024-07-02", content: "a\nb"},
]

write(data)

const data2 = read()
console.log(data2)

```