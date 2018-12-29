<template>
  <base-list-view title="业务日志"
                  path="/system/bizLog"
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
        <el-form-item label="日志名称">
          <el-input placeholder="" size="small" v-model="searchFormModel.nameLog">
          </el-input>
        </el-form-item>
        <el-form-item label="日志级别">
          <el-input placeholder="" size="small" v-model="searchFormModel.levelLog">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">
      <el-table-column label="日志名称">
        <template slot-scope="scope">{{ scope.row.nameLog }}</template>
      </el-table-column>
      <el-table-column label="日志描述">
        <template slot-scope="scope">{{ scope.row.desLog }}</template>
      </el-table-column>
      <el-table-column label="日志级别">
        <template slot-scope="scope">{{ scope.row.levelLog }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import service from '../BizLogService';

  export default {
    data() {
      return {
        service,
        searchFormModel: {
          startDate: '',
          endDate: '',
          nameLog: '',
          levelLog: '',
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