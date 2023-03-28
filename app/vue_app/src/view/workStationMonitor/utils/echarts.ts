import { CurvesColorEnum, CurvesUnitEnum } from '../constant/curves';
import { graphic } from 'echarts';
import type { tProbaResult, tTighteningResult } from '/@/api/types/curves';
import { getX } from '/@/utils/math';
import type { tSeriesData } from '/@/types/chart';

export type tFormatterParams<DataType> = {
  componentType: 'series';
  // 系列类型
  seriesType: string;
  // 系列在传入的 option.series 中的 index
  seriesIndex: number;
  // 系列名称
  seriesName: string;
  // 数据名，类目名
  name: string;
  // 数据在传入的 data 数组中的 index
  dataIndex: number;
  // 传入的原始数据项
  data: DataType | Object | any;
  // 传入的数据值。在多数系列下它和 data 相同。在一些系列下是 data 中的分量（如 map、radar 中）
  value: Array<any>;
  // 坐标轴 encode 映射信息，
  // key 为坐标轴（如 'x' 'y' 'radius' 'angle' 等）
  // value 必然为数组，不会为 null/undefied，表示 dimension index 。
  // 其内容如：
  // {
  //     x: [2] // dimension index 为 2 的数据映射到 x 轴
  //     y: [0] // dimension index 为 0 的数据映射到 y 轴
  // }
  encode: Object;
  // 维度名列表
  dimensionNames: Array<string>;
  // 数据的维度 index，如 0 或 1 或 2 ...
  // 仅在雷达图中使用。
  dimensionIndex: number;
  // 数据图形的颜色
  color: string;
};

const customToolTipFormatter = (customToolTipInfo: Array<{ key: string; value: any }>) => {
  let htmlStr = '';
  if (customToolTipInfo?.length > 0) {
    for (let i = 0; i < customToolTipInfo?.length; i += 1) {
      htmlStr += `${customToolTipInfo[i].key}: ${customToolTipInfo[i].value}<br />`;
    }
  }
  return htmlStr;
};

// tooltip组件自定义样式
export function tooltipFormatter(
  params: tFormatterParams<any>[],
  customToolTipInfoList?: Array<Array<{ key: string; value: any }>>,
  isStatisticalAnalysis?: boolean | undefined
) {
  let str = '';
  for (let i = 0; i < params.length; i += 1) {
    const { seriesName, value, data } = params[i];
    str += `
           <div style="display: flex; align-items: center; width: 100%">
             <div style="background: ${params[i].color}; height: 10px; width: 10px; border-radius: 50%"></div>
             <div style="font-weight: 700">${seriesName}</div>
           </div>
            扭矩: ${value[1]} ${CurvesUnitEnum.torque}
      <br />角度: ${value[0]} ${CurvesUnitEnum.angle}
      <br />拧紧结果: ${data.tighteningResult}
      <br />分析结果: ${data.analysisResult}<br />`;
    if (customToolTipInfoList) {
      str += customToolTipFormatter(customToolTipInfoList[i]);
    }
  }
  const yAxisDataList = params?.map((e) => e.value[1]);
  if (isStatisticalAnalysis && yAxisDataList?.length > 1) {
    const { avg, std } = getX(yAxisDataList);
    str += `<br /><div style="color: #f6d544">均值: ${avg}</div>
                  <div style="color: #f6d544">标准差: ${std}</div><br />`;
  }
  return str;
}

type tMarkLineRange = {
  max: number | null | undefined;
  min: number | null | undefined;
  target: number | null | undefined;
};

type tMarkLine = {
  x?: tMarkLineRange;
  y?: tMarkLineRange;
};

type tMarkPointData = { clamp_angle: number; clamp_torque: number; xAxis: number; yAxis: number };

const markLabelMap = {
  max: '最大',
  min: '最小',
  target: '目标'
};
const scatterMarkLabelMap = {
  max: 'UCL',
  min: 'LCL',
  target: 'CL'
};

export function seriesLineFormatter(
  idx: number,
  data: tSeriesData,
  name: string,
  resultType: tTighteningResult | 'default',
  showArea?: boolean,
  markLine?: tMarkLine,
  markPointData?: tMarkPointData[]
) {
  let seriesData: any = {
    index: idx,
    data,
    name,
    type: 'line',
    showSymbol: false,
    smooth: true,
    color: CurvesColorEnum[resultType]
  };
  if (showArea) {
    seriesData = {
      ...seriesData,
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: CurvesColorEnum[resultType || 'default']
          },
          {
            offset: 1,
            color: '#fff'
          }
        ])
      }
    };
  }
  if (markLine) {
    const markData: any[] = [];
    if (markLine.x) {
      (Object.keys(markLine.x) as ['max', 'target', 'min']).forEach((key) => {
        markData.push({
          name: key,
          lineStyle: {
            type: key === 'target' ? 'dashed' : 'solid', // 目标值虚线，其他值实线
            width: key === 'target' ? 2 : 1,
            color: '#CC8925'
          },
          label: { formatter: `${markLabelMap[key]} {c}`, fontSize: 12, position: 'insideEndTop' },
          xAxis: markLine?.x ? markLine?.x[key] : 0
        });
      });
    }
    if (markLine.y) {
      (Object.keys(markLine.y) as ['max', 'target', 'min']).forEach((key) => {
        markData.push({
          name: key,
          lineStyle: {
            type: key === 'target' ? 'dashed' : 'solid', // 目标值虚线，其他值实线
            width: key === 'target' ? 2 : 1,
            color: '#CC8925'
          },
          label: { formatter: `${markLabelMap[key]} {c}`, fontSize: 12, position: 'insideEndTop' },
          yAxis: markLine?.y ? markLine?.y[key] : 0
        });
      });
    }
    seriesData = {
      ...seriesData,
      markLine: {
        animation: false,
        silent: true, // 不响应鼠标事件
        label: {
          show: true
        },
        symbol: 'none', // 去掉线最后面的箭头
        data: markData
      }
    };
  }
  if (markPointData) {
    seriesData = {
      ...seriesData,
      markPoint: {
        symbolSize: 190,
        symbolOffset: [0, '-30%'],
        symbolKeepAspect: true,
        symbol:
          'path://M14,0 L132,0 C139.731986,-1.42034288e-15 146,6.2680135 146,14 L146,63 C146,70.7319865 139.731986,77 132,77 L77,77 L77,77 L73,85 L69,77 L14,77 C6.2680135,77 9.46895252e-16,70.7319865 0,63 L0,14 C-9.46895252e-16,6.2680135 6.2680135,1.42034288e-15 14,0 Z',
        label: {
          show: true,
          position: 'insideTop',
          offset: [0, 5],
          formatter: function (params: any) {
            return `{label|夹紧扭矩: ${params.data.clamp_torque} ${CurvesUnitEnum.torque}}\n{label|夹紧角度: ${params.data.clamp_angle} ${CurvesUnitEnum.angle}}\n{label|扭矩: ${params.data.yAxis} ${CurvesUnitEnum.torque}}\n{label|角度: ${params.data.xAxis} ${CurvesUnitEnum.angle}}`;
          },
          fontSize: 14,
          rich: {
            label: {
              fontWeight: 'bold',
              height: 20,
              fontSize: 14
            }
          }
        },
        itemStyle: {
          // borderColor: '#000',
          color: '#fff',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 2
        },
        data: markPointData
      }
    };
  }

  return seriesData;
}

export function seriesScatterFormatter(
  data: Array<{
    entity_id: string;
    tightening_result: tTighteningResult;
    value: Array<[number, number]>;
  }>,
  name: string,
  markLine?: tMarkLine
) {
  const formatterData = data.map((e) => {
    return {
      id: e.entity_id,
      value: e.value,
      symbolSize: 16,
      itemStyle: {
        color: CurvesColorEnum[e.tightening_result || 'default']
      }
    };
  });
  let seriesData: any = {
    data: formatterData,
    name,
    type: 'scatter',
    showSymbol: false,
    smooth: true
  };
  if (markLine) {
    const markData: any[] = [];
    if (markLine.x) {
      (Object.keys(markLine.x) as ['max', 'target', 'min']).forEach((key) => {
        markData.push({
          name: key,
          lineStyle: {
            type: key === 'target' ? 'dashed' : 'solid', // 目标值虚线，其他值实线
            width: key === 'target' ? 2 : 1,
            color: '#CC8925'
          },
          label: { formatter: `${scatterMarkLabelMap[key]} {c}`, fontSize: 12, position: 'insideEndTop' },
          xAxis: markLine?.x ? markLine?.x[key] : 0
        });
      });
    }
    if (markLine.y) {
      (Object.keys(markLine.y) as ['max', 'target', 'min']).forEach((key) => {
        markData.push({
          name: key,
          lineStyle: {
            type: key === 'target' ? 'dashed' : 'solid', // 目标值虚线，其他值实线
            width: key === 'target' ? 2 : 1,
            color: '#CC8925'
          },
          label: { formatter: `${scatterMarkLabelMap[key]} {c}`, fontSize: 12, position: 'insideEndTop' },
          yAxis: markLine?.y ? markLine?.y[key] : 0
        });
      });
    }
    seriesData = {
      ...seriesData,
      markLine: {
        animation: false,
        silent: true, // 不响应鼠标事件
        label: {
          show: true
        },
        symbol: 'none', // 去掉线最后面的箭头
        data: markData
      }
    };
  }

  return seriesData;
}

export const isShowTorqueAngle = (num: number) => {
  return num === 0;
};

export const isShowTorque = (num: number) => {
  return num === 1;
};

export const isShowAngle = (num: number) => {
  return num === 2;
};

export const getMarkLine = (torqueRange: tMarkLineRange, angleRange: tMarkLineRange, index: number) => {
  if (isShowTorqueAngle(index)) {
    return {
      y: torqueRange,
      x: angleRange
    };
  }
  if (isShowTorque(index)) {
    return {
      y: torqueRange
    };
  }
  if (isShowAngle(index)) {
    return {
      y: angleRange
    };
  }
  return undefined;
};

export function convertTo2DArray(arr1: number[], arr2: number[]) {
  if (arr1.length < 1) {
    return [];
  }
  if (arr2.length < 1) {
    return [];
  }
  const list: Array<[number, number]> = [];
  for (let i = 0; i < arr1.length; i += 1) {
    list.push([arr1[i], arr2[i]]);
  }
  return list;
}

export function getMarkPointData(data: tProbaResult, arr: Array<[number, number]>) {
  if (arr?.length < data?.snug_index) {
    throw new Error('贴合点索引大于曲线列表长度！');
  }
  return [
    {
      clamp_angle: Math.floor(data?.clamp_angle * 100) / 100,
      clamp_torque: Math.floor(data?.clamp_torque * 100) / 100,
      xAxis: arr[data?.snug_index || 0][0],
      yAxis: arr[data?.snug_index || 0][1]
    }
  ];
}
