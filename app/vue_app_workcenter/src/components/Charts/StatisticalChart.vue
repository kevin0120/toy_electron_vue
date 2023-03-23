<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, watch, ref, computed } from 'vue';
  import * as echarts from 'echarts';
  import type { tStatisticalChartSeries } from '/@/types/chart';

  interface IProps {
    series: tStatisticalChartSeries;
    axisName: {
      x: string;
      y: string;
    };
    isTimeline?: boolean;
    w?: string;
    h?: string;
  }

  const props = defineProps<IProps>();
  const width = props.w || '100%';
  const height = props.h || '100%';
  let chart: any = null;
  const divRef = ref<HTMLDivElement | null>(null);

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    grid: {
      left: '8%',
      right: '8%'
    },
    toolbox: {
      top: '3%',
      right: '1%',
      show: true,
      feature: {
        saveAsImage: {
          name: `curve_${new Date().getTime()}`,
          title: '保存图片',
          show: true
        }
      }
    },
    legend: {
      type: 'scroll'
    },
    dataZoom: [
      {
        type: 'slider',
        filterMode: 'weakFilter',
        showDataShadow: false,
        height: 10,
        borderColor: 'transparent',
        backgroundColor: '#e2e2e2',
        handleIcon:
          'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
        handleSize: 20,
        handleStyle: {
          shadowBlur: 6,
          shadowOffsetX: 1,
          shadowOffsetY: 2,
          shadowColor: '#aaa'
        }
      },
      // {
      //   type: 'slider',
      //   show: true,
      //   xAxisIndex: [0],
      //   start: 0,
      //   end: 100
      // },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 0,
        end: 100
      }
    ],
    xAxis: {
      name: 'x',
      show: true,
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 600
      },
      axisLabel: {
        interval: 0
      },
      type: props.isTimeline ? 'time' : 'category'
    },
    yAxis: {
      name: 'y',
      nameGap: 20,
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 600
      },
      type: 'value'
    },
    series: [
      {
        name: '暂无数据',
        type: 'bar',
        data: [['0', 0]]
      }
    ]
  };

  const resize = () => {
    chart?.resize();
  };

  onMounted(() => {
    const { series, axisName } = props;
    if (divRef.value) {
      chart = echarts.init(divRef.value, undefined, { locale: 'ZH' });
      window.addEventListener('resize', resize, { capture: true });
      options.xAxis.name = axisName.x;
      options.yAxis.name = axisName.y;
      if (!hasSeries.value) {
        chart.showLoading({
          text: '暂无图表数据...',
          showSpinner: true,
          textColor: 'black',
          maskColor: 'rgba(255, 255, 255, 1)',
          fontSize: '26px',
          fontWeight: 'bold'
        });
        return;
      }
      options.series = series;
      chart.setOption(options);
    }
  });

  const hasSeries = computed(() => {
    if (props?.series?.length < 1) {
      return false;
    }
    return true;
  });

  watch(
    () => props.series,
    (series) => {
      options.series = series;
      chart?.hideLoading();
      chart?.setOption(options, true);
    }
  );
  watch(
    () => props.axisName,
    (axisName) => {
      options.xAxis.name = axisName.x;
      options.yAxis.name = axisName.y;
      chart?.setOption(options, true);
    }
  );

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    chart?.off('click');
    chart?.clear();
    chart?.dispose();
    chart = null;
  });
</script>

<style scoped></style>
