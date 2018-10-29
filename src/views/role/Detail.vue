<template>
  <base-detail-view title="编辑角色"
                    parentPath="/role/list"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >
    <colgroup>
      <col width="20%">
      <col width="80%">
    </colgroup>
    <tbody>
    <tr> <td>角色名称</td> <td>{{ formModel.RoleName }}</td> </tr>
    <tr> <td>角色类别</td> <td>{{ formModel.RoleCategory }}</td> </tr>
    </tbody>
  </base-detail-view>
</template>
<script>
  import RoleService from '../../services/RoleService';

  export default {
    data() {
      return {
        service: RoleService,
        formModel: {
          RoleName: '',
          RoleCategory: '',
        },
      };
    },
    methods: {
      finish() {
        this.$emit('finish-detail');
      },
    }
  };
</script>
