<template>
  <base-add-view title="添加字典"
                 parentPath="/dic/list"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @add-success="finish"
                 ref="add" >
    <el-form-item label="字典名称" prop="DicName">
      <el-input v-model="formModel.DicName"></el-input>
    </el-form-item>

    <el-form-item label="字典描述" prop="DicDesc">
      <el-input type="textarea" v-model="formModel.DicDesc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="$refs.add.submit()">保存</el-button>
    </el-form-item>
  </base-add-view>
</template>
<script>
import DicService from '../../services/DicService';

export default {
  data() {
    return {
      service: DicService,
      rules: {
      },
      formModel: {
        DicName: '',
        DicDesc: '',
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

