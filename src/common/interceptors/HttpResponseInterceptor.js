/**
 * HTTP 响应拦截处理
 */
import { Message } from 'element-ui';
import axiosInstance from '../plugins/axios';
import store from '../../store';
import router from '../../router';
import SessionService from '../../session/SessionService';
import responseBodyAdapter from '../adapters/ResponseBodyAdapter';
import paginationResultAdapter from '../adapters/PaginationResultAdapter';

/**
 * 处理响应的错误码
 * @param url 请求的 URL
 * @param errorCode 错误码
 */
function handleGlobalErrorCode(url, errorCode) {
  let desc;

  // 小于 400 的 errorCode 值不是全局异常码
  if (errorCode < 400) {
    return;
  }

  switch (errorCode) {
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
    case 600: {
      desc = '参数解析错误！';
      break;
    }
    default: {
      desc = '未知错误!';
      break;
    }
  }

  const msg = `【${errorCode}】${url} ${desc}`;

  console.warn(msg);

  Message({
    showClose: true,
    message: msg,
    type: 'error',
    duration: 3000,
  });
}

/**
 * 格式化响应体 json 数据
 * @param res
 * @return {{errorCode, reason, result}}
 */
function formatResponse(res) {
  const newRes = responseBodyAdapter(res);
  const { result } = newRes;

  /*
   * 如果是列表，则进行适配
   *
   * @example
   *
   * { errorCode: 0, result: [] }
   *
   * =>
   *
   * {
   *    errorCode: 0,
   *    result: { items: [] }
   * }
   */
  if (Array.isArray(result)) {
    const pager = { currentPage: 1, pageSize: result.length, total: result.length };

    newRes.result = { items: result, pager };
    return newRes;
  }


  /*
   * 如果不是格式良好的分页数据，则进行适配
   *
   * @example
   *
   * { errorCode: 0, result: [] }
   *
   * =>
   *
   * {
   *    errorCode: 0,
   *    result: { items: [] }
   * }
   */
  newRes.result = paginationResultAdapter(result);

  return newRes;
}

axiosInstance.interceptors.response.use(
  /**
   * 如果 HTTP 状态码全部为 200（或 2xx），则根据处理响应体中 json 的 errorCode 进行错误处理
   * @param res
   * @return {{errorCode, reason, result}}
   */
  (res) => {
    const fmtRes = formatResponse(res.data);
    const { errorCode, reason, result } = fmtRes;

    console.log('响应：', res);

    // 隐藏全局 loading
    store.commit('hideLoading');

    handleGlobalErrorCode(res.config.url, errorCode);
    // 处理数据部分 res.data

    return { errorCode, reason, result };
  },

  /**
   * 如果状态码不为 2xx，则根据 HTTP 状态码来处理
   * @param error
   * @return {Promise<never>}
   */
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
      status = 600;
    }

    // 隐藏全局 loading
    store.commit('hideLoading');

    handleGlobalErrorCode(url, status);

    return Promise.reject(error);
  },
);
