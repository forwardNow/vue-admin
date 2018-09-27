// vue
import Vue from 'vue';

// vue 插件 / HTTP 通信
import './plugins/axios';

// vue 插件 / UI 组件库
import './plugins/element-ui';

// vue 插件 / 自定义过滤器
import './plugins/filter';

// vue 创建 / 自定义指令
import './plugins/directive';

// 路由
import router from './router';

// 拦截器
import './interceptors/index';

// 状态管理
import store from './store';

// 样式
import './assets/css/main.scss';

// vue 组件 / 根组件
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
