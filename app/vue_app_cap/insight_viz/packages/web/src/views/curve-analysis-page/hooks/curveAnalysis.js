import { computed, ref, watch } from 'vue';
import { randomHexColorList } from '/@/utils/math';
import { getCurvesDataListApi, getAnalysisCurveResultApi, downloadCurveFileApi } from '/@/api/httpRequest/curves';
import { useToast } from 'primevue/usetoast';
import { ToastSeverity } from 'primevue/api';
import { seriesLineFormatter, getMarkLine } from '/@/utils/echarts';
import { initCurveInfo } from '/@/constant/curves';
export function useCurveData(curveId) {
    const toast = useToast();
    const colors = ref(randomHexColorList(3));
    const activeTabIdx = ref(0);
    const analysisCurveResult = ref(initCurveInfo);
    const chartList = ref([[], [], []]);
    const chartLabel = [
        { x_label: 'cur_w', y_label: 'cur_m', headerLabel: '扭矩/角度', axisName: { x: '角度', y: '扭矩' } },
        { x_label: 'cur_t', y_label: 'cur_m', headerLabel: '扭矩/时间', axisName: { x: '时间', y: '扭矩' } },
        { x_label: 'cur_t', y_label: 'cur_w', headerLabel: '角度/时间', axisName: { x: '时间', y: '角度' } }
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
    const getCharts = async (index, markLine) => {
        try {
            const res = await getCurvesDataListApi({
                entity_ids: [curveId],
                x_label: chartLabel[index].x_label,
                y_label: chartLabel[index].y_label
            });
            chartList.value[index] = [
                seriesLineFormatter(index, res.data[0].curve_data.map((arr) => ({
                    value: arr,
                    tighteningResult: res.data[0].tightening_result,
                    analysisResult: res.data[0].analysis_result_state
                })), curveId, analysisCurveResult?.value?.tightening_result || 'default', true, markLine)
            ];
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
    watch(activeTabIdx, (idx) => {
        if (chartList.value[idx].length < 1) {
            getCharts(idx, getMarkLine(torqueRange.value, angleRange.value, idx));
        }
    });
    const downloadCurveFile = () => {
        try {
            if (!analysisCurveResult.value?.entity_id) {
                toast.add({
                    severity: ToastSeverity.ERROR,
                    summary: '下载曲线文件失败',
                    detail: '暂时无法获取当前曲线信息，无法下载曲线文件！',
                    life: 10000
                });
                return;
            }
            downloadCurveFileApi({ entity_ids: [analysisCurveResult.value?.entity_id] });
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
    getAnalysisCurveResultApi(curveId)
        .then((res) => {
        analysisCurveResult.value = res.data;
        getCharts(0, getMarkLine(torqueRange.value, angleRange.value, 0));
    })
        .catch((e) => {
        toast.add({
            severity: ToastSeverity.ERROR,
            summary: '获取拧紧结果数据失败',
            detail: e.message,
            life: 10000
        });
    });
    return {
        colors,
        analysisCurveResult,
        activeTabIdx,
        chartLabel,
        chartList,
        downloadCurveFile
    };
}
