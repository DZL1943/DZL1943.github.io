function templaterApi() {
    const t = app.plugins.plugins["templater-obsidian"].templater;
    
    if (t.current_functions_object) {
        return t.current_functions_object;
    }
    
    const modules = t.functions_generator.internal_functions.modules_array;
    
    return new Proxy({}, {
        get: (_, module) => new Proxy({}, {
            get: (_, func) => {
                const mod = modules.find(m => m.name === module);
                return mod?.static_functions?.get(func);
            }
        })
    });
};

async function openPeriodicNote({
    period,
    offset = 0
}){
    const tp = templaterApi();
    //const period = await tp.system.suggester(Object.keys(config), Object.keys(config), false, "Choose a period type");
    
    const basepath = "Journals";
    const config = {
        daily: offset => ({
            template: tp.file.find_tfile("daily-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset}D`)}`,
            filename: `${tp.date.now("YYYY-MM-DD", `P${offset}D`)}`,
        }),
        weekly: offset => ({
            template: tp.file.find_tfile("weekly-template"),
            folder: `${basepath}/${tp.date.now("GGGG", `P${offset}W`)}`,
            filename: `${tp.date.now("GGGG-[W]WW", `P${offset}W`)}`,
        }),
        monthly: offset => ({
            template: tp.file.find_tfile("monthly-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset}M`)}`,
            filename: `${tp.date.now("YYYY-MM", `P${offset}M`)}`,
        }),
        quarterly: offset => ({
            template: tp.file.find_tfile("quarterly-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset * 3}M`)}`,
            filename: `${tp.date.now("YYYY-[Q]Q", `P${offset * 3}M`)}`,
        }),
        yearly: offset => ({
            template: tp.file.find_tfile("yearly-template"),
            folder: `${basepath}/${tp.date.now("YYYY", `P${offset}Y`)}`,
            filename: `${tp.date.now("YYYY", `P${offset}Y`)}`,
        }),
    };
    
    const {template, folder, filename} = config[period](offset);
    
    let file = tp.file.find_tfile(`${folder}/${filename}`);
    if(!file){
        file = await tp.file.create_new(template || "", filename, false, folder);
    }
    await app.workspace.getLeaf('tab').openFile(file);
}

async function start(params={}) {
    const {quickAddApi = app.plugins.plugins.quickadd.api} = params || {};
    const values = await quickAddApi.requestInputs([
        {id: "period", type: "dropdown", options: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'], defaultValue: 'weekly'},
        {id: "offset", type: "dropdown", options: ['-2', '-1', '0', '1', '2'], defaultValue: '0'},
    ]);
    const { period, offset } = values;
    
    await openPeriodicNote({period, offset});
}

module.exports = {
    entry: start,
    daily: () => openPeriodicNote({period:'daily'}),
    weekly: () => openPeriodicNote({period:'weekly'}),
    monthly: () => openPeriodicNote({period:'monthly'}),
    quarterly: () => openPeriodicNote({period:'quarterly'}),
    yearly: () => openPeriodicNote({period:'yearly'}),
    next_daily: () => openPeriodicNote({period:'daily', offset:1}),
    next_weekly: () => openPeriodicNote({period:'weekly', offset:1}),
    next_monthly: () => openPeriodicNote({period:'monthly', offset:1}),
    next_quarterly: () => openPeriodicNote({period:'quarterly', offset:1}),
    next_yearly: () => openPeriodicNote({period:'yearly', offset:1}),
};