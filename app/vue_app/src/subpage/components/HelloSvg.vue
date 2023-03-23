<template>
  <div>
    <svg-loader class="alarm-icon" :icon="icon" size="3rem"></svg-loader>
    <br>
    <span>{{icon}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloSvg',
  // 1.props.定义一个组件从父组件那里获得的属性
  props: {
    icon: String
  },
  data() {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
