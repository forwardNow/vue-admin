<template>
  <base-edit-view title="编辑角色"
                  parentPath="/system/role"
                  :service="service"
                  :editFormModel="formModel"
                  :editFormRules="rules"
                  :isCloseAfterAddSuccess="true"
                  @edit-success="finish"
                  ref="edit" >

  </base-edit-view>
</template>
<script>
import UserService from '../RoleService';
import FormFiledValidators from '../../../common/utils/FormFiledValidators';

export default {
  data() {
    return {
      service: UserService,
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
