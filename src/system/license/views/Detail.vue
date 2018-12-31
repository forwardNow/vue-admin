<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">我的证书
      <i class="popup__close el-icon-close" @click="close"></i>
    </el-header>
    <el-main class="popup__content">


    </el-main>
  </el-container>
</template>
<script>
  export default {
    methods: {
      close() {
        this.$router.push({
          path: '/system/license',
        });
      }
    }
  };
</script>