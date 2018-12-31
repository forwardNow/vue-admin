<template>
  <el-container class="content__body-license content__body">
    <el-main class="content">
      <!-- 添加模板 -->
      <transition mode="out-in" name="admin">
        <router-view class="popup" ref="popup"></router-view>
      </transition>
      <!-- 添加模板 -->
  </el-main>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    },
  };
</script>
<style scoped>
  .content__body-license.content__body {
    background: none;
  }
</style>