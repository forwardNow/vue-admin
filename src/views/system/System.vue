<template>
  <!-- page -->
  <el-container class="system page">

    <!-- header  -->
    <el-header class="page__header">

      <!-- logo -->
      <router-link :to="{ name: 'system' }" class="logo">
        <img src="../../assets/images/logo.png" alt="">
        <div class="title">系统管理平台</div>
      </router-link>
      <!-- /logo -->

      <!-- top-menu -->
      <el-menu class="header__top-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#157dc5"
          text-color="#fff"
          active-text-color="#fff">
        <el-submenu index="2">
          <template slot="title">{{ user.clientTrueName || '用户' }}</template>
          <el-menu-item index="2-1" @click="logout()">
            <i class="iconfont icon-dengchu"></i> 退出系统
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <!-- top-menu -->

    </el-header>
    <!-- /header  -->

    <!-- main -->
    <el-main class="page__main">
      <transition mode="out-in" name="admin">
        <router-view class="clearfix page__main-inner"></router-view>
      </transition>
    </el-main>
    <!-- /main -->

  </el-container>
  <!-- /page -->
</template>
<script>
import SessionService from '../../services/SessionService';

export default {
  created() {
    this.user = SessionService.getUserInfo();
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      SessionService.logout().then((res) => {
        if (res.errorCode === 0) {
          this.$message({
            type: 'success',
            message: '成功退出系统！',
            showClose: true,
            duration: 1000,
            onClose: () => this.$router.push({ name: 'login' }),
          });
        } else {
          this.$message({
            type: 'error',
            message: '退出系统失败！',
            showClose: true,
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

