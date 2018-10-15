<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">角色详情
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">
      <table class="table_simple">
        <colgroup>
          <col width="20%">
          <col width="80%">
        </colgroup>
        <tbody>
        <tr> <td>角色名称</td> <td>{{ role.RoleName }}</td> </tr>
        <tr> <td>角色类别</td> <td>{{ role.RoleCategory }}</td> </tr>
        </tbody>
      </table>
    </el-main>
  </el-container>
</template>
<script>
  import RoleService from '../../services/RoleService';

  export default {
    created() {
      this.init();
    },
    data() {
      return {
        role: {},
      };
    },
    methods: {
      init() {
        RoleService.get({ RoleId: this.$route.query.id } ).then((res) => {
          if (res.errorCode === 0) {
            this.role = res.result;
          } else if (res.errorCode === 1) {
            this.$message({
              type: 'error',
              message: '该角色不存在！',
              showClose: true,
              duration: 2000,
            });
          }
        });
      },
      handleClosePopup() {
        this.$router.push({
          path: '/role/list',
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .form {
    width: 400px;
  }
</style>

