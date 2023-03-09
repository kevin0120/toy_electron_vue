import { getApi } from '/@/api/request';
import { workcenterUrl } from '/@/api/constant';
import type {
  NokResultsGroupReq,
  ResultTrendReq,
  WorkcenterListReq,
  ResultGroupByErrorReq,
  tResultTrendRes,
  tNokResultsGroupRes,
  tWorkcenterListRes,
  tResultGroupByErrorRes
} from '/@/api/types/workcenter';

export const getWorkcenterListApi = (param: WorkcenterListReq): Promise<tWorkcenterListRes> => {
  return getApi(workcenterUrl.get_workcenter_data, param);
};

// 获取某个工位异常结果分类的统计信息
export const getResultGroupByErrorApi = (param: ResultGroupByErrorReq): Promise<tResultGroupByErrorRes> => {
  return getApi(workcenterUrl.get_results_group_by_error, param);
};

// 获取工位结果趋势
export const getResultsTrendApi = (param: ResultTrendReq): Promise<tResultTrendRes> => {
  return getApi(workcenterUrl.get_results, param);
};

// 获取异常结果并按原因分类
export const getNokResultsGroupApi = (param: NokResultsGroupReq): Promise<tNokResultsGroupRes> => {
  return getApi(workcenterUrl.get_nok_results, param);
};
