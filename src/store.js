import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    currentUrl: '',
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
