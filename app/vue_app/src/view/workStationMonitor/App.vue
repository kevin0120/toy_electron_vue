<template>
  <AppLayout :home="{ icon: 'pi pi-home', to: '/' }" :model="[{ label: '工位监控', disabled: true }]">
    <template #AppBody>
      <div class="grid h-full w-full bg-white p-2" style="min-height: 850px">
        <AnalysisCardList :curve-info="analysisCurveResult"/>



        <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-calc-10rem">
          <CurveResultGaugeChart :curve-info="analysisCurveResult" />
        </div>


        <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-calc-10rem">
          <div class="p-card h-full w-full p-4 grid" style="overflow: auto; border-radius: 16px">
            <CurveInfoList :curve-info="analysisCurveResult" />
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

</template>

<script>
// import TabView from 'primevue/tabview';
// import TabPanel from 'primevue/tabpanel';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import AnalysisCardList from './components/AnalysisCardList.vue';
import AppLayout from './layout/AppLayout.vue';
import CurveInfoList from './components/CurveInfoList.vue';
import CurveResultGaugeChart from './components/CurveResultGaugeChart.vue';


export default {
  name: 'App',
  components: {

// eslint-disable-next-line
    Button,
    InputText,
    DataTable,
    Column,
    // Steps
    CurveInfoList,
    AnalysisCardList,
    AppLayout,
    CurveResultGaugeChart
  },
  data() {
    return {
      cars: [
        {vin: 'A123', year: 2021, brand: 'Toyota', color: 'Red'},
        {vin: 'B456', year: 2022, brand: 'Honda', color: 'Blue'},
        {vin: 'C789', year: 2023, brand: 'Ford', color: 'Green'}
      ],
      globalFilter: '',
      analysisCurveResult:{
        curve: {
          cur_m: [0],
          cur_w: [0],
          cur_t: [0],
          cur_s: [0]
        },
        entity_id: '1000000', // 唯一id
        bolt_name: 'nut001',// 螺栓编号
        analysis_result_state: 'ok', // 算法分析结果
        tightening_result: 'ok', // 拧紧结果
        track_no: 'sn1002', // 追溯码
        workcenter_code: 'w001', // 工作中心
        attribute_equipment_no: 'gun001', // 工具序列号
        control_time: '2012-01-02 07:12:56', // 拧紧时间
        curve_file: '123.json' | null, // 曲线文件
        angle_target: 1000,// 目标角度
        angle_max: 9999, // 最大角度
        angle_min: 1, // 最小角度
        torque_target: 10, // 目标扭矩
        torque_max: 20,// 最大扭矩
        torque_min: 2,// 最小扭矩
        measurement_final_torque: 12,
        measurement_final_angle: 12,
        measurement_step_results: [{measure_torque: 1, measure_angle: 1}, {
          measure_torque: 2,
          measure_angle: 2
        }, {measure_torque: 3, measure_angle: 3}], // 分段拧紧结果
        tightening_process_no: '12', // 程序号
        cap_snug_features_save: null // 贴合点数据json字符串}
    }
    };
  },
  methods:{
  },
  props: {},
}
</script>

<style scoped>

</style>

