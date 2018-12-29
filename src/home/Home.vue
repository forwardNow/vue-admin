<template>
  <!-- page -->
  <el-container class="page">

    <!-- header  -->
    <el-header class="page__header">

      <!-- logo -->
      <router-link to="/" class="logo">
        <div class="title"><!-- 安全业务审批系统 --><img src="../common/assets/images/logo.png" alt=""></div>
      </router-link>
      <!-- /logo -->

      <!-- top-menu -->
      <el-menu class="header__top-menu"
               mode="horizontal"
               @select="handleSelect">
        <el-submenu index="2">
          <template slot="title">{{ (user && user.userRealName) || '用户' }}</template>
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

          <el-menu class="aside__menu" :router="true" :default-active="activeIndex" ref="menuTree"
                   background-color="#373e58"
                   text-color="#f1f1f1"
                    >
            <template v-for="menu in menus">
              <template v-if="menu.children && menu.children.length > 0">
                <el-submenu :index="menu.url">
                  <template slot="title">
                    <i :class="menu.icon"></i><span>{{ menu.upcRightName }}</span>
                  </template>
                  <template v-for="submenu in menu.children">
                    <el-menu-item :index="submenu.url">
                      <i :class="submenu.icon"></i><span slot="title">{{ submenu.upcRightName }}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="menu.url">
                  <i :class="menu.icon"></i><span slot="title">{{ menu.upcRightName }}</span>
                </el-menu-item>
              </template>
            </template>
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
  import SessionService from '../session/SessionService';
  import MenuService from '../system/services/MenuService';
  import TreeUtils from '../common/utils/TreeUtils';

  export default {
    created() {
      this.user = SessionService.getUserInfo();
      this.getMenus();
    },
    mounted() {
      this.activeMenuItemByPath();
    },
    data() {
      return {
        activeIndex: null,
        user: {},
        menus: [],
      };
    },
    methods: {
      getMenus() {
        /*
        MenuService.getList(null, {"pageSize":100,"currentPage":1}).then(res => {
          if (res.errorCode !== 0) {
            throw new Error('Home.vue: getMenus() 获取菜单失败!');
          }
          const items = res.result.items;

          this.menus = TreeUtils.createNestedTree(items, null,
            {
              idName: 'upcId',
              parentIdName: 'fatherId',
              subTreeName: 'children',
            });
        });
        */
        const items = [
          { upcId: 0, upcRightName: '系统设置', fatherId: null, url: '/system', icon: 'iconfont icon-jiaoseguanli', },
          { upcId: 1, upcRightName: '用户管理', fatherId: 0, url: '/system/user', icon: '', },
          { upcId: 2, upcRightName: '角色管理', fatherId: 0, url: '/role/list', icon: '', },
          { upcId: 3, upcRightName: '机构管理', fatherId: 0, url: '/dept/list', icon: '', },
          { upcId: 4, upcRightName: '系统状态', fatherId: 0, url: '/system/sysStatus', icon: '', },
          { upcId: 5, upcRightName: '证书管理', fatherId: 0, url: '/system/license', icon: '', },
          { upcId: 51, upcRightName: '我的证书', fatherId: 0, url: '/license/list', icon: '', },
          { upcId: 6, upcRightName: '系统日志', fatherId: 0, url: '/system/sysLog', icon: '', },
          { upcId: 7, upcRightName: '业务日志', fatherId: 0, url: '/system/bizLog', icon: '', },
          { upcId: 8, upcRightName: '个人中心', fatherId: 0, url: '/myProfile/list', icon: '', },
        ];

        this.menus = TreeUtils.createNestedTree(items, null,
          {
            idName: 'upcId',
            parentIdName: 'fatherId',
            subTreeName: 'children',
          });
      },
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
<style lang="scss">
  .page {
    .aside__menu {
      border-right: solid 1px #373e58;
      border-bottom-right-radius: 6px;
    }

    .el-breadcrumb {
      margin: 20px 0 20px 0;
      padding-left: 10px;
      line-height: 20px;
      border-left: solid 4px #216bff;
    }


    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      color: #000;
    }
    .el-breadcrumb__inner a:hover,
    .el-breadcrumb__inner.is-link:hover {
      color: #409EFF;
      cursor: pointer;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      font-weight: 400;
      color: #606266;
      cursor: text;
    }

    .el-breadcrumb__item:last-child .el-breadcrumb__inner {
      color: #333;
    }

    .el-submenu__title,
    .el-menu-item {
      user-select:none;
    }

    .el-menu-item.is-active {
      color: #fff;
      background: #1b2131!important;
      border-left: solid 4px #216bff;
    }
  }
</style>

