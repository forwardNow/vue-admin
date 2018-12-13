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

    <tr> <td>创建时间</td> <td>{{ formModel.CreateTime | datetimeFilter}}</td> </tr>
    <tr> <td>创建人</td> <td>{{ formModel.CreateUserName }}</td> </tr>
    <tr> <td>修改时间</td> <td>{{ formModel.ModifiedTime | datetimeFilter}}</td> </tr>
    <tr> <td>修改人</td> <td>{{ formModel.ModifiedUserName }}</td> </tr>
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
          
          CreateTime: '',
          CreateUserName: '',
          ModifiedTime: '',
          ModifiedUserName: ''
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
