import BaseAPI from './BaseAPI';

const API = {
  REGISTER: '/api/user/register',
};

export default Object.assign(BaseAPI('user'), API);
