import { defineStore } from 'pinia';
import store from '/@/store';
export const useUserStore = defineStore('cap-user', {
    state: () => ({
        userInfo: null,
        token: null
    }),
    getters: {
        userName: (state) => {
            return state?.userInfo?.username || '';
        }
    },
    actions: {
        updateToken(token) {
            this.token = token;
        },
        updateUserInfo(userInfo) {
            this.userInfo = userInfo;
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
