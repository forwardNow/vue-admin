import API from './AreaAPI';
import BaseService from '../../common/services/BaseService';
import TreeUtils from '../../common/utils/TreeUtils';

const Service = new BaseService(API);

Service.getAreaTree = () => {
  return Service.getList({}, { currentPage: 1, pageSize: 10000 }).then((res) => {
    const { errorCode, result: { items } } = res;
    const areaMap = {};

    if (errorCode !== 0) {
      return Promise.reject(new Error('【系统管理 / 区域】获取区域列表失败'));
    }

    items.forEach((item) => {
      const {
        provinceCode,
        provinceName,
        cityCode,
        cityName,
        townCode,
        townName,
      } = item;

      areaMap[provinceCode] = {
        code: provinceCode,
        value: provinceName,
        parentCode: null,
      };
      areaMap[cityCode] = {
        code: cityCode,
        value: cityName,
        parentCode: provinceCode,
      };
      areaMap[townCode] = {
        code: townCode,
        value: townName,
        parentCode: cityCode,
      };
    });

    const areaItems = Reflect.ownKeys(areaMap).map(code => areaMap[code]);

    const tree = TreeUtils.createNestedTree(areaItems, null,
      {
        idName: 'code',
        parentIdName: 'parentCode',
        subTreeName: 'children',
      });

    // console.log(tree);

    return Promise.resolve(tree);
  });
};

export default Service;
