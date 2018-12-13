<template>
  <base-add-view title="添加问卷"
                 parentPath="/exam/paper/list"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @add-success="finish"
                 ref="add" >

    <el-form-item label="编码" prop="code">
      <el-input v-model="formModel.code"></el-input>
    </el-form-item>

    <el-form-item label="名称" prop="name">
      <el-input v-model="formModel.name"></el-input>
    </el-form-item>

    <el-form-item label="描述" prop="desc">
      <el-input v-model="formModel.desc"></el-input>
    </el-form-item>

    <el-form-item label="标题" prop="title">
      <el-input v-model="formModel.title"></el-input>
    </el-form-item>

    <el-form-item label="附加内容" prop="aside">
      <el-input v-model="formModel.aside"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="$refs.add.submit()">保存</el-button>
    </el-form-item>
  </base-add-view>
</template>
<script>
  import MenuService from '../../services/PaperService';

  export default {
    data() {
      return {
        service: MenuService,
        rules: {
        },
        formModel: {
          code: '',
          name: '',
          title: '',
          aside: '',
          desc: '',
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

