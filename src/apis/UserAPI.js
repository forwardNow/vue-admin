/** 用户 */
const UserAPI = {
  /** 列表 */
  LIST: '/api/user/list',

  /** 用户名唯一性校验 */
  CHECK_LOGIN_NAME_UNIQUE: '/api/user/unique',

  /** 添加用户 */
  ADD_USER: '/api/user/add',

  /** 查找 */
  FIND_BY_ID: '/api/user/get',

  /** 删除用户 */
  DELETE_USER: '/api/user/delete',

  /** 更新用户 */
  UPDATE_USER: '/api/user/edit',
};
export default UserAPI;
