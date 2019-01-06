const ORG_LEVEL = [
  { code: '1', value: '省级' },
  { code: '2', value: '市级' },
  { code: '3', value: '区/县级' },
];

const DIC_SET = {
  ORG_LEVEL,
};


const service = {};

/**
 * 根据字典名称获取字典条目列表
 * @param dicName
 * @return {Promise<any>}
 */
service.getDicListByName = dicName => new Promise((resolve, reject) => {
  if (!dicName) {
    return reject(new Error('DicService.getDicListByName(): dicName is a empty string !'));
  }

  if (!(dicName in DIC_SET)) {
    return reject(new Error(`DicService.getDicListByName(): ${dicName} is not exist !`));
  }

  return resolve(DIC_SET[dicName]);
});

/**
 * 根据字典名称和条目编码获取条目的值
 * @param dicName
 * @param code
 * @return {Promise<string>}
 */
service.getDicItemValue = (dicName, code) => new Promise((resolve, reject) => {
  if (!dicName || code == null) {
    return null;
  }

  if (!(dicName in DIC_SET)) {
    return reject(new Error(`DicService.getDicItemValue(): ${dicName} is not exist !`));
  }

  let value = null;

  DIC_SET[dicName].some((item) => {
    if (item.code === code) {
      ({ value } = item);
      return true;
    }

    return false;
  });


  return resolve(value);
});

export default service;
