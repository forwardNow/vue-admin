import { Message } from 'element-ui';
import router from '../../router';
import SessionService from '../../session/SessionService';
import Store from '../../store';

router.beforeEach((to, from, next) => {
  const hasAuthRoute = to.matched.some(record => record.meta.requiresAuth);
  let redirectRoute;

  if (!hasAuthRoute) {
    redirectRoute = undefined;
    return next(redirectRoute);
  }

  if (!SessionService.isLogin()) {
    redirectRoute = {
      name: 'login',
      query: { status: 401 },
    };

    Message({
      type: 'error',
      message: '未登录！',
      showClose: true,
      duration: 1000,
    });
  }

  // 面包屑导航
  Store.commit('setBreadcrumbRouteList', to.matched);

  return next(redirectRoute);
});
