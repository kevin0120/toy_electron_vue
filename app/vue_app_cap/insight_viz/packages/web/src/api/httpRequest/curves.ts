import { curvesUrl } from '/@/api/constant';
import { getApi } from '/@/api/request';
import type {
  CurveDataListReq,
  CurveListReq,
  ScatterDataReq,
  tCurveDataListRes,
  tCurveListRes,
  tAnalysisCurveResultRes,
  tScatterDataRes
} from '/@/api/types/curves';
import { download } from '/@/api/utils/download';
import type { AxiosRequestConfig } from 'axios';

// 获取曲线列表接口 (分页)
export const getCurvesListApi = (page_size: number, page_no: number, params: CurveListReq): Promise<tCurveListRes> => {
  const data = {
    page_size,
    page_no,
    count: true,
    ...params
  };
  return getApi(curvesUrl.get_curve_list, data);
};

// 获取多条曲线的图表数据接口
export const getCurvesDataListApi = (data: CurveDataListReq): Promise<tCurveDataListRes> => {
  return getApi(curvesUrl.get_curve_data, data);
};

// 获取曲线信息数据
export const getAnalysisCurveResultApi = (entity_id: string): Promise<tAnalysisCurveResultRes> => {
  return getApi(curvesUrl.get_tightening_result, { entity_id });
};

// 下载曲线
export const downloadCurveFileApi = async (
  params: {
    entity_ids: string[];
    bolt_name?: string;
    filter?: string; // [{"field":"tightening_result","operator":"=","value":"ok"}]
    orderBy?: string; // ['control_time desc','result asc']
  },
  config?: AxiosRequestConfig,
  fileName?: string
) => {
  const res = await getApi(
    curvesUrl.download_tightening_result,
    { ...params },
    {
      responseType: 'blob',
      timeout: 86400000, // 一天
      ...config
    }
  );
  download(res, fileName || 'tightening_results.zip');
};

// 获取统计分析页面散点图数据
export const getScatterDataApi = (params: ScatterDataReq): Promise<tScatterDataRes> => {
  return getApi(curvesUrl.get_scatter_data, params);
};
