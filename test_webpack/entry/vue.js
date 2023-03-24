import { createApp } from "vue";
import App from "V@/App.vue";
import svgicon from "V@/icon_font/";
const app = createApp(App);

app.use(svgicon);
app.mount("#example");
