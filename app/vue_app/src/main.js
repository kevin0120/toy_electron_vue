import {createApp} from 'vue'
import App from './App.vue'
import svgloader from './index/components/icon_font'
import router from './router'
const app = createApp(App)
app.use(router)
app.use(svgloader)
app.mount("#app");

