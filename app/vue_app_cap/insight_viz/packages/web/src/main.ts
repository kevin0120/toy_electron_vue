import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';
import primevuePlus from '/@/plugins/primevue-plus';

// 全局引入css样式
import 'primevue/resources/themes/lara-light-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; // icon
import 'primeflex/primeflex.css'; // primeflex
import './styles/globle.css';
import './styles/cap-card.css';
import './styles/common.css';
import './styles/rewrite-primevue.css';

const app = createApp(App);
setupStore(app);
app.use(router);
primevuePlus(app);

app.mount('#app');
