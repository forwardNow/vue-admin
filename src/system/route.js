import HomeView from '../home/Home.vue';

import SysLogView from './sysLog/views/List.vue';
import BizLogView from './bizLog/views/List.vue';
import SysStatusView from './sysStatus/views/List.vue';

import UserView from './user/views/List.vue';
import UserDetailView from './user/views/Detail.vue';
import UserEditView from './user/views/Edit.vue';
import UserAddView from './user/views/add.vue';

import RoleView from './role/views/List.vue';
import RoleDetailView from './role/views/Detail.vue';
import RoleEditView from './role/views/Edit.vue';
import RoleAddView from './role/views/add.vue';

import OrgView from './org/views/List.vue';
import OrgDetailView from './org/views/Detail.vue';
import OrgEditView from './org/views/Edit.vue';
import OrgAddView from './org/views/add.vue';

import DeptView from './dept/views/List.vue';
import DeptDetailView from './dept/views/Detail.vue';
import DeptEditView from './dept/views/Edit.vue';
import DeptAddView from './dept/views/add.vue';

import LicenseView from './license/views/Index.vue';
import LicenseDetailView from './license/views/Detail.vue';
import LicenseAddView from './license/views/add.vue';

export default {
  path: '/system',
  component: HomeView,
  meta: { requiresAuth: true, title: '系统设置' },
  children: [
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

    // // 菜单管理
    // {
    //   path: 'menu',
    //   component: MenuView,
    //   meta: { requiresAuth: true, title: '菜单管理' },
    // },

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
};
