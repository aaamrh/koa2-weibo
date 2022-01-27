const { User } = require('./model');


!(async ()=>{
  const updateRes = await User.update({
    nickName: '张三-更新后'
  }, {
    where:{
      userName: 'zhangsan'
    }
  });
});