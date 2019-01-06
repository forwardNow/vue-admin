import merge from 'lodash.merge';

import setBaseAPI from '../../common/apis/BaseAPI';

const API = {};

const mockAPI = merge(setBaseAPI('system/org'), {

});

const prodAPI = {
  GET_ONE: '/systemManage/OrganController/organDetails',

  GET_LIST: '/systemManage/OrganController/organSelectAlls',

  INSERT: '/systemManage/OrganController/organAdd',

  DELETE: '/systemManage/OrganController/deleteOrgan',

  UPDATE: '/systemManage/OrganController/updateOrganById',

  /** 获取所有地区，树形 */
  GET_AREA_TREE: '/systemManage/OrganController/selectCity',

  /** 获取所有的记录 */
  GET_ALL: '/systemManage/OrganController/selectOrgan',
};


if (process.env.runMode === 'mock') {
  merge(API, mockAPI);
} else {
  merge(API, prodAPI);
}

export default API;
