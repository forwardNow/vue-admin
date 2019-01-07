<template>
  <base-add-view title="创建部门"
                 parentPath="/system/dept"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @add-success="finish"
                 ref="add">

    <el-row>
      <el-col :span="24">
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="formModel.deptName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="所属机构" prop="organId">
          <el-select v-model="formModel.organId" placeholder="请选择">
            <el-option
                v-for="item in allOrgList"
                :key="item.id"
                :label="item.organName"
                :value="String(item.id)">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>


    <el-form-item>
      <el-button type="primary" @click="$refs.add.submit()">保存</el-button>
    </el-form-item>
  </base-add-view>
</template>
<script>
import service from '../DeptService';
import OrgService from '../../org/OrgService';

// import FormFiledValidators from '../../../common/utils/FormFiledValidators';

export default {
  created() {
    OrgService.getList({}, { currentPage: 1, pageSize: 10000 }).then((res) => {
      const { errorCode, result } = res;

      if (errorCode !== 0) {
        console.error('【机构管理 / 创建】获取所有机构失败');
        return;
      }

      this.allOrgList = result.items;
    });
  },
  data() {
    return {
      allOrgList: [],

      service,
      rules: {
      },
      formModel: {
        deptName: '',
        organId: '',
      },
    };
  },
  methods: {
    finish() {
      this.$emit('finish-add');
    },
  },
};
</script>
