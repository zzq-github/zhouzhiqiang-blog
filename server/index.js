const userApi = require('./api/userApi')
const adminApi = require('./api/adminAPI')
// const fs = require('fs')
// const path = require('path')
const express = require('express')
// const cors = require('cors')
const app = express()
// const session = require('express-session')
const bodyParser = require('body-parser')

// app.use(cors)
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
// app.use(session({
//   secret: 'secret', // 对session id 相关的cookie 进行签名
//   resave: true,
//   saveUninitialized: false, // 是否保存未初始化的会话
//   cookie: {
//     maxAge: 1000 * 60 * 5 // 设置 session 的有效时间，单位毫秒
//   }
// }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// 后端api路由
app.use('/api/user', userApi)
app.use('/api/admin', adminApi)

// 监听端口
app.listen(3000)
console.log('success listen at port:3000......')
