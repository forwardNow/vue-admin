<template>
  <div class="login clearfix">
    <main class="login__main clearfix">
      <div class="page-title">系统管理平台</div>
      <div class="panel clearfix">
        <div class="panel__heading">用户登录</div>
        <div class="panel__body">
          <el-form :model="userForm" :rules="rules" ref="userForm" class="demo-userForm">
            <el-form-item prop="loginName">
              <el-input v-model="userForm.loginName" placeholder="admin" v-focus>
                <template slot="prepend">用户</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="userForm.password" placeholder="123456"
                        @keyup.enter.native="onSubmit()">
                <template slot="prepend">密码</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn_submit" type="primary"
                         @click="onSubmit('userForm')"
                         :plain="true" :loading="isLoading">登陆</el-button>
            </el-form-item>
            <div class="login-links">
              <a class="link" href="#">忘记密码</a>
              <a class="link" href="#">免费注册</a>
            </div>
          </el-form>
        </div>
        <div class="panel__footer">
          其他方式登录：
          <a class="oauth-link" href="#"><span class="iconfont icon-qq1"></span></a>
          <a class="oauth-link" href="#"><span class="iconfont icon-weixin"></span></a>
        </div>
      </div>
    </main>
    <footer class="login__footer">
      Copyright   2008-2018 版权所有：武汉xxxx科技有限公司
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
        loginName: 'admin',
        password: '123456',
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
              this.$router.push({ path: '/' });
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
    padding-bottom: 48px;
    background: #c7e8ff;
  }

  .login__main {
    position: relative;
    width: 860px;
    min-height: 600px;
    margin: 0 auto;
    padding-top: 120px;
    background: url("../../assets/images/login_bg.png") 0 200px no-repeat;
  }

  .page-title {
    float: left;
    margin-left: 136px;
    font-size: 44px;
    font-weight: 500;
    color: #3d86ec;
    text-align: center;
    letter-spacing: 5px;
  }

  .panel {
    float: right;
    width: 320px;
    background-color: #fff;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
  }

  .panel__heading {
    font-size: 28px;
    line-height: 68px;
    color: #3d86ec;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
  }

  .panel__body {
    padding: 32px 24px 6px 24px;
  }

  .panel__footer {
    height: 48px;
    padding: 0 24px;
    line-height: 48px;
    color: #666;
    border-top: 1px solid #f1f1f1;
  }

  .oauth-link {
    display: inline-block;
    margin-right: 6px;
    font-size: 24px;
    vertical-align: middle;
  }

  .iconfont {
    font-size: inherit;
    vertical-align: baseline;
  }

  .login-links {
    text-align: right;
  }

  .link {
    margin-left: 12px;
    color: #9b9ea0;
  }
  .link:hover {
    color: #108cee;
  }

  .btn_submit {
    width: 100%;
  }

  .login__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 48px;
    color: #8b8b8b;
    text-align: center;
    background-color: #fff;
  }

</style>
