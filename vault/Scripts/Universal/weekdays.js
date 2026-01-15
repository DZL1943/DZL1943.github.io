function generateWeekdays({
    offset = 0,
    prefix = "- ",
    dataview = false,
} = {}) {
    const weekdayMap = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    
    let offset2 = offset | 0;
    
    const now = new Date();
    const dayOfWeek = now.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;  // 0 -> sunday
    
    return weekdayMap.map((day,i) => {
        const date = new Date();
        date.setDate(now.getDate() + mondayOffset + offset2 * 7 + i);
        // const date = tp.date.weekday("YYYY-MM-DD", i, tp.date.weekday("YYYY-MM-DD", offset2 * 7));
        const dateStr = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
        
        return dataview 
        ? `${prefix}${day}  (date:: ${dateStr})  (weather:: )  (mood:: )  (diet:: )  (habits:: )  (summary:: )  `
        : `${prefix}${day}  ${dateStr}`;
    }).join("\n");
}

async function start(params={}) {
    const { quickAddApi = app.plugins.plugins.quickadd.api, variables = {} } = params || {};
    
    const values = await quickAddApi.requestInputs([
        {id: "prefix", type: "suggester", options: ["- ", "## "], defaultValue: "- "},
        {id: "offset", type: "suggester", options: ['0', '1'], defaultValue: '0'},
        {id: "dataview", type: "dropdown", options: ['', true], defaultValue: true}
    ]);
    const { prefix, offset, dataview } = values;
    variables.result = generateWeekdays({prefix, offset, dataview});
    return variables.result;
}

module.exports = {
    entry: start,
    weekdays_list: () => generateWeekdays({prefix:'- '}),
    weekdays_list_dataview: () => generateWeekdays({prefix:'- ', dataview:true}),
    weekdays_h2: () => generateWeekdays({prefix:'## '}),
    weekdays_h2_dataview: () => generateWeekdays({prefix:'## ', dataview:true}),
    next_weekdays_list: () => generateWeekdays({prefix:'- ', offset:1}),
    next_weekdays_list_dataview: () => generateWeekdays({prefix:'- ', dataview:true, offset:1}),
    next_weekdays_h2: () => generateWeekdays({prefix:'## ', offset:1}),
    next_weekdays_h2_dataview: () => generateWeekdays({prefix:'## ', dataview:true, offset:1}),
};