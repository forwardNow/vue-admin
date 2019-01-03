/**
 * @fileOverview 格式化响应体数据
 * @example
 * { code: 0, message: 'ok', data: null } => { errorCode: 0, reason: 'ok', result: null }
 */

import { RESPONSE_BODY_FORMAT } from '../configs/Var';

export default (res) => {
  const { ERROR_CODE_NAME, REASON_NAME, RESULT_NAME } = RESPONSE_BODY_FORMAT;

  return {
    errorCode: res[ERROR_CODE_NAME],
    reason: res[REASON_NAME],
    result: res[RESULT_NAME],
  };
};
