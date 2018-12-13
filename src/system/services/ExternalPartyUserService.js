import API from '../apis/ExternalPartyUserAPI';
import BaseService from '../../common/services/BaseService';
import axios from '../../common/plugins/axios';


const Service = new BaseService(API);

Service.getByCondition = bean => axios.post(API.GET_ONE_BY_CONDITION, bean);

export default Service;
