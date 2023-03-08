<template>
  <div class="grid h-full w-full">
    <div class="col-12" style="height: 50%; padding: 0 0 0.5rem 0">
      <div class="p-card h-full w-full" style="border-radius: 16px">
        <div class="grid" style="height: 20%">
          <div class="col-8 cap-label p-4">最终扭矩</div>
          <div class="col-4 p-4">单位: {{ CurvesUnitEnum.torque }}</div>
        </div>
        <GaugeChart
          :max="curveInfo?.torque_max"
          :min="curveInfo?.torque_min"
          :value="curveInfo?.measurement_final_torque"
          h="80%"
          :color="CurvesColorEnum[curveInfo?.tightening_result || 'default']"
        />
      </div>
    </div>
    <div class="col-12" style="height: 50%; padding: 0.5rem 0 0 0">
      <div class="p-card h-full w-full" style="border-radius: 16px">
        <div class="grid" style="height: 20%">
          <div class="col-8 cap-label p-4">最终角度</div>
          <div class="col-4 p-4">单位: {{ CurvesUnitEnum.angle }}</div>
        </div>
        <GaugeChart
          :max="curveInfo?.angle_max"
          :min="curveInfo?.angle_min"
          :value="curveInfo?.measurement_final_angle"
          h="80%"
          :color="CurvesColorEnum[curveInfo?.tightening_result]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import GaugeChart from '/@/components/Charts/GaugeChart.vue';
  import { tCurveInfo } from '/@/api/types/curves';
  import { CurvesUnitEnum, CurvesColorEnum } from '/@/constant/curves';
  defineProps<{
    curveInfo: tCurveInfo;
  }>();
</script>

<style scoped></style>
