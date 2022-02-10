const path = require('path');
const fse = require('fs-extra');
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo');
const { ErrorModel, SuccessModel } = require('../model/ResModel');

const MAX_SIZE = 1024 * 1024 * 1024;  // 最大体积 1M
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if ( !exist ) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
});

/** */
async function saveFile({name, type, size, filePath}) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath);
    return new ErrorModel(uploadFileSizeFailInfo);
  }

  // 移动文件
  const fileName = Date.now() + '.' + name;
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fse.move(filePath, distFilePath);

  return new SuccessModel({
    url: '/' + fileName 
  });
}

module.exports = {
  saveFile
};