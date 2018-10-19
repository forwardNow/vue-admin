<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">字典详情
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">
      <table class="table_detail">
        <colgroup>
          <col width="20%">
          <col width="80%">
        </colgroup>
        <tbody>
        <tr> <td>字典名称</td> <td>{{ dic.DicName }}</td> </tr>
        <tr> <td>字典描述</td> <td>{{ dic.DicDesc }}</td> </tr>
        </tbody>
      </table>
    </el-main>
  </el-container>
</template>
<script>
  import DicService from '../../services/DicService';

  export default {
    created() {
      this.init();
    },
    data() {
      return {
        dic: {},
      };
    },
    methods: {
      init() {
        DicService.get({ DicId: this.$route.query.id } ).then((res) => {
          if (res.errorCode === 0) {
            this.dic = res.result;
          } else if (res.errorCode === 1) {
            this.$message({
              type: 'error',
              message: '该字典不存在！',
              showClose: true,
              duration: 2000,
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
