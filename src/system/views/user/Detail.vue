<template>
  <base-detail-view title="用户角色"
                    parentPath="/user/list"
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
      <td>姓名</td> <td>{{ formModel.UserTrueName }}</td>
      <td>昵称</td> <td>{{ formModel.UserNickname }}</td>
    </tr>
    <tr>
      <td>头像</td> <td>{{ formModel.UserHeadImage }}</td>
      <td>性别</td> <td>{{ formModel.Sex | genderFilter }}</td>
    </tr>
    <tr>
      <td>联系电话</td> <td>{{ formModel.Phone }}</td>
      <td>座机</td> <td>{{ formModel.Landline }}</td>
    </tr>
    <tr>
      <td>创建时间</td> <td>{{ formModel.CreateTime | datetimeFilter }}</td>
      <td>修改时间</td> <td>{{ formModel.ModifiedTime | datetimeFilter }}</td>
    </tr>
    </tbody>
  </base-detail-view>
</template>
<script>
  import UserService from '../../services/UserService';

  export default {
    data() {
      return {
        service: UserService,
        formModel: {
          UserTrueName: '',
          UserNickname: '',
          UserHeadImage: '',
          Sex: '',
          clientUserSex: null,
          Phone: '',
          Landline: '',
          CreateTime: '',
          ModifiedTime: '',
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
