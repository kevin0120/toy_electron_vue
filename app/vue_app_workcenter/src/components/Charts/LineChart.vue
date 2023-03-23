<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, watch, ref, computed } from 'vue';
  import * as echarts from 'echarts';
  import type { tLineChartSeries } from '/@/types/chart';
  import { type tFormatterParams, tooltipFormatter } from '/@/utils/echarts';
  import { echartfontSize } from '/@/utils/autoAdaptive';
  import { isMobile } from '/@/utils/navigator';

  interface IProps {
    series: tLineChartSeries;
    axisName: {
      x: string;
      y: string;
    };
    xAxisShow?: boolean;
    customToolTipInfoList: Array<Array<{ key: string; value: any }>>;
    colors: string[];
    isStatisticalAnalysis?: boolean;
    w?: string;
    h?: string;
  }
  interface EmitsType {
    (e: 'getSeriesName', seriesName: string): void;
  }

  const emit = defineEmits<EmitsType>();
  const props = defineProps<IProps>();
  const width = props.w || '100%';
  const height = props.h || '100%';
  // const hasSeries = !(props.series?.length < 1);
  let chart: any = null;
  const divRef = ref<HTMLDivElement | null>(null);

  const options = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: tFormatterParams<any>[]) {
        return tooltipFormatter(params, props.customToolTipInfoList, props.isStatisticalAnalysis);
      }
    },
    grid: {
      top: '10%',
      left: '8%',
      right: '8%'
    },
    toolbox: {
      top: '3%',
      right: '1%',
      show: true,
      feature: {
        // saveAsImage: {
        //   name: `curve_${new Date().getTime()}`,
        //   title: '保存图片',
        //   show: true
        // },
        dataZoom: {
          title: {
            zoom: '区域缩放',
            back: '区域缩放还原'
          },
          brushStyle: {
            borderWidth: 1,
            color: 'rgba(139,252,174,0.2)',
            borderColor: 'rgba(126,180,120,0.8)'
          }
          // yAxisIndex: 'none'
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
        handleSize: 11,
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
        fontSize: echartfontSize(0.16),
        fontWeight: 600
      },
      type: 'value'
    },
    yAxis: {
      name: 'y',
      nameGap: echartfontSize(0.08),
      nameTextStyle: {
        fontSize: echartfontSize(0.16),
        fontWeight: 600
      },
      type: 'value'
    },
    series: [
      {
        index: 0,
        name: '暂无数据',
        type: 'line',
        data: [{ value: [0, 0] }],
        color: '#08f2f5'
      }
    ]
  };

  const resize = () => {
    chart?.resize();
  };

  onMounted(() => {
    if (isMobile()) {
      options.xAxis.nameTextStyle.fontSize = 12;
      options.yAxis.nameTextStyle.fontSize = 12;
      options.toolbox.right = '-2%';
      options.toolbox.top = '6%';
      options.grid.top = '20%';
      options.grid.left = '13%';
      options.grid.right = '12%';
    }
    const { series, axisName } = props;
    if (divRef.value) {
      chart = echarts.init(divRef.value);
      window.addEventListener('resize', resize);
      chart.on('click', 'series', (params: any) => {
        // 点击命中曲线的时候传递曲线名称
        emit('getSeriesName', params.seriesName);
      });
      chart.on('highlight', (params: any) => {
        // 曲线高亮时触发
        if (params.seriesName) {
          emit('getSeriesName', params.seriesName);
        }
      });
      chart.getZr().on('click', function (params: any) {
        // 点击没有命中曲线的时候传递空字符串
        if (!params.target?.culling) {
          emit('getSeriesName', '');
        }
      });
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
    return props?.series?.length > 0;
  });

  watch(
    () => props.xAxisShow,
    (xAxisShow) => {
      options.xAxis.show = xAxisShow || false;
      chart?.setOption(options, true);
    }
  );

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
  // 监听颜色列表如果有颜色变化，更新图表中曲线的颜色
  watch(
    () => props.colors,
    (color) => {
      options.series.forEach((e) => {
        e.color = color[e.index];
      });
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
