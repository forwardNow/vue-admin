<template>
  <base-detail-view title="菜单详情"
                    parentPath="/dic/list"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >
    <colgroup>
      <col width="20%">
      <col width="80%">
    </colgroup>
    <tbody>
    <tr> <td>字典名称</td> <td>{{ formModel.DicName }}</td> </tr>
    <tr> <td>字典描述</td> <td>{{ formModel.DicDesc }}</td> </tr>
    </tbody>
  </base-detail-view>
</template>
<script>
  import DicService from '../../services/DicService';

  export default {
    data() {
      return {
        service: DicService,
        formModel: {
          DicName: '',
          DicDesc: '',
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
