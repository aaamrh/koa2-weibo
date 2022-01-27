const Sequelize = require('sequelize');
const seq = require('./seq');

// 创建 User 模型, 创建后的表名字默认是复数, 可通过配置取消
const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  niceName: {
    type: Sequelize.STRING,
  },
});

const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// 关联外键
Blog.belongsTo(User, {
  // Blog.userId -> User.id
  foreignKey: 'userId',
});

module.exports = {
  User,
  Blog,
};
