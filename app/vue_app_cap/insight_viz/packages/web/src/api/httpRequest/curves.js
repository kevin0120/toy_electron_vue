import { curvesUrl } from '/@/api/constant';
import { getApi } from '/@/api/request';
import { download } from '/@/api/utils/download';
// 获取曲线列表接口 (分页)
export const getCurvesListApi = (page_size, page_no, params) => {
    const data = {
        page_size,
        page_no,
        count: true,
        ...params
    };
    return getApi(curvesUrl.get_curve_list, data);
};
// 获取多条曲线的图表数据接口
export const getCurvesDataListApi = (data) => {
    return getApi(curvesUrl.get_curve_data, data);
};
// 获取曲线信息数据
export const getAnalysisCurveResultApi = (entity_id) => {
    return getApi(curvesUrl.get_tightening_result, { entity_id });
};
// 下载曲线
export const downloadCurveFileApi = async (params, config, fileName) => {
    const res = await getApi(curvesUrl.download_tightening_result, { ...params }, {
        responseType: 'blob',
        timeout: 86400000,
        ...config
    });
    download(res, fileName || 'tightening_results.zip');
};
// 获取统计分析页面散点图数据
export const getScatterDataApi = (params) => {
    return getApi(curvesUrl.get_scatter_data, params);
};
