<template>
  <div class="col-12 analyze-info-label">详细信息</div>
  <div class="col-6 flex">
    <section class="analyze-info-key">拧紧时间:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.control_time }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">螺栓编号:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.bolt_name }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">拧紧结果:</section>
    <section :class="'analyze-info-value customer-badge status-' + slotProps?.data?.tightening_result">
      {{ slotProps?.data?.tightening_result }}
    </section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">分析结果:</section>
    <section
      :class="
        'analyze-info-value customer-badge status-' +
        (slotProps?.data?.analysis_result_state || slotProps?.data?.analyze_result)
      "
    >
      {{ slotProps?.data?.analysis_result_state || slotProps?.data?.analyze_result }}
    </section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">程序号:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.tightening_process_no }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">追溯码:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.track_no }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">工作中心:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.workcenter_code }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">工具序列号:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.attribute_equipment_no }}</section>
  </div>
  <div class="col-12 flex">
    <section class="analyze-info-key">曲线编号:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.entity_id }}</section>
  </div>
  <div class="col-12 analyze-info-label">扭矩</div>
  <div class="col-6 flex">
    <section class="analyze-info-key">最终扭矩:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.measurement_final_torque }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">最大扭矩:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.torque_max }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">最小扭矩:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.torque_min }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">目标扭矩:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.torque_target }}</section>
  </div>
  <div class="col-12 analyze-info-label">角度</div>
  <div class="col-6 flex">
    <section class="analyze-info-key">最终角度:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.measurement_final_angle }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">最大角度:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.angle_max }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">最小角度:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.angle_min }}</section>
  </div>
  <div class="col-6 flex">
    <section class="analyze-info-key">目标角度:</section>
    <section class="analyze-info-value">{{ slotProps?.data?.angle_target }}</section>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    slotProps?: any;
  }>();
</script>

<style scoped></style>
