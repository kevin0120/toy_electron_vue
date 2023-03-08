<template>
  <div ref="divRef" style="width: 100%; height: 100%"></div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import { IRes } from '/@/api/types/common';
  import { useToast } from 'primevue/usetoast';
  import { ToastSeverity } from 'primevue/api';
  import * as echarts from 'echarts';
  import { tooltipFormatter, type tFormatterParams } from '/@/utils/echarts';

  const toast = useToast();

  interface IProps {
    getDataApi?: (...arg: any[]) => Promise<IRes<any>>;
    params?: any;
    status?: 'ok' | 'nok';
    brushList: Array<Array<[number, number]>>;
    brushStyleList: Array<{
      fill: string;
      lineWidth: number;
      stroke: string;
    }>;
    seriesName?: string;
    seriesData?: Array<{ value: [number, number] }>;
    transformable: boolean;
    customToolTipInfoList: Array<Array<{ key: string; value: any }>>;
    mark: {
      max: number;
      target: number;
      min: number;
    };
  }
  interface EmitsType {
    (e: 'brushChange', value: Array<Array<[number, number]>>): void;
    (e: 'brushClick', id: number): void;
  }

  const emit = defineEmits<EmitsType>();
  const props = defineProps<IProps>();
  // const brushStyle = {
  //   default: {
  //     fill: 'rgba(171,213,225,0.2)',
  //     lineWidth: 1,
  //     stroke: 'rgba(144,153,173,0.8)'
  //   },
  //   ok: {
  //     borderWidth: 1,
  //     color: 'rgba(8,190,245,0.2)',
  //     borderColor: 'rgba(120,140,180,0.8)'
  //   },
  //   nok: {
  //     borderWidth: 1,
  //     color: 'rgba(255,3,3,0.2)',
  //     borderColor: 'rgba(180,120,120,0.8)'
  //   }
  // };

  const options = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: tFormatterParams<any>[]) {
        return tooltipFormatter(params, props.customToolTipInfoList);
      }
    },
    brush: [
      {
        toolbox: [''], // 空字符串不显示右上角工具栏
        transformable: true,
        brushMode: 'single',
        xAxisIndex: 0,
        throttleType: 'debounce', // 防抖处理
        throttleDelay: 500 // 防抖时间毫秒数
      }
    ],
    grid: {
      left: '5%',
      right: '8%'
    },
    xAxis: {
      name: `角度`,
      // nameLocation: 'center',
      // nameGap: 24,
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 600
      },
      type: 'value'
      // data: [0.2, 0.4, 0.6, 0.8, 1]
    },
    yAxis: {
      name: `扭矩`,
      // nameLocation: 'center',
      // nameGap: 24,
      // nameRotate: 90,
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 600
      },
      type: 'value'
    },
    // 拖动选框过后放大图表 选框颜色会全部改变
    // dataZoom: [
    //   {
    //     show: true,
    //     type: 'inside',
    //     filterMode: 'none',
    //     xAxisIndex: [0]
    //   },
    //   {
    //     show: true,
    //     type: 'inside',
    //     filterMode: 'none',
    //     yAxisIndex: [0]
    //   }
    // ],
    series: {
      data: [{ value: [0, 0] }],
      type: 'line',
      name: 'line',
      // symbol: 'none',
      showSymbol: false,
      smooth: true, // 设置平滑曲线
      markLine: {
        animation: false,
        silent: true, // 不响应鼠标事件
        label: {
          show: true
        },
        symbol: 'none', // 去掉线最后面的箭头
        data: [
          {
            name: '最大值',
            lineStyle: {
              width: 1,
              type: 'solid', // 实线，默认是虚线
              color: '#CC8925'
            },
            label: { formatter: '最大 {c}', fontSize: 14, position: 'insideEndTop' },
            yAxis: 999999999999
          },
          {
            name: '目标值',
            lineStyle: {
              // type: 'solid', // 实线，默认是虚线
              width: 2,
              color: '#CC8925'
            },
            label: { formatter: '目标 {c}', fontSize: 14, position: 'insideEndTop' },
            yAxis: 999999999999
          },
          {
            name: '最小值',
            lineStyle: {
              width: 1,
              type: 'solid', // 实线，默认是虚线
              color: '#CC8925'
            },
            label: { formatter: '最小 {c}', fontSize: 14, position: 'insideEndTop' },
            yAxis: 999999999999
          }
        ]
      },
      markArea: {
        silent: true, // 不响应鼠标事件
        itemStyle: {
          color: 'rgba(255, 242, 226, 0.5)'
        },
        data: [
          [
            {
              yAxis: 999999999999
            },
            {
              yAxis: 999999999999
            }
          ]
        ]
      }
    }
  };
  const divRef = ref<HTMLDivElement>();
  let chart: any = null;
  const resize = () => {
    chart?.resize();
    if (props.brushList) {
      chart.dispatchAction({
        type: 'brush',
        areas: props.brushList.map((e, idx) => ({
          xAxisIndex: 0,
          // 指定选框的类型。
          brushType: 'rect',
          // 指定选框的形状。
          coordRange: e,
          brushStyle: props.brushStyleList[idx]
        }))
      });
    }
  };

  onMounted(async () => {
    try {
      const { getDataApi, params, brushList, transformable, seriesName, seriesData, mark } = props;
      if (getDataApi) {
        const res = await getDataApi(params);
        options.series.data = res.data.curve;
      }
      if (seriesData) {
        options.series.data = seriesData;
      }
      // if (status) {
      //   options.brush.brushStyle = brushStyle[status];
      // }
      if (seriesName) {
        options.series.name = seriesName;
      }
      if (mark) {
        options.series.markLine.data[0].yAxis = mark.max;
        options.series.markLine.data[1].yAxis = mark.target;
        options.series.markLine.data[2].yAxis = mark.min;
        options.series.markArea.data[0][0].yAxis = mark.max;
        options.series.markArea.data[0][1].yAxis = mark.min;
      }
      // options.brush.transformable = !brushList; // 父组件传值时不可拖动brush框
      if (transformable === false) {
        options.brush[0].transformable = false;
      }
      if (divRef.value) {
        chart = echarts.init(divRef.value);
        chart.setOption(options);
        if (brushList.length > 0) {
          chart.dispatchAction({
            type: 'brush',
            areas: props.brushList.map((e, idx) => ({
              xAxisIndex: 0,
              // 指定选框的类型。
              brushType: 'rect',
              // 指定选框的形状。
              coordRange: e,
              brushStyle: props.brushStyleList[idx]
            }))
          });
        }
        // else {
        //   // 初始化设置鼠标可以进行刷选
        //   chart.dispatchAction({
        //     type: 'takeGlobalCursor',
        //     key: 'brush',
        //     brushOption: {
        //       brushType: 'rect'
        //     }
        //   });
        // }
        chart.on('brushSelected', function (params: any) {
          const arr = params.batch[0].areas.map((e: any) => e?.coordRange);
          if (arr.length === props.brushList?.length) {
            emit('brushChange', arr);
          }
        });
        chart.getZr().on('click', (params: any) => {
          const { id } = params.target?.style;
          if (id) {
            emit('brushClick', id);
          }
        });
        window.addEventListener('resize', resize);
      }
    } catch (e: any) {
      toast.add({ severity: ToastSeverity.ERROR, summary: '图表数据获取失败', detail: e.message, life: 5000 });
    }
  });
  watch(
    () => props.seriesName,
    (data) => {
      if (data) {
        options.series.name = data;
        chart?.setOption(options, true);
      }
      // chart?.dispatchAction({
      //   type: 'takeGlobalCursor',
      //   key: 'brush',
      //   brushOption: {
      //     brushType: 'rect'
      //   }
      // });
    }
  );

  watch(
    () => props.seriesData,
    (data) => {
      if (data) {
        options.series.data = data;
      }
      chart?.setOption(options, true);
      // chart?.dispatchAction({
      //   type: 'takeGlobalCursor',
      //   key: 'brush',
      //   brushOption: {
      //     brushType: 'rect'
      //   }
      // });
    }
  );
  watch(
    () => props.brushList?.length,
    () => {
      if (props.brushList) {
        chart.dispatchAction({
          type: 'brush',
          areas: props.brushList.map((e, idx) => ({
            xAxisIndex: 0,
            // 指定选框的类型。
            brushType: 'rect',
            // 指定选框的形状。
            coordRange: e,
            brushStyle: props.brushStyleList[idx]
          }))
        });
      }
    }
  );

  watch(props.mark, (mark) => {
    if (mark) {
      options.series.markLine.data[0].yAxis = mark.max;
      options.series.markLine.data[1].yAxis = mark.target;
      options.series.markLine.data[2].yAxis = mark.min;
      options.series.markArea.data[0][0].yAxis = mark.max;
      options.series.markArea.data[0][1].yAxis = mark.min;
    }
    chart?.setOption(options, true);
    // chart?.dispatchAction({
    //   type: 'takeGlobalCursor',
    //   key: 'brush',
    //   brushOption: {
    //     brushType: 'rect'
    //   }
    // });
  });

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    chart?.off('brushSelected');
    chart?.off('click');
    chart?.clear();
    chart?.dispose();
    chart = null;
  });
</script>

<style scoped></style>
