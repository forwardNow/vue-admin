module.exports = {
  /** API 前缀 */
  API_PREFIX: process.env.apiPrefix,

  /** 响应体格式 */
  RESPONSE_BODY_FORMAT: {
    ERROR_CODE_NAME: 'code',
    REASON_NAME: 'message',
    RESULT_NAME: 'result',
  },
};
