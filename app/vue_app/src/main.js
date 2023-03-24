import {createApp} from 'vue'
import App from './App.vue'
import svgloader from './res/icon_font'
import router from './router'
import notifiyplugin from './res/plugin/notify'
import {vuexStore} from "./store";

const app = createApp(App)

app.use(svgloader).
use(notifiyplugin, {
    componentName: 'notifications'
}).use(router).use(vuexStore)
app.mount("#app");

