/**
 * @fileOverview 对分页数据进行处理
 * @example
 * { pager:  }
 */

const isWellFormatted = (result) => {
  if (!('pager' in result)) {
    return false;
  }

  if (!('currentPage' in result.pager)) {
    return false;
  }

  if (!('pageSize' in result.pager)) {
    return false;
  }

  return true;
};

export default (result) => {
  // 不存在
  if (!result) {
    return result;
  }

  // 不是对象
  if (!(result instanceof Object)) {
    return result;
  }

  // 格式良好
  if (isWellFormatted(result)) {
    return result;
  }

  const {
    pageNum: currentPage,
    total,
    list: items,
  } = result;

  // 分页数据
  if (currentPage != null && total != null && items != null) {
    return { pager: { currentPage, total }, items };
  }

  // 普通数据
  return result;
};
