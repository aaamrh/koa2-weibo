// sequelize 实例创建， 可用于数据库模型创建

const Sequelize = require('sequelize');

const seq = new Sequelize('koa2_weibo_db', 'root', 'ma.1996', {
  host: 'localhost',
  dialect: 'mysql',
});

// 线上环境使用连接池
conf.pool = {
  max: 5, // 连接池中最大的数量
  min: 0,
  idle: 10000, // 如果一个连接池 10s 没有使用, 则释放
};

// 测试链接
seq.authenticate().then(() => {
  console.log('ok');
}).catch(() => {
  console.log('er');
});

module.exports = seq;
