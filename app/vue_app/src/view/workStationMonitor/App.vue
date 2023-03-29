<template>
  <AppLayout :home="{ icon: 'pi pi-home', to: '/' }" :model="[{ label: '工位监控', disabled: true }]">
    <template #AppBody>
      <div class="grid h-full w-full bg-white p-2" style="min-height: 850px">
        <AnalysisCardList :curve-info="analysisCurveResult"/>

        <div class="col-12 md:col-12 lg:col-6 xl:col-6 h-calc-10rem">
          <div class="grid h-full w-full">
            <div class="col-12" style="height: 70%; padding: 0 0 0.5rem 0">
              <TabView class="chart-tabs">
                <TabPanel v-for="(tab, index) in chartLabel" :key="tab.headerLabel" :header="tab.headerLabel">
                  <LinesChart
                      :divRef="devname(index)"
                      :series="chartList[index]"
                      :colors="colors"
                      :axis-name="tab.axisName"
                      :custom-tool-tip-info-list="[
                        [
                          { key: '工作中心', value: analysisCurveResult?.workcenter_code },
                          { key: '追溯码', value: analysisCurveResult?.track_no },
                          { key: '工具序列号', value: analysisCurveResult?.attribute_equipment_no }
                        ]
                      ]"
                      h="100%"
                      w="100%"
                  />
                </TabPanel>
              </TabView>
            </div>
            <div class="col-12" style="height: 30%; padding: 0.5rem 0 0 0">
              <div class="p-card h-full p-4 grid" style="width: 100%; border-radius: 16px; overflow: auto">
                <div class="col-12 cap-label">分段拧紧结果</div>
                <div class="col-12">
                  <Steps
                      :model="
                        analysisCurveResult?.measurement_step_results?.map((item, i) => ({
                          torque: item.measure_torque,
                          angle: item.measure_angle,
                          index: i + 1
                        })) || [
                          {
                            index: 1,
                            torque: '',
                            angle: ''
                          }
                        ]
                      "
                      :readonly="true"
                      aria-label="Form Steps"
                  >
                    <template #item="{ item }">
                        <span class="p-menuitem-link" role="presentation">
                          <span class="p-steps-number">{{ item.index }}</span>
                          <span class="p-steps-title">
                            <section>扭矩: {{ item.torque }}N.m</section>
                            <section>角度: {{ item.angle }}deg</section>
                          </span>
                        </span>
                    </template>
                  </Steps>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-calc-10rem">
          <CurveResultGaugeChart :curve-info="analysisCurveResult"/>
        </div>

        <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-calc-10rem">
          <div class="p-card h-full w-full p-4 grid" style="overflow: auto; border-radius: 16px">
            <CurveInfoList :curve-info="analysisCurveResult"/>
          </div>
        </div>

      </div>


      <div>
        <h1>Car Catalog</h1>
        <div class="p-inputgroup">
          <InputText v-model="globalFilter" placeholder="Filter cars..."/>
          <Button label="Search" icon="pi pi-search"/>
        </div>
        <DataTable :value="cars" :globalFilterFields="['vin','year','brand','color']">
          <Column field="vin" header="Vin"/>
          <Column field="year" header="Year"/>
          <Column field="brand" header="Brand"/>
          <Column field="color" header="Color"/>
        </DataTable>
      </div>

    </template>

  </AppLayout>
  <BubbleModal :show="this.showModal" :status="analysisCurveResult?.tightening_result || 'nok'"
               @close="showModal = false">
  </BubbleModal>
</template>

<script>
import BubbleModal from './components/BubbleModal';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AnalysisCardList from './components/AnalysisCardList.vue';
import AppLayout from './layout/AppLayout.vue';
import CurveInfoList from './components/CurveInfoList.vue';
import CurveResultGaugeChart from './components/CurveResultGaugeChart.vue';
import LinesChart from './components/Charts/LineChart.vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Steps from 'primevue/steps';
import {randomHexColorList} from "@/view/workStationMonitor/utils/math";
import {
  analysisCurveResult1,
  analysisCurveResult2,
  analysisCurveResult3,
  a,
  b,
  c
} from "./index";

export default {
  name: 'App',
  components: {

// eslint-disable-next-line
    Button,
    InputText,
    DataTable,
    Column,
    BubbleModal,
    CurveInfoList,
    AnalysisCardList,
    AppLayout,
    CurveResultGaugeChart,
    TabView,
    TabPanel,
    Steps,
    LinesChart
  },
  data() {
    return {
      showModal: false,
      tag: true,
      cars: [
        {vin: 'A123', year: 2021, brand: 'Toyota', color: 'Red'},
        {vin: 'B456', year: 2022, brand: 'Honda', color: 'Blue'},
        {vin: 'C789', year: 2023, brand: 'Ford', color: 'Green'}
      ],
      globalFilter: '',
      // activeTabIdx: 1,
      chartLabel: [{x_label: 'cur_w', y_label: 'cur_m', headerLabel: '角度/扭矩', axisName: {x: '角度', y: '扭矩'}},
        {x_label: 'cur_t', y_label: 'cur_m', headerLabel: '时间/扭矩', axisName: {x: '时间', y: '扭矩'}},
        {x_label: 'cur_t', y_label: 'cur_w', headerLabel: '时间/角度', axisName: {x: '时间', y: '角度'}}],
      colors: randomHexColorList(3),
      chartList: [],
      analysisCurveResult: {}
    };
  },
  methods: {
    devname(id) {
      return 'LinesChart' + id
    },
    showcircl() {
      setTimeout(() => {
            this.showModal = false;
          }, 3000
      )
    }
  },
  mounted() {
    this.analysisCurveResult = analysisCurveResult1;
    this.chartList = a;
    this.showModal = true;
    this.showcircl();
    setInterval(() => {
      this.analysisCurveResult = this.tag ? analysisCurveResult2 : analysisCurveResult3;
      this.chartList = this.tag ? b : c;
      this.tag = !this.tag;
      // console.log(new Date(), this.showModal)
      this.showModal = true;
      this.showcircl()
    }, 10000)

  }

}
</script>

<style lang="scss" scoped>
::v-deep(.p-steps) {
  .p-steps-item:before {
    content: ' ';
    border-top: 1px solid #dee2e6;
    width: 100%;
    top: 50%;
    left: 0;
    display: block;
    position: absolute;
    margin-top: -1.5rem;
  }

  .p-steps-item {
    .p-menuitem-link {
      .p-steps-number {
        color: var(--primary-600);
      }
    }
  }
}

::v-deep(.p-tabview-nav-container) {
  position: relative;
  height: 13%;

  .p-tabview-nav-content {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-scroll-chaining: contain auto;
    overscroll-behavior: contain auto;
    height: 100%;

    .p-tabview-nav {
      background: #ffffff;
      border: 1px solid #dee2e6;
      border-width: 0 0 2px 0;
      border-radius: 16px 16px 0 0;
      height: 100%;

      .p-tabview-nav-link {
        transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
        height: 103%;
      }
    }
  }
}

::v-deep(.p-tabview) {
  background: #ffffff;
  color: #495057;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 20%), 0 1px 1px 0 rgba(0, 0, 0, 14%), 0 1px 3px 0 rgba(0, 0, 0, 12%);
  border-radius: 16px;

  .p-tabview-nav-link {
    padding: 0px 0.5rem 0px 0.5rem !important;
  }

  .p-tabview-panels {
    background: #ffffff;
    padding: 0.5rem;
    border: 0 none;
    color: #495057;
    height: 86%;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;

    .p-tabview-panel {
      height: 100%;
    }
  }
}

.chart-tabs {
  height: 100%;
}
</style>


