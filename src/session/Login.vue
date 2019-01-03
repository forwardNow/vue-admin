<template>
  <div class="login clearfix">
    <main class="login__main clearfix">
      <div class="ball"></div>
      <div class="panel clearfix">
        <div class="panel__heading">安全业务审批系统</div>
        <div class="panel__body">
          <el-form :model="userForm" :rules="rules" ref="userForm" class="demo-userForm">
            <el-form-item prop="loginName">
              <el-input v-model="userForm.loginName" placeholder="请输入您的账号" v-focus>
                <template slot="prefix"><span class="icon icon-user"></span></template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="userForm.password" placeholder="请输入您的密码"
                        @keyup.enter.native="onSubmit()">
                <template slot="prefix"><span class="icon icon-pwd"></span></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn_submit" type="primary"
                         @click="onSubmit('userForm')"
                         :loading="isLoading">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import SessionService from './SessionService';

export default {
  data() {
    return {
      isLoading: false,
      userForm: {
        loginName: 'admin',
        password: '111111',
      },
      rules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.userForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }

        this.isLoading = true;

        const { loginName, password } = this.userForm;

        return SessionService.login(loginName, password).then((res) => {
          const { errorCode, reason, result } = res;
          let msg = null;

          switch (errorCode) {
            case 0: {
              this.$message({
                type: 'success',
                message: '登录成功！',
                showClose: true,
                duration: 1000,
              });

              SessionService.store(result);

              // 如果是 401 过来的，则退一步
              if (this.$route.query.status === 401) {
                this.$router.go(-1);
              } else {
                this.$router.push({ path: '/' });
              }

              break;
            }
            case 1:
            case 2:
            case 3: {
              this.$message({
                type: 'error',
                message: reason,
                showClose: true,
                duration: 1000,
              });
            }
          }

          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
      });
    },
  },
};
</script>

<style scoped src="./assets/login.css"></style>
<style lang="scss">
  .login {
    .el-input__inner,
    .el-form-item__content {
      height: 50px;
      line-height: 50px;
    }

    .el-input--prefix .el-input__inner {
      padding-left: 60px;
    }

    .el-input__inner {
      font-size: 18px;
      border-width: 0 0 1px 0;
      border-radius: 0;
    }
    .el-form-item {
      margin: 36px 0 0 0;
    }
  }
</style>
