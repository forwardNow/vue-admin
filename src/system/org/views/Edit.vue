<template>
  <base-edit-view title="编辑机构"
                  parentPath="/system/org"
                  :service="service"
                  :editFormModel="formModel"
                  :editFormRules="rules"
                  :isCloseAfterAddSuccess="true"
                  @edit-success="finish"
                  @created="created"
                  ref="edit" >
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
                :key="item.organId"
                :label="item.organName"
                :value="item.organId">
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
              :options="options"
              :props="props"
              @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-col>
    </el-row>


    <el-form-item>
      <el-button type="primary" @click="$refs.edit.submit()">保存</el-button>
    </el-form-item>
  </base-edit-view>
</template>
<script>
import service from '../OrgService';
import DicService from '../../../common/services/DicService';

export default {
  created() {
    DicService.getDicListByName('ORG_LEVEL').then(res => this.orgLevelDic = res);

    service.getAreaTree().then((res) => {
      const { errorCode, result } = res;

      if (errorCode === 0) {
        this.options = result;
      } else {
        console.error('service.getAreaTree() 获取区域树失败');
      }
    });

    service.getAll().then((res) => {
      const { errorCode, result } = res;

      if (errorCode === 0) {
        this.allOrgList = result;
      } else {
        console.error('service.getAll() 获取所有失败');
      }
    });
  },
  data() {
    return {
      props: {
        label: 'toponym',
        value: 'toponym',
      },
      options: [],

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
        organId: '',
        organName: '',
        organLevel: '',
        fatherId: '',
        provinceName: '',
        cityName: '',
        townName: '',
        $_areaList: [],
      },
    };
  },
  methods: {
    created() {
      const { provinceName, cityName, townName } = this.formModel;

      this.formModel.$_areaList = [ provinceName, cityName, townName ];
    },
    finish() {
      this.$emit('finish-edit');
    },
    handleChange(value) {
      console.log(value);
    },
    submit() {
      this.formModel.$_areaList.forEach((item, index) => {
        switch (index) {
          case 0: {
            this.formModel.provinceName = item;
            break;
          }
          case 1: {
            this.formModel.cityName = item;
            break;
          }
          case 2: {
            this.formModel.townName = item;
            break;
          }
        }
      });
      this.$refs.add.submit();
    },
  },
};
</script>
