import merge from 'lodash.merge';
import axios from '../plugins/axios';
import paginationResultAdapter from '../adapters/PaginationResultAdapter';

/**
 * 去掉以 “$_” 打头的表单字段
 */
function fmtBean(bean) {
  const newBean = merge({}, bean);

  Reflect.ownKeys(bean).forEach((key) => {
    if (key.startsWith('$_')) {
      delete newBean[key];
    }
  });

  return newBean;
}

class BaseService {
  /**
   *
   * @param API {{INSERT?: string, DELETE?: string,
   * UPDATE?: string, GET_ONE?: string, GET_LIST?: string}}
   */
  constructor(API) {
    this.API = API;
  }

  /**
   * 插入一条数据
   * @param bean
   * @return {AxiosPromise<any>}
   */
  insert(bean) {
    return axios.post(this.API.INSERT, fmtBean(bean));
  }

  /**
   * 删除一条数据
   * @param bean
   * @return {AxiosPromise<any> | * | void}
   */
  delete(bean) {
    return axios.post(this.API.DELETE, fmtBean(bean));
  }

  /**
   * 更新一条数据
   * @param bean
   * @return {AxiosPromise<any> | * | void}
   */
  update(bean) {
    return axios.post(this.API.UPDATE, fmtBean(bean));
  }

  /**
   * 获取一条数据
   * @param bean
   * @return {AxiosPromise<any> | * | void}
   */
  get(bean) {
    if (Reflect.ownKeys(bean).length === 0) {
      throw new Error('bean prop is required!');
    }
    return axios.post(this.API.GET_ONE, fmtBean(bean));
  }

  /**
   * 获取一页数据
   * @param bean
   * @param pager
   * @return {AxiosPromise<any> | * | void}
   */
  getList(bean, pager) {
    const param = { condition: {}, pager };
    const newBean = fmtBean(bean);
    merge(param.condition, newBean);
    merge(param, newBean);
    return axios.post(this.API.GET_LIST, param).then((res) => {
      const newRes = merge({}, res);

      newRes.result = paginationResultAdapter(newRes.result);

      return newRes;
    });
  }
}

export default BaseService;
