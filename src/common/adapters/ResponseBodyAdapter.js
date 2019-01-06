/**
 * @fileOverview 格式化响应体数据
 * @example
 * { code: 0, message: 'ok', data: null } => { errorCode: 0, reason: 'ok', result: null }
 */

import { RESPONSE_BODY_FORMAT } from '../configs/Var';

function isWellFormatBody(body) {
  return typeof body.errorCode === 'number';
}

export default (res) => {
  if (isWellFormatBody(res)) {
    return res;
  }

  const { ERROR_CODE_NAME, REASON_NAME, RESULT_NAME } = RESPONSE_BODY_FORMAT;

  return {
    errorCode: res[ERROR_CODE_NAME],
    reason: res[REASON_NAME],
    result: res[RESULT_NAME],
  };
};
