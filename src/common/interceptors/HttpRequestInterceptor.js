/**
 * HTTP 请求拦截处理
 */

import axiosInstance from '../plugins/axios';
import store from '../../store';
import { API_PREFIX } from '../configs/Var';

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('请求：', config);

    // eslint-disable-next-line
    // config.headers.token = SessionService.getToken();

    // eslint-disable-next-line
    config.url = API_PREFIX + config.url;

    store.commit('showLoading');
    store.commit('setCurrentUrl', config.url);

    return config;
  },
  (error) => {
    console.log('请求错误：', error);
    store.commit('showLoading');
    return Promise.reject(error);
  },
);
