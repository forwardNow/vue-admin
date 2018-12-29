<template>
  <base-list-view title="系统日志"
                  path="/system/sysLog"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">


    <template slot="ope">

      <el-form :inline="true" class="search-group">
        <el-form-item label="开始日期">
          <el-input placeholder="" size="small" v-model="searchFormModel.startDate">
          </el-input>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-input placeholder="" size="small" v-model="searchFormModel.endDate">
          </el-input>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input placeholder="" size="small" v-model="searchFormModel.createUserte">
          </el-input>
        </el-form-item>
        <el-form-item label="操作对象">
          <el-input placeholder="" size="small" v-model="searchFormModel.operateObj">
          </el-input>
        </el-form-item>
        <el-form-item label="操作方法">
          <el-input placeholder="" size="small" v-model="searchFormModel.operateMethod">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">
      <el-table-column label="操作对象">
        <template slot-scope="scope">{{ scope.row.operateObj }}</template>
      </el-table-column>
      <el-table-column label="操作方法">
        <template slot-scope="scope">{{ scope.row.operateMethod }}</template>
      </el-table-column>
      <el-table-column label="IP地址">
        <template slot-scope="scope">{{ scope.row.ipAddress }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="创建人">
        <template slot-scope="scope">{{ scope.row.createUser }}</template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import service from '../SysLogService';

  export default {
    data() {
      return {
        service,
        searchFormModel: {
          startDate: '',
          endDate: '',
          createUserte: '',
          operateObj: '',
          operateMethod: '',
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