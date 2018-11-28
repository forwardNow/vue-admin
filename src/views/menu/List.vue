<template>
  <base-list-view title="菜单管理"
                  path="/menu/list"
                  :service="service"
                  :search-form-model="searchFormModel"
                  :pageSize="100"
                  :tableDataFormatter="tableDataFormatter"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">
    <template slot="ope">

      <el-button type="success" size="small" @click="$refs.base.showAddView()">添加菜单</el-button>

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

      <el-table-column label="菜单名称" width="200">
        <template slot-scope="scope">
          {{ '　'.repeat(scope.row.$depth || 0) }}
          <span :class="scope.row.MenuNodeIcon"></span>
          {{ scope.row.MenuName }}
        </template>
      </el-table-column>

      <el-table-column label="菜单编码" width="80">
        <template slot-scope="scope">{{ scope.row.MenuNo }}</template>
      </el-table-column>

      <el-table-column label="父菜单编码" width="120">
        <template slot-scope="scope">{{ scope.row.MenuParentNo }}</template>
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
  import Utils from '../../share/Utils';

  export default {
    data() {
      return {
        service: MenuService,
        searchFormModel: {
          MenuName: '',
        },
      }
    },
    methods: {
      tableDataFormatter(items) {
        // items.sort((prev, next) => {
        //   if (prev.MenuParentNo === next.MenuParentNo) {
        //     return prev.MenuNo.replace(/[^\d]/, '') - next.MenuNo.replace(/[^\d]/, '');
        //   } else {
        //     return prev.MenuParentNo.replace(/[^\d]/, '') - next.MenuParentNo.replace(/[^\d]/, '');
        //   }
        // });

        const newItems = Utils.convertToTreeItems({
          items,
          idName: 'MenuNo',
          parentIdName: 'MenuParentNo',
          childrenName: 'children',
        });

        return newItems;
      },
      handleFinishAdd() {
        this.$refs.base.reload();
      },
      handleFinishEdit() {
        this.$refs.base.reload();
      },
    },
  };
</script>
