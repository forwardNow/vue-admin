<template>
  <base-list-view title="角色管理"
                  path="/system/user"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">

    <template slot="fn">
      <el-button type="success" size="small" @click="$refs.base.showAddView()">创建角色</el-button>
    </template>

    <template slot="ope">

      <el-form :inline="true" class="search-group">
        <el-form-item label="角色名称">
          <el-input placeholder="" size="small" v-model="searchFormModel.roleName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">
      <el-table-column label="角色编码">
        <template slot-scope="scope">{{ scope.row.userRoleId }}</template>
      </el-table-column>

      <el-table-column label="角色名称">
        <template slot-scope="scope">{{ scope.row.roleName}}</template>
      </el-table-column>

      <el-table-column label="创建角色的用户">
        <template slot-scope="scope">{{ scope.row.createUserId }}</template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-bind:class="scope.row.roleStatus === '1' ? 'text_success' : 'text_danger'">
            <span class="iconfont icon-yuandianzhong"></span>
            {{ scope.row.roleStatus === '1' ? '启用' : '禁用' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showDetailView({ roleId: scope.row.roleId })">详情</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showEditView({ roleId: scope.row.roleId })">编辑</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.deleteRecord({ roleId: scope.row.roleId })">删除</a>
        </template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import service from '../RoleService';

  export default {
    data() {
      return {
        service,
        searchFormModel: {
          roleName: '',
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