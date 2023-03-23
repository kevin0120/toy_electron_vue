<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <svg-loader class="alarm-icon" icon="StaticWhiteAlarm" size="3rem"></svg-loader>
    <svg-loader class="pfIcon" icon="RightOne" size="2.5rem"></svg-loader>
    <svg-loader class="alarm-icon" icon="ActiveFile" size="3rem"></svg-loader>
    <svg-loader class="pfIcon" icon="ActiveFileList" size="2.5rem"></svg-loader>
  </div>

  <HelloWorld msg="Welcome to Your Vue.js App">
    <template v-slot:header>
      <h1>Here might be a page title</h1>
    </template>

    <template v-slot:default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>

    <template v-slot:footer>
      <p>Here's some contact info</p>
    </template>
  </HelloWorld>

  <Example/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Example from './components/Example.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Example
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
