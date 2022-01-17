const {Blog, User} = require('./model')

!(async function(){
  // 创建用户
  const zhangsan = await User.create({
    userName: 'zhangsan',
    password: '123123',
    nickName: '泥人张'
  })
  const lisi = await User.create({
    userName: 'lisi',
    password: '123123',
    nickName: '四哥'
  })
  const blog1 = await Blog.create({
    title: '熟经济',
    content: '掌握金融编剧新动向',
    userId:  zhangsan.dataValues.id
  })
  const blog2 = await Blog.create({
    title: 'JavaScript高级程序设计',
    content: 'JavaScript进阶到入门',
    userId:  lisi.dataValues.id
  })

})()
