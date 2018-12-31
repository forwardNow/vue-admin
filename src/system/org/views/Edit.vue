<template>
  <base-edit-view title="编辑机构"
                  parentPath="/system/org"
                  :service="service"
                  :editFormModel="formModel"
                  :editFormRules="rules"
                  :isCloseAfterAddSuccess="true"
                  @edit-success="finish"
                  ref="edit" >

    <el-form-item>
      <el-button type="primary" @click="$refs.edit.submit()">保存</el-button>
    </el-form-item>
  </base-edit-view>
</template>
<script>
import service from '../OrgService';

export default {
  data() {
    return {
      service,
      rules: {
      },
      formModel: {
      },
    };
  },
  methods: {
    finish() {
      this.$emit('finish-edit');
    },
  },
};
</script>
