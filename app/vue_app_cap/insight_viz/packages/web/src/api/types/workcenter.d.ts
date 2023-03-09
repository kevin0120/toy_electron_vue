import { IRes } from '/@/api/types/common';

// 获取工位列表请求参数
export interface WorkcenterListReq {
  fields: string | 'code' | 'id' | 'name';
}

// 获取某个工位异常结果分类的统计信息 请求参数
export interface ResultGroupByErrorReq {
  workcenter_code: string;
  time_range: string; // `${number} ${time}`  time: 'minute'|'hour'|'day'|'month'|'year'
}

// 获取异常结果并按原因分类 请求参数
export interface NokResultsGroupReq {
  workcenter_code: string;
  time_range: string; // `${number} ${time}`  time: 'minute'|'hour'|'day'|'month'|'year'
  interval_time: string;
}

// 获取工位结果趋势 请求参数
export interface ResultTrendReq {
  workcenter_code: string;
  time_range: string; // `${number} ${time}`  time: 'minute'|'hour'|'day'|'month'|'year'
  interval_time: string; // `${number} ${time}` time: 'minute'|'hour'|'day'|'month'|'year'
  result: string; // ok | nok
}

// 获取工位列表响应结果类型
export type tWorkcenterListRes = IRes<string[]>;

// 获取某个工位异常结果分类的统计信息 响应结果类型
export type tResultGroupByErrorRes = IRes<
  Array<{
    error_code: string;
    count: number;
  }>
>;

// 获取工位结果趋势 响应结果类型
export type tResultTrendRes = IRes<Array<{ bucket_time: string; percent: string }>>;

// 获取异常结果并按原因分类 响应结果类型
export type tNokResultsGroupRes = IRes<
  Array<{
    error_code: string;
    count: number;
    bucket_time: string;
  }>
>;
