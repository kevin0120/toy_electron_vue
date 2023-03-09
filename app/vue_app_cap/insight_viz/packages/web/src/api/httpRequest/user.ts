import { postApi } from '/@/api/request';
import { userUrl } from '/@/api/constant';
import type { UserInfo, TokenInfo } from '/@/types/store';
import type { IRes } from '/@/api/types/common';

export type tLoginRes = {
  token: TokenInfo;
  userinfo: UserInfo;
};

export const loginApi = (param: { username: string; password: string }): Promise<IRes<tLoginRes>> => {
  return postApi(userUrl.login, param);
};
