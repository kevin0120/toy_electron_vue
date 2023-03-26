export enum CurvesUnitEnum {
  torque = 'NM',
  angle = 'Deg'
}

export enum CurvesColorEnum {
  default = '#bebebe',
  ok = '#4DD07D',
  nok = '#FF7878',
  ak2 = '#fffc13',
  lsn = '#ff6909',
  none = '#bebebe'
}

export const initCurveInfo = Object.freeze({
  entity_id: '加载中...', // 唯一id
  bolt_name: '加载中...', // 螺栓编号
  analysis_result_state: 'ready', // 算法分析结果
  tightening_result: 'nok', // 拧紧结果
  track_no: '加载中...', // 追溯码
  workcenter_code: '加载中...', // 工作中心
  attribute_equipment_no: '加载中...', // 工具序列号
  control_time: '加载中...', // 拧紧时间
  angle_target: 0, // 目标角度
  angle_max: 0, // 最大角度
  angle_min: 0, // 最小角度
  torque_target: 0, // 目标扭矩
  torque_max: 0, // 最大扭矩
  torque_min: 0, // 最小扭矩
  measurement_final_torque: 0,
  measurement_final_angle: 0,
  measurement_step_results: [{ measure_torque: 0, measure_angle: 0 }], // 分段拧紧结果
  tightening_process_no: '加载中...',
  curve: {
    cur_m: [0],
    cur_w: [0],
    cur_t: [0],
    cur_s: [0]
  }
});
