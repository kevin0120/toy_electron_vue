const defaultConfigs = {
    version: 'v0.1',

    systemSettings: {
        loadURL: true,
        setFullScreen: true,
        mainWindowURL:'http://127.0.0.1:9110/cap/frontend#/cap/monitor/workstations/OP104',
        mainWindowFile:'./app/vue-app/dist/index.html'
    },


    base: {
        userInfo: {
            uuid: '1234'
        },
        psetPointDiameter: 30 // 编辑页面点位大小,未来不使用
    },
    page: {
        // 配置页面不同的导航页
        network: {
            ssid: {
                displayOrder: 1,
                value: '',
                displayTitle: 'Configuration.network.SSID',
                isPWD: false
            },
            password: {
                displayOrder: 100,
                value: '',
                displayTitle: 'Configuration.network.PWD',
                isPWD: true
            },
            ipAddress: {
                displayOrder: 200,
                value: '192.168.1.200',
                displayTitle: 'Configuration.network.Addr',
                isPWD: false
            },
            netmask: {
                displayOrder: 300,
                value: '255.255.255.0',
                displayTitle: 'Configuration.network.Mask',
                isPWD: false
            },
            gateway: {
                displayOrder: 400,
                value: '192.168.1.1',
                displayTitle: 'Configuration.network.Gateway',
                isPWD: false
            }
        },
        odooConnection: {
            odooUrl: {
                displayOrder: 1,
                value: 'http://192.168.1.118:8069/api/v1',
                displayTitle: 'Configuration.connections.Odoo'
            },
            hmiSn: {
                displayOrder: 2,
                value: 'fbdf4cddae9f44928aa9a69bc727d130',
                displayTitle: 'Configuration.connections.HMI'
            }
        },
        modbus: {
            source: ['remote', 'controller'],
            in: [
                {
                    bit: 0,
                    io: 'in',
                    function: '',
                    label: '模式选中'
                },
                {
                    bit: 1,
                    io: 'in',
                    function: '',
                    label: '强制放行'
                },
                {
                    bit: 2,
                    io: 'in',
                    function: '',
                    label: ''
                },
                {
                    bit: 3,
                    io: 'in',
                    function: 'BYPASS',
                    label: ''
                },
                {
                    bit: 4,
                    io: 'in',
                    function: 'MODE_SELECT',
                    label: '复位钥匙'
                },
                {
                    bit: 5,
                    io: 'in',
                    function: '',
                    label: ''
                },
                {
                    bit: 6,
                    io: 'in',
                    function: '',
                    label: ''
                },
                {
                    bit: 7,
                    io: 'in',
                    function: '',
                    label: ''
                }
            ],
            out: [
                {
                    bit: 0,
                    io: 'out',
                    function: 'LED_WHITE',
                    label: '白灯'
                },
                {
                    bit: 1,
                    io: 'out',
                    function: 'LED_YELLOW',
                    label: '黄灯'
                },
                {
                    bit: 2,
                    io: 'out',
                    function: 'LED_GREEN',
                    label: '绿灯'
                },
                {
                    bit: 3,
                    io: 'out',
                    function: 'LED_RED',
                    label: '红灯'
                },
                {
                    bit: 4,
                    io: 'out',
                    function: 'BEEP',
                    label: '蜂鸣'
                },
                {
                    bit: 5,
                    io: 'out',
                    function: '',
                    label: ''
                },
                {
                    bit: 6,
                    io: 'out',
                    function: '',
                    label: ''
                },
                {
                    bit: 7,
                    io: 'out',
                    function: '',
                    label: ''
                }
            ]
        }
    },
    system: {
        device: {
            scanner: {
                vendorId: 3118,
                mode: 'HID' // HID or BT_HID
                // mode: 'BT_HID',
                // vendorId: 1504
            }
        },
        connections: {
            masterpc: 'http://192.168.4.96:8082',
            rfid: 'tcp://127.0.0.1:2112',
            aiis: 'http://192.168.4.96:9092',
            controllers: [
                {
                    serial_no: '0001'
                }
            ],
            io: 'modbustcp://192.168.1.118:502/0',
            workcenterCode: 'TA1-03R',
            rework_workcenter: 'qrk'
        }
    },
    // 作业配置
    operationSettings: {
        opMode: 'op', // 作业模式:        op 或 order
        controllerMode: 'job', // 拧紧模式:        job 或 pset
        workMode: 'auto', // 工作模式:        auto 或 manual 或 scanner
        flowTriggers: ['carID', 'carType'], // 工作流程触发条件:  carType:车型代码 carID:vin/knr/longpin

        // 作业前检测(order mode only)
        preCheck: false,

        // 强制放行配置
        byPass: {
            enable: true,
            autoConfirm: true,
            type: 'sleep' // sleep or press
        },

        // 空车job
        emptyCarJob: 250,

        // 获取作业失败
        opFetchFail: 248,

        // 结果对话框
        enableResultDialog: true,

        // 手动模式下是否启用freestyle
        manualFreestyle: true,

        // 启用ak2
        enableAk2: true,

        regExp: '(C6\\d{12})' // rfid正則表達式,SVW
    },
    cvinetweb: {
        url: 'http://192.168.1.10:8080/CVINetWeb'
    }
};
module.exports = defaultConfigs;