const { getSquareCaCheList } = require('../cache/blog');
const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../model/ResModel');

async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCaCheList(pageIndex, PAGE_SIZE);
  const blogList = result.blogList;

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  });
}

module.exports = {
  getSquareBlogList
};