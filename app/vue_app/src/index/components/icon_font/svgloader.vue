<template>
  <svg :class="styls" aria-hidden="true" v-if="icon">
    <use :xlink:href="icon_addr" />
  </svg>
</template>

<script>
export default {
  name: "svgloader",
  props: {
    icon: {
      type: String,
      required: true,
    },
    icon_style: {
      type: null,
      default: "",
    },
    size: {
      type: null,
      default: "1rem",
    },
    w:{
    type: null,
      default: "0",  
    },
    h:{
      type: null,
      default: "0",
    }
  },
  computed: {
    icon_addr() {
      return `#icon-${this.icon}`;
    },
    _height(){
      if(this.h=='0'){
        return this.size
      }
      return this.h;
    },
    _weight(){
      if(this.w=='0'){
        return this.size
      }
      return this.w;
    },
    styls() {
      if (this.icon_style) {
        return "icon-defalut " + this.icon_style;
      } else {
        return "icon-defalut";
      }
    },
  },
};
</script>

<style scoped>
.icon-defalut {
  width: v-bind(_weight);
  height: v-bind(_height);
  fill: currentColor;
  overflow: hidden;
  display: flexbox;
}
</style>
