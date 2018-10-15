import MenuAPI from '../apis/MenuAPI';
import BaseService from './BaseService';

class MenuService extends BaseService {
  constructor() {
    super(MenuAPI);
  }
}

export default new MenuService();
