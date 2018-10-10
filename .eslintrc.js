module.exports = {
  root: true,
  extends: "airbnb-base",
  env: {
    "browser": true,
    "node": true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 修复使用 webpack 路径别名引起的问题
    'import/no-unresolved': 'warn',
    'import/extensions': 'warn',
    //
  },

  parser: "babel-eslint",

  parserOptions: {
    //parser: 'babel-eslint',
  },
};
