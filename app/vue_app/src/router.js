import {createRouter, createWebHistory} from 'vue-router'
// import Page1 from './index/Example.vue'
// import Page2 from './subpage/Example.vue'
import nprogress from 'nprogress'; // @types/nprogress
const Page1=() => import ('./index/App.vue')
const Page2=() => import ('./subpage/App.vue')
const Page3=() => import ('./example/App.vue')
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
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // history: createWebHashHistory(process.env.BASE_URL),
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