// 注册、登录、退出
const express = require('express')
const md5 = require('blueimp-md5')

const User = require('../models/user.js')

const router = express.Router()

// 首页
router.get('/index', (req, res) => {
  res.render('index', {
    data: req.session.userInfo,
  })
})

// 注册页面
router.get('/register', (req, res) => {
  res.render('register')
})

// 注册处理
router.post('/register', async (req, res) => {
  // 1.获取表单数据
  // 2.操作数据库
  //    判断用户是否存在
  //    已存在,不允许注册
  //    不存在,注册新用户
  // 3.发送响应

  var postData = req.body
  console.log(postData)

  try {
    const email = await User.findOne({ email: postData.email })
    const nickname = await User.findOne({ nickname: postData.nickname })
    if (email) {
      return res.status(200).json({
        code: 1,
        message: '邮箱已存在',
      })
    }
    if (nickname) {
      return res.status(200).json({
        code: 1,
        message: '昵称已存在',
      })
    }
    // md5 加密
    postData.password = md5(postData.password)

    new User(postData).save()

    return res.status(200).json({
      code: 0,
      message: '注册成功',
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      code: 500,
      message: '服务器忙，请稍后重试！',
    })
  }
})

// 登录页面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登录处理
router.post('/login', async (req, res) => {
  // 1.获取表单数据
  // 2.操作数据库
  //    判断用户名和密码是否正确
  // 3.发送响应

  const postData = req.body
  console.log(postData)

  try {
    const result = await User.findOne({
      email: postData.email,
      nickname: postData.nickname,
      password: md5(postData.password),
    })
    if (!result) {
      return res.status(200).json({
        code: 1,
        message: '邮箱 或者 密码错误',
      })
    }

    // 登录成功 设置session，记录状态
    req.session.isLogin = true
    req.session.userInfo = postData

    return res.status(200).json({
      code: 0,
      message: '登录成功',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      code: 500,
      message: '服务器忙，请稍后重试！',
    })
  }
})

// 退出
router.get('/logout', (req, res) => {
  // 清除session
  req.session.isLogin = null
  req.session.userInfo = null
  req.res.redirect('/login')
})

module.exports = router
