<template>
  <div class="parentpage">
    <nut-pull-refresh v-model="refresh" @refresh="refreshFun">
      <nut-empty v-if="workcenterList.length < 1" description="暂无无数据 请下拉刷新尝试重新加载数据"></nut-empty>
      <template v-else>
        <template v-for="item in workcenterList" :key="item">
          <nut-cell :title="item" desc="点击查看" @click="routerToWorkstationMonitor(item)"></nut-cell>
        </template>
      </template>
    </nut-pull-refresh>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getWorkcenterListApi } from '/@/api/httpRequest/workcenter';
  import { usePageRouter } from '/@/hooks/modules/usePageRouter';
  const { routerToWorkstationMonitor } = usePageRouter();
  const refresh = ref(false);
  const workcenterList = ref<string[]>([]);
  const refreshFun = async () => {
    try {
      const res = await getWorkcenterListApi({ fields: 'code' });
      workcenterList.value = res.data;
    } catch (e) {
      console.warn(e);
    } finally {
      refresh.value = false;
    }
  };
  onMounted(() => {
    getWorkcenterListApi({ fields: 'code' }).then((res) => {
      workcenterList.value = res.data;
    });
  });
</script>
<style scoped lang="scss">
  .parentpage {
    box-sizing: border-box;
    height: calc(100vh - 52px);
    overflow: auto;
    .nut-pull-refresh {
      background: #f7f8fa;
      padding: 0.5rem;
      overflow: auto;
    }
  }
  ::v-deep(.nut-pull-refresh-container) {
    position: relative;
    height: calc(100% - 50px);
  }
</style>
