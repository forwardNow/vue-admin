import HomeView from '../home/Home.vue';

export default {
  path: '/bizAudit',
  component: HomeView,
  meta: { requiresAuth: true, title: '业务审批' },
  children: [
    // 机构管理
    // {
    //   path: 'apply',
    //   component: ApplyView,
    //   meta: { requiresAuth: true, title: '业务申请' },
    //   children: [
    //     {
    //       path: 'add',
    //       component: OrgAddView,
    //       meta: { requiresAuth: true, title: '创建机构' },
    //     },
    //     {
    //       path: 'detail',
    //       component: OrgDetailView,
    //       meta: { requiresAuth: true, title: '详情' },
    //     },
    //     {
    //       path: 'edit',
    //       component: OrgEditView,
    //       meta: { requiresAuth: true, title: '编辑' },
    //     },
    //   ],
    // },

  ],
};
