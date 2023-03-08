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
    <Breadcrumb
      :home="{ icon: 'pi pi-home', to: '/' }"
      :model="[
        { label: '设置参考曲线', to: `${ROUTER_PATH.boxReferenceCurve}/${boltName}` },
        { label: 'BOX分析', disabled: true }
      ]"
    />
    <div :class="`flex p-4 w-full sticky ${scrollTop > 50 ? 'box-shadow' : ''}`" style="max-height: 26%">
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
            :options="[
              { name: '贴合点对齐', value: 'snug_align' },
              { name: '峰值对齐', value: 'p_value_align' }
            ]"
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
        <div class="col-9 h-full">
          <div class="h-full c-card">
            <BrushLineChart
              :brush-list="brushList"
              :brush-style-list="brushStyleList"
              :series-data="referenceCurveSeriesData"
              :transformable="true"
              :series-name="`参考曲线-${referenceCurveInfo.entity_id}`"
              :mark="mark"
              :custom-tool-tip-info-list="customToolTipInfoList"
              @brush-change="onBrushChange"
              @brush-click="onBrushClick"
            />
          </div>
        </div>
        <div class="col-3 h-full">
          <div class="h-full">
            <div v-if="brushList.length < 1" class="px-3 c-card">
              <div class="grid align-items-center">
                <div class="col-10" style="font-size: 20px">暂无选框</div>
                <div class="col-2">
                  <Button
                    v-tooltip.top="'增加选框'"
                    :disabled="!referenceCurveInfo.is_reference_curve"
                    icon="pi pi-plus"
                    class="p-button-rounded p-button-text"
                    @click="addBrush(brushRange)"
                  />
                </div>
              </div>
            </div>
            <Accordion v-else :active-index="activeTabIndex">
              <AccordionTab v-for="(tab, idx) in boxInfo" :key="idx">
                <template #header>
                  <div
                    class="w-full flex justify-content-between align-items-center"
                    :style="{ borderRight: `20px solid ${brushStyleList[idx].fill}` }"
                  >
                    <span>选框{{ idx + 1 }}</span>
                    <span>
                      <Button
                        v-if="idx === boxInfo.length - 1"
                        v-tooltip.top="'增加选框'"
                        icon="pi pi-plus"
                        class="p-button-rounded p-button-text"
                        @click.stop="addBrush(brushRange)"
                      />
                      <Button
                        v-tooltip.top="'删除选框'"
                        icon="pi pi-minus"
                        class="p-button-rounded p-button-text p-button-danger"
                        @click.stop="removeBrush(idx)"
                      ></Button>
                    </span>
                  </div>
                </template>
                <div class="grid">
                  <div class="col-6">
                    <div>最大扭矩</div>
                    <div class="card-value">{{ tab.torque_max }} {{ CurvesUnitEnum.torque }}</div>
                    <div>最小扭矩</div>
                    <div class="card-value">{{ tab.torque_min }} {{ CurvesUnitEnum.torque }}</div>
                  </div>
                  <div class="col-6">
                    <div>最大角度</div>
                    <div class="card-value">{{ tab.angle_max }} {{ CurvesUnitEnum.angle }}</div>
                    <div>最小角度</div>
                    <div class="card-value">{{ tab.angle_min }} {{ CurvesUnitEnum.angle }}</div>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
            <Button
              style="width: 100%; margin-top: 2rem"
              label="开始box分析"
              :disabled="boxInfo.length < 1"
              :loading="analyzeBtnIsLoading"
              @click="getAnalyze(boxInfo, boltName, filterParams.align_type, filterListStr)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="analyzeResult" class="p-4 h-screen grid" style="margin: 0 auto; width: 98%">
      <div class="col-12 grid" style="height: 10rem; margin-top: 10%">
        <div class="col-3">
          <div class="cap-card">
            <section class="cap-card-label">{{ cardLabel.time_range }}</section>
            <section class="cap-card-label-1">
              {{ analyzeResult?.time_range }}
            </section>
            <img class="cap-card-icon" :src="imgMap.time_range" />
          </div>
        </div>
        <div class="col-3">
          <div class="cap-card">
            <section class="cap-card-label">{{ cardLabel.curves_count }}</section>
            <section class="cap-card-label-1">
              {{ analyzeResult?.curves_count }}
            </section>
            <img class="cap-card-icon" :src="imgMap.curves_count" />
          </div>
        </div>
        <div class="col-3">
          <div class="cap-card">
            <section class="cap-card-label">{{ cardLabel.nok_result }}</section>
            <section class="cap-card-label-1">
              {{ analyzeResult?.nok_count }} ({{ analyzeResult?.nok_percent }})
            </section>
            <img class="cap-card-icon" :src="imgMap.nok_count" />
          </div>
        </div>
        <div class="col-3">
          <div class="cap-card">
            <section class="cap-card-label">{{ cardLabel.difference_result }}</section>
            <section class="cap-card-label-1">
              {{ analyzeResult?.difference_count }} ({{ analyzeResult?.difference_percent }})
              <Button
                v-tooltip="'过滤差异结果数据'"
                :icon="`pi ${showDifference ? 'pi-filter-fill' : 'pi-filter-slash'}`"
                :class="`p-button-sm p-button-text ${showDifference ? '' : 'p-button-plain'}`"
                @click="toggleShowDifference"
              />
            </section>
            <img class="cap-card-icon" :src="imgMap.nok_percent" />
          </div>
        </div>
      </div>
      <div class="col-12" style="height: 70%">
        <TableServer
          :get-data-api="getAnalyzeResultListApi"
          :req-data="analyzeResultTableReqData"
          @onSortChange="onSortChanged"
        >
          <template #columns>
            <Column :expander="true" header-style="width: 1rem" />
            <template v-for="item in columnList" :key="item.value">
              <Column v-if="item.isShow" :field="item.value" :header="item.label" :sortable="true">
                <template #body="{ data }">
                  <section :class="`${getBadgeStyle(data[item.value])} status-${data[item.value]}`">
                    {{ data[item.value] }}
                  </section>
                </template>
              </Column>
            </template>
          </template>
          <template #expansionSlot="slotProps">
            <div style="width: 50%; height: 100%; display: flex">
              <BrushLineChart
                :get-data-api="getBoxAnalyzeCurvesApi"
                :params="{ data_id: slotProps.data.data_id, align_type: filterParams.align_type }"
                :transformable="false"
                :brush-list="brushList"
                :brush-style-list="brushStyleList"
                :status="slotProps.data.analyze_result"
                :series-name="`${slotProps.data.data_id}-程序号:${slotProps.data.tightening_process_no}`"
                :mark="mark"
                :custom-tool-tip-info-list="[
                  [
                    { key: '工作中心', value: slotProps.data?.workcenter_code },
                    { key: '追溯码', value: slotProps.data?.track_no },
                    { key: '工具序列号', value: slotProps.data?.attribute_equipment_no }
                  ]
                ]"
              />
            </div>
            <div style="width: 50%; height: 100%; padding: 1rem" class="grid">
              <CurveInfo :slot-props="slotProps" />
            </div>
          </template>
          <template #paginatorEndSlot>
            <DynamicColumns v-model="columnList" icon="pi pi-cog"></DynamicColumns>
          </template>
        </TableServer>
      </div>
    </div>
    <ScrollTop v-tooltip="'回到顶部'" :threshold="200" class="custom-scrolltop" target="parent" icon="pi pi-arrow-up" />
    <OverlayPanel id="overlay_panel" ref="op" append-to="body" style="width: 450px" :breakpoints="{ '960px': '75vw' }">
      <div class="h-full w-full">
        <h4>BOX分析功能介绍</h4>
        <div class="mb-2 line-height-3">
          1.
          在曲线图中画出禁止曲线通过的监测窗口，如果曲线通过了监测窗口，将被判定为不合格曲线。绘制该窗口应当不接触参考曲线。
        </div>
        <div class="mb-2 line-height-3">
          2.
          在上方可添加拧紧结果和时间过滤条件，或点击“增加过滤条件”按钮增加其他过滤条件。box分析时将对拧紧结果进行筛选再判定是否合格。
        </div>
        <div class="mb-2 line-height-3">
          3. 点击“开始box分析”按钮，会对该螺栓的拧紧结果进行box分析，结果将显示在下方列表。
        </div>
      </div>
    </OverlayPanel>
    <Button
      v-if="scrollTop < 60"
      v-tooltip="'操作说明'"
      icon="pi pi-question"
      class="p-button-rounded p-button-text p-button-plain surface-300 help-btn"
      @click="toggle"
    />
  </div>
</template>

<script lang="ts" setup>
  import Divider from 'primevue/divider';
  import Breadcrumb from 'primevue/breadcrumb';
  import Button from 'primevue/button';
  import Column from 'primevue/column';
  import Calendar from 'primevue/calendar';
  import Dropdown from 'primevue/dropdown';
  import SelectButton from 'primevue/selectbutton';
  import Chip from 'primevue/chip';
  import ScrollTop from 'primevue/scrolltop';
  import OverlayPanel from 'primevue/overlaypanel';
  import Accordion from 'primevue/accordion';
  import AccordionTab from 'primevue/accordiontab';
  import TableServer from '/@/components/Table/TableServer.vue';
  import CurveInfo from '/@/views/components/CurveInfo.vue';
  import BrushLineChart from '/@/components/Charts/BrushLineChart.vue';
  import ComparsionDialog from '/@/components/Dialog/comparsionDialog.vue';
  import DynamicColumns from '/@/components/Table/DynamicColumns.vue';
  import { useRouter } from 'vue-router';
  import { getBadgeStyle } from '/@/utils/style';
  import { getBoxAnalyzeCurvesApi, getAnalyzeResultListApi } from '/@/api/httpRequest/box';
  import { useAnalyze, useReferenceCurve, useBrush } from '/@/views/box-analysis-page/hooks/boxAnalyze';
  import { useQuery, operatorEnum, fieldEnum, valueEnum, useDialog } from '/@/hooks/modules/curveList';
  import imgMap from '/@/assets/icons';
  import useScroll from '/@/hooks/dom/useScroll';
  import { ROUTER_PATH } from '/@/router/constant';
  import { CurvesUnitEnum } from '/@/constant/curves';
  const router = useRouter();

  const { brushList, brushStyleList, boxInfo, activeTabIndex, onBrushClick, onBrushChange, addBrush, removeBrush } =
    useBrush();
  const {
    customToolTipInfoList,
    referenceCurveSeriesData,
    brushRange,
    referenceCurveInfo,
    boltName,
    mark,
    getReferenceCurveSeriesData
  } = useReferenceCurve();
  const {
    divRef,
    op,
    toggle,
    analyzeResultTableReqData,
    getAnalyze,
    analyzeResult,
    analyzeBtnIsLoading,
    onSortChanged,
    columnList,
    showDifference,
    toggleShowDifference
  } = useAnalyze();
  const { setDateRange, resetFilter, onRemoveChip, filterParams, filterListStr, filterList, onSendFilterList } =
    useQuery();
  const { onCancel, openDialog, onConfirm, showDialog } = useDialog();
  getReferenceCurveSeriesData();

  const { scrollTop } = useScroll(divRef);

  const cardLabel = {
    bolt_name: '螺栓编号',
    curves_count: '分析曲线数量',
    nok_count: '异常曲线数量',
    nok_percent: '异常曲线占比',
    nok_result: '异常结果',
    difference_result: '差异结果',
    time_range: '时间范围'
  };
  //当前路由title
  const currentRouterTitle = router.currentRoute.value.meta.title as string;
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
