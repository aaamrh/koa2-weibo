const server = require('../server');

const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存储cookie
let COOKIE = '';

test('注册用户', async () => {
  const res = await server.post('/api/user/register').send(testUser);
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser);
  expect(res.body.errno).not.toBe(0)
})

// 查询用户是否存在
test('查询注册的用户名, 应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName });
  expect(res.body.errno).toBe(0);
})

// json schema检测
test('json schema 检测, 非法的格式, 注册应该失败', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123',
    password: '1',
    gender: 'mail'
  })
  expect(res.body.errno).not.toBe(0);
})

// 登录
test('登录, 应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })

  expect(res.body.errno).toBe(0);
  COOKIE = res.headers['set-cookie'].join(';');
})

// 修改用户信息
test('修改基本信息 应该成功', async () => {
  const res = await server.patch('/api/user/changeInfo').send({
    nickName: '测试用例',
    city: "测试城市",
    picture: "/test.png"
  }).set('cookie', COOKIE)

  expect(res.body.errno).toBe(0);
})

test('修改密码 应该成功', async () => {
  const res = await server.patch('/api/user/changePassword').send({
    password,
    newPassword: 'qwe123'
  }).set('cookie', COOKIE);

  expect(res.body.errno).toBe(0);
})

// 删除 
test('删除用户 应该成功', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE)
  expect(res.body.errno).toBe(0);
})

test('退出登录 应该成功', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE);
  expect(res.body.errno).toBe(0);
})

test('查询注册的用户名, 应该不存在 已经被删除', async () => {
  const res = await server.post('/api/user/isExist').send({ userName });
  expect(res.body.errno).not.toBe(0);
})