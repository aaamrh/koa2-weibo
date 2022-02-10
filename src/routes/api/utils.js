/**
 * utils api 路由
 */

const { loginCheck } = require('../../middlewares/loginChecks');
const router = require('koa-router')();
const koaForm = require('formidable-upload-koa');
const { saveFile } = require('../../controller/utils');

router.prefix('/api/utils');

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file'];
  const { size, path, name, type } = file;


  ctx.body = await saveFile({
    name,
    type, 
    size,
    filePath: path
  });
});

module.exports = router;