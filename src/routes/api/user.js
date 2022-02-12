const router = require('koa-router')();
const doCrypto = require('../../utils/cryp');
const { 
  register, 
  isExist, 
  login, 
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user');
const { genValidator } = require('../../middlewares/validator');
const userValidate = require('../../validator/user');
const { isTest } = require('../../learn/redis/env');
const { loginCheck } = require('../../middlewares/loginChecks');

router.prefix('/api/user');

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const {userName, password, gender} = ctx.request.body;

  ctx.body = await register({userName, password, gender});
});

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  console.log(ctx.request.body);

  ctx.body = await login(ctx, userName, doCrypto(password) );
});

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});


router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.session.userInfo;
    ctx.body = await deleteCurUser( userName );
  }
});

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } =  ctx.request.body;
  ctx.body = await changeInfo(ctx, { nickName, city, picture });
});


router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body;
  const { userName } = ctx.session.userInfo;
  ctx.body = await changePassword(userName, password, newPassword);
});

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx);
});

module.exports = router;