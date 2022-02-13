const path = require('path');
const Koa = require('koa');

const app = new Koa(); 
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const koaStatic = require('koa-static');

const { REDIS_CONF } = require('./learn/redis/db');
const { isProd } = require('./learn/redis/env');

const indexViewRouter = require('./routes/view/index');
const errorViewRouter = require('./routes/view/error');
const userViewRouter = require('./routes/view/user');
const userAPIRouter = require('./routes/api/user');
const utilsAPIRouter = require('./routes/api/utils');
const { SESSION_SECRET_KEY } = require('./conf/secretKeys');

// error handler 页面上显示错误
let onerrorCong = {};
if (isProd) {
  onerrorCong = {
    redirect: '/error',
  };
}
onerror(app, onerrorCong);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json()); // bodyparser解析完json是string, json()是转换成对象
// app.use(logger());
app.use(koaStatic(`${__dirname}/public`));
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')));

app.use(views(`${__dirname  }/views`, {
  extension: 'ejs',
}));

// logger 中间件使用演示
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// session 配置
app.keys = [SESSION_SECRET_KEY];
app.use(session({
  key: 'weibo.sid', // cookie名字, 默认是koa.sid
  prefix: 'weibo.sess:', // redis key的前缀, 默认是koa:sess:
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
  // ttl: 24 * 60 * 60 * 1000, // redis过期时间, 默认和maxAge保持一致
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
  }),
}));


// routes
app.use(indexViewRouter.routes(), indexViewRouter.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods());
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());

// error-handling 控制台打印错误
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
}); 

module.exports = app;
