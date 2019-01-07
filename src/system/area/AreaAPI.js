import merge from 'lodash.merge';

import setBaseAPI from '../../common/apis/BaseAPI';

const API = {};

const mockAPI = merge(setBaseAPI('system/area'), {

});

const prodAPI = {
  GET_LIST: 'xxx',
};


if (process.env.runMode === 'mock') {
  merge(API, mockAPI);
} else {
  merge(API, prodAPI);
}

export default API;
