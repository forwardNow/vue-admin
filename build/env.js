const env = {
  dev: {
    /**
     * @description 程序运行的环境：开发、生成。
     * @value "'dev'" | "'prod'" | "'mock'"
     */
    'process.env.runMode': JSON.stringify('dev'),

    /**
     * @description 所有 API 的前缀。在业务代码里使用
     */
    'process.env.apiPrefix': JSON.stringify('/api'),

    /**
     * @description API 服务器主机。在构建脚本中使用。
     * @example
     * http://127.0.0.1:8083,    // 本机
     * http://192.168.1.44:8083' // dev
     * http://192.168.1.43:8083' // test
     */
    'process.env.apiHost': 'http://127.0.0.1:8083',
  },
  mock: {
    'process.env.runMode': JSON.stringify('mock'),
    'process.env.apiPrefix': JSON.stringify('/api'),
    'process.env.apiHost': 'http://127.0.0.1:3000',
  },
  prod: {
    'process.env.runMode': JSON.stringify('prod'),
    'process.env.apiPrefix': JSON.stringify('/api'),
  },
};


module.exports = env;
