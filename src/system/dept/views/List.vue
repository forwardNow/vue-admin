<template>
  <base-list-view title="部门管理"
                  path="/system/dept"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">

    <template slot="fn">
      <el-button type="success" size="small" @click="$refs.base.showAddView()">创建部门</el-button>
    </template>

    <template slot="ope">

      <el-form :inline="true" class="search-group">
        <el-form-item label="部门名称">
          <el-input placeholder="" size="small" v-model="searchFormModel.deptName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">

      <el-table-column label="部门名">
        <template slot-scope="scope">{{ scope.row.deptName }}</template>
      </el-table-column>

      <el-table-column label="所属机构">
        <template slot-scope="scope">{{ scope.row.organName }}</template>
      </el-table-column>


      <el-table-column label="创建用户" >
        <template slot-scope="scope">{{ scope.row.createDepartUser }}</template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createDepartTime }}</template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-bind:class="scope.row.isDelete === '1' ? 'text_success' : 'text_danger'">
            <span class="iconfont icon-yuandianzhong"></span>
            {{ scope.row.isDelete === '1' ? '有效' : '无效'}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showDetailView({ id: scope.row.id })">详情</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showEditView({ id: scope.row.id })">编辑</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.deleteRecord({ id: scope.row.id })">删除</a>
        </template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import service from '../DeptService';

  export default {
    data() {
      return {
        isExporting: false,
        service,
        selectedRecords: [],
        searchFormModel: {
          deptName: '',
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