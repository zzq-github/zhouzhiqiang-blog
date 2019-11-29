let models = require('../db')
let express = require('express')
let router = express.Router()
// const jwt = require('jsonwebtoken')
let mysql = require('mysql')
let $sql = require('../sqlMap')

// 连接数据库
let conn = mysql.createConnection(models.mysql)

conn.connect()
let jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 查询所有的文章
router.post('/queryAllArticle', (req, res) => {
  let start = (req.body.pageNum - 1) * 5
  let sql1 = `select count(*) as total from article`
  let sql2 = `select * from article order by creattime+0 desc limit ${start},5`
  let results = []
  conn.query(sql1, function (err, result) {
    if (err) {
      throw err
    } else {
      results.push(result)
      conn.query(sql2, function (err, result) {
        if (err) {
          throw err
        } else {
          results.push(result)
          let resData = {
            rows: results[1],
            total: results[0][0].total
          }
          jsonWrite(res, {status: 200, message: 'success', data: resData})
        }
      })
    }
  })
})
// 查询最新的文章
router.post('/queryNewArticle', (req, res) => {
  conn.query($sql.user.queryNewArticle, function (error, result) {
    if (error) {
      console.log(error)
    } else {
      jsonWrite(res, {status: 200, message: 'success', data: result})
    }
  })
})

// 根据id查询文章详情
router.get('/queryArticleId', (req, res) => {
  let params = req.query
  conn.query($sql.user.queryArticleId, [params.id], function (error, result) {
    if (error) {
      console.log(error)
    } else {
      jsonWrite(res, {status: 200, message: 'success', data: result[0]})
    }
  })
})

// 文章发表评论
router.post('/postComment', (req, res) => {
  let params = req.body
  conn.query($sql.user.addComment, [params.articleid, params.visitor, params.email, params.content, params.commenttime], function (error, result) {
    if (error) {
      console.log(error)
    } else {
      jsonWrite(res, {status: 200, message: '评论发表成功', data: ''})
    }
  })
})

// 根据文章id 查询文章评论
router.get('/selectComment', (req, res) => {
  let params = req.query
  console.log(params)
  conn.query($sql.user.queryComment, [params.id], function (error, result) {
    if (error) {
      console.log(error)
    } else {
      jsonWrite(res, {status: 200, message: 'success', data: result})
    }
  })
})

// 查询所有用户
router.post('/queryAllUser', (req, res) => {
  conn.query($sql.user.queryAllUser, function (error, result) {
    if (error) {
      console.log(error)
    } else {
      jsonWrite(res, {status: 200, message: 'success', data: result})
    }
  })
})
// 增加用户接口
router.post('/addUser', (req, res) => {
  let params = req.body
  if (!params.username || !params.password) {
    jsonWrite(res, { status: 400, message: '请填写完整的用户信息', data: '' })
    return false
  }
  conn.query($sql.user.queryByName, [params.username], function (error, result) {
    if (error) {
      console.log(error)
    }
    if (result) {
      if (result.length > 0) {
        jsonWrite(res, { status: 400, message: '该用户已经存在,不可重复添加', data: '' })
        return false
      }
      conn.query($sql.user.add, [params.username, params.password], function (error, result) {
        if (error) {
          console.log(error)
        }
        if (result) {
          jsonWrite(res, { status: 200, message: 'success', data: '' })
        }
      })
    }
  })
})
// 用户登录验证
router.post('/login', (req, res) => {
  let params = req.body
  conn.query($sql.user.login, [params.username, params.password], function (error, result) {
    if (error) {
      console.log(error)
    }
    if (result) {
      if (result.length > 0) {
        // let content = {name: req.body.name}
        // let secretOrPrivateKey = 'jwt'
        // let token = jwt.sign(content, secretOrPrivateKey, {
        //   expiresIn: 60 * 60 * 1
        // })
        jsonWrite(res, { status: 200, message: '登录成功', data: result[0] })
      } else {
        jsonWrite(res, { status: 400, message: '用户名或者密码不正确', data: result })
      }
    }
  })
})
module.exports = router
