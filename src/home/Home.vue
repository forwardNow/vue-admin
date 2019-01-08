<template>
  <!-- page -->
  <section class="page clearfix">

    <!-- header  -->
    <header class="page__header">

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

    </header>
    <!-- /header  -->

    <!-- main -->
    <main class="page__main">

        <!-- aside -->
        <aside class="main__aside">

          <!-- logo -->
          <router-link to="/" class="logo">
            <div class="title">安全业务审批系统</div>
          </router-link>
          <!-- /logo -->

          <el-tree
              class="aside__menu"
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

        </aside>
        <!-- /aside -->

        <!-- content -->
        <main class="main__content">

          <div class="content__breadcrumb">
            <!-- breadcrumb  -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                  v-for="item in breadcrumbRouteList" :key="item.path"
                  :to="{ path: item.path }">
                {{ item.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>
            <!-- /breadcrumb  -->
          </div>

          <!-- body -->
          <transition mode="out-in" name="admin">
            <router-view class="content__body"></router-view>
          </transition>
          <!-- /body -->

        </main>
        <!-- /content -->


    </main>
    <!-- /main -->

  </section>
  <!-- /page -->
</template>
<script>
  import SessionService from '../session/SessionService';
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
          // { upcId: 4, upcRightName: '菜单管理', fatherId: 0, url: '/system/menu', icon: '', },
          { upcId: 5, upcRightName: '用户管理', fatherId: 0, url: '/system/user', icon: '', },
          { upcId: 6, upcRightName: '证书管理', fatherId: 0, url: '/system/license', icon: '', expand: false },
          { upcId: 7, upcRightName: '我的证书', fatherId: 6, url: '/system/license/my', icon: '', },
          { upcId: 8, upcRightName: '生成证书', fatherId: 6, url: '/system/license/gen', icon: '', },
          { upcId: 9, upcRightName: '系统日志', fatherId: 0, url: '/system/sysLog', icon: '', },
          { upcId: 10, upcRightName: '业务日志', fatherId: 0, url: '/system/bizLog', icon: '', },
          { upcId: 11, upcRightName: '系统状态', fatherId: 0, url: '/system/sysStatus', icon: '', },

          { upcId: 15, upcRightName: '业务审批', fatherId: null, url: '/bizAudit', icon: '', },
          { upcId: 16, upcRightName: '业务申请', fatherId: 15, url: '/bizAudit/apply', icon: '', },
          { upcId: 17, upcRightName: '业务审核', fatherId: 15, url: '/bizAudit/verify', icon: '', },
          { upcId: 18, upcRightName: '业务审批', fatherId: 15, url: '/bizAudit/audit', icon: '', },
          { upcId: 19, upcRightName: '业务配置', fatherId: 15, url: '/bizAudit/config', icon: '', },
          { upcId: 20, upcRightName: '业务调试', fatherId: 15, url: '/bizAudit/debug', icon: '', },
          { upcId: 21, upcRightName: '模板管理', fatherId: 15, url: '/bizAudit/template', icon: '', },

          { upcId: 12, upcRightName: '个人中心', fatherId: null, url: '/profile', icon: '', },
          { upcId: 13, upcRightName: '我的账户', fatherId: 12, url: '/profile/account', icon: '', },
          { upcId: 14, upcRightName: '我的任务', fatherId: 12, url: '/profile/task', icon: '', },
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

            SessionService.remove();
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

