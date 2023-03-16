import { postApi } from '/@/api/request';
import { userUrl } from '/@/api/constant';
export const loginApi = (param) => {
    return postApi(userUrl.login, param);
};
