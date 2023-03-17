import {createApp } from "vue";
const { App } = require("V@/App.vue");
// import SvgIcon from 'V@/SvgIcon.vue'
import svgicon from 'V@/icon_font/'
const app = createApp(App);

app.use(svgicon)
app.mount("#example");
