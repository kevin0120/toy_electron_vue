import { getApi } from '/@/api/request';
import { commonUrl } from '/@/api/constant';
// 模糊查询某个字段 返回该字段值的数组
export const fuzzyQueryApi = (field, value, model) => {
    const param = {
        field,
        value,
        model
    };
    return getApi(commonUrl.fuzzy_query, param);
};
