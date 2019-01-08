import HomeView from '../home/Home.vue';
import AccountView from './account/views/Index.vue';
import TaskView from './task/views/Index.vue';

export default {
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
};
