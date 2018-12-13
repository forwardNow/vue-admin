// @flow
// vue
import Vue from 'vue';

// vue 插件 / HTTP 通信
import './common/plugins/axios';

// vue 插件 / UI 组件库
import './common/plugins/element-ui';

// vue 插件 / 自定义过滤器
import './common/plugins/filter';

// vue 插件 / 自定义指令
import './common/plugins/directive';

// vue 插件 / 自定义组件
import './common/plugins/component';

// 路由
import router from './router';

// 拦截器
import './common/interceptors/index';

// 状态管理
import store from './store';

// 样式
import './common/assets/css/main.scss';

// vue 组件 / 根组件
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
