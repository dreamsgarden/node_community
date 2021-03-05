const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

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

app.listen(3000, () => {
  console.log('server is running...')
})