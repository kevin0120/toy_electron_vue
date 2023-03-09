import { defineStore } from 'pinia';
import store from '/@/store';
import type { downloadInfo, tDownloadItem } from '/@/types/store';

export const useDownloadStore = defineStore('download', {
  state: (): downloadInfo => ({
    downloadList: []
  }),
  getters: {
    hasItem: (state): boolean => {
      return state.downloadList.length > 0;
    },
    status: (state) => {
      const hasAllDone = state.downloadList.every((d) => d.status === 'done');
      return hasAllDone ? 'done' : 'downloading';
    },
    doneNum: (state): number => {
      const downloadedList = state.downloadList.filter((d) => d.status === 'done');
      return downloadedList.length;
    },
    totalNum: (state): number => {
      return state.downloadList.length;
    },
    downloadProgress: (state): number => {
      if (state.downloadList.length === 0) {
        return 0;
      }
      const loadedSize = state.downloadList.reduce((doneSize: number, item) => doneSize + item.loaded, 0);
      const totalSize = state.downloadList.reduce((totalSize: number, item) => totalSize + item.total, 0);
      return Number(((loadedSize / totalSize) * 100).toFixed(2)) || 0;
    }
  },
  actions: {
    resetStore() {
      this.downloadList = [];
    },
    addDownloadItem(item: tDownloadItem) {
      this.downloadList.push(item);
    },
    updateDownloadItem(item: tDownloadItem) {
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
