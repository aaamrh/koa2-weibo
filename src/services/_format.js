const { DEFAULT_PICTURE } = require('../conf/constant');
const { timeFormat } = require('../utils/dt');

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
  return _formatUserPicture(list);
}

/**
 * @description 格式化数据的时间
 * @param {*} obj 数据
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt);
  obj.updatedAtFormat = timeFormat(obj.updatedAt);
  return obj;
}

/**
 * @description 格式化微博信息
 * @param {*} list 微博列表或者单个微博对象
 * @returns
 */
function formatBlog(list) {
  if ( list == null ) {
    return list;
  }

  if (list instanceof Array) {
    return list.map(_formatDBTime);
  }

  return _formatDBTime(list);
}

module.exports = {
  formatUser,
  formatBlog
};
