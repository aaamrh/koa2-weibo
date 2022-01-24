// sequelize 实例创建， 可用于数据库模型创建

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db');
const { isProd, isTest } = require('../learn/redis/env');

const {database, user, host,  port, password} = MYSQL_CONF;
const conf = {
  host,
  dialect: 'mysql'
}

if(isTest){
  conf.logging = () => {}
}

// 线上环境使用连接池
if(isProd){
  conf.pool = {
    max: 5, // 连接池中最大的数量
    min: 0,
    idle: 10000  // 如果一个连接池 10s 没有使用, 则释放
  }
}

const seq = new Sequelize(database, user, password, conf)


module.exports = seq;