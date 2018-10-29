/**
 * @fileoverview 自定义的组件
 */
import Vue from 'vue';

Vue.component(
  'base-list-view',
  () => import('../views/common/BaseListView.vue'),
);

Vue.component(
  'base-add-view',
  () => import('../views/common/BaseAddView.vue'),
);

Vue.component(
  'base-edit-view',
  () => import('../views/common/BaseEditView.vue'),
);

Vue.component(
  'base-detail-view',
  () => import('../views/common/BaseDetailView.vue'),
);
