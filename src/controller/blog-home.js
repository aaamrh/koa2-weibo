/**
 * 首页 controller
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorInfo');
const { createBlog } = require('../services/blog');

/**
 * 创建微博
 */
async function create ({ userId, content, image }) {
  // service
  try{
    const blog = await createBlog({
      userId, 
      content, 
      image
    });
    return new SuccessModel(blog);
  }catch(e){
    console.log(e);
    return new ErrorModel(createBlogFailInfo);
  }
};

module.exports = {
  create
};
