<template>
  <!-- .content__body -->
  <el-container class="content__body">
    <el-header class="heading">{{ title }}</el-header>
    <el-main class="content">

      <!-- 操作 -->
      <div class="ope clearfix">
        <slot name="ope"></slot>
      </div>
      <!-- /操作 -->

      <!-- 数据表格 -->
      <el-table :data="tableData" v-loading="loading" class="datagrid_table">

        <el-table-column type="index" width="50"></el-table-column>

        <slot name="dategrid"></slot>

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
      <transition mode="out-in" name="admin" @after-enter="afterEnter">
        <router-view class="popup" ref="popup"
                     @finish-add="handleFinishAdd"
                     @finish-edit="handleFinishEdit"
                     @finish-detail="handleFinishDetail"
        ></router-view>
      </transition>
      <!-- 添加模板 -->

    </el-main>
  </el-container>
</template>
<script>
  import BaseService from '../services/BaseService';

  export default {
    props: {
      title: { type: String, default: '请添加标题' },
      path: { type: String },
      service: { type: BaseService },
      searchFormModel: { type: Object },
      pageSize: { type: Number, default: 20 },
      tableDataFormatter: { type: Function, default: items => Promise.resolve(items) },
    },
    created() {
      this.pager.pageSize = this.pageSize;
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
        search: this.search,
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
      async reload(isInitCurrentPage = false) {
        if (this.loading) {
          return;
        }

        if (isInitCurrentPage) {
          this.pager.currentPage = 1;
        }

        this.loading = true;

        const { pageSize, currentPage } = this.pager;
        let tableData;

        await this.service.getList( this.searchFormModel, { pageSize, currentPage }).then((res) => {
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

            // this.tableData = this.tableDataFormatter(items);
            tableData = items;
            this.pager.pageSize = newPageSize;
            this.pager.currentPage = newCurrentPage;
            this.pager.total = total;
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        });

        await this.tableDataFormatter(tableData).then((items) => {
          this.tableData = items;
        });
      },
      handleFinishAdd(...args) {
        this.$emit('finish-add', args);
      },
      handleFinishEdit(...args) {
        this.$emit('finish-edit', args);
      },
      handleFinishDetail(...args) {
        this.$emit('finish-detail', args);
      },
      handlePageSizeChange(newPageSize) {
        this.pager.pageSize = newPageSize;
        this.reload(true);
      },
      handleCurrentPageChange(newCurrentPage) {
        this.pager.currentPage = newCurrentPage;
        this.reload();
      },
      showDetailView(query) {
        this.$router.push({
          path: `${this.path}/detail`,
          query,
        });
      },
      showAddView() {
        this.$router.push({
          path: `${this.path}/add`,
        });
      },
      showEditView(query) {
        this.$router.push({
          path: `${this.path}/edit`,
          query,
        });
      },
      deleteRecord(condition) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => this.service.delete(condition))
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
