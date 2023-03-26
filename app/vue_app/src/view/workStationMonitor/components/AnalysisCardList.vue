<template>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">追溯码</section>
      <section class="cap-card-label-1">
        {{ curveInfo.track_no }}
      </section>
      <img class="cap-card-icon" :src="imgMap.track_no"/>
    </div>
  </div>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">螺栓编号</section>
      <section class="cap-card-label-1">
        {{ curveInfo.bolt_name }}
      </section>
      <img class="cap-card-icon" :src="imgMap.bolt_name"/>
    </div>
  </div>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">拧紧结果</section>
      <section :class="'cap-card-label-1 cap-card-status-' + curveInfo.tightening_result">
        {{ curveInfo.tightening_result }}
      </section>
      <img class="cap-card-icon" :src="imgMap[curveInfo.tightening_result || 'ready']"/>
    </div>
  </div>
  <div class="col-12 md:col-12 lg:col-3 xl:col-3 h-10rem">
    <div class="cap-card">
      <section class="cap-card-label">分析结果</section>
      <section :class="'cap-card-label-1 cap-card-status-' + curveInfo.analysis_result_state">
        {{ curveInfo.analysis_result_state }}
      </section>
      <img class="cap-card-icon" :src="imgMap[curveInfo.analysis_result_state || 'ready']"/>
    </div>
  </div>
</template>

<script>

import imgMap from '../assets/icons';
// const imgMap=imgMap
export default {
  name: 'AnalysisCardList',
  data() {
    return {
      imgMap: imgMap
    }
  },
  components: {
    // imgMap
  },
  props: {
    curveInfo: {
    },
  },

  mounted() {
    console.log(this.curveInfo)
  }
}

</script>


<style scoped></style>
