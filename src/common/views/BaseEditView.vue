<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">{{ title }}
      <i class="popup__close el-icon-close" @click="closePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form :class="['form_edit', formClassName]" label-width="120px"
               ref="editForm" :model="editFormModel" :rules="editFormRules">

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
    editFormModel: { type: Object },
    editFormRules: { type: Object },
    isCloseAfterEditSuccess: { type: Boolean, default: true },
    formClassName: { type: String, default: '' },
  },
  created() {
    this.init();
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
    init() {
      this.service.get(this.$route.query).then((res) => {
        if (res.errorCode === 0) {
          const bean = res.result;

          Object.keys(this.editFormModel).forEach((key) => {
            this.editFormModel[key] = bean[key];
          });
        } else if (res.errorCode === 1) {
          this.$message({
            type: 'error',
            message: '该记录不存在！',
            showClose: true,
            duration: 2000,
          });
        }

        /**
         * @event 获取 bean 对象后，发射 created 事件。
         */
        this.$emit('created');
      });
    },
    submit() {
      this.$refs.editForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }

        this.service.update(this.editFormModel).then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '保存成功！',
              showClose: true,
              duration: 1000,
            });

            // 关闭
            if (this.isCloseAfterEditSuccess) {
              this.closePopup();
            }

            this.$emit('edit-success');
          } else {
            this.$message({
              type: 'error',
              message: '保存失败！',
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

