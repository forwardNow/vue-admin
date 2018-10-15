<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">添加菜单
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form" label-width="120px"
          ref="formModel" :model="formModel" :rules="rules">

        <el-form-item label="菜单图标" prop="MenuNodeIcon">
          <el-input v-model="formModel.MenuNodeIcon"></el-input>
        </el-form-item>

        <el-form-item label="菜单名称" prop="MenuName">
          <el-input v-model="formModel.MenuName"></el-input>
        </el-form-item>

        <el-form-item label="Url地址" prop="MenuUrl">
          <el-input v-model="formModel.MenuUrl"></el-input>
        </el-form-item>

        <el-form-item label="菜单编码" prop="MenuNo">
          <el-input v-model="formModel.MenuNo"></el-input>
        </el-form-item>

        <el-form-item label="菜单父编码" prop="MenuParentNo">
          <el-input v-model="formModel.MenuParentNo"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>
<script>
import MenuService from '../../services/MenuService';

export default {
  data() {
    return {
      rules: {
        //UserNickname: [
        //  { required: true, message: '必填项', trigger: ['blur', 'change'] },
        //],
      },
      formModel: {
        MenuName: '',
        MenuNodeIcon: '',
        MenuUrl: '',
        MenuNo: '',
        MenuParentNo: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      MenuService.insert(this.formModel).then((res) => {
        if (res.errorCode === 0) {
          this.$message({
            type: 'success',
            message: '添加成功！',
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
            message: '添加失败！',
            showClose: true,
            duration: 1000,
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
<style lang="scss" scoped>
.form {
  width: 600px;
}
</style>

