export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
}

export interface TokenInfo {
  tokenName: string;
  tokenValue: string;
  expire: number;
}

export type tDownloadItem = {
  id: number;
  total: number;
  file: string;
  loaded: number;
  progress: number;
  status: 'done' | 'downloading' | 'fail';
};

export interface downloadInfo {
  downloadList: tDownloadItem[];
}
