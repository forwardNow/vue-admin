<template>

  <base-add-view title="添加角色"
                 parentPath="/role/list"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @addSuccess="finish"
                 ref="add" >

    <el-form-item label="角色名称" prop="RoleName">
      <el-input v-model="formModel.RoleName"></el-input>
    </el-form-item>

    <el-form-item label="角色类别" prop="RoleCategory">
      <el-input v-model="formModel.RoleCategory"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="$refs.add.submit()">保存</el-button>
    </el-form-item>

  </base-add-view>
</template>
<script>
import RoleService from '../../services/RoleService';

export default {
  data() {
    return {
      service: RoleService,
      rules: {
        RoleName: [
         { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        RoleCategory: [
         { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
      },
      formModel: {
        RoleName: '',
        RoleCategory: '',
      },
    };
  },
  methods: {
    finish() {
      this.$emit('finish-add');
    },
  }
};
</script>

