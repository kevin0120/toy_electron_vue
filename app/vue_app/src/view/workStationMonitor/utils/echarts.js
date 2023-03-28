import { CurvesColorEnum, CurvesUnitEnum } from '/@/constant/curves';
import { graphic } from 'echarts';
import { getX } from '/@/utils/math';
const customToolTipFormatter = (customToolTipInfo) => {
    let htmlStr = '';
    if (customToolTipInfo?.length > 0) {
        for (let i = 0; i < customToolTipInfo?.length; i += 1) {
            htmlStr += `${customToolTipInfo[i].key}: ${customToolTipInfo[i].value}<br />`;
        }
    }
    return htmlStr;
};
// tooltip组件自定义样式
export function tooltipFormatter(params, customToolTipInfoList, isStatisticalAnalysis) {
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
export function seriesLineFormatter(idx, data, name, resultType, showArea, markLine, markPointData) {
    let seriesData = {
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
        const markData = [];
        if (markLine.x) {
            Object.keys(markLine.x).forEach((key) => {
                markData.push({
                    name: key,
                    lineStyle: {
                        type: key === 'target' ? 'dashed' : 'solid',
                        width: key === 'target' ? 2 : 1,
                        color: '#CC8925'
                    },
                    label: { formatter: `${markLabelMap[key]} {c}`, fontSize: 12, position: 'insideEndTop' },
                    xAxis: markLine?.x ? markLine?.x[key] : 0
                });
            });
        }
        if (markLine.y) {
            Object.keys(markLine.y).forEach((key) => {
                markData.push({
                    name: key,
                    lineStyle: {
                        type: key === 'target' ? 'dashed' : 'solid',
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
                silent: true,
                label: {
                    show: true
                },
                symbol: 'none',
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
                symbol: 'path://M14,0 L132,0 C139.731986,-1.42034288e-15 146,6.2680135 146,14 L146,63 C146,70.7319865 139.731986,77 132,77 L77,77 L77,77 L73,85 L69,77 L14,77 C6.2680135,77 9.46895252e-16,70.7319865 0,63 L0,14 C-9.46895252e-16,6.2680135 6.2680135,1.42034288e-15 14,0 Z',
                label: {
                    show: true,
                    position: 'insideTop',
                    offset: [0, 5],
                    formatter: function (params) {
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
export function seriesScatterFormatter(data, name, markLine) {
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
    let seriesData = {
        data: formatterData,
        name,
        type: 'scatter',
        showSymbol: false,
        smooth: true
    };
    if (markLine) {
        const markData = [];
        if (markLine.x) {
            Object.keys(markLine.x).forEach((key) => {
                markData.push({
                    name: key,
                    lineStyle: {
                        type: key === 'target' ? 'dashed' : 'solid',
                        width: key === 'target' ? 2 : 1,
                        color: '#CC8925'
                    },
                    label: { formatter: `${scatterMarkLabelMap[key]} {c}`, fontSize: 12, position: 'insideEndTop' },
                    xAxis: markLine?.x ? markLine?.x[key] : 0
                });
            });
        }
        if (markLine.y) {
            Object.keys(markLine.y).forEach((key) => {
                markData.push({
                    name: key,
                    lineStyle: {
                        type: key === 'target' ? 'dashed' : 'solid',
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
                silent: true,
                label: {
                    show: true
                },
                symbol: 'none',
                data: markData
            }
        };
    }
    return seriesData;
}
export const isShowTorqueAngle = (num) => {
    return num === 0;
};
export const isShowTorque = (num) => {
    return num === 1;
};
export const isShowAngle = (num) => {
    return num === 2;
};
export const getMarkLine = (torqueRange, angleRange, index) => {
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
export function convertTo2DArray(arr1, arr2) {
    if (arr1.length < 1) {
        return [];
    }
    if (arr2.length < 1) {
        return [];
    }
    const list = [];
    for (let i = 0; i < arr1.length; i += 1) {
        list.push([arr1[i], arr2[i]]);
    }
    return list;
}
export function getMarkPointData(data, arr) {
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
