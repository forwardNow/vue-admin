/**
 * @fileoverview 自定义的组件
 */
import Vue from 'vue';

Vue.component(
  'base-list-view',
  () => import('../views/BaseListView.vue'),
);

Vue.component(
  'base-add-view',
  () => import('../views/BaseAddView.vue'),
);

Vue.component(
  'base-edit-view',
  () => import('../views/BaseEditView.vue'),
);

Vue.component(
  'base-detail-view',
  () => import('../views/BaseDetailView.vue'),
);

Vue.component(
  'tree-menu',
  () => import('../views/TreeMenu.vue'),
);
