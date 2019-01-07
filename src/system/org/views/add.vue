<template>
  <base-add-view title="创建机构"
                 parentPath="/system/org"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 @add-success="finish"
                 ref="add">

    <el-row>
      <el-col :span="24">
        <el-form-item label="机构名称" prop="organName">
          <el-input v-model="formModel.organName"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="机构等级" prop="organLevel">
          <el-select v-model="formModel.organLevel" placeholder="请选择">
            <el-option
                v-for="item in orgLevelDic"
                :key="item.code"
                :label="item.value"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="上级机构" prop="fatherId">
          <el-select v-model="formModel.fatherId" placeholder="请选择">
            <el-option
                v-for="item in allOrgList"
                :key="item.id"
                :label="item.organName"
                :value="String(item.id)">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="所在地" prop="$_areaList">
          <el-cascader
              v-model="formModel.$_areaList"
              expand-trigger="hover"
              :options="areaTree"
              :props="{ label: 'value', value: 'code' }"
              @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button type="primary" @click="submit()">保存</el-button>
    </el-form-item>
  </base-add-view>
</template>
<script>
import service from '../OrgService';
import AreaService from '../../area/AreaService';
import DicService from '../../../common/services/DicService';

export default {
  created() {
    DicService.getDicListByName('ORG_LEVEL').then(res => this.orgLevelDic = res);

    service.getList({}, { currentPage: 1, pageSize: 10000 }).then((res) => {
      const { errorCode, result } = res;

      if (errorCode !== 0) {
        console.error('【机构管理 / 创建】所有机构失败');
        return;
      }

      this.allOrgList = result.items;
    });

    AreaService.getAreaTree().then(areaTree => {
      // console.log(areaTree);
      this.areaTree = areaTree
    });
  },
  data() {
    return {
      areaTree: [],

      allOrgList: [],
      orgLevelDic: null,

      service,

      rules: {
        organName: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        organLevel: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        fatherId: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
        $_areaList: [
          { required: true, message: '必填项', trigger: ['blur', 'change'] },
        ],
      },
      formModel: {
        organName: '',
        organLevel: '',
        fatherId: '',
        provinceCode: '',
        cityCode: '',
        townCode: '',
        $_areaList: [],
      },
    };
  },
  methods: {
    finish() {
      this.$emit('finish-add');
    },
    handleChange() {
      console.log(arguments);
    },
    submit() {
      this.formModel.$_areaList.forEach((item, index) => {
        switch (index) {
          case 0: {
            this.formModel.provinceCode = item;
            break;
          }
          case 1: {
            this.formModel.cityCode = item;
            break;
          }
          case 2: {
            this.formModel.townCode = item;
            break;
          }
        }
      });
      this.formModel.fatherId = String(this.formModel.fatherId);
      this.$refs.add.submit();
    }
  },
};
</script>
