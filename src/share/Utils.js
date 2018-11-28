const Utils = {
  convertToTreeItems(options) {
    const {
      items = [],
      rootIds = [],
      idName = 'id',
      parentIdName = 'parentId',
      childrenName = 'children',
    } = options;
    const rootItems = [];
    const childrenSet = {};

    // 如果没有指定根节点的ID，则将所有 treeParentId == null 的节点作为根节点
    if (rootIds.length === 0) {
      rootIds.push(null, undefined, 0, '0', -1, '-1');
    }

    // 将 root 的 id 数组转换为 root 的 item 数组
    items.forEach((item) => {
      if (rootIds.includes(item[parentIdName])) {
        rootItems.push(item);
      }
    });

    // 以 parentId 为 key 构造集合
    items.forEach((item) => {
      if (!(parentIdName in item)) {
        return;
      }
      const parentId = item[parentIdName];
      childrenSet[parentId] = childrenSet[parentId] || [];
      childrenSet[parentId].push(item);
    });

    // 递归创建树
    function createTreeItems(roots) {
      const list = [];
      if (!roots) {
        return [];
      }
      roots.forEach((item) => {
        const newItem = Object.assign({}, item);
        newItem[childrenName] = createTreeItems(childrenSet[item[idName]]);
        list.push(newItem);
      });
      return list;
    }

    function createPlainItems(roots, depth = 1) {
      const list = [];
      if (!roots) {
        return [];
      }
      roots.forEach((item) => {
        const newItem = Object.assign({}, item);
        list.push(newItem);

        const subItems = createTreeItems(childrenSet[item[idName]], depth + 1);
        const newSubItems = subItems.map((subItem) => {
          const newSubItem = Object.assign({}, subItem);
          newSubItem.$depth = depth;
          return newSubItem;
        });
        list.push(...newSubItems);
      });
      return list;
    }

    return createTreeItems(rootItems);
  },
};

const items = [{
  CreateUserId: '92790ff1-cd2d-11e8-af9d-111d1d5800e1', CreateUserName: '超级管理员11', ModifiedUserId: '387adc01-e717-11e8-8b03-1b66fa964fd1', ModifiedUserName: '超级管理员', IsDeleted: 0, MenuNo: '1', MenuName: '用户', MenuParentNo: '0', MenuUrl: '/user/list', IsOpen: 0, MenuNodeIcon: 'iconfont icon-yonghu1', Sort: 1, SystemsId: '', _id: '5bdc11a1bfd2d74bd34ae5c8', CreateTime: '2018-11-02T08:58:09.437Z', ModifiedTime: '2018-11-28T08:37:01.925Z', MenuId: '6bb9d820-de7d-11e8-ba61-9b0370fadbdf', __v: 0,
}, {
  CreateUserId: '92790ff1-cd2d-11e8-af9d-111d1d5800e1', CreateUserName: '超级管理员11', ModifiedUserId: '387adc01-e717-11e8-8b03-1b66fa964fd1', ModifiedUserName: '超级管理员', IsDeleted: 0, MenuNo: '2', MenuName: '角色管理', MenuParentNo: '0', MenuUrl: '/role/list', IsOpen: 0, MenuNodeIcon: 'iconfont icon-jiaoseguanli', Sort: 1, SystemsId: '', _id: '5bdc11c0bfd2d74bd34ae5c9', CreateTime: '2018-11-02T08:58:40.186Z', ModifiedTime: '2018-11-28T08:37:09.823Z', MenuId: '7e0d28b0-de7d-11e8-ba61-9b0370fadbdf', __v: 0,
}, {
  CreateUserId: '387adc01-e717-11e8-8b03-1b66fa964fd1', CreateUserName: '超级管理员', ModifiedUserId: '', ModifiedUserName: '', IsDeleted: 0, MenuNo: '1-1', MenuName: '用户管理', MenuParentNo: '1', MenuUrl: '', IsOpen: 0, MenuNodeIcon: 'iconfont icon-yonghu1', Sort: 1, SystemsId: '', _id: '5bfe4492ec208d0246dc2ba2', CreateTime: '2018-11-28T07:32:34.543Z', ModifiedTime: '2018-11-28T07:32:34.547Z', MenuId: 'c5d48c30-f2df-11e8-860a-a9449c54dea0', __v: 0,
}, {
  CreateUserId: '387adc01-e717-11e8-8b03-1b66fa964fd1', CreateUserName: '超级管理员', ModifiedUserId: '', ModifiedUserName: '', IsDeleted: 0, MenuNo: '1-2', MenuName: '注册用户', MenuParentNo: '1', MenuUrl: '', IsOpen: 0, MenuNodeIcon: 'iconfont icon-zhuce', Sort: 1, SystemsId: '', _id: '5bfe44aaec208d0246dc2ba3', CreateTime: '2018-11-28T07:32:58.004Z', ModifiedTime: '2018-11-28T07:32:58.004Z', MenuId: 'd3cfcd40-f2df-11e8-860a-a9449c54dea0', __v: 0,
}, {
  CreateUserId: '387adc01-e717-11e8-8b03-1b66fa964fd1', CreateUserName: '超级管理员', ModifiedUserId: '', ModifiedUserName: '', IsDeleted: 0, MenuNo: '1-3', MenuName: '登陆方式', MenuParentNo: '1', MenuUrl: '', IsOpen: 0, MenuNodeIcon: 'iconfont icon-denglu', Sort: 1, SystemsId: '', _id: '5bfe44caec208d0246dc2ba4', CreateTime: '2018-11-28T07:33:30.350Z', ModifiedTime: '2018-11-28T07:33:30.350Z', MenuId: 'e71768e0-f2df-11e8-860a-a9449c54dea0', __v: 0,
}];

const newItems = Utils.convertToTreeItems({
  items,
  idName: 'MenuNo',
  parentIdName: 'MenuParentNo',
  childrenName: 'children',
});

console.log(newItems.map(item => item.MenuName));

export default Utils;
