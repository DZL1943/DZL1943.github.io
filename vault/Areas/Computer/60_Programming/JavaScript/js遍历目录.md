
```js
const fs = require('fs');
const path = require('path');

function listFiles(startPath) {
  const result = [];
  const entries = fs.readdirSync(startPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(startPath, entry.name);
    if (entry.isFile()) {
      result.push({ name: entry.name, path: fullPath, is_file: true });
    } else if (entry.isDirectory()) {
      const children = listFiles(fullPath);
      result.push({ name: entry.name, path: fullPath, is_file: false, children });
    }
  }
  return result;
}

// Get the path from the command-line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node list_files.js <path>');
  process.exit(1);
}
const startPath = args[0];

// List the files and directories under the given path
const filesList = listFiles(startPath);
console.log(JSON.stringify(filesList, null, 2));
```