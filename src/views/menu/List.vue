<template>
  <base-list-view title="菜单管理"
                  path="/menu/list"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">
    <template slot="ope">

      <el-button type="success" size="small" @click="$refs.base.showAddView()">添加角色</el-button>

      <el-form :inline="true" class="search-group">
        <el-form-item>
          <el-input placeholder="请输入关键字" size="small" v-model="searchFormModel.MenuName">
            <template slot="prepend">菜单名称</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">

      <el-table-column label="菜单名称" width="160">
        <template slot-scope="scope">{{ scope.row.MenuName }}</template>
      </el-table-column>

      <el-table-column label="菜单编码" width="80">
        <template slot-scope="scope">{{ scope.row.MenuNo }}</template>
      </el-table-column>

      <el-table-column label="菜单级别" width="120">
        <template slot-scope="scope">{{ scope.row.MenuLevel }}</template>
      </el-table-column>

      <el-table-column label="Url地址" width="180">
        <template slot-scope="scope">{{ scope.row.MenuUrl }}</template>
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
             @click.prevent="$refs.base.showDetailView({MenuId: scope.row.MenuId})">详情</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showEditView({MenuId: scope.row.MenuId})">编辑</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.deleteRecord({MenuId: scope.row.MenuId})">删除</a>
        </template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import MenuService from '../../services/MenuService';

  export default {
    data() {
      return {
        service: MenuService,
        searchFormModel: {
          MenuName: '',
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
