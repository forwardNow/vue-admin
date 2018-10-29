<template>
  <base-edit-view title="编辑角色"
                 parentPath="/role/list"
                 :service="service"
                 :editFormModel="formModel"
                 :editFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @edit-success="finish"
                 ref="edit" >

    <el-form-item label="角色名称" prop="RoleName">
      <el-input v-model="formModel.RoleName"></el-input>
    </el-form-item>

    <el-form-item label="角色类别" prop="RoleCategory">
      <el-input v-model="formModel.RoleCategory"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="$refs.edit.submit()">保存</el-button>
    </el-form-item>

  </base-edit-view>
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
          RoleId: '',
          RoleName: '',
          RoleCategory: '',
        },
      };
    },
    methods: {
      finish() {
        this.$emit('finish-edit');
      },
    },
  };
</script>

