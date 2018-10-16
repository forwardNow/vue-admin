<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">用户详情
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">
      <table class="table_detail">
        <colgroup>
          <col width="10%">
          <col width="40%">
          <col width="10%">
          <col width="40%">
        </colgroup>
        <tbody>
        <tr>
          <td>姓名</td> <td>{{ user.UserTrueName }}</td>
          <td>昵称</td> <td>{{ user.UserNickname }}</td>
        </tr>
        <tr>
          <td>头像</td> <td>{{ user.UserHeadImage }}</td>
          <td>性别</td> <td>{{ user.Sex | genderFilter }}</td>
        </tr>
        <tr>
          <td>联系电话</td> <td>{{ user.Phone }}</td>
          <td>座机</td> <td>{{ user.Landline }}</td>
        </tr>
        <tr>
          <td>创建时间</td> <td>{{ user.CreateTime | datetimeFilter }}</td>
          <td>修改时间</td> <td>{{ user.ModifiedTime | datetimeFilter }}</td>
        </tr>
        </tbody>
      </table>
    </el-main>
  </el-container>
</template>
<script>
  import UserService from '../../services/UserService';

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
        UserService.get({ UserId: this.$route.query.id } ).then((res) => {
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
          path: '/user/list',
        });
      },
    },
  };
</script>
