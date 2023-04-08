<template>
  <div style="width: 10%">
    <svg-loader class="alarm-icon" :icon="icon" size="3rem" :color="color" :stroke="stroke"></svg-loader>
    <br>
    <span>{{ icon }}</span>
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
      color: "red",
      stroke: "green"
    }
  },
  methods: {

    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#"
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  },
  created() {
    setInterval(() => {
    this.color=this.getRandomColor();
    this.stroke=this.getRandomColor();
    }, 500)
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
