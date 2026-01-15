function generateMonthdays({
    offset = 0,
    prefix = "- ",
    dataview = false,
} = {}) {
    // 确定年份和月份
    const now = new Date();
    const fileDate = app.workspace.getActiveFile()?.basename.split("-").map(Number);
    [year, month] = fileDate?.length >= 2 ? fileDate : [now.getFullYear(), now.getMonth() + 1];
    
    // 确保 offset 是数字
    let offset2 = offset | 0;
    // 创建调整后的日期
    const adjusted = new Date(year, month - 1 + offset2, 1);
    const lastDate = new Date(adjusted.getFullYear(), adjusted.getMonth() + 1, 0).getDate();
    const weekdayMap = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    // const pad = n => n.toString().padStart(2, "0");
    
    return Array.from({ length: lastDate }, (_, i) => {
        const date = new Date(adjusted.getFullYear(), adjusted.getMonth(), i + 1);
        const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
        // const dateStr = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
        
        return dataview
        ? `${prefix}${weekdayMap[date.getDay()]}  (date:: ${dateStr})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )`
        : `${prefix}${dateStr}`;
    }).join("\n");
}

async function start(params={}){
    const { quickAddApi = app.plugins.plugins.quickadd.api, variables = {} } = params || {};
    
    const values = await quickAddApi.requestInputs([
        {id: "prefix", type: "suggester", options: ["- ", "## "], defaultValue: "- "},
        {id: "offset", type: "suggester", options: ['0', '1'], defaultValue: '0'},
        {id: "dataview", type: "dropdown", options: ['', true], defaultValue: ''}
    ]);
    
    const { prefix, offset, dataview } = values;
    variables.result = generateMonthdays({prefix, offset, dataview});
    return variables.result;
}

module.exports = {
    entry: start,
    monthdays_list: () => generateMonthdays({prefix:'- '}),
    monthdays_list_dataview: () => generateMonthdays({prefix:'- ', dataview:true}),
    monthdays_h2: () => generateMonthdays({prefix:'## '}),
    monthdays_h2_dataview: () => generateMonthdays({prefix:'## ', dataview:true}),
    next_monthdays_list: () => generateMonthdays({prefix:'- ', offset:1}),
    next_monthdays_list_dataview: () => generateMonthdays({prefix:'- ', dataview:true, offset:1}),
    next_monthdays_h2: () => generateMonthdays({prefix:'## ', offset:1}),
    next_monthdays_h2_dataview: () => generateMonthdays({prefix:'## ', dataview:true, offset:1}),
};