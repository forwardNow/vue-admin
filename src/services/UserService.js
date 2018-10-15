import UserAPI from '../apis/UserAPI';
import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super(UserAPI);
  }
}

export default new UserService();
