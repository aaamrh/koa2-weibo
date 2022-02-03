/**
 * json schema验证中间件
 * 用于 api中的校验
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo');
const { ErrorModel } = require('../model/ResModel');


function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body;
    const err = validateFn(data);
    if (err) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return ;
    }

    await next();
  }
  return validator;
}


module.exports = {
  genValidator
};