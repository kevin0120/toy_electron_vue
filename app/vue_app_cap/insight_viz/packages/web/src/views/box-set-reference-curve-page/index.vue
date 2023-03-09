<template>
  <Breadcrumb :home="{ icon: 'pi pi-home', to: '/' }" :model="[{ label: '设置参考曲线', disabled: true }]" />
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
      <div class="col-12 h-4rem flex">
        <code style="font-size: 1.2rem; font-family: PingFangSC-Medium, PingFang SC; font-weight: 600"
          >螺栓编号: {{ boltName }}</code
        >
        <section
          v-tooltip.top="`参考曲线: ${referenceCurveInfo.is_reference_curve ? referenceCurveInfo.entity_id : '未设置'}`"
          :class="`analyze-info-value customer-badge ml-2 w-4rem status-${
            referenceCurveInfo.is_reference_curve ? 'ready' : 'nok'
          }`"
        >
          {{ referenceCurveInfo.is_reference_curve ? '已设置' : '未设置' }}
        </section>
      </div>
      <div class="col-12 p-0" style="max-height: 20%; width: 100%; overflow: auto">
        <div class="grid w-full">
          <div class="col-12 lg:col-6 xl:col-6 flex align-items-center">
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
          <div class="col-12 lg:col-6 xl:col-6 flex align-items-center">
            <div class="filter-label">拧紧时间</div>
            <Calendar
              id="dateformat"
              v-model="filterParams.date"
              style="width: calc(100% - 6rem); max-width: 20rem"
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
            <Button
              v-tooltip="'添加过滤条件'"
              icon="pi pi-filter"
              class="p-button-text p-button-plain"
              @click="openDialog"
            />
            <Button
              v-tooltip="'重置过滤条件'"
              icon="pi pi-sync"
              class="p-button-text p-button-plain"
              @click="resetFilter"
            />
          </section>
          <section v-tooltip="'字段配置'">
            <DynamicColumns v-model="columnList" icon="pi pi-cog"></DynamicColumns>
          </section>
        </div>
      </div>
      <div class="col-12" style="max-height: 70%">
        <TableServer
          :get-data-api="getCurvesListApi"
          :req-data="reqData"
          :row-class="rowClass"
          @on-selected="onSelected"
          @on-page-change="onPageChanged"
          @on-get-res-data="onTableGetData"
          @onSortChange="onSortChanged"
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
                  label="设为参考曲线"
                  class="p-button-sm p-button-text"
                  :loading="SSCBtnIsloading"
                  @click="setReferenceCurve(boltName, data.entity_id)"
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
          <span class="flex justify-content-between align-items-center mr-4">
            <span class="mr-2">对比参考曲线</span>
            <InputSwitch v-model:modelValue="showReferenceCurve" :disabled="!referenceCurveInfo.is_reference_curve" />
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
  import { computed, toRefs, watch } from 'vue';
  import Breadcrumb from 'primevue/breadcrumb';
  import Button from 'primevue/button';
  import Calendar from 'primevue/calendar';
  import Column from 'primevue/column';
  import Dropdown from 'primevue/dropdown';
  import SelectButton from 'primevue/selectbutton';
  import Chip from 'primevue/chip';
  import InputSwitch from 'primevue/inputswitch';
  import DynamicColumns from '/@/components/Table/DynamicColumns.vue';
  import ColorPickers from '/@/components/ColorPicker/ColorPicker.vue';
  import LinesChart from '/@/components/Charts/LineChart.vue';
  import TableServer from '/@/components/Table/TableServer.vue';
  import CurveInfo from '/@/views/components/CurveInfo.vue';
  import { getCurvesListApi } from '/@/api/httpRequest/curves';
  import { useRouter } from 'vue-router';
  import { useReferenceCurve } from '/@/views/box-set-reference-curve-page/hooks/setReferenceCurve';
  import { useCurveList, useQuery, operatorEnum, fieldEnum, useDialog } from '/@/hooks/modules/curveList';
  import { ref } from 'vue';
  import { useChartLinkedTable } from '/@/hooks/modules/chartLinkedTable';
  import { getBadgeStyle } from '/@/utils/style';
  import { useDynamicColumns } from '/@/hooks/modules/table';
  import { onlyFirstElementToShow } from '/@/constant/common';

  const router = useRouter();
  const boltName = String(router.currentRoute.value.params.entity_id);
  const {
    onTableGetData,
    colors,
    baseSeries,
    peakSeries,
    snugSeries,
    onSelected,
    onPageChanged,
    getReferenceCurve,
    showReferenceCurve,
    referenceCurveInfo,
    customToolTipInfoList
  } = useCurveList();
  const { setReferenceCurve, SSCBtnIsloading, entityId } = useReferenceCurve();
  const {
    resetFilter,
    setDateRange,
    onRemoveChip,
    filterParams,
    filterListStr,
    order,
    filterList,
    onSendFilterList,
    onSortChanged
  } = useQuery({
    tightening_result: 'ok'
  });
  const { onCancel, openDialog, onConfirm, showDialog } = useDialog();
  getReferenceCurve(boltName);
  const seriesType = ref('base');
  const seriesMap = ref<Record<string, any>>({
    base: baseSeries,
    peak: peakSeries,
    sung: snugSeries
  });
  const { getSeriesName, rowClass } = useChartLinkedTable();
  const { columnList } = useDynamicColumns();
  //当前路由title
  const currentRouterTitle = router.currentRoute.value.meta.title as string;
  const { entity_id } = toRefs(referenceCurveInfo);
  const reqData = computed(() => {
    return {
      bolt_name: boltName,
      filter: filterListStr.value,
      orderBy: JSON.stringify(order.value)
    };
  });
  //监听最新设置曲线名称
  watch(
    () => entityId.value,
    (value) => {
      entity_id.value = value;
    }
  );
</script>

<style lang="scss" scoped>
  ::v-deep(.p-colorpicker) {
    .p-colorpicker-preview {
      width: 1rem;
      height: 1rem;
    }
  }
  ::v-deep(.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td) {
    padding: 0.2rem 0.5rem;
  }
  ::v-deep(.p-datatable .p-datatable-tbody > tr.p-highlight) {
    background: #ffffff;
    color: #495057;
  }
  .filter-label {
    font-size: 1rem;
    font-weight: 500;
    width: 6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #343a40;
  }
  ::v-deep(.p-button-label) {
    font-weight: 400;
  }
</style>
