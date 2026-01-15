module.exports = async function showCurrentFolderItems(params) {
    const { obsidian, quickAddApi = app.plugins.plugins.quickadd.api } = params || {};

    const items = app.workspace.getActiveFile().parent.children;
    const select = await quickAddApi.suggester(items.map(i=>i.path), items);
    if (select instanceof obsidian.TFile) {
        await app.workspace.getLeaf('tab').openFile(select);
    }
}