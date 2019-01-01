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
               mode="horizontal">
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

          <!--
          <el-menu class="aside__menu" :router="true" :default-active="activeIndex" ref="menuTree"
                   background-color="#373e58"
                   text-color="#f1f1f1"
                    >
            <template v-for="menu in menuTreeItems">
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
          -->

          <el-tree
              :data="menuTreeItems"
              :show-checkbox="false"
              :default-expand-all="false"
              :default-expanded-keys="expandedNodeIds"
              node-key="upcId"
              ref="tree"
              highlight-current
              :props="treeConfig"
              @node-click="handleNodeClick">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span :class="node.icon"></span>
              <span>{{ node.label }}</span>
            </span>
          </el-tree>

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
      this.createMenuTree();
    },
    mounted() {
      this.hilightTreeNodeByRoute();
    },
    data() {
      return {
        menuItems: [],
        menuTreeItems: [],
        user: {},
        expandedNodeIds: [],
        treeConfig: {
          children: 'children',
          label: 'upcRightName'
        }
      };
    },
    methods: {
      /**
       * 构建菜单树
       */
      createMenuTree() {
        /*
        MenuService.getList(null, {"pageSize":100,"currentPage":1}).then(res => {
          if (res.errorCode !== 0) {
            throw new Error('Home.vue: createMenuTree() 获取菜单失败!');
          }
          const menuItems = res.result.items;

          this.menuTreeItems = TreeUtils.createNestedTree(menuItems, null,
            {
              idName: 'upcId',
              parentIdName: 'fatherId',
              subTreeName: 'children',
            });
        });
        */
        const menuItems = [
          { upcId: 0, upcRightName: '系统设置', fatherId: null, url: '/system', icon: 'iconfont icon-jiaoseguanli', expand: false },
          { upcId: 1, upcRightName: '机构管理', fatherId: 0, url: '/system/org', icon: '', },
          { upcId: 2, upcRightName: '部门管理', fatherId: 0, url: '/system/dept', icon: '', },
          { upcId: 3, upcRightName: '角色管理', fatherId: 0, url: '/system/role', icon: '', },
          { upcId: 4, upcRightName: '用户管理', fatherId: 0, url: '/system/user', icon: '', },
          { upcId: 5, upcRightName: '证书管理', fatherId: 0, url: '/system/license', icon: '', expand: false },
          { upcId: 6, upcRightName: '我的证书', fatherId: 5, url: '/system/license/my', icon: '', },
          { upcId: 7, upcRightName: '生成证书', fatherId: 5, url: '/system/license/gen', icon: '', },
          { upcId: 8, upcRightName: '系统日志', fatherId: 0, url: '/system/sysLog', icon: '', },
          { upcId: 9, upcRightName: '业务日志', fatherId: 0, url: '/system/bizLog', icon: '', },
          { upcId: 10, upcRightName: '系统状态', fatherId: 0, url: '/system/sysStatus', icon: '', },
          { upcId: 11, upcRightName: '个人中心', fatherId: null, url: '/profile', icon: '', },
          { upcId: 12, upcRightName: '我的账户', fatherId: 11, url: '/profile/account', icon: '', },
          { upcId: 13, upcRightName: '我的任务', fatherId: 11, url: '/profile/task', icon: '', },
        ];

        this.menuItems = menuItems;

        this.menuItems.forEach((item) => {
          if (item.expand) {
            this.expandedNodeIds.push(item.upcId);
          }
        });

        this.menuTreeItems = TreeUtils.createNestedTree(menuItems, null,
          {
            idName: 'upcId',
            parentIdName: 'fatherId',
            subTreeName: 'children',
          });

        // console.log(this.menuTreeItems);
      },

      /**
       * 当刷新当前页后，根据路由高亮指定菜单
       */
      hilightTreeNodeByRoute() {
        // 当前路由
        const path = this.$route.path;

        const expandParentNode = (item) => {
          const { fatherId } = item;

          if ([ null ].includes(fatherId)) {
            return;
          }

          if (!this.expandedNodeIds.includes(fatherId)) {
            this.expandedNodeIds.push(fatherId);
          }
        };

        // 设置当前 path 的菜单高亮，且被展开
        this.menuItems.some((item) => {
          if (item.url === path) {
            const { upcId } = item;

            this.$refs.tree.setCurrentKey(upcId);

            expandParentNode(item);

            return true;
          }
        });
      },

      /**
       * 登出
       */
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
      handleNodeClick(data) {
        this.$router.push({ path: data.url });
      }
    },

    computed: {
      breadcrumbRouteList() {
        return this.$store.state.breadcrumbRouteList;
      },
    },
    watch: {
      /**
       * 监听路由变化：实时高亮当前路由的菜单树
       */
      $route() {
        this.hilightTreeNodeByRoute();
      }
    }
  };
</script>
<style lang="scss">
  .page {
    .el-tree {
      color: #fff;
      background: #373e58;
    }

    .el-tree-node__label {
      font-size: 16px;
    }

    .el-tree-node__content {
      height: auto;
      padding: 0.5em 0;
      user-select:none;
    }
    .el-tree-node:focus > .el-tree-node__content,
    .el-tree-node__content:hover {
      background-color: rgba(255,255,255, 0.2);
    }

    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
      color: #fff;
      background: #1b2131!important;
      border-left: solid 4px #216bff;
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
  }
</style>

