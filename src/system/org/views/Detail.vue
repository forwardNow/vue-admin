<template>
  <base-detail-view title="机构详情"
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
      <td>机构名称</td> <td>{{ formModel.organName }}</td>
      <td>机构等级</td> <td>{{ formModel.organLevel }}</td>
    </tr>
    <tr>
      <td>上级机构</td> <td>{{ formModel.fatherId }}</td>
      <td>所在地</td> <td>{{ formModel.provinceName }} {{ formModel.cityName }} {{ formModel.townName }} </td>
    </tr>
    <tr>
      <td>创建人</td> <td>{{ formModel.createUser }}</td>
      <td>创建时间</td> <td>{{ formModel.createTime }}</td>
    </tr>
    <tr>
      <td>修改人</td> <td>{{ formModel.updateUser }}</td>
      <td>修改时间</td> <td>{{ formModel.updateTime }}</td>
    </tr>
    </tbody>
  </base-detail-view>
</template>
<script>
  import service from '../OrgService';
  import DicService from '../../../common/services/DicService';

  export default {
    data() {
      return {
        service,
        formModel: {
          organName: '',
          organLevel: '',
          fatherId: '',
          provinceName: '',
          cityName: '',
          townName: '',
        },
      };
    },
    methods: {
      finish() {
        this.$emit('finish-detail');
      },
      created() {
        DicService.getDicItemValue('ORG_LEVEL', this.formModel.organLevel).then((value) => {
          console.log('value', value);
          this.formModel.organLevel = value;
        });

        service.get({ id: this.formModel.fatherId }).then((res) => {
          const { errorCode, reason, result: bean } = res;

          if (errorCode === 0) {
            this.formModel.fatherId = bean.organName;
          } else if (errorCode === 1) {
            this.formModel.fatherId = 'not exist !';

            console.warn(`【${errorCode}】${reason}`);
          }
        });
      },
    },
  };
</script>
