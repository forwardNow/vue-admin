import API from '../apis/UserAPI';
import BaseService from '../../common/services/BaseService';
import axios from '../../common/plugins/axios';

const Service = new BaseService(API);

Service.register = bean => axios.post(API.REGISTER, bean);

export default Service;
