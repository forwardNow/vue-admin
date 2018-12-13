import BaseAPI from '../../common/apis/BaseAPI';

const API = {
  REGISTER: '/api/user/register',
};

export default Object.assign(BaseAPI('user'), API);
