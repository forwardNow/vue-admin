<template>
  <base-edit-view title="编辑用户"
                  parentPath="/system/user"
                  :service="service"
                  :editFormModel="formModel"
                  :editFormRules="rules"
                  :isCloseAfterAddSuccess="true"
                  @edit-success="finish"
                  ref="edit" >

    <el-row>
      <el-col :span="12">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="formModel.userName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用户姓名" prop="userRealName">
          <el-input v-model="formModel.userRealName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="角色" prop="userRole">
          <el-input v-model="formModel.userRole"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="所属部门" prop="userDepartment">
          <el-input v-model="formModel.userDepartment"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="formModel.userPhone"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="证件号" prop="userCart">
          <el-input v-model="formModel.userCart"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="厂商" prop="manufacturer">
          <el-input v-model="formModel.manufacturer"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="formModel.userEmail"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="管理应用系统" prop="applicationSystem">
          <el-input v-model="formModel.applicationSystem"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button type="primary" @click="$refs.edit.submit()">保存</el-button>
    </el-form-item>
  </base-edit-view>
</template>
<script>
import service from '../UserService';
import FormFiledValidators from '../../../common/utils/FormFiledValidators';

export default {
  data() {
    return {
      service,
      rules: {
        userName: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        userRealName: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        userRole: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        userDepartment: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        userPhone: [
          { validator: FormFiledValidators.mobile, trigger: ['blur', 'change'] },
        ],
        userCart: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        userEmail: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        applicationSystem: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
      },
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
