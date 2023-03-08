import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import nprogress from 'nprogress'; // @types/nprogress
import 'nprogress/nprogress.css';
import { ROUTER_PATH, ROUTER_NAME, MOBILE_ROUTER_PATH, MOBILE_ROUTER_NAME } from '/@/router/constant';
import Test from '/@/layout/test.vue';
import MobileNavigation from '/@/layout/MobileNavigation.vue';
import { isMobile } from '/@/utils/navigator';
import { useUserStoreWithOut } from '/@/store/modules/user';

const pcRoutes: RouteRecordRaw[] = [
  {
    path: `${ROUTER_PATH.workstationMonitor}/:scope/:title?`,
    name: ROUTER_NAME.workstationMonitor,
    component: () => import('../views/workstation-monitor-page/index.vue'),
    meta: {
      title: '工位监控'
    }
  },
  {
    path: `${ROUTER_PATH.curveAnalysis}/:entity_id?`,
    name: ROUTER_NAME.curveAnalysis,
    component: () => import('../views/curve-analysis-page/index.vue'),
    meta: {
      title: '曲线分析'
    }
  },
  {
    path: `${ROUTER_PATH.curveComparison}/:entity_id?`,
    name: ROUTER_NAME.curveComparison,
    component: () => import('..//views/curve-comparison-page/index.vue'),
    meta: {
      title: '曲线叠加'
    }
  },
  {
    path: `${ROUTER_PATH.boxReferenceCurve}/:entity_id?`,
    name: ROUTER_NAME.boxReferenceCurve,
    component: () => import('../views/box-set-reference-curve-page/index.vue'),
    meta: {
      title: '设置参考曲线'
    }
  },
  {
    path: `${ROUTER_PATH.boxAnalysis}/:entity_id?`,
    name: ROUTER_NAME.boxAnalysis,
    component: () => import('../views/box-analysis-page/index.vue'),
    meta: {
      title: 'BOX分析'
    }
  },
  {
    path: `${ROUTER_PATH.statisticalAnalysis}/:bolt_name?`,
    name: ROUTER_NAME.statisticalAnalysis,
    component: () => import('../views/statistical-analysis-page/index.vue'),
    meta: {
      title: '统计分析'
    }
  }
];

if (import.meta.env.DEV) {
  // 开发环境添加测试路由
  pcRoutes.push({
    path: '/',
    component: Test,
    meta: {
      requiresAuth: true
    }
    // children: []
  });
}

const mobileRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MobileNavigation,
    redirect: MOBILE_ROUTER_PATH.workstationList,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: MOBILE_ROUTER_PATH.workstationList,
        name: MOBILE_ROUTER_PATH.workstationList,
        component: () => import('../views/workstation-list-page/Mobile.vue'),
        meta: {
          title: '工位列表',
          requiresAuth: true
        }
      },
      {
        path: MOBILE_ROUTER_PATH.user,
        name: MOBILE_ROUTER_NAME.user,
        component: () => import('../views/user/index.vue'),
        meta: {
          title: '用户',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: `${ROUTER_PATH.workstationMonitor}/:scope/:title?`,
    name: ROUTER_NAME.workstationMonitor,
    component: () => import('../views/workstation-monitor-page/Mobile.vue'),
    meta: {
      title: '工位监控',
      requiresAuth: true
    }
  },
  {
    path: MOBILE_ROUTER_PATH.login,
    name: MOBILE_ROUTER_NAME.login,
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录'
    }
  }
];
const toggleRoutes: RouteRecordRaw[] = isMobile() ? mobileRoutes : pcRoutes;

const routes: RouteRecordRaw[] = [
  {
    path: ROUTER_PATH.notFound,
    name: ROUTER_NAME.notFound,
    component: () => import('../views/error-page/NotFound.vue'),
    meta: {
      title: '404'
    }
  },
  {
    //访问不存在的路由 重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: ROUTER_PATH.notFound
  },
  ...toggleRoutes
];

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes // 路由规则
});

router.beforeEach((to, _from) => {
  nprogress.start(); // 开始加载进度条 页面加载进度条效果
  document.title = to?.meta?.title || 'CAP';
  const userStore = useUserStoreWithOut();
  if (isMobile() && to.meta.requiresAuth && !userStore.userInfo) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: MOBILE_ROUTER_PATH.login,
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    };
  }
});

router.afterEach(() => {
  nprogress.done(); // 加载进度条
});

export default router;
