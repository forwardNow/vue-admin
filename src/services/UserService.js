import API from '../apis/UserAPI';
import BaseService from './BaseService';
import axios from '../plugins/axios';

const Service = new BaseService(API);

Service.register = bean => axios.post(API.REGISTER, bean);

export default Service;
