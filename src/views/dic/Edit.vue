<template>
  <el-container class="popup">
    <el-header class="popup__heading" height="40px">编辑字典
      <i class="popup__close el-icon-close" @click="closePopup"></i>
    </el-header>
    <el-main class="popup__content">

      <div class="dic">

        <div class="dic__head">字典</div>

        <el-form class="form_edit" :inline="true" label-width="80px"
                 ref="dicForm" :model="dicFormModel" :rules="dicFormRules">

          <el-form-item label="字典名称" prop="DicName">
            <el-input v-model="dicFormModel.DicName" size="small"></el-input>
          </el-form-item>

          <el-form-item label="字典描述" prop="DicDesc">
            <el-input v-model="dicFormModel.DicDesc" size="small" style="width: 360px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="updateDic">保存</el-button>
          </el-form-item>

        </el-form>

      </div>

      <div class="dic-item">

        <div class="dic-item__head">字典条目</div>

        <!-- 操作 -->
        <div class="dic-item__body ope clearfix">

          <el-form :inline="true" class="dic-item-form"
                   ref="dicItemForm" :model="dicItemFormModel" :rules="dicItemFormRules">
            <el-form-item>
              <el-input size="small" v-model="dicItemFormModel.ItemCode">
                <template slot="prepend">编码</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="small" v-model="dicItemFormModel.ItemValue">
                <template slot="prepend">值</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input size="small" v-model="dicItemFormModel.ItemDesc">
                <template slot="prepend">描述</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="insertDicItem">添加</el-button>
            </el-form-item>
            <el-button type="primary" size="small" class="btn_refresh" @click="reloadDicItems">刷新</el-button>
          </el-form>


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

          <el-table-column label="状态" width="160">
            <template slot-scope="scope">
              <!--
              <span v-bind:class="scope.row.IsDeleted === 0 ? 'text_success' : 'text_danger'">
                <span class="iconfont icon-yuandianzhong"></span>
                {{ scope.row.IsDeleted === 0 ? '启用' : '停用'}}
              </span>
              -->
              <el-switch
                  :value="scope.row.IsDeleted"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :active-value="0"
                  :inactive-value="1"
                  :disabled="Boolean(scope.row.reserve)"
                  @click.native="changeDicItemStatus(scope.row)">
              </el-switch>
              <i class="el-icon-loading" v-if="scope.row.reserve"></i>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <a class="ope-link" href="#"
                 @click.prevent="showDicItemDetail({ItemId: scope.row.ItemId})">详情</a>
              <a class="ope-link" href="#"
                 @click.prevent="deleteDicItem({ItemId: scope.row.ItemId})">删除</a>
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
import DicItemService from '../../services/DicItemService';

export default {
  created() {
    this.init();
  },
  data() {
    return {
      isCloseAfterEditSuccess: false,
      parentPath: '/dic/list',
      dicFormRules: {
      },
      dicFormModel: {
        DicId: '',
        DicName: '',
        DicDesc: '',
      },

      dicItemFormRules: {
      },
      dicItemFormModel: {
        DicName: '',
        ItemCode: '',
        ItemValue: '',
        ItemDesc: '',
      },
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
    async init() {
      await DicService.get(this.$route.query).then((res) => {
        if (res.errorCode === 0) {
          const bean = res.result;

          Object.keys(this.dicFormModel).forEach((key) => {
            this.dicFormModel[key] = bean[key];
          });

          this.dicItemFormModel.DicName = this.dicFormModel.DicName;
        } else if (res.errorCode === 1) {
          this.$message({
            type: 'error',
            message: '该记录不存在！',
            showClose: true,
            duration: 2000,
          });
        }
      });

      return this.reloadDicItems();
    },
    updateDic() {
      this.$refs.dicForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }

        DicService.update(this.dicFormModel).then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '保存成功！',
              showClose: true,
              duration: 1000,
            });

            // 关闭
            if (this.isCloseAfterEditSuccess) {
              this.closePopup();
            }

            this.$emit('finish-edit');
          } else {
            this.$message({
              type: 'error',
              message: '保存失败！',
              showClose: true,
              duration: 1000,
            });
          }
        });

      });
    },
    changeDicItemStatus(row) {
      if (row.reserve === true) {
        return;
      }

      row.reserve === true;

      const newIsDeleted = row.IsDeleted === 0 ? 1 : 0;

      DicItemService.update({
        ItemId: row.ItemId,
        IsDeleted: newIsDeleted,
      }).then((res) => {
        if (res.errorCode === 0) {
          this.$message({
            type: 'success',
            message: '状态改变成功！',
            showClose: true,
            duration: 1000,
          });
          row.IsDeleted = newIsDeleted;
        } else {
          this.$message({
            type: 'error',
            message: '状态改变失败！',
            showClose: true,
            duration: 1000,
          });
        }

        row.reserve === false;
      });
    },
    insertDicItem() {
      this.$refs.dicItemForm.validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }

        DicItemService.insert(this.dicItemFormModel).then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '保存成功！',
              showClose: true,
              duration: 1000,
            });

            this.reloadDicItems();
            this.dicItemFormModel.ItemCode = '';
            this.dicItemFormModel.ItemValue = '';
            this.dicItemFormModel.ItemDesc = '';
          } else {
            this.$message({
              type: 'error',
              message: '保存失败！',
              showClose: true,
              duration: 1000,
            });
          }
        });

      });
    },
    showDicItemDetail(query) {
      
    },
    deleteDicItem(condition) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => DicItemService.delete(condition))
        .then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '删除成功！',
              showClose: true,
              duration: 1000,
            });

            this.reloadDicItems();
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
    reloadDicItems(isInitCurrentPage = false) {
      if (this.loading) {
        return;
      }

      if (isInitCurrentPage) {
        this.pager.currentPage = 1;
      }

      this.loading = true;

      const { pageSize, currentPage } = this.pager;
      const { DicName } = this.dicItemFormModel;

      if (!DicName) {
        throw new Error('reloadDicItems(): can not get DicName');
      }

      DicItemService.getList( { DicName }, { pageSize, currentPage }).then((res) => {
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
    closePopup() {
      this.$router.push({
        path: this.parentPath,
      });
    },
    handlePageSizeChange(newPageSize) {
      this.pager.pageSize = newPageSize;
      this.reloadDicItems(true);
    },
    handleCurrentPageChange(newCurrentPage) {
      this.pager.currentPage = newCurrentPage;
      this.reloadDicItems();
    },
  },
};
</script>
<style scoped>
  .form_edit {
    width: 100%;
  }

  .dic,
  .dic-item {
    padding: 0 20px 20px 20px;
    margin-left: -20px;
    margin-right: -20px;
  }

  .dic {
    margin-top: -12px;
  }

  .dic__head,
  .dic-item__head {
    height: 40px;
    padding: 0 20px;
    margin: 0 -20px;
    font-size: 16px;
    line-height: 40px;
    background-color: #f5f7fa;
  }

  .form_edit {
    margin-top: 20px;
  }
  .el-form--inline .el-form-item {
    margin-left: 10px;
    margin-right: 0;
  }
  .dic-item-form {
    margin-left: -10px;
  }

  .btn_refresh {
    float: right;
    margin-top: 5px;
  }
</style>