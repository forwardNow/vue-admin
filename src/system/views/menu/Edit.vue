<template>
  <base-edit-view title="编辑菜单"
                  parentPath="/menu/list"
                  :service="service"
                  :editFormModel="formModel"
                  :editFormRules="rules"
                  :isCloseAfterAddSuccess="true"
                  @edit-success="finish"
                  ref="edit" >

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
      <el-button type="primary" @click="$refs.edit.submit()">保存</el-button>
    </el-form-item>

  </base-edit-view>
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
        MenuId: '',
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
      this.$emit('finish-edit');
    },
  }
};
</script>

