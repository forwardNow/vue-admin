<template>
  <base-list-view title="用户管理"
                  path="/user/list"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">

    <template slot="ope">

      <el-form :inline="true" class="search-group">
        <el-form-item>
          <el-input placeholder="请输入姓名" size="small" v-model="searchFormModel.UserTrueName">
            <template slot="prepend">姓名</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">
      <el-table-column label="姓名" width="160">
        <template slot-scope="scope">{{ scope.row.UserTrueName }}</template>
      </el-table-column>

      <el-table-column label="性别" width="80">
        <template slot-scope="scope">{{ scope.row.Sex | genderFilter}}</template>
      </el-table-column>

      <el-table-column label="人员类别" width="120">
        <template slot-scope="scope">{{ scope.row.PeopleCategory }}</template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">{{ scope.row.CreateTime | dateFilter }}</template>
      </el-table-column>

      <el-table-column label="联系电话" width="160">
        <template slot-scope="scope">{{ scope.row.Phone }}</template>
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
             @click.prevent="$refs.base.showDetailView({ UserId: scope.row.UserId })">详情</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showEditView({ UserId: scope.row.UserId })">编辑</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.deleteRecord({ UserId: scope.row.UserId })">删除</a>
        </template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import UserService from '../../services/UserService';

  export default {
    data() {
      return {
        service: UserService,
        searchFormModel: {
          UserTrueName: '',
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