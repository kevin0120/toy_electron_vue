<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, watch, ref, computed } from 'vue';
  import * as echarts from 'echarts';
  import type { tScatterChartSeries, tScatterChartSeriesData } from '/@/types/chart';
  import type { tFormatterParams } from '/@/utils/echarts';
  import { CurvesUnitEnum } from '/@/constant/curves';

  interface IProps {
    series: tScatterChartSeries;
    axisName: {
      x: string;
      y: string;
    };
    customToolTipInfoList?: Array<Array<{ key: string; value: any }>>;
    w?: string;
    h?: string;
  }
  interface EmitsType {
    (e: 'onclickPoint', dataId: string): void;
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
      trigger: 'item',
      formatter: function (params: tFormatterParams<tScatterChartSeriesData>) {
        let str = '<div style="font-size: 12px; color: #a8a8a8">点击查看曲线详情</div>';
        str += `
           <div style="display: flex; align-items: center; width: 100%">
             <div style="background: ${params.color}; height: 10px; width: 10px; border-radius: 50%"></div>
             <div style="font-weight: 700">${params.data.id}</div>
           </div>
            扭矩: ${params.value[1]} ${CurvesUnitEnum.torque}<br />
            角度: ${params.value[0]} ${CurvesUnitEnum.angle}<br />`;
        return str;
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
        },
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
    dataZoom: [
      // {
      //   type: 'slider',
      //   filterMode: 'weakFilter',
      //   showDataShadow: false,
      //   height: 10,
      //   borderColor: 'transparent',
      //   backgroundColor: '#e2e2e2',
      //   handleIcon:
      //     'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
      //   handleSize: 20,
      //   handleStyle: {
      //     shadowBlur: 6,
      //     shadowOffsetX: 1,
      //     shadowOffsetY: 2,
      //     shadowColor: '#aaa'
      //   }
      // },
      // {
      //   type: 'slider',
      //   show: true,
      //   xAxisIndex: [0],
      //   start: 0,
      //   end: 100
      // },
      {
        type: 'inside',
        xAxisIndex: [0]
      },
      {
        type: 'inside',
        yAxisIndex: [0]
      }
    ],
    xAxis: {
      name: 'x',
      show: true,
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 600
      },
      type: 'value'
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
        type: 'line',
        data: [
          {
            id: '1',
            value: [[0, 0]],
            itemStyle: {
              color: '#1ec2a1'
            }
          }
        ]
      }
    ]
  };

  const resize = () => {
    chart?.resize();
  };

  onMounted(() => {
    const { series, axisName } = props;
    if (divRef.value) {
      chart = echarts.init(divRef.value);
      window.addEventListener('resize', resize);
      chart.on('click', 'series', (params: any) => {
        // 点击散点获取当前散点的数组索引
        emit('onclickPoint', params.data.id);
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
