import API from './UserAPI';
import BaseService from '../../common/services/BaseService';
import axios from '../../common/plugins/axios';

const Service = new BaseService(API);

Service.resetPassword = user => axios.post(API.RESET_PWD, user);

export default Service;
