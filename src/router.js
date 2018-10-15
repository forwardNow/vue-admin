import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/session/Login.vue';

Vue.use(Router);

// 按需加载
const NotFoundView = () => import('./views/error/NotFound.vue');

const HomeView = () => import('./views/home/Home.vue');

const UserListView = () => import('./views/user/List.vue');
const UserDetailView = () => import('./views/user/Detail.vue');
const UserEditView = () => import('./views/user/Edit.vue');
const UserRegisterView = () => import('./views/user/Register.vue');
const UserLoginModeView = () => import('./views/user/LoginMode.vue');

const RoleListView = () => import('./views/role/List.vue');

const SubsysListView = () => import('./views/subsys/List.vue');

const MenuListView = () => import('./views/menu/List.vue');


const router = new Router({
  routes: [
    // 根
    { path: '/', redirect: '/home' },

    // 登陆
    { name: 'login', path: '/login', component: Login },

    // 系统
    {
      name: 'home',
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
        },

        // 子系统管理
        {
          path: '/subsys/list',
          component: SubsysListView,
          meta: { requiresAuth: true, title: '子系统管理' },
        },

        // 菜单管理
        {
          path: '/menu/list',
          component: MenuListView,
          meta: { requiresAuth: true, title: '菜单管理' },
        },
      ],
    },
    // 404
    { path: '*', component: NotFoundView },

  ],
});

export default router;
