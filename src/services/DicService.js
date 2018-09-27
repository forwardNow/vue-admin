/**
 * 字典服务
 */
const axios = require('../plugins/axios');
const DicAPI = require('../apis/DicAPI');

const DicService = {};

/** 缓存字典数据 */
const cache = {};

/**
 * 获取字典列表
 * @param {string} dicName
 */
DicService.getDicListByName = (dicName) => {
  // 如果缓存里面有，则从缓存里取
  if (cache[dicName]) {
    return Promise.resolve(cache[dicName]);
  }

  // 缓存里没有，则取请求
  return axios.post(DicAPI.GET_DIC_LIST_BY_NAME, { dicName });
};

export default DicService;
