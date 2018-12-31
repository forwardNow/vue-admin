<template>
  <base-detail-view title="机构详情"
                    parentPath="/system/org"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >
  </base-detail-view>
</template>
<script>
  import service from '../DeptService';

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
