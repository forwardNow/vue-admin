<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">{{ title }}
      <i class="popup__close el-icon-close" @click="closePopup"></i>
    </el-header>
    <el-main class="popup__content">
      <table class="table_detail">
        <slot></slot>
      </table>
      <slot name="others"></slot>
    </el-main>
  </el-container>
</template>
<script>
import BaseService from '../services/BaseService';

export default {
  props: {
    title: { type: String, default: '请添加标题' },
    parentPath: { type: String, default: '' },
    service: { type: BaseService },
    detailFormModel: { type: Object },
  },
  created() {
    this.init();
  },
  data() {
    return {
    };
  },
  methods: {
    init() {
      this.service.get(this.$route.query).then((res) => {
        if (res.errorCode === 0) {
          const user = res.result;

          Object.keys(this.detailFormModel).forEach((key) => {
            this.detailFormModel[key] = user[key];
          });

          /**
           * @event 获取 bean 对象后，发射 created 事件。
           */
          this.$emit('created');

        } else if (res.errorCode === 1) {
          this.$message({
            type: 'error',
            message: '该记录不存在！',
            showClose: true,
            duration: 2000,
          });
        }
      });
    },
    closePopup() {
      this.$router.push({
        path: this.parentPath,
      });
      this.$emit('finish-detail');
    },
  },
};
</script>

