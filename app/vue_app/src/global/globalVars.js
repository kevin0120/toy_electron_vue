export const TOKEN_HEAD = 'Access-Token';
export const global_var = {
    lang: 'zhCn',
    status_code: {
        0: "Init",
        1: "SelfCheck",
        2: "PreReady",
        3: "Ready",
        4: "SwichProfile",
        5: "Running",
        6: "Backward",
        7: "Debug",
        8: "Fault",
        9: "FaultCleaning"
    },
    ui_config: {
        chart_tab: 1
    },
    tool_type: 'screw_driver',
    TOKEN: null,
    time_stamp: 0,
    userName: "guest",
    // 过滤曲线的条件
    filterCndtns: [],
    // 当前用户所属权限组级别
    userPrmsnLvl:{},
}



export default  global_var 