import type { IPagination, IRes } from '/@/api/types/common';
import type { t2DArray } from '/@/types/global';

//获取统计分析页面散点图数据 请求参数
export interface ScatterDataReq {
  bolt_name: string;
  align_type: string; // 对齐方式
  filter?: string; // [{"field":"tightening_result","operator":"=","value":"ok"}]
}

// 获取曲线列表 请求参数类型
export interface CurveListReq {
  bolt_name: string;
  filter?: string; // [{"field":"tightening_result","operator":"=","value":"ok"}]
  orderBy?: string; // order: ['control_time desc','result asc']
}

// 'cur_w' : 角度 | 'cur_m': 扭矩 | 'cur_t' : 时间
export type chartLabel = 'cur_w' | 'cur_m' | 'cur_t';
export interface CurveDataListReq {
  entity_ids: string[];
  x_label: chartLabel;
  y_label: chartLabel;
}

export type tAnalysisResultState = 'ok' | 'nok' | 'doing' | 'ready' | 'failed';
export type tTighteningResult = 'ok' | 'nok' | 'ak2' | 'none' | 'lsn';

export type tSnugData = {
  clamp_torque: number;
  clamp_angle: number;
  snug_index: number;
  snug_angle: number;
  snug_torque: number;
};
// "\": 64, \"clamp_torque\": 9.07, \"clamp_angle\": 115.82000000000001, \"\": 74.21, \"
export type tProbaResult = tSnugData & {
  analysis_result_state: tAnalysisResultState;
  entity_id: string;
};

export type tCurve = {
  cur_m: number[];
  cur_w: number[];
  cur_t: number[];
  cur_s: number[];
};

export type tCurveInfo = {
  entity_id: string; // 唯一id
  bolt_name: string; // 螺栓编号
  analysis_result_state: tAnalysisResultState; // 算法分析结果
  tightening_result: tTighteningResult; // 拧紧结果
  track_no: string; // 追溯码
  workcenter_code: string; // 工作中心
  attribute_equipment_no: string; // 工具序列号
  control_time: string; // 拧紧时间
  curve_file?: string | null; // 曲线文件
  angle_target: number; // 目标角度
  angle_max: number; // 最大角度
  angle_min: number; // 最小角度
  torque_target: number; // 目标扭矩
  torque_max: number; // 最大扭矩
  torque_min: number; // 最小扭矩
  measurement_final_torque: number;
  measurement_final_angle: number;
  measurement_step_results: Array<{ measure_torque: number; measure_angle: number }>; // 分段拧紧结果
  tightening_process_no: string; // 程序号
  cap_snug_features_save?: string | null; // 贴合点数据json字符串
};

export type tWsCurveInfo = tCurveInfo & {
  curve: tCurve; // 曲线数据
};

export type tCurveData = tCurveInfo & {
  curve_data: t2DArray;
};

export type tScatterData = {
  scatter_data: Array<{
    entity_id: string;
    tightening_result: tTighteningResult;
    value: t2DArray;
  }>;
  torque_statistics: {
    center: number;
    lower: number;
    upper: number;
  };
  angle_statistics: {
    center: number;
    lower: number;
    upper: number;
  };
};

// 获取曲线列表（分页）返回结果类型
export type tCurveListRes = IRes<IPagination<tCurveInfo>>;

// 获取多条曲线的图表数据 返回结果类型
export type tCurveDataListRes = IRes<Array<tCurveData>>;

// 获取曲线信息数据 返回结果类型
export type tAnalysisCurveResultRes = IRes<tCurveInfo>;

//获取统计分析页面散点图数据 返回结果类型
export type tScatterDataRes = IRes<tScatterData>;
