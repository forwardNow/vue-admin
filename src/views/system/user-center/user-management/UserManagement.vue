<template>
  <!-- .content__body -->
  <el-container class="content__body">
    <el-header class="heading">用户管理</el-header>
    <el-main class="content">

      <!-- 操作 -->
      <div class="ope clearfix">

        <!-- 添加 -->
        <el-button type="success" size="small" @click="handleAddUser()">添加用户</el-button>
        <!-- /添加 -->

        <!-- 搜索 -->
        <el-form :inline="true" class="search-group">
          <el-form-item>
            <el-input placeholder="请输入登录名" size="small" v-model="loginNameKeyword">
              <template slot="prepend">登录名</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="reload()">搜索</el-button>
          </el-form-item>
        </el-form>
        <!-- /搜索 -->

      </div>
      <!-- /操作 -->

      <!-- 数据表格 -->
      <el-table :data="tableData" v-loading="loading" class="data-table">

        <el-table-column type="index" width="50"></el-table-column>

        <el-table-column label="登陆名" width="100">
          <template slot-scope="scope">
            {{ scope.row.clientName }}
          </template>
        </el-table-column>

        <el-table-column label="密码" width="180">
          <template slot-scope="scope">
            {{ scope.row.clientPassword }}
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            {{ scope.row.clientTrueName }}
          </template>
        </el-table-column>

        <el-table-column label="创建日期" width="240">
          <template slot-scope="scope">
            {{ scope.row.createtime | datetimeFilter}}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <a class="ope-link" href="#"
                @click.prevent="handleDetail(scope.row.clientId)">详情</a>
            <a class="ope-link" href="#"
                @click.prevent="handleEdit(scope.row.clientId)">编辑</a>
            <a class="ope-link" href="#"
                @click.prevent="handleDelete(scope.row.clientId)">删除</a>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination class="data-pagination"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :disabled="loading"
          @size-change="handlePageSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page="pager.currentPage"
          :page-sizes="pager.pageSizes"
          :page-size="pager.pageSize"
          :total="pager.total">
      </el-pagination>
      <!-- 数据表格 -->

      <!-- 添加模板 -->
      <transition mode="out-in" name="admin" v-on:after-enter="afterEnter">
        <router-view class="popup" @finishAddUser="reload" ref="popup"></router-view>
      </transition>
      <!-- 添加模板 -->

    </el-main>
  </el-container>
</template>
<script>
import UserService from '../../../../services/UserService';

export default {
  created() {
    this.reload();
  },
  data() {
    return {
      loading: false,
      pager: {
        pageSizes: [10, 20, 50, 100],
        pageSize: 10,
        total: null,
        currentPage: 1,
      },
      loginNameKeyword: '',
      tableData: [],
    };
  },
  methods: {
    afterEnter() {
      // 动画播放完毕后让弹出层中的第一个 input 获取焦点
      const inputNodeList = document.querySelector('.popup').getElementsByTagName('input');
      if (inputNodeList.length) {
        inputNodeList[0].focus();
      }
    },
    reload(isInitCurrentPage = false) {
      if (this.loading) {
        return;
      }

      if (isInitCurrentPage) {
        this.pager.currentPage = 1;
      }

      this.loading = true;

      const { pageSize, currentPage } = this.pager;

      UserService.getUserList(this.loginNameKeyword, { pageSize, currentPage }).then((res) => {
        if (res.errorCode === 0) {
          const {
            result: {
              items,
              pager: {
                pageSize: newPageSize,
                currentPage: newCurrentPage,
                total,
              },
            },
          } = res;
          this.tableData = items;
          this.pager.pageSize = newPageSize;
          this.pager.currentPage = newCurrentPage;
          this.pager.total = total;
        }
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    handlePageSizeChange(newPageSize) {
      console.log('handlePageSizeChange', newPageSize);
      this.pager.pageSize = newPageSize;
      this.reload(true);
    },
    handleCurrentPageChange(newCurrentPage) {
      console.log('handleCurrentPageChange', newCurrentPage);
      this.pager.currentPage = newCurrentPage;
      this.reload();
    },
    handleDetail(clientId) {
      this.$router.push({
        name: 'system.userCenter.userManagement.detail',
        params: { id: clientId },
      });
    },
    handleAddUser() {
      this.$router.push({
        name: 'system.userCenter.userManagement.add',
      });
    },
    handleEdit(clientId) {
      this.$router.push({
        name: 'system.userCenter.userManagement.edit',
        params: { id: clientId },
      });
    },
    handleDelete(clientId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => UserService.deleteUserById(clientId))
        .then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '删除成功！',
              showClose: true,
              duration: 1000,
            });

            this.reload();
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！',
              showClose: true,
              duration: 1000,
            });
          }
        })
        .catch(() => {
        });
    },
  },
};
</script>
