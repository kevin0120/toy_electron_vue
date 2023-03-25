<template>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">追溯码</section>
      <section class="cap-card-label-1">
        {{ curveInfo?.track_no }}
      </section>
      <img class="cap-card-icon" :src="imgMap.track_no"/>
    </div>
  </div>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">螺栓编号</section>
      <section class="cap-card-label-1">
        {{ curveInfo?.bolt_name }}
      </section>
      <img class="cap-card-icon" :src="imgMap.bolt_name"/>
    </div>
  </div>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">拧紧结果</section>
      <section :class="'cap-card-label-1 cap-card-status-' + curveInfo?.tightening_result">
        {{ curveInfo?.tightening_result }}
      </section>
      <img class="cap-card-icon" :src="imgMap[curveInfo?.tightening_result || 'ready']"/>
    </div>
  </div>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">分析结果</section>
      <section :class="'cap-card-label-1 cap-card-status-' + curveInfo?.analysis_result_state">
        {{ curveInfo?.analysis_result_state }}
      </section>
      <img class="cap-card-icon" :src="imgMap[curveInfo?.analysis_result_state || 'ready']"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      description: 'Please select an option from the list below.',
      selectedOption: '',
      options: [{label: 'Option 1', value: 'option1'}, {label: 'Option 2', value: 'option2'}, {
        label: 'Option 3',
        value: 'option3'
      }],
      status: ''
    }
  }
}
</script>


<style scoped></style>
