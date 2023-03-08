<template>
  <nut-navbar title="工位监控" @on-click-back="back">
    <template #left>
      <Left />
    </template>
  </nut-navbar>
  <Workstation />
</template>

<script setup lang="ts">
  import { Left } from '@nutui/icons-vue';
  import Workstation from '/@/views/workstation-monitor-page/index.vue';
  import { useMobilePageRouter } from '/@/hooks/modules/usePageRouter';
  const { routerToWorkstationList } = useMobilePageRouter();
  const back = () => {
    routerToWorkstationList();
  };
</script>

<style scoped></style>
