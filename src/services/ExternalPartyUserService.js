import API from '../apis/ExternalPartyUserAPI';
import BaseService from './BaseService';
import axios from '../plugins/axios';


const Service = new BaseService(API);

Service.getByCondition = bean => axios.post(API.GET_ONE_BY_CONDITION, bean);

export default Service;
