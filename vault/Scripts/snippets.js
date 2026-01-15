module.exports = async function toggleSnippets(params) {
    const { quickAddApi = app.plugins.plugins.quickadd.api } = params || {};

    const snippets = app.customCss.snippets;
    const enabledSnippets = app.customCss.enabledSnippets;

    const selected = await quickAddApi.checkboxPrompt(
        snippets,
        enabledSnippets
    );

    for (const snippet of snippets) {
        app.customCss.setCssEnabledStatus(snippet, selected.includes(snippet));
    }
    app.customCss.requestLoadSnippets();
};
