<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">系统详情
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">
      <table class="table_detail">
        <colgroup>
          <col width="20%">
          <col width="80%">
        </colgroup>
        <tbody>
        <tr> <td>系统名称</td> <td>{{ subsys.SystemName }}</td> </tr>
        <tr> <td>系统编号</td> <td>{{ subsys.SystemIdenty }}</td> </tr>
        <tr> <td>系统描述</td> <td>{{ subsys.SystemDesc }}</td> </tr>
        </tbody>
      </table>
    </el-main>
  </el-container>
</template>
<script>
  import SubsysService from '../../services/SubsysService';

  export default {
    created() {
      this.init();
    },
    data() {
      return {
        subsys: {},
      };
    },
    methods: {
      init() {
        SubsysService.get({ SystemId: this.$route.query.id } ).then((res) => {
          if (res.errorCode === 0) {
            this.subsys = res.result;
          } else if (res.errorCode === 1) {
            this.$message({
              type: 'error',
              message: '该系统不存在！',
              showClose: true,
              duration: 2000,
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
