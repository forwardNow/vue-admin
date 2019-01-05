/**
 * @fileOverview 对分页数据进行处理
 * @example
 * { pager:  }
 */

const isWellFormatted = (result) => {
  if (!result) {
    return false;
  }

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
  if (isWellFormatted(result)) {
    return result;
  }

  const {
    pageNum: currentPage,
    total,
    list: items,
  } = result;

  return { pager: { currentPage, total }, items };
};
