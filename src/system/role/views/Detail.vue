<template>
  <base-detail-view title="角色详情"
                    parentPath="/system/role"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >
  </base-detail-view>
</template>
<script>
  import service from '../RoleService';

  export default {
    data() {
      return {
        service,
        formModel: {
        },
      };
    },
    methods: {
      finish() {
        this.$emit('finish-detail');
      },
    },
  };
</script>
