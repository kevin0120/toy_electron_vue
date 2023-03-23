<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, watch, ref } from 'vue';
  import * as echarts from 'echarts';

  interface IProps {
    value: number;
    min: number;
    max: number;
    color?: string;
    w?: string;
    h?: string;
  }

  const props = withDefaults(defineProps<IProps>(), {
    value: 0,
    min: 0,
    max: 0,
    color: '#06D4D7CC',
    w: '100%',
    h: '100%'
  });
  const width = props.w || '100%';
  const height = props.h || '100%';
  // const hasSeries = !(props.series?.length < 1);
  let chart: any = null;
  const divRef = ref<HTMLDivElement | null>(null);

  const options = {
    grid: { left: '0%', top: '0%', width: '0%', height: '0%' },
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 240,
        radius: '100%',
        center: ['50%', '50%'],
        progress: {
          show: true,
          width: 10
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 16,
          color: '#999',
          fontSize: 12
        },
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(255,255,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 30,
          offsetCenter: [0, '70%']
        },
        data: [0]
      }
    ]
  };

  const resize = () => {
    chart?.resize();
  };

  onMounted(() => {
    const { value, color, max, min } = props;
    if (divRef.value) {
      chart = echarts.init(divRef.value);
      window.addEventListener('resize', resize);
      if (color) {
        options.series[0].itemStyle.color = color;
      }
      if (max) {
        options.series[0].max = max;
      }
      if (min) {
        options.series[0].min = min;
      }
      if (value) {
        options.series[0].data[0] = value;
      }
      chart.setOption(options);
    }
  });

  watch(
    () => props.min,
    (value) => {
      options.series[0].min = typeof value === 'number' ? value : 0;
      chart?.setOption(options, true);
    }
  );

  watch(
    () => props.max,
    (value) => {
      options.series[0].max = typeof value === 'number' ? value : props.value * 2;
      chart?.setOption(options, true);
    }
  );

  watch(
    () => props.value,
    (value) => {
      options.series[0].data[0] = typeof value === 'number' ? value : 0;
      chart?.setOption(options, true);
    }
  );

  watch(
    () => props.color,
    (color) => {
      if (color) {
        options.series[0].itemStyle.color = color;
        chart?.setOption(options, true);
      }
    }
  );

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
  });
</script>

<style scoped></style>
