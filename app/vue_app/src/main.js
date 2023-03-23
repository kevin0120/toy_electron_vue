import {createApp} from 'vue'
import App from './App.vue'
import svgloader from './res/icon_font'
import router from './router'
import notifiyplugin from './res/plugin/notify'

const app = createApp(App)
app.use(router)
app.use(svgloader)

app.use(notifiyplugin, {
    componentName: 'notifications'
})
app.mount("#app");

