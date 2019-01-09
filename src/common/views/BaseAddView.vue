<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">{{ title }}
      <i class="popup__close el-icon-close" @click="closePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form :class="['form_edit', formClassName]" :label-width="labelWidth"
          ref="addForm" :model="addFormModel" :rules="addFormRules">

        <slot></slot>

      </el-form>
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
    addFormModel: { type: Object },
    addFormRules: { type: Object },
    isCloseAfterAddSuccess: { type: Boolean, default: true },
    formClassName: { type: String, default: '' },
    labelWidth: { type: String, default: '120px' },
  },
  created() {
    this.$store.commit('hideFnSlot');
  },
  destroyed() {
    this.$store.commit('showFnSlot');
  },
  data() {
    return {
    };
  },
  methods: {
    submit() {
      this.$refs.addForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }

        this.service.insert(this.addFormModel).then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '添加成功！',
              showClose: true,
              duration: 1000,
            });

            // 关闭
            if (this.isCloseAfterAddSuccess) {
              this.closePopup();
            }

            this.$emit('add-success');
          } else {
            this.$message({
              type: 'error',
              message: '添加失败！',
              showClose: true,
              duration: 1000,
            });
          }
        });

      });
    },
    closePopup() {
      this.$router.push({
        path: this.parentPath,
      });
    },
  },
};
</script>

