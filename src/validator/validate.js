/**
 * json schame 校验
 */


const Ajv = require('ajv');
const ajv = new Ajv({
  // allErrors: true // 输出所有的错误(比较慢)
});

/**
 * @description 
 * @param {*} schema json schema规则
 * @param {*} [data={}] 校验的数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0];
  }
}

module.exports = validate;