<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">用户详情
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">
      <table class="table_simple">
        <colgroup>
            <col width="10%">
            <col width="40%">
            <col width="10%">
            <col width="40%">
        </colgroup>
        <tbody>
          <tr>
            <td>登录名</td> <td>{{ user.clientName }}</td>
            <td>姓名</td> <td>{{ user.clientTrueName }}</td>
          </tr>
          <tr>
            <td>密码</td> <td>{{ user.clientPassword }}</td>
            <td>性别</td> <td>{{ user.clientUserSex | genderFilter }}</td>
          </tr>
          <tr>
            <td>手机</td> <td>{{ user.clientUserPhoneNum }}</td>
            <td>邮箱</td> <td>{{ user.clientUserEmail }}</td>
          </tr>
          <tr>
            <td>创建时间</td> <td>{{ user.createtime | datetimeFilter }}</td>
            <td>修改时间</td> <td>{{ user.modifiedtime | datetimeFilter }}</td>
          </tr>
        </tbody>
      </table>
    </el-main>
  </el-container>
</template>
<script>
import UserService from '../../../../services/UserService';

export default {
  created() {
    this.init();
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    init() {
      const clientId = this.$route.params.id;

      UserService.getUserById(clientId).then((res) => {
        if (res.errorCode === 0) {
          this.user = res.result;
        } else if (res.errorCode === 1) {
          this.$message({
            type: 'error',
            message: '该用户不存在！',
            showClose: true,
            duration: 2000,
          });
        }
      });
    },
    handleClosePopup() {
      this.$router.push({
        name: 'system.userCenter.userManagement',
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

