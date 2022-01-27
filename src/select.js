const {Blog, User} = require('./model');

!(async ()=>{
  // 查询一条
  const zhangsan = await User.findOne({
    where: {
      userName: 'zhangsan'
    }
  });

  // 查询特定的列
  const zhangsanName = await User.findOne({
    attributes: ['userName', 'nickName'],
    where: {
      userName: 'zhangsan'
    }
  });

  // 查询多个
  const zhangsanBlogs = await Blog.findAll({
    where:{
      userId: zhangsan.dataValues.id
    },
    order: [
      ['id', 'desc']
    ]
  });

  // 分页
  const blogPageList = await Blog.findAll({
    limit: 2, // 查询2条
    offset: 0, // 跳过多少条
    order: [
      ['id', 'desc']
    ]
  });

  // 查询总数
  const blogListAndCount = await Blog.findAndCountAll({
    limit: 2, // 查询2条
    offset: 0, // 跳过多少条
    order: [
      ['id', 'desc']
    ]
  });
  console.log('blogListAndCount', 
    blogListAndCount.count, 
    blogListAndCount.rows.map(
      blog => blog.dataValues
    ));
});

// 连表查询 1
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
});

console.log(
  'blogListWithUser',
  blogListWithUser.count,
  blogListWithUser.rows.map( blog => {
    const blogVal = blog.dataValues;
    /**
       * blogVal.user 中的user是根据模型define中的名字来的
       * 
       * const User = seq.define('user (这个)', {
       */
    const user = blogVal.user.dataValues;
  } )

);


// 连表查询2 
const userListWithBlog = await User.findAndCountAll({
  attributes: ['userName', 'nickName'],
  include: [
    {
      model: Blog
    }
  ]
});

console.log('userListWithBlog', 
  userListWithBlog.count,
  userListWithBlog.row.map(user=>{
    const userVal = user.dataValues;
    userVal.blogs = userVal.blogs.map();
  })
);