const { User } = require('../db/model/index');
const doCrypto = require('../utils/cryp');
const { formatUser } = require('./_format');

/**
 * @description 获取用户信息
 * @param {*} userName
 * @param {*} password
 */
async function getUserInfo (userName, password) {
  const whereOpt = {
    userName
  };

  if(password){
    Object.assign(whereOpt, {userName, password}); // GET 学习了增加操作项的写法
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city', 'gender'],
    where: whereOpt
  });

  if (result == null) {
    return result;
  }
  // 格式化
  const formatRes = formatUser(result.dataValues);

  return formatRes;
}

/**
 * @description 创建用户: gender: 1男 , 2女, 3保密
 * @param {*} { userName, password, gender=3, nickName }
 */
async function createUser ({ userName, password, gender=3, nickName }) {
  const result = await User.create({
    userName,
    password: doCrypto( password ), 
    gender,
    nickName: nickName ? nickName : userName
  });
  
  return result.dataValues;
}

/**
 * @description 删除用户
 * @param {*} userName
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  });
  // result 是删除的行数
  return result > 0;
}

async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
  // 拼接修改内容
  const updateData = {};

  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.niceName = newNickName;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newCity) {
    updateData.city = newCity;
  }

  const whereData = {
    userName
  };

  if (password) {
    whereData.password = password;
  }
  // 执行修改
  const result = await User.update(updateData, {
    where: whereData
  });
  console.log(result);
  return result[0] > 0;
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
};