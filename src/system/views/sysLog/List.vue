<template>
  <base-list-view title="系统日志"
                  path="/sysLog/list"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">

    <template slot="ope">

      <el-form :inline="true" class="search-group">
        <el-form-item label="用户名　">
          <el-input placeholder="" size="small" v-model="searchFormModel.userName">
          </el-input>
        </el-form-item>
        <el-form-item label="部门名称">
          <el-input placeholder="" size="small" v-model="searchFormModel.userDepartment">
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input placeholder="" size="small" v-model="searchFormModel.userCart">
          </el-input>
        </el-form-item>
        <el-form-item label="警官证号">
          <el-input placeholder="" size="small" v-model="searchFormModel.userPoliceCart">
          </el-input>
        </el-form-item>
        <el-form-item label="角色类别">
          <el-select v-model="searchFormModel.userRole" placeholder="请选择" size="small">
            <el-option
                v-for="item in roleList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">
      <el-table-column label="用户名">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>

      <el-table-column label="姓名">
        <template slot-scope="scope">{{ scope.row.userRealName}}</template>
      </el-table-column>

      <el-table-column label="角色">
        <template slot-scope="scope">{{ scope.row.userRole }}</template>
      </el-table-column>

      <el-table-column label="机构">
        <template slot-scope="scope">{{ scope.row.userOrgan }}</template>
      </el-table-column>

      <el-table-column label="身份证">
        <template slot-scope="scope">{{ scope.row.userCart }}</template>
      </el-table-column>

      <el-table-column label="警官证" >
        <template slot-scope="scope">{{ scope.row.userPoliceCart }}</template>
      </el-table-column>

      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-bind:class="scope.row.userStatus === '正常' ? 'text_success' : 'text_danger'">
            <span class="iconfont icon-yuandianzhong"></span>
            {{ scope.row.userStatus }}
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
  import UserService from '../../services/SysLogService';

  export default {
    data() {
      return {
        service: UserService,
        roleList: [
          '角色名-1', '角色名-2', '角色名-3'
        ],
        searchFormModel: {
          userName: '',
          userDepartment: '',
          userCart: '',
          userPoliceCart: '',
          userRole: '',
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