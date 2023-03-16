import { useToast } from 'primevue/usetoast';
import { computed, reactive, ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { randomHexColorList } from '/@/utils/math';
import { downloadCurveFileApi, getCurvesDataListApi } from '/@/api/httpRequest/curves';
import { getDateRange } from '/@/utils/date';
import { fuzzyQueryApi } from '/@/api/httpRequest/common';
import { ToastSeverity } from 'primevue/api';
import { getReferenceCurvesApi } from '/@/api/httpRequest/box';
import { useDownloadStore } from '/@/store/modules/download';
import { onlyFirstElementToShow } from '/@/constant/common';
// 找到最大的Y轴数据对应的X轴的数值
const findMaxX = (baseArr) => {
    try {
        let maxY = baseArr[0][0];
        let maxX = baseArr[0][1];
        for (let i = 1; i < baseArr.length; i++) {
            if (maxY < baseArr[i][1]) {
                maxY = baseArr[i][1];
                maxX = baseArr[i][0];
            }
        }
        return maxX;
    }
    catch (e) {
        console.error('曲线数据异常', e);
        return 0;
    }
};
// 随机获取有曲线数据的曲线
const getBaseArrData = (arr) => {
    try {
        return arr?.find((c) => c.curve_data.length > 0)?.curve_data || [];
    }
    catch (e) {
        console.error('处理曲线数据异常', e);
        return [];
    }
};
// 随机获取参考贴合点曲线
const getBaseArrDataAndSung = (arr) => {
    try {
        return arr?.find((c) => c.sungData !== null && c.curve_data.length > 0) || undefined;
    }
    catch (e) {
        console.error('处理曲线数据异常', e);
    }
};
export function useCurveList() {
    const toast = useToast();
    const downloadStore = useDownloadStore();
    const { addDownloadItem, updateDownloadItem } = downloadStore;
    const colors = ref(randomHexColorList(10));
    const curves = ref([]);
    const curveIndexMap = new Map();
    const pageSize = ref(10);
    const pageNo = ref(0);
    const total = ref(0);
    const isSelectedAll = ref(false);
    const selectedCurves = ref([]);
    const isCheckedAll = ref(false);
    const customToolTipInfoList = ref([]);
    const curveData = ref([]);
    const showReferenceCurve = ref(false);
    const referenceCurveInfo = reactive({
        entity_id: '',
        is_reference_curve: false,
        name: ''
    });
    const toggleSelectedAll = () => {
        isSelectedAll.value = true;
    };
    const getReferenceCurve = (bolt_name) => {
        getReferenceCurvesApi({ bolt_name }).then((res) => {
            referenceCurveInfo.entity_id = res.data.entity_id;
            referenceCurveInfo.is_reference_curve = res.data.is_reference_curve;
            referenceCurveInfo.name = '参考曲线_';
        });
    };
    watch(showReferenceCurve, () => {
        getCharts();
    });
    const curveIdList = computed(() => {
        if (showReferenceCurve.value) {
            return [referenceCurveInfo.entity_id, ...selectedCurves.value];
        }
        else {
            return selectedCurves.value.filter((id) => id !== referenceCurveInfo.entity_id);
        }
    });
    // 勾选曲线直接进行曲线图表的渲染
    watchDebounced(() => selectedCurves.value, () => {
        getCharts();
    }, { debounce: 500 });
    const calcSeries = (id, val, markLine) => {
        const name = referenceCurveInfo.name;
        const entityId = referenceCurveInfo.entity_id;
        const idx = curveIndexMap.get(id);
        const curve = curveData.value?.find((c) => c.entity_id === id);
        let data = {
            index: idx,
            data: curve?.curve_data?.map((arr) => {
                return {
                    value: [arr[0] + val, arr[1]],
                    tighteningResult: curve.tightening_result,
                    analysisResult: curve.analysis_result_state
                };
            }),
            name: entityId === id ? `${name}${id}` : id,
            type: 'line',
            // symbol: 'emptyCircle',
            showSymbol: false,
            smooth: true,
            emphasis: {
                focus: 'series'
            },
            lineStyle: { width: entityId === id ? 4 : 2 },
            color: entityId === id ? '' : typeof idx === 'number' && colors.value[idx]
        };
        if (markLine) {
            data = {
                ...data,
                markLine: {
                    animation: false,
                    silent: true,
                    label: {
                        show: true
                    },
                    symbol: 'none',
                    data: [
                        {
                            lineStyle: {
                                type: 'dashed',
                                width: 2,
                                color: '#CC8925'
                            },
                            label: { formatter: markLine.label, fontSize: 12, position: 'end' },
                            xAxis: markLine.x
                        }
                    ]
                }
            };
        }
        return data;
    };
    const baseSeries = computed(() => {
        if (curveData.value) {
            return curveData.value?.map((c) => calcSeries(c.entity_id, 0));
        }
        else {
            return [];
        }
    });
    const snugSeries = computed(() => {
        if (curveData.value) {
            const baseCurveDataArr = getBaseArrDataAndSung(curveData.value);
            const snugIndex = baseCurveDataArr?.sungData.snug_index;
            if (!baseCurveDataArr || typeof snugIndex !== 'number') {
                // 如果没有曲线数据 没有贴合点信息则无法进行贴合点计算
                toast.add({
                    severity: ToastSeverity.ERROR,
                    summary: '暂无贴合点信息',
                    detail: '选中的曲线暂无贴合点信息，无法使用贴合点对齐功能',
                    life: 10000
                });
                return [];
            }
            const baseXValue = baseCurveDataArr.curve_data[snugIndex][0];
            return curveData.value?.map((c, index) => {
                const sungIndex = c?.sungData?.snug_index;
                let xValue = baseXValue;
                if (sungIndex !== undefined) {
                    xValue = c.curve_data[sungIndex][0];
                }
                const val = baseXValue - xValue;
                if (onlyFirstElementToShow(index)) {
                    return calcSeries(c.entity_id, val, { label: '贴合点', x: baseXValue });
                }
                else {
                    return calcSeries(c.entity_id, val);
                }
            });
        }
        return [];
    });
    const peakSeries = computed(() => {
        if (curveData.value) {
            const baseCurveDataArr = getBaseArrData(curveData.value);
            const maxX = findMaxX(baseCurveDataArr);
            return curveData.value?.map((c, index) => {
                const max = findMaxX(c.curve_data);
                const val = maxX - max;
                if (onlyFirstElementToShow(index)) {
                    return calcSeries(c.entity_id, val, { label: '峰值', x: maxX });
                }
                else {
                    return calcSeries(c.entity_id, val);
                }
            });
        }
        return [];
    });
    const onTableGetData = (res) => {
        total.value = res?.data?.total;
        colors.value = randomHexColorList(pageSize.value || 10);
        curves.value = res.data.data_list.map((c, i) => ({
            index: i,
            ...c
        }));
        curveIndexMap.clear();
        curves.value.forEach((c) => {
            curveIndexMap.set(c.entity_id, c.index);
        });
    };
    const onSelected = (list) => {
        selectedCurves.value = list.map((c) => c.entity_id);
    };
    const onCheckedAllChange = (status) => {
        if (!status) {
            isSelectedAll.value = status;
        }
        isCheckedAll.value = status;
    };
    const onPageChanged = (event) => {
        pageSize.value = event.rows;
        pageNo.value = event.page;
    };
    const getCharts = async () => {
        try {
            if (curveIdList.value.length < 1) {
                curveData.value = [];
                return;
            }
            const res = await getCurvesDataListApi({
                entity_ids: curveIdList.value,
                x_label: 'cur_w',
                y_label: 'cur_m'
            });
            curveData.value = res.data?.map((c) => ({
                ...c,
                sungData: JSON.parse(c.cap_snug_features_save || 'null')
            }));
            customToolTipInfoList.value = res.data?.map((c) => [
                // { key: '拧紧结果', value: c?.tightening_result },
                // { key: '分析结果', value: c?.analysis_result_state },
                { key: '工作中心', value: c?.workcenter_code },
                { key: '追溯码', value: c?.track_no },
                { key: '工具序列号', value: c?.attribute_equipment_no }
            ]);
        }
        catch (e) {
            toast.add({
                severity: ToastSeverity.ERROR,
                summary: '获取曲线数据失败',
                detail: e.message,
                life: 10000
            });
        }
    };
    const downloadCurvesFile = (reqData) => {
        try {
            let params = {
                entity_ids: selectedCurves.value,
                ...reqData
            };
            if (selectedCurves.value?.length < 1) {
                toast.add({
                    severity: ToastSeverity.WARN,
                    summary: '请勾选需要下载的曲线',
                    detail: '',
                    life: 10000
                });
                return;
            }
            if (isSelectedAll.value) {
                params = {
                    entity_ids: [],
                    ...reqData
                };
            }
            const id = new Date().getTime();
            const time = new Date().toLocaleString('chinese', { hour12: false });
            const file = `拧紧结果_${time}.zip`;
            const onDownloadProgress = (progressEvent) => {
                updateDownloadItem({
                    loaded: progressEvent.loaded,
                    total: progressEvent.total,
                    id,
                    file,
                    progress: Number(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2)),
                    status: progressEvent.loaded === progressEvent.total ? 'done' : 'downloading'
                });
            };
            addDownloadItem({ loaded: 0, total: 0, file, progress: 0, status: 'downloading', id });
            downloadCurveFileApi(params, { onDownloadProgress }, file);
        }
        catch (e) {
            toast.add({
                severity: ToastSeverity.ERROR,
                summary: '下载曲线失败',
                detail: e.message,
                life: 10000
            });
        }
    };
    return {
        downloadCurvesFile,
        onTableGetData,
        onSelected,
        onPageChanged,
        getCharts,
        onCheckedAllChange,
        isCheckedAll,
        curves,
        colors,
        total,
        pageSize,
        isSelectedAll,
        toggleSelectedAll,
        selectedCurves,
        customToolTipInfoList,
        baseSeries,
        peakSeries,
        snugSeries,
        getReferenceCurve,
        showReferenceCurve,
        referenceCurveInfo
    };
}
// export enum valueEnum {
//   ok = 'OK',
//   nok = 'NOK',
//   snug_align = '贴合点对齐',
//   p_value_align = '峰值对齐'
// }
export const valueEnum = Object.freeze({
    ok: 'OK',
    nok: 'NOK',
    snug_align: '贴合点对齐',
    p_value_align: '峰值对齐'
});
// export enum operatorEnum {
//   '>=' = '大于',
//   '<=' = '小于',
//   '=' = '等于',
//   'like' = '包含',
//   'not like' = '不包含'
// }
export const operatorEnum = Object.freeze({
    '>=': '大于',
    '<=': '小于',
    '=': '等于',
    like: '包含',
    'not like': '不包含'
});
// export enum fieldEnum {
//   bolt_name = '螺栓编号',
//   control_time = '拧紧时间',
//   tightening_process_no = '程序号',
//   tightening_result = '拧紧结果',
//   track_no = '追溯码',
//   workcenter_code = '工作中心',
//   align_type = '对齐方式'
// }
export const fieldEnum = Object.freeze({
    bolt_name: '螺栓编号',
    control_time: '拧紧时间',
    tightening_process_no: '程序号',
    tightening_result: '拧紧结果',
    track_no: '追溯码',
    workcenter_code: '工作中心',
    align_type: '对齐方式'
});
export function useQuery(defaultFilterParams) {
    const toast = useToast();
    const queryFieldList = [
        {
            label: '追溯码',
            value: 'track_no'
        },
        {
            label: '工作中心',
            value: 'workcenter_code'
        },
        {
            label: '程序号',
            value: 'tightening_process_no'
        }
    ];
    const queryDomainList = [
        {
            label: '等于',
            value: '='
        },
        {
            label: '包含',
            value: 'like'
        },
        {
            label: '不包含',
            value: 'not like'
        }
    ];
    const queryItem = ref({ field: '', operator: '', value: '' });
    const suggestions = ref([]);
    const order = ref(['control_time desc']); // 默认按照拧紧时间倒叙
    const onSortChanged = (data) => {
        let orderBy = data.sortField;
        if (data.sortOrder) {
            orderBy += ` ${data.sortOrder}`;
        }
        order.value = [orderBy];
    };
    const getDefaultFilterList = () => {
        const list = [];
        if (!defaultFilterParams) {
            return list;
        }
        const { tightening_result, align_type, date } = defaultFilterParams;
        if (tightening_result) {
            list.push({ field: 'tightening_result', operator: '=', value: tightening_result, id: 1 });
        }
        if (align_type) {
            list.push({ field: 'align_type', operator: '=', value: align_type, id: 2 });
        }
        if (date) {
            if (date[0]) {
                list.push({ field: 'align_type', operator: '=', value: date[0], id: 3 });
            }
            if (date[1]) {
                list.push({ field: 'align_type', operator: '=', value: date[1], id: 4 });
            }
        }
        return list;
    };
    const filterList = ref(getDefaultFilterList());
    const filterParams = reactive({
        tightening_result: defaultFilterParams?.tightening_result || '',
        align_type: defaultFilterParams?.align_type || '',
        date: defaultFilterParams?.date || []
    });
    const filterListStr = computed(() => {
        return JSON.stringify(filterList.value
            .map((e) => ({ field: e.field, operator: e.operator, value: e.value }))
            .filter((e) => e.field !== 'align_type'));
    });
    const filterStr = computed(() => {
        return JSON.stringify(filterList.value.map((e) => ({ field: e.field, operator: e.operator, value: e.value })));
    });
    const setDateRange = (day, isBefore = true) => {
        filterParams.date = getDateRange(new Date(), day, isBefore);
    };
    const searchFieldValue = async (event) => {
        try {
            const data = event.query.trim();
            if (data.length) {
                const res = await fuzzyQueryApi(queryItem.value.field, data, 'onesphere_tightening_result');
                suggestions.value = res.data;
            }
        }
        catch (e) {
            toast.add({
                severity: ToastSeverity.ERROR,
                summary: `${queryItem.value.field}信息获取失败`,
                detail: e.message,
                life: 10000
            });
        }
    };
    const onRemoveChip = (id) => {
        const { field, value } = filterList.value.find((e) => e.id === id) || {};
        if (field === 'tightening_result') {
            filterParams.tightening_result = '';
        }
        if (field === 'align_type') {
            filterParams.align_type = '';
        }
        if (field === 'control_time') {
            filterParams.date = filterParams.date.filter((date) => date !== value);
        }
        filterList.value = filterList.value.filter((e) => e.id !== id);
    };
    const resetFilter = () => {
        filterList.value = [];
        filterParams.tightening_result = '';
        filterParams.align_type = '';
        filterParams.date = [];
    };
    const isExist = () => {
        return filterList.value.find((e) => e.field === queryItem.value.field && e.operator === queryItem.value.operator);
    };
    const addFilter = () => {
        const values = Object.values(queryItem.value);
        if (values.some((val) => !val)) {
            // 如果没有填完参数不能添加数据
            return;
        }
        if (isExist()) {
            // 如果存在该元素就直接修改元素的value
            const index = filterList.value.findIndex((e) => e.field === queryItem.value.field);
            filterList.value[index].value = queryItem.value.value;
        }
        else {
            filterList.value.push({
                ...queryItem.value,
                id: new Date().getTime()
            });
        }
        queryItem.value = { field: '', operator: '', value: '' };
    };
    const onSendFilterList = (obj) => {
        filterList.value = filterList.value.concat(obj);
    };
    watch(() => filterParams.align_type, (value) => {
        queryItem.value = { field: 'align_type', operator: '=', value };
        addFilter();
    });
    watch(() => filterParams.tightening_result, (value) => {
        queryItem.value = { field: 'tightening_result', operator: '=', value };
        addFilter();
    });
    watch(() => filterParams.date, (value) => {
        filterList.value = filterList.value.filter((item) => {
            return item.field !== 'control_time';
        });
        if (value[0]) {
            queryItem.value = { field: 'control_time', operator: '>=', value: value[0] };
            addFilter();
        }
        if (value[1]) {
            queryItem.value = { field: 'control_time', operator: '<=', value: value[1] };
            addFilter();
        }
    });
    return {
        resetFilter,
        setDateRange,
        addFilter,
        suggestions,
        searchFieldValue,
        queryFieldList,
        queryDomainList,
        queryItem,
        onRemoveChip,
        filterList,
        onSendFilterList,
        filterParams,
        filterListStr,
        filterStr,
        onSortChanged,
        order
    };
}
export function useDialog() {
    const showDialog = ref(false);
    const closeDialog = () => {
        showDialog.value = false;
    };
    //子组件传递的方法，关闭弹窗
    const onCancel = (val) => {
        showDialog.value = val;
    };
    const onConfirm = (val) => {
        showDialog.value = val;
    };
    const openDialog = () => {
        showDialog.value = true;
    };
    return {
        showDialog,
        closeDialog,
        onCancel,
        openDialog,
        onConfirm
    };
}
