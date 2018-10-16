<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">编辑字典
      <i class="popup__close el-icon-close" @click="handleClosePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <el-form class="form_edit" :inline="true" label-width="80px"
               ref="formModel" :model="formModel" :rules="rules">

        <el-form-item label="字典名称" prop="DicName">
          <el-input v-model="formModel.DicName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="字典描述" prop="DicDesc">
          <el-input v-model="formModel.DicDesc" style="width: 360px;"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>

      </el-form>

      <div class="container_dic-item">

        <!-- 操作 -->
        <div class="ope clearfix">

          <!-- 添加 -->
          <el-button type="success" size="small" @click="handleAdd()">添加字典条目</el-button>
          <!-- /添加 -->

          <!-- 搜索 -->
          <el-form :inline="true" class="search-group">
            <el-form-item>
              <el-input placeholder="请输入关键字" size="small" v-model="ItemCode">
                <template slot="prepend">条目编码</template>
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

          <el-table-column label="编码" width="100">
            <template slot-scope="scope">{{ scope.row.ItemCode }}</template>
          </el-table-column>

          <el-table-column label="值" width="180">
            <template slot-scope="scope">{{ scope.row.ItemValue }}</template>
          </el-table-column>

          <el-table-column label="描述" width="180">
            <template slot-scope="scope">{{ scope.row.ItemDesc }}</template>
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

      </div>

    </el-main>
  </el-container>
</template>
<script>
import DicService from '../../services/DicService';

export default {
  created() {
    this.init();
  },
  data() {
    return {
      rules: {
        //UserNickname: [
        //  { required: true, message: '必填项', trigger: ['blur', 'change'] },
        //],
      },
      formModel: {
        DicName: '',
        DicDesc: '',
      },

      ItemCode: '',
      loading: false,
      pager: {
        pageSizes: [10, 20, 50, 100, 200],
        pageSize: 100,
        total: null,
        currentPage: 1,
      },
      tableData: [],
    };
  },
  methods: {
    init() {
      const DicName = this.$route.query.id;

      DicService.get({ DicName: DicName }).then((res) => {
        if (res.errorCode === 0) {
          const user = res.result;

          Object.keys(this.formModel).forEach((key) => {
            this.formModel[key] = user[key];
          });
        } else if (res.errorCode === 1) {
          this.$message({
            type: 'error',
            message: '该字典不存在！',
            showClose: true,
            duration: 2000,
          });
        }
      });
    },
    reload() {

    },
    handleAdd() {

    },
    handleSubmit() {
      DicService.update(this.formModel).then((res) => {
        if (res.errorCode === 0) {
          this.$message({
            type: 'success',
            message: '更新成功！',
            showClose: true,
            duration: 1000,
          });

          // 告知父组件
          // this.$emit('finish');
        } else {
          this.$message({
            type: 'error',
            message: '更新失败！',
            showClose: true,
            duration: 1000,
          });
        }
      });
    },
    handleClosePopup() {
      this.$router.push({
        path: '/dic/list',
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
  },
};
</script>
<style scoped>
  .form_edit {
    width: 100%;
  }
  .container_dic-item {
    padding: 0 1px 20px 2px;
    margin-left: -20px;
    margin-right: -20px;
    border-top: dashed 1px #eee;
  }
</style>