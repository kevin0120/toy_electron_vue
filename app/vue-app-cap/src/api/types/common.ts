export interface IRes<D> {
  type: string;
  code: number;
  data: D | any;
}

export interface IErrRes {
  error?: {
    code: number;
    message: string;
    target: string;
  };
}

export interface IPagination<D> {
  total: number;
  data_list: Array<D | any>;
}

export type tFilterParams = {
  track_no?: string; // 追溯码
  workcenter_code?: string; // 工位号
  control_time?: {
    start_time: string; // 开始时间
    end_time: string; // 结束时间
  };
  tightening_result?: 'ok' | 'nok'; // 拧紧结果
};

export type tFuzzyQueryRes = IRes<string[]>;
