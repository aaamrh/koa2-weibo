# koa2 实战新浪微博

## 项目创建/启动

创建项目: `koa2 -e <name>` , `-e`使用ejs为模板引擎

项目启动: `npm run dev`

## 依赖包

`npm i cross-env -D`

## git前缀

`refactor` 做了重构\目录改变, 没有增加新功能
`feature`  增加了新功能

## ejs

``` js
  // .ejs
  <%= locals.title %> 
  // 不确定变量是否是由后端传过来, 就加locals, 页面就不会报错

  // koa2
  async ctx.render('index', { title: 'Hello world' })

  // ##### ejs 条件判断 #############
  // 输出变量用=号: <%=
  <% if (title) { %>
    内容
  <% } else { %>
    内容
  <% } %>

  // ##### ejs 组件 ##############
  // 查看 views/widgets/user-info.ejs
  // 导入组件
  <%- include('widgets/user-info', {
    user: '铁头马'
  }) %>

  // ''
  <% blogList.forEach( title => { %>
    <li> <%= title %> </li>
  <% }) %>

```

## 数据库 ORM - sequelize

    搜索关键字:
    数据库模型 外键 (创建 查询 更新 删除) 排序 分页 连表查询 连接池

`npm i mysql2 sequelize -d` 安装依赖包

``` js
  // sequelize 实例创建， 可用于数据库模型创建

  const Sequelize = require('sequelize')
  const seq = new Sequelize('koa2_weibo_db', 'root', 'ma.1996', {
    host: 'localhost',
    dialect: 'mysql'
  })

  // 线上环境使用连接池
  conf.pool = {
    max: 5, // 连接池中最大的数量
    min: 0,
    idle: 10000  // 如果一个连接池 10s 没有使用, 则释放
  }

  // 测试链接
  seq.authenticate().then(()=>{
    console.log('ok')
  }).catch(()=>{
    console.log('er')
  })

  module.exports = seq;
```

``` js
  // 创建模型
  const Sequelize = require('sequelize');
  const seq = require('./seq');

  // 创建 User 模型, 创建后的表名字默认是复数, 可通过配置取消
  const User = seq.define('user', {
    userName : {
      type: Sequelize.STRING,
      allowNull: false,
      comment: '用户名'
    }
    // ...
  })

  const Blog = seq.define('blog', {
    // ...
    userId: {
      type: Sequelize.INTEGER
    }
  })

  // 写法1: 关联外键
  Blog.belongsTo(User, {
    // Blog.userId -> User.id
    foreignKey: 'userId'
  })

  // 写法2: 需要删除Blog中的 userId
  Blog.belongsTo(User)

  // 写法3:
  User.hasMany(Blog, {
    foreignKey: 'userId'
  })
```

``` js
  // 创建数据
  const blog1 = await Blog.create({
    title: '熟经济',
    content: '掌握金融编剧新动向',
    userId:  zhangsan.dataValues.id
  })
```

``` js
  // 查询一条数据
  const zhangsan = await User.findOne({
    where: {
      userName: 'zhangsan'
    }
  })

  // 查询特定的列
  const zhangsanName = await User.findOne({
    attributes: ['userName', 'nickName'],
    where: {
      userName: 'zhangsan'
    }
  })

  // 查询多个
  const zhangsanBlogs = await Blog.findAll({
    where:{
      userId: zhangsan.dataValues.id
    },
    order: [
      ['id', 'desc'] // 排序, 可以根据多个条件排序
    ]
  })
  
  // 分页
  const blogPageList = await Blog.findAll({
    limit: 2, // 查询2条
    offset: 0, // 跳过多少条
    order: [
      ['id', 'desc']
    ]
  })

  // 查询总数
  const blogListAndCount = await Blog.findAndCountAll({
    limit: 2, // 查询2条
    offset: 0, // 跳过多少条
    order: [
      ['id', 'desc']
    ]
  })
  console.log('blogListAndCount', 
    blogListAndCount.count, 
    blogListAndCount.rows.map(
      blog => blog.dataValues
    ))
  })

  // 连表查询 1 , Blog.belongsTo( User, {})
  const blogListWithUser = await Blog.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName'],
        where: {
          userName: 'zhangsan'
        }
      }
    ]
  })

  console.log(
    'blogListWithUser',
    blogListWithUser.count,
    blogListWithUser.rows.map( blog => {
      const blogVal = blog.dataValues
      /**
       * blogVal.user 中的user是根据模型define中的名字来的
       * const User = seq.define('user (这个)', {
       */
      const user = blogVal.user.dataValues
    } )
  ) 

  // 连表查询2  User.hasMany(Blog,{})
  const userListWithUser = await User.findAndCountAll({
    attributes: ['userName', 'nickName'],
    include: [
      {
        model: Blog
      }
    ]
  })
  
  console.log('userListWithBlog', 
    userListWithBlog.count,
    userListWithBlog.row.map(user=>{
      const userVal = user.dataValues
      userVal.blogs = userVal.blogs.map() // 这里是blogs, 复数
    })
  )
```

``` js 更新
 const updateRes = await User.update({
    nickName: '张三-更新后'
  }, {
    where:{
      userName: 'zhangsan'
    }
  })
```

``` js 删除
  const delBlogRes = await Blog.destroy({
    where : {
      id: 4
    }
  })
```

## Redis

    内存数据库(mysql是硬盘数据库)

    当网站中有公共数据需要存储, 这些数据不因用户有差异化的数据, 适合做缓存

赋值: `set <name> <val>`

取值: `get <name> <val>`

所有key: `keys *`

## nodejs链接redis

安装依赖 `npm i redis -d`

``` js

const redis = require('redis')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port. REDIS_CONF.host )

redisClient.set(key, val)
redisClient.expire(key, timeout)

function get(key){
  const promise = new Promise((resolve, reject)=>{
    redisClient.get(key, (err, val)=>{
      if(err){reject(err); return}
      if(val == null){ resolve(null); return }
      try{
        resolve(JSON.parse(val))
      }catch(ex){
        resolve(val)
      }
    })
  })
  return promise
}
```

## Cookie 和 Session

    为什么session适合Redis？  
    session访问频繁, 对性能要求极高
    session可不考虑断点丢失的问题(内存的硬伤)
    session数据量不会太大(相比mysql)

    网站数据为什么不适用redis？
    操作频率不高
    断点不能丢失, 不容忍
    数据量太大, 内存成本太高

## koa配置session

`npm i koa-redis koa-generic-session --save`

``` JS
  // app.js
  const session = require('koa-generic-session')
  const redisStore = require('koa-redis')

  // session 配置
  app.keys = ['sdfjei_235,']
  app.use(session({
    key: 'weibo.sid', // cookie名字, 默认是koa.sid
    prefix: 'weibo.sesssion:', // redis key的前缀, 默认是koa:sess:
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    // ttl: 24 * 60 * 60 * 1000, // redis过期时间, 默认和maxAge保持一致
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  }))
```

## 使用session

``` js
  router.get('/json', (ctx, next)=>{
    const session = ctx.session;
    if(session.count  == null){
      session.count = 0
    }
    session.count ++ 
  })
```

## jest

`npm i jest -D`

```json
 // package.json
 // --runInBand 顺序执行 --forceExit执行完退出
  {
    "scripts": {
      "test": "cross-env NODE_ENV=test jest --runInBand --forceExit --colors"
    },
  }
```

``` js
  // 测试http请求: 查看 test/json.test.js
```

## 开发环境

### eslint

`npm install eslint  babel-eslint --save-dev`

### debug

``` json
  "scripts":{
    "dev": "cross-env NODE_ENV=dev nodemon --inspect=9229 --bin/www bin/www",
  }
```

在chrome中输入url: chrome://inspect

## 格式校验

`npm i ajv --save`


## 加密

`cryp`


## 文件上传

保存图片用 `formidable-upload-koa`, 移动文件用 `fs-extra`

## xss攻击的防范

`npm i xss -S`