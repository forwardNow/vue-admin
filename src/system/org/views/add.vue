<template>
  <base-add-view title="创建机构"
                 parentPath="/system/org"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @add-success="finish"
                 ref="add">

    <el-form-item>
      <el-button type="primary" @click="$refs.edit.submit()">保存</el-button>
    </el-form-item>
  </base-add-view>
</template>
<script>
import service from '../OrgService';
import FormFiledValidators from '../../../common/utils/FormFiledValidators';

export default {
  data() {
    return {
      roleList: null,
      service,
      rules: {
      },
      formModel: {
      },
    };
  },
  methods: {
    finish() {
      this.$emit('finish-add');
    },
  },
};
</script>
