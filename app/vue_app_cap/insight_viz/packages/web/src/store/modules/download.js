import { defineStore } from 'pinia';
import store from '/@/store';
export const useDownloadStore = defineStore('download', {
    state: () => ({
        downloadList: []
    }),
    getters: {
        hasItem: (state) => {
            return state.downloadList.length > 0;
        },
        status: (state) => {
            const hasAllDone = state.downloadList.every((d) => d.status === 'done');
            return hasAllDone ? 'done' : 'downloading';
        },
        doneNum: (state) => {
            const downloadedList = state.downloadList.filter((d) => d.status === 'done');
            return downloadedList.length;
        },
        totalNum: (state) => {
            return state.downloadList.length;
        },
        downloadProgress: (state) => {
            if (state.downloadList.length === 0) {
                return 0;
            }
            const loadedSize = state.downloadList.reduce((doneSize, item) => doneSize + item.loaded, 0);
            const totalSize = state.downloadList.reduce((totalSize, item) => totalSize + item.total, 0);
            return Number(((loadedSize / totalSize) * 100).toFixed(2)) || 0;
        }
    },
    actions: {
        resetStore() {
            this.downloadList = [];
        },
        addDownloadItem(item) {
            this.downloadList.push(item);
        },
        updateDownloadItem(item) {
            if (!item) {
                return;
            }
            const index = this.downloadList.findIndex((d) => d.id === item.id);
            if (index !== -1) {
                this.downloadList[index] = item;
            }
        }
    }
});
export function useDownloadStoreWithOut() {
    return useDownloadStore(store);
}
