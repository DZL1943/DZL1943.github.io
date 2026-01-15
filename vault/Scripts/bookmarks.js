module.exports = async function openBookmark(params) {
    const { quickAddApi = app.plugins.plugins.quickadd.api } = params || {};

    const bookmarks = app.internalPlugins
        .getEnabledPluginById("bookmarks")
        .getBookmarks()
        .filter((i) => i.type === "file")
        .map((i) => i.path);

    const filepath = await quickAddApi.suggester(bookmarks, bookmarks);
    await app.workspace
        .getLeaf("tab")
        .openFile(app.vault.getFileByPath(filepath));
};
