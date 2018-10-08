<template>
  <div class="login clearfix">
    <header class="login__header">系统管理平台</header>
    <main class="login__main clearfix">
      <div class="panel clearfix">
        <div class="panel__heading">用户登录</div>
        <div class="panel__body">
          <el-form :model="userForm" :rules="rules" ref="userForm" class="demo-userForm">
            <el-form-item prop="username">
              <el-input v-model="userForm.username" placeholder="admin" v-focus>
                <template slot="prepend">用户</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="userForm.password" placeholder="7410"
                        @keyup.enter.native="onSubmit('userForm')">
                <template slot="prepend">密码</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn_submit" type="primary"
                         @click="onSubmit('userForm')"
                         :plain="true" :loading="isLoading">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="login__footer">
      <div>湖北省卫生和计划生育委员会</div>
      <div>武汉开普伟业科技有限公司 技术支持</div>
    </footer>
  </div>
</template>

<script>
import SessionService from '../../services/SessionService';

export default {
  data() {
    return {
      isLoading: false,
      userForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }

        this.isLoading = true;

        const { username, password } = this.userForm;

        return SessionService.login(username, password).then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '登录成功！',
              showClose: true,
              duration: 1000,
            });
            SessionService.store(res.result);
            // 如果是 401 过来的，则退一步
            if (this.$route.query.status === 401) {
              this.$router.go(-1);
            } else {
              this.$router.push({ name: 'system' });
            }
          } else {
            this.$message({
              type: 'error',
              message: '用户名或密码错误！',
              showClose: true,
              duration: 1000,
            });
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

<style scoped>

  .login {
    position: relative;
    min-height: 100%;
    padding-bottom: 100px;
    background: url("../../assets/images/login_bg.jpg");
    background-size: cover;
  }

  .login__header {
    margin: 80px auto 0 auto;
    font-size: 36px;
    color: #20a0ff;
    text-align: center;
  }

  .panel {
    width: 300px;
    margin: 48px auto 0 auto;
    background-color: #fff;
    border-radius: 4px;
  }

  .panel__heading {
    margin-top: 48px;
    font-size: 26px;
    color: #20a0ff;
    text-align: center;
  }

  .panel__body {
    padding: 32px 24px;
  }

  .btn_submit {
    width: 100%;
  }

  .login__footer {
    position: absolute;
    bottom: 24px;
    left: 0;
    width: 100%;
    text-align: center;
  }

</style>
