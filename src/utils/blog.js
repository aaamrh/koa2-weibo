/**
 * 微博数据相关的工具方法
 */

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 获取blog-list.ejs的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString();

/**
 * 
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 * @returns 
 */
function getBlogListStr(blogList = [], canReply) {
  return ejs.render(BLOG_LIST_TPL,{
    blogList,
    canReply
  });
}

module.exports = {
  getBlogListStr
};