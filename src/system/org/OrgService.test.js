import service from './OrgService';
import API from './OrgAPI';

// 关键属性和值
const keyProp = 'organName';
const idProp = 'id';
const keyValue = `哇哈哈 - ${Date.now()}`;
const newKeyValue = keyValue + 1;

const bean = {
  [keyProp]: keyValue,
  organLevel: '2',
  fatherId: '596850382303585796495149902751', // 公安局
  provinceName: '福建省',
  cityName: '莆田市',
  townName: '涵江区',
};

async function test() {
  let receivedBean = null;

  await service.insert(bean).then((res) => {
    const { errorCode } = res;
    const msg = `${API.INSERT} fail!`;

    if (errorCode !== 0) {
      throw new Error(msg);
    }
  });


  await service.getList({ [keyProp]: keyValue }).then((res) => {
    const { errorCode, result: { items } } = res;
    const api = API.GET_LIST;

    if (errorCode !== 0) {
      throw new Error(`${api}: errorCode is not equal to 0 !`);
    }

    if (!Array.isArray(items)) {
      throw new Error(`${api}: items is not an array !`);
    }

    if (items.length !== 1) {
      throw new Error(`${api}: items' length is not equal to 1!`);
    }

    [receivedBean] = items;

    if (receivedBean[keyProp] !== keyValue) {
      throw new Error(`${api}: item's ${keyProp} is not equal to ${keyValue}!`);
    }
  });


  receivedBean[keyProp] = newKeyValue;

  await service.update(receivedBean).then((res) => {
    const { errorCode } = res;
    const msg = `${API.UPDATE} fail!`;

    if (errorCode !== 0) {
      throw new Error(msg);
    }
  });

  await service.get({ [idProp]: receivedBean[idProp] }).then((res) => {
    const { errorCode, result } = res;
    const api = API.GET_ONE;

    if (errorCode !== 0) {
      throw new Error(`${api}: errorCode is not equal to 0 !`);
    }

    if (result[keyProp] !== keyValue) {
      throw new Error(`${api}: item's ${keyProp} is not equal to ${newKeyValue}!`);
    }
  });


  await service.delete({ [idProp]: receivedBean[idProp] }).then((res) => {
    const { errorCode } = res;
    const msg = `${API.DELETE} fail!`;

    if (errorCode !== 0) {
      throw new Error(msg);
    }
  });
}

export default test;
