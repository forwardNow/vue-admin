<template>
  <base-add-view title="创建用户"
                 parentPath="/system/user"
                 :service="service"
                 :addFormModel="formModel"
                 :addFormRules="rules"
                 :isCloseAfterAddSuccess="true"
                 label-width="80px"
                 @add-success="finish"
                 ref="add">
    <el-row :gutter="20">
      <el-col :span="12">

        <el-card class="card">
          <div slot="header" class="card__header">基本信息</div>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="formModel.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色编码" prop="userRoleId">
            <el-input v-model="formModel.userRoleId"></el-input>
          </el-form-item>
          <el-form-item label="角色等级" prop="roleLevel">
            <el-input v-model="formModel.roleLevel"></el-input>
          </el-form-item>
          <el-form-item label="角色状态" prop="roleStatus">
            <el-input v-model="formModel.roleStatus"></el-input>
          </el-form-item>
        </el-card>

      </el-col>
      <el-col :span="12">
        <el-card class="card">
          <div slot="header" class="card__header">设置菜单权限</div>
          <el-tree
              class="tree"
              :data="menuTreeItems"
              :show-checkbox="true"
              :default-expand-all="false"
              :default-expanded-keys="expandedNodeIds"
              node-key="upcId"
              ref="tree"
              highlight-current
              :props="treeConfig">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span :class="node.icon"></span>
                <span>{{ node.label }}</span>
              </span>
          </el-tree>
        </el-card>
      </el-col>
    </el-row>

    <el-button class="btn" type="primary" @click="$refs.edit.submit()">保存</el-button>
  </base-add-view>
</template>
<script>
import service from '../RoleService';
import TreeUtils from '../../../common/utils/TreeUtils';

export default {
  created() {
    this.createMenuTree();
  },
  data() {
    return {
      menuItems: [],
      menuTreeItems: [],
      expandedNodeIds: [],
      treeConfig: {
        children: 'children',
        label: 'upcRightName'
      },


      service,
      rules: {
      },
      formModel: {
        userRoleId: '',
        roleName: '',
        roleLevel: '',
        roleStatus: '',
      },
    };
  },
  methods: {
    finish() {
      this.$emit('finish-add');
    },
    createMenuTree() {
      /*
      MenuService.getList(null, {"pageSize":100,"currentPage":1}).then(res => {
        if (res.errorCode !== 0) {
          throw new Error('Home.vue: createMenuTree() 获取菜单失败!');
        }
        const menuItems = res.result.items;

        this.menuTreeItems = TreeUtils.createNestedTree(menuItems, null,
          {
            idName: 'upcId',
            parentIdName: 'fatherId',
            subTreeName: 'children',
          });
      });
      */
      const menuItems = [
        { upcId: 0, upcRightName: '系统设置', fatherId: null, url: '/system', icon: 'iconfont icon-jiaoseguanli', expand: false },
        { upcId: 1, upcRightName: '机构管理', fatherId: 0, url: '/system/org', icon: '', },
        { upcId: 2, upcRightName: '部门管理', fatherId: 0, url: '/system/dept', icon: '', },
        { upcId: 3, upcRightName: '角色管理', fatherId: 0, url: '/system/role', icon: '', },
        { upcId: 4, upcRightName: '用户管理', fatherId: 0, url: '/system/user', icon: '', },
        { upcId: 5, upcRightName: '证书管理', fatherId: 0, url: '/system/license', icon: '', expand: false },
        { upcId: 6, upcRightName: '我的证书', fatherId: 5, url: '/system/license/my', icon: '', },
        { upcId: 7, upcRightName: '生成正常', fatherId: 5, url: '/system/license/gen', icon: '', },
        { upcId: 8, upcRightName: '系统日志', fatherId: 0, url: '/system/sysLog', icon: '', },
        { upcId: 9, upcRightName: '业务日志', fatherId: 0, url: '/system/bizLog', icon: '', },
        { upcId: 10, upcRightName: '系统状态', fatherId: 0, url: '/system/sysStatus', icon: '', },
        { upcId: 11, upcRightName: '个人中心', fatherId: 0, url: '/system/profile/', icon: '', },
      ];

      this.menuItems = menuItems;

      this.menuItems.forEach((item) => {
        if (item.expand) {
          this.expandedNodeIds.push(item.upcId);
        }
      });

      this.menuTreeItems = TreeUtils.createNestedTree(menuItems, null,
        {
          idName: 'upcId',
          parentIdName: 'fatherId',
          subTreeName: 'children',
        });

      // console.log(this.menuTreeItems);
    },
  },
};
</script>
<style scoped>
  .title {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    padding: 1em 0 2em 0;
  }

  .tree {
    width: 200px;
    min-height: 500px;
  }
</style>
