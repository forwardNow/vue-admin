<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">编辑系统
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form_edit" label-width="120px"
               ref="formModel" :model="formModel" :rules="rules">

        <el-form-item label="系统名称" prop="SystemName">
          <el-input v-model="formModel.SystemName"></el-input>
        </el-form-item>

        <el-form-item label="系统编号" prop="SystemIdenty">
          <el-input v-model="formModel.SystemIdenty"></el-input>
        </el-form-item>

        <el-form-item label="系统描述" prop="SystemDesc">
          <el-input type="textarea" v-model="formModel.SystemDesc"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>

      </el-form>

    </el-main>
  </el-container>
</template>
<script>
import SubsysService from '../../services/SubsysService';

export default {
  data() {
    return {
      rules: {
        //UserNickname: [
        //  { required: true, message: '必填项', trigger: ['blur', 'change'] },
        //],
      },
      formModel: {
        SystemName: '',
        SystemIdenty: '',
        SystemDesc: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      SubsysService.insert(this.formModel).then((res) => {
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
        path: '/subsys/list',
      });
    },
  },
};
</script>
