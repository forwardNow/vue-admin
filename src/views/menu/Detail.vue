<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">菜单详情
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">
      <table class="table_detail">
        <colgroup>
          <col width="20%">
          <col width="80%">
        </colgroup>
        <tbody>
        <tr> <td>菜单图标</td> <td>{{ menu.MenuNodeIcon }}</td> </tr>
        <tr> <td>菜单名称</td> <td>{{ menu.MenuName }}</td> </tr>
        <tr> <td>Url地址</td> <td>{{ menu.MenuUrl }}</td> </tr>
        <tr> <td>菜单编码</td> <td>{{ menu.MenuNo }}</td> </tr>
        <tr> <td>菜单父编码</td> <td>{{ menu.MenuParentNo }}</td> </tr>
        </tbody>
      </table>
    </el-main>
  </el-container>
</template>
<script>
  import MenuService from '../../services/MenuService';

  export default {
    created() {
      this.init();
    },
    data() {
      return {
        menu: {},
      };
    },
    methods: {
      init() {
        MenuService.get({ MenuId: this.$route.query.id } ).then((res) => {
          if (res.errorCode === 0) {
            this.menu = res.result;
          } else if (res.errorCode === 1) {
            this.$message({
              type: 'error',
              message: '该菜单不存在！',
              showClose: true,
              duration: 2000,
            });
          }
        });
      },
      handleClosePopup() {
        this.$router.push({
          path: '/menu/list',
        });
      },
    },
  };
</script>
