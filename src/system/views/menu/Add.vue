<template>
  <base-add-view title="添加菜单"
                 parentPath="/menu/list"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @add-success="finish"
                 ref="add" >
    <el-form-item label="菜单图标" prop="MenuNodeIcon">
      <el-input v-model="formModel.MenuNodeIcon"></el-input>
    </el-form-item>

    <el-form-item label="菜单名称" prop="MenuName">
      <el-input v-model="formModel.MenuName"></el-input>
    </el-form-item>

    <el-form-item label="Url地址" prop="MenuUrl">
      <el-input v-model="formModel.MenuUrl"></el-input>
    </el-form-item>

    <el-form-item label="菜单编码" prop="MenuNo">
      <el-input v-model="formModel.MenuNo"></el-input>
    </el-form-item>

    <el-form-item label="菜单父编码" prop="MenuParentNo">
      <el-input v-model="formModel.MenuParentNo"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$refs.add.submit()">保存</el-button>
    </el-form-item>
  </base-add-view>
</template>
<script>
import MenuService from '../../services/MenuService';

export default {
  data() {
    return {
      service: MenuService,
      rules: {
      },
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
      this.$emit('finish-add');
    },
  },
};
</script>

