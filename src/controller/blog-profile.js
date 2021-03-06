/** 
 * 个人主页 controller
*/

const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../model/ResModel');
const { getBlogListByUser } = require('../services/blog');

/**
 * 获取个人主页微博列表
 */
async function getProfileBlogList (userName, pageIndex = 0) {

  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  });
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
  getProfileBlogList
};