<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">添加字典
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form_edit" label-width="120px"
          ref="formModel" :model="formModel" :rules="rules">

        <el-form-item label="字典名称" prop="DicName">
          <el-input v-model="formModel.DicName"></el-input>
        </el-form-item>

        <el-form-item label="字典描述" prop="DicDesc">
          <el-input type="textarea" v-model="formModel.DicDesc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>
<script>
import DicService from '../../services/DicService';

export default {
  data() {
    return {
      rules: {
        //UserNickname: [
        //  { required: true, message: '必填项', trigger: ['blur', 'change'] },
        //],
      },
      formModel: {
        DicName: '',
        DicDesc: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      DicService.insert(this.formModel).then((res) => {
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
        path: '/dic/list',
      });
    },
  },
};
</script>

