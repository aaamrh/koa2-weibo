require('./model')
const seq = require('./seq')

// 执行同步
seq.sync({force: true}).then(()=>{
  process.exit()
})