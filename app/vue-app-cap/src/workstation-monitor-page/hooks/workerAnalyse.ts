import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { getNokResultsGroupApi, getResultGroupByErrorApi, getResultsTrendApi } from '/@/api/httpRequest/workcenter';
import { nokResultsGroupDataFormatter, resultGroupByErrorDataFormatter, resultsTrendDataFormatter } from '/@/api/utils';

export function useWorkerAnalyse() {
  const toast = useToast();
  const router = useRouter();
  const title = String(router.currentRoute.value.params.title || '');
  const activeTabIdx = ref(0);
  // const activeTimeIdx = ref(0);
  const activeTime = ref<string>('');
  const chartList = ref<Array<any>>([]);
  const chartLabel: Array<{
    headerLabel: string;
    axisName: { x: string; y: string };
  }> = [
    { headerLabel: '结果趋势', axisName: { x: '时间', y: '百分比' } },
    { headerLabel: '异常结果分类', axisName: { x: '类型', y: '个数' } },
    { headerLabel: '异常结果统计', axisName: { x: '时间', y: '个数' } }
  ];
  const timeLabel: Array<{
    time: string;
    code: string;
  }> = [
    { time: '最近1小时', code: '1 hour' },
    { time: '最近2小时', code: '2 hour' },
    { time: '最近3天', code: '3 day' },
    { time: '最近7天', code: '7 day' },
    { time: '最近2年', code: '2 year' }
  ];
  const intervalTime: Record<string, string> = Object.freeze({
    '1 hour': '10 minute',
    '2 hour': '20 minute',
    '3 day': '12 hour',
    '7 day': '1 day',
    '2 year': '15 day'
  });
  //时间转换
  // const translateTime = (time: string) => {
  //   time = time.replace('最近', '');
  //   if (time.indexOf('小时') !== -1) {
  //     time = time.replace('小时', ' hour');
  //   } else if (time.indexOf('天') !== -1) {
  //     time = time.replace('天', ' day');
  //   } else if (time.indexOf('年') !== -1) {
  //     time = time.replace('年', ' year');
  //   }
  //   return time;
  // };
  const getResultsTrendData = () => {
    getResultsTrendApi({
      workcenter_code: title,
      time_range: timeLabel[0].code,
      interval_time: intervalTime[timeLabel[0].code],
      result: 'nok' //TODO 写死'nok' 目前只看nok，后面将会做成nok/ok切换T
    }).then((res) => {
      chartList.value = resultsTrendDataFormatter(res.data, 'ok');
    });
  };
  onMounted(() => {
    getResultsTrendData();
    // window.addEventListener('scroll', windowScroll); //监听页面滚动
  });
  watch(
    () => [activeTabIdx.value, activeTime.value],
    async ([tabIndex, timeValue]) => {
      try {
        if (tabIndex === 0) {
          const res = await getResultsTrendApi({
            workcenter_code: title,
            time_range: timeValue as string,
            interval_time: intervalTime[timeValue],
            result: 'nok' //TODO 写死'nok' 目前只看nok，后面将会做成nok/ok切换T
          });
          chartList.value = resultsTrendDataFormatter(res.data, 'nok');
        } else if (tabIndex === 1) {
          chartList.value = [];
          const res = await getResultGroupByErrorApi({
            workcenter_code: title,
            time_range: timeValue as string
          });
          chartList.value = resultGroupByErrorDataFormatter(res.data);
        } else if (tabIndex === 2) {
          chartList.value = [];
          const res = await getNokResultsGroupApi({
            workcenter_code: title,
            time_range: timeValue as string,
            interval_time: intervalTime[timeValue]
          });
          chartList.value = nokResultsGroupDataFormatter(res.data);
        }
      } catch (e: any) {
        toast.add({
          severity: 'error',
          summary: '获取图表数据失败',
          detail: e.message || e,
          life: 3000
        });
      }
    }
  );
  return {
    activeTabIdx,
    chartLabel,
    timeLabel,
    chartList,
    activeTime
  };
}
