<template>
  <div class="col-12 cap-label">曲线信息</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.entity_id ? '' : 'text-yellow-400'}`">曲线编号:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.entity_id }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.tightening_process_no ? '' : 'text-yellow-400'}`">程序号:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.tightening_process_no }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.workcenter_code ? '' : 'text-yellow-400'}`">工作中心:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.workcenter_code }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.attribute_equipment_no ? '' : 'text-yellow-400'}`">工具序列号:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.attribute_equipment_no }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.control_time ? '' : 'text-yellow-400'}`">拧紧时间:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.control_time }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.torque_target ? '' : 'text-yellow-400'}`">目标扭矩:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.torque_target }} {{ CurvesUnitEnum.torque }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.torque_max ? '' : 'text-yellow-400'}`">最大扭矩:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.torque_max }} {{ CurvesUnitEnum.torque }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.torque_min ? '' : 'text-yellow-400'}`">最小扭矩:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.torque_min }} {{ CurvesUnitEnum.torque }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.angle_target ? '' : 'text-yellow-400'}`">目标角度:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.angle_target }} {{ CurvesUnitEnum.angle }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.angle_max ? '' : 'text-yellow-400'}`">最大角度:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.angle_max }} {{ CurvesUnitEnum.angle }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.angle_min ? '' : 'text-yellow-400'}`">最小角度:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.angle_min }} {{ CurvesUnitEnum.angle }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.measurement_final_torque ? '' : 'text-yellow-400'}`">最终扭矩:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.measurement_final_torque }} {{ CurvesUnitEnum.torque }}</div>
  <div :class="`col-3 cap-label-text ${curveInfo?.measurement_final_angle ? '' : 'text-yellow-400'}`">最终角度:</div>
  <div class="col-9 cap-label-text">{{ curveInfo?.measurement_final_angle }} {{ CurvesUnitEnum.angle }}</div>
</template>

<script setup lang="ts">
  import type { tCurveInfo } from '/@/api/types/curves';
  import { CurvesUnitEnum } from '/@/constant/curves';

  defineProps<{
    curveInfo: tCurveInfo | any;
  }>();
</script>

<style scoped></style>
