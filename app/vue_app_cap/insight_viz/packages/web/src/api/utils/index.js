import { CurvesColorEnum } from '/@/constant/curves';
export function dataToFormData(data) {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
        formData.append(k, data[k]);
    });
    return formData;
}
export function nokResultsGroupDataFormatter(arr) {
    const errTypeList = [...new Set(arr.map((e) => e.error_code))];
    const dataMap = errTypeList.reduce((obj, item) => {
        obj[item] = [];
        return obj;
    }, {});
    const timeList = [...new Set(arr.map((e) => e.bucket_time))];
    timeList.forEach((e) => {
        errTypeList.forEach((errCode) => {
            const found = arr.find((data) => data.bucket_time === e && data.error_code === errCode);
            if (found) {
                dataMap[errCode].push([e, found.count]);
            }
            else {
                dataMap[errCode].push([e, 0]);
            }
        });
    });
    const series = errTypeList.map((errCode) => ({
        name: errCode,
        type: 'bar',
        stack: 'total',
        label: {
            show: true
        },
        emphasis: {
            focus: 'series'
        },
        data: dataMap[errCode]
    }));
    return series;
}
export function resultGroupByErrorDataFormatter(arr) {
    const data = arr.map((obj) => [obj.error_code, obj.count]);
    const series = [
        {
            name: '异常拧紧结果',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data
        }
    ];
    return series;
}
export function resultsTrendDataFormatter(arr, result) {
    const data = arr.map((obj) => [obj.bucket_time, obj.percent * 100]);
    const series = [
        {
            name: result === 'ok' ? '合格拧紧结果占比' : '异常拧紧结果占比',
            type: 'line',
            color: CurvesColorEnum[result],
            label: {
                show: true,
                position: 'top'
            },
            emphasis: {
                focus: 'series'
            },
            areaStyle: {
                color: CurvesColorEnum[result]
            },
            data
        }
    ];
    return series;
}
