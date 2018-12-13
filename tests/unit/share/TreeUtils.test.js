import assert from 'assert';
import TreeUtils from '../../../src/common/utils/TreeUtils';

const items = [{
  MenuNo: '1',
  MenuName: '用户',
  MenuParentNo: null,
  MenuUrl: '/user/list',
  MenuNodeIcon: 'iconfont icon-yonghu1',
}, {
  MenuNo: '2',
  MenuName: '角色管理',
  MenuParentNo: null,
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


describe('TreeUtils', () => {
  it('createNestedTree()', () => {
    const newItems = TreeUtils.createNestedTree(items, null,
      {
        idName: 'MenuNo',
        parentIdName: 'MenuParentNo',
        subTreeName: 'children',
      });

    assert.equal(newItems.length, 2);
    assert.equal(newItems[0].MenuName, '用户');
    assert.equal(newItems[1].MenuName, '角色管理');
  });

  it('concatNestedTree()', () => {
    const newItems = TreeUtils.createNestedTree(items, null,
      {
        idName: 'MenuNo',
        parentIdName: 'MenuParentNo',
        subTreeName: 'children',
      });

    const list = TreeUtils.concatNestedTree(newItems);

    // console.log(list);
    assert.equal(list.length, 5);
  });
});
