<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">编辑用户
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form" label-width="80px"
          ref="formModel" :model="formModel" :rules="rules">
        <el-form-item label="姓名" prop="UserTrueName">
          <el-input v-model="formModel.UserTrueName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="UserNickname">
          <el-input v-model="formModel.UserNickname"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="UserHeadImage">
          <el-input v-model="formModel.UserHeadImage"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formModel.Sex" placeholder="请选择">
            <el-option
              v-for="item in genderDicList"
              :key="item.code"
              :label="item.text"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="Phone">
          <el-input v-model="formModel.Phone"></el-input>
        </el-form-item>
        <el-form-item label="座机" prop="Landline">
          <el-input v-model="formModel.Landline"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit()">保存</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>
<script>
import UserService from '../../services/UserService';
import FormFiledValidators from '../../share/FormFiledValidators';

export default {
  created() {
    this.init();
  },
  data() {
    return {
      genderDicList: [
        { code: 1, text: '男' },
        { code: 2, text: '女' },
      ],
      rules: {
        UserNickname: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        Phone: [
          { validator: FormFiledValidators.mobile, trigger: ['blur', 'change'] },
        ],
      },
      formModel: {
        UserId: '',
        UserTrueName: '',
        UserNickname: '',
        UserHeadImage: '',
        Sex: '',
        clientUserSex: null,
        Phone: '',
        Landline: '',
        CreateTime: '',
        ModifiedTime: '',
      },
    };
  },
  methods: {
    init() {
      const UserId = this.$route.query.id;

      UserService.getUserById(UserId).then((res) => {
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
        path: '/user/list',
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

