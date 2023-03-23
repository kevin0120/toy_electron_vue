<template>
  <div>
    <svg-loader class="alarm-icon" icon="StaticWhiteAlarm" size="3rem"></svg-loader>
    <svg-loader class="pfIcon" icon="RightOne" size="2.5rem"></svg-loader>
  </div>

  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
