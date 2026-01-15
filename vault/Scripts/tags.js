module.exports = async function start(params) {
    const { obsidian, quickAddApi = app.plugins.plugins.quickadd.api } = params || {};

    const inputs = await quickAddApi.requestInputs([
        {id: 'tag', type: 'text'},
        {id: 'operation', type: 'select', options:['add', 'remove', 'replace']}
    ]);

    const {tag, operation} = inputs;
    const files = app.vault.getMarkdownFiles();
    let modified = 0;
    for (const file of files) {
        await app.fileManager.processFrontMatter(file, (fm) => {
            fm.tags = fm.tags || [];
            
            if (operation === "add" && !fm.tags.includes(tag)) {
                fm.tags.push(tag);
                modified++;
            } else if (operation === "remove") {
                const index = fm.tags.indexOf(tag);
                if (index > -1) {
                    fm.tags.splice(index, 1);
                    modified++;
                }
            } else if (operation === "replace") {
                const index = fm.tags.indexOf(tag);
                if (index > -1) {
                    fm.tags[index] = newTag;
                    modified++;
                }
            }
        });
    }
    new obsidian.Notice(`Modified ${modified} files`);
    return modified;
}