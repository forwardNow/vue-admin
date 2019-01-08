import Vue from 'vue';
import Router from 'vue-router';
import Login from './session/Login.vue';

import HomeView from './home/Home.vue';
import NotFoundView from './common/views/error/NotFound.vue';

import systemRoute from './system/route';
import profileRoute from './profile/route';
import bizAuditRoute from './bizAudit/route';


Vue.use(Router);


const routes = [
  // 根
  { path: '/', redirect: '/home' },

  // 登陆
  { name: 'login', path: '/login', component: Login },

  // swagger ui
  // { path: '/api', component: () => import('./swagger/SwaggerUI.vue') },

  // 主页
  { path: '/home', component: HomeView, meta: { requiresAuth: true } },

  // 个人中心
  profileRoute,

  // 管理系统
  systemRoute,

  // 业务审批
  bizAuditRoute,

  // 404
  { path: '*', component: NotFoundView },

];


const router = new Router({ routes });

export default router;
