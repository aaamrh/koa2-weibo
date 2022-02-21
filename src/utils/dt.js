/**
 * 时间相关的工具函数
 */

const { format } = require('date-fns');

/**
 * @description
 * @param {*} str 时间字符串
 * @returns
*/
function timeFormat(str) {
  return format(new Date(str), 'yyyy-MM-dd HH:mm');
}

module.exports = {
  timeFormat
};