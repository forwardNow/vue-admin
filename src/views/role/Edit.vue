<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">编辑角色
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form" label-width="120px"
               ref="formModel" :model="formModel" :rules="rules">

        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="formModel.RoleName"></el-input>
        </el-form-item>

        <el-form-item label="角色类别" prop="RoleCategory">
          <el-input v-model="formModel.RoleCategory"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>

      </el-form>

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
      rules: {
        //UserNickname: [
        //  { required: true, message: '必填项', trigger: ['blur', 'change'] },
        //],
      },
      formModel: {
        RoleId: '',
        RoleName: '',
        RoleCategory: '',
      },
    };
  },
  methods: {
    init() {
      const RoleId = this.$route.query.id;

      RoleService.get({ RoleId: RoleId }).then((res) => {
        if (res.errorCode === 0) {
          const user = res.result;

          Object.keys(this.formModel).forEach((key) => {
            this.formModel[key] = user[key];
          });
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
    handleSubmit() {
      RoleService.update(this.formModel).then((res) => {
        if (res.errorCode === 0) {
          this.$message({
            type: 'success',
            message: '更新成功！',
            showClose: true,
            duration: 1000,
          });

          // 关闭
          this.handleClosePopup();

          // 告知父组件
          this.$emit('finish');
        } else {
          this.$message({
            type: 'error',
            message: '更新失败！',
            showClose: true,
            duration: 1000,
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
  width: 600px;
}
</style>

