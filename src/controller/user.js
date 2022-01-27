const { registerNameNotExitInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { getUserInfo } = require('../services/user');

/**
 * @description 用户名是否存在
 * @param {*} username 用户名
 */
async function isExist(username){
  // 业务逻辑处理
  // 调用service获取数据
  // 统一返回格式
  const userInfo = await getUserInfo(username);
  
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerNameNotExitInfo);
  }
}

module.exports = {
  isExist
};