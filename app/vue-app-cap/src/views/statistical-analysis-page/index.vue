<template>
  <div ref="divRef" style="width: 100%; height: 100vh; overflow-y: scroll">
    <comparsion-dialog
      v-model:visible="showDialog"
      :current-router-title="currentRouterTitle"
      @onCancel="onCancel"
      @onConfirm="onConfirm"
      @onSendFilterList="onSendFilterList"
    >
    </comparsion-dialog>
    <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="[{ label: '统计分析', disabled: true }]" />
    <div :class="`flex p-4 w-full sticky`" style="max-height: 26%">
      <div class="grid" style="width: 86%; overflow: auto">
        <div class="col-12 md:col-3 lg:col-3 flex align-items-center">
          <div class="filter-label">螺栓编号</div>
          <div style="font-size: 20px; font-weight: 600; width: calc(100% - 6rem)">{{ boltName }}</div>
        </div>
        <div class="col-12 md:col-3 lg:col-3 flex align-items-center">
          <div class="filter-label">拧紧结果</div>
          <SelectButton
            id="result"
            v-model="filterParams.tightening_result"
            :options="[
              { name: 'OK', code: 'ok' },
              { name: 'NOK', code: 'nok' }
            ]"
            :unselectable="false"
            aria-labelledby="single"
            option-label="name"
            option-value="code"
          />
        </div>
        <div class="col-12 md:col-3 lg:col-3 flex align-items-center">
          <div class="filter-label">对齐方式</div>
          <Dropdown
            id="align_type"
            v-model="filterParams.align_type"
            :options="[{ name: '贴合点对齐', value: 'snug_align' }]"
            option-label="name"
            option-value="value"
            placeholder="选择曲线对齐方式"
          />
        </div>
        <div class="col-12 md:col-3 lg:col-3 flex align-items-center">
          <div class="filter-label">拧紧时间</div>
          <Calendar
            id="dateformat"
            v-model="filterParams.date"
            style="width: calc(100% - 6rem)"
            selection-mode="range"
            :show-time="true"
            :show-seconds="true"
            :show-icon="true"
          >
            <template #footer>
              <div>
                <Button label="当天" class="p-button-text" @click="setDateRange(1, false)" />
                <Button label="昨天" class="p-button-text" @click="setDateRange(1)" />
                <Button label="最近3天" class="p-button-text" @click="setDateRange(3)" />
                <Button label="最近7天" class="p-button-text" @click="setDateRange(7)" />
              </div>
            </template>
          </Calendar>
        </div>
        <div v-if="filterList.length" class="col-12 md:col-12 lg:col-12 flex align-items-start">
          <div class="filter-label">过滤条件</div>
          <div style="max-width: 80%">
            <Chip
              v-for="item in filterList"
              :key="item.id"
              :label="`${fieldEnum[item.field]} ${operatorEnum[item.operator]} ${
                item.field === 'control_time'
                  ? new Date(item.value).toLocaleString('chinese', { hour12: false })
                  : valueEnum[item.value] || item.value
              }`"
              class="mb-2"
              removable
              @remove="onRemoveChip(item.id)"
            />
          </div>
        </div>
      </div>
      <Divider layout="vertical" />
      <div class="grid" style="width: 14%">
        <div class="col-12 flex align-items-center justify-content-center">
          <Button label="增加过滤条件" @click="openDialog" />
        </div>
        <div v-if="filterList.length" class="col-12 flex align-items-center justify-content-center">
          <Button label="重置过滤条件" @click="resetFilter" />
        </div>
      </div>
    </div>
    <div class="px-4">
      <Divider />
    </div>
    <div style="height: 70%">
      <div class="grid h-full w-full px-3">
        <div class="col-12 h-full">
          <div class="h-full c-card">
            <ScatterChart :series="series" :axis-name="{ x: '角度', y: '扭矩' }" @onclickPoint="getPointCurvesId" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import Divider from 'primevue/divider';
  import Breadcrumb from 'primevue/breadcrumb';
  import Button from 'primevue/button';
  import Calendar from 'primevue/calendar';
  import Dropdown from 'primevue/dropdown';
  import SelectButton from 'primevue/selectbutton';
  import Chip from 'primevue/chip';
  import ScatterChart from '/@/components/Charts/ScatterChart.vue';
  import ComparsionDialog from '/@/components/Dialog/comparsionDialog.vue';
  import { useQuery, operatorEnum, fieldEnum, valueEnum, useDialog } from '/@/hooks/modules/curveList';
  import { useRoute, useRouter } from 'vue-router';
  import { getScatterDataApi } from '/@/api/httpRequest/curves';
  import { seriesScatterFormatter } from '/@/utils/echarts';
  import type { tScatterData } from '/@/api/types/curves';
  import { usePageRouter } from '/@/hooks/modules/usePageRouter';

  const route = useRoute();
  const router = useRouter();
  //当前路由title
  const currentRouterTitle = router.currentRoute.value.meta.title as string;
  const boltName = String(route.params.bolt_name);
  const { routerToCurveAnalysis } = usePageRouter();
  const {
    setDateRange,
    resetFilter,
    onRemoveChip,
    filterParams,
    filterStr,
    filterListStr,
    filterList,
    onSendFilterList
  } = useQuery({
    tightening_result: 'ok'
  });
  const { onCancel, openDialog, onConfirm, showDialog } = useDialog();
  const getPointCurvesId = (curvesId: string) => {
    routerToCurveAnalysis(curvesId);
  };
  const scatterData = ref<null | tScatterData>(null);
  const series = computed(() => {
    const markLine = {
      x: {
        max: scatterData.value?.angle_statistics?.upper || 0,
        target: scatterData.value?.angle_statistics?.center || 0,
        min: scatterData.value?.angle_statistics?.lower || 0
      },
      y: {
        max: scatterData.value?.torque_statistics?.upper || 0,
        target: scatterData.value?.torque_statistics?.center || 0,
        min: scatterData.value?.torque_statistics?.lower || 0
      }
    };
    return seriesScatterFormatter(scatterData.value?.scatter_data || [], '散点图', markLine);
  });
  watch(filterStr, () => {
    getScatterDataApi({ bolt_name: boltName, align_type: filterParams.align_type, filter: filterListStr.value }).then(
      (res) => {
        scatterData.value = res.data;
      }
    );
  });
  getScatterDataApi({ bolt_name: boltName, align_type: filterParams.align_type, filter: filterListStr.value }).then(
    (res) => {
      scatterData.value = res.data;
    }
  );
</script>

<style lang="scss" scoped>
  .box-shadow {
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.14);
  }
  .help-btn {
    position: sticky;
    bottom: 0.5rem;
    left: 96vw;
  }
  ::v-deep(.pi-question:before) {
    content: '\e95a';
    font-size: 24px;
    font-weight: 900;
    color: #ffffff;
  }
  .sticky {
    position: sticky;
    top: 0;
    background-color: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    z-index: 1;
  }
  .filter-label {
    font-size: 20px;
    font-weight: 600;
    width: 6rem;
  }
  .card-value {
    font-size: 24px;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  ::v-deep(.custom-scrolltop) {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--surface-300);

    &:hover {
      background-color: var(--surface-300);
    }

    .p-scrolltop-icon {
      font-size: 1rem;
      color: var(--primary-color-text);
    }
  }

  ::v-deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight .p-accordion-header-link) {
    background: #ffffff;
    border-color: #dee2e6;
    color: #343a40;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  ::v-deep(.p-accordion .p-accordion-header .p-accordion-header-link) {
    padding: 0 0 0 0.5rem;
    border: 1px solid #dee2e6;
    color: #6c757d;
    background: #ffffff;
    font-weight: 700;
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  ::v-deep(.p-accordion .p-accordion-content) {
    padding: 1.25rem;
    border: 1px solid #dee2e6;
    background: #ffffff;
    color: #495057;
    border-top: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
</style>
