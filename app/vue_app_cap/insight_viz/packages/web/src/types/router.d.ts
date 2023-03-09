import 'vue-router';

// 补充路由meta字段的类型定义
declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
  }
}
