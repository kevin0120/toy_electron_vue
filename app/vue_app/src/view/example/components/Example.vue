<template>
  <div><h1>{{ computedTitle }}</h1>
    <p>{{ description }}</p><select v-model="selectedOption">
      <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
    </select>
    <button @click="submitForm">Submit</button>
    <p>Status: {{ status }}</p></div>
</template>

<script>
export default {
  name: 'MySelectForm',
  props: {formTitle: {type: String, required: true}},
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
  },
  computed: {
    computedTitle() {
      return `Select Form - ${this.formTitle}`
    }
  },
  watch: {
    selectedOption(newVal, oldVal) {
      console.log(`Selected option changed from ${oldVal} to ${newVal}`)
    }
  },
  created() {
    console.log('Example Component created')
  },
  mounted() {

    console.log("你可以看到如下全局变量")
    console.log(this.$router,this.$route)
    console.log(this.$store.state)
    console.log('Example Component mounted')
  },
  updated() {
    console.log('Example Component updated')
  },
  unmounted() {
    console.log('Example Component destroyed')
  },
  methods: {
    submitForm() {
      // Do something with the selected option
      console.log(this.selectedOption);
      this.status = 'Form submitted!'
    }
  }
} </script>
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
