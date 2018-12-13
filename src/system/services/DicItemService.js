import BaseService from '../../common/services/BaseService';
import API from '../apis/DicItemAPI';

const Service = new BaseService(API);

const DIC_CACHE = new Map();
const DIC_ITEM_CACHE = new Map();

/**
 * 获取指定字典的条目列表
 * @param DicName {String}
 * @return {Promise<Array>}
 */
Service.getDicList = (DicName) => {
  if (DIC_CACHE.has(DicName)) {
    return Promise.resolve(DIC_CACHE.get(DicName));
  }

  return Service.getList({ DicName }, { pageSize: 100, currentPage: 1 }).then((res) => {
    if (res.errorCode === 0) {
      const {
        result: {
          items,
        },
      } = res;

      DIC_CACHE.set(DicName, items);

      return Promise.resolve(items);
    }

    return Promise.reject(new Error('getDicList(): 获取字典失败'));
  });
};

/**
 * 根据 ItemCode 获取 ItemValue
 * @param DicName {String} 字典名称
 * @param ItemCode {String} 条目编码
 * @return {Promise<String>}
 */
Service.getValueByCode = async (DicName, ItemCode) => {
  const key = `${DicName}.${ItemCode}`;

  if (DIC_ITEM_CACHE.has(key)) {
    return Promise.resolve(DIC_ITEM_CACHE.get(key));
  }

  await Service.getDicList(DicName);

  let itemValue = null;

  DIC_CACHE.get(DicName).some((item) => {
    if (item.ItemCode === String(ItemCode)) {
      itemValue = item.ItemValue;
      DIC_ITEM_CACHE.set(key, itemValue);
      return true;
    }
    return false;
  });

  return Promise.resolve(itemValue);
};

export default Service;
