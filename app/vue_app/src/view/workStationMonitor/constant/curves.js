export var CurvesUnitEnum;
(function (CurvesUnitEnum) {
    CurvesUnitEnum["torque"] = "NM";
    CurvesUnitEnum["angle"] = "Deg";
})(CurvesUnitEnum || (CurvesUnitEnum = {}));
export var CurvesColorEnum;
(function (CurvesColorEnum) {
    CurvesColorEnum["default"] = "#bebebe";
    CurvesColorEnum["ok"] = "#4DD07D";
    CurvesColorEnum["nok"] = "#FF7878";
    CurvesColorEnum["ak2"] = "#fffc13";
    CurvesColorEnum["lsn"] = "#ff6909";
    CurvesColorEnum["none"] = "#bebebe";
})(CurvesColorEnum || (CurvesColorEnum = {}));
export const initCurveInfo = Object.freeze({
    entity_id: '加载中...',
    bolt_name: '加载中...',
    analysis_result_state: 'ready',
    tightening_result: 'nok',
    track_no: '加载中...',
    workcenter_code: '加载中...',
    attribute_equipment_no: '加载中...',
    control_time: '加载中...',
    angle_target: 0,
    angle_max: 0,
    angle_min: 0,
    torque_target: 0,
    torque_max: 0,
    torque_min: 0,
    measurement_final_torque: 0,
    measurement_final_angle: 0,
    measurement_step_results: [{ measure_torque: 0, measure_angle: 0 }],
    tightening_process_no: '加载中...',
    curve: {
        cur_m: [0],
        cur_w: [0],
        cur_t: [0],
        cur_s: [0]
    }
});
