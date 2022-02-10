/**
 * 登录验证的中间件
 */

const { loginFailInfo, loginCheckFailInfo } = require('../model/ErrorInfo');
const { ErrorModel } = require('../model/ResModel');


/**
 * @description API登录验证
 * @param {*} ctx
 * @param {*} next
 */
async function loginCheck(ctx, next) {
  if (ctx?.session?.userInfo) {
    await next();
    return ;
  }

  ctx.body = new ErrorModel(loginCheckFailInfo);
}

/**
 * @description 页面登录验证
 * @param {*} ctx
 * @param {*} next
 */
async function loginRedirect(ctx, next) {
  if (ctx?.session?.userInfo) {
    await next();
    return ;
  }

  const curUrl = ctx.url;
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl));
}

module.exports = {
  loginCheck,
  loginRedirect
};