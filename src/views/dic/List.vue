<template>
  <!-- .content__body -->
  <el-container class="content__body">
    <el-header class="heading">字典管理</el-header>
    <el-main class="content">

      <!-- 操作 -->
      <div class="ope clearfix">

        <!-- 添加 -->
        <el-button type="success" size="small" @click="handleAdd()">添加字典</el-button>
        <!-- /添加 -->

        <!-- 搜索 -->
        <el-form :inline="true" class="search-group">
          <el-form-item>
            <el-input placeholder="请输入关键字" size="small" v-model="DicName">
              <template slot="prepend">字典名称</template>
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
      <el-table :data="tableData" v-loading="loading" class="datagrid_table">

        <el-table-column type="index" width="50"></el-table-column>

        <el-table-column label="字典名称" width="160">
          <template slot-scope="scope">{{ scope.row.DicName }}</template>
        </el-table-column>

        <el-table-column label="字典描述" width="180">
          <template slot-scope="scope">{{ scope.row.DicDesc }}</template>
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
               @click.prevent="handleDetail(scope.row.DicName)">详情</a>
            <a class="ope-link" href="#"
               @click.prevent="handleEdit(scope.row.DicName)">编辑</a>
            <a class="ope-link" href="#"
               @click.prevent="handleDelete(scope.row.DicName)">删除</a>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination class="datagrid_pagination"
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
        <router-view class="popup" @finish="reload" ref="popup"></router-view>
      </transition>
      <!-- 添加模板 -->

    </el-main>
  </el-container>
</template>
<script>
import DicService from '../../services/DicService';

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
      DicName: '',
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

      DicService.getList( { DicName: this.DicName }, { pageSize, currentPage }).then((res) => {
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
      this.pager.pageSize = newPageSize;
      this.reload(true);
    },
    handleCurrentPageChange(newCurrentPage) {
      this.pager.currentPage = newCurrentPage;
      this.reload();
    },
    handleDetail(DicName) {
      this.$router.push({
        path: '/dic/list/detail',
        query: { id: DicName },
      });
    },
    handleAdd() {
      this.$router.push({
        path: '/dic/list/add',
      });
    },
    handleEdit(DicName) {
      this.$router.push({
        path: '/dic/list/edit',
        query: { id: DicName },
      });
    },
    handleDelete(DicName) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => DicService.delete({ DicName }))
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
