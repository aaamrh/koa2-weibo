/**
 * sequelize 同步数据库
 */

const seq = require('./seq')
require('./model/index')


// 测试链接
seq.authenticate().then(()=>{
  console.log('ok')
}).catch(()=>{
  console.log('er')
})


// 执行同步
seq.sync({force: true}).then(()=>{
  process.exit()
})