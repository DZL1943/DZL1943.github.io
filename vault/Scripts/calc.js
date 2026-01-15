async function calc(params) {
    const { obsidian: {Notice}, quickAddApi = app.plugins.plugins.quickadd.api, variables = {} } = params || {};

    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => b === 0 ? NaN : a / b,
        '%': (a, b) => a % b,
        '**': (a, b) => a ** b,
        '^': (a, b) => Math.pow(a, b),
        '//': (a, b) => Math.floor(a / b),
        'max': (a, b) => Math.max(a, b),
        'min': (a, b) => Math.min(a, b),
    };

    const inputs = await quickAddApi.requestInputs([
        { id: 'number1', type: "text" },
        { id: 'number2', type: "text" },
        { id: 'operator', type: "dropdown", options: Object.keys(operations), defaultValue: '+' },
    ]);
    const { number1, number2, operator } = inputs;
    try {
        variables.result = operations[operator](parseFloat(number1), parseFloat(number2));
        new Notice(`${variables.result}`, 5000);
    } catch (error) {}
}

async function calcLine(params) {
    const editor = app.workspace.activeLeaf?.view?.editor;
    if (!editor) return;
    const cursor = editor.getCursor();
    const lineText = editor.getLine(cursor.line);

    const result = (() => {try {return eval(lineText)} catch {return null}})();

    editor.setLine(cursor.line, `${lineText} = ${result}`);
}

module.exports = {
    calcLine,
    calc
}