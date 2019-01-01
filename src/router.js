import Vue from 'vue';
import Router from 'vue-router';
import Login from './session/Login.vue';

import HomeView from './home/Home.vue';
import NotFoundView from './common/views/error/NotFound.vue';

import SysLogView from './system/sysLog/views/List.vue';
import BizLogView from './system/bizLog/views/List.vue';
import SysStatusView from './system/sysStatus/views/List.vue';

import UserView from './system/user/views/List.vue';
import UserDetailView from './system/user/views/Detail.vue';
import UserEditView from './system/user/views/Edit.vue';
import UserAddView from './system/user/views/add.vue';

import RoleView from './system/role/views/List.vue';
import RoleDetailView from './system/role/views/Detail.vue';
import RoleEditView from './system/role/views/Edit.vue';
import RoleAddView from './system/role/views/add.vue';

import OrgView from './system/org/views/List.vue';
import OrgDetailView from './system/org/views/Detail.vue';
import OrgEditView from './system/org/views/Edit.vue';
import OrgAddView from './system/org/views/add.vue';

import DeptView from './system/dept/views/List.vue';
import DeptDetailView from './system/dept/views/Detail.vue';
import DeptEditView from './system/dept/views/Edit.vue';
import DeptAddView from './system/dept/views/add.vue';

import LicenseView from './system/license/views/Index.vue';
import LicenseDetailView from './system/license/views/Detail.vue';
import LicenseAddView from './system/license/views/add.vue';

import AccountView from './profile/account/views/Index.vue';
import TaskView from './profile/task/views/Index.vue';

Vue.use(Router);


const router = new Router({
  routes: [
    // 根
    { path: '/', component: HomeView },

    // 登陆
    { name: 'login', path: '/login', component: Login },

    // 系统
    {
      path: '/system',
      component: HomeView,
      meta: { requiresAuth: true, title: '系统设置' },
      children: [
        // 用户管理
        {
          path: 'user',
          component: UserView,
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

        // 角色管理
        {
          path: 'role',
          component: RoleView,
          meta: { requiresAuth: true, title: '角色管理' },
          children: [
            {
              path: 'add',
              component: RoleAddView,
              meta: { requiresAuth: true, title: '创建角色' },
            },
            {
              path: 'detail',
              component: RoleDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: 'edit',
              component: RoleEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
          ],
        },

        // 机构管理
        {
          path: 'org',
          component: OrgView,
          meta: { requiresAuth: true, title: '机构管理' },
          children: [
            {
              path: 'add',
              component: OrgAddView,
              meta: { requiresAuth: true, title: '创建机构' },
            },
            {
              path: 'detail',
              component: OrgDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: 'edit',
              component: OrgEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
          ],
        },

        // 部门管理
        {
          path: 'dept',
          component: DeptView,
          meta: { requiresAuth: true, title: '部门管理' },
          children: [
            {
              path: 'add',
              component: DeptAddView,
              meta: { requiresAuth: true, title: '创建部门' },
            },
            {
              path: 'detail',
              component: DeptDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: 'edit',
              component: DeptEditView,
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

        // 证书管理
        {
          path: 'license',
          component: LicenseView,
          meta: { requiresAuth: true, title: '证书管理' },
          children: [
            {
              path: 'my',
              component: LicenseDetailView,
              meta: { requiresAuth: true, title: '我的证书' },
            },
            {
              path: 'gen',
              component: LicenseAddView,
              meta: { requiresAuth: true, title: '生成证书' },
            },
          ],
        },
      ],
    },

    // 个人中心
    {
      path: '/profile',
      component: HomeView,
      meta: { requiresAuth: true, title: '个人中心' },
      children: [
        // 我的账户
        {
          path: 'account',
          component: AccountView,
          meta: { requiresAuth: true, title: '我的账户' },
        },

        // 我的任务
        {
          path: 'task',
          component: TaskView,
          meta: { requiresAuth: true, title: '我的任务' },
        },
      ],
    },


    // 404
    { path: '*', component: NotFoundView },

  ],
});

export default router;
