module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    
    // 修复使用 webpack 路径别名引起的问题
    'import/no-unresolved': 'warn',
    'import/extensions': 'warn',
    // 
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
