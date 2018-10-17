<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">注册用户
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form_edit" label-width="80px"
               ref="formModel" :model="formModel" :rules="rules">

        <el-row :gutter="20">
          <el-col :span="12">

            <el-form-item label="用户名" prop="ExternalPartyUser.ExternalIdentifier">
              <el-input v-model="formModel.ExternalPartyUser.ExternalIdentifier"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="ExternalPartyUser.ExternalCredential">
              <el-input v-model="formModel.ExternalPartyUser.ExternalCredential"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="ExternalPartyUser.confirmPassword">
              <el-input v-model="formModel.ExternalPartyUser.confirmPassword"></el-input>
            </el-form-item>

            <el-form-item label="头像" prop="">
              <el-input v-model="formModel.User.UserHeadImage"></el-input>
            </el-form-item>

            <el-form-item label="昵称" prop="">
              <el-input v-model="formModel.User.UserNickname"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="User.UserTrueName">
              <el-input v-model="formModel.User.UserTrueName"></el-input>
            </el-form-item>

            <el-form-item label="性别">
              <el-select v-model="formModel.User.Sex" placeholder="请选择">
                <el-option
                    v-for="item in genderDicList"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="人员类别">
              <el-select v-model="formModel.User.PeopleCategory" placeholder="请选择">
                <el-option
                    v-for="item in peopleCategoryDicList"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="联系电话" prop="Phone">
              <el-input v-model="formModel.User.Phone"></el-input>
            </el-form-item>
            <el-form-item label="住址" prop="Address">
              <el-input v-model="formModel.User.Address"></el-input>
            </el-form-item>

            <el-form-item label="座机" prop="Landline">
              <el-input v-model="formModel.User.Landline"></el-input>
            </el-form-item>

            <el-form-item label="QQ号码" prop="QqNumber">
              <el-input v-model="formModel.User.QqNumber"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="Email">
              <el-input v-model="formModel.User.Email"></el-input>
            </el-form-item>



          </el-col>

        </el-row>

        <el-row>
          <el-col :span="24" class="text_center">

            <el-button type="primary" @click="handleSubmit()">保存</el-button>

          </el-col>
        </el-row>

      </el-form>

    </el-main>
  </el-container>
</template>
<script>
  import UserService from '../../services/UserService';
  import ExternalPartyUserService from '../../services/ExternalPartyUserService';

  export default {
    created() {
      this.init();
    },
    data() {
      const confirmPwdValidator = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else if (value !== this.formModel.ExternalPartyUser.ExternalCredential) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const ExternalIdentifierUniqueValidator = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else {
          const ExternalIdentifier = this.formModel.ExternalPartyUser.ExternalIdentifier;

          ExternalPartyUserService.getByCondition({ ExternalIdentifier })
              .then((res) => {
                if (res.errorCode === 0) {
                  return callback(new Error('已存在！'));
                } else if (res.errorCode === 1) {
                  return callback();
                } else {
                  callback(new Error('唯一性校验：失败，未知错误。'));
                }
              })
              .catch(() => {
                callback(new Error('唯一性校验：失败，未知错误。'));
              });
        }
      };
      return {
        genderDicList: [
          { code: '1', text: '男' },
          { code: '2', text: '女' },
        ],
        peopleCategoryDicList: [
          { code: '1', text: '计生' },
          { code: '2', text: '卫生' },
        ],
        roleList: [],
        rules: {
          ExternalPartyUser: {
            ExternalIdentifier: [
              { required: true, message: '必填项', trigger: ['blur', 'change'] },
              { validator: ExternalIdentifierUniqueValidator, trigger: ['blur'] },
            ],
            ExternalCredential: [
              { required: true, message: '必填项', trigger: ['blur', 'change'] },
            ],
            confirmPassword: [
              { required: true, message: '必填项', trigger: ['blur', 'change'] },
              { validator: confirmPwdValidator, trigger: ['blur', 'change'] },
            ],
          },
          User: {
            UserTrueName: [
              { required: true, message: '必填项', trigger: ['blur', 'change'] },
            ],
          },
        },
        confirmPassword: '',
        formModel: {
          User: {
            UserTrueName: '',
            UserNickname: '',
            UserHeadImage: '',
            Sex: null,
            PeopleCategory: null,
            Phone: '',
            Address: '',
            Landline: '',
            QqNumber: '',
            Email: '',
          },
          ExternalPartyUser: {
            ExternalIdentifier: '',
            ExternalCredential: '',
          },
        },
      };
    },
    methods: {
      init() {

      },
      handleSubmit() {
        UserService.register(this.formModel).then((res) => {
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
          path: '/user/list',
        });
      },
    },
  };
</script>
<style scoped>
  .form_edit {
    width: 100%;
  }
</style>