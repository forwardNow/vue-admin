import Vue from 'vue';
import Router from 'vue-router';
import Login from './session/Login.vue';

Vue.use(Router);

// 按需加载
const NotFoundView = () => import('./common/views/error/NotFound.vue');

const HomeView = () => import('./home/Home.vue');

const UserListView = () => import('./system/views/user/List.vue');
const UserDetailView = () => import('./system/views/user/Detail.vue');
const UserEditView = () => import('./system/views/user/Edit.vue');
const UserRegisterView = () => import('./system/views/user/Register.vue');
const UserLoginModeView = () => import('./system/views/user/LoginMode.vue');

const SubsysListView = () => import('./system/views/subsys/List.vue');
const SubsysAddView = () => import('./system/views/subsys/Add.vue');
const SubsysEditView = () => import('./system/views/subsys/Edit.vue');
const SubsysDetailView = () => import('./system/views/subsys/Detail.vue');

const MenuListView = () => import('./system/views/menu/List.vue');
const MenuAddView = () => import('./system/views/menu/Add.vue');
const MenuEditView = () => import('./system/views/menu/Edit.vue');
const MenuDetailView = () => import('./system/views/menu/Detail.vue');

const RoleListView = () => import('./system/views/role/List.vue');
const RoleAddView = () => import('./system/views/role/Add.vue');
const RoleEditView = () => import('./system/views/role/Edit.vue');
const RoleDetailView = () => import('./system/views/role/Detail.vue');

const DicListView = () => import('./system/views/dic/List.vue');
const DicAddView = () => import('./system/views/dic/Add.vue');
const DicEditView = () => import('./system/views/dic/Edit.vue');
const DicDetailView = () => import('./system/views/dic/Detail.vue');

const ExamPaperListView = () => import('./exam/views/paper/List.vue');
const ExamPaperAddView = () => import('./exam/views/paper/Add.vue');
const ExamPaperEditView = () => import('./exam/views/paper/Edit.vue');
const ExamPaperDetailView = () => import('./exam/views/paper/Detail.vue');


const router = new Router({
  routes: [
    // 根
    { path: '/', redirect: '/home' },

    // 登陆
    { name: 'login', path: '/login', component: Login },

    // 系统
    {
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true, title: '首页' },
      children: [
        /* 用户 /user */


        // 用户管理
        {
          path: '/user/list',
          component: UserListView,
          meta: { requiresAuth: true, title: '用户管理' },
          children: [
            {
              path: '/user/list/detail',
              component: UserDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: '/user/list/edit',
              component: UserEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
          ],
        },

        // 用户注册
        {
          path: '/user/register',
          component: UserRegisterView,
          meta: { requiresAuth: true, title: '用户注册' },
        },

        // 用户登录方式
        {
          path: '/user/loginMode',
          component: UserLoginModeView,
          meta: { requiresAuth: true, title: '登陆方式' },
        },

        // 角色管理
        {
          path: '/role/list',
          component: RoleListView,
          meta: { requiresAuth: true, title: '角色管理' },
          children: [
            {
              path: '/role/list/detail',
              component: RoleDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: '/role/list/edit',
              component: RoleEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
            {
              path: '/role/list/add',
              component: RoleAddView,
              meta: { requiresAuth: true, title: '添加' },
            },
          ],
        },

        // 子系统管理
        {
          path: '/subsys/list',
          component: SubsysListView,
          meta: { requiresAuth: true, title: '子系统管理' },
          children: [
            {
              path: '/subsys/list/detail',
              component: SubsysDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: '/subsys/list/edit',
              component: SubsysEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
            {
              path: '/subsys/list/add',
              component: SubsysAddView,
              meta: { requiresAuth: true, title: '添加' },
            },
          ],
        },

        // 菜单管理
        {
          path: '/menu/list',
          component: MenuListView,
          meta: { requiresAuth: true, title: '菜单管理' },
          children: [
            {
              path: '/menu/list/detail',
              component: MenuDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: '/menu/list/edit',
              component: MenuEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
            {
              path: '/menu/list/add',
              component: MenuAddView,
              meta: { requiresAuth: true, title: '添加' },
            },
          ],
        },

        // 字典管理
        {
          path: '/dic/list',
          component: DicListView,
          meta: { requiresAuth: true, title: '字典管理' },
          children: [
            {
              path: '/dic/list/detail',
              component: DicDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: '/dic/list/edit',
              component: DicEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
            {
              path: '/dic/list/add',
              component: DicAddView,
              meta: { requiresAuth: true, title: '添加' },
            },
          ],
        },

        /* 问卷调查 /exam */

        // 问卷管理
        {
          path: '/exam/paper/list',
          component: ExamPaperListView,
          meta: { requiresAuth: true, title: '问卷管理' },
          children: [
            {
              path: '/exam/paper/list/detail',
              component: ExamPaperDetailView,
              meta: { requiresAuth: true, title: '详情' },
            },
            {
              path: '/exam/paper/list/edit',
              component: ExamPaperEditView,
              meta: { requiresAuth: true, title: '编辑' },
            },
            {
              path: '/exam/paper/list/add',
              component: ExamPaperAddView,
              meta: { requiresAuth: true, title: '编辑' },
            },
          ],
        },
      ],
    },
    // 404
    { path: '*', component: NotFoundView },

  ],
});

export default router;
