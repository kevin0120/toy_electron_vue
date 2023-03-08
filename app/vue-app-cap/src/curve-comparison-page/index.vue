<template>
  <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="[{ label: '曲线叠加', disabled: true }]" />
  <comparsion-dialog
    v-model:visible="showDialog"
    :current-router-title="currentRouterTitle"
    @onCancel="onCancel"
    @onConfirm="onConfirm"
    @onSendFilterList="onSendFilterList"
  >
  </comparsion-dialog>

  <div class="grid" style="width: 100%; padding: 20px 0; height: 90vh">
    <div class="col-12 md:col-12 lg:col-5 flex flex-column" style="height: 100%; border-right: 1px solid #dee2e6">
      <div class="col-12 h-4rem">
        <code style="font-size: 1.2rem; font-family: PingFangSC-Medium, PingFang SC; font-weight: 600">
          螺栓编号: {{ boltName }}
        </code>
      </div>
      <div class="col-12 p-0" style="max-height: 20%; width: 100%; overflow: auto">
        <div class="grid w-full">
          <div class="col-6 md:col-6 lg:col-6">
            <Dropdown
              id="result"
              v-model="filterParams.tightening_result"
              :options="[
                { name: 'OK', code: 'ok' },
                { name: 'NOK', code: 'nok' }
              ]"
              option-label="name"
              option-value="code"
              placeholder="选择拧紧结果类型"
            />
          </div>
          <div class="col-6 md:col-6 lg:col-6">
            <Calendar
              id="dateformat"
              v-model="filterParams.date"
              class="w-full"
              selection-mode="range"
              :show-time="true"
              :show-seconds="true"
              :show-icon="true"
              style="width: 360px"
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
          <div class="col-12 md:col-12 lg:col-12">
            <Chip
              v-for="item in filterList"
              :key="item.id"
              :label="`${fieldEnum[item.field]} ${operatorEnum[item.operator]}: ${
                item.field === 'control_time'
                  ? new Date(item.value).toLocaleString('chinese', { hour12: false })
                  : item.value
              }`"
              class="mb-2"
              removable
              @remove="onRemoveChip(item.id)"
            />
          </div>
        </div>
      </div>
      <div class="col-12 p-0 px-1">
        <div class="flex flex-wrap gap-2 justify-content-between align-items-center">
          <section>
            <Button label="添加条件" class="p-button-sm m-1" @click="openDialog" />
            <Button label="重置" class="p-button-sm m-1" @click="resetFilter" />
            <Button
              v-if="isCheckedAll"
              :label="`${isSelectedAll ? `全部${total}已选择` : `已选${selectedCurves.length} → 全选${total}`}`"
              :disabled="isSelectedAll"
              class="p-button-sm m-1"
              @click="toggleSelectedAll"
            />
          </section>
          <section>
            <Button
              label="下载曲线"
              class="p-button-sm p-button-raised m-1"
              :disabled="!selectedCurves.length"
              @click="downloadCurvesFile(reqData)"
            />
            <DynamicColumns v-model="columnList" icon="pi pi-cog"></DynamicColumns>
          </section>
        </div>
      </div>
      <div class="col-12" style="max-height: 70%">
        <TableServer
          :get-data-api="getCurvesListApi"
          :req-data="reqData"
          :row-class="rowClass"
          @onSelected="onSelected"
          @onPageChange="onPageChanged"
          @onGetResData="onTableGetData"
          @onSortChange="onSortChanged"
          @on-select-all-change="onCheckedAllChange"
        >
          <template #columns>
            <Column :expander="true" style="max-width: 3.5rem; min-width: 3rem" />
            <Column selection-mode="multiple" style="max-width: 3rem"></Column>
            <template v-for="(item, idx) in columnList" :key="item.value">
              <Column
                v-if="item.isShow"
                :field="item.value"
                :header="item.label"
                :style="`min-width: ${item.label !== '曲线编号' ? '8rem' : '22rem'}`"
                :sortable="true"
              >
                <template #body="{ data, index }">
                  <ColorPickers v-if="onlyFirstElementToShow(idx)" v-model:color="colors[Number(index)]" />
                  <section
                    :class="`${getBadgeStyle(data[item.value])} status-${data[item.value]} ${idx ? '' : 'ml-4'}`"
                  >
                    {{ data[item.value] }}
                  </section>
                </template>
              </Column>
            </template>
            <Column field="bolt_name" header="操作" style="min-width: 8rem">
              <template #body="{ data }">
                <Button
                  style="height: 1rem"
                  label="曲线详情"
                  class="p-button-sm p-button-text"
                  @click="routerToCurveAnalysis(data.entity_id)"
                />
              </template>
            </Column>
          </template>
          <template #expansionSlot="slotProps">
            <div style="width: 100%; height: 100%; padding: 1rem" class="grid">
              <CurveInfo :slot-props="slotProps" />
            </div>
          </template>
        </TableServer>
      </div>
    </div>
    <div class="col-12 md:col-12 lg:col-7 h-full px-4 pt-5">
      <section class="flex justify-content-between align-items-center w-full">
        <code style="font-size: 1.2rem; font-family: PingFangSC-Medium, PingFang SC; font-weight: 600">曲线绘制</code>
        <span class="flex justify-content-between align-items-center">
          <span v-if="referenceCurveInfo.entity_id" class="flex justify-content-between align-items-center mr-4">
            <span class="mr-2">显示目标曲线</span>
            <InputSwitch v-model:modelValue="showReferenceCurve" />
          </span>
          <span class="flex justify-content-between align-items-center">
            <span class="mr-2">对齐方式</span>
            <Dropdown
              id="isMaxY"
              v-model="seriesType"
              class="m-1"
              :options="[
                { name: '无', code: 'base' },
                { name: '峰值对齐', code: 'peak' },
                { name: '贴合点对齐', code: 'sung' }
              ]"
              option-label="name"
              option-value="code"
              placeholder="是否峰值对齐"
            />
          </span>
        </span>
      </section>
      <section class="w-full c-card p-1" style="height: 90%">
        <LinesChart
          :series="seriesMap[seriesType]"
          :colors="colors"
          :axis-name="{ x: '角度', y: '扭矩' }"
          :x-axis-show="seriesType === 'base'"
          :custom-tool-tip-info-list="customToolTipInfoList"
          w="100%"
          h="100%"
          :is-statistical-analysis="true"
          @getSeriesName="getSeriesName"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';
  import Breadcrumb from 'primevue/breadcrumb';
  import Button from 'primevue/button';
  import Calendar from 'primevue/calendar';
  import Column from 'primevue/column';
  import Dropdown from 'primevue/dropdown';
  import Chip from 'primevue/chip';
  import InputSwitch from 'primevue/inputswitch';
  import DynamicColumns from '/@/components/Table/DynamicColumns.vue';
  import ColorPickers from '/@/components/ColorPicker/ColorPicker.vue';
  import LinesChart from '/@/components/Charts/LineChart.vue';
  import TableServer from '/@/components/Table/TableServer.vue';
  import CurveInfo from '/@/views/components/CurveInfo.vue';
  import ComparsionDialog from '/@/components/Dialog/comparsionDialog.vue';
  import { getCurvesListApi } from '/@/api/httpRequest/curves';
  import { useRouter } from 'vue-router';
  import { useCurveList, useQuery, useDialog, operatorEnum, fieldEnum } from '/@/hooks/modules/curveList';
  import { useChartLinkedTable } from '/@/hooks/modules/chartLinkedTable';
  import { getBadgeStyle } from '/@/utils/style';
  import { useDynamicColumns } from '/@/hooks/modules/table';
  import { onlyFirstElementToShow } from '/@/constant/common';
  import { ROUTER_PATH } from '/@/router/constant';

  const router = useRouter();
  const boltName = String(router.currentRoute.value.params.entity_id);
  //当前路由title
  const currentRouterTitle = router.currentRoute.value.meta.title as string;

  const {
    downloadCurvesFile,
    onTableGetData,
    toggleSelectedAll,
    colors,
    total,
    isSelectedAll,
    selectedCurves,
    customToolTipInfoList,
    referenceCurveInfo,
    showReferenceCurve,
    baseSeries,
    peakSeries,
    snugSeries,
    isCheckedAll,
    onSelected,
    onPageChanged,
    onCheckedAllChange
  } = useCurveList();
  const {
    resetFilter,
    setDateRange,
    onRemoveChip,
    filterParams,
    filterListStr,
    order,
    filterList,
    onSortChanged,
    onSendFilterList
  } = useQuery();
  const { onCancel, openDialog, onConfirm, showDialog } = useDialog();
  const { getSeriesName, rowClass } = useChartLinkedTable();
  const { columnList } = useDynamicColumns();
  const routerToCurveAnalysis = (entity_id: string) => {
    router.push({
      path: `${ROUTER_PATH.curveAnalysis}/${entity_id || ''}`
    });
  };
  const seriesType = ref('base');
  const seriesMap = ref<Record<string, any>>({
    base: baseSeries,
    peak: peakSeries,
    sung: snugSeries
  });

  const reqData = computed(() => {
    return {
      bolt_name: boltName,
      filter: filterListStr.value,
      orderBy: JSON.stringify(order.value)
    };
  });

  onMounted(() => {
    const curveId = String(router.currentRoute.value.query.id || '');
    if (curveId) {
      referenceCurveInfo.entity_id = curveId;
      referenceCurveInfo.name = '目标曲线_';
      showReferenceCurve.value = true;
    }
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td) {
    padding: 0.2rem 0.5rem;
  }
  ::v-deep(.p-datatable .p-datatable-tbody > tr.p-highlight) {
    background: #ffffff;
    color: #495057;
  }
</style>
