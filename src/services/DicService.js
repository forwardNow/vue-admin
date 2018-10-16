import DicAPI from '../apis/DicAPI';
import BaseService from './BaseService';

class DicService extends BaseService {
  constructor() {
    super(DicAPI);
  }
}

export default new DicService();
