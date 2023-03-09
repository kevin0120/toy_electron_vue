import { IPagination, IRes } from '/@/api/types/common';

/*
请求参数数据类型统一使用 interface 定义
响应结果数据类型统一使用 type 定义
 */

// box分析结果列表（分页）请求数据类型
export interface AnalyzeResultListReq {
  analyze_id: string;
  show_difference: boolean; // 是否过滤显示差异结果数据
  orderBy: string; // order: ['control_time desc','result asc']
}

type tAnalyzeResult = {
  analyze_result: string; // box分析结果
  control_time: string; // 拧紧时间
  data_id: number; // box分析结果唯一id
  entity_id: number; // 曲线编号
  track_no: string; // 追溯码
  attribute_equipment_no: string; // 拧紧工具序列号
  tightening_process_no: string; // 程序号
  tightening_bolt: string; // 螺栓编号
  tightening_result: string; // 拧紧结果
  workcenter_code: string; // 工作中心
  measurement_final_torque: number; // 最终扭矩
  measurement_final_angle: number; // 最终角度
  angle_max: number;
  angle_min: number;
  angle_target: number;
  torque_max: number;
  torque_min: number;
  torque_target: number;
};
// box分析结果列表（分页）返回结果类型
export type tAnalyzeResultListRes = IRes<IPagination<tAnalyzeResult>>;

// 获取参考曲线api请求参数类型
export interface ReferenceCurvesReq {
  bolt_name: string;
}

// 获取参考曲线api返回值类型
export type tReferenceCurvesRes = IRes<{
  entity_id: string;
  is_reference_curve: boolean;
}>;

// 获取其中一个分析结果请求参数类型
export interface BoxAnalyzeCurvesReq {
  data_id: number | string;
}

type tBoxAnalyzeCurves = {
  analyze_result: string;
  curve_list: Array<[number, number]>; // 曲线数据二维数组
  control_time: string;
  curve_file: string;
  data_id: number;
  attribute_equipment_no: string; // 工具序列号
  tightening_process_no: string;
  bolt_name: string; // 螺栓编号
  tightening_result: string;
  workcenter_code: string;
};

// 获取其中一个分析结果请求返回值类型
export type tBoxAnalyzeCurvesRes = IRes<tBoxAnalyzeCurves>;

export type tBoxInfo = {
  angle_min: number;
  angle_max: number;
  torque_min: number;
  torque_max: number;
};

// box分析请求参数
export interface AnalyzeReq {
  box_data: tBoxInfo[];
  analyze_id: string;
  align_type: string; // 对齐方式
  bolt_name: string;
  filter?: string;
}

export type tAnalyzeResultOverview = {
  bolt_name: string; // 螺栓编号
  curves_count: number; // 分析曲线总数
  nok_count: number; // 异常曲线数量
  nok_percent: string; // 异常曲线占比
  time_range: string; // 时间范围
  difference_count: number; // 差异曲线数量
  difference_percent: string; // 差异曲线占比
};
// box分析请求返回值
export type tAnalyzeRes = IRes<tAnalyzeResultOverview>;
