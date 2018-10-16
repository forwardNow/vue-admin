import SubsysAPI from '../apis/SubsysAPI';
import BaseService from './BaseService';

class SubsysService extends BaseService {
  constructor() {
    super(SubsysAPI);
  }
}

export default new SubsysService();
