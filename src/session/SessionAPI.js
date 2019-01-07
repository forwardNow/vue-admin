import merge from 'lodash.merge';

const API = {};

const mockAPI = {
  /** 登陆认证 */
  LOGIN: '/system/user/login',

  /** 登出：退出系统 */
  LOGOUT: '/system/user/logout',
};

const prodAPI = {
  /** 登陆认证 */
  LOGIN: '/systemManage/UserController/userLogin',

  /** 登出：退出系统 */
  LOGOUT: '/systemManage/UserController/userLogOut',
};

if (process.env.runMode === 'mock') {
  merge(API, mockAPI);
} else {
  merge(API, prodAPI);
}

export default API;
