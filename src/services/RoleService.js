import RoleAPI from '../apis/RoleAPI';
import BaseService from './BaseService';

class RoleService extends BaseService {
  constructor() {
    super(RoleAPI);
  }
}

export default new RoleService();
