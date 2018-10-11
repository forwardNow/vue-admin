import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/session/Login.vue';

Vue.use(Router);

// 按需加载
const NotFoundView = () => import('./views/error/NotFound.vue');
const HomeView = () => import('./views/home/Home.vue');
const UserListView = () => import('./views/user/List.vue');
const UserDetailView = () => import('./views/user/Detail.vue');


const router = new Router({
  routes: [
    // 根
    { path: '/', redirect: { name: 'home' } },

    // 登陆
    { name: 'login', path: '/login', component: Login },

    // 系统
    {
      name: 'home',
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true, title: '首页' },
      children: [
        // 用户管理
        {
          path: '/user/list',
          component: UserListView,
          meta: { requiresAuth: true, title: '用户管理' },
          children: [
            {
              path: 'detail',
              component: UserDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
          ],
        },

        // 菜单管理
      ],
    },
    // 404
    { path: '*', component: NotFoundView },

  ],
});

export default router;
