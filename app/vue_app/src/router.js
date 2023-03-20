import {createRouter, createWebHistory} from 'vue-router'
import Page1 from './index/App.vue'
import Page2 from './subpage/App.vue'
const routes = [
    // {
    //     path: '/',
    //     component: Root
    // },
    {
        path: '/page1',
        name: 'Page1',
        component: Page1
    },
    {
        path: '/page2',
        name: 'Page2',
        component: Page2
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router