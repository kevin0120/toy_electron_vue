<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <div class="col-12" style="height: 70%; padding: 0 0 0.5rem 0">-->
<!--    <TabView>-->
<!--      <TabPanel>-->
<!--        &lt;!&ndash;        <LinesChart&ndash;&gt;-->
<!--        &lt;!&ndash;            :series="chartList[index]"&ndash;&gt;-->
<!--        &lt;!&ndash;            :colors="colors"&ndash;&gt;-->
<!--        &lt;!&ndash;            :axis-name="tab.axisName"&ndash;&gt;-->
<!--        &lt;!&ndash;            :custom-tool-tip-info-list="[&ndash;&gt;-->
<!--        &lt;!&ndash;                        [&ndash;&gt;-->
<!--        &lt;!&ndash;                          { key: '工作中心', value: analysisCurveResult?.workcenter_code },&ndash;&gt;-->
<!--        &lt;!&ndash;                          { key: '追溯码', value: analysisCurveResult?.track_no },&ndash;&gt;-->
<!--        &lt;!&ndash;                          { key: '工具序列号', value: analysisCurveResult?.attribute_equipment_no }&ndash;&gt;-->
<!--        &lt;!&ndash;                        ]&ndash;&gt;-->
<!--        &lt;!&ndash;                      ]"&ndash;&gt;-->
<!--        &lt;!&ndash;            h="100%"&ndash;&gt;-->
<!--        &lt;!&ndash;            w="100%"&ndash;&gt;-->
<!--        &lt;!&ndash;        />&ndash;&gt;-->
<!--          hello world-->
<!--      </TabPanel>-->
<!--    </TabView>-->
<!--  </div>-->


    <div>
      <h1>Car Catalog</h1>
      <div class="p-inputgroup">
        <InputText v-model="globalFilter" placeholder="Filter cars..." />
        <Button label="Search" icon="pi pi-search" />
      </div>
      <DataTable :value="cars" :globalFilterFields="['vin','year','brand','color']">
        <Column field="vin" header="Vin"/>
        <Column field="year" header="Year"/>
        <Column field="brand" header="Brand"/>
        <Column field="color" header="Color"/>
      </DataTable>
    </div>
</template>

<script>
// import TabView from 'primevue/tabview';
// import TabPanel from 'primevue/tabpanel';

import Button from 'primevue/button';
import  InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
export default {
  name: 'App',
  components: {
    // TabView,
    // TabPanel,
// eslint-disable-next-line
    Button,
    InputText,
    DataTable,
    Column
    // Steps
  },
  data() {
    return {
      cars: [
        { vin: 'A123', year: 2021, brand: 'Toyota', color: 'Red' },
        { vin: 'B456', year: 2022, brand: 'Honda', color: 'Blue' },
        { vin: 'C789', year: 2023, brand: 'Ford', color: 'Green' }
      ],
      globalFilter: ''
    };
  },
  methods: {},
  mounted() {
    console.log(this.$route)
  },
  created() {
  },
  unmounted() {
  },

}
</script>

<style lang="scss" scoped>
//::v-deep(.p-steps) {
//  .p-steps-item:before {
//    content: ' ';
//    border-top: 1px solid #dee2e6;
//    width: 100%;
//    top: 50%;
//    left: 0;
//    display: block;
//    position: absolute;
//    margin-top: -1.5rem;
//  }
//
//  .p-steps-item {
//    .p-menuitem-link {
//      .p-steps-number {
//        color: var(--primary-600);
//      }
//    }
//  }
//}
//
//::v-deep(.p-tabview-nav-container) {
//  position: relative;
//  height: 13%;
//
//  .p-tabview-nav-content {
//    overflow-x: auto;
//    overflow-y: hidden;
//    scroll-behavior: smooth;
//    scrollbar-width: none;
//    -ms-scroll-chaining: contain auto;
//    overscroll-behavior: contain auto;
//    height: 100%;
//
//    .p-tabview-nav {
//      background: #ffffff;
//      border: 1px solid #dee2e6;
//      border-width: 0 0 2px 0;
//      border-radius: 16px 16px 0 0;
//      height: 100%;
//
//      .p-tabview-nav-link {
//        transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
//        height: 103%;
//      }
//    }
//  }
//}
//
//::v-deep(.p-tabview) {
//  background: #ffffff;
//  color: #495057;
//  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
//  border-radius: 16px;
//
//  .p-tabview-nav-link {
//    padding: 0px 0.5rem 0px 0.5rem !important;
//  }
//
//  .p-tabview-panels {
//    background: #ffffff;
//    padding: 0.5rem;
//    border: 0 none;
//    color: #495057;
//    height: 86%;
//    border-bottom-right-radius: 16px;
//    border-bottom-left-radius: 16px;
//
//    .p-tabview-panel {
//      height: 100%;
//    }
//  }
//}
//
//.chart-tabs {
//  height: 100%;
//}
</style>

