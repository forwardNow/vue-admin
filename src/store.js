import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /** 是否显示 BaseListView 功能按钮插槽 */
    isShowFnSlot: false,

    /** 全局 loading 的状态 */
    isLoading: false,

    /** 当前请求的 URL ，用于左下角的显示 */
    currentUrl: '',

    /** 面包屑导航 */
    breadcrumbRouteList: [],
  },
  mutations: {
    showLoading() {
      this.state.isLoading = true;
    },
    hideLoading() {
      this.state.isLoading = false;
    },
    setBreadcrumbRouteList(state, list = []) {
      this.state.breadcrumbRouteList = list;
    },
    setCurrentUrl(state, url) {
      this.state.currentUrl = url;
    },
  },
  actions: {

  },
});
