const { DEFAULT_PICTURE } = require('../conf/constant');

/**
 * @description 用户默认头像
 * @param {*} obj
 * @returns
 */
function _formatUserPicture(obj){
  if(obj.picture == null){
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

/**
 * @description
 * @param {Array|Object} list
 */
function formatUser(list){
  if (list == null){
    return null;
  }

  // 用户列表
  if (list instanceof Array) {
    return list.map(_formatUserPicture);
  }

  // 单个对象
  return _formtUserPicture(list);
}

module.exports = {
  formatUser
};
