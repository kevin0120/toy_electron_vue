import { getApi } from '/@/api/request';
import { workcenterUrl } from '/@/api/constant';
export const getWorkcenterListApi = (param) => {
    return getApi(workcenterUrl.get_workcenter_data, param);
};
// 获取某个工位异常结果分类的统计信息
export const getResultGroupByErrorApi = (param) => {
    return getApi(workcenterUrl.get_results_group_by_error, param);
};
// 获取工位结果趋势
export const getResultsTrendApi = (param) => {
    return getApi(workcenterUrl.get_results, param);
};
// 获取异常结果并按原因分类
export const getNokResultsGroupApi = (param) => {
    return getApi(workcenterUrl.get_nok_results, param);
};
