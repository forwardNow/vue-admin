import router from '../router';
import SessionService from '../services/SessionService';
import Store from '../store';

router.beforeEach((to, from, next) => {
  Store.commit('setBreadcrumbRouteList', to.matched);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!SessionService.isLogin()) { // 未登陆
      next({
        name: 'login',
        query: { status: 401 },
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});
