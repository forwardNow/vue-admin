/**
 * @fileoverview 自定义的过滤器
 */
import Vue from 'vue';

/**
 * Date 转 2010年09月08日 12:02:09
 */
Vue.filter('datetimeFilter', (value) => {
  if (!value) {
    return '';
  }

  const d = new Date(value);
  const year = (`${d.getFullYear()}`).padStart(4, '0');
  const month = (`${d.getMonth() + 1}`).padStart(2, '0');
  const date = (`${d.getDate()}`).padStart(2, '0');
  const hour = (`${d.getHours()}`).padStart(2, '0');
  const minute = (`${d.getMinutes()}`).padStart(2, '0');
  const second = (`${d.getSeconds()}`).padStart(2, '0');

  return `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
});

/**
 * Date 转 2010年09月08日
 */
Vue.filter('dateFilter', (value) => {
  if (!value) {
    return '';
  }

  const d = new Date(value);
  const year = (`${d.getFullYear()}`).padStart(4, '0');
  const month = (`${d.getMonth() + 1}`).padStart(2, '0');
  const date = (`${d.getDate()}`).padStart(2, '0');

  return `${year}年${month}月${date}日`;
});

/**
 * 翻译性别
 */
Vue.filter('genderFilter', (value) => {
  switch (parseInt(value, 10)) {
    case 1:
      return '男';

    case 2:
      return '女';

    default:
      return '';
  }
});
