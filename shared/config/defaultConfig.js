module.exports.defaultConfigs = {
    version: 'v0.1',
    project: 'remote_odoo',
    projects: {
        pure: {
            name:'pure',
            connect:'./local/index.html',
            setFullScreen:false,
            openDevTools:true,
            uuid: '1'
        },
        vue_app: {
            name:'vue_app',
            connect:'./app/vue_app/dist/index.html',
            setFullScreen:true,
            openDevTools:true,
            uuid: '2'
        },
        remote_odoo : {
            name:'remote_odoo',
            connect:'http://192.168.60.40:9110/cap/frontend#/cap/monitor/workstations/OP104',
            setFullScreen:true,
            openDevTools:false,
            uuid: '3'
        },
        vue_app_cap: {
            name:'vue_app_cap',
            connect:'./app/vue_app_cap/insight_viz/packages/web/dist/index.html',
            setFullScreen:true,
            openDevTools:false,
            uuid: '4'
        },
        psetPointDiameter: 30 // 编辑页面点位大小,未来不使用
    },
    systemSettings: {
        enableDebugInfo: false,
        enableConflictOP: true,
        showSwitchMode: false, // 切换pset or job 模式
        defaultControllerSN: '27091400470',
        defaultToolSN: '0001',
        authEnable: true,
        switchAutoManual: false,
        oeeFuncEnable: false,
        modbusEnable: false,
        rfidEnabled: false,
        andonEnable: true,
        psetContinueMode: false,
        enableFocus: false,
        viewerEnable: true,
        curveEnable: true,
        security: {
            users: {
                admin: {
                    password: 'admin',
                    role: 'admin'
                }
            }
        }
    }
}
;