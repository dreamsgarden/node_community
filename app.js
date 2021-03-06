const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')

// 注册登录
const sessionRouter = require('./routers/session')

const app = new express()

// 静态资源
app.use('/public', express.static(path.join(__dirname, 'public')))

// post 数据
app.use(bodyParser.urlencoded({extended: false,}))

// 当渲染模板时 使用express-art-template
app.engine('html', require('express-art-template'))
// 设置模板存放目录
app.set('views', path.join(__dirname, 'views'))
// 渲染模板时不写后缀 默认拼接art后缀
app.set('view engine', 'html')

// 一定要在 路由之前使用
app.use(
  session({
    secret: 'keyboard cat', //设置签名秘钥，加密存储
    resave: false, //客户端并行请求是否覆盖:true-是,false-否
    saveUninitialized: true, //初始化session存储
  })
)

// 挂载路由
app.use('/', sessionRouter)

app.listen(3000, () => {
  console.log('server is running...')
})