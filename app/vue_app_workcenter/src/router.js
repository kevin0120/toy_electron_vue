import {createRouter, createWebHistory} from 'vue-router'
// import Page1 from './index/Example.vue'
// import Page2 from './subpage/Example.vue'
import nprogress from 'nprogress'; // @types/nprogress
const Page1=() => import ('./page1/App.vue')
const Page2=() => import ('./workstation-monitor-page/index.vue')

const routes = [
    {
        path: '/',
        redirect: '/page1'
    },
    {
        path: '/page1',
        name: 'Page1',
        component: Page1
    },
    {
        path: '/page2',
        name: 'Page2',
        component: Page2
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    nprogress.start(); // 开始加载进度条 页面加载进度条效果
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

router.afterEach(() => {
    nprogress.done(); // 加载进度条
});



export default router