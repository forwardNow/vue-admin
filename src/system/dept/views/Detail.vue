<template>
  <base-detail-view title="部门详情"
                    parentPath="/system/org"
                    :service="service"
                    :detailFormModel="formModel"
                    @created="created"
                    ref="detail" >
    <colgroup>
      <col width="10%">
      <col width="40%">
      <col width="10%">
      <col width="40%">
    </colgroup>
    <tbody>
    <tr>
      <td>部门名称</td> <td>{{ formModel.deptName }}</td>
      <td>所属机构</td> <td>{{ formModel.organId }}</td>
    </tr>
    </tbody>

  </base-detail-view>
</template>
<script>
  import OrgService from '../../org/OrgService';
  import service from '../DeptService';

  export default {
    data() {
      return {
        service,
        formModel: {
          deptName: '',
          organId: '',
        },
      };
    },
    methods: {
      finish() {
        this.$emit('finish-detail');
      },
      created() {
        OrgService.get({ id: this.formModel.organId }).then((res) => {
          const { errorCode, reason, result: bean } = res;

          if (errorCode === 0) {
            this.formModel.organId = bean.organName;
          } else if (errorCode === 1) {
            this.formModel.organId = 'not exist !';

            console.warn(`【${errorCode}】${reason}`);
          }
        });
      },
    },
  };
</script>
