import { boxUrl } from '/@/api/constant';
import { getApi, postApi, putApi } from '/@/api/request';
import type {
  AnalyzeReq,
  AnalyzeResultListReq,
  BoxAnalyzeCurvesReq,
  ReferenceCurvesReq,
  tAnalyzeRes,
  tAnalyzeResultListRes,
  tBoxAnalyzeCurvesRes,
  tReferenceCurvesRes
} from '/@/api/types/box';

// 获取box分析结果列表（分页）
export const getAnalyzeResultListApi = (
  page_size: number,
  page_no: number,
  params?: AnalyzeResultListReq
): Promise<tAnalyzeResultListRes> => {
  const data = {
    page_size,
    page_no,
    count: true,
    ...params
  };
  return getApi(boxUrl.analyze_result, data);
};

// 设置参考曲线
export const setReferenceCurvesApi = (data: { bolt_name: string; entity_id: string }): Promise<tReferenceCurvesRes> => {
  return putApi(boxUrl.set_reference_curve, data);
};

// 获取参考曲线
export const getReferenceCurvesApi = (data: ReferenceCurvesReq): Promise<tReferenceCurvesRes> => {
  return getApi(boxUrl.get_reference_curve, data);
};

// 获取分析结果列表其中一条曲线
export const getBoxAnalyzeCurvesApi = (data: BoxAnalyzeCurvesReq): Promise<tBoxAnalyzeCurvesRes> => {
  return getApi(boxUrl.one_of_analyze_results, data);
};

// 进行box分析
export const boxAnalyzeApi = (data: AnalyzeReq): Promise<tAnalyzeRes> => {
  return postApi(boxUrl.analyze, data, { timeout: 25000 });
};
