import { defineStore } from 'pinia';
import store from '/@/store';

import type { Nullable } from '/@/types/global.d';
import type { UserInfo, TokenInfo } from '/@/types/store.d';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token: Nullable<TokenInfo>;
}

export const useUserStore = defineStore('cap-user', {
  state: (): UserState => ({
    userInfo: null,
    token: null
  }),
  getters: {
    userName: (state) => {
      return state?.userInfo?.username || '';
    }
  },
  actions: {
    updateToken(token: TokenInfo) {
      this.token = token;
    },
    updateUserInfo(userInfo: UserInfo) {
      this!.userInfo = userInfo;
    },
    reset() {
      this.userInfo = null;
      this.token = null;
    }
  },
  // 开启持久化
  persist: {
    enabled: true,
    strategies: [
      { key: 'user', storage: localStorage } // accessToken字段用 localstorage存储
    ]
  }
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
