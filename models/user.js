const mongoose = require('mongoose')

const db = require('./db')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 创建时间
  created_time: {
    type: Date,
    // 注意不要 Date.now()，因为会立即调用
    // 给一个方法 Date.now，当 new model 时，如果没传 creat_time，则 mongoose 就会调用 default 指定的 Date.now 方法，使用其返回值作为默认值
    default: Date.now,
  },
  // 上次修改时间
  last_modified_time: {
    type: Date,
    default: Date.now,
  },
  // 头像
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png',
  },
  // 介绍
  bio: {
    type: String,
    default: '',
  },
  // 性别
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1,
  },
  // 生日
  birthday: {
    type: Date,
  },
  // 状态
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0,1, 2],
    default: 0,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
