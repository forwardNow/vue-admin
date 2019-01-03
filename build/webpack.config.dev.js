const webpack = require('webpack');
const merge = require('webpack-merge');
const FlowWebpackPlugin = require('flow-webpack-plugin');

const baseConfig = require('./webpack.config.base');
const { dev } = require('./env');

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  // 配置 webpack-dev-server
  devServer: {
    // 自动打开浏览器
    open: true,

    // 端口号
    port: 8000,

    // 设置根目录
    contentBase: 'src',

    // 启用热更新:第 1 步
    hot: true,

    // 代理
    proxy: {
      '/api': 'http://localhost:3000',
      '/systemManage': dev['process.env.apiHost'],
    },
  },

  // 配置插件
  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new FlowWebpackPlugin({ failOnError: true }),

  ],
});
