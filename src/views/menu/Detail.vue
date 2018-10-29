<template>
  <base-detail-view title="菜单详情"
                    parentPath="/menu/list"
                    :service="service"
                    :detailFormModel="formModel"
                    ref="detail" >
    <colgroup>
      <col width="20%">
      <col width="80%">
    </colgroup>
    <tbody>
    <tr> <td>菜单图标</td> <td>{{ formModel.MenuNodeIcon }}</td> </tr>
    <tr> <td>菜单名称</td> <td>{{ formModel.MenuName }}</td> </tr>
    <tr> <td>Url地址</td> <td>{{ formModel.MenuUrl }}</td> </tr>
    <tr> <td>菜单编码</td> <td>{{ formModel.MenuNo }}</td> </tr>
    <tr> <td>菜单父编码</td> <td>{{ formModel.MenuParentNo }}</td> </tr>
    </tbody>
  </base-detail-view>
</template>
<script>
  import MenuService from '../../services/MenuService';

  export default {
    data() {
      return {
        service: MenuService,
        formModel: {
          MenuName: '',
          MenuNodeIcon: '',
          MenuUrl: '',
          MenuNo: '',
          MenuParentNo: '',
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
