const { registerUserNameExistInfo, registerUserNameNotExistInfo, registerFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { getUserInfo, createUser } = require('../services/user');

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
    return new ErrorModel(regi);
  }
}

/**
 * @description 
 * @param { string } { username }
 * @param { string } { password }
 * @param { number } 性别: 1: 女 2: 男 3: 保密
 */
async function register ({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if(userInfo){
    return ErrorModel({registerNameNotExitInfo});
  }

  try {
    await createUser({
      userName, password, gender
    });
    return new SuccessModel();
  }catch(e){
    console.error(e.message, e.stack);
    return new ErrorModel(registerFailInfo);
  };
}

module.exports = {
  isExist,
  register
};