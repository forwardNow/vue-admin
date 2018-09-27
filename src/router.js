import Vue from 'vue';
import Router from 'vue-router';
import SystemComponent from './views/system/System.vue';
import Login from './views/session/Login.vue';

Vue.use(Router);

// 按需加载
const NotFoundComponent = () => import('./views/error/NotFound.vue');
const LaunchPadComponent = () => import('./views/system/LaunchPad.vue');

const UserCenterComponent = () => import('./views/system/user-center/UserCenter.vue');
const UserManagementComponent = () => import('./views/system/user-center/user-management/UserManagement.vue');
const UserAddComponent = () => import('./views/system/user-center/user-management/UserAdd.vue');
const UserEditComponent = () => import('./views/system/user-center/user-management/UserEdit.vue');
const UserDetailComponent = () => import('./views/system/user-center/user-management/UserDetail.vue');

const router = new Router({
  routes: [
    // 根
    { path: '/', redirect: { name: 'system' } },

    // 登陆
    { name: 'login', path: '/login', component: Login },

    // 系统
    {
      // name: 'system',
      path: '/system',
      component: SystemComponent,
      meta: { requiresAuth: true, title: '系统' },
      children: [

        // 子系统选择界面（默认路由）
        {
          name: 'system',
          path: '',
          component: LaunchPadComponent,
          meta: { requiresAuth: true, title: '系统' },
        },

        // 子系统/用户中心
        {
          name: 'system.userCenter',
          path: 'userCenter',
          component: UserCenterComponent,
          meta: { requiresAuth: true, title: '用户中心' },
          children: [
            {
              name: 'system.userCenter.userManagement',
              path: 'userManagement',
              component: UserManagementComponent,
              meta: { requiresAuth: true, title: '用户管理' },
              children: [
                {
                  name: 'system.userCenter.userManagement.add',
                  path: 'add',
                  component: UserAddComponent,
                  meta: { requiresAuth: true, title: '新增用户' },
                },
                {
                  name: 'system.userCenter.userManagement.edit',
                  path: 'edit/:id',
                  component: UserEditComponent,
                  meta: { requiresAuth: true, title: '编辑用户' },
                },
                {
                  name: 'system.userCenter.userManagement.detail',
                  path: 'detail/:id',
                  component: UserDetailComponent,
                  meta: { requiresAuth: true, title: '用户详情' },
                },
              ],
            },
          ],
        },

      ],
    },
    // 404
    { path: '*', component: NotFoundComponent },

  ],
});

export default router;
