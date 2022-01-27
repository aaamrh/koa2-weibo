/**
 * @description 连接redis的方法 get set
 */

const redis = require('redis');
const { REDIS_CONF } = require('../db');

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port.REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.log(err);
});

function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) { reject(err); return; }
      if (val == null) { resolve(null); return; }
      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
};
