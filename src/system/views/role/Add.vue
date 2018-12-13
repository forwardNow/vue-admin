<template>
  <base-add-view title="添加角色"
                 parentPath="/role/list"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @add-success="finish"
                 ref="add" >

    <el-form-item label="角色名称" prop="RoleName">
      <el-input v-model="formModel.RoleName"></el-input>
    </el-form-item>

    <el-form-item label="角色类别" prop="RoleCategory">
      <!--
      <el-input v-model="formModel.RoleCategory"></el-input>
      -->

      <el-select v-model="formModel.RoleCategory" placeholder="请选择">
        <el-option
            v-for="item in roleCategoryDicList"
            :key="item.ItemCode"
            :label="item.ItemValue"
            :value="item.ItemCode"
            :disabled="item.IsDeleted !== 0">
        </el-option>
      </el-select>
    </el-form-item>


    <el-form-item label="角色描述" prop="RoleDes">
      <el-input v-model="formModel.RoleDes"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="$refs.add.submit()">保存</el-button>
    </el-form-item>

  </base-add-view>
</template>
<script>
import RoleService from '../../services/RoleService';
import DicItemService from '../../services/DicItemService';

export default {
  created() {
    DicItemService.getDicList('role_category').then((items) => {
      this.roleCategoryDicList = items;
    });
  },
  data() {
    return {
      roleCategoryDicList: [],
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
        RoleDes: '',
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

