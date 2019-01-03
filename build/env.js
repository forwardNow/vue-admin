const env = {
  dev: {
    /**
     * @description 所有 API 的前缀。在业务代码里使用
     */
    'process.env.apiPrefix': JSON.stringify(''),

    /**
     * @description API 服务器主机。在构建脚本中使用。
     * @example
     * http://127.0.0.1:8083,    // 本机
     * http://192.168.1.44:8083' // dev
     * http://192.168.1.43:8083' // test
     */
    'process.env.apiHost': 'http://127.0.0.1:8083',
  },
  prod: {
    'process.env.apiPrefix': JSON.stringify(''),
  },
};


module.exports = env;
