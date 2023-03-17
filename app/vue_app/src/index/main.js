import {createApp} from 'vue'
import App from './App.vue'
import svgloader from './components/icon_font/'
const app = createApp(App)

app.use(svgloader)
app.mount("#app");
