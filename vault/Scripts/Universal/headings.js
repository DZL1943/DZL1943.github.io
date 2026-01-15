async function generateHeadings(params){
    const { quickAddApi = app.plugins.plugins.quickadd.api, variables = {} } = params || {};
    const { headings } = app.metadataCache.getFileCache(app.workspace.getActiveFile());
    if (!headings) return;

    const startHeadingLevel = 1;
    variables.result = headings.map(h => `${' '.repeat((h.level - startHeadingLevel) * 4)}- ${h.heading}`).join('\n');
    await quickAddApi.utility.setClipboard(variables.result);
    return variables.result;
}

async function showAndGotoHeadings(params) {
    const { quickAddApi = app.plugins.plugins.quickadd.api } = params || {};
    const { headings } = app.metadataCache.getFileCache(app.workspace.getActiveFile());
    if (!headings) return;

    const heading = await quickAddApi.suggester(
        headings.map(h=>`H${h.level}: ${h.heading}`),    // default render
        headings,
        'choose a heading to goto',
        false,
        {renderItem: (h, el) => {
            const row = el.createEl('div');
            const marker = row.createEl('span', {text: 'H'});
            marker.setAttr('style', `font-weight:bold;color:var(--h${h.level}-color)`);
            const level = row.createEl('sub', {text: `${h.level}`});
            level.setAttr('style', `color:gray;`);
            row.createEl('span', {text: `  ${h.heading}`});
        }}
    );
    
    app.workspace.activeLeaf?.view?.currentMode.applyScroll(heading.position.start.line);
}

module.exports = {
    entry: showAndGotoHeadings,
    generateHeadings,
};