import Vue from 'vue';
import Router from 'vue-router';
import Login from './session/Login.vue';

import HomeView from './home/Home.vue';

import SysLogView from './system/sysLog/views/List.vue';
import BizLogView from './system/bizLog/views/List.vue';
import SysStatusView from './system/sysStatus/views/List.vue';

import NotFoundView from './common/views/error/NotFound.vue';


import UserListView from './system/user/views/List.vue';
import UserDetailView from './system/user/views/Detail.vue';
import UserEditView from './system/user/views/Edit.vue';
import UserAddView from './system/user/views/add.vue';

Vue.use(Router);


const router = new Router({
  routes: [
    // 根
    { path: '/', redirect: '/system' },

    // 登陆
    { name: 'login', path: '/login', component: Login },

    // 系统
    {
      path: '/system',
      component: HomeView,
      meta: { requiresAuth: true, title: '系统设置' },
      children: [
        /* 用户 /user */


        // 用户管理
        {
          path: 'user',
          component: UserListView,
          meta: { requiresAuth: true, title: '用户管理' },
          children: [
            {
              path: 'add',
              component: UserAddView,
              meta: { requiresAuth: true, title: '创建用户' },
            },
            {
              path: 'detail',
              component: UserDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: 'edit',
              component: UserEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
          ],
        },

        // 系统日志
        {
          path: 'sysLog',
          component: SysLogView,
          meta: { requiresAuth: true, title: '系统日志' },
        },

        // 业务日志
        {
          path: 'bizLog',
          component: BizLogView,
          meta: { requiresAuth: true, title: '系统日志' },
        },

        // 系统状态
        {
          path: 'sysStatus',
          component: SysStatusView,
          meta: { requiresAuth: true, title: '系统状态' },
        },

      ],
    },
    // 404
    { path: '*', component: NotFoundView },

  ],
});

export default router;
