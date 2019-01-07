import merge from 'lodash.merge';

import setBaseAPI from '../../common/apis/BaseAPI';

const API = {};

const mockAPI = merge(setBaseAPI('system/role'), {

});

const prodAPI = {
  GET_ONE: '/systemManage/UserRoleController/roleDetails',

  GET_LIST: '/systemManage/UserRoleController/selectUserRole',

  INSERT: '/systemManage/',

  DELETE: '/systemManage/UserRoleController/deleteUserRole',

  UPDATE: '/systemManage/',
};

if (process.env.runMode === 'mock') {
  merge(API, mockAPI);
} else {
  merge(API, prodAPI);
}

export default API;
