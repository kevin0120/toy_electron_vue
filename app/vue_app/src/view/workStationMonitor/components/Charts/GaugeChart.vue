<template>
  <div :id="divRef" :style="{ width: width, height: height }"></div>
</template>


<script>

import * as echarts from 'echarts';
export default {
  name: 'GaugeChart',
  data() {
    return {
      width: this.w || '100%',
      height: this.h || '100%',
      enable: true,
      chart: null,

      options: {
        grid: {left: '0%', top: '0%', width: '0%', height: '0%'},
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
      }
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
    value: {
      type: null,
      default: 50,
    },
    min: {
      type: null,
      default: 10,
    },
    max: {
      type: null,
      default: 110,
    },
    color: {
      type: String,
      default: '#06D4D7CC',
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

  mounted() {
    if (this.enable) {
      this.chart = echarts.init(document.getElementById(this.divRef));
      window.addEventListener('resize', this.resize);
      if (this.color) {
        this.options.series[0].itemStyle.color = this.color;
      }
      if (this.max) {
        this.options.series[0].max = this.max;
      }
      if (this.min) {
        this.options.series[0].min = this.min;
      }
      if (this.value) {
        this.options.series[0].data[0] = this.value;
      }
      this.chart.setOption(this.options);
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      this.chart?.resize();
    }
  },
  watch: {
    value() {
      this.options.series[0].data[0] = typeof this.value === 'number' ? this.value : 0;
      this.chart?.setOption(this.options, true);
    },
    min() {
      this.options.series[0].min = typeof this.min === 'number' ? this.min : 0;
      this.chart?.setOption(this.options, true);
    },
    max() {
      this.options.series[0].max = typeof this.max === 'number' ? this.max : this.value * 2;
      this.chart?.setOption(this.options, true);
    },
    color() {
      this.options.series[0].itemStyle.color = this.color;
      this.chart?.setOption(this.options, true);
    }
  }
}
</script>

<style scoped></style>
