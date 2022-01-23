const server = require('./server')

test('测试request', ()=>{
  const res = await server.get('/json') 

  expect(res.body).toEqual({
    title: 'koa2 json'
  })

  expect(res.body.title).toBe('koa2 json')

  const ress = await server.post('/login').send({
    username: 'zhangsan',
    password: '123'
  })
})