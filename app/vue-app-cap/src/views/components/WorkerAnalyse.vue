<template>
  <div class="col-12">
    <div id="select" class="col-6 md:col-6 lg:col-6">
      <span class="flex justify-content-between align-items-center">
        <span class="mr-2">时间段：</span>
        <Dropdown
          v-model="activeTime"
          :options="timeLabel"
          option-label="time"
          option-value="code"
          placeholder="选择时间段"
        />
      </span>
    </div>
    <TabView v-model:activeIndex="activeTabIdx" class="chart-tabs" lazy>
      <TabPanel v-for="tab in chartLabel" :key="tab.headerLabel" :header="tab.headerLabel">
        <div style="width: 100%; height: 614px">
          <StatisticalChart :axis-name="tab.axisName" :series="chartList" h="100%" w="100%" />
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script lang="ts" setup>
  import TabView from 'primevue/tabview';
  import TabPanel from 'primevue/tabpanel';
  import Dropdown from 'primevue/dropdown';
  import StatisticalChart from '/@/components/Charts/StatisticalChart.vue';
  import { useWorkerAnalyse } from '/@/views/workstation-monitor-page/hooks/workerAnalyse';
  const { activeTabIdx, chartLabel, timeLabel, activeTime, chartList } = useWorkerAnalyse();
</script>

<style scoped lang="scss">
  .col-12 {
    position: relative;
    height: 87%;
    padding: 0 0 0.5rem 0;
    margin-top: 20px;
    #select {
      position: absolute;
      right: 0;
      width: auto;
      z-index: 999;
    }
    ::v-deep(.p-tabview .p-tabview-panels) {
      height: 100% !important;
    }
    ::v-deep(.p-tabview .p-tabview-nav li) {
      height: 61px;
    }
    .p-dropdown {
      width: 220px;
    }
  }
</style>
