const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

const User = seq.define('user',{
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名, 唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  nickName: {
    type: STRING,
    allowNull: false,
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别(1 男, 2 女, 3 保密)'
  },
  picture:{
    type: STRING,
    comment: '头像, 图片地址'
  },
  city: {
    type: STRING,
  }
});

module.exports = User;