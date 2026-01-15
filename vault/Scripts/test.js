let obsidian, Notice;

function test(){
    new Notice(`${obsidian.apiVersion}`, 1000);
}

async function start(params, settings) {
    const {
        app: _app = app,
        obsidian: _ob,
        quickAddApi = app.plugins.plugins.quickadd.api,
        variables = {},
    } = params || {};
    obsidian = _ob;
    ({Notice} = obsidian);
    test();
    variables.result = app.workspace.getActiveFile().parent.path;
    return variables.result;
}

module.exports = {
    entry: start,
    // settings: {name: '', author: '', options: {}}
}