<template>
  <base-list-view title="用户管理"
                  path="/system/user"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @selection-change="handleSelectionChange"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">

    <template slot="fn">
      <el-button type="success" size="small" @click="$refs.base.showAddView()">创建用户</el-button>
      <el-button type="primary" size="small" @click="exportUsers" :disabled="isExporting">
        <span v-show='isExporting' class="el-icon-loading"></span>
        导出用户
      </el-button>
    </template>

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
      <el-table-column type="selection" width="36">
      </el-table-column>

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

      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showDetailView({ userId: scope.row.userId })">详情</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.showEditView({ userId: scope.row.userId })">编辑</a>
          <a class="ope-link" href="#"
             @click.prevent="$refs.base.deleteRecord({ userId: scope.row.userId })">删除</a>
          <a class="ope-link" href="#"
             @click.prevent="resetPassword(scope.row)">重置密码</a>
        </template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import service from '../UserService';

  export default {
    data() {
      return {
        isExporting: false,
        service,
        selectedRecords: [],
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
      resetPassword(user) {
        const { userId, userName } = user;

        this.$confirm(`此操作将重置用户【${userName}】的密码, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
          .then(() => service.resetPassword({ userId }))
          .then((res) => {
            if (res.errorCode === 0) {
              this.$message({
                type: 'success',
                message: '重置用户密码成功！',
                showClose: true,
                duration: 1000,
              });

              this.reload();
            } else {
              this.$message({
                type: 'error',
                message: '重置用户密码失败！',
                showClose: true,
                duration: 1000,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      },
      handleSelectionChange(selection) {
        this.selectedRecords = selection;
      },
      exportUsers() {
        let html;
        let rows = '';

        if (this.selectedRecords < 1) {
          this.$message({
            type: 'error',
            message: '请勾选要导出的数据记录！',
            showClose: true,
            duration: 1000,
          });

          return;
        }

        this.selectedRecords.forEach((item, i) => {
          rows += `<tr> <td>${ i + 1 }</td> <td>${item.userName}</td> <td>${item.userRealName}</td> </tr>`;
        });

        html =
          `<table class="table_simple">
            <tbody>
              <tr> <th>序号</th> <th>用户名</th> <th>姓名</th></tr>
              ${ rows }
            </tbody>
           </table>`;

        const vnode = this.$createElement('div', {
          style: {
            maxHeight: '500px',
            overflow: 'auto',
          },
          domProps: {
            innerHTML: html
          },
        });

        this.$confirm(vnode, '是否导出以下用户', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: '',
        })
        .then(() => {
          this.isExporting = true;

          setTimeout(() => {
            this.$message({
              type: 'warning',
              message: '此功能未开发完毕！',
              showClose: true,
              duration: 3000,
            });

            this.isExporting = false
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
        })
      },
    },
  };
</script>