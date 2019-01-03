
const API = {
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

export default API;
