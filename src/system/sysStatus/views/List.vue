<template>
  <base-list-view title="系统状态"
                  path="/system/sysStatus"
                  :service="service"
                  :search-form-model="searchFormModel"
                  @finish-add="handleFinishAdd"
                  @finish-edit="handleFinishEdit"
                  ref="base">


    <template slot="ope">

      <el-form :inline="true" class="search-group">
        <el-form-item label="服务器名称">
          <el-input placeholder="" size="small" v-model="searchFormModel.computerName">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="$refs.base.reload()">搜索</el-button>
        </el-form-item>
      </el-form>

    </template>

    <template slot="dategrid">
      <el-table-column label="服务器名称">
        <template slot-scope="scope">{{ scope.row.computerName }}</template>
      </el-table-column>
      <el-table-column label="CPU使用率">
        <template slot-scope="scope">{{ scope.row.cpuUsage | fmt}}</template>
      </el-table-column>
      <el-table-column label="内存使用率">
        <template slot-scope="scope">{{ scope.row.memUsage | fmt }}</template>
      </el-table-column>
      <el-table-column label="硬盘使用率">
        <template slot-scope="scope">{{ scope.row.diskUsage | fmt }}</template>
      </el-table-column>
      <el-table-column label="宽带使用率">
        <template slot-scope="scope">{{ scope.row.netUsage | fmt }}</template>
      </el-table-column>

    </template>

  </base-list-view>
</template>
<script>
  import service from '../SysStatusService';

  export default {
    data() {
      return {
        service,
        searchFormModel: {
          computerName: '',
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
    filters: {
      fmt(value) {
        const v = String((value * 100).toFixed(4)).padStart(7, '0');
        return `${ v }%`
      }
    }
  };
</script>