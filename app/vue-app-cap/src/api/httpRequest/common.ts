import { getApi } from '/@/api/request';
import { commonUrl } from '/@/api/constant';
import type { tFuzzyQueryRes } from '/@/api/types/common';

// 模糊查询某个字段 返回该字段值的数组
export const fuzzyQueryApi = (field: string, value: string, model: string): Promise<tFuzzyQueryRes> => {
  const param = {
    field,
    value,
    model
  };
  return getApi(commonUrl.fuzzy_query, param);
};
