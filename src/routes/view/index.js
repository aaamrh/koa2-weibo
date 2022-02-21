const router = require('koa-router')();
const { getProfileBlogList } = require('../../controller/blog-profile');
const { isExist } = require('../../controller/user');
const { loginRedirect } = require('../../middlewares/loginChecks');


router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {});
});

router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
});

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo;
  const myUserName = myUserInfo.userName;
  
  let curUserInfo;
  const { userName: curUserName } = ctx.params;
  const isMe = myUserName === curUserName; 
  if (isMe) {
    curUserInfo = myUserInfo;
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName);
    if (existResult.errno !== 0) {
      // 用户名不存在
      return ;
    }
    curUserInfo = existResult.data;
  }

  const result = await getProfileBlogList(curUserName, 0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;
  
  await ctx.render('profile', {
    blogData: { 
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe
    }
  });
});

module.exports = router;