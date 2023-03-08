<template>
  <div>test page</div>
  <Button label="曲线分析" @click="routerToCurveAnalysis" />
  <Button label="工位监控" @click="routerToWorkstationMonitor" />
  <Button label="曲线叠加" @click="routerToCurveComparison" />
  <Button label="box分析" @click="routerToBoxAnalysis" />
  <Button label="设置参考曲线" @click="routerToBoxSetReferenceCurve" />
  <Button label="统计分析" @click="routerToStatisticalAnalysis" />
</template>

<script setup lang="ts">
  import Button from 'primevue/button';
  import { useRouter } from 'vue-router';
  import { ROUTER_PATH } from '/@/router/constant';
  const router = useRouter();

  const routerToStatisticalAnalysis = () => {
    router.push({
      path: ROUTER_PATH.statisticalAnalysis + '/OP340-8-0-0'
    });
  };

  const routerToBoxSetReferenceCurve = () => {
    router.push({
      path: ROUTER_PATH.boxReferenceCurve + '/OP340-8-0-0'
    });
  };

  const routerToBoxAnalysis = () => {
    router.push({
      path: ROUTER_PATH.boxAnalysis + '/OP340-8-0-0'
    });
  };

  const routerToCurveAnalysis = () => {
    router.push({
      path: `${ROUTER_PATH.curveAnalysis}/955ef623-50b1-4478-9272-080c99d2c3cd`
    });
  };

  const routerToWorkstationMonitor = () => {
    router.push({
      path: `${ROUTER_PATH.workstationMonitor}/workstations/C26R_11`
    });
  };

  const routerToCurveComparison = () => {
    router.push({
      path: ROUTER_PATH.curveComparison + '/OP340-8-0-0'
    });
  };
</script>

<style scoped></style>
