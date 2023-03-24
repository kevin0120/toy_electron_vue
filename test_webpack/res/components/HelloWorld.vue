<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ msg1 }}</h1>
    <!--    3.slot 定义获取的父组件的内容-->
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot> hello main </slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  // 1.props.定义一个组件从父组件那里获得的属性
  props: {
    msg: String,
  },
  // 1.data()函数定义一个组件渲染所需的变量可以制定一个初始值
  data() {
    return {
      msg1: "hello data",
    };
  },
};
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
