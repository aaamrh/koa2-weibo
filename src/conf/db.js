const { isProd } = require('../learn/redis/env');

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'ma.1996',
  port: 3306,
  database: 'koa2_weibo_db'
};

if(isProd){
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
  MYSQL_CONF
};