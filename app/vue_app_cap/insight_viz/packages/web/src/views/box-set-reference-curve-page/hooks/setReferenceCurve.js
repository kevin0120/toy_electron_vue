import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { setReferenceCurvesApi } from '/@/api/httpRequest/box';
import { useConfirm } from 'primevue/useconfirm';
import { usePageRouter } from '/@/hooks/modules/usePageRouter';
export function useReferenceCurve() {
    const toast = useToast();
    const confirm = useConfirm();
    const { routerToBoxAnalysis } = usePageRouter();
    const entityId = ref('');
    const SSCBtnIsloading = ref(false); // setReferenceCurve SSC
    const setReferenceCurve = async (bolt_name, id) => {
        try {
            SSCBtnIsloading.value = true;
            const res = await setReferenceCurvesApi({
                bolt_name,
                entity_id: id
            });
            confirm.require({
                group: 'warning',
                message: `当前螺栓：${bolt_name} 设置参考曲线（${res.type + id}）成功，是否跳转至设置BOX分析页面进行BOX分析？`,
                header: '参考曲线设置成功',
                icon: 'pi pi-check-circle text-green-300',
                acceptIcon: 'pi pi-check',
                rejectIcon: 'pi pi-times',
                acceptLabel: 'BOX分析',
                rejectLabel: '关闭',
                accept: () => {
                    routerToBoxAnalysis(bolt_name);
                }
            });
            //获取最新曲线名称
            entityId.value = id;
        }
        catch (e) {
            toast.add({ severity: 'error', summary: '参考曲线设置失败', detail: e.message, life: 5000 });
        }
        finally {
            SSCBtnIsloading.value = false;
        }
    };
    return {
        setReferenceCurve,
        SSCBtnIsloading,
        entityId
    };
}
