/**
 * HTTP 响应拦截处理
 */
import { Message } from 'element-ui';
import axiosInstance from '../plugins/axios';
import store from '../../store';
import router from '../../router';
import SessionService from '../../session/SessionService';

function handleStatus(url, status) {
  let desc;

  store.commit('hideLoading');

  // console.log('响应错误：', status);

  // 小于 400 的 code 值不是异常码
  if (status < 400) {
    return;
  }

  switch (status) {
    case 401: {
      desc = '登陆失效，请重新登陆！';

      SessionService.remove();

      setTimeout(() => {
        router.push({
          name: 'login',
          query: { status: 401 },
        });
      }, 2000);
      break;
    }
    case 403: {
      desc = '没有访问权限！';
      break;
    }
    case 404: {
      desc = '资源不存在！';
      break;
    }
    case 500: {
      desc = '服务器内部错误！';
      break;
    }
    case 504: {
      desc = 'API 服务器异常！';
      break;
    }
    default: {
      desc = '未知错误!';
      break;
    }
  }

  const msg = `【${status}】${url} ${desc}`;

  console.warn(msg);

  Message({
    showClose: true,
    message: msg,
    type: 'error',
    duration: 3000,
  });
}

axiosInstance.interceptors.response.use(
  // HTTP 状态码：2xx
  (res) => {
    const { data } = res;
    let errorCode;
    let reason;
    let result;

    /*
     * 针对 { code: 0, message: '', result: null } 做适配
     */
    if ('code' in data) {
      ({ code: errorCode, message: reason, result } = data);
    } else {
      ({ errorCode, reason, result } = data);
    }

    console.log('响应：', res);

    // SessionService.setToken(res.headers.token);

    handleStatus(res.config.url, errorCode);
    // 处理数据部分 res.data

    return { errorCode, reason, result };
  },

  // HTTP 状态码：4xx 5xx
  (error) => {
    let status;
    let url;

    try {
      ({
        config: { url },
        response: { status },
      } = error);
    } catch (e) {
      console.warn('参数解析错误！', e);
      status = 500;
    }

    handleStatus(url, status);

    return Promise.reject(error);
  },
);
