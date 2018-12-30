<template>
  <base-detail-view title="用户角色"
                    parentPath="/system/user"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >
    <colgroup>
      <col width="10%">
      <col width="40%">
      <col width="10%">
      <col width="40%">
    </colgroup>
    <tbody>
    <tr>
      <td>用户名</td> <td>{{ formModel.userName }}</td>
      <td>用户姓名</td> <td>{{ formModel.userRealName }}</td>
    </tr>
    <tr>
      <td>角色</td> <td>{{ formModel.userRole }}</td>
      <td>所属部门</td> <td>{{ formModel.userDepartment }}</td>
    </tr>
    <tr>
      <td>手机号</td> <td>{{ formModel.userPhone }}</td>
      <td>证件号</td> <td>{{ formModel.userCart }}</td>
    </tr>
    <tr>
      <td>厂商</td> <td>{{ formModel.manufacturer }}</td>
      <td>邮箱</td> <td>{{ formModel.userCart }}</td>
    </tr>
    <tr>
      <td>管理应用系统</td> <td>{{ formModel.applicationSystem }}</td>
      <td>状态</td> <td>{{ formModel.userStatus }}</td>
    </tr>
    </tbody>
  </base-detail-view>
</template>
<script>
  import UserService from '../RoleService';

  export default {
    data() {
      return {
        service: UserService,
        formModel: {
          userId: '',
          userName: '',
          userRealName: '',
          userRole: '',
          userDepartment: '',
          userPhone: '',
          userCart: '',
          manufacturer: '',
          userEmail: '',
          applicationSystem: '',
          userStatus: '',
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
