import { describe, expect, it } from 'vitest';
import {
  type tFormatterParams,
  tooltipFormatter,
  seriesLineFormatter,
  isShowTorqueAngle,
  isShowAngle,
  isShowTorque,
  getMarkLine,
  convertTo2DArray,
  getMarkPointData
} from '../echarts';
import type { tProbaResult } from '/@/api/types/curves';
import type { tSeriesData } from '/@/types/chart';

describe('Test tooltipFormatter function', () => {
  const params: tFormatterParams<any>[] = [
    {
      componentType: 'series',
      seriesType: 'bar',
      seriesIndex: 0,
      seriesName: '参考曲线',
      name: 'Milk Tea',
      dataIndex: 1,
      value: [12, 800],
      encode: {},
      dimensionNames: [],
      dimensionIndex: 0,
      data: { error_code: 'Milk Tea', count: 83.1 },
      color: '#5470c6'
    },
    {
      componentType: 'series',
      seriesType: 'bar',
      seriesIndex: 0,
      seriesName: '参考曲线',
      name: 'Milk Tea',
      dataIndex: 1,
      value: [12, 802],
      encode: {},
      dimensionNames: [],
      dimensionIndex: 0,
      data: { error_code: 'Milk Tea', count: 83.1 },
      color: '#5470c6'
    }
  ];
  const customToolTipInfoList = [
    [
      {
        key: '最大扭矩',
        value: 12
      }
    ]
  ];
  it('Return value snapshot when a parameter is passed in', () => {
    expect(tooltipFormatter(params)).toMatchSnapshot();
  });
  it('Return value snapshot when two parameters are passed in', () => {
    expect(tooltipFormatter(params, customToolTipInfoList)).toMatchSnapshot();
  });
  it('Return value snapshot when three parameters are passed in', () => {
    expect(tooltipFormatter(params, customToolTipInfoList, true)).toMatchSnapshot();
  });
});

describe('Test seriesLineFormatter function', () => {
  const index = 1;
  const data: tSeriesData = [{ value: [0, 1] }, { value: [1, 1] }, { value: [2, 3] }];
  const name = '测试数据';
  const showArea = true;
  const markLine = {
    x: {
      max: 10,
      target: 8,
      min: 6
    },
    y: {
      max: 10,
      target: 8,
      min: 6
    }
  };
  const markPointData = [{ clamp_angle: 3, clamp_torque: 2, xAxis: 2, yAxis: 3 }];
  it('Ok Snapshot of tightening results basic configuration data', () => {
    expect(seriesLineFormatter(index, data, name, 'ok')).toMatchSnapshot();
  });
  it('Ok Snapshot of tightening results basic configuration data 1', () => {
    expect(seriesLineFormatter(index, data, name, 'ok', showArea)).toMatchSnapshot();
  });
  it('Ok Snapshot of tightening results basic configuration data 2', () => {
    expect(seriesLineFormatter(index, data, name, 'ok', showArea, markLine)).toMatchSnapshot();
  });
  it('Ok Snapshot of tightening results basic configuration data 3', () => {
    expect(seriesLineFormatter(index, data, name, 'ok', showArea, markLine, markPointData)).toMatchSnapshot();
  });
});

describe('Test isShowTorqueAngle , isShowAngle, isShowTorque function', () => {
  it('should ShowTorqueAngle', function () {
    expect(isShowTorqueAngle(0)).toBeTruthy();
  });
  it('should ShowTorque', function () {
    expect(isShowTorque(1)).toBeTruthy();
  });
  it('should ShowAngle', function () {
    expect(isShowAngle(2)).toBeTruthy();
  });
});

describe('Test getMarkLine function', () => {
  const x = {
    max: 10,
    target: 8,
    min: 6
  };
  const y = {
    max: 10,
    target: 8,
    min: 6
  };
  const errIndex = 4;
  it('No data display ', () => {
    expect(getMarkLine(x, y, errIndex)).toBeUndefined();
  });
  it('should toEqual ShowTorqueAngle data', () => {
    expect(getMarkLine(x, y, 0)).toEqual({ x, y });
  });
  it('should toEqual ShowTorque data', () => {
    expect(getMarkLine(x, y, 1)).toEqual({ y });
  });
  it('should toEqual ShowAngle data', () => {
    expect(getMarkLine(x, y, 2)).toEqual({ y });
  });
});

describe('Test convertTo2DArray function', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  const len = arr1.length;
  it('should have [1,4] ', function () {
    expect(convertTo2DArray(arr1, arr2)).toContainEqual([1, 4]);
  });
  it('toHaveLength', function () {
    expect(convertTo2DArray(arr1, arr2)).toHaveLength(len);
  });
  it('toHaveLength 0', function () {
    expect(convertTo2DArray([], arr2)).toHaveLength(0);
  });
  it('toHaveLength 0', function () {
    expect(convertTo2DArray(arr1, [])).toHaveLength(0);
  });
});

describe('Test getMarkPointData function', () => {
  const arr1: Array<[number, number]> = [
    [1, 1],
    [2, 2],
    [3, 3]
  ];
  const data: tProbaResult = {
    analysis_result_state: 'ok',
    entity_id: '123456',
    clamp_torque: 1,
    clamp_angle: 1,
    snug_index: 2,
    snug_angle: 1,
    snug_torque: 1
  };
  it('should toContainEqual', function () {
    expect(getMarkPointData(data, arr1)).toContainEqual({
      clamp_angle: 1,
      clamp_torque: 1,
      xAxis: 3,
      yAxis: 3
    });
  });
});
