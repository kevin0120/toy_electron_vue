import { useToast } from 'primevue/usetoast';
import { computed, reactive, ref, watch } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { randomHexColorList } from '/@/utils/math';
import type { CurveListReq, tCurveInfo, tCurveListRes, tCurveData } from '/@/api/types/curves';
import type { tLineChartSeries } from '/@/types/chart';
import { downloadCurveFileApi, getCurvesDataListApi } from '/@/api/httpRequest/curves';
import { getDateRange } from '/@/utils/date';
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete';
import { fuzzyQueryApi } from '/@/api/httpRequest/common';
import { ToastSeverity } from 'primevue/api';
import { getReferenceCurvesApi } from '/@/api/httpRequest/box';
import { useDownloadStore } from '/@/store/modules/download';
import { onlyFirstElementToShow } from '/@/constant/common';
import type { tSnugData } from '/@/api/types/curves';

const findMaxX = (baseArr: Array<[number, number]>) => {
  try {
    if (!baseArr[0][0]) {
      return 0;
    }
    let maxY = baseArr[0][0];
    let maxX = baseArr[0][1];
    for (let i = 1; i < baseArr.length; i++) {
      maxY = maxY > baseArr[i][0] ? maxY : baseArr[i][0];
      maxX = maxY > baseArr[i][0] ? maxY : baseArr[i][1];
    }
    return maxX;
  } catch (e: any) {
    console.error('曲线数据异常', e);
    return 0;
  }
};

const getBaseArrData = (arr: tCurveData[]) => {
  try {
    return arr?.find((c) => c.curve_data.length > 0)?.curve_data || [];
  } catch (e: any) {
    console.error('处理曲线数据异常', e);
    return [];
  }
};

const getBaseSungData = (arr: Array<tCurveData & { sungData: tSnugData }>) => {
  try {
    return arr?.find((c) => c.sungData !== null)?.sungData || undefined;
  } catch (e: any) {
    console.error('处理曲线数据异常', e);
  }
};

export function useCurveList() {
  const toast = useToast();
  const downloadStore = useDownloadStore();
  const { addDownloadItem, updateDownloadItem } = downloadStore;
  const colors = ref(randomHexColorList(10));
  const curves = ref<Array<tCurveInfo & { index: number }>>([]);
  const curveIndexMap: Map<string, number> = new Map();
  const pageSize = ref(10);
  const pageNo = ref(0);
  const total = ref(0);
  const isSelectedAll = ref(false);
  const selectedCurves = ref<string[]>([]);
  const isCheckedAll = ref<boolean>(false);
  const customToolTipInfoList = ref<Array<Array<{ key: string; value: any }>>>([]);
  const curveData = ref<Array<tCurveData & { sungData: tSnugData }>>([]);

  const showReferenceCurve = ref<boolean>(false);
  const referenceCurveInfo = reactive({
    entity_id: '',
    is_reference_curve: false,
    name: ''
  });

  const toggleSelectedAll = () => {
    isSelectedAll.value = true;
  };

  const getReferenceCurve = (bolt_name: string) => {
    getReferenceCurvesApi({ bolt_name }).then((res) => {
      referenceCurveInfo.entity_id = res.data.entity_id;
      referenceCurveInfo.is_reference_curve = res.data.is_reference_curve;
      referenceCurveInfo.name = '参考曲线_';
    });
  };
  watch(showReferenceCurve, () => {
    getCharts();
  });

  const curveIdList = computed<Array<string>>(() => {
    if (showReferenceCurve.value) {
      return [referenceCurveInfo.entity_id, ...selectedCurves.value];
    } else {
      return selectedCurves.value.filter((id) => id !== referenceCurveInfo.entity_id);
    }
  });

  // 勾选曲线直接进行曲线图表的渲染
  watchDebounced(
    () => selectedCurves.value,
    () => {
      getCharts();
    },
    { debounce: 500 }
  );

  const calcSeries = (id: string, val: number, markLine?: { label: string; x: number }) => {
    const name = referenceCurveInfo.name;
    const entityId = referenceCurveInfo.entity_id;
    const idx = curveIndexMap.get(id);
    const curve = curveData.value?.find((c) => c.entity_id === id);
    let data: any = {
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
          silent: true, // 不响应鼠标事件
          label: {
            show: true
          },
          symbol: 'none', // 去掉线最后面的箭头
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

  const baseSeries = computed<tLineChartSeries>(() => {
    if (curveData.value) {
      return curveData.value?.map((c) => calcSeries(c.entity_id, 0)) as tLineChartSeries;
    } else {
      return [];
    }
  });

  const snugSeries = computed<tLineChartSeries>(() => {
    if (curveData.value) {
      const baseCurveDataArr = getBaseArrData(curveData.value);
      const baseSungIndex = getBaseSungData(curveData.value)?.snug_index;
      if (baseSungIndex === undefined) {
        toast.add({
          severity: ToastSeverity.ERROR,
          summary: '暂无贴合点信息',
          detail: '选中的曲线暂无贴合点信息，无法使用贴合点对齐功能',
          life: 10000
        });
        return [];
      }
      const baseXValue: number = baseCurveDataArr[baseSungIndex][0];
      return curveData.value?.map((c, index) => {
        const sungIndex = c?.sungData?.snug_index;
        let xValue = baseXValue;
        if (sungIndex !== undefined) {
          xValue = c.curve_data[sungIndex][0];
        }
        const val = baseXValue - xValue;
        if (onlyFirstElementToShow(index)) {
          return calcSeries(c.entity_id, val, { label: '贴合点', x: baseXValue });
        } else {
          return calcSeries(c.entity_id, val);
        }
      }) as tLineChartSeries;
    }
    return [];
  });

  const peakSeries = computed<tLineChartSeries>(() => {
    if (curveData.value) {
      const baseCurveDataArr = getBaseArrData(curveData.value);
      const maxX = findMaxX(baseCurveDataArr);
      return curveData.value?.map((c, index) => {
        const max = findMaxX(c.curve_data);
        const val = maxX - max;
        if (onlyFirstElementToShow(index)) {
          return calcSeries(c.entity_id, val, { label: '峰值', x: maxX });
        } else {
          return calcSeries(c.entity_id, val);
        }
      }) as tLineChartSeries;
    }
    return [];
  });

  const onTableGetData = (res: tCurveListRes) => {
    total.value = res?.data?.total;
    colors.value = randomHexColorList(pageSize.value || 10);
    curves.value = res.data.data_list.map((c: any, i: number) => ({
      index: i,
      ...c
    }));
    curveIndexMap.clear();
    curves.value.forEach((c: any) => {
      curveIndexMap.set(c.entity_id, c.index);
    });
  };
  const onSelected = (list: tCurveInfo[]) => {
    selectedCurves.value = list.map((c) => c.entity_id);
  };
  const onCheckedAllChange = (status: boolean) => {
    if (!status) {
      isSelectedAll.value = status;
    }
    isCheckedAll.value = status;
  };
  const onPageChanged = (event: any) => {
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
      curveData.value = res.data?.map((c: tCurveData) => ({
        ...c,
        sungData: JSON.parse(c.cap_snug_features_save || 'null')
      }));
      customToolTipInfoList.value = res.data?.map((c: tCurveData) => [
        // { key: '拧紧结果', value: c?.tightening_result },
        // { key: '分析结果', value: c?.analysis_result_state },
        { key: '工作中心', value: c?.workcenter_code },
        { key: '追溯码', value: c?.track_no },
        { key: '工具序列号', value: c?.attribute_equipment_no }
      ]);
    } catch (e: any) {
      toast.add({
        severity: ToastSeverity.ERROR,
        summary: '获取曲线数据失败',
        detail: e.message,
        life: 10000
      });
    }
  };

  const downloadCurvesFile = (reqData: CurveListReq) => {
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
      const onDownloadProgress = (progressEvent: any) => {
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
    } catch (e: any) {
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

export const valueEnum: Record<string, string> = Object.freeze({
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

export const operatorEnum: Record<string, string> = Object.freeze({
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
export const fieldEnum: Record<string, string> = Object.freeze({
  bolt_name: '螺栓编号',
  control_time: '拧紧时间',
  tightening_process_no: '程序号',
  tightening_result: '拧紧结果',
  track_no: '追溯码',
  workcenter_code: '工作中心',
  align_type: '对齐方式'
});

export type tFilter = { field: string; operator: string; value: string; id: number };
export function useQuery(defaultFilterParams?: { tightening_result?: string; align_type?: string; date?: string[] }) {
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
  const suggestions = ref<string[]>([]);

  const order = ref<string[]>(['control_time desc']); // 默认按照拧紧时间倒叙

  const onSortChanged = (data: any) => {
    let orderBy = data.sortField;
    if (data.sortOrder) {
      orderBy += ` ${data.sortOrder}`;
    }

    order.value = [orderBy];
  };

  const getDefaultFilterList = () => {
    const list: Array<tFilter> = [];
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

  const filterList = ref<Array<tFilter>>(getDefaultFilterList());
  const filterParams: {
    tightening_result: string;
    align_type: string;
    date: any[];
  } = reactive({
    tightening_result: defaultFilterParams?.tightening_result || '',
    align_type: defaultFilterParams?.align_type || '',
    date: defaultFilterParams?.date || []
  });

  const filterListStr = computed<string>(() => {
    return JSON.stringify(
      filterList.value
        .map((e) => ({ field: e.field, operator: e.operator, value: e.value }))
        .filter((e) => e.field !== 'align_type')
    );
  });

  const filterStr = computed<string>(() => {
    return JSON.stringify(filterList.value.map((e) => ({ field: e.field, operator: e.operator, value: e.value })));
  });

  const setDateRange = (day: number, isBefore = true) => {
    filterParams.date = getDateRange(new Date(), day, isBefore);
  };
  const searchFieldValue = async (event: AutoCompleteCompleteEvent) => {
    try {
      const data = event.query.trim();
      if (data.length) {
        const res = await fuzzyQueryApi(queryItem.value.field, data, 'onesphere_tightening_result');
        suggestions.value = res.data;
      }
    } catch (e: any) {
      toast.add({
        severity: ToastSeverity.ERROR,
        summary: `${queryItem.value.field}信息获取失败`,
        detail: e.message,
        life: 10000
      });
    }
  };

  const onRemoveChip = (id: number) => {
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
    } else {
      filterList.value.push({
        ...queryItem.value,
        id: new Date().getTime()
      });
    }
    queryItem.value = { field: '', operator: '', value: '' };
  };
  const onSendFilterList = (obj: Array<tFilter>) => {
    filterList.value = filterList.value.concat(obj);
  };
  watch(
    () => filterParams.align_type,
    (value) => {
      queryItem.value = { field: 'align_type', operator: '=', value };
      addFilter();
    }
  );
  watch(
    () => filterParams.tightening_result,
    (value) => {
      queryItem.value = { field: 'tightening_result', operator: '=', value };
      addFilter();
    }
  );
  watch(
    () => filterParams.date,
    (value) => {
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
    }
  );

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
  const onCancel = (val: boolean) => {
    showDialog.value = val;
  };
  const onConfirm = (val: boolean) => {
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
