<template>
  <base-edit-view title="编辑用户"
                  parentPath="/user/list"
                  :service="service"
                  :editFormModel="formModel"
                  :editFormRules="rules"
                  :isCloseAfterAddSuccess="true"
                  @edit-success="finish"
                  ref="edit" >
    <el-form-item label="姓名" prop="UserTrueName">
      <el-input v-model="formModel.UserTrueName"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="UserNickname">
      <el-input v-model="formModel.UserNickname"></el-input>
    </el-form-item>
    <el-form-item label="头像" prop="UserHeadImage">
      <el-input v-model="formModel.UserHeadImage"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="formModel.Sex" placeholder="请选择">
        <el-option
          v-for="item in genderDicList"
          :key="item.code"
          :label="item.text"
          :value="item.code">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话" prop="Phone">
      <el-input v-model="formModel.Phone"></el-input>
    </el-form-item>
    <el-form-item label="座机" prop="Landline">
      <el-input v-model="formModel.Landline"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$refs.edit.submit()">保存</el-button>
    </el-form-item>
  </base-edit-view>
</template>
<script>
import UserService from '../../services/UserService';
import FormFiledValidators from '../../share/FormFiledValidators';

export default {
  data() {
    return {
      service: UserService,
      genderDicList: [
        { code: '1', text: '男' },
        { code: '2', text: '女' },
      ],
      rules: {
        UserNickname: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        Phone: [
          { validator: FormFiledValidators.mobile, trigger: ['blur', 'change'] },
        ],
      },
      formModel: {
        UserId: '',
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
      this.$emit('finish-edit');
    },
  },
};
</script>
