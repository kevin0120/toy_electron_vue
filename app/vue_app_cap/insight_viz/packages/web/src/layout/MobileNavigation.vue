<template>
  <router-view> </router-view>
  <nut-tabbar :bottom="true" :safe-area-inset-bottom="true">
    <nut-tabbar-item tab-title="工位列表" :to="MOBILE_ROUTER_PATH.workstationList">
      <template #icon>
        <Category />
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="用户信息" :to="MOBILE_ROUTER_PATH.user">
      <template #icon>
        <My />
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script setup lang="ts">
  import { Category, My } from '@nutui/icons-vue';
  import { MOBILE_ROUTER_PATH } from '/@/router/constant';
</script>

<style scoped></style>
