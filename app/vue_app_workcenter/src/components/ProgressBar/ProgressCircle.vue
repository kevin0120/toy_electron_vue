<template>
  <div class="circle-main">
    <div class="circle-main-box" :style="[{ width: size + 'px', height: size + 'px' }]">
      <svg :width="size" :height="size" class="circle-rotate">
        <circle :r="radius" :cx="cx" :cy="cy" fill="transparent" :stroke="bgColor" :stroke-width="strokeWidth" />
        <circle
          class="circle"
          :style="`transition: stroke-dashoffset ${animationTime}s linear;font-size: ${fontSize}px`"
          :r="radius"
          :cx="cx"
          :cy="cy"
          fill="transparent"
          :stroke="color"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="progress"
        ></circle>
      </svg>
      <span v-if="showText" class="count-num" :style="[{ 'font-size': size * 0.3 + 'px' }]">{{ countNum }}%</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed, toRefs, ref, nextTick, onBeforeMount, watch } from 'vue';
  const props = withDefaults(
    defineProps<{
      valueNum: number;
      size?: number;
      strokeWidth?: number;
      color?: string;
      bgColor?: string;
      animationTimeMs?: number;
      fontSize?: number;
      showText?: boolean;
    }>(),
    {
      valueNum: 0,
      size: 66,
      strokeWidth: 10,
      color: '#59acff',
      bgColor: '#E8F2FF',
      animationTimeMs: 500,
      fontSize: 18,
      showText: false
    }
  );
  const { valueNum, size, strokeWidth, color, animationTimeMs } = toRefs(props);
  const animationTime = computed(() => {
    return animationTimeMs.value / 1000;
  }); // 动画执行时间
  const cx = computed(() => {
    return size.value / 2;
  }); // 圆心x轴坐标

  const cy = computed(() => {
    return size.value / 2;
  }); // 圆心y轴坐标

  const radius = computed(() => {
    return (size.value - strokeWidth.value) / 2;
  }); // 半径

  const circumference = computed(() => {
    return 2 * Math.PI * radius.value;
  }); // 圆周长

  const progress = computed(() => {
    return (1 - nowProgress.value / 100) * circumference.value;
  }); // 进度长度

  const nowProgress = ref(0);
  const countNum = ref(0);
  const run = () => {
    const t = animationTimeMs.value / valueNum.value; // 通过动画时间来计算定时器执行的间隔
    const timer = setInterval(() => {
      if (countNum.value >= valueNum.value) {
        clearTimeout(timer); // 清除定时器
      } else {
        countNum.value++; // 自增
      }
    }, t);
    nextTick(() => {
      // 通过nextTick设置进度条的过渡效果
      nowProgress.value = valueNum.value;
    });
  };
  onBeforeMount(() => {
    run();
  });
  watch(valueNum, () => {
    run();
  });
</script>

<style lang="scss" scoped>
  .circle-main-box {
    position: relative;
    display: block;
  }
  .count-num {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    align-items: center;
    justify-content: center;
    display: flex;
    user-select: none;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #303133;
  }
  .circle-rotate {
    transform: rotate(-90deg);
  }
</style>
