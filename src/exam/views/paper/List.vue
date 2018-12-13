<template>
  <base-list-view title="菜单管理"
                  path="/exam/paper/list"
                  :service="service"
                  :search-form-model="searchFormModel"
                  :pageSize="100"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">
    <template slot="ope">

      <el-button type="success" size="small" @click="$refs.base.showAddView()">添加问卷</el-button>

      <el-form :inline="true" class="search-group">
        <el-form-item>
          <el-input placeholder="请输入关键字" size="small" v-model="searchFormModel.name">
            <template slot="prepend">问卷名称</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">

      <el-table-column label="编码" width="80">
        <template slot-scope="scope">{{ scope.row.code }}</template>
      </el-table-column>

      <el-table-column label="名称" width="240">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="标题" width="240">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
            <span v-bind:class="scope.row.IsDeleted === 0 ? 'text_success' : 'text_danger'">
              <span class="iconfont icon-yuandianzhong"></span>
              {{ scope.row.IsDeleted === 0 ? '启用' : '停用'}}
            </span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showDetailView({id: scope.row.id})">详情</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showEditView({id: scope.row.id})">编辑</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.deleteRecord({id: scope.row.id})">删除</a>
        </template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import MenuService from '../../services/PaperService';

  export default {
    data() {
      return {
        service: MenuService,
        searchFormModel: {
          name: '',
        },
      }
    },
    methods: {
      handleFinishAdd() {
        this.$refs.base.reload();
      },
      handleFinishEdit() {
        this.$refs.base.reload();
      },
    },
  };
</script>
<style scoped>
  .indent {
    margin-right: 1.5em;
  }
</style>
