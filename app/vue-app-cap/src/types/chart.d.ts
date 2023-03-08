import type { t2DArray } from '/@/types/global';

export type tSeriesData = Array<{ value: [number, number] }>;

export type tLineChartSeries = Array<{
  index: number; // index从0开始 作为colors数组的索引
  name: string;
  type: 'line';
  showSymbol: boolean; // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
  // symbol: 'emptyCircle' | 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'; // 标记的图形类型 默认为emptyCircle
  data: tSeriesData;
  smooth: boolean; // 是否平滑曲线显示。
  color: any;
  // 折线图的高亮状态
  emphasis?: {
    focus: 'series' | 'self' | 'none';
  };
  areaStyle?: any; // 折线图面积配置
  markLine?: any;
  lineStyle?: any; // 线条样式
}>;

export type tScatterChartSeriesData = {
  id: string;
  value: t2DArray;
  itemStyle: {
    color: string;
  };
};

export type tScatterChartSeries = Array<{
  name: string;
  type: 'scatter';
  symbolSize: number;
  // symbol: 'emptyCircle' | 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'; // 标记的图形类型 默认为emptyCircle
  data: tScatterChartSeriesData[];
  markLine?: any;
}>;

export type tStatisticalChartSeries = Array<{
  name: string;
  type: 'bar' | 'line';
  data: t2DArray; // 如果x轴是时间轴类型第一个元素为时间字符串
  color?: string;
  emphasis?: {
    focus: 'series' | 'self' | 'none';
  };
  stack?: string; // 堆叠
  label?: any;
  areaStyle?: any; // 折线图面积配置
  markLine?: any;
}>;
