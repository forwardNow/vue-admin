const MenuUtils = {
  convertToTreeItems(items = [], options) {
    const {
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
  MenuNo: '1',
  MenuName: '用户',
  MenuParentNo: '0',
  MenuUrl: '/user/list',
  MenuNodeIcon: 'iconfont icon-yonghu1',
}, {
  MenuNo: '2',
  MenuName: '角色管理',
  MenuParentNo: '0',
  MenuUrl: '/role/list',
  MenuNodeIcon: 'iconfont icon-jiaoseguanli',
}, {
  MenuNo: '1-1',
  MenuName: '用户管理',
  MenuParentNo: '1',
  MenuUrl: '',
  MenuNodeIcon: 'iconfont icon-yonghu1',
}, {
  MenuNo: '1-2',
  MenuName: '注册用户',
  MenuParentNo: '1',
  MenuUrl: '',
  MenuNodeIcon: 'iconfont icon-zhuce',
}, {
  MenuNo: '1-3',
  MenuName: '登陆方式',
  MenuParentNo: '1',
  MenuUrl: '',
  MenuNodeIcon: 'iconfont icon-denglu',
}];

const newItems = MenuUtils.convertToTreeItems(items,
  {
    idName: 'MenuNo',
    parentIdName: 'MenuParentNo',
    childrenName: 'children',
  });

console.log(newItems.map(item => item.MenuName));

export default MenuUtils;
