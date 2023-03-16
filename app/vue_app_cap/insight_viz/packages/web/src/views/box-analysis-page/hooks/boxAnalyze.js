import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { computed, reactive, ref, watch } from 'vue';
import { boxAnalyzeApi, getReferenceCurvesApi } from '/@/api/httpRequest/box';
import { useToast } from 'primevue/usetoast';
import { ToastSeverity } from 'primevue/api';
import { getAnalysisCurveResultApi, getCurvesDataListApi } from '/@/api/httpRequest/curves';
import { usePageRouter } from '/@/hooks/modules/usePageRouter';
import { useConfirm } from 'primevue/useconfirm';
import { randomNum } from '/@/utils/math';
export function useBrush() {
    const activeTabIndex = ref(0);
    const brushList = ref([]);
    const brushStyleList = ref([]);
    const boxInfo = computed(() => {
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
    const addBrush = (data) => {
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
    const onBrushClick = (id) => {
        const idx = brushStyleList.value.findIndex((e) => e.id === id);
        if (idx !== -1) {
            activeTabIndex.value = idx;
        }
    };
    const removeBrush = (index) => {
        brushList.value = brushList.value.filter((e, idx) => idx !== index);
        brushStyleList.value = brushStyleList.value.filter((e, idx) => idx !== index);
    };
    const onBrushChange = (list) => {
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
    const toggle = (event) => {
        op.value.toggle(event);
    };
    const showDifference = ref(false);
    const toggleShowDifference = () => {
        showDifference.value = !showDifference.value;
    };
    const divRef = ref(null);
    const columnList = ref([
        {
            label: '工作中心',
            value: 'workcenter_code',
            isShow: true
        },
        {
            label: '追溯码',
            value: 'track_no',
            isShow: true
        },
        {
            label: 'BOX分析结果',
            value: 'analyze_result',
            isShow: true
        },
        {
            label: '拧紧结果',
            value: 'tightening_result',
            isShow: true
        },
        {
            label: '扭矩',
            value: 'measurement_final_torque',
            isShow: true
        },
        {
            label: '角度',
            value: 'measurement_final_angle',
            isShow: true
        },
        {
            label: '拧紧时间',
            value: 'control_time',
            isShow: true
        },
        {
            label: '曲线编号',
            value: 'entity_id',
            isShow: false
        },
        {
            label: '工具序列号',
            value: 'attribute_equipment_no',
            isShow: false
        },
        {
            label: '程序号',
            value: 'tightening_process_no',
            isShow: false
        }
    ]);
    const id = ref(`${new Date().getTime()}`);
    const order = ref([]);
    const onSortChanged = (data) => {
        let orderBy = data.sortField;
        if (data.sortOrder) {
            orderBy += ` ${data.sortOrder}`;
        }
        order.value = [orderBy];
    };
    const analyzeResultTableReqData = computed(() => {
        return { analyze_id: id.value, show_difference: showDifference.value, orderBy: JSON.stringify(order.value) };
    });
    const analyzeBtnIsLoading = ref(false);
    const analyzeResult = ref(null);
    const toast = useToast();
    const getAnalyze = async (boxInfo, bolt_name, align_type, filter) => {
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
        }
        catch (e) {
            toast.add({ severity: ToastSeverity.ERROR, summary: 'BOX分析失败', detail: e.message, life: 10000 });
        }
        finally {
            analyzeBtnIsLoading.value = false;
        }
    };
    watch(analyzeResult, () => {
        // 获取到分析结果自动滚动到底部
        divRef.value?.scrollTo({
            top: divRef.value?.scrollHeight || 0,
            //滚动过渡效果
            behavior: 'smooth'
        });
    }, {
        flush: 'post'
    });
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
    const brushRange = ref([0, 0]);
    const referenceCurveInfo = ref({
        entity_id: '',
        is_reference_curve: true
    });
    const mark = reactive({
        max: 11,
        target: 10,
        min: 9
    });
    const customToolTipInfoList = ref([]);
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
                        { key: '工作中心', value: res.data?.workcenter_code },
                        { key: '追溯码', value: res.data?.track_no },
                        { key: '工具序列号', value: res.data?.attribute_equipment_no }
                    ]
                ];
            })
                .catch((e) => {
                toast.add({ severity: ToastSeverity.ERROR, summary: '参考曲线获取失败', detail: e.message, life: 5000 });
            });
            getCurvesDataListApi({
                entity_ids: [resInfo.data.entity_id],
                x_label: 'cur_w',
                y_label: 'cur_m'
            })
                .then((res) => {
                referenceCurveSeriesData.value = res.data[0]?.curve_data?.map((arr) => ({
                    value: arr,
                    tighteningResult: res.data[0]?.tightening_result,
                    analysisResult: res.data[0]?.analysis_result_state
                }));
            })
                .catch((e) => {
                toast.add({
                    severity: ToastSeverity.ERROR,
                    summary: '参考曲线数据获取失败',
                    detail: e.message,
                    life: 10000
                });
            });
            if (!resInfo?.data?.is_reference_curve) {
                confirm.require({
                    group: 'warning',
                    message: `当前螺栓：${boltName.value}未设置参考曲线，是否跳转至设置参考曲线页面为当前螺栓设置参考曲线？`,
                    header: '                     ',
                    icon: 'pi pi-exclamation-triangle text-yellow-300',
                    acceptIcon: 'pi pi-check',
                    rejectIcon: 'pi pi-times',
                    acceptLabel: '设置参考曲线',
                    rejectLabel: '关闭',
                    accept: () => {
                        routerToBoxSetReferenceCurve(boltName.value);
                    }
                });
            }
        }
        catch (e) {
            console.error(e);
            toast.add({
                severity: ToastSeverity.ERROR,
                summary: '参考曲线数据获取失败',
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
