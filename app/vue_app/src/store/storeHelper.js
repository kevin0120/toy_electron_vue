import { createStore } from 'vuex'


/**
 * 默认单位比例必须修改正确
 */
export const vuexStore = createStore({
    state() {
        return {
            count: 0,
            /**
             * 最大,最小值按 单位元为1的
             */
            sensors: {
                "default": {
                    sname: "default",
                    gain: 1,
                    offset: 0,
                    max: 99999999,
                    min: -99999999,
                    name: ""
                },
                weight: {
                    sname: "weight",
                    gain: 1,
                    offset: 0,
                    max: 99999999,
                    min: -99999999,
                    name:"kg"
                },
                force: {
                    sname: "force",
                    gain: 1,
                    offset: 0,
                    max: 99999999,
                    min: -99999999,
                    name: "kn"
                },
                /**
                 * 默认单位°,min,max,比例为1的单位turn
                 */
                angle: {
                    sname: "angle",
                    gain: 360,
                    offset: 0,
                    max: 500,
                    min: -500,
                    name: "°"

                },
                shift: {
                    sname: "shift",
                    gain: 1,
                    offset: 0,
                    max: 99999999,
                    min: -99999999,

                },
                torque: {
                    sname: "torque",
                    gain: 1,
                    offset: 0,
                    max: 12,
                    min: 0,
                    name: "N.m"
                },
                line_speed: {
                    sname: "line_speed",
                    gain: 1,
                    offset: 0,
                    max: 9999,
                    min: 0,
                    name: 'mm/s'
                },
                angle_speed: {
                    sname: "angle_speed",
                    gain: 60,
                    offset: 0,
                    max: 20,
                    min: 0,
                    name: 'rpm'

                },
                acc_time: {
                    sname: "acc",
                    gain: 1,
                    offset: 0,
                    max: 100,
                    min: 0.001,
                    name: 's',
                },
                dot: {
                    sname: "dot",
                    gain: 1,
                    offset: 0,
                    max: 99999999,
                    min: 0,

                },
                time: {
                    sname: "time",
                    gain: 0.001,
                    offset: 0,
                    max: 600000,
                    min: 0,
                    name: "s"
                },
                repetitions: {
                    sname: "numberofrepetition",
                    gain: 1,
                    offset: 0,
                    max: 100,
                    min: 1,
                    name: "count"
                }
            },
            Heart_Alive: false,
            g_status: {
                sensor: 0,
                pos: 0,
                speed: 0,
                reversed: 0,
                nc_state: 0,
                power_on: 0,
                busy: false,
                ready: false,
                rok: false,
                isok: false,
                alarmed: false,
                alarm_code: 0,
                pset: 0,
                tid: 0,
                ret_pos: 0,
                ret_sensor: 0,
                ret_sn: '--',
                ret_cnt: 0,
                ret_batches: 1,
                ret_pos_min: 0,
                ret_pos_max: 0,
                ret_sensor_min: 0,
                ret_sensor_max: 0,
                io_ival: 0,
                io_oval: 0,
                offline: 1,
                temp: 0,
                heartbit: 1607834096000,
                sensor_max: 1,
                speed_max: 1200,
                jogstr: false,
                enablesrc: 0x02,
                psetsrc: 0x01,
                toolsrc: 0x02,
                keeprun: false,
                ac_run: false,
                eopos: 0,
                anybustype: 0,
                fail_code: 0,
            },
            // 前端的一些状态
            f_status: {
                user: 'guest',
                //工艺-文件个数
                pfNums: 0,
                //当前激活的Pset号
                pset: 0,
                //如果是默认使能不展示图片
                power_enable: 0x02,
                tool_run: 0x02,
                //用户权限
                permissions: {}
            },
        }
    },
    mutations: {
        update_g_status(state, val) {
            for (let c in val) {
                if (state.g_status[c] != val[c])
                    state.g_status[c] = val[c];
            }
        },
        update_sensor_obj(state, [obj, val]) {
            state.sensors.torque[obj] = val
        },
        update_speed_obj(state,[obj,  val]) {
            state.sensors.angle_speed[obj] = val
        },
        update_permissions(state, val) {
            state.f_status.permissions = val
        },
        update_f_status_obj(state,[obj,  val])
        {
            state.f_status[obj] = val
        }
    }

})