const merge = require('webpack-merge');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',

  output: {
    publicPath: '../',
  },

  stats: {
    // One of the two if I remember right
    entrypoints: false,
    children: false,
  },

  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true },
          mergeLonghand: false,
          discardComments: {
            removeAll: true,
          },
        },
        canPrint: true,
      }),
      new UglifyJsPlugin(),
    ],
    splitChunks: {
      chunks: 'initial', // 只对入口文件处理
      minSize: 30000,
      cacheGroups: {
        vendor_vue: {
          test: /node_modules\/vue/,
          name: 'vendor_vue',
          priority: 3,
        },
        'vendor_element-ui': {
          test: /node_modules\/element-ui/,
          name: 'vendor_element-ui',
          priority: 2,
        },
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          priority: 1,
        },
        commons: {
          test: /\.js$/,
          name: 'commons',
        },
      },
    },
    runtimeChunk: {
      name: 'js/manifest',
    },
  },

  // 配置插件
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),

    new InlineManifestWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[name].[hash:8].css',
    }),

  ],
});
