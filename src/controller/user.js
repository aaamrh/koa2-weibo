const { 
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo, 
  deleteUserFailInfo,
  registerUserNameExistInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
} = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user');
const doCrypto = require('../utils/cryp');

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
    return new ErrorModel(registerUserNameNotExistInfo);
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
    return new ErrorModel(registerUserNameExistInfo);
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

/**
 * @description
 * @param {*} ctx 用于存储session
 * @param {*} username
 * @param {*} password
 */
async function login (ctx, userName, password) {
  const userInfo = await getUserInfo(userName, password);
  if ( !userInfo ) {
    return new ErrorModel(loginFailInfo);
  }
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo;
    // console.log('userInfo=================', userInfo, ctx.session);
  }

  return new SuccessModel();
}

/**
 * @description
 * @param {*} userName
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName);
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(deleteUserFailInfo);
}

/**
 * @description 修改信息
 * @param {*} ctx
 * @param {*} { userName, city, picture }
 */
async function changeInfo (ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if ( !nickName ) {
    nickName = userName;
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  );
  console.log(result);
  if (result) {
    // result
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    });
    return new SuccessModel();
  }
  return new ErrorModel(changeInfoFailInfo);
}


async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword)
    },
    {
      userName,
      password: doCrypto(password)
    }
  );
  if (result) {
    return new SuccessModel();
  }

  return new ErrorModel(changePasswordFailInfo);
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword
};