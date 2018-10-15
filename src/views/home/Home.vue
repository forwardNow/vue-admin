<template>
  <!-- page -->
  <el-container class="page">

    <!-- header  -->
    <el-header class="page__header">

      <!-- logo -->
      <router-link to="/" class="logo">
        <img src="../../assets/images/logo.png" alt="">
        <div class="title">基础支撑库平台</div>
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
          <template slot="title">{{ user.UserTrueName || '用户' }}</template>
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

      <el-container class="page__main-inner">

        <!-- aside -->
        <el-aside class="main__aside" width="200px">

          <el-menu class="aside__menu" :router="true" :default-active="activeIndex" ref="menuTree">
            <el-submenu index="/user">
              <template slot="title">
                <i class="iconfont icon-yonghu1"></i><span>用户</span>
              </template>
              <el-menu-item index="/user/list">
                <i class="iconfont icon-yonghu1"></i><span slot="title">用户管理</span>
              </el-menu-item>
              <el-menu-item index="/user/register">
                <i class="iconfont icon-zhuce"></i><span slot="title">注册用户</span>
              </el-menu-item>
              <el-menu-item index="/user/loginMode">
                <i class="iconfont icon-denglu"></i><span slot="title">登陆方式</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/role/list">
              <i class="iconfont icon-jiaoseguanli"></i><span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/subsys/list">
              <i class="iconfont icon-juese"></i><span slot="title">子系统管理</span>
            </el-menu-item>
            <el-menu-item index="/menu/list">
              <i class="iconfont icon-caidan"></i><span slot="title">菜单管理</span>
            </el-menu-item>
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
    mounted() {
      this.activeMenuItemByPath();
    },
    data() {
      return {
        activeIndex: null,
        user: {},
      };
    },
    methods: {
      activeMenuItemByPath() {
        // 当前路由
        const path = this.$route.path;

        const openSubMenu = (p) => {
          let subMenuIndex = p.substring(0, p.lastIndexOf('/'));
          console.log(p, subMenuIndex);
          if (subMenuIndex && subMenuIndex !== '/') {
            try {
              this.$refs.menuTree.open(subMenuIndex);
              // TODO: 如果当前路由存在于菜单树，则高亮对应的菜单项
              this.activeIndex = p;
            } catch(e) {
              openSubMenu(subMenuIndex)
            }
          }
        };

        // TODO: 显示当前（active）菜单项
        openSubMenu(path);
      },
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
    computed: {
      breadcrumbRouteList() {
        return this.$store.state.breadcrumbRouteList;
      },
    },
  };
</script>

