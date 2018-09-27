import Vue from 'vue';
import axios from 'axios';

const Plugin = {};
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const axiosConfig = {
  // baseURL: process.env.baseURL || process.env.apiUrl || '',
  validateStatus(status) {
    return status >= 200 && status < 300; // default
  },
  timeout: 60 * 1000, // Timeout
};

/**
 * 通过自定义的配置创建的 axios 实例。
 */
const axiosInstance = axios.create(axiosConfig);

Plugin.install = function install() {
  Vue.$axios = axiosInstance;
  window.$axios = axiosInstance;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return axiosInstance;
      },
    },
  });
};

Vue.use(Plugin);

export default axiosInstance;
