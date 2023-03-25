import {createApp} from 'vue'
import App from './App.vue'
import svgloader from './res/icon_font'
import router from './router'
import notifiyplugin from './res/plugin/notify'
import {vuexStore} from "./store";
import primevuePlus from './primevue-plus';
const app = createApp(App)

// 全局引入css样式
import 'primevue/resources/themes/lara-light-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; // icon
import 'primeflex/primeflex.css'; // primeflex
import './styles/globle.css';
import './styles/cap-card.css';
import './styles/common.css';
import './styles/rewrite-primevue.css';




app.use(svgloader).
use(notifiyplugin, {
    componentName: 'notifications'
}).use(router).use(vuexStore);

primevuePlus(app);
app.mount("#app");

