import { computed, onUnmounted, ref, watch } from 'vue';
import { randomHexColorList } from '/@/utils/math';
import { useToast } from 'primevue/usetoast';
import type { chartLabel, tWsCurveInfo, tProbaResult } from '/@/api/types/curves';
import type { tLineChartSeries } from '/@/types/chart';
import { SendMsgType, ReplayMsgType, SubscribeType } from '/@/api/types/websocket';
import { ResStatusCode, WS_BASE_URL } from '/@/api/constant';
import { seriesLineFormatter, getMarkLine, convertTo2DArray, getMarkPointData } from '/@/utils/echarts';
import { initCurveInfo } from '/@/constant/curves';

export function useCurveDataWS(workcenter_code: string) {
  const toast = useToast();
  const showModal = ref(false);
  let timer: any = null;
  const colors = ref(randomHexColorList(3));
  const activeTabIdx = ref(0);
  const analysisCurveResult = ref<tWsCurveInfo>(initCurveInfo);
  const probaResult = ref<tProbaResult>();
  const chartList = ref<Array<[] | tLineChartSeries>>([[], [], []]);
  const curveDataList = computed(() => {
    const cur_w = analysisCurveResult.value?.curve.cur_w || [];
    const cur_t = analysisCurveResult.value?.curve.cur_t || [];
    const cur_m = analysisCurveResult.value?.curve.cur_m || [];
    return [convertTo2DArray(cur_w, cur_m), convertTo2DArray(cur_t, cur_m), convertTo2DArray(cur_t, cur_w)];
  });
  const chartLabel: Array<{
    x_label: chartLabel;
    y_label: chartLabel;
    headerLabel: string;
    axisName: { x: string; y: string };
  }> = [
    { x_label: 'cur_w', y_label: 'cur_m', headerLabel: '角度/扭矩', axisName: { x: '角度', y: '扭矩' } },
    { x_label: 'cur_t', y_label: 'cur_m', headerLabel: '时间/扭矩', axisName: { x: '时间', y: '扭矩' } },
    { x_label: 'cur_t', y_label: 'cur_w', headerLabel: '时间/角度', axisName: { x: '时间', y: '角度' } }
  ];
  const torqueRange = computed(() => ({
    max: analysisCurveResult?.value?.torque_max,
    min: analysisCurveResult?.value?.torque_min,
    target: analysisCurveResult?.value?.torque_target
  }));
  const angleRange = computed(() => ({
    max: analysisCurveResult?.value?.angle_max,
    min: analysisCurveResult?.value?.angle_min,
    target: analysisCurveResult?.value?.angle_target
  }));
  const getCharts = (entity_id: string, index: number, markLine: any, markPointData?: any) => {
    try {
      chartList.value[index] = [
        seriesLineFormatter(
          index,
          curveDataList.value[index].map((arr) => ({
            value: arr,
            tighteningResult: analysisCurveResult?.value?.tightening_result,
            analysisResult: analysisCurveResult?.value?.analysis_result_state
          })),
          entity_id,
          analysisCurveResult?.value?.tightening_result || 'default',
          true,
          markLine,
          markPointData
        )
      ];
    } catch (e: any) {
      toast.add({
        severity: 'error',
        summary: '获取曲线数据失败',
        detail: e.message,
        life: 10000
      });
    }
  };
  const ws = new WebSocket(WS_BASE_URL);
  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        type: SendMsgType.SUBSCRIBE,
        data: {
          type: SubscribeType.COLLECTION,
          station_name: workcenter_code
        }
      })
    );
  };
  ws.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data?.error?.code === ResStatusCode.BAD_REQUEST) {
      toast.add({
        severity: 'error',
        summary: '错误信息',
        detail: data?.error?.message,
        life: 10000
      });
    }
    if (data.type === ReplayMsgType.COLLECTION) {
      if (data.code === ResStatusCode.OK) {
        analysisCurveResult.value = data.data;
      }
    }
    if (data.type === ReplayMsgType.PROBA_RESULT) {
      if (data?.data?.entity_id === analysisCurveResult.value?.entity_id) {
        probaResult.value = data.data;
        analysisCurveResult.value.analysis_result_state = data?.data.analysis_result_state;
      }
    }
    // if (data.type === ReplayMsgType.CONNECTED) {
    //   console.log(data.data);
    // }
  };

  ws.onerror = (evt) => {
    console.warn('ws onerror', evt);
  };
  ws.onclose = (evt) => {
    console.warn('ws close', evt);
  };

  watch(probaResult, (probaResult) => {
    getCharts(
      analysisCurveResult.value?.entity_id || '',
      activeTabIdx.value,
      getMarkLine(torqueRange.value, angleRange.value, activeTabIdx.value),
      getMarkPointData(probaResult!, curveDataList.value[activeTabIdx.value])
    );
  });
  watch(activeTabIdx, (index) => {
    if (chartList.value[index].length < 1) {
      if (analysisCurveResult?.value?.entity_id) {
        getCharts(analysisCurveResult.value.entity_id, index, getMarkLine(torqueRange.value, angleRange.value, index));
      }
    }
  });
  const openModal = () => {
    if (showModal.value) {
      showModal.value = false;
    }
    showModal.value = true;
    timer = setTimeout(function () {
      if (showModal.value) {
        showModal.value = false;
      }
    }, 3000);
  };
  const onModalClose = () => {
    clearTimeout(timer);
    timer = null;
  };
  watch(
    () => analysisCurveResult.value,
    (value) => {
      if (value?.entity_id) {
        getCharts(
          value?.entity_id,
          activeTabIdx.value,
          getMarkLine(torqueRange.value, angleRange.value, activeTabIdx.value)
        );
        openModal();
      }
    }
  );
  watch(showModal, (showModal) => {
    if (!showModal) {
      onModalClose();
    }
  });
  onUnmounted(() => {
    ws?.send(
      JSON.stringify({
        type: SendMsgType.CONNECTION_CLOSE,
        data: {}
      })
    );
    ws?.close();
    onModalClose();
  });
  return {
    analysisCurveResult,
    showModal,
    colors,
    activeTabIdx,
    chartLabel,
    chartList
  };
}
