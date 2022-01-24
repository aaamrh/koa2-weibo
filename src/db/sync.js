/**
 * sequelize 同步数据库
 */

require('./model')
const seq = require('./seq')


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