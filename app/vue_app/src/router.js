import {createRouter, createWebHashHistory} from 'vue-router'
// import Page1 from './index/Example.vue'
// import Page2 from './subpage/Example.vue'
import nprogress from 'nprogress'; // @types/nprogress
const Page1=() => import ('./view/index/App.vue')
const Page2=() => import ('./view/svgimage/App.vue')
const Page3=() => import ('./view/example/App.vue')
const Page4=() => import ('./view/workStationMonitor/App.vue')
const Page5=() => import ('./view/primevue/App.vue')

const routes = [
    {
        path: '/',
        redirect: '/page1'
    },
    {
        path: '/page1',
        name: 'Page1',
        meta: {
            title:  'Page1',
        },
        component: Page1
    },
    {
        path: '/page2',
        name: 'Page2',
        meta: {
            title:  '一些图标',
        },
        component: Page2
    },

    {
        path: '/page3',
        name: 'Page3',
        meta: {
            title:  'Page3',
        },
        component: Page3
    },

    {
        path: '/cap/monitor/:scope/:title?',
        name: 'workstationMonitor',
        meta: {
            title:  '工位监控',
        },
        component: Page4
    },

    {
        path: '/primevue',
        name: 'my primevue',
        meta: {
            title:  'primevue 测试',
        },
        component: Page5
    },
]
const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    nprogress.start(); // 开始加载进度条 页面加载进度条效果

    setTimeout(function () {
        if (to.meta.title) {
            document.title = to.meta.title
        }
        next()
    },200)

})

router.afterEach(() => {
    nprogress.done(); // 加载进度条
});



export default router