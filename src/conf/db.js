const { isProd } = require('../learn/redis/env');

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'ma.1996',
  port: 3306,
  database: 'koa2_weibo_db'
};
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
};

if(isProd){
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1'
  };

  // 线上mysql配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'ma.1996',
    port: 3306,
    database: 'koa2_weibo_db'
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
};