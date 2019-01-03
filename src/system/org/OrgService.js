import API from './OrgAPI';
import BaseService from '../../common/services/BaseService';
import axios from '../../common/plugins/axios';

const Service = new BaseService(API);

Service.getAreaTree = () => axios.get(API.GET_AREA_TREE);

Service.getAll = () => axios.get(API.GET_ALL);

export default Service;
