<template>
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>


<script>

import * as echarts from 'echarts';

let chart = null;
const options = {
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
};
export default {
  name: 'GaugeChart',
  data() {
    return {
      width: this.w || '100%',
      height: this.h || '100%',
      divRef:{
        data:1
      }
    }
  },
  components: {
// imgMap
  },
  props: {
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
    if (divRef.value) {
      chart = echarts.init(divRef.value);
      window.addEventListener('resize', this.resize);
      if (this.color) {
        options.series[0].itemStyle.color = this.color;
      }
      if (this.max) {
        options.series[0].max = this.max;
      }
      if (this.min) {
        options.series[0].min = this.min;
      }
      if (this.value) {
        options.series[0].data[0] = this.value;
      }
      chart.setOption(options);
    }
  },
  unmounted() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      chart?.resize();
    }
  },
  watch: {
    value() {
      options.series[0].data[0] = typeof this.value === 'number' ? this.value : 0;
      chart?.setOption(options, true);
    },
    min() {
      options.series[0].min = typeof this.min === 'number' ? this.min : 0;
      chart?.setOption(options, true);
    },
    max() {
      options.series[0].max = typeof this.max === 'number' ? this.max : this.value * 2;
      chart?.setOption(options, true);
    },
    color() {
      options.series[0].itemStyle.color = this.color;
      chart?.setOption(options, true);
    }
  }
}
</script>

<style scoped></style>
