/**
 * @fileOverview 格式化分页数据
 * @example
 * { code: 0, message: 'ok', data: null } => { errorCode: 0, reason: 'ok', result: null }
 */

const isWellFormatted = (result) => {
  if (!result) {
    return false;
  }

  if (!('pager' in result)) {
    return false;
  }

  if (!('items' in result)) {
    return false;
  }

  return true;
};

export default (result) => {
  if (isWellFormatted(result)) {
    return result;
  }

  const { pageNum: currentPage, total, list: items } = result;

  return { pager: { currentPage, total }, items };
};
