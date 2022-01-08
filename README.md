# koa2 实战新浪微博

## 项目创建/启动

创建项目: `koa2 -e <name>` , `-e`使用ejs为模板引擎

项目启动: `npm run dev`

## 依赖包

`npm i cross-env -D`

## git前缀

`refactor` 做了重构\目录改变, 没有增加新功能
`feature`  增加了新功能

## ejs 

``` js
  // .ejs
  <%= locals.title %> 
  // 不确定变量是否是由后端传过来, 就加locals, 页面就不会报错

  // koa2
  async ctx.render('index', { title: 'Hello world' })

  // ##### ejs 条件判断 #############
  // 输出变量用=号: <%=
  <% if (title) { %>
    内容
  <% } else { %>
    内容
  <% } %>

  // ##### ejs 组件 ##############
  // 查看 views/widgets/user-info.ejs
  // 导入组件
  <%- include('widgets/user-info', {
    user: '铁头马'
  }) %>

  // ''
  <% blogList.forEach( title => { %>
    <li> <%= title %> </li>
  <% }) %>

```