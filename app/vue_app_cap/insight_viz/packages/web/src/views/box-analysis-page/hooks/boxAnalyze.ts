import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { computed, reactive, ref, watch } from 'vue';
import { boxAnalyzeApi, getReferenceCurvesApi } from '/@/api/httpRequest/box';
import { useToast } from 'primevue/usetoast';
import { ToastSeverity } from 'primevue/api';
import type { tAnalyzeResultOverview } from '/@/api/types/box';
import { getAnalysisCurveResultApi, getCurvesDataListApi } from '/@/api/httpRequest/curves';
import { usePageRouter } from '/@/hooks/modules/usePageRouter';
import { useConfirm } from 'primevue/useconfirm';
import { randomNum } from '/@/utils/math';
import type { tBoxInfo } from '/@/api/types/box';
import type { t2DArray } from '/@/types/global';

export function useBrush() {
  const activeTabIndex = ref(0);
  const brushList = ref<Array<Array<[number, number]>>>([]);
  const brushStyleList = ref<any[]>([]);
  const boxInfo = computed<tBoxInfo[]>(() => {
    // return {
    //   angle_min: Number(brushList.value[0][0].toFixed(2)),
    //   angle_max: Number(brushList.value[0][1].toFixed(2)),
    //   torque_min: Number(brushList.value[1][0].toFixed(2)),
    //   torque_max: Number(brushList.value[1][1].toFixed(2))
    // };
    if (brushList.value.length < 1) {
      return [];
    }
    return brushList.value.map((e) => {
      return {
        angle_min: Number(e[0][0]?.toFixed(2)),
        angle_max: Number(e[0][1]?.toFixed(2)),
        torque_min: Number(e[1][0]?.toFixed(2)),
        torque_max: Number(e[1][1]?.toFixed(2))
      };
    });
  });
  const addBrush = (data: [number, number]) => {
    brushList.value = [
      ...brushList.value,
      [
        [data[0] - data[0] / 2, data[0] + data[0] / 2],
        [data[1] - data[1] / 2, data[1]]
      ]
    ];
    brushStyleList.value = [
      ...brushStyleList.value,
      {
        id: new Date().getTime(),
        fill: `rgba(${randomNum(0, 255)},${randomNum(0, 255)},${randomNum(0, 255)},0.2)`,
        lineWidth: 1,
        stroke: 'rgba(171,213,225,0.8)'
      }
    ];
  };
  const onBrushClick = (id: number) => {
    const idx = brushStyleList.value.findIndex((e) => e.id === id);
    if (idx !== -1) {
      activeTabIndex.value = idx;
    }
  };
  const removeBrush = (index: number) => {
    brushList.value = brushList.value.filter((e, idx) => idx !== index);
    brushStyleList.value = brushStyleList.value.filter((e, idx) => idx !== index);
  };
  const onBrushChange = (list: Array<Array<[number, number]>> | undefined) => {
    if (list) {
      brushList.value = list;
    }
  };

  return {
    brushList,
    boxInfo,
    brushStyleList,
    activeTabIndex,
    onBrushClick,
    addBrush,
    removeBrush,
    onBrushChange
  };
}

export function useAnalyze() {
  const op = ref();
  const toggle = (event: any) => {
    op.value.toggle(event);
  };
  const showDifference = ref<boolean>(false);
  const toggleShowDifference = () => {
    showDifference.value = !showDifference.value;
  };
  const divRef = ref<HTMLDivElement | null>(null);
  const columnList = ref([
    {
      label: '????????????',
      value: 'workcenter_code',
      isShow: true
    },
    {
      label: '?????????',
      value: 'track_no',
      isShow: true
    },
    {
      label: 'BOX????????????',
      value: 'analyze_result',
      isShow: true
    },
    {
      label: '????????????',
      value: 'tightening_result',
      isShow: true
    },
    {
      label: '??????',
      value: 'measurement_final_torque',
      isShow: true
    },
    {
      label: '??????',
      value: 'measurement_final_angle',
      isShow: true
    },
    {
      label: '????????????',
      value: 'control_time',
      isShow: true
    },
    {
      label: '????????????',
      value: 'entity_id',
      isShow: false
    },
    {
      label: '???????????????',
      value: 'attribute_equipment_no',
      isShow: false
    },
    {
      label: '?????????',
      value: 'tightening_process_no',
      isShow: false
    }
  ]);
  const id = ref(`${new Date().getTime()}`);
  const order = ref<string[]>([]);
  const onSortChanged = (data: any) => {
    let orderBy = data.sortField;
    if (data.sortOrder) {
      orderBy += ` ${data.sortOrder}`;
    }

    order.value = [orderBy];
  };
  const analyzeResultTableReqData = computed(() => {
    return { analyze_id: id.value, show_difference: showDifference.value, orderBy: JSON.stringify(order.value) };
  });
  const analyzeBtnIsLoading = ref<boolean>(false);
  const analyzeResult = ref<null | tAnalyzeResultOverview>(null);
  const toast = useToast();
  const getAnalyze = async (boxInfo: tBoxInfo[], bolt_name: string, align_type: string, filter: string) => {
    analyzeBtnIsLoading.value = true;
    const fpPromise = await FingerprintJS.load();
    const { visitorId } = await fpPromise.get();
    const analyzeId = `${visitorId}-${new Date().getTime()}`;
    try {
      const res = await boxAnalyzeApi({
        box_data: boxInfo,
        align_type,
        analyze_id: analyzeId,
        bolt_name,
        filter
      });
      analyzeResult.value = res.data;
      id.value = analyzeId;
    } catch (e: any) {
      toast.add({ severity: ToastSeverity.ERROR, summary: 'BOX????????????', detail: e.message, life: 10000 });
    } finally {
      analyzeBtnIsLoading.value = false;
    }
  };
  watch(
    analyzeResult,
    () => {
      // ??????????????????????????????????????????
      divRef.value?.scrollTo({
        top: divRef.value?.scrollHeight || 0,
        //??????????????????
        behavior: 'smooth'
      });
    },
    {
      flush: 'post'
    }
  );
  return {
    analyzeResultTableReqData,
    analyzeResult,
    analyzeBtnIsLoading,
    divRef,
    op,
    toggle,
    getAnalyze,
    onSortChanged,
    columnList,
    showDifference,
    toggleShowDifference
  };
}

export function useReferenceCurve() {
  const referenceCurveSeriesData = ref();
  const brushRange = ref<[number, number]>([0, 0]);
  const referenceCurveInfo = ref({
    entity_id: '',
    is_reference_curve: true
  });
  const mark = reactive({
    max: 11,
    target: 10,
    min: 9
  });
  const customToolTipInfoList = ref<Array<Array<{ key: string; value: any }>>>([]);
  const boltName = ref('');
  const toast = useToast();
  const getReferenceCurveSeriesData = async () => {
    try {
      const confirm = useConfirm();
      const { router, routerToBoxSetReferenceCurve } = usePageRouter();
      boltName.value = String(router.currentRoute.value.params.entity_id);
      const resInfo = await getReferenceCurvesApi({ bolt_name: boltName.value });
      referenceCurveInfo.value = resInfo.data;
      getAnalysisCurveResultApi(resInfo.data.entity_id)
        .then((res) => {
          referenceCurveSeriesData.value = res.data.curve;
          brushRange.value = [res.data?.angle_max || 100, res.data?.torque_max || 10];
          mark.max = typeof res.data?.torque_max === 'number' ? res.data?.torque_max : 999999999999;
          mark.min = typeof res.data?.torque_min === 'number' ? res.data?.torque_min : 999999999999;
          mark.target = typeof res.data?.torque_target === 'number' ? res.data?.torque_target : 999999999999;
          customToolTipInfoList.value = [
            [
              { key: '????????????', value: res.data?.workcenter_code },
              { key: '?????????', value: res.data?.track_no },
              { key: '???????????????', value: res.data?.attribute_equipment_no }
            ]
          ];
        })
        .catch((e) => {
          toast.add({ severity: ToastSeverity.ERROR, summary: '????????????????????????', detail: e.message, life: 5000 });
        });
      getCurvesDataListApi({
        entity_ids: [resInfo.data.entity_id],
        x_label: 'cur_w',
        y_label: 'cur_m'
      })
        .then((res) => {
          referenceCurveSeriesData.value = res.data[0]?.curve_data?.map((arr: t2DArray) => ({
            value: arr,
            tighteningResult: res.data[0]?.tightening_result,
            analysisResult: res.data[0]?.analysis_result_state
          }));
        })
        .catch((e) => {
          toast.add({
            severity: ToastSeverity.ERROR,
            summary: '??????????????????????????????',
            detail: e.message,
            life: 10000
          });
        });
      if (!resInfo?.data?.is_reference_curve) {
        confirm.require({
          group: 'warning',
          message: `???????????????${boltName.value}???????????????????????????????????????????????????????????????????????????????????????????????????`,
          header: '                     ',
          icon: 'pi pi-exclamation-triangle text-yellow-300',
          acceptIcon: 'pi pi-check',
          rejectIcon: 'pi pi-times',
          acceptLabel: '??????????????????',
          rejectLabel: '??????',
          accept: () => {
            routerToBoxSetReferenceCurve(boltName.value);
          }
        });
      }
    } catch (e: any) {
      console.error(e);
      toast.add({
        severity: ToastSeverity.ERROR,
        summary: '??????????????????????????????',
        detail: e.message,
        life: 10000
      });
    }
  };
  return {
    mark,
    customToolTipInfoList,
    boltName,
    referenceCurveInfo,
    brushRange,
    referenceCurveSeriesData,
    getReferenceCurveSeriesData
  };
}
