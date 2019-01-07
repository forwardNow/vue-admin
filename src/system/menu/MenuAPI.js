import merge from 'lodash.merge';

import setBaseAPI from '../../common/apis/BaseAPI';

const API = {};

const mockAPI = merge(setBaseAPI('system/menu'), {

});

const prodAPI = {
  GET_ONE: '/systemManage/department/',

  GET_LIST: '/systemManage/department/selectAllSection',

  INSERT: '/systemManage/department/',

  DELETE: '/systemManage/department/',

  UPDATE: '/systemManage/department/',
};


if (process.env.runMode === 'mock') {
  merge(API, mockAPI);
} else {
  merge(API, prodAPI);
}

export default API;
