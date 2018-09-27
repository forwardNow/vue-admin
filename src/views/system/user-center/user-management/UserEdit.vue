<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">新增用户
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form" label-width="80px"
          ref="formModel" :model="formModel" :rules="rules">
        <el-form-item label="登录名" prop="clientName">
          <el-input v-model="formModel.clientName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="clientPassword">
          <el-input type="password" v-model="formModel.clientPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="_clientPassword">
          <el-input type="password" v-model="formModel._clientPassword"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formModel.clientTrueName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formModel.clientUserSex" placeholder="请选择">
            <el-option
              v-for="item in genderDicList"
              :key="item.code"
              :label="item.text"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="clientUserPhoneNum">
          <el-input v-model="formModel.clientUserPhoneNum"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="clientUserEmail">
          <el-input v-model="formModel.clientUserEmail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit()">保存</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>
<script>
import UserService from '../../../../services/UserService';
import FormFiledValidators from '../../../../share/FormFiledValidators';

export default {
  created() {
    this.init();
  },
  data() {
    const confirmPwdValidator = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else if (value !== this.formModel.clientPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      genderDicList: [
        { code: 0, text: '男' },
        { code: 1, text: '女' },
      ],
      rules: {
        clientPassword: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        _clientPassword: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
          { validator: confirmPwdValidator, trigger: ['blur', 'change'] },
        ],
        clientUserPhoneNum: [
          { validator: FormFiledValidators.mobile, trigger: ['blur', 'change'] },
        ],
        clientUserEmail: [
          { validator: FormFiledValidators.email, trigger: ['blur', 'change'] },
        ],
      },
      formModel: {
        clientId: '',
        clientName: '',
        clientPassword: '',
        _clientPassword: '',
        clientTrueName: '',
        clientUserSex: null,
        clientUserPhoneNum: '',
        clientUserEmail: '',
      },
    };
  },
  methods: {
    init() {
      const clientId = this.$route.params.id;

      UserService.getUserById(clientId).then((res) => {
        if (res.errorCode === 0) {
          const user = res.result;

          Object.keys(this.formModel).forEach((key) => {
            this.formModel[key] = user[key];
          });
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
    handleSubmit() {
      UserService.updateUser(this.formModel).then((res) => {
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
          this.$emit('finishAddUser');
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

