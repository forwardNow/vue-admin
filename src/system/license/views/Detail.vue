<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">我的证书
      <i class="popup__close el-icon-close" @click="close"></i>
    </el-header>
    <el-main class="popup__content">

      <el-row :gutter="20">
        <el-col :span="12">

          <el-card class="card">
            <div slot="header" class="card__header">证书信息</div>
            <table class="table_detail">
                <tr>
                  <td>证书编号</td> <td>{{ formModel.certificateNumber }}</td>
                </tr>
                <tr>
                  <td>证书名称</td> <td>{{ formModel.certificateName }}</td>
                </tr>
                <tr>
                  <td>证书类型</td> <td>{{ formModel.certificateType }}</td>
                </tr>
                <tr>
                  <td>证书状态</td> <td>{{ formModel.certificateState }}</td>
                </tr>
                <tr>
                  <td>创建证书的时间</td> <td>{{ formModel.createCertTime }}</td>
                </tr>
                <tr>
                  <td>证书有效期</td> <td>{{ formModel.keyValidity }}</td>
                </tr>
            </table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  import service from '../LicenseService';

  export default {
    created() {
      service.get({dummy: null}).then((res) => {
        const { errorCode, reason, result } = res;

        if (errorCode === 0) {
          Reflect.keys(this.formModel).forEach((key) => {
            this.formModel[key] = result[key];
          });
        } else {
          this.$message({
            type: 'error',
            message: reason || '获取证书信息失败！',
            showClose: true,
            duration: 1000,
          });
        }
      });
    },
    data() {
      return {
        formModel: {
          certificateName: '',
          certificateState: '',
          certificateNumber: '',
          certificateType: '',
          createCertTime: '',
          keyValidity: '',
        },
      }
    },
    methods: {
      close() {
        this.$router.push({
          path: '/system/license',
        });
      }
    }
  };
</script>