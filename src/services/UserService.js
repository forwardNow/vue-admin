/**
 * @fileoverview 用户（user）服务
 */
import axios from '../plugins/axios';
import UserAPI from '../apis/UserAPI';

const UserService = {};


/**
 * 按条件获取用户列表（模糊查询）
 * @param {string} UserTrueName
 * @param {{pageSize: number, currentPage: number}} pager
 * @returns {Promise} res.result 是一个 User 数组
 */
UserService.getUserList = (UserTrueName, pager) => axios.post(UserAPI.LIST, {
  UserTrueName, pager,
});

/**
 * 根据 id 获取用户
 * @param {string} UserId 主键 ID
 * @returns {Promise} res.result 是一个 User 对象
 */
UserService.getUserById = UserId => axios.post(UserAPI.FIND_BY_ID, { UserId });

/**
 * 根据 id 删除用户
 * @param {string} clientId 主键 ID
 * @returns {Promise}
 */
UserService.deleteUserById = clientId => axios.post(UserAPI.DELETE_USER, { clientId });

/**
 * 更新用户
 * @param {object} user
 */
UserService.updateUser = user => axios.post(UserAPI.UPDATE_USER, user);

/**
 * 检查登录名的唯一性
 * @param {string} clientName 登录名
 */
UserService.checkUserUnique = clientName => axios.post(
  UserAPI.CHECK_LOGIN_NAME_UNIQUE,
  { clientName },
);

/**
 * 添加用户
 * @param {Object} user 用户
 */
UserService.addUser = user => axios.post(UserAPI.ADD_USER, user);

export default UserService;
