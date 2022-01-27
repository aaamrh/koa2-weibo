const { User } = require('../db/model/index');
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
    Object.assign(whereOpt, {userName, password});
  }

  const result = await User.findOne({
    attributes: ['id', 'username', 'nickName', 'picture', 'city', 'gender'],
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
    password,
    gender,
    nickName: nickName ? nickName : userName
  });

  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser
};