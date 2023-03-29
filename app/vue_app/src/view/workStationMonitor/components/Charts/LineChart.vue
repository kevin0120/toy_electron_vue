<template>
  <div  :id="divRef" :style="{ width: width, height: height }"></div>
</template>


<script>
import * as echarts from 'echarts';
import {isMobile} from "@/view/workStationMonitor/utils/navigator";
import {echartfontSize} from "@/view/workStationMonitor/utils/autoAdaptive";
// import {tooltipFormatter} from "@/view/workStationMonitor/utils/echarts";
// let chart = null;
const options = {
  tooltip: {
    trigger: 'axis',
    // formatter: function (params) {
    //   return tooltipFormatter(params, this.customToolTipInfoList, this.isStatisticalAnalysis);
    // }
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
    // {
    //   index: 0,
    //   name: '暂无数据',
    //   type: 'line',
    //   data: [{value: [0, 0]}],
    //   color: '#08f2f5'
    // }
  ]
};

export default {
  name: 'LineChart',
  data() {
    return {
      width: this.w || '100%',
      height: this.h || '100%',
      enable: true,
      chart: null,
      options: options,
    }
  },
  components: {
// imgMap
  },
  props: {
    divRef: {
      type: String,
      default: 'divRef',
    },
    series: {
      type: null,
      default: [],
    },
    axisName: {
      x: {
        type: String,
        default: 'divRef',
      },
      y: {
        type: String,
        default: 'divRef',
      },
    },
    xAxisShow: {
      type: Boolean,
      default: true,
    },
    customToolTipInfoList: {
      type: null,
      default: [],
    },
    colors: {
      type: null,
      default: [],
    },
    isStatisticalAnalysis: {
      type: Boolean,
      default: true,
    },
    w: {
      type: String,
      default: '100%',
    },
    h: {
      type: String,
      default: '100%',
    },
  },
  emits: ['getSeriesName'],
  mounted() {
    if (isMobile()) {
      this.options.xAxis.nameTextStyle.fontSize = 12;
      this.options.yAxis.nameTextStyle.fontSize = 12;
      this.options.toolbox.right = '-2%';
      this.options.toolbox.top = '6%';
      this.options.grid.top = '20%';
      this.options.grid.left = '13%';
      this.options.grid.right = '12%';
    }
    if (this.enable) {
      this.chart = echarts.init(document.getElementById(this.divRef));
      window.addEventListener('resize', this.resize);
      const localemit =this.$emit
      this.chart.on('click', 'series', (params) => {
        // 点击命中曲线的时候传递曲线名称
        localemit('getSeriesName', params.seriesName);
      });
      this.chart.on('highlight', (params) => {
        // 曲线高亮时触发
        if (params.seriesName) {
          localemit('getSeriesName', params.seriesName);
        }
      });
      this.chart.getZr().on('click', function (params) {
        // 点击没有命中曲线的时候传递空字符串
        if (!params.target?.culling) {
          localemit('getSeriesName', '');
        }
      });
      this.options.xAxis.name = this.axisName.x;
      this.options.yAxis.name = this.axisName.y;
      if (!this.hasSeries.value) {
        this.chart.showLoading({
          text: '暂无图表数据...',
          showSpinner: true,
          textColor: 'black',
          maskColor: 'rgba(255, 255, 255, 1)',
          fontSize: '26px',
          fontWeight: 'bold'
        });
        return;
      }
      this.options.series = this.series;
      this.chart.setOption(this.options);
    }
  },


  unmounted() {
    window.removeEventListener('resize', this.resize);
    this.chart.off('click');
    this.chart.clear();
    this.chart.dispose();
    this.chart = null;
  },


  computed: {

    hasSeries() {
      return this.series?.length > 0;
    }
  },

  methods: {
    resize() {
      // this.chart.resize();
    }
  },
  watch: {
    colors() {
      this.options.series.forEach((e) => {
        e.color = this.colors[e.index];
      });
      this.chart.setOption(this.options, true);
    },
    axisName() {
      this.options.xAxis.name = this.axisName.x;
      this.options.yAxis.name = this.axisName.y;
      this.chart.setOption(this.options, true);
    },
    series() {
      this.options.series = this.series;
      this.chart.hideLoading();
      this.chart.setOption(this.options, true);
    },
    xAxisShow() {
      this.options.xAxis.show = this.xAxisShow || false;
      this.chart.setOption(this.options, true);
    }
  }
}
</script>


<style scoped></style>
