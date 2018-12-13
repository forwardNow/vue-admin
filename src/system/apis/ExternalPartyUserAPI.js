import BaseAPI from '../../common/apis/BaseAPI';

const API = {
  GET_ONE_BY_CONDITION: '/api/externalPartyUser/getByCondition',
};

export default Object.assign(BaseAPI('externalPartyUser'), API);
