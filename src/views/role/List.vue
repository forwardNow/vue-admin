<template>
  <base-list-view title="角色管理"
             path="/role/list"
             :service="service"
             :search-form-model="searchFormModel"
             @finish-add="handleFinishAdd"
             @finish-edit="handleFinishEdit"
             ref="base">
    <template slot="ope">

      <el-button type="success" size="small" @click="$refs.base.showAddView()">添加角色</el-button>

      <el-form :inline="true" class="search-group">
        <el-form-item>
          <el-input placeholder="请输入关键字" size="small" v-model="searchFormModel.RoleName">
            <template slot="prepend">角色名称</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">

      <el-table-column label="角色名称" width="160">
        <template slot-scope="scope">{{ scope.row.RoleName }}</template>
      </el-table-column>

      <el-table-column label="角色类别" width="180">
        <template slot-scope="scope">{{ scope.row.RoleCategory }}</template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{ scope.row.CreateTime | dateFilter }}</template>
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
             @click.prevent="$refs.base.showDetailView({RoleId: scope.row.RoleId})">详情</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showEditView({RoleId: scope.row.RoleId})">编辑</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.deleteRecord({RoleId: scope.row.RoleId})">删除</a>
        </template>
      </el-table-column>
      
    </template>

  </base-list-view>
</template>
<script>
import RoleService from '../../services/RoleService';

export default {
  data() {
    return {
      service: RoleService,
      searchFormModel: {
        RoleName: '',
      }
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
