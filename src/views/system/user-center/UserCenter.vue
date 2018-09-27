<template>
  <!-- .page__main  -->
  <el-container class="page__main-inner">
    <!-- aside -->
    <el-aside class="main__aside" width="200px">
      <el-menu class="aside__menu"
          :router="true"
          default-active="" >
        <el-menu-item index="1" :route="{ name: 'system.userCenter.userManagement' }">
          <i class="iconfont icon-gerentouxiang"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>其他</span>
          </template>
          <el-menu-item index="2">
            <i class="iconfont icon-qunzu"></i>
            <span slot="title">单位管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="iconfont icon-jingliren"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="iconfont icon-shu"></i>
            <span slot="title">字典管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="iconfont icon-cangku_kucunxiangqing"></i>
            <span slot="title">资源管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="iconfont icon-caidan"></i>
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="iconfont icon-duanxin"></i>
            <span slot="title">消息管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- /aside -->

    <!-- content -->
    <el-main class="main__content">


      <!-- breadcrumb  -->
      <el-breadcrumb separator="/" class="content__breadcrumb">
        <el-breadcrumb-item
            v-for="item in breadcrumbRouteList" :key="item.path"
            :to="{ path: item.path }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- /breadcrumb  -->

      <!-- body -->
      <transition mode="out-in" name="admin">
        <router-view class="content__body"></router-view>
      </transition>
      <!-- /body -->

    </el-main>
    <!-- /content -->

  </el-container>
</template>
<script>
export default {
  computed: {
    breadcrumbRouteList() {
      return this.$store.state.breadcrumbRouteList;
    },
  },
};
</script>

