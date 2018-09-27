/**
 * @fileoverview 自定义的指令
 */

import Vue from 'vue';

/**
 * 注册一个全局自定义指令 `v-focus`
 */
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el) {
    // 聚焦元素
    if (el.tagName === 'INPUT') {
      el.focus();
    } else {
      const nodeList = el.getElementsByTagName('input');
      if (nodeList.length > 0) {
        nodeList[0].focus();
      }
    }
  },
});
